using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/Case")]

    public class CaseController : ApiController
    {
        private IRequestHandler<Case> requestHandler;

        public CaseController()
        {
            requestHandler = new GbApiRequestHandler<Case>();
        }

        // GET: api/Organizations/5
        [HttpGet]
        [Route("Get/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }


        [HttpGet]
        [Route("getByPatientId/{PatientId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByPatientId(int PatientId)
        {
            return requestHandler.GetByPatientId(Request, PatientId);
        }

        [HttpGet]
        [Route("getByCompanyId/{CompanyId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByCompanyId(int CompanyId)
        {
            return requestHandler.GetGbObjects(Request, CompanyId);
        }

        [HttpPost]
        [Route("Save")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]Case data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpPost]
        [Route("addUploadedFileData")]
        [AllowAnonymous]
        public HttpResponseMessage AddUploadedFileData(int id, string FileUploadPath)
        {
            return requestHandler.AddUploadedFileData(Request, id, FileUploadPath);
        }


        [HttpGet]
        //[HttpDelete]
        [Route("Delete/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}