using MIDAS.GBX.BusinessObjects.Common;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class Relation : GbObject
    {
        [JsonProperty("relationText")]
        public string RelationText { get; set; }

        [JsonProperty("patientFamilyMembers")]
        public PatientFamilyMember PatientFamilyMembers { get; set; }
    }
}
