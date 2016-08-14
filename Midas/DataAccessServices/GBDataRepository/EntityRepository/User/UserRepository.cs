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
    internal class UserRepository : BaseEntityRepo
    {
        private DbSet<User> _dbSet;

        #region Constructor
        public UserRepository(GreenBillsDbEntities context) : base(context)
        {
            _dbSet = context.Set<User>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
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
            boUser.Gender = (BO.GBEnums.Gender)user.UserType;
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
                boUser.Address = boAddress;
            }

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
        #endregion

        #region Delete
        public override Object Delete<T>(T entity)
        {
            BO.User userBO = entity as BO.User;

            User userDB = new User();
            userDB.ID = userBO.ID;
            _dbSet.Remove(_context.Users.Single<User>(p => p.ID == userBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return userDB;
        }
        #endregion

        #region Save Data
        public override Object Save(JObject data)
        {
            BO.Address addressBO;
            BO.ContactInfo contactinfoBO;
            BO.Account accountBO;

            BO.User userBO = data["user"].ToObject<BO.User>();

            addressBO = data["address"] == null ? new BO.Address() : data["address"].ToObject<BO.Address>();
            contactinfoBO = data["contactinfo"] == null ? new BO.ContactInfo() : data["contactinfo"].ToObject<BO.ContactInfo>();

            Account accountDB = new Account();
            User userDB = new User();
            Address addressDB = new Address();
            ContactInfo contactinfoDB = new ContactInfo();

            if (_context.Users.Any(o => o.UserName == userBO.UserName))
            {
                return new BO.GbObject { Message = Constants.UserAlreadyExists};
            }

            if (data["account"] != null)
            {
                accountBO=data["account"].ToObject<BO.Account>();

                #region Account
                accountDB.Name = accountBO.Name;
                accountDB.ID = accountBO.ID;
                accountDB.Status = System.Convert.ToByte(accountBO.Status);
                accountDB.IsDeleted = accountBO.IsDeleted;
                #endregion

                userDB.Account = accountDB;
            }

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
            if (userBO.DateOfBirth.HasValue)
                userDB.DateOfBirth = userBO.DateOfBirth.Value;
            userDB.Password = userBO.Password;

            if (userBO.IsDeleted.HasValue)
                userDB.IsDeleted = userBO.IsDeleted.Value;

            userDB.Address = addressDB;
            userDB.ContactInfo = contactinfoDB;
            #endregion

            Account acct = _context.Accounts.Where(p => p.ID == accountDB.ID).FirstOrDefault<Account>(); // Functionally not required
            if (acct != null)
                userDB.AccountID = acct.ID;

            if (userDB.ID > 0)
            {
                //Find User By ID
                User usr = userDB.AccountID>0?_context.Users.Include("Address").Include("Account").Include("ContactInfo").Where(p => p.ID == userDB.ID).FirstOrDefault<User>():_context.Users.Include("Address").Include("ContactInfo").Where(p => p.ID == userDB.ID).FirstOrDefault<User>();

                if (usr != null)
                {
                    #region User
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

                    if(userDB.AccountID>0)
                    {
                        usr.AccountID = userDB.AccountID;
                    }
                }
                else
                {
                    throw new GbException();
                }
                _context.Entry(usr).State = System.Data.Entity.EntityState.Modified;
                userDB = usr;
            }
            else
            {
                userDB.CreateDate = DateTime.UtcNow;
                userDB.CreateByUserID = userBO.CreateByUserID;

                addressDB.CreateDate = DateTime.UtcNow;
                addressDB.CreateByUserID = userBO.CreateByUserID;

                contactinfoDB.CreateDate = DateTime.UtcNow;
                contactinfoDB.CreateByUserID = userBO.CreateByUserID;

                _dbSet.Add(userDB);
            }

            _context.SaveChanges();
            BO.User acc_ = Convert<BO.User, User>(userDB);
            try
            {
                #region Send Email
                string Message = "Dear " + userBO.FirstName + "," + Environment.NewLine + "Your user name is:- " + userBO.UserName + "" + Environment.NewLine + "Password:-" + userDB.Password + Environment.NewLine + "Thanks";
                Utility.SendEmail(Message, "User registered", userBO.UserName);
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

        #region Get User By ID
        public override T Get<T>(T entity)
        {
            BO.User acc_ = Convert<BO.User, User>(_context.Users.Include("Address").Include("ContactInfo").Where(p => p.ID == ((BO.GbObject)(object)entity).ID).FirstOrDefault<User>());
            return (T)(object)acc_;
        }
        #endregion

        #region Login
        public override Object Login(JObject entity)
        {
            BO.User userBO = entity["user"].ToObject<BO.User>();
            string Pass = userBO.Password;
            dynamic data = _context.Users.Where(x => x.UserName == userBO.UserName && x.Password == Pass).FirstOrDefault();
            BO.User acc_ = Convert<BO.User, User>(data);

            //return acc_ != null ? (object)acc_ : new BO.GbObject { Message = Constants.InvalidCredentials };
            return acc_;
        }
        #endregion

        //#region Get User By Name
        //public override Object Get(JObject entity, string name)
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
            List<BO.User> userBO = data["user"].ToObject<List<BO.User>>();

            List<EntitySearchParameter> searchParameters = new List<EntityRepository.EntitySearchParameter>();
            foreach (BO.User item in userBO)
            {
                EntitySearchParameter param = new EntityRepository.EntitySearchParameter();
                param.id = item.ID;
                param.name = item.FirstName;
                searchParameters.Add(param);
            }


            Dictionary<Type, String> filterMap = new Dictionary<Type, string>();
            filterMap.Add(typeof(BO.User), "");
            IQueryable<User> query = EntitySearch.CreateSearchQuery<User>(_context.Users, searchParameters, filterMap);
            List<User> Users = query.ToList<User>();

            return (object)Users;
        }
        #endregion
    }
}
