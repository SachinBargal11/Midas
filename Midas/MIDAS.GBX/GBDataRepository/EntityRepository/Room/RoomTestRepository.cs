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
    internal class RoomTestRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<RoomTest> _dbSet;

        #region Constructor
        public RoomTestRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<RoomTest>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            RoomTest roomtest = entity as RoomTest;

            if (roomtest == null)
                return default(T);

            BO.RoomTest roomtestBO = new BO.RoomTest();
            roomtestBO.name = roomtest.Name;
            roomtestBO.ID = roomtest.id;
            roomtestBO.ColorCode = roomtest.ColorCode;

            if (roomtest.IsDeleted.HasValue)
                roomtestBO.IsDeleted = roomtest.IsDeleted.Value;
            if (roomtest.UpdateByUserID.HasValue)
                roomtestBO.UpdateByUserID = roomtest.UpdateByUserID.Value;

            List<BO.Room> lstRooms = new List<BO.Room>();
            foreach (var item in roomtest.Rooms)
            {
                using (RoomRepository sr = new RoomRepository(_context))
                {
                    lstRooms.Add(sr.ObjectConvert<BO.Room, Room>(item));
                }
            }
            roomtestBO.rooms= lstRooms;

            return (T)(object)roomtestBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.RoomTest roomtest = (BO.RoomTest)(object)entity;
            var result = roomtest.Validate(roomtest);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.RoomTest roomtestBO = (BO.RoomTest)(object)entity;

            RoomTest roomtestDB = new RoomTest();

            #region RoomTest
            roomtestDB.id = roomtestBO.ID;
            roomtestDB.Name = roomtestBO.name;
            roomtestDB.ColorCode = roomtestBO.ColorCode;
            roomtestDB.IsDeleted = roomtestBO.IsDeleted.HasValue ? roomtestBO.IsDeleted : false;
            #endregion
            if (roomtestDB.id > 0)
            {
                //For Update Record

                //Find Schedule By ID
                RoomTest roomtest = _context.RoomTests.Where(p => p.id == roomtestDB.id && (p.IsDeleted==false || p.IsDeleted==null)).FirstOrDefault<RoomTest>();

                if (roomtest != null)
                {
                    #region Location
                    roomtest.id = roomtestBO.ID;
                    roomtest.Name = roomtestBO.name == null ? roomtest.Name : roomtestBO.name;
                    roomtest.ColorCode = roomtestBO.ColorCode;
                    roomtest.IsDeleted = roomtestBO.IsDeleted == null ? roomtestBO.IsDeleted : roomtest.IsDeleted;
                    roomtest.UpdateDate = roomtestBO.UpdateDate;
                    roomtest.UpdateByUserID = roomtestBO.UpdateByUserID;
                    #endregion
                    _context.Entry(roomtest).State = System.Data.Entity.EntityState.Modified;
                }
                else
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid roomtest details.", ErrorLevel = ErrorLevel.Error };

            }
            else
            {
                roomtestDB.CreateDate = roomtestBO.CreateDate;
                roomtestDB.CreateByUserID = roomtestBO.CreateByUserID;
                _dbSet.Add(roomtestDB);
            }
            _context.SaveChanges();

            var res = Convert<BO.RoomTest, RoomTest>(roomtestDB);
            return (object)res;
        }
        #endregion

        #region Delete
        public override object Delete<T>(T entity)
        {
            BO.RoomTest roomtestBO = entity as BO.RoomTest;

            RoomTest roomtestDB = new RoomTest();
            roomtestDB.id = roomtestBO.ID;
            _dbSet.Remove(_context.RoomTests.Single<RoomTest>(p => p.id == roomtestBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return roomtestDB;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            BO.RoomTest acc_ = Convert<BO.RoomTest, RoomTest>(_context.RoomTests.Include("Rooms").Where(p => p.id == id && (p.IsDeleted == false || p.IsDeleted==null)).FirstOrDefault<RoomTest>());
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this roomtest.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }
        #endregion

        #region Get By Filter
        public override object Get<T>(T entity)
        {
            List<BO.RoomTest> lstRoomTest = new List<BO.RoomTest>();
            BO.RoomTest scheduleBO = (BO.RoomTest)(object)entity;

            var acc_ = _context.RoomTests.Where(p => (p.IsDeleted == false || p.IsDeleted == null)).ToList<RoomTest>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            foreach (RoomTest item in acc_)
            {
                lstRoomTest.Add(Convert<BO.RoomTest, RoomTest>(item));
            }

            return lstRoomTest;
        }
        #endregion

        #region Get By RoomId
        public override object GetByRoomId(int RoomId)
        {
            var acc_ = _context.RoomTests.Where(p => p.Rooms.Any(p2 => p2.id == RoomId
                                                                   && (p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false))) == true
                                                 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList();

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Specialty.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.RoomTest> RoomTestBO = new List<BO.RoomTest>();

            acc_.ForEach(p => RoomTestBO.Add(Convert<BO.RoomTest, RoomTest>(p)));

            return (object)RoomTestBO;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
