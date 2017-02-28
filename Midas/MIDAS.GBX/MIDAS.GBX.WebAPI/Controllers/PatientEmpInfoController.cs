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
    [RoutePrefix("midasapi/PatientEmpInfo")]

    public class PatientEmpInfoController : ApiController
    {
        private IRequestHandler<PatientEmpInfo> requestHandler;

        public PatientEmpInfoController()
        {
            requestHandler = new GbApiRequestHandler<PatientEmpInfo>();
        }

        // GET: api/Organizations/5
        [HttpGet]
        [Route("get/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByPatientId/{PatientId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByPatientId(int PatientId)
        {
            return requestHandler.GetByPatientId(Request, PatientId);
        }

        [HttpGet]
        [Route("getCurrentEmpByPatientId/{PatientId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetCurrentEmpByPatientId(int PatientId)
        {
            return requestHandler.GetCurrentEmpByPatientId(Request, PatientId);
        }


        [HttpPost]
        [Route("save")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]PatientEmpInfo data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        //[HttpDelete]
        [Route("Delete/{id}")]
        [AllowAnonymous]
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