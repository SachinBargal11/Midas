using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midas.GreenBill.Model
{
    public partial class GreenBillsDbEntities
    {
        public GreenBillsDbEntities(string connectionString) : 
                base(connectionString)
        {
            Database.Log = s => Debug.WriteLine(s);
        }
    }
}
