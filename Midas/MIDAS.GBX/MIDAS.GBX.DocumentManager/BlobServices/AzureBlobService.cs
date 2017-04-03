using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.DataRepository.Model;
//using MIDAS.GBX.DocumentManager.Utility;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;

namespace MIDAS.GBX.DocumentManager
{
    public class AzureBlobService : BlobServiceProvider, IDisposable
    {
        #region private members
        private CloudStorageAccount _storageAccount;
        private CloudBlobContainer _container;
        private CloudBlockBlob _blockBlob;
        private CloudBlobClient _blobClient;
        private string blobStorageConnectionString = ConfigurationManager.AppSettings["BlobStorageConnectionString"];
        private string blobStorageContainerName = ConfigurationManager.AppSettings["BlobStorageContainerName"];
        private string _containerName;
        private string _blobName;
        private string _directoryName;
        private List<Document> documents = new List<Document>();
        private Utility util = new Utility();
        #endregion

        #region Public Properties
        /// <summary>
        /// Gets/sets the name of the Azure Container
        /// </summary>
        public string ContainerName
        {
            get { return _containerName; }
            set { _containerName = value; }
        }

        /// <summary>
        /// Gets/sets the name of the Blob
        /// </summary>
        public string BlobName
        {
            get { return _blobName; }
            set { _blobName = value; }
        }

        /// <summary>
        /// Gets/sets the "virtual" directory. 
        /// </summary>
        public string DirectoryName
        {
            get { return _directoryName; }
            set { _directoryName = value; }
        }
        #endregion Public Properties
        
        public AzureBlobService(MIDASGBXEntities context) : base(context)
        {
            // Create blob client and return reference to the container            
            _storageAccount = CloudStorageAccount.Parse(blobStorageConnectionString);
            _blobClient = _storageAccount.CreateCloudBlobClient();
            _container = _blobClient.GetContainerReference(blobStorageContainerName);            
        }

        public override Object Upload(int id, HttpContent content)
        {
            //container.SetPermissions(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });
            _container.CreateIfNotExists();
            //---------change the above container with storage path formed for resective object 

            //If size of a file is not big then read file directly into stream
            var streamProvider = new MultipartMemoryStreamProvider();
            //If size is quite big to upload then store file to desk and then move to appropriate directory
            //var streamProvider = new MultipartFormDataStreamProvider(sourcePath);
        
            content.ReadAsMultipartAsync(streamProvider);
            
            foreach (HttpContent ctnt in streamProvider.Contents)
            {
                CloudBlockBlob _cblob = _container.GetBlockBlobReference(ctnt.Headers.ContentDisposition.FileName.Replace("\"", string.Empty));
                using (Stream stream = ctnt.ReadAsStreamAsync().Result)
                {
                    _cblob.UploadFromStream(stream);
                    documents.Add(new Document()
                    {
                        DocumentId = 0,
                        DocumentName = ctnt.Headers.ContentDisposition.FileName.Replace("\"", string.Empty),
                        DocumentPath = _cblob.Uri.AbsoluteUri
                    });
                }
            }
            //save data into database
            /*
            using (var dbContextTransaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        MidasDocument midasdoc = _context.MidasDocuments.Add(new MidasDocument()
                        {
                            ObjectType = type,
                            ObjectId = id,
                            DocumentName = content.Headers.ContentDisposition.FileName.Replace("\"", string.Empty),
                            DocumentPath = _cblob.Uri.AbsoluteUri,

                        });
                        _context.Entry(midasdoc).State = System.Data.Entity.EntityState.Added;
                        _context.SaveChanges();

                        CaseDocument caseDoc = _context.CaseDocuments.Add(new CaseDocument()
                        {
                            MidasDocumentId = midasdoc.Id,
                            CaseId = id,
                            DocumentName = content.Headers.ContentDisposition.FileName.Replace("\"", string.Empty)
                        });
                        _context.Entry(caseDoc).State = System.Data.Entity.EntityState.Added;
                        _context.SaveChanges();
                        filename = caseDoc.DocumentName;
                        //docInfo.Type = type;

                        using (Stream stream = content.ReadAsStreamAsync().Result)
                        {
                            if (File.Exists(_cblob.Uri.AbsoluteUri)
                            {
                                errMessage = "DuplicateFileName";
                                dbContextTransaction.Rollback();
                            }
                            else if (!Enum.IsDefined(typeof(GBEnums.FileTypes), content.Headers.ContentDisposition.FileName.Replace("\"", string.Empty).Split('.')[1]))
                            {
                                errMessage = "Invalid file extension";
                                dbContextTransaction.Rollback();
                            }
                            else if (!(System.Convert.ToDecimal(content.Headers.ContentLength / (1024.0m * 1024.0m)) > 0 && System.Convert.ToDecimal(content.Headers.ContentLength / (1024.0m * 1024.0m)) <= 1))
                            {
                                errMessage = "File size exccded the limit : 1MB";
                                dbContextTransaction.Rollback();
                            }
                            else
                            {
                                stream.Seek(0, SeekOrigin.Begin);
                                FileStream filestream = File.Create(uploadpath + "/" + content.Headers.ContentDisposition.FileName.Replace("\"", string.Empty));
                                stream.CopyTo(filestream);
                                stream.Close();
                                filestream.Close();
                                dbContextTransaction.Commit();
                            }
                        }
                        docInfo.Add(new Document()
                        {
                            Status = errMessage.Equals(string.Empty) ? "Success" : "Failed",
                            Message = errMessage,
                            DocumentId = errMessage.Equals(string.Empty) ? 0 : midasdoc.Id,
                            DocumentPath = errMessage.Equals(string.Empty) ? midasdoc.DocumentPath + "/" + caseDoc.DocumentName : caseDoc.DocumentName,
                            DocumentName = caseDoc.DocumentName,
                            id = id
                        });                        
                    }
                    catch (Exception err)
                    {
                        docInfo.Add(new Document()
                        {
                            Status = "Failed",
                            Message = err.Message.ToString(),
                            DocumentId = 0,
                            DocumentPath = "",
                            DocumentName= filename,
                            id = id
                        });
                        dbContextTransaction.Rollback();
                    }      
            */
            return (Object)documents;
        }

        public override Object Download(int companyid, int documentid)
        {
            string blobName = util.getBlob(documentid, _context);
            CloudBlockBlob _cblob = _container.GetBlockBlobReference(blobName);
            _cblob.FetchAttributes();

            var ms = new MemoryStream();
            _cblob.DownloadToStreamAsync(ms);

            return new Object();
        }
        
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}