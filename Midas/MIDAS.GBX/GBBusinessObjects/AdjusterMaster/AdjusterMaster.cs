using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class AdjusterMaster : GbObject
    {
        [JsonProperty("companyId")]
        public int? CompanyId { get; set; }

        [JsonProperty("insuranceMasterId")]
        public int? InsuranceMasterId { get; set; }

        [JsonProperty("firstName")]
        public string FirstName { get; set; }

        [JsonProperty("middleName")]
        public string MiddleName { get; set; }

        [JsonProperty("lastName")]
        public string LastName { get; set; }

        [JsonProperty("addressInfoId")]
        public int? AddressInfoId { get; set; }

        [JsonProperty("contactInfoId")]
        public int? ContactInfoId { get; set; }

        [JsonProperty("addressInfo")]
        public AddressInfo AddressInfo { get; set; }

        [JsonProperty("contactInfo")]
        public ContactInfo ContactInfo { get; set; }

        [JsonProperty("insuranceMaster")]
        public InsuranceMaster InsuranceMaster { get; set; }

    }
}
