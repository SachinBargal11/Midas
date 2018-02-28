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
        [JsonProperty("caseId")]
        public int CaseId { get; set; }

        [JsonProperty("policyHoldersName")]
        public string PolicyHoldersName { get; set; }

        [JsonProperty("policyHolderAddressInfoId")]
        public int? PolicyHolderAddressInfoId { get; set; }

        [JsonProperty("policyHolderContactInfoId")]
        public int? PolicyHolderContactInfoId { get; set; }

        [JsonProperty("policyOwnerId")]
        public byte? PolicyOwnerId { get; set; }

        [JsonProperty("insuranceMasterId")]
        public int? InsuranceMasterId { get; set; }

        [JsonProperty("insuranceCompanyCode")]
        public string InsuranceCompanyCode { get; set; }

        [JsonProperty("insuranceCompanyAddressInfoId")]
        public int? InsuranceCompanyAddressInfoId { get; set; }

        [JsonProperty("insuranceCompanyContactInfoId")]
        public int? InsuranceCompanyContactInfoId { get; set; }

        [JsonProperty("policyNo")]
        public string PolicyNo { get; set; }

        [JsonProperty("contactPerson")]
        public string ContactPerson { get; set; }

        [JsonProperty("insuranceTypeId")]
        public byte? InsuranceTypeId { get; set; }

        [JsonProperty("insuranceStartDate")]
        public DateTime? InsuranceStartDate { get; set; }

        [JsonProperty("insuranceEndDate")]
        public DateTime? InsuranceEndDate { get; set; }

        [JsonProperty("balanceInsuredAmount")]
        public decimal? BalanceInsuredAmount { get; set; }

        [JsonProperty("isInActive")]
        public bool? IsInActive { get; set; }

        [JsonProperty("insuranceCompanyAddressInfo")]
        public AddressInfo AddressInfo { get; set; }

        [JsonProperty("policyHolderAddressInfo")]
        public AddressInfo AddressInfo1 { get; set; }

        [JsonProperty("insuranceCompanyContactInfo")]
        public ContactInfo ContactInfo { get; set; }

        [JsonProperty("policyHolderContactInfo")]
        public ContactInfo ContactInfo1 { get; set; }

        [JsonProperty("caseInsuranceMapping")]
        public CaseInsuranceMapping CaseInsuranceMapping { get; set; }

        [JsonProperty("insuranceMaster")]
        public InsuranceMaster InsuranceMaster { get; set; }
       
        [JsonProperty(" InsuranceType")]
        public InsuranceType InsuranceType { get; set; }
    }

    public class mPatientInsuranceInfo : GbObject
    {
        //[JsonProperty("patientId")]
        //public int patientId { get; set; }

        [JsonProperty("caseId")]
        public int CaseId { get; set; }

        [JsonProperty("policyHoldersName")]
        public string PolicyHoldersName { get; set; }

        [JsonProperty("policyHolderAddressInfoId")]
        public int? PolicyHolderAddressInfoId { get; set; }

        [JsonProperty("policyHolderContactInfoId")]
        public int? PolicyHolderContactInfoId { get; set; }

        [JsonProperty("policyOwnerId")]
        public byte? PolicyOwnerId { get; set; }

        [JsonProperty("insuranceMasterId")]
        public int? InsuranceMasterId { get; set; }

        [JsonProperty("insuranceCompanyAddressInfoId")]
        public int? InsuranceCompanyAddressInfoId { get; set; }

        [JsonProperty("insuranceCompanyContactInfoId")]
        public int? InsuranceCompanyContactInfoId { get; set; }

        [JsonProperty("policyNo")]
        public string PolicyNo { get; set; }

        [JsonProperty("contactPerson")]
        public string ContactPerson { get; set; }

        [JsonProperty("insuranceTypeId")]
        public byte? InsuranceTypeId { get; set; }

        [JsonProperty("mInsuranceCompanyAddressInfo")]
        public mAddressInfo mAddressInfo { get; set; }

        [JsonProperty("mPolicyHolderAddressInfo")]
        public mAddressInfo mAddressInfo1 { get; set; }

        [JsonProperty("mInsuranceCompanyContactInfo")]
        public mContactInfo mContactInfo { get; set; }

        [JsonProperty("mPolicyHolderContactInfo")]
        public mContactInfo mContactInfo1 { get; set; }

        [JsonProperty("mCaseInsuranceMapping")]
        public mCaseInsuranceMapping mCaseInsuranceMapping { get; set; }

        [JsonProperty("mInsuranceMaster")]
        public mInsuranceMaster mInsuranceMaster { get; set; }

    }
}
