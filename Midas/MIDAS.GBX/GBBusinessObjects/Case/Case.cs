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
        public byte? CaseTypeId { get; set; }

        //[JsonProperty("locationId")]
        //public int? LocationId { get; set; }

        [JsonProperty("patientEmpInfoId")]
        public int? PatientEmpInfoId { get; set; }

        [JsonProperty("carrierCaseNo")]
        public string CarrierCaseNo { get; set; }
       
        [JsonProperty("caseStatusId")]
        public byte? CaseStatusId { get; set; }

        [JsonProperty("caseCompanyMapping")]
        public List<CaseCompanyMapping> CaseCompanyMappings { get; set; }

        [JsonProperty("companyCaseConsentApproval")]
        public List<CompanyCaseConsentApproval> CompanyCaseConsentApprovals { get; set; }

        [JsonProperty("referral")]
        public List<Referral> Referrals { get; set; }

        [JsonProperty("patientAccidentInfo")]
        public List<PatientAccidentInfo> PatientAccidentInfoes { get; set; }

        [JsonProperty("patientEmpInfo")]
        public PatientEmpInfo PatientEmpInfo { get; set; }

        [JsonProperty("patient")]
        public Patient Patient { get; set; }

        [JsonProperty("caseCompanyConsentDocument")]
        public List<CaseCompanyConsentDocument> CaseCompanyConsentDocuments { get; set; }

        [JsonProperty("caseSource")]
        public string caseSource { get; set; }

        [JsonProperty("orignatorCompanyId")]
        public int OrignatorCompanyId { get; set; }

        [JsonProperty("orignatorCompanyName")]
        public string OrignatorCompanyName { get; set; }

        [JsonProperty("medicalProviderId")]
        public int? MedicalProviderId { get; set; }

        [JsonProperty("attorneyProviderId")]
        public int? AttorneyProviderId { get; set; }

        [JsonProperty("claimFileNumber")]
        public int? ClaimFileNumber { get; set; }
        
    }

    public class mCase : GbObject
    {
        [JsonProperty("patientId")]
        public int PatientId { get; set; }

        [JsonProperty("caseTypeId")]
        public byte? CaseTypeId { get; set; }

        [JsonProperty("locationId")]
        public int? LocationId { get; set; }

        [JsonProperty("patientEmpInfoId")]
        public int? PatientEmpInfoId { get; set; }

        [JsonProperty("caseStatusId")]
        public byte? CaseStatusId { get; set; }

        //[JsonProperty("attorneyId")]
        //public int? AttorneyId { get; set; }

        [JsonProperty("mCaseCompanyMapping")]
        public List<mCaseCompanyMapping> mCaseCompanyMappings { get; set; }

        [JsonProperty("mCompanyCaseConsentApproval")]
        public List<mCompanyCaseConsentApproval> mCompanyCaseConsentApprovals { get; set; }

        //[JsonProperty("mreferral")]
        //public List<mReferral> mReferrals { get; set; }        

        [JsonProperty("mPatientAccidentInfo")]
        public List<mPatientAccidentInfo> mPatientAccidentInfoes { get; set; }

        [JsonProperty("mPatientEmpInfo")]
        public mPatientEmpInfo mPatientEmpInfo { get; set; }

        [JsonProperty("mpatient")]
        public mPatient mPatient { get; set; }

        [JsonProperty("mCaseCompanyConsentDocument")]
        public List<mCaseCompanyConsentDocument> mCaseCompanyConsentDocuments { get; set; }

        [JsonProperty("claimFileNumber")]
        public int? ClaimFileNumber { get; set; }
    }

    //----------------------------------------------------------------------------

    public class CaseWithUserAndPatient : GbObject
    {
        [JsonProperty("userId")]
        public int UserId { get; set; }

        [JsonProperty("userName")]
        public string UserName { get; set; }

        [JsonProperty("firstName")]
        public string FirstName { get; set; }

        [JsonProperty("middleName")]
        public string MiddleName { get; set; }

        [JsonProperty("lastName")]
        public string LastName { get; set; }

        [JsonProperty("caseId")]
        public int CaseId { get; set; }

        [JsonProperty("patientId")]
        public int PatientId { get; set; }

        [JsonProperty("caseName")]
        public string CaseName { get; set; }

        [JsonProperty("caseTypeId")]
        public byte? CaseTypeId { get; set; }

        [JsonProperty("locationId")]
        public int? LocationId { get; set; }

        [JsonProperty("patientEmpInfoId")]
        public int? PatientEmpInfoId { get; set; }

        [JsonProperty("carrierCaseNo")]
        public string CarrierCaseNo { get; set; }       

        [JsonProperty("caseStatusId")]
        public byte? CaseStatusId { get; set; }

        [JsonProperty("patientEmpInfo")]
        public PatientEmpInfo PatientEmpInfo { get; set; }
                
        [JsonProperty("caseCompanyMapping")]
        public List<CaseCompanyMapping> CaseCompanyMappings { get; set; }

        [JsonProperty("companyCaseConsentApproval")]
        public List<CompanyCaseConsentApproval> CompanyCaseConsentApprovals { get; set; }

        [JsonProperty("referral")]
        public List<Referral> Referrals { get; set; }

        [JsonProperty("patientAccidentInfo")]
        public List<PatientAccidentInfo> PatientAccidentInfoes { get; set; }

        [JsonProperty("caseCompanyConsentDocument")]
        public List<CaseCompanyConsentDocument> CaseCompanyConsentDocuments { get; set; }

        [JsonProperty("caseSource")]
        public string caseSource { get; set; }

        [JsonProperty("orignatorCompanyId")]
        public int OrignatorCompanyId { get; set; }

        [JsonProperty("orignatorCompanyName")]
        public string OrignatorCompanyName { get; set; }

        [JsonProperty("medicalProviderId")]
        public int? MedicalProviderId { get; set; }

        [JsonProperty("attorneyProviderId")]
        public int? AttorneyProviderId { get; set; }

        [JsonProperty("claimFileNumber")]
        public int? ClaimFileNumber { get; set; }
    }

    public class mCaseWithUserAndPatient : GbObject
    {
        [JsonProperty("userId")]
        public int UserId { get; set; }

        [JsonProperty("userName")]
        public string UserName { get; set; }

        [JsonProperty("firstName")]
        public string FirstName { get; set; }

        [JsonProperty("lastName")]
        public string LastName { get; set; }

        [JsonProperty("caseId")]
        public int CaseId { get; set; }

        [JsonProperty("patientId")]
        public int PatientId { get; set; }

        [JsonProperty("caseTypeId")]
        public byte? CaseTypeId { get; set; }

        [JsonProperty("locationId")]
        public int? LocationId { get; set; }

        [JsonProperty("patientEmpInfoId")]
        public int? PatientEmpInfoId { get; set; }

        [JsonProperty("caseStatusId")]
        public byte? CaseStatusId { get; set; }

        [JsonProperty("mPatientEmpInfo")]
        public mPatientEmpInfo mPatientEmpInfo { get; set; }

        [JsonProperty("mCaseCompanyMapping")]
        public List<mCaseCompanyMapping> mCaseCompanyMappings { get; set; }

        [JsonProperty("mCompanyCaseConsentApproval")]
        public List<mCompanyCaseConsentApproval> mCompanyCaseConsentApprovals { get; set; }

        [JsonProperty("mPatientAccidentInfo")]
        public List<mPatientAccidentInfo> mPatientAccidentInfoes { get; set; }

        [JsonProperty("mCaseCompanyConsentDocument")]
        public List<mCaseCompanyConsentDocument> mCaseCompanyConsentDocuments { get; set; }

        [JsonProperty("claimFileNumber")]
        public int? ClaimFileNumber { get; set; }
    }

    public class CaseWithPatientName : GbObject
    {
        
        [JsonProperty("firstName")]
        public string FirstName { get; set; }

        [JsonProperty("middleName")]
        public string MiddleName { get; set; }

        [JsonProperty("lastName")]
        public string LastName { get; set; }

        [JsonProperty("caseId")]
        public int CaseId { get; set; }
             
        [JsonProperty("caseTypeId")]
        public byte? CaseTypeId { get; set; }

        [JsonProperty("caseStatusId")]
        public byte? CaseStatusId { get; set; }
             
        [JsonProperty("caseSource")]
        public string caseSource { get; set; }

        [JsonProperty("orignatorCompanyId")]
        public int OrignatorCompanyId { get; set; }

        [JsonProperty("orignatorCompanyName")]
        public string OrignatorCompanyName { get; set; }

        [JsonProperty("medicalProviderId")]
        public int? MedicalProviderId { get; set; }

        [JsonProperty("attorneyProviderId")]
        public int? AttorneyProviderId { get; set; }

        [JsonProperty("claimFileNumber")]
        public int? ClaimFileNumber { get; set; }
    }
}
