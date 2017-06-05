//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MIDAS.GBX.DataRepository.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class Company
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Company()
        {
            this.AdjusterMasters = new HashSet<AdjusterMaster>();
            this.Cases = new HashSet<Case>();
            this.Cases1 = new HashSet<Case>();
            this.CaseCompanyConsentDocuments = new HashSet<CaseCompanyConsentDocument>();
            this.CaseCompanyMappings = new HashSet<CaseCompanyMapping>();
            this.CompanyCaseConsentApprovals = new HashSet<CompanyCaseConsentApproval>();
            this.CompanySpecialtyDetails = new HashSet<CompanySpecialtyDetail>();
            this.DiagnosisCodes = new HashSet<DiagnosisCode>();
            this.DiagnosisTypes = new HashSet<DiagnosisType>();
            this.DocumentNodeObjectMappings = new HashSet<DocumentNodeObjectMapping>();
            this.GeneralSettings = new HashSet<GeneralSetting>();
            this.Invitations = new HashSet<Invitation>();
            this.Locations = new HashSet<Location>();
            this.Notifications = new HashSet<Notification>();
            this.PendingReferrals = new HashSet<PendingReferral>();
            this.PreferredAncillaryProviders = new HashSet<PreferredAncillaryProvider>();
            this.PreferredAncillaryProviders1 = new HashSet<PreferredAncillaryProvider>();
            this.PreferredAttorneyProviders = new HashSet<PreferredAttorneyProvider>();
            this.PreferredAttorneyProviders1 = new HashSet<PreferredAttorneyProvider>();
            this.PreferredMedicalProviders = new HashSet<PreferredMedicalProvider>();
            this.PreferredMedicalProviders1 = new HashSet<PreferredMedicalProvider>();
            this.ProcedureCodes = new HashSet<ProcedureCode>();
            this.Referral2 = new HashSet<Referral2>();
            this.Referral21 = new HashSet<Referral2>();
            this.Schedules = new HashSet<Schedule>();
            this.UserCompanies = new HashSet<UserCompany>();
            this.UserPersonalSettings = new HashSet<UserPersonalSetting>();
        }
    
        public int id { get; set; }
        public string Name { get; set; }
        public byte Status { get; set; }
        public int CompanyType { get; set; }
        public Nullable<int> SubscriptionPlanType { get; set; }
        public string TaxID { get; set; }
        public int AddressId { get; set; }
        public int ContactInfoID { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreateByUserID { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<int> UpdateByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public Nullable<int> BlobStorageTypeId { get; set; }
        public bool RegistrationComplete { get; set; }
        public byte CompanyStatusTypeID { get; set; }
    
        public virtual AddressInfo AddressInfo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AdjusterMaster> AdjusterMasters { get; set; }
        public virtual BlobStorageType BlobStorageType { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Case> Cases { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Case> Cases1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CaseCompanyConsentDocument> CaseCompanyConsentDocuments { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CaseCompanyMapping> CaseCompanyMappings { get; set; }
        public virtual CompanyStatusType CompanyStatusType { get; set; }
        public virtual CompanyType CompanyType1 { get; set; }
        public virtual ContactInfo ContactInfo { get; set; }
        public virtual SubscriptionPlan SubscriptionPlan { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CompanyCaseConsentApproval> CompanyCaseConsentApprovals { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CompanySpecialtyDetail> CompanySpecialtyDetails { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DiagnosisCode> DiagnosisCodes { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DiagnosisType> DiagnosisTypes { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DocumentNodeObjectMapping> DocumentNodeObjectMappings { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<GeneralSetting> GeneralSettings { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Invitation> Invitations { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Location> Locations { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Notification> Notifications { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PendingReferral> PendingReferrals { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PreferredAncillaryProvider> PreferredAncillaryProviders { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PreferredAncillaryProvider> PreferredAncillaryProviders1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PreferredAttorneyProvider> PreferredAttorneyProviders { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PreferredAttorneyProvider> PreferredAttorneyProviders1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PreferredMedicalProvider> PreferredMedicalProviders { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PreferredMedicalProvider> PreferredMedicalProviders1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProcedureCode> ProcedureCodes { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Referral2> Referral2 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Referral2> Referral21 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Schedule> Schedules { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserCompany> UserCompanies { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserPersonalSetting> UserPersonalSettings { get; set; }
    }
}
