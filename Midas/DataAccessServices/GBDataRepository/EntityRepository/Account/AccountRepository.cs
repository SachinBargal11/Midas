#region Imports
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Midas.GreenBill.Model;
using BO = Midas.GreenBill.BusinessObject;
using Midas.Common;
using GBDataRepository.Model;
#endregion

namespace Midas.GreenBill.EntityRepository
{
    internal class AccountRepository : BaseEntityRepo
    {
        private DbSet<Account> _dbSet;

        #region Constructor
        public AccountRepository(GreenBillsDbEntities context) : base(context)
        {
            _dbSet = context.Set<Account>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Account account = entity as Account;
            if (account == null)
                return default(T);

            BO.Account boAccount = new BO.Account();

            boAccount.ID = account.ID;
            boAccount.Name = account.Name;
            boAccount.Status = (BO.GBEnums.AccountStatus)account.Status;

            //boAccount.Owner = new UserRepository(_context).Convert<BO.User,User1>(account.Owner)
            return (T)(object)boAccount;
        }
        #endregion

        #region Save Data
        public override Object Save<T>(T entity) 
        {
            Utility.ValidateEntityType<T>(typeof(BO.Account));
            BO.Account accountBO = entity as BO.Account;

            Account accountDB = new Account();
            accountDB.Name = accountBO.Name;
            accountDB.ID = accountBO.ID;
            accountDB.Status = System.Convert.ToByte(accountBO.Status);

            if (accountBO.ID > 0)
            {
                _dbSet.Add(accountDB);
            }
            else
            { 
                _dbSet.Attach(accountDB);
            }
            return accountDB;
        }
        #endregion

        #region Get Account By ID
        public override T Get<T>(T entity,int id)
        {
            BO.Account acc_ = Convert<BO.Account, Account>(_context.Account.Find(id));
            return (T)(object)acc_;
        }
        #endregion

        #region Get Account By Name
        public override List<T> Get<T>(T entity, string name)
        {
            List<EntitySearchParameter> searchParameters = new List<EntitySearchParameter>();
            EntitySearchParameter param = new EntitySearchParameter();
            param.name = name;
            searchParameters.Add(param);

            return Get<T>(entity, searchParameters);
        }
        #endregion

        #region Get Accounts By Search Parameters
        public override List<T> Get<T>(T entity,List<EntitySearchParameter> searchParameters)
        {
            Dictionary<Type, String> filterMap = new Dictionary<Type, string>();
            filterMap.Add(typeof(BO.Account), "");
            IQueryable<Account> query = EntitySearch.CreateSearchQuery<Account>(_context.Account, searchParameters, filterMap);
            List<Account> accounts = query.ToList<Account>();
            List<T> boAccounts = new List<T>();
            accounts.ForEach(t => boAccounts.Add(Convert<T, Account>(t)));
            return boAccounts;
        }
        #endregion
    }
}
