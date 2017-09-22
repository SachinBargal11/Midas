using MIDAS.GBX.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.AttorneyWebAPI.Controllers
{
    [RoutePrefix("midasattorneyapi/dashboard")]
    public class DashboardController : ApiController
    {
        private IRequestHandler<AttorneyVisit> requestHandlerAttorneyVisit;
        private IRequestHandler<Case> requestHandlerCase;

        public DashboardController()
        {
            requestHandlerAttorneyVisit = new GbApiRequestHandler<AttorneyVisit>();
            requestHandlerCase = new GbApiRequestHandler<Case>();
        }

        [HttpGet]
        [Route("getAttorneyVisitForDateByCompanyId/{forDate}/{companyId}")]
        public HttpResponseMessage GetAttorneyVisitForDateByCompanyId(DateTime forDate, int companyId)
        {
            return requestHandlerAttorneyVisit.GetAttorneyVisitForDateByCompanyId(Request, forDate, companyId);
        }

        [HttpGet]
        [Route("getStatisticalDataOnCaseByCaseType/{fromDate}/{toDate}/{companyId}")]
        public HttpResponseMessage GetStatisticalDataOnCaseByCaseType(DateTime fromDate, DateTime toDate, int companyId)
        {
            return requestHandlerCase.GetStatisticalDataOnCaseByCaseType(Request, fromDate, toDate, companyId);
        }

        [HttpGet]
        [Route("getStatisticalDataOnCaseByInsuranceProvider/{fromDate}/{toDate}/{companyId}")]
        public HttpResponseMessage GetStatisticalDataOnCaseByInsuranceProvider(DateTime fromDate, DateTime toDate, int companyId)
        {
            return requestHandlerCase.GetStatisticalDataOnCaseByInsuranceProvider(Request, fromDate, toDate, companyId);
        }
    }
}
