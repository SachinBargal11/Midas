using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;
using Twilio;
using Twilio.Types;
using Twilio.Rest.Api.V2010.Account;
using System.Configuration;
using MIDAS.GBX.DataRepository.EntityRepository.Common;

using Ical.Net;
using Ical.Net.DataTypes;
using Ical.Net.Serialization.iCalendar.Serializers;
using Ical.Net.Serialization;
using Ical.Net.Interfaces.DataTypes;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class EOVisitRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<EOVisit> _dbEOVisit;
        private Dictionary<string, string> dictionary = new Dictionary<string, string>();

        public EOVisitRepository(MIDASGBXEntities context) : base(context)
        {
            _dbEOVisit = context.Set<EOVisit>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.EOVisit EOVisit = (BO.EOVisit)(object)entity;
            var result = EOVisit.Validate(EOVisit);
            return result;
        }
        #endregion

        #region Entity Conversion
        public T ConvertEOvisit<T, U>(U entity)
        {
            if (entity is EOVisit)
            {
                EOVisit EOVisit = entity as EOVisit;

                if (EOVisit == null)
                    return default(T);

                BO.EOVisit EOVisitBO = new BO.EOVisit();
                EOVisitBO.ID = EOVisit.ID;
                EOVisitBO.CalendarEventId = EOVisit.CalendarEventId;
                EOVisitBO.DoctorId = EOVisit.DoctorId;
                EOVisitBO.PatientId = EOVisit.PatientId;
                EOVisitBO.VisitCreatedByCompanyId = EOVisit.PatientId;
                EOVisitBO.InsuranceProviderId = EOVisit.InsuranceProviderId;
                EOVisitBO.VisitStatusId = EOVisit.VisitStatusId;
                EOVisitBO.EventStart = EOVisit.EventStart;
                EOVisitBO.EventEnd = EOVisit.EventEnd;
                EOVisitBO.Notes = EOVisit.Notes;

                EOVisitBO.IsDeleted = EOVisit.IsDeleted;
                EOVisitBO.CreateByUserID = EOVisit.CreateByUserID;
                EOVisitBO.UpdateByUserID = EOVisit.UpdateByUserID;

                if (EOVisit.Doctor != null)
                {
                    BO.Doctor doctorBO = new BO.Doctor();
                    using (DoctorRepository patientRepo = new DoctorRepository(_context))
                    {
                        doctorBO = patientRepo.Convert<BO.Doctor, Doctor>(EOVisit.Doctor);
                        EOVisitBO.Doctor = doctorBO;
                    }
                }

                if (EOVisit.Company != null)
                {
                    BO.Company CompanyBO = new BO.Company();
                    using (CompanyRepository companyRepo = new CompanyRepository(_context))
                    {
                        CompanyBO = companyRepo.Convert<BO.Company, Company>(EOVisit.Company);
                        EOVisitBO.Company = CompanyBO;
                    }
                }

                if (EOVisit.InsuranceMaster != null)
                {
                    BO.InsuranceMaster InsuranceMasterBO = new BO.InsuranceMaster();
                    using (InsuranceMasterRepository InsuranceMasterRepo = new InsuranceMasterRepository(_context))
                    {
                        InsuranceMasterBO = InsuranceMasterRepo.Convert<BO.InsuranceMaster, InsuranceMaster>(EOVisit.InsuranceMaster);
                        EOVisitBO.InsuranceMaster = InsuranceMasterBO;
                    }
                }

                if (EOVisit.CalendarEvent != null)
                {
                    EOVisitBO.CalendarEvent = new BO.CalendarEvent();

                    using (CalendarEventRepository calEventRep = new CalendarEventRepository(_context))
                    {
                        EOVisitBO.CalendarEvent = calEventRep.Convert<BO.CalendarEvent, CalendarEvent>(EOVisit.CalendarEvent);
                    }
                }

                return (T)(object)EOVisitBO;
            }

            return default(T);
        }
        #endregion

        #region SaveEOVisit
        public override object SaveEOVisit<T>(T entity)
        {
            BO.EOVisit EOVisitBO = (BO.EOVisit)(object)entity;
            BO.CalendarEvent CalendarEventBO = EOVisitBO.CalendarEvent;
            BO.Doctor DoctorBO = EOVisitBO.Doctor;
            string doctorUserName = string.Empty;
            bool sendNotification = false;

            //CalenderEventBO
            if (CalendarEventBO != null)
            {
                List<BO.FreeSlots> currentEventSlots = new List<BO.FreeSlots>();
                CalendarEventRepository calEventRepo = new CalendarEventRepository(_context);
                currentEventSlots = calEventRepo.GetBusySlotsByCalendarEvent(CalendarEventBO) as List<BO.FreeSlots>;

                if (currentEventSlots.Count > 0)
                {
                    DateTime dtStartDate = currentEventSlots.Min(p => p.ForDate);
                    DateTime dtEndDate = currentEventSlots.Max(p => p.ForDate).AddDays(1);

                    List<BO.StartAndEndTime> busySlots = new List<BO.StartAndEndTime>();

                    if (EOVisitBO.DoctorId != null)
                    {
                        var result = calEventRepo.GetBusySlotsForDoctors(EOVisitBO.DoctorId.Value, dtStartDate, dtEndDate);
                        if (result is BO.ErrorObject)
                        {
                            return result;
                        }
                        else
                        {
                            busySlots = result as List<BO.StartAndEndTime>;
                        }
                    }

                    foreach (var eachDayEventSlot in currentEventSlots)
                    {
                        DateTime ForDate = eachDayEventSlot.ForDate;
                        foreach (var eachEventSlot in eachDayEventSlot.StartAndEndTimes)
                        {
                            DateTime StartTime = eachEventSlot.StartTime;
                            DateTime EndTime = eachEventSlot.EndTime;
                            var StartAndEndTimesForDate = busySlots.Where(p => p.StartTime.Date == ForDate).ToList();
                            if (StartAndEndTimesForDate.Count > 0)
                            {
                                var StartAndEndTimes = StartAndEndTimesForDate.Where(p => p.StartTime >= StartTime && p.StartTime < EndTime).ToList();

                                if (StartAndEndTimes.Count > 0)
                                {
                                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "The Doctor dosent have free slots for EO visit time on " + ForDate.ToShortDateString() + " (" + StartTime.ToShortTimeString() + " - " + EndTime.ToShortTimeString() + ").", ErrorLevel = ErrorLevel.Error };
                                }
                            }
                        }
                    }
                }
            }

            EOVisit EOVisitDB = new EOVisit();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                bool IsEditMode = false;
                bool IsAddModeCalendarEvent = false;

                IsEditMode = (EOVisitBO != null && EOVisitBO.ID > 0) ? true : false;
                string doctorContactNumber = null;
                User doctoruser = null;

                if (EOVisitBO.DoctorId == null && EOVisitBO.ID > 0)
                {
                    var EOvisitData = _context.EOVisits.Where(p => p.ID == EOVisitBO.ID).Select(p => new { p.DoctorId }).FirstOrDefault();

                    doctoruser = _context.Users.Where(usr => usr.id == EOvisitData.DoctorId).Include("ContactInfo").FirstOrDefault();
                }
                else if (EOVisitBO.DoctorId != null && EOVisitBO.DoctorId > 0)
                {
                    doctoruser = _context.Users.Where(usr => usr.id == EOVisitBO.DoctorId).Include("ContactInfo").FirstOrDefault();
                }

                if (doctoruser != null)
                {
                    doctorUserName = doctoruser.UserName;
                    doctorContactNumber = doctoruser.ContactInfo.CellPhone;
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

                    //if (string.IsNullOrWhiteSpace(doctorUserName) == false && dictionary.ContainsKey(doctorUserName))
                    //{
                    //    if (CalendarEventDB.EventStart != CalendarEventBO.EventStart.Value) sendNotification = true;
                    //}

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

                    #region send SMS notification 
                    try
                    {
                        if (sendNotification)
                        {
                            if (doctorContactNumber != null && doctorContactNumber != string.Empty)
                            {
                                string to = doctorContactNumber;
                                string body = "Your appointment has been scheduled at. ";

                                string msgid = SMSGateway.SendSMS(to, body);
                            }
                        }
                    }
                    catch (Exception) { }
                    #endregion
                }
                else
                {
                    if (IsEditMode == false && EOVisitBO.CalendarEventId <= 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Calendar Event details.", ErrorLevel = ErrorLevel.Error };
                    }
                    CalendarEventDB = null;
                }
                #endregion

                #region EO Visit
                if (EOVisitBO != null && ((EOVisitBO.ID <= 0 && EOVisitBO.DoctorId.HasValue == true) || (EOVisitBO.ID > 0)))
                {
                    bool Add_EOVisitDB = false;
                    EOVisitDB = _context.EOVisits.Where(p => p.ID == EOVisitBO.ID
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault();

                    if (EOVisitDB == null && EOVisitBO.ID <= 0)
                    {
                        EOVisitDB = new EOVisit();
                        Add_EOVisitDB = true;
                    }
                    else if (EOVisitDB == null && EOVisitBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient Visit doesn't exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    EOVisitDB.CalendarEventId = (CalendarEventDB != null && CalendarEventDB.Id > 0) ? CalendarEventDB.Id : ((EOVisitBO.CalendarEventId.HasValue == true) ? EOVisitBO.CalendarEventId.Value : EOVisitDB.CalendarEventId);

                    EOVisitDB.DoctorId = IsEditMode == true && EOVisitBO.DoctorId.HasValue == false ? EOVisitDB.DoctorId : (EOVisitBO.DoctorId.HasValue == false ? EOVisitDB.DoctorId : EOVisitBO.DoctorId.Value);
                    EOVisitDB.PatientId = IsEditMode == true && EOVisitBO.PatientId.HasValue == false ? EOVisitDB.PatientId : (EOVisitBO.PatientId.HasValue == false ? EOVisitDB.PatientId : EOVisitBO.PatientId.Value);
                    EOVisitDB.VisitCreatedByCompanyId = IsEditMode == true && EOVisitBO.VisitCreatedByCompanyId.HasValue == false ? EOVisitDB.VisitCreatedByCompanyId : (EOVisitBO.VisitCreatedByCompanyId.HasValue == false ? EOVisitDB.VisitCreatedByCompanyId : EOVisitBO.VisitCreatedByCompanyId.Value);
                    EOVisitDB.InsuranceProviderId = IsEditMode == true && EOVisitBO.InsuranceProviderId.HasValue == false ? EOVisitDB.InsuranceProviderId : (EOVisitBO.InsuranceProviderId.HasValue == false ? EOVisitDB.InsuranceProviderId : EOVisitBO.InsuranceProviderId.Value);
                    EOVisitDB.EventStart = EOVisitBO.EventStart;
                    EOVisitDB.EventEnd = EOVisitBO.EventEnd;

                    EOVisitDB.Notes = EOVisitBO.Notes;
                    EOVisitDB.VisitStatusId = EOVisitBO.VisitStatusId;

                    if (IsEditMode == false)
                    {
                        EOVisitDB.CreateByUserID = EOVisitBO.CreateByUserID;
                        EOVisitDB.CreateDate = DateTime.UtcNow;
                    }
                    else
                    {
                        EOVisitDB.UpdateByUserID = EOVisitBO.UpdateByUserID;
                        EOVisitDB.UpdateDate = DateTime.UtcNow;
                    }

                    if (Add_EOVisitDB == true)
                    {
                        EOVisitDB = _context.EOVisits.Add(EOVisitDB);
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
                    EOVisitDB = null;
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                if (EOVisitDB != null)
                {
                    EOVisitDB = _context.EOVisits.Include("CalendarEvent")
                                                  .Include("Doctor")
                                                  .Include("Company")
                                                  .Include("InsuranceMaster")
                                                  .Where(p => p.ID == EOVisitDB.ID
                                                   && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault<EOVisit>();

                }
                else if (CalendarEventDB != null)
                {
                    EOVisitDB = _context.EOVisits.Include("CalendarEvent")
                                                            .Where(p => p.CalendarEvent.Id == CalendarEventDB.Id
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault<EOVisit>();
                }
            }

            var res = ConvertEOvisit<BO.EOVisit, EOVisit>(EOVisitDB);
            return (object)res;
        }
        #endregion

        #region Get By Company ID
        public override object GetByCompanyId(int id)
        {
            //var companyId = _context.Companies.Where(p => p.id == id
            //                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
            //                                            .Select(p => p.id);

            var EOVisit = _context.EOVisits.Include("CalendarEvent")
                                           .Include("Doctor")
                                           .Include("Doctor.User")
                                           .Include("Company")
                                           .Include("InsuranceMaster")
                                           .Where(p => p.VisitCreatedByCompanyId == id
                                           && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                           .ToList();

            List<BO.EOVisit> boEOVisit = new List<BO.EOVisit>();
            if (EOVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachVisit in EOVisit)
                {
                    boEOVisit.Add(ConvertEOvisit<BO.EOVisit, EOVisit>(EachVisit));
                }

            }

            return (object)boEOVisit;
        }
        #endregion

        #region Get By Company ID and DoctorId For
        public override object Get(int CompanyId, int DoctorId)
        {
            //var medicalProvider = _context.Companies.Where(p => p.id == CompanyId
            //                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
            //                                                    .Select(p => p.id);

            var EOVisit = _context.EOVisits.Include("CalendarEvent")
                                           .Include("Doctor")
                                           .Include("Company")
                                           .Include("InsuranceMaster")
                                           .Where(p => p.VisitCreatedByCompanyId == CompanyId && p.DoctorId == DoctorId
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                    .ToList();
            if (EOVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.EOVisit> lstEOVisit = new List<BO.EOVisit>();
                foreach (EOVisit eachEoVisit in EOVisit)
                {
                    lstEOVisit.Add(ConvertEOvisit<BO.EOVisit, EOVisit>(eachEoVisit));
                }

                return lstEOVisit;
            }
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}

