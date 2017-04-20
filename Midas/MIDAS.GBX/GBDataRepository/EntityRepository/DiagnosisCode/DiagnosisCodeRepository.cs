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
    internal class DiagnosisCodeRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<DiagnosisCode> _dbSet;

        #region Constructor
        public DiagnosisCodeRepository(MIDASGBXEntities context) : base(context)
        {
            _dbSet = context.Set<DiagnosisCode>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            DiagnosisCode diagnosisCode = entity as DiagnosisCode;

            if (diagnosisCode == null)
                return default(T);

            BO.DiagnosisCode diagnosisCodeBO = new BO.DiagnosisCode();

            diagnosisCodeBO.ID = diagnosisCode.Id;
            diagnosisCodeBO.DiagnosisTypeId = diagnosisCode.DiagnosisTypeId;
            diagnosisCodeBO.DiagnosisCodeText = diagnosisCode.DiagnosisCodeText;
            diagnosisCodeBO.DiagnosisCodeDesc = diagnosisCode.DiagnosisCodeDesc;
            diagnosisCodeBO.CompanyId = diagnosisCode.CompanyId;

            if (diagnosisCode.IsDeleted.HasValue)
                diagnosisCodeBO.IsDeleted = diagnosisCode.IsDeleted.Value;
            if (diagnosisCode.UpdateByUserID.HasValue)
                diagnosisCodeBO.UpdateByUserID = diagnosisCode.UpdateByUserID.Value;

            return (T)(object)diagnosisCodeBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.DiagnosisCode diagnosisCode = (BO.DiagnosisCode)(object)entity;
            var result = diagnosisCode.Validate(diagnosisCode);
            return result;
        }
        #endregion

        #region GetByDiagnosisTypeId
        public override object Get(int id)
        {
            var boDiagnosisCodeDB = _context.DiagnosisCodes.Where(p => p.DiagnosisTypeId == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                           .ToList<DiagnosisCode>();

            List<BO.DiagnosisCode> boDiagnosisCode = new List<BO.DiagnosisCode>();

            if (boDiagnosisCodeDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Diagnosis Code.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            else
            {
                foreach (var boDiagnosisCodeDBList in boDiagnosisCodeDB)
                {
                    boDiagnosisCode.Add(Convert<BO.DiagnosisCode, DiagnosisCode>(boDiagnosisCodeDBList));
                }
            }

            return (object)boDiagnosisCode;
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
