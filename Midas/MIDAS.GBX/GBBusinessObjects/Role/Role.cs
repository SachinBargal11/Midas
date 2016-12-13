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
    public class Role : GbObject
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        [Required]
        [JsonProperty("roleType")]
        

        public GBEnums.RoleType RoleType { get; set; }
        public Company Company { get; set; }
    }
}
