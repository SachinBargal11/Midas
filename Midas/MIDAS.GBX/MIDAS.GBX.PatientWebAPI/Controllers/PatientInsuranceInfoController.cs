using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using MIDAS.GBX.PatientWebAPI.RequestHandler;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{
    [RoutePrefix("midaspatientapi/PatientInsuranceInfo")]

    public class PatientInsuranceInfoController : ApiController
    {
        private IRequestHandler<PatientInsuranceInfo> requestHandler;

        public PatientInsuranceInfoController()
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
        [Route("getByPatientId/{PatientId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetByPatientId(int PatientId)
        {
            return requestHandler.GetByPatientId(Request, PatientId);
        }

        //[HttpGet]
        //[Route("isInsuranceInfoAdded/{PatientId}")]
        ////[AllowAnonymous]
        //public HttpResponseMessage IsInsuranceInfoAdded(int PatientId)
        //{
        //    return requestHandler.IsInsuranceInfoAdded(Request, PatientId);
        //}

        [HttpPost]
        [Route("Save")]
        //[AllowAnonymous]
        public HttpResponseMessage Post([FromBody]PatientInsuranceInfo data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
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