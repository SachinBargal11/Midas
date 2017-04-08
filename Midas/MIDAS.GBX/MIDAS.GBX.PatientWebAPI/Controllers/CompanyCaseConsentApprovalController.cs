using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MIDAS.GBX.PatientWebAPI.RequestHandler;
using MIDAS.GBX.BusinessObjects;
using System.IO;
using System.Configuration;
using System.Web;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{
    [RoutePrefix("midaspatientapi/CompanyCaseConsentApproval")]

    public class CompanyCaseConsentApprovalController : ApiController
    {
        private IRequestHandler<CompanyCaseConsentApproval> requestHandler;

        public CompanyCaseConsentApprovalController()
        {
            requestHandler = new GbApiRequestHandler<CompanyCaseConsentApproval>();
        }

        [HttpGet]
        [Route("get/{id}")]
        [AllowAnonymous]
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
        [AllowAnonymous]
        public HttpResponseMessage GetByCaseId(int CaseId)
        {
            return requestHandler.GetByCaseId(Request, CaseId);
        }

        [HttpPost]
        [Route("Save")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]CompanyCaseConsentApproval data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpPost]
        [Route("saveDoctor")]
        [AllowAnonymous]
        public HttpResponseMessage SaveDoctor([FromBody]CompanyCaseConsentApproval data)
        {
            return requestHandler.SaveDoctor(Request, data);
        }


        [HttpGet]
        [Route("Delete/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }

        [HttpGet]
        [Route("download/{caseid}/{companyid}")]
        [AllowAnonymous]
        public void DownloadConsent(int caseid, int companyid)
        {
            string filepath = requestHandler.Download(Request, caseid, companyid);
            
            FileInfo fileInfo = new System.IO.FileInfo(filepath);

            HttpContext.Current.Response.ContentType = "application/octet-stream";
            HttpContext.Current.Response.AddHeader("Content-Disposition", String.Format("attachment;filename=\"{0}\"", fileInfo.Name));
            HttpContext.Current.Response.AddHeader("Content-Length", fileInfo.Length.ToString());
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
            HttpContext.Current.Response.WriteFile(filepath);
            //HttpContext.Current.Response.BinaryWrite(btFile);
            HttpContext.Current.Response.End();
            if (File.Exists(filepath)) File.Delete(filepath);
        }
    }
}
