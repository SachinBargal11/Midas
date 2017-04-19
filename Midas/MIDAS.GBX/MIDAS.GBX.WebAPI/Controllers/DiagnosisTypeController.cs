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
    [RoutePrefix("midasapi/DiagnosisType")]

    public class DiagnosisTypeController : ApiController
    {
        private IRequestHandler<DiagnosisType> requestHandler;

        public DiagnosisTypeController()
        {
            requestHandler = new GbApiRequestHandler<DiagnosisType>();
        }

        [HttpGet]
        [Route("getAll")]
        public HttpResponseMessage Get()
        {
            return requestHandler.GetObjects(Request);
        }

        //[HttpGet]
        //[Route("getByCompanyId/{id}")]
        //public HttpResponseMessage GetByCompanyId(int id)
        //{
        //    return requestHandler.GetGbObjects(Request, id);
        //}

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}