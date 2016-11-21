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
    public class Company:GbObject
    {
        [Required]
        [JsonProperty("status")]
        [JsonConverter(typeof(StringEnumConverter))]
        public GBEnums.AccountStatus Status { get; set; }

        [Required]
        [JsonProperty("name")]
        public string Name { get; set; }

        [Required]
        [JsonProperty("companyType")]
        [JsonConverter(typeof(StringEnumConverter))]
        public GBEnums.CompanyType CompanyType { get; set; }

        [Required]
        [JsonProperty("subscriptionType")]
        [JsonConverter(typeof(StringEnumConverter))]
        public GBEnums.SubsCriptionType SubsCriptionType { get; set; }

        [JsonProperty("taxId")]
        public string TaxID { get; set; }
        public AddressInfo AddressInfo { get; set; }
        public ContactInfo ContactInfo { get; set; }

        public virtual List<BusinessValidation> Validate()
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();
            //Implement logic for validation

            if (string.IsNullOrEmpty(Name))
            {
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "Name is required" });
            }

            if (string.IsNullOrEmpty(TaxID))
            {
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "TaxID is required" });
            }

            return validations;
        }
    }
}
