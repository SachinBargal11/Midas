using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.EntityRepository;
using System.Data.Entity;
using MIDAS.GBX.DataRepository.Model;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository.Common
{
    internal class InsuranceTypeRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<InsuranceType> _dbState;

        public InsuranceTypeRepository(MIDASGBXEntities context) : base(context)
        {
            _dbState = context.Set<InsuranceType>();
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            List<InsuranceType> insuranceTypes = entity as List<InsuranceType>;
            if (insuranceTypes == null)
                return default(T);

            List<BO.Common.InsuranceType> boInsuranceType = new List<BO.Common.InsuranceType>();
            foreach (var eachInsuranceType in insuranceTypes)
            {
                BO.Common.InsuranceType boInsurType = new BO.Common.InsuranceType();

                boInsurType.ID = eachInsuranceType.Id;
                boInsurType.InsuranceTypeText = eachInsuranceType.InsuranceTypeText;
                boInsurType.IsDeleted = eachInsuranceType.IsDeleted;

                boInsuranceType.Add(boInsurType);
            }


            return (T)(object)boInsuranceType;
        }
        #endregion

        #region Entity Conversion
        public override T ObjectConvert<T, U>(U entity)
        {
            InsuranceType insuranceType = entity as InsuranceType;

            if (insuranceType == null)
                return default(T);

            BO.Common.InsuranceType boInsurType = new BO.Common.InsuranceType();

            boInsurType.ID = insuranceType.Id;
            boInsurType.InsuranceTypeText = insuranceType.InsuranceTypeText;
            boInsurType.IsDeleted = insuranceType.IsDeleted;

            return (T)(object)boInsurType;
        }
        #endregion

        #region Get All States
        public override Object Get()
        {
            var acc = _context.InsuranceTypes.Where(p => p.IsDeleted.HasValue == false || p.IsDeleted == false).ToList<InsuranceType>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No insurance type info found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Common.InsuranceType> acc_ = Convert<List<BO.Common.InsuranceType>, List<InsuranceType>>(acc);
                return (object)acc_;
            }
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.InsuranceTypes.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || p.IsDeleted == false)).FirstOrDefault<InsuranceType>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            BO.Common.InsuranceType acc_ = ObjectConvert<BO.Common.InsuranceType, InsuranceType>(acc);

            return (object)acc_;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
