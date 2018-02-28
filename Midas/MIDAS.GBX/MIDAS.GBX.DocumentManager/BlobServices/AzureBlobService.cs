using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Net.Http;
using System.Web;
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
        private Utility util = new Utility();
        #endregion

        public AzureBlobService()
        {            
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
                return "UnableToUpload";
            }

            return HttpUtility.UrlDecode(Cloudblob.Uri.AbsoluteUri);
        }

        public override Object Upload(string blobPath, MemoryStream memorystream, int companyId)
        {
            util.ContainerName = "company-" + companyId;

            try
            {
                Cloudblob = util.BlobContainer.GetBlockBlobReference(blobPath);

                using (Stream stream = memorystream)
                {
                    Cloudblob.UploadFromStream(stream);
                }
            }
            catch (Exception er)
            {
                return "UnableToUpload";
            }

            return HttpUtility.UrlDecode(Cloudblob.Uri.AbsoluteUri);
        }

        public override Object Download(int companyId, string documentPath)
        {
            //Sample BLOB URL : https://midasdocument.blob.core.windows.net/company-16/cs-86/nofault/consent/consent.pdf
            util.ContainerName = "company-" + companyId;
            string blobName = util.getBlob(documentPath);
            CloudBlockBlob _cblob = util.BlobContainer.GetBlockBlobReference(blobName);
            //_cblob.FetchAttributes();

            var ms = new MemoryStream();
            _cblob.DownloadToStream(ms);

            long fileByteLength = _cblob.Properties.Length;
            byte[] fileContents = new byte[fileByteLength];
            _cblob.DownloadToByteArray(fileContents, 0);

            //HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
            //HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization, x-requested-with, dwt-md5, inputjson ");
            //HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "*");

            //HttpContext.Current.Response.ContentType = _cblob.Properties.ContentType;
            //HttpContext.Current.Response.AddHeader("Content-Disposition", "Attachment; filename=" + Path.GetFileName(blobName.ToString()));
            //HttpContext.Current.Response.AddHeader("Content-Length", _cblob.Properties.Length.ToString());
            //HttpContext.Current.Response.BinaryWrite(fileContents);
            //HttpContext.Current.Response.Flush();
            ////HttpContext.Current.Response.End();

            return (Object)new {
                ContentType = _cblob.Properties.ContentType,
                Content_Disposition = "Attachment; filename=" + Path.GetFileName(blobName.ToString()),
                Content_Length = _cblob.Properties.Length.ToString(),
                ByteArray = fileContents,
                filename = Path.GetFileName(blobName.ToString())
            };
        }

        public override Object Merge(int companyId, object pdfFiles, string blobPath)
        {
            string tempUploadPath = HttpContext.Current.Server.MapPath("~/App_data/uploads/" + Path.GetFileName(blobPath));
            using (FileStream stream = new FileStream(tempUploadPath, FileMode.Create))
            {
                PdfReader reader = null;
                Document sourceDocument = new Document();
                List<string> lstfiles = pdfFiles as List<string>;
                util.ContainerName = "company-" + companyId;
                Cloudblob = util.BlobContainer.GetBlockBlobReference(blobPath);

                PdfWriter writer = PdfWriter.GetInstance(sourceDocument, stream);                
                PdfSmartCopy copy = new PdfSmartCopy(sourceDocument, stream);
                sourceDocument.Open();

                lstfiles.ForEach(file =>
                                {
                                    util.ContainerName = "company-" + companyId;
                                    string path = util.getBlob(file);
                                    CloudBlockBlob _cblob = util.BlobContainer.GetBlockBlobReference(path);
                                    var ms = new MemoryStream();
                                    _cblob.DownloadToStream(ms);
                                    long fileByteLength = _cblob.Properties.Length;
                                    byte[] fileContents = new byte[fileByteLength];
                                    _cblob.DownloadToByteArray(fileContents, 0);
                                    reader = new PdfReader(fileContents);
                                    copy.AddDocument(reader);
                                    reader.Close();
                                }
                            );
                copy.Close();            
            }
            var blobURL = this.Upload(blobPath, tempUploadPath, companyId);
            return (object)blobURL;
        }

        public override Object Packet(int companyId, object pdfFiles, string blobPath)
        {
            string tempUploadPath = HttpContext.Current.Server.MapPath("~/App_data/uploads/" + Path.GetFileName(blobPath));
            tempUploadPath = tempUploadPath.Replace(Path.GetExtension(blobPath), "") + @"\src";
            if (Directory.Exists(tempUploadPath) == false)
            {
                Directory.CreateDirectory(tempUploadPath);
            }
            else
            {
                Directory.Delete(tempUploadPath);
                Directory.CreateDirectory(tempUploadPath);
            }

            List<string> lstfiles = pdfFiles as List<string>;
            lstfiles.ForEach(file =>
            {
                util.ContainerName = "company-" + companyId;
                string path = util.getBlob(file);
                CloudBlockBlob _cblob = util.BlobContainer.GetBlockBlobReference(path);
                var ms = new MemoryStream();
                _cblob.DownloadToStream(ms);
                long fileByteLength = _cblob.Properties.Length;
                byte[] fileContents = new byte[fileByteLength];
                _cblob.DownloadToByteArray(fileContents, 0);
                File.WriteAllBytes(tempUploadPath + @"\" + Path.GetFileName(path), fileContents);
            });

            string DestinationDirZIP = tempUploadPath.Replace(@"\src", "") + @"\" + Path.GetFileName(blobPath);
            System.IO.Compression.ZipFile.CreateFromDirectory(tempUploadPath, DestinationDirZIP);

            var blobURL = this.Upload(blobPath, DestinationDirZIP, companyId);
            return (object)blobURL;
            //return "";
        }

        public override Object Upload(string blobPath, string serverPath, int companyId)
        {
            util.ContainerName = "company-" + companyId;

            try
            {
                Cloudblob = util.BlobContainer.GetBlockBlobReference(blobPath);

                Cloudblob.UploadFromFile(serverPath);                                    
            }
            catch (Exception er)
            {
                return "UnableToUpload";
            }

            return Cloudblob.Uri.AbsoluteUri;
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