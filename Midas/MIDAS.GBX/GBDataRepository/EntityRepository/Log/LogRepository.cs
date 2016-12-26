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
using System.Web;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class LogRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<Log> _dbSet;

        #region Constructor
        public LogRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<Log>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Log log = entity as Log;

            if (log == null)
                return default(T);

            BO.Log logBO = new BO.Log();
            logBO.ID = log.id;
            logBO.requestId = log.RequestID;
            logBO.responseId = log.ResponseID;
            logBO.ipaddress = log.IpAddress;
            logBO.country = log.Country;
            logBO.machinename = log.MachineName;
            logBO.userId = log.UserID;
            logBO.requestUrl = log.RequestURL;


            if (log.IsDeleted.HasValue)
                logBO.IsDeleted = log.IsDeleted.Value;
            if (log.UpdateByUserID.HasValue)
                logBO.UpdateByUserID = log.UpdateByUserID.Value;

            return (T)(object)logBO;
        }
        #endregion


        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Log room = (BO.Log)(object)entity;
            var result = room.Validate(room);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.Log logBO = (BO.Log)(object)entity;

            Log logDB = new Log();

            #region Log
            logDB.id = logBO.ID;
            logDB.RequestID = logBO.requestId;
            logDB.ResponseID = logBO.responseId;
            logDB.IpAddress = logBO.ipaddress;
            logDB.Country = logBO.country;
            logDB.MachineName = logBO.machinename;
            logDB.UserID = logBO.userId;
            logDB.RequestURL = logBO.requestUrl;
            logDB.IsDeleted = logBO.IsDeleted.HasValue ? logBO.IsDeleted : false;
            #endregion

            if (logDB.id > 0)
            {
                //For Update Record

                Log log = _context.Logs.Where(p => p.id == logDB.id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<Log>();

                if (log != null)
                {
                    #region Log
                    log.id = logBO.ID;
                    log.RequestID = logBO.requestId == null ? log.RequestID : logBO.requestId;
                    log.ResponseID = logBO.responseId == null ? log.ResponseID : logBO.responseId;
                    log.IpAddress = logBO.ipaddress == null ? log.IpAddress : logBO.ipaddress;
                    log.Country = logBO.country == null ? log.Country : logBO.country;
                    log.MachineName = logBO.machinename == null ? log.MachineName : logBO.machinename;
                    log.UserID = logBO.userId == null ? log.UserID : logBO.userId;
                    log.RequestURL = logBO.requestUrl == null ? log.RequestURL : logBO.requestUrl;
                    log.IsDeleted = logBO.IsDeleted == null ? logBO.IsDeleted : log.IsDeleted;
                    log.UpdateDate = logBO.UpdateDate;
                    log.UpdateByUserID = logBO.UpdateByUserID;
                    #endregion

                    _context.Entry(log).State = System.Data.Entity.EntityState.Modified;
                }
                else
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid room details.", ErrorLevel = ErrorLevel.Error };

            }
            else
            {
                if (_context.Logs.Any(o => o.IpAddress == logBO.ipaddress))
                {
                    return new BO.ErrorObject { ErrorMessage = "Logs already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                logDB.CreateDate = logBO.CreateDate;
                logDB.CreateByUserID = logBO.CreateByUserID;
                _dbSet.Add(logDB);
            }
            _context.SaveChanges();

            var res = Convert<BO.Log, Log>(logDB);
            return (T)(object)res;
        }
        #endregion

        #region Delete
        public override object Delete<T>(T entity)
        {
            BO.Log logBO = entity as BO.Log;

            Log logDB = new Log();
            logDB.id = logBO.ID;
            _dbSet.Remove(_context.Logs.Single<Log>(p => p.id == logBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return logDB;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            BO.Log acc_ = Convert<BO.Log, Log>(_context.Logs.Where(p => p.id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<Log>());
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this room.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
