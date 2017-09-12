using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects.Common
{
   public class CaseType : GbObject
    {
        [JsonProperty("caseTypeText")]
        public string CaseTypeText { get; set; }

        [JsonProperty("cases")]
        public ICollection<Case> Cases { get; set; }
    }
}
