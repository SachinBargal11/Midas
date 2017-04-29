using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.DataRepository.EntityRepository.Common;
using MIDAS.GBX.Common;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class UserPersonalSettingRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<UserPersonalSetting> _dbCase;

        public UserPersonalSettingRepository(MIDASGBXEntities context) : base(context)
        {
            _dbCase = context.Set<UserPersonalSetting>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion Convert
        public override T Convert<T, U>(U entity)
        {
            UserPersonalSetting userPersonalSetting = entity as UserPersonalSetting;

            if (userPersonalSetting == null)
                return default(T);

            BO.UserPersonalSetting userPersonalSettingBO = new BO.UserPersonalSetting();

            userPersonalSettingBO.ID = userPersonalSetting.Id;
            userPersonalSettingBO.UserId = userPersonalSetting.UserId;
            userPersonalSettingBO.IsPublic = userPersonalSetting.IsPublic;
            userPersonalSettingBO.IsSearchable = userPersonalSetting.IsSearchable;
            userPersonalSettingBO.IsCalendarPublic = userPersonalSetting.IsCalendarPublic;
            userPersonalSettingBO.IsDeleted = userPersonalSetting.IsDeleted;
            userPersonalSettingBO.CreateByUserID = userPersonalSetting.CreateByUserID;
            userPersonalSettingBO.UpdateByUserID = userPersonalSetting.UpdateByUserID;

            if (userPersonalSetting.User != null)
            {
                BO.User boUser = new BO.User();
                using (UserRepository cmp = new UserRepository(_context))
                {
                    boUser = cmp.Convert<BO.User, User>(userPersonalSetting.User);
                    userPersonalSettingBO.User = boUser;
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
            BO.User userBO = new BO.User();
            AddressInfo addressUserDB = new AddressInfo();
            ContactInfo contactinfoDB = new ContactInfo();

            UserPersonalSetting userPersonalSettingDB = new UserPersonalSetting();
            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                User userDB = new User();

                bool IsEditMode = false;
                IsEditMode = (userPersonalSettingBO != null && userPersonalSettingBO.ID > 0) ? true : false;

                #region User
                if (userBO != null)
                {
                    bool Add_userDB = false;
                    userDB = _context.Users.Where(p => p.id == userBO.ID).FirstOrDefault();

                    if (userDB == null && userBO.ID <= 0)
                    {
                        userDB = new User();
                        Add_userDB = true;
                    }
                    else if (userDB == null && userBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "User Name dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    if (Add_userDB == true)
                    {
                        if (_context.Users.Any(p => p.UserName == userBO.UserName && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))))
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "User Name already exists.", ErrorLevel = ErrorLevel.Error };
                        }
                    }

                    userDB.UserName = Add_userDB == true ? userBO.UserName : userDB.UserName;
                    userDB.FirstName = IsEditMode == true && userBO.FirstName == null ? userDB.FirstName : userBO.FirstName;
                    userDB.MiddleName = IsEditMode == true && userBO.MiddleName == null ? userDB.MiddleName : userBO.MiddleName;
                    userDB.LastName = IsEditMode == true && userBO.LastName == null ? userDB.LastName : userBO.LastName;
                    userDB.Gender = (IsEditMode == true && userBO.Gender <= 0) ? userDB.Gender : System.Convert.ToByte(userBO.Gender);
                    userDB.UserType = Add_userDB == true ? System.Convert.ToByte(userBO.UserType) : userDB.UserType;
                    userDB.UserStatus = System.Convert.ToByte(userBO.Status);
                    userDB.ImageLink = IsEditMode == true && userBO.ImageLink == null ? userDB.ImageLink : userBO.ImageLink;
                    userDB.DateOfBirth = IsEditMode == true && userBO.DateOfBirth == null ? userDB.DateOfBirth : userBO.DateOfBirth;

                    userDB.AddressId = (addressUserDB != null && addressUserDB.id > 0) ? addressUserDB.id : userDB.AddressId;
                    userDB.ContactInfoId = (contactinfoDB != null && contactinfoDB.id > 0) ? contactinfoDB.id : userDB.ContactInfoId;

                    userDB.C2FactAuthEmailEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactEmail"));
                    userDB.C2FactAuthSMSEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactSMS"));

                    userDB.CreateByUserID = Add_userDB == true ? userBO.CreateByUserID : userDB.CreateByUserID;
                    userDB.CreateDate = Add_userDB == true ? DateTime.UtcNow : userDB.CreateDate;

                    userDB.UpdateByUserID = Add_userDB == false ? userBO.UpdateByUserID : userDB.UpdateByUserID;
                    userDB.UpdateDate = Add_userDB == false ? DateTime.UtcNow : userDB.UpdateDate;

                    if (Add_userDB == true)
                    {
                        userDB = _context.Users.Add(userDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid user details.", ErrorLevel = ErrorLevel.Error };
                    }
                    userDB = null;
                }
                #endregion

                #region UserPersonalSetting
                if (userPersonalSettingBO != null)
                {
                    bool Add_userPersonalsetting = false;
                    userPersonalSettingDB = _context.UserPersonalSettings.Where(p => p.Id == userPersonalSettingBO.ID).FirstOrDefault();

                    if (userPersonalSettingDB == null && userPersonalSettingBO.ID <= 0)
                    {
                        userPersonalSettingDB = new UserPersonalSetting();
                        Add_userPersonalsetting = true;
                    }
                    else if (userPersonalSettingDB == null && userPersonalSettingBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    userPersonalSettingDB.UserId = userPersonalSettingBO.UserId;
                    userPersonalSettingDB.IsPublic = userPersonalSettingBO.IsPublic;
                    userPersonalSettingDB.IsSearchable = userPersonalSettingBO.IsSearchable;
                    userPersonalSettingDB.IsCalendarPublic = userPersonalSettingBO.IsCalendarPublic;

                    if (Add_userPersonalsetting == true)
                    {
                        userPersonalSettingDB = _context.UserPersonalSettings.Add(userPersonalSettingDB);
                    }
                    _context.SaveChanges();
                }
                #endregion
                dbContextTransaction.Commit();
                userPersonalSettingDB = _context.UserPersonalSettings.Include("User")
                                                                     .Where(p => p.Id == userPersonalSettingDB.Id).FirstOrDefault<UserPersonalSetting>();
            }

            var res = Convert<BO.UserPersonalSetting, UserPersonalSetting>(userPersonalSettingDB);
            return (object)res;
        }
        #endregion

        #region Delete By ID
        public override object Delete(int id)
        {
            var acc = _context.Cases.Include("PatientEmpInfo")
                                    .Include("PatientEmpInfo.AddressInfo")
                                    .Include("PatientEmpInfo.ContactInfo")
                                    .Include("PatientVisit2")
                                    .Include("CaseCompanyMappings")
                                    .Include("CaseInsuranceMappings")
                                    .Include("CompanyCaseConsentApprovals")
                                    .Include("CaseCompanyConsentDocuments")
                                    .Include("PatientAccidentInfoes")
                                    .Where(p => p.Id == id
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                    .FirstOrDefault<Case>();
            if (acc != null)
            {
                if (acc.PatientVisit2 != null)
                {
                    foreach (var item in acc.PatientVisit2)
                    {
                        if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                        {
                            using (PatientVisit2Repository sr = new PatientVisit2Repository(_context))
                            {
                                sr.DeleteVisit(item.Id);
                            }
                        }
                    }
                }

                if (acc.CaseInsuranceMappings != null)
                {
                    foreach (var item in acc.CaseInsuranceMappings)
                    {
                        if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                        {
                            using (CaseInsuranceMappingRepository sr = new CaseInsuranceMappingRepository(_context))
                            {
                                sr.Delete(item.Id);
                            }
                        }
                    }
                }

                if (acc.CaseCompanyMappings != null)
                {
                    foreach (var item in acc.CaseCompanyMappings)
                    {
                        if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                        {
                            using (CaseCompanyMappingRepository sr = new CaseCompanyMappingRepository(_context))
                            {
                                sr.Delete(item.Id);
                            }
                        }
                    }
                }

                if (acc.CompanyCaseConsentApprovals != null)
                {
                    foreach (var item in acc.CompanyCaseConsentApprovals)
                    {
                        if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                        {
                            using (CompanyCaseConsentApprovalRepository sr = new CompanyCaseConsentApprovalRepository(_context))
                            {
                                int DocumentId = _context.CaseCompanyConsentDocuments.Where(p => p.CaseId == item.CaseId && p.CompanyId == item.CompanyId)
                                                         .Select(p => p.MidasDocumentId)
                                                         .FirstOrDefault();
                                sr.Delete(item.CaseId, DocumentId, item.CompanyId);
                            }
                        }
                    }
                }

                if (acc.PatientAccidentInfoes != null)
                {
                    foreach (var item in acc.PatientAccidentInfoes)
                    {
                        if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                        {
                            using (PatientAccidentInfoRepository sr = new PatientAccidentInfoRepository(_context))
                            {
                                sr.Delete(item.Id);
                            }
                        }
                    }
                }

                acc.IsDeleted = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.Case, Case>(acc);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
