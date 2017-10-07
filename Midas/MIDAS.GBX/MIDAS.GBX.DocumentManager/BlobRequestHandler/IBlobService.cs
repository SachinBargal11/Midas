using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.DocumentManager
{
    public interface IBlobService
    {
        HttpResponseMessage UploadToBlob(HttpRequestMessage request, HttpContent content, string blobPath, int companyId, string servicepProvider);

        HttpResponseMessage UploadToBlob(HttpRequestMessage request, MemoryStream stream, string blobPath, int companyId, string servicepProvider);

        HttpResponseMessage DownloadFromBlob(HttpRequestMessage request, int companyid, string documentPath, string servicepProvider);

        HttpResponseMessage MergeDocuments(HttpRequestMessage request, int companyid, object pdfFiles,string blobPath, string servicepProvider);

        HttpResponseMessage PacketDocuments(HttpRequestMessage request, int companyid, object pdfFiles, string blobPath, string servicepProvider);

        object CreateTemplate(HttpRequestMessage request, Int32 companyId, string templateBlobPath, Dictionary<string, string> templateKeywords);
    }
}
