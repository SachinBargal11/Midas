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

        [HttpGet]
        [Route("getByCompanyAndAttorneyId/{companyId}/{attorneyId}")]
        public HttpResponseMessage GetByCompanyAndAttorneyId(int companyId, int attorneyId)
        {
            return requestHandler.GetByCompanyAndAttorneyId(Request, companyId, attorneyId);
        }


        [HttpGet]
        [Route("get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByCaseId/{caseId}")]
        public HttpResponseMessage GetByCaseId(int caseId)
        {
            return requestHandler.GetByCaseId(Request, caseId);
        }

        //[HttpGet]
        //[Route("getByLocationAndAttorneyId/{locationId}/{attorneyId}")]
        //public HttpResponseMessage GetByLocationAndAttorneyId(int locationId, int attorneyId)
        //{
        //    return requestHandler.GetByLocationAndAttorneyId(Request, locationId, attorneyId);
        //}
    }
}
