using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midas.GreenBill.BusinessObject
{
    public class Account:GbObject
    {
        public GBEnums.AccountStatus Status { get; set; }
        public string Name { get; set; }
    }
}
