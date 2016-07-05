using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midas.GreenBill.BusinessObject
{
    public class Account:GbObject
    {
        public AccountStatus Status;
        public Address PrimaryAddress;
        public User Owner;
    }
}
