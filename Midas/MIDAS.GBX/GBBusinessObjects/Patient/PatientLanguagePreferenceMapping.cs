using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class PatientLanguagePreferenceMapping
    {
        [JsonProperty("patientId")]
        public int PatientId { get; set; }

        [JsonProperty("languagePreferenceId")]
        public byte LanguagePreferenceId { get; set; }
    }
}
