using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.AttorneyWebAPI.Controllers
{
    [RoutePrefix("midasattorneyapi/DefendantVehicle")]
    public class DefendantVehicleController : ApiController
    {
        private IRequestHandler<DefendantVehicle> requestHandler;

        public DefendantVehicleController()
        {
            requestHandler = new GbApiRequestHandler<DefendantVehicle>();
        }

        [HttpPost]
        [Route("save")]
        public HttpResponseMessage Post([FromBody]DefendantVehicle data)
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
