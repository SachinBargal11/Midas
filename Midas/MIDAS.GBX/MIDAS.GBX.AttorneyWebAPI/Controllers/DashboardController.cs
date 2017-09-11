using MIDAS.GBX.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.AttorneyWebAPI.Controllers
{
    [RoutePrefix("midasapi/dashboard")]
    public class DashboardController : ApiController
    {
        private IRequestHandler<AttorneyVisit> requestHandler;

        public DashboardController()
        {
            requestHandler = new GbApiRequestHandler<AttorneyVisit>();
        }

        [HttpGet]
        [Route("getAttorneyVisitForDateByCompanyId/{forDate}/{companyId}")]
        public HttpResponseMessage GetAttorneyVisitForDateByCompanyId(DateTime forDate, int companyId)
        {
            return requestHandler.GetAttorneyVisitForDateByCompanyId(Request, forDate, companyId);
        }
    }
}
