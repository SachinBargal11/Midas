using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/OTP")]
    public class OTPController : ApiController
    {
        private IRequestHandler<OTP> requestHandler;
        private IRequestHandler<ValidateOTP> validateotprequestHandler;
        public OTPController()
        {
            requestHandler = new GbApiRequestHandler<OTP>();
            validateotprequestHandler = new GbApiRequestHandler<ValidateOTP>();
        }

        [HttpGet]
        [Route("Get/{id}")]
        
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("GetAll")]
        
        public HttpResponseMessage Get([FromBody]OTP data)
        {
            return requestHandler.GetGbObjects(Request, data);
        }

        // POST: api/Organizations
        [HttpPost]
        [Route("Add")]
        
        public HttpResponseMessage Post([FromBody]OTP data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        // PUT: api/Organizations/5
        [Route("Update")]
        [HttpPut]
        
        public HttpResponseMessage Put([FromBody]OTP account)
        {
            return requestHandler.UpdateGbObject(Request, account);
        }

        // DELETE: api/Organizations/id={organizationId}
        [HttpDelete]
        [Route("Delete")]
        
        public HttpResponseMessage Delete([FromBody]OTP account)
        {
            return requestHandler.DeleteGbObject(Request, account);
        }

        // Unique Name Validation
        [HttpPost]
        [Route("IsUnique")]
        
        public HttpResponseMessage IsUnique([FromBody]OTP account)
        {
            return requestHandler.ValidateUniqueName(Request, account);
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