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
        private IRequestHandler<Patient> requestHandlerPatient;

        public PatientController()
        {
            requestHandlerPatient = new GbApiRequestHandler<Patient>();
        }

        [HttpGet]
        [Route("getPatientById/{id}")]
        public HttpResponseMessage GetPatientById2(int id)
        {
            return requestHandlerPatient.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByCompanyWithOpenCases/{CompanyId}")]
        public HttpResponseMessage GetByCompanyWithOpenCases(int CompanyId)
        {
            return requestHandlerPatient.GetGbObjects2(Request, CompanyId);
        }

        [HttpPost]
        [Route("savePatient")]
        public HttpResponseMessage SavePatient([FromBody]Patient patient)
        {
            //Since Patient cannot update social media info, only attorney can view or update.
            patient.PatientSocialMediaMappings = null;
            return requestHandlerPatient.CreateGbObject(Request, patient);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
