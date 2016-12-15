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
    internal class LocationRoomRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<LocationRoom> _dbSet;

        #region Constructor
        public LocationRoomRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<LocationRoom>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            LocationRoom locationroom = entity as LocationRoom;

            if (locationroom == null)
                return default(T);

            BO.LocationRoom locationroomBO = new BO.LocationRoom();
            locationroomBO.ID = locationroom.id;
            locationroomBO.name = locationroom.Name;

            if (locationroom.IsDeleted.HasValue)
                locationroomBO.IsDeleted = locationroom.IsDeleted.Value;
            if (locationroom.UpdateByUserID.HasValue)
                locationroomBO.UpdateByUserID = locationroom.UpdateByUserID.Value;

            using (LocationRepository sr = new LocationRepository(_context))
            {
                locationroomBO.location = sr.Convert<BO.Location, Location>(locationroom.Location);
            }

            using (RoomRepository sr = new RoomRepository(_context))
            {
                locationroomBO.room = sr.Convert<BO.Room, Room>(locationroom.Room);
            }

            return (T)(object)locationroomBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.LocationRoom locationroom = (BO.LocationRoom)(object)entity;
            var result = locationroom.Validate(locationroom);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.LocationRoom locationRoomBO = (BO.LocationRoom)(object)entity;

            LocationRoom locationRoomDB = new LocationRoom();

            #region LocationRoom
            locationRoomDB.id = locationRoomBO.ID;
            locationRoomDB.Name = locationRoomBO.name;
            locationRoomDB.IsDeleted = locationRoomBO.IsDeleted.HasValue ? locationRoomBO.IsDeleted : false;
            #endregion

            #region Location
            if (locationRoomBO.location != null)
                if (locationRoomBO.location.ID > 0)
                {
                    Location location = _context.Locations.Where(p => p.id == locationRoomBO.location.ID).FirstOrDefault<Location>();
                    if (location != null)
                    {
                        locationRoomDB.Location = location;
                    }
                    else
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid location detail.", ErrorLevel = ErrorLevel.Error };
                }
            #endregion
            #region Room
            if (locationRoomBO.room != null)
                if (locationRoomBO.room.ID > 0)
                {
                    Room room = _context.Rooms.Where(p => p.id == locationRoomBO.room.ID).FirstOrDefault<Room>();
                    if (room != null)
                    {
                        locationRoomDB.Room = room;
                    }
                    else
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid room detail.", ErrorLevel = ErrorLevel.Error };
                }
            #endregion

            if (locationRoomDB.id > 0)
            {
                //For Update Record

                //Find LocationRoom By ID
                LocationRoom locationroom = _context.LocationRooms.Where(p => p.id == locationRoomDB.id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<LocationRoom>();

                if (locationroom != null)
                {
                    #region Location
                    locationroom.id = locationRoomBO.ID;
                    locationroom.Name = locationRoomBO.name == null ? locationroom.Name : locationRoomBO.name;
                    locationroom.IsDeleted = locationRoomBO.IsDeleted == null ? locationroom.IsDeleted : locationroom.IsDeleted;
                    locationroom.UpdateDate = locationRoomBO.UpdateDate;
                    locationroom.UpdateByUserID = locationRoomBO.UpdateByUserID;
                    #endregion
                    _context.Entry(locationroom).State = System.Data.Entity.EntityState.Modified;
                }
                else
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid LocationRoom details.", ErrorLevel = ErrorLevel.Error };

            }
            else
            {
                locationRoomDB.CreateDate = locationRoomBO.CreateDate;
                locationRoomDB.CreateByUserID = locationRoomBO.CreateByUserID;
                _dbSet.Add(locationRoomDB);
            }
            _context.SaveChanges();

            var res = Convert<BO.LocationRoom, LocationRoom>(locationRoomDB);
            return (object)res;
        }
        #endregion

        #region Delete
        public override object Delete<T>(T entity)
        {
            BO.LocationRoom LocationRoomBO = entity as BO.LocationRoom;

            LocationRoom LocationRoomDB = new LocationRoom();
            LocationRoomDB.id = LocationRoomBO.ID;
            _dbSet.Remove(_context.LocationRooms.Single<LocationRoom>(p => p.id == LocationRoomBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return LocationRoomDB;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            BO.LocationRoom acc_ = Convert<BO.LocationRoom, LocationRoom>(_context.LocationRooms.Include("Location").Include("Room").Where(p => p.id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<LocationRoom>());
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this LocationRoom.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }
        #endregion

        #region Get By Filter
        public override object Get<T>(T entity)
        {
            List<BO.LocationRoom> lstLocationRoom = new List<BO.LocationRoom>();
            BO.LocationRoom scheduleBO = (BO.LocationRoom)(object)entity;

            var acc_ = _context.LocationRooms.Include("Location").Include("Room").Where(p => (p.IsDeleted == false || p.IsDeleted == null)).ToList<LocationRoom>();
            if (acc_ == null || acc_.Count < 1)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            foreach (LocationRoom item in acc_)
            {
                lstLocationRoom.Add(Convert<BO.LocationRoom, LocationRoom>(item));
            }

            return lstLocationRoom;
        }
        #endregion
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
