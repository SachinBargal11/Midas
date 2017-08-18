using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MIDAS.GBX.PatientWebAPI.RequestHandler;
using MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{

    [RoutePrefix("midaspatientapi/User")]
    public class UserController : ApiController
    {
        private IRequestHandler<User> requestHandler;
        private IRequestHandler<AddUser> adduserrequestHandler;

        public UserController()
        {
            requestHandler = new GbApiRequestHandler<User>();
            adduserrequestHandler = new GbApiRequestHandler<AddUser>();
        }

        //[AllowAnonymous]
        [HttpPost]
        [Route("Signin")]
        public HttpResponseMessage Signin([FromBody]User user)
        {
            if (user != null)
            {
                //Since the API should only validate for Patient Users.
                //Rest all other even if valid are not Authorised.
                user.UserType = GBEnums.UserType.Patient;
            }

            return requestHandler.Login(Request, user);
        }

        [HttpPost]
        [Route("Add")]
        //[AllowAnonymous]
        public HttpResponseMessage Post([FromBody]AddUser data)
        {
            return adduserrequestHandler.CreateGbObject(Request, data);
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
                user.UserType = GBEnums.UserType.Staff;
            }

            return requestHandler.LoginWithUserName(Request, user);
        }

    }
}
