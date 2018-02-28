using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/CompanyCaseConsentApproval")]
    public class CompanyCaseConsentApprovalController : ApiController
    {
        internal string sourcePath = string.Empty;
        private IRequestHandler<CompanyCaseConsentApproval> requestHandler;
        private IRequestHandler<CompanyCaseConsentBase64> requestHandler1;

        public CompanyCaseConsentApprovalController()
        {
            sourcePath = HttpContext.Current.Server.MapPath("~/App_Data/uploads").ToString();
            requestHandler = new GbApiRequestHandler<CompanyCaseConsentApproval>();
            requestHandler1 = new GbApiRequestHandler<CompanyCaseConsentBase64>();
        }

        [HttpGet]
        [Route("get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByCompanyId/{id}")]

        public HttpResponseMessage GetByCompanyId(int id)
        {
            return requestHandler.GetGbObjects(Request, id);
        }

        [HttpGet]
        [Route("getByCaseId/{CaseId}")]
        public HttpResponseMessage GetByCaseId(int CaseId)
        {
            return requestHandler.GetByCaseId(Request, CaseId);
        }

        [HttpPost]
        [Route("Save")]
        public HttpResponseMessage Post([FromBody]CompanyCaseConsentApproval data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("Delete/{caseId}/{documentId}/{companyId}")]
        public HttpResponseMessage Delete(int caseId, int documentId, int companyId)
        {
            return requestHandler.Delete(Request, caseId, documentId, companyId);
        }

        [HttpPost]
        [Route("multiupload/{caseid}/{companyid}")]
        public async Task<HttpResponseMessage> Upload(int caseid, int companyid)
        {
            if (!Request.Content.IsMimeMultipartContent("form-data"))
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            var streamProvider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(streamProvider);
            List<HttpContent> streamContent = streamProvider.Contents.ToList();
            string contenttype = streamContent.ToList().Select(p => p.Headers.ContentType).FirstOrDefault().MediaType;
            HttpResponseMessage resMessage = requestHandler.CreateGbDocObject1(Request, caseid, companyid, streamContent, sourcePath, false);
            return resMessage;
        }

        [HttpGet]
        [Route("download/{caseid}/{companyid}")]
        [AllowAnonymous] //Added TEMP, Need to be reomoved
        public void DownloadConsent(int caseid, int companyid, bool download = true)
        {
            string filepath = requestHandler.Download(Request, caseid, companyid);

            FileInfo fileInfo = new System.IO.FileInfo(filepath);

            //HttpContext.Current.Response.ContentType = "application/octet-stream";
            HttpContext.Current.Response.ContentType = "application/pdf";

            if (download == true)
            {
                HttpContext.Current.Response.AddHeader("Content-Disposition", String.Format("attachment;filename=\"{0}\"", fileInfo.Name));
            }

            HttpContext.Current.Response.AddHeader("Content-Length", fileInfo.Length.ToString());
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
            HttpContext.Current.Response.WriteFile(filepath);
            //HttpContext.Current.Response.BinaryWrite(btFile);
            HttpContext.Current.Response.End();
            if (File.Exists(filepath)) File.Delete(filepath);
        }

        [HttpPost]
        [Route("uploadsignedconsent")]
        public HttpResponseMessage GetElectronicSignedConsent([FromBody]CompanyCaseConsentBase64 data)
        {
            #region comment
            /*if (!Request.Content.IsMimeMultipartContent("form-data"))
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            var streamProvider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(streamProvider);
            List<HttpContent> streamContent = streamProvider.Contents.ToList();
            string filename = "";

            foreach (HttpContent content in streamContent)
            {
                using (Stream stream = content.ReadAsStreamAsync().Result)
                {
                    filename = sourcePath + "/" + content.Headers.ContentDisposition.FileName.Replace("\"", string.Empty);
                    stream.Seek(0, SeekOrigin.Begin);
                    FileStream filestream = File.Create(sourcePath + "/" + content.Headers.ContentDisposition.FileName.Replace("\"", string.Empty));
                    stream.CopyTo(filestream);
                    stream.Close();
                    filestream.Close();
                }
            }*/
            #endregion

            object response = requestHandler1.DownloadSignedConsent(Request, data);
            if (!(typeof(BusinessObjects.ErrorObject) == response.GetType()))
            {
                //if (response != null)
                //{
                //    FileInfo fileInfo = new System.IO.FileInfo(response.ToString());

                //    HttpContext.Current.Response.ContentType = "application/octet-stream";
                //    HttpContext.Current.Response.AddHeader("Content-Disposition", String.Format("attachment;filename=\"{0}\"", fileInfo.Name));
                //    HttpContext.Current.Response.AddHeader("Content-Length", fileInfo.Length.ToString());
                //    HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
                //    HttpContext.Current.Response.WriteFile(response.ToString());
                //    //HttpContext.Current.Response.BinaryWrite(btFile);
                //    HttpContext.Current.Response.End();

                return Request.CreateResponse(HttpStatusCode.OK, response);
                //}
                //else
                //    return Request.CreateResponse(HttpStatusCode.BadRequest, response);
            }
            else
                return Request.CreateResponse(HttpStatusCode.BadRequest, response);
        }
    }
}
