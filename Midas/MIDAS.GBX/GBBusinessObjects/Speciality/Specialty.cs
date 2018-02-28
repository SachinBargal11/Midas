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
    public class Specialty : GbObject
    {

        [Required]
        [JsonProperty("name")]
        public string Name { get; set; }

        [Required]
        [JsonProperty("specialityCode")]
        public string SpecialityCode { get; set; }

        [Required]
        [JsonProperty("isunitApply")]
        public bool IsUnitApply { get; set; }

        [Required]
        [JsonProperty("colorCode")]
        public string ColorCode { get; set; }

        [Required]
        [JsonProperty("mandatoryProcCode")]
        public bool MandatoryProcCode { get; set; }

        [Required]
        [JsonProperty("schedulingAvailable")]
        public bool SchedulingAvailable { get; set; }

        public List<Company> CompanySpecialtyDetails { get; set; }
        public List<Company> SpecialtyDetails { get; set; }
        [JsonProperty("RoomTest")]
        public List<RoomTest> RoomTest { get; set; }
    }

    public class mSpecialty : GbObject
    {

        [Required]
        [JsonProperty("name")]
        public string Name { get; set; }

        [Required]
        [JsonProperty("specialityCode")]
        public string SpecialityCode { get; set; }

        [Required]
        [JsonProperty("isunitApply")]
        public bool IsUnitApply { get; set; }

        [Required]
        [JsonProperty("colorCode")]
        public string ColorCode { get; set; }

        public List<Company> CompanySpecialtyDetails { get; set; }
        public List<Company> SpecialtyDetails { get; set; }
        [JsonProperty("RoomTest")]
        public List<RoomTest> RoomTest { get; set; }

    }
}
