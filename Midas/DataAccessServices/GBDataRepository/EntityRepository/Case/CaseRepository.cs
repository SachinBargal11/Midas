using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using GBDataRepository.Model;

using GBDataRepository.Model;

namespace Midas.GreenBill.EntityRepository
{
    internal class CaseRepository : BaseEntityRepo
    {
        private DbSet<Account> _dbSet;

        public CaseRepository(GreenBillsDbEntities context) : base(context)
        {
            _dbSet = context.Set<Account>();
        }

        public override Object Save<T>(T entity)
        {
            return null;
        }
    }
}
