using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;

namespace MIDAS.GBX.DocumentManager
{
    public class BlobServiceHandler : IBlobService
    {        
        private BlobServiceProvider serviceProvider;

        public BlobServiceHandler() { }

        public HttpResponseMessage UploadToBlob(HttpRequestMessage request, HttpContent content, string blobPath, int companyId, string servicepProvider)
        {
            string objResult = "";
            try
            {
                serviceProvider = BlobStorageFactory.GetBlobServiceProviders(servicepProvider);
                if (serviceProvider == null)
                    return request.CreateResponse(HttpStatusCode.NotFound, "No BLOB storage provider found.");

                objResult = serviceProvider.Upload(blobPath, content, companyId) as string;
                if (objResult.ToUpper() == "UNABLETOUPLOAD")
                    return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
                if (objResult != null)
                    return request.CreateResponse(HttpStatusCode.Created, objResult);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, objResult);
            }
            catch (Exception ex) { return request.CreateResponse(HttpStatusCode.BadRequest, ex.Message); }
        }

        public HttpResponseMessage UploadToBlob(HttpRequestMessage request, MemoryStream stream, string blobPath, int companyId, string servicepProvider)
        {
            string objResult = "";
            try
            {
                serviceProvider = BlobStorageFactory.GetBlobServiceProviders(servicepProvider);
                if (serviceProvider == null)
                    return request.CreateResponse(HttpStatusCode.NotFound, "No BLOB storage provider found.");

                objResult = serviceProvider.Upload(blobPath, stream, companyId) as string;
                if (objResult.ToUpper() == "UNABLETOUPLOAD")
                    return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
                if (objResult != null)
                    return request.CreateResponse(HttpStatusCode.Created, objResult);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, objResult);
            }
            catch (Exception ex) { return request.CreateResponse(HttpStatusCode.BadRequest, ex.Message); }
        }

        public HttpResponseMessage DownloadFromBlob(HttpRequestMessage request, int companyid, string documentPath, string servicepProvider)
        {
            var objResult = new Object();
            serviceProvider = (BlobServiceProvider)BlobStorageFactory.GetBlobServiceProviders(servicepProvider);
            serviceProvider.Download(companyid, documentPath);
            try { return request.CreateResponse(HttpStatusCode.Created, objResult); }
            catch (Exception ex) { return request.CreateResponse(HttpStatusCode.BadRequest, objResult); }
        }

        public HttpResponseMessage MergeDocuments(HttpRequestMessage request, int companyid, object pdfFiles, string blobPath, string servicepProvider)
        {
            var objResult = new Object();
            serviceProvider = (BlobServiceProvider)BlobStorageFactory.GetBlobServiceProviders(servicepProvider);
            objResult = serviceProvider.Merge(companyid, pdfFiles, blobPath);
            if (objResult != null)
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            else
                return request.CreateResponse(HttpStatusCode.NotFound, objResult);
        }

        public object CreateTemplate(HttpRequestMessage request, Int32 companyId, string templateBlobPath, Dictionary<string, string> templateKeywords)
        {
            TemplateManager templatemanager = new TemplateManager();
            var objResult = templatemanager.Template(companyId, templateBlobPath, templateKeywords);
            return objResult;
        }
    }
}