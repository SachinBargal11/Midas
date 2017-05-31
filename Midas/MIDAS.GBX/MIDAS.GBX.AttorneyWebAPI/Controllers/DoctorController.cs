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

namespace MIDAS.GBX.AttorneyWebAPI.Controllers
{
    [RoutePrefix("midasattorneyapi/Doctor")]
    
    public class DoctorController : ApiController
    {

        private IRequestHandler<Doctor> requestHandler;
        public DoctorController()
        {
            requestHandler = new GbApiRequestHandler<Doctor>();
        }

        [HttpGet]
        [Route("GetAll")]
        
        public HttpResponseMessage Get()
        {
            return requestHandler.GetObjects(Request);
        }

        [HttpGet]
        [Route("Get/{id}")]
        
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByCompanyId/{id}")]

        public HttpResponseMessage GetByCompanyId(int id)
        {
            return requestHandler.GetGbObjects(Request, id);
        }

        [HttpGet]
        [Route("associateDoctorWithCompany/{doctorId}/{CompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage AssociateDoctorWithCompany(int DoctorId, int CompanyId)
        {
            return requestHandler.AssociateDoctorWithCompany(Request, DoctorId, CompanyId);
        }

        [HttpGet]
        [Route("disassociateDoctorWithCompany/{doctorId}/{CompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage DisassociateDoctorWithCompany(int DoctorId, int CompanyId)
        {
            return requestHandler.DisassociateDoctorWithCompany(Request, DoctorId, CompanyId);
        }

        [HttpGet]
        [Route("getByLocationAndSpecialty/{locationId}/{SpecialtyId}")]
        public HttpResponseMessage GetByLocationAndSpecialty(int locationId, int specialtyId)
        {
            return requestHandler.GetByLocationAndSpecialty(Request, locationId, specialtyId);
        }

        [HttpGet]
        [Route("getBySpecialityInAllApp/{SpecialtyId}")]
        public HttpResponseMessage GetBySpecialityInAllApp(int specialtyId)
        {
            return requestHandler.GetBySpecialityInAllApp(Request, specialtyId);
        }

        // POST: api/Organizations
        [HttpPost]
        [Route("Add")]
        
        public HttpResponseMessage Post([FromBody]Doctor doctor)
        {
            return requestHandler.CreateGbObject(Request, doctor);
        }

        // PUT: api/Organizations/5
        [Route("Update")]
        [HttpPut]
        
        public HttpResponseMessage Put([FromBody]Doctor doctor)
        {
            return requestHandler.UpdateGbObject(Request, doctor);
        }

        // DELETE: api/Organizations/id={organizationId}
        [HttpDelete]
        [Route("Delete/{id}")]
        
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }


        // Unique Name Validation
        [HttpGet]
        [Route("IsUnique")]
        public HttpResponseMessage IsUnique([FromBody]Doctor doctor)
        {
            return requestHandler.ValidateUniqueName(Request, doctor);
        }

        [HttpGet]
        [Route("getReadingDoctors/{companyId}")]
        public HttpResponseMessage GetReadingDoctors(int companyId)
        {
            return requestHandler.GetObject(Request, companyId, string.Empty);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
