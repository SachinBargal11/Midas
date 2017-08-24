using MIDAS.GBX.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.AttorneyWebAPI.Controllers
{
    [RoutePrefix("midasattorneyapi/SchoolInformation")]
    public class SchoolInformationController : ApiController
    {
        private IRequestHandler<SchoolInformation> requestHandler;

        public SchoolInformationController()
        {
            requestHandler = new GbApiRequestHandler<SchoolInformation>();
        }

        [HttpGet]
        [Route("getByCaseId/{caseId}")]
        public HttpResponseMessage GetByCaseId(int caseId)
        {
            return requestHandler.GetByCaseId(Request, caseId);
        }

        [HttpPost]
        [Route("save")]
        public HttpResponseMessage Post([FromBody]SchoolInformation data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("Delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
