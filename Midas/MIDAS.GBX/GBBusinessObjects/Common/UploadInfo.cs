using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects.Common
{    
    public class UploadInfo
    {
        public string DocumentType { get; set; }
        public string ObjectType { get; set; }
        public int ObjectId { get; set; }
        public int CompanyId { get; set; }
        
        public UploadInfo()
        {
            ObjectId = 0;
            CompanyId = 0;
            DocumentType = "";
            ObjectType = "";
        }
    }
}
