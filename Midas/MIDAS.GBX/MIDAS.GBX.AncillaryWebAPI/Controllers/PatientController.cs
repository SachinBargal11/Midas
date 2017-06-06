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
    [RoutePrefix("midasancillaryapi/Patient")]
    public class PatientController : ApiController
    {
        //private IRequestHandler<Patient> requestHandler;
        private IRequestHandler<Patient2> requestHandlerPatient2;
        private IRequestHandler<AddPatient> requestHandlerAddPatient;

        public PatientController()
        {
            //requestHandler = new GbApiRequestHandler<Patient>();
            requestHandlerPatient2 = new GbApiRequestHandler<Patient2>();
            requestHandlerAddPatient = new GbApiRequestHandler<AddPatient>();
        }

    

        [HttpGet]
        [Route("getPatientsByCompanyId/{CompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetPatientsByCompanyId(int CompanyId)
        {
            return requestHandlerPatient2.GetGbObjects(Request, CompanyId);
        }
  
        [HttpGet]
        [Route("Delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandlerPatient2.Delete(Request, id);
        }

       
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
