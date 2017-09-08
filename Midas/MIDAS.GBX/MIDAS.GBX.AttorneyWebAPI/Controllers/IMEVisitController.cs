using MIDAS.GBX.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.AttorneyWebAPI.Controllers
{
    [RoutePrefix("midasattorneyapi/IMEVisit")]
    public class IMEVisitController : ApiController
    {
        private IRequestHandler<IMEVisit> requestHandler;

        public IMEVisitController()
        {
            requestHandler = new GbApiRequestHandler<IMEVisit>();
        }

        [HttpPost]
        [Route("SaveIMEVisit")]
        public HttpResponseMessage SaveIMEVisit([FromBody]IMEVisit data)
        {
            return requestHandler.CreateGbObject3(Request, data);
        }

        [HttpGet]
        [Route("getByCompanyId/{id}")]
        public HttpResponseMessage GetByCompanyId(int id)
        {
            return requestHandler.GetGbObjects(Request, id);
        }

        [HttpGet]
        [Route("getByPatientId/{PatientId}")]
        public HttpResponseMessage GetByPatientId(int PatientId)
        {
            return requestHandler.GetByPatientId(Request, PatientId);
        }
    }
}
