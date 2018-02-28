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
    internal class DiagnosisCodeCompanyMappingRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<DiagnosisCode> _dbSet;

        #region Constructor
        public DiagnosisCodeCompanyMappingRepository(MIDASGBXEntities context) : base(context)
        {
            _dbSet = context.Set<DiagnosisCode>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            DiagnosisCodeCompany diagnosisCodeCompanyMapping = entity as DiagnosisCodeCompany;

            if (diagnosisCodeCompanyMapping == null)
                return default(T);

            BO.DiagnosisCodeCompanyMapping diagnosisCodeCompanyMappingBO = new BO.DiagnosisCodeCompanyMapping();

            diagnosisCodeCompanyMappingBO.ID = diagnosisCodeCompanyMapping.Id;
            diagnosisCodeCompanyMappingBO.DiagnosisTypeCompnayID = diagnosisCodeCompanyMapping.DiagnosisTypeCompnayID;
            diagnosisCodeCompanyMappingBO.CompanyID = diagnosisCodeCompanyMapping.CompanyID;
            diagnosisCodeCompanyMappingBO.DiagnosisCodeID = diagnosisCodeCompanyMappingBO.DiagnosisCodeID;

            if (diagnosisCodeCompanyMappingBO.IsDeleted.HasValue)
                diagnosisCodeCompanyMappingBO.IsDeleted = diagnosisCodeCompanyMapping.IsDeleted.Value;
            if (diagnosisCodeCompanyMappingBO.UpdateByUserID.HasValue)
                diagnosisCodeCompanyMappingBO.UpdateByUserID = diagnosisCodeCompanyMapping.UpdatedByUserID.Value;

            return (T)(object)diagnosisCodeCompanyMappingBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.DiagnosisCodeCompanyMapping diagnosisCodeCompanyMapping = (BO.DiagnosisCodeCompanyMapping)(object)entity;
            var result = diagnosisCodeCompanyMapping.Validate(diagnosisCodeCompanyMapping);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(List<T> entities)
        {
            List<BO.DiagnosisCodeCompanyMapping> diagnosisCodeCompanyMappingBO = (List<BO.DiagnosisCodeCompanyMapping>)(object)entities;
            List<DiagnosisCodeCompany> diagnosisCodeCompanyMappings = new List<DiagnosisCodeCompany>();
            List<BO.DiagnosisCodeCompanyMapping> boDiagnosisCodeCompanyMappings = new List<BO.DiagnosisCodeCompanyMapping>();
            DiagnosisCodeCompany diagnosisCodeCompanyMappingDB = new DiagnosisCodeCompany();
            DiagnosisTypeCompany diagnosisTypeCompanyMappingDB = new DiagnosisTypeCompany();


            if (diagnosisCodeCompanyMappingBO != null)
            {
                foreach (var item in diagnosisCodeCompanyMappingBO)
                {
                   

                    diagnosisTypeCompanyMappingDB  = (from dct in _context.DiagnosisTypeCompanies
                                                      where dct.DiagnosisTypeText == item.DiagnosisTypeText.Trim()
                                                            && dct.CompanyID == item.CompanyID
                                                            && (dct.IsDeleted.HasValue == false || (dct.IsDeleted.HasValue == true && dct.IsDeleted.Value == false))
                                                      select dct
                                                           ).FirstOrDefault();



                    if (diagnosisTypeCompanyMappingDB == null)
                    {
                        diagnosisTypeCompanyMappingDB = new DiagnosisTypeCompany();
                        diagnosisTypeCompanyMappingDB.DiagnosisTypeText = item.DiagnosisTypeText.Trim();
                        diagnosisTypeCompanyMappingDB.CompanyID = item.CompanyID;
                        diagnosisTypeCompanyMappingDB = _context.DiagnosisTypeCompanies.Add(diagnosisTypeCompanyMappingDB);
                        _context.SaveChanges();
                    }


                    diagnosisCodeCompanyMappingDB = (from pcm in _context.DiagnosisCodeCompanies
                                                     where pcm.DiagnosisCodeID == item.DiagnosisCodeID
                                                           && pcm.CompanyID == item.CompanyID
                                                           && pcm.DiagnosisTypeCompnayID == diagnosisTypeCompanyMappingDB.Id
                                                           && (pcm.IsDeleted.HasValue == false || (pcm.IsDeleted.HasValue == true && pcm.IsDeleted.Value == false))
                                                     select pcm
                                                          ).FirstOrDefault();


                    bool AddDiagnosisCodeCompanyMapping = false;
                    if (diagnosisCodeCompanyMappingDB == null)
                    {
                        AddDiagnosisCodeCompanyMapping = true;
                        diagnosisCodeCompanyMappingDB = new DiagnosisCodeCompany();
                    }

                    diagnosisCodeCompanyMappingDB.DiagnosisCodeID = item.DiagnosisCodeID;
                    diagnosisCodeCompanyMappingDB.CompanyID = item.CompanyID;
                    diagnosisCodeCompanyMappingDB.DiagnosisTypeCompnayID = diagnosisTypeCompanyMappingDB.Id;
                    if (AddDiagnosisCodeCompanyMapping)
                    {
                        diagnosisCodeCompanyMappingDB = _context.DiagnosisCodeCompanies.Add(diagnosisCodeCompanyMappingDB);

                    }
                    _context.SaveChanges();

                    diagnosisCodeCompanyMappings.Add(diagnosisCodeCompanyMappingDB);


                }
            }

            foreach (var item in diagnosisCodeCompanyMappings)
            {
                if (item != null)
                {
                    boDiagnosisCodeCompanyMappings.Add(Convert<BO.DiagnosisCodeCompanyMapping, DiagnosisCodeCompany>(item));
                }

            }

            return (object)boDiagnosisCodeCompanyMappings;
        }
        #endregion

        #region Get By Company ID 
        public override object GetByCompanyId(int CompanyId)
        {
            var diagnosisCode = (from pccm in _context.DiagnosisCodeCompanies
                                                  join pc in _context.DiagnosisCodes on pccm.DiagnosisCodeID equals pc.Id
                                                  join sp in _context.DiagnosisTypeCompanies on pccm.DiagnosisTypeCompnayID equals sp.Id
                                                  where pccm.CompanyID == CompanyId
                                                        && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                                        && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                                        && (sp.IsDeleted.HasValue == false || (sp.IsDeleted.HasValue == true && sp.IsDeleted.Value == false))
                                                  select new
                                                  {
                                                      id = pccm.Id,
                                                      diagnosisCodeId = pc.Id,
                                                      diagnosisTypeId = sp.Id,
                                                      companyID = pccm.CompanyID,
                                                      diagnosisCodeText = pc.DiagnosisCodeText,
                                                      diagnosisCodeDesc = pc.DiagnosisCodeDesc,
                                                      diagnosisTypeText = sp.DiagnosisTypeText,
                                                  }).ToList().OrderBy(y=> y.diagnosisTypeText);

          


            if (diagnosisCode == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                return diagnosisCode;
            }
        }
        #endregion

        #region Get By Company ID and DiagnosisTypeCompany
        public override object Get(int CompanyId, int diagnosisTypeCompnayID)
        {

            var diagnosisCode = (from pccm in _context.DiagnosisCodeCompanies
                                 join pc in _context.DiagnosisCodes on pccm.DiagnosisCodeID equals pc.Id
                                 join sp in _context.DiagnosisTypeCompanies on pccm.DiagnosisTypeCompnayID equals sp.Id
                                 where pccm.CompanyID == CompanyId 
                                       && pccm.DiagnosisTypeCompnayID == diagnosisTypeCompnayID
                                       && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                       && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                       && (sp.IsDeleted.HasValue == false || (sp.IsDeleted.HasValue == true && sp.IsDeleted.Value == false))
                                 select new
                                 {
                                     id = pccm.Id,
                                     diagnosisCodeId = pc.Id,
                                     diagnosisTypeId = sp.Id,
                                     companyID = pccm.CompanyID,
                                     diagnosisCodeText = pc.DiagnosisCodeText,
                                     diagnosisCodeDesc = pc.DiagnosisCodeDesc,
                                     diagnosisTypeText = sp.DiagnosisTypeText,
                                 }).ToList().OrderBy(y => y.diagnosisTypeText);


            if (diagnosisCode == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                return diagnosisCode;
            }
        }
        #endregion

        #region Delete
        public override object Delete(int id)
        {

            DiagnosisCodeCompany diagnosisCodeCompanyMappingDB = new DiagnosisCodeCompany();

            diagnosisCodeCompanyMappingDB = _context.DiagnosisCodeCompanies.Where(p => p.Id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault();

            if (diagnosisCodeCompanyMappingDB != null)
            {
                diagnosisCodeCompanyMappingDB.IsDeleted = true;
                _context.SaveChanges();
            }
            else
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Diagnosis Code Details dosen't exists.", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.DiagnosisCodeCompanyMapping, DiagnosisCodeCompany>(diagnosisCodeCompanyMappingDB);
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
