using MIDAS.GBX.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/PreferredMedicalProvider")]

    public class PreferredMedicalProviderController : ApiController
    {
        private IRequestHandler<PreferredMedicalProviderSignUp> requestHandler;

        public PreferredMedicalProviderController()
        {
            requestHandler = new GbApiRequestHandler<PreferredMedicalProviderSignUp>();
        }

        [HttpGet]
        [Route("associateMedicalProviderWithCompany/{PrefMedProviderId}/{CompanyId}")]
        public HttpResponseMessage AssociateMedicalProviderWithCompany(int PrefMedProviderId, int CompanyId)
        {
            return requestHandler.AssociateMedicalProviderWithCompany(Request, PrefMedProviderId, CompanyId);
        }

        [HttpGet]
        [Route("GetAllMedicalProviderExcludeAssigned/{CompanyId}")]
        public HttpResponseMessage GetAllMedicalProviderExcludeAssigned(int CompanyId)
        {
            return requestHandler.GetAllMedicalProviderExcludeAssigned(Request, CompanyId);
        }

        [HttpGet]
        [Route("Get/{Id}")]
        public HttpResponseMessage Get(int Id)
        {
            return requestHandler.GetObject(Request, Id);
        }


        [HttpPost]
        [Route("Save")]
        public HttpResponseMessage Post([FromBody]PreferredMedicalProviderSignUp data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}

