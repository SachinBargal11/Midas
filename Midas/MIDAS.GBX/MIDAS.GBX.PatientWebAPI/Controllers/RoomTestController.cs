using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.PatientWebAPI.RequestHandler;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{
    [RoutePrefix("midaspatientapi/RoomTest")]
    public class RoomTestController : ApiController
    {
        private IRequestHandler<RoomTest> requestHandler;
        public RoomTestController()
        {
            requestHandler = new GbApiRequestHandler<RoomTest>();
        }

        [HttpGet]
        [Route("getByRoomId/{RoomId}")]
        public HttpResponseMessage GetByRoomId(int RoomId)
        {
            return requestHandler.GetByRoomId(Request, RoomId);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
