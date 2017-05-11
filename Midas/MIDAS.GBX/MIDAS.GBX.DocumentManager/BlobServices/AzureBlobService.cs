using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using MIDAS.GBX.DataRepository.Model;
using Aquaforest.PDF;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Net.Http;
using System.Web;
using MIDAS.GBX.DataAccessManager;
using BO = MIDAS.GBX.BusinessObjects;
using iTextSharp.text.pdf;
using iTextSharp.text;
using System.Text.RegularExpressions;
using System.Net;

namespace MIDAS.GBX.DocumentManager
{
    public class AzureBlobService : BlobServiceProvider, IDisposable
    {
        #region private members
        private CloudBlockBlob Cloudblob;
        private string blobStorageContainerName = ConfigurationManager.AppSettings["BlobStorageContainerName"];
        private List<BO.Document> documents = new List<BO.Document>();
        private IGbDataAccessManager<BO.Document> dataAccessManager;
        private Utility util = new Utility();
        #endregion

        public AzureBlobService(MIDASGBXEntities context) : base(context)
        {
            dataAccessManager = new GbDataAccessManager<BO.Document>();
            util.BlobStorageConnectionString = ConfigurationManager.AppSettings["BlobStorageConnectionString"];
        }

        public override Object Upload(string blobPath, HttpContent content, int companyId)
        {
            //container.SetPermissions(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });
            //util.BlobContainer.SetPermissions(new BlobContainerPermissions { PublicAccess=  });

            util.ContainerName = "company-" + companyId;

            try
            {
                Cloudblob = util.BlobContainer.GetBlockBlobReference(blobPath + "/" + content.Headers.ContentDisposition.FileName.Replace("\"", string.Empty));

                using (Stream stream = content.ReadAsStreamAsync().Result)
                {
                    Cloudblob.UploadFromStream(stream);
                }
            }
            catch (Exception er)
            {
                return (Object)"Unable to upload";
            }

            return (Object)Cloudblob.Uri.AbsoluteUri;
        }

        public override Object Download(int companyId, int documentId)
        {
            //Sample BLOB URL : https://midasdocument.blob.core.windows.net/company-16/cs-86/nofault/consent/consent.pdf
            util.ContainerName = "company-" + companyId;
            string blobName = util.getBlob(documentId, _context);
            CloudBlockBlob _cblob = util.BlobContainer.GetBlockBlobReference(blobName);
            //_cblob.FetchAttributes();

            var ms = new MemoryStream();
            _cblob.DownloadToStream(ms);

            long fileByteLength = _cblob.Properties.Length;
            byte[] fileContents = new byte[fileByteLength];
            _cblob.DownloadToByteArray(fileContents, 0);

            HttpContext.Current.Response.ContentType = _cblob.Properties.ContentType;
            HttpContext.Current.Response.AddHeader("Content-Disposition", "Attachment; filename=" + Path.GetFileName(blobName.ToString()));
            HttpContext.Current.Response.AddHeader("Content-Length", _cblob.Properties.Length.ToString());
            HttpContext.Current.Response.BinaryWrite(fileContents);


            return (Object)ms;
        }

        public override Object Merge(int companyId, object pdfFiles, string blobPath)
        {
            PDFMerger pdfmerger = new PDFMerger();
            PdfReader reader = null;
            Document sourceDocument = new Document();               
            sourceDocument.Open();
            List<string> lstfiles = pdfFiles as List<string>;
            util.ContainerName = "company-" + companyId;
            Cloudblob = util.BlobContainer.GetBlockBlobReference(blobPath);

            //using (FileStream stream = new FileStream(Cloudblob.Uri.AbsolutePath, FileMode.Create))
            using (FileStream stream = new FileStream(HttpContext.Current.Server.MapPath("~/App_data/uploads/"+Path.GetFileName(blobPath)), FileMode.Create)) 
            {
                PdfSmartCopy copy = new PdfSmartCopy(sourceDocument, stream);
                PdfWriter writer = PdfWriter.GetInstance(sourceDocument, stream);
                PdfImportedPage page = null;
                
                lstfiles.ForEach(file =>
                                {
                                    util.ContainerName = "company-" + companyId;
                                    string path = util.getBlob(file, _context);
                                    CloudBlockBlob _cblob = util.BlobContainer.GetBlockBlobReference(path);
                                    var ms = new MemoryStream();
                                    _cblob.DownloadToStream(ms);
                                    long fileByteLength = _cblob.Properties.Length;
                                    byte[] fileContents = new byte[fileByteLength];
                                    _cblob.DownloadToByteArray(fileContents, 0);

                                    reader = new PdfReader(fileContents);
                                    for (int i = 0; i < reader.NumberOfPages; i++)
                                    {
                                        page = writer.GetImportedPage(reader, i + 1);
                                        copy.AddPage(page);
                                    }
                                    reader.Close();
                                }
                            );
                copy.Close();
                writer.Close();
            }

            return new object();
        }

        private int get_pageCcount(string file)
        {
            using (StreamReader sr = new StreamReader(File.OpenRead(file)))
            {
                Regex regex = new Regex(@"/Type\s*/Page[^s]");
                MatchCollection matches = regex.Matches(sr.ReadToEnd());

                return matches.Count;
            }
        }

        public bool DeleteBlob(string blobName)
        {
            try
            {
                var blob = util.BlobContainer.GetBlockBlobReference(blobName);
                blob.Delete();
                return true;
            }
            catch (StorageException ex)
            {
                if (ex.RequestInformation.HttpStatusCode == 404)
                {
                    return false;
                }

                throw;
            }
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}