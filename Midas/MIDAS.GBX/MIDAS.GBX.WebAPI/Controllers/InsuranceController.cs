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
    [RoutePrefix("midasapi/Insurance")]

    public class InsuranceController : ApiController
    {
        private IRequestHandler<InsuranceInfo> requestHandler;

        public InsuranceController()
        {
            requestHandler = new GbApiRequestHandler<InsuranceInfo>();
        }

        // GET: api/Organizations/5
        [HttpGet]
        [Route("Get/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("GetAll")]
        [AllowAnonymous]
        public HttpResponseMessage GetAllPatient([FromBody]InsuranceInfo data)
        {
            return requestHandler.GetGbObjects(Request, data);
        }

        [HttpPost]
        [Route("Save")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]InsuranceInfo data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }




        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}