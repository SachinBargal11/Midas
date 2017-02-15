using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class PatientAccidentInfo : GbObject
    {
        [JsonProperty("caseId")]
        public int caseId { get; set; }

        [JsonProperty("accidentDate")]
        public DateTime? accidentDate { get; set; }

        [JsonProperty("plateNumber")]
        public string plateNumber { get; set; }

        [JsonProperty("reportNumber")]
        public string reportNumber { get; set; }

        [JsonProperty("accidentAddressInfoId")]
        public int? accidentAddressInfoId { get; set; }

        [JsonProperty("hospitalName")]
        public string hospitalName { get; set; }

        [JsonProperty("hospitalAddressInfoId")]
        public int? hospitalAddressInfoId { get; set; }

        [JsonProperty("dateOfAdmission")]
        public DateTime? dateOfAdmission { get; set; }

        [JsonProperty("additionalPatients")]
        public string additionalPatients { get; set; }

        [JsonProperty("describeInjury")]
        public string describeInjury { get; set; }

        [JsonProperty("patientTypeId")]
        public byte? patientTypeId { get; set; }

        [JsonProperty("isCurrentAccident")]
        public bool isCurrentAccident { get; set; }

        [JsonProperty("accidentAddressInfo")]
        public AddressInfo accidentAddressInfo { get; set; }

        [JsonProperty("hospitalAddressInfo")]
        public AddressInfo hospitalAddressInfo { get; set; }

        //[JsonProperty("case")]
        //public Case cases { get; set; }

        [JsonProperty("patientType")]
        public PatientType PatientType { get; set; }

    }
}
