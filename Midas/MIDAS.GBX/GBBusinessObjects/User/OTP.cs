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
    public class OTP : GbObject
    {
        public User User { get; set; }
        [JsonProperty("pin")]
        public int Pin { get; set; }
        [JsonProperty("otp")]
        public int OTP1 { get; set; }
    }
}
