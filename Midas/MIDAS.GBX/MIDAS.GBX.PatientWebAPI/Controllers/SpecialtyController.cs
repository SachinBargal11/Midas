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
    [RoutePrefix("midaspatientapi/Specialty")]  
    public class SpecialtyController : ApiController
    {
        private IRequestHandler<Specialty> requestHandler;
        public SpecialtyController()
        {
            requestHandler = new GbApiRequestHandler<Specialty>();
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
