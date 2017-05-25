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
    public class CompanySpecialtyDetails : GbObject
    {

        [JsonProperty("specialtyId")]
        public int? SpecialtyId { get; set; }

        [JsonProperty("companyID")]
        public int? CompanyID { get; set; }

        [Required]
        [JsonProperty("reevalDays")]
        public int? ReevalDays { get; set; }

        [Required]
        [JsonProperty("reevalvisitCount")]
        public int? ReevalVisitCount { get; set; }

        [Required]
        [JsonProperty("initialDays")]
        public int? InitialDays { get; set; }

        [Required]
        [JsonProperty("initialvisitCount")]
        public int? InitialVisitCount { get; set; }

        [Required]
        [JsonProperty("maxReval")]
        public int? MaxReval { get; set; }

        [Required]
        [JsonProperty("isnitialEvaluation")]
        public bool? IsInitialEvaluation { get; set; }

        [Required]
        [JsonProperty("include1500")]
        public bool? Include1500 { get; set; }

        [JsonProperty("associatedSpecialty")]
        public int? AssociatedSpecialty { get; set; }

        [Required]
        [JsonProperty("allowmultipleVisit")]
        public bool? AllowMultipleVisit { get; set; }

        [JsonProperty("initialCode")]
        public string InitialCode { get; set; }

        [JsonProperty("reEvalCode")]
        public string ReEvalCode { get; set; }

        //[JsonProperty("mandatoryProcCode")]
        //public bool MandatoryProcCode { get; set; }

        public Company Company { get; set; }
        public Specialty Specialty { get; set; }
    }

    public class mCompanySpecialtyDetails : GbObject
    {

        [JsonProperty("specialtyId")]
        public int? SpecialtyId { get; set; }

        [JsonProperty("companyID")]
        public int? CompanyID { get; set; }

        [Required]
        [JsonProperty("ReevalDays")]
        public int? ReevalDays { get; set; }

        [Required]
        [JsonProperty("reevalvisitCount")]
        public int? ReevalVisitCount { get; set; }

        [Required]
        [JsonProperty("initialDays")]
        public int? InitialDays { get; set; }

        [Required]
        [JsonProperty("initialvisitCount")]
        public int? InitialVisitCount { get; set; }

        [Required]
        [JsonProperty("maxReval")]
        public int? MaxReval { get; set; }

        [Required]
        [JsonProperty("isnitialEvaluation")]
        public bool? IsInitialEvaluation { get; set; }

        [Required]
        [JsonProperty("include1500")]
        public bool? Include1500 { get; set; }

        [JsonProperty("associatedSpecialty")]
        public int? AssociatedSpecialty { get; set; }

        [Required]
        [JsonProperty("allowmultipleVisit")]
        public bool? AllowMultipleVisit { get; set; }

        [JsonProperty("initialCode")]
        public string InitialCode { get; set; }

        [JsonProperty("reEvalCode")]
        public string ReEvalCode { get; set; }

        public Company Company { get; set; }
        public mSpecialty mSpecialty { get; set; }
    }
}
