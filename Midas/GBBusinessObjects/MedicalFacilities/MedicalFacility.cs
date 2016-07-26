using Midas.GreenBill.BusinessObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midas.GreenBill.BusinessObject
{
    public class MedicalFacility : GbObject
    {
        public string Name { get; set; }
        public int AccountID { get; set; }
        public int AddressId { get; set; }
        public int ContactInfoId { get; set; }
        public string Prefix { get; set; }
        public int DefaultAttorneyUserID { get; set; }
    }
}
