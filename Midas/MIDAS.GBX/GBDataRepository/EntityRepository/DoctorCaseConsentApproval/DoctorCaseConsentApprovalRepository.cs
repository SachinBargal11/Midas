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
    internal class DoctorCaseConsentApprovalRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<DoctorCaseConsentApproval> _dbDoctorCaseConsentApproval;

        public DoctorCaseConsentApprovalRepository(MIDASGBXEntities context) : base(context)
        {
            _dbDoctorCaseConsentApproval = context.Set<DoctorCaseConsentApproval>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            DoctorCaseConsentApproval doctorCaseConsentApprovals = entity as DoctorCaseConsentApproval;

            if (doctorCaseConsentApprovals == null)
                return default(T);

            BO.DoctorCaseConsentApproval doctorCaseConsentApprovalBO = new BO.DoctorCaseConsentApproval();

            doctorCaseConsentApprovalBO.ID = doctorCaseConsentApprovals.Id;
            doctorCaseConsentApprovalBO.DoctorId = doctorCaseConsentApprovals.DoctorId;
            doctorCaseConsentApprovalBO.CaseId = doctorCaseConsentApprovals.CaseId;
            doctorCaseConsentApprovalBO.ConsentReceived = doctorCaseConsentApprovals.ConsentReceived;
            doctorCaseConsentApprovalBO.IsDeleted = doctorCaseConsentApprovals.IsDeleted;
            doctorCaseConsentApprovalBO.CreateByUserID = doctorCaseConsentApprovals.CreateByUserID;
            doctorCaseConsentApprovalBO.UpdateByUserID = doctorCaseConsentApprovals.UpdateByUserID;

            BO.Case boCase = new BO.Case();
            using (CaseRepository cmp = new CaseRepository(_context))
            {

                boCase = cmp.Convert<BO.Case, Case>(doctorCaseConsentApprovals.Case);
                doctorCaseConsentApprovalBO.Case = boCase;
            }
            BO.Doctor boDoctor = new BO.Doctor();
            using (DoctorRepository cmp = new DoctorRepository(_context))
            {

                boDoctor = cmp.Convert<BO.Doctor, Doctor>(doctorCaseConsentApprovals.Doctor);
                doctorCaseConsentApprovalBO.Doctor = boDoctor;
            }

            return (T)(object)doctorCaseConsentApprovalBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.DoctorCaseConsentApproval doctorCaseConsentApproval = (BO.DoctorCaseConsentApproval)(object)entity;
            var result = doctorCaseConsentApproval.Validate(doctorCaseConsentApproval);
            return result;
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.DoctorCaseConsentApproval doctorCaseConsentApprovalBO = (BO.DoctorCaseConsentApproval)(object)entity;
            DoctorCaseConsentApproval doctorCaseConsentApprovalDB = new DoctorCaseConsentApproval();

            if (doctorCaseConsentApprovalBO != null)
            {
                doctorCaseConsentApprovalDB = _context.DoctorCaseConsentApprovals.Where(p => p.Id == doctorCaseConsentApprovalBO.ID
                                                                                 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                 .FirstOrDefault();
                bool Add_doctorCaseConsentApproval = false;

                if (doctorCaseConsentApprovalBO.DoctorId <= 0 || doctorCaseConsentApprovalBO.CaseId <= 0)
                {
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Doctor, Case and Consent data.", ErrorLevel = ErrorLevel.Error };
                }

                if (doctorCaseConsentApprovalDB == null && doctorCaseConsentApprovalBO.ID > 0)
                {
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Doctor, Case and Consent data.", ErrorLevel = ErrorLevel.Error };
                }
                else if (doctorCaseConsentApprovalDB == null && doctorCaseConsentApprovalBO.ID <= 0)
                {
                    doctorCaseConsentApprovalDB = new DoctorCaseConsentApproval();
                    Add_doctorCaseConsentApproval = true;
                }

                if (Add_doctorCaseConsentApproval == true)
                {
                    if (_context.DoctorCaseConsentApprovals.Any(p => p.DoctorId == doctorCaseConsentApprovalBO.DoctorId && p.CaseId == doctorCaseConsentApprovalBO.CaseId
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))))
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Doctor, Case and Consent data already exists.", ErrorLevel = ErrorLevel.Error };
                    }
                }
                else
                {
                    if (_context.DoctorCaseConsentApprovals.Any(p => p.DoctorId == doctorCaseConsentApprovalBO.DoctorId && p.CaseId == doctorCaseConsentApprovalBO.CaseId
                                                                       && p.Id != doctorCaseConsentApprovalBO.ID
                                                                       && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))))
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Doctor, Case and Consent data already exists.", ErrorLevel = ErrorLevel.Error };
                    }
                }

                doctorCaseConsentApprovalDB.DoctorId = doctorCaseConsentApprovalBO.DoctorId;
                doctorCaseConsentApprovalDB.CaseId = doctorCaseConsentApprovalBO.CaseId;
                doctorCaseConsentApprovalDB.ConsentReceived = doctorCaseConsentApprovalBO.ConsentReceived;

                if (Add_doctorCaseConsentApproval == true)
                {
                    doctorCaseConsentApprovalDB = _context.DoctorCaseConsentApprovals.Add(doctorCaseConsentApprovalDB);
                }
                _context.SaveChanges();

            }

            else
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid details.", ErrorLevel = ErrorLevel.Error };
            }

            _context.SaveChanges();

            doctorCaseConsentApprovalDB = _context.DoctorCaseConsentApprovals.Where(p => p.Id == doctorCaseConsentApprovalDB.Id
                                                                              && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                              .FirstOrDefault<DoctorCaseConsentApproval>();

            var res = Convert<BO.DoctorCaseConsentApproval, DoctorCaseConsentApproval>(doctorCaseConsentApprovalDB);
            return (object)res;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.DoctorCaseConsentApprovals.Include("Case")
                                                         .Include("Doctor")
                                                         .Include("Doctor.User")
                                                         .Where(p => p.Id == id
                                                         && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                         .FirstOrDefault<DoctorCaseConsentApproval>();

            BO.DoctorCaseConsentApproval acc_ = Convert<BO.DoctorCaseConsentApproval, DoctorCaseConsentApproval>(acc);
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
            var acc = _context.DoctorCaseConsentApprovals.Include("Case")
                                                         .Include("Doctor")
                                                         .Include("Doctor.User")
                                                         .Where(p => p.CaseId == CaseId
                                                          && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                          .ToList<DoctorCaseConsentApproval>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.DoctorCaseConsentApproval> lstdoctorCaseConsentApproval = new List<BO.DoctorCaseConsentApproval>();
                foreach (DoctorCaseConsentApproval item in acc)
                {
                    lstdoctorCaseConsentApproval.Add(Convert<BO.DoctorCaseConsentApproval, DoctorCaseConsentApproval>(item));
                }
                return lstdoctorCaseConsentApproval;
            }
        }
        #endregion

        #region Get By Doctor Id
        public override object GetByDoctorId(int id)
        {
            var acc = _context.DoctorCaseConsentApprovals.Include("Case")
                                                         .Include("Doctor")
                                                         .Include("Doctor.User")
                                                         .Where(p => p.DoctorId == id
                                                         && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                         .ToList<DoctorCaseConsentApproval>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Doctor Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.DoctorCaseConsentApproval> lstdoctorCaseConsentApproval = new List<BO.DoctorCaseConsentApproval>();
                foreach (DoctorCaseConsentApproval item in acc)
                {
                    lstdoctorCaseConsentApproval.Add(Convert<BO.DoctorCaseConsentApproval, DoctorCaseConsentApproval>(item));
                }
                return lstdoctorCaseConsentApproval;
            }
        }
        #endregion

        #region Delete By ID
        public override object Delete(int id)
        {
            var acc = _context.DoctorCaseConsentApprovals.Where(p => p.Id == id
                                                         && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                         .FirstOrDefault<DoctorCaseConsentApproval>();
            if (acc != null)
            {
                acc.IsDeleted = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.DoctorCaseConsentApproval, DoctorCaseConsentApproval>(acc);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

}


