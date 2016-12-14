using MIDAS.GBX.Common;
using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EN;
using MIDAS.GBX.EntityRepository;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class ScheduleRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<Schedule> _dbSet;

        #region Constructor
        public ScheduleRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<Schedule>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Schedule schedule = entity as Schedule;

            if (schedule == null)
                return default(T);

            BO.Schedule scheduleBO = new BO.Schedule();
            scheduleBO.Name = schedule.Name;
            scheduleBO.ID = schedule.id;

            if (schedule.IsDeleted.HasValue)
                scheduleBO.IsDeleted = schedule.IsDeleted.Value;
            if (schedule.UpdateByUserID.HasValue)
                scheduleBO.UpdateByUserID = schedule.UpdateByUserID.Value;

            return (T)(object)scheduleBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Schedule schedule = (BO.Schedule)(object)entity;
            var result = schedule.Validate(schedule);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.Schedule scheduleBO = (BO.Schedule)(object)entity;

            Schedule scheduleDB = new Schedule();

            #region Schedule
            scheduleDB.id = scheduleBO.ID;
            scheduleDB.Name = scheduleBO.Name;
            scheduleDB.IsDeleted = scheduleBO.IsDeleted.HasValue ? scheduleBO.IsDeleted : false;
            #endregion

            if (scheduleDB.id > 0)
            {
                //For Update Record

                //Find Schedule By ID
                Schedule schedule = _context.Schedules.Where(p => p.id == scheduleDB.id).FirstOrDefault<Schedule>();

                if (schedule != null)
                {
                    #region Location
                    schedule.id = scheduleBO.ID;
                    schedule.Name = scheduleBO.Name == null ? schedule.Name : scheduleBO.Name;
                    schedule.IsDeleted = scheduleBO.IsDeleted == null ? scheduleBO.IsDeleted : schedule.IsDeleted;
                    schedule.UpdateDate = scheduleBO.UpdateDate;
                    schedule.UpdateByUserID = scheduleBO.UpdateByUserID;
                    #endregion
                    _context.Entry(schedule).State = System.Data.Entity.EntityState.Modified;
                }

            }
            else
            {
                scheduleDB.CreateDate = scheduleBO.CreateDate;
                scheduleDB.CreateByUserID = scheduleBO.CreateByUserID;
                _dbSet.Add(scheduleDB);
            }
            _context.SaveChanges();

            var res = Convert<BO.Schedule, Schedule>(scheduleDB);
            return (object)res;
        }
        #endregion

        #region Delete
        public override object Delete<T>(T entity)
        {
            BO.Schedule scheduleBO = entity as BO.Schedule;

            Schedule scheduleDB = new Schedule();
            scheduleDB.id = scheduleBO.ID;
            _dbSet.Remove(_context.Schedules.Single<Schedule>(p => p.id == scheduleBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return scheduleDB;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            BO.Schedule acc_ = Convert<BO.Schedule, Schedule>(_context.Schedules.Where(p => p.id == id && p.IsDeleted == false).FirstOrDefault<Schedule>());
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this schedule.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }
        #endregion

        #region Get By Filter
        public override object Get<T>(T entity)
        {
            List<BO.Schedule> lstSchedules = new List<BO.Schedule>();
            BO.Schedule scheduleBO = (BO.Schedule)(object)entity;

            var acc_ = _context.Schedules.Where(p => (p.IsDeleted == false || p.IsDeleted == null)).ToList<Schedule>();
            if (acc_ == null || acc_.Count < 1)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            foreach (Schedule item in acc_)
            {
                lstSchedules.Add(Convert<BO.Schedule, Schedule>(item));
            }

            return lstSchedules;
        }
        #endregion
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
