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

        #region Get By specialityId ID and companyId
        public override object GetBySpecialityAndCompanyId(int specialityId, int companyId, bool showAll)
        {
           
            var procedureCodeDB = _context.ProcedureCodes.Where(p => p.SpecialityId == specialityId 
                                                        && (p.CompanyId == companyId || (showAll == true && p.CompanyId.HasValue == false))
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
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

        #region Get By roomTestId ID and companyId
        public override object GetByRoomTestAndCompanyId(int roomTestId, int companyId, bool showAll)
        {

            var procedureCodeDB = _context.ProcedureCodes.Where(p => p.RoomTestId == roomTestId
                                                        && (p.CompanyId == companyId || (showAll == true && p.CompanyId.HasValue == false))
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
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


        #region Get ProcedureCode by specialty excluding assigned
        public override object GetProcedureCodeBySpecialtyExcludingAssigned(int specialtyId, int companyId)
        {

            var procedureCodeDB = (from pc in _context.ProcedureCodes
                                   where pc.SpecialityId == specialtyId
                                         && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                         && !(from pm in _context.ProcedureCodeCompanyMappings where pm.CompanyID == companyId select pm.ProcedureCodeID).Contains(pc.Id)
                                   select new
                                   {
                                       pc.Id,
                                       pc.ProcedureCodeText,
                                       pc.ProcedureCodeDesc
                                   }
                                   ).ToList();

            List<BO.ProcedureCode> boProcedureCode = new List<BO.ProcedureCode>();

            if (procedureCodeDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
    
            return (object)procedureCodeDB;
        }
        #endregion

        #region Get ProcedureCode by room excluding assigned
        public override object GetProcedureCodeByRoomTestExcludingAssigned(int roomTestId, int companyId)
        {

            var procedureCodeDB = (from pc in _context.ProcedureCodes
                                   where pc.RoomTestId == roomTestId
                                         && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                         && !(from pm in _context.ProcedureCodeCompanyMappings
                                              where pm.CompanyID == companyId
                                                    &&(pm.IsDeleted.HasValue == false || (pm.IsDeleted.HasValue == true && pm.IsDeleted.Value == false))
                                              select pm.ProcedureCodeID).Contains(pc.Id)
                                   select new
                                   {
                                       pc.Id,
                                       pc.ProcedureCodeText,
                                       pc.ProcedureCodeDesc
                                   }
                                   ).ToList();

            List<BO.ProcedureCode> boProcedureCode = new List<BO.ProcedureCode>();

            if (procedureCodeDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)procedureCodeDB;
        }
        #endregion

        #region Update
        public override object Save<T>(List<T> entities)
        {
            List<BO.ProcedureCode> procedureCodeBO = (List<BO.ProcedureCode>)(object)entities;
            List<ProcedureCode> procedureCodes = new List<ProcedureCode>();
            List<BO.ProcedureCode> boProcedureCode = new List<BO.ProcedureCode>();
           
            if (procedureCodeBO != null)
            {
               foreach(var item in procedureCodeBO)
                {
                    var procedureCodeDB = _context.ProcedureCodes.Where(p => p.Id == item.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                        .FirstOrDefault();
                   
                    if(procedureCodeDB!=null)
                    {
                        procedureCodeDB.Amount = item.Amount;
                        _context.SaveChanges();
                    }
                    else if(procedureCodeDB == null)
                    {
                        return new BO.ErrorObject { ErrorMessage = "No record found for given Procedure Code.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                    procedureCodes.Add(procedureCodeDB);

                }
            }
          
            foreach (var item in procedureCodes)
            {
                if(item!=null)
                {
                    boProcedureCode.Add(Convert<BO.ProcedureCode, ProcedureCode>(item));
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
