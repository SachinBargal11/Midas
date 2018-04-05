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
using MIDAS.GBX.WebAPI.Filters;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/DoctorLocationSchedule")]
    public class DoctorLocationScheduleController : ApiController
    {

        private IRequestHandler<DoctorLocationSchedule> requestHandler;
        private IRequestHandler<List<DoctorLocationSchedule>> requestHandlerList;

        public DoctorLocationScheduleController()
        {
            requestHandler = new GbApiRequestHandler<DoctorLocationSchedule>();
            requestHandlerList = new GbApiRequestHandler<List<DoctorLocationSchedule>>();
        }


        [HttpGet]
        [Route("GetAll")]
        public HttpResponseMessage Get()
        {
            return requestHandler.GetObjects(Request);
        }

        [HttpGet]
        [Route("GetByLocationId/{id}")]
        public HttpResponseMessage GetByLocationId(int id)
        {
            return requestHandler.GetByLocationId(Request, id);
        }

        [HttpGet]
        [Route("GetByLocationSpecalityId/{id}/{specialityId}")]
        public HttpResponseMessage GetByLocationSpecalityId(int id, int specialityId)
        {
            return requestHandler.GetByLocationSpecalityId(Request, id, specialityId);
        }

        [HttpGet]
        [Route("GetByDoctorId/{id}")]
        public HttpResponseMessage GetByDoctorId(int id)
        {
            return requestHandler.GetByDoctorId(Request, id);
        }

        [HttpGet]
        [Route("getByDoctorAndCompanyId/{doctorId}/{companyId}")]
        public HttpResponseMessage GetByDoctorAndCompanyId(int doctorId, int companyId)
        {
            return requestHandler.GetByDoctorAndCompanyId(Request, doctorId, companyId);
        }


        [HttpGet]
        [Route("GetByLocationAndDoctor/{locationId}/{doctorId}")]
        public HttpResponseMessage GetByLocationAndDoctor(int locationId,int doctorId)
        {
            return requestHandler.GetGbObjects(Request, locationId, doctorId);
        }

        [HttpGet]
        [Route("Get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        // POST: api/Organizations

        [HttpPost]
        [Route("Add")]
        public HttpResponseMessage Post([FromBody]DoctorLocationSchedule data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpPost]
        [Route("associateLocationToDoctors")]
        public HttpResponseMessage AssociateLocationToDoctors([FromBody]List<DoctorLocationSchedule> data)
        {
            return requestHandlerList.CreateGbObject1(Request, data);
        }

        [HttpPost]
        [Route("associateDoctorToLocations")]
        public HttpResponseMessage AssociateDoctorToLocations([FromBody]List<DoctorLocationSchedule> data)
        {
            return requestHandlerList.CreateGb(Request, data);
        }


        // PUT: api/Organizations/5

        [Route("Update")]
        [HttpPut]
        public HttpResponseMessage Put([FromBody]DoctorLocationSchedule User)
        {
            return requestHandler.UpdateGbObject(Request, User);
        }

        // DELETE: api/Organizations/id={organizationId}

        [HttpPost]
        [Route("Delete")]
        public HttpResponseMessage Delete([FromBody]DoctorLocationSchedule User)
        {
            return requestHandler.DeleteObj(Request, User);
        }

        //[HttpDelete]
        [HttpPost]
        [Route("Delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }

        //[HttpDelete]
        [HttpPost]
        [Route("DeleteAllAppointmentsandDoctorLocationSchedule")]
        public HttpResponseMessage DeleteAllAppointmentsandDoctorLocationSchedule([FromBody]DoctorLocationSchedule User)
        {
            return requestHandler.DeleteAllAppointmentsandDoctorLocationSchedule(Request, User);
        }


        // Unique Name Validation

        [HttpGet]
        [Route("IsUnique")]
        public HttpResponseMessage IsUnique([FromBody]DoctorLocationSchedule User)
        {
            return requestHandler.ValidateUniqueName(Request, User);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
