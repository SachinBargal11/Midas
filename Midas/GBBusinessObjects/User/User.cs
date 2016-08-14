using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.ComponentModel.DataAnnotations;

namespace Midas.GreenBill.BusinessObject
{
    public class User: GbObject
    {
        [Required]
        [JsonConverter(typeof(StringEnumConverter))]
        [JsonProperty("userType")]
        public GBEnums.UserType UserType { get; set; }
        public Account Account { get; set; }

        public Address Address { get; set; }
        public ContactInfo ContactInfo { get; set; }
        [Required]
        [JsonProperty("userName")]
        public string UserName { get; set; }
        [Required]
        [JsonProperty("firstName")]
        public string FirstName { get; set; }
        [JsonProperty("middleName")]

        public string MiddleName { get; set; }
        [Required]
        [JsonProperty("lastName")]
        public  string LastName { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        [JsonProperty("gender")]
        public GBEnums.Gender Gender { get; set; }
        [JsonProperty("imageLink")]
        public string ImageLink { get; set; }
        [JsonProperty("dateOfBirth")]
        public DateTime? DateOfBirth { get; set; }
        public string Password /*Need to be updated to SecureString*/ { get; set; }
    }
}