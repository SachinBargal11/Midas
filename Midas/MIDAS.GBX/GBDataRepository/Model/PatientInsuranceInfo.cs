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
    
    public partial class PatientInsuranceInfo
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public PatientInsuranceInfo()
        {
            this.Patient2 = new HashSet<Patient2>();
        }
    
        public int Id { get; set; }
        public int PatientId { get; set; }
        public string PolicyHolderName { get; set; }
        public Nullable<int> PolicyHolderAddressInfoId { get; set; }
        public Nullable<int> PolicyHolderContactInfoId { get; set; }
        public Nullable<int> PolicyOwnerId { get; set; }
        public string InsuranceCompanyCode { get; set; }
        public Nullable<int> InsuranceCompanyAddressInfoId { get; set; }
        public Nullable<int> InsuranceCompanyContactInfoId { get; set; }
        public string PolicyNo { get; set; }
        public string ContactPerson { get; set; }
        public string ClaimFileNo { get; set; }
        public string WCBNo { get; set; }
        public Nullable<byte> InsuranceType { get; set; }
        public Nullable<bool> IsInActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreateByUserID { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<int> UpdateByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
    
        public virtual AddressInfo AddressInfo { get; set; }
        public virtual AddressInfo AddressInfo1 { get; set; }
        public virtual ContactInfo ContactInfo { get; set; }
        public virtual ContactInfo ContactInfo1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Patient2> Patient2 { get; set; }
        public virtual Patient2 Patient21 { get; set; }
    }
}