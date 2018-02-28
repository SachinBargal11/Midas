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
    [RoutePrefix("midasapi/DiagnosisTypeCompany")]
    public class DiagnosisTypeComapanyController : ApiController
    {
        private IRequestHandler<DiagnosisTypeCompany> requestHandler;

        public DiagnosisTypeComapanyController()
        {
            requestHandler = new GbApiRequestHandler<DiagnosisTypeCompany>();
        }

        [HttpGet]
        [Route("getAll")]
        public HttpResponseMessage Get()
        {
            return requestHandler.GetObjects(Request);
        }

        [HttpGet]
        [Route("getByCompanyId/{id}")]
        public HttpResponseMessage GetByCompanyId(int id)
        {
            return requestHandler.GetGbObjects(Request, id);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}