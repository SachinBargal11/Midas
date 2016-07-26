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

            boUser.ID = user.ID;
            boUser.UserName = user.UserName;
            //boUser.AccountID = user.AccountID.Value;
            boUser.UserName = user.UserName;
            boUser.FirstName = user.FirstName;
            //boUser.MiddleName = user.MiddleName;
            boUser.LastName = user.LastName;
            boUser.ImageLink = user.ImageLink;
            //boUser.AddressID = user.AddressId.Value;
           // boUser.ContactInfoID = user.ID.Value;
            boUser.DateOfBirth = user.DateOfBirth.Value;
            boUser.Password = user.Password;
            boUser.IsDeleted =System.Convert.ToBoolean(user.IsDeleted);
            boUser.DateOfBirth = user.DateOfBirth.Value;

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
            res.Message = Constants.UserDeleted;
            return userDB;
        }
        #endregion

        #region Save Data
        public override Object Save<T>(T entity)
        {
            BO.User userBO = entity as BO.User;

            User userDB = new User();
            //userDB.AccountID = userBO.AccountID;
            userDB.UserName = userBO.UserName;
            userDB.FirstName = userBO.FirstName;
            //userDB.MiddleName = userBO.MiddleName;
            userDB.LastName = userBO.LastName;
            userDB.Gender = System.Convert.ToByte(userBO.Gender);
            userDB.UserType = System.Convert.ToByte(userBO.UserType);
            userDB.ImageLink = userBO.ImageLink;
            //userDB.AddressId = userBO.AddressID;
            //userDB.ContactInfoId = userBO.ContactInfoID;
            userDB.DateOfBirth = DateTime.UtcNow;
            userDB.Password = userBO.Password;
            userDB.IsDeleted = userBO.IsDeleted;
            userDB.ID = userBO.ID;
            string Message = "";
            if (userDB.ID > 0)
            {
                userDB.UpdateDate = DateTime.UtcNow;
                userDB.UpdateByUserID = userBO.UpdateByUserID;
                userDB.CreateDate = DateTime.UtcNow;
                _context.Entry(userDB).State = System.Data.Entity.EntityState.Modified;
                Message = Constants.UserUpdated;
            }
            else
            {
                userDB.CreateDate = DateTime.UtcNow;
                userDB.CreateByUserID = userBO.CreateByUserID;
                _dbSet.Add(userDB);
                Message = Constants.UserAdded;
            }

            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            res.Message = Message;
            res.ID = userDB.ID;

            return res;
        }
        #endregion

        #region Get User By ID
        public override T Get<T>(T entity)
        {
            BO.User acc_ = Convert<BO.User, User>(_context.Users.Find(((BO.GbObject)(object)entity).ID));
            return (T)(object)acc_;
        }
        #endregion

        #region Login
        public override T Login<T>(T entity, string userName, string Password)
        {
            dynamic data = _context.Users.Where(x => x.UserName == userName && x.Password == Password).FirstOrDefault();
            BO.User acc_ = Convert<BO.User, User>(data);
            return (T)(object)acc_;
        }
        #endregion

        #region Get User By Name
        public override List<T> Get<T>(T entity, string name)
        {
            List<EntitySearchParameter> searchParameters = new List<EntitySearchParameter>();
            EntitySearchParameter param = new EntitySearchParameter();
            param.name = name;
            searchParameters.Add(param);

            return Get<T>(entity, searchParameters);
        }
        #endregion

        #region Get User By Search Parameters
        public override List<T> Get<T>(T entity, List<EntitySearchParameter> searchParameters)
        {
            Dictionary<Type, String> filterMap = new Dictionary<Type, string>();
            filterMap.Add(typeof(BO.User), "");
            IQueryable<User> query = EntitySearch.CreateSearchQuery<User>(_context.Users, searchParameters, filterMap);
            List<User> Users = query.ToList<User>();
            List<T> boUsers = new List<T>();
            Users.ForEach(t => boUsers.Add(Convert<T, User>(t)));
            return boUsers;
        }
        #endregion
    }
}
