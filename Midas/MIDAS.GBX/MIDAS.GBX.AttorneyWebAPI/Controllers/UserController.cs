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

namespace MIDAS.GBX.AttorneyWebAPI.Controllers
{
    [RoutePrefix("midasattorneyapi/User")]
    public class UserController : ApiController
    {

        private IRequestHandler<User> requestHandler;
        private IRequestHandler<AddUser> adduserrequestHandler;
        public UserController()
        {
            requestHandler = new GbApiRequestHandler<User>();
            adduserrequestHandler = new GbApiRequestHandler<AddUser>();
        }

        [HttpPost]
        [Route("GetByUserName")]
        [Route("GetAll")]

        public HttpResponseMessage Get([FromBody]User data)
        {
            return requestHandler.GetGbObjects(Request, data);
        }

        [HttpGet]
        [Route("Get/{id}")]

        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpPost]
        [Route("Add")]
        public HttpResponseMessage Post([FromBody]AddUser data)
        {
            return adduserrequestHandler.CreateGbObject(Request, data);
        }

        [Route("Update")]
        [HttpPut]
        public HttpResponseMessage Put([FromBody]User User)
        {
            return requestHandler.UpdateGbObject(Request, User);
        }

        [HttpDelete]
        [Route("Delete")]
        public HttpResponseMessage Delete([FromBody]User User)
        {
            return requestHandler.DeleteGbObject(Request, User);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }

        [HttpPost]
        [Route("Signin")]
        public HttpResponseMessage Signin([FromBody]User user)
        {
            if (user != null)
            {
                //Since the API should only validate for Staff Users.
                //Rest all other even if valid are not Authorised.
                // user.UserType = GBEnums.UserType.Attorney;
                 user.UserType = GBEnums.UserType.Staff;
            }

            return requestHandler.Login(Request, user);
        }

        [HttpGet]
        [Route("IsUnique")]
        public HttpResponseMessage IsUnique([FromBody]User User)
        {
            return requestHandler.ValidateUniqueName(Request, User);
        }

        [HttpGet]
        [Route("IsExisting/{user}")]
        public HttpResponseMessage IsExisting(string User)
        {
            return requestHandler.GetObjects(Request, User);
        }

        [HttpPost]
        [Route("ResetPassword")]
        [AllowAnonymous]
        public HttpResponseMessage ResetPassword([FromBody]AddUser data)
        {
            return adduserrequestHandler.ResetPassword(Request, data);
        }

        [HttpPost]
        [Route("SigninWithUserName")]
        public HttpResponseMessage SigninWithUserName([FromBody]User user)
        {
            if (user != null)
            {
                //Since the API should only validate for Patient Users.
                //Rest all other even if valid are not Authorised.
                //user.UserType = GBEnums.UserType.Attorney;
                user.UserType = GBEnums.UserType.Staff;

            }

            return requestHandler.LoginWithUserName(Request, user);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
