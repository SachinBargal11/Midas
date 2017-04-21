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
    [RoutePrefix("midaspatientapi/Location")]

    public class LocationController : ApiController
    {

        private IRequestHandler<Location> requestHandler;
        public LocationController()
        {
            requestHandler = new GbApiRequestHandler<Location>();
        }

        [HttpPost]
        [Route("GetAll")]
        [AllowAnonymous]
        public HttpResponseMessage Get([FromBody]Location data)
        {
            return requestHandler.GetGbObjects(Request, data);
        }

        [HttpGet]
        [Route("getAllLocationAndCompany")]
        [AllowAnonymous]
        public HttpResponseMessage GetAllLocationAndCompany()
        {
            return requestHandler.GetObjects(Request);
        }


        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
