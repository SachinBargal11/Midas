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
    internal class UserLocationScheduleRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<UserLocationSchedule> _dbSet;

        #region Constructor
        public UserLocationScheduleRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<UserLocationSchedule>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            UserLocationSchedule userlocationschedule = entity as UserLocationSchedule;

            if (userlocationschedule == null)
                return default(T);

            BO.UserLocationSchedule userlocationscheduleBO = new BO.UserLocationSchedule();

            userlocationscheduleBO.ID = userlocationschedule.id;
            if (userlocationschedule.IsDeleted.HasValue)
                userlocationscheduleBO.IsDeleted = userlocationschedule.IsDeleted.Value;
            if (userlocationschedule.UpdateByUserID.HasValue)
                userlocationscheduleBO.UpdateByUserID = userlocationschedule.UpdateByUserID.Value;

            if (userlocationschedule.User != null && (userlocationschedule.User.IsDeleted.HasValue == false || (userlocationschedule.User.IsDeleted.HasValue == true && userlocationschedule.User.IsDeleted.Value == false)))
            {
                BO.User boUser = new BO.User();
                using (UserRepository cmp = new UserRepository(_context))
                {
                    boUser = cmp.Convert<BO.User, User>(userlocationschedule.User);
                    userlocationscheduleBO.user = boUser;
                }
            }

            if (userlocationschedule.Location != null && (userlocationschedule.Location.IsDeleted.HasValue == false || (userlocationschedule.Location.IsDeleted.HasValue == true && userlocationschedule.Location.IsDeleted.Value == false)))
            {
                BO.Location boLocation = new BO.Location();
                using (LocationRepository cmp = new LocationRepository(_context))
                {
                    boLocation = cmp.Convert<BO.Location, Location>(userlocationschedule.Location);
                    userlocationscheduleBO.location = boLocation;
                }
            }

            if (userlocationschedule.Schedule != null && (userlocationschedule.Schedule.IsDeleted.HasValue == false || (userlocationschedule.Schedule.IsDeleted.HasValue == true && userlocationschedule.Schedule.IsDeleted.Value == false)))
            {
                BO.Schedule boSchedule = new BO.Schedule();
                using (ScheduleRepository cmp = new ScheduleRepository(_context))
                {
                    boSchedule = cmp.Convert<BO.Schedule, Schedule>(userlocationschedule.Schedule);
                    userlocationscheduleBO.schedule = boSchedule;
                }
            }

            return (T)(object)userlocationscheduleBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            if (entity is List<BO.UserLocationSchedule>)
            {
                List<BO.UserLocationSchedule> lstuserlocationschedule = (List<BO.UserLocationSchedule>)(object)entity;
                //var result = lstdoctorlocationschedule.Validate(doctorlocationschedule);
                List<MIDAS.GBX.BusinessObjects.BusinessValidation> result = new List<BO.BusinessValidation>();
                return result;
            }
            else
            {
                BO.UserLocationSchedule userlocationschedule = (BO.UserLocationSchedule)(object)entity;
                var result = userlocationschedule.Validate(userlocationschedule);
                return result;
            }
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.UserLocationSchedule userLocationScheduleBO = (BO.UserLocationSchedule)(object)entity;

            UserLocationSchedule userLocationScheduleDB = new UserLocationSchedule();

            int? LocationId = null, UserId = null;

            if (userLocationScheduleBO.ID > 0)
            {
                userLocationScheduleDB = _context.UserLocationSchedules.Where(p => p.id == userLocationScheduleBO.ID).FirstOrDefault();

                if (userLocationScheduleDB == null)
                {
                    return new BO.ErrorObject { ErrorMessage = "User,Location,Schedule record not found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
            }

            if (userLocationScheduleBO.location == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Location object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                LocationId = userLocationScheduleBO.location.ID;
            }

            if (userLocationScheduleBO.user == null)
            {
                return new BO.ErrorObject { ErrorMessage = "User object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                UserId = userLocationScheduleBO.user.ID;
            }

            if (userLocationScheduleBO.schedule == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Schedule object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            bool ExistsLinkage = CheckLinkage(null, LocationId, UserId);

            if (ExistsLinkage == false)
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "The User does not belongs to this location.", ErrorLevel = ErrorLevel.Error };
            }

            #region schedule
            if (userLocationScheduleBO.schedule != null)
            {
                if (userLocationScheduleBO.schedule.ID > 0)
                {
                    Schedule schedule = _context.Schedules.Where(p => p.id == userLocationScheduleBO.schedule.ID).FirstOrDefault<Schedule>();
                    if (schedule != null)
                    {
                        userLocationScheduleDB.Schedule = schedule;
                    }
                    else
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass the valid schedule.", ErrorLevel = ErrorLevel.Error };
                }
            }
            #endregion

            #region Location
            if (userLocationScheduleBO.location != null)
            {
                if (userLocationScheduleBO.location.ID > 0)
                {
                    Location location = _context.Locations.Where(p => p.id == userLocationScheduleBO.location.ID).FirstOrDefault<Location>();
                    if (location != null)
                    {
                        userLocationScheduleDB.Location = location;
                    }
                    else
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid location.", ErrorLevel = ErrorLevel.Error };
                }
            }
            #endregion

            #region user
            if (userLocationScheduleBO.user != null)
            {
                if (userLocationScheduleBO.user.ID > 0)
                {
                    User user = _context.Users.Where(p => p.id == userLocationScheduleBO.user.ID).FirstOrDefault<User>();
                    if (user != null)
                    {
                        userLocationScheduleDB.User = user;
                    }
                    else
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid user.", ErrorLevel = ErrorLevel.Error };
                }
            }

            #endregion

            if (userLocationScheduleBO.ID <= 0)
            {
                _context.UserLocationSchedules.Add(userLocationScheduleDB);
            }
            _context.SaveChanges();

            userLocationScheduleDB = _context.UserLocationSchedules.Include("User").Include("Location").Include("Schedule").Where(p => p.id == userLocationScheduleDB.id).FirstOrDefault<UserLocationSchedule>();

            _context.SaveChanges();

            var res = Convert<BO.UserLocationSchedule, UserLocationSchedule>(userLocationScheduleDB);
            return (object)res;
        }
        #endregion

        public bool CheckLinkage(int? CompanyId, int? LocationId, int? UserId)
        {
            bool result = false;

            if (CompanyId.HasValue == true)
            {

            }
            else if (LocationId.HasValue == true && UserId.HasValue == true)
            {
                result = _context.Locations.Any(p => p.id == LocationId.Value && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                  && p.Company.UserCompanies.Any(p2 => p2.User.id == UserId.Value) == true);
            }

            return result;
        }

        #region Associate Location To User
        public override object AssociateLocationToUser<T>(T entity)
        {
            List<BO.UserLocationSchedule> lstUserLocationScheduleBO = (List<BO.UserLocationSchedule>)(object)entity;

            if (lstUserLocationScheduleBO == null || (lstUserLocationScheduleBO != null && lstUserLocationScheduleBO.Count == 0))
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid info.", ErrorLevel = ErrorLevel.Error };
            }

            List<UserLocationSchedule> lstUserLocationScheduleDB = new List<UserLocationSchedule>();

            List<int> forLocationIds = lstUserLocationScheduleBO.Select(p => p.location.ID).Distinct().ToList<int>();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                foreach (var eachUserLocationScheduleBO in lstUserLocationScheduleBO)
                {
                    int? LocationId = null, UserId = null, ScheduleId = null;

                    if (eachUserLocationScheduleBO.location != null)
                    {
                        LocationId = eachUserLocationScheduleBO.location.ID;
                    }
                    if (eachUserLocationScheduleBO.user != null)
                    {
                        UserId = eachUserLocationScheduleBO.user.ID;
                    }
                    if (eachUserLocationScheduleBO.schedule != null)
                    {
                        ScheduleId = eachUserLocationScheduleBO.schedule.ID;
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

                    if (UserId.HasValue == false || (UserId.HasValue == true && UserId.Value <= 0))
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid User Id.", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        bool ExistsDoctor = _context.Users.Any(p => p.id == UserId.Value
                                                                 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)));

                        if (ExistsDoctor == false)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass existing User Id.", ErrorLevel = ErrorLevel.Error };
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

                    bool ExistsLinkage = CheckLinkage(null, LocationId, UserId);

                    if (ExistsLinkage == false)
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "The User does not belongs to this location.", ErrorLevel = ErrorLevel.Error };
                    }


                    UserLocationSchedule userLocationScheduleDB = _context.UserLocationSchedules.Where(p => p.LocationID == LocationId.Value && p.UserID == UserId.Value
                                                                                                              && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<UserLocationSchedule>();

                    if (userLocationScheduleDB != null)
                    {
                        userLocationScheduleDB.ScheduleID = ScheduleId.Value;
                    }
                    else
                    {
                        userLocationScheduleDB = new UserLocationSchedule();
                        userLocationScheduleDB.LocationID = LocationId.Value;
                        userLocationScheduleDB.UserID = UserId.Value;
                        userLocationScheduleDB.ScheduleID = ScheduleId.Value;

                        _context.UserLocationSchedules.Add(userLocationScheduleDB);
                    }

                    _context.SaveChanges();
                }

                dbContextTransaction.Commit();

                lstUserLocationScheduleDB = _context.UserLocationSchedules.Include("User")
                                                                              .Include("Location")
                                                                              .Include("Schedule")
                                                                              .Where(p => forLocationIds.Contains(p.LocationID)
                                                                                          && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                  .ToList<UserLocationSchedule>();
            }

            List<BO.UserLocationSchedule> res = new List<BO.UserLocationSchedule>();
            lstUserLocationScheduleDB.ForEach(p => res.Add(Convert<BO.UserLocationSchedule, UserLocationSchedule>(p)));

            return (object)res;
        }
        #endregion

        #region Associate User To Locations 
        public override object AssociateUserToLocations<T>(T entity)
        {
            List<BO.UserLocationSchedule> lstUserLocationScheduleBO = (List<BO.UserLocationSchedule>)(object)entity;

            if (lstUserLocationScheduleBO == null || (lstUserLocationScheduleBO != null && lstUserLocationScheduleBO.Count == 0))
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid info.", ErrorLevel = ErrorLevel.Error };
            }

            List<UserLocationSchedule> lstUserLocationScheduleDB = new List<UserLocationSchedule>();

            List<int> forDoctorIds = lstUserLocationScheduleBO.Select(p => p.user.ID).Distinct().ToList<int>();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                foreach (var eachUserLocationScheduleBO in lstUserLocationScheduleBO)
                {
                    int? LocationId = null, UserId = null, ScheduleId = null;

                    if (eachUserLocationScheduleBO.location != null)
                    {
                        LocationId = eachUserLocationScheduleBO.location.ID;
                    }
                    if (eachUserLocationScheduleBO.user != null)
                    {
                        UserId = eachUserLocationScheduleBO.user.ID;
                    }
                    if (eachUserLocationScheduleBO.schedule != null)
                    {
                        ScheduleId = eachUserLocationScheduleBO.schedule.ID;
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

                    if (UserId.HasValue == false || (UserId.HasValue == true && UserId.Value <= 0))
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid User Id.", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        bool ExistsUser = _context.Users.Any(p => p.id == UserId.Value
                                                                 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)));

                        if (ExistsUser == false)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass existing User Id.", ErrorLevel = ErrorLevel.Error };
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

                    bool ExistsLinkage = CheckLinkage(null, LocationId, UserId);

                    if (ExistsLinkage == false)
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "The User does not belongs to this location.", ErrorLevel = ErrorLevel.Error };
                    }

                    UserLocationSchedule userLocationScheduleDB = _context.UserLocationSchedules.Where(p => p.LocationID == LocationId.Value && p.UserID == UserId.Value
                                                                                                              && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<UserLocationSchedule>();

                    if (userLocationScheduleDB != null)
                    {
                        userLocationScheduleDB.ScheduleID = ScheduleId.Value;
                    }
                    else
                    {
                        userLocationScheduleDB = new UserLocationSchedule();
                        userLocationScheduleDB.LocationID = LocationId.Value;
                        userLocationScheduleDB.UserID = UserId.Value;
                        userLocationScheduleDB.ScheduleID = ScheduleId.Value;

                        _context.UserLocationSchedules.Add(userLocationScheduleDB);
                    }

                    _context.SaveChanges();
                }

                dbContextTransaction.Commit();

                lstUserLocationScheduleDB = _context.UserLocationSchedules.Include("User")
                                                                              .Include("Location")
                                                                              .Include("Schedule")
                                                                              .Where(p => forDoctorIds.Contains(p.UserID)
                                                                                          && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                  .ToList<UserLocationSchedule>();
            }

            List<BO.UserLocationSchedule> res = new List<BO.UserLocationSchedule>();
            lstUserLocationScheduleDB.ForEach(p => res.Add(Convert<BO.UserLocationSchedule, UserLocationSchedule>(p)));

            return (object)res;
        }
        #endregion


        public override object DeleteAllAppointmentsandUserLocationSchedule<T>(T entity)
        {
            BO.UserLocationSchedule userlocationscheduleBO = entity as BO.UserLocationSchedule;
            int id = userlocationscheduleBO.ID;
            UserLocationSchedule userlocationscheduleDB = _context.UserLocationSchedules.Include("User").Include("Location").Include("Schedule").Where(p => p.id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<UserLocationSchedule>();
            if (userlocationscheduleDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this UserLocationSchedule.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            DateTime currentDate = DateTime.Now.Date;
            //var acc = _context.AttorneyVisits.Include("CalendarEvent").Where(p => p.AttorneyId == userlocationscheduleDB.UserID && p.CalendarEvent.EventStart >= currentDate && p.LocationId == userlocationscheduleDB.LocationID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList<PatientVisit>();
            //foreach (PatientVisit pv in acc)
            //{
            //    if (pv != null)
            //    {
            //        pv.CalendarEvent.IsDeleted = true;
            //        pv.CalendarEvent.UpdateByUserID = 0;
            //        pv.CalendarEvent.UpdateDate = DateTime.UtcNow;
            //    }

            //    pv.IsDeleted = true;
            //    pv.UpdateByUserID = 0;
            //    pv.UpdateDate = DateTime.UtcNow;

            //    _context.SaveChanges();
            //}

            userlocationscheduleDB.IsDeleted = true;

            _context.Entry(userlocationscheduleDB).State = System.Data.Entity.EntityState.Modified;

            _context.SaveChanges();

            var res = Convert<BO.UserLocationSchedule, UserLocationSchedule>(userlocationscheduleDB);
            return (object)res;

            //else if (acc == null)
            //{
            //    return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            //}

        }

        #region Delete By ID
        public override object Delete(int id)
        {
            UserLocationSchedule userlocationscheduleDB = _context.UserLocationSchedules.Include("User").Include("Location").Include("Schedule").Where(p => p.id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<UserLocationSchedule>();

            if (userlocationscheduleDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this UserLocationSchedule.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            DateTime currentDate = DateTime.Now.Date;
            //var patientVisit = _context.AttorneyVisits.Include("CalendarEvent")
            //                             .Include("Location")
            //                             .Where(p => p.LocationId == userlocationscheduleDB.LocationID && p.AttorneyId == userlocationscheduleDB.UserID && p.CalendarEvent.EventStart >= currentDate
            //                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
            //                             .ToList();

            //if (patientVisit != null)
            //{
            //    if (patientVisit.Count > 0)
            //    {

            //        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Future appointments already schedule, Are you sure you want to cancel all the appointments asscoited to this location", ErrorLevel = ErrorLevel.Error };
            //    }
            //}

            userlocationscheduleDB.IsDeleted = true;

            _context.Entry(userlocationscheduleDB).State = System.Data.Entity.EntityState.Modified;

            _context.SaveChanges();

            var res = Convert<BO.UserLocationSchedule, UserLocationSchedule>(userlocationscheduleDB);
            return (object)res;
        }
        #endregion

        #region Delete By object
        public override object DeleteObj<T>(T entity)
        {
            BO.UserLocationSchedule userlocationscheduleBO = entity as BO.UserLocationSchedule;
            int id = userlocationscheduleBO.ID;
            UserLocationSchedule userlocationscheduleDB = _context.UserLocationSchedules.Include("User").Include("Location").Include("Schedule").Where(p => p.id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<UserLocationSchedule>();

            if (userlocationscheduleDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this UserLocationSchedule.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            DateTime currentDate = DateTime.Now.Date;
            //var patientVisit = _context.AttorneyVisits.Include("CalendarEvent")
            //                             .Include("Location")
            //                             .Where(p => p.LocationId == userlocationscheduleDB.LocationID && p.AttorneyId == userlocationscheduleDB.UserID && p.CalendarEvent.EventStart >= currentDate
            //                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
            //                             .ToList();

            //if (patientVisit != null)
            //{
            //    if (patientVisit.Count > 0)
            //    {

            //        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Future appointments already schedule, Are you sure you want to cancel all the appointments asscoited to this location", ErrorLevel = ErrorLevel.Error };
            //    }
            //}

            userlocationscheduleDB.IsDeleted = true;

            _context.Entry(userlocationscheduleDB).State = System.Data.Entity.EntityState.Modified;

            _context.SaveChanges();

            var res = Convert<BO.UserLocationSchedule, UserLocationSchedule>(userlocationscheduleDB);
            return (object)res;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            BO.UserLocationSchedule acc_ = Convert<BO.UserLocationSchedule, UserLocationSchedule>(_context.UserLocationSchedules.Include("User").Include("Location").Include("Schedule").Where(p => p.id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<UserLocationSchedule>());
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this DoctorLocationSchedule.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }
        #endregion

        #region Get By Filter
        public override object Get()
        {
            List<BO.UserLocationSchedule> lstUserLocationSchedule = new List<BO.UserLocationSchedule>();
            //BO.DoctorLocationSchedule doctorlocationscheduleBO = (BO.DoctorLocationSchedule)(object)entity;
            var acc_ = _context.UserLocationSchedules.Include("User").Include("Location").Include("Schedule").Where(p => (p.IsDeleted == false || p.IsDeleted == null)).ToList<UserLocationSchedule>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                foreach (UserLocationSchedule item in acc_)
                {
                    lstUserLocationSchedule.Add(Convert<BO.UserLocationSchedule, UserLocationSchedule>(item));
                }

                return lstUserLocationSchedule;
            }
        }
        #endregion

        #region Get By Location Id
        public override object GetByLocationId(int id)
        {
            List<BO.UserLocationSchedule> lstUserLocationSchedule = new List<BO.UserLocationSchedule>();

            var acc_ = _context.UserLocationSchedules.Include("User")
                                                       .Include("Location").Include("Location.AddressInfo").Include("Location.ContactInfo")
                                                       .Include("Schedule")
                                                       .Include("User.UserCompanies")
                                                       .Where(p => p.LocationID == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)) && (p.User.IsDeleted.HasValue == false || (p.User.IsDeleted.HasValue == true && p.User.IsDeleted.Value == false))).ToList<UserLocationSchedule>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                foreach (UserLocationSchedule item in acc_)
                {
                    var ac = _context.UserCompanyRoles.Where(p => p.UserID == item.User.id && p.CompanyID == item.Location.CompanyID && p.RoleID == 6 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Count();
                    if (ac != 0)
                    {
                        lstUserLocationSchedule.Add(Convert<BO.UserLocationSchedule, UserLocationSchedule>(item));
                    }                    
                }
                return lstUserLocationSchedule;
            }
        }
        #endregion

        #region Get By User Id
        public override object GetByUserId(int id)
        {
            List<BO.UserLocationSchedule> lstUserLocationSchedule = new List<BO.UserLocationSchedule>();

            var acc_ = _context.UserLocationSchedules.Include("User")
                                                        .Include("Location").Include("Location.AddressInfo").Include("Location.ContactInfo")
                                                        .Include("Schedule")
                                                        .Where(p => p.UserID == id && (p.IsDeleted == false || p.IsDeleted == null) && (p.User.IsDeleted.HasValue == false || (p.User.IsDeleted.HasValue == true && p.User.IsDeleted.Value == false))).ToList<UserLocationSchedule>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                foreach (UserLocationSchedule item in acc_)
                {
                    lstUserLocationSchedule.Add(Convert<BO.UserLocationSchedule, UserLocationSchedule>(item));
                }

                return lstUserLocationSchedule;
            }
        }
        #endregion

        #region Get By User And Company Id
        public override object GetByUserAndCompanyId(int userId, int companyId)
        {
            List<BO.UserLocationSchedule> lstUserLocationSchedule = new List<BO.UserLocationSchedule>();

            var locations = _context.Locations.Where(p => p.CompanyID == companyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p => p.id);

            var acc_ = _context.UserLocationSchedules.Include("User")
                                                        .Include("Location").Include("Location.AddressInfo").Include("Location.ContactInfo")
                                                        .Include("Schedule")
                                                        .Where(p => p.UserID == userId
                                                        && locations.Contains(p.LocationID)
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)) && (p.User.IsDeleted.HasValue == false || (p.User.IsDeleted.HasValue == true && p.User.IsDeleted.Value == false)))
                                                        .ToList<UserLocationSchedule>();

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                foreach (UserLocationSchedule item in acc_)
                {
                    lstUserLocationSchedule.Add(Convert<BO.UserLocationSchedule, UserLocationSchedule>(item));
                }

                return lstUserLocationSchedule;
            }
        }
        #endregion

        #region Get By Location Id and User Id
        public override object Get(int locationId, int userId)
        {
            List<BO.UserLocationSchedule> lstUserLocationSchedule = new List<BO.UserLocationSchedule>();

            var acc_ = _context.UserLocationSchedules.Include("User")
                                                       .Include("Location").Include("Location.AddressInfo").Include("Location.ContactInfo")
                                                       .Include("Schedule").Where(p => (p.LocationID == locationId && p.UserID == userId) && (p.IsDeleted == false || p.IsDeleted == null) && (p.User.IsDeleted.HasValue == false || (p.User.IsDeleted.HasValue == true && p.User.IsDeleted.Value == false))).ToList<UserLocationSchedule>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                foreach (UserLocationSchedule item in acc_)
                {
                    lstUserLocationSchedule.Add(Convert<BO.UserLocationSchedule, UserLocationSchedule>(item));
                }

                return lstUserLocationSchedule;
            }
        }
        #endregion


        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
