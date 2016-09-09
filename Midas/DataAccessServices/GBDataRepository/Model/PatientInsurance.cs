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
    
    public partial class PatientInsurance
    {
        public int ID { get; set; }
        public int PatientID { get; set; }
        public string PolicyHolderName { get; set; }
        public string PolicyNumber { get; set; }
        public int InsuranceID { get; set; }
        public int InsuranceAddressID { get; set; }
        public Nullable<bool> IsPrimary { get; set; }
        public Nullable<bool> IsSecondry { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public Nullable<System.DateTime> ExpiryDate { get; set; }
        public int CreateByUserID { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<int> UpdateByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
    
        public virtual Address Address { get; set; }
        public virtual Insurance Insurance { get; set; }
        public virtual User User { get; set; }
    }
}
