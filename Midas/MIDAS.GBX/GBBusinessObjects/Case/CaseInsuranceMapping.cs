using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    //public class CaseInsuranceMapping : GbObject
    //{        
    //    [JsonProperty("caseId")]
    //    public int CaseId { get; set; }

    //    [JsonProperty("patientInsuranceInfoId")]
    //    public int PatientInsuranceInfoId { get; set; }

    //    [JsonProperty("isPrimaryInsurance")]
    //    public bool? IsPrimaryInsurance { get; set; }

    //    //[JsonProperty("case")]
    //    //public Case cases { get; set; }

    //    [JsonProperty("patientInsuranceInfo")]
    //    public PatientInsuranceInfo PatientInsuranceInfo{ get; set; }
    //}

    public class CaseInsuranceMapping : GbObject
    {
        [JsonProperty("caseId")]
        public int CaseId { get; set; }

        [JsonProperty("patientInsuranceInfos")]
        public List<PatientInsuranceInfo> PatientInsuranceInfos { get; set; }
    }
}
