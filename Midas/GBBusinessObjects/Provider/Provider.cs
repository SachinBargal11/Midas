using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security;
namespace Midas.GreenBill.BusinessObject
{
    public class Provider : GbObject
    {
        public string NPI { get; set; }
        public string FederalTaxId { get; set; }
        public string Prefix { get; set; }
    }
}
