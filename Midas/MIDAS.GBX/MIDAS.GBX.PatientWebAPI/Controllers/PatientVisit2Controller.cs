﻿using MIDAS.GBX.BusinessObjects;
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


        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}