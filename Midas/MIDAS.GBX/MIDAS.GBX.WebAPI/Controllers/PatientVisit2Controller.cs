﻿using MIDAS.GBX.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/patientVisit")]
    public class PatientVisit2Controller : ApiController
    {
        private IRequestHandler<PatientVisit2> requestHandler;

        public PatientVisit2Controller()
        {
            requestHandler = new GbApiRequestHandler<PatientVisit2>();
        }

        [HttpGet]
        [Route("getByLocationId/{locationId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByLocationId(int locationId)
        {
            return requestHandler.GetByLocationId(Request, locationId);
        }

        [HttpGet]
        [Route("getByLocationAndRoomId/{locationId}/{roomId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByLocationAndRoomId(int locationId, int roomId)
        {
            return requestHandler.GetGbObjects(Request, locationId, roomId);
        }

        [HttpGet]
        [Route("getByLocationAndDoctorId/{locationId}/{doctorId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByLocationAndDoctorId(int locationId, int doctorId)
        {
            return requestHandler.GetGbObjects2(Request, locationId, doctorId);
        }

        [HttpGet]
        [Route("getByDoctorId/{doctorId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByDoctorId(int doctorId)
        {
            return requestHandler.GetByDoctorId(Request, doctorId);
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
        [Route("getByDates/{FromDate}/{ToDate}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByDates(DateTime FromDate,DateTime ToDate)
        {
            return requestHandler.GetByDates(Request, FromDate, ToDate);
        }

        [HttpGet]
        [Route("getByPatientName/{Name}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByName(string Name)
        {
            return requestHandler.GetObjects(Request, Name);
        }

        [HttpGet]
        [Route("addUploadedFileData/{id}/{FileUploadPath}")]
        [AllowAnonymous]
        public HttpResponseMessage AddUploadedFileData(int id,string FileUploadPath)
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




        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
