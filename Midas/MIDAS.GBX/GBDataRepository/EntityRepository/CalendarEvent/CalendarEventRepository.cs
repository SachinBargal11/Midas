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

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class CalendarEventRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<CalendarEvent> _dbCalendarEvent;

        public CalendarEventRepository(MIDASGBXEntities context) : base(context)
        {
            _dbCalendarEvent = context.Set<CalendarEvent>();
            context.Configuration.ProxyCreationEnabled = false;
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

            Calendar calendar = new Calendar();
            foreach (var eachEvent in CalendarEvents)
            {
                if (eachEvent.IsDeleted.HasValue == false || (eachEvent.IsDeleted.HasValue == true && eachEvent.IsDeleted.Value == false))
                {
                    var newEvent = new Event()
                    {
                        Name = eachEvent.Name,
                        Start = new CalDateTime(eachEvent.EventStart),
                        End = new CalDateTime(eachEvent.EventEnd),
                        Description = eachEvent.Description,
                        IsAllDay = eachEvent.IsAllDay.HasValue == true ? eachEvent.IsAllDay.Value : false,
                        Created = new CalDateTime(eachEvent.CreateDate)
                    };

                    if (String.IsNullOrWhiteSpace(eachEvent.RecurrenceRule) == false)
                    {
                        newEvent.RecurrenceRules.Add(new RecurrencePattern(eachEvent.RecurrenceRule));
                    }
                    if (String.IsNullOrWhiteSpace(eachEvent.RecurrenceException) == false)
                    {
                        newEvent.ExceptionRules.Add(new RecurrencePattern(eachEvent.RecurrenceException));
                    }

                    calendar.Events.Add(newEvent);
                }
            }

            var Occurrences = calendar.GetOccurrences(StartDate, EndDate);

            List<BO.FreeSlots> freeSlots = new List<BO.FreeSlots>();

            var schedule = _context.DoctorLocationSchedules.Where(p => p.DoctorID == DoctorId && p.LocationID == LocationId
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                           .Select(p => p.Schedule).Distinct()
                                                           .Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                           .Select(p => p).Include("ScheduleDetails")
                                                           .FirstOrDefault();

            var EventDays = Occurrences.Select(p => p.Period.StartTime.Date).ToList().Distinct();

            foreach (var eachEventDay in EventDays)
            {
                BO.FreeSlots FreeSlotForDay = new BO.FreeSlots();
                FreeSlotForDay.ForDate = eachEventDay;
                List<BO.StartAndEndTimeSlots> StartAndEndTimeSlots = new List<BO.StartAndEndTimeSlots>();

                var StartEndOfDay = schedule.ScheduleDetails.Where(p => p.DayOfWeek == (int)eachEventDay.DayOfWeek + 1).Select(p => new { p.SlotStart, p.SlotEnd }).FirstOrDefault();
                TimeSpan StartOfDay = StartEndOfDay.SlotStart;
                TimeSpan EndOfDay = StartEndOfDay.SlotEnd;


                for (TimeSpan i = StartOfDay; i < EndOfDay; i = i.Add(new TimeSpan(0, 30, 0)))
                {
                    StartAndEndTimeSlots.Add(new BO.StartAndEndTimeSlots() { StartTime = i, EndTime = i.Add(new TimeSpan(0, 30, 0)) });
                }

                var EventTimes = Occurrences.Where(p => p.Period.StartTime.Date == eachEventDay)
                                                    .Select(p => new BO.StartAndEndTime { StartTime = p.Period.StartTime.Value, EndTime = p.Period.EndTime.Value })
                                                    .ToList().Distinct().OrderBy(p => p.StartTime).ToList();

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

                    var removeStartAndEndTime = StartAndEndTimeSlots.Where(p => p.StartTime >= eachEventTime.StartTime.TimeOfDay && p.EndTime < eachEventTime.EndTime.TimeOfDay).ToList();
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

            Calendar calendar = new Calendar();
            foreach (var eachEvent in CalendarEvents)
            {
                if (eachEvent.IsDeleted.HasValue == false || (eachEvent.IsDeleted.HasValue == true && eachEvent.IsDeleted.Value == false))
                {
                    var newEvent = new Event()
                    {
                        Name = eachEvent.Name,
                        Start = new CalDateTime(eachEvent.EventStart),
                        End = new CalDateTime(eachEvent.EventEnd),
                        Description = eachEvent.Description,
                        IsAllDay = eachEvent.IsAllDay.HasValue == true ? eachEvent.IsAllDay.Value : false,
                        Created = new CalDateTime(eachEvent.CreateDate)
                    };

                    if (String.IsNullOrWhiteSpace(eachEvent.RecurrenceRule) == false)
                    {
                        newEvent.RecurrenceRules.Add(new RecurrencePattern(eachEvent.RecurrenceRule));
                    }
                    if (String.IsNullOrWhiteSpace(eachEvent.RecurrenceException) == false)
                    {
                        newEvent.ExceptionRules.Add(new RecurrencePattern(eachEvent.RecurrenceException));
                    }

                    calendar.Events.Add(newEvent);
                }
            }

            var Occurrences = calendar.GetOccurrences(StartDate, EndDate);

            List<BO.FreeSlots> freeSlots = new List<BO.FreeSlots>();

            var schedule = _context.Rooms.Where(p => p.id == RoomId && p.LocationID == LocationId
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                           .Select(p => p.Schedule).Distinct()
                                                           .Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                           .Select(p => p).Include("ScheduleDetails")
                                                           .FirstOrDefault();

            var EventDays = Occurrences.Select(p => p.Period.StartTime.Date).ToList().Distinct();

            foreach (var eachEventDay in EventDays)
            {
                BO.FreeSlots FreeSlotForDay = new BO.FreeSlots();
                FreeSlotForDay.ForDate = eachEventDay;
                List<BO.StartAndEndTimeSlots> StartAndEndTimeSlots = new List<BO.StartAndEndTimeSlots>();

                var StartEndOfDay = schedule.ScheduleDetails.Where(p => p.DayOfWeek == (int)eachEventDay.DayOfWeek + 1).Select(p => new { p.SlotStart, p.SlotEnd }).FirstOrDefault();
                TimeSpan StartOfDay = StartEndOfDay.SlotStart;
                TimeSpan EndOfDay = StartEndOfDay.SlotEnd;


                for (TimeSpan i = StartOfDay; i < EndOfDay; i = i.Add(new TimeSpan(0, 30, 0)))
                {
                    StartAndEndTimeSlots.Add(new BO.StartAndEndTimeSlots() { StartTime = i, EndTime = i.Add(new TimeSpan(0, 30, 0)) });
                }

                var EventTimes = Occurrences.Where(p => p.Period.StartTime.Date == eachEventDay)
                                                    .Select(p => new BO.StartAndEndTime { StartTime = p.Period.StartTime.Value, EndTime = p.Period.EndTime.Value })
                                                    .ToList().Distinct().OrderBy(p => p.StartTime).ToList();

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

                    var removeStartAndEndTime = StartAndEndTimeSlots.Where(p => p.StartTime >= eachEventTime.StartTime.TimeOfDay && p.EndTime < eachEventTime.EndTime.TimeOfDay).ToList();
                    removeStartAndEndTime.ForEach(p => StartAndEndTimeSlots.Remove(p));
                }

                FreeSlotForDay.StartAndEndTimes = new List<BO.StartAndEndTime>();
                StartAndEndTimeSlots.ForEach(p => FreeSlotForDay.StartAndEndTimes.Add(new BO.StartAndEndTime() { StartTime = eachEventDay.Add(p.StartTime), EndTime = eachEventDay.Add(p.EndTime) }));

                freeSlots.Add(FreeSlotForDay);
            }

            return (object)freeSlots;
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
