#region Imports
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Newtonsoft.Json.Linq;
using MIDAS.GBX.EntityRepository;
using MIDAS.GBX.DataRepository.Model;
using BO = MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.EN;
using MIDAS.GBX.Common;

#endregion

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class PreferredMedicalProviderRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<PreferredMedicalProvider> _dbSet;
       
        #region Constructor
        public PreferredMedicalProviderRepository(MIDASGBXEntities context) : base(context)
        {
            _dbSet = context.Set<PreferredMedicalProvider>();           
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {

            PreferredMedicalProvider preferredMedicalProvider = entity as PreferredMedicalProvider;
                if (preferredMedicalProvider == null)
                    return default(T);

                BO.PreferredMedicalProvider boPreferredMedicalProvider = new BO.PreferredMedicalProvider();

            boPreferredMedicalProvider.ID = preferredMedicalProvider.Id;
            boPreferredMedicalProvider.Name = preferredMedicalProvider.Name;
            boPreferredMedicalProvider.CompanyEmailId = preferredMedicalProvider.CompanyEmailId;
            boPreferredMedicalProvider.FirstName = preferredMedicalProvider.FirstName;
            boPreferredMedicalProvider.LastName = preferredMedicalProvider.LastName;
            boPreferredMedicalProvider.PreferredCompanyId = preferredMedicalProvider.PreferredCompanyId;
            boPreferredMedicalProvider.ForCompanyId = preferredMedicalProvider.ForCompanyId;

            if (preferredMedicalProvider.Company != null)
            {
                BO.Company Company = new BO.Company();
               
                    if (preferredMedicalProvider.Company.IsDeleted == false)
                    {

                        using (CompanyRepository sr = new CompanyRepository(_context))
                        {
                        Company = sr.Convert<BO.Company, Company>(preferredMedicalProvider.Company);
                        }
                    }

                boPreferredMedicalProvider.Company = Company;
            }

            if (preferredMedicalProvider.Company1 != null)
            {
                BO.Company Company = new BO.Company();

                if (preferredMedicalProvider.Company1.IsDeleted == false)
                {

                    using (CompanyRepository sr = new CompanyRepository(_context))
                    {
                        Company = sr.Convert<BO.Company, Company>(preferredMedicalProvider.Company1);
                    }
                }

                boPreferredMedicalProvider.Company = Company;
            }

            return (T)(object)boPreferredMedicalProvider;
            


        }
        #endregion

       


        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
           
            BO.PreferredMedicalProvider medicalProviderBO = (BO.PreferredMedicalProvider)(object)entity;
           
            var result = medicalProviderBO.Validate(medicalProviderBO);
            return result;
        }
        #endregion

        #region Save Data
        public override object Save<T>(T entity)
        {
            BO.PreferredMedicalProvider preferredMedicalProviderBO = (BO.PreferredMedicalProvider)(object)entity;

            PreferredMedicalProvider preferredMedicalProviderDB = new PreferredMedicalProvider();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {

                bool IsEditMode = false;
                IsEditMode = (preferredMedicalProviderBO != null && preferredMedicalProviderBO.ID > 0) ? true : false;

                #region medical Provider
                if (preferredMedicalProviderBO != null)
                {
                    bool Add_medicalProviderDB = false;
                    preferredMedicalProviderDB = _context.PreferredMedicalProviders.Where(p => p.Id == preferredMedicalProviderBO.ID).FirstOrDefault();

                    if (preferredMedicalProviderDB == null && preferredMedicalProviderBO.ID <= 0)
                    {
                        preferredMedicalProviderDB = new PreferredMedicalProvider();
                        Add_medicalProviderDB = true;
                    }
                    else if (preferredMedicalProviderDB == null && preferredMedicalProviderBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Medical Provider information dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }
                    
                    preferredMedicalProviderDB.Name = IsEditMode == true && preferredMedicalProviderBO.Name == null ? preferredMedicalProviderDB.Name : preferredMedicalProviderBO.Name;
                    preferredMedicalProviderDB.CompanyEmailId = IsEditMode == true && preferredMedicalProviderBO.CompanyEmailId == null ? preferredMedicalProviderDB.CompanyEmailId : preferredMedicalProviderBO.CompanyEmailId;
                    preferredMedicalProviderDB.FirstName = IsEditMode == true && preferredMedicalProviderBO.FirstName == null ? preferredMedicalProviderDB.FirstName : preferredMedicalProviderBO.FirstName;
                    preferredMedicalProviderDB.LastName = IsEditMode == true && preferredMedicalProviderBO.LastName == null ? preferredMedicalProviderDB.LastName : preferredMedicalProviderBO.LastName;
                    preferredMedicalProviderDB.PreferredCompanyId = IsEditMode == true && preferredMedicalProviderBO.PreferredCompanyId == null ? preferredMedicalProviderDB.PreferredCompanyId : preferredMedicalProviderBO.PreferredCompanyId;
                    preferredMedicalProviderDB.ForCompanyId = IsEditMode == true && preferredMedicalProviderBO.ForCompanyId == null ? preferredMedicalProviderDB.ForCompanyId : preferredMedicalProviderBO.ForCompanyId;

                    if (Add_medicalProviderDB == true)
                    {
                        preferredMedicalProviderDB = _context.PreferredMedicalProviders.Add(preferredMedicalProviderDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Medical Provider information details.", ErrorLevel = ErrorLevel.Error };
                    }
                    preferredMedicalProviderDB = null;
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                preferredMedicalProviderDB = _context.PreferredMedicalProviders
                                                                               .Include("Company")
                                                                               .Include("Company1")
                                                                               .Where(p => p.Id == preferredMedicalProviderDB.Id).FirstOrDefault<PreferredMedicalProvider>();
            }

            var res = Convert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(preferredMedicalProviderDB);
            return (object)res;
        }
        #endregion

        #region Get By Company ID
        public override object GetByCompanyId(int id)
        {
            var preferredMedicalProviderDB = _context.PreferredMedicalProviders.Include("Company")
                                                                               .Include("Company1")
                                                                               .Where(p => p.ForCompanyId==id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))                                                                                                       
                                                                               .ToList<PreferredMedicalProvider>();

            BO.PreferredMedicalProvider preferredMedicalProviderBO = new BO.PreferredMedicalProvider();
            List<BO.PreferredMedicalProvider> boPreferredMedicalProvider = new List<BO.PreferredMedicalProvider>();
            if (preferredMedicalProviderDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachPreferredMedicalProvider in preferredMedicalProviderDB)
                {
                    boPreferredMedicalProvider.Add(Convert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(EachPreferredMedicalProvider));
                }

            }

            return (object)boPreferredMedicalProvider;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
           
            PreferredMedicalProvider preferredMedicalProviderDB = _context.PreferredMedicalProviders.Include("Company")
                                                                                                    .Include("Company1").Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<PreferredMedicalProvider>();

            BO.PreferredMedicalProvider preferredMedicalProviderBO = new BO.PreferredMedicalProvider();

            if (preferredMedicalProviderDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                preferredMedicalProviderBO = Convert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(preferredMedicalProviderDB);
            }

            return (object)preferredMedicalProviderBO;
        }
        #endregion

        #region GetAll
        public override object Get()
        {
            //BO.Doctor doctorBO = (BO.Doctor)(object)entity;

            var acc_ = _context.PreferredMedicalProviders
                                                         .Include("Company")
                                                         .Include("Company1").Where(p => p.IsDeleted == false || p.IsDeleted == null).ToList<PreferredMedicalProvider>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.PreferredMedicalProvider> lstPreferredMedicalProvider = new List<BO.PreferredMedicalProvider>();
            foreach (PreferredMedicalProvider item in acc_)
            {
                lstPreferredMedicalProvider.Add(Convert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(item));
            }
            return lstPreferredMedicalProvider;
        }
        #endregion

        #region Delete
        public override object Delete(int id)
        {

            PreferredMedicalProvider preferredMedicalProviderDB = new PreferredMedicalProvider();


            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                preferredMedicalProviderDB = _context.PreferredMedicalProviders.Where(p => p.Id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault();

                if (preferredMedicalProviderDB != null)
                {
                    preferredMedicalProviderDB.IsDeleted = true;
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Medical provider details dosent exists.", ErrorLevel = ErrorLevel.Error };
                }
                dbContextTransaction.Commit();

            }
            var res = ObjectConvert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(preferredMedicalProviderDB);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
