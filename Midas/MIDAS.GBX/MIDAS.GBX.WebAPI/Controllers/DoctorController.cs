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
    [RoutePrefix("midasapi/Doctor")]
    public class DoctorController : ApiController
    {
        private IRequestHandler<Doctor> requestHandler;
        private IRequestHandler<MapDoctorToCompnay> requestHandlerMapDoctor;

        public DoctorController()
        {
            requestHandler = new GbApiRequestHandler<Doctor>();
            requestHandlerMapDoctor = new GbApiRequestHandler<MapDoctorToCompnay>();
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
        public HttpResponseMessage AssociateDoctorWithCompany(int DoctorId, int CompanyId)
        {
            return requestHandler.AssociateDoctorWithCompany(Request, DoctorId, CompanyId);
        }

        [HttpGet]
        [Route("disassociateDoctorWithCompany/{doctorId}/{CompanyId}")]
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
        [Route("getByLocationAndRoomTest/{locationId}/{roomTestId}")]
        public HttpResponseMessage GetByLocationAndRoomTest(int locationId, int roomTestId)
        {
            return requestHandler.Get1(Request, locationId, roomTestId);
        }

        [HttpGet]
        [Route("getBySpecialityInAllApp/{SpecialtyId}")]
        public HttpResponseMessage GetBySpecialityInAllApp(int specialtyId)
        {
            return requestHandler.GetBySpecialityInAllApp(Request, specialtyId);
        }

        [HttpGet]
        [Route("getAllDoctorSpecialityByCompany/{CompnayId}")]
        public HttpResponseMessage GetAllDoctorSpecialityByCompany(int compnayId)
        {
            return requestHandler.GetAllDoctorSpecialityByCompany(Request, compnayId);
        }

        [HttpGet]
        [Route("getAllDoctorTestSpecialityByCompany/{CompnayId}")]
        public HttpResponseMessage GetAllDoctorTestSpecialityByCompany(int compnayId)
        {
            return requestHandler.GetAllDoctorTestSpecialityByCompany(Request, compnayId);
        }

        [HttpPost]
        [Route("Add")]        
        public HttpResponseMessage Post([FromBody]Doctor doctor)
        {
            return requestHandler.CreateGbObject(Request, doctor);
        }

        [Route("Update")]
        [HttpPut]
        
        public HttpResponseMessage Put([FromBody]Doctor doctor)
        {
            return requestHandler.UpdateGbObject(Request, doctor);
        }

        [HttpDelete]
        [Route("Delete/{id}")]        
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }

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

        [HttpGet]
        [Route("getReadingDoctors/{companyId}/{locationId}/{testId}")]
        public HttpResponseMessage GetReadingDoctors(int companyId, int locationId, int testId)
        {
            return requestHandler.GetObject(Request, companyId, locationId.ToString(), testId.ToString());  
        }

        [HttpGet]
        [Route("getDoctorTaxTypes")]
        public HttpResponseMessage GetDoctorTaxTypes()
        {
            return requestHandler.GetDoctorTaxTypes(Request);
        }

        [HttpGet]
        [Route("DisassociateDoctorWithCompanyandAppointment/{doctorId}/{CompanyId}")]
        public HttpResponseMessage DisassociateDoctorWithCompanyandAppointment(int DoctorId, int CompanyId)
        {
            return requestHandler.DisassociateDoctorWithCompanyandAppointment(Request, DoctorId, CompanyId);
        }

        [HttpPost]
        [Route("getDoctorByIDAndCompnayID")]
        public HttpResponseMessage GetDoctorByIDAndCompnayID([FromBody]MapDoctorToCompnay User)
        {
            return requestHandlerMapDoctor.GetDoctorByIDAndCompnayID(Request, User.CurrentUserId, User.CompanyID);
        }


        [HttpGet]
        [Route("getDoctorsByCompanyIdAndSpeciality/{companyId}/{specialtyId}")]
        public HttpResponseMessage GetDoctorsByCompanyIdAndSpeciality(int companyId,int specialtyId)
        {
            return requestHandler.GetDoctorsByCompanyIdAndSpeciality(Request, companyId, specialtyId);
        }

        [HttpGet]
        [Route("getDoctorsByCompanyIdAndTestSpeciality/{companyId}/{roomTestId}")]
        public HttpResponseMessage GetDoctorsByCompanyIdAndTestSpeciality(int companyId, int roomTestId)
        {
            return requestHandler.GetDoctorsByCompanyIdAndTestSpeciality(Request, companyId, roomTestId);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
