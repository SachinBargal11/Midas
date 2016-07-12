using MIDAS.Core.Entities.Account;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.Infrastructure
{
    public class AccountDataContext : DbContext
    {
        public AccountDataContext()
            : base("Data Source=.;" +
"Initial Catalog=GreenBillsDB;User id=sa;Password=1234;")
        
{

        }
        public DbSet<Account> Account { get; set; }
    }
}
