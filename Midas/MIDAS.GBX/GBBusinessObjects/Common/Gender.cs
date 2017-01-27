using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects.Common
{
    public class Gender : GbObject
    {
        [JsonProperty("gendertext")]
        public string GenderText { get; set; }
    }
}
