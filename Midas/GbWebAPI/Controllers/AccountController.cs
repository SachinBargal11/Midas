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
    [RoutePrefix("midasapi/Account")]
    public class AccountController : ApiController
    {
        private IRequestHandler<Account> requestHandler;

        public AccountController()
        {
            requestHandler = new GbApiRequestHandler<Account>();
        }

        // GET: api/Organizations/5
        [HttpGet]
        [Route("Get")]
        [AllowAnonymous]
        public HttpResponseMessage Get([FromBody]Account account)
        {
            return requestHandler.GetObject(Request, account);
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
        public HttpResponseMessage Put([FromBody]Account account)
        {
            return requestHandler.UpdateGbObject(Request, account);
        }

        // DELETE: api/Organizations/id={organizationId}
        [HttpDelete]
        [Route("Delete")]
        [AllowAnonymous]
        public HttpResponseMessage Delete([FromBody]Account account)
        {
            return requestHandler.DeleteGbObject(Request, account);
        }

        // Unique Name Validation
        [HttpPost]
        [Route("IsUnique")]
        [AllowAnonymous]
        public HttpResponseMessage IsUnique([FromBody]Account account)
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

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
