using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
namespace MIDAS.GBX.BusinessObjects
{
    public class Location : GbObject
    {
        public AddressInfo AddressInfo
        {
            get;
            set;
        }

        public Company Company
        {
            get;
            set;
        }

        public ContactInfo ContactInfo
        {
            get;
            set;
        }

        [JsonProperty("isDefault")]
        [Required]
        public bool IsDefault
        {
            get;
            set;
        }

        [JsonProperty("locationType")]
        [Required]
        public GBEnums.LocationType? LocationType
        {
            get;
            set;
        }

        [JsonProperty("name")]
        [Required]
        public string Name
        {
            get;
            set;
        }
        public Schedule Schedule { get; set; }
        public Location()
        {
        }
    }
}