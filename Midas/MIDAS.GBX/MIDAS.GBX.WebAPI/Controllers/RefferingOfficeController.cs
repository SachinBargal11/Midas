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
    public class RefferingOfficeController : ApiController
    {
        private IRequestHandler<RefferingOffice> requestHandler;

        public RefferingOfficeController()
        {
            requestHandler = new GbApiRequestHandler<RefferingOffice>();
        }

        [HttpGet]
        [Route("Get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }
       
        [HttpGet]
        [Route("getByCaseId/{CaseId}")]
        public HttpResponseMessage GetByCaseId(int CaseId)
        {
            return requestHandler.GetByCaseId(Request, CaseId);
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

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
