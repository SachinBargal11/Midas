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
using GbWebAPI.Models;
using GbWebAPI.Providers;
using GbWebAPI.Results;
using Midas.GreenBill.BusinessObject;
using Midas.GreenBill.EntityRepository;
using Newtonsoft.Json.Linq;
using BO = Midas.GreenBill.BusinessObject;
using System.Web.Http.Cors;

namespace Midas.GreenBill.Api
{
    [Authorize]
    [RoutePrefix("midasapi/ProviderMedicalFacility")]
    public class ProviderMedicalFacilityController : ApiController
    {
        private IRequestHandler<ProviderMedicalFacility> requestHandler;

        public ProviderMedicalFacilityController()
        {
            requestHandler = new GbApiRequestHandler<ProviderMedicalFacility>();
        }

        // GET: api/Organizations/5
        [HttpPost]
        [Route("Get")]
        [AllowAnonymous]
        public HttpResponseMessage Get([FromBody]ProviderMedicalFacility pmf)
        {
            return requestHandler.GetObject(Request, pmf);
        }

        // POST: api/Organizations
        [HttpPost]
        [Route("Add")]
        [AllowAnonymous]
        public HttpResponseMessage Post(JObject data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        // PUT: api/Organizations/5
        [Route("Update")]
        [HttpPut]
        [AllowAnonymous]
        public HttpResponseMessage Put([FromBody]ProviderMedicalFacility pmf)
        {
            return requestHandler.UpdateGbObject(Request, pmf);
        }

        // DELETE: api/Organizations/id={organizationId}
        [HttpDelete]
        [Route("Delete")]
        [AllowAnonymous]
        public HttpResponseMessage Delete([FromBody]ProviderMedicalFacility pmf)
        {
            return requestHandler.DeleteGbObject(Request, pmf);
        }

        // Unique Name Validation
        [HttpPost]
        [Route("IsUnique")]
        [AllowAnonymous]
        public HttpResponseMessage IsUnique([FromBody]ProviderMedicalFacility pmf)
        {
            return requestHandler.ValidateUniqueName(Request, pmf);
        }


        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}



//ProviderMedicalFacilityController