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
        public AmazonS3BlobService()
        { }

        public override Object Upload(string blobPath, HttpContent content, int companyId)
        {            
            return new Object();
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}