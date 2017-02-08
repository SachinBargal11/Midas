using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class PatientAccidentInfo : GbObject
    {
        public int PatientId { get; set; }
        public DateTime? AccidentDate { get; set; }
        public string PlateNumber { get; set; }
        public string ReportNumber { get; set; }
        public int AccidentAddressInfoId { get; set; }
        public string HospitalName { get; set; }
        public int HospitalAddressInfoId { get; set; }
        public DateTime? DateOfAdmission { get; set; }
        public string AdditionalPatients { get; set; }
        public string DescribeInjury { get; set; }
        public int PatientTypeId { get; set; }
        public bool IsCurrentAccident { get; set; }

        public AddressInfo AccidentAddressInfo { get; set; }
        public AddressInfo HospitalAddressInfo { get; set; }
        public Patient2 Patient2 { get; set; }



    }
}
