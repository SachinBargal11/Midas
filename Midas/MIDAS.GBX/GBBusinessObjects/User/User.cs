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
    public class User:GbObject
    {
        [Required]
        [JsonConverter(typeof(StringEnumConverter))]
        [JsonProperty("userType")]
        public GBEnums.UserType UserType { get; set; }

        public AddressInfo AddressInfo { get; set; }
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
        public string LastName { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        [JsonProperty("gender")]
        public GBEnums.Gender Gender { get; set; }
        [JsonProperty("imageLink")]
        public string ImageLink { get; set; }
        [JsonProperty("dateOfBirth")]
        public DateTime? DateOfBirth { get; set; }
        [JsonProperty("password")]
        public string Password /*Need to be updated to SecureString*/ { get; set; }
        [Required]
        [JsonProperty("status")]
        [JsonConverter(typeof(StringEnumConverter))]
        public GBEnums.UserStatus Status { get; set; }

        [JsonProperty("2factEmail")]
        public bool C2FactAuthEmailEnabled { get; set; }

        [JsonProperty("2factSms")]
        public bool C2FactAuthSMSEnabled { get; set; }
        [JsonProperty("forceLogin")]
        public bool forceLogin { get; set; }

        public List<UserCompany> UserCompanies { get; set; }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();
            //Implement logic for validation

            return validations;
        }
    }
}
