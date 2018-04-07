using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CAIdentityServer.Contract;
using CAIdentityServer.Service;
using CAIdentityServer.Models;

namespace CAIdentityServer.Controllers
{
    [RoutePrefix("core/UserStoreService")]
    public class IdentityUserStoreController : ApiController
    {
        private IUserStoreService userStoreService;

        public IdentityUserStoreController()
        {
            userStoreService = new IdentityUserStoreService();
        }

        [Route("GetUser")]
        [HttpGet]
        public IHttpActionResult GetUser(string userName, string password)
        {
            IdentityUser user = userStoreService.GetUser(userName, password);
            return Ok(user);
        }

        [Route("GetUserProfileData")]
        [HttpGet]
        public IHttpActionResult GetUserProfileData(int userID)
        {
            IdentityUser user = userStoreService.GetUserProfileData(userID);
            return Ok(user);
        }

        [Route("GetUserRoles")]
        [HttpGet]
        public IHttpActionResult GetUserRoles(int userID)
        {
            var roles = userStoreService.GetUserRoles(userID);
            return Ok(roles);
        }

        [Route("GenerateAndSendOTP")]
        [HttpGet]
        public IHttpActionResult GenerateAndSendOTP(int userID)
        {
            var result = userStoreService.GenerateAndSendOTP(userID);
            return Ok(result);
        }

        [Route("VerifyOTP")]
        [HttpGet]
        public IHttpActionResult VerifyOTP(int userId, int otpCode)
        {
            var result = userStoreService.VerifyOTP(userId, otpCode);
            return Ok(result);
        }
    }
}
