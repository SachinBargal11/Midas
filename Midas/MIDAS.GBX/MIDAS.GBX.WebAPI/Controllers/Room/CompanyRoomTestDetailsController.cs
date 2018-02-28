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
    [RoutePrefix("midasapi/CompanyRoomTestDetails")]
    public class CompanyRoomTestDetailsController : ApiController
    {
        private IRequestHandler<CompanyRoomTestDetails> requestHandler;

        public CompanyRoomTestDetailsController()
        {
            requestHandler = new GbApiRequestHandler<CompanyRoomTestDetails>();
        }

        [HttpPost]
        [Route("GetAll")]
        public HttpResponseMessage Get([FromBody]CompanyRoomTestDetails data)
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
        [Route("Save")]
        public HttpResponseMessage Save([FromBody]CompanyRoomTestDetails data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("getByRoomTestAndCompanyId/{roomTestId}/{companyId}")]
        public HttpResponseMessage GetByRoomTestAndCompanyId(int roomTestId, int companyId)
        {
           return requestHandler.GetByRoomTestAndCompanyId(Request, roomTestId, companyId);
        }

        [Route("Update")]
        [HttpPut]
        public HttpResponseMessage Put([FromBody]CompanyRoomTestDetails User)
        {
            return requestHandler.UpdateGbObject(Request, User);
        }
       
        [HttpDelete]
        [Route("Delete")]
        public HttpResponseMessage Delete([FromBody]CompanyRoomTestDetails User)
        {
            return requestHandler.DeleteGbObject(Request, User);
        }


        // Unique Name Validation
        [HttpGet]
        [Route("IsUnique")]
        public HttpResponseMessage IsUnique([FromBody]CompanyRoomTestDetails User)
        {
            return requestHandler.ValidateUniqueName(Request, User);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }



    }
}
