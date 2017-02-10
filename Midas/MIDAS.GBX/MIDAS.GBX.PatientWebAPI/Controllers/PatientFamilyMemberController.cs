using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.PatientWebAPI.RequestHandler;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{
    [RoutePrefix("midaspatientapi/PatientFamilyMember")]

    public class PatientFamilyMemberController : ApiController
    {
        private IRequestHandler<PatientFamilyMember> requestHandler;

        public PatientFamilyMemberController()
        {
            requestHandler = new GbApiRequestHandler<PatientFamilyMember>();
        }


        [HttpGet]
        [Route("getByPatientId/{PatientId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByPatientId(int PatientId)
        {
            return requestHandler.GetByPatientId(Request, PatientId);
        }



        [HttpPost]
        [Route("save")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]PatientFamilyMember data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }


        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
