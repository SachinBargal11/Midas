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
            using (DoctorRepository cmp = new DoctorRepository(_context))
            {
                boDoctor = cmp.ObjectConvert<BO.Doctor, Doctor>(doctorlocationschedule.Doctor);

                if (boDoctor != null && doctorlocationschedule.Doctor != null && doctorlocationschedule.Doctor.User != null)
                {
                    using (UserRepository userRep = new UserRepository(_context))
                    {
                        boDoctor.user = userRep.Convert<BO.User, User>(doctorlocationschedule.Doctor.User);
                    }
                }

                doctorlocationscheduleBO.doctor = boDoctor;
            }

            BO.Location boLocation = new BO.Location();
            using (LocationRepository cmp = new LocationRepository(_context))
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
            if (entity is List<BO.DoctorLocationSchedule>)
            {
                List<BO.DoctorLocationSchedule> lstdoctorlocationschedule = (List<BO.DoctorLocationSchedule>)(object)entity;
                //var result = lstdoctorlocationschedule.Validate(doctorlocationschedule);
                List<MIDAS.GBX.BusinessObjects.BusinessValidation> result = new List<BO.BusinessValidation>();
                return result;
            }
            else
            {
                BO.DoctorLocationSchedule doctorlocationschedule = (BO.DoctorLocationSchedule)(object)entity;
                var result = doctorlocationschedule.Validate(doctorlocationschedule);
                return result;
            }            
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.DoctorLocationSchedule doctorLocationScheduleBO = (BO.DoctorLocationSchedule)(object)entity;

            DoctorLocationSchedule doctorLocationScheduleDB = new DoctorLocationSchedule();

            int? LocationId = null, DoctorId = null;

            if (doctorLocationScheduleBO.ID > 0)
            {
                doctorLocationScheduleDB = _context.DoctorLocationSchedules.Where(p => p.id == doctorLocationScheduleBO.ID).FirstOrDefault();

                if (doctorLocationScheduleDB == null)
                {
                    return new BO.ErrorObject { ErrorMessage = "Doctor,Location,Schedule record not found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
            }

            if (doctorLocationScheduleBO.location == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Location object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                LocationId = doctorLocationScheduleBO.location.ID;
            }

            if (doctorLocationScheduleBO.doctor == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Doctor object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                DoctorId = doctorLocationScheduleBO.doctor.ID;
            }

            if (doctorLocationScheduleBO.schedule == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Schedule object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            
            bool ExistsLinkage = CheckLinkage(null, LocationId, DoctorId);

            if (ExistsLinkage == false)
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "The Doctor does not belongs to this location.", ErrorLevel = ErrorLevel.Error };
            }

            #region schedule
            if (doctorLocationScheduleBO.schedule != null)
            {
                if (doctorLocationScheduleBO.schedule.ID > 0)
                {
                    Schedule schedule = _context.Schedules.Where(p => p.id == doctorLocationScheduleBO.schedule.ID).FirstOrDefault<Schedule>();
                    if (schedule != null)
                    {
                        doctorLocationScheduleDB.Schedule = schedule;
                    }
                    else
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass the valid schedule.", ErrorLevel = ErrorLevel.Error };
                }
            }
            #endregion

            #region Location
            if (doctorLocationScheduleBO.location != null)
            {
                if (doctorLocationScheduleBO.location.ID > 0)
                {
                    Location location = _context.Locations.Where(p => p.id == doctorLocationScheduleBO.location.ID).FirstOrDefault<Location>();
                    if (location != null)
                    {
                        doctorLocationScheduleDB.Location = location;
                    }
                    else
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid location.", ErrorLevel = ErrorLevel.Error };
                }
            }
            #endregion

            #region doctor
            if (doctorLocationScheduleBO.doctor != null)
            {
                if (doctorLocationScheduleBO.doctor.ID > 0)
                {
                    Doctor doctor = _context.Doctors.Where(p => p.Id == doctorLocationScheduleBO.doctor.ID).FirstOrDefault<Doctor>();
                    if (doctor != null)
                    {
                        doctorLocationScheduleDB.Doctor = doctor;
                    }
                    else
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid doctor.", ErrorLevel = ErrorLevel.Error };
                }
            }

            #endregion

            if (doctorLocationScheduleBO.ID <= 0)
            {
                _context.DoctorLocationSchedules.Add(doctorLocationScheduleDB);
            }
            _context.SaveChanges();

            doctorLocationScheduleDB = _context.DoctorLocationSchedules.Include("Doctor").Include("Location").Include("Schedule").Where(p => p.id == doctorLocationScheduleDB.id).FirstOrDefault<DoctorLocationSchedule>();

            _context.SaveChanges();

            var res = Convert<BO.DoctorLocationSchedule, DoctorLocationSchedule>(doctorLocationScheduleDB);
            return (object)res;
        }
        #endregion

        public bool CheckLinkage(int? CompanyId, int? LocationId, int? DoctorId)
        {
            bool result = false;

            if (CompanyId.HasValue == true)
            {

            }
            else if (LocationId.HasValue == true && DoctorId.HasValue == true)
            {
                result = _context.Locations.Any(p => p.id == LocationId.Value && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                  && p.Company.UserCompanies.Any(p2 => p2.User.Doctor.Id == DoctorId.Value) == true);
            }

            return result;
        }

        #region Associate Location To Doctors
        public override object AssociateLocationToDoctors<T>(T entity)
        {
            List<BO.DoctorLocationSchedule> lstDoctorLocationScheduleBO = (List<BO.DoctorLocationSchedule>)(object)entity;

            if (lstDoctorLocationScheduleBO == null || (lstDoctorLocationScheduleBO != null && lstDoctorLocationScheduleBO.Count == 0))
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid info.", ErrorLevel = ErrorLevel.Error };
            }

            List<DoctorLocationSchedule> lstDoctorLocationScheduleDB = new List<DoctorLocationSchedule>();

            List<int> forLocationIds = lstDoctorLocationScheduleBO.Select(p => p.location.ID).Distinct().ToList<int>();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                foreach (var eachDoctorLocationScheduleBO in lstDoctorLocationScheduleBO)
                {
                    int? LocationId = null, DoctorId = null, ScheduleId = null;

                    if (eachDoctorLocationScheduleBO.location != null)
                    {
                        LocationId = eachDoctorLocationScheduleBO.location.ID;                        
                    }
                    if (eachDoctorLocationScheduleBO.doctor != null)
                    {
                        DoctorId = eachDoctorLocationScheduleBO.doctor.ID;
                    }
                    if (eachDoctorLocationScheduleBO.schedule != null)
                    {
                        ScheduleId = eachDoctorLocationScheduleBO.schedule.ID;
                    }

                    if (LocationId.HasValue == false || (LocationId.HasValue == true && LocationId.Value <= 0))
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Location Id.", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        bool ExistsLocation = _context.Locations.Any(p => p.id == LocationId.Value
                                                                 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)));

                        if (ExistsLocation == false)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass existing Location Id.", ErrorLevel = ErrorLevel.Error };
                        }
                    }

                    if (DoctorId.HasValue == false || (DoctorId.HasValue == true && DoctorId.Value <= 0))
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Doctor Id.", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        bool ExistsDoctor = _context.Doctors.Any(p => p.Id == DoctorId.Value
                                                                 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)));

                        if (ExistsDoctor == false)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass existing Doctor Id.", ErrorLevel = ErrorLevel.Error };
                        }
                    }

                    if (ScheduleId.HasValue == false || (ScheduleId.HasValue == true && ScheduleId.Value <= 0))
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Schedule Id.", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        bool ExistsSchedule = _context.Schedules.Any(p => p.id == ScheduleId.Value
                                                               && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)));

                        if (ExistsSchedule == false)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass existing Schedule Id.", ErrorLevel = ErrorLevel.Error };
                        }
                    }

                    //var comp = _context.Companies.Where(p =>
                    //                               (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                    //                              .Select(p => p.id);
                    //var Locationid = _context.Locations.Where(p => comp.Contains(p.CompanyID)).Select(p2 => p2.id);
                    //var DoctorLocationSchedule = _context.DoctorLocationSchedules.Where(p => Locationid.Contains(p.LocationID)
                    //                                                                  && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                    ////                                                              .ToList<DoctorLocationSchedule>();
                    //if (DoctorLocationSchedule == null)
                    //{
                    //    return new BO.ErrorObject { errorObject = "", ErrorMessage = "The Doctor does not belongs to this location.", ErrorLevel = ErrorLevel.Error };
                    //}

                    bool ExistsLinkage = CheckLinkage(null, LocationId, DoctorId);

                    if (ExistsLinkage == false)
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "The Doctor does not belongs to this location.", ErrorLevel = ErrorLevel.Error };
                    }


                    DoctorLocationSchedule doctorLocationScheduleDB = _context.DoctorLocationSchedules.Where(p => p.LocationID == LocationId.Value && p.DoctorID == DoctorId.Value
                                                                                                              && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<DoctorLocationSchedule>();

                    if (doctorLocationScheduleDB != null)
                    {
                        doctorLocationScheduleDB.ScheduleID = ScheduleId.Value;
                    }
                    else
                    {
                        doctorLocationScheduleDB = new DoctorLocationSchedule();
                        doctorLocationScheduleDB.LocationID = LocationId.Value;
                        doctorLocationScheduleDB.DoctorID = DoctorId.Value;
                        doctorLocationScheduleDB.ScheduleID = ScheduleId.Value;

                        _context.DoctorLocationSchedules.Add(doctorLocationScheduleDB);
                    }

                    _context.SaveChanges();
                }

                dbContextTransaction.Commit();

                lstDoctorLocationScheduleDB = _context.DoctorLocationSchedules.Include("Doctor")
                                                                              .Include("Location")
                                                                              .Include("Schedule")
                                                                              .Where(p => forLocationIds.Contains(p.LocationID)
                                                                                          && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                  .ToList<DoctorLocationSchedule>();
            }

            List<BO.DoctorLocationSchedule> res = new List<BO.DoctorLocationSchedule>();
            lstDoctorLocationScheduleDB.ForEach(p => res.Add(Convert<BO.DoctorLocationSchedule, DoctorLocationSchedule>(p)));

            return (object)res;
        }
        #endregion

        #region Associate Doctor To Locations 
        public override object AssociateDoctorToLocations<T>(T entity)
        {
            List<BO.DoctorLocationSchedule> lstDoctorLocationScheduleBO = (List<BO.DoctorLocationSchedule>)(object)entity;

            if (lstDoctorLocationScheduleBO == null || (lstDoctorLocationScheduleBO != null && lstDoctorLocationScheduleBO.Count == 0))
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid info.", ErrorLevel = ErrorLevel.Error };
            }

            List<DoctorLocationSchedule> lstDoctorLocationScheduleDB = new List<DoctorLocationSchedule>();

            List<int> forDoctorIds = lstDoctorLocationScheduleBO.Select(p => p.doctor.ID).Distinct().ToList<int>();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                foreach (var eachDoctorLocationScheduleBO in lstDoctorLocationScheduleBO)
                {
                    int? LocationId = null, DoctorId = null, ScheduleId = null;

                    if (eachDoctorLocationScheduleBO.location != null)
                    {
                        LocationId = eachDoctorLocationScheduleBO.location.ID;
                    }
                    if (eachDoctorLocationScheduleBO.doctor != null)
                    {
                        DoctorId = eachDoctorLocationScheduleBO.doctor.ID;
                    }
                    if (eachDoctorLocationScheduleBO.schedule != null)
                    {
                        ScheduleId = eachDoctorLocationScheduleBO.schedule.ID;
                    }

                    if (LocationId.HasValue == false || (LocationId.HasValue == true && LocationId.Value <= 0))
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Location Id.", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        bool ExistsLocation = _context.Locations.Any(p => p.id == LocationId.Value
                                                                 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)));

                        if (ExistsLocation == false)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass existing Location Id.", ErrorLevel = ErrorLevel.Error };
                        }
                    }

                    if (DoctorId.HasValue == false || (DoctorId.HasValue == true && DoctorId.Value <= 0))
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Doctor Id.", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        bool ExistsDoctor = _context.Doctors.Any(p => p.Id == DoctorId.Value
                                                                 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)));

                        if (ExistsDoctor == false)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass existing Doctor Id.", ErrorLevel = ErrorLevel.Error };
                        }
                    }

                    if (ScheduleId.HasValue == false || (ScheduleId.HasValue == true && ScheduleId.Value <= 0))
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Schedule Id.", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        bool ExistsSchedule = _context.Schedules.Any(p => p.id == ScheduleId.Value
                                                               && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)));

                        if (ExistsSchedule == false)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass existing Schedule Id.", ErrorLevel = ErrorLevel.Error };
                        }
                    }

                    bool ExistsLinkage = CheckLinkage(null, LocationId, DoctorId);

                    if (ExistsLinkage == false)
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "The Doctor does not belongs to this location.", ErrorLevel = ErrorLevel.Error };
                    }

                    DoctorLocationSchedule doctorLocationScheduleDB = _context.DoctorLocationSchedules.Where(p => p.LocationID == LocationId.Value && p.DoctorID == DoctorId.Value
                                                                                                              && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<DoctorLocationSchedule>();

                    if (doctorLocationScheduleDB != null)
                    {
                        doctorLocationScheduleDB.ScheduleID = ScheduleId.Value;
                    }
                    else
                    {
                        doctorLocationScheduleDB = new DoctorLocationSchedule();
                        doctorLocationScheduleDB.LocationID = LocationId.Value;
                        doctorLocationScheduleDB.DoctorID = DoctorId.Value;
                        doctorLocationScheduleDB.ScheduleID = ScheduleId.Value;

                        _context.DoctorLocationSchedules.Add(doctorLocationScheduleDB);
                    }

                    _context.SaveChanges();
                }

                dbContextTransaction.Commit();

                lstDoctorLocationScheduleDB = _context.DoctorLocationSchedules.Include("Doctor")
                                                                              .Include("Location")
                                                                              .Include("Schedule")
                                                                              .Where(p => forDoctorIds.Contains(p.DoctorID)
                                                                                          && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                  .ToList<DoctorLocationSchedule>();
            }

            List<BO.DoctorLocationSchedule> res = new List<BO.DoctorLocationSchedule>();
            lstDoctorLocationScheduleDB.ForEach(p => res.Add(Convert<BO.DoctorLocationSchedule, DoctorLocationSchedule>(p)));

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


        #region Delete
        public override object Delete(int id)
        {
            
            DoctorLocationSchedule doctorlocationscheduleDB = _context.DoctorLocationSchedules.Include("Doctor").Include("Location").Include("Schedule").Where(p => p.id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<DoctorLocationSchedule>();

            if(doctorlocationscheduleDB==null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this DoctorLocationSchedule.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            doctorlocationscheduleDB.IsDeleted = true;
          
            _context.Entry(doctorlocationscheduleDB).State = System.Data.Entity.EntityState.Modified;

            _context.SaveChanges();

            var res = Convert<BO.DoctorLocationSchedule, DoctorLocationSchedule>(doctorlocationscheduleDB);
            return (object)res;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            BO.DoctorLocationSchedule acc_ = Convert<BO.DoctorLocationSchedule, DoctorLocationSchedule>(_context.DoctorLocationSchedules.Include("Doctor").Include("Location").Include("Schedule").Where(p => p.id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<DoctorLocationSchedule>());
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this DoctorLocationSchedule.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }
        #endregion

        #region Get By Filter
        /*public override object Get<T>(T entity)
        {
            List<BO.DoctorLocationSchedule> lstDoctorLocationSchedule = new List<BO.DoctorLocationSchedule>();
            BO.DoctorLocationSchedule doctorlocationscheduleBO = (BO.DoctorLocationSchedule)(object)entity;
            var acc_ = _context.DoctorLocationSchedules.Include("Doctor").Include("Location").Include("Schedule").Where(p => (p.IsDeleted == false || p.IsDeleted == null)).ToList<DoctorLocationSchedule>();
            if (acc_ == null || acc_.Count < 1)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            foreach (DoctorLocationSchedule item in acc_)
            {
                lstDoctorLocationSchedule.Add(Convert<BO.DoctorLocationSchedule, DoctorLocationSchedule>(item));
            }

            return lstDoctorLocationSchedule;
        }*/
        #endregion

        #region Get By Filter
        public override object Get()
        {
            List<BO.DoctorLocationSchedule> lstDoctorLocationSchedule = new List<BO.DoctorLocationSchedule>();
            //BO.DoctorLocationSchedule doctorlocationscheduleBO = (BO.DoctorLocationSchedule)(object)entity;
            var acc_ = _context.DoctorLocationSchedules.Include("Doctor").Include("Location").Include("Schedule").Where(p => (p.IsDeleted == false || p.IsDeleted == null)).ToList<DoctorLocationSchedule>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                foreach (DoctorLocationSchedule item in acc_)
                {
                    lstDoctorLocationSchedule.Add(Convert<BO.DoctorLocationSchedule, DoctorLocationSchedule>(item));
                }

                return lstDoctorLocationSchedule;
            }
        }
        #endregion

        #region Get By Location Id
        public override object GetByLocationId(int id)
        {
            List<BO.DoctorLocationSchedule> lstDoctorLocationSchedule = new List<BO.DoctorLocationSchedule>();

            var acc_ = _context.DoctorLocationSchedules.Include("Doctor").Include("Doctor.User")
                                                       .Include("Location").Include("Location.AddressInfo").Include("Location.ContactInfo")
                                                       .Include("Schedule")
                                                       .Where(p => p.LocationID== id && (p.IsDeleted == false || p.IsDeleted == null)).ToList<DoctorLocationSchedule>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                foreach (DoctorLocationSchedule item in acc_)
                {
                    lstDoctorLocationSchedule.Add(Convert<BO.DoctorLocationSchedule, DoctorLocationSchedule>(item));
                }

                return lstDoctorLocationSchedule;
            }
        }
        #endregion

        #region Get By Doctor Id
        public override object GetByDoctorId(int id)
        {
            List<BO.DoctorLocationSchedule> lstDoctorLocationSchedule = new List<BO.DoctorLocationSchedule>();

            var acc_ = _context.DoctorLocationSchedules.Include("Doctor").Include("Doctor.User")
                                                       .Include("Location").Include("Location.AddressInfo").Include("Location.ContactInfo")
                                                       .Include("Schedule")
                                                       .Where(p => p.DoctorID == id && (p.IsDeleted == false || p.IsDeleted == null)).ToList<DoctorLocationSchedule>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                foreach (DoctorLocationSchedule item in acc_)
                {
                    lstDoctorLocationSchedule.Add(Convert<BO.DoctorLocationSchedule, DoctorLocationSchedule>(item));
                }

                return lstDoctorLocationSchedule;
            }
        }
        #endregion

        #region Get By Location Id and Doctor Id
        public override object Get(int locationId,int doctorId)
        {
            List<BO.DoctorLocationSchedule> lstDoctorLocationSchedule = new List<BO.DoctorLocationSchedule>();

            var acc_ = _context.DoctorLocationSchedules.Include("Doctor").Include("Doctor.User")
                                                       .Include("Location").Include("Location.AddressInfo").Include("Location.ContactInfo")
                                                       .Include("Schedule").Where(p => (p.LocationID == locationId && p.DoctorID== doctorId) && (p.IsDeleted == false || p.IsDeleted == null)).ToList<DoctorLocationSchedule>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                foreach (DoctorLocationSchedule item in acc_)
                {
                    lstDoctorLocationSchedule.Add(Convert<BO.DoctorLocationSchedule, DoctorLocationSchedule>(item));
                }

                return lstDoctorLocationSchedule;
            }
        }
        #endregion


        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
