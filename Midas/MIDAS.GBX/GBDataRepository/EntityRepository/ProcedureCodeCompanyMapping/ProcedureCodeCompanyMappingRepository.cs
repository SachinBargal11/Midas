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
    internal class ProcedureCodeCompanyMappingRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<ProcedureCode> _dbSet;

        #region Constructor
        public ProcedureCodeCompanyMappingRepository(MIDASGBXEntities context) : base(context)
        {
            _dbSet = context.Set<ProcedureCode>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            ProcedureCodeCompanyMapping procedureCodeCompanyMapping = entity as ProcedureCodeCompanyMapping;

            if (procedureCodeCompanyMapping == null)
                return default(T);

            BO.ProcedureCodeCompanyMapping procedureCodeCompanyMappingBO = new BO.ProcedureCodeCompanyMapping();

            procedureCodeCompanyMappingBO.ID = procedureCodeCompanyMapping.ID;
            procedureCodeCompanyMappingBO.ProcedureCodeID = procedureCodeCompanyMapping.ProcedureCodeID;
            procedureCodeCompanyMappingBO.CompanyID = procedureCodeCompanyMapping.CompanyID;
            procedureCodeCompanyMappingBO.Amount = procedureCodeCompanyMapping.Amount;
            procedureCodeCompanyMappingBO.EffectiveFromDate = procedureCodeCompanyMapping.EffectiveFromDate;
            procedureCodeCompanyMappingBO.EffectiveToDate = procedureCodeCompanyMapping.EffectiveToDate;


            if (procedureCodeCompanyMapping.IsDeleted.HasValue)
                procedureCodeCompanyMappingBO.IsDeleted = procedureCodeCompanyMapping.IsDeleted.Value;
            if (procedureCodeCompanyMapping.UpdateByUserID.HasValue)
                procedureCodeCompanyMappingBO.UpdateByUserID = procedureCodeCompanyMapping.UpdateByUserID.Value;

            return (T)(object)procedureCodeCompanyMappingBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.ProcedureCodeCompanyMapping procedureCodeCompanyMapping = (BO.ProcedureCodeCompanyMapping)(object)entity;
            var result = procedureCodeCompanyMapping.Validate(procedureCodeCompanyMapping);
            return result;
        }
        #endregion


        #region Save
        public override object Save<T>(List<T> entities)
        {
            List<BO.ProcedureCodeCompanyMapping> procedureCodeCompanyMappingBO = (List<BO.ProcedureCodeCompanyMapping>)(object)entities;
            List<ProcedureCodeCompanyMapping> procedureCodeCompanyMappings = new List<ProcedureCodeCompanyMapping>();
            List<BO.ProcedureCodeCompanyMapping> boProcedureCodeCompanyMappings = new List<BO.ProcedureCodeCompanyMapping>();
            ProcedureCodeCompanyMapping procedureCodeCompanyMappingDB = new ProcedureCodeCompanyMapping();


            if (procedureCodeCompanyMappingBO != null)
            {
                foreach (var item in procedureCodeCompanyMappingBO)
                {
                    //procedureCodeCompanyMappingDB = _context.ProcedureCodeCompanyMappings.Where(p => p.ProcedureCodeID == item.ProcedureCodeID && p.CompanyID == item.CompanyID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                    //                                    .FirstOrDefault();
                    procedureCodeCompanyMappingDB = (from pcm in _context.ProcedureCodeCompanyMappings
                                                     where pcm.ProcedureCodeID == item.ProcedureCodeID
                                                           && pcm.CompanyID == item.CompanyID
                                                           && (pcm.IsDeleted.HasValue == false || (pcm.IsDeleted.HasValue == true && pcm.IsDeleted.Value == false))
                                                     select pcm
                                                           ).FirstOrDefault();


                    bool AddProcedurCodeCompanyMapping = false;
                    if (procedureCodeCompanyMappingDB == null)
                    {
                        AddProcedurCodeCompanyMapping = true;
                        procedureCodeCompanyMappingDB = new ProcedureCodeCompanyMapping();

                    }

                    procedureCodeCompanyMappingDB.ProcedureCodeID = item.ProcedureCodeID;
                    procedureCodeCompanyMappingDB.CompanyID = item.CompanyID;
                    procedureCodeCompanyMappingDB.Amount = item.Amount;
                    procedureCodeCompanyMappingDB.EffectiveFromDate = item.EffectiveFromDate;
                    procedureCodeCompanyMappingDB.EffectiveToDate = item.EffectiveToDate;

                    if (AddProcedurCodeCompanyMapping)
                    {
                        procedureCodeCompanyMappingDB = _context.ProcedureCodeCompanyMappings.Add(procedureCodeCompanyMappingDB);

                    }
                    _context.SaveChanges();

                    procedureCodeCompanyMappings.Add(procedureCodeCompanyMappingDB);


                }
            }

            foreach (var item in procedureCodeCompanyMappings)
            {
                if (item != null)
                {
                    boProcedureCodeCompanyMappings.Add(Convert<BO.ProcedureCodeCompanyMapping, ProcedureCodeCompanyMapping>(item));
                }

            }

            return (object)boProcedureCodeCompanyMappings;
        }
        #endregion

        #region Get By Company ID 
        public override object GetByCompanyId(int CompanyId)
        {
                      
            var procedureCodeInfo = (from pccm in _context.ProcedureCodeCompanyMappings
                                     join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                     where pccm.CompanyID == CompanyId
                                           && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                           && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                     select new
                                     {
                                         pc.ProcedureCodeText,
                                         pc.ProcedureCodeDesc,
                                         pc.Amount
                                     }).ToList();

            if (procedureCodeInfo == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {             
                return procedureCodeInfo;
            }
        }
        #endregion

        #region Delete
        public override object Delete(int id)
        {

            ProcedureCodeCompanyMapping procedureCodeCompanyMappingDB = new ProcedureCodeCompanyMapping();

            procedureCodeCompanyMappingDB = _context.ProcedureCodeCompanyMappings.Where(p => p.ID == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault();

            if (procedureCodeCompanyMappingDB != null)
            {
                procedureCodeCompanyMappingDB.IsDeleted = true;
                _context.SaveChanges();
            }
            else
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Medical provider details dosen't exists.", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.ProcedureCodeCompanyMapping, ProcedureCodeCompanyMapping>(procedureCodeCompanyMappingDB);
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
