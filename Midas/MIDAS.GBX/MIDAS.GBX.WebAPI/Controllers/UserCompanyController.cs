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
using MIDAS.GBX.WebAPI.Filters;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/UserCompany")]
    [Authorize]
    public class UserCompanyController : ApiController
    {

        private IRequestHandler<UserCompany> requestHandler;
        public UserCompanyController()
        {
            requestHandler = new GbApiRequestHandler<UserCompany>();
        }

        
        [HttpPost]
        [Route("GetAll")]
        public HttpResponseMessage Get([FromBody]UserCompany data)
        {
            return requestHandler.GetGbObjects(Request, data);
        }

        
        [HttpGet]
        [Route("Get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [HttpPost]
        [Route("associateUserToCompany/{userName}/{companyId}/{sendEmail}")]
        public HttpResponseMessage AssociateUserToCompany(string userName, int companyId, bool sendEmail)
        {
            return requestHandler.AssociateUserToCompany(Request, userName, companyId, sendEmail);
        }

        // POST: api/Organizations

        [HttpPost]
        [Route("Add")]
        public HttpResponseMessage Post([FromBody]UserCompany data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        // PUT: api/Organizations/5
        
        [Route("Update")]
        [HttpPut]
        public HttpResponseMessage Put([FromBody]UserCompany User)
        {
            return requestHandler.UpdateGbObject(Request, User);
        }

        // DELETE: api/Organizations/id={organizationId}
        
        [HttpDelete]
        [Route("Delete")]
        public HttpResponseMessage Delete([FromBody]UserCompany User)
        {
            return requestHandler.DeleteGbObject(Request, User);
        }


        // Unique Name Validation
        
        [HttpGet]
        [Route("IsUnique")]
        public HttpResponseMessage IsUnique([FromBody]UserCompany User)
        {
            return requestHandler.ValidateUniqueName(Request, User);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
