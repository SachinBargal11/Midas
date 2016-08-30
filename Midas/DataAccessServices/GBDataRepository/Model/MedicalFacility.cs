//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace GBDataRepository.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class MedicalFacility
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MedicalFacility()
        {
            this.DoctorMedicalFacilitiesProviders = new HashSet<DoctorMedicalFacilitiesProvider>();
            this.ProviderMedicalFacilities = new HashSet<ProviderMedicalFacility>();
            this.SpecialtyDetails = new HashSet<SpecialtyDetail>();
        }
    
        public int ID { get; set; }
        public string Name { get; set; }
        public int AccountID { get; set; }
        public int AddressId { get; set; }
        public int ContactInfoId { get; set; }
        public string Prefix { get; set; }
        public Nullable<int> DefaultAttorneyUserID { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreateByUserID { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<int> UpdateByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
    
        public virtual Account Account { get; set; }
        public virtual Address Address { get; set; }
        public virtual ContactInfo ContactInfo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DoctorMedicalFacilitiesProvider> DoctorMedicalFacilitiesProviders { get; set; }
        public virtual User User { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProviderMedicalFacility> ProviderMedicalFacilities { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SpecialtyDetail> SpecialtyDetails { get; set; }
    }
}
