using MIDAS.Core.Entities.User;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.Infrastructure
{
    public class UserDataContext : DbContext
    {
        public UserDataContext()
            : base("Data Source=.;" +
"Initial Catalog=GreenBillsDB;User id=sa;Password=1234;")
        {

        }
        public DbSet<User> User { get; set; }
    }
}
