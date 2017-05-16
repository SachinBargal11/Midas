using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using MIDAS.GBX.DataRepository.EntitySearch;
using MIDAS.GBX.BusinessObjects;
using System.Web.Script.Serialization;
using System.Web.Http.Cors;
using System.Net.Http.Headers;
//using MIDAS.GBX.EntityRepository;
using MIDAS.GBX.DocumentManager;
using MIDAS.GBX.BusinessObjects.Common;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/templatemanager")]
    //[EnableCors(origins:"*",headers: "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With", methods: "GET,POST,PUT,DELETE,OPTIONS")]
    //[EnableCors(origins: "*", headers: "*", methods: "*", exposedHeaders: "X-My-Header")] 
    public class TemplateManagerController : ApiController
    {        
        private IRequestHandler<TemplateType> requestHandler;
        private IBlobService blobhandler;
        
        public TemplateManagerController()
        {
            requestHandler = new GbApiRequestHandler<TemplateType>();
            blobhandler = new BlobServiceHandler();
        }

        [HttpPost]
        [Route("generatetemplate/{templateName}")]
        public HttpResponseMessage GenerateTemplate(string templateName, [FromBody]IDictionary<string, string> templateReplaceText)
        {
            var res = requestHandler.GetObjects(Request, templateName);
            if (res != null)
            {
                string abc = ((TemplateType)(((ObjectContent)res.Content).Value)).TemplatePath;
                blobhandler.CreateTemplate(Request, abc, templateReplaceText);
            }
            
            return new HttpResponseMessage();
        }
    }
}
 
