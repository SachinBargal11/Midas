using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class CaseCompanyMapping : GbObject
    {
        [JsonProperty("caseId")]
        public int CaseId { get; set; }

        [JsonProperty("isOriginator")]
        public bool IsOriginator { get; set; }

        //[JsonProperty("companyId")]
        //public int CompanyId { get; set; }

        [JsonProperty("case")]
        public Case Case { get; set; }

        [JsonProperty("company")]
        public Company Company { get; set; }

    }

    public class mCaseCompanyMapping : GbObject
    {
        [JsonProperty("caseId")]
        public int CaseId { get; set; }

        [JsonProperty("case")]
        public mCase Case { get; set; }

        [JsonProperty("company")]
        public Company Company { get; set; }

    }

}