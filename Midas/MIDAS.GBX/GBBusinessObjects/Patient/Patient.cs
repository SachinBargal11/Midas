using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class Patient : GbObject
    {
        public int id { get; set; }
        public int PatientID { get; set; }
        public string SSN { get; set; }
        public string WCBNo { get; set; }
        public string JobTitle { get; set; }
        public string WorkActivities { get; set; }
        public string CarrierCaseNo { get; set; }
        public string ChartNo { get; set; }
        public int CompanyID { get; set; }
        public int LocationID { get; set; }

        public Company Company { get; set; }
        public Location Location { get; set; }
        public User User { get; set; }

        public decimal Weight { get; set; }
        public byte MaritalStatus { get; set; }
        public string DrivingLicence { get; set; }
        public string EmergenceyContact { get; set; }
        public string EmergenceyContactNumber { get; set; }
        public string EmergenceyContactRelation { get; set; }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();

            if (id < 0)
            {
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "ID cannot be less than zero." });
            }

            if (PatientID < 0)
            {
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "PatientID cannot be less than zero." });
            }

            if (User != null && User.ID != PatientID)
            {
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "PatientID dosent match." });
            }

            if (string.IsNullOrWhiteSpace(SSN) == true)
            {
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "SSN cannot be empty." });
            }

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

            if (string.IsNullOrWhiteSpace(ChartNo) == true)
            {
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "ChartNo cannot be empty." });
            }

            if (CompanyID < 0)
            {
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "CompanyID cannot be less than zero." });
            }

            if (Company != null && Company.ID != CompanyID)
            {
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "CompanyID dosent match." });
            }

            if (LocationID < 0)
            {
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "LocationID cannot be less than zero." });
            }

            if (Location != null && Location.ID != LocationID)
            {
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "LocationID dosent match." });
            }

            if (Weight < 0)
            {
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "Weight cannot be less than zero." });
            }

            if (MaritalStatus < 0)
            {
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "Please select MaritalStatus." });
            }

            //if (string.IsNullOrWhiteSpace(DrivingLicence) == true)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "DrivingLicence cannot be empty." });
            //}

            //if (string.IsNullOrWhiteSpace(EmergenceyContact) == true)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "EmergenceyContact cannot be empty." });
            //}

            //if (string.IsNullOrWhiteSpace(EmergenceyContactNumber) == true)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "EmergenceyContactNumber cannot be empty." });
            //}

            //if (string.IsNullOrWhiteSpace(EmergenceyContactRelation) == true)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "EmergenceyContactRelation cannot be empty." });
            //}

            return validations;
        }
    }
}
