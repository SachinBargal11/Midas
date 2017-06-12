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
    [RoutePrefix("midasapi/ProcedureCodeCompanyMapping")]

    public class ProcedureCodeCompanyMappingController : ApiController
    {
        private IRequestHandler<ProcedureCodeCompanyMapping> requestHandler;

        public ProcedureCodeCompanyMappingController()
        {
            requestHandler = new GbApiRequestHandler<ProcedureCodeCompanyMapping>();
        }




        [HttpPost]
        [Route("save")]
        public HttpResponseMessage Post([FromBody]List<ProcedureCodeCompanyMapping> data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpDelete]
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
