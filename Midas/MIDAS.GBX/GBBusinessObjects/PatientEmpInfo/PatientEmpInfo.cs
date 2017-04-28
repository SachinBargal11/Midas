using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class PatientEmpInfo : GbObject
    {
        [JsonProperty("patientId")]
        public int patientId { get; set; }

        [JsonProperty("jobTitle")]
        public string jobTitle { get; set; }

        [JsonProperty("empName")]
        public string empName { get; set; }

        [JsonProperty("addressInfoId")]
        public int? addressInfoId { get; set; }

        [JsonProperty("contactInfoId")]
        public int? contactInfoId { get; set; }

        [JsonProperty("isCurrentEmp")]
        public bool? isCurrentEmp { get; set; }

        [JsonProperty("addressInfo")]
        public AddressInfo addressInfo { get; set; }

        [JsonProperty("contactInfo")]
        public ContactInfo contactInfo { get; set; }
    }

    public class mPatientEmpInfo : GbObject
    {
        [JsonProperty("patientId")]
        public int patientId { get; set; }

        [JsonProperty("empName")]
        public string empName { get; set; }

        [JsonProperty("addressInfoId")]
        public int? addressInfoId { get; set; }

        [JsonProperty("contactInfoId")]
        public int? contactInfoId { get; set; }

        [JsonProperty("isCurrentEmp")]
        public bool? isCurrentEmp { get; set; }

        [JsonProperty("mAddressInfo")]
        public mAddressInfo mAddressInfo { get; set; }

        [JsonProperty("mContactInfo")]
        public mContactInfo mContactInfo { get; set; }

    }
}
