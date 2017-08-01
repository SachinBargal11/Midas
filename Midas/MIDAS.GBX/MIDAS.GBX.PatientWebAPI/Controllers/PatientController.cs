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
    //[AllowAnonymous]
    public class PatientController : ApiController
    {
        //private IRequestHandler<Patient> requestHandler;
        private IRequestHandler<Patient> requestHandlerPatient;

        public PatientController()
        {
            //requestHandler = new GbApiRequestHandler<Patient>();
            requestHandlerPatient = new GbApiRequestHandler<Patient>();
        }


        [HttpGet]
        [Route("getPatientById/{id}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetPatientById2(int id)
        {
            return requestHandlerPatient.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByCompanyWithOpenCases/{CompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetByCompanyWithOpenCases(int CompanyId)
        {
            return requestHandlerPatient.GetGbObjects2(Request, CompanyId);
        }

        [HttpPost]
        [Route("savePatient")]
        //[AllowAnonymous]
        public HttpResponseMessage SavePatient2([FromBody]Patient patient)
        {
            return requestHandlerPatient.CreateGbObject(Request, patient);
        }





        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
