using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using MIDAS.GBX.PatientWebAPI.RequestHandler;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{
    [RoutePrefix("midaspatientapi/PatientEmpInfo")]
    public class PatientEmpInfoController : ApiController
    {
        private IRequestHandler<PatientEmpInfo> requestHandler;

        public PatientEmpInfoController()
        {
            requestHandler = new GbApiRequestHandler<PatientEmpInfo>();
        }
        
        [HttpGet]
        [Route("get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }        

        [HttpGet]
        [Route("getByCaseId/{caseId}")]
        public HttpResponseMessage GetByCaseId(int caseId)
        {
            return requestHandler.GetByCaseId(Request, caseId);
        }

        [HttpPost]
        [Route("save")]
        public HttpResponseMessage Post([FromBody]PatientEmpInfo data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("Delete/{id}")]
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