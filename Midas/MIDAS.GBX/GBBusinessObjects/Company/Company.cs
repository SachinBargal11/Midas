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
        public GBEnums.AccountStatus Status { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("companyType")]
        public GBEnums.CompanyType CompanyType { get; set; }

        [JsonProperty("subscriptionType")]
        public GBEnums.SubsCriptionType SubsCriptionType { get; set; }

        [JsonProperty("taxId")]
        public string TaxID { get; set; }

        public AddressInfo AddressInfo { get; set; }
        public ContactInfo ContactInfo { get; set; }
        public CompanyType CompanyType1 { get; set; }

        [JsonProperty("location")]
        public List<Location> Locations { get; set; }

        [JsonProperty("registrationComplete")]
        public bool RegistrationComplete { get; set; }

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
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "Please input valid TaxID" });
            }

            return validations;
        }
    }
}
