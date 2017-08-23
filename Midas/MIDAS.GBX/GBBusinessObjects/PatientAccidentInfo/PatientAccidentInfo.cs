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
        public int CaseId { get; set; }

        [JsonProperty("accidentDate")]
        public DateTime? AccidentDate { get; set; }

        [JsonProperty("plateNumber")]
        public string PlateNumber { get; set; }

        [JsonProperty("reportNumber")]
        public string ReportNumber { get; set; }

        [JsonProperty("accidentAddressInfoId")]
        public int? AccidentAddressInfoId { get; set; }

        [JsonProperty("hospitalName")]
        public string HospitalName { get; set; }

        [JsonProperty("hospitalAddressInfoId")]
        public int? HospitalAddressInfoId { get; set; }

        [JsonProperty("dateOfAdmission")]
        public DateTime? DateOfAdmission { get; set; }

        [JsonProperty("additionalPatients")]
        public string AdditionalPatients { get; set; }

        [JsonProperty("describeInjury")]
        public string DescribeInjury { get; set; }

        [JsonProperty("patientTypeId")]
        public byte? PatientTypeId { get; set; }

        [JsonProperty("accidentAddressInfo")]
        public AddressInfo AccidentAddressInfo { get; set; }

        [JsonProperty("hospitalAddressInfo")]
        public AddressInfo HospitalAddressInfo { get; set; }

        //[JsonProperty("case")]
        //public Case cases { get; set; }

        //[JsonProperty("patientType")]
        //public PatientType PatientType { get; set; }

        [JsonProperty("medicalReportNumber")]
        public string MedicalReportNumber { get; set; }

    }

    public class mPatientAccidentInfo : GbObject
    {
        [JsonProperty("caseId")]
        public int caseId { get; set; }

        [JsonProperty("accidentDate")]
        public DateTime? accidentDate { get; set; }

        [JsonProperty("reportNumber")]
        public string reportNumber { get; set; }

        [JsonProperty("accidentAddressInfoId")]
        public int? accidentAddressInfoId { get; set; }

        [JsonProperty("hospitalAddressInfoId")]
        public int? hospitalAddressInfoId { get; set; }

        [JsonProperty("dateOfAdmission")]
        public DateTime? dateOfAdmission { get; set; }

        [JsonProperty("describeInjury")]
        public string describeInjury { get; set; }

        [JsonProperty("patientTypeId")]
        public byte? patientTypeId { get; set; }

        [JsonProperty("accidentAddressInfo")]
        public mAddressInfo accidentAddressInfo { get; set; }

        [JsonProperty("hospitalAddressInfo")]
        public mAddressInfo hospitalAddressInfo { get; set; }

    }
}
