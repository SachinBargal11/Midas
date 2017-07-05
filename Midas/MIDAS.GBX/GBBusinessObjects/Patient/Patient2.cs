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
    public class Patient2 : GbObject
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

        [JsonProperty("user")]
        public User User { get; set; }

        [JsonProperty("cases")]
        public List<Case> Cases { get; set; }

        [JsonProperty("patientInsuranceInfoes")]
        public List<PatientInsuranceInfo> PatientInsuranceInfoes { get; set; }
       
        [JsonProperty("PatientDocuments")]
        public List<PatientDocument> PatientDocuments { get; set; }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();

            //if (ID < 0)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "ID cannot be less than zero." });
            //}

            //if (PatientID < 0)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "PatientID cannot be less than zero." });
            //}

            //if (User != null && User.ID != PatientID)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "PatientID dosent match." });
            //}

            //if (string.IsNullOrWhiteSpace(SSN) == true)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "SSN cannot be empty." });
            //}

            //if (string.IsNullOrWhiteSpace(WCBNo) == true)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "WCBNo cannot be empty." });
            //}

            //if (string.IsNullOrWhiteSpace(JobTitle) == true)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "JobTitle cannot be empty." });
            //}

            //if (string.IsNullOrWhiteSpace(WorkActivities) == true)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "WorkActivities cannot be empty." });
            //}

            //if (string.IsNullOrWhiteSpace(CarrierCaseNo) == true)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "CarrierCaseNo cannot be empty." });
            //}

            //if (string.IsNullOrWhiteSpace(ChartNo) == true)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "ChartNo cannot be empty." });
            //}

            //if (CompanyId < 0)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "CompanyID cannot be less than zero." });
            //}

            //if (Company != null && Company.ID != CompanyId)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "CompanyID dosent match." });
            //}

            //if (LocationID < 0)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "LocationID cannot be less than zero." });
            //}

            //if (Location != null && Location.ID != LocationID)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "LocationID dosent match." });
            //}

            //if (Weight.HasValue == true && Weight < 0)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "Weight cannot be less than zero." });
            //}

            //if (Height.HasValue == true && Height < 0)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "Height cannot be less than zero." });
            //}

            //if (MaritalStatusId.HasValue == true && MaritalStatusId < 0)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "Please select MaritalStatus." });
            //}

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

        [JsonProperty("patientInsuranceInfoes")]
        public List<PatientInsuranceInfo> PatientInsuranceInfoes { get; set; }

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

    public class mPatient2 : GbObject
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
