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
    [RoutePrefix("midaspatientapi/PatientPriorAccidentInjury")]
    public class PatientPriorAccidentInjuryController : ApiController
    {
        private IRequestHandler<PatientPriorAccidentInjury> requestHandler;

        public PatientPriorAccidentInjuryController()
        {
            requestHandler = new GbApiRequestHandler<PatientPriorAccidentInjury>();
        }

        [HttpGet]
        [Route("getByCaseId/{CaseId}")]
        public HttpResponseMessage GetByCaseId(int CaseId)
        {
            return requestHandler.GetByCaseId(Request, CaseId);
        }

        //[HttpPost]
        //[Route("save")]
        //public HttpResponseMessage Post([FromBody]PatientPriorAccidentInjury data)
        //{
        //    return requestHandler.CreateGbObject(Request, data);
        //}

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
