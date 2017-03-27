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
    [RoutePrefix("midasapi/DoctorCaseConsentApproval")]

    public class DoctorCaseConsentApprovalController : ApiController
    {
        private IRequestHandler<DoctorCaseConsentApproval> requestHandler;

        public DoctorCaseConsentApprovalController()
        {
            requestHandler = new GbApiRequestHandler<DoctorCaseConsentApproval>();
        }

        [HttpGet]
        [Route("get/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByDoctorId/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByDoctorId(int id)
        {
            return requestHandler.GetByDoctorId(Request, id);
        }

        [HttpGet]
        [Route("getByCaseId/{CaseId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByCaseId(int CaseId)
        {
            return requestHandler.GetByCaseId(Request, CaseId);
        }

        [HttpPost]
        [Route("Save")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]DoctorCaseConsentApproval data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("Delete/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }


    }

}
