using MIDAS.GBX.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.AttorneyWebAPI.Controllers
{
    [RoutePrefix("midasattorneyapi/EOVisit")]
    public class EOVisitController : ApiController
    {
        private IRequestHandler<EOVisit> requestHandler;

        public EOVisitController()
        {
            requestHandler = new GbApiRequestHandler<EOVisit>();
        }

        [HttpPost]
        [Route("SaveEOVisit")]
        public HttpResponseMessage SaveEOVisit([FromBody]EOVisit data)
        {
            return requestHandler.CreateGbObject4(Request, data);
        }

        [HttpGet]
        [Route("getByCompanyId/{id}")]
        public HttpResponseMessage GetByCompanyId(int id)
        {
            return requestHandler.GetGbObjects(Request, id);
        }

        [HttpGet]
        [Route("getByCompanyAndDoctorId/{companyId}/{doctorId}")]
        public HttpResponseMessage GetByCompanyAndDoctorId(int companyId, int doctorId)
        {
            return requestHandler.GetGbObjects(Request, companyId, doctorId);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
