using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class Document : GbObject
    {
        [JsonProperty("documentId")]
        public int DocumentId { get; set; }

        [JsonProperty("id")]
        public int id { get; set; }      

        [JsonProperty("documentPath")]
        public string DocumentPath { get; set; }

        [JsonProperty("documentName")]
        public string DocumentName { get; set; }
        
        [JsonProperty("documentType")]
        public string DocumentType { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("createbyuserID")]
        public int ? createUserId { get; set; }

        [JsonProperty("updateByUserID")]
        public int ? updateUserId { get; set; }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();
            /*/Check for allowed file extensions [per file]
            if (!streamContent.ToList().TrueForAll(x => Enum.IsDefined(typeof(GBEnums.FileTypes), x.Headers.ContentDisposition.FileName.Split('.')[1].Replace("\"", string.Empty))))
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "Invalid File extension" });
            //Check for allowed file size <= 1MB [per file]
            if (!streamContent.ToList().TrueForAll(x => (Convert.ToDecimal(x.Headers.ContentLength / (1024.0m * 1024.0m)) > 0 && Convert.ToDecimal(x.Headers.ContentLength / (1024.0m * 1024.0m)) <= 1)))
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "Filesize exceeded the limit 1MB" });*/

            return validations;
        }
    }        
}
