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
    internal class AddressRepository : BaseEntityRepo
    {
        private DbSet<Address> _dbSet;

        #region Constructor
        public AddressRepository(GreenBillsDbEntities context) : base(context)
        {
            _dbSet = context.Set<Address>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Address address = entity as Address;
            if (address == null)
                return default(T);

            BO.Address boAddress = new BO.Address();

            boAddress.ID = address.ID;
            boAddress.Name = address.Name;
            boAddress.Address1 = address.Address1;
            boAddress.Address2 = address.Address2;
            boAddress.City = address.City;
            boAddress.State = address.State;
            boAddress.ZipCode = address.ZipCode;
            boAddress.Country = address.Country;

            return (T)(object)boAddress;
        }
        #endregion

        #region Delete
        public override Object Delete<T>(T entity)
        {
            BO.Address addressBO = entity as BO.Address;

            Address addressDB = new Address();
            addressDB.ID = addressBO.ID;
            _dbSet.Remove(_context.Addresses.Single<Address>(p => p.ID == addressBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            res.Message = Constants.AddressDeleted;
            return addressDB;
        }
        #endregion

        #region Save Data
        public override Object Save<T>(T entity)
        {
            BO.Address addressBO = entity as BO.Address;

            Address addressDB = new Address();
            addressDB.ID = addressBO.ID;
            addressDB.Name = addressBO.Name;
            addressDB.Address1 = addressBO.Address1;
            addressDB.Address2 = addressBO.Address2;
            addressDB.City = addressBO.City;
            addressDB.State = addressBO.State;
            addressDB.ZipCode = addressBO.ZipCode;
            addressDB.Country = addressBO.Country;

            addressDB.IsDeleted = addressBO.IsDeleted;
            string Message = "";
            if (addressDB.ID > 0)
            {
                addressDB.UpdateDate = DateTime.UtcNow;
                addressDB.CreateDate = DateTime.UtcNow;
                addressDB.UpdateByUserID = addressBO.UpdateByUserID;
                _context.Entry(addressDB).State = System.Data.Entity.EntityState.Modified;
                Message = Constants.AddressUpdated;
            }
            else
            {
                addressDB.CreateDate = DateTime.UtcNow;
                addressDB.CreateByUserID = addressBO.CreateByUserID;
                _dbSet.Add(addressDB);
                Message = Constants.AddressAdded;
            }
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            res.Message = Message;
            res.ID = addressDB.ID;


            return res;
        }
        #endregion

        #region Get Address By ID
        public override T Get<T>(T entity)
        {
            BO.Address acc_ = Convert<BO.Address, Address>(_context.Addresses.Find(((BO.GbObject)(object)entity).ID));
            return (T)(object)acc_;
        }
        #endregion


        #region Get Address By Name
        public override List<T> Get<T>(T entity, string name)
        {
            List<EntitySearchParameter> searchParameters = new List<EntitySearchParameter>();
            EntitySearchParameter param = new EntitySearchParameter();
            param.name = name;
            searchParameters.Add(param);

            return Get<T>(entity, searchParameters);
        }
        #endregion

        #region Get Address By Search Parameters
        public override List<T> Get<T>(T entity, List<EntitySearchParameter> searchParameters)
        {
            Dictionary<Type, String> filterMap = new Dictionary<Type, string>();
            filterMap.Add(typeof(BO.Address), "");
            IQueryable<Address> query = EntitySearch.CreateSearchQuery<Address>(_context.Addresses, searchParameters, filterMap);
            List<Address> addresses = query.ToList<Address>();
            List<T> boAddress = new List<T>();
            addresses.ForEach(t => boAddress.Add(Convert<T, Address>(t)));
            return boAddress;
        }
        #endregion
    }
}
