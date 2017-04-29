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
    internal class MedicalProviderRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<MedicalProvider> _dbSet;
       
        #region Constructor
        public MedicalProviderRepository(MIDASGBXEntities context) : base(context)
        {
            _dbSet = context.Set<MedicalProvider>();           
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            
                MedicalProvider medicalProvider = entity as MedicalProvider;
                if (medicalProvider == null)
                    return default(T);

                BO.MedicalProvider boMedicalProvider = new BO.MedicalProvider();

                boMedicalProvider.ID = medicalProvider.id;
                boMedicalProvider.Name = medicalProvider.Name;
                boMedicalProvider.TaxID = medicalProvider.TaxID;
                boMedicalProvider.Status = medicalProvider.Status;
                boMedicalProvider.CompanyType = medicalProvider.CompanyType;
                boMedicalProvider.SubscriptionPlanType = medicalProvider.SubscriptionPlanType;

               
                return (T)(object)boMedicalProvider;
            


        }
        #endregion

       


        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
           
            BO.MedicalProvider medicalProviderBO = (BO.MedicalProvider)(object)entity;
           
            var result = medicalProviderBO.Validate(medicalProviderBO);
            return result;
        }
        #endregion

        #region Save Data
        public override object Save<T>(T entity)
        {
            BO.MedicalProvider medicalProviderBO = (BO.MedicalProvider)(object)entity;

            MedicalProvider medicalProviderDB = new MedicalProvider();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {

                bool IsEditMode = false;
                IsEditMode = (medicalProviderBO != null && medicalProviderBO.ID > 0) ? true : false;

                #region medical Provider
                if (medicalProviderBO != null)
                {
                    bool Add_medicalProviderDB = false;
                    medicalProviderDB = _context.MedicalProviders.Where(p => p.id == medicalProviderBO.ID).FirstOrDefault();

                    if (medicalProviderDB == null && medicalProviderBO.ID <= 0)
                    {
                        medicalProviderDB = new MedicalProvider();
                        Add_medicalProviderDB = true;
                    }
                    else if (medicalProviderDB == null && medicalProviderBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Medical Provider information dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

   

                   
                    medicalProviderDB.Status = IsEditMode == true ? medicalProviderDB.Status : medicalProviderBO.Status;
                    medicalProviderDB.Name = IsEditMode == true && medicalProviderBO.Name == null ? medicalProviderDB.Name : medicalProviderBO.Name;
                    medicalProviderDB.CompanyType = IsEditMode == true ? medicalProviderDB.CompanyType : medicalProviderBO.CompanyType;
                    medicalProviderDB.SubscriptionPlanType = IsEditMode == true ? medicalProviderDB.SubscriptionPlanType : medicalProviderBO.SubscriptionPlanType;
                    medicalProviderDB.TaxID = IsEditMode == true && medicalProviderBO.TaxID == null ? medicalProviderDB.TaxID : medicalProviderBO.TaxID;

                  
                    if (Add_medicalProviderDB == true)
                    {
                        medicalProviderDB = _context.MedicalProviders.Add(medicalProviderDB);
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

                medicalProviderDB = _context.MedicalProviders.Where(p => p.id == medicalProviderDB.id).FirstOrDefault<MedicalProvider>();
            }

            var res = Convert<BO.MedicalProvider, MedicalProvider>(medicalProviderDB);
            return (object)res;
        }
        #endregion
    
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
