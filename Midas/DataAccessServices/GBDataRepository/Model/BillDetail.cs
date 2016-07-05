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
    
    public partial class BillDetail
    {
        public int BillDetailId { get; set; }
        public Nullable<int> ProcedureCodeId { get; set; }
        public Nullable<decimal> CodeAmount { get; set; }
        public string BillId { get; set; }
        public Nullable<System.DateTime> DateofVisit { get; set; }
        public Nullable<int> AccountId { get; set; }
        public Nullable<double> Unit { get; set; }
        public Nullable<decimal> Price { get; set; }
        public Nullable<decimal> DoctAmount { get; set; }
        public Nullable<int> SpecialtyId { get; set; }
        public Nullable<bool> IsGroupAmount { get; set; }
        public Nullable<decimal> GroupAmount { get; set; }
        public Nullable<decimal> DailyLimit { get; set; }
        public string Modifier { get; set; }
        public Nullable<bool> cyclicApplied { get; set; }
        public Nullable<decimal> CyclicOrignalAmount { get; set; }
        public Nullable<int> CyclicId { get; set; }
        public Nullable<bool> Deleted { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> UpdatedBY { get; set; }
        public string IPAddress { get; set; }
    }
}
