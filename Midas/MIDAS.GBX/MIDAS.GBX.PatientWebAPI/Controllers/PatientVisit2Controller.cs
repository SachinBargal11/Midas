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
    [RoutePrefix("midaspatientapi/patientVisit")]
    public class PatientVisit2Controller : ApiController
    {
        private IRequestHandler<PatientVisit2> requestHandler;

        public PatientVisit2Controller()
        {
            requestHandler = new GbApiRequestHandler<PatientVisit2>();
        }

        [HttpGet]
        [Route("getByDoctorId/{doctorId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByDoctorId(int doctorId)
        {
            return requestHandler.GetByDoctorId(Request, doctorId);
        }

        [HttpGet]
        [Route("getByLocationId/{locationId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByLocationId(int locationId)
        {
            return requestHandler.GetByLocationId(Request, locationId);
        }

        [HttpGet]
        [Route("getByLocationAndDoctorId/{locationId}/{doctorId}")]
        public HttpResponseMessage GetByLocationAndDoctorId(int locationId, int doctorId)
        {
            return requestHandler.GetGbObjects2(Request, locationId, doctorId);
        }

        [HttpPost]
        [Route("Save")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]PatientVisit2 data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("DeleteVisit/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage DeleteVisit(int id)
        {
            return requestHandler.DeleteVisit(Request, id);
        }

        [HttpGet]
        [Route("DeleteCalendarEvent/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage DeleteCalendarEvent(int id)
        {
            return requestHandler.DeleteCalendarEvent(Request, id);
        }

        [HttpGet]
        [Route("CancleVisit/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage CancleVisit(int id)
        {
            return requestHandler.CancleVisit(Request, id);
        }

        [HttpGet]
        [Route("CancleCalendarEvent/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage CancleCalendarEvent(int id)
        {
            return requestHandler.CancleCalendarEvent(Request, id);
        }

        [HttpGet]
        [Route("getByCaseId/{CaseId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByCaseId(int CaseId)
        {
            return requestHandler.GetByCaseId(Request, CaseId);
        }

        [HttpGet]
        [Route("addUploadedFileData/{id}/{FileUploadPath}")]
        [AllowAnonymous]
        public HttpResponseMessage AddUploadedFileData(int id, string FileUploadPath)
        {
            return requestHandler.AddUploadedFileData(Request, id, FileUploadPath);
        }

        [HttpGet]
        [Route("getDocumentList/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage GetDocumentList(int id)
        {
            return requestHandler.GetDocumentList(Request, id);
        }

        [HttpGet]
        [Route("get/{id}")]
        [AllowAnonymous]
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
