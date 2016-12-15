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
            DoctorLocationSchedule doctorlocationschedule = entity as DoctorLocationSchedule;

            if (doctorlocationschedule == null)
                return default(T);

            BO.DoctorLocationSchedule doctorlocationscheduleBO = new BO.DoctorLocationSchedule();

            doctorlocationscheduleBO.ID = doctorlocationschedule.id;
            if (doctorlocationschedule.IsDeleted.HasValue)
                doctorlocationscheduleBO.IsDeleted = doctorlocationschedule.IsDeleted.Value;
            if (doctorlocationschedule.UpdateByUserID.HasValue)
                doctorlocationscheduleBO.UpdateByUserID = doctorlocationschedule.UpdateByUserID.Value;

            BO.Doctor boDoctor = new BO.Doctor();
            using (UserRepository cmp = new UserRepository(_context))
            {
                boDoctor = cmp.Convert<BO.Doctor, Doctor>(doctorlocationschedule.Doctor);
                doctorlocationscheduleBO.doctor = boDoctor;
            }

            BO.Location boLocation = new BO.Location();
            using (ScheduleRepository cmp = new ScheduleRepository(_context))
            {
                boLocation = cmp.Convert<BO.Location, Location>(doctorlocationschedule.Location);
                doctorlocationscheduleBO.location = boLocation;
            }

            BO.Schedule boSchedule = new BO.Schedule();
            using (ScheduleRepository cmp = new ScheduleRepository(_context))
            {
                boSchedule = cmp.Convert<BO.Schedule, Schedule>(doctorlocationschedule.Schedule);
                doctorlocationscheduleBO.schedule = boSchedule;
            }

            return (T)(object)doctorlocationscheduleBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.DoctorLocationSchedule doctorlocationschedule = (BO.DoctorLocationSchedule)(object)entity;
            var result = doctorlocationschedule.Validate(doctorlocationschedule);
            return result;
        }
        #endregion


        #region Save
        public override object Save<T>(T entity)
        {
            BO.DoctorLocationSchedule doctorlocationscheduleBO = (BO.DoctorLocationSchedule)(object)entity;

            DoctorLocationSchedule doctorlocationscheduleDB = new DoctorLocationSchedule();

            #region LocationRoom
            doctorlocationscheduleDB.id = doctorlocationscheduleBO.ID;
            doctorlocationscheduleDB.IsDeleted = doctorlocationscheduleBO.IsDeleted.HasValue ? doctorlocationscheduleBO.IsDeleted : false;
            #endregion

            #region Location
            if (doctorlocationscheduleBO.location != null)
                if (doctorlocationscheduleBO.location.ID > 0)
                {
                    Location location = _context.Locations.Where(p => p.id == doctorlocationscheduleBO.location.ID).FirstOrDefault<Location>();
                    if (location != null)
                    {
                        doctorlocationscheduleDB.Location = location;
                    }
                    else
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid location detail.", ErrorLevel = ErrorLevel.Error };
                }
            #endregion

            //Default schedule

            Schedule defaultschedule = _context.Schedules.Where(p => p.IsDefault == true).FirstOrDefault<Schedule>();
            if (defaultschedule != null)
            {
                doctorlocationscheduleDB.Schedule = defaultschedule;
            }
            else
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please set default schedule in database.", ErrorLevel = ErrorLevel.Error };

            #region Doctor
            if (doctorlocationscheduleBO.doctor != null)
                if (doctorlocationscheduleBO.doctor.ID > 0)
                {
                    Doctor doctor = _context.Doctors.Where(p => p.id == doctorlocationscheduleBO.location.ID).FirstOrDefault<Doctor>();
                    if (doctor != null)
                    {
                        doctorlocationscheduleDB.Doctor = doctor;
                    }
                    else
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid doctor detail.", ErrorLevel = ErrorLevel.Error };
                }
            #endregion

            if (doctorlocationscheduleBO.ID > 0)
            {
                //For Update Record

                //Find Doctor Location Schedule By ID
                DoctorLocationSchedule doctorlocationschedule = _context.DoctorLocationSchedules.Where(p => p.id == doctorlocationscheduleBO.ID && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<DoctorLocationSchedule>();

                if (doctorlocationschedule != null)
                {
                    #region Location
                    doctorlocationschedule.id = doctorlocationscheduleBO.ID;
                    doctorlocationschedule.IsDeleted = doctorlocationscheduleBO.IsDeleted == null ? doctorlocationscheduleBO.IsDeleted : doctorlocationschedule.IsDeleted;
                    doctorlocationschedule.UpdateDate = doctorlocationscheduleBO.UpdateDate;
                    doctorlocationschedule.UpdateByUserID = doctorlocationscheduleBO.UpdateByUserID;
                    #endregion
                    _context.Entry(doctorlocationschedule).State = System.Data.Entity.EntityState.Modified;
                }
                else
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid doctorlocationschedule details.", ErrorLevel = ErrorLevel.Error };

            }
            else
            {
                doctorlocationscheduleDB.CreateDate = doctorlocationscheduleBO.CreateDate;
                doctorlocationscheduleDB.CreateByUserID = doctorlocationscheduleBO.CreateByUserID;
                _dbSet.Add(doctorlocationscheduleDB);
            }
            _context.SaveChanges();

            var res = Convert<BO.DoctorLocationSchedule, DoctorLocationSchedule>(doctorlocationscheduleDB);
            return (object)res;
        }
        #endregion

        #region Delete
        public override object Delete<T>(T entity)
        {
            BO.DoctorLocationSchedule doctorlocationscheduleBO = entity as BO.DoctorLocationSchedule;

            DoctorLocationSchedule doctorlocationscheduleDB = new DoctorLocationSchedule();
            doctorlocationscheduleDB.id = doctorlocationscheduleBO.ID;
            _dbSet.Remove(_context.DoctorLocationSchedules.Single<DoctorLocationSchedule>(p => p.id == doctorlocationscheduleBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return doctorlocationscheduleBO;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            BO.DoctorLocationSchedule acc_ = Convert<BO.DoctorLocationSchedule, DoctorLocationSchedule>(_context.DoctorLocationSchedules.Where(p => p.id == id && p.IsDeleted == false).FirstOrDefault<DoctorLocationSchedule>());
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this DoctorLocationSchedule.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }
        #endregion

        #region Get By Filter
        public override object Get<T>(T entity)
        {
            List<BO.DoctorLocationSchedule> lstDoctorLocationSchedule = new List<BO.DoctorLocationSchedule>();
            BO.DoctorLocationSchedule doctorlocationscheduleBO = (BO.DoctorLocationSchedule)(object)entity;
            var acc_ = _context.DoctorLocationSchedules.Where(p => (p.IsDeleted == false || p.IsDeleted == null)).ToList<DoctorLocationSchedule>();
            if (acc_ == null || acc_.Count < 1)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            foreach (DoctorLocationSchedule item in acc_)
            {
                lstDoctorLocationSchedule.Add(Convert<BO.DoctorLocationSchedule, DoctorLocationSchedule>(item));
            }

            return lstDoctorLocationSchedule;
        }
        #endregion
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
