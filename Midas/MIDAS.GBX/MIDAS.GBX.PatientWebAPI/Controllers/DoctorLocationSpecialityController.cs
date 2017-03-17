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
    [RoutePrefix("midaspatientapi/DoctorLocationSpeciality")]
    public class DoctorLocationSpecialityController : ApiController
    {

        private IRequestHandler<DoctorLocationSpeciality> requestHandler;
        private IRequestHandler<List<DoctorLocationSpeciality>> requestHandlerList;

        public DoctorLocationSpecialityController()
        {
            requestHandler = new GbApiRequestHandler<DoctorLocationSpeciality>();
            requestHandlerList = new GbApiRequestHandler<List<DoctorLocationSpeciality>>();
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

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
