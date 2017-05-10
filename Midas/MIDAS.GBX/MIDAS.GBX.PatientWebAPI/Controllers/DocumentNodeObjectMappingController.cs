using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MIDAS.GBX.PatientWebAPI.RequestHandler;
using MIDAS.GBX.BusinessObjects;
using System.IO;
using System.Configuration;
using System.Web;
using System.Threading.Tasks;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{
    [RoutePrefix("midaspatientapi/DocumentNodeObjectMapping")]

    public class DocumentNodeObjectMappingController : ApiController
    {
        private IRequestHandler<DocumentNodeObjectMapping> requestHandler;

        public DocumentNodeObjectMappingController()
        {
            requestHandler = new GbApiRequestHandler<DocumentNodeObjectMapping>();
        }

        [HttpGet]
        [Route("getByObjectType/{objectType}/{companyId}")]
        public HttpResponseMessage GetByObjectType(int objectType, int companyId)
        {
            return requestHandler.GetGbObjects(Request, objectType, companyId);
        }

        [HttpPost]
        [Route("saveDocumentType")]
        public HttpResponseMessage SaveDocumentType([FromBody]DocumentNodeObjectMapping data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }


        [HttpDelete]
        [Route("deleteDocumentType")]
        public HttpResponseMessage DeleteCustomDocumentType([FromBody]DocumentNodeObjectMapping data)
        {
            return requestHandler.DeleteObject(Request, data);
        }
    }
}
