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
        private IRequestHandler<City> requestCityHandler;

        public CommonController()
        {
            requestStateHandler = new GbApiRequestHandler<State>();
            requestCityHandler = new GbApiRequestHandler<City>();
        }

        [HttpGet]
        [Route("getstates")]
        public HttpResponseMessage GetStates()
        {
            return requestStateHandler.GetObjects(Request);
        }

        [HttpGet]
        [Route("getstatesbycity/{city}")]
        public HttpResponseMessage GetStatesByCity(string City)
        {
            return requestStateHandler.GetObjects(Request, City);
        }

        [HttpGet]
        [Route("getcities")]
        public HttpResponseMessage GetCities()
        {
            return requestCityHandler.GetObjects(Request);
        }

        [HttpGet]
        [Route("getcitiesbystates/{state}")]
        public HttpResponseMessage GetCitiesByStates(string State)
        {
            return requestCityHandler.GetObjects(Request, State);
        }
    }
}
