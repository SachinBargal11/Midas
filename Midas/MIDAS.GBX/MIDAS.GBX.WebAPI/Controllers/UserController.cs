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
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/User")]
    public class UserController : ApiController
    {
        private IRequestHandler<BO.User> requestHandler;
        private IRequestHandler<BO.AddUser> adduserrequestHandler;
        private IRequestHandler<BO.UserNameValidate> requestHandlerUserNameValidate;
        private IRequestHandler<BO.MapUserToCompnay> requestHandlerMapUser;

        public UserController()
        {
            requestHandler = new GbApiRequestHandler<BO.User>();
            adduserrequestHandler = new GbApiRequestHandler<BO.AddUser>();
            requestHandlerUserNameValidate = new GbApiRequestHandler<BO.UserNameValidate>();
            requestHandlerMapUser = new GbApiRequestHandler<BO.MapUserToCompnay>();
        }

        [HttpPost]
        [Route("GetByUserName")]
        [Route("GetAll")]        
        public HttpResponseMessage Get([FromBody]BO.User data)
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
        public HttpResponseMessage Post([FromBody]BO.AddUser data)
        {
            return adduserrequestHandler.CreateGbObject(Request, data);
        }

        [Route("Update")]
        [HttpPut]        
        public HttpResponseMessage Put([FromBody]BO.User User)
        {
            return requestHandler.UpdateGbObject(Request, User);
        }

        [HttpDelete]
        [Route("Delete")]        
        public HttpResponseMessage Delete([FromBody]BO.User User)
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
        public HttpResponseMessage Signin([FromBody]BO.User user)
        {
            if (user != null)
            {
                //Since the API should only validate for Staff Users.
                //Rest all other even if valid are not Authorised.
                user.UserType = BO.GBEnums.UserType.Staff;
            }

            return requestHandler.Login(Request, user);
        }

        [HttpPost]
        [Route("SigninWithUserName")]
        public HttpResponseMessage SigninWithUserName([FromBody]BO.User user)
        {
            if (user != null)
            {
                user.UserType = BO.GBEnums.UserType.Staff;
            }

            return requestHandler.LoginWithUserName(Request, user);
        }

        [HttpGet]
        [Route("IsUnique")]
        public HttpResponseMessage IsUnique([FromBody]BO.User User)
        {
            return requestHandler.ValidateUniqueName(Request, User);
        }
        
        [HttpGet]
        [Route("getIsExistingUser/{User}/{SSN}")]
        public HttpResponseMessage GetIsExistingUser(string User, string SSN)
        {
            return requestHandler.GetIsExistingUser(Request, User,SSN);
        }

        [HttpPost]
        [Route("checkIsExistingUser")]
        public HttpResponseMessage CheckIsExistingUser(BO.UserNameValidate User)
        {
            return requestHandlerUserNameValidate.GetObjects(Request, User.UserName);
        }

        [HttpPost]
        [Route("ResetPassword")]
        [AllowAnonymous]
        public HttpResponseMessage ResetPassword([FromBody]BO.AddUser data)
        {
            return adduserrequestHandler.ResetPassword(Request, data);
        }

        [HttpPost]
        [Route("getUserByUserName")]
        public HttpResponseMessage GetUserByUserName([FromBody]BO.User data)
        {
            return requestHandler.GetUserByUserName(Request, data.UserName);
        }


        [HttpPost]
        [Route("mapusertothecompnay")]
        public HttpResponseMessage Mapusertothecompnay([FromBody]BO.MapUserToCompnay User)
        {
            return requestHandlerMapUser.Mapusertothecompnay(Request, User.UserName,User.CompanyID,User.CurrentUserId);
        }

        [HttpPost]
        [Route("getUserByIdAndCompany")]
        public HttpResponseMessage GetUserByIDAndCompnayID([FromBody]BO.MapUserToCompnay User)
        {
            return requestHandlerMapUser.GetUserByIDAndCompnayID(Request, User.CurrentUserId, User.CompanyID);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
