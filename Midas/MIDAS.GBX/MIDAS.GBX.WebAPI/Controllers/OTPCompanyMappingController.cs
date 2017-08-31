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
    [RoutePrefix("midasapi/OTPCompanyMapping")]
    
    public class OTPCompanyMappingController : ApiController
    {
        private IRequestHandler<OTPCompanyMapping> requestHandler;
        //private IRequestHandler<ValidateOTP> validateotprequestHandler;
        public OTPCompanyMappingController()
        {
            requestHandler = new GbApiRequestHandler<OTPCompanyMapping>();
            //validateotprequestHandler = new GbApiRequestHandler<ValidateOTP>();
        }

     
        [HttpGet]
        [Route("generateOTPForCompany/{companyId}")]
        [AllowAnonymous]
        public HttpResponseMessage GenerateOTPForCompany(int companyId)
        {
            return requestHandler.GenerateOTPForCompany(Request, companyId);
        }


        [HttpGet]
        [Route("validateOTPForCompany/{otp}")]
        [AllowAnonymous]
        public HttpResponseMessage ValidateOTPForCompany(string otp)
        {
            return requestHandler.ValidateOTPForCompany(Request, otp);
        }

        [HttpGet]
        [Route("associatePreferredCompany/{otp}/{currentCompanyId}")]
        [AllowAnonymous]
        public HttpResponseMessage AssociatePreferredCompany(string otp,int currentCompanyId)
        {
            return requestHandler.AssociatePreferredCompany(Request, otp, currentCompanyId);
        }

        

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}