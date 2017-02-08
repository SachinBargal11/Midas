using MIDAS.GBX.BusinessObjects.Common;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class PatientFamilyMember : GbObject
    {
        [JsonProperty("patientId")]
        public int PatientId { get; set; }

        [JsonProperty("relationId")]
        public byte RelationId { get; set; }

        [JsonProperty("fullName")]
        public string FullName { get; set; }

        [JsonProperty("familyName")]
        public string FamilyName { get; set; }

        [JsonProperty("Prefix")]
        public string Prefix { get; set; }

        [JsonProperty("Sufix")]
        public string Sufix { get; set; }

        [JsonProperty("Age")]
        public byte Age { get; set; }

        [JsonProperty("raceId")]
        public byte RaceId { get; set; }

        [JsonProperty("ethnicitesId")]
        public byte EthnicitesId { get; set; }

        [JsonProperty("genderId")]
        public byte GenderId { get; set; }

        [JsonProperty("cellPhone")]
        public string CellPhone { get; set; }

        [JsonProperty("workPhone")]
        public string WorkPhone { get; set; }

        [JsonProperty("primaryContact")]
        public bool? PrimaryContact { get; set; }

        [JsonProperty("isInActive")]
        public bool? IsInActive { get; set; }

        //[JsonProperty("Gender")]
        //public Gender Gender { get; set; }

        //[JsonProperty("Patient2")]
        //public Patient2 Patient2 { get; set; }

        //[JsonProperty("Relation")]
        //public Relation Relation { get; set; }


    }
}
