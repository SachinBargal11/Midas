using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class ICDTypeCode : GbObject
    {
        [JsonProperty("code")]
        public string Code { get; set; }

        [JsonProperty("companyICDTypeCode")]
        public List<CompanyICDTypeCode> CompanyICDTypeCode { get; set; }

        [JsonProperty("diagnosisType")]
        public List<DiagnosisType> DiagnosisTypes { get; set; }

    }
}

