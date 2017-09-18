using MIDAS.GBX.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/dashboard")]
    public class DashboardController : ApiController
    {
        private IRequestHandler<PatientVisit> requestHandlerPatientVisit;
        private IRequestHandler<Case> requestHandlerCase;

        public DashboardController()
        {
            requestHandlerPatientVisit = new GbApiRequestHandler<PatientVisit>();
            requestHandlerCase = new GbApiRequestHandler<Case>();
        }

        [HttpGet]
        [Route("getPatientVisitForDateByLocationId/{forDate}/{locationId}")]
        public HttpResponseMessage GetPatientVisitForDateByLocationId(DateTime forDate, int locationId)
        {
            return requestHandlerPatientVisit.GetPatientVisitForDateByLocationId(Request, forDate, locationId);
        }

        [HttpGet]
        [Route("getPatientVisitForDateByCompanyId/{forDate}/{companyId}")]
        public HttpResponseMessage GetPatientVisitForDateByCompanyId(DateTime forDate, int companyId)
        {
            return requestHandlerPatientVisit.GetPatientVisitForDateByCompanyId(Request, forDate, companyId);
        }

        [HttpGet]
        [Route("getDoctorPatientVisitForDateByLocationId/{forDate}/{doctorId}/{locationId}")]
        public HttpResponseMessage GetDoctorPatientVisitForDateByLocationId(DateTime forDate, int doctorId, int locationId)
        {
            return requestHandlerPatientVisit.GetDoctorPatientVisitForDateByLocationId(Request, forDate, doctorId, locationId);
        }

        [HttpGet]
        [Route("getDoctorPatientVisitForDateByCompanyId/{forDate}/{doctorId}/{companyId}")]
        public HttpResponseMessage GetDoctorPatientVisitForDateByCompanyId(DateTime forDate, int doctorId, int companyId)
        {
            return requestHandlerPatientVisit.GetDoctorPatientVisitForDateByCompanyId(Request, forDate, doctorId, companyId);
        }

        [HttpGet]
        [Route("getStatisticalDataOnPatientVisit/{fromDate}/{toDate}/{companyId}")]
        public HttpResponseMessage GetStatisticalDataOnPatientVisit(DateTime fromDate, DateTime toDate, int companyId)
        {
            return requestHandlerPatientVisit.GetStatisticalDataOnPatientVisit(Request, fromDate, toDate, companyId);
        }

        [HttpGet]
        [Route("getOpenAppointmentSlotsForDoctorByCompanyId/{forDate}/{doctorId}/{companyId}")]
        public HttpResponseMessage GetOpenAppointmentSlotsForDoctorByCompanyId(DateTime forDate, int doctorId, int companyId)
        {
            return requestHandlerPatientVisit.GetOpenAppointmentSlotsForDoctorByCompanyId(Request, forDate, doctorId, companyId);
        }

        [HttpGet]
        [Route("getStatisticalDataOnCaseByCaseType/{fromDate}/{toDate}/{companyId}")]
        public HttpResponseMessage GetStatisticalDataOnCaseByCaseType(DateTime fromDate, DateTime toDate, int companyId)
        {
            return requestHandlerCase.GetStatisticalDataOnCaseByCaseType(Request, fromDate, toDate, companyId);
        }
    }
}
