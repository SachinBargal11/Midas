using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects.Common
{
   public class CaseStatus : GbObject
    {
        [JsonProperty("caseStatusText")]
        public string CaseStatusText { get; set; }

        public ICollection<Case> Cases { get; set; }
    }
}
