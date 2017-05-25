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
        string temppath = System.Web.HttpContext.Current.Server.MapPath(@"~/App_Data/uploads/");
        public TemplateManagerController()
        {
            requestHandler = new GbApiRequestHandler<TemplateType>();
            blobhandler = new BlobServiceHandler();
        }
            
        [HttpPost]
        [Route("generatetemplate/{templateName}")]
        public void GenerateTemplate(string templateName, [FromBody]Dictionary<string, string> templateReplaceText)
        {
            var res = requestHandler.GetObjects(Request, templateName);
            if (res != null)
            {
                string templatePath = ((TemplateType)(((ObjectContent)res.Content).Value)).TemplatePath;
                var tempPath = blobhandler.CreateTemplate(Request, Convert.ToInt32(templateName.Split('_')[1]), templatePath, templateReplaceText, temppath);

                FileInfo fileInfo = new System.IO.FileInfo(tempPath.ToString());
                                
                HttpContext.Current.Response.ContentType = "application/pdf";
                HttpContext.Current.Response.AddHeader("Content-Disposition", String.Format("attachment;filename=\"{0}\"", fileInfo.Name));
                HttpContext.Current.Response.AddHeader("Content-Length", fileInfo.Length.ToString());
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
                HttpContext.Current.Response.WriteFile(tempPath.ToString());
                //HttpContext.Current.Response.BinaryWrite(btFile);
                HttpContext.Current.Response.End();

                if (File.Exists(tempPath.ToString())) File.Delete(tempPath.ToString());
            }
            
            //return new HttpResponseMessage();
        }

        [HttpPost]
        [Route("generateSignedTemplate/{templateName}")]
        public void GetElectronicSignedConsent(string templateName, [FromBody]Dictionary<string, string> templateReplaceText)
        {
            var res = requestHandler.GetObjects(Request, templateName);
            if (res != null)
            {
                string templatePath = ((TemplateType)(((ObjectContent)res.Content).Value)).TemplatePath;
                var tempPath = blobhandler.CreateTemplate(Request, Convert.ToInt32(templateName.Split('_')[1]), templatePath, templateReplaceText, temppath);

                FileInfo fileInfo = new System.IO.FileInfo(tempPath.ToString());

                HttpContext.Current.Response.ContentType = "application/pdf";
                HttpContext.Current.Response.AddHeader("Content-Disposition", String.Format("attachment;filename=\"{0}\"", fileInfo.Name));
                HttpContext.Current.Response.AddHeader("Content-Length", fileInfo.Length.ToString());
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
                HttpContext.Current.Response.WriteFile(tempPath.ToString());
                //HttpContext.Current.Response.BinaryWrite(btFile);
                HttpContext.Current.Response.End();

                if (File.Exists(tempPath.ToString())) File.Delete(tempPath.ToString());
            }

            //return new HttpResponseMessage();
        }
    }
}
 
