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

        [JsonProperty("firstName")]
        public string FirstName { get; set; }

        [JsonProperty("middleName")]
        public string MiddleName { get; set; }

        [JsonProperty("lastName")]
        public string LastName { get; set; }

        [JsonProperty("Age")]
        public byte Age { get; set; }

        [JsonProperty("raceId")]
        public byte? RaceId { get; set; }

        [JsonProperty("ethnicitesId")]
        public byte? EthnicitesId { get; set; }

        [JsonProperty("genderId")]
        public byte GenderId { get; set; }

        [JsonProperty("cellPhone")]
        public string CellPhone { get; set; }

        [JsonProperty("workPhone")]
        public string WorkPhone { get; set; }

        [JsonProperty("primaryContact")]
        public bool? PrimaryContact { get; set; }

    }
}
