using System;
using System.Collections.Generic;
using System.Net.Http;
using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.AncillaryWebAPI.Controllers
{
    [RoutePrefix("midasancillaryapi/Case")]
    public class CaseController : ApiController
    {
        private IRequestHandler<Case> requestHandler;

        public CaseController()
        {
            requestHandler = new GbApiRequestHandler<Case>();
        }

        [HttpGet]
        [Route("getByCompanyIdForAncillary/{CompanyId}")]
        public HttpResponseMessage GetByCompanyIdForAncillary(int CompanyId)
        {
            return requestHandler.GetByCompanyIdForAncillary(Request, CompanyId);
        }

        [HttpGet]
        [Route("getByPatientId/{PatientId}")]
        public HttpResponseMessage GetByPatientId(int PatientId)
        {
            return requestHandler.GetByPatientId(Request, PatientId);
        }

        [HttpGet]
        [Route("getByCompanyId/{CompanyId}")]
        public HttpResponseMessage GetByCompanyId(int CompanyId)
        {
            return requestHandler.GetGbObjects(Request, CompanyId);
        }

        [HttpGet]
        [Route("getByPatientIdAndCompanyId/{PatientId}/{CompanyId}")]
        public HttpResponseMessage GetByPatientId(int PatientId, int CompanyId)
        {
            return requestHandler.GetGbObjects2(Request, PatientId, CompanyId);
        }

        [HttpGet]
        [Route("Delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}