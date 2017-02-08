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
        private IRequestHandler<MaritalStatus> requestMaritalStatusHandler;
        private IRequestHandler<Gender> requestGenderHandler;
        private IRequestHandler<PolicyOwner> requestPolicyOwnerHandler;
        private IRequestHandler<InsuranceType> requestInsuranceTypeHandler;
        private IRequestHandler<PatientType> requestPatientTypeHandler;

        public CommonController()
        {
            requestStateHandler = new GbApiRequestHandler<State>();
            requestCityHandler = new GbApiRequestHandler<City>();
            requestMaritalStatusHandler = new GbApiRequestHandler<MaritalStatus>();
            requestGenderHandler = new GbApiRequestHandler<Gender>();
            requestPolicyOwnerHandler = new GbApiRequestHandler<PolicyOwner>();
            requestInsuranceTypeHandler = new GbApiRequestHandler<InsuranceType>();
            requestPatientTypeHandler = new GbApiRequestHandler<PatientType>();
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

        [HttpGet]
        [Route("getPolicyOwners")]
        public HttpResponseMessage GetPolicyOwners()
        {
            return requestPolicyOwnerHandler.GetObjects(Request);
        }

        [HttpGet]
        [Route("getPolicyOwnerById/{id}")]
        public HttpResponseMessage GetPolicyOwnerById(int id)
        {
            return requestPolicyOwnerHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getInsuranceTypes")]
        public HttpResponseMessage GetInsuranceTypes()
        {
            return requestInsuranceTypeHandler.GetObjects(Request);
        }

        [HttpGet]
        [Route("getInsuranceTypeById/{id}")]
        public HttpResponseMessage GetInsuranceTypeById(int id)
        {
            return requestInsuranceTypeHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getPatientTypes")]
        public HttpResponseMessage GetPatientTypes()
        {
            return requestPatientTypeHandler.GetObjects(Request);
        }

        [HttpGet]
        [Route("getPatientTypeById/{id}")]
        public HttpResponseMessage GetPatientTypeById(int id)
        {
            return requestPatientTypeHandler.GetObject(Request, id);
        }
    }
}
