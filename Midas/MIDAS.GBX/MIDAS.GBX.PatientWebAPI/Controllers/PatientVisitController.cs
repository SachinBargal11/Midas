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
    public class PatientVisitController : ApiController
    {
        private IRequestHandler<PatientVisit> requestHandler;

        public PatientVisitController()
        {
            requestHandler = new GbApiRequestHandler<PatientVisit>();
        }

        [HttpGet]
        [Route("getByDoctorId/{doctorId}")]
        public HttpResponseMessage GetByDoctorId(int doctorId)
        {
            return requestHandler.GetByDoctorId(Request, doctorId);
        }

        [HttpGet]
        [Route("getByLocationId/{locationId}")]
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
        public HttpResponseMessage Post([FromBody]PatientVisit data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("DeleteVisit/{id}")]
        public HttpResponseMessage DeleteVisit(int id)
        {
            return requestHandler.DeleteVisit(Request, id);
        }

        [HttpGet]
        [Route("DeleteCalendarEvent/{id}")]
        public HttpResponseMessage DeleteCalendarEvent(int id)
        {
            return requestHandler.DeleteCalendarEvent(Request, id);
        }

        [HttpGet]
        [Route("CancleVisit/{id}")]
        public HttpResponseMessage CancleVisit(int id)
        {
            return requestHandler.CancleVisit(Request, id);
        }

        [HttpGet]
        [Route("CancleCalendarEvent/{id}")]
        public HttpResponseMessage CancleCalendarEvent(int id)
        {
            return requestHandler.CancleCalendarEvent(Request, id);
        }

        [HttpGet]
        [Route("getByCaseId/{CaseId}")]
        public HttpResponseMessage GetByCaseId(int CaseId)
        {
            return requestHandler.GetByCaseId(Request, CaseId);
        }

        [HttpGet]
        [Route("addUploadedFileData/{id}/{FileUploadPath}")]
        public HttpResponseMessage AddUploadedFileData(int id, string FileUploadPath)
        {
            return requestHandler.AddUploadedFileData(Request, id, FileUploadPath);
        }

        [HttpGet]
        [Route("getDocumentList/{id}")]
        public HttpResponseMessage GetDocumentList(int id)
        {
            return requestHandler.GetDocumentList(Request, id);
        }

        [HttpGet]
        [Route("get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByLocationAndPatientId/{locationId}/{patientId}")]
        public HttpResponseMessage GetByLocationAndPatientId(int locationId, int patientId)
        {
            return requestHandler.GetByLocationAndPatientId(Request, locationId, patientId);
        }

        [HttpGet]
        [Route("getByLocationDoctorAndPatientId/{locationId}/{doctorId}/{patientId}")]
        public HttpResponseMessage GetByLocationDoctorAndPatientId(int locationId, int doctorId, int patientId)
        {
            return requestHandler.GetByLocationDoctorAndPatientId(Request, locationId, doctorId, patientId);
        }

        [HttpGet]
        [Route("getByLocationAndRoomId/{locationId}/{roomId}")]
        public HttpResponseMessage GetByLocationAndRoomId(int locationId, int roomId)
        {
            return requestHandler.GetGbObjects(Request, locationId, roomId);
        }
        
        [HttpGet]
        [Route("getByLocationRoomAndPatientId/{locationId}/{roomId}/{patientId}")]
        public HttpResponseMessage GetByLocationRoomAndPatientId(int locationId, int roomId, int patientId)
        {
            return requestHandler.GetByLocationRoomAndPatientId(Request, locationId, roomId, patientId);
        }

        [HttpGet]
        [Route("getByPatientIdAndLocationId/{PatientId}/{LocationId}")]
        public HttpResponseMessage GetByPatientIdAndLocationId(int PatientId, int LocationId)
        {
            return requestHandler.GetByPatientIdAndLocationId(Request, PatientId, LocationId);
        }

        [HttpGet]
        [Route("getLocationForPatientId/{patientId}")]
        public HttpResponseMessage GetLocationForPatientId(int patientId)
        {
            return requestHandler.GetLocationForPatientId(Request, patientId);
        }
        
        [HttpGet]
        [Route("getVisitsByPatientId/{PatientId}")]
        public HttpResponseMessage GetVisitsByPatientId(int PatientId)
        {
            return requestHandler.GetVisitsByPatientId(Request, PatientId);
        }

        [HttpGet]
        [Route("getByPatientId/{PatientId}")]
        public HttpResponseMessage GetByPatientId(int PatientId)
        {
            return requestHandler.GetByPatientId(Request, PatientId);
        }

        [HttpGet]
        [Route("delete/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }

        [HttpGet]
        [Route("cancelSingleEventOccurrence/{patientVisitId}/{cancelEventStart}")]
        public HttpResponseMessage CancelSingleEventOccurrence(int patientVisitId, DateTime cancelEventStart)
        {
            return requestHandler.CancelSingleEventOccurrence(Request, patientVisitId, cancelEventStart);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
