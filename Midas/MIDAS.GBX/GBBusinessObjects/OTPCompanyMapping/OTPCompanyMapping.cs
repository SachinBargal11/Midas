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
    public class OTPCompanyMapping : GbObject
    {

        [Required]
        [JsonProperty("otp")]
        public string OTP { get; set; }

        [Required]
        [JsonProperty("companyId")]
        public int CompanyId { get; set; }

        [Required]
        [JsonProperty("validUntil")]
        public DateTime ValidUntil { get; set; }

        [Required]
        [JsonProperty("usedByCompanyId")]
        public int? UsedByCompanyId { get; set; }

        [Required]
        [JsonProperty("usedAtDate")]
        public DateTime? UsedAtDate { get; set; }

        [Required]
        [JsonProperty("isCancelled")]
        public bool? IsCancelled { get; set; }

        [Required]
        [JsonProperty("otpForDate")]
        public DateTime? OTPForDate { get; set; }


        public Company Company { get; set; }
        public Company Company1 { get; set; }

    }    
}
