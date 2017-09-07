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
    [RoutePrefix("midasapi/Log")]
    [Authorize]
    public class LogController : ApiController
    {
        private IRequestHandler<Log> requestHandler;

        public LogController()
        {
            requestHandler = new GbApiRequestHandler<Log>();
        }

        [HttpPost]
        [Route("GetAll")]
        public HttpResponseMessage Get([FromBody]Log data)
        {
            return requestHandler.GetGbObjects(Request, data);
        }

        [HttpGet]
        [Route("Get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpPost]
        [Route("Add")]
        public HttpResponseMessage Post([FromBody]Log data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [Route("Update")]
        [HttpPut]
        public HttpResponseMessage Put([FromBody]Log User)
        {
            return requestHandler.UpdateGbObject(Request, User);
        }

        [HttpDelete]
        [Route("Delete")]
        public HttpResponseMessage Delete([FromBody]Log User)
        {
            return requestHandler.DeleteGbObject(Request, User);
        }

        [HttpGet]
        [Route("IsUnique")]
        public HttpResponseMessage IsUnique([FromBody]Log User)
        {
            return requestHandler.ValidateUniqueName(Request, User);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
