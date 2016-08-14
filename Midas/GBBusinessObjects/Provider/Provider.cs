using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security;
using Newtonsoft.Json;

namespace Midas.GreenBill.BusinessObject
{
    public class Provider : GbObject
    {
        [JsonProperty("npi")]
        public string NPI { get; set; }
        [JsonProperty("federalTaxID")]
        public string FederalTaxId { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("prefix")]
        public string Prefix { get; set; }
        public ICollection<ProviderMedicalFacility> ProviderMedicalFacilities { get; set; }
    }
}
