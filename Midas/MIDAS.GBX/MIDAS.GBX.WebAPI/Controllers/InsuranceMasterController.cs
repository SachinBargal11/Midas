using MIDAS.GBX.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/InsuranceMaster")]
    public class InsuranceMasterController : ApiController
    {
        private IRequestHandler<InsuranceMaster> requestHandler;

        public InsuranceMasterController()
        {
            requestHandler = new GbApiRequestHandler<InsuranceMaster>();
        }
       
        [HttpGet]
        [Route("getAll")]
        //[AllowAnonymous]
        public HttpResponseMessage Get()
        {
            return requestHandler.GetObjects(Request);
        }

        // GET: api/Organizations/5
        [HttpGet]
        [Route("get/{id}")]
        //[AllowAnonymous]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpDelete]
        [HttpGet]
        [Route("Delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }

        [HttpPost]
        [Route("Add")]
        public HttpResponseMessage Post([FromBody]InsuranceMaster data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }


    }
}