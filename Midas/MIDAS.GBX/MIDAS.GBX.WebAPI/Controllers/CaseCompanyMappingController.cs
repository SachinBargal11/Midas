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
    [RoutePrefix("midasapi/CaseCompanyMapping")]
    [Authorize]
    public class CaseCompanyMappingController : ApiController
    {
        private IRequestHandler<CaseCompanyMapping> requestHandler;

        public CaseCompanyMappingController()
        {
            requestHandler = new GbApiRequestHandler<CaseCompanyMapping>();
        }

        [HttpGet]
        [Route("Get/{id}")]
        //[AllowAnonymous]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByCaseId/{CaseId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetByCaseId(int CaseId)
        {
            return requestHandler.GetByCaseId(Request, CaseId);
        }

        [HttpPost]
        [Route("Save")]
        //[AllowAnonymous]
        public HttpResponseMessage Post([FromBody]CaseCompanyMapping data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("Delete/{id}")]
        //[AllowAnonymous]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }

        [HttpGet]
        [Route("getByCompanyId/{CompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetByCompanyId(int CompanyId)
        {
            return requestHandler.GetGbObjects(Request, CompanyId);
        }


    }
}
