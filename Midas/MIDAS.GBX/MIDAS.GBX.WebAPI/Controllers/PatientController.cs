using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Linq;
using MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/Patient")]
    [Authorize]
    public class PatientController : ApiController
    {
        private IRequestHandler<Patient> requestHandlerPatient;
        private IRequestHandler<AddPatient> requestHandlerAddPatient;

        public PatientController()
        {
            requestHandlerPatient = new GbApiRequestHandler<Patient>();
            requestHandlerAddPatient = new GbApiRequestHandler<AddPatient>();
        }

        [HttpGet]
        [Route("getAllPatient")]
        public HttpResponseMessage GetAllPatient([FromBody]Patient data)
        {
            return requestHandlerPatient.GetGbObjects(Request, data);
        }

        [HttpGet]
        [Route("getPatientsByCompanyId/{CompanyId}")]
        public HttpResponseMessage GetPatientsByCompanyId(int CompanyId)
        {
            return requestHandlerPatient.GetGbObjects(Request, CompanyId);
        }

        [HttpGet]
        [Route("getByCompanyWithOpenCases/{CompanyId}")]
        public HttpResponseMessage GetByCompanyWithOpenCases(int CompanyId)
        {
            return requestHandlerPatient.GetGbObjects2(Request, CompanyId);
        }

        [HttpGet]
        [Route("getByCompanyWithCloseCases/{CompanyId}")]
        public HttpResponseMessage GetByCompanyWithCloseCases(int CompanyId)
        {
            return requestHandlerPatient.GetGbObjects4(Request, CompanyId);
        }

        [HttpGet]
        [Route("getPatientById/{id}")]
        public HttpResponseMessage GetPatientById2(int id)
        {
            return requestHandlerPatient.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByCompanyAndDoctorId/{companyId}/{doctorId}")]
        public HttpResponseMessage GetByCompanyAndDoctorId(int companyId,int doctorId)
        {
            return requestHandlerPatient.GetGbObjects(Request, companyId, doctorId);
        }
        

        [HttpPost]
        [Route("savePatient")]
        public HttpResponseMessage SavePatient([FromBody]Patient patient)
        {
            //Since Medical Provider cannot update social media info, only attorney can view or update.
            patient.PatientSocialMediaMappings = null;
            return requestHandlerPatient.CreateGbObject(Request, patient);
        }

        [HttpPost]
        [Route("addPatient")]
        public HttpResponseMessage AddPatient([FromBody]AddPatient patient)
        {
            return requestHandlerAddPatient.CreateGbObject2(Request, patient);
        }

        [HttpGet]
        [Route("Delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandlerPatient.Delete(Request, id);
        }

        [HttpGet]
        [Route("associatePatientWithAttorneyCompany/{PatientId}/{CaseId}/{AttorneyCompanyId}")]
        public HttpResponseMessage AssociatePatientWithAttorneyCompany(int PatientId, int CaseId, int AttorneyCompanyId)
        {
            return requestHandlerPatient.AssociatePatientWithAttorneyCompany(Request, PatientId, CaseId, AttorneyCompanyId);
        }

        [HttpGet]
        [Route("associatePatientWithMedicalCompany/{PatientId}/{CaseId}/{MedicalCompanyId}")]
        public HttpResponseMessage AssociatePatientWithMedicalCompany(int PatientId, int CaseId, int MedicalCompanyId)
        {
            return requestHandlerPatient.AssociatePatientWithMedicalCompany(Request, PatientId, CaseId, MedicalCompanyId);
        }

        [HttpGet]
        [Route("associatePatientWithCompany/{PatientId}/{CompanyId}")]
        public HttpResponseMessage AssociatePatientWithCompany(int PatientId, int CompanyId)
        {
            return requestHandlerPatient.AssociatePatientWithCompany(Request, PatientId, CompanyId);
        }

        [HttpGet]
        [Route("addPatientProfileDocument/{PatientId}/{DocumentId}")]
        public HttpResponseMessage AddPatientProfileDocument(int PatientId, int DocumentId)
        {
            return requestHandlerPatient.AddPatientProfileDocument(Request, PatientId, DocumentId);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
