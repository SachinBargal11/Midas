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
    public class Location : GbObject
    {

        [Required]
        [JsonProperty("name")]
        public string Name { get; set; }

        [Required]
        [JsonProperty("locationType")]
        [JsonConverter(typeof(StringEnumConverter))]
        public GBEnums.LocationType LocationType { get; set; }

        [Required]
        [JsonProperty("isDefault")]
        public bool IsDefault { get; set; }

        public AddressInfo AddressInfo { get; set; }
        public Company Company { get; set; }
    }
}
