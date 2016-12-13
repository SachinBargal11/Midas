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
        
        public GBEnums.LocationType LocationType { get; set; }

        [Required]
        [JsonProperty("isDefault")]
        public bool IsDefault { get; set; }

        public AddressInfo AddressInfo { get; set; }
        public ContactInfo ContactInfo { get; set; }
        public Company Company { get; set; }
    }

    public class SaveLocation : GbObject
    {
        public Location location { get; set; }
        public Company company { get; set; }
        public AddressInfo addressInfo { get; set; }
        public ContactInfo contactInfo { get; set; }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();

            if (string.IsNullOrEmpty(location.Name))
            {
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "Location name is required" });
            }

            if (string.IsNullOrEmpty(location.LocationType.ToString()))
            {
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "Location type is required" });
            }

            if (string.IsNullOrEmpty(location.IsDefault.ToString()))
            {
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "Default location  is required" });
            }

            return validations;
        }
    }
}
