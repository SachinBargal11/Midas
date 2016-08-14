using Midas.GreenBill.BusinessObject;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midas.GreenBill.BusinessObject
{
    public class MedicalFacility : GbObject
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        public Account Account { get; set; }
        public Address Address { get; set; }
        public ContactInfo ContactInfo { get; set; }
        [JsonProperty("prefix")]
        public string Prefix { get; set; }
        [JsonProperty("defaultAttorneyUserid")]
        public int DefaultAttorneyUserID { get; set; }
        public ICollection<ProviderMedicalFacility> ProviderMedicalFacilities { get; set; }

    }
}
