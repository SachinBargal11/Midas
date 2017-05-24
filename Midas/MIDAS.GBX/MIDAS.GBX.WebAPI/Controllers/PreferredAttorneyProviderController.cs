using MIDAS.GBX.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/PreferredAttorneyProvider")]

    public class PreferredAttorneyProviderController : ApiController
    {
        private IRequestHandler<PreferredAttorneyProviderSignUp> requestHandler;

        public PreferredAttorneyProviderController()
        {
            requestHandler = new GbApiRequestHandler<PreferredAttorneyProviderSignUp>();
        }

        [HttpPost]
        [Route("save")]
        //[AllowAnonymous]
        public HttpResponseMessage Post([FromBody]PreferredAttorneyProviderSignUp data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("associatePrefAttorneyProviderWithCompany/{PrefAttorneyProviderId}/{CompanyId}")]
        public HttpResponseMessage AssociatePrefAttorneyProviderWithCompany(int PrefAttorneyProviderId, int CompanyId)
        {
            return requestHandler.AssociatePrefAttorneyProviderWithCompany(Request, PrefAttorneyProviderId, CompanyId);
        }

        [HttpGet]
        [Route("getAllPrefAttorneyProviderExcludeAssigned/{CompanyId}")]
        public HttpResponseMessage GetAllPrefAttorneyProviderExcludeAssigned(int CompanyId)
        {
            return requestHandler.GetAllPrefAttorneyProviderExcludeAssigned(Request, CompanyId);
        }

        [HttpGet]
        [Route("getPrefAttorneyProviderByCompanyId/{CompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetPrefAttorneyProviderByCompanyId(int CompanyId)
        {
            return requestHandler.GetPrefAttorneyProviderByCompanyId(Request, CompanyId);
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

