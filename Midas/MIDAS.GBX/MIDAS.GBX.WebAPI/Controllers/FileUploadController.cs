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


namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/FileUpload")]
    public class FileUploadController : ApiController
    {
        internal string sourcePath = string.Empty;
        internal string remotePath = string.Empty;

        public FileUploadController()
        {
            sourcePath = HttpContext.Current.Server.MapPath("~/uploads").ToString();
            remotePath = ConfigurationManager.AppSettings.Get("FILE_UPLOAD_PATH").ToString();
        }

        [HttpPost]
        [Route("upload")]
        public async Task<HttpResponseMessage> Post()
        {
            if (Request.Content.IsMimeMultipartContent())
            {
                var streamProvider = new MultipartFormDataStreamProvider(sourcePath);
                await Request.Content.ReadAsMultipartAsync(streamProvider);
                foreach (MultipartFileData fileData in streamProvider.FileData)
                {
                    if (string.IsNullOrEmpty(fileData.Headers.ContentDisposition.FileName))
                        return Request.CreateResponse(HttpStatusCode.NotAcceptable, "This request is not properly formatted");
                    string fileName = fileData.Headers.ContentDisposition.FileName;                    
                    fileName = (fileName.StartsWith("\"") && fileName.EndsWith("\"")) ? fileName.Trim('"') : fileName;                    
                    fileName = (fileName.Contains(@"/") || fileName.Contains(@"\")) ? Path.GetFileName(fileName) : fileName;

                    if (File.Exists(Path.Combine(remotePath, fileName))) File.Delete(Path.Combine(remotePath, fileName));
                    File.Move(fileData.LocalFileName, Path.Combine(remotePath, fileName));
                }
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else return Request.CreateResponse(HttpStatusCode.NotAcceptable, "This request is not properly formatted");
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