using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class Referral : GbObject
    {
        [JsonProperty("caseId")]
        public int CaseId { get; set; }

        [JsonProperty("referringCompanyId")]
        public int ReferringCompanyId { get; set; }

        [JsonProperty("referringLocationId")]
        public int ReferringLocationId { get; set; }

        //[JsonProperty("referringDoctorId")]
        //public int ReferringDoctorId { get; set; }

        [JsonProperty("referredToCompanyId")]
        public int? ReferredToCompanyId { get; set; }

        [JsonProperty("referredToLocationId")]
        public int? ReferredToLocationId{ get; set; }

        [JsonProperty("referredToDoctorId")]
        public int? ReferredToDoctorId{ get; set; }

        [JsonProperty("referredToRoomId")]
        public int? ReferredToRoomId{ get; set; }

        [JsonProperty("note")]
        public string Note{ get; set; }

        [JsonProperty("referredByEmail")]
        public string ReferredByEmail{ get; set; }

        [JsonProperty("referredToEmail")]
        public string ReferredToEmail{ get; set; }

        [JsonProperty("referralAccepted")]
        public bool? ReferralAccepted{ get; set; }

        [JsonProperty("referredToDoctor")]
        public Doctor Doctor { get; set; }

        [JsonProperty("referringDoctor")]
        public Doctor Doctor1 { get; set; }

        [JsonProperty("referredToLocation")]
        public Location Location { get; set; }

        [JsonProperty("referringLocation")]
        public Location Location1 { get; set; }

        [JsonProperty("ReferredToCompany")]
        public Company Company { get; set; }

        [JsonProperty("referringCompany")]
        public Company Company1 { get; set; }

        [JsonProperty("room")]
        public Room Room { get; set; }

        [JsonProperty("case")]
        public Case Case { get; set; }
    }
}
