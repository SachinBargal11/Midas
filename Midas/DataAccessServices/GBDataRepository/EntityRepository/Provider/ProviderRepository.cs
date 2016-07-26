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
            res.Message = Constants.ProviderDeleted;
            return contactinfoDB;
        }
        #endregion

        #region Save Data
        public override Object Save<T>(T entity)
        {
            BO.Provider providerBO = entity as BO.Provider;

            Provider providerDB = new Provider();
            providerDB.ID = providerBO.ID;
            providerDB.NPI = providerBO.NPI;
            providerDB.FederalTaxId = providerBO.FederalTaxId;
            providerDB.Prefix = providerBO.Prefix;

            string Message = "";
            if (providerDB.ID > 0)
            {
                providerDB.UpdateDate = DateTime.UtcNow;
                providerDB.CreateDate = DateTime.UtcNow;
                providerDB.UpdateByUserID = providerBO.UpdateByUserID;
                _context.Entry(providerDB).State = System.Data.Entity.EntityState.Modified;
                Message = Constants.ProviderUpdated;
            }
            else
            {
                providerDB.CreateDate = DateTime.UtcNow;
                providerDB.CreateByUserID = providerBO.CreateByUserID;
                _dbSet.Add(providerDB);
                Message = Constants.AccountAdded;
            }

            var res = (BO.GbObject)(object)entity;
            res.Message = Message;
            res.ID = providerDB.ID;

            _context.SaveChanges();
            return res;
        }
        #endregion

        #region Get Provider By ID
        public override T Get<T>(T entity)
        {
            BO.Provider acc_ = Convert<BO.Provider, Provider>(_context.Providers.Find(((BO.GbObject)(object)entity).ID));
            return (T)(object)acc_;
        }
        #endregion


        #region Get Provider By Name
        public override List<T> Get<T>(T entity, string name)
        {
            List<EntitySearchParameter> searchParameters = new List<EntitySearchParameter>();
            EntitySearchParameter param = new EntitySearchParameter();
            param.name = name;
            searchParameters.Add(param);

            return Get<T>(entity, searchParameters);
        }
        #endregion

        #region Get Provider By Search Parameters
        public override List<T> Get<T>(T entity, List<EntitySearchParameter> searchParameters)
        {
            Dictionary<Type, String> filterMap = new Dictionary<Type, string>();
            filterMap.Add(typeof(BO.Provider), "");
            IQueryable<Provider> query = EntitySearch.CreateSearchQuery<Provider>(_context.Providers, searchParameters, filterMap);
            List<Provider> contactinfoes = query.ToList<Provider>();
            List<T> boProvider = new List<T>();
            contactinfoes.ForEach(t => boProvider.Add(Convert<T, Provider>(t)));
            return boProvider;
        }
        #endregion
    }
}
