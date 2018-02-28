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
    [RoutePrefix("midaspatientapi/PatientPersonalSetting")]
    public class PatientPersonalSettingController : ApiController
    {
        private IRequestHandler<PatientPersonalSetting> requestHandler;

        public PatientPersonalSettingController()
        {
            requestHandler = new GbApiRequestHandler<PatientPersonalSetting>();
        }

        [HttpGet]
        [Route("Get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByPatientId/{patientId}")]
        public HttpResponseMessage GetByPatientId(int patientId)
        {
            return requestHandler.GetByPatientId(Request, patientId);
        }

        [HttpPost]
        [Route("Save")]
        public HttpResponseMessage Post([FromBody]PatientPersonalSetting data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        //[HttpGet]
        //[Route("Delete/{id}")]
        //public HttpResponseMessage Delete(int id)
        //{
        //    return requestHandler.Delete(Request, id);
        //}

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
