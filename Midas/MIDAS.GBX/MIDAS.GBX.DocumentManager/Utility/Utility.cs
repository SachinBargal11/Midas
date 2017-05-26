using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
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

        public string getBlob(string relativePath)
        {
            string blobPath = string.Empty;
            blobPath = new Uri(relativePath).AbsolutePath;

            return blobPath.Remove(0, blobPath.IndexOf('/', blobPath.IndexOf('/') + 1)).TrimStart('/');
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