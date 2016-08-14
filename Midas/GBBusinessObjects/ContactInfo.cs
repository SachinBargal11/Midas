using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midas.GreenBill.BusinessObject
{
    public class ContactInfo:GbObject
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("cellPhone")]
        public string CellPhone { get; set; }
        [JsonProperty("emailAddress")]
        public string EmailAddress { get; set; }
        [JsonProperty("homePhone")]
        public string HomePhone { get; set; }
        [JsonProperty("workPhone")]
        public string WorkPhone { get; set; }
        [JsonProperty("faxNo")]
        public string FaxNo { get; set; }
    }
}
