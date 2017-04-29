using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class PreferredMedicalProvider : GbObject
    {


        [JsonProperty("status")]
        public byte Status { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("companyType")]
        public int CompanyType { get; set; }

        [JsonProperty("subscriptionType")]
        public int SubscriptionPlanType { get; set; }

        [JsonProperty("taxId")]
        public string TaxID { get; set; }

        //[JsonProperty("addressId")]
        //public int AddressId { get; set; }

        //[JsonProperty("contactInfoId")]
        //public int ContactInfoID { get; set; }


    }

   



}
