using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using MIDAS.GBX.DataRepository.Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using MIDAS.GBX.DataAccessManager;
using BO = MIDAS.GBX.BusinessObjects;
using Novacode;

namespace MIDAS.GBX.DocumentManager
{
    public class TemplateManager : BlobServiceProvider, IDisposable
    {
        #region private members
        private CloudBlockBlob Cloudblob;
        private string blobStorageContainerName = ConfigurationManager.AppSettings["BlobStorageContainerName"];
        private List<BO.Document> documents = new List<BO.Document>();
        private IGbDataAccessManager<BO.Document> dataAccessManager;
        private Utility util = new Utility();
        #endregion

        public TemplateManager(MIDASGBXEntities context) : base(context)
        {
            dataAccessManager = new GbDataAccessManager<BO.Document>();
            util.BlobStorageConnectionString = ConfigurationManager.AppSettings["BlobStorageConnectionString"];
        }

        public override object Template(string templateBlobPath, IDictionary<string, string> templateKeywords)
        {
            util.ContainerName = "company-95";
            string blobName = util.getBlob(templateBlobPath);
            CloudBlockBlob _cblob = util.BlobContainer.GetBlockBlobReference(blobName);
            //_cblob.FetchAttributes();

            var ms = new MemoryStream();
            _cblob.DownloadToStream(ms);

            long fileByteLength = _cblob.Properties.Length;
            byte[] fileContents = new byte[fileByteLength];
            _cblob.DownloadToByteArray(fileContents, 0);

            DocX letter = DocX.Load(ms);
            letter.ReplaceText("{company}", "TestCompany");
            letter.SaveAs(@"C:\Users\Sonali.A\Midas_DevelopBranch\test.docx");

            return "";
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}