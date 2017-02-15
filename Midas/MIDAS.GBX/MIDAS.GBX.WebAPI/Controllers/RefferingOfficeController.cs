using MIDAS.GBX.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/RefferingOffice")]
    [AllowAnonymous]
    public class RefferingOfficeController : ApiController
    {
        private IRequestHandler<RefferingOffice> requestHandler;

        public RefferingOfficeController()
        {
            requestHandler = new GbApiRequestHandler<RefferingOffice>();
        }


        [HttpGet]
        [Route("Get/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByPatientId/{PatientId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByPatientId(int PatientId)
        {
            return requestHandler.GetByPatientId(Request, PatientId);
        }

        [HttpPost]
        [Route("Save")]
        public HttpResponseMessage Post([FromBody]RefferingOffice data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("Delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }

        //[HttpGet]
        //[Route("getCurrentROByPatientId/{PatientId}")]
        //[AllowAnonymous]
        //public HttpResponseMessage GetCurrentROByPatientId(int PatientId)
        //{
        //    return requestHandler.GetCurrentROByPatientId(Request, PatientId);
        //}

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
