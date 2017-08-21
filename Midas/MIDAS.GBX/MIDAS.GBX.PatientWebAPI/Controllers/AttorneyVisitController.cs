using MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.PatientWebAPI.RequestHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{
    [RoutePrefix("midaspatientapi/attorneyVisit")]
    public class AttorneyVisitController : ApiController
    {
        private IRequestHandler<AttorneyVisit> requestHandler;

        public AttorneyVisitController()
        {
            requestHandler = new GbApiRequestHandler<AttorneyVisit>();
        }

        [HttpGet]
        [Route("getByPatientId/{PatientId}")]
        public HttpResponseMessage GetByPatientId(int PatientId)
        {
            return requestHandler.GetByPatientId(Request, PatientId);
        }
    }
}
