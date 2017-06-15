using System;
using System.Collections.Generic;
using System.Net.Http;
using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
        //[AllowAnonymous]
        public HttpResponseMessage GetByCompanyIdForAncillary(int CompanyId)
        {
            return requestHandler.GetByCompanyIdForAncillary(Request, CompanyId);
        }

        [HttpGet]
        [Route("getByCompanyId/{CompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetByCompanyId(int CompanyId)
        {
            return requestHandler.GetGbObjects(Request, CompanyId);
        }

        [HttpGet]
        [Route("getByPatientIdAndCompanyId/{PatientId}/{CompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetByPatientId(int PatientId, int CompanyId)
        {
            return requestHandler.GetGbObjects2(Request, PatientId, CompanyId);
        }

        [HttpGet]
        //[HttpDelete]
        [Route("Delete/{id}")]
        //[AllowAnonymous]
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