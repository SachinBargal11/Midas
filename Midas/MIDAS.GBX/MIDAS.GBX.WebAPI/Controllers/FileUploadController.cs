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
//using MIDAS.GBX.EntityRepository;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/FileUpload")]
    public class FileUploadController : ApiController
    {
        internal string sourcePath = string.Empty;
        internal string remotePath = string.Empty;
        internal DirectoryInfo directinfo;

        public FileUploadController()
        {
            sourcePath = HttpContext.Current.Server.MapPath("~/uploads").ToString();
            remotePath = ConfigurationManager.AppSettings.Get("FILE_UPLOAD_PATH").ToString();            
        }

        [HttpPost]
        [Route("upload/{id}/{type}")]
        public async Task<HttpResponseMessage> Post(int id, string type)
        {
            try
            {
                if (Request.Content.IsMimeMultipartContent())
                {
                    var streamProvider = new MultipartFormDataStreamProvider(sourcePath);
                    await Request.Content.ReadAsMultipartAsync(streamProvider);
                    foreach (MultipartFileData fileData in streamProvider.FileData)
                    {
                        if (type == "case")
                        {
                            directinfo = Directory.CreateDirectory(remotePath + "/case-" + id + "/CH/reports");
                        }
                        else if (type == "visit")
                        {
                            directinfo = Directory.CreateDirectory(remotePath + "/visit-" + id + "/CH/reports");
                        }
                        if (string.IsNullOrEmpty(fileData.Headers.ContentDisposition.FileName))
                            return Request.CreateResponse(HttpStatusCode.NotAcceptable, "This request is not properly formatted");
                        string fileName = fileData.Headers.ContentDisposition.FileName;
                        fileName = (fileName.StartsWith("\"") && fileName.EndsWith("\"")) ? fileName.Trim('"') : fileName;
                        fileName = (fileName.Contains(@"/") || fileName.Contains(@"\")) ? Path.GetFileName(fileName) : fileName;

                        if (File.Exists(Path.Combine(directinfo.FullName, fileName))) File.Delete(Path.Combine(directinfo.FullName, fileName));
                        File.Move(fileData.LocalFileName, Path.Combine(directinfo.FullName, fileName));

                        if (type == "case")
                        {
                            CaseController caseAPI = new CaseController();
                            caseAPI.ControllerContext = ControllerContext;
                            return caseAPI.AddUploadedFileData(id, Path.Combine(directinfo.FullName, fileName));
                        }
                        else if (type == "visit")
                        {
                            PatientVisit2Controller visitAPI = new PatientVisit2Controller();
                            visitAPI.ControllerContext = ControllerContext;
                            return visitAPI.AddUploadedFileData(id, Path.Combine(directinfo.FullName, fileName));
                        }
                    }
                    return Request.CreateResponse(HttpStatusCode.OK, "Uploaded file successfully.");
                }
                else return Request.CreateResponse(HttpStatusCode.NotAcceptable, new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize("{\"fileUploadPath\":\"\"}", typeof(object)));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize("{\"fileUploadPath\":\"\"}", typeof(object)));
            }
        }
        /*[HttpPost]
        [Route("upload")]
        public HttpResponseMessage Post()
        {
            if (Request.Content.IsMimeMultipartContent())
            {

                //string fullPath = HttpContext.Current.Server.MapPath("E://uploads");

                MultipartFormDataStreamProvider streamProvider = new MultipartFormDataStreamProvider("E://uploads");
                IEnumerable<HttpContent> parts = null;
                Task.Factory.StartNew(() => parts = Request.Content.ReadAsMultipartAsync().Result.Contents, 
                                                    CancellationToken.None, 
                                                    TaskCreationOptions.LongRunning, 
                                                    TaskScheduler.Default).Wait();

                var task = Request.Content.ReadAsMultipartAsync(streamProvider).ContinueWith(t =>
                {
                    if (t.IsFaulted || t.IsCanceled)
                    {
                        throw new HttpResponseException(HttpStatusCode.InternalServerError);
                    }

                    var fileInfo = streamProvider.FileData.Select(i =>
                    {
                        var info = new FileInfo(i.LocalFileName);
                        return "File uploaded as " + info.FullName + " (" + info.Length + ")";
                    });
                    return fileInfo;

                });               
            }
            else
            {
                Request.CreateResponse(HttpStatusCode.NotAcceptable, "Invalid Request!");
                return null;
            }
            return new HttpResponseMessage();
        }*/
    }
}