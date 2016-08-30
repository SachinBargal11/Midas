using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midas.GreenBill.BusinessObject
{
    public class Doctor : GbObject
    {
        [JsonProperty("licenseNumber")]
        public string LicenseNumber { get; set; }
        [JsonProperty("wcbAuthorization")]
        public string WCBAuthorization { get; set; }
        [JsonProperty("wcbRatingCode")]
        public string WcbRatingCode { get; set; }
        [JsonProperty("npi")]
        public string NPI { get; set; }
        [JsonProperty("federalTaxId")]
        public string FederalTaxId { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        [JsonProperty("taxType")]
        public Midas.GreenBill.BusinessObject.GBEnums.TaxType TaxType { get; set; }
        [JsonProperty("assignNumber")]
        public string AssignNumber { get; set; }
        [JsonProperty("title")]
        public string Title { get; set; }
        public User DoctorUser { get; set; }
    }
}
