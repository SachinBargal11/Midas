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

    [RoutePrefix("midaspatientapi/PatientVisit")]

    public class PatientVisitController : ApiController
    {
        private IRequestHandler<PatientVisit> requestHandler;

        public PatientVisitController()
        {
            requestHandler = new GbApiRequestHandler<PatientVisit>();
        }

        [HttpGet]
        [Route("get/{id}")]
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


        [HttpPost]
        [Route("save")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]PatientVisit data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        //[HttpDelete]
        [Route("delete/{id}")]
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
