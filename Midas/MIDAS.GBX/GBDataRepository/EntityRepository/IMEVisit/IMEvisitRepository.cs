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
    internal class IMEvisitRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<IMEVisit> _dbIMEVisit;
        private Dictionary<string, string> dictionary = new Dictionary<string, string>();

        public IMEvisitRepository(MIDASGBXEntities context) : base(context)
        {
            _dbIMEVisit = context.Set<IMEVisit>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.IMEVisit IMEVisit = (BO.IMEVisit)(object)entity;
            var result = IMEVisit.Validate(IMEVisit);
            return result;
        }
        #endregion

        #region Entity Conversion
        public T ConvertIMEvisit<T, U>(U entity)
        {
            if (entity is IMEVisit)
            {
                IMEVisit IMEVisit = entity as IMEVisit;

                if (IMEVisit == null)
                    return default(T);

                BO.IMEVisit IMEVisitBO = new BO.IMEVisit();
                IMEVisitBO.ID = IMEVisit.ID;
                IMEVisitBO.CalendarEventId = IMEVisit.CalendarEventId;
                IMEVisitBO.CaseId = IMEVisit.CaseId;
                IMEVisitBO.PatientId = IMEVisit.PatientId;
                IMEVisitBO.EventStart = IMEVisit.EventStart;
                IMEVisitBO.EventEnd = IMEVisit.EventEnd;
                IMEVisitBO.Notes = IMEVisit.Notes;
                IMEVisitBO.VisitStatusId = IMEVisit.VisitStatusId;
                IMEVisitBO.TransportProviderId = IMEVisit.TransportProviderId;

                IMEVisitBO.IsDeleted = IMEVisit.IsDeleted;
                IMEVisitBO.CreateByUserID = IMEVisit.CreateByUserID;
                IMEVisitBO.UpdateByUserID = IMEVisit.UpdateByUserID;

                if (IMEVisit.Patient != null)
                {
                    BO.Patient PatientBO = new BO.Patient();
                    using (PatientRepository patientRepo = new PatientRepository(_context))
                    {
                        PatientBO = patientRepo.Convert<BO.Patient, Patient>(IMEVisit.Patient);
                        IMEVisitBO.Patient = PatientBO;
                    }
                }

                if (IMEVisit.TransportProviderId != null)
                {
                    BO.Company CompanyBO = new BO.Company();
                    using (PatientRepository patientRepo = new PatientRepository(_context))
                    {
                        CompanyBO = patientRepo.Convert<BO.Company, Company>(IMEVisit.Company);
                        IMEVisitBO.Company = CompanyBO;
                    }
                }

                if (IMEVisit.CalendarEvent != null)
                {
                    IMEVisitBO.CalendarEvent = new BO.CalendarEvent();

                    using (CalendarEventRepository calEventRep = new CalendarEventRepository(_context))
                    {
                        IMEVisitBO.CalendarEvent = calEventRep.Convert<BO.CalendarEvent, CalendarEvent>(IMEVisit.CalendarEvent);
                    }
                }

                return (T)(object)IMEVisitBO;
            }

            return default(T);
        }
        #endregion

        #region SaveIMEVisit
        public override object SaveIMEVisit<T>(T entity)
        {
            BO.IMEVisit IMEVisitBO = (BO.IMEVisit)(object)entity;
            BO.CalendarEvent CalendarEventBO = IMEVisitBO.CalendarEvent;
            string patientUserName = string.Empty;
            bool sendNotification = false;

            IMEVisit IMEVisitDB = new IMEVisit();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                bool IsEditMode = false;
                bool IsAddModeCalendarEvent = false;

                IsEditMode = (IMEVisitBO != null && IMEVisitBO.ID > 0) ? true : false;
                string patientContactNumber = null;
                User patientuser = null;

                if (IMEVisitBO.PatientId == null && IMEVisitBO.ID > 0)
                {
                    var IMEvisitData = _context.IMEVisits.Where(p => p.ID == IMEVisitBO.ID).Select(p => new { p.PatientId, p.CaseId }).FirstOrDefault();

                    patientuser = _context.Users.Where(usr => usr.id == IMEvisitData.PatientId).Include("ContactInfo").FirstOrDefault();
                }
                else if (IMEVisitBO.PatientId != null && IMEVisitBO.PatientId > 0)
                {
                    patientuser = _context.Users.Where(usr => usr.id == IMEVisitBO.PatientId).Include("ContactInfo").FirstOrDefault();
                }

                if (patientuser != null)
                {
                    patientUserName = patientuser.UserName;
                    patientContactNumber = patientuser.ContactInfo.CellPhone;
                }

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

                        List<BO.FreeSlots> freeSlots = new List<BO.FreeSlots>();

                        if (IMEVisitBO.PatientId != null)
                        {
                            var result = calEventRepo.GetFreeSlotsForPatients(IMEVisitBO.PatientId.Value,dtStartDate, dtEndDate);
                            if (result is BO.ErrorObject)
                            {
                                return result;
                            }
                            else
                            {
                                freeSlots = result as List<BO.FreeSlots>;
                            }
                        }
                        //else if (patientVisitBO.RoomId != null && patientVisitBO.LocationId != null)
                        //{
                        //    //freeSlots = calEventRepo.GetFreeSlotsForRoomByLocationId(patientVisitBO.RoomId.Value, patientVisitBO.LocationId.Value, dtStartDate, dtEndDate) as List<BO.FreeSlots>;
                        //    var result = calEventRepo.GetFreeSlotsForRoomByLocationId(patientVisitBO.RoomId.Value, patientVisitBO.LocationId.Value, dtStartDate, dtEndDate);
                        //    if (result is BO.ErrorObject)
                        //    {
                        //        return result;
                        //    }
                        //    else
                        //    {
                        //        freeSlots = result as List<BO.FreeSlots>;
                        //    }
                        //}

                        foreach (var eachDayEventSlot in currentEventSlots)
                        {
                            DateTime ForDate = eachDayEventSlot.ForDate;
                            foreach (var eachEventSlot in eachDayEventSlot.StartAndEndTimes)
                            {
                                DateTime StartTime = eachEventSlot.StartTime;
                                DateTime EndTime = eachEventSlot.EndTime;
                                var StartAndEndTimesForDate = freeSlots.Where(p => p.ForDate == ForDate).Select(p => p.StartAndEndTimes).FirstOrDefault();
                                if (StartAndEndTimesForDate.Count > 0)
                                {
                                    var StartAndEndTimes = StartAndEndTimesForDate.Where(p => p.StartTime >= StartTime && p.StartTime < EndTime).ToList();

                                    if (StartAndEndTimes.Count > 0)
                                    {
                                        DateTime? checkContinuation = null;
                                        foreach (var eachSlot in StartAndEndTimes.Distinct().OrderBy(p => p.StartTime))
                                        {
                                            if (checkContinuation.HasValue == false)
                                            {
                                                checkContinuation = eachSlot.EndTime;
                                            }
                                            else
                                            {
                                                if (checkContinuation.Value != eachSlot.StartTime)
                                                {
                                                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "The patient dosent have continued free slots on the planned visit time of " + checkContinuation.Value.ToString() + ".", ErrorLevel = ErrorLevel.Error };
                                                }
                                                else
                                                {
                                                    checkContinuation = eachSlot.EndTime;
                                                }
                                            }
                                        }
                                    }
                                    else
                                    {
                                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "The patient dosent have free slots on the planned visit time of " + ForDate.ToShortDateString() + " (" + StartTime.ToShortTimeString() + " - " + EndTime.ToShortTimeString() + ").", ErrorLevel = ErrorLevel.Error };
                                    }
                                }
                                else
                                {
                                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "The patient is not availabe on " + ForDate.ToShortDateString() + ".", ErrorLevel = ErrorLevel.Error };
                                }
                            }
                        }
                    }
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

                    //if (string.IsNullOrWhiteSpace(patientUserName) == false && dictionary.ContainsKey(patientUserName))
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
                            if (patientContactNumber != null && patientContactNumber != string.Empty)
                            {
                                string to = patientContactNumber;
                                // string body = "Your appointment has been scheduled at " + CalendarEventBO.EventStart.Value + " in " + _context.Locations.Where(loc => loc.id == patientVisitBO.LocationId).Select(lc => lc.Name).FirstOrDefault();
                                string body = "";
                                string msgid = SMSGateway.SendSMS(to, body);
                            }
                        }
                    }
                    catch (Exception) { }
                    #endregion
                }
                else
                {
                    if (IsEditMode == false && IMEVisitBO.CalendarEventId <= 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Calendar Event details.", ErrorLevel = ErrorLevel.Error };
                    }
                    CalendarEventDB = null;
                }
                #endregion

                #region IME Visit
                if (IMEVisitBO != null && ((IMEVisitBO.ID <= 0 && IMEVisitBO.PatientId.HasValue == true) || (IMEVisitBO.ID > 0)))
                {
                    bool Add_IMEVisitDB = false;
                    IMEVisitDB = _context.IMEVisits.Where(p => p.ID == IMEVisitBO.ID
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault();

                    if (IMEVisitDB == null && IMEVisitBO.ID <= 0)
                    {
                        IMEVisitDB = new IMEVisit();
                        Add_IMEVisitDB = true;
                    }
                    else if (IMEVisitDB == null && IMEVisitBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient Visit doesn't exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    IMEVisitDB.CalendarEventId = (CalendarEventDB != null && CalendarEventDB.Id > 0) ? CalendarEventDB.Id : ((IMEVisitBO.CalendarEventId.HasValue == true) ? IMEVisitBO.CalendarEventId.Value : IMEVisitDB.CalendarEventId);
                    

                    if (IsEditMode == false && IMEVisitBO.CaseId.HasValue == false)
                    {
                        int CaseId = _context.Cases.Where(p => p.PatientId == IMEVisitBO.PatientId.Value && p.CaseStatusId == 1
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .Select(p => p.Id)
                                                   .FirstOrDefault<int>();

                        if (CaseId == 0)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "No open case exists for given patient.", ErrorLevel = ErrorLevel.Error };
                        }
                        else if (IMEVisitBO.CaseId.HasValue == true && IMEVisitBO.CaseId.Value != CaseId)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Case id dosent match with open case is for the given patient.", ErrorLevel = ErrorLevel.Error };
                        }
                        else
                        {
                            IMEVisitDB.CaseId = CaseId;
                        }
                    }
                    else
                    {
                        IMEVisitDB.CaseId = IMEVisitBO.CaseId.HasValue == false ? IMEVisitDB.CaseId : IMEVisitBO.CaseId.Value;
                    }

                    IMEVisitDB.PatientId = IsEditMode == true && IMEVisitBO.PatientId.HasValue == false ? IMEVisitDB.PatientId : (IMEVisitBO.PatientId.HasValue == false ? IMEVisitDB.PatientId : IMEVisitBO.PatientId.Value);
                    IMEVisitDB.EventStart = IMEVisitBO.EventStart;
                    IMEVisitDB.EventEnd = IMEVisitBO.EventEnd;

                    IMEVisitDB.Notes = IMEVisitBO.Notes;
                    IMEVisitDB.VisitStatusId = IMEVisitBO.VisitStatusId;
                    IMEVisitDB.TransportProviderId = IMEVisitBO.TransportProviderId;

                    if (IsEditMode == false)
                    {
                        IMEVisitDB.CreateByUserID = IMEVisitBO.CreateByUserID;
                        IMEVisitDB.CreateDate = DateTime.UtcNow;
                    }
                    else
                    {
                        IMEVisitDB.UpdateByUserID = IMEVisitBO.UpdateByUserID;
                        IMEVisitDB.UpdateDate = DateTime.UtcNow;
                    }

                    if (Add_IMEVisitDB == true)
                    {
                        IMEVisitDB = _context.IMEVisits.Add(IMEVisitDB);
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
                    IMEVisitDB = null;
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                if (IMEVisitDB != null)
                {
                    IMEVisitDB = _context.IMEVisits.Include("CalendarEvent")
                                                    .Include("Patient").Include("Patient.Cases")
                                                    .Include("Patient.User").Include("Patient.User.UserCompanies")
                                                    .Where(p => p.ID == IMEVisitDB.ID
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault<IMEVisit>();

                }
                else if (CalendarEventDB != null)
                {
                    IMEVisitDB = _context.IMEVisits.Include("CalendarEvent")
                                                            .Where(p => p.CalendarEvent.Id == CalendarEventDB.Id
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault<IMEVisit>();
                }
            }

            var res = ConvertIMEvisit<BO.IMEVisit, IMEVisit>(IMEVisitDB);
            return (object)res;
        }
        #endregion

        #region Get By Company ID
        public override object GetByCompanyId(int id)
        {
            var caseId = _context.CaseCompanyMappings.Where(p => p.CompanyId == id
                                                             && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                                 ).Select(p => p.CaseId);
            var IMEVisit = _context.IMEVisits.Include("CalendarEvent")
                                             .Include("Patient").Include("Patient.Cases")
                                             .Where(p => caseId.Contains((int)p.CaseId)
                                              && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                             .ToList();

            List<BO.IMEVisit> boIMEVisit = new List<BO.IMEVisit>();
            if (IMEVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachVisit in IMEVisit)
                {
                    boIMEVisit.Add(ConvertIMEvisit<BO.IMEVisit, IMEVisit>(EachVisit));
                }

            }

            return (object)boIMEVisit;
        }
        #endregion

        #region Get By Patient Id
        public override object GetByPatientId(int PatientId)
        {
            var acc = _context.IMEVisits.Include("CalendarEvent")
                                        .Include("Patient").Include("Patient.Cases")
                                        .Where(p => p.PatientId == PatientId 
                                         &&(p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                        .ToList<IMEVisit>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.IMEVisit> lstVisit = new List<BO.IMEVisit>();
            foreach (IMEVisit item in acc)
            {
                lstVisit.Add(ConvertIMEvisit<BO.IMEVisit, IMEVisit>(item));
            }

            return lstVisit;
        }
        #endregion

        #region BusySlots for Patients
        public override object GetBusySlotsForPatients(int PatientId, DateTime StartDate, DateTime EndDate)
        {
            if (PatientId <= 0)
            {
                PatientId = _context.Patients.Where(p => p.Id == PatientId
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                             .Select(p => p.Id).FirstOrDefault();
            }

            var CalendarEvents = _context.PatientVisits.Where(p => p.PatientId == PatientId
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                        .Select(p => p.CalendarEvent)
                                                        .ToList();

            var SlotDuration = _context.UserPersonalSettings.Where(p => p.UserId == PatientId 
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                        .Select(p => p.SlotDuration)
                                                        .FirstOrDefault();

            if (SlotDuration == 0)
            {
                SlotDuration = 30;
            }

            //Calendar calendar = new Calendar();
            Dictionary<HashSet<Occurrence>, string> Occurrences = new Dictionary<HashSet<Occurrence>, string>();
            foreach (var eachEvent in CalendarEvents)
            {
                if (eachEvent.IsDeleted.HasValue == false || (eachEvent.IsDeleted.HasValue == true && eachEvent.IsDeleted.Value == false))
                {
                    Calendar calendar = new Calendar();
                    var newEvent = new Event()
                    {
                        Name = eachEvent.Name,
                        Start = new CalDateTime(eachEvent.EventStart, "UTC"),
                        End = new CalDateTime(eachEvent.EventEnd, "UTC"),
                        Description = eachEvent.Description,
                        IsAllDay = eachEvent.IsAllDay.HasValue == true ? eachEvent.IsAllDay.Value : false,
                        Created = new CalDateTime(eachEvent.CreateDate)
                    };

                    if (String.IsNullOrWhiteSpace(eachEvent.RecurrenceRule) == false)
                    {
                        var keyValuePair = eachEvent.RecurrenceRule.ToUpper().Split(";".ToCharArray());
                        if (keyValuePair.Any(p => p.IndexOf("UNTIL=") != -1))
                        {
                            for (int i = 0; i < keyValuePair.Length; i++)
                            {
                                if (keyValuePair[i].IndexOf("COUNT=") != -1)
                                {
                                    keyValuePair[i] = "";
                                }
                            }
                        }
                        for (int i = 0; i < keyValuePair.Length; i++)
                        {
                            if (keyValuePair[i].IndexOf("COUNT=0") != -1)
                            {
                                keyValuePair[i] = "COUNT=500";
                            }
                        }

                        string modifiedRecurrenceRule = "";

                        foreach (var item in keyValuePair)
                        {
                            if (string.IsNullOrWhiteSpace(item) == false)
                            {
                                modifiedRecurrenceRule += item + ";";
                            }
                        }

                        modifiedRecurrenceRule = modifiedRecurrenceRule.TrimEnd(";".ToCharArray());
                        IRecurrencePattern recPattern = new RecurrencePattern(modifiedRecurrenceRule);
                        if (recPattern.Frequency != FrequencyType.None)
                        {
                            newEvent.RecurrenceRules.Add(recPattern);
                        }
                    }

                    if (String.IsNullOrWhiteSpace(eachEvent.RecurrenceException) == false)
                    {
                        var keyValuePair = eachEvent.RecurrenceException.ToUpper().Split(";".ToCharArray());
                        if (keyValuePair.Any(p => p.IndexOf("UNTIL=") != -1))
                        {
                            for (int i = 0; i < keyValuePair.Length; i++)
                            {
                                if (keyValuePair[i].IndexOf("COUNT=") != -1)
                                {
                                    keyValuePair[i] = "";
                                }
                            }
                        }
                        for (int i = 0; i < keyValuePair.Length; i++)
                        {
                            if (keyValuePair[i].IndexOf("COUNT=0") != -1)
                            {
                                keyValuePair[i] = "COUNT=500";
                            }
                        }

                        string modifiedRecurrenceException = "";

                        foreach (var item in keyValuePair)
                        {
                            if (string.IsNullOrWhiteSpace(item) == false)
                            {
                                modifiedRecurrenceException += item + ";";
                            }
                        }

                        modifiedRecurrenceException = modifiedRecurrenceException.TrimEnd(";".ToCharArray());
                        IRecurrencePattern recPattern = new RecurrencePattern(modifiedRecurrenceException);
                        if (recPattern.Frequency != FrequencyType.None)
                        {
                            newEvent.ExceptionRules.Add(recPattern);
                        }
                    }

                    calendar.Events.Add(newEvent);
                    HashSet<Occurrence> newEventOccurrences = new HashSet<Occurrence>();
                    newEventOccurrences = calendar.GetOccurrences(StartDate, EndDate);

                    Occurrences.Add(newEventOccurrences, eachEvent.TimeZone);

                    List<BO.StartAndEndTime> EventTimes = new List<BO.StartAndEndTime>();

                    foreach (var eachOccurrences in Occurrences)
                    {
                        string TimeZone = eachOccurrences.Value;
                        int intTimeZone = 0;
                        int.TryParse(TimeZone, out intTimeZone);

                        intTimeZone = intTimeZone * -1;

                       newEventOccurrences = eachOccurrences.Key;

                        EventTimes.AddRange(newEventOccurrences.Where(p => p.Period.StartTime.AddMinutes(intTimeZone).Date == StartDate)
                                                               .Select(p => new BO.StartAndEndTime
                                                               {
                                                                   StartTime = p.Period.StartTime.AddMinutes(intTimeZone).Value,
                                                                   EndTime = p.Period.EndTime.AddMinutes(intTimeZone).Value
                                                               })
                                                               .ToList().Distinct().OrderBy(p => p.StartTime).ToList());
                    }
                }
            }

         return (object) ;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}

