using MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.PatientWebAPI.RequestHandler;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{
    [RoutePrefix("midaspatientapi/AttorneyMaster")]
    public class AttorneyMasterController : ApiController
    {
        private IRequestHandler<AttorneyMaster> requestHandler;

        public AttorneyMasterController()
        {
            requestHandler = new GbApiRequestHandler<AttorneyMaster>();
        }

        [HttpGet]
        [Route("getAll/")]
        public HttpResponseMessage GetAllAttornies()
        {
            return requestHandler.GetObjects(Request);
        }

        [HttpGet]
        [Route("get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByCompanyId/{CompanyId}")]
        public HttpResponseMessage GetByCompanyId(int CompanyId)
        {
            return requestHandler.GetGbObjects(Request, CompanyId);
        }

        [HttpPost]
        [Route("save")]
        public HttpResponseMessage Post([FromBody]AttorneyMaster data)
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