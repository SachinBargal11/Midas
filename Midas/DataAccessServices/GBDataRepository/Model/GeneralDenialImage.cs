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
    
    public partial class GeneralDenialImage
    {
        public int GeneralDenialsImageId { get; set; }
        public Nullable<int> GeneralDenialsId { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public Nullable<int> ImageId { get; set; }
        public Nullable<bool> Deleted { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> UpdatedBY { get; set; }
    }
}
