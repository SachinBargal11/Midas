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
using GBBusinessObjects;
#endregion

namespace Midas.GreenBill.EntityRepository
{
    internal class AccountRepository : BaseEntityRepo
    {
        private DbSet<Account> _dbSet;
        private DbSet<User> _dbuser;
        private UserRepository repoUser;
        private MedicalFacilityRepository repoMed;

        #region Constructor
        public AccountRepository(GreenBillsDbEntities context) : base(context)
        {
            _dbSet = context.Set<Account>();
            _dbuser = context.Set<User>();
            repoUser = new EntityRepository.UserRepository(context);
            repoMed = new EntityRepository.MedicalFacilityRepository(context);
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

                boUser.UserName = user.UserName;
                boUser.ID = user.ID;
                boUser.FirstName = user.FirstName;
                boUser.LastName = user.LastName;
                boUser.ImageLink = user.ImageLink;

                boUser.UserType = (BO.GBEnums.UserType)user.UserType;
                boUser.Gender = (BO.GBEnums.Gender)user.Gender;

                boUser.CreateByUserID = user.CreateByUserID;
                boUser.CreateDate = user.CreateDate;

                if (user.DateOfBirth.HasValue)
                    boUser.DateOfBirth = user.DateOfBirth.Value;
                if (user.IsDeleted.HasValue)
                    boUser.IsDeleted = System.Convert.ToBoolean(user.IsDeleted.Value);
                if (user.UpdateByUserID.HasValue)
                    boUser.UpdateByUserID = user.UpdateByUserID.Value;
                if (user.UpdateDate.HasValue)
                    boUser.UpdateDate = user.UpdateDate.Value;

                if (user.Account != null)
                {
                    BO.Account boAccount = new BO.Account();
                    boAccount.Name = user.Account.Name;
                    boAccount.Status = (BO.GBEnums.AccountStatus)user.Account.Status;
                    boAccount.CreateByUserID = user.Account.CreateByUserID;
                    boAccount.CreateDate = user.Account.CreateDate;
                    boAccount.ID = user.Account.ID;
                    boUser.Account = boAccount;
                }

                if (user.Address != null)
                {
                    BO.Address boAddress = new BO.Address();
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
                }

                if (user.ContactInfo != null)
                {
                    BO.ContactInfo boContactInfo = new BO.ContactInfo();
                    boContactInfo.Name = user.ContactInfo.Name;
                    boContactInfo.CellPhone = user.ContactInfo.CellPhone;
                    boContactInfo.EmailAddress = user.ContactInfo.EmailAddress;
                    boContactInfo.HomePhone = user.ContactInfo.HomePhone;
                    boContactInfo.WorkPhone = user.ContactInfo.WorkPhone;
                    boContactInfo.FaxNo = user.ContactInfo.FaxNo;
                    boContactInfo.CreateByUserID = user.ContactInfo.CreateByUserID;
                    boContactInfo.CreateDate = user.ContactInfo.CreateDate;
                    boContactInfo.ID = user.ContactInfo.ID;
                    boUser.ContactInfo = boContactInfo;
                }

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

                List<BO.User> users = new List<BO.User>();
                foreach (var item in account.Users)
                {
                    users.Add(repoUser.Convert<BO.User, User>(item));
                }
                boAccount.Users = users;

                List<BO.MedicalFacility> medicalfacilities = new List<BO.MedicalFacility>();
                foreach (var item in account.MedicalFacilities)
                {
                    medicalfacilities.Add(repoMed.Convert<BO.MedicalFacility, MedicalFacility>(item));
                }
                boAccount.MedicalFacilities = medicalfacilities;

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
            return accountDB;
        }
        #endregion

        #region Save Data
        public override object Save(JObject data)
        {
            return base.Save(data);
        }
        #endregion

