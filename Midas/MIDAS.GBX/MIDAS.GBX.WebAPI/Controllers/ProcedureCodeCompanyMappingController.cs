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
    [Authorize]
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

        [HttpGet]
        [Route("getByCompanyId/{id}")]
        public HttpResponseMessage GetByCompanyId(int id)
        {
            return requestHandler.GetGbObjects(Request, id);
        }

        [HttpGet]
        [Route("getByCompanyAndSpecialtyId/{companyId}/{specialtyId}")]
        public HttpResponseMessage GetByCompanyAndSpecialtyId(int companyId, int specialtyId)
        {
            return requestHandler.GetGbObjects(Request, companyId, specialtyId);
        }

        [HttpGet]
        [Route("getByCompanyAndRoomTestId/{companyId}/{roomTestId}")]
        public HttpResponseMessage GetByCompanyAndRoomTestId(int companyId, int roomTestId)
        {
            return requestHandler.GetGbObjects2(Request, companyId, roomTestId);
        }

        [HttpGet]
        [Route("getByCompanyAndSpecialtyIdForVisit/{companyId}/{specialtyId}")]
        public HttpResponseMessage GetByCompanyAndSpecialtyIdForVisit(int companyId, int specialtyId)
        {
            return requestHandler.Get1(Request, companyId, specialtyId);
        }

        [HttpGet]
        [Route("getByCompanyAndRoomTestIdForVisit/{companyId}/{roomTestId}")]
        public HttpResponseMessage GetByCompanyAndRoomTestIdForVisit(int companyId, int roomTestId)
        {
            return requestHandler.Get3(Request, companyId, roomTestId);
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
