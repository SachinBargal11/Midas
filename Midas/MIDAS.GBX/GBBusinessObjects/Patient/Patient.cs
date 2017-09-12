using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.BusinessObjects
{
    public class Patient : GbObject
    {
        [JsonProperty("ssn")]
        public string SSN { get; set; }

        //[JsonProperty("companyId")]
        //public int? CompanyId { get; set; }

        [JsonProperty("weight")]
        public decimal? Weight { get; set; }

        [JsonProperty("height")]
        public decimal? Height { get; set; }

        [JsonProperty("maritalStatusId")]
        public byte? MaritalStatusId { get; set; }

        [JsonProperty("dateOfFirstTreatment")]
        public DateTime? DateOfFirstTreatment { get; set; }

        [JsonProperty("parentOrGuardianName")]
        public string ParentOrGuardianName { get; set; }

        [JsonProperty("emergencyContactName")]
        public string EmergencyContactName { get; set; }

        [JsonProperty("emergencyContactPhone")]
        public string EmergencyContactPhone { get; set; }

        [JsonProperty("legallyMarried")]
        public bool? LegallyMarried { get; set; }

        [JsonProperty("spouseName")]
        public string SpouseName { get; set; }

        [JsonProperty("languagePreferenceOther")]
        public string LanguagePreferenceOther { get; set; }

        [JsonProperty("patientLanguagePreferenceMappings")]
        public List<PatientLanguagePreferenceMapping> PatientLanguagePreferenceMappings { get; set; }

        [JsonProperty("patientSocialMediaMappings")]
        public List<PatientSocialMediaMapping> PatientSocialMediaMappings { get; set; }

        [JsonProperty("user")]
        public User User { get; set; }

        [JsonProperty("cases")]
        public List<Case> Cases { get; set; }

        //[JsonProperty("patientInsuranceInfoes")]
        //public List<PatientInsuranceInfo> PatientInsuranceInfoes { get; set; }
       
        [JsonProperty("patientDocuments")]
        public List<PatientDocument> PatientDocuments { get; set; }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();            

            return validations;
        }
    }

    public class mPatient : GbObject
    {
        [JsonProperty("ssn")]
        public string SSN { get; set; }

        [JsonProperty("dateOfFirstTreatment")]
        public DateTime? DateOfFirstTreatment { get; set; }

        [JsonProperty("user")]
        public User User { get; set; }

        [JsonProperty("cases")]
        public List<Case> Cases { get; set; }

        //[JsonProperty("patientInsuranceInfoes")]
        //public List<PatientInsuranceInfo> PatientInsuranceInfoes { get; set; }

  }

    public class AddPatient : GbObject
    {
        [JsonProperty("userName")]
        public string UserName { get; set; }

        [JsonProperty("firstName")]
        public string FirstName { get; set; }

        [JsonProperty("lastName")]
        public string LastName { get; set; }

        [JsonProperty("cellPhone")]
        public string CellPhone { get; set; }

        [JsonProperty("companyId")]
        public int? CompanyId { get; set; }
    }

    public class mAddPatient : GbObject
    {
        [JsonProperty("userName")]
        public string UserName { get; set; }

        [JsonProperty("firstName")]
        public string FirstName { get; set; }

        [JsonProperty("lastName")]
        public string LastName { get; set; }

        [JsonProperty("cellPhone")]
        public string CellPhone { get; set; }

        [JsonProperty("companyId")]
        public int? CompanyId { get; set; }
    }

    public class minPatient : GbObject
    {
      

        [JsonProperty("firstName")]
        public string FirstName { get; set; }

        [JsonProperty("middleName")]
        public string MiddleName { get; set; }

        [JsonProperty("lastName")]
        public string LastName { get; set; }
        
        [JsonProperty("gender")]
        public GBEnums.Gender? Gender { get; set; }

        [JsonProperty("maritalStatusId")]
        public byte? MaritalStatusId { get; set; }

        [JsonProperty("cellPhone")]
        public string CellPhone { get; set; }

        [JsonProperty("emailAddress")]
        public string EmailAddress { get; set; }

        [JsonProperty("homePhone")]
        public string HomePhone { get; set; }

        [JsonProperty("workPhone")]
        public string WorkPhone { get; set; }

        [JsonProperty("faxNo")]
        public string FaxNo { get; set; }

        [JsonProperty("address1")]
        public string Address1 { get; set; }

        [JsonProperty("address2")]
        public string Address2 { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("zipCode")]
        public string ZipCode { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }


    }
}
