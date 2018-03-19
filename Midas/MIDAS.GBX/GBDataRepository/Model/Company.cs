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
            this.AttorneyVisits = new HashSet<AttorneyVisit>();
            this.CaseCompanyConsentDocuments = new HashSet<CaseCompanyConsentDocument>();
            this.CaseCompanyMappings = new HashSet<CaseCompanyMapping>();
            this.CaseCompanyMappings1 = new HashSet<CaseCompanyMapping>();
            this.DiagnosisCodeCompanies = new HashSet<DiagnosisCodeCompany>();
            this.DiagnosisTypeCompanies = new HashSet<DiagnosisTypeCompany>();
            this.CompanyCaseConsentApprovals = new HashSet<CompanyCaseConsentApproval>();
            this.CompanyRoomTestDetails = new HashSet<CompanyRoomTestDetail>();
            this.CompanySpecialtyDetails = new HashSet<CompanySpecialtyDetail>();
            this.DocumentNodeObjectMappings = new HashSet<DocumentNodeObjectMapping>();
            this.EOVisits = new HashSet<EOVisit>();
            this.GeneralSettings = new HashSet<GeneralSetting>();
            this.IMEVisits = new HashSet<IMEVisit>();
            this.IMEVisits1 = new HashSet<IMEVisit>();
            this.InsuranceMasters = new HashSet<InsuranceMaster>();
            this.Invitations = new HashSet<Invitation>();
            this.Locations = new HashSet<Location>();
            this.Notifications = new HashSet<Notification>();
            this.OTPCompanyMappings = new HashSet<OTPCompanyMapping>();
            this.OTPCompanyMappings1 = new HashSet<OTPCompanyMapping>();
            this.PatientVisits = new HashSet<PatientVisit>();
            this.PatientVisitUnscheduleds = new HashSet<PatientVisitUnscheduled>();
            this.PendingReferrals = new HashSet<PendingReferral>();
            this.PreferredAncillaryProviders = new HashSet<PreferredAncillaryProvider>();
            this.PreferredAncillaryProviders1 = new HashSet<PreferredAncillaryProvider>();
            this.PreferredAttorneyProviders = new HashSet<PreferredAttorneyProvider>();
            this.PreferredAttorneyProviders1 = new HashSet<PreferredAttorneyProvider>();
            this.PreferredMedicalProviders = new HashSet<PreferredMedicalProvider>();
            this.PreferredMedicalProviders1 = new HashSet<PreferredMedicalProvider>();
            this.ProcedureCodes = new HashSet<ProcedureCode>();
            this.ProcedureCodeCompanyMappings = new HashSet<ProcedureCodeCompanyMapping>();
            this.Referrals = new HashSet<Referral>();
            this.Referrals1 = new HashSet<Referral>();
            this.Schedules = new HashSet<Schedule>();
            this.UserCompanies = new HashSet<UserCompany>();
            this.UserCompanyRoles = new HashSet<UserCompanyRole>();
            this.UserPersonalSettings = new HashSet<UserPersonalSetting>();
            this.MidasDocuments = new HashSet<MidasDocument>();
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
        public int CompanyStatusTypeID { get; set; }
    
        public virtual AddressInfo AddressInfo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AdjusterMaster> AdjusterMasters { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AttorneyVisit> AttorneyVisits { get; set; }
        public virtual BlobStorageType BlobStorageType { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CaseCompanyConsentDocument> CaseCompanyConsentDocuments { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CaseCompanyMapping> CaseCompanyMappings { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CaseCompanyMapping> CaseCompanyMappings1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DiagnosisCodeCompany> DiagnosisCodeCompanies { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DiagnosisTypeCompany> DiagnosisTypeCompanies { get; set; }
        public virtual CompanyStatusType CompanyStatusType { get; set; }
        public virtual CompanyType CompanyType1 { get; set; }
        public virtual ContactInfo ContactInfo { get; set; }
        public virtual SubscriptionPlan SubscriptionPlan { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CompanyCaseConsentApproval> CompanyCaseConsentApprovals { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CompanyRoomTestDetail> CompanyRoomTestDetails { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CompanySpecialtyDetail> CompanySpecialtyDetails { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DocumentNodeObjectMapping> DocumentNodeObjectMappings { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EOVisit> EOVisits { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<GeneralSetting> GeneralSettings { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<IMEVisit> IMEVisits { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<IMEVisit> IMEVisits1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<InsuranceMaster> InsuranceMasters { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Invitation> Invitations { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Location> Locations { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Notification> Notifications { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OTPCompanyMapping> OTPCompanyMappings { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OTPCompanyMapping> OTPCompanyMappings1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PatientVisit> PatientVisits { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PatientVisitUnscheduled> PatientVisitUnscheduleds { get; set; }
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
        public virtual ICollection<ProcedureCodeCompanyMapping> ProcedureCodeCompanyMappings { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Referral> Referrals { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Referral> Referrals1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Schedule> Schedules { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserCompany> UserCompanies { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserCompanyRole> UserCompanyRoles { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserPersonalSetting> UserPersonalSettings { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MidasDocument> MidasDocuments { get; set; }
    }
}
