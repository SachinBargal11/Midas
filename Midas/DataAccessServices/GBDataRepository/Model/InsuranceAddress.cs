//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Midas.GreenBill.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class InsuranceAddress
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public InsuranceAddress()
        {
            this.PatientInsurances = new HashSet<PatientInsurance>();
        }
    
        public int ID { get; set; }
        public Nullable<int> InsuranceId { get; set; }
        public Nullable<int> AccountId { get; set; }
        public Nullable<int> OfficeId { get; set; }
        public string Address { get; set; }
        public Nullable<int> CityId { get; set; }
        public Nullable<int> Zip { get; set; }
        public Nullable<bool> Default { get; set; }
        public Nullable<bool> Deleted { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> UpdatedBY { get; set; }
        public string IPAddress { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PatientInsurance> PatientInsurances { get; set; }
    }
}
