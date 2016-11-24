﻿using System;
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
                Admin = 1,
                Owner = 2,
                Doctor = 3,
                Patient = 4 ,
                Attorney = 5,
                Adjuster = 6,
                Accounts = 7
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
            Billing = 1,
            Testing = 2
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
            Manager = 2
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
    }
}
