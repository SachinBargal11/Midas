using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository.Common
{
    internal class CompanyCaseConsentApprovalRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<CompanyCaseConsentApproval> _dbCompanyCaseConsentApproval;

        public CompanyCaseConsentApprovalRepository(MIDASGBXEntities context) : base(context)
        {
            _dbCompanyCaseConsentApproval = context.Set<CompanyCaseConsentApproval>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            CompanyCaseConsentApproval companyCaseConsentApproval = entity as CompanyCaseConsentApproval;

            if (companyCaseConsentApproval == null)
                return default(T);

            BO.CompanyCaseConsentApproval companyCaseConsentApprovalBO = new BO.CompanyCaseConsentApproval();

            companyCaseConsentApprovalBO.ID = companyCaseConsentApproval.Id;
            companyCaseConsentApprovalBO.CompanyId = companyCaseConsentApproval.CompanyId;
            companyCaseConsentApprovalBO.CaseId = companyCaseConsentApproval.CaseId;
            companyCaseConsentApprovalBO.IsDeleted = companyCaseConsentApproval.IsDeleted;
            companyCaseConsentApprovalBO.CreateByUserID = companyCaseConsentApproval.CreateByUserID;
            companyCaseConsentApprovalBO.UpdateByUserID = companyCaseConsentApproval.UpdateByUserID;

            if (companyCaseConsentApproval.Case != null)
            {
                BO.Case boCase = new BO.Case();
                using (CaseRepository cmp = new CaseRepository(_context))
                {
                    boCase = cmp.Convert<BO.Case, Case>(companyCaseConsentApproval.Case);
                    companyCaseConsentApprovalBO.Case = boCase;
                }
            }
            if (companyCaseConsentApproval.Company != null)
            {
                BO.Company boCompany = new BO.Company();
                using (CompanyRepository cmp = new CompanyRepository(_context))
                {
                    boCompany = cmp.Convert<BO.Company, Company>(companyCaseConsentApproval.Company);
                    companyCaseConsentApprovalBO.Company = boCompany;
                }
            }
            return (T)(object)companyCaseConsentApprovalBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.CompanyCaseConsentApproval companyCaseConsentApproval = (BO.CompanyCaseConsentApproval)(object)entity;
            var result = companyCaseConsentApproval.Validate(companyCaseConsentApproval);
            return result;
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.CompanyCaseConsentApproval companyCaseConsentApprovalBO = (BO.CompanyCaseConsentApproval)(object)entity;
            CompanyCaseConsentApproval companyCaseConsentApprovalDB = new CompanyCaseConsentApproval();

            if (companyCaseConsentApprovalBO != null)
            {
                companyCaseConsentApprovalDB = _context.CompanyCaseConsentApprovals.Where(p => p.Id == companyCaseConsentApprovalBO.ID
                                                                                   && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                  .FirstOrDefault();
                bool Add_companyCaseConsentApproval = false;

                if (companyCaseConsentApprovalBO.CompanyId <= 0 || companyCaseConsentApprovalBO.CaseId <= 0)
                {
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Company, Case and Consent data.", ErrorLevel = ErrorLevel.Error };
                }

                if (companyCaseConsentApprovalDB == null && companyCaseConsentApprovalBO.ID > 0)
                {
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Company, Case and Consent data.", ErrorLevel = ErrorLevel.Error };
                }
                else if (companyCaseConsentApprovalDB == null && companyCaseConsentApprovalBO.ID <= 0)
                {
                    companyCaseConsentApprovalDB = new CompanyCaseConsentApproval();
                    Add_companyCaseConsentApproval = true;
                }

                if (Add_companyCaseConsentApproval == true)
                {
                    if (_context.CompanyCaseConsentApprovals.Any(p => p.CompanyId == companyCaseConsentApprovalBO.CompanyId && p.CaseId == companyCaseConsentApprovalBO.CaseId
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))))
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Company, Case and Consent data already exists.", ErrorLevel = ErrorLevel.Error };
                    }
                }
                else
                {
                    if (_context.CompanyCaseConsentApprovals.Any(p => p.CompanyId == companyCaseConsentApprovalBO.CompanyId && p.CaseId == companyCaseConsentApprovalBO.CaseId
                                                                       && p.Id != companyCaseConsentApprovalBO.ID
                                                                       && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))))
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Company, Case and Consent data already exists.", ErrorLevel = ErrorLevel.Error };
                    }
                }

                companyCaseConsentApprovalDB.CompanyId = companyCaseConsentApprovalBO.CompanyId;
                companyCaseConsentApprovalDB.CaseId = (int)companyCaseConsentApprovalBO.CaseId;

                if (Add_companyCaseConsentApproval == true)
                {
                    companyCaseConsentApprovalDB = _context.CompanyCaseConsentApprovals.Add(companyCaseConsentApprovalDB);
                }
                _context.SaveChanges();

            }

            else
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid details.", ErrorLevel = ErrorLevel.Error };
            }

            _context.SaveChanges();

            companyCaseConsentApprovalDB = _context.CompanyCaseConsentApprovals.Include("Case")
                                                                               .Include("Company")
                                                                               .Where(p => p.Id == companyCaseConsentApprovalDB.Id
                                                                               && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                               .FirstOrDefault<CompanyCaseConsentApproval>();

            var res = Convert<BO.CompanyCaseConsentApproval, CompanyCaseConsentApproval>(companyCaseConsentApprovalDB);
            return (object)res;
        }
        #endregion

        #region SaveDoctor
        //public override object SaveDoctor<T>(T entity)
        //{
        //    BO.DoctorCaseConsentApproval doctorCaseConsentApprovalBO = (BO.DoctorCaseConsentApproval)(object)entity;
        //    DoctorCaseConsentApproval doctorCaseConsentApprovalDB = new DoctorCaseConsentApproval();

        //    if (doctorCaseConsentApprovalBO != null)
        //    {
        //        doctorCaseConsentApprovalDB = _context.DoctorCaseConsentApprovals.Where(p => p.Id == doctorCaseConsentApprovalBO.ID
        //                                                                         && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
        //                                                                         .FirstOrDefault();
        //        bool Add_doctorCaseConsentApproval = false;

        //        if (doctorCaseConsentApprovalBO.DoctorId <= 0 || doctorCaseConsentApprovalBO.Patientid <= 0)
        //        {
        //            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Doctor, Case and Consent data.", ErrorLevel = ErrorLevel.Error };
        //        }

        //        if (doctorCaseConsentApprovalDB == null && doctorCaseConsentApprovalBO.ID > 0)
        //        {
        //            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Doctor, Case and Consent data.", ErrorLevel = ErrorLevel.Error };
        //        }
        //        else if (doctorCaseConsentApprovalDB == null && doctorCaseConsentApprovalBO.ID <= 0)
        //        {
        //            doctorCaseConsentApprovalDB = new DoctorCaseConsentApproval();
        //            Add_doctorCaseConsentApproval = true;
        //        }

        //        if (Add_doctorCaseConsentApproval == true)
        //        {
        //            if (_context.DoctorCaseConsentApprovals.Any(p => p.DoctorId == doctorCaseConsentApprovalBO.DoctorId && p.Patientid == doctorCaseConsentApprovalBO.Patientid
        //                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))))
        //            {
        //                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Doctor, Case and Consent data already exists.", ErrorLevel = ErrorLevel.Error };
        //            }
        //        }
        //        else
        //        {
        //            if (_context.DoctorCaseConsentApprovals.Any(p => p.DoctorId == doctorCaseConsentApprovalBO.DoctorId && p.Patientid == doctorCaseConsentApprovalBO.Patientid
        //                                                               && p.Id != doctorCaseConsentApprovalBO.ID
        //                                                               && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))))
        //            {
        //                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Doctor, Case and Consent data already exists.", ErrorLevel = ErrorLevel.Error };
        //            }
        //        }

        //        doctorCaseConsentApprovalDB.DoctorId = doctorCaseConsentApprovalBO.DoctorId;
        //        doctorCaseConsentApprovalDB.Patientid = doctorCaseConsentApprovalBO.Patientid;
        //        doctorCaseConsentApprovalDB.FileName = doctorCaseConsentApprovalBO.FileName;

        //        if (Add_doctorCaseConsentApproval == true)
        //        {
        //            doctorCaseConsentApprovalDB = _context.DoctorCaseConsentApprovals.Add(doctorCaseConsentApprovalDB);
        //        }
        //        _context.SaveChanges();

        //    }

        //    else
        //    {
        //        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid details.", ErrorLevel = ErrorLevel.Error };
        //    }

        //    _context.SaveChanges();

        //    doctorCaseConsentApprovalDB = _context.DoctorCaseConsentApprovals.Where(p => p.Id == doctorCaseConsentApprovalDB.Id
        //                                                                      && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
        //                                                                      .FirstOrDefault<DoctorCaseConsentApproval>();

        //    var res = Convert<BO.DoctorCaseConsentApproval, DoctorCaseConsentApproval>(doctorCaseConsentApprovalDB);
        //    return (object)res;
        //}
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.CompanyCaseConsentApprovals.Include("Case")
                                                          .Include("Company")
                                                          .Where(p => p.Id == id
                                                          && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                          .FirstOrDefault<CompanyCaseConsentApproval>();

            BO.CompanyCaseConsentApproval acc_ = Convert<BO.CompanyCaseConsentApproval, CompanyCaseConsentApproval>(acc);
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
            var acc = _context.CompanyCaseConsentApprovals.Include("Case")
                                                         .Include("Company")
                                                         .Where(p => p.CaseId == CaseId
                                                          && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                          .ToList<CompanyCaseConsentApproval>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.CompanyCaseConsentApproval> lstCompanyCaseConsentApproval = new List<BO.CompanyCaseConsentApproval>();
                foreach (CompanyCaseConsentApproval item in acc)
                {
                    lstCompanyCaseConsentApproval.Add(Convert<BO.CompanyCaseConsentApproval, CompanyCaseConsentApproval>(item));
                }
                return lstCompanyCaseConsentApproval;
            }
        }
        #endregion

        #region Get By Company ID
        public override object GetByCompanyId(int id)
        {
            var acc = _context.CompanyCaseConsentApprovals.Include("Case")
                                                          .Include("Company")
                                                          .Where(p => p.CompanyId == id
                                                           && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                          .ToList<CompanyCaseConsentApproval>();

            List<BO.CompanyCaseConsentApproval> boCompanyCaseConsentApproval = new List<BO.CompanyCaseConsentApproval>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var Eachapproval in acc)
                {
                    boCompanyCaseConsentApproval.Add(Convert<BO.CompanyCaseConsentApproval, CompanyCaseConsentApproval>(Eachapproval));
                }

            }

            return (object)boCompanyCaseConsentApproval;
        }
        #endregion

        #region Delete By ID
        public override object Delete(int id)
        {
            var acc = _context.CompanyCaseConsentApprovals.Where(p => p.Id == id
                                                          && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                          .FirstOrDefault<CompanyCaseConsentApproval>();
            if (acc != null)
            {
                acc.IsDeleted = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.CompanyCaseConsentApproval, CompanyCaseConsentApproval>(acc);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

}


