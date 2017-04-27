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

        public BlobServiceHandler() { dataAccessManager = new GbDataAccessManager<AzureBlobService>(); }

        public HttpResponseMessage UploadToBlob(HttpRequestMessage request, List<HttpContent> content, UploadInfo uploadObject)
        {
            var objResult = new object();
            try
            {
                serviceProvider = (BlobServiceProvider)dataAccessManager.GetBlobServiceProvider(uploadObject.CompanyId);
                objResult = (object)serviceProvider.Upload(uploadObject, content);
                if (objResult != null)
                    return request.CreateResponse(HttpStatusCode.Created, objResult);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, objResult);
            }
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