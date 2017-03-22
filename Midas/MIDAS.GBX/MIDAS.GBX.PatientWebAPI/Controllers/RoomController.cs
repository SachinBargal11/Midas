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
    [RoutePrefix("midaspatientapi/Room")]
    public class RoomController : ApiController
    {
        private IRequestHandler<Room> requestHandler;
        public RoomController()
        {
            requestHandler = new GbApiRequestHandler<Room>();
        }

        [HttpGet]
        [Route("getByLocationId/{locationId}")]
        public HttpResponseMessage GetByLocationId(int LocationId)
        {
            return requestHandler.GetByLocationId(Request, LocationId);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
