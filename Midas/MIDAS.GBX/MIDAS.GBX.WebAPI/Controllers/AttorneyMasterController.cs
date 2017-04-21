using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/AttorneyMaster")]

    public class AttorneyMasterController : ApiController
    {
        private IRequestHandler<AttorneyMaster> requestHandler;

        public AttorneyMasterController()
        { requestHandler = new GbApiRequestHandler<AttorneyMaster>(); }

        // GET: api/getAttornyById/
        [HttpGet]
        [Route("getAll/")]
        [AllowAnonymous]
        public HttpResponseMessage GetAllAttornies()
        { return requestHandler.GetObjects(Request); }

        // GET: api/getAttornyById/
        [HttpGet]
        [Route("get/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Get(int id)
        { return requestHandler.GetObject(Request, id); }

        // GET: api/getAttornyByCompanyId/
        [HttpGet]
        [Route("getByCompanyId/{CompanyId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByCompanyId(int CompanyId)
        { return requestHandler.GetGbObjects(Request, CompanyId); }

        
        [HttpGet]
        [Route("getAllExcludeCompany/{CompanyId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetAllExcludeCompany(int CompanyId)
        { return requestHandler.GetAllExcludeCompany(Request, CompanyId); }


        // GET: api/getAttornyByCompanyId/
        [HttpPost]
        [Route("save")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]AttorneyMaster data)
        { return requestHandler.CreateGbObject(Request, data); }

        [HttpGet]
        [Route("Delete/{id}")]
        public HttpResponseMessage Delete(int id)
        { return requestHandler.Delete(Request, id); }

        protected override void Dispose(bool disposing) { base.Dispose(disposing); }
    }
}