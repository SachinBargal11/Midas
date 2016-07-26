#region Imports
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using GBDataRepository.Model;
using BO = Midas.GreenBill.BusinessObject;
using Midas.Common;
using Midas.GreenBill.EN;
using System.Web.Script.Serialization;
using Newtonsoft.Json.Linq;
#endregion

namespace Midas.GreenBill.EntityRepository
{
    internal class AccountRepository : BaseEntityRepo
    {
        private DbSet<Account> _dbSet;
        private DbSet<User> _dbuser;
        #region Constructor
        public AccountRepository(GreenBillsDbEntities context) : base(context)
        {
            _dbSet = context.Set<Account>();
            _dbuser = context.Set<User>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {

            if (entity.GetType().Name == "User")
            {
                User user = entity as User;
                if (user == null)
                    return default(T);

                BO.User boUser = new BO.User();
                BO.Address boAddress = new BO.Address();
                BO.ContactInfo boContactInfo = new BO.ContactInfo();
                BO.Account boAccount = new BO.Account();

                boAccount.Name = user.Account.Name;
                boAccount.Status = (BO.GBEnums.AccountStatus)user.Account.Status;
                boAccount.CreateByUserID = user.Account.CreateByUserID.Value;
                boAccount.CreateDate = user.Account.CreateDate.Value;
                boAccount.ID = user.Account.ID;

                boUser.UserName = user.UserName;
                boUser.ID = user.ID;
                boUser.FirstName = user.FirstName;
                boUser.LastName = user.LastName;
                boUser.ImageLink = user.ImageLink;
                boUser.DateOfBirth = user.DateOfBirth.Value;
                boUser.UserType =(BO.GBEnums.UserType)user.UserType;
                boUser.Gender = (BO.GBEnums.Gender)user.UserType;
                boUser.Password = user.Password;
                boUser.IsDeleted = System.Convert.ToBoolean(user.IsDeleted);
                boUser.DateOfBirth = user.DateOfBirth.Value;
                boUser.CreateByUserID = user.CreateByUserID.Value;
                boUser.CreateDate = user.CreateDate;

                boAddress.Name = user.Address.Name;
                boAddress.Address1 = user.Address.Address1;
                boAddress.Address2 = user.Address.Address2;
                boAddress.City = user.Address.City;
                boAddress.State = user.Address.State;
                boAddress.ZipCode = user.Address.ZipCode;
                boAddress.Country = user.Address.Country;
                boAddress.CreateByUserID = user.Address.CreateByUserID;
                boAddress.CreateDate = user.Address.CreateDate;
                boAddress.ID = user.Address.ID;

                boContactInfo.Name = user.ContactInfo.Name;
                boContactInfo.CellPhone = user.ContactInfo.CellPhone;
                boContactInfo.EmailAddress = user.ContactInfo.EmailAddress;
                boContactInfo.HomePhone = user.ContactInfo.HomePhone;
                boContactInfo.WorkPhone = user.ContactInfo.WorkPhone;
                boContactInfo.FaxNo = user.ContactInfo.FaxNo;
                boContactInfo.CreateByUserID = user.ContactInfo.CreateByUserID;
                boContactInfo.CreateDate = user.ContactInfo.CreateDate;
                boContactInfo.ID = user.ContactInfo.ID;

                boUser.Address = boAddress;
                boUser.Account = boAccount;
                boUser.ContactInfo = boContactInfo;

                return (T)(object)boUser;
            }
            else
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
        }
        #endregion

        #region Delete
        public override Object Delete<T>(T entity)
        {
            BO.Account accountBO = entity as BO.Account;

            Account accountDB = new Account();
            accountDB.ID = accountBO.ID;
            _dbSet.Remove(_context.Accounts.Single<Account>(p=>p.ID==accountBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            res.Message = Constants.AccountDeleted;
            return accountDB;
        }
        #endregion

        #region Save Data
        public override Object Save<T>(T entity) 
        {
            //Utility.ValidateEntityType<T>(typeof(BO.Account));
            BO.Account accountBO = entity as BO.Account;

            Account accountDB = new Account();
            accountDB.Name = accountBO.Name;
            accountDB.ID = accountBO.ID;
            accountDB.Status = System.Convert.ToByte(accountBO.Status);
            //accountDB.AddressId = accountBO.AddressID;
            accountDB.IsDeleted = accountBO.IsDeleted;
            string Message = "";
            if (accountBO.ID > 0)
            {
                accountDB.UpdateDate= DateTime.UtcNow;
                accountDB.UpdateByUserID = accountBO.UpdateByUserID;
                _context.Entry(accountDB).State = System.Data.Entity.EntityState.Modified;
                Message = Constants.AccountUpdated;
            }
            else
            {
                accountDB.CreateDate = DateTime.UtcNow;
                accountDB.CreateByUserID = accountBO.CreateByUserID;
                _dbSet.Add(accountDB);
                Message = Constants.AccountAdded;
            }
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            res.Message = Message;
            res.ID = accountDB.ID;
            return res;
        }
        #endregion

        #region Signup
        public override Object Signup(JObject data)
        {
           
            BO.Account accountBO = data["Account"].ToObject<BO.Account>();
            BO.User userBO = data["User"].ToObject<BO.User>();
            BO.Address addressBO = data["Address"].ToObject<BO.Address>();
            BO.ContactInfo contactinfoBO = data["ContactInfo"].ToObject<BO.ContactInfo>();

            Account accountDB = new Account();
            User userDB = new User();
            Address addressDB = new Address();
            ContactInfo contactinfoDB = new ContactInfo();

            #region Account
            accountDB.Name = accountBO.Name;
            accountDB.ID = accountBO.ID;
            accountDB.Status = System.Convert.ToByte(accountBO.Status);
            accountDB.IsDeleted = accountBO.IsDeleted;
            #endregion

            #region Address
            addressDB.ID = addressBO.ID;
            addressDB.Name = addressBO.Name;
            addressDB.Address1 = addressBO.Address1;
            addressDB.Address2 = addressBO.Address2;
            addressDB.City = addressBO.City;
            addressDB.State = addressBO.State;
            addressDB.ZipCode = addressBO.ZipCode;
            addressDB.Country = addressBO.Country;
            #endregion

            #region Contact Info
            contactinfoDB.ID = contactinfoBO.ID;
            contactinfoDB.Name = contactinfoBO.Name;
            contactinfoDB.CellPhone = contactinfoBO.CellPhone;
            contactinfoDB.EmailAddress = contactinfoBO.EmailAddress;
            contactinfoDB.HomePhone = contactinfoBO.HomePhone;
            contactinfoDB.WorkPhone = contactinfoBO.WorkPhone;
            contactinfoDB.FaxNo = contactinfoBO.FaxNo;
            contactinfoDB.IsDeleted = contactinfoBO.IsDeleted;
            #endregion

            #region User
            userDB.UserName = userBO.UserName;
            userDB.FirstName = userBO.FirstName;
            userDB.LastName = userBO.LastName;
            userDB.Gender = System.Convert.ToByte(userBO.Gender);
            userDB.UserType = System.Convert.ToByte(userBO.UserType);
            userDB.ImageLink = userBO.ImageLink;
            userDB.DateOfBirth = DateTime.UtcNow;
            userDB.Password = userBO.Password;
            userDB.IsDeleted = userBO.IsDeleted;
            userDB.ID = userBO.ID;

            userDB.Account = accountDB;
            userDB.Address = addressDB;
            userDB.ContactInfo = contactinfoDB;
            #endregion

            if (accountBO.ID > 0)
            {
                accountDB.UpdateDate = DateTime.UtcNow;
                accountDB.UpdateByUserID = accountBO.UpdateByUserID;
                _context.Entry(accountDB).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                accountDB.CreateDate = DateTime.UtcNow;
                accountDB.CreateByUserID = accountBO.CreateByUserID;

                userDB.CreateDate = DateTime.UtcNow;
                userDB.CreateByUserID = accountBO.CreateByUserID;

                addressDB.CreateDate = DateTime.UtcNow;
                addressDB.CreateByUserID = accountBO.CreateByUserID;

                contactinfoDB.CreateDate = DateTime.UtcNow;
                contactinfoDB.CreateByUserID = accountBO.CreateByUserID;

                _dbuser.Add(userDB);
            }
            _context.SaveChanges();
            BO.User acc_ = Convert<BO.User, User>(userDB);
            var res = (BO.GbObject)(object)acc_;
            //res.Data = new JavaScriptSerializer().Serialize(userDB);
            return (object)res;
        }
        #endregion

        #region Get Account By ID
        public override T Get<T>(T entity)
        {
            BO.Account acc_ = Convert<BO.Account, Account>(_context.Accounts.Find(((BO.GbObject)(object)entity).ID));
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
            IQueryable<Account> query = EntitySearch.CreateSearchQuery<Account>(_context.Accounts, searchParameters, filterMap);
            List<Account> accounts = query.ToList<Account>();
            List<T> boAccounts = new List<T>();
            accounts.ForEach(t => boAccounts.Add(Convert<T, Account>(t)));
            return boAccounts;
        }
        #endregion
    }
}
