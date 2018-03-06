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

        public HttpResponseMessage UploadToBlob(HttpRequestMessage request, HttpContent content, string blobPath, int companyId, string servicepProvider, int CreateUserId, int UpdateUserId)
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
            dynamic Current_Response = serviceProvider.Download(companyid, documentPath);
            try
            {
                byte[] fileContents = Current_Response.ByteArray as byte[];
                Stream stream = new MemoryStream(fileContents);

                HttpResponseMessage result = null;
                result = request.CreateResponse(HttpStatusCode.OK);
                result.Content = new StreamContent(stream);
                result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
                //result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue(Current_Response.Content_Disposition);
                result.Content.Headers.ContentDisposition.FileName = Current_Response.filename;

                return result;
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage MergeDocuments(HttpRequestMessage request, int companyid, object pdfFiles, string blobPath, string servicepProvider)
        {
            var objResult = new Object();
            serviceProvider = (BlobServiceProvider)BlobStorageFactory.GetBlobServiceProviders(servicepProvider);
            objResult = serviceProvider.Merge(companyid, pdfFiles, blobPath);
            if (objResult != null && objResult.ToString() != "Please select only PDF files to merge")
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            else
                return request.CreateResponse(HttpStatusCode.NotFound, objResult);
        }

        public HttpResponseMessage PacketDocuments(HttpRequestMessage request, int companyid, object pdfFiles, string blobPath, string servicepProvider)
        {
            var objResult = new Object();
            serviceProvider = (BlobServiceProvider)BlobStorageFactory.GetBlobServiceProviders(servicepProvider);
            objResult = serviceProvider.Packet(companyid, pdfFiles, blobPath);
            if (objResult != null && objResult.ToString() != "Please select only PDF files to packet")
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