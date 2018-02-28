using MIDAS.GBX.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/InsuranceMasterType")]
    public class InsuranceMasterTypeController : ApiController
    {
        private IRequestHandler<InsuranceMasterType> requestHandler;

        public InsuranceMasterTypeController()
        {
            requestHandler = new GbApiRequestHandler<InsuranceMasterType>();
        }

        [HttpGet]
        [Route("Get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getAll")]
        public HttpResponseMessage Get()
        {
            return requestHandler.GetObjects(Request);
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
        public HttpResponseMessage Post([FromBody]InsuranceMasterType data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

       
    }
}
