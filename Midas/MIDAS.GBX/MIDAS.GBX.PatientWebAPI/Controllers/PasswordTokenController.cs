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
    [RoutePrefix("midaspatientapi/PasswordToken")]
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
