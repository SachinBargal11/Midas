using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.AttorneyWebAPI.Controllers
{
    [RoutePrefix("midasattorneyapi/attorneyVisit")]
    public class AttorneyVisitController : ApiController
    {
        private IRequestHandler<AttorneyVisit> requestHandler;

        public AttorneyVisitController()
        {
            requestHandler = new GbApiRequestHandler<AttorneyVisit>();
        }

        [HttpPost]
        [Route("Save")]
        public HttpResponseMessage Post([FromBody]AttorneyVisit data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }
    }
}
