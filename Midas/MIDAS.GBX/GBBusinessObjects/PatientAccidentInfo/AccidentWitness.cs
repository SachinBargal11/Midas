using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class AccidentWitness : GbObject
    {
        [JsonProperty("patientAccidentInfoId")]
        public int PatientAccidentInfoId { get; set; }

        [JsonProperty("witnessName")]
        public string WitnessName { get; set; }

        [JsonProperty("witnessContactNumber")]
        public string WitnessContactNumber { get; set; }
    }
}
