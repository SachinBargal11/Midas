using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class ReferralProcedureCode : GbObject
    {
        [JsonProperty("referralId")]
        public int ReferralId { get; set; }

        [JsonProperty("procedureCodeId")]
        public int ProcedureCodeId { get; set; }

        [JsonProperty("procedureCode")]
        public ProcedureCode ProcedureCode { get; set; }

        //[JsonProperty("referral2")]
        //public Referral2 Referral2 { get; set; }

    }

}
