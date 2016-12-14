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
    internal class ScheduleDetailRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<ScheduleDetail> _dbSet;

        #region Constructor
        public ScheduleDetailRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<ScheduleDetail>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            ScheduleDetail scheduledetail = entity as ScheduleDetail;

            if (scheduledetail == null)
                return default(T);

            BO.ScheduleDetail scheduledetailBO = new BO.ScheduleDetail();
            scheduledetailBO.ID = scheduledetail.id;
            scheduledetailBO.Name = scheduledetail.Name;
            scheduledetailBO.dayofWeek = scheduledetail.DayOfWeek;
            scheduledetailBO.slotStart = scheduledetail.SlotStart;
            scheduledetailBO.slotEnd = scheduledetail.SlotEnd;
            scheduledetailBO.slotDate = scheduledetail.SlotDate;
            scheduledetailBO.scheduleStatus = (BO.GBEnums.ScheduleStatus)scheduledetail.Status;

            if (scheduledetail.IsDeleted.HasValue)
                scheduledetailBO.IsDeleted = scheduledetail.IsDeleted.Value;
            if (scheduledetail.UpdateByUserID.HasValue)
                scheduledetailBO.UpdateByUserID = scheduledetail.UpdateByUserID.Value;

            using (ScheduleRepository sr = new ScheduleRepository(_context))
            {
                scheduledetailBO.Schedule = sr.Convert<BO.Schedule, Schedule>(scheduledetail.Schedule);
            }

            return (T)(object)scheduledetailBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.ScheduleDetail schedule = (BO.ScheduleDetail)(object)entity;
            var result = schedule.Validate(schedule);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.ScheduleDetail scheduledetailBO = (BO.ScheduleDetail)(object)entity;

            ScheduleDetail scheduledetailDB = new ScheduleDetail();

            #region ScheduleDetail
            scheduledetailDB.id = scheduledetailBO.ID;
            scheduledetailDB.Name = scheduledetailBO.Name;
            scheduledetailDB.DayOfWeek = scheduledetailBO.dayofWeek;
            scheduledetailDB.SlotStart = scheduledetailBO.slotStart;
            scheduledetailDB.SlotEnd = scheduledetailBO.slotEnd;
            scheduledetailDB.SlotDate = scheduledetailBO.slotDate;
            scheduledetailDB.Status = System.Convert.ToByte(scheduledetailBO.scheduleStatus);
            scheduledetailDB.IsDeleted = scheduledetailBO.IsDeleted.HasValue ? scheduledetailBO.IsDeleted : false;
            #endregion

            #region Schedule
            if (scheduledetailBO.Schedule != null)
                if (scheduledetailBO.Schedule.ID > 0)
                {
                    Schedule schedule = _context.Schedules.Where(p => p.id == scheduledetailBO.Schedule.ID).FirstOrDefault<Schedule>();
                    if (schedule != null)
                    {
                        scheduledetailDB.Schedule = schedule;
                    }
                    else
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Schedule.", ErrorLevel = ErrorLevel.Error };
                }
            #endregion

            if (scheduledetailDB.id > 0)
            {
                //For Update Record

                //Find ScheduleDetail By ID
                ScheduleDetail schedule = _context.ScheduleDetails.Where(p => p.id == scheduledetailDB.id && (p.IsDeleted==false || p.IsDeleted==null)).FirstOrDefault<ScheduleDetail>();

                if (schedule != null)
                {
                    #region Location
                    schedule.id = scheduledetailBO.ID;
                    schedule.Name = scheduledetailBO.Name == null ? schedule.Name : scheduledetailBO.Name;
                    schedule.DayOfWeek = scheduledetailBO.dayofWeek == null ? scheduledetailBO.dayofWeek : schedule.DayOfWeek;
                    schedule.SlotStart = scheduledetailBO.slotStart == null ? scheduledetailBO.slotStart : schedule.SlotStart;
                    schedule.SlotEnd = scheduledetailBO.slotEnd == null ? scheduledetailBO.slotEnd : schedule.SlotEnd;
                    schedule.SlotDate = scheduledetailBO.slotDate == null ? scheduledetailBO.slotDate : schedule.SlotDate;
                    schedule.IsDeleted = scheduledetailBO.IsDeleted == null ? scheduledetailBO.IsDeleted : schedule.IsDeleted;
                    schedule.UpdateDate = scheduledetailBO.UpdateDate;
                    schedule.UpdateByUserID = scheduledetailBO.UpdateByUserID;
                    #endregion
                    _context.Entry(schedule).State = System.Data.Entity.EntityState.Modified;
                }

            }
            else
            {
                scheduledetailDB.CreateDate = scheduledetailBO.CreateDate;
                scheduledetailDB.CreateByUserID = scheduledetailBO.CreateByUserID;
                _dbSet.Add(scheduledetailDB);
            }
            _context.SaveChanges();

            var res = Convert<BO.ScheduleDetail, ScheduleDetail>(scheduledetailDB);
            return (object)res;
        }
        #endregion

        #region Delete
        public override object Delete<T>(T entity)
        {
            BO.ScheduleDetail scheduleBO = entity as BO.ScheduleDetail;

            ScheduleDetail scheduleDB = new ScheduleDetail();
            scheduleDB.id = scheduleBO.ID;
            _dbSet.Remove(_context.ScheduleDetails.Single<ScheduleDetail>(p => p.id == scheduleBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return scheduleDB;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            BO.ScheduleDetail acc_ = Convert<BO.ScheduleDetail, ScheduleDetail>(_context.ScheduleDetails.Where(p => p.id == id && p.IsDeleted == false).FirstOrDefault<ScheduleDetail>());
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
            List<BO.ScheduleDetail> lstSchedules = new List<BO.ScheduleDetail>();
            BO.ScheduleDetail scheduleBO = (BO.ScheduleDetail)(object)entity;

            var acc_ = _context.ScheduleDetails.Where(p => (p.IsDeleted == false || p.IsDeleted == null)).ToList<ScheduleDetail>();
            if (acc_ == null || acc_.Count < 1)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            foreach (ScheduleDetail item in acc_)
            {
                lstSchedules.Add(Convert<BO.ScheduleDetail, ScheduleDetail>(item));
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
