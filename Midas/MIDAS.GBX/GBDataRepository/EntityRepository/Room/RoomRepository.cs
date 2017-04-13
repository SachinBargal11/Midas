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
    internal class RoomRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<Room> _dbSet;

        #region Constructor
        public RoomRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<Room>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Room room = entity as Room;

            if (room == null)
                return default(T);
            
            BO.Room roomBO = new BO.Room();
            roomBO.ID = room.id;
            roomBO.name = room.Name;
            roomBO.contactersonName = room.ContactPersonName;
            roomBO.phone = room.Phone;

            if (room.IsDeleted.HasValue)
                roomBO.IsDeleted = room.IsDeleted.Value;
            if (room.UpdateByUserID.HasValue)
                roomBO.UpdateByUserID = room.UpdateByUserID.Value;

            if (room.RoomTest != null)
            {
                BO.RoomTest roomtestBO = new BO.RoomTest();
                roomtestBO.name = room.RoomTest.Name;
                roomtestBO.ID = room.RoomTest.id;

                if (room.RoomTest.IsDeleted.HasValue)
                    roomtestBO.IsDeleted = room.RoomTest.IsDeleted.Value;
                if (room.RoomTest.UpdateByUserID.HasValue)
                    roomtestBO.UpdateByUserID = room.RoomTest.UpdateByUserID.Value;
                roomBO.roomTest = roomtestBO;
            }

            BO.Location boLocation = new BO.Location();
            using (LocationRepository sr = new LocationRepository(_context))
            {
                boLocation = sr.Convert<BO.Location, Location>(room.Location);
                roomBO.location = boLocation;
            }
            BO.Schedule boSchedule = new BO.Schedule();
            using (ScheduleRepository cmp = new ScheduleRepository(_context))
            {
                boSchedule = cmp.Convert<BO.Schedule, Schedule>(room.Schedule);
                // cmp.Save(boSchedule);
                roomBO.schedule = boSchedule;
            }
            return (T)(object)roomBO;
        }
        #endregion

        #region Entity Conversion
        public override T ObjectConvert<T, U>(U entity)
        {
            Room room = entity as Room;

            if (room == null)
                return default(T);

            BO.Room roomBO = new BO.Room();
            roomBO.ID = room.id;
            roomBO.name = room.Name;
            roomBO.contactersonName = room.ContactPersonName;
            roomBO.phone = room.Phone;

            if (room.IsDeleted.HasValue)
                roomBO.IsDeleted = room.IsDeleted.Value;
            if (room.UpdateByUserID.HasValue)
                roomBO.UpdateByUserID = room.UpdateByUserID.Value;

            return (T)(object)roomBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Room room = (BO.Room)(object)entity;
            var result = room.Validate(room);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.Room roomBO = (BO.Room)(object)entity;

            Room roomDB = new Room();
            RoomTest roomtestDB = new RoomTest();

            #region room
            roomDB.id = roomBO.ID;
            roomDB.Name = roomBO.name;
            roomDB.ContactPersonName = roomBO.contactersonName;
            roomDB.Phone = roomBO.phone;
            roomDB.IsDeleted = roomBO.IsDeleted.HasValue ? roomBO.IsDeleted : false;
            #endregion

            #region Room Test
            roomtestDB.id = roomBO.roomTest.ID;
            //roomtestDB.Name = roomBO.roomTest.name;
            //roomtestDB.IsDeleted = roomBO.roomTest.IsDeleted.HasValue ? roomBO.roomTest.IsDeleted : false;
            #endregion

            if (roomBO.roomTest.ID > 0)
            {
                RoomTest roomtest = _context.RoomTests.Where(p => p.id == roomBO.roomTest.ID && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<RoomTest>();
                if (roomtest != null)
                {
                    _context.Entry(roomtest).State = System.Data.Entity.EntityState.Modified;
                    roomtestDB = roomtest;
                }
                else
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid roomtest detail.", ErrorLevel = ErrorLevel.Error };
            }
            if (roomBO.location.ID > 0)
            {
                Location location = _context.Locations.Where(p => p.id == roomBO.location.ID && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<Location>();
                if (location != null)
                {
                    _context.Entry(location).State = System.Data.Entity.EntityState.Modified;
                    roomDB.Location = location;
                }
                else
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid location detail.", ErrorLevel = ErrorLevel.Error };
            }
            roomDB.RoomTest = roomtestDB;

            if (roomBO.schedule != null)
            {
                #region Schedule
                if (roomBO.schedule != null)
                    if (roomBO.schedule.ID > 0)
                    {
                        Schedule schedule = _context.Schedules.Where(p => p.id == roomBO.schedule.ID).FirstOrDefault<Schedule>();
                        if (schedule != null)
                        {
                            roomDB.Schedule = schedule;
                        }
                        else
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Schedule.", ErrorLevel = ErrorLevel.Error };
                    }
                #endregion
            }
            else
            {
                //Default schedule
                Schedule defaultschedule = _context.Schedules.Where(p => p.IsDefault == true).FirstOrDefault<Schedule>();
                if (defaultschedule != null)
                {
                    roomDB.Schedule = defaultschedule;
                }
                else
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please set default schedule in database.", ErrorLevel = ErrorLevel.Error };
            }


            if (roomDB.id > 0)
            {
                if (_context.Rooms.Any(o => o.Name == roomBO.name && o.LocationID == roomBO.location.ID  && o.id!= roomDB.id && (o.IsDeleted == false || o.IsDeleted == null)))
                {
                    return new BO.ErrorObject { ErrorMessage = "Room already exists for selected location and test.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
                //For Update Record

                //Find Room By ID
                Room room = _context.Rooms.Where(p => p.id == roomDB.id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<Room>();

                if (room != null)
                {
                    #region Location
                    room.id = roomBO.ID;
                    room.Name = roomBO.name == null ? room.Name : roomBO.name;
                    room.ContactPersonName = roomBO.contactersonName == null ? room.ContactPersonName : roomBO.contactersonName;
                    room.Phone = roomBO.phone == null ? room.Phone : roomBO.phone;
                    room.IsDeleted = roomBO.IsDeleted.HasValue ? roomBO.IsDeleted : room.IsDeleted;
                    room.UpdateDate = roomBO.UpdateDate;
                    room.UpdateByUserID = roomBO.UpdateByUserID;
                    #endregion

                    #region RoomTest
                    if (roomBO.roomTest != null)
                        if (roomBO.roomTest.ID > 0)
                        {
                            RoomTest roomtest = _context.RoomTests.Where(p => p.id == roomBO.roomTest.ID).FirstOrDefault<RoomTest>();
                            if (roomtest != null)
                            {
                                room.RoomTest = roomtest;
                            }
                            else
                                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid roomtest detail.", ErrorLevel = ErrorLevel.Error };
                        }
                    #endregion

                    if (roomBO.location.ID > 0)
                    {
                        Location location = _context.Locations.Where(p => p.id == roomBO.location.ID && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<Location>();
                        if (location != null)
                        {
                            _context.Entry(location).State = System.Data.Entity.EntityState.Modified;
                            room.Location = location;
                        }
                        else
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid location detail.", ErrorLevel = ErrorLevel.Error };
                    }

                    #region Schedule
                    if (roomBO.schedule != null)
                        if (roomBO.schedule.ID > 0)
                        {
                            Schedule schedule = _context.Schedules.Where(p => p.id == roomBO.schedule.ID).FirstOrDefault<Schedule>();
                            if (schedule != null)
                            {
                                room.Schedule = schedule;
                            }
                            else
                                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Schedule.", ErrorLevel = ErrorLevel.Error };
                        }
                    #endregion

                    _context.Entry(room).State = System.Data.Entity.EntityState.Modified;
                }
                else
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid room details.", ErrorLevel = ErrorLevel.Error };

            }
            else
            {
                if (_context.Rooms.Any(o => o.Name == roomBO.name && o.LocationID == roomBO.location.ID && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                {
                    return new BO.ErrorObject { ErrorMessage = "Room already exists for selected location and test.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                roomDB.CreateDate = roomBO.CreateDate;
                roomDB.CreateByUserID = roomBO.CreateByUserID;
                _dbSet.Add(roomDB);
            }
            _context.SaveChanges();

            var res = Convert<BO.Room, Room>(roomDB);
            return (object)res;
        }
        #endregion

        #region Delete
        public override object Delete<T>(T entity)
        {
            BO.Room roomBO = entity as BO.Room;

            Room roomDB = new Room();
            roomDB.id = roomBO.ID;
            _dbSet.Remove(_context.Rooms.Single<Room>(p => p.id == roomBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return roomDB;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            BO.Room acc_ = Convert<BO.Room, Room>(_context.Rooms.Include("RoomTest").Include("Location").Include("Schedule").Where(p => p.id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<Room>());
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this room.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }
        #endregion

        #region Get By Filter
        public override object Get<T>(T entity)
        {
            List<BO.Room> lstRoom = new List<BO.Room>();
            BO.Room roomBO = (BO.Room)(object)entity;

            if (roomBO != null)
            {
                if (roomBO.roomTest != null)
                {
                    if (roomBO.roomTest.ID > 0)
                    {
                        var acc_ = _context.Rooms.Include("RoomTest").Include("Location").Include("Schedule").Where(p => (p.IsDeleted == false || p.IsDeleted == null) && p.RoomTestID == roomBO.roomTest.ID && (p.Location.IsDeleted == false || p.Location.IsDeleted == null)).ToList<Room>();
                        if (acc_ == null || acc_.Count < 1)
                        {
                            return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                        }
                        foreach (Room item in acc_)
                        {
                            lstRoom.Add(Convert<BO.Room, Room>(item));
                        }
                    }
                }
                else if (roomBO.location != null)
                {
                    if (roomBO.location.ID > 0)
                    {
                        var acc_ = _context.Rooms.Include("RoomTest").Include("Location").Where(p => (p.IsDeleted == false || p.IsDeleted == null) && p.LocationID == roomBO.location.ID && (p.Location.IsDeleted == false || p.Location.IsDeleted == null)).ToList<Room>();
                        if (acc_ == null || acc_.Count < 1)
                        {
                            return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                        }
                        foreach (Room item in acc_)
                        {
                            lstRoom.Add(Convert<BO.Room, Room>(item));
                        }
                    }
                }
            }
            else
            {
                var acc_ = _context.Rooms.Include("RoomTest").Include("Location").Where(p => (p.IsDeleted == false || p.IsDeleted == null) && (p.Location.IsDeleted == false || p.Location.IsDeleted == null)).ToList<Room>();
                if (acc_ == null || acc_.Count < 1)
                {
                    return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
                foreach (Room item in acc_)
                {
                    lstRoom.Add(Convert<BO.Room, Room>(item));
                }
            }

            return lstRoom;
        }
        #endregion

        #region Get By LocationId
        public override object GetByLocationId(int LocationId)
        {
            var acc_ = _context.Rooms.Where(p => p.LocationID == LocationId
                                             && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList();

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Specialty.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.Room> RoomBO = new List<BO.Room>();

            acc_.ForEach(p => RoomBO.Add(Convert<BO.Room, Room>(p)));

            return (object)RoomBO;
        }
        #endregion

        #region GetByRoom
        public override object GetByRoomInAllApp(int roomTestId)
        {
           
            var acc_ = _context.Rooms.Include("RoomTest").Include("Location").Include("Location.Company").Where(p => p.RoomTest.id == roomTestId
                                               && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this room Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.Room> doctorBO = new List<BO.Room>();

            foreach (Room item in acc_)
            {
                doctorBO.Add(Convert<BO.Room, Room>(item));
            }
            return (object)doctorBO;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
