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
    public class DocumentNodeObjectMapping : GbObject
    {
        [Required]
        [JsonProperty("objectType")]
        public string ObjectType { get; set; }

        [Required]
        [JsonProperty("childNode")]
        public string ChildNode { get; set; }

    }
}
