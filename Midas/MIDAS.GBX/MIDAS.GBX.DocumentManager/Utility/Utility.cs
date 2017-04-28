using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using MIDAS.GBX.DataRepository.Model;
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

        public string getBlob(int documentId, MIDASGBXEntities context)
        {
            string blobPath = string.Empty;
            blobPath = new Uri(context.MidasDocuments.Where(doc => doc.Id == documentId).FirstOrDefault().DocumentPath).AbsolutePath;

            return blobPath.Remove(0, blobPath.IndexOf('/', blobPath.IndexOf('/') + 1)).TrimStart('/');
        }

        public string getDocumentPath(string documentNode,string objectType,int objectId, MIDASGBXEntities context)
        {
            string path=string.Empty;
            var documentnodeParameter = new SqlParameter("@document_node", documentNode);
            var documentPath = context.Database.SqlQuery<string>("midas_sp_get_document_path @document_node", documentnodeParameter).ToList();
            
            switch (objectType.ToUpper())
            {
                case EN.Constants.CaseType:
                    path = documentPath[0].Replace("cmp/", "")
                                        .Replace("cstype", context.Cases.Where(csid => csid.Id == objectId).FirstOrDefault().CaseType.CaseTypeText.ToLower())
                                        .Replace("cs", "cs-" + objectId);
                    break;
                case EN.Constants.VisitType:
                    path = documentPath[0].Replace("cmp/", "")
                                        .Replace("cstype", context.Cases.Where(csid => csid.Id == context.PatientVisit2.Where(pvid => pvid.Id == objectId).FirstOrDefault().CaseId)
                                                                                                   .FirstOrDefault().CaseType.CaseTypeText.ToLower())
                                        .Replace("cs", "cs-" + context.PatientVisit2.Where(pvid => pvid.Id == objectId).FirstOrDefault().CaseId);
                    break;
            }
            return path;
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