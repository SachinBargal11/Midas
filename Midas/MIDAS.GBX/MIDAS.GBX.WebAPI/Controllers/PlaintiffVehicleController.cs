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
    [RoutePrefix("midasapi/PlaintiffVehicle")]
    public class PlaintiffVehicleController : ApiController
    {
        private IRequestHandler<PlaintiffVehicle> requestHandler;

        public PlaintiffVehicleController()
        {
            requestHandler = new GbApiRequestHandler<PlaintiffVehicle>();
        }

        [HttpPost]
        [Route("save")]
        public HttpResponseMessage Post([FromBody]PlaintiffVehicle data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("getByCaseId/{CaseId}")]
        public HttpResponseMessage GetByCaseId(int CaseId)
        {
            return requestHandler.GetByCaseId(Request, CaseId);
        }
    }
}
