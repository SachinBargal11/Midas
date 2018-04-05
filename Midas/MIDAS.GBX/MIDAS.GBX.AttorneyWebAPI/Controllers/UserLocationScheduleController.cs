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

namespace MIDAS.GBX.AttorneyWebAPI.Controllers
{
    [RoutePrefix("midasattorneyapi/UserLocationSchedule")]
    public class UserLocationScheduleController : ApiController
    {

        private IRequestHandler<UserLocationSchedule> requestHandler;
        private IRequestHandler<List<UserLocationSchedule>> requestHandlerList;

        public UserLocationScheduleController()
        {
            requestHandler = new GbApiRequestHandler<UserLocationSchedule>();
            requestHandlerList = new GbApiRequestHandler<List<UserLocationSchedule>>();
        }


        [HttpGet]
        [Route("GetAll")]
        public HttpResponseMessage Get()
        {
            return requestHandler.GetObjects(Request);
        }

        [HttpGet]
        [Route("GetByLocationId/{id}")]
        public HttpResponseMessage GetByLocationId(int id)
        {
            return requestHandler.GetByLocationId(Request, id);
        }

        [HttpGet]
        [Route("GetByUserId/{id}")]
        public HttpResponseMessage GetByUserId(int id)
        {
            return requestHandler.GetByUserId(Request, id);
        }

        [HttpGet]
        [Route("GetByLocationAndUser/{locationId}/{userId}")]
        public HttpResponseMessage GetByLocationAndUser(int locationId,int userId)
        {
            return requestHandler.GetGbObjects(Request, locationId, userId);
        }

        [HttpGet]
        [Route("Get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        // POST: api/Organizations

        [HttpPost]
        [Route("Add")]
        public HttpResponseMessage Post([FromBody]UserLocationSchedule data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpPost]
        [Route("associateLocationToUser")]
        public HttpResponseMessage AssociateLocationToUser([FromBody]List<UserLocationSchedule> data)
        {
            return requestHandlerList.AssociateLocationToUser(Request, data);
        }

        [HttpPost]
        [Route("associateUserToLocations")]
        public HttpResponseMessage AssociateUserToLocations([FromBody]List<UserLocationSchedule> data)
        {
            return requestHandlerList.AssociateUserToLocations(Request, data);
        }


        // PUT: api/Organizations/5

        [Route("Update")]
        [HttpPut]
        public HttpResponseMessage Put([FromBody]UserLocationSchedule User)
        {
            return requestHandler.UpdateGbObject(Request, User);
        }

        // DELETE: api/Organizations/id={organizationId}

        [HttpDelete]
        [Route("Delete")]
        public HttpResponseMessage Delete([FromBody]UserLocationSchedule User)
        {
            return requestHandler.DeleteGbObject(Request, User);
        }

        [HttpDelete]
        [HttpPost]
        [Route("Delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }


        // Unique Name Validation

        [HttpGet]
        [Route("IsUnique")]
        public HttpResponseMessage IsUnique([FromBody]UserLocationSchedule User)
        {
            return requestHandler.ValidateUniqueName(Request, User);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
