using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Linq;
using MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.AncillaryWebAPI.Controllers
{
    [RoutePrefix("midasancillaryapi/PreferredAncillaryProvider")]

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



        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}

