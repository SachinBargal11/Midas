using MIDAS.GBX.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/PatientVisitEvent")]

    public class PatientVisitEventController : ApiController
    {
        private IRequestHandler<PatientVisitEvent> requestHandler;

        public PatientVisitEventController()
        {
            requestHandler = new GbApiRequestHandler<PatientVisitEvent>();
        }

        [HttpGet]
        [Route("get/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpPost]
        [Route("save")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]PatientVisitEvent data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("delete/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage DeleteById(int id)
        {
            return requestHandler.DeleteById(Request, id);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }


}
