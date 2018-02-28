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
    public class DiagnosisCodeCompanyMapping : GbObject
    {
        [Required]
        [JsonProperty("diagnosisCodeID")]
        public int? DiagnosisCodeID { get; set; }

        [Required]
        [JsonProperty("companyID")]
        public int? CompanyID { get; set; }

        [Required]
        [JsonProperty("diagnosisTypeCompnayID")]
        public int? DiagnosisTypeCompnayID { get; set; }

        [Required]
        [JsonProperty("diagnosisTypeText")]
        public string DiagnosisTypeText { get; set; }

    }
}


