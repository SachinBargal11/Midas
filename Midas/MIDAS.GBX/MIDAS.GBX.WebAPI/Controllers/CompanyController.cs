using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/Company")]
    [AllowAnonymous]
    public class CompanyController : ApiController
    {
        private IRequestHandler<Company> requestHandler;

        public CompanyController()
        {
            requestHandler = new GbApiRequestHandler<Company>();
        }

        // GET: api/Organizations/5
        [HttpGet]
        [Route("Get/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("GetAll")]
        [AllowAnonymous]
        public HttpResponseMessage Get(JObject data)
        {
            return requestHandler.GetGbObjects(Request, data);
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
        public HttpResponseMessage Put([FromBody]Company account)
        {
            return requestHandler.UpdateGbObject(Request, account);
        }

        // DELETE: api/Organizations/id={organizationId}
        [HttpDelete]
        [Route("Delete")]
        [AllowAnonymous]
        public HttpResponseMessage Delete([FromBody]Company account)
        {
            return requestHandler.DeleteGbObject(Request, account);
        }

        // Unique Name Validation
        [HttpPost]
        [Route("IsUnique")]
        [AllowAnonymous]
        public HttpResponseMessage IsUnique([FromBody]Company account)
        {
            return requestHandler.ValidateUniqueName(Request, account);
        }

        [HttpPost]
        [Route("Signup")]
        [AllowAnonymous]
        public HttpResponseMessage Signup(JObject data)
        {
            return requestHandler.SignUp(Request, data);
        }

        [HttpPost]
        [Route("ValidateInvitation")]
        [AllowAnonymous]
        public HttpResponseMessage ValidateInvitation(JObject data)
        {
            return requestHandler.ValidateInvitation(Request, data);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}