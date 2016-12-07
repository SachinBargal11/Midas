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
    public class Doctor : GbObject
    {
        [Required]
        [JsonProperty("licenseNumber")]
        public string LicenseNumber { get; set; }

        [Required]
        [JsonProperty("wcbAuthorization")]
        public string WCBAuthorization { get; set; }

        [Required]
        [JsonProperty("wcbratingCode")]
        public string WcbRatingCode { get; set; }

        [Required]
        [JsonProperty("npi")]
        public string NPI { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        [JsonProperty("taxType")]
        public GBEnums.TaxType TaxType { get; set; }

        [Required]
        [JsonProperty("title")]
        public string Title { get; set; }

        public User User { get; set; }
        public List<DoctorSpeciality> DoctorSpecialities { get; set; }
    }
}
