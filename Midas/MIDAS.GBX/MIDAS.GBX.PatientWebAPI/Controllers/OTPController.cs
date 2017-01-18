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
    [RoutePrefix("midaspatientapi/OTP")]
    public class OTPController : ApiController
    {
        private IRequestHandler<OTP> requestHandler;
        private IRequestHandler<ValidateOTP> validateotprequestHandler;

        public OTPController()
        {
            requestHandler = new GbApiRequestHandler<OTP>();
            validateotprequestHandler = new GbApiRequestHandler<ValidateOTP>();
        }

        [HttpPost]
        [Route("GenerateOTP")]
        [AllowAnonymous]
        public HttpResponseMessage GenerateOTP([FromBody]OTP otp)
        {
            return requestHandler.RegenerateOTP(Request, otp);
        }

        [HttpPost]
        [Route("ValidateOTP")]
        [AllowAnonymous]
        public HttpResponseMessage ValidateOTP([FromBody]ValidateOTP otp)
        {
            return validateotprequestHandler.ValidateOTP(Request, otp);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }        
    }
}
