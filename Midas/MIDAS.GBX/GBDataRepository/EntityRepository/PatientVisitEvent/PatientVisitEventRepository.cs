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
    internal class PatientVisitEventRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<PatientVisitEvent> _dbpatientVisitEvent;

        public PatientVisitEventRepository(MIDASGBXEntities context) : base(context)
        {
            _dbpatientVisitEvent = context.Set<PatientVisitEvent>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.PatientVisitEvent patientVisitEvent = (BO.PatientVisitEvent)(object)entity;
            var result = patientVisitEvent.Validate(patientVisitEvent);
            return result;
        }
        #endregion


        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            PatientVisitEvent patientVisitEvent = entity as PatientVisitEvent;

            if (patientVisitEvent == null)
                return default(T);

            BO.PatientVisitEvent patientVisitEventBO = new BO.PatientVisitEvent();
            patientVisitEventBO.ID = patientVisitEvent.Id;
            patientVisitEventBO.PatientVisitId = patientVisitEvent.PatientVisitId;
            patientVisitEventBO.SpecialtyId = patientVisitEvent.SpecialtyId;
            patientVisitEventBO.ProcedureCodeId = patientVisitEvent.ProcedureCodeId;
            patientVisitEventBO.EventStatusId = patientVisitEvent.EventStatusId;
            patientVisitEventBO.ReportReceived = patientVisitEvent.ReportReceived;
            patientVisitEventBO.StudyNumber = patientVisitEvent.StudyNumber;
            patientVisitEventBO.Note = patientVisitEvent.Note;
            patientVisitEventBO.ReportPath = patientVisitEvent.ReportPath;
            patientVisitEventBO.BillStatus = patientVisitEvent.BillStatus;
            patientVisitEventBO.ReadingDoctorId = patientVisitEvent.ReadingDoctorId;
            patientVisitEventBO.BillDate = patientVisitEvent.BillDate;
            patientVisitEventBO.BillNumber = patientVisitEvent.BillNumber;
            patientVisitEventBO.ImageId = patientVisitEvent.ImageId;
            patientVisitEventBO.Modifier = patientVisitEvent.Modifier;
            patientVisitEventBO.IsDeleted = patientVisitEvent.IsDeleted;
            patientVisitEventBO.CreateByUserID = patientVisitEvent.CreateByUserID;
            patientVisitEventBO.UpdateByUserID = patientVisitEvent.UpdateByUserID;

            return (T)(object)patientVisitEventBO;
        }
        #endregion


        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.PatientVisitEvents.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<PatientVisitEvent>();
            BO.PatientVisitEvent acc_ = Convert<BO.PatientVisitEvent, PatientVisitEvent>(acc);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.PatientVisitEvent patientVisitEventBO = (BO.PatientVisitEvent)(object)entity;

            PatientVisitEvent patientVisitEventDB = new PatientVisitEvent();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {

                bool IsEditMode = false;
                IsEditMode = (patientVisitEventBO != null && patientVisitEventBO.ID > 0) ? true : false;

                #region patient visit Event
                if (patientVisitEventBO != null)
                {
                    bool Add_patientVisitEventDB = false;
                    patientVisitEventDB = _context.PatientVisitEvents.Where(p => p.Id == patientVisitEventBO.ID).FirstOrDefault();

                    if (patientVisitEventDB == null && patientVisitEventBO.ID <= 0)
                    {
                        patientVisitEventDB = new PatientVisitEvent();
                        Add_patientVisitEventDB = true;
                    }
                    else if (patientVisitEventDB == null && patientVisitEventBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient visit event information dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    patientVisitEventDB.PatientVisitId = patientVisitEventBO.PatientVisitId;
                    patientVisitEventDB.SpecialtyId = patientVisitEventBO.SpecialtyId;
                    patientVisitEventDB.ProcedureCodeId = IsEditMode == true && patientVisitEventBO.ProcedureCodeId == null ? patientVisitEventDB.ProcedureCodeId : patientVisitEventBO.ProcedureCodeId;
                    patientVisitEventDB.EventStatusId = IsEditMode == true && patientVisitEventBO.EventStatusId == null ? patientVisitEventDB.EventStatusId : patientVisitEventBO.EventStatusId;
                    patientVisitEventDB.ReportReceived = IsEditMode == true && patientVisitEventBO.ReportReceived == null ? patientVisitEventDB.ReportReceived : patientVisitEventBO.ReportReceived;
                    patientVisitEventDB.StudyNumber = IsEditMode == true && patientVisitEventBO.StudyNumber == null ? patientVisitEventDB.StudyNumber : patientVisitEventBO.StudyNumber;
                    patientVisitEventDB.Note = IsEditMode == true && patientVisitEventBO.Note == null ? patientVisitEventDB.Note : patientVisitEventBO.Note;
                    patientVisitEventDB.ReportPath = IsEditMode == true && patientVisitEventBO.ReportPath == null ? patientVisitEventDB.ReportPath : patientVisitEventBO.ReportPath;
                    patientVisitEventDB.BillStatus = IsEditMode == true && patientVisitEventBO.BillStatus == null ? patientVisitEventDB.BillStatus : patientVisitEventBO.BillStatus;
                    patientVisitEventDB.ReadingDoctorId = IsEditMode == true && patientVisitEventBO.ReadingDoctorId == null ? patientVisitEventDB.ReadingDoctorId : patientVisitEventBO.ReadingDoctorId;
                    patientVisitEventDB.BillDate = IsEditMode == true && patientVisitEventBO.BillDate == null ? patientVisitEventDB.BillDate : patientVisitEventBO.BillDate;
                    patientVisitEventDB.BillNumber = IsEditMode == true && patientVisitEventBO.BillNumber == null ? patientVisitEventDB.BillNumber : patientVisitEventBO.BillNumber;
                    patientVisitEventDB.BillStatus = IsEditMode == true && patientVisitEventBO.BillStatus == null ? patientVisitEventDB.BillStatus : patientVisitEventBO.BillStatus;
                    patientVisitEventDB.ImageId = IsEditMode == true && patientVisitEventBO.ImageId == null ? patientVisitEventDB.ImageId : patientVisitEventBO.ImageId;
                    patientVisitEventDB.Modifier = IsEditMode == true && patientVisitEventBO.Modifier == null ? patientVisitEventDB.Modifier : patientVisitEventBO.Modifier;

                    if (Add_patientVisitEventDB == true)
                    {
                        patientVisitEventDB = _context.PatientVisitEvents.Add(patientVisitEventDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid patient visit event information details.", ErrorLevel = ErrorLevel.Error };
                    }
                    patientVisitEventDB = null;
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                patientVisitEventDB = _context.PatientVisitEvents.Where(p => p.Id == patientVisitEventDB.Id).FirstOrDefault<PatientVisitEvent>();
            }

            var res = Convert<BO.PatientVisitEvent, PatientVisitEvent>(patientVisitEventDB);
            return (object)res;
        }
        #endregion

        #region Delete By ID
        public override object Delete(int id)
        {
            var acc = _context.PatientVisitEvents.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || p.IsDeleted == false)).FirstOrDefault<PatientVisitEvent>();
            if (acc != null)
            {
                acc.IsDeleted = true;
                _context.SaveChanges();
            }
            else
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient visit event details dosent exists.", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.PatientVisitEvent, PatientVisitEvent>(acc);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
