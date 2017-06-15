using System.Net.Http;
using MIDAS.GBX.BusinessObjects;
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
        [Route("getByCompanyIdForAncillary/{CompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetByCompanyIdForAncillary(int CompanyId)
        {
            return requestHandlerPatient2.GetByCompanyIdForAncillary(Request, CompanyId);
        }

        [HttpGet]
        [Route("Delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandlerPatient2.Delete(Request, id);
        }
        
        [HttpPost]
        [Route("savePatient")]
        //[AllowAnonymous]
        public HttpResponseMessage SavePatient2([FromBody]Patient2 patient2)
        {
            return requestHandlerPatient2.CreateGbObject(Request, patient2);
        }

        [HttpGet]
        [Route("getPatientsByCompanyId/{CompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetPatientsByCompanyId(int CompanyId)
        {
            return requestHandlerPatient2.GetGbObjects(Request, CompanyId);
        }

        [HttpGet]
        [Route("getPatientById/{id}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetPatientById2(int id)
        {
            return requestHandlerPatient2.GetObject(Request, id);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
