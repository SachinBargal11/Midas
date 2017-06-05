using System;
using System.Collections.Generic;
using System.Net.Http;
using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.AncillaryWebAPI.Controllers
{
    [RoutePrefix("midasancillaryapi/patientVisit")]
    public class PatientVisit2Controller : ApiController
    {
        private IRequestHandler<PatientVisit2> requestHandler;

        public PatientVisit2Controller()
        {
            requestHandler = new GbApiRequestHandler<PatientVisit2>();
        }

       

        [HttpPost]
        [Route("Save")]
        public HttpResponseMessage Post([FromBody]PatientVisit2 data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }


        [HttpGet]
        [Route("getByAncillaryId/{AncillaryId}")]
        public HttpResponseMessage GetByAncillaryId(int AncillaryId)
        {
            return requestHandler.GetByAncillaryId(Request, AncillaryId);
        }

        
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
