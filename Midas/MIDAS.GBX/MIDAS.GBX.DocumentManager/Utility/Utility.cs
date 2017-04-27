using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using MIDAS.GBX.DataRepository.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MIDAS.GBX.DocumentManager
{
    public class Utility
    {
        public CloudStorageAccount _account;
        public string _blobStorageConnectionString = string.Empty;
        public string _blobContainerName = string.Empty;
        public string _blobName = string.Empty;

        public string getBlob(int documentId, MIDASGBXEntities context)
        {
            string filename = string.Empty;
            filename = context.MidasDocuments.Where(doc => doc.Id == documentId).FirstOrDefault().DocumentName;

            return filename;
        }

        public string getDocumentPath(string documentNode, MIDASGBXEntities context)
        {
            var documentnodeParameter = new SqlParameter("@document_node", documentNode);
            var documentPath = context.Database.SqlQuery<string>("midas_sp_get_document_path @document_node", documentnodeParameter).ToList();


            return documentPath[0].ToString();
        }

        public CloudStorageAccount StorageAccount
        {
            get { return _account ?? (_account = CloudStorageAccount.Parse(BlobStorageConnectionString)); }
            set { _account = value; }
        }

        public CloudBlobContainer BlobContainer
        {
            get
            {
                var container = BlobClient.GetContainerReference(ContainerName.ToLower());
                container.CreateIfNotExists();
                return container;
            }
        }

        public CloudBlobClient BlobClient
        {
            get { return StorageAccount.CreateCloudBlobClient(); }
        }        

        public string ContainerName
        {
            get { return _blobContainerName; }
            set { _blobContainerName = value; }
        }

        public string BlobStorageConnectionString
        {
            get { return _blobStorageConnectionString; }
            set { _blobStorageConnectionString = value; }
        }

        public string BlobName
        {
            get { return _blobName; }
            set { _blobName = value; }
        }
    }
}