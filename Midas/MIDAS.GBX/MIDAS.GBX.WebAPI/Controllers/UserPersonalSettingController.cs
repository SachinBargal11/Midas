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
    [RoutePrefix("midasapi/UserPersonalSetting")]

    public class UserPersonalSettingController : ApiController
    {

        private IRequestHandler<UserPersonalSetting> requestHandler;

        public UserPersonalSettingController()
        {
            requestHandler = new GbApiRequestHandler<UserPersonalSetting>();
        }

        [HttpGet]
        [Route("Get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByUserAndCompanyId/{userId}/{companyId}")]
        public HttpResponseMessage GetByUserAndCompanyId(int userId, int companyId)
        {
            return requestHandler.GetByUserAndCompanyId(Request, userId, companyId);
        }

        [HttpPost]
        [Route("Save")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]UserPersonalSetting data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }


        [HttpGet]
        [Route("Delete/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
