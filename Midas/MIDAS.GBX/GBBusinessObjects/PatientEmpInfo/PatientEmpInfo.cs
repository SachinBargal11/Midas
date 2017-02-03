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
        public int EmpAddressId { get; set; }
        public int EmpContactInfoId { get; set; }
        public bool IsCurrentEmp { get; set; }
        public AddressInfo AddressInfo { get; set; }
        public Case Cases { get; set; }
        public ContactInfo ContactInfo { get; set; }
        public User User { get; set; }


    }
}
