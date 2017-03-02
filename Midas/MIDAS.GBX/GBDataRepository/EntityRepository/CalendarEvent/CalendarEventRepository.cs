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

            calendarEventBO.IsDeleted = calendarEvent.IsDeleted;
            calendarEventBO.CreateByUserID = calendarEvent.CreateByUserID;
            calendarEventBO.UpdateByUserID = calendarEvent.UpdateByUserID;            

            return (T)(object)calendarEventBO;

        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
