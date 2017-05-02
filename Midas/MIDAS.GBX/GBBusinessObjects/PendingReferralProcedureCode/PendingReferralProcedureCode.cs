using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
   public class PendingReferralProcedureCode : GbObject
    {

        [JsonProperty("pendingReferralId")]
        public int PendingReferralId { get; set; }

        [JsonProperty("procedureCodeId")]
        public int ProcedureCodeId { get; set; }
    
        [JsonProperty("procedureCode")]
        public ProcedureCode ProcedureCode { get; set; }

    }

}
