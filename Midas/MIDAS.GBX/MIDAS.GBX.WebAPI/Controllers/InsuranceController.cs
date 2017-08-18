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
    [RoutePrefix("midasapi/PatientInsuranceInfo")]

    public class InsuranceController : ApiController
    {
        private IRequestHandler<PatientInsuranceInfo> requestHandler;

        public InsuranceController()
        {
            requestHandler = new GbApiRequestHandler<PatientInsuranceInfo>();
        }

        // GET: api/Organizations/5
        [HttpGet]
        [Route("get/{id}")]
        //[AllowAnonymous]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }


        [HttpGet]
        [Route("getByCaseId/{caseId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetByCaseId(int caseId)
        {
            return requestHandler.GetByCaseId(Request, caseId);
        }

        //[HttpGet]
        //[Route("isInsuranceInfoAdded/{PatientId}")]
        ////[AllowAnonymous]
        //public HttpResponseMessage IsInsuranceInfoAdded(int PatientId)
        //{
        //    return requestHandler.IsInsuranceInfoAdded(Request, PatientId);
        //}

        [HttpPost]
        [Route("save")]
        //[AllowAnonymous]
        public HttpResponseMessage Post([FromBody]PatientInsuranceInfo data)
        {
            return requestHandler.CreateGbObject(Request, data);
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