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
    [RoutePrefix("midasapi/DiagnosisCodeCompanyMapping")]
    public class DiagnosisCodeCompanyMappingController : ApiController
    {
        private IRequestHandler<DiagnosisCodeCompanyMapping> requestHandler;

        public DiagnosisCodeCompanyMappingController()
        {
            requestHandler = new GbApiRequestHandler<DiagnosisCodeCompanyMapping>();
        }

        [HttpPost]
        [Route("save")]
        public HttpResponseMessage Post([FromBody]List<DiagnosisCodeCompanyMapping> data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("getByCompanyId/{id}")]
        public HttpResponseMessage GetByCompanyId(int id)
        {
            return requestHandler.GetGbObjects(Request, id);
        }

        [HttpGet]
        [Route("getByCompanyIdAndDiagnosisType/{companyId}/{diagnosisTypeCompnayID}")]
        public HttpResponseMessage getByCompanyIdAndDiagnosisType(int companyId, int diagnosisTypeCompnayID)
        {
            return requestHandler.GetGbObjects(Request, companyId, diagnosisTypeCompnayID);
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
