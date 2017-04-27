using entityRepo = MIDAS.GBX.EntityRepository;
using MIDAS.GBX.DataRepository;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
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
using MIDAS.GBX.DataAccessManager;
using BO = MIDAS.GBX.BusinessObjects;
using System.Data.SqlClient;
using MIDAS.GBX.BusinessObjects.Common;

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
                
        public override Object Upload(UploadInfo uploadObject, List<HttpContent> content)
        {
            //container.SetPermissions(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });
            //util.BlobContainer.SetPermissions(new BlobContainerPermissions { PublicAccess=  });
            
            util.ContainerName = "company-" + uploadObject.CompanyId;
            string documentPath = util.getDocumentPath(uploadObject.DocumentType, uploadObject.ObjectType,uploadObject.ObjectId, _context);

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                try
                {
                    foreach (HttpContent ctnt in content)
                    {
                        Cloudblob = util.BlobContainer.GetBlockBlobReference(documentPath + "/" + ctnt.Headers.ContentDisposition.FileName.Replace("\"", string.Empty));

                        using (Stream stream = ctnt.ReadAsStreamAsync().Result)
                        {
                            Cloudblob.UploadFromStream(stream);
                            BO.Document doc = (BO.Document)dataAccessManager.SaveAsBlob(uploadObject.ObjectId, uploadObject.CompanyId, uploadObject.ObjectType, uploadObject.DocumentType, Cloudblob.Uri.AbsoluteUri);
                            documents.Add(doc);

                            dbContextTransaction.Commit();
                        }
                    }
                }
                catch (Exception er)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "Unable to upload", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
            }
            return (Object)documents;
        }

        public override Object Download(int objectId, int documentId)
        {
            string blobName = util.getBlob(documentId, _context);
            CloudBlockBlob _cblob = util.BlobContainer.GetBlockBlobReference(blobName);
            _cblob.FetchAttributes();

            var ms = new MemoryStream();
            _cblob.DownloadToStreamAsync(ms);
            
            return new Object();
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