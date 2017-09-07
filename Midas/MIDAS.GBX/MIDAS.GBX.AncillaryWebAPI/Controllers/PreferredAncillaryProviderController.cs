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

