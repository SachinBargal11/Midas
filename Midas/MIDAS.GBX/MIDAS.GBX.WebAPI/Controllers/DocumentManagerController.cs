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
    [RoutePrefix("midasapi/documentmanager")]
    //[EnableCors(origins:"*",headers: "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With", methods: "GET,POST,PUT,DELETE,OPTIONS")]
    //[EnableCors(origins: "*", headers: "*", methods: "*", exposedHeaders: "X-My-Header")] 
    public class DocumentManagerController : ApiController
    {

        internal string sourcePath = string.Empty;
        internal string remotePath = string.Empty;
        internal object uploadObject = null;        
        private IRequestHandler<Document> requestHandler;
        private IBlobService blobhandler;


        public DocumentManagerController()
        {
            sourcePath = HttpContext.Current.Server.MapPath("~/App_Data/uploads").ToString();
            remotePath = "C:\\Users\\Sonali.A\\Midas\\Midas\\MIDAS.GBX\\MIDAS.GBX.PatientWebAPI\\App_Data\\uploads";
            requestHandler = new GbApiRequestHandler<Document>();
            blobhandler = new BlobServiceHandler();
        }
        [HttpPost]
        [Route("uploadtoblob")]
        public async Task<HttpResponseMessage> UploadToBlob()
        {
            try
            {
                uploadObject = Common.Utility.GetJSONObject(Request.Headers.GetValues("inputjson").FirstOrDefault<string>());
                //uploadObject = Common.Utility.GetJSONObject("{ \"ObjectType\":\"case\",\"DocumentType\":\"consent\",\"CompanyId\":\"16\", \"ObjectId\":\"86\"}");
            }
            catch { return new HttpResponseMessage(HttpStatusCode.BadRequest); }

            if (!Request.Content.IsMimeMultipartContent("form-data"))
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            var streamProvider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(streamProvider);

            List<HttpContent> streamContent = streamProvider.Contents.ToList();

            return blobhandler.UploadToBlob(Request, streamContent, (UploadInfo)uploadObject);
        }


        [HttpGet]
        [Route("downloadfromblob/{companyid}/{documentid}")]
        public HttpResponseMessage DownlodFromBlob(int companyid, int documentid)
        {
            return blobhandler.DownloadFromBlob(Request, companyid, documentid);
        }

    }
}
