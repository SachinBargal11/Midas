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
using Newtonsoft.Json.Linq;
using MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.AncillaryWebAPI.Controllers
{
    [RoutePrefix("midasancillaryapi/Location")]    
    public class LocationController : ApiController
    {
        private IRequestHandler<Location> requestHandler;
        private IRequestHandler<SaveLocation> savelocationrequestHandler;

        public LocationController()
        {
            requestHandler = new GbApiRequestHandler<Location>();
            savelocationrequestHandler = new GbApiRequestHandler<SaveLocation>();
        }

        [HttpPost]
        [Route("GetAll")]        
        public HttpResponseMessage Get([FromBody]Location data)
        {
            return requestHandler.GetGbObjects(Request, data);
        }

        [HttpGet]
        [Route("getAllLocationAndCompany")]
        public HttpResponseMessage GetAllLocationAndCompany()
        {
            return requestHandler.GetObjects(Request);
        }

        [HttpGet]
        [Route("Get/{id}")]        
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }
        
        [HttpPost]
        [Route("Add")]        
        public HttpResponseMessage Post([FromBody]SaveLocation location)
        {
            return savelocationrequestHandler.CreateGbObject(Request, location);
        }

        [Route("Update")]
        [HttpPut]        
        public HttpResponseMessage Put([FromBody]Location User)
        {
            return requestHandler.UpdateGbObject(Request, User);
        }

        [HttpDelete]
        [Route("Delete")]        
        public HttpResponseMessage Delete([FromBody]Location User)
        {
            return requestHandler.DeleteGbObject(Request, User);
        }

        [HttpGet]
        [Route("IsUnique")]
        public HttpResponseMessage IsUnique([FromBody]Location User)
        {
            return requestHandler.ValidateUniqueName(Request, User);
        }

        [HttpGet]
        [Route("getByCompanyAndDoctorId/{CompanyId}/{DoctorId}")]
        public HttpResponseMessage GetByCompanyAndDoctorId(int CompanyId, int DoctorId)
        {
            return requestHandler.GetByCompanyAndDoctorId(Request, CompanyId, DoctorId);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}