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
    [RoutePrefix("midaspatientapi/schedule")]  
    public class ScheduleController : ApiController
    {
        private IRequestHandler<Schedule> requestHandler;
        public ScheduleController()
        {
            requestHandler = new GbApiRequestHandler<Schedule>();
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
