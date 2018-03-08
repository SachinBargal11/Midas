using MIDAS.GBX.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/patientVisit")]
    public class PatientVisitController : ApiController
    {
        private IRequestHandler<PatientVisit> requestHandler;
        //private IRequestHandler<IMEVisit> requestHandler1;

        public PatientVisitController()
        {
            requestHandler = new GbApiRequestHandler<PatientVisit>();
            //requestHandler1 = new GbApiRequestHandler<IMEVisit>();
        }

        [HttpGet]
        [Route("getByLocationId/{locationId}")]
        public HttpResponseMessage GetByLocationId(int locationId)
        {
            return requestHandler.GetByLocationId(Request, locationId);
        }

        [HttpGet]
        [Route("getByLocationAndRoomId/{locationId}/{roomId}")]
        public HttpResponseMessage GetByLocationAndRoomId(int locationId, int roomId)
        {
            return requestHandler.GetGbObjects(Request, locationId, roomId);
        }

        [HttpGet]
        [Route("getByLocationAndDoctorId/{locationId}/{doctorId}")]
        public HttpResponseMessage GetByLocationAndDoctorId(int locationId, int doctorId)
        {
            return requestHandler.GetGbObjects2(Request, locationId, doctorId);
        }        

        [HttpGet]
        [Route("getByDoctorId/{doctorId}")]
        public HttpResponseMessage GetByDoctorId(int doctorId)
        {
            return requestHandler.GetByDoctorId(Request, doctorId);
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
        [Route("getByDoctorAndDates/{DoctorId}/{medicalProviderId}/{FromDate}/{ToDate}")]
        public HttpResponseMessage GetByDates(int DoctorId,int medicalProviderId, DateTime FromDate,DateTime ToDate)
        {
            return requestHandler.GetByDoctorAndDates(Request, DoctorId, medicalProviderId, FromDate, ToDate);
        }

        [HttpGet]
        [Route("getByDoctorDatesAndName/{DoctorId}/{FromDate}/{ToDate}/{Name}")]
        public HttpResponseMessage GetByDoctorDatesAndName(int DoctorId, DateTime FromDate, DateTime ToDate,string Name)
        {
            return requestHandler.GetByDoctorDatesAndName(Request,DoctorId, FromDate, ToDate, Name);
        }

        [HttpGet]
        [Route("addUploadedFileData/{id}/{FileUploadPath}")]
        public HttpResponseMessage AddUploadedFileData(int id,string FileUploadPath)
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
        [Route("GetAll")]
        public HttpResponseMessage Get()
        {
            return requestHandler.GetObjects(Request);
        }

        [HttpGet]
        [Route("cancelSingleEventOccurrence/{patientVisitId}/{cancelEventStart}")]
        public HttpResponseMessage CancelSingleEventOccurrence(int patientVisitId, DateTime cancelEventStart)
        {
            return requestHandler.CancelSingleEventOccurrence(Request, patientVisitId, cancelEventStart);
        }

        [HttpGet]
        [Route("getByLocationDoctorAndSpecialityId/{locationId}/{doctorId}/{specialtyId}")]
        public HttpResponseMessage GetByLocationDoctorAndSpecialityId(int locationId, int doctorId, int specialtyId)
        {
            return requestHandler.GetByLocationDoctorAndSpecialityId(Request, locationId, doctorId, specialtyId);
        }

        [HttpGet]
        [Route("getByLocationDoctorAndRoomId/{locationId}/{doctorId}/{roomId}")]
        public HttpResponseMessage GetByLocationDoctoryAndRoomId(int locationId, int doctorId, int roomId)
        {
            return requestHandler.GetByLocationDoctorAndRoomId(Request, locationId, doctorId, roomId);
        }

        [HttpGet]
        [Route("getByCompanyId/{CompanyId}")]
        public HttpResponseMessage GetByCompanyId(int CompanyId)
        {
            return requestHandler.GetByCompanyId(Request, CompanyId);
        }

        [HttpGet]
        [Route("getByCompanyAndDoctorId/{CompanyId}/{DoctorId}")]
        public HttpResponseMessage GetByCompanyAndDoctorId(int CompanyId, int DoctorId)
        {
            return requestHandler.GetByCompanyAndDoctorId(Request, CompanyId, DoctorId);
        }

        [HttpGet]
        [Route("getByLocationDoctorAndCompanyId/{locationId}/{doctorId}/{companyId}")]
        public HttpResponseMessage GetByLocationAndDoctorId(int locationId, int doctorId, int companyId)
        {
            return requestHandler.GetByLocationDoctorAndCompanyId(Request, locationId, doctorId, companyId);
        }

        [HttpGet]
        [Route("getVisitStatusbyPatientVisitSpecialityId/{patientVisitId}/{specialityId}")]
        public HttpResponseMessage GetVisitStatusbyPatientVisitSpecialityId(int patientVisitId, int specialityId)
        {
            return requestHandler.GetVisitStatusbyPatientVisitSpecialityId(Request, patientVisitId, specialityId);
        }

        [HttpGet]
        [Route("getVisitStatusbyPatientVisitRoomTestId/{patientVisitId}/roomTestId")]
        public HttpResponseMessage GetVisitStatusbyPatientVisitRoomTestId(int patientVisitId, int roomTestId)
        {
            return requestHandler.GetVisitStatusbyPatientVisitRoomTestId(Request, patientVisitId, roomTestId);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
