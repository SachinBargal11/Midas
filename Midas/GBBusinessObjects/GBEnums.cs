using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midas.GreenBill.BusinessObject
{
    public class GBEnums
    {
        #region Account Status
            public enum AccountStatus
            {
                active=1,
                disabled=2,
                paused=3,
                pending=4
            }
        #endregion

        #region User Type
            public enum UserType
            {
                RegularStaff = 1,
                Doctor = 2,
                Patient = 3,
                Attorney = 4 , 
            }
        #endregion

        #region Gender
            public enum Gender
            {
                Male = 1,
                Female = 2
            }
        #endregion
    }
}
