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
      
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("companyEmailId")]
        public string CompanyEmailId { get; set; }

        [JsonProperty("firstName")]
        public string FirstName { get; set; }

        [JsonProperty("lastName")]
        public string LastName { get; set; }

        [JsonProperty("preferredCompanyId")]
        public int? PreferredCompanyId { get; set; }

        [JsonProperty("forCompanyId")]
        public int ForCompanyId { get; set; }

        [JsonProperty("company")]
        public Company Company { get; set; }

        [JsonProperty("company1")]
        public Company Company1 { get; set; }

    }
 
}
