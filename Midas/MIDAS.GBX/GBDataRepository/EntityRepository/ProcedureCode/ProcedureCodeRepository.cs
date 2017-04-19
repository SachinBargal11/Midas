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
    internal class ProcedureCodeRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<ProcedureCode> _dbSet;

        #region Constructor
        public ProcedureCodeRepository(MIDASGBXEntities context) : base(context)
        {
            _dbSet = context.Set<ProcedureCode>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            ProcedureCode procedureCode = entity as ProcedureCode;

            if (procedureCode == null)
                return default(T);

            BO.ProcedureCode procedureCodeBO = new BO.ProcedureCode();

            procedureCodeBO.ID = procedureCode.Id;
            procedureCodeBO.ProcedureCodeText = procedureCode.ProcedureCodeText;
            procedureCodeBO.ProcedureCodeDesc = procedureCode.ProcedureCodeDesc;
            procedureCodeBO.Amount = procedureCode.Amount;
            procedureCodeBO.CompanyId = procedureCode.CompanyId;
            procedureCodeBO.SpecialityId = procedureCode.SpecialityId;
            procedureCodeBO.RoomTestId = procedureCode.RoomTestId;

            if (procedureCode.IsDeleted.HasValue)
                procedureCodeBO.IsDeleted = procedureCode.IsDeleted.Value;
            if (procedureCode.UpdateByUserID.HasValue)
                procedureCodeBO.UpdateByUserID = procedureCode.UpdateByUserID.Value;

            return (T)(object)procedureCodeBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.ProcedureCode procedureCode = (BO.ProcedureCode)(object)entity;
            var result = procedureCode.Validate(procedureCode);
            return result;
        }
        #endregion

        #region Get By Company ID
        //public override object GetByCompanyId(int id)
        //{
        //    var procedureCodeDB = _context.ProcedureCodes.Where(p => p.CompanyId == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
        //                                                 .ToList<ProcedureCode>();

        //    List<BO.ProcedureCode> boProcedureCode = new List<BO.ProcedureCode>();

        //    if (procedureCodeDB == null)
        //    {
        //        return new BO.ErrorObject { ErrorMessage = "No record found for this Procedure Code.", errorObject = "", ErrorLevel = ErrorLevel.Error };
        //    }

        //    else
        //    {
        //        foreach (var boProcedureCodeList in procedureCodeDB)
        //        {
        //            boProcedureCode.Add(Convert<BO.ProcedureCode, ProcedureCode>(boProcedureCodeList));
        //        }
        //    }

        //    return (object)boProcedureCode;
        //}
        #endregion

        #region GetAll
        public override object Get()
        {
            var acc_ = _context.ProcedureCodes.Where(p => p.IsDeleted == false || p.IsDeleted == null).ToList<ProcedureCode>();

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.ProcedureCode> lstProcedureCode = new List<BO.ProcedureCode>();

            foreach (ProcedureCode item in acc_)
            {
                lstProcedureCode.Add(Convert<BO.ProcedureCode, ProcedureCode>(item));
            }

            return lstProcedureCode;
        }
        #endregion

        #region Get By specialityId ID
        public override object GetBySpecialityId(int specialityId)
        {
            var procedureCodeDB = _context.ProcedureCodes.Where(p => p.SpecialityId == specialityId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                         .ToList<ProcedureCode>();

            List<BO.ProcedureCode> boProcedureCode = new List<BO.ProcedureCode>();

            if (procedureCodeDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Procedure Code.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            else
            {
                foreach (var boProcedureCodeList in procedureCodeDB)
                {
                    boProcedureCode.Add(Convert<BO.ProcedureCode, ProcedureCode>(boProcedureCodeList));
                }
            }

            return (object)boProcedureCode;
        }
        #endregion

        #region Get By RoomTest ID
        public override object GetByRoomTestId(int RoomTestId)
        {
            var procedureCodeDB = _context.ProcedureCodes.Where(p => p.RoomTestId == RoomTestId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                         .ToList<ProcedureCode>();

            List<BO.ProcedureCode> boProcedureCode = new List<BO.ProcedureCode>();

            if (procedureCodeDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Procedure Code.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            else
            {
                foreach (var boProcedureCodeList in procedureCodeDB)
                {
                    boProcedureCode.Add(Convert<BO.ProcedureCode, ProcedureCode>(boProcedureCodeList));
                }
            }

            return (object)boProcedureCode;
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
