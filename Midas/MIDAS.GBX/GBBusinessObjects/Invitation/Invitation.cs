using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class Invitation : GbObject
    {
        [JsonProperty("appKey")]
        public Guid UniqueID { get; set; }
        public Company Company { get; set; }
        public User User { get; set; }
        [JsonProperty("isExpired")]
        public bool IsExpired { get; set; }
        [JsonProperty("isActivated")]
        public bool IsActivated { get; set; }
    }
}
