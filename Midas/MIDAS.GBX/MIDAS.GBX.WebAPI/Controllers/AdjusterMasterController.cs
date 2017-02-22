using MIDAS.GBX.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/AdjusterMaster")]

      public class AdjusterMasterController : ApiController
    {
        private IRequestHandler<AdjusterMaster> requestHandler;

        public AdjusterMasterController()
        {
            requestHandler = new GbApiRequestHandler<AdjusterMaster>();
        }

        // GET: api/Organizations/5
        [HttpGet]
        [Route("get/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByCompanyId/{CompanyId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByCompanyId(int CompanyId)
        {
            return requestHandler.GetGbObjects(Request, CompanyId);
        }

        [HttpGet]
        [Route("getByInsuranceMasterId/{InsuranceMasterId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByInsuranceMasterId(int InsuranceMasterId)
        {
            return requestHandler.GetgbObjects(Request, InsuranceMasterId);
        }

        [HttpGet]
        [Route("getAll")]
        [AllowAnonymous]
        public HttpResponseMessage Get([FromBody]AdjusterMaster data)
        {
            return requestHandler.GetGbObjects(Request, data);
        }

        [HttpPost]
        [Route("save")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]AdjusterMaster data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("delete/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage DeleteById(int id)
        {
            return requestHandler.DeleteById(Request, id);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
