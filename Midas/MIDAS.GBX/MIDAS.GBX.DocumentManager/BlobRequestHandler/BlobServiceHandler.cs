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

        public BlobServiceHandler() { dataAccessManager = new GbDataAccessManager<AzureBlobService>(); }

        public HttpResponseMessage UploadToBlob(HttpRequestMessage request, HttpContent content, int companyid)
        {
            var objResult = new Object();
            serviceProvider = (BlobServiceProvider)dataAccessManager.GetBlobServiceProvider(companyid);
            serviceProvider.Upload(companyid, content);
            try { return request.CreateResponse(HttpStatusCode.Created, objResult); }
            catch (Exception ex) { return request.CreateResponse(HttpStatusCode.BadRequest, objResult); }
        }

        public HttpResponseMessage DownloadFromBlob(HttpRequestMessage request, int companyid, int documentid)
        {
            var objResult = new Object();
            serviceProvider = (BlobServiceProvider)dataAccessManager.GetBlobServiceProvider(companyid);
            serviceProvider.Download(companyid, documentid);
            try { return request.CreateResponse(HttpStatusCode.Created, objResult); }
            catch (Exception ex) { return request.CreateResponse(HttpStatusCode.BadRequest, objResult); }
        }

        public HttpResponseMessage MergeDocuments()
        {
            return new HttpResponseMessage();
        }
    }
}