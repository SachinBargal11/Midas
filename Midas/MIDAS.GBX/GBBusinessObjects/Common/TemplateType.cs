using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects.Common
{
   public class TemplateType : GbObject
    {
        [JsonProperty("templateType")]
        public string TemplateName { get; set; }

        [JsonProperty("templateText")]
        public string TemplateText { get; set; }
    }
}
