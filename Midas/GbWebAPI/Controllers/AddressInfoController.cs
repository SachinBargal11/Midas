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
using GbWebAPI.Models;
using GbWebAPI.Providers;
using GbWebAPI.Results;
using Midas.GreenBill.BusinessObject;
using Midas.GreenBill.EntityRepository;

namespace Midas.GreenBill.Api
{
    [Authorize]
    [RoutePrefix("midasapi/Address")]
    public class AddressInfoController : ApiController
    {
        private IRequestHandler<Address> requestHandler;

        public AddressInfoController()
        {
            requestHandler = new GbApiRequestHandler<Address>();
        }


        // GET: api/Organizations/5
        [HttpPost]
        [Route("Get")]
        [AllowAnonymous]
        public HttpResponseMessage Get([FromBody]Address Address)
        {
            return requestHandler.GetObject(Request, Address);
        }

        // POST: api/Organizations
        [HttpPost]
        [Route("Add")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]Address Address)
        {
            return requestHandler.CreateGbObject(Request, Address);
        }

        // PUT: api/Organizations/5
        [Route("Update")]
        [HttpPut]
        [AllowAnonymous]
        public HttpResponseMessage Put([FromBody]Address Address)
        {
            return requestHandler.UpdateGbObject(Request, Address);
        }

        // DELETE: api/Organizations/id={organizationId}
        [HttpDelete]
        [Route("Delete")]
        [AllowAnonymous]
        public HttpResponseMessage Delete([FromBody]Address Address)
        {
            return requestHandler.DeleteGbObject(Request, Address);
        }

        // Unique Name Validation
        [HttpGet]
        [Route("IsUnique")]
        [AllowAnonymous]
        public HttpResponseMessage IsUnique([FromBody]Address Address)
        {
            return requestHandler.ValidateUniqueName(Request, Address);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
