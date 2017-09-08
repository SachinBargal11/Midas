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
        public DateTime AccidentDate { get; set; }

        [JsonProperty("weather")]
        public string Weather { get; set; }

        [JsonProperty("plateNumber")]
        public string PlateNumber { get; set; }

        [JsonProperty("accidentAddressInfoId")]
        public int? AccidentAddressInfoId { get; set; }

        [JsonProperty("policeAtScene")]
        public bool? PoliceAtScene { get; set; }

        [JsonProperty("precinct")]
        public string Precinct { get; set; }

        [JsonProperty("reportNumber")]
        public string ReportNumber { get; set; }

        [JsonProperty("patientTypeId")]
        public byte? PatientTypeId { get; set; }

        [JsonProperty("wearingSeatBelts")]
        public bool? WearingSeatBelts { get; set; }

        [JsonProperty("airBagsDeploy")]
        public bool? AirBagsDeploy { get; set; }

        [JsonProperty("photosTaken")]
        public bool? PhotosTaken { get; set; }

        [JsonProperty("accidentDescription")]
        public string AccidentDescription { get; set; }

        [JsonProperty("witness")]
        public bool? Witness { get; set; }

        [JsonProperty("describeInjury")]
        public string DescribeInjury { get; set; }

        [JsonProperty("hospitalName")]
        public string HospitalName { get; set; }

        [JsonProperty("ambulance")]
        public bool? Ambulance { get; set; }

        [JsonProperty("hospitalAddressInfoId")]
        public int? HospitalAddressInfoId { get; set; }

        [JsonProperty("treatedAndReleased")]
        public bool? TreatedAndReleased { get; set; }

        [JsonProperty("admitted")]
        public bool? Admitted { get; set; }

        [JsonProperty("dateOfAdmission")]
        public DateTime? DateOfAdmission { get; set; }

        [JsonProperty("xraysTaken")]
        public bool? XRaysTaken { get; set; }

        [JsonProperty("durationAtHospital")]
        public string DurationAtHospital { get; set; }

        [JsonProperty("medicalReportNumber")]
        public string MedicalReportNumber { get; set; }

        [JsonProperty("additionalPatients")]
        public string AdditionalPatients { get; set; }

        [JsonProperty("accidentAddressInfo")]
        public AddressInfo AccidentAddressInfo { get; set; }

        [JsonProperty("hospitalAddressInfo")]
        public AddressInfo HospitalAddressInfo { get; set; }

        [JsonProperty("accidentWitnesses")]
        public List<AccidentWitness> AccidentWitnesses { get; set; }

        [JsonProperty("accidentTreatments")]
        public List<AccidentTreatment> AccidentTreatments { get; set; }
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
