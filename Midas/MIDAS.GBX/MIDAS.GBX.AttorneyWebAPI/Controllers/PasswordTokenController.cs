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
    [RoutePrefix("midasattorneyapi/PasswordToken")]
    public class PasswordTokenController : ApiController
    {
        private IRequestHandler<PasswordToken> requestHandler;

        public PasswordTokenController()
        {
            requestHandler = new GbApiRequestHandler<PasswordToken>();
        }

        [HttpPost]
        [Route("GeneratePasswordResetLink")]
        [AllowAnonymous]
        public HttpResponseMessage GeneratePasswordLink([FromBody]PasswordToken passwordToken)
        {
            return requestHandler.GeneratePasswordLink(Request, passwordToken);
        }

        [HttpPost]
        [Route("ValidatePassword")]
        [AllowAnonymous]
        public HttpResponseMessage ValidatePassword([FromBody]PasswordToken passwordToken)
        {
            return requestHandler.ValidatePassword(Request, passwordToken);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}