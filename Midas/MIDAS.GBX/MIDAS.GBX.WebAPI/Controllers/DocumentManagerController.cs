using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using MIDAS.GBX.BusinessObjects;
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

                HttpResponseMessage serviceProvider = requestHandler.GetObject(Request, uploadObject.CompanyId);
                if (serviceProvider.StatusCode.Equals(HttpStatusCode.BadRequest))
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "Blob storage provider not found for this company", errorObject = "", ErrorLevel = ErrorLevel.Error });

                HttpResponseMessage resDocumentPath = requestHandler.GetGbObjects(Request, uploadObject);
                if (!resDocumentPath.StatusCode.Equals(HttpStatusCode.Created) || ((ObjectContent)resDocumentPath.Content).Value.ToString().Equals(""))
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "Path not found", errorObject = "", ErrorLevel = ErrorLevel.Error });

                foreach (HttpContent ctnt in streamContent)
                {
                    string blobPath = ((ObjectContent)resDocumentPath.Content).Value.ToString();
                    HttpResponseMessage resBlob = blobhandler.UploadToBlob(Request, ctnt, blobPath, uploadObject.CompanyId, ((ObjectContent)serviceProvider.Content).Value.ToString());

                    if (resBlob.StatusCode.Equals(HttpStatusCode.Created) || resBlob.StatusCode.Equals(HttpStatusCode.OK))
                    {
                        uploadObject.BlobPath = ((ObjectContent)resBlob.Content).Value.ToString();
                        documentList.Add((Document)((ObjectContent)requestHandler.CreateGbObject(Request, uploadObject).Content).Value);
                    }
                    else
                        documentList.Add(new Document { Status = "Failed", DocumentName = ctnt.Headers.ContentDisposition.FileName });
                }
            }
            catch { return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "System Error.", errorObject = "", ErrorLevel = ErrorLevel.Error }); }

            var res = (object)documentList;
            if (res != null) return Request.CreateResponse(HttpStatusCode.Created, res);
            else return Request.CreateResponse(HttpStatusCode.NotFound, res);
        }

        [HttpPost]
        [Route("uploadstreamtoblob")]
        public HttpResponseMessage UploadToBlob([FromBody]string filPath)
        {
            try
            {
                uploadObject = (UploadInfo)Common.Utility.GetJSONObject(Request.Headers.GetValues("inputjson").FirstOrDefault<string>());                
            }
            catch { return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "Invalid JSON Input.", errorObject = "", ErrorLevel = ErrorLevel.Error }); }

            try
            {                
                using (FileStream fileStream = new FileStream(filPath, FileMode.Open, FileAccess.Read))
                {
                    MemoryStream memStream = new MemoryStream();
                    memStream.SetLength(fileStream.Length);
                    fileStream.Read(memStream.GetBuffer(), 0, (int)fileStream.Length);

                    HttpResponseMessage serviceProvider = requestHandler.GetObject(Request, uploadObject.CompanyId);
                    if (serviceProvider == null)
                        return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "Blob storage provider not found for this company", errorObject = "", ErrorLevel = ErrorLevel.Error });

                    HttpResponseMessage resDocumentPath = requestHandler.GetGbObjects(Request, uploadObject);
                    if (!resDocumentPath.StatusCode.Equals(HttpStatusCode.Created) || ((ObjectContent)resDocumentPath.Content).Value.ToString().Equals(""))
                        return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "Path not found", errorObject = "", ErrorLevel = ErrorLevel.Error });

                    string blobPath = ((ObjectContent)resDocumentPath.Content).Value.ToString() + "/doc_" + uploadObject.CompanyId+".pdf";
                    HttpResponseMessage resBlob = blobhandler.UploadToBlob(Request, memStream, blobPath, uploadObject.CompanyId, ((ObjectContent)serviceProvider.Content).Value.ToString());

                    if (resBlob.StatusCode.Equals(HttpStatusCode.Created) || resBlob.StatusCode.Equals(HttpStatusCode.OK))
                    {
                        uploadObject.BlobPath = ((ObjectContent)resBlob.Content).Value.ToString();
                        documentList.Add((Document)((ObjectContent)requestHandler.CreateGbObject(Request, uploadObject).Content).Value);
                    }
                    else if (resBlob.StatusCode.Equals(HttpStatusCode.NotFound))
                        return resBlob;
                    else
                        documentList.Add(new Document { Status = "Failed", DocumentName = "/doc_" + uploadObject.CompanyId + ".pdf" });
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
            HttpResponseMessage serviceProvider = requestHandler.GetObject(Request, companyid);
            if (serviceProvider == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "Blob storage provider not found for this company", errorObject = "", ErrorLevel = ErrorLevel.Error });

            HttpResponseMessage documentPath = requestHandler.GetByDocumentId(Request, documentid);
            if (documentPath == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "No document found", errorObject = "", ErrorLevel = ErrorLevel.Error });

            return blobhandler.DownloadFromBlob(Request, companyid, ((ObjectContent)documentPath.Content).Value.ToString(), ((ObjectContent)serviceProvider.Content).Value.ToString());
        }

        [HttpPost]
        [Route("mergePDFs")]
        public HttpResponseMessage MergeDocuments([FromBody]MergePDF data)
        {            
            HttpResponseMessage res = new HttpResponseMessage();
            res = requestHandler1.GetGbObjects(Request, data);

            string blobPath = ((ObjectContent)requestHandler1.GetObject(Request, data.CaseId, "mergepdfs").Content).Value.ToString();

            HttpResponseMessage serviceProvider = requestHandler.GetObject(Request, data.CompanyId);
            if (serviceProvider == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "Blob storage provider not found for this company", errorObject = "", ErrorLevel = ErrorLevel.Error });

            if (res == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, res);
            else
            {
                HttpResponseMessage res1 = blobhandler.MergeDocuments(Request, data.CompanyId, ((ObjectContent)res.Content).Value, blobPath+"/" + data.MergedDocumentName, ((ObjectContent)serviceProvider.Content).Value.ToString());
                if (res1.StatusCode.Equals(HttpStatusCode.Created) || res1.StatusCode.Equals(HttpStatusCode.OK))
                {
                    uploadObject = new UploadInfo();
                    uploadObject.BlobPath = ((ObjectContent)res1.Content).Value.ToString();
                    uploadObject.ObjectId = data.CaseId;
                    uploadObject.ObjectType = EN.Constants.CaseType;
                    documentList.Add((Document)((ObjectContent)requestHandler.CreateGbObject(Request, uploadObject).Content).Value);
                }
                else if (res1.StatusCode.Equals(HttpStatusCode.NotFound))
                    return res1;
                else
                    documentList.Add(new Document { Status = "Failed", DocumentName = data.MergedDocumentName });
            }

            var restest = (object)documentList;
            if (restest != null) return Request.CreateResponse(HttpStatusCode.Created, restest);
            else return Request.CreateResponse(HttpStatusCode.NotFound, restest);
        }

        [HttpGet]
        [Route("get/{id}/{type}")]
        //[AllowAnonymous]
        public HttpResponseMessage Get(int id, string type)
        {
            return requestHandler.GetObject(Request, id, type);
        }
    }
}
 