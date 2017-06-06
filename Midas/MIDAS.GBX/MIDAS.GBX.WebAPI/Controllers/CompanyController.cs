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
    [RoutePrefix("midasapi/Company")]
    
    public class CompanyController : ApiController
    {
        private IRequestHandler<Company> requestHandler;
        private IRequestHandler<Signup> signuprequestHandler;
        private IRequestHandler<Invitation> invitationrequestHandler;
        public CompanyController()
        {
            requestHandler = new GbApiRequestHandler<Company>();
            signuprequestHandler = new GbApiRequestHandler<Signup>();
            invitationrequestHandler = new GbApiRequestHandler<Invitation>(); 
        }

        // GET: api/Organizations/5
        [HttpGet]
        [Route("Get/{id}")]
        
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getAll")]
        //[AllowAnonymous]
        public HttpResponseMessage Get()
        {
            return requestHandler.GetObjects(Request);
        }

        [HttpGet]
        [Route("getAllCompanyAndLocation")]
        //[AllowAnonymous]
        public HttpResponseMessage GetAllCompanyAndLocation()
        {
            return requestHandler.GetAllCompanyAndLocation(Request);
        }

        // POST: api/Organizations
        [HttpPost]
        [Route("Add")]
        
        public HttpResponseMessage Post([FromBody]Company data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        // PUT: api/Organizations/5
        [Route("Update")]
        [HttpPut]
        
        public HttpResponseMessage Put([FromBody]Company account)
        {
            return requestHandler.UpdateGbObject(Request, account);
        }

        // DELETE: api/Organizations/id={organizationId}
        [HttpDelete]
        [Route("Delete")]
        
        public HttpResponseMessage Delete([FromBody]Company account)
        {
            return requestHandler.DeleteGbObject(Request, account);
        }

        // Unique Name Validation
        [HttpPost]
        [Route("IsUnique")]
        
        public HttpResponseMessage IsUnique([FromBody]Company account)
        {
            return requestHandler.ValidateUniqueName(Request, account);
        }

        //[AllowAnonymous]
        [HttpPost]
        [Route("RegisterCompany")]
        [Route("Signup")]
        public HttpResponseMessage Signup([FromBody]Signup data)
        {
            if (data != null)
                return signuprequestHandler.SignUp(Request, data);
            else
                return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "Invalid data", errorObject = "",ErrorLevel=ErrorLevel.Critical });
        }

        [HttpPost]
        [Route("UpdateCompany")]
        public HttpResponseMessage UpdateCompany([FromBody]Signup data)
        {
            if (data != null)
                return signuprequestHandler.UpdateCompany(Request, data);
            else
                return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "Invalid data", errorObject = "", ErrorLevel = ErrorLevel.Critical });
        }

        [HttpPost]
        [Route("ValidateInvitation")]
        //[AllowAnonymous]
        public HttpResponseMessage ValidateInvitation([FromBody]Invitation data)
        {
            if (data != null)
                return invitationrequestHandler.ValidateInvitation(Request, data);
            else
                return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "Invalid data", errorObject = "", ErrorLevel = ErrorLevel.Critical });
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}