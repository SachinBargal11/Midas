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
    
    public partial class VisitProcedure
    {
        public int VisitProcedureId { get; set; }
        public Nullable<int> VisitId { get; set; }
        public Nullable<int> CaseId { get; set; }
        public Nullable<System.DateTime> ReScheduleDate { get; set; }
        public Nullable<System.TimeSpan> ReScheduleDateTime { get; set; }
        public Nullable<bool> ReportReceived { get; set; }
        public string StudyNumber { get; set; }
        public string Notes { get; set; }
        public string ReportPath { get; set; }
        public Nullable<int> ReadingDoctor { get; set; }
        public Nullable<bool> BillStatus { get; set; }
        public string BillNumber { get; set; }
        public Nullable<System.DateTime> Billdate { get; set; }
        public string Modifier { get; set; }
        public Nullable<int> SpecialtyId { get; set; }
        public Nullable<int> AccountId { get; set; }
        public Nullable<bool> Deleted { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> UpdatedBY { get; set; }
        public string IPAddress { get; set; }
    }
}
