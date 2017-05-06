using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class Referral2 : GbObject
    {
        [JsonProperty("pendingReferralId")]
        public int PendingReferralId { get; set; }

        [JsonProperty("fromCompanyId")]
        public int FromCompanyId { get; set; }

        [JsonProperty("fromLocationId")]
        public int FromLocationId { get; set; }

        [JsonProperty("fromDoctorId")]
        public int FromDoctorId { get; set; }

        [JsonProperty("forSpecialtyId")]
        public int? ForSpecialtyId { get; set; }

        [JsonProperty("forRoomId")]
        public int? ForRoomId { get; set; }

        [JsonProperty("forRoomTestId")]
        public int? ForRoomTestId { get; set; }

        [JsonProperty("toCompanyId")]
        public int ToCompanyId { get; set; }

        [JsonProperty("toLocationId")]
        public int? ToLocationId { get; set; }

        [JsonProperty("toDoctorId")]
        public int? ToDoctorId { get; set; }

        [JsonProperty("toRoomId")]
        public int? ToRoomId { get; set; }

        [JsonProperty("scheduledPatientVisitId")]
        public int? ScheduledPatientVisitId { get; set; }

        [JsonProperty("dismissedBy")]
        public int? DismissedBy { get; set; }

        [JsonProperty("fromCompany")]
        public Company Company { get; set; }

        [JsonProperty("toCompany")]
        public Company Company1 { get; set; }

        [JsonProperty("fromDoctor")]
        public Doctor Doctor { get; set; }

        [JsonProperty("toDoctor")]
        public Doctor Doctor1 { get; set; }

        [JsonProperty("fromLocation")]
        public Location Location { get; set; }

        [JsonProperty("toLocation")]
        public Location Location1 { get; set; }

        [JsonProperty("scheduledPatientVisit")]
        public PatientVisit2 PatientVisit2 { get; set; }

        [JsonProperty("pendingReferral")]
        public PendingReferral PendingReferral { get; set; }

        [JsonProperty("forRoom")]
        public Room Room { get; set; }

        [JsonProperty("toRoom")]
        public Room Room1 { get; set; }

        [JsonProperty("forRoomTest")]
        public RoomTest RoomTest { get; set; }

        [JsonProperty("forSpecialty")]
        public Specialty Specialty { get; set; }

        [JsonProperty("user")]
        public User User { get; set; }

        [JsonProperty("referralProcedureCode")]
        public List<ReferralProcedureCode> ReferralProcedureCode { get; set; }
    }

}
