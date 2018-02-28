using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    class InsuranceMasterTypeRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<InsuranceMasterType> _dbSet;

        #region Constructor
        public InsuranceMasterTypeRepository(MIDASGBXEntities context)
            : base(context)
        {

            _dbSet = context.Set<InsuranceMasterType>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            List<InsuranceMasterType> insuranceMasterType = entity as List<InsuranceMasterType>;

            if (insuranceMasterType == null)
                return default(T);

            List<BO.InsuranceMasterType> boInsuranceMasterTypes = new List<BO.InsuranceMasterType>();
            foreach (var eachInsuranceMasterType in insuranceMasterType)
            {
                BO.InsuranceMasterType boInsuranceMasterType = new BO.InsuranceMasterType();

                boInsuranceMasterType.ID = eachInsuranceMasterType.Id;
                boInsuranceMasterType.InsuranceMasterTypeText = eachInsuranceMasterType.InsuranceMasterTypeText;
                boInsuranceMasterType.IsDeleted = eachInsuranceMasterType.IsDeleted;
                boInsuranceMasterType.CreateByUserID = eachInsuranceMasterType.CreateByUserID;
                boInsuranceMasterType.UpdateByUserID = eachInsuranceMasterType.UpdateByUserID;
                boInsuranceMasterTypes.Add(boInsuranceMasterType);
            }

            return (T)(object)boInsuranceMasterTypes;
        }
        #endregion

        #region Entity Conversion
        public override T ObjectConvert<T, U>(U entity)
        {
            InsuranceMasterType insuranceMasterType = entity as InsuranceMasterType;
            if (insuranceMasterType == null)
                return default(T);

            BO.InsuranceMasterType boInsuranceMasterType = new BO.InsuranceMasterType();

            boInsuranceMasterType.ID = insuranceMasterType.Id;
            boInsuranceMasterType.InsuranceMasterTypeText = insuranceMasterType.InsuranceMasterTypeText;
            boInsuranceMasterType.IsDeleted = insuranceMasterType.IsDeleted;
            boInsuranceMasterType.CreateByUserID = insuranceMasterType.CreateByUserID;
            boInsuranceMasterType.UpdateByUserID = insuranceMasterType.UpdateByUserID;

            return (T)(object)boInsuranceMasterType;
        }
        #endregion


        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.InsuranceMasterType insuranceMasterType = (BO.InsuranceMasterType)(object)entity;
            var result = insuranceMasterType.Validate(insuranceMasterType);
            return result;
        }
        #endregion

        #region Get All Insurance Master Type
        public override Object Get()
        {
            var acc = _context.InsuranceMasterTypes.Where(p => (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<InsuranceMasterType>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No Insurance Master Type info found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.InsuranceMasterType> acc_ = Convert<List<BO.InsuranceMasterType>, List<InsuranceMasterType>>(acc);
                return (object)acc_;
            }
        }
        #endregion

        #region Get By Insurance Master Type Id
        public override Object Get(int id)
        {
            var acc = _context.InsuranceMasterTypes.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .FirstOrDefault();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No Insurance Master Type info found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                BO.InsuranceMasterType acc_ = ObjectConvert<BO.InsuranceMasterType, InsuranceMasterType>(acc);
                return (object)acc_;
            }
        }
        #endregion

        #region Delete
        public override object Delete(int id)
        {

            InsuranceMasterType insuranceMasterTypeDB = _context.InsuranceMasterTypes.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                         .FirstOrDefault<InsuranceMasterType>();
            if (insuranceMasterTypeDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this InsuranceMasterType.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            insuranceMasterTypeDB.IsDeleted = true;

            _context.Entry(insuranceMasterTypeDB).State = System.Data.Entity.EntityState.Modified;
            _context.SaveChanges();

            var res = ObjectConvert<BO.InsuranceMasterType, InsuranceMasterType>(insuranceMasterTypeDB);
            return (object)res;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.InsuranceMasterType insuranceMasterTypeBO = (BO.InsuranceMasterType)(object)entity;

            InsuranceMasterType insuranceMasterTypeDB = new InsuranceMasterType();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {

                bool IsEditMode = false;
                IsEditMode = (insuranceMasterTypeBO != null && insuranceMasterTypeBO.ID > 0) ? true : false;

                #region Insurance Master
                if (insuranceMasterTypeBO != null)
                {


                    bool Add_insuranceMasterTypeDB = false;
                    insuranceMasterTypeDB = _context.InsuranceMasterTypes.Where(p => p.Id == insuranceMasterTypeBO.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<InsuranceMasterType>();

                    if (insuranceMasterTypeDB == null && insuranceMasterTypeBO.ID <= 0)
                    {
                        insuranceMasterTypeDB = new InsuranceMasterType();
                        Add_insuranceMasterTypeDB = true;
                    }
                    else if (insuranceMasterTypeDB == null && insuranceMasterTypeBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Insurance Master Type information dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    insuranceMasterTypeDB.InsuranceMasterTypeText = insuranceMasterTypeBO.InsuranceMasterTypeText;
                    if (Add_insuranceMasterTypeDB == true)
                    {
                        insuranceMasterTypeDB = _context.InsuranceMasterTypes.Add(insuranceMasterTypeDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid insurance master type information details.", ErrorLevel = ErrorLevel.Error };
                    }
                    insuranceMasterTypeDB = null;
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                insuranceMasterTypeDB = _context.InsuranceMasterTypes.Where(p => p.Id == insuranceMasterTypeDB.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<InsuranceMasterType>();
            }

            var res = ObjectConvert<BO.InsuranceMasterType, InsuranceMasterType>(insuranceMasterTypeDB);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            // Use SupressFinalize in case a subclass 
            // of this type implements a finalizer.
            GC.SuppressFinalize(this);
        }
    }
}
