using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class CaseCompanyConsentDocument : GbObject
    {
        [JsonProperty("caseId")]
        public int CaseId { get; set; }

        [JsonProperty("companyId")]
        public int CompanyId { get; set; }

        [JsonProperty("midasDocumentId")]
        public int MidasDocumentId { get; set; }

        [JsonProperty("documentName")]
        public string DocumentName { get; set; }

        [JsonProperty("case")]
        public Case Case { get; set; }

        [JsonProperty("company")]
        public Company Company { get; set; }

        [JsonProperty("midasDocument")]
        public MidasDocument MidasDocument { get; set; }

    }

}