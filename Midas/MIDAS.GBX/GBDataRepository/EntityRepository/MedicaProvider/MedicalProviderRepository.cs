using MIDAS.GBX.Common;
using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EN;
using MIDAS.GBX.EntityRepository;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class MedicalProviderRepository : BaseEntityRepo
    {
        private DbSet<MedicalProvider> _dbSet;

        #region Constructor
        public MedicalProviderRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<MedicalProvider>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            MedicalProvider provider = entity as MedicalProvider;

            if (provider == null)
                return default(T);

            BO.MedicalProvider providerBO = new BO.MedicalProvider();

            providerBO.ID = provider.id;
            providerBO.Name = provider.Name;
            providerBO.NPI = provider.NPI;
            if (provider.IsDeleted.HasValue)
                providerBO.IsDeleted = provider.IsDeleted.Value;
            if (provider.UpdateByUserID.HasValue)
                providerBO.UpdateByUserID = provider.UpdateByUserID.Value;

            BO.Company boCompany = new BO.Company();
            boCompany.ID = provider.Company.id;
            providerBO.company = boCompany;

            return (T)(object)providerBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.MedicalProvider saveProvider= (BO.MedicalProvider)(object)entity;
            var result = saveProvider.Validate(saveProvider);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.MedicalProvider medicalProviderBO = (BO.MedicalProvider)(object)entity;

            if (medicalProviderBO.company == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Company object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            BO.Company companyBO = medicalProviderBO.company;
            Company companyDB = new Company();
            MedicalProvider medicalProviderDB = new MedicalProvider();

            #region Medical Provider
            medicalProviderDB.id = medicalProviderBO.ID;
            medicalProviderDB.Name = medicalProviderBO.Name;
            medicalProviderDB.NPI = medicalProviderBO.NPI;
            medicalProviderDB.IsDeleted = medicalProviderBO.IsDeleted.HasValue ? medicalProviderBO.IsDeleted : false;
            #endregion

            #region Company
            if (companyBO.ID > 0)
            {
                Company company = _context.Companies.Where(p => p.id == companyBO.ID).FirstOrDefault<Company>();
                if (company != null)
                {
                    medicalProviderDB.Company = company;
                    _context.Entry(company).State = System.Data.Entity.EntityState.Modified;
                }
                else
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Company details.", ErrorLevel = ErrorLevel.Error };
            }
            #endregion

            if (medicalProviderDB.id > 0)
            {
                //For Update Record

                //Find Provider By ID
                MedicalProvider provider = _context.MedicalProviders.Include("Company").Where(p => p.id == medicalProviderDB.id).FirstOrDefault<MedicalProvider>();

                if (provider != null)
                {
                    #region Medical Provider
                    provider.id = medicalProviderBO.ID;
                    provider.Name = medicalProviderBO.Name != null ? medicalProviderBO.Name : provider.Name;
                    provider.NPI = medicalProviderBO.NPI != null ? medicalProviderBO.NPI : provider.NPI;
                    provider.IsDeleted = medicalProviderBO.IsDeleted != null ? medicalProviderBO.IsDeleted : provider.IsDeleted;
                    provider.UpdateDate = DateTime.UtcNow;
                    provider.UpdateByUserID = medicalProviderBO.UpdateByUserID;
                    #endregion

                    _context.Entry(provider).State = System.Data.Entity.EntityState.Modified;
                }

            }
            else
            {
                medicalProviderDB.CreateDate = DateTime.UtcNow;
                medicalProviderDB.CreateByUserID = companyBO.CreateByUserID;

                _dbSet.Add(medicalProviderDB);
            }
            _context.SaveChanges();

            var res = Convert<BO.MedicalProvider, MedicalProvider>(medicalProviderDB);
            return (object)res;
        }
        #endregion

        #region Delete
        public override object Delete<T>(T entity)
        {
            BO.MedicalProvider medicalProviderBO = entity as BO.MedicalProvider;

            MedicalProvider medicalProviderDB = new MedicalProvider();
            medicalProviderDB.id = medicalProviderBO.ID;
            _dbSet.Remove(_context.MedicalProviders.Single<MedicalProvider>(p => p.id == medicalProviderBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return medicalProviderBO;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            BO.MedicalProvider acc_ = Convert<BO.MedicalProvider, MedicalProvider>(_context.MedicalProviders.Include("Company").Where(p => p.id == id && p.IsDeleted == false).FirstOrDefault<MedicalProvider>());
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Provider.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }
        #endregion

        #region Get By Filter
        public override object Get<T>(T entity)
        {
            var acc_ = _context.MedicalProviders.Include("Company").Where(p => p.IsDeleted == false || p.IsDeleted == null).ToList<MedicalProvider>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.MedicalProvider> lstProviders = new List<BO.MedicalProvider>();
            foreach (MedicalProvider item in acc_)
            {
                lstProviders.Add(Convert<BO.MedicalProvider, MedicalProvider>(item));
            }
            return lstProviders;
        }
        #endregion

    }
}
