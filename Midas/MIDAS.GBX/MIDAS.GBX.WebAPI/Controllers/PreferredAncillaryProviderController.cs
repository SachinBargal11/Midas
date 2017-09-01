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
    [Authorize]
    public class PreferredAncillaryProviderController : ApiController
    {
        private IRequestHandler<PreferredAncillarProviderSignUp> requestHandler;

        public PreferredAncillaryProviderController()
        {
            requestHandler = new GbApiRequestHandler<PreferredAncillarProviderSignUp>();
        }

        //[HttpGet]
        //[Route("associateMedicalProviderWithCompany/{PrefMedProviderId}/{CompanyId}")]
        //public HttpResponseMessage AssociateMedicalProviderWithCompany(int PrefMedProviderId, int CompanyId)
        //{
        //    return requestHandler.AssociateMedicalProviderWithCompany(Request, PrefMedProviderId, CompanyId);
        //}

        //[HttpGet]
        //[Route("getAllMedicalProviderExcludeAssigned/{CompanyId}")]
        //public HttpResponseMessage GetAllMedicalProviderExcludeAssigned(int CompanyId)
        //{
        //    return requestHandler.GetAllMedicalProviderExcludeAssigned(Request, CompanyId);
        //}

        //[HttpGet]
        //[Route("get/{Id}")]
        //public HttpResponseMessage Get(int Id)
        //{
        //    return requestHandler.GetObject(Request, Id);
        //}

        //[HttpGet]
        //[Route("getByCompanyId/{CompanyId}")]
        ////[AllowAnonymous]
        //public HttpResponseMessage GetByCompanyId(int CompanyId)
        //{
        //    return requestHandler.GetGbObjects(Request, CompanyId);
        //}

        //[HttpGet]
        //[Route("getByPrefMedProviderId/{PrefMedProviderId}")]
        ////[AllowAnonymous]
        //public HttpResponseMessage GetByPrefMedProviderId(int PrefMedProviderId)
        //{
        //    return requestHandler.GetByPrefMedProviderId(Request, PrefMedProviderId);
        //}

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

