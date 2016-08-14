using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midas.GreenBill.BusinessObject
{
    public class Account:GbObject
    {
        [Required]
        [JsonProperty("status")]
        [JsonConverter(typeof(StringEnumConverter))]
        public GBEnums.AccountStatus Status { get; set; }

        [Required]
        [JsonProperty("name")]
        public string Name { get; set; }

        public ICollection<User> Users { get; set; }//MedicalFacilities
        public ICollection<MedicalFacility> MedicalFacilities { get; set; }
    }
}
