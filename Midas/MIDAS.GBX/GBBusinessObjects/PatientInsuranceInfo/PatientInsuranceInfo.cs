using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class PatientInsuranceInfo : GbObject
    {
        [JsonProperty("patientId")]
        public int patientId { get; set; }

        [JsonProperty("policyHoldersName")]
        public string policyHoldersName { get; set; }

        [JsonProperty("policyHolderAddressInfoId")]
        public int? policyHolderAddressInfoId { get; set; }

        [JsonProperty("policyHolderContactInfoId")]
        public int? policyHolderContactInfoId { get; set; }

        [JsonProperty("policyOwnerId")]
        public byte? policyOwnerId { get; set; }

        [JsonProperty("insuranceMasterId")]
        public int? InsuranceMasterId { get; set; }

        [JsonProperty("insuranceCompanyCode")]
        public string insuranceCompanyCode { get; set; }

        [JsonProperty("insuranceCompanyAddressInfoId")]
        public int? insuranceCompanyAddressInfoId { get; set; }

        [JsonProperty("insuranceCompanyContactInfoId")]
        public int? insuranceCompanyContactInfoId { get; set; }

        [JsonProperty("policyNo")]
        public string policyNo { get; set; }

        [JsonProperty("contactPerson")]
        public string contactPerson { get; set; }

        [JsonProperty("insuranceTypeId")]
        public byte? insuranceTypeId { get; set; }

        [JsonProperty("isInActive")]
        public bool? isInActive { get; set; }

        [JsonProperty("insuranceCompanyAddressInfo")]
        public AddressInfo addressInfo { get; set; }

        [JsonProperty("policyHolderAddressInfo")]
        public AddressInfo addressInfo1 { get; set; }

        [JsonProperty("insuranceCompanyContactInfo")]
        public ContactInfo contactInfo { get; set; }

        [JsonProperty("policyHolderContactInfo")]
        public ContactInfo contactInfo1 { get; set; }

        [JsonProperty("caseInsuranceMapping")]
        public CaseInsuranceMapping CaseInsuranceMapping { get; set; }

        [JsonProperty("insuranceMaster")]
        public InsuranceMaster InsuranceMaster { get; set; }

    }
}
