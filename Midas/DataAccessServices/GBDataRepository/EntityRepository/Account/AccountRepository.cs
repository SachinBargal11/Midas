using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Midas.GreenBill.Model;
using BO = Midas.GreenBill.BusinessObject;
using Midas.Common;

namespace Midas.GreenBill.EntityRepository
{
    internal class AccountRepository : BaseEntityRepo
    {
        private DbSet<Account> _dbSet;

        public AccountRepository(GreenBillsDbEntities context) : base(context)
        {
            _dbSet = context.Set<Account>();
        }

        public override T Convert<T, U>(U entity)
        {
            Account account = entity as Account;
            if (account == null)
                return default(T);

            BO.Account boAccount = new BO.Account();

            boAccount.Id = account.AccountId;
            boAccount.Name = account.Name;
            boAccount.Status = (BO.AccountStatus)account.Status;

            //boAccount.Owner = new UserRepository(_context).Convert<BO.User,User1>(account.Owner)
            return (T)(object)boAccount;
        }


        public override Object Save<T, U>(T entity, U parentDBObj) 
        {
            Utility.ValidateEntityType<T>(typeof(BO.Account));
            BO.Account accountBO = entity as BO.Account;

            Account accountDB = new Account();
            accountDB.Name = accountBO.Name;
            accountDB.AccountId = accountBO.Id;
            accountDB.Status = System.Convert.ToByte(accountBO.Status);

            //accountDB.ChangeBy
            //accountDB.CreateDt
            //accountDB.ChangeDt = System.DateTime.UtcNow;

            if (accountBO.Id > 0)
            {
                _dbSet.Add(accountDB);
            }
            else
            { 
                _dbSet.Attach(accountDB);
            }
            return accountDB;
        }

        public override T Get<T>(int id)
        {
            return base.Get<T>(id);
        }
        public override List<T> Get<T>(string name)
        {
            return base.Get<T>(name);
        }

        public override List<T> Get<T>(List<EntitySearchParameter> searchParameters)
        {
            Dictionary<Type, String> filterMap = new Dictionary<Type, string>();
            filterMap.Add(typeof(BO.Account), "");
            IQueryable<Account> query = EntitySearch.CreateSearchQuery<Account>(_context.Accounts, searchParameters, filterMap);
            List<Account> accounts = query.ToList<Account>();
            List<T> boAccounts = new List<T>();
            accounts.ForEach(t => boAccounts.Add(Convert<T, Account>(t)));
            return boAccounts;
        }
    }
}
