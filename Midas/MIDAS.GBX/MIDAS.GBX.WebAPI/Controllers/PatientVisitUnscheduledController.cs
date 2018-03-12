using MIDAS.GBX.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/patientVisitUnscheduled")]
    public class PatientVisitUnscheduledController : ApiController
    {
        private IRequestHandler<PatientVisitUnscheduled> requestHandler;
        private IRequestHandler<ReferralVisitUnscheduled> requestHandlerReferralVisitUnscheduled;

        public PatientVisitUnscheduledController()
        {
            requestHandler = new GbApiRequestHandler<PatientVisitUnscheduled>();
            requestHandlerReferralVisitUnscheduled = new GbApiRequestHandler<ReferralVisitUnscheduled>();
        }

        [HttpPost]
        [Route("Save")]
        public HttpResponseMessage Post([FromBody]PatientVisitUnscheduled data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("getByCaseId/{CaseId}")]
        public HttpResponseMessage GetByCaseId(int CaseId)
        {
            return requestHandler.GetByCaseId(Request, CaseId);
        }

        [HttpGet]
        [Route("get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request,id);
        }

        [HttpPost]
        [Route("saveReferralPatientVisitUnscheduled")]
        public HttpResponseMessage SaveReferralPatientVisitUnscheduled([FromBody]ReferralVisitUnscheduled data)
        {
            return requestHandlerReferralVisitUnscheduled.SaveReferralPatientVisitUnscheduled(Request, data);
        }

        [HttpGet]
        [Route("getReferralPatientVisitUnscheduledByCompanyId/{companyId}")]
        public HttpResponseMessage GetReferralPatientVisitUnscheduledByCompanyId(int companyId)
        {
            return requestHandler.GetReferralPatientVisitUnscheduledByCompanyId(Request, companyId);
        }

        [HttpGet]
        [Route("getPatientVisitUnscheduledByCompanyId/{companyId}")]
        public HttpResponseMessage GetPatientVisitUnscheduledByCompanyId(int companyId)
        {
            return requestHandler.GetPatientVisitUnscheduledByCompanyId(Request, companyId);
        }
    }
}
