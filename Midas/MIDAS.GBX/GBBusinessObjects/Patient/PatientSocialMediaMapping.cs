using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class PatientSocialMediaMapping
    {
        [JsonProperty("patientId")]
        public int PatientId { get; set; }

        [JsonProperty("socialMediaId")]
        public byte SocialMediaId { get; set; }
    }
}
