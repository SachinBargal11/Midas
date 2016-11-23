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
        [JsonProperty("status")]
        [JsonConverter(typeof(StringEnumConverter))]
        public GBEnums.AccountStatus Status { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("companyType")]
        [JsonConverter(typeof(StringEnumConverter))]
        public GBEnums.CompanyType CompanyType { get; set; }

        [JsonProperty("subscriptionType")]
        [JsonConverter(typeof(StringEnumConverter))]
        public GBEnums.SubsCriptionType SubsCriptionType { get; set; }

        [JsonProperty("taxId")]
        public string TaxID { get; set; }
        public AddressInfo AddressInfo { get; set; }
        public ContactInfo ContactInfo { get; set; }

        public override List<BusinessValidation> Validate<T>(T entity)
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

            if (TaxID.Length!=10)
            {
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "Please input valid 10 digit TaxID" });
            }

            return validations;
        }
    }
}
