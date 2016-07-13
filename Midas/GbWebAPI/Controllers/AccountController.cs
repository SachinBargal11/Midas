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
namespace Midas.GreenBill.Api
{
    [Authorize]
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private IRequestHandler<Account> requestHandler;

        public AccountController()
        {
            requestHandler = new GbApiRequestHandler<Account>();
        }


        // GET: api/Account
        // get all accounts that the current user has access to
        public HttpResponseMessage Get()
        {
            return requestHandler.GetGbObjects(Request);
        }

        // GET: api/Organizations
        public HttpResponseMessage Get(string name)
        {
            return requestHandler.GetGbObjectByName(Request, name);
        }

        // GET: api/Organizations/5
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetGbObjectById(Request, id);
        }

        // POST: api/Organizations
        public HttpResponseMessage Post([FromBody]Account account)
        {
            return requestHandler.CreateGbObject(Request, account);
        }

        // PUT: api/Organizations/5
        public HttpResponseMessage Put(int id, [FromBody]Account account)
        {
            return requestHandler.UpdateGbObject(Request, account);
        }

        // DELETE: api/Organizations/id={organizationId}
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.DeleteGbObject(Request, id);
        }

        // Unique Name Validation
        [HttpGet]
        [Route("api/Account/IsUnique")]
        public HttpResponseMessage IsUnique(string name)
        {
            return requestHandler.ValidateUniqueName(Request,name);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
