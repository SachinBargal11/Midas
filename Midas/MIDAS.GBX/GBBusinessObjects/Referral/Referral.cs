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

        [JsonProperty("referringUserId")]
        public int ReferringUserId { get; set; }

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

        [JsonProperty("referringUser")]
        public User User { get; set; }

        [JsonProperty("referredToLocation")]
        public Location Location { get; set; }

        [JsonProperty("referringLocation")]
        public Location Location1 { get; set; }

        [JsonProperty("ReferredToCompany")]
        public Company Company { get; set; }

        [JsonProperty("referringCompany")]
        public Company Company1 { get; set; }

        [JsonProperty("referredToSpecialtyId")]
        public int? ReferredToSpecialtyId { get; set; }

        [JsonProperty("referredToRoomTestId")]
        public int? ReferredToRoomTestId { get; set; }

        [JsonProperty("room")]
        public Room Room { get; set; }

        [JsonProperty("case")]
        public Case Case { get; set; }

        [JsonProperty("roomTest")]
        public RoomTest RoomTest { get; set; }

        [JsonProperty("specialty")]
        public Specialty Specialty { get; set; }

        [JsonProperty("referralDocument")]
        public List<ReferralDocument> ReferralDocument { get; set; }
    }
}
