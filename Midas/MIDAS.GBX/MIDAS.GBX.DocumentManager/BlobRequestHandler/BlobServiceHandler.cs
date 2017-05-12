using MIDAS.GBX.BusinessObjects.Common;
using MIDAS.GBX.DataAccessManager;
using MIDAS.GBX.DataRepository.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;

namespace MIDAS.GBX.DocumentManager
{
    public class BlobServiceHandler : IBlobService
    {
        private IGbDataAccessManager<AzureBlobService> dataAccessManager;
        private BlobServiceProvider serviceProvider;
        internal MIDASGBXEntities _context;
        IDBContextProvider dbContextProvider = new DBContextProvider();

        public BlobServiceHandler()
        {
            dataAccessManager = new GbDataAccessManager<AzureBlobService>();
            _context = dbContextProvider.GetGbDBContext();
        }

        public HttpResponseMessage UploadToBlob(HttpRequestMessage request, HttpContent content, string blobPath, int companyId)
        {
            string objResult = "";
            try
            {                
                serviceProvider = BlobStorageFactory.GetBlobServiceProviders(companyId, _context);
                if (serviceProvider == null)
                    return request.CreateResponse(HttpStatusCode.NotFound, new BusinessObjects.ErrorObject { ErrorMessage = "No BLOB storage provider found.", errorObject = "", ErrorLevel = ErrorLevel.Error });

                objResult = serviceProvider.Upload(blobPath, content, companyId) as string;
                if (objResult != null)
                    return request.CreateResponse(HttpStatusCode.Created, objResult);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, objResult);
            }
            catch (Exception ex) { return request.CreateResponse(HttpStatusCode.BadRequest, ex.Message); }
        }

        public HttpResponseMessage DownloadFromBlob(HttpRequestMessage request, int companyid, int documentid)
        {
            var objResult = new Object();
            serviceProvider = (BlobServiceProvider)BlobStorageFactory.GetBlobServiceProviders(companyid, _context);
            serviceProvider.Download(companyid, documentid);
            try { return request.CreateResponse(HttpStatusCode.Created, objResult); }
            catch (Exception ex) { return request.CreateResponse(HttpStatusCode.BadRequest, objResult); }
        }

        public HttpResponseMessage MergeDocuments(int companyid, object pdfFiles, string blobPath)
        {
            var objResult = new Object();
            serviceProvider = (BlobServiceProvider)BlobStorageFactory.GetBlobServiceProviders(companyid, _context);
            serviceProvider.Merge(companyid, pdfFiles, blobPath);
            return new HttpResponseMessage();
        }
    }
}