using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class CompanyCaseConsentApproval : GbObject
    {
        [JsonProperty("companyId")]
        public int CompanyId { get; set; }

        [JsonProperty("caseId")]
        public int? CaseId { get; set; }

        [JsonProperty("consentGivenTypeId")]
        public byte ConsentGivenTypeId { get; set; }

        [JsonProperty("case")]
        public Case Case { get; set; }

        [JsonProperty("company")]
        public Company Company { get; set; }

        [JsonProperty("consentGivenType")]
        public ConsentGivenType ConsentGivenType { get; set; }

    }

    public class CompanyCaseConsentBase64 : GbObject
    {
        [JsonProperty("companyId")]
        public int CompanyId { get; set; }

        [JsonProperty("caseId")]
        public int CaseId { get; set; }

        [JsonProperty("base64Data")]
        public string Base64Data { get; set; }      
    }

}