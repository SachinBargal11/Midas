using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.AncillaryWebAPI.Controllers
{
    [RoutePrefix("midasancillaryapi/UserPersonalSetting")]
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
        public HttpResponseMessage Post([FromBody]UserPersonalSetting data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("Delete/{id}")]
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
