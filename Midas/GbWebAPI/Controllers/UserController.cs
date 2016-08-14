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
using Midas.GreenBill.DataAccessManager;
using Midas.GreenBill.Api;
using Newtonsoft.Json.Linq;
using System.Web.Http.Cors;
using TokenAuthMVC.Attributes;

namespace Midas.GreenBill.Api
{
    [RoutePrefix("midasapi/User")]
    [RESTAuthorize]
    public class UserController : ApiController
    {

        private IRequestHandler<User> requestHandler;
        public UserController()
        {
            requestHandler = new GbApiRequestHandler<User>();
        }

        [HttpPost]
        [Route("GetAll")]
        [AllowAnonymous]
        public HttpResponseMessage Get(JObject data)
        {
            return requestHandler.GetGbObjects(Request, data);
        }

        [HttpPost]
        [Route("Get")]
        [AllowAnonymous]
        public HttpResponseMessage Get([FromBody]User User)
        {
            return requestHandler.GetObject(Request, User);
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
        public HttpResponseMessage Put([FromBody]User User)
        {
            return requestHandler.UpdateGbObject(Request, User);
        }

        // DELETE: api/Organizations/id={organizationId}
        [HttpDelete]
        [Route("Delete")]
        [AllowAnonymous]
        public HttpResponseMessage Delete([FromBody]User User)
        {
            return requestHandler.DeleteGbObject(Request, User);
        }

        [HttpPost]
        [Route("Signin")]
        [RESTAuthorize]
        public HttpResponseMessage Signin(JObject data)
        {
            return requestHandler.Login(Request, data);
        }

        // Unique Name Validation
        [HttpGet]
        [Route("IsUnique")]
        public HttpResponseMessage IsUnique([FromBody]User User)
        {
            return requestHandler.ValidateUniqueName(Request, User);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
