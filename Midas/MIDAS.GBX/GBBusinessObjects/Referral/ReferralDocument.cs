using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MIDAS.GBX.BusinessObjects
{
    public class ReferralDocument : GbObject
    {
        [JsonProperty("referralId")]
        public int ReferralId { get; set; }

        [JsonProperty("midasDocumentId")]
        public int MidasDocumentId { get; set; }

        [JsonProperty("documentName")]
        public string DocumentName { get; set; }

        [JsonProperty("MidasDocument")]
        public MidasDocument MidasDocument { get; set; }

        //[JsonProperty("referral")]
        //public Referral Referral { get; set; }

        [JsonProperty("referral")]
        public Referral2 Referral { get; set; }
    }

    public class mReferralDocument : GbObject
    {
        [JsonProperty("referralId")]
        public int ReferralId { get; set; }

        [JsonProperty("midasDocumentId")]
        public int MidasDocumentId { get; set; }

        [JsonProperty("documentName")]
        public string DocumentName { get; set; }

        [JsonProperty("mMidasDocument")]
        public mMidasDocument mMidasDocument { get; set; }

        //[JsonProperty("mreferral")]
        //public mReferral mReferral { get; set; }
    }
}
