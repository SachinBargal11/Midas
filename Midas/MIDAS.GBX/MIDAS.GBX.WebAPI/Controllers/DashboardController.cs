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
        private IRequestHandler<PatientVisit> requestHandler;

        public DashboardController()
        {
            requestHandler = new GbApiRequestHandler<PatientVisit>();
        }

        [HttpGet]
        [Route("getPatientVisitForDateByLocationId/{forDate}/{locationId}")]
        public HttpResponseMessage GetPatientVisitForDateByLocationId(DateTime forDate, int locationId)
        {
            return requestHandler.GetPatientVisitForDateByLocationId(Request, forDate, locationId);
        }

        [HttpGet]
        [Route("getDoctorPatientVisitForDateByLocationId/{forDate}/{doctorId}/{locationId}")]
        public HttpResponseMessage GetDoctorPatientVisitForDateByLocationId(DateTime forDate, int doctorId, int locationId)
        {
            return requestHandler.GetDoctorPatientVisitForDateByLocationId(Request, forDate, doctorId, locationId);
        }

        [HttpGet]
        [Route("getStatisticalDataOnPatientVisit/{fromDate}/{toDate}/{companyId}")]
        public HttpResponseMessage GetStatisticalDataOnPatientVisit(DateTime fromDate, DateTime toDate, int companyId)
        {
            return requestHandler.GetStatisticalDataOnPatientVisit(Request, fromDate, toDate, companyId);
        }

        [HttpGet]
        [Route("getOpenAppointmentSlotsForDoctorByCompanyId/{forDate}/{doctorId}/{companyId}")]
        public HttpResponseMessage GetOpenAppointmentSlotsForDoctorByCompanyId(DateTime forDate, int doctorId, int companyId)
        {
            return requestHandler.GetOpenAppointmentSlotsForDoctorByCompanyId(Request, forDate, doctorId, companyId);
        }
    }
}
