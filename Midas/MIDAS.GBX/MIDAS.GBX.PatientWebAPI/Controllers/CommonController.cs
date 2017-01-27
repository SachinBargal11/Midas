using MIDAS.GBX.BusinessObjects.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MIDAS.GBX.PatientWebAPI.RequestHandler;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{

    [RoutePrefix("midaspatientapi/common")]
    public class CommonController : ApiController
    {
        private IRequestHandler<State> requestStateHandler;
        private IRequestHandler<City> requestCityHandler;
        private IRequestHandler<MaritalStatus> requestMaritalStatusHandler;
        private IRequestHandler<Gender> requestGenderHandler;

        public CommonController()
        {
            requestStateHandler = new GbApiRequestHandler<State>();
            requestCityHandler = new GbApiRequestHandler<City>();
            requestMaritalStatusHandler = new GbApiRequestHandler<MaritalStatus>();
            requestGenderHandler = new GbApiRequestHandler<Gender>();
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

        [HttpGet]
        [Route("Mstatusgetall")]
        public HttpResponseMessage GetMstatusAll()
        {
            return requestMaritalStatusHandler.GetObjects(Request);
        }

        [HttpGet]
        [Route("getmaritalstatusbyID/{id}")]
        public HttpResponseMessage GetMstatusById(int id)
        {
            return requestMaritalStatusHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("Gendergetall")]
        public HttpResponseMessage GenderGetAll()
        {
            return requestGenderHandler.GetObjects(Request);
        }

        [HttpGet]
        [Route("getgender/{id}")]
        public HttpResponseMessage GetGenderById(int id)
        {
            return requestGenderHandler.GetObject(Request, id);
        }



    }
}
