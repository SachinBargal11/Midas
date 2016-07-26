using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midas.GreenBill.BusinessObject
{
    public class ContactInfo:GbObject
    {
        public string Name { get; set; }
        public string CellPhone { get; set; }
        public string EmailAddress { get; set; }
        public string HomePhone { get; set; }
        public string WorkPhone { get; set; }
        public string FaxNo { get; set; }
    }
}
