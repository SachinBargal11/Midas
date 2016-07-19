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
    [RoutePrefix("midasapi/User")]
    public class UserController : ApiController
    {
        private IRequestHandler<User> requestHandler;

        public UserController()
        {
            requestHandler = new GbApiRequestHandler<User>();
        }


        // GET: api/User
        // get all Users that the current user has access to
        /// <summary>
        /// GetAllUser
        /// </summary>
        /// <returns></returns>
        [Route("GetAllUsers")]
        public HttpResponseMessage Get([FromBody]User User)
        {
            List<EntitySearchParameter> searchParams = new List<EntitySearchParameter>();
            return requestHandler.GetGbObjects(Request, User, searchParams);
        }

        // GET: api/Organizations
        [Route("GetUserByName")]
        public HttpResponseMessage Get([FromBody]User User,string name)
        {
            return requestHandler.GetGbObjectByName(Request, User,name);
        }

        // GET: api/Organizations/5
        [Route("GetUserByID")]
        [AllowAnonymous]
        public HttpResponseMessage Get(int id, [FromBody]User User)
        {
            User = new User();
            return requestHandler.GetGbObjectById(Request, User, id);
        }

        // POST: api/Organizations
        [Route("AddUser")]
        public HttpResponseMessage Post([FromBody]User User)
        {
            return requestHandler.CreateGbObject(Request, User);
        }

        // PUT: api/Organizations/5
        [Route("UpdateUser")]
        public HttpResponseMessage Put(int id, [FromBody]User User)
        {
            return requestHandler.UpdateGbObject(Request, User);
        }

        // DELETE: api/Organizations/id={organizationId}
        [HttpGet]
        [Route("DeleteUser")]
        [AllowAnonymous]
        public HttpResponseMessage Delete([FromBody]User User,int id)
        {
            return requestHandler.DeleteGbObject(Request, User, id);
        }

        [HttpGet]
        [Route("Login")]
        [AllowAnonymous]
        public HttpResponseMessage Login(string UserName, [FromBody]User User,string Password)
        {
            return requestHandler.ValidateUniqueName(Request, User, Password);
        }

        // Unique Name Validation
        [HttpGet]
        [Route("IsUnique")]
        public HttpResponseMessage IsUnique([FromBody]User User,string name)
        {
            return requestHandler.ValidateUniqueName(Request, User, name);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
