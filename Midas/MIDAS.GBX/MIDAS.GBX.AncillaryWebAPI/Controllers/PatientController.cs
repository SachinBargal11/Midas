using System.Net.Http;
using MIDAS.GBX.BusinessObjects;
using System.Web.Http;

namespace MIDAS.GBX.AncillaryWebAPI.Controllers
{
    [RoutePrefix("midasancillaryapi/Patient")]
    public class PatientController : ApiController
    {
        //private IRequestHandler<Patient> requestHandler;
        private IRequestHandler<Patient> requestHandlerPatient;
        private IRequestHandler<AddPatient> requestHandlerAddPatient;

        public PatientController()
        {
            //requestHandler = new GbApiRequestHandler<Patient>();
            requestHandlerPatient = new GbApiRequestHandler<Patient>();
            requestHandlerAddPatient = new GbApiRequestHandler<AddPatient>();
        }



        [HttpGet]
        [Route("getByCompanyIdForAncillary/{CompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetByCompanyIdForAncillary(int CompanyId)
        {
            return requestHandlerPatient.GetByCompanyIdForAncillary(Request, CompanyId);
        }

        [HttpGet]
        [Route("Delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandlerPatient.Delete(Request, id);
        }
        
        [HttpPost]
        [Route("savePatient")]
        //[AllowAnonymous]
        public HttpResponseMessage SavePatient2([FromBody]Patient patient)
        {
            return requestHandlerPatient.CreateGbObject(Request, patient);
        }

        [HttpGet]
        [Route("getPatientsByCompanyId/{CompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetPatientsByCompanyId(int CompanyId)
        {
            return requestHandlerPatient.GetGbObjects(Request, CompanyId);
        }

        [HttpGet]
        [Route("getPatientById/{id}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetPatientById2(int id)
        {
            return requestHandlerPatient.GetObject(Request, id);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
