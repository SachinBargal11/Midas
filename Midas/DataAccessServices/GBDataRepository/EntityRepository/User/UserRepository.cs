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

<<<<<<< HEAD
        #region Entity Conversion
        public override T Convert<T, U>(U entity)
=======
        public override Object Save<T>(T entity)
>>>>>>> master
        {
            User user = entity as User;
            if (user == null)
                return default(T);

            BO.User boUser = new BO.User();

            boUser.ID = user.ID;
            boUser.UserName = user.UserName;

            //boUser.Owner = new UserRepository(_context).Convert<BO.User,User1>(User.Owner)
            return (T)(object)boUser;
        }
        #endregion

        #region Save Data
        public override Object Save<T>(T entity)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region Get User By ID
        public override T Get<T>(T entity, int id)
        {
            BO.User acc_ = Convert<BO.User, User>(_context.User.Find(id));
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
            IQueryable<User> query = EntitySearch.CreateSearchQuery<User>(_context.User, searchParameters, filterMap);
            List<User> Users = query.ToList<User>();
            List<T> boUsers = new List<T>();
            Users.ForEach(t => boUsers.Add(Convert<T, User>(t)));
            return boUsers;
        }
        #endregion
    }
}
