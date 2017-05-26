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

        //[HttpGet]
        //[Route("GetAll")]
        //[AllowAnonymous]
        //public HttpResponseMessage Get([FromBody]Patient data)
        //{
        //    return requestHandler.GetGbObjects(Request, data);
        //}

        //[HttpGet]
        //[Route("Get/{id}")]
        //[AllowAnonymous]
        //public HttpResponseMessage Get(int id)
        //{
        //    return requestHandler.GetObject(Request, id);
        //}

        //// POST: api/Organizations
        //[HttpPost]
        //[Route("Add")]
        //[AllowAnonymous]
        //public HttpResponseMessage Post([FromBody]Patient data)
        //{
        //    return requestHandler.CreateGbObject(Request, data);
        //}

        //[Route("Update")]
        //[HttpPut]
        //[AllowAnonymous]
        //public HttpResponseMessage Put([FromBody]Patient patient)
        //{
        //    return requestHandler.UpdateGbObject(Request, patient);
        //}


        //[HttpDelete]
        //[Route("Delete")]
        //[AllowAnonymous]
        //public HttpResponseMessage Delete([FromBody]Patient patient)
        //{
        //    return requestHandler.DeleteGbObject(Request, patient);
        //}

        //[HttpGet]
        //[Route("IsUnique")]
        //public HttpResponseMessage IsUnique([FromBody]Patient patient)
        //{
        //    return requestHandler.ValidateUniqueName(Request, patient);
        //}

        //[HttpPost]
        //[Route("AddPatient")]
        //[AllowAnonymous]
        //public HttpResponseMessage AddPatient([FromBody]Patient data)
        //{
        //    return requestHandler.CreateGbObjectPatient(Request, data);
        //}

        [HttpGet]
        [Route("getAllPatient")]
        //[AllowAnonymous]
        public HttpResponseMessage GetAllPatient([FromBody]Patient2 data)
        {
            return requestHandlerPatient2.GetGbObjects(Request, data);
        }

        [HttpGet]
        [Route("getPatientsByCompanyId/{CompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetPatientsByCompanyId(int CompanyId)
        {
            return requestHandlerPatient2.GetGbObjects(Request, CompanyId);
        }

        [HttpGet]
        [Route("getByCompanyWithOpenCases/{CompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetByCompanyWithOpenCases(int CompanyId)
        {
            return requestHandlerPatient2.GetGbObjects2(Request, CompanyId);
        }

        [HttpGet]
        [Route("getByCompanyWithCloseCases/{CompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetByCompanyWithCloseCases(int CompanyId)
        {
            return requestHandlerPatient2.GetGbObjects4(Request, CompanyId);
        }

        [HttpGet]
        [Route("getByLocationWithOpenCases/{LocationId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetByLocationWithOpenCases(int LocationId)
        {
            return requestHandlerPatient2.GetGbObjects3(Request, LocationId);
        }

        [HttpGet]
        [Route("getPatientById/{id}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetPatientById2(int id)
        {
            return requestHandlerPatient2.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByCompanyAndDoctorId/{companyId}/{doctorId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetByCompanyAndDoctorId(int companyId,int doctorId)
        {
            return requestHandlerPatient2.GetGbObjects(Request, companyId, doctorId);
        }
        

        [HttpPost]
        [Route("savePatient")]
        //[AllowAnonymous]
        public HttpResponseMessage SavePatient2([FromBody]Patient2 patient2)
        {
            return requestHandlerPatient2.CreateGbObject(Request, patient2);
        }


        [HttpPost]
        [Route("addPatient")]
        //[AllowAnonymous]
        public HttpResponseMessage AddPatient([FromBody]AddPatient patient)
        {
            return requestHandlerAddPatient.CreateGbObject2(Request, patient);
        }


        [HttpGet]
        [Route("Delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandlerPatient2.Delete(Request, id);
        }

        [HttpGet]
        [Route("associatePatientWithAttorneyCompany/{PatientId}/{CaseId}/{AttorneyCompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage AssociatePatientWithAttorneyCompany(int PatientId, int CaseId, int AttorneyCompanyId)
        {
            return requestHandlerPatient2.AssociatePatientWithAttorneyCompany(Request, PatientId, CaseId, AttorneyCompanyId);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
