using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class AddUser : GbObject
    {
        [JsonProperty("user")]
        public User user { get; set; }

        [JsonProperty("address")]
        public AddressInfo address { get; set; }

        [JsonProperty("contactInfo")]
        public ContactInfo contactInfo { get; set; }

        [JsonProperty("role")]
        public Role[] role { get; set; }

        [JsonProperty("company")]
        public Company company { get; set; }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();

            if (user.ID == 0)
            {
                if (string.IsNullOrEmpty(user.FirstName))
                {
                    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "FirstName is required" });
                }

                if (string.IsNullOrEmpty(user.LastName))
                {
                    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "LastName is required" });
                }

                if (string.IsNullOrEmpty(user.UserName))
                {
                    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "UserName is required" });
                }
                if (string.IsNullOrEmpty(user.UserType.ToString()))
                {
                    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "UserType is required" });
                }
            }

            return validations;
        }
    }
}
