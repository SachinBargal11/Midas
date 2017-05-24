using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MIDAS.GBX.PatientWebAPI.RequestHandler;
using MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{

    [RoutePrefix("midaspatientapi/Company")]
    public class CompanyController : ApiController
    {
        private IRequestHandler<Invitation> invitationrequestHandler;

        public CompanyController()
        {
            invitationrequestHandler = new GbApiRequestHandler<Invitation>();
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