        #region Signup
        public override Object Signup(JObject data)
        {
           
            BO.Address addressBO;
            BO.ContactInfo contactinfoBO;

            BO.Account accountBO = data["account"].ToObject<BO.Account>();
            BO.User userBO = data["user"].ToObject<BO.User>();

            addressBO = data["address"]==null?new BO.Address():data["address"].ToObject<BO.Address>();
            contactinfoBO = data["contactInfo"] == null ? new BO.ContactInfo() : data["contactInfo"].ToObject<BO.ContactInfo>();

            Account accountDB = new Account();
            User userDB = new User();
            Address addressDB = new Address();
            ContactInfo contactinfoDB = new ContactInfo();

            if (_context.Accounts.Any(o => o.Name == accountBO.Name))
            {
                return new BO.GbObject { Message = Constants.AccountAlreadyExists };
            }

            #region Account
            accountDB.Name = accountBO.Name;
            accountDB.ID = accountBO.ID;
            accountDB.Status = System.Convert.ToByte(accountBO.Status);
            if(accountBO.IsDeleted.HasValue)
            accountDB.IsDeleted = accountBO.IsDeleted.Value;
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
            if (contactinfoBO.IsDeleted.HasValue)
                contactinfoDB.IsDeleted = contactinfoBO.IsDeleted;
            #endregion

            #region User
            userDB.UserName = userBO.UserName;
            userDB.FirstName = userBO.FirstName;
            userDB.LastName = userBO.LastName;
            userDB.Gender = System.Convert.ToByte(userBO.Gender);
            userDB.UserType = System.Convert.ToByte(userBO.UserType);
            userDB.ImageLink = userBO.ImageLink;
            if (userBO.DateOfBirth.HasValue)
                userDB.DateOfBirth = userBO.DateOfBirth.Value;
            userDB.Password = userBO.Password;

            if (userBO.IsDeleted.HasValue)
                userDB.IsDeleted = userBO.IsDeleted.Value;

            userDB.Account = accountDB;
            userDB.Address = addressDB;
            userDB.ContactInfo = contactinfoDB;
            #endregion


            if (accountDB.ID > 0)
            {
                //Find User By ID
                User usr = _context.Users.Include("Account").Include("Address").Include("ContactInfo").Where(p => p.AccountID == accountBO.ID).FirstOrDefault<User>();

                if(usr!=null)
                {

                    #region Account
                    usr.Account.CreateByUserID= usr.CreateByUserID;
                    usr.Account.CreateDate = usr.CreateDate;

                    if (userBO.UpdateByUserID.HasValue)
                        usr.Account.UpdateByUserID = usr.UpdateByUserID.Value;
                    usr.Account.UpdateDate = DateTime.UtcNow;
                    usr.Account.Status = System.Convert.ToByte(accountBO.Status);
                    #endregion

                    #region User
                    usr.CreateByUserID = usr.CreateByUserID;
                    usr.CreateDate = usr.CreateDate;

                    if (userBO.UpdateByUserID.HasValue)
                        usr.UpdateByUserID = userBO.UpdateByUserID.Value;
                    usr.UpdateDate = DateTime.UtcNow;
                    usr.IsDeleted = userBO.IsDeleted;
                    usr.UserName = userBO.UserName;
                    usr.FirstName = userBO.FirstName;
                    usr.LastName = userBO.LastName;
                    usr.Gender = System.Convert.ToByte(userBO.Gender);
                    usr.UserType = System.Convert.ToByte(userBO.UserType);
                    usr.ImageLink = userBO.ImageLink;
                    usr.DateOfBirth = userBO.DateOfBirth;
                    usr.Password = userBO.Password;
                    usr.IsDeleted = userBO.IsDeleted;
                    #endregion

                    #region Address
                    usr.Address.CreateByUserID = usr.CreateByUserID;
                    usr.Address.CreateDate = usr.CreateDate;
                    if (userBO.UpdateByUserID.HasValue)
                        usr.Address.UpdateByUserID = userBO.UpdateByUserID.Value;
                    usr.Address.UpdateDate = DateTime.UtcNow;
                    usr.Address.Name = addressBO.Name;
                    usr.Address.Address1 = addressBO.Address1;
                    usr.Address.Address2 = addressBO.Address2;
                    usr.Address.City = addressBO.City;
                    usr.Address.State = addressBO.State;
                    usr.Address.ZipCode = addressBO.ZipCode;
                    usr.Address.Country = addressBO.Country;
                    #endregion

                    #region Contact Info
                    usr.ContactInfo.CreateByUserID = usr.CreateByUserID;
                    usr.ContactInfo.CreateDate = usr.CreateDate;
                    if (userBO.UpdateByUserID.HasValue)
                        usr.ContactInfo.UpdateByUserID = userBO.UpdateByUserID.Value;
                    usr.ContactInfo.UpdateDate = DateTime.UtcNow;
                    usr.ContactInfo.Name = contactinfoBO.Name;
                    usr.ContactInfo.CellPhone = contactinfoBO.CellPhone;
                    usr.ContactInfo.EmailAddress = contactinfoBO.EmailAddress;
                    usr.ContactInfo.HomePhone = contactinfoBO.HomePhone;
                    usr.ContactInfo.WorkPhone = contactinfoBO.WorkPhone;
                    usr.ContactInfo.FaxNo = contactinfoBO.FaxNo;
                    #endregion
                }
                else
                {
                    throw new GbException(string.Format("No account for AccoudID {0}", accountDB.ID));
                }
                _context.Entry(usr).State = System.Data.Entity.EntityState.Modified;
                userDB = usr;
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
            try
            {
                #region Send Email
                string Message = "Dear "+ userBO.FirstName+ ","+Environment.NewLine+"Your user name is:- "+userBO.UserName+""+Environment.NewLine+"Password:-"+userDB.Password+Environment.NewLine+"Thanks";
                Utility.SendEmail(Message,"Account registered", userBO.UserName);
                acc_.Message = "Mail sent";
                #endregion
            }
            catch (Exception ex)
            {
                acc_.Message = "Unable to send email.";
            }

            var res = (BO.GbObject)(object)acc_;
            return (object)res;
        }
        #endregion

        #region Get Account By ID
        public override Object Get(int id)
        {
            BO.Account acc_ = Convert<BO.Account, Account>(_context.Accounts.Include("Users").Include("MedicalFacilities").Where(p => p.ID == id).FirstOrDefault<Account>());
            return (object)acc_;
        }
        #endregion

        //#region Get Account By Name
        //public override List<T> Get<T>(T entity, string name)
        //{
        //    List<EntitySearchParameter> searchParameters = new List<EntitySearchParameter>();
        //    EntitySearchParameter param = new EntitySearchParameter();
        //    param.name = name;
        //    searchParameters.Add(param);

        //    return Get<T>(entity, searchParameters);
        //}
        //#endregion

        #region Get User By Search Parameters
        public override Object Get(JObject data)
        {
            List<BO.Account> userBO;
            userBO = data != null ? (data["account"] != null ? data["provider"].ToObject<List<BO.Account>>() : new List<BO.Account>()) : new List<BO.Account>();

            List<EntitySearchParameter> searchParameters = new List<EntityRepository.EntitySearchParameter>();
            foreach (BO.Account item in userBO)
            {
                EntitySearchParameter param = new EntityRepository.EntitySearchParameter();
                param.id = item.ID;
                searchParameters.Add(param);
            }


            Dictionary<Type, String> filterMap = new Dictionary<Type, string>();
            filterMap.Add(typeof(BO.Account), "");
            IQueryable<Account> query = EntitySearch.CreateSearchQuery<Account>(_context.Accounts, searchParameters, filterMap);
            List<Account> Users = query.ToList<Account>();

            return (object)Users;
        }
        #endregion
    }
}
