using MIDAS.Core.Entities.Account;
using MIDAS.Core.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.Infrastructure.Repository
{
    public class AccountRepository : IAccountRepository
    {
        AccountDataContext context = new AccountDataContext();
        public void Add(Core.Entities.Account.Account b)
        {
            context.Account.Add(b);
            context.SaveChanges();

        }

        public void Edit(Core.Entities.Account.Account b)
        {
            //context.Entry(b).State = System.Data.Entity.EntityState.Modified;
        }

        public void Remove(string Id)
        {
            Account b = context.Account.Find(Id);
            context.Account.Remove(b);
            context.SaveChanges();
        }

        public IEnumerable<Core.Entities.Account.Account> GetAccount()
        {
            return context.Account;
        }

        public Core.Entities.Account.Account FindById(int Id)
        {
            var c = (from r in context.Account where r.ID == Id select r).FirstOrDefault();
            return c;
        }
    }
}
