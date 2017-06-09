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
    public class ResetPassword : GbObject
    {
        [JsonProperty("oldPassword")]
        public string OldPassword { get; set; }

        [JsonProperty("newPassword")]
        public string NewPassword { get; set; }

    }
}
