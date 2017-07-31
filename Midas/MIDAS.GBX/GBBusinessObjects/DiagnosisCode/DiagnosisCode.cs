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
    public class DiagnosisCode : GbObject
    {
        [Required]
        [JsonProperty("diagnosisTypeId")]
        public int DiagnosisTypeId { get; set; }

        [Required]
        [JsonProperty("diagnosisCodeText")]
        public string DiagnosisCodeText { get; set; }

        [Required]
        [JsonProperty("diagnosisCodeDesc")]
        public string DiagnosisCodeDesc { get; set; }

        //[Required]
        //[JsonProperty("companyId")]
        //public int? CompanyId { get; set; }

        //public Company Company { get; set; }

        public DiagnosisType DiagnosisType { get; set; }
    }

    public class mDiagnosisCode : GbObject
    {
        [Required]
        [JsonProperty("diagnosisTypeId")]
        public int DiagnosisTypeId { get; set; }

        [Required]
        [JsonProperty("diagnosisCodeText")]
        public string DiagnosisCodeText { get; set; }

        [Required]
        [JsonProperty("diagnosisCodeDesc")]
        public string DiagnosisCodeDesc { get; set; }

        [Required]
        [JsonProperty("companyId")]
        public int? CompanyId { get; set; }

        public Company Company { get; set; }

        public mDiagnosisType mDiagnosisType { get; set; }
    }
}

