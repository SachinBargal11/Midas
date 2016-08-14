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
using GbWebAPI.Results;
using Midas.GreenBill.BusinessObject;
using Midas.GreenBill.EntityRepository;
using Newtonsoft.Json.Linq;
using System.Web.Http.Cors;

namespace Midas.GreenBill.Api
{
    [Authorize]
    [RoutePrefix("midasapi/MedicalFacility")]
    public class MedicalFacilityController : ApiController
    {
        private IRequestHandler<MedicalFacility> requestHandler;

        public MedicalFacilityController()
        {
            requestHandler = new GbApiRequestHandler<MedicalFacility>();
        }

        // GET: api/Organizations/5
        [HttpPost]
        [Route("Get")]
        [AllowAnonymous]
        public HttpResponseMessage Get([FromBody]MedicalFacility medicalfacility)
        {
            return requestHandler.GetObject(Request, medicalfacility);
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
        public HttpResponseMessage Put([FromBody]MedicalFacility medicalfacility)
        {
            return requestHandler.UpdateGbObject(Request, medicalfacility);
        }

        // DELETE: api/Organizations/id={organizationId}
        [HttpDelete]
        [Route("Delete")]
        [AllowAnonymous]
        public HttpResponseMessage Delete([FromBody]MedicalFacility medicalfacility)
        {
            return requestHandler.DeleteGbObject(Request, medicalfacility);
        }

        // Unique Name Validation
        [HttpPost]
        [Route("IsUnique")]
        [AllowAnonymous]
        public HttpResponseMessage IsUnique([FromBody]MedicalFacility medicalfacility)
        {
            return requestHandler.ValidateUniqueName(Request, medicalfacility);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
