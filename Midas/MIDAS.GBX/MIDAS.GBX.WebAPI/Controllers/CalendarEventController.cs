using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/calendarEvent")]
    public class CalendarEventController : ApiController
    {
        private IRequestHandler<CalendarEvent> requestHandler;

        public CalendarEventController()
        {
            requestHandler = new GbApiRequestHandler<CalendarEvent>();
        }

        [HttpGet]
        [Route("getFreeSlotsForDoctorByLocationId/{doctorId}/{locationId}/{startDate}/{endDate}")]
        public HttpResponseMessage GetFreeSlotsForDoctorByLocationId(int doctorId, int locationId, DateTime startDate, DateTime endDate)
        {
            return requestHandler.GetFreeSlotsForDoctorByLocationId(Request, doctorId, locationId, startDate, endDate);
        }

        [HttpGet]
        [Route("getFreeSlotsForRoomByLocationId/{RoomId}/{locationId}/{startDate}/{endDate}")]
        public HttpResponseMessage GetFreeSlotsForRoomByLocationId(int RoomId, int locationId, DateTime startDate, DateTime endDate)
        {
            return requestHandler.GetFreeSlotsForRoomByLocationId(Request, RoomId, locationId, startDate, endDate);
        }

        [HttpGet]
        [Route("getRecurrenceByCaseAndSpecialtyAndDoctorId/{caseId}/{specialtyId}/{doctorId}")]
        public HttpResponseMessage GetRecurrenceByCaseAndSpecialtyAndDoctorId(int caseId, int specialtyId, int doctorId)
        {
            return requestHandler.GetRecurrenceByCaseAndSpecialtyAndDoctorId(Request, caseId, specialtyId, doctorId);
        }
    }
}
