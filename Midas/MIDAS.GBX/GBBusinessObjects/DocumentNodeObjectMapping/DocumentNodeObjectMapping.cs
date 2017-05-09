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
    public class DocumentNodeObjectMapping : GbObject
    {
        [Required]
        [JsonProperty("objectType")]
        public GBEnums.ObjectTypes ObjectType { get; set; }

        [Required]
        [JsonProperty("childNode")]
        public string ChildNode { get; set; }

        [Required]
        [JsonProperty("companyid")]
        public int? CompanyId { get; set; }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();

            if (ObjectType <= 0)
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "ObjectType is required" });
            else if(!Enum.IsDefined(typeof(GBEnums.ObjectTypes),ObjectType))
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "ObjectType is not defined" });

            if (string.IsNullOrEmpty(ChildNode)) validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "DocumentType is required" });
            if (CompanyId <= 0) validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "CompanyId is required" });

            

            return validations;
        }
    }
}
