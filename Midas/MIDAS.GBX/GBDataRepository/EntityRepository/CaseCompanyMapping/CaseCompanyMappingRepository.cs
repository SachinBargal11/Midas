using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class CaseCompanyMappingRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<CaseCompanyMapping> _dbCaseCompanyMapping;

        public CaseCompanyMappingRepository(MIDASGBXEntities context) : base(context)
        {
            _dbCaseCompanyMapping = context.Set<CaseCompanyMapping>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            CaseCompanyMapping caseCompanyMappings = entity as CaseCompanyMapping;
            if (caseCompanyMappings == null)
                return default(T);
            BO.CaseCompanyMapping caseCompanyMappingBO = new BO.CaseCompanyMapping();
            caseCompanyMappingBO.ID = caseCompanyMappings.Id;
            caseCompanyMappingBO.CaseId = caseCompanyMappings.CaseId;
            caseCompanyMappingBO.Company = new BO.Company();
            caseCompanyMappingBO.Company.ID = (caseCompanyMappings.Company != null) ? caseCompanyMappings.Company.id : 0;
            caseCompanyMappingBO.IsDeleted = caseCompanyMappings.IsDeleted;
            caseCompanyMappingBO.CreateByUserID = caseCompanyMappings.CreateByUserID;
            caseCompanyMappingBO.UpdateByUserID = caseCompanyMappings.UpdateByUserID;

            return (T)(object)caseCompanyMappingBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.CaseCompanyMapping CaseCompanyMapping = (BO.CaseCompanyMapping)(object)entity;
            var result = CaseCompanyMapping.Validate(CaseCompanyMapping);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.CaseCompanyMapping CaseCompanyMappingBO = (BO.CaseCompanyMapping)(object)entity;
            List<BO.CaseCompanyMapping> lstCaseCompanyMapping = new List<BO.CaseCompanyMapping>();
            CaseCompanyMapping caseCompanyMappingDB = new CaseCompanyMapping();

                //bool IsEditMode = false;
                //IsEditMode = (CaseCompanyMappingBO != null && CaseCompanyMappingBO.ID > 0) ? true : false;

                #region CaseCompanyMapping
                if (CaseCompanyMappingBO != null)
                {
                    if (CaseCompanyMappingBO.CaseId <= 0 || (CaseCompanyMappingBO.Company == null) || (CaseCompanyMappingBO.Company != null && CaseCompanyMappingBO.Company.ID <= 0))
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid case company mapping.", ErrorLevel = ErrorLevel.Error };
                    }

                    bool Add_CaseCompanyMappingDB = false;
                //caseCompanyMappingDB = _context.CaseCompanyMappings.Where(p => p.Id == CaseCompanyMappingBO.ID
                //                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                //                                                    .FirstOrDefault();
                caseCompanyMappingDB = _context.CaseCompanyMappings.Where(p => p.CaseId == CaseCompanyMappingBO.CaseId && p.CompanyId==CaseCompanyMappingBO.Company.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                    .FirstOrDefault();


                if (caseCompanyMappingDB == null)
                    {
                        caseCompanyMappingDB = new CaseCompanyMapping();
                        Add_CaseCompanyMappingDB = true;
                    }
                    //else if (caseCompanyMappingDB == null && CaseCompanyMappingBO.ID > 0)
                    //{
                    //    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid case company mapping.", ErrorLevel = ErrorLevel.Error };
                    //}

                    //if (Add_CaseCompanyMappingDB == true)
                    //{
                    //    if (_context.CaseCompanyMappings.Any(p => p.CaseId == CaseCompanyMappingBO.CaseId && p.CompanyId == CaseCompanyMappingBO.CompanyId
                    //                                     && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))))
                    //    {
                    //        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Case Company Mapping already exists.", ErrorLevel = ErrorLevel.Error };
                    //    }
                    //}
                    //else
                    //{
                    //    if (_context.CaseCompanyMappings.Any(p => p.CaseId == CaseCompanyMappingBO.CaseId && p.CompanyId == CaseCompanyMappingBO.CompanyId
                    //                                           && p.Id != CaseCompanyMappingBO.ID
                    //                                          && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))))
                    //    {
                    //        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Case Company Mapping already exists.", ErrorLevel = ErrorLevel.Error };
                    //    }
                    //}

                    caseCompanyMappingDB.CaseId = CaseCompanyMappingBO.CaseId;
                    caseCompanyMappingDB.CompanyId = CaseCompanyMappingBO.Company.ID;

                    if (Add_CaseCompanyMappingDB == true)
                    {
                        caseCompanyMappingDB = _context.CaseCompanyMappings.Add(caseCompanyMappingDB);
                    }

                    _context.SaveChanges();
                }
                else
                {
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid case company mapping", ErrorLevel = ErrorLevel.Error };
                }

                _context.SaveChanges();
                #endregion

                caseCompanyMappingDB = _context.CaseCompanyMappings.Include("Company").Where(p => p.Id == caseCompanyMappingDB.Id 
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                    .FirstOrDefault<CaseCompanyMapping>();

            var res = Convert<BO.CaseCompanyMapping, CaseCompanyMapping>(caseCompanyMappingDB);

            return (object)res;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.CaseCompanyMappings.Where(p => p.Id == id
                                                  && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                  .FirstOrDefault<CaseCompanyMapping>();

            BO.CaseCompanyMapping acc_ = Convert<BO.CaseCompanyMapping, CaseCompanyMapping>(acc);
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }
        #endregion

        #region Get By Case Id
        public override object GetByCaseId(int CaseId)
        {
            var acc = _context.CaseCompanyMappings.Where(p => p.CaseId == CaseId
                                                   && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .ToList<CaseCompanyMapping>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.CaseCompanyMapping> lstCaseCompanyMapping = new List<BO.CaseCompanyMapping>();
                foreach (CaseCompanyMapping item in acc)
                {
                    lstCaseCompanyMapping.Add(Convert<BO.CaseCompanyMapping, CaseCompanyMapping>(item));
                }
                return lstCaseCompanyMapping;
            }
        }
        #endregion

        #region Delete By ID
        public override object Delete(int id)
        {
            var acc = _context.CaseCompanyMappings.Where(p => p.Id == id
                                     && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                    .FirstOrDefault<CaseCompanyMapping>();
            if (acc != null)
            {
                acc.IsDeleted = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.CaseCompanyMapping, CaseCompanyMapping>(acc);
            return (object)res;
        }
        #endregion

        #region Get By Company Id
        public override object GetByCompanyId(int CompanyId)
        {
            var acc = _context.CaseCompanyMappings.Where(p => p.CompanyId == CompanyId
                                                   && p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                   .ToList<CaseCompanyMapping>();
            List<BO.CaseCompanyMapping> lstCaseWithUserAndPatient = new List<BO.CaseCompanyMapping>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                foreach (CaseCompanyMapping eachPatient in acc)
                {
                    lstCaseWithUserAndPatient.Add(Convert<BO.CaseCompanyMapping, CaseCompanyMapping>(eachPatient));
                }
            }
            return lstCaseWithUserAndPatient;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
