using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using MIDAS.GBX.PatientWebAPI.RequestHandler;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{
    [RoutePrefix("midaspatientapi/Doctor")]

    public class DoctorController : ApiController
    {

        private IRequestHandler<Doctor> requestHandler;
        public DoctorController()
        {
            requestHandler = new GbApiRequestHandler<Doctor>();
        }

        [HttpGet]
        [Route("Get/{id}")]

        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByCompanyId/{id}")]

        public HttpResponseMessage GetByCompanyId(int id)
        {
            return requestHandler.GetGbObjects(Request, id);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
