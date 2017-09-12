using MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.PatientWebAPI.RequestHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{
    [RoutePrefix("midaspatientapi/AdjusterMaster")]
    public class AdjusterMasterController : ApiController
    {
        private IRequestHandler<AdjusterMaster> requestHandler;

        public AdjusterMasterController()
        {
            requestHandler = new GbApiRequestHandler<AdjusterMaster>();
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

        [HttpGet]
        [Route("getByInsuranceMasterId/{InsuranceMasterId}")]
        public HttpResponseMessage GetByInsuranceMasterId(int InsuranceMasterId)
        {
            return requestHandler.GetgbObjects(Request, InsuranceMasterId);
        }

        [HttpGet]
        [Route("getAll")]
        public HttpResponseMessage Get([FromBody]AdjusterMaster data)
        {
            return requestHandler.GetGbObjects(Request, data);
        }

        [HttpPost]
        [Route("save")]
        public HttpResponseMessage Post([FromBody]AdjusterMaster data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("delete/{id}")]
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
