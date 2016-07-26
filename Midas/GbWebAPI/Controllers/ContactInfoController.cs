﻿using System;
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
using GbWebAPI.Models;
using GbWebAPI.Providers;
using GbWebAPI.Results;
using Midas.GreenBill.BusinessObject;
using Midas.GreenBill.EntityRepository;

namespace Midas.GreenBill.Api
{
    [Authorize]
    [RoutePrefix("midasapi/Contact")]
    public class ContactInfoController : ApiController
    {
        private IRequestHandler<ContactInfo> requestHandler;

        public ContactInfoController()
        {
            requestHandler = new GbApiRequestHandler<ContactInfo>();
        }


        // GET: api/Organizations/5
        [HttpPost]
        [Route("Get")]
        [AllowAnonymous]
        public HttpResponseMessage Get([FromBody]ContactInfo ContactInfo)
        {
            return requestHandler.GetObject(Request, ContactInfo);
        }

        // POST: api/Organizations
        [HttpPost]
        [Route("Add")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]ContactInfo ContactInfo)
        {
            return requestHandler.CreateGbObject(Request, ContactInfo);
        }

        // PUT: api/Organizations/5
        [Route("Update")]
        [HttpPut]
        [AllowAnonymous]
        public HttpResponseMessage Put([FromBody]ContactInfo ContactInfo)
        {
            return requestHandler.UpdateGbObject(Request, ContactInfo);
        }

        // DELETE: api/Organizations/id={organizationId}
        [HttpDelete]
        [Route("Delete")]
        [AllowAnonymous]
        public HttpResponseMessage Delete([FromBody]ContactInfo ContactInfo)
        {
            return requestHandler.DeleteGbObject(Request, ContactInfo);
        }

        // Unique Name Validation
        [HttpGet]
        [Route("IsUnique")]
        public HttpResponseMessage IsUnique([FromBody]ContactInfo ContactInfo)
        {
            return requestHandler.ValidateUniqueName(Request, ContactInfo);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
