using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Midas.GreenBill.Model;

namespace Midas.GreenBill.EntityRepository
{
    internal class UserRepository : BaseEntityRepo
    {
        private DbSet<Account> _dbSet;

        public UserRepository(GreenBillsDbEntities context) : base(context)
        {
            _dbSet = context.Set<Account>();
        }

        public override Object Save<T>(T entity)
        {

            return null;
        }
    }
}
