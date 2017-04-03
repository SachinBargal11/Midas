using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.DocumentManager
{
    public interface IBlobService
    {
        HttpResponseMessage UploadToBlob(HttpRequestMessage request, HttpContent content,int companyid);

        HttpResponseMessage DownloadFromBlob(HttpRequestMessage request, int companyid, int documentid);

        HttpResponseMessage MergeDocuments();

    }
}
