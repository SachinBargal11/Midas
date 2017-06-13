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
    public class ProcedureCodeCompanyMapping : GbObject
    {
        [Required]
        [JsonProperty("procedureCodeID")]
        public int ProcedureCodeID { get; set; }

        [Required]
        [JsonProperty("companyID")]
        public int CompanyID { get; set; }

        [Required]
        [JsonProperty("amount")]
        public decimal? Amount { get; set; }

        [Required]
        [JsonProperty("effectiveFromDate")]
        public DateTime? EffectiveFromDate { get; set; }

        [Required]
        [JsonProperty("effectiveToDate")]
        public DateTime? EffectiveToDate { get; set; }


    }
}


