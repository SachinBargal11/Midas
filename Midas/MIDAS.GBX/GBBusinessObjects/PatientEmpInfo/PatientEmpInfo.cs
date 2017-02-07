using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class PatientEmpInfo : GbObject
    {
        public int PatientId { get; set; }
        public string JobTitle { get; set; }
        public string EmpName { get; set; }
        public int AddressInfoId { get; set; }
        public int ContactInfoId { get; set; }
        public bool IsCurrentEmp { get; set; }
        public AddressInfo AddressInfo { get; set; }
        public ContactInfo ContactInfo { get; set; }
        //public Patient2 Patient2 { get; set; }
        //public Patient2 Patient21 { get; set; }

    }
}
