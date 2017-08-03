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
     [RoutePrefix("midaspatientapi/PendingReferral")]

    public class PendingReferralController : ApiController
    {
        private IRequestHandler<PendingReferral> requestHandler;

        public PendingReferralController()
        {
            requestHandler = new GbApiRequestHandler<PendingReferral>();
        }

        [HttpGet]
        [Route("getByPatientVisitId/{patientVisitId}")]
        public HttpResponseMessage GetByPatientVisitId(int patientVisitId)
        {
            return requestHandler.GetByPatientVisitId(Request, patientVisitId);
        }

        [HttpGet]
        [Route("getByPatientVisitIdWithProcedureCodes/{patientVisitId}")]
        public HttpResponseMessage GetByPatientVisitIdWithProcedureCodes(int patientVisitId)
        {
            return requestHandler.GetByPatientVisitIdWithProcedureCodes(Request, patientVisitId);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
