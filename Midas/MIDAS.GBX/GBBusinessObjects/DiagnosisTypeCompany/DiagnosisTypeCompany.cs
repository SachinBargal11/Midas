using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class DiagnosisTypeCompany : GbObject
    {
        [Required]
        [JsonProperty("diagnosisTypeText")]
        public string DiagnosisTypeText { get; set; }

        [Required]
        [JsonProperty("companyId")]
        public int? CompanyId { get; set; }

        public Company Company { get; set; }

        [JsonProperty("diagnosisCodes")]
        public List<DiagnosisCode> DiagnosisCodes { get; set; }
    }

    public class mDiagnosisTypeCompany : GbObject
    {
        [Required]
        [JsonProperty("diagnosisTypeText")]
        public string DiagnosisTypeText { get; set; }

        [Required]
        [JsonProperty("companyId")]
        public int? CompanyId { get; set; }

        [JsonProperty("company")]
        public Company Company { get; set; }

        public List<mDiagnosisCode> mDiagnosisCodes { get; set; }
    }
}

