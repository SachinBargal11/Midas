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
    [RoutePrefix("midasapi/Notification")]
    public class NotificationController : ApiController
    {
        private IRequestHandler<Notification> requestHandlerNotification;
        
        public NotificationController()
        {
            requestHandlerNotification = new GbApiRequestHandler<Notification>();
        }      

        [HttpGet]
        [Route("getAll")]
        public HttpResponseMessage GetAll()
        {
            return requestHandlerNotification.GetObjects(Request);
        }

        [HttpGet]
        [Route("getByCompanyId/{CompanyId}")]
        public HttpResponseMessage GetByCompanyId(int CompanyId)
        {
            return requestHandlerNotification.GetGbObjects(Request, CompanyId);
        }      

        [HttpGet]
        [Route("get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandlerNotification.GetObject(Request, id);
        }

        [HttpPost]
        [Route("save")]
        public HttpResponseMessage Save([FromBody]Notification notification)
        {
            return requestHandlerNotification.CreateGbObject(Request, notification);
        }

        [HttpGet]
        [Route("getViewStatus/{id}/{status}")]
        public HttpResponseMessage GetViewStatus(int id, bool status)
        {
            return requestHandlerNotification.GetViewStatus(Request, id, status);
        }        

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}