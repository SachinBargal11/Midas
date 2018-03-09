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
            if (procedureCodeCompanyMapping.IsPreffredCode.HasValue)
            {
                procedureCodeCompanyMappingBO.IsPreffredCode = procedureCodeCompanyMapping.IsPreffredCode.Value;
            }
            else
            {
                procedureCodeCompanyMappingBO.IsPreffredCode = false;
            }

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
                    procedureCodeCompanyMappingDB.IsPreffredCode = item.IsPreffredCode.HasValue == true ? item.IsPreffredCode.HasValue : false;
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

            var procedureCodeInfoWithSprcialty = (from pccm in _context.ProcedureCodeCompanyMappings
                                                  join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                                  join sp in _context.Specialties on pc.SpecialityId equals sp.id
                                                  //join rt in _context.RoomTests on pc.RoomTestId equals rt.id
                                                  where pccm.CompanyID == CompanyId
                                                        && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                                        && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                                        && (sp.IsDeleted.HasValue == false || (sp.IsDeleted.HasValue == true && sp.IsDeleted.Value == false))
                                                  select new
                                                  {
                                                      id = pccm.ID,
                                                      procedureCodeID = pccm.ProcedureCodeID,
                                                      companyID = pccm.CompanyID,
                                                      procedureCodeText = pc.ProcedureCodeText,
                                                      procedureCodeDesc = pc.ProcedureCodeDesc,
                                                      amount = pccm.Amount,
                                                      effectiveFromDate = pccm.EffectiveFromDate,
                                                      effectiveToDate = pccm.EffectiveToDate,
                                                      isDeleted = pccm.IsDeleted,
                                                      specialtyId = sp.id,
                                                      specialtyName = sp.Name,
                                                      roomTestId = 0,
                                                      roomTestName = "",
                                                      isPreffredCode = pccm.IsPreffredCode
                                                  }).ToList();

            var procedureCodeInfoWithRoomTest = (from pccm in _context.ProcedureCodeCompanyMappings
                                                 join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                                 //join sp in _context.Specialties on pc.SpecialityId equals sp.id
                                                 join rt in _context.RoomTests on pc.RoomTestId equals rt.id
                                                 where pccm.CompanyID == CompanyId
                                                        && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                                        && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                                        && (rt.IsDeleted.HasValue == false || (rt.IsDeleted.HasValue == true && rt.IsDeleted.Value == false))
                                                 select new
                                                 {
                                                     id = pccm.ID,
                                                     procedureCodeID = pccm.ProcedureCodeID,
                                                     companyID = pccm.CompanyID,
                                                     procedureCodeText = pc.ProcedureCodeText,
                                                     procedureCodeDesc = pc.ProcedureCodeDesc,
                                                     amount = pccm.Amount,
                                                     effectiveFromDate = pccm.EffectiveFromDate,
                                                     effectiveToDate = pccm.EffectiveToDate,
                                                     isDeleted = pccm.IsDeleted,
                                                     specialtyId = 0, // sp.id,
                                                     specialtyName = "", // sp.Name,
                                                     roomTestId = rt.id,
                                                     roomTestName = rt.Name,
                                                     isPreffredCode = pccm.IsPreffredCode
                                                 }).ToList();


            var procedureCodeInfo = procedureCodeInfoWithSprcialty.Concat(procedureCodeInfoWithRoomTest).Distinct().OrderBy(s => s.roomTestName).ThenBy(p => p.specialtyName);
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

        #region Get By Company ID and Specialty
        public override object Get(int CompanyId, int SpecialtyId)
        {

            var procedureCodeInfo = (from pccm in _context.ProcedureCodeCompanyMappings
                                     join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                     where pccm.CompanyID == CompanyId
                                           && pc.SpecialityId == SpecialtyId
                                           && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                           && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                     select new
                                     {
                                         id = pccm.ID,
                                         procedureCodeId = pc.Id,
                                         procedureCodeText = pc.ProcedureCodeText,
                                         procedureCodeDesc = pc.ProcedureCodeDesc,
                                         amount = pccm.Amount,
                                         isPreffredCode = pccm.IsPreffredCode
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

        #region Get By Company ID and Specialty Visit New
        public override object GetProcedureCodesbySpecialtyCompanyIdforVisit(int CompanyId, int SpecialtyId)
        {
            var companyProcedureCodeInfo = (from csd in _context.CompanySpecialtyDetails
                                            where csd.CompanyID == CompanyId && csd.SpecialtyId == SpecialtyId
                                            select new
                                            {
                                                id = csd.id,
                                                SpecialtyId = csd.SpecialtyId
                                            }).ToList();

            if (companyProcedureCodeInfo == null || companyProcedureCodeInfo.Count == 0)
            {
                var procedureCodeInfos = (from spm in _context.ProcedureCodeCompanyMappings
                                          join pc in _context.ProcedureCodes on spm.ProcedureCodeID equals pc.Id
                                          where spm.CompanyID == CompanyId && pc.SpecialityId == SpecialtyId
                                                && spm.IsPreffredCode == true
                                                && (spm.IsDeleted.HasValue == false || (spm.IsDeleted.HasValue == true && spm.IsDeleted.Value == false))
                                                && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                          orderby spm.IsPreffredCode descending
                                          select new
                                          {
                                              id = spm.ID,
                                              procedureCodeId = pc.Id,
                                              procedureCodeText = pc.ProcedureCodeText,
                                              procedureCodeDesc = pc.ProcedureCodeDesc,
                                              amount = pc.Amount
                                          }).ToList().Distinct().ToList();

                if (procedureCodeInfos == null || procedureCodeInfos.Count == 0)
                {
                    //var procedureCodeInfo = (from spm in _context.Specialties
                    //                         join pc in _context.ProcedureCodes on spm.id equals pc.SpecialityId
                    //                         where pc.SpecialityId == SpecialtyId
                    //                               && spm.MandatoryProcCode == true
                    //                               && (spm.IsDeleted.HasValue == false || (spm.IsDeleted.HasValue == true && spm.IsDeleted.Value == false))
                    //                               && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                    //                         select new
                    //                         {
                    //                             id = pc.Id,
                    //                             procedureCodeId = pc.Id,
                    //                             procedureCodeText = pc.ProcedureCodeText,
                    //                             procedureCodeDesc = pc.ProcedureCodeDesc,
                    //                             amount = pc.Amount
                    //                         }).ToList();

                    //if (procedureCodeInfo == null && procedureCodeInfos.Count == 0)
                    //{
                    //return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    return procedureCodeInfos;
                    //}
                    //else
                    //{
                    //    return procedureCodeInfo;
                    //}
                }
                else
                {
                    return procedureCodeInfos;
                }
            }
            else
            {
                var procedureCodeInfo = (from pccm in _context.ProcedureCodeCompanyMappings
                                         join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                         join sm in _context.CompanySpecialtyDetails on pc.SpecialityId equals sm.SpecialtyId
                                         where pccm.CompanyID == CompanyId
                                               && pc.SpecialityId == SpecialtyId
                                               && sm.MandatoryProcCode == true
                                               && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                               && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                               && pccm.IsPreffredCode == true
                                         orderby pccm.IsPreffredCode descending
                                         select new
                                         {
                                             id = pccm.ID,
                                             procedureCodeId = pc.Id,
                                             procedureCodeText = pc.ProcedureCodeText,
                                             procedureCodeDesc = pc.ProcedureCodeDesc,
                                             amount = pccm.Amount,
                                             isPreffredCode = pccm.IsPreffredCode
                                         }).ToList().Distinct().ToList();

                if (procedureCodeInfo == null || procedureCodeInfo.Count == 0)
                {
                    var procedureCodeInfom = (from pccm in _context.ProcedureCodeCompanyMappings
                                              join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                              join sm in _context.CompanySpecialtyDetails on pc.SpecialityId equals sm.SpecialtyId
                                              where pccm.CompanyID == CompanyId
                                                    && pc.SpecialityId == SpecialtyId
                                                    && sm.MandatoryProcCode == true
                                                    && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                                    && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                              orderby pccm.IsPreffredCode descending
                                              select new
                                              {
                                                  id = pccm.ID,
                                                  procedureCodeId = pc.Id,
                                                  procedureCodeText = pc.ProcedureCodeText,
                                                  procedureCodeDesc = pc.ProcedureCodeDesc,
                                                  amount = pccm.Amount,
                                                  isPreffredCode = pccm.IsPreffredCode
                                              }).ToList().Distinct().ToList();

                    if (procedureCodeInfom == null || procedureCodeInfo.Count == 0)
                    {
                        return procedureCodeInfom;
                        //return new BO.ErrorObject { ErrorMessage = "No record found for this Specialty", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        return procedureCodeInfom;
                    }
                }
                else
                {
                    return procedureCodeInfo;
                }
            }
        }
        #endregion
      

        #region Get All By Company ID and Specialty
        public override object GetAllProcedureCodesbySpecaltyCompanyId(int CompanyId, int SpecialtyId)
        {
            var companyProcedureCodeInfo = (from csd in _context.CompanySpecialtyDetails
                                            where csd.CompanyID == CompanyId && csd.SpecialtyId == SpecialtyId
                                            select new
                                            {
                                                id = csd.id,
                                                SpecialtyId = csd.SpecialtyId
                                            }).ToList();

            if (companyProcedureCodeInfo == null || companyProcedureCodeInfo.Count == 0)
            {
                var procedureCodeInfo = (from pccm in _context.ProcedureCodeCompanyMappings
                                         join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                         join sm in _context.CompanySpecialtyDetails on pc.SpecialityId equals sm.SpecialtyId
                                         where pccm.CompanyID == CompanyId
                                               && pc.SpecialityId == SpecialtyId
                                               && sm.MandatoryProcCode == true
                                               && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                               && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                         orderby pccm.IsPreffredCode descending
                                         select new
                                         {
                                             id = pccm.ID,
                                             procedureCodeId = pc.Id,
                                             procedureCodeText = pc.ProcedureCodeText,
                                             procedureCodeDesc = pc.ProcedureCodeDesc,
                                             amount = pccm.Amount,
                                             isPreffredCode = pccm.IsPreffredCode
                                         }).ToList().Distinct().ToList();

                if (procedureCodeInfo == null || procedureCodeInfo.Count == 0)
                {
                    //var procedureCodeInfos = (from spm in _context.Specialties
                    //                         join pc in _context.ProcedureCodes on spm.id equals pc.SpecialityId
                    //                         where pc.SpecialityId == SpecialtyId
                    //                               && spm.MandatoryProcCode == true
                    //                               && (spm.IsDeleted.HasValue == false || (spm.IsDeleted.HasValue == true && spm.IsDeleted.Value == false))
                    //                               && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                    //                         select new
                    //                         {
                    //                             id = pc.Id,
                    //                             procedureCodeId = pc.Id,
                    //                             procedureCodeText = pc.ProcedureCodeText,
                    //                             procedureCodeDesc = pc.ProcedureCodeDesc,
                    //                             amount = pc.Amount
                    //                         }).ToList();

                    //if (procedureCodeInfos == null)
                    //{
                    //return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    //}
                    //else
                    //{
                    //    return procedureCodeInfos;
                    //}

                    return procedureCodeInfo;
                }
                else
                {
                    return procedureCodeInfo;
                }
            }
            else
            {
                var procedureCodeInfo = (from pccm in _context.ProcedureCodeCompanyMappings
                                         join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                         join sm in _context.CompanySpecialtyDetails on pc.SpecialityId equals sm.SpecialtyId
                                         where pccm.CompanyID == CompanyId
                                               && pc.SpecialityId == SpecialtyId
                                               && sm.MandatoryProcCode == true
                                               && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                               && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                         orderby pccm.IsPreffredCode descending
                                         select new
                                         {
                                             id = pccm.ID,
                                             procedureCodeId = pc.Id,
                                             procedureCodeText = pc.ProcedureCodeText,
                                             procedureCodeDesc = pc.ProcedureCodeDesc,
                                             amount = pccm.Amount,
                                             isPreffredCode = pccm.IsPreffredCode
                                         }).ToList().Distinct().ToList();

                if (procedureCodeInfo == null || procedureCodeInfo.Count == 0)
                {
                    return procedureCodeInfo;
                    //return new BO.ErrorObject { ErrorMessage = "No record found for this Specialty", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
                else
                {
                    return procedureCodeInfo;
                }
            }
        }
        #endregion

        #region Get By Company ID and Specialty For Visit
        public override object Get1(int CompanyId, int SpecialtyId)
        {

            var procedureCodeInfo = (from pccm in _context.ProcedureCodeCompanyMappings
                                     join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                     where pccm.CompanyID == CompanyId
                                           && pc.SpecialityId == SpecialtyId
                                           && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                           && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                     select new
                                     {
                                         id = pc.Id,
                                         procedureCodeText = pc.ProcedureCodeText,
                                         procedureCodeDesc = pc.ProcedureCodeDesc,
                                         amount = pccm.Amount,
                                         isPreffredCode = pccm.IsPreffredCode
                                     }).ToList().Distinct().ToList();

            if (procedureCodeInfo == null)
            {
                return procedureCodeInfo;
                //return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                return procedureCodeInfo;
            }
        }
        #endregion

        #region Get By Company ID and Specialty For Visit Update
        public override object GetPreffredProcedureCodesForVisitUpdate(int CompanyId, int SpecialtyId)
        {

            var procedureCodeInfo = (from pccm in _context.ProcedureCodeCompanyMappings
                                     join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                     where pccm.CompanyID == CompanyId
                                           && pc.SpecialityId == SpecialtyId
                                           && pccm.IsPreffredCode == true
                                           && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                           && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                     select new
                                     {
                                         id = pccm.ID,
                                         procedureCodeId = pc.Id,
                                         procedureCodeText = pc.ProcedureCodeText,
                                         procedureCodeDesc = pc.ProcedureCodeDesc,
                                         amount = pccm.Amount,
                                         isPreffredCode = pccm.IsPreffredCode
                                     }).ToList().Distinct().ToList();

            if (procedureCodeInfo == null)
            {
                return procedureCodeInfo;
                //return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                return procedureCodeInfo;
            }
        }
        #endregion

        #region Get By Company ID and RoomTest
        public override object Get2(int CompanyId, int RoomTestId)
        {

            var procedureCodeInfo = (from pccm in _context.ProcedureCodeCompanyMappings
                                     join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                     where pccm.CompanyID == CompanyId
                                           && pc.RoomTestId == RoomTestId
                                           && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                           && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                     select new
                                     {
                                         id = pccm.ID,
                                         procedureCodeId = pc.Id,
                                         procedureCodeText = pc.ProcedureCodeText,
                                         procedureCodeDesc = pc.ProcedureCodeDesc,
                                         amount = pccm.Amount,
                                         isPreffredCode = pccm.IsPreffredCode
                                     }).ToList().Distinct().ToList();

            if (procedureCodeInfo == null)
            {
                //return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                return procedureCodeInfo;
            }
            else
            {
                return procedureCodeInfo;
            }
        }
        #endregion

        #region Get By Company ID and RoomTest Visit
        public override object Get3(int CompanyId, int RoomTestId)
        {
            var companyProcedureCodeInfo = (from csd in _context.CompanyRoomTestDetails
                                            where csd.CompanyID == CompanyId && csd.RoomTestID == RoomTestId
                                            select new
                                            {
                                                id = csd.id,
                                                RoomTestId = csd.RoomTestID
                                            }).ToList();

            if (companyProcedureCodeInfo == null || companyProcedureCodeInfo.Count == 0)
            {
                var procedureCodeInfos = (from pccm in _context.ProcedureCodeCompanyMappings
                                          join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                          join sm in _context.RoomTests on pc.RoomTestId equals sm.id
                                          where pccm.CompanyID == CompanyId
                                                && pc.RoomTestId == RoomTestId
                                                && pccm.IsPreffredCode == true
                                                && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                                && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                          orderby pccm.IsPreffredCode descending
                                          select new
                                          {
                                              id = pccm.ID,
                                              procedureCodeId = pc.Id,
                                              procedureCodeText = pc.ProcedureCodeText,
                                              procedureCodeDesc = pc.ProcedureCodeDesc,
                                              amount = pccm.Amount,
                                              isPreffredCode = pccm.IsPreffredCode
                                          }).ToList().Distinct().ToList();

                if (procedureCodeInfos == null || procedureCodeInfos.Count == 0)
                {

                    //var procedureCodeInfo = (from spm in _context.RoomTests
                    //                         join pc in _context.ProcedureCodes on spm.id equals pc.RoomTestId
                    //                         where pc.RoomTestId == RoomTestId
                    //                               && spm.ShowProcCode == true
                    //                               && (spm.IsDeleted.HasValue == false || (spm.IsDeleted.HasValue == true && spm.IsDeleted.Value == false))
                    //                               && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                    //                         select new
                    //                         {
                    //                             id = pc.Id,
                    //                             procedureCodeId = pc.Id,
                    //                             procedureCodeText = pc.ProcedureCodeText,
                    //                             procedureCodeDesc = pc.ProcedureCodeDesc,
                    //                             amount = pc.Amount
                    //                         }).ToList();

                    //if (procedureCodeInfo == null)
                    //{
                    //return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    //}
                    //else
                    //{
                    //    return procedureCodeInfo;
                    //}
                    return procedureCodeInfos;
                }
                else
                {
                    return procedureCodeInfos;
                }
            }
            else
            {
                var procedureCodeInfo = (from pccm in _context.ProcedureCodeCompanyMappings
                                         join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                         join sm in _context.CompanyRoomTestDetails on pc.RoomTestId equals sm.RoomTestID
                                         where pccm.CompanyID == CompanyId
                                               && pc.RoomTestId == RoomTestId
                                               && sm.ShowProcCode == true
                                               && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                               && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                               && pccm.IsPreffredCode == true
                                         orderby pccm.IsPreffredCode descending
                                         select new
                                         {
                                             id = pccm.ID,
                                             procedureCodeId = pc.Id,
                                             procedureCodeText = pc.ProcedureCodeText,
                                             procedureCodeDesc = pc.ProcedureCodeDesc,
                                             amount = pccm.Amount,
                                             isPreffredCode = pccm.IsPreffredCode
                                         }).ToList().Distinct().ToList();

                if (procedureCodeInfo == null || procedureCodeInfo.Count == 0)
                {
                    var procedureCodeInfom = (from pccm in _context.ProcedureCodeCompanyMappings
                                              join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                              join sm in _context.CompanyRoomTestDetails on pc.RoomTestId equals sm.RoomTestID
                                              where pccm.CompanyID == CompanyId
                                                    && pc.RoomTestId == RoomTestId
                                                    && sm.ShowProcCode == true
                                                    && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                                    && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                              orderby pccm.IsPreffredCode descending
                                              select new
                                              {
                                                  id = pccm.ID,
                                                  procedureCodeId = pc.Id,
                                                  procedureCodeText = pc.ProcedureCodeText,
                                                  procedureCodeDesc = pc.ProcedureCodeDesc,
                                                  amount = pccm.Amount,
                                                  isPreffredCode = pccm.IsPreffredCode
                                              }).ToList().Distinct().ToList();

                    if (procedureCodeInfom == null || procedureCodeInfom.Count == 0)
                    {
                        //return new BO.ErrorObject { ErrorMessage = "No record found for this Specialty", errorObject = "", ErrorLevel = ErrorLevel.Error };
                        return procedureCodeInfom;
                    }
                    else
                    {
                        return procedureCodeInfom;
                    }
                }
                else
                {
                    return procedureCodeInfo;
                }
            }
        }
        #endregion

        #region Get By Company ID and RoomTest For Visit Update
        public override object GetPreffredRoomProcedureCodesForVisitUpdate(int CompanyId, int RoomTestId)
        {

            var procedureCodeInfo = (from pccm in _context.ProcedureCodeCompanyMappings
                                     join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                     where pccm.CompanyID == CompanyId
                                           && pc.RoomTestId == RoomTestId
                                           && pccm.IsPreffredCode == true
                                           && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                           && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                     select new
                                     {
                                         id = pccm.ID,
                                         procedureCodeId = pc.Id,
                                         procedureCodeText = pc.ProcedureCodeText,
                                         procedureCodeDesc = pc.ProcedureCodeDesc,
                                         amount = pccm.Amount,
                                         isPreffredCode = pccm.IsPreffredCode
                                     }).ToList().Distinct().ToList();

            if (procedureCodeInfo == null)
            {
                return procedureCodeInfo;
                //return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                return procedureCodeInfo;
            }
        }
        #endregion

        #region Get All By Company ID and RoomTest
        public override object GetAllProcedureCodesbyRoomTestCompanyIdforVisit(int CompanyId, int RoomTestId)
        {
            var companyProcedureCodeInfo = (from csd in _context.CompanyRoomTestDetails
                                            where csd.CompanyID == CompanyId && csd.RoomTestID == RoomTestId && csd.ShowProcCode == true
                                            select new
                                            {
                                                id = csd.id,
                                                RoomTestId = csd.RoomTestID
                                            }).ToList();

            if (companyProcedureCodeInfo == null || companyProcedureCodeInfo.Count == 0)
            {
                var procedureCodeInfos = (from pccm in _context.ProcedureCodeCompanyMappings
                                          join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                          join sm in _context.CompanyRoomTestDetails on pc.RoomTestId equals sm.RoomTestID
                                          where pccm.CompanyID == CompanyId
                                                && pc.RoomTestId == RoomTestId
                                                && sm.ShowProcCode == true
                                                && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                                && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                          orderby pccm.IsPreffredCode descending
                                          select new
                                          {
                                              id = pccm.ID,
                                              procedureCodeId = pc.Id,
                                              procedureCodeText = pc.ProcedureCodeText,
                                              procedureCodeDesc = pc.ProcedureCodeDesc,
                                              amount = pccm.Amount,
                                              isPreffredCode = pccm.IsPreffredCode
                                          }).ToList().Distinct().ToList();

                if (procedureCodeInfos == null || procedureCodeInfos.Count == 0)
                {
                    //var procedureCodeInfo = (from spm in _context.RoomTests
                    //                         join pc in _context.ProcedureCodes on spm.id equals pc.RoomTestId
                    //                         where pc.RoomTestId == RoomTestId
                    //                               && spm.ShowProcCode == true
                    //                               && (spm.IsDeleted.HasValue == false || (spm.IsDeleted.HasValue == true && spm.IsDeleted.Value == false))
                    //                               && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                    //                         select new
                    //                         {
                    //                             id = pc.Id,
                    //                             procedureCodeId = spm.id,
                    //                             procedureCodeText = pc.ProcedureCodeText,
                    //                             procedureCodeDesc = pc.ProcedureCodeDesc,
                    //                             amount = pc.Amount
                    //                         }).ToList();

                    //if (procedureCodeInfo == null)
                    //{
                    //return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    //}
                    //else
                    //{
                    //    return procedureCodeInfo;
                    //}
                    return procedureCodeInfos;
                }
                else
                {
                    return procedureCodeInfos;
                }
            }
            else
            {
                var procedureCodeInfo = (from pccm in _context.ProcedureCodeCompanyMappings
                                         join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                         join sm in _context.CompanyRoomTestDetails on pc.RoomTestId equals sm.RoomTestID
                                         where pccm.CompanyID == CompanyId
                                               && pc.RoomTestId == RoomTestId
                                               && sm.ShowProcCode == true
                                               && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                               && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                         orderby pccm.IsPreffredCode descending
                                         select new
                                         {
                                             id = pccm.ID,
                                             procedureCodeId = pc.Id,
                                             procedureCodeText = pc.ProcedureCodeText,
                                             procedureCodeDesc = pc.ProcedureCodeDesc,
                                             amount = pccm.Amount,
                                             isPreffredCode = pccm.IsPreffredCode
                                         }).ToList().Distinct().ToList();

                if (procedureCodeInfo == null || procedureCodeInfo.Count == 0)
                {
                    return procedureCodeInfo;
                    // return new BO.ErrorObject { ErrorMessage = "No record found for this Specialty", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
                else
                {
                    return procedureCodeInfo;
                }
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

        #region UpdatePrefferedProcedureCode
        public override object UpdatePrefferedProcedureCode(int id)
        {
            var prefferedStatus = false;

            ProcedureCodeCompanyMapping procedureCodeCompanyMappingDB = new ProcedureCodeCompanyMapping();

            procedureCodeCompanyMappingDB = _context.ProcedureCodeCompanyMappings.Where(p => p.ID == id).FirstOrDefault();

            if (procedureCodeCompanyMappingDB.IsPreffredCode == false || procedureCodeCompanyMappingDB.IsPreffredCode == null)
            {
                prefferedStatus = true;
            }
            else
            {
                prefferedStatus = false;
            }

            if (procedureCodeCompanyMappingDB != null)
            {
                procedureCodeCompanyMappingDB.IsPreffredCode = prefferedStatus;
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
