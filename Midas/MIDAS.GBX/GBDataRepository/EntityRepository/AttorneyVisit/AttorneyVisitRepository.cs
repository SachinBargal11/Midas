using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ical.Net;
using Ical.Net.DataTypes;
using Ical.Net.Serialization.iCalendar.Serializers;
using Ical.Net.Serialization;
using Ical.Net.Interfaces.DataTypes;
using MIDAS.GBX.DataRepository.EntityRepository.Common;
using BO = MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.EntityRepository;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class AttorneyVisitRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<AttorneyVisit> _dbpatientVisit;

        public AttorneyVisitRepository(MIDASGBXEntities context) : base(context)
        {
            _dbpatientVisit = context.Set<AttorneyVisit>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.AttorneyVisit AttorneyVisitBO = (BO.AttorneyVisit)(object)entity;
            var result = AttorneyVisitBO.Validate(AttorneyVisitBO);
            return result;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            if (entity is AttorneyVisit)
            {
                AttorneyVisit AttorneyVisitDB = entity as AttorneyVisit;

                if (AttorneyVisitDB == null)
                    return default(T);

                BO.AttorneyVisit AttorneyVisitBO = new BO.AttorneyVisit();
                AttorneyVisitBO.ID = AttorneyVisitDB.Id;
                AttorneyVisitBO.CalendarEventId = AttorneyVisitDB.CalendarEventId;
                AttorneyVisitBO.CaseId = AttorneyVisitDB.CaseId;
                AttorneyVisitBO.PatientId = AttorneyVisitDB.PatientId;
                AttorneyVisitBO.LocationId = AttorneyVisitDB.LocationId;
                AttorneyVisitBO.AttorneyId = AttorneyVisitDB.AttorneyId;
                AttorneyVisitBO.EventStart = AttorneyVisitDB.EventStart;
                AttorneyVisitBO.EventEnd = AttorneyVisitDB.EventEnd;
                AttorneyVisitBO.Subject = AttorneyVisitDB.Subject;
                AttorneyVisitBO.VisitStatusId = AttorneyVisitDB.VisitStatusId;
                AttorneyVisitBO.ContactPerson = AttorneyVisitDB.ContactPerson;

                AttorneyVisitBO.IsDeleted = AttorneyVisitDB.IsDeleted;
                AttorneyVisitBO.CreateByUserID = AttorneyVisitDB.CreateByUserID;
                AttorneyVisitBO.UpdateByUserID = AttorneyVisitDB.UpdateByUserID;

                if (AttorneyVisitDB.Patient != null)
                {
                    BO.Patient PatientBO = new BO.Patient();
                    using (PatientRepository patientRepo = new PatientRepository(_context))
                    {
                        PatientBO = patientRepo.Convert<BO.Patient, Patient>(AttorneyVisitDB.Patient);
                        AttorneyVisitBO.Patient = PatientBO;

                        if (AttorneyVisitDB.Patient.PatientInsuranceInfoes != null && AttorneyVisitDB.Patient.PatientInsuranceInfoes.Count > 0)
                        {
                            List<BO.PatientInsuranceInfo> PatientInsuranceInfoBOList = new List<BO.PatientInsuranceInfo>();
                            using (PatientInsuranceInfoRepository patientInsuranceInfoRepo = new PatientInsuranceInfoRepository(_context))
                            {
                                foreach (PatientInsuranceInfo eachPatientInsuranceInfo in AttorneyVisitDB.Patient.PatientInsuranceInfoes)
                                {
                                    if (eachPatientInsuranceInfo.IsDeleted.HasValue == false || (eachPatientInsuranceInfo.IsDeleted.HasValue == true && eachPatientInsuranceInfo.IsDeleted.Value == false))
                                    {
                                        PatientInsuranceInfoBOList.Add(patientInsuranceInfoRepo.Convert<BO.PatientInsuranceInfo, PatientInsuranceInfo>(eachPatientInsuranceInfo));
                                    }
                                }

                                AttorneyVisitBO.Patient.PatientInsuranceInfoes = PatientInsuranceInfoBOList;
                            }
                        }
                    }
                }

                if (AttorneyVisitDB.Case != null)
                {
                    BO.Case CaseBO = new BO.Case();
                    using (CaseRepository caseRepo = new CaseRepository(_context))
                    {
                        CaseBO = caseRepo.Convert<BO.Case, Case>(AttorneyVisitDB.Case);
                        AttorneyVisitBO.Case = CaseBO;

                        if (AttorneyVisitDB.Case.PatientAccidentInfoes != null && AttorneyVisitDB.Case.PatientAccidentInfoes.Count > 0)
                        {
                            List<BO.PatientAccidentInfo> PatientAccidentInfoBOList = new List<BO.PatientAccidentInfo>();
                            using (PatientAccidentInfoRepository patientAccidentInfoRepo = new PatientAccidentInfoRepository(_context))
                            {
                                foreach (PatientAccidentInfo eachPatientInsuranceInfo in AttorneyVisitDB.Case.PatientAccidentInfoes)
                                {
                                    if (eachPatientInsuranceInfo.IsDeleted.HasValue == false || (eachPatientInsuranceInfo.IsDeleted.HasValue == true && eachPatientInsuranceInfo.IsDeleted.Value == false))
                                    {
                                        PatientAccidentInfoBOList.Add(patientAccidentInfoRepo.Convert<BO.PatientAccidentInfo, PatientAccidentInfo>(eachPatientInsuranceInfo));
                                    }
                                }

                                AttorneyVisitBO.Case.PatientAccidentInfoes = PatientAccidentInfoBOList;
                            }
                        }
                    }
                }                

                if (AttorneyVisitDB.Location != null)
                {
                    BO.Location boLocation = new BO.Location();
                    using (LocationRepository cmp = new LocationRepository(_context))
                    {
                        boLocation = cmp.Convert<BO.Location, Location>(AttorneyVisitDB.Location);
                        AttorneyVisitBO.Location = boLocation;
                    }
                }

                if (AttorneyVisitDB.CalendarEvent != null)
                {
                    AttorneyVisitBO.CalendarEvent = new BO.CalendarEvent();

                    using (CalendarEventRepository calEventRep = new CalendarEventRepository(_context))
                    {
                        AttorneyVisitBO.CalendarEvent = calEventRep.Convert<BO.CalendarEvent, CalendarEvent>(AttorneyVisitDB.CalendarEvent);
                    }
                }

                return (T)(object)AttorneyVisitBO;
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

        #region save
        public override object Save<T>(T entity)
        {
            BO.AttorneyVisit AttorneyVisitBO = (BO.AttorneyVisit)(object)entity;
            BO.CalendarEvent CalendarEventBO = AttorneyVisitBO.CalendarEvent;

            AttorneyVisit AttorneyVisitDB = new AttorneyVisit();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                bool IsEditMode = false;
                bool IsAddModeCalendarEvent = false;
                IsEditMode = (AttorneyVisitBO != null && AttorneyVisitBO.ID > 0) ? true : false;
                
                if (AttorneyVisitBO.ID <= 0 && AttorneyVisitBO.PatientId.HasValue == false && AttorneyVisitBO.LocationId.HasValue == false)
                {
                    IsEditMode = (CalendarEventBO != null && CalendarEventBO.ID > 0) ? true : false;
                    IsAddModeCalendarEvent = (CalendarEventBO != null && CalendarEventBO.ID > 0) ? false : true;
                }

                CalendarEvent CalendarEventDB = new CalendarEvent();
                #region Calendar Event
                if (CalendarEventBO != null)
                {
                    bool Add_CalendarEventDB = false;
                    CalendarEventDB = _context.CalendarEvents.Where(p => p.Id == CalendarEventBO.ID
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                             .FirstOrDefault();

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
                    CalendarEventDB.TimeZone = CalendarEventBO.TimeZone;
                    CalendarEventDB.Description = CalendarEventBO.Description;
                    CalendarEventDB.RecurrenceId = CalendarEventBO.RecurrenceId;
                    CalendarEventDB.RecurrenceRule = IsEditMode == true && CalendarEventBO.RecurrenceRule == null ? CalendarEventDB.RecurrenceRule : CalendarEventBO.RecurrenceRule;
                    CalendarEventDB.RecurrenceException = IsEditMode == true && CalendarEventBO.RecurrenceException == null ? CalendarEventDB.RecurrenceException : CalendarEventBO.RecurrenceException;
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
                    if (IsEditMode == false && AttorneyVisitBO.CalendarEventId <= 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Calendar Event details.", ErrorLevel = ErrorLevel.Error };
                    }
                    CalendarEventDB = null;
                }
                #endregion

                #region Patient Visit
                if (AttorneyVisitBO != null
                    && ((AttorneyVisitBO.ID <= 0 && AttorneyVisitBO.PatientId.HasValue == true && AttorneyVisitBO.LocationId.HasValue == true)
                        || (AttorneyVisitBO.ID > 0)))
                {
                    bool Add_patientVisitDB = false;
                    AttorneyVisitDB = _context.AttorneyVisits.Where(p => p.Id == AttorneyVisitBO.ID
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault();

                    if (AttorneyVisitDB == null && AttorneyVisitBO.ID <= 0)
                    {
                        AttorneyVisitDB = new AttorneyVisit();
                        Add_patientVisitDB = true;
                    }
                    else if (AttorneyVisitDB == null && AttorneyVisitBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Attorney Visit doesn't exists.", ErrorLevel = ErrorLevel.Error };
                    }
                    AttorneyVisitDB.CalendarEventId = (CalendarEventDB != null && CalendarEventDB.Id > 0) ? CalendarEventDB.Id : ((AttorneyVisitBO.CalendarEventId.HasValue == true) ? AttorneyVisitBO.CalendarEventId.Value : AttorneyVisitDB.CalendarEventId);

                    if (IsEditMode == false && AttorneyVisitBO.CaseId.HasValue == false)
                    {
                        int CaseId = _context.Cases.Where(p => p.PatientId == AttorneyVisitBO.PatientId.Value && p.CaseStatusId == 1
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .Select(p => p.Id)
                                                   .FirstOrDefault<int>();

                        if (CaseId == 0)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "No open case exists for given patient.", ErrorLevel = ErrorLevel.Error };
                        }
                        else if (AttorneyVisitBO.CaseId.HasValue == true && AttorneyVisitBO.CaseId.Value != CaseId)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Case id dosent match with open case is for the given patient.", ErrorLevel = ErrorLevel.Error };
                        }
                        else
                        {
                            AttorneyVisitDB.CaseId = CaseId;
                        }
                    }
                    else
                    {
                        AttorneyVisitDB.CaseId = AttorneyVisitBO.CaseId.HasValue == false ? AttorneyVisitDB.CaseId : AttorneyVisitBO.CaseId.Value;
                    }

                    AttorneyVisitDB.PatientId = IsEditMode == true && AttorneyVisitBO.PatientId.HasValue == false ? AttorneyVisitDB.PatientId : (AttorneyVisitBO.PatientId.HasValue == false ? AttorneyVisitDB.PatientId : AttorneyVisitBO.PatientId.Value);
                    AttorneyVisitDB.AttorneyId = IsEditMode == true && AttorneyVisitBO.AttorneyId.HasValue == false ? AttorneyVisitDB.AttorneyId : (AttorneyVisitBO.AttorneyId.HasValue == false ? AttorneyVisitDB.AttorneyId : AttorneyVisitBO.AttorneyId.Value);
                    AttorneyVisitDB.LocationId = IsEditMode == true && AttorneyVisitBO.LocationId.HasValue == false ? AttorneyVisitDB.LocationId : (AttorneyVisitBO.LocationId.HasValue == false ? AttorneyVisitDB.LocationId : AttorneyVisitBO.LocationId.Value);

                    AttorneyVisitDB.EventStart = AttorneyVisitBO.EventStart;
                    AttorneyVisitDB.EventEnd = AttorneyVisitBO.EventEnd;

                    AttorneyVisitDB.Subject = AttorneyVisitBO.Subject;
                    AttorneyVisitDB.VisitStatusId = AttorneyVisitBO.VisitStatusId;
                    AttorneyVisitDB.ContactPerson = AttorneyVisitBO.ContactPerson;
                    AttorneyVisitDB.Agenda = AttorneyVisitBO.Agenda;

                    if (IsEditMode == false)
                    {
                        AttorneyVisitDB.CreateByUserID = AttorneyVisitBO.CreateByUserID;
                        AttorneyVisitDB.CreateDate = DateTime.UtcNow;
                    }
                    else
                    {
                        AttorneyVisitDB.UpdateByUserID = AttorneyVisitBO.UpdateByUserID;
                        AttorneyVisitDB.UpdateDate = DateTime.UtcNow;
                    }

                    if (Add_patientVisitDB == true)
                    {
                        AttorneyVisitDB = _context.AttorneyVisits.Add(AttorneyVisitDB);
                    }
                    _context.SaveChanges();

                    //if (AttorneyVisitDB.PatientId.HasValue == true && AttorneyVisitDB.CaseId.HasValue == true && AttorneyVisitDB.AncillaryProviderId.HasValue == true)
                    //{
                    //    using (PatientRepository patientRepo = new PatientRepository(_context))
                    //    {
                    //        patientRepo.AssociatePatientWithAncillaryCompany(AttorneyVisitDB.PatientId.Value, AttorneyVisitDB.CaseId.Value, AttorneyVisitBO.AncillaryProviderId.Value, AttorneyVisitBO.AddedByCompanyId);
                    //    }
                    //}
                }
                else
                {
                    if (IsEditMode == false && IsAddModeCalendarEvent == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Attorney Visit details.", ErrorLevel = ErrorLevel.Error };
                    }
                    AttorneyVisitDB = null;
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                if (AttorneyVisitDB != null)
                {
                    AttorneyVisitDB = _context.AttorneyVisits.Include("CalendarEvent")
                                                            .Include("Location")
                                                            .Include("Location.Company")
                                                            .Include("Patient").Include("Patient.User").Include("Patient.User.UserCompanies")                                                            
                                                            .Where(p => p.Id == AttorneyVisitDB.Id
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault<AttorneyVisit>();
                }
                else if (CalendarEventDB != null)
                {
                    AttorneyVisitDB = _context.AttorneyVisits.Include("CalendarEvent")
                                                            .Where(p => p.CalendarEvent.Id == CalendarEventDB.Id
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault<AttorneyVisit>();
                }
            }

            var res = Convert<BO.AttorneyVisit, AttorneyVisit>(AttorneyVisitDB);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
