using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MIDAS.GBX.BusinessObjects.Common
{
    public class Relation : GbObject
    {
        [JsonProperty("relationText")]
        public string RelationText { get; set; }
    }
}
