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
    public class PasswordToken : GbObject
    {
        [JsonProperty("userName")]
        public string UserName { get; set; }

        [JsonProperty("appKey")]
        public Guid UniqueID { get; set; }

        [JsonProperty("tokenUsed")]
        public bool IsTokenUsed { get; set; }
    }
}
