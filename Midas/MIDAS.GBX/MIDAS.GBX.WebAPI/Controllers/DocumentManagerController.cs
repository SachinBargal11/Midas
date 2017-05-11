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
        internal UploadInfo uploadObject = null;
        private IRequestHandler<UploadInfo> requestHandler;
        private IRequestHandler<MergePDF> requestHandler1;
        private IBlobService blobhandler;
        private List<Document> documentList = new List<Document>();

        public DocumentManagerController()
        {
            requestHandler = new GbApiRequestHandler<UploadInfo>();
            requestHandler1 = new GbApiRequestHandler<MergePDF>();
            blobhandler = new BlobServiceHandler();
        }

        [HttpPost]
        [Route("uploadtoblob")]
        public async Task<HttpResponseMessage> UploadToBlob()
        {
            try
            {
                uploadObject = (UploadInfo)Common.Utility.GetJSONObject(Request.Headers.GetValues("inputjson").FirstOrDefault<string>());
                //uploadObject = Common.Utility.GetJSONObject("{ \"ObjectType\":\"case\",\"DocumentType\":\"consent\",\"CompanyId\":\"16\", \"ObjectId\":\"86\"}");
            }
            catch { return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "Invalid JSON Input.", errorObject = "", ErrorLevel = ErrorLevel.Error }); }

            try
            {
                if (!Request.Content.IsMimeMultipartContent("form-data"))
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "File input is not proper.", errorObject = "", ErrorLevel = ErrorLevel.Error });

                var streamProvider = new MultipartMemoryStreamProvider();
                await Request.Content.ReadAsMultipartAsync(streamProvider);

                List<HttpContent> streamContent = streamProvider.Contents.ToList();

                HttpResponseMessage resDocumentPath = requestHandler.GetGbObjects(Request, uploadObject);
                if (!resDocumentPath.StatusCode.Equals(HttpStatusCode.Created))
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "Path not found", errorObject = "", ErrorLevel = ErrorLevel.Error });

                foreach (HttpContent ctnt in streamContent)
                {
                    string blobPath = ((ObjectContent)resDocumentPath.Content).Value.ToString();
                    HttpResponseMessage resBlob = blobhandler.UploadToBlob(Request, ctnt, blobPath, uploadObject.CompanyId);
                    if (resBlob.StatusCode.Equals(HttpStatusCode.Created) || resBlob.StatusCode.Equals(HttpStatusCode.OK))
                    {
                        uploadObject.BlobPath = ((ObjectContent)resBlob.Content).Value.ToString();
                        documentList.Add((Document)((ObjectContent)requestHandler.CreateGbObject(Request, uploadObject).Content).Value);
                    }
                    else if (resBlob.StatusCode.Equals(HttpStatusCode.NotFound))
                        return resBlob;
                    else
                        documentList.Add(new Document { Status = "Failed", DocumentName = ctnt.Headers.ContentDisposition.FileName });
                }
            }
            catch { return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "System Error.", errorObject = "", ErrorLevel = ErrorLevel.Error }); }

            var res = (object)documentList;
            if (res != null) return Request.CreateResponse(HttpStatusCode.Created, res);
            else return Request.CreateResponse(HttpStatusCode.NotFound, res);
        }

        [HttpGet]
        [Route("downloadfromblob/{companyid}/{documentid}")]
        public HttpResponseMessage DownlodFromBlob(int companyid, int documentid)
        {
            return blobhandler.DownloadFromBlob(Request, companyid, documentid);
        }

        [HttpPost]
        [Route("mergePDFs")]
        public HttpResponseMessage MergeDocuments([FromBody]MergePDF data)
        {            
            HttpResponseMessage res = new HttpResponseMessage();
            res = requestHandler1.GetGbObjects(Request, data);

            string blobPath = ((ObjectContent)requestHandler1.GetObject(Request, data.CaseId).Content).Value.ToString();

            if (res == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, res);
            else
            {                
                return blobhandler.MergeDocuments(data.CompanyId, ((ObjectContent)res.Content).Value, blobPath + data.MergedDocumentName);
            }
        }
    }
}
