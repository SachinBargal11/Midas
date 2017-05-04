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
        [AllowAnonymous]
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
        [Route("dismissPendingReferral/{PendingReferralId}/{userId}")]

        public HttpResponseMessage DismissPendingReferral(int PendingReferralId,int userId)
        {
            return requestHandler.DismissPendingReferral(Request, PendingReferralId, userId);
        }
        

        [HttpPost]
        [Route("Add")]

        public HttpResponseMessage Post([FromBody]PendingReferral pendingReferral)
        {
            return requestHandler.CreateGbObject(Request, pendingReferral);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
