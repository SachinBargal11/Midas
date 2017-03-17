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
    [RoutePrefix("midasapi/DoctorLocationSpeciality")]
    public class DoctorLocationSpecialityController : ApiController
    {

        private IRequestHandler<DoctorLocationSpeciality> requestHandler;
        private IRequestHandler<List<DoctorLocationSpeciality>> requestHandlerList;

        public DoctorLocationSpecialityController()
        {
            requestHandler = new GbApiRequestHandler<DoctorLocationSpeciality>();
            requestHandlerList = new GbApiRequestHandler<List<DoctorLocationSpeciality>>();
        }


        [HttpPost]
        [Route("associateLocationToDoctors")]
        public HttpResponseMessage AssociateLocationToDoctors([FromBody]List<DoctorLocationSpeciality> data)
        {

            return requestHandlerList.CreateGbObject1(Request, data);
        }

        [HttpPost]
        [Route("associateDoctorToLocations")]
        public HttpResponseMessage AssociateDoctorToLocations([FromBody]List<DoctorLocationSpeciality> data)
        {
            return requestHandlerList.CreateGb(Request, data);
        }      

        [HttpGet]
        [Route("GetByLocationId/{id}")]
        public HttpResponseMessage GetByLocationId(int id)
        {
            return requestHandler.GetByLocationId(Request, id);
        }

        [HttpGet]
        [Route("GetByDoctorId/{id}")]
        public HttpResponseMessage GetByDoctorId(int id)
        {
            return requestHandler.GetByDoctorId(Request, id);
        }

        [HttpGet]
        [Route("GetByLocationAndDoctor/{locationId}/{doctorId}")]
        public HttpResponseMessage GetByLocationAndDoctor(int locationId, int doctorId)
        {
            return requestHandler.GetGbObjects(Request, locationId, doctorId);
        }

        [HttpGet]
        [Route("Get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpDelete]
        [HttpPost]
        [Route("Delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }

        [HttpPost]
        [Route("Add")]
        public HttpResponseMessage Post([FromBody]DoctorLocationSpeciality data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}

