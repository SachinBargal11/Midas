using MIDAS.Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.Core.Entities.Account
{
    public class Account : GbObject
    {
        public MIDAS.Core.Common.GBEnums.AccountStatus Status { get; set; }
        //public Address Address { get; set; }
    }
}
