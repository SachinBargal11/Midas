using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.AttorneyWebAPI.Controllers
{
    [RoutePrefix("midasattorneyapi/PatientFamilyMember")]

    public class PatientFamilyMemberController : ApiController
    {
        private IRequestHandler<PatientFamilyMember> requestHandler;

        public PatientFamilyMemberController()
        {
            requestHandler = new GbApiRequestHandler<PatientFamilyMember>();
        }

        [HttpGet]
        [Route("get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        //[HttpGet]
        //[Route("getByPatientId/{PatientId}")]
        ////[AllowAnonymous]
        //public HttpResponseMessage GetByPatientId(int PatientId)
        //{
        //    return requestHandler.GetByPatientId(Request, PatientId);
        //}

        [HttpGet]
        [Route("getByCaseId/{caseId}")]
        public HttpResponseMessage GetByCaseId(int caseId)
        {
            return requestHandler.GetByCaseId(Request, caseId);
        }

        [HttpPost]
        [Route("save")]
        public HttpResponseMessage Post([FromBody]PatientFamilyMember data)
        {
            return requestHandler.CreateGbObject(Request, data);
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