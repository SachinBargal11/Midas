using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.AncillaryWebAPI.Controllers
{
    [RoutePrefix("midasancillaryapi/OTPCompanyMapping")]
    public class OTPCompanyMappingController : ApiController
    {
        private IRequestHandler<OTPCompanyMapping> requestHandler;
        public OTPCompanyMappingController()
        {
            requestHandler = new GbApiRequestHandler<OTPCompanyMapping>();
        }

        [HttpGet]
        [Route("generateOTPForCompany/{companyId}")]
        public HttpResponseMessage GenerateOTPForCompany(int companyId)
        {
            return requestHandler.GenerateOTPForCompany(Request, companyId);
        }

        [HttpGet]
        [Route("validateOTPForCompany/{otp}")]
        public HttpResponseMessage ValidateOTPForCompany(string otp)
        {
            return requestHandler.ValidateOTPForCompany(Request, otp);
        }

        [HttpGet]
        [Route("associatePreferredCompany/{otp}/{currentCompanyId}")]
        public HttpResponseMessage AssociatePreferredCompany(string otp, int currentCompanyId)
        {
            return requestHandler.AssociatePreferredCompany(Request, otp, currentCompanyId);
        }

        [HttpGet]
        [Route("deletePreferredCompany/{preferredCompanyId}/{currentCompanyId}")]
        public HttpResponseMessage DeletePreferredCompany(int preferredCompanyId, int currentCompanyId)
        {
            return requestHandler.DeletePreferredCompany(Request, preferredCompanyId, currentCompanyId);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
