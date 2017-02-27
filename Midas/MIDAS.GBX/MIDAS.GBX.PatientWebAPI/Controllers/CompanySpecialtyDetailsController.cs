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
    [RoutePrefix("midaspatientapi/CompanySpecialtyDetails")]

      public class CompanySpecialtyDetailsController : ApiController
    {

        private IRequestHandler<CompanySpecialtyDetails> requestHandler;
        public CompanySpecialtyDetailsController()
        {
            requestHandler = new GbApiRequestHandler<CompanySpecialtyDetails>();
        }

        [HttpPost]
        [Route("GetAll")]

        public HttpResponseMessage Get([FromBody]CompanySpecialtyDetails data)
        {
            return requestHandler.GetGbObjects(Request, data);
        }

        [HttpGet]
        [Route("Get/{id}")]

        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        // POST: api/Organizations
        [HttpPost]
        [Route("Add")]

        public HttpResponseMessage Post([FromBody]CompanySpecialtyDetails data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

      
             

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }


}
