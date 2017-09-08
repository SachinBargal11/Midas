using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects.Common
{
    public class SocialMedia : GbObject
    {
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}
