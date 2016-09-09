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
            return addressDB;
        }
        #endregion

        public override object Save(JObject data)
        {
            return base.Save(data);
        }

        #region Get Address By ID
        public override Object Get(int id)
        {
            BO.Address acc_ = Convert<BO.Address, Address>(_context.Addresses.Find(id));
            return (object)acc_;
        }
        #endregion


        //#region Get Address By Name
        //public override List<T> Get<T>(T entity, string name)
        //{
        //    List<EntitySearchParameter> searchParameters = new List<EntitySearchParameter>();
        //    EntitySearchParameter param = new EntitySearchParameter();
        //    param.name = name;
        //    searchParameters.Add(param);

        //    return Get<T>(entity, searchParameters);
        //}
        //#endregion

        //#region Get Address By Search Parameters
        //public override List<T> Get<T>(T entity, List<EntitySearchParameter> searchParameters)
        //{
        //    Dictionary<Type, String> filterMap = new Dictionary<Type, string>();
        //    filterMap.Add(typeof(BO.Address), "");
        //    IQueryable<Address> query = EntitySearch.CreateSearchQuery<Address>(_context.Addresses, searchParameters, filterMap);
        //    List<Address> addresses = query.ToList<Address>();
        //    List<T> boAddress = new List<T>();
        //    addresses.ForEach(t => boAddress.Add(Convert<T, Address>(t)));
        //    return boAddress;
        //}
        //#endregion
    }
}
