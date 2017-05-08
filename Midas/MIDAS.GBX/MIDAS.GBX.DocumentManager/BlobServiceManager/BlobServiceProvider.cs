﻿using Microsoft.WindowsAzure.Storage;
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
        public virtual Object Upload(UploadInfo uploadObject, List<HttpContent> content)
        {
            throw new NotImplementedException();
        }

        public virtual Object Download(int companyid,int documentid)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}