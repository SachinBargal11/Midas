using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MIDAS.GBX.PatientWebAPI.RequestHandler;
using MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{
    [RoutePrefix("midaspatientapi/Patient")]
    [AllowAnonymous]
    public class PatientController : ApiController
    {
        private IRequestHandler<Patient> requestHandler;
        private IRequestHandler<Patient2> requestHandlerPatient2;

        public PatientController()
        {
            requestHandler = new GbApiRequestHandler<Patient>();
            requestHandlerPatient2 = new GbApiRequestHandler<Patient2>();
        }

        [HttpGet]
        [Route("Get/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [Route("Update")]
        [HttpPut]
        [AllowAnonymous]
        public HttpResponseMessage Put([FromBody]Patient patient)
        {
            return requestHandler.UpdateGbObject(Request, patient);
        }

        [HttpGet]
        [Route("GetPatient/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage GetPatient2(int id)
        {
            return requestHandlerPatient2.GetObject(Request, id);
        }

        [HttpPost]
        [Route("SavePatient")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]Patient2 patient2)
        {
            return requestHandlerPatient2.CreateGbObject(Request, patient2);
        }

        [HttpGet]
        [Route("GetAllPatient")]
        [AllowAnonymous]
        public HttpResponseMessage GetAllPatient([FromBody]Patient2 data)
        {
            return requestHandlerPatient2.GetGbObjects(Request, data);
        }



        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
