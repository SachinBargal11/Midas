using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class InsuranceAddressInfo : GbObject
    {
        [JsonProperty("insuranceMasterId")]
        public int? InsuranceMasterId { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("address1")]
        public string Address1 { get; set; }

        [JsonProperty("address2")]
        public string Address2 { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("zipCode")]
        public string ZipCode { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; } 

        [JsonProperty("stateCode")]
        public string StateCode { get; set; }

        [JsonProperty("isDefault")]
        public Boolean? IsDefault { get; set; }
    }

    public class mInsuranceAddressInfo : GbObject
    {
        [JsonProperty("insuranceMasterId")]
        public int? InsuranceMasterId { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("address1")]
        public string Address1 { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("stateCode")]
        public string StateCode { get; set; }

        [JsonProperty("isDefault")]
        public Boolean? IsDefault { get; set; }
    }
}
