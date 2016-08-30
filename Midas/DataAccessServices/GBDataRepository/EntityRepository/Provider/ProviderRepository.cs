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
    internal class ProviderRepository : BaseEntityRepo
    {
        private DbSet<Provider> _dbSet;

        #region Constructor
        public ProviderRepository(GreenBillsDbEntities context) : base(context)
        {
            _dbSet = context.Set<Provider>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Provider provider = entity as Provider;
            if (provider == null)
                return default(T);

            BO.Provider boProvider = new BO.Provider();

            boProvider.ID = provider.ID;
            boProvider.NPI = provider.NPI;
            boProvider.FederalTaxId = provider.FederalTaxId;
            boProvider.Prefix = provider.Prefix;

            if (provider.UpdateByUserID.HasValue)
                boProvider.UpdateByUserID = provider.UpdateByUserID.Value;
            if (provider.UpdateDate.HasValue)
                boProvider.UpdateDate = provider.UpdateDate.Value;

            boProvider.CreateByUserID = provider.CreateByUserID;
            boProvider.CreateDate = provider.CreateDate;

            return (T)(object)boProvider;
        }
        #endregion

        #region Delete
        public override Object Delete<T>(T entity)
        {
            BO.Provider contactinfoBO = entity as BO.Provider;

            Provider contactinfoDB = new Provider();
            contactinfoDB.ID = contactinfoBO.ID;
            _dbSet.Remove(_context.Providers.Single<Provider>(p => p.ID == contactinfoBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return contactinfoDB;
        }
        #endregion

        #region Save Data
        //public override Object Save<T>(T entity)
        //{
        //    BO.Provider providerBO = entity as BO.Provider;

        //    Provider providerDB = new Provider();
        //    providerDB.ID = providerBO.ID;
        //    providerDB.NPI = providerBO.NPI;
        //    providerDB.FederalTaxId = providerBO.FederalTaxId;
        //    providerDB.Prefix = providerBO.Prefix;

        //    string Message = "";
        //    if (providerDB.ID > 0)
        //    {
        //        providerDB.UpdateDate = DateTime.UtcNow;
        //        providerDB.CreateDate = DateTime.UtcNow;
        //        providerDB.UpdateByUserID = providerBO.UpdateByUserID;
        //        _context.Entry(providerDB).State = System.Data.Entity.EntityState.Modified;
        //        Message = Constants.ProviderUpdated;
        //    }
        //    else
        //    {
        //        providerDB.CreateDate = DateTime.UtcNow;
        //        providerDB.CreateByUserID = providerBO.CreateByUserID;
        //        _dbSet.Add(providerDB);
        //        Message = Constants.AccountAdded;
        //    }

        //    var res = (BO.GbObject)(object)entity;
        //    res.Message = Message;
        //    res.ID = providerDB.ID;

        //    _context.SaveChanges();
        //    return res;
        //}
        public override object Save(JObject data)
        {
            BO.Provider providerBO = data["provider"].ToObject<BO.Provider>();

            Provider providerDB = new Provider();
            providerDB.Name = providerBO.Name;
            providerDB.ID = providerBO.ID;
            providerDB.NPI = providerBO.NPI;
            providerDB.FederalTaxId = providerBO.FederalTaxId;
            providerDB.Prefix = providerBO.Prefix;


            if (_context.Providers.Any(o => o.Name == providerBO.Name))
            {
                return new BO.GbObject { Message = Constants.ProviderAlreadyExists };
            }

            if (providerDB.ID > 0)
            {
                //Find provider By ID
                Provider usr = _context.Providers.Where(p => p.ID == providerBO.ID).FirstOrDefault<Provider>();

                if (usr != null)
                {
                    usr.NPI = providerBO.NPI;
                    usr.FederalTaxId = providerBO.FederalTaxId;
                    usr.Prefix = providerBO.Prefix;
                    usr.UpdateByUserID = providerBO.UpdateByUserID;
                    usr.UpdateDate = DateTime.UtcNow;
                }
                _context.Entry(usr).State = System.Data.Entity.EntityState.Modified;
                providerDB = usr;
            }
            else
            {
                providerDB.CreateDate = DateTime.UtcNow;
                providerDB.CreateByUserID = providerBO.CreateByUserID;
                _dbSet.Add(providerDB);
            }

            _context.SaveChanges();
            BO.Provider acc_ = Convert<BO.Provider, Provider>(providerDB);
            var res = (BO.GbObject)(object)acc_;
            return (object)res;
        }
        #endregion

        #region Get Provider By ID
        public override Object Get(int id)
        {
            BO.Provider acc_ = Convert<BO.Provider, Provider>(_context.Providers.Find(id));
            return (object)acc_;
        }
        #endregion


        //#region Get Provider By Name
        //public override List<T> Get<T>(T entity, string name)
        //{
        //    List<EntitySearchParameter> searchParameters = new List<EntitySearchParameter>();
        //    EntitySearchParameter param = new EntitySearchParameter();
        //    param.name = name;
        //    searchParameters.Add(param);

        //    return Get<T>(entity, searchParameters);
        //}
        //#endregion

        #region Get Provider By Search Parameters
        public override Object Get(JObject data)
        {
            List<BO.Provider> userBO;
            userBO = data != null ? (data["provider"] != null ? data["provider"].ToObject<List<BO.Provider>>() : new List<BO.Provider>()) : new List<BO.Provider>();

            List<EntitySearchParameter> searchParameters = new List<EntityRepository.EntitySearchParameter>();
            foreach (BO.Provider item in userBO)
            {
                EntitySearchParameter param = new EntityRepository.EntitySearchParameter();
                param.id = item.ID;
                param.name = item.Name;
                searchParameters.Add(param);
            }

            Dictionary<Type, String> filterMap = new Dictionary<Type, string>();
            filterMap.Add(typeof(BO.Provider), "");
            IQueryable<Provider> query = EntitySearch.CreateSearchQuery<Provider>(_context.Providers, searchParameters, filterMap);
            List<Provider> Users = query.ToList<Provider>();

            return (object)Users;
        }
        #endregion
    }
}
