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
    [RoutePrefix("midasapi/Room")]
    public class RoomController : ApiController
    {

        private IRequestHandler<Room> requestHandler;
        public RoomController()
        {
            requestHandler = new GbApiRequestHandler<Room>();
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("GetAll")]
        public HttpResponseMessage Get([FromBody]Room data)
        {
            return requestHandler.GetGbObjects(Request, data);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("Get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        // POST: api/Organizations
        [AllowAnonymous]
        [HttpPost]
        [Route("Add")]
        public HttpResponseMessage Post([FromBody]Room data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        // PUT: api/Organizations/5
        [AllowAnonymous]
        [Route("Update")]
        [HttpPut]
        public HttpResponseMessage Put([FromBody]Room User)
        {
            return requestHandler.UpdateGbObject(Request, User);
        }

        // DELETE: api/Organizations/id={organizationId}
        [AllowAnonymous]
        [HttpDelete]
        [Route("Delete")]
        public HttpResponseMessage Delete([FromBody]Room User)
        {
            return requestHandler.DeleteGbObject(Request, User);
        }


        // Unique Name Validation
        [AllowAnonymous]
        [HttpGet]
        [Route("IsUnique")]
        public HttpResponseMessage IsUnique([FromBody]Room User)
        {
            return requestHandler.ValidateUniqueName(Request, User);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
