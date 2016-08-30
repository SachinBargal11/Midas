using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Midas.GreenBill.BusinessObject
{
    public class Provider : GbObject
    {
       
        [JsonProperty("npi")]
        [Required]
        public string NPI { get; set; }

        [JsonProperty("federalTaxID")]
        [Required]
        public string FederalTaxId { get; set; }

        [JsonProperty("name")]
        [Required]
        public string Name { get; set; }

        [JsonProperty("prefix")]
        [Required]
        public string Prefix { get; set; }
        public ICollection<ProviderMedicalFacility> ProviderMedicalFacilities { get; set; }
    }
}
