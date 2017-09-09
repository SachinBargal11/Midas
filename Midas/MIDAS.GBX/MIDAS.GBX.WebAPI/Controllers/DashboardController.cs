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
        [Route("getByLocationId/{locationId}")]
        public HttpResponseMessage GetByLocationId(int locationId, DateTime forDate)
        {
            return requestHandler.GetByLocationId(Request, locationId);
        }
    }
}
