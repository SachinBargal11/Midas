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

        [HttpGet]
        [Route("getAllByCompanyAndRoomTestIdForVisit/{companyId}/{roomTestId}")]
        public HttpResponseMessage GetAllByCompanyAndRoomTestIdForVisit(int companyId, int roomTestId)
        {
            return requestHandler.GetAllProcedureCodesbyRoomTestCompanyIdforVisit(Request, companyId, roomTestId);
        }


        [HttpDelete]
        [HttpGet]
        [Route("Delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }

        [HttpPut]
        [HttpGet]
        [Route("UpdatePrefferedProcedureCode/{id}")]
        public HttpResponseMessage UpdatePrefferedProcedureCode(int id)
        {
            return requestHandler.UpdatePrefferedProcedureCode(Request, id);
        }


        [HttpGet]
        [Route("getAllByCompanyAndSpecialtyId/{companyId}/{specialtyId}")]
        public HttpResponseMessage GetByAllCompanyAndSpecialtyId(int companyId, int specialtyId)
        {
            return requestHandler.GetAllProcedureCodesbySpecaltyCompanyId(Request, companyId, specialtyId);
        }

        [HttpGet]
        [Route("getbySpecialtyAndCompanyIdforVisit/{companyId}/{specialtyId}")]
        public HttpResponseMessage GetProcedureCodesbySpecialtyCompanyIdforVisit(int companyId, int specialtyId)
        {
            return requestHandler.GetProcedureCodesbySpecialtyCompanyIdforVisit(Request, companyId, specialtyId);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
