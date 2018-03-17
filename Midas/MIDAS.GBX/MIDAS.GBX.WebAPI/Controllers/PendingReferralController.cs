using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/PendingReferral")]
    public class PendingReferralController : ApiController
    {
        private IRequestHandler<PendingReferral> requestHandler;

        public PendingReferralController()
        {
            requestHandler = new GbApiRequestHandler<PendingReferral>();
        }

        [HttpGet]
        [Route("get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByCompanyId/{id}")]
        public HttpResponseMessage GetByCompanyId(int id)
        {
            return requestHandler.GetGbObjects(Request, id);
        }

        [HttpGet]
        [Route("getByDoctorId/{doctorId}")]
        public HttpResponseMessage GetByDoctorId(int doctorId)
        {
            return requestHandler.GetByDoctorId(Request, doctorId);
        }

        [HttpGet]
        [Route("getBySpecialityId/{specialtyId}")]
        public HttpResponseMessage GetBySpecialityId(int specialtyId)
        {
            return requestHandler.GetBySpecialityId(Request, specialtyId);
        }

        [HttpGet]
        [Route("getByRoomId/{roomId}")]
        public HttpResponseMessage GetByRoomId(int roomId)
        {
            return requestHandler.GetByRoomId(Request, roomId);
        }

        [HttpGet]
        [Route("getByPatientVisitId/{patientVisitId}")]
        public HttpResponseMessage GetByPatientVisitId(int patientVisitId)
        {
            return requestHandler.GetByPatientVisitId(Request, patientVisitId);
        }

        [HttpGet]
        [Route("getDoctorSignatureById/{doctorId}")]
        public HttpResponseMessage GetDoctorSignatureById(int doctorId)
        {
            return requestHandler.GetDoctorSignatureById(Request, doctorId);
        }

        [HttpGet]
        [Route("dismissPendingReferral/{PendingReferralId}/{userId}")]
        public HttpResponseMessage DismissPendingReferral(int PendingReferralId,int userId)
        {
            return requestHandler.DismissPendingReferral(Request, PendingReferralId, userId);
        }        

        [HttpPost]
        [Route("SaveList")]
        public HttpResponseMessage Post([FromBody]List<PendingReferral> pendingReferral)
        {
            return requestHandler.CreateGbObject(Request, pendingReferral);
        }

        [HttpGet]
        [Route("getPendingReferralByCompanyId/{CompanyId}")]
        public HttpResponseMessage GetPendingReferralByCompanyId(int CompanyId)
        {
            return requestHandler.GetPendingReferralByCompanyId(Request, CompanyId);
        }

        [HttpGet]
        [Route("getPendingReferralByCompanyId2/{CompanyId}")]
        public HttpResponseMessage GetPendingReferralByCompanyId2(int CompanyId)
        {
            return requestHandler.GetPendingReferralByCompanyId2(Request, CompanyId);
        }

        [HttpGet]
        [Route("getByPatientVisitIdWithProcedureCodes/{patientVisitId}")]
        public HttpResponseMessage GetByPatientVisitIdWithProcedureCodes(int patientVisitId)
        {
            return requestHandler.GetByPatientVisitIdWithProcedureCodes(Request, patientVisitId);
        }

     

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
