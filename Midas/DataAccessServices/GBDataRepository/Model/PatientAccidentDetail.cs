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
    
    public partial class PatientAccidentDetail
    {
        public int PatientAccidentDetailsId { get; set; }
        public Nullable<int> PatientDetailId { get; set; }
        public Nullable<int> AccountId { get; set; }
        public string PlateNo { get; set; }
        public Nullable<System.DateTime> AccidentDate { get; set; }
        public Nullable<int> AddressId { get; set; }
        public string ReportNo { get; set; }
        public string PatientFromCar { get; set; }
        public string HospitalName { get; set; }
        public Nullable<int> HospitalAddressId { get; set; }
        public string DescripInjury { get; set; }
        public Nullable<System.DateTime> AdmisionDate { get; set; }
        public string PatientType { get; set; }
    }
}
