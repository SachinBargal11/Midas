﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class UserCompanyRole : GbObject
    {
        public User User { get; set; }
        public Role[] Role { get; set; }
    }

    public class mUserCompanyRole : GbObject
    {
        public mUser mUser { get; set; }
        public mRole[] mRole { get; set; }
    }
}
