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
    internal class PatientVisitRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<PatientVisit> _dbEmpInfo;

        public PatientVisitRepository(MIDASGBXEntities context) : base(context)
        {
            _dbEmpInfo = context.Set<PatientVisit>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.PatientVisit patientVisit = (BO.PatientVisit)(object)entity;
            var result = patientVisit.Validate(patientVisit);
            return result;
        }
        #endregion


        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            PatientVisit patientVisit = entity as PatientVisit;

            if (patientVisit == null)
                return default(T);

            BO.PatientVisit patientVisitBO = new BO.PatientVisit();
            patientVisitBO.ID = patientVisit.Id;
            patientVisitBO.CaseId = patientVisit.CaseId;
            patientVisitBO.LocationId = patientVisit.LocationId;
            patientVisitBO.StartDate = patientVisit.StartDate;
            patientVisitBO.StartTime = patientVisit.StartTime;
            patientVisitBO.EndDate = patientVisit.EndDate;
            patientVisitBO.EndTime = patientVisit.EndTime;
            patientVisitBO.Notes = patientVisit.Notes;
            patientVisitBO.DoctorId = patientVisit.DoctorId;
            patientVisitBO.BillStatus = patientVisit.BillStatus;
            patientVisitBO.RefferId = patientVisit.RefferId;
            patientVisitBO.VisitStatusId = patientVisit.VisitStatusId;
            patientVisitBO.BillDate = patientVisit.BillDate;
            patientVisitBO.BillNumber = patientVisit.BillNumber;
            patientVisitBO.VisitType = patientVisit.VisitType;
            patientVisitBO.ReschduleId = patientVisit.ReschduleId;
            patientVisitBO.ReschduleDate = patientVisit.ReschduleDate;
            patientVisitBO.StudyNumber = patientVisit.StudyNumber;
            patientVisitBO.BillFinalize = patientVisit.BillFinalize;
            patientVisitBO.AddedByDoctor = patientVisit.AddedByDoctor;
            patientVisitBO.CheckInUserId = patientVisit.CheckInUserId;
            patientVisitBO.BillManualyUnFinalized = patientVisit.BillManualyUnFinalized;
            patientVisitBO.IsDeleted = patientVisit.IsDeleted;
            patientVisitBO.CreateByUserID = patientVisit.CreateByUserID;
            patientVisitBO.UpdateByUserID = patientVisit.UpdateByUserID;

            BO.PatientVisitEvent boPatientVisitEvent = new BO.PatientVisitEvent();
            using (PatientVisitEventRepository cmp = new PatientVisitEventRepository(_context))
            {
                boPatientVisitEvent = cmp.Convert<BO.PatientVisitEvent, PatientVisitEvent>(patientVisit.PatientVisitEvents);
                patientVisitBO.PatientVisitEvents = boPatientVisitEvent;
            }



            return (T)(object)patientVisitBO;
        }
        #endregion

       
        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.PatientVisits.Include("PatientVisitEvents").Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<PatientVisit>();
            BO.PatientVisit acc_ = Convert<BO.PatientVisit, PatientVisit>(acc);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region Get By Case ID 
        public override object GetByCaseId(int id)
        {
            var acc = _context.PatientVisits.Where(p => p.CaseId == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList<PatientVisit>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit> lstrefoffice = new List<BO.PatientVisit>();
                foreach (PatientVisit item in acc)
                {
                    lstrefoffice.Add(Convert<BO.PatientVisit, PatientVisit>(item));
                }
                return lstrefoffice;
            }
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.PatientVisit patientVisitBO = (BO.PatientVisit)(object)entity;

            PatientVisit patientVisitDB = new PatientVisit();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {

                bool IsEditMode = false;
                IsEditMode = (patientVisitBO != null && patientVisitBO.ID > 0) ? true : false;
          
                #region patient visit
                if (patientVisitBO != null)
                {
                    bool Add_patientVisitDB = false;
                    patientVisitDB = _context.PatientVisits.Where(p => p.Id == patientVisitBO.ID).FirstOrDefault();

                    if (patientVisitDB == null && patientVisitBO.ID <= 0)
                    {
                        patientVisitDB = new PatientVisit();
                        Add_patientVisitDB = true;
                    }
                    else if (patientVisitDB == null && patientVisitBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient visit information dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    patientVisitDB.CaseId = patientVisitBO.CaseId;
                    patientVisitDB.LocationId = patientVisitBO.LocationId;
                    patientVisitDB.StartDate = IsEditMode == true && patientVisitBO.StartDate == null ? patientVisitDB.StartDate : patientVisitBO.StartDate;
                    patientVisitDB.StartTime = IsEditMode == true && patientVisitBO.StartTime == null ? patientVisitDB.StartTime : patientVisitBO.StartTime;
                    patientVisitDB.EndDate = IsEditMode == true && patientVisitBO.EndDate == null ? patientVisitDB.EndDate : patientVisitBO.EndDate;
                    patientVisitDB.EndTime = IsEditMode == true && patientVisitBO.EndTime == null ? patientVisitDB.EndTime : patientVisitBO.EndTime;
                    patientVisitDB.Notes = IsEditMode == true && patientVisitBO.Notes == null ? patientVisitDB.Notes : patientVisitBO.Notes;
                    patientVisitDB.DoctorId = IsEditMode == true && patientVisitBO.DoctorId == null ? patientVisitDB.DoctorId : patientVisitBO.DoctorId;
                    patientVisitDB.BillStatus = IsEditMode == true && patientVisitBO.BillStatus == null ? patientVisitDB.BillStatus : patientVisitBO.BillStatus;
                    patientVisitDB.RefferId = IsEditMode == true && patientVisitBO.RefferId == null ? patientVisitDB.RefferId : patientVisitBO.RefferId;
                    patientVisitDB.VisitStatusId = IsEditMode == true && patientVisitBO.VisitStatusId == null ? patientVisitDB.VisitStatusId : patientVisitBO.VisitStatusId;
                    patientVisitDB.BillDate = IsEditMode == true && patientVisitBO.BillDate == null ? patientVisitDB.BillDate : patientVisitBO.BillDate;
                    patientVisitDB.BillNumber = IsEditMode == true && patientVisitBO.BillNumber == null ? patientVisitDB.BillNumber : patientVisitBO.BillNumber;
                    patientVisitDB.VisitType = IsEditMode == true && patientVisitBO.VisitType == null ? patientVisitDB.VisitType : patientVisitBO.VisitType;
                    patientVisitDB.ReschduleId = IsEditMode == true && patientVisitBO.ReschduleId == null ? patientVisitDB.ReschduleId : patientVisitBO.ReschduleId;
                    patientVisitDB.ReschduleDate = IsEditMode == true && patientVisitBO.ReschduleDate == null ? patientVisitDB.ReschduleDate : patientVisitBO.ReschduleDate;
                    patientVisitDB.StudyNumber = IsEditMode == true && patientVisitBO.StudyNumber == null ? patientVisitDB.StudyNumber : patientVisitBO.StudyNumber;
                    patientVisitDB.BillFinalize = IsEditMode == true && patientVisitBO.BillFinalize == null ? patientVisitDB.BillFinalize : patientVisitBO.BillFinalize;
                    patientVisitDB.AddedByDoctor = IsEditMode == true && patientVisitBO.AddedByDoctor == null ? patientVisitDB.AddedByDoctor : patientVisitBO.AddedByDoctor;
                    patientVisitDB.CheckInUserId = IsEditMode == true && patientVisitBO.CheckInUserId == null ? patientVisitDB.CheckInUserId : patientVisitBO.CheckInUserId;
                    patientVisitDB.BillManualyUnFinalized = IsEditMode == true && patientVisitBO.BillManualyUnFinalized == null ? patientVisitDB.BillManualyUnFinalized : patientVisitBO.BillManualyUnFinalized;

                    if (Add_patientVisitDB == true)
                    {
                        patientVisitDB = _context.PatientVisits.Add(patientVisitDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid patient visit information details.", ErrorLevel = ErrorLevel.Error };
                    }
                    patientVisitDB = null;
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                patientVisitDB = _context.PatientVisits.Where(p => p.Id == patientVisitDB.Id).FirstOrDefault<PatientVisit>();
            }

            var res = Convert<BO.PatientVisit, PatientVisit>(patientVisitDB);
            return (object)res;
        }
        #endregion

        #region Delete By ID
        public override object DeleteById(int id)
        {
            var acc = _context.PatientVisits.Include("PatientVisitEvents").Where(p => p.Id == id && (p.IsDeleted.HasValue == false || p.IsDeleted == false)).FirstOrDefault<PatientVisit>();
            if (acc != null)
            {
                acc.IsDeleted = true;
                _context.SaveChanges();
            }
            else
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient visit details dosent exists.", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.PatientVisit, PatientVisit>(acc);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
