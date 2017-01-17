using MIDAS.GBX.BusinessObjects.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{

    [RoutePrefix("midasapi/common")]
    public class CommonController : ApiController
    {
        private IRequestHandler<State> requestStateHandler;

        public CommonController()
        {
            requestStateHandler = new GbApiRequestHandler<State>();
        }

        [HttpGet]
        [Route("getstates")]
        public HttpResponseMessage GetStates()
        {
            return requestStateHandler.GetObjects(Request);
        }

        [HttpGet]
        [Route("getstatesbycity/{City}")]
        public HttpResponseMessage GetStatesByCity(string City)
        {
            return requestStateHandler.GetObjects(Request, City);
        }
    }
}
