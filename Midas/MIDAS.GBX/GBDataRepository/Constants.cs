using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIDAS.GBX.EN
{
    public static class Constants
    {
        #region Account
        public const string CompanyAdded = "Account added successfully";
        public const string CompanyAlreadyExists = "Company already exists";
        public const string CompanyUpdated = "Company updated successfully";
        public const string CompanyDeleted = "Company Deleted Sucessfully";
        #endregion

        #region User
        public const string UserAdded = "User added successfully";
        public const string UserUpdated = "User updated successfully";
        public const string UserDeleted = "User Deleted Sucessfully";
        public const string UserAlreadyExists = "Username already exists.";
        public const string InvalidCredentials = "Authentication Failed Invalid credentials";
        #endregion

        #region Address
        public const string AddressAdded = "Address added successfully";
        public const string AddressUpdated = "Address updated successfully";
        public const string AddressDeleted = "Address Deleted Sucessfully";
        #endregion

        #region ContactInfo
        public const string ContactInfoAdded = "ContactInfo added successfully";
        public const string ContactInfoUpdated = "ContactInfo updated successfully";
        public const string ContactInfoDeleted = "ContactInfo Deleted Sucessfully";
        #endregion

        #region Provider
        public const string ProviderAdded = "Provider added successfully";
        public const string ProviderUpdated = "Provider updated successfully";
        public const string ProviderDeleted = "Provider Deleted Sucessfully";
        public const string ProviderAlreadyExists = "Provider already exists.";
        #endregion

        #region Medical Facility
        public const string MedicalFacilityAdded = "Medical Facility added successfully";
        public const string MedicalFacilityUpdated = "Medical Facility updated successfully";
        public const string MedicalFacilityDeleted = "Medical Facility Deleted Sucessfully";
        #endregion

        #region TemplateType
        public const string ReferralType = "REFERRAL";
        public const string ConsentType = "CONSENT";
        #endregion

        public const string SpecilityAlreadyExists = "Specialty already exists.";
    }
}
