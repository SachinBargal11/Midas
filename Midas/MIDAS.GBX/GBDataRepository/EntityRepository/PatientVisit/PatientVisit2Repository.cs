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
    internal class PatientVisit2Repository : BaseEntityRepo, IDisposable
    {
        private DbSet<PatientVisit2> _dbPatientVisit2;

        public PatientVisit2Repository(MIDASGBXEntities context) : base(context)
        {
            _dbPatientVisit2 = context.Set<PatientVisit2>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.PatientVisit2 patientVisit2 = (BO.PatientVisit2)(object)entity;
            var result = patientVisit2.Validate(patientVisit2);
            return result;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            if (entity is PatientVisit2)
            {
                PatientVisit2 patientVisit2 = entity as PatientVisit2;

                if (patientVisit2 == null)
                    return default(T);

                BO.PatientVisit2 patientVisit2BO = new BO.PatientVisit2();
                patientVisit2BO.ID = patientVisit2.Id;
                patientVisit2BO.CalendarEventId = patientVisit2.CalendarEventId;
                patientVisit2BO.CaseId = patientVisit2.CaseId;
                patientVisit2BO.PatientId = patientVisit2.PatientId;
                patientVisit2BO.LocationId = patientVisit2.LocationId;
                patientVisit2BO.RoomId = patientVisit2.RoomId;
                patientVisit2BO.DoctorId = patientVisit2.DoctorId;
                patientVisit2BO.SpecialtyId = patientVisit2.SpecialtyId;
                patientVisit2BO.EventStart = patientVisit2.EventStart;
                patientVisit2BO.EventEnd = patientVisit2.EventEnd;
                patientVisit2BO.Notes = patientVisit2.Notes;
                patientVisit2BO.VisitStatusId = patientVisit2.VisitStatusId;
                patientVisit2BO.VisitType = patientVisit2.VisitType;

                patientVisit2BO.IsCancelled = patientVisit2.IsCancelled;
                patientVisit2BO.IsDeleted = patientVisit2.IsDeleted;
                patientVisit2BO.CreateByUserID = patientVisit2.CreateByUserID;
                patientVisit2BO.UpdateByUserID = patientVisit2.UpdateByUserID;

                if (patientVisit2.CalendarEvent != null)
                {
                    patientVisit2BO.CalendarEvent = new BO.CalendarEvent();

                    using (CalendarEventRepository calEventRep = new CalendarEventRepository(_context))
                    {
                        patientVisit2BO.CalendarEvent = calEventRep.Convert<BO.CalendarEvent, CalendarEvent>(patientVisit2.CalendarEvent);
                    }
                }

                return (T)(object)patientVisit2BO;
            }
            else if (entity is CalendarEvent)
            {
                CalendarEvent CalendarEventDB = entity as CalendarEvent;

                if (CalendarEventDB == null)
                    return default(T);

                BO.CalendarEvent CalendarEvent = new BO.CalendarEvent();
                using (CalendarEventRepository calEventRep = new CalendarEventRepository(_context))
                {
                    CalendarEvent = calEventRep.Convert<BO.CalendarEvent, CalendarEvent>(CalendarEventDB);
                }

                return (T)(object)CalendarEvent;
            }

            return default(T);
        }
        #endregion

        #region Get By Location Id
        public override object GetByLocationId(int id)
        {
            List<PatientVisit2> lstPatientVisit = _context.PatientVisit2.Include("CalendarEvent")
                                                                        .Where(p => p.LocationId == id 
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<PatientVisit2>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit2> lstBOPatientVisit = new List<BO.PatientVisit2>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit2, PatientVisit2>(p)));
                
                return lstBOPatientVisit;
            }
        }
        #endregion

        #region Get By Location Id And Room Id
        public override object Get(int LocationId, int RoomId)
        {
            List<PatientVisit2> lstPatientVisit = _context.PatientVisit2.Include("CalendarEvent")
                                                                        .Where(p => p.LocationId == LocationId && p.RoomId == RoomId
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<PatientVisit2>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location Id and Room Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit2> lstBOPatientVisit = new List<BO.PatientVisit2>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit2, PatientVisit2>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region Get By Location Id And Doctor Id
        public override object Get2(int LocationId, int DoctorId)
        {
            List<PatientVisit2> lstPatientVisit = _context.PatientVisit2.Include("CalendarEvent")
                                                                        .Where(p => p.LocationId == LocationId && p.DoctorId == DoctorId
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<PatientVisit2>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location Id and Doctor Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit2> lstBOPatientVisit = new List<BO.PatientVisit2>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit2, PatientVisit2>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region Get By Doctor Id
        public override object GetByDoctorId(int id)
        {
            List<PatientVisit2> lstPatientVisit = _context.PatientVisit2.Include("CalendarEvent")
                                                                        .Where(p => p.DoctorId == id
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<PatientVisit2>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Doctor Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit2> lstBOPatientVisit = new List<BO.PatientVisit2>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit2, PatientVisit2>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.PatientVisit2 PatientVisit2BO = (BO.PatientVisit2)(object)entity;
            BO.CalendarEvent CalendarEventBO = PatientVisit2BO.CalendarEvent;

            PatientVisit2 PatientVisit2DB = new PatientVisit2();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                bool IsEditMode = false;
                bool IsAddModeCalendarEvent = false;
                IsEditMode = (PatientVisit2BO != null && PatientVisit2BO.ID > 0) ? true : false;

                if (PatientVisit2BO.ID <= 0 && PatientVisit2BO.PatientId.HasValue == false && PatientVisit2BO.LocationId.HasValue == false)
                {
                    IsEditMode = (CalendarEventBO != null && CalendarEventBO.ID > 0) ? true : false;
                    IsAddModeCalendarEvent = (CalendarEventBO != null && CalendarEventBO.ID > 0) ? false : true;
                }

                CalendarEvent CalendarEventDB = new CalendarEvent();
                #region Calendar Event
                if (CalendarEventBO != null)
                {
                    bool Add_CalendarEventDB = false;
                    CalendarEventDB = _context.CalendarEvents.Where(p => p.Id == CalendarEventBO.ID).FirstOrDefault();

                    if (CalendarEventDB == null && CalendarEventBO.ID <= 0)
                    {
                        CalendarEventDB = new CalendarEvent();
                        Add_CalendarEventDB = true;
                    }
                    else if (CalendarEventDB == null && CalendarEventBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Calendar Event details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    CalendarEventDB.Name = IsEditMode == true && CalendarEventBO.Name == null ? CalendarEventDB.Name : CalendarEventBO.Name;
                    CalendarEventDB.EventStart = IsEditMode == true && CalendarEventBO.EventStart.HasValue == false ? CalendarEventDB.EventStart : CalendarEventBO.EventStart.Value;
                    CalendarEventDB.EventEnd = IsEditMode == true && CalendarEventBO.EventEnd.HasValue == false ? CalendarEventDB.EventEnd : CalendarEventBO.EventEnd.Value;
                    //CalendarEventDB.TimeZone = IsEditMode == true && CalendarEventBO.TimeZone == null ? CalendarEventDB.TimeZone : CalendarEventBO.TimeZone;
                    CalendarEventDB.TimeZone = CalendarEventBO.TimeZone;
                    //CalendarEventDB.Description = IsEditMode == true && CalendarEventBO.Description == null ? CalendarEventDB.Description : CalendarEventBO.Description;
                    CalendarEventDB.Description = CalendarEventBO.Description;
                    //CalendarEventDB.RecurrenceId = IsEditMode == true && CalendarEventBO.RecurrenceId.HasValue == false ? CalendarEventDB.RecurrenceId : CalendarEventBO.RecurrenceId;
                    CalendarEventDB.RecurrenceId = CalendarEventBO.RecurrenceId;
                    CalendarEventDB.RecurrenceRule = IsEditMode == true && CalendarEventBO.RecurrenceRule == null ? CalendarEventDB.RecurrenceRule : CalendarEventBO.RecurrenceRule;
                    CalendarEventDB.RecurrenceException = IsEditMode == true && CalendarEventBO.RecurrenceException == null ? CalendarEventDB.RecurrenceException : CalendarEventBO.RecurrenceException;
                    //CalendarEventDB.IsAllDay = IsEditMode == true && CalendarEventBO.IsAllDay.HasValue == false ? CalendarEventDB.IsAllDay : CalendarEventBO.IsAllDay;
                    CalendarEventDB.IsAllDay = CalendarEventBO.IsAllDay;

                    if (IsEditMode == false)
                    {
                        CalendarEventDB.CreateByUserID = CalendarEventBO.CreateByUserID;
                        CalendarEventDB.CreateDate = DateTime.UtcNow;
                    }
                    else
                    {
                        CalendarEventDB.UpdateByUserID = CalendarEventBO.UpdateByUserID;
                        CalendarEventDB.UpdateDate = DateTime.UtcNow;
                    }

                    if (Add_CalendarEventDB == true)
                    {
                        CalendarEventDB = _context.CalendarEvents.Add(CalendarEventDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false && PatientVisit2BO.CalendarEventId <= 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Calendar Event details.", ErrorLevel = ErrorLevel.Error };
                    }
                    CalendarEventDB = null;
                }
                #endregion

                #region Patient Visit
                if (PatientVisit2BO != null && ((PatientVisit2BO.ID <= 0 && PatientVisit2BO.PatientId.HasValue == true && PatientVisit2BO.LocationId.HasValue == true) || (PatientVisit2BO.ID > 0)))
                {
                    bool Add_PatientVisit2DB = false;
                    PatientVisit2DB = _context.PatientVisit2.Where(p => p.Id == PatientVisit2BO.ID).FirstOrDefault();

                    if (PatientVisit2DB == null && PatientVisit2BO.ID <= 0)
                    {
                        PatientVisit2DB = new PatientVisit2();
                        Add_PatientVisit2DB = true;
                    }
                    else if (PatientVisit2DB == null && PatientVisit2BO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient Visit dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    //PatientVisit2DB.CalendarEventId = PatientVisit2BO.CalendarEventId.HasValue == false ? PatientVisit2DB.CalendarEventId : PatientVisit2BO.CalendarEventId.Value;
                    PatientVisit2DB.CalendarEventId = (CalendarEventDB != null && CalendarEventDB.Id > 0) ? CalendarEventDB.Id : ((PatientVisit2BO.CalendarEventId.HasValue == true) ? PatientVisit2BO.CalendarEventId.Value : PatientVisit2DB.CalendarEventId);

                    if (IsEditMode == false && PatientVisit2BO.CaseId.HasValue == false)
                    {
                        int CaseId = _context.Cases.Where(p => p.PatientId == PatientVisit2BO.PatientId.Value && p.CaseStatusId == 1).Select(p => p.Id).FirstOrDefault<int>();
                        PatientVisit2DB.CaseId = CaseId;
                    }
                    else
                    {
                        PatientVisit2DB.CaseId = PatientVisit2BO.CaseId.HasValue == false ? PatientVisit2DB.CaseId : PatientVisit2BO.CaseId.Value;
                    }

                    if (IsEditMode == false)
                    {
                        int CaseId = _context.Cases.Where(p => p.PatientId == PatientVisit2BO.PatientId.Value && p.CaseStatusId == 1).Select(p => p.Id).FirstOrDefault<int>();

                        if (CaseId == 0)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "No open case exists for given patient.", ErrorLevel = ErrorLevel.Error };
                        }
                        else if (PatientVisit2BO.CaseId.HasValue == true && PatientVisit2BO.CaseId.Value != CaseId)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Case id dosent match with open case is for the given patient.", ErrorLevel = ErrorLevel.Error };
                        }
                        else
                        {
                            PatientVisit2DB.CaseId = CaseId;
                        }
                    }
                    else
                    {
                        PatientVisit2DB.CaseId = PatientVisit2BO.CaseId.HasValue == false ? PatientVisit2DB.CaseId : PatientVisit2BO.CaseId.Value;
                    }


                    PatientVisit2DB.PatientId = IsEditMode == true && PatientVisit2BO.PatientId.HasValue == false ? PatientVisit2DB.PatientId : PatientVisit2BO.PatientId.Value;
                    PatientVisit2DB.LocationId = IsEditMode == true && PatientVisit2BO.LocationId.HasValue == false ? PatientVisit2DB.LocationId : PatientVisit2BO.LocationId.Value;
                    //PatientVisit2DB.RoomId = IsEditMode == true && PatientVisit2BO.RoomId.HasValue == false ? PatientVisit2DB.RoomId : PatientVisit2BO.RoomId;
                    PatientVisit2DB.RoomId = PatientVisit2BO.RoomId;
                    //PatientVisit2DB.DoctorId = IsEditMode == true && PatientVisit2BO.DoctorId.HasValue == false ? PatientVisit2DB.DoctorId : PatientVisit2BO.DoctorId;
                    PatientVisit2DB.DoctorId = PatientVisit2BO.DoctorId;
                    //PatientVisit2DB.SpecialtyId = IsEditMode == true && PatientVisit2BO.SpecialtyId.HasValue == false ? PatientVisit2DB.SpecialtyId : PatientVisit2BO.SpecialtyId;
                    PatientVisit2DB.SpecialtyId = PatientVisit2BO.SpecialtyId;

                    PatientVisit2DB.EventStart = PatientVisit2BO.EventStart;
                    PatientVisit2DB.EventEnd = PatientVisit2BO.EventEnd;

                    //PatientVisit2DB.Notes = IsEditMode == true && PatientVisit2BO.Notes == null ? PatientVisit2DB.Notes : PatientVisit2BO.Notes;
                    PatientVisit2DB.Notes = PatientVisit2BO.Notes;
                    //PatientVisit2DB.VisitStatusId = IsEditMode == true && PatientVisit2BO.VisitStatusId.HasValue == false ? PatientVisit2DB.VisitStatusId : PatientVisit2BO.VisitStatusId;
                    PatientVisit2DB.VisitStatusId = PatientVisit2BO.VisitStatusId;
                    //PatientVisit2DB.VisitType = IsEditMode == true && PatientVisit2BO.VisitType.HasValue == false ? PatientVisit2DB.VisitType : PatientVisit2BO.VisitType;
                    PatientVisit2DB.VisitType = PatientVisit2BO.VisitType;

                    if (IsEditMode == false)
                    {
                        PatientVisit2DB.CreateByUserID = PatientVisit2BO.CreateByUserID;
                        PatientVisit2DB.CreateDate = DateTime.UtcNow;
                    }
                    else
                    {
                        PatientVisit2DB.UpdateByUserID = PatientVisit2BO.UpdateByUserID;
                        PatientVisit2DB.UpdateDate = DateTime.UtcNow;
                    }

                    if (Add_PatientVisit2DB == true)
                    {
                        PatientVisit2DB = _context.PatientVisit2.Add(PatientVisit2DB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false && IsAddModeCalendarEvent == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Patient Visit details.", ErrorLevel = ErrorLevel.Error };
                    }
                    PatientVisit2DB = null;
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                if (PatientVisit2DB != null)
                {
                    PatientVisit2DB = _context.PatientVisit2.Include("CalendarEvent")
                                                            .Where(p => p.Id == PatientVisit2DB.Id
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault<PatientVisit2>();
                }
                else if (CalendarEventDB != null)
                {
                    PatientVisit2DB = _context.PatientVisit2.Include("CalendarEvent")
                                                            .Where(p => p.CalendarEvent.Id == CalendarEventDB.Id
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault<PatientVisit2>();
                }
            }

            var res = Convert<BO.PatientVisit2, PatientVisit2>(PatientVisit2DB);
            return (object)res;
        }
        #endregion

        #region DeleteVisit By ID
        public override object DeleteVisit(int id)
        {
            var acc = _context.PatientVisit2.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<PatientVisit2>();
            if (acc != null)
            {
                acc.IsDeleted = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.PatientVisit2, PatientVisit2>(acc);
            return (object)res;
        }
        #endregion

        #region DeleteCalendarEvent By ID
        public override object DeleteCalendarEvent(int id)
        {
            var acc = _context.CalendarEvents.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<CalendarEvent>();
            if (acc != null)
            {
                acc.IsDeleted = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.CalendarEvent, CalendarEvent>(acc);
            return (object)res;
        }
        #endregion

        #region CancleVisit By ID
        public override object CancleVisit(int id)
        {
            var acc = _context.PatientVisit2.Where(p => p.Id == id && (p.IsCancelled.HasValue == false || (p.IsCancelled.HasValue == true && p.IsCancelled.Value == false))).FirstOrDefault<PatientVisit2>();
            if (acc != null)
            {
                acc.IsCancelled = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.PatientVisit2, PatientVisit2>(acc);
            return (object)res;
        }
        #endregion

        #region CancleCalendarEvent By ID
        public override object CancleCalendarEvent(int id)
        {
            var acc = _context.CalendarEvents.Where(p => p.Id == id && (p.IsCancelled.HasValue == false || (p.IsCancelled.HasValue == true && p.IsCancelled.Value == false))).FirstOrDefault<CalendarEvent>();
            if (acc != null)
            {
                acc.IsCancelled = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.CalendarEvent, CalendarEvent>(acc);
            return (object)res;
        }
        #endregion

        #region Get By Case Id
        public override object GetByCaseId(int CaseId)
        {
            var acc = _context.PatientVisit2
                              .Where(p => p.CaseId == CaseId
                               && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                              .ToList<PatientVisit2>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit2> lstpatientvisit = new List<BO.PatientVisit2>();
                foreach (PatientVisit2 item in acc)
                {
                    lstpatientvisit.Add(Convert<BO.PatientVisit2, PatientVisit2>(item));
                }
                return lstpatientvisit;
            }
        }
        #endregion 


        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
