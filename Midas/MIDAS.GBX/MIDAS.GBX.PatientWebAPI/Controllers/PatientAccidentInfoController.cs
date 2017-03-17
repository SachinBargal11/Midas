using MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.PatientWebAPI.RequestHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{
    [RoutePrefix("midaspatientapi/PatientAccidentInfo")]

    public class PatientAccidentInfoController : ApiController
    {
        private IRequestHandler<PatientAccidentInfo> requestHandler;

        public PatientAccidentInfoController()
        {
            requestHandler = new GbApiRequestHandler<PatientAccidentInfo>();
        }

        [HttpGet]
        [Route("Get/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }



        [HttpGet]
        [Route("getByCaseId/{CaseId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByCaseId(int CaseId)
        {
            return requestHandler.GetByCaseId(Request, CaseId);
        }

        //[HttpGet]
        //[Route("getCurrentAccidentByPatientId/{PatientId}")]
        //[AllowAnonymous]
        //public HttpResponseMessage GetPatientAccidentInfoByPatientId(int PatientId)
        //{
        //    return requestHandler.GetPatientAccidentInfoByPatientId(Request, PatientId);
        //}

        [HttpPost]
        [Route("save")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]PatientAccidentInfo data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
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
