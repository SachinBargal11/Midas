using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class CompanyICDTypeCode : GbObject
    {
        [JsonProperty("companyID")]
        public int CompanyID { get; set; }

        [JsonProperty("ICDTypeCodeID")]
        public int ICDTypeCodeID { get; set; }

        [JsonProperty("ICDTypeCode")]
        public ICDTypeCode ICDTypeCode { get; set; }

    }
}

