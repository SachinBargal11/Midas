using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/PasswordToken")]
    [Authorize]
    public class PasswordTokenController : ApiController
    {
        private IRequestHandler<PasswordToken> requestHandler;

        public PasswordTokenController()
        {
            requestHandler = new GbApiRequestHandler<PasswordToken>();
        }

        // GET: api/Organizations/5
        [HttpGet]
        [Route("Get/{id}")]
        
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("GetAll")]
        
        public HttpResponseMessage Get([FromBody]PasswordToken data)
        {
            return requestHandler.GetGbObjects(Request, data);
        }

        // POST: api/Organizations
        [HttpPost]
        [Route("Add")]
        
        public HttpResponseMessage Post([FromBody]PasswordToken data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        // PUT: api/Organizations/5
        [Route("Update")]
        [HttpPut]
        
        public HttpResponseMessage Put([FromBody]PasswordToken account)
        {
            return requestHandler.UpdateGbObject(Request, account);
        }

        // DELETE: api/Organizations/id={organizationId}
        [HttpDelete]
        [Route("Delete")]
        
        public HttpResponseMessage Delete([FromBody]PasswordToken account)
        {
            return requestHandler.DeleteGbObject(Request, account);
        }

        // Unique Name Validation
        [HttpPost]
        [Route("IsUnique")]
        
        public HttpResponseMessage IsUnique([FromBody]PasswordToken account)
        {
            return requestHandler.ValidateUniqueName(Request, account);
        }

        [HttpPost]
        [Route("GeneratePasswordResetLink")]
        [AllowAnonymous]
        public HttpResponseMessage GeneratePasswordLink([FromBody]PasswordToken passwordToken)
        {
            return requestHandler.GeneratePasswordLink(Request, passwordToken);
        }

        [HttpPost]
        [Route("ValidatePassword")]
        [AllowAnonymous]
        public HttpResponseMessage ValidatePassword([FromBody]PasswordToken passwordToken)
        {
            return requestHandler.ValidatePassword(Request, passwordToken);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}