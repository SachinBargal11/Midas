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
    [RoutePrefix("midasapi/ProcedureCode")]

    public class ProcedureCodeController : ApiController
    {
        private IRequestHandler<ProcedureCode> requestHandler;

        public ProcedureCodeController()
        {
            requestHandler = new GbApiRequestHandler<ProcedureCode>();
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

        [HttpGet]
        [Route("getBySpecialityId/{specialityId}")]
        public HttpResponseMessage GetBySpecialityId(int specialityId)
        {
            return requestHandler.GetBySpecialityId(Request, specialityId);
        }

        [HttpGet]
        [Route("getBySpecialityAndCompanyId/{specialityId}/{companyId}/{showAll}")]
        public HttpResponseMessage GetBySpecialityAndCompanyId(int specialityId,int companyId,bool showAll)
        {
            return requestHandler.GetBySpecialityAndCompanyId(Request, specialityId, companyId, showAll);
        }

        [HttpGet]
        [Route("getByRoomTestAndCompanyId/{roomTestId}/{companyId}/{showAll}")]
        public HttpResponseMessage GetByRoomTestAndCompanyId(int roomTestId, int companyId, bool showAll)
        {
            return requestHandler.GetByRoomTestAndCompanyId(Request, roomTestId, companyId, showAll);
        }

        [HttpGet]
        [Route("getByRoomTestId/{RoomTestId}")]
        public HttpResponseMessage GetByRoomTestId(int RoomTestId)
        {
            return requestHandler.GetByRoomTestId(Request, RoomTestId);
        }

        [HttpPost]
        [Route("save")]
        public HttpResponseMessage Post([FromBody]List<ProcedureCode> data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
