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
        [JsonProperty("userType")]
        public GBEnums.UserType UserType { get; set; }

        [JsonProperty("addressInfo")]
        public AddressInfo AddressInfo { get; set; }

        [JsonProperty("contactInfo")]
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
        
        [JsonProperty("gender")]
        public GBEnums.Gender? Gender { get; set; }

        [JsonProperty("imageLink")]
        public string ImageLink { get; set; }

        [JsonProperty("dateOfBirth")]
        public DateTime? DateOfBirth { get; set; }

        [JsonProperty("password")]
        public string Password /*Need to be updated to SecureString*/ { get; set; }

        [Required]
        [JsonProperty("status")]        
        public GBEnums.UserStatus Status { get; set; }

        [JsonProperty("2factEmail")]
        public bool C2FactAuthEmailEnabled { get; set; }

        [JsonProperty("2factSms")]
        public bool C2FactAuthSMSEnabled { get; set; }

        [JsonProperty("forceLogin")]
        public bool forceLogin { get; set; }

        [JsonProperty("userCompanies")]
        public List<UserCompany> UserCompanies { get; set; }

        // public List<DoctorSpeciality> DoctorSpecialities { get; set; }

        [JsonProperty("roles")]
        public List<Role> Roles { get; set; }

        [JsonProperty("userPersonalSettings")]
        public List<UserPersonalSetting> UserPersonalSettings { get; set; }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();
            //Implement logic for validation

            return validations;
        }
    }

    public class UserNameValidate : GbObject
    {
        [JsonProperty("userName")]
        public string UserName { get; set; }
    }

    public class mUser : GbObject
    {
        [Required]

        [JsonProperty("userType")]
        public GBEnums.UserType UserType { get; set; }

        [JsonProperty("addressInfo")]
        public AddressInfo AddressInfo { get; set; }

        [JsonProperty("contactInfo")]
        public ContactInfo ContactInfo { get; set; }

        [Required]
        [JsonProperty("userName")]
        public string UserName { get; set; }

        [Required]
        [JsonProperty("firstName")]
        public string FirstName { get; set; }

        [Required]
        [JsonProperty("lastName")]
        public string LastName { get; set; }

        [JsonProperty("password")]
        public string Password /*Need to be updated to SecureString*/ { get; set; }

        [JsonProperty("forceLogin")]
        public bool forceLogin { get; set; }

        public List<mUserCompany> mUserCompanies { get; set; }

        public List<mRole> mRoles { get; set; }

    }
}
