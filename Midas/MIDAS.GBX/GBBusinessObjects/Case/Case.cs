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

        [JsonProperty("locationId")]
        public int? LocationId { get; set; }

        [JsonProperty("patientEmpInfoId")]
        public int? PatientEmpInfoId { get; set; }

        [JsonProperty("carrierCaseNo")]
        public string CarrierCaseNo { get; set; }
       
        [JsonProperty("caseStatusId")]
        public byte? CaseStatusId { get; set; }

        [JsonProperty("attorneyId")]
        public int? AttorneyId { get; set; }        

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

        [JsonProperty("patient2")]
        public Patient2 Patient2 { get; set; }

        [JsonProperty("caseCompanyConsentDocument")]
        public List<CaseCompanyConsentDocument> CaseCompanyConsentDocuments { get; set; }
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

        [JsonProperty("attorneyId")]
        public int? AttorneyId { get; set; }

        [JsonProperty("mCaseCompanyMapping")]
        public List<mCaseCompanyMapping> mCaseCompanyMappings { get; set; }

        [JsonProperty("mCompanyCaseConsentApproval")]
        public List<mCompanyCaseConsentApproval> mCompanyCaseConsentApprovals { get; set; }

        [JsonProperty("mreferral")]
        public List<mReferral> mReferrals { get; set; }

        [JsonProperty("mPatientAccidentInfo")]
        public List<mPatientAccidentInfo> mPatientAccidentInfoes { get; set; }

        [JsonProperty("mPatientEmpInfo")]
        public mPatientEmpInfo mPatientEmpInfo { get; set; }

        [JsonProperty("mpatient")]
        public mPatient mPatient { get; set; }

        [JsonProperty("mCaseCompanyConsentDocument")]
        public List<mCaseCompanyConsentDocument> mCaseCompanyConsentDocuments { get; set; }
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

        [JsonProperty("attorneyId")]
        public int? AttorneyId { get; set; }        

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

        [JsonProperty("attorneyId")]
        public int? AttorneyId { get; set; }

        [JsonProperty("mPatientEmpInfo")]
        public mPatientEmpInfo mPatientEmpInfo { get; set; }

        [JsonProperty("mCaseCompanyMapping")]
        public List<mCaseCompanyMapping> mCaseCompanyMappings { get; set; }

        [JsonProperty("mCompanyCaseConsentApproval")]
        public List<mCompanyCaseConsentApproval> mCompanyCaseConsentApprovals { get; set; }

        [JsonProperty("mReferral")]
        public List<mReferral> mReferrals { get; set; }

        [JsonProperty("mPatientAccidentInfo")]
        public List<mPatientAccidentInfo> mPatientAccidentInfoes { get; set; }

        [JsonProperty("mCaseCompanyConsentDocument")]
        public List<mCaseCompanyConsentDocument> mCaseCompanyConsentDocuments { get; set; }
    }


}
