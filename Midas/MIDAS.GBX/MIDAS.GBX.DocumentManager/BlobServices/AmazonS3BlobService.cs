using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using MIDAS.GBX.BusinessObjects.Common;
using MIDAS.GBX.DataRepository.Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;

namespace MIDAS.GBX.DocumentManager
{
    public class AmazonS3BlobService : BlobServiceProvider, IDisposable
    {
        public AmazonS3BlobService(MIDASGBXEntities context) : base(context)
        {
            
        }

        public override Object Upload(UploadInfo uploadObject, List<HttpContent> content)
        {            
            return new Object();
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}