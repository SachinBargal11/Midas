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
    
    public partial class EOVisit
    {
        public int ID { get; set; }
        public Nullable<int> DoctorId { get; set; }
        public Nullable<int> InsuranceProviderId { get; set; }
        public int CalendarEventId { get; set; }
        public Nullable<int> VisitStatusId { get; set; }
        public Nullable<System.DateTime> EventStart { get; set; }
        public Nullable<System.DateTime> EventEnd { get; set; }
        public string Notes { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreateByUserID { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<int> UpdateByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public int VisitCreatedByCompanyId { get; set; }
        public Nullable<int> PatientId { get; set; }
        public Nullable<int> CaseId { get; set; }
    
        public virtual CalendarEvent CalendarEvent { get; set; }
        public virtual Case Case { get; set; }
        public virtual Company Company { get; set; }
        public virtual Doctor Doctor { get; set; }
        public virtual InsuranceMaster InsuranceMaster { get; set; }
        public virtual Patient Patient { get; set; }
        public virtual VisitStatu VisitStatu { get; set; }
    }
}
