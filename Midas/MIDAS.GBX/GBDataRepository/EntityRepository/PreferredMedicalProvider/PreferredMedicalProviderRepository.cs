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

            PreferredMedicalProvider medicalProvider = entity as PreferredMedicalProvider;
                if (medicalProvider == null)
                    return default(T);

                BO.PreferredMedicalProvider boMedicalProvider = new BO.PreferredMedicalProvider();

                boMedicalProvider.ID = medicalProvider.Id;
                boMedicalProvider.Name = medicalProvider.Name;
                //boMedicalProvider.TaxID = medicalProvider.TaxID;
                //boMedicalProvider.Status = medicalProvider.Status;
                //boMedicalProvider.CompanyType = medicalProvider.CompanyType;
                //boMedicalProvider.SubscriptionPlanType = medicalProvider.SubscriptionPlanType;

               
                return (T)(object)boMedicalProvider;
            


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
            BO.PreferredMedicalProvider medicalProviderBO = (BO.PreferredMedicalProvider)(object)entity;

            PreferredMedicalProvider medicalProviderDB = new PreferredMedicalProvider();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {

                bool IsEditMode = false;
                IsEditMode = (medicalProviderBO != null && medicalProviderBO.ID > 0) ? true : false;

                #region medical Provider
                if (medicalProviderBO != null)
                {
                    bool Add_medicalProviderDB = false;
                    medicalProviderDB = _context.PreferredMedicalProviders.Where(p => p.Id == medicalProviderBO.ID).FirstOrDefault();

                    if (medicalProviderDB == null && medicalProviderBO.ID <= 0)
                    {
                        medicalProviderDB = new PreferredMedicalProvider();
                        Add_medicalProviderDB = true;
                    }
                    else if (medicalProviderDB == null && medicalProviderBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Medical Provider information dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

   

                   
                    //medicalProviderDB.Status = IsEditMode == true ? medicalProviderDB.Status : medicalProviderBO.Status;
                    medicalProviderDB.Name = IsEditMode == true && medicalProviderBO.Name == null ? medicalProviderDB.Name : medicalProviderBO.Name;
                    //medicalProviderDB.CompanyType = IsEditMode == true ? medicalProviderDB.CompanyType : medicalProviderBO.CompanyType;
                    //medicalProviderDB.SubscriptionPlanType = IsEditMode == true ? medicalProviderDB.SubscriptionPlanType : medicalProviderBO.SubscriptionPlanType;
                    //medicalProviderDB.TaxID = IsEditMode == true && medicalProviderBO.TaxID == null ? medicalProviderDB.TaxID : medicalProviderBO.TaxID;

                  
                    if (Add_medicalProviderDB == true)
                    {
                        medicalProviderDB = _context.PreferredMedicalProviders.Add(medicalProviderDB);
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
                    medicalProviderDB = null;
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                medicalProviderDB = _context.PreferredMedicalProviders.Where(p => p.Id == medicalProviderDB.Id).FirstOrDefault<PreferredMedicalProvider>();
            }

            var res = Convert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(medicalProviderDB);
            return (object)res;
        }
        #endregion
    
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
