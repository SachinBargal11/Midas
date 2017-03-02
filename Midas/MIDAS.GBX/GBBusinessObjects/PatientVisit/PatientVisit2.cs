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
        public int? CalendarEventId { get; set; }

        [JsonProperty("caseId")]
        public int? CaseId { get; set; }

        public int? PatientId { get; set; }

        public int? LocationId { get; set; }

        public int? RoomId { get; set; }

        public int? DoctorId { get; set; }

        public int? SpecialtyId { get; set; }

        public DateTime? EventStart { get; set; }

        public DateTime? EventEnd { get; set; }

        public string Notes { get; set; }

        public byte? VisitStatusId { get; set; }

        public byte? VisitType { get; set; }

        
    }
}
