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
    [RoutePrefix("midasapi/Doctor")]
    
    public class DoctorController : ApiController
    {

        private IRequestHandler<Doctor> requestHandler;
        public DoctorController()
        {
            requestHandler = new GbApiRequestHandler<Doctor>();
        }

        [HttpGet]
        [Route("GetAll")]
        
        public HttpResponseMessage Get()
        {
            return requestHandler.GetObjects(Request);
        }

        [HttpGet]
        [Route("Get/{id}")]
        
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        // POST: api/Organizations
        [HttpPost]
        [Route("Add")]
        
        public HttpResponseMessage Post([FromBody]Doctor doctor)
        {
            return requestHandler.CreateGbObject(Request, doctor);
        }

        // PUT: api/Organizations/5
        [Route("Update")]
        [HttpPut]
        
        public HttpResponseMessage Put([FromBody]Doctor doctor)
        {
            return requestHandler.UpdateGbObject(Request, doctor);
        }

        // DELETE: api/Organizations/id={organizationId}
        [HttpDelete]
        [Route("Delete")]
        
        public HttpResponseMessage Delete([FromBody]Doctor doctor)
        {
            return requestHandler.DeleteGbObject(Request, doctor);
        }


        // Unique Name Validation
        [HttpGet]
        [Route("IsUnique")]
        public HttpResponseMessage IsUnique([FromBody]Doctor doctor)
        {
            return requestHandler.ValidateUniqueName(Request, doctor);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
