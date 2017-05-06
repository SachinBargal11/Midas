using MIDAS.GBX.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MIDAS.GBX.EntityRepository;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/Reports")]
    public class ReportsController : ApiController
    {
        private IRequestHandler<VisitReports> requestHandler;

        public ReportsController()
        {
            requestHandler = new GbApiRequestHandler<VisitReports>();
        }

        [HttpGet]
        [Route("getTotalVisitsByProvider/{companyId}/{month}")]
        public HttpResponseMessage GetTotalVisitsByProvider(int companyId, string month)
        {
            return requestHandler.GetObject(Request, companyId, month);
        }

        [HttpGet]
        [Route("getTotalVisitsByProvider/{companyId}")]
        public HttpResponseMessage GetTotalVisitsByProvider(int companyId)
        {
            return requestHandler.GetObject(Request, companyId);
        }

        [HttpGet]
        [Route("getTotalVisitsByPatient/{patientId}")]
        public HttpResponseMessage GetTotalVisitsByPatient(int patientId)
        {
            return requestHandler.GetByPatientId(Request, patientId);
        }

        [HttpGet]
        [Route("getPatientDocuments/{patientId}/{objectType}/{documentType}")]
        public HttpResponseMessage GetPatientDocuments(int patientId,string objectType,string documentType)
        {            
            return requestHandler.GetObject(Request, patientId, objectType, documentType);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
