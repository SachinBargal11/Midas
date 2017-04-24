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
    [RoutePrefix("midaspatientapi/DoctorLocationSchedule")]
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
        [Route("GetByLocationId/{id}")]
        public HttpResponseMessage GetByLocationId(int id)
        {
            return requestHandler.GetByLocationId(Request, id);
        }

        [HttpGet]
        [Route("GetByLocationAndDoctor/{locationId}/{doctorId}")]
        public HttpResponseMessage GetByLocationAndDoctor(int locationId, int doctorId)
        {
            return requestHandler.GetGbObjects(Request, locationId, doctorId);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
