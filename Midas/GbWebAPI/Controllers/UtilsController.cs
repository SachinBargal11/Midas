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
using Newtonsoft.Json.Linq;
using BO = Midas.GreenBill.BusinessObject;
using System.Web.Http.Cors;
using System.Net;

namespace Midas.GreenBill.Api
{
    [Authorize]
    [RoutePrefix("midasapi/Utils")]
    public class UtilsController : ApiController
    {
        private IRequestHandler<Account> requestHandler;

        public UtilsController()
        {
            requestHandler = new GbApiRequestHandler<Account>();
        }

        // GET: api/Organizations/5
        [HttpGet]
        [Route("GetStates")]
        [AllowAnonymous]
        public HttpResponseMessage Get()
        {

            string[] strStates = new string[] {"Alabama",
            "Alaska",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "Florida",
            "Georgia",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Maine",
            "Maryland",
            "Massachusetts",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Montana",
            "Nebraska",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "New York",
            "North Carolina",
            "North Dakota",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Pennsylvania",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Vermont",
            "Virginia",
            "Washington",
            "West Virginia",
            "Wisconsin",
            "Wyoming"
             };
            return Request.CreateResponse(HttpStatusCode.OK, strStates); ;
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
