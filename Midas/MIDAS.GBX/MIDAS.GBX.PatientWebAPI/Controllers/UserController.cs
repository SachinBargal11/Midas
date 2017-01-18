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

    [RoutePrefix("midaspatientapi/User")]
    public class UserController : ApiController
    {
        private IRequestHandler<User> requestHandler;

        public UserController()
        {
            requestHandler = new GbApiRequestHandler<User>();
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Signin")]
        public HttpResponseMessage Signin([FromBody]User user)
        {
            return requestHandler.Login(Request, user);
        }
    }
}
