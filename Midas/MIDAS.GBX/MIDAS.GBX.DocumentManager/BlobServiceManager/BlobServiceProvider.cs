using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using MIDAS.GBX.BusinessObjects.Common;
using MIDAS.GBX.DataRepository.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace MIDAS.GBX.DocumentManager
{
    public abstract class BlobServiceProvider
    {
        internal MIDASGBXEntities _context;
        public BlobServiceProvider(MIDASGBXEntities context)
        {
            _context = context;
        }

        #region Virtual Methods
        public virtual Object Upload(string blobPath, HttpContent content, int companyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object Upload(string blobPath, string file, int companyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object Download(int companyid, int documentid)
        {
            throw new NotImplementedException();
        }

        public virtual Object Merge(int companyid, object pdfFiles,string blobPath)
        {
            throw new NotImplementedException();
        }

        public virtual Object Template(Int32 CompanyId, string templateBlobPath, Dictionary<string, string> templateKeywords)
        {
            throw new NotImplementedException();
        }

        public virtual Object Validate(HttpContent ctnt)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}