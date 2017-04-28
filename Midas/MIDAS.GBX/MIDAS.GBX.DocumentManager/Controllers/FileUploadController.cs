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
using MIDAS.GBX.DocumentManager;

namespace MIDAS.GBX
{
    [RoutePrefix("midasdocumentmanager/FileUpload")]
    public class FileUploadController : ApiController
    {
        internal string sourcePath = string.Empty;
        internal string remotePath = string.Empty;
        internal DirectoryInfo directinfo;

        private IBlobService blobhandler;

        public FileUploadController()
        { }

        [HttpPost]
        [Route("uploadtoblob/{id}")]
        public HttpResponseMessage UploadToBlob(HttpContent content, int id)
        {
            blobhandler.UploadToBlob(Request, content, id);
            return Request.CreateResponse(HttpStatusCode.Accepted, "");
        }

    }
}