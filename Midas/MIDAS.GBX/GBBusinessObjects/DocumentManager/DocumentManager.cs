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
    public class MergePDF : GbObject
    {
        [Required]
        [JsonProperty("mergedDocumentName")]
        public string MergedDocumentName { get; set; }

        [Required]
        [JsonProperty("companyId")]
        public int CompanyId { get; set; }

        [Required]
        [JsonProperty("caseId")]
        public int CaseId { get; set; }

        [JsonProperty("documentIds")]
        public List<int> DocumentIds { get; set; }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();
            return validations;
        }
    }
}
