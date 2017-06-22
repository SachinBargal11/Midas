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
    public class PatientVisit2 : GbObject
    {
        [JsonProperty("calendarEventId")]
        public int? CalendarEventId { get; set; }

        [JsonProperty("caseId")]
        public int? CaseId { get; set; }

        [JsonProperty("patientId")]
        public int? PatientId { get; set; }

        [JsonProperty("locationId")]
        public int? LocationId { get; set; }

        [JsonProperty("roomId")]
        public int? RoomId { get; set; }

        [JsonProperty("doctorId")]
        public int? DoctorId { get; set; }

        [JsonProperty("specialtyId")]
        public int? SpecialtyId { get; set; }

        [JsonProperty("eventStart")]
        public DateTime? EventStart { get; set; }

        [JsonProperty("eventEnd")]
        public DateTime? EventEnd { get; set; }

        [JsonProperty("notes")]
        public string Notes { get; set; }

        [JsonProperty("visitStatusId")]
        public byte? VisitStatusId { get; set; }

        [JsonProperty("visitType")]
        public byte? VisitType { get; set; }

        [JsonProperty("calendarEvent")]
        public CalendarEvent CalendarEvent { get; set; }

        [JsonProperty("isCancelled")]
        public bool? IsCancelled { get; set; }       

        [JsonProperty("isOutOfOffice")]
        public bool? IsOutOfOffice { get; set; }

        [JsonProperty("isTransportationRequired")]
        public bool IsTransportationRequired { get; set; }

        [JsonProperty("transportProviderId")]
        public int? TransportProviderId { get; set; }

        [JsonProperty("ancillaryProviderId")]
        public int? AncillaryProviderId { get; set; }

        [JsonProperty("leaveStartDate")]
        public DateTime? LeaveStartDate { get; set; }

        [JsonProperty("leaveEndDate")]
        public DateTime? LeaveEndDate { get; set; }

        [JsonProperty("patient2")]
        public Patient2 Patient2 { get; set; }

        [JsonProperty("case")]
        public Case Case { get; set; }

        [JsonProperty("doctor")]
        public Doctor Doctor { get; set; }

        [JsonProperty("room")]
        public Room Room { get; set; }

        [JsonProperty("specialty")]
        public Specialty Specialty { get; set; }

        [JsonProperty("location")]
        public Location Location { get; set; }

        [JsonProperty("addedByCompanyId")]
        public int? AddedByCompanyId { get; set; }

        [JsonProperty("patientVisitDiagnosisCodes")]
        public List<PatientVisitDiagnosisCode> PatientVisitDiagnosisCodes { get; set; }

        [JsonProperty("patientVisitProcedureCodes")]
        public List<PatientVisitProcedureCode> PatientVisitProcedureCodes { get; set; }
    }

    public class mPatientVisits : GbObject
    {

        [JsonProperty("calendarEventId")]
        public int? CalendarEventId { get; set; }

        [JsonProperty("caseId")]
        public int? CaseId { get; set; }

        [JsonProperty("patientId")]
        public int? PatientId { get; set; }

        [JsonProperty("locationId")]
        public int? LocationId { get; set; }

        [JsonProperty("roomId")]
        public int? RoomId { get; set; }

        [JsonProperty("doctorId")]
        public int? DoctorId { get; set; }

        [JsonProperty("specialtyId")]
        public int? SpecialtyId { get; set; }

        [JsonProperty("locationName")]
        public string LocationName { get; set; }

        [JsonProperty("roomName")]
        public string RoomName { get; set; }

        [JsonProperty("roomTestName")]
        public string RoomTestName { get; set; }

        [JsonProperty("doctorFirstName")]
        public string DoctorFirstName { get; set; }

        [JsonProperty("doctorLastName")]
        public string DoctorLastName { get; set; }

        [JsonProperty("patientFirstName")]
        public string PatientFirstName { get; set; }

        [JsonProperty("patientLastName")]
        public string PatientLastName { get; set; }

        [JsonProperty("calendarEvent")]
        public CalendarEvent CalendarEvent { get; set; }

    }
}
