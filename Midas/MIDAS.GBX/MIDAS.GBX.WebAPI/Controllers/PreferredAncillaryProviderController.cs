using MIDAS.GBX.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/PreferredAncillaryProvider")]
    public class PreferredAncillaryProviderController : ApiController
    {
        private IRequestHandler<PreferredAncillarProviderSignUp> requestHandler;

        public PreferredAncillaryProviderController()
        {
            requestHandler = new GbApiRequestHandler<PreferredAncillarProviderSignUp>();
        }        

        [HttpPost]
        [Route("save")]
        public HttpResponseMessage Post([FromBody]PreferredAncillarProviderSignUp data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }
        
        [HttpPost]
        [Route("updateMedicalProvider")]
        public HttpResponseMessage UpdateMedicalProvider([FromBody]PreferredAncillarProviderSignUp data)
        {
            return requestHandler.UpdateMedicalProvider(Request, data);
        }

        [HttpGet]
        [Route("getAllPrefAncillaryProviderExcludeAssigned/{CompanyId}")]
        public HttpResponseMessage GetAllPrefAncillaryProviderExcludeAssigned(int CompanyId)
        {
          
            return requestHandler.GetAllPrefAncillaryProviderExcludeAssigned(Request, CompanyId);
        }

        [HttpGet]
        [Route("getPrefAncillaryProviderByCompanyId/{CompanyId}")]
        public HttpResponseMessage GetPrefAncillaryProviderByCompanyId(int CompanyId)
        {
            return requestHandler.GetPrefAncillaryProviderByCompanyId(Request, CompanyId);
        }

        [HttpGet]
        [Route("associateAncillaryProviderWithCompany/{PrefAncillaryProviderId}/{CompanyId}")]
        public HttpResponseMessage AssociateAncillaryProviderWithCompany(int PrefAncillaryProviderId, int CompanyId)
        {
            return requestHandler.AssociateAncillaryProviderWithCompany(Request, PrefAncillaryProviderId, CompanyId);            
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

