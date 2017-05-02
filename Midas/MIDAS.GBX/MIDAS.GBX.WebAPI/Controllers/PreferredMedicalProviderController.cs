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
        private IRequestHandler<PreferredMedicalProvider> requestHandler;

        public PreferredMedicalProviderController()
        {
            requestHandler = new GbApiRequestHandler<PreferredMedicalProvider>();
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
        [Route("Get/{CompanyId}")]
        public HttpResponseMessage Get(int CompanyId)
        {
            return requestHandler.GetObject(Request, CompanyId);
        }


        [HttpPost]
        [Route("Save")]
        public HttpResponseMessage Post([FromBody]PreferredMedicalProvider data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}

