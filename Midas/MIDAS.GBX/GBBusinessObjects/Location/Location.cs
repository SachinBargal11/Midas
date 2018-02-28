using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
namespace MIDAS.GBX.BusinessObjects
{
    public class Location : GbObject
    {
        [JsonProperty("addressInfo")]
        public AddressInfo AddressInfo { get; set; }

        [JsonProperty("company")]
        public Company Company { get; set; }

        [JsonProperty("contactInfo")]
        public ContactInfo ContactInfo { get; set; }

        [JsonProperty("isDefault")]
        public bool IsDefault { get; set; }

        [JsonProperty("locationType")]
        public GBEnums.LocationType? LocationType { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("schedule")]
        public Schedule Schedule { get; set; }

        [JsonProperty("handicapRamp")]
        public bool HandicapRamp { get; set; }

        [JsonProperty("stairsToOffice")]
        public bool StairsToOffice { get; set; }

        [JsonProperty("publicTransportNearOffice")]
        public bool PublicTransportNearOffice { get; set; }

        //[JsonProperty("addressInfo")]
        //public AddressInfo AddressInfo
        //{
        //    get;
        //    set;
        //}

        //[JsonProperty("company")]
        //public Company Company
        //{
        //    get;
        //    set;
        //}

        //[JsonProperty("contactInfo")]
        //public ContactInfo ContactInfo
        //{
        //    get;
        //    set;
        //}

        //[JsonProperty("isDefault")]
        //[Required]
        //public bool IsDefault
        //{
        //    get;
        //    set;
        //}

        //[JsonProperty("locationType")]
        //[Required]
        //public GBEnums.LocationType? LocationType
        //{
        //    get;
        //    set;
        //}

        //[JsonProperty("name")]
        //[Required]
        //public string Name
        //{
        //    get;
        //    set;
        //}

        //[JsonProperty("schedule")]
        //public Schedule Schedule { get; set; }

        //public Location()
        //{
        //}
    }

    public class mLocation : GbObject
    {
        public mAddressInfo mAddressInfo
        {
            get;
            set;
        }

        public Company Company
        {
            get;
            set;
        }

        public mContactInfo mContactInfo
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
        public mSchedule mSchedule { get; set; }

    }
}