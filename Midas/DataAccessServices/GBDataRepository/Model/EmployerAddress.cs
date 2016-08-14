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
    
    public partial class EmployerAddress
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public EmployerAddress()
        {
            this.Cases = new HashSet<Case>();
        }
    
        public int ID { get; set; }
        public Nullable<int> EmployerID { get; set; }
        public Nullable<int> AddressID { get; set; }
        public Nullable<int> ContactinfoID { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreateByUserID { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<int> UpdateByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Case> Cases { get; set; }
        public virtual ContactInfo ContactInfo { get; set; }
        public virtual Employer Employer { get; set; }
    }
}
