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
    [RoutePrefix("midasapi/Case")]

    public class CaseController : ApiController
    {
        private IRequestHandler<Case> requestHandler;

        public CaseController()
        {
            requestHandler = new GbApiRequestHandler<Case>();
        }

        // GET: api/Organizations/5
        [HttpGet]
        [Route("Get/{id}")]

        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("GetAll")]

        public HttpResponseMessage Get([FromBody]Case data)
        {
            return requestHandler.GetGbObjects(Request, data);
        }

       
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}