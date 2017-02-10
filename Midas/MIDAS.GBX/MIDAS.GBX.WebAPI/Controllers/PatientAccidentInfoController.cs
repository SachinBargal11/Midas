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
    [RoutePrefix("midasapi/PatientAccidentInfo")]

    public class PatientAccidentInfoController : ApiController
    {
        private IRequestHandler<PatientAccidentInfo> requestHandler;

        public PatientAccidentInfoController()
        {
            requestHandler = new GbApiRequestHandler<PatientAccidentInfo>();
        }


        [HttpGet]
        [Route("getByPatientId/{PatientId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByPatientId(int PatientId)
        {
            return requestHandler.GetByPatientId(Request, PatientId);
        }

        [HttpGet]
        [Route("getCurrentAccidentByPatientId/{PatientId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetPatientAccidentInfoByPatientId(int PatientId)
        {
            return requestHandler.GetPatientAccidentInfoByPatientId(Request, PatientId);
        }

        [HttpPost]
        [Route("save")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]PatientAccidentInfo data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("Delete/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage DeleteById(int id)
        {
            return requestHandler.DeleteById(Request, id);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}