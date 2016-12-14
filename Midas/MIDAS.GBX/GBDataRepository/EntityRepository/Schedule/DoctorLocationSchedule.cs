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
    internal class DoctorLocationScheduleRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<DoctorLocationSchedule> _dbSet;

        #region Constructor
        public DoctorLocationScheduleRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<DoctorLocationSchedule>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            DoctorLocationSchedule schedule = entity as DoctorLocationSchedule;

            if (schedule == null)
                return default(T);

            BO.DoctorLocationSchedule scheduleBO = new BO.DoctorLocationSchedule();
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
            BO.DoctorLocationSchedule schedule = (BO.DoctorLocationSchedule)(object)entity;
            var result = schedule.Validate(schedule);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.DoctorLocationSchedule scheduleBO = (BO.DoctorLocationSchedule)(object)entity;

            DoctorLocationSchedule scheduleDB = new DoctorLocationSchedule();

            #region DoctorLocationSchedule
            scheduleDB.id = scheduleBO.ID;
            scheduleDB.Name = scheduleBO.Name;
            scheduleDB.IsDeleted = scheduleBO.IsDeleted.HasValue ? scheduleBO.IsDeleted : false;
            #endregion

            if (scheduleDB.id > 0)
            {
                //For Update Record

                //Find DoctorLocationSchedule By ID
                DoctorLocationSchedule schedule = _context.Schedules.Where(p => p.id == scheduleDB.id).FirstOrDefault<DoctorLocationSchedule>();

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

            var res = Convert<BO.DoctorLocationSchedule, DoctorLocationSchedule>(scheduleDB);
            return (object)res;
        }
        #endregion

        #region Delete
        public override object Delete<T>(T entity)
        {
            BO.DoctorLocationSchedule scheduleBO = entity as BO.DoctorLocationSchedule;

            DoctorLocationSchedule scheduleDB = new DoctorLocationSchedule();
            scheduleDB.id = scheduleBO.ID;
            _dbSet.Remove(_context.Schedules.Single<DoctorLocationSchedule>(p => p.id == scheduleBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return scheduleDB;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            BO.DoctorLocationSchedule acc_ = Convert<BO.DoctorLocationSchedule, DoctorLocationSchedule>(_context.Schedules.Where(p => p.id == id && p.IsDeleted == false).FirstOrDefault<DoctorLocationSchedule>());
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
            List<BO.DoctorLocationSchedule> lstSchedules = new List<BO.DoctorLocationSchedule>();
            BO.DoctorLocationSchedule scheduleBO = (BO.DoctorLocationSchedule)(object)entity;

            var acc_ = _context.Schedules.Where(p => (p.IsDeleted == false || p.IsDeleted == null)).ToList<DoctorLocationSchedule>();
            if (acc_ == null || acc_.Count < 1)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            foreach (DoctorLocationSchedule item in acc_)
            {
                lstSchedules.Add(Convert<BO.DoctorLocationSchedule, DoctorLocationSchedule>(item));
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
