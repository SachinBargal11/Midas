using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class AttorneyMaster : GbObject
    {
        [JsonProperty("CompanyId")]
        public int? companyId { get; set; }
        [JsonProperty("user")]
        public User User { get; set; }        

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();

            if (companyId == null || companyId <= 0)
                validations.Add(new BusinessValidation
                {
                    ValidationResult = BusinessValidationResult.Failure,
                    ValidationMessage = "CompanyId is required"
                });

            return validations;
        }
    }
}
