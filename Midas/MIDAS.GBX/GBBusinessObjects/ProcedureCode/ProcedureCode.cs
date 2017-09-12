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
    public class ProcedureCode : GbObject
    {
        [Required]
        [JsonProperty("procedureCodeText")]
        public string ProcedureCodeText { get; set; }

        [Required]
        [JsonProperty("procedureCodeDesc")]
        public string ProcedureCodeDesc { get; set; }

        [Required]
        [JsonProperty("amount")]
        public decimal? Amount { get; set; }

        [Required]
        [JsonProperty("companyId")]
        public int? CompanyId { get; set; }

        [Required]
        [JsonProperty("specialityId")]
        public int? SpecialityId { get; set; }

        [Required]
        [JsonProperty("roomId")]
        public int? RoomId { get; set; }

        [Required]
        [JsonProperty("roomTestId")]
        public int? RoomTestId { get; set; }

        [JsonProperty("company")]
        public Company Company { get; set; }

        [JsonProperty("room")]
        public Room Room { get; set; }

        [JsonProperty("roomTest")]
        public RoomTest RoomTest { get; set; }

        [JsonProperty("specialty")]
        public Specialty Specialty { get; set; }
    }

    public class mProcedureCode : GbObject
    {
        [Required]
        [JsonProperty("procedureCodeText")]
        public string ProcedureCodeText { get; set; }

        [Required]
        [JsonProperty("procedureCodeDesc")]
        public string ProcedureCodeDesc { get; set; }

        [Required]
        [JsonProperty("amount")]
        public decimal? Amount { get; set; }

        [Required]
        [JsonProperty("companyId")]
        public int? CompanyId { get; set; }

        [Required]
        [JsonProperty("specialityId")]
        public int? SpecialityId { get; set; }

        [Required]
        [JsonProperty("roomId")]
        public int? RoomId { get; set; }

        [Required]
        [JsonProperty("roomTestId")]
        public int? RoomTestId { get; set; }

        public Company Company { get; set; }

        public mRoom mRoom { get; set; }

        public mRoomTest mRoomTest { get; set; }

        public mSpecialty mSpecialty { get; set; }
    }
}


