using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Linq;
using MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/Patient")]
    [AllowAnonymous]
    public class PatientController : ApiController
    {
        private IRequestHandler<Patient> requestHandler;
        private IRequestHandler<Patient2> requestHandlerPatient2;

        public PatientController()
        {
            requestHandler = new GbApiRequestHandler<Patient>();
            requestHandlerPatient2 = new GbApiRequestHandler<Patient2>();
        }

        [HttpGet]
        [Route("GetAll")]
        [AllowAnonymous]
        public HttpResponseMessage Get([FromBody]Patient data)
        {
            return requestHandler.GetGbObjects(Request, data);
        }

        [HttpGet]
        [Route("Get/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        // POST: api/Organizations
        [HttpPost]
        [Route("Add")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]Patient data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [Route("Update")]
        [HttpPut]
        [AllowAnonymous]
        public HttpResponseMessage Put([FromBody]Patient patient)
        {
            return requestHandler.UpdateGbObject(Request, patient);
        }

        
        [HttpDelete]
        [Route("Delete")]
        [AllowAnonymous]
        public HttpResponseMessage Delete([FromBody]Patient patient)
        {
            return requestHandler.DeleteGbObject(Request, patient);
        }

        [HttpGet]
        [Route("IsUnique")]
        public HttpResponseMessage IsUnique([FromBody]Patient patient)
        {
            return requestHandler.ValidateUniqueName(Request, patient);
        }

        [HttpPost]
        [Route("AddPatient")]
        [AllowAnonymous]
        public HttpResponseMessage AddPatient([FromBody]Patient data)
        {
            return requestHandler.CreateGbObjectPatient(Request, data);
        }
        
        [HttpGet]
        [Route("GetPatient/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage GetPatient2(int id)
        {
            return requestHandlerPatient2.GetObject(Request, id);
        }

        [HttpPost]
        [Route("SavePatient")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]Patient2 patient2)
        {
            return requestHandlerPatient2.CreateGbObject(Request, patient2);
        }

        [HttpGet]
        [Route("GetAllPatient")]
        [AllowAnonymous]
        public HttpResponseMessage GetAllPatient([FromBody]Patient2 data)
        {
            return requestHandlerPatient2.GetGbObjects(Request, data);
        }



        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
