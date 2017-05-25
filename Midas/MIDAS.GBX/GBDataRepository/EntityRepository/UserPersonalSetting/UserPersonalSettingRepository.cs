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
    internal class UserPersonalSettingRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<UserPersonalSetting> _dbUserPersonalSetting;

        #region Constructor
        public UserPersonalSettingRepository(MIDASGBXEntities context) : base(context)
        {
            _dbUserPersonalSetting = context.Set<UserPersonalSetting>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion Convert
        public override T Convert<T, U>(U entity)
        {
            UserPersonalSetting userPersonalSetting = entity as UserPersonalSetting;

            if (userPersonalSetting == null)
                return default(T);

            BO.UserPersonalSetting userPersonalSettingBO = new BO.UserPersonalSetting();

            userPersonalSettingBO.ID = userPersonalSetting.Id;
            userPersonalSettingBO.UserId = userPersonalSetting.UserId;
            userPersonalSettingBO.CompanyId = userPersonalSetting.CompanyId;
            userPersonalSettingBO.IsPublic = userPersonalSetting.IsPublic;
            userPersonalSettingBO.IsSearchable = userPersonalSetting.IsSearchable;
            userPersonalSettingBO.IsCalendarPublic = userPersonalSetting.IsCalendarPublic;
            userPersonalSettingBO.SlotDuration = userPersonalSetting.SlotDuration;
            userPersonalSettingBO.IsDeleted = userPersonalSetting.IsDeleted;
            userPersonalSettingBO.CreateByUserID = userPersonalSetting.CreateByUserID;
            userPersonalSettingBO.UpdateByUserID = userPersonalSetting.UpdateByUserID;

            if (userPersonalSetting.User != null)
            {
                if (userPersonalSetting.User.IsDeleted.HasValue == false || (userPersonalSetting.User.IsDeleted.HasValue == true && userPersonalSetting.User.IsDeleted.Value == false))
                {
                    BO.User boUser = new BO.User();
                    using (UserRepository cmp = new UserRepository(_context))
                    {
                        boUser = cmp.Convert<BO.User, User>(userPersonalSetting.User);
                        userPersonalSettingBO.User = boUser;
                    }
                }
            }                


            return (T)(object)userPersonalSettingBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.UserPersonalSetting userPersonalSetting = (BO.UserPersonalSetting)(object)entity;
            var result = userPersonalSetting.Validate(userPersonalSetting);
            return result;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.UserPersonalSettings.Include("User")
                                                   .Where(p => p.Id == id
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .FirstOrDefault<UserPersonalSetting>();

            BO.UserPersonalSetting acc_ = Convert<BO.UserPersonalSetting, UserPersonalSetting>(acc);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.UserPersonalSetting userPersonalSettingBO = (BO.UserPersonalSetting)(object)entity;
            UserPersonalSetting userPersonalSettingDB = new UserPersonalSetting();


            if (userPersonalSettingBO != null)
            {
                bool Add_userPersonalsetting = false;
                userPersonalSettingDB = _context.UserPersonalSettings.Where(p => p.UserId == userPersonalSettingBO.UserId && p.CompanyId == userPersonalSettingBO.CompanyId
                                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                      .FirstOrDefault();

                if (userPersonalSettingDB == null)
                {
                    userPersonalSettingDB = new UserPersonalSetting();
                    Add_userPersonalsetting = true;
                }

                userPersonalSettingDB.UserId = userPersonalSettingBO.UserId;
                userPersonalSettingDB.CompanyId = userPersonalSettingBO.CompanyId;
                userPersonalSettingDB.IsPublic = userPersonalSettingBO.IsPublic;
                userPersonalSettingDB.IsSearchable = userPersonalSettingBO.IsSearchable;
                userPersonalSettingDB.IsCalendarPublic = userPersonalSettingBO.IsCalendarPublic;
                userPersonalSettingDB.SlotDuration = userPersonalSettingBO.SlotDuration;

                if (Add_userPersonalsetting == true)
                {
                    userPersonalSettingDB = _context.UserPersonalSettings.Add(userPersonalSettingDB);
                }
                _context.SaveChanges();
            }

            userPersonalSettingDB = _context.UserPersonalSettings.Include("User")
                                                                 .Include("Company")
                                                                 .Where(p => p.Id == userPersonalSettingDB.Id).FirstOrDefault<UserPersonalSetting>();


            var res = Convert<BO.UserPersonalSetting, UserPersonalSetting>(userPersonalSettingDB);
            return (object)res;
        }
        #endregion

        #region getByuserandcompanyId
        public override Object GetByUserAndCompanyId(int userId, int companyId)
        {
            var acc = _context.UserPersonalSettings.Include("User").Include("Company").Where(p => p.UserId == userId && p.CompanyId == companyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            BO.UserPersonalSetting acc_ = Convert<BO.UserPersonalSetting, UserPersonalSetting>(acc);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region Delete By ID
        public override object Delete(int id)
        {
            var acc = _context.UserPersonalSettings.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<UserPersonalSetting>();
            if (acc != null)
            {
                acc.IsDeleted = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.UserPersonalSetting, UserPersonalSetting>(acc);
            return (object)res;
        }
        #endregion


        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
