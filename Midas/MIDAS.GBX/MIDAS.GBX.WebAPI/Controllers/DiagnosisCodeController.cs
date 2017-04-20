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
    [RoutePrefix("midasapi/DiagnosisCode")]

    public class DiagnosisCodeController : ApiController
    {
        private IRequestHandler<DiagnosisCode> requestHandler;

        public DiagnosisCodeController()
        {
            requestHandler = new GbApiRequestHandler<DiagnosisCode>();
        }

        [HttpGet]
        [Route("getByDiagnosisTypeId/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

       protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}