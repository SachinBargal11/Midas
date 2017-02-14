using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class Case : GbObject
    {
        [JsonProperty("patientId")]
        public int PatientId { get; set; }

        [JsonProperty("caseName")]
        public string CaseName { get; set; }

        [JsonProperty("caseTypeId")]
        public int? CaseTypeId { get; set; }

        [JsonProperty("dateOfInjury")]
        public DateTime DateOfInjury { get; set; }

        [JsonProperty("locationId")]
        public int? LocationId { get; set; }

        [JsonProperty("patientEmpInfoId")]
        public int? PatientEmpInfoId { get; set; }

        [JsonProperty("patientInsuranceInfoId")]
        public int? PatientInsuranceInfoId { get; set; }

        [JsonProperty("patientAccidentInfoId")]
        public int? PatientAccidentInfoId { get; set; }

        [JsonProperty("refferingOfficeId")]
        public int? RefferingOfficeId { get; set; }

        [JsonProperty("carrierCaseNo")]
        public string CarrierCaseNo { get; set; }

        [JsonProperty("transportation")]
        public bool? Transportation { get; set; }

        [JsonProperty("caseStatusId")]
        public int? CaseStatusId { get; set; }

        [JsonProperty("attorneyId")]
        public int? AttorneyId { get; set; }

        [JsonProperty("location")]
        public Location Location { get; set; }

        [JsonProperty("patient2")]
        public Patient2 Patient2 { get; set; }

        [JsonProperty("patientAccidentInfo")]
        public PatientAccidentInfo PatientAccidentInfo { get; set; }

        [JsonProperty("patientEmpInfo")]
        public PatientEmpInfo PatientEmpInfo { get; set; }

        [JsonProperty("patientInsuranceInfo")]
        public PatientInsuranceInfo PatientInsuranceInfo { get; set; }

        [JsonProperty("refferingOffice")]
        public RefferingOffice RefferingOffice { get; set; }



    }
}
