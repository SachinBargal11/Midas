using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class Signup: GbObject
    {
        [JsonProperty("company")]
        public Company company { get; set; }

        [JsonProperty("user")]
        public User user { get; set; }

        [JsonProperty("addressInfo")]
        public AddressInfo addressInfo { get; set; }

        [JsonProperty("contactInfo")]
        public ContactInfo contactInfo { get; set; }

        [JsonProperty("role")]
        public Role role { get; set; }
    }
}
