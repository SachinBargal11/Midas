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
    
    public partial class InsuranceMaster
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public InsuranceMaster()
        {
            this.AdjusterMasters = new HashSet<AdjusterMaster>();
            this.EOVisits = new HashSet<EOVisit>();
            this.PatientInsuranceInfoes = new HashSet<PatientInsuranceInfo>();
        }
    
        public int Id { get; set; }
        public string CompanyCode { get; set; }
        public string CompanyName { get; set; }
        public Nullable<int> AddressInfoId { get; set; }
        public Nullable<int> ContactInfoId { get; set; }
        public Nullable<int> InsuranceMasterTypeId { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreateByUserID { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<int> UpdateByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public Nullable<int> CreatedByCompanyId { get; set; }
        public string ZeusID { get; set; }
        public Nullable<int> PriorityBilling { get; set; }
        public Nullable<int> Only1500Form { get; set; }
        public Nullable<int> PaperAuthorization { get; set; }
    
        public virtual AddressInfo AddressInfo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AdjusterMaster> AdjusterMasters { get; set; }
        public virtual Company Company { get; set; }
        public virtual ContactInfo ContactInfo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EOVisit> EOVisits { get; set; }
        public virtual InsuranceMasterType InsuranceMasterType { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PatientInsuranceInfo> PatientInsuranceInfoes { get; set; }
    }
}
