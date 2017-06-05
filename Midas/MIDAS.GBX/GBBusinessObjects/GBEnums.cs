using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class GBEnums
    {
        #region Account Status
            public enum AccountStatus
            {
                Active = 1,
                InActive = 2,
                Suspended = 3,
                Limited = 4
            }
        #endregion

        #region User Type
            public enum UserType
            {
                Patient = 1,
                Staff = 2,
                Attorney = 3,
                Doctor = 4,
                Ancillary=5
        }
        #endregion

        #region Gender
            public enum Gender
            {
                Male = 1,
                Female = 2
            }
        #endregion

        #region Tax Type
        public enum TaxType
        {
            Tax1 = 1,
            Tax2 = 2
        }
        #endregion


        #region Company Type 
        public enum CompanyType
        {
            MedicalProvider = 1,
            Attorney = 2,
            Billing = 3,
            Funding = 4,
            Collection = 5,
            Ancillary = 6
        }
        #endregion

        #region SubsCriptionType
        public enum SubsCriptionType
        {
            Trial = 1,
            Pro = 2
        }
        #endregion

        #region RoleType
        public enum RoleType
        {
            Admin = 1,
            Manager = 2,
            Doctor=3
        }
        #endregion

        #region User Status
        public enum UserStatus
        { 
            Active = 1,
            InActive = 2,
            Suspended = 3,
            Limited = 4
        }
        #endregion

        #region Location Type
        public enum LocationType
        {
            MEDICAL_OFFICE = 1, 
            MEDICAL_TESTING_FACILITY = 2
        }
        #endregion

        #region Error Type
        public enum ErrorType
        {
            Validation = 1,
            InvalidParameters = 1,
            Unknown = 2
        }
        #endregion

        #region Schedule Status
        public enum ScheduleStatus
        {
            Open = 1,
            Closed = 1,
            SpecificHours = 2
        }
        #endregion

        #region File Types
        public enum FileTypes
        {
            pdf = 1,
            doc = 2,
            jpg = 3,
            jpeg = 4,
            docx = 5,
            txt = 6
        }
        #endregion

        #region Object Types
        public enum ObjectTypes
        {
            PATIENT = 1,
            CASE = 2,
            VISIT = 3
        }
        #endregion


    }
}
