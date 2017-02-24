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
    public class PatientVisitEvent : GbObject
    {
        [JsonProperty("patientVisitId")]
        public int PatientVisitId { get; set; }

        [JsonProperty("specialtyId")]
        public int? SpecialtyId { get; set; }

        [JsonProperty("procedureCodeId")]
        public byte ProcedureCodeId { get; set; }

        [JsonProperty("eventStatusId")]
        public byte? EventStatusId { get; set; }

        [JsonProperty("reportReceived")]
        public bool? ReportReceived { get; set; }

        [JsonProperty("studyNumber")]
        public string StudyNumber { get; set; }

        [JsonProperty("note")]
        public string Note { get; set; }

        [JsonProperty("reportPath")]
        public string ReportPath { get; set; }

        [JsonProperty("readingDoctorId")]
        public int? ReadingDoctorId { get; set; }

        [JsonProperty("billStatus")]
        public bool? BillStatus { get; set; }

        [JsonProperty("billDate")]
        public DateTime? BillDate { get; set; }

        [JsonProperty("billNumber")]
        public string BillNumber { get; set; }

        [JsonProperty("imageId")]
        public int? ImageId { get; set; }

        [JsonProperty("modifier")]
        public string Modifier { get; set; }

    }
}


