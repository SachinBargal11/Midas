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
        //private IRequestHandler<Patient> requestHandler;
        private IRequestHandler<Patient2> requestHandlerPatient2;

        public PatientController()
        {
            //requestHandler = new GbApiRequestHandler<Patient>();
            requestHandlerPatient2 = new GbApiRequestHandler<Patient2>();
        }

        //[HttpGet]
        //[Route("Get/{id}")]
        //[AllowAnonymous]
        //public HttpResponseMessage Get(int id)
        //{
        //    return requestHandler.GetObject(Request, id);
        //}

        //[Route("Update")]
        //[HttpPut]
        //[AllowAnonymous]
        //public HttpResponseMessage Put([FromBody]Patient patient)
        //{
        //    return requestHandler.UpdateGbObject(Request, patient);
        //}

        //[HttpGet]
        //[Route("GetAllPatient")]
        //[AllowAnonymous]
        //public HttpResponseMessage GetAllPatient([FromBody]Patient2 data)
        //{
        //    return requestHandlerPatient2.GetGbObjects(Request, data);
        //}

        //[HttpGet]
        //[Route("getPatientsByCompanyId")]
        //[AllowAnonymous]
        //public HttpResponseMessage GetPatientsByCompanyId(int CompanyId)
        //{
        //    return requestHandlerPatient2.GetGbObjects(Request, CompanyId);
        //}

        [HttpGet]
        [Route("getPatientById/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage GetPatientById2(int id)
        {
            return requestHandlerPatient2.GetObject(Request, id);
        }

        [HttpPost]
        [Route("savePatient")]
        [AllowAnonymous]
        public HttpResponseMessage SavePatient2([FromBody]Patient2 patient2)
        {
            return requestHandlerPatient2.CreateGbObject(Request, patient2);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
