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


        // GET: api/Account
        // get all accounts that the current user has access to
        /// <summary>
        /// GetAllAccount
        /// </summary>
        /// <returns></returns>
        [Route("GetAllAccounts")]
        [AllowAnonymous]
        public HttpResponseMessage Get([FromBody]Account account)
        {
            List<EntitySearchParameter> searchParams = new List<EntitySearchParameter>();
            EntitySearchParameter par1 = new EntitySearchParameter();
            par1.id = 1;
            par1.type= typeof(Account);
            searchParams.Add(par1);
            account = new Account();
            return requestHandler.GetGbObjects(Request, account, searchParams);
        }

        // GET: api/Organizations
        [Route("GetAccountByName")]
        [AllowAnonymous]
        public HttpResponseMessage Get([FromBody]Account account,string name)
        {
            return requestHandler.GetGbObjectByName(Request, account, name);
        }

        // GET: api/Organizations/5
        [HttpGet]
        [Route("GetAccount")]
        [AllowAnonymous]
        public HttpResponseMessage Get(int id, [FromBody]Account account)
        {
            account = new Account();
            return requestHandler.GetGbObjectById(Request, account, id);
        }

        // POST: api/Organizations
        [HttpPost]
        [Route("AddAccount")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]Account account)
        {
            return requestHandler.CreateGbObject(Request, account);
        }

        // PUT: api/Organizations/5
        [Route("UpdateAccount")]
        public HttpResponseMessage Put(int id, [FromBody]Account account)
        {
            return requestHandler.UpdateGbObject(Request, account);
        }

        // DELETE: api/Organizations/id={organizationId}
        [HttpGet]
        [Route("DeleteAccount")]
        [AllowAnonymous]
        public HttpResponseMessage Delete([FromBody]Account account,int id)
        {
            return requestHandler.DeleteGbObject(Request, account, id);
        }

        // Unique Name Validation
        [HttpGet]
        [Route("IsUnique")]
        public HttpResponseMessage IsUnique([FromBody]Account account,string name)
        {
            return requestHandler.ValidateUniqueName(Request, account,name);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
