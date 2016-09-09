using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midas.GreenBill.BusinessObject
{
    public class SpecialityDetails : GbObject
    {
        [JsonProperty("isUnitApply")]
        public bool IsUnitApply { get; set; }
        [JsonProperty("followUpDays")]
        public int FollowUpDays { get; set; }
        [JsonProperty("followupTime")]
        public int FollowupTime { get; set; }
        [JsonProperty("initialDays")]
        public int InitialDays { get; set; }
        [JsonProperty("initialTime")]
        public int InitialTime { get; set; }
        [JsonProperty("isInitialEvaluation")]
        public bool IsInitialEvaluation { get; set; }
        [JsonProperty("include1500")]
        public bool Include1500 { get; set; }
        [JsonProperty("associatedSpecialty")]
        public int AssociatedSpecialty { get; set; }
        [JsonProperty("allowMultipleVisit")]
        public bool AllowMultipleVisit { get; set; }
        public MedicalFacility MedicalFacility { get; set; }
        public Specialty Specialty { get; set; }
    }
}
