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
    internal class DiagnosisTypeRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<DiagnosisType> _dbSet;

        #region Constructor
        public DiagnosisTypeRepository(MIDASGBXEntities context): base(context)
        {
            _dbSet = context.Set<DiagnosisType>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            DiagnosisType diagnosisType = entity as DiagnosisType;

            if (diagnosisType == null)
                return default(T);

            BO.DiagnosisType diagnosisTypeBO = new BO.DiagnosisType();

            diagnosisTypeBO.ID = diagnosisType.Id;
            diagnosisTypeBO.DiagnosisTypeText = diagnosisType.DiagnosisTypeText;
            diagnosisTypeBO.CompanyId = diagnosisType.CompanyId;

            if (diagnosisType.IsDeleted.HasValue)
                diagnosisTypeBO.IsDeleted = diagnosisType.IsDeleted.Value;
            if (diagnosisType.UpdateByUserID.HasValue)
                diagnosisTypeBO.UpdateByUserID = diagnosisType.UpdateByUserID.Value;

            return (T)(object)diagnosisTypeBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.DiagnosisType diagnosisType = (BO.DiagnosisType)(object)entity;
            var result = diagnosisType.Validate(diagnosisType);
            return result;
        }
        #endregion

        #region Get By Company ID
        //public override object GetByCompanyId(int id)
        //{
        //    var boDiagnosisTypeDB = _context.DiagnosisTypes.Where(p => p.CompanyId == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
        //                                                   .ToList<DiagnosisType>();

        //    List<BO.DiagnosisType> boDiagnosisType = new List<BO.DiagnosisType>();

        //    if (boDiagnosisTypeDB == null)
        //    {
        //        return new BO.ErrorObject { ErrorMessage = "No record found for this Diagnosis Type.", errorObject = "", ErrorLevel = ErrorLevel.Error };
        //    }

        //    else
        //    {
        //        foreach (var boDiagnosisTypeList in boDiagnosisTypeDB)
        //        {
        //            boDiagnosisType.Add(Convert<BO.DiagnosisType, DiagnosisType>(boDiagnosisTypeList));
        //        }
        //    }

        //    return (object)boDiagnosisType;
        //}
        #endregion

        #region GetAll
        public override object Get()
        {
            var acc_ = _context.DiagnosisTypes.Where(p => p.IsDeleted == false || p.IsDeleted == null).ToList<DiagnosisType>();

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.DiagnosisType> lstDiagnosisType = new List<BO.DiagnosisType>();

            foreach (DiagnosisType item in acc_)
            {
                lstDiagnosisType.Add(Convert<BO.DiagnosisType, DiagnosisType>(item));
            }

            return lstDiagnosisType;
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
