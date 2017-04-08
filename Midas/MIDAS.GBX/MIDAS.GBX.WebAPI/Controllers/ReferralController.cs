using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/Referral")]

    public class ReferralController : ApiController
    {
        private IRequestHandler<Referral> requestHandler;

        public ReferralController()
        {
            requestHandler = new GbApiRequestHandler<Referral>();
        }

        [HttpGet]
        [Route("get/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByCaseId/{CaseId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByCaseId(int CaseId)
        {
            return requestHandler.GetByCaseId(Request, CaseId);
        }

        [HttpPost]
        [Route("save")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]Referral data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("getByReferringCompanyId/{id}")]
        public HttpResponseMessage GetByReferringCompanyId(int id)
        {
            return requestHandler.GetByReferringCompanyId(Request, id);
        }

        [HttpGet]
        [Route("getByReferredToCompanyId/{id}")]
        public HttpResponseMessage GetByReferredToCompanyId(int id)
        {
            return requestHandler.GetByReferredToCompanyId(Request, id);
        }

        [HttpGet]
        [Route("getByreferringLocationId/{id}")]
        public HttpResponseMessage GetByReferringLocationId(int id)
        {
            return requestHandler.GetByReferringLocationId(Request, id);
        }

        [HttpGet]
        [Route("getByreferringToLocationId/{id}")]
        public HttpResponseMessage GetByReferringToLocationId(int id)
        {
            return requestHandler.GetByReferringToLocationId(Request, id);
        }

        [HttpGet]
        [Route("getByReferringUserId/{userId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByReferringUserId(int userId)
        {
            return requestHandler.GetByReferringUserId(Request, userId);
        }

        [HttpGet]
        [Route("getByReferredToDoctorId/{doctorId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByReferredToDoctorId(int doctorId)
        {
            return requestHandler.GetByReferredToDoctorId(Request, doctorId);
        }

        [HttpGet]
        [Route("Delete/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }

        [HttpGet]
        [Route("generateReferralDocument/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage GenerateReferralDocument(int id)
        {
            return requestHandler.GenerateReferralDocument(Request, id);
        }


        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }


}
