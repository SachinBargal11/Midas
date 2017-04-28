using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/DocumentNodeObjectMapping")]
    public class DocumentNodeObjectMapping2Controller : ApiController
    {
        private IRequestHandler<DocumentNodeObjectMapping> requestHandler;

        public DocumentNodeObjectMapping2Controller()
        {
            requestHandler = new GbApiRequestHandler<DocumentNodeObjectMapping>();
        }

        [HttpGet]
        [Route("getByObjectType/{objectType}")]
        public HttpResponseMessage GetByObjectType(string objectType)
        {
            return requestHandler.GetObjects(Request, objectType);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
