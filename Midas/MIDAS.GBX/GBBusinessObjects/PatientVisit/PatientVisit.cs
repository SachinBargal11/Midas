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
    public class PatientVisit : GbObject
    {
        [JsonProperty("caseId")]
        public int CaseId { get; set; }

        [JsonProperty("locationId")]
        public int LocationId { get; set; }

        [JsonProperty("specialtyId")]
        public int? SpecialtyId { get; set; }

        [JsonProperty("startDate")]
        public DateTime? StartDate { get; set; }

        [JsonProperty("startTime")]
        public DateTime? StartTime { get; set; }

        [JsonProperty("endDate")]
        public DateTime? EndDate { get; set; }

        [JsonProperty("endTime")]
        public DateTime? EndTime { get; set; }

        [JsonProperty("notes")]
        public string Notes { get; set; }

        [JsonProperty("doctorId")]
        public int? DoctorId { get; set; }

        [JsonProperty("billStatus")]
        public bool? BillStatus { get; set; }

        [JsonProperty("refferId")]
        public int? RefferId { get; set; }

        [JsonProperty("visitStatusId")]
        public byte? VisitStatusId { get; set; }

        [JsonProperty("billDate")]
        public DateTime? BillDate { get; set; }

        [JsonProperty("billNumber")]
        public string BillNumber { get; set; }

        [JsonProperty("visitType")]
        public byte? VisitType { get; set; }

        [JsonProperty("reschduleId")]
        public int? ReschduleId { get; set; }

        [JsonProperty("reschduleDate")]
        public DateTime? ReschduleDate { get; set; }

        [JsonProperty("studyNumber")]
        public string StudyNumber { get; set; }

        [JsonProperty("billFinalize")]
        public bool? BillFinalize { get; set; }

        [JsonProperty("addedByDoctor")]
        public bool? AddedByDoctor { get; set; }

        [JsonProperty("checkInUserId")]
        public int? CheckInUserId { get; set; }

        [JsonProperty("billManualyUnFinalized")]
        public bool? BillManualyUnFinalized { get; set; }

        [JsonProperty("patientVisitEvent")]
        public PatientVisitEvent PatientVisitEvents { get; set; }

    }
}


