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
    
    public partial class PatientVisitUnscheduled
    {
        public int Id { get; set; }
        public int CaseId { get; set; }
        public int PatientId { get; set; }
        public Nullable<System.DateTime> EventStart { get; set; }
        public string MedicalProviderName { get; set; }
        public string DoctorName { get; set; }
        public Nullable<int> SpecialtyId { get; set; }
        public Nullable<int> RoomTestId { get; set; }
        public string Notes { get; set; }
        public Nullable<int> ReferralId { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreateByUserID { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<int> UpdateByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
    
        public virtual Case Case { get; set; }
        public virtual Patient Patient { get; set; }
        public virtual Referral Referral { get; set; }
        public virtual RoomTest RoomTest { get; set; }
        public virtual Specialty Specialty { get; set; }
    }
}