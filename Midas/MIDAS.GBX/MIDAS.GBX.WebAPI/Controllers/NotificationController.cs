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
    //[AllowAnonymous]
    public class NotificationController : ApiController
    {
        //private IRequestHandler<Patient> requestHandler;
        private IRequestHandler<Notification2> requestHandlerNotification;
        
        public NotificationController()
        {
            //requestHandler = new GbApiRequestHandler<Patient>();
            requestHandlerNotification = new GbApiRequestHandler<Notification2>();
        }

       

        [HttpGet]
        [Route("getAll")]
        //[AllowAnonymous]
        public HttpResponseMessage GetAll()
        {
            return requestHandlerNotification.GetObjects(Request);
        }



        [HttpGet]
        [Route("getByCompanyId/{CompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetByCompanyId(int CompanyId)
        {
            return requestHandlerNotification.GetGbObjects(Request, CompanyId);
        }
      

        [HttpGet]
        [Route("get/{id}")]
        //[AllowAnonymous]
        public HttpResponseMessage Get(int id)
        {
            return requestHandlerNotification.GetObject(Request, id);
        }

        [HttpPost]
        [Route("save")]
        //[AllowAnonymous]
        public HttpResponseMessage Save([FromBody]Notification2 notification)
        {
            return requestHandlerNotification.CreateGbObject(Request, notification);
        }

        [HttpGet]
        [Route("getViewStatus/{id}/{status}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetViewStatus(int id, bool status)
        {
            return requestHandlerNotification.GetViewStatus(Request, id, status);
        }

        //[HttpGet]
        //[Route("Delete/{id}")]
        //public HttpResponseMessage Delete(int id)
        //{
        //    return requestHandlerPatient2.Delete(Request, id);
        //}

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}