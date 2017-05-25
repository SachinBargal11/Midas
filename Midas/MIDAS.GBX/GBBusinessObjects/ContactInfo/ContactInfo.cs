using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class ContactInfo : GbObject
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

        [JsonProperty("officeExtension")]
        public string OfficeExtension { get; set; }

        [JsonProperty("alternateEmail")]
        public string AlternateEmail { get; set; }

        [JsonProperty("preferredCommunication")]
        public byte? PreferredCommunication { get; set; }

    }

    public class mContactInfo : GbObject
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("cellPhone")]
        public string CellPhone { get; set; }

        [JsonProperty("emailAddress")]
        public string EmailAddress { get; set; }

        [JsonProperty("homePhone")]
        public string HomePhone { get; set; }

        [JsonProperty("preferredCommunication")]
        public byte? PreferredCommunication { get; set; }

    }
}
