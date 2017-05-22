using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class AttorneyProvider : GbObject
    {

        [JsonProperty("AttorneyProviderId")]
        public int AttorneyProviderId { get; set; }

        [JsonProperty("companyId")]
        public int CompanyId { get; set; }

        [JsonProperty("company")]
        public Company Company { get; set; }

        [JsonProperty("attorneyProvider")]
        public Company AtorneyProvider { get; set; }
    }

}
