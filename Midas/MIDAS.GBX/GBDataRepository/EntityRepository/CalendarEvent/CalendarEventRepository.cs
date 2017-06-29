using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;

using Ical.Net;
using Ical.Net.DataTypes;
using Ical.Net.Serialization.iCalendar.Serializers;
using Ical.Net.Serialization;
using Ical.Net.Interfaces.DataTypes;
using System.Configuration;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class CalendarEventRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<CalendarEvent> _dbCalendarEvent;

        //private int UTCAdjustment_Minutes = 0;

        public CalendarEventRepository(MIDASGBXEntities context) : base(context)
        {
            _dbCalendarEvent = context.Set<CalendarEvent>();
            context.Configuration.ProxyCreationEnabled = false;

            //if (ConfigurationManager.AppSettings["UTCAdjustment_Minutes"] != null)
            //{
            //    int.TryParse(ConfigurationManager.AppSettings["UTCAdjustment_Minutes"], out UTCAdjustment_Minutes);
            //}
        }

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.CalendarEvent calendarEvent = (BO.CalendarEvent)(object)entity;
            var result = calendarEvent.Validate(calendarEvent);
            return result;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            CalendarEvent calendarEvent = entity as CalendarEvent;

            if (calendarEvent == null)
                return default(T);

            BO.CalendarEvent calendarEventBO = new BO.CalendarEvent();
            calendarEventBO.ID = calendarEvent.Id;
            calendarEventBO.Name = calendarEvent.Name;
            calendarEventBO.EventStart = calendarEvent.EventStart;
            calendarEventBO.EventEnd = calendarEvent.EventEnd;
            calendarEventBO.TimeZone = calendarEvent.TimeZone;
            calendarEventBO.Description = calendarEvent.Description;
            calendarEventBO.RecurrenceId = calendarEvent.RecurrenceId;
            calendarEventBO.RecurrenceRule = calendarEvent.RecurrenceRule;
            calendarEventBO.RecurrenceException = calendarEvent.RecurrenceException;
            calendarEventBO.IsAllDay = calendarEvent.IsAllDay;

            calendarEventBO.IsCancelled = calendarEvent.IsCancelled;
            calendarEventBO.IsDeleted = calendarEvent.IsDeleted;
            calendarEventBO.CreateByUserID = calendarEvent.CreateByUserID;
            calendarEventBO.UpdateByUserID = calendarEvent.UpdateByUserID;            

            return (T)(object)calendarEventBO;

        }
        #endregion

        public override object GetFreeSlotsForDoctorByLocationId(int DoctorId, int LocationId, DateTime StartDate, DateTime EndDate)
        {
            if (LocationId <= 0)
            {
                LocationId = _context.DoctorLocationSchedules.Where(p => p.DoctorID == DoctorId
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                             .Select(p => p.LocationID).FirstOrDefault();
            }

            var CalendarEvents = _context.PatientVisit2.Where(p => p.LocationId == LocationId && p.DoctorId == DoctorId
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                        .Select(p => p.CalendarEvent)
                                                        .ToList();

            var CompanyId = _context.Locations.Where(p => p.id == LocationId
                                                           && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                       .Select(p => p.CompanyID)
                                                       .FirstOrDefault();

            var SlotDuration = _context.UserPersonalSettings.Where(p =>  p.UserId == DoctorId && p.CompanyId == CompanyId
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
                }
            }
            
            //var Occurrences = calendar.GetOccurrences(StartDate, EndDate);

            List<BO.FreeSlots> freeSlots = new List<BO.FreeSlots>();

            var schedule = _context.DoctorLocationSchedules.Where(p => p.DoctorID == DoctorId && p.LocationID == LocationId
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                           .Select(p => p.Schedule).Distinct()
                                                           .Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                           .Select(p => p).Include("ScheduleDetails")
                                                           .FirstOrDefault();

            if (schedule == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Doctor is not available in this location.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            //var EventDays = Occurrences.Select(p => p.Period.StartTime.Date).ToList().Distinct();
            List<DateTime> EventDays = new List<DateTime>();
            for (DateTime eachDate = StartDate; eachDate <= EndDate; eachDate = eachDate.Date.AddDays(1))
            {
                EventDays.Add(eachDate);
            }

            foreach (var eachEventDay in EventDays)
            {
                BO.FreeSlots FreeSlotForDay = new BO.FreeSlots();
                FreeSlotForDay.ForDate = eachEventDay;
                List<BO.StartAndEndTimeSlots> StartAndEndTimeSlots = new List<BO.StartAndEndTimeSlots>();

                var StartEndOfDay = schedule.ScheduleDetails.Where(p => p.DayOfWeek == (int)eachEventDay.DayOfWeek + 1).Select(p => new { p.SlotStart, p.SlotEnd }).FirstOrDefault();
                TimeSpan StartOfDay = StartEndOfDay.SlotStart;
                TimeSpan EndOfDay = StartEndOfDay.SlotEnd;


                for (TimeSpan i = StartOfDay; i < EndOfDay; i = i.Add(new TimeSpan(0, SlotDuration, 0)))
                {
                    StartAndEndTimeSlots.Add(new BO.StartAndEndTimeSlots() { StartTime = i, EndTime = i.Add(new TimeSpan(0, SlotDuration, 0)) });
                }

                List<BO.StartAndEndTime> EventTimes = new List<BO.StartAndEndTime>();

                foreach (var eachOccurrences in Occurrences)
                {
                    string TimeZone = eachOccurrences.Value;
                    int intTimeZone = 0;
                    int.TryParse(TimeZone, out intTimeZone);

                    intTimeZone = intTimeZone * -1;

                    HashSet<Occurrence> newEventOccurrences = eachOccurrences.Key;

                    EventTimes.AddRange(newEventOccurrences.Where(p => p.Period.StartTime.AddMinutes(intTimeZone).Date == eachEventDay)
                                                           .Select(p => new BO.StartAndEndTime {
                                                               StartTime = p.Period.StartTime.AddMinutes(intTimeZone).Value,
                                                               EndTime = p.Period.EndTime.AddMinutes(intTimeZone).Value
                                                           })
                                                           .ToList().Distinct().OrderBy(p => p.StartTime).ToList());
                }                

                foreach (var eachEventTime in EventTimes)
                {
                    if (eachEventTime.StartTime.Minute > 0 && eachEventTime.StartTime.Minute < 30)
                    {
                        eachEventTime.StartTime = eachEventTime.StartTime.Add(new TimeSpan(0, -eachEventTime.StartTime.Minute, 0));
                    }
                    else if (eachEventTime.StartTime.Minute > 30 && eachEventTime.StartTime.Minute < 60)
                    {
                        eachEventTime.StartTime = eachEventTime.StartTime.Add(new TimeSpan(0, -eachEventTime.StartTime.Minute + 30, 0));
                    }

                    if (eachEventTime.EndTime.Minute > 0 && eachEventTime.EndTime.Minute < 30)
                    {
                        eachEventTime.EndTime = eachEventTime.EndTime.Add(new TimeSpan(0, 30 - eachEventTime.EndTime.Minute, 0));
                    }
                    else if (eachEventTime.EndTime.Minute > 30 && eachEventTime.EndTime.Minute < 60)
                    {
                        eachEventTime.EndTime = eachEventTime.EndTime.Add(new TimeSpan(0, 60 - eachEventTime.EndTime.Minute, 0));
                    }

                    var removeStartAndEndTime = StartAndEndTimeSlots.Where(p => p.StartTime >= eachEventTime.StartTime.TimeOfDay && p.EndTime <= eachEventTime.EndTime.TimeOfDay).ToList();
                    removeStartAndEndTime.ForEach(p => StartAndEndTimeSlots.Remove(p));
                }

                FreeSlotForDay.StartAndEndTimes = new List<BO.StartAndEndTime>();
                StartAndEndTimeSlots.ForEach(p => FreeSlotForDay.StartAndEndTimes.Add(new BO.StartAndEndTime() { StartTime = eachEventDay.Add(p.StartTime), EndTime = eachEventDay.Add(p.EndTime) }));

                freeSlots.Add(FreeSlotForDay);
            }

            return (object)freeSlots;
        }

        public override object GetFreeSlotsForRoomByLocationId(int RoomId, int LocationId, DateTime StartDate, DateTime EndDate)
        {
            if (LocationId <= 0)
            {
                LocationId = _context.Rooms.Where(p => p.id == RoomId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                           .Select(p => p.LocationID).FirstOrDefault();
            }

            var CalendarEvents = _context.PatientVisit2.Where(p => p.LocationId == LocationId && p.RoomId == RoomId
                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                         .Select(p => p.CalendarEvent)
                                         .ToList();

            var CompanyId = _context.Locations.Where(p => p.id == LocationId
                                                         && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                     .Select(p => p.CompanyID)
                                                     .FirstOrDefault();

            var SlotDuration = _context.GeneralSettings.Where(p => p.CompanyId == CompanyId
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                        .Select(p => p.SlotDuration)
                                                        .FirstOrDefault();
            if(SlotDuration ==0)
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

                        newEvent.RecurrenceRules.Add(new RecurrencePattern(modifiedRecurrenceRule));
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

                        newEvent.ExceptionRules.Add(new RecurrencePattern(modifiedRecurrenceException));
                    }

                    calendar.Events.Add(newEvent);
                    HashSet<Occurrence> newEventOccurrences = new HashSet<Occurrence>();
                    newEventOccurrences = calendar.GetOccurrences(StartDate, EndDate);

                    Occurrences.Add(newEventOccurrences, eachEvent.TimeZone);
                }
            }

            //var Occurrences = calendar.GetOccurrences(StartDate, EndDate);

            List<BO.FreeSlots> freeSlots = new List<BO.FreeSlots>();

            var schedule = _context.Rooms.Where(p => p.id == RoomId && p.LocationID == LocationId
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                           .Select(p => p.Schedule).Distinct()
                                                           .Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                           .Select(p => p).Include("ScheduleDetails")
                                                           .FirstOrDefault();

            if (schedule == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Room is not available in this location.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            //var EventDays = Occurrences.Select(p => p.Period.StartTime.Date).ToList().Distinct();
            List<DateTime> EventDays = new List<DateTime>();
            for (DateTime eachDate = StartDate; eachDate <= EndDate; eachDate = eachDate.Date.AddDays(1))
            {
                EventDays.Add(eachDate);
            }

            foreach (var eachEventDay in EventDays)
            {
                BO.FreeSlots FreeSlotForDay = new BO.FreeSlots();
                FreeSlotForDay.ForDate = eachEventDay;
                List<BO.StartAndEndTimeSlots> StartAndEndTimeSlots = new List<BO.StartAndEndTimeSlots>();

                var StartEndOfDay = schedule.ScheduleDetails.Where(p => p.DayOfWeek == (int)eachEventDay.DayOfWeek + 1).Select(p => new { p.SlotStart, p.SlotEnd }).FirstOrDefault();
                TimeSpan StartOfDay = StartEndOfDay.SlotStart;
                TimeSpan EndOfDay = StartEndOfDay.SlotEnd;


                for (TimeSpan i = StartOfDay; i < EndOfDay; i = i.Add(new TimeSpan(0, SlotDuration, 0)))
                {
                    StartAndEndTimeSlots.Add(new BO.StartAndEndTimeSlots() { StartTime = i, EndTime = i.Add(new TimeSpan(0, SlotDuration, 0)) });
                }

                List<BO.StartAndEndTime> EventTimes = new List<BO.StartAndEndTime>();

                foreach (var eachOccurrences in Occurrences)
                {
                    string TimeZone = eachOccurrences.Value;
                    int intTimeZone = 0;
                    int.TryParse(TimeZone, out intTimeZone);

                    intTimeZone = intTimeZone * -1;

                    HashSet<Occurrence> newEventOccurrences = eachOccurrences.Key;

                    EventTimes.AddRange(newEventOccurrences.Where(p => p.Period.StartTime.AddMinutes(intTimeZone).Date == eachEventDay)
                                                .Select(p => new BO.StartAndEndTime {
                                                    StartTime = p.Period.StartTime.AddMinutes(intTimeZone).Value,
                                                    EndTime = p.Period.EndTime.AddMinutes(intTimeZone).Value
                                                })
                                                .ToList().Distinct().OrderBy(p => p.StartTime).ToList());
                }

                foreach (var eachEventTime in EventTimes)
                {
                    if (eachEventTime.StartTime.Minute > 0 && eachEventTime.StartTime.Minute < 30)
                    {
                        eachEventTime.StartTime = eachEventTime.StartTime.Add(new TimeSpan(0, -eachEventTime.StartTime.Minute, 0));
                    }
                    else if (eachEventTime.StartTime.Minute > 30 && eachEventTime.StartTime.Minute < 60)
                    {
                        eachEventTime.StartTime = eachEventTime.StartTime.Add(new TimeSpan(0, -eachEventTime.StartTime.Minute + 30, 0));
                    }

                    if (eachEventTime.EndTime.Minute > 0 && eachEventTime.EndTime.Minute < 30)
                    {
                        eachEventTime.EndTime = eachEventTime.EndTime.Add(new TimeSpan(0, 30 - eachEventTime.EndTime.Minute, 0));
                    }
                    else if (eachEventTime.EndTime.Minute > 30 && eachEventTime.EndTime.Minute < 60)
                    {
                        eachEventTime.EndTime = eachEventTime.EndTime.Add(new TimeSpan(0, 60 - eachEventTime.EndTime.Minute, 0));
                    }

                    var removeStartAndEndTime = StartAndEndTimeSlots.Where(p => p.StartTime >= eachEventTime.StartTime.TimeOfDay && p.EndTime <= eachEventTime.EndTime.TimeOfDay).ToList();
                    removeStartAndEndTime.ForEach(p => StartAndEndTimeSlots.Remove(p));
                }

                FreeSlotForDay.StartAndEndTimes = new List<BO.StartAndEndTime>();
                StartAndEndTimeSlots.ForEach(p => FreeSlotForDay.StartAndEndTimes.Add(new BO.StartAndEndTime() { StartTime = eachEventDay.Add(p.StartTime), EndTime = eachEventDay.Add(p.EndTime) }));

                freeSlots.Add(FreeSlotForDay);
            }

            return (object)freeSlots;
        }

        public override object GetBusySlotsByCalendarEvent(BO.CalendarEvent CalEvent)
        {
            List<BO.FreeSlots> freeSlots = new List<BO.FreeSlots>();

            if (CalEvent.IsDeleted.HasValue == false || (CalEvent.IsDeleted.HasValue == true && CalEvent.IsDeleted.Value == false))
            {
                var newEvent = new Event()
                {
                    Name = CalEvent.Name,
                    Start = new CalDateTime(CalEvent.EventStart.Value, "UTC"),
                    End = new CalDateTime(CalEvent.EventEnd.Value, "UTC"),
                    Description = CalEvent.Description,
                    IsAllDay = CalEvent.IsAllDay.HasValue == true ? CalEvent.IsAllDay.Value : false,
                    Created = new CalDateTime(CalEvent.CreateDate)
                };

                if (String.IsNullOrWhiteSpace(CalEvent.RecurrenceRule) == false)
                {
                    var keyValuePair = CalEvent.RecurrenceRule.ToUpper().Split(";".ToCharArray());
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
                        newEvent.RecurrenceRules.Add(new RecurrencePattern(modifiedRecurrenceRule));
                    }
                }

                if (String.IsNullOrWhiteSpace(CalEvent.RecurrenceException) == false)
                {
                    var keyValuePair = CalEvent.RecurrenceException.ToUpper().Split(";".ToCharArray());
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
                        newEvent.ExceptionRules.Add(new RecurrencePattern(modifiedRecurrenceException));
                    }
                }

                Calendar calendar = new Calendar();
                calendar.Events.Add(newEvent);

                var Occurrences = calendar.GetOccurrences(DateTime.Now.AddYears(-1), DateTime.Now.AddYears(3));

                int intTimeZone = 0;
                int.TryParse(CalEvent.TimeZone, out intTimeZone);

                intTimeZone = intTimeZone * -1;

                foreach (var eachOccurrences in Occurrences)
                {
                    BO.FreeSlots FreeSlotForDay = new BO.FreeSlots();
                    FreeSlotForDay.ForDate = eachOccurrences.Period.StartTime.AddMinutes(intTimeZone).Date;

                    FreeSlotForDay.StartAndEndTimes = new List<BO.StartAndEndTime>();

                    FreeSlotForDay.StartAndEndTimes.Add(new BO.StartAndEndTime() {
                        StartTime = eachOccurrences.Period.StartTime.AddMinutes(intTimeZone).Value,
                        EndTime = eachOccurrences.Period.EndTime.AddMinutes(intTimeZone).Value
                    });

                    freeSlots.Add(FreeSlotForDay);
                }
            }                

            return (object)freeSlots;
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
