#region Imports
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Newtonsoft.Json.Linq;
using MIDAS.GBX.EntityRepository;
using MIDAS.GBX.DataRepository.Model;
using BO = MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.EN;
using MIDAS.GBX.Common;

#endregion

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class PreferredMedicalProviderRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<PreferredMedicalProvider> _dbSet;
        private DbSet<Invitation> _dbInvitation;

        #region Constructor
        public PreferredMedicalProviderRepository(MIDASGBXEntities context) : base(context)
        {
            _dbSet = context.Set<PreferredMedicalProvider>();
            _dbInvitation = context.Set<Invitation>();
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {

            PreferredMedicalProvider preferredMedicalProvider = entity as PreferredMedicalProvider;
            if (preferredMedicalProvider == null)
                return default(T);

            BO.PreferredMedicalProvider boPreferredMedicalProvider = new BO.PreferredMedicalProvider();

            boPreferredMedicalProvider.ID = preferredMedicalProvider.Id;
            boPreferredMedicalProvider.PrefMedProviderId = preferredMedicalProvider.PrefMedProviderId;
            boPreferredMedicalProvider.CompanyId = preferredMedicalProvider.CompanyId;
            boPreferredMedicalProvider.IsCreated = preferredMedicalProvider.IsCreated;
            boPreferredMedicalProvider.IsDeleted = preferredMedicalProvider.IsDeleted;
            boPreferredMedicalProvider.CreateByUserID = preferredMedicalProvider.CreateByUserID;
            boPreferredMedicalProvider.UpdateByUserID = preferredMedicalProvider.UpdateByUserID;

            if (preferredMedicalProvider.Company != null)
            {
                BO.Company Company = new BO.Company();

                if (preferredMedicalProvider.Company.IsDeleted.HasValue == false
                    || (preferredMedicalProvider.Company.IsDeleted.HasValue == true && preferredMedicalProvider.Company.IsDeleted.Value == false))
                {
                    using (CompanyRepository sr = new CompanyRepository(_context))
                    {
                        Company = sr.Convert<BO.Company, Company>(preferredMedicalProvider.Company);
                        Company.Locations = null;
                    }
                }

                boPreferredMedicalProvider.Company = Company;
            }

            if (preferredMedicalProvider.Company1 != null)
            {
                BO.Company Company = new BO.Company();

                if (preferredMedicalProvider.Company1.IsDeleted.HasValue == false
                    || (preferredMedicalProvider.Company1.IsDeleted.HasValue == true && preferredMedicalProvider.Company1.IsDeleted.Value == false))
                {
                    using (CompanyRepository sr = new CompanyRepository(_context))
                    {
                        Company = sr.Convert<BO.Company, Company>(preferredMedicalProvider.Company1);
                        Company.Locations = null;
                    }
                }

                boPreferredMedicalProvider.PrefMedProvider = Company;
            }

            return (T)(object)boPreferredMedicalProvider;
        }
        #endregion

        #region New Conversion
        public T ConvertPreferredMedicalCompany<T, U>(U entity)
        {
            Company company = entity as Company;
            if (company == null)
                return default(T);

            BO.PreferredMedicalCompany PreferredMedicalCompanyBO = new BO.PreferredMedicalCompany();

            PreferredMedicalCompanyBO.ID = company.id;
            PreferredMedicalCompanyBO.Name = company.Name;
            PreferredMedicalCompanyBO.CompanyStatusType = company.CompanyStatusTypeID;
            PreferredMedicalCompanyBO.IsDeleted = company.IsDeleted;
            PreferredMedicalCompanyBO.CreateByUserID = company.CreateByUserID;
            PreferredMedicalCompanyBO.UpdateByUserID = company.UpdateByUserID;


            return (T)(object)PreferredMedicalCompanyBO;
        }
        #endregion

        #region Entity Conversion
        public T ConvertDoctorAndRoom<T, U>(U entity)
        {
            if (entity is Doctor)
            {
                Doctor doctor = entity as Doctor;

                if (doctor == null)
                    return default(T);

                BO.Doctor doctorBO = new BO.Doctor();

                doctorBO.ID = doctor.Id;
                doctorBO.LicenseNumber = doctor.LicenseNumber;
                doctorBO.WCBAuthorization = doctor.WCBAuthorization;
                doctorBO.WcbRatingCode = doctor.WcbRatingCode;
                doctorBO.NPI = doctor.NPI;
                doctorBO.Title = doctor.Title;
                doctorBO.TaxType = (BO.GBEnums.TaxType)doctor.TaxTypeId;

                if (doctor.IsDeleted.HasValue)
                    doctorBO.IsDeleted = doctor.IsDeleted.Value;
                if (doctor.UpdateByUserID.HasValue)
                    doctorBO.UpdateByUserID = doctor.UpdateByUserID.Value;

                doctorBO.IsCalendarPublic = doctor.IsCalendarPublic;

                if (doctor.User != null)
                {
                    if (doctor.User.IsDeleted.HasValue == false || (doctor.User.IsDeleted.HasValue == true && doctor.User.IsDeleted.Value == false))
                    {
                        BO.User boUser = new BO.User();
                        using (UserRepository sr = new UserRepository(_context))
                        {
                            boUser = sr.Convert<BO.User, User>(doctor.User);
                            boUser.AddressInfo = null;
                            boUser.ContactInfo = null;
                            boUser.UserCompanies = null;
                            boUser.Roles = null;

                            boUser.UserPersonalSettings = new List<BO.UserPersonalSetting>();
                            foreach (var eachUPS in doctor.User.UserPersonalSettings)
                            {
                                if (eachUPS.IsDeleted.HasValue == false || (eachUPS.IsDeleted.HasValue == true && eachUPS.IsDeleted.Value == false))
                                {
                                    using (UserPersonalSettingRepository upsRepo = new UserPersonalSettingRepository(_context))
                                    {
                                        BO.UserPersonalSetting UserPersonalSettingBO = upsRepo.Convert<BO.UserPersonalSetting, UserPersonalSetting>(eachUPS);
                                        UserPersonalSettingBO.User = null;
                                        boUser.UserPersonalSettings.Add(UserPersonalSettingBO);
                                    }
                                }
                            }

                            doctorBO.user = boUser;
                        }
                    }

                }

                return (T)(object)doctorBO;
            }
            else if (entity is Room)
            {
                Room room = entity as Room;

                if (room == null)
                    return default(T);

                BO.Room roomBO = new BO.Room();
                roomBO.ID = room.id;
                roomBO.name = room.Name;
                roomBO.contactersonName = room.ContactPersonName;
                roomBO.phone = room.Phone;

                if (room.Location != null)
                {
                    if (room.Location.IsDeleted.HasValue == false || (room.Location.IsDeleted.HasValue == true && room.Location.IsDeleted.Value == false))
                    {
                        BO.Location boLocation = new BO.Location();
                        using (LocationRepository sr = new LocationRepository(_context))
                        {
                            boLocation = sr.Convert<BO.Location, Location>(room.Location);
                            if (boLocation != null)
                            {
                                boLocation.Company = null;
                                boLocation.AddressInfo = null;
                                boLocation.ContactInfo = null;
                                boLocation.Schedule = null;
                            }

                            roomBO.location = boLocation;
                        }
                    }
                }


                if (room.IsDeleted.HasValue)
                    roomBO.IsDeleted = room.IsDeleted.Value;
                if (room.UpdateByUserID.HasValue)
                    roomBO.UpdateByUserID = room.UpdateByUserID.Value;

                return (T)(object)roomBO;
            }

            return default(T);
        }
        #endregion

        #region Company Conversion
        public T CompanyConvert<T, U>(U entity)
        {
            Company company = entity as Company;
            if (company == null)
                return default(T);

            BO.Company boCompany = new BO.Company();

            boCompany.ID = company.id;
            boCompany.Name = company.Name;
            boCompany.TaxID = company.TaxID;
            boCompany.Status = (BO.GBEnums.AccountStatus)company.Status;
            boCompany.CompanyType = (BO.GBEnums.CompanyType)company.CompanyType;
            if (company.SubscriptionPlanType != null)
            {
                boCompany.SubsCriptionType = (BO.GBEnums.SubsCriptionType)company.SubscriptionPlanType;
            }
            else
            {
                boCompany.SubsCriptionType = null;
            }

            boCompany.CompanyStatusTypeID = (BO.GBEnums.CompanyStatusType)company.CompanyStatusTypeID;
            boCompany.IsDeleted = company.IsDeleted;
            boCompany.CreateByUserID = company.CreateByUserID;
            boCompany.UpdateByUserID = company.UpdateByUserID;


            return (T)(object)boCompany;
        }
        #endregion

        #region New Conversion
        public T ConvertPreferredMedicalProviderSignUp<T, U>(U entity)
        {
            PreferredMedicalProvider preferredMedicalProvider = entity as PreferredMedicalProvider;
            if (preferredMedicalProvider == null)
                return default(T);

            BO.PreferredMedicalProviderSignUp PreferredMedicalProviderSignUpBO = new BO.PreferredMedicalProviderSignUp();

            PreferredMedicalProviderSignUpBO.ID = preferredMedicalProvider.Id;
            PreferredMedicalProviderSignUpBO.PrefMedProviderId = preferredMedicalProvider.PrefMedProviderId;
            PreferredMedicalProviderSignUpBO.CompanyId = preferredMedicalProvider.CompanyId;
            PreferredMedicalProviderSignUpBO.IsCreated = preferredMedicalProvider.IsCreated;

            //PreferredMedicalProviderSignUpBO.Company = preferredMedicalProvider.PrefMedProviderId;
            PreferredMedicalProviderSignUpBO.Signup = new BO.Signup();
            if (preferredMedicalProvider.Company1 != null)
            {
                if (preferredMedicalProvider.Company1.IsDeleted.HasValue == false || (preferredMedicalProvider.Company1.IsDeleted.HasValue == true && preferredMedicalProvider.Company1.IsDeleted.Value == false))
                {
                    BO.Company boCompany = new BO.Company();
                    using (CompanyRepository sr = new CompanyRepository(_context))
                    {
                        boCompany = sr.Convert<BO.Company, Company>(preferredMedicalProvider.Company1);

                        PreferredMedicalProviderSignUpBO.Signup.company = boCompany;
                    }
                }
            }

            if (preferredMedicalProvider.Company1.ContactInfo != null)
            {

                BO.ContactInfo boContactInfo = new BO.ContactInfo();
                boContactInfo.Name = preferredMedicalProvider.Company1.ContactInfo.Name;
                boContactInfo.CellPhone = preferredMedicalProvider.Company1.ContactInfo.CellPhone;
                boContactInfo.EmailAddress = preferredMedicalProvider.Company1.ContactInfo.EmailAddress;
                boContactInfo.HomePhone = preferredMedicalProvider.Company1.ContactInfo.HomePhone;
                boContactInfo.WorkPhone = preferredMedicalProvider.Company1.ContactInfo.WorkPhone;
                boContactInfo.FaxNo = preferredMedicalProvider.Company1.ContactInfo.FaxNo;
                boContactInfo.CreateByUserID = preferredMedicalProvider.Company1.ContactInfo.CreateByUserID;
                boContactInfo.ID = preferredMedicalProvider.Company1.ContactInfo.id;
                boContactInfo.OfficeExtension = preferredMedicalProvider.Company1.ContactInfo.OfficeExtension;
                boContactInfo.AlternateEmail = preferredMedicalProvider.Company1.ContactInfo.AlternateEmail;
                boContactInfo.PreferredCommunication = preferredMedicalProvider.Company1.ContactInfo.PreferredCommunication;

                PreferredMedicalProviderSignUpBO.Signup.contactInfo = boContactInfo;

            }

            if (preferredMedicalProvider.Company1.UserCompanies != null)
            {
                BO.User lstUser = new BO.User();
                if (preferredMedicalProvider.Company1.UserCompanies.Count >= 1)
                {
                    var item = preferredMedicalProvider.Company1.UserCompanies.FirstOrDefault();

                    if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                    {
                        var userDB = _context.Users.Where(p => p.id == item.UserID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .FirstOrDefault();

                        using (UserRepository sr = new UserRepository(_context))
                        {
                            BO.User BOUser = new BO.User();
                            BOUser = sr.Convert<BO.User, User>(userDB);
                            BOUser.UserCompanies = null;
                            BOUser.ContactInfo = null;
                            BOUser.AddressInfo = null;
                            BOUser.Roles = null;

                            lstUser = BOUser;
                        }
                    }
                }

                PreferredMedicalProviderSignUpBO.Signup.user = lstUser;
            }

            return (T)(object)PreferredMedicalProviderSignUpBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {

            BO.PreferredMedicalProviderSignUp medicalProviderBO = (BO.PreferredMedicalProviderSignUp)(object)entity;

            var result = medicalProviderBO.Validate(medicalProviderBO);
            return result;
        }
        #endregion

        #region Save Data
        public override object Save<T>(T entity)
        {
            BO.ErrorObject errObj = new BO.ErrorObject();
            BO.PreferredMedicalProviderSignUp preferredMedicalProviderBO = (BO.PreferredMedicalProviderSignUp)(object)entity;
            PreferredMedicalProvider preferredMedicalProviderDB = new PreferredMedicalProvider();

            BO.Company companyBO = preferredMedicalProviderBO.Company;
            BO.Signup prefMedProviderBO = preferredMedicalProviderBO.Signup;

            PreferredMedicalProvider prefMedProvider = new PreferredMedicalProvider();
            Guid invitationDB_UniqueID = Guid.NewGuid();
            User userDB = new User();
            UserCompany UserCompanyDB = new UserCompany();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                bool IsEditMode = false;
                IsEditMode = (preferredMedicalProviderBO != null && preferredMedicalProviderBO.ID > 0) ? true : false;

                if (companyBO == null || (companyBO != null && companyBO.ID <= 0))
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefMedProviderBO == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefMedProviderBO.company == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefMedProviderBO.user == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefMedProviderBO.contactInfo == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                //if (string.IsNullOrEmpty(prefMedProviderBO.company.TaxID) == false && _context.Companies.Any(o => o.TaxID == prefMedProviderBO.company.TaxID && o.CompanyStatusTypeID == 3 && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                //{
                //    dbContextTransaction.Rollback();
                //    return new BO.ErrorObject { ErrorMessage = "TaxID already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                //}

                if (_context.Companies.Any(o => o.Name == prefMedProviderBO.company.Name && o.CompanyStatusTypeID == 3 && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "Company already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (!_context.Companies.Any(o => o.Name == prefMedProviderBO.company.Name && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                {
                    var _usserexists = _context.Users.Where(p => p.UserName == prefMedProviderBO.user.UserName && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
                    if (_usserexists != null)
                    {
                        if (_context.Users.Any(o => o.UserName == prefMedProviderBO.user.UserName && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { ErrorMessage = "User Name already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                        }
                    }
                }


                var user_ = _context.Users.Include("UserCompanies").Include("UserCompanies.Company").Include("UserCompanyRoles").Include("AddressInfo").Include("ContactInfo").Where(p => p.UserName == prefMedProviderBO.user.UserName).FirstOrDefault(); ;
                if (user_ != null)
                {
                    BO.User accs_ = new BO.User();
                    using (UserRepository userRepo = new UserRepository(_context))
                    {
                        accs_ = userRepo.Convert<BO.User, User>(user_);
                    }
                    List<BO.Role> RoleBO = new List<BO.Role>();
                    var rolesnew = _context.UserCompanyRoles.Where(p => p.UserID == user_.id && (p.IsDeleted.HasValue == false || p.IsDeleted == false)).ToList();
                    foreach (var item in rolesnew)
                    {
                        RoleBO.Add(new BO.Role()
                        {
                            ID = item.RoleID,
                            Name = Enum.GetName(typeof(BO.GBEnums.RoleType), item.RoleID),
                            RoleType = (BO.GBEnums.RoleType)item.RoleID
                        });
                    }
                    var companyobjnew = user_.UserCompanies.ToList().Select(o => o.Company).FirstOrDefault<Company>();
                    BO.Company _bocompanyobjnew = new BO.Company();
                    using (CompanyRepository userRepo = new CompanyRepository(_context))
                    {
                        _bocompanyobjnew = userRepo.Convert<BO.Company, Company>(companyobjnew);
                    }

                    BO.AddUser updUserBOnew = new BO.AddUser();
                    updUserBOnew.user = accs_;
                    updUserBOnew.user.UserName = user_.UserName;
                    updUserBOnew.user.FirstName = user_.FirstName;
                    updUserBOnew.user.LastName = user_.LastName;
                    updUserBOnew.user.MiddleName = user_.MiddleName;
                    updUserBOnew.user.Gender = (BO.GBEnums.Gender)user_.Gender;
                    updUserBOnew.user.UserType = (BO.GBEnums.UserType)user_.UserType;
                    updUserBOnew.user.ImageLink = user_.ImageLink;
                    updUserBOnew.user.C2FactAuthEmailEnabled = (bool)user_.C2FactAuthEmailEnabled;
                    updUserBOnew.user.C2FactAuthEmailEnabled = (bool)user_.C2FactAuthSMSEnabled.GetValueOrDefault();
                    updUserBOnew.user.ID = user_.id;
                    updUserBOnew.user.Roles = RoleBO;
                    updUserBOnew.company = _bocompanyobjnew;
                    updUserBOnew.role = accs_.Roles.ToArray();
                    // if (doctorBO.DoctorSpecialities.Count > 0) updUserBO.DoctorSpecialities = doctorBO.user.DoctorSpecialities;
                    if (user_.AddressInfo != null && user_.AddressInfo.id > 0) updUserBOnew.address = accs_.AddressInfo;
                    if (user_.ContactInfo != null && user_.ContactInfo.id > 0) updUserBOnew.contactInfo = accs_.ContactInfo;
                    using (UserRepository userRepo = new UserRepository(_context))
                    {
                        //object obj = userRepo.Save<BO.AddUser>(updUserBO);
                        //if (obj.GetType() == errObj.GetType())
                        //{
                        //    errObj = (BO.ErrorObject)obj;
                        //    dbContextTransaction.Rollback();
                        //    return new BO.ErrorObject { ErrorMessage = errObj.ErrorMessage, errorObject = "", ErrorLevel = ErrorLevel.Error };
                        //}

                        Company company = _context.Companies.Where(p => p.id == companyBO.ID
                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                     .FirstOrDefault<Company>();

                        var _prefmplist1 = _context.PreferredMedicalProviders.Where(o => o.PrefMedProviderId == _bocompanyobjnew.ID && o.CompanyId == companyBO.ID && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))).ToList();
                        if (_prefmplist1.Count() == 0)
                        {
                            prefMedProvider.PrefMedProviderId = _bocompanyobjnew.ID;
                            prefMedProvider.CompanyId = companyBO.ID;
                            prefMedProvider.IsCreated = true;
                            prefMedProvider.IsDeleted = false;
                            prefMedProvider.CreateByUserID = preferredMedicalProviderBO.CreateByUserID;
                            prefMedProvider.UpdateByUserID = preferredMedicalProviderBO.UpdateByUserID;
                            prefMedProvider.CreateDate = DateTime.UtcNow;

                            _context.PreferredMedicalProviders.Add(prefMedProvider);
                            _context.SaveChanges();
                        }

                        var _prefmplist2 = _context.PreferredMedicalProviders.Where(o => o.PrefMedProviderId == companyBO.ID && o.CompanyId == _bocompanyobjnew.ID && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))).ToList();
                        if (_prefmplist2.Count() == 0)
                        {
                            prefMedProvider.PrefMedProviderId = companyBO.ID;
                            prefMedProvider.CompanyId = _bocompanyobjnew.ID;
                            prefMedProvider.IsCreated = true;
                            prefMedProvider.IsDeleted = false;
                            prefMedProvider.CreateByUserID = preferredMedicalProviderBO.CreateByUserID;
                            prefMedProvider.UpdateByUserID = preferredMedicalProviderBO.UpdateByUserID;
                            prefMedProvider.CreateDate = DateTime.UtcNow;

                            _context.PreferredMedicalProviders.Add(prefMedProvider);
                            _context.SaveChanges();

                        }

                        #region Insert Invitation
                        Invitation invitationDB1 = new Invitation();
                        if (company != null)
                        {
                            invitationDB1.Company = companyobjnew;
                        }
                        invitationDB1.User = user_;
                        invitationDB1.UniqueID = Guid.NewGuid();
                        invitationDB1.CreateDate = DateTime.UtcNow;
                        invitationDB1.CreateByUserID = accs_.CreateByUserID;
                        invitationDB1.CompanyID = _bocompanyobjnew.ID;
                        _dbInvitation.Add(invitationDB1);
                        _context.SaveChanges();
                        #endregion

                        BO.User accss_ = userRepo.Convert<BO.User, User>(user_);

                        #region Notification and messaging code for staff
                        if (accss_.UserType == BO.GBEnums.UserType.Staff)
                        {
                            //try
                            //{
                            //    #region Send Email
                            //    string VerificationLink = "<a href='" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB1.UniqueID + "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB1.UniqueID + "</a>";
                            //    string Message = "Dear " + userBO.FirstName + ",<br><br>Thanks for registering with us.<br><br> Your user name is:- " + userBO.UserName + "<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";
                            //    BO.Email objEmail = new BO.Email { ToEmail = userBO.UserName, Subject = "User registered", Body = Message };
                            //    objEmail.SendMail();
                            //    #endregion
                            //}
                            //catch (Exception ex) { }

                            //if (isEditMode == false)
                            //{
                            //    #region notification for Add User
                            //    try
                            //    {

                            //        IdentityHelper identityHelper = new IdentityHelper();

                            //        string VerificationLink = "<a href='" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB1.UniqueID + "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB1.UniqueID + "</a>";

                            //        string MailMessageForStaff = "Dear " + userBO.FirstName + ",<br><br>You have been registered in midas portal as a Staff by:- " + identityHelper.DisplayName + "<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";
                            //        string NotificationForStaff = "You have been registered in midas portal as a staff by : " + identityHelper.DisplayName;
                            //        string SmsMessageForStaff = "Dear " + userBO.FirstName + ",<br><br>You have been registered in midas portal as a Staff by:- " + identityHelper.DisplayName + "<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";

                            //        string MailMessageForAdmin = "Dear " + identityHelper.DisplayName + ",<br><br>Thanks for registering new Staff.<br><br> Staff email:- " + userBO.UserName + "";
                            //        string NotificationForAdmin = "New Staff " + userBO.UserName + " has been registered.";
                            //        string SmsMessageForAdmin = "Dear " + identityHelper.DisplayName + ",<br><br>Thanks for registering new staff.<br><br> Staff email:- " + userBO.UserName + "";



                            //        User AdminUser = _context.Users.Include("ContactInfo").Include("UserCompanies").Include("UserCompanies.company")
                            //                              .Where(p => p.UserName == identityHelper.Email && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                            //                                  .FirstOrDefault();
                            //        int CurrentCompanyId = companyBO.ID;

                            //        List<User> lstStaff = _context.Users.Include("ContactInfo").Include("UserCompanies").Include("UserCompanies.company")
                            //                              .Where(p => p.UserName == acc_.UserName && p.UserCompanies.Where(p1 => p1.CompanyID == CurrentCompanyId && (p1.IsDeleted.HasValue == false || (p1.IsDeleted.HasValue == true && p1.IsDeleted.Value == false))).Any() && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                            //                                  .ToList<User>();


                            //        #region  admin mail object                 
                            //        BO.EmailMessage emAdmin = new BO.EmailMessage();
                            //        emAdmin.ApplicationName = "Midas";
                            //        emAdmin.ToEmail = identityHelper.Email;
                            //        emAdmin.EMailSubject = "MIDAS Notification";
                            //        emAdmin.EMailBody = MailMessageForAdmin;
                            //        #endregion

                            //        #region admin sms object
                            //        BO.SMS smsAdmin = new BO.SMS();
                            //        if (AdminUser != null)
                            //        {
                            //            smsAdmin.ApplicationName = "Midas";
                            //            smsAdmin.ToNumber = AdminUser.ContactInfo.CellPhone;
                            //            smsAdmin.Message = SmsMessageForAdmin;
                            //        }
                            //        #endregion


                            //        NotificationHelper nh = new NotificationHelper();
                            //        MessagingHelper mh = new MessagingHelper();


                            //        #region admin and staff 
                            //        if (AdminUser.UserType == 4)
                            //        {
                            //            nh.PushNotification(AdminUser.UserName, companyBO.ID, NotificationForAdmin, "New Patient Registration");
                            //            mh.SendEmailAndSms(AdminUser.UserName, companyBO.ID, emAdmin, smsAdmin);
                            //            foreach (var item in lstStaff)
                            //            {
                            //                #region  staff mail object                 
                            //                BO.EmailMessage emStaff = new BO.EmailMessage();
                            //                emStaff.ApplicationName = "Midas";
                            //                emStaff.ToEmail = item.UserName;
                            //                emStaff.EMailSubject = "MIDAS Notification";
                            //                emStaff.EMailBody = MailMessageForStaff;
                            //                #endregion

                            //                #region staff sms object
                            //                BO.SMS smsStaff = new BO.SMS();
                            //                smsStaff.ApplicationName = "Midas";
                            //                smsStaff.ToNumber = item.ContactInfo.CellPhone;
                            //                smsStaff.Message = SmsMessageForStaff;
                            //                #endregion

                            //                nh.PushNotification(item.UserName, companyBO.ID, NotificationForStaff, "New Patient Registration");
                            //                mh.SendEmailAndSms(item.UserName, companyBO.ID, emStaff, smsStaff);
                            //            }

                            //        }
                            //        else
                            //        {
                            //            foreach (var item in lstStaff)
                            //            {
                            //                #region  staff mail object                 
                            //                BO.EmailMessage emStaff = new BO.EmailMessage();
                            //                emStaff.ApplicationName = "Midas";
                            //                emStaff.ToEmail = item.UserName;
                            //                emStaff.EMailSubject = "MIDAS Notification";
                            //                emStaff.EMailBody = MailMessageForStaff;
                            //                #endregion

                            //                #region staff sms object
                            //                BO.SMS smsStaff = new BO.SMS();
                            //                smsStaff.ApplicationName = "Midas";
                            //                smsStaff.ToNumber = item.ContactInfo.CellPhone;
                            //                smsStaff.Message = SmsMessageForStaff;
                            //                #endregion

                            //                nh.PushNotification(item.UserName, companyBO.ID, NotificationForStaff, "New Patient Registration");
                            //                mh.SendEmailAndSms(item.UserName, companyBO.ID, emStaff, smsStaff);
                            //            }
                            //        }

                            //        #endregion
                            //    }
                            //    catch (Exception ex)
                            //    {

                            //    }
                            //    #endregion

                            //}
                            //else
                            //{
                            #region notification for Edit User
                            try
                            {

                                IdentityHelper identityHelper = new IdentityHelper();

                                string VerificationLink = "<a href='" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB1.UniqueID + "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB1.UniqueID + "</a>";

                                string MailMessageForStaff = "Dear " + accss_.FirstName + ",<br><br>You have been registered in midas portal as a Staff by:- " + company.Name + "<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks<br>" + company.Name;
                                string NotificationForStaff = "You have been registered in midas portal as a staff by : " + identityHelper.DisplayName;
                                string SmsMessageForStaff = "Dear " + accss_.FirstName + ",<br><br>You have been registered in midas portal as a Staff by:- " + company.Name + "<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks<br>" + company.Name;

                                string MailMessageForAdmin = "Dear " + identityHelper.DisplayName + ",<br><br>Thanks for registering new Staff.<br><br> Staff email:- " + accss_.UserName + "";
                                string NotificationForAdmin = "New Staff " + accss_.UserName + " has been registered.";
                                string SmsMessageForAdmin = "Dear " + identityHelper.DisplayName + ",<br><br>Thanks for registering new staff.<br><br> Staff email:- " + accss_.UserName + "";



                                User AdminUser = _context.Users.Include("ContactInfo").Include("UserCompanies").Include("UserCompanies.company")
                                                      .Where(p => p.UserName == identityHelper.Email && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                          .FirstOrDefault();
                                int CurrentCompanyId = companyBO.ID;

                                List<User> lstStaff = _context.Users.Include("ContactInfo").Include("UserCompanies").Include("UserCompanies.company")
                                                      .Where(p => p.UserName == accss_.UserName && p.UserCompanies.Where(p1 => p1.CompanyID == CurrentCompanyId && (p1.IsDeleted.HasValue == false || (p1.IsDeleted.HasValue == true && p1.IsDeleted.Value == false))).Any() && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                          .ToList<User>();


                                #region  admin mail object                 
                                BO.EmailMessage emAdmin = new BO.EmailMessage();
                                emAdmin.ApplicationName = "Midas";
                                emAdmin.ToEmail = identityHelper.Email;
                                emAdmin.EMailSubject = "MIDAS Notification";
                                emAdmin.EMailBody = MailMessageForAdmin;
                                #endregion

                                #region admin sms object
                                BO.SMS smsAdmin = new BO.SMS();
                                if (AdminUser != null)
                                {
                                    smsAdmin.ApplicationName = "Midas";
                                    smsAdmin.ToNumber = AdminUser.ContactInfo.CellPhone;
                                    smsAdmin.Message = SmsMessageForAdmin;
                                }
                                #endregion


                                NotificationHelper nh = new NotificationHelper();
                                MessagingHelper mh = new MessagingHelper();


                                #region admin and staff 
                                if (AdminUser.UserType == 4)
                                {
                                    nh.PushNotification(AdminUser.UserName, accss_.UserCompanies.Select(p => p.Company.ID).FirstOrDefault(), NotificationForAdmin, "New Patient Registration");
                                    mh.SendEmailAndSms(AdminUser.UserName, accss_.UserCompanies.Select(p => p.Company.ID).FirstOrDefault(), emAdmin, smsAdmin);
                                    //foreach (var item in lstStaff)
                                    //{
                                    #region  staff mail object                 
                                    BO.EmailMessage emStaff = new BO.EmailMessage();
                                    emStaff.ApplicationName = "Midas";
                                    emStaff.ToEmail = accss_.UserName;
                                    emStaff.EMailSubject = "MIDAS Notification";
                                    emStaff.EMailBody = MailMessageForStaff;
                                    #endregion

                                    #region staff sms object
                                    BO.SMS smsStaff = new BO.SMS();
                                    smsStaff.ApplicationName = "Midas";
                                    smsStaff.ToNumber = accss_.ContactInfo.CellPhone;
                                    smsStaff.Message = SmsMessageForStaff;
                                    #endregion

                                    nh.PushNotification(accss_.UserName, accss_.UserCompanies.Select(p => p.Company.ID).FirstOrDefault(), NotificationForStaff, "New Patient Registration");
                                    mh.SendEmailAndSms(accss_.UserName, accss_.UserCompanies.Select(p => p.Company.ID).FirstOrDefault(), emStaff, smsStaff);
                                    //}

                                }
                                else
                                {
                                    //foreach (var item in lstStaff)
                                    //{
                                    #region  staff mail object                 
                                    BO.EmailMessage emStaff = new BO.EmailMessage();
                                    emStaff.ApplicationName = "Midas";
                                    emStaff.ToEmail = accss_.UserName;
                                    emStaff.EMailSubject = "MIDAS Notification";
                                    emStaff.EMailBody = MailMessageForStaff;
                                    #endregion

                                    #region staff sms object
                                    BO.SMS smsStaff = new BO.SMS();
                                    smsStaff.ApplicationName = "Midas";
                                    smsStaff.ToNumber = accss_.ContactInfo.CellPhone;
                                    smsStaff.Message = SmsMessageForStaff;
                                    #endregion

                                    nh.PushNotification(accss_.UserName, CurrentCompanyId, NotificationForStaff, "New Patient Registration");
                                    mh.SendEmailAndSms(accss_.UserName, CurrentCompanyId, emStaff, smsStaff);
                                    //}
                                }

                                #endregion
                            }
                            catch (Exception ex)
                            {

                            }
                            #endregion
                            //}
                        }
                        #endregion
                        dbContextTransaction.Commit();
                        var results = _context.PreferredMedicalProviders.Include("Company").Include("Company1")
                                                          .Where(p => p.PrefMedProviderId == _bocompanyobjnew.ID && p.CompanyId == companyBO.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                          .FirstOrDefault();

                        BO.PreferredMedicalProvider ac_ = Convert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(results);

                        var ress = (BO.GbObject)(object)ac_;
                        return (object)ress; ;
                    }
                    //_context.Entry(user_).State = System.Data.Entity.EntityState.Modified;
                }


                BO.Company prefMedProviderCompanyBO = prefMedProviderBO.company;
                BO.ContactInfo ContactInfoBO = prefMedProviderBO.contactInfo;
                BO.User userBO = prefMedProviderBO.user;
                BO.Role roleBO = prefMedProviderBO.role;

                Company prefMedProvider_CompanyDB = new Company();
                AddressInfo AddressInfo = new AddressInfo();
                ContactInfo ContactInfo = new ContactInfo() { CellPhone = ContactInfoBO.CellPhone, EmailAddress = ContactInfoBO.EmailAddress };

                _context.AddressInfoes.Add(AddressInfo);
                _context.SaveChanges();

                _context.ContactInfoes.Add(ContactInfo);
                _context.SaveChanges();

                prefMedProvider_CompanyDB.Name = prefMedProviderCompanyBO.Name;
                prefMedProvider_CompanyDB.Status = System.Convert.ToByte(prefMedProviderCompanyBO.Status);
                prefMedProvider_CompanyDB.CompanyType = System.Convert.ToByte(prefMedProviderCompanyBO.CompanyType);
                if (prefMedProviderCompanyBO.SubsCriptionType != null)
                {
                    prefMedProvider_CompanyDB.SubscriptionPlanType = System.Convert.ToByte(prefMedProviderCompanyBO.SubsCriptionType);
                }
                else
                {
                    prefMedProvider_CompanyDB.SubscriptionPlanType = null;
                }
                prefMedProvider_CompanyDB.TaxID = prefMedProviderCompanyBO.TaxID;
                prefMedProvider_CompanyDB.AddressId = AddressInfo.id;
                prefMedProvider_CompanyDB.ContactInfoID = ContactInfo.id;
                prefMedProvider_CompanyDB.BlobStorageTypeId = 1;
                prefMedProvider_CompanyDB.CompanyStatusTypeID = 1; // CompanyStatusTypeID = 1 -- RegistrationImcomplete
                prefMedProvider_CompanyDB.IsDeleted = prefMedProviderCompanyBO.IsDeleted;
                prefMedProvider_CompanyDB.CreateByUserID = prefMedProviderCompanyBO.CreateByUserID;
                prefMedProvider_CompanyDB.UpdateByUserID = prefMedProviderCompanyBO.UpdateByUserID;
                prefMedProvider_CompanyDB.CreateDate = DateTime.UtcNow;

                _context.Companies.Add(prefMedProvider_CompanyDB);
                _context.SaveChanges();


                userDB.FirstName = userBO.FirstName;
                userDB.LastName = userBO.LastName;
                userDB.UserName = userBO.UserName;
                userDB.UserType = 2;
                userDB.C2FactAuthEmailEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactEmail"));
                userDB.C2FactAuthSMSEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactSMS"));
                userDB.AddressId = prefMedProvider_CompanyDB.AddressId;
                userDB.ContactInfoId = prefMedProvider_CompanyDB.ContactInfoID;
                userDB.IsDeleted = userBO.IsDeleted;
                userDB.CreateByUserID = userBO.CreateByUserID;
                userDB.CreateDate = DateTime.UtcNow;

                //_context.Users.Add(userDB);
                //_context.SaveChanges();

                //UserCompanyDB.UserID = userDB.id;
                //UserCompanyDB.CompanyID = prefMedProvider_CompanyDB.id;
                //UserCompanyDB.IsDeleted = false;
                //UserCompanyDB.UserStatusID = 1;
                //UserCompanyDB.CreateByUserID = 0;
                //UserCompanyDB.CreateDate = DateTime.UtcNow;
                //UserCompanyDB.IsAccepted = true;

                //_context.UserCompanies.Add(UserCompanyDB);
                //_context.SaveChanges();

                BO.User accsnew_ = new BO.User();
                using (UserRepository userRepo = new UserRepository(_context))
                {
                    accsnew_ = userRepo.Convert<BO.User, User>(userDB);
                }
                List<BO.Role> RoleBOs = new List<BO.Role>();
                //var roles = _context.UserCompanyRoles.Where(p => p.UserID == user_.id && (p.IsDeleted.HasValue == false || p.IsDeleted == false)).ToList();
                //foreach (var item in roles)
                //{
                //    RoleBOs.Add(new BO.Role()
                //    {
                //        ID = item.RoleID,
                //        Name = Enum.GetName(typeof(BO.GBEnums.RoleType), item.RoleID),
                //        RoleType = (BO.GBEnums.RoleType)item.RoleID
                //    });
                //}

                BO.Company _bocompanyobj = new BO.Company();
                using (CompanyRepository userRepo = new CompanyRepository(_context))
                {
                    _bocompanyobj = userRepo.Convert<BO.Company, Company>(prefMedProvider_CompanyDB);
                }

                //UserCompanyRole UserCompanyRoleDB = new UserCompanyRole();
                //UserCompanyRoleDB.UserID = userDB.id;
                //UserCompanyRoleDB.RoleID = (int)roleBO.RoleType;
                //UserCompanyRoleDB.IsDeleted = false;
                //UserCompanyRoleDB.CreateDate = DateTime.UtcNow;
                //UserCompanyRoleDB.CreateByUserID = 0;
                //_context.UserCompanyRoles.Add(UserCompanyRoleDB);
                // _context.SaveChanges();


                RoleBOs.Add(new BO.Role()
                {
                    ID = (int)roleBO.RoleType,
                    Name = Enum.GetName(typeof(BO.GBEnums.RoleType), roleBO.RoleType),
                    RoleType = (BO.GBEnums.RoleType)roleBO.RoleType
                });


                BO.AddUser updUserBO = new BO.AddUser();
                updUserBO.user = accsnew_;
                updUserBO.user.UserName = userBO.UserName;
                updUserBO.user.FirstName = userBO.FirstName;
                updUserBO.user.LastName = userBO.LastName;
                updUserBO.user.MiddleName = userBO.MiddleName;
                updUserBO.user.UserType = (BO.GBEnums.UserType)2;
                //updUserBO.user.ImageLink = user_.ImageLink;
                updUserBO.user.C2FactAuthEmailEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactEmail"));
                updUserBO.user.C2FactAuthSMSEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactSMS"));
                //updUserBO.user.ID = user_.id;
                updUserBO.user.Roles = RoleBOs;
                updUserBO.company = _bocompanyobj;
                updUserBO.createdCompanyId = companyBO.ID;
                updUserBO.role = accsnew_.Roles.ToArray();
                // if (doctorBO.DoctorSpecialities.Count > 0) updUserBO.DoctorSpecialities = doctorBO.user.DoctorSpecialities;
                updUserBO.address = accsnew_.AddressInfo;
                updUserBO.contactInfo = accsnew_.ContactInfo;
                using (UserRepository userRepo = new UserRepository(_context))
                {
                    object obj = userRepo.Save<BO.AddUser>(updUserBO);
                    if (obj.GetType() == errObj.GetType())
                    {
                        errObj = (BO.ErrorObject)obj;
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { ErrorMessage = errObj.ErrorMessage, errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        userBO = (BO.User)obj;
                    }
                }


                //UserCompanyRole UserCompanyRoleDB = new UserCompanyRole();
                //UserCompanyRoleDB.UserID = userDB.id;
                //UserCompanyRoleDB.RoleID = (int)roleBO.RoleType;
                //UserCompanyRoleDB.IsDeleted = false;
                //UserCompanyRoleDB.CreateDate = DateTime.UtcNow;
                //UserCompanyRoleDB.CreateByUserID = 0;
                //_context.UserCompanyRoles.Add(UserCompanyRoleDB);
                //_context.SaveChanges();

                var _prefmplist3 = _context.PreferredMedicalProviders.Where(o => o.PrefMedProviderId == prefMedProvider_CompanyDB.id && o.CompanyId == companyBO.ID && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))).ToList();
                if (_prefmplist3.Count() == 0)
                {
                    prefMedProvider.PrefMedProviderId = prefMedProvider_CompanyDB.id;
                    prefMedProvider.CompanyId = companyBO.ID;
                    prefMedProvider.IsCreated = true;
                    prefMedProvider.IsDeleted = false;
                    prefMedProvider.CreateByUserID = prefMedProvider_CompanyDB.CreateByUserID;
                    prefMedProvider.UpdateByUserID = prefMedProvider_CompanyDB.UpdateByUserID;
                    prefMedProvider.CreateDate = DateTime.UtcNow;

                    _context.PreferredMedicalProviders.Add(prefMedProvider);
                    _context.SaveChanges();
                }

                var _prefmplist4 = _context.PreferredMedicalProviders.Where(o => o.PrefMedProviderId == companyBO.ID && o.CompanyId == prefMedProvider_CompanyDB.id && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))).ToList();
                if (_prefmplist4.Count() == 0)
                {
                    prefMedProvider.PrefMedProviderId = companyBO.ID;
                    prefMedProvider.CompanyId = prefMedProvider_CompanyDB.id;
                    prefMedProvider.IsCreated = true;
                    prefMedProvider.IsDeleted = false;
                    prefMedProvider.CreateByUserID = prefMedProvider_CompanyDB.CreateByUserID;
                    prefMedProvider.UpdateByUserID = prefMedProvider_CompanyDB.UpdateByUserID;
                    prefMedProvider.CreateDate = DateTime.UtcNow;

                    _context.PreferredMedicalProviders.Add(prefMedProvider);
                    _context.SaveChanges();
                }

                List<UserCompany> oldUserCompniesListNew = new List<UserCompany>();
                oldUserCompniesListNew = _context.UserCompanies.Where(y => y.UserID == userBO.ID && y.CompanyID != _bocompanyobj.ID).ToList<UserCompany>();
                if (companyBO.CompanyType == BO.GBEnums.CompanyType.MedicalProvider)
                {
                    PreferredMedicalProvider prefMedProviderNew = new PreferredMedicalProvider();
                    foreach (var itemMed in oldUserCompniesListNew)
                    {
                        if (!_context.PreferredMedicalProviders.Any(y => y.PrefMedProviderId == itemMed.CompanyID && y.CompanyId == _bocompanyobj.ID && (y.IsDeleted.HasValue == false || (y.IsDeleted.HasValue == true && y.IsDeleted.Value == false))))
                        {
                            // Map Old Companies to new compnay preffred list
                            prefMedProvider.PrefMedProviderId = itemMed.CompanyID;
                            prefMedProvider.CompanyId = _bocompanyobj.ID;
                            prefMedProvider.IsCreated = true;
                            prefMedProvider.IsDeleted = false;
                            prefMedProvider.CreateByUserID = prefMedProvider_CompanyDB.CreateByUserID;
                            prefMedProvider.UpdateByUserID = prefMedProvider_CompanyDB.CreateByUserID;
                            prefMedProvider.CreateDate = DateTime.UtcNow;
                            _context.PreferredMedicalProviders.Add(prefMedProvider);
                            _context.SaveChanges();
                        }

                        if (!_context.PreferredMedicalProviders.Any(y => y.PrefMedProviderId == _bocompanyobj.ID && y.CompanyId == itemMed.CompanyID && (y.IsDeleted.HasValue == false || (y.IsDeleted.HasValue == true && y.IsDeleted.Value == false))))
                        {
                            // Map New Company to old compnaies preffred list
                            prefMedProvider.PrefMedProviderId = _bocompanyobj.ID;
                            prefMedProvider.CompanyId = itemMed.CompanyID;
                            prefMedProvider.IsCreated = true;
                            prefMedProvider.IsDeleted = false;
                            prefMedProvider.CreateByUserID = prefMedProvider_CompanyDB.CreateByUserID;
                            prefMedProvider.UpdateByUserID = prefMedProvider_CompanyDB.CreateByUserID;
                            prefMedProvider.CreateDate = DateTime.UtcNow;
                            _context.PreferredMedicalProviders.Add(prefMedProvider);
                            _context.SaveChanges();
                        }
                    }
                }

                dbContextTransaction.Commit();
            }

            //#region Insert Invitation
            //Invitation invitationDB = new Invitation();
            //invitationDB.User = userDB;

            //invitationDB_UniqueID = Guid.NewGuid();
            //invitationDB.UniqueID = invitationDB_UniqueID;
            //invitationDB.CompanyID = UserCompanyDB.CompanyID != 0 ? UserCompanyDB.CompanyID : 0;
            //invitationDB.CreateDate = DateTime.UtcNow;
            //invitationDB.CreateByUserID = userDB.id;
            //_context.Invitations.Add(invitationDB);
            //_context.SaveChanges();
            //#endregion

            try
            {
                //#region Send Email

                //var CurrentUser = _context.Users.Where(p => p.id == prefMedProvider.CreateByUserID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<User>();
                //var CurrentCompanyId = _context.UserCompanies.Where(p => p.UserID == CurrentUser.id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.CompanyID).FirstOrDefault();
                //var CurrentCompany = _context.Companies.Where(p => p.id == CurrentCompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                //if (CurrentUser != null)
                //{
                //    if (CurrentUser.UserType == 3)
                //    {
                //        var medicalprovider_UserId = _context.UserCompanies.Where(p => p.CompanyID == prefMedProvider.PrefMedProviderId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.UserID).FirstOrDefault();
                //        var medicalprovider_user = _context.Users.Where(p => p.id == medicalprovider_UserId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
                //        if (medicalprovider_user != null)
                //        {
                //            var PreferredMedicalAddByAttorney = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "PreferredMedicalAddByAttorney".ToUpper()).FirstOrDefault();
                //            if (PreferredMedicalAddByAttorney == null)
                //            {
                //                return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                //            }
                //            else
                //            {
                //                #region Send mail to medical provider
                //                string VarificationLink1 = "<a href='" + Utility.GetConfigValue("MedicalProviderVerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("MedicalProviderVerificationLink") + "/" + invitationDB_UniqueID + "</a>";
                //                string msg1 = PreferredMedicalAddByAttorney.EmailBody;
                //                string subject1 = PreferredMedicalAddByAttorney.EmailSubject;

                //                string message1 = string.Format(msg1, medicalprovider_user.FirstName, CurrentUser.FirstName, CurrentCompany.Name, VarificationLink1);

                //                BO.Email objEmail1 = new BO.Email { ToEmail = medicalprovider_user.UserName, Subject = subject1, Body = message1 };
                //                objEmail1.SendMail();
                //                #endregion

                //                //#region Send mail to patient
                //                //string LoginLink2 = "<a href='http://www.patient.codearray.tk/#/account/login'>http://www.patient.codearray.tk/#/account/login </a>";
                //                //string msg2 = patientCaseTemplate.EmailBody;
                //                //string subject2 = patientCaseTemplate.EmailSubject;

                //                //string message2 = string.Format(msg2, patient.FirstName, CurrentUser.FirstName, medicalprovider_user.FirstName, LoginLink2);

                //                //BO.Email objEmail2 = new BO.Email { ToEmail = patient.UserName, Subject = subject2, Body = message2 };
                //                //objEmail2.SendMail();
                //            }

                //        }
                //    }
                //    else if (CurrentUser.UserType == 2 || CurrentUser.UserType == 4)
                //    {
                //        var medicalprovider_UserId = _context.UserCompanies.Where(p => p.CompanyID == prefMedProvider.PrefMedProviderId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.UserID).FirstOrDefault();
                //        var medicalprovider_user = _context.Users.Where(p => p.id == medicalprovider_UserId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                //        if (medicalprovider_user != null)
                //        {
                //            var PreferredMedicalAddByProvider = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "PreferredMedicalAddByProvider".ToUpper()).FirstOrDefault();

                //            if (PreferredMedicalAddByProvider == null)
                //            {
                //                return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                //            }
                //            else
                //            {
                //                #region Send mail to medical provider
                //                string VarificationLink1 = "<a href='" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "</a>";
                //                string msg1 = PreferredMedicalAddByProvider.EmailBody;
                //                string subject1 = PreferredMedicalAddByProvider.EmailSubject;

                //                string message1 = string.Format(msg1, medicalprovider_user.FirstName, CurrentUser.FirstName, CurrentCompany.Name, VarificationLink1);

                //                BO.Email objEmail1 = new BO.Email { ToEmail = medicalprovider_user.UserName, Subject = subject1, Body = message1 };
                //                objEmail1.SendMail();
                //                #endregion
                //            }
                //        }
                //    }
                //}
                //#endregion
            }
            catch (Exception ex) { }

            var result = _context.PreferredMedicalProviders.Include("Company").Include("Company1")
                                                           .Where(p => p.Id == prefMedProvider.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                           .FirstOrDefault();

            BO.PreferredMedicalProvider acc_ = Convert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(result);

            var res = (BO.GbObject)(object)acc_;
            return (object)res;
        }
        #endregion

        #region Update Medical Provider
        public override object UpdateMedicalProvider<T>(T entity)
        {

            BO.PreferredMedicalProviderSignUp preferredMedicalProviderBO = (BO.PreferredMedicalProviderSignUp)(object)entity;
            PreferredMedicalProvider preferredMedicalProviderDB = new PreferredMedicalProvider();

            BO.Signup prefMedProviderBO = preferredMedicalProviderBO.Signup;

            PreferredMedicalProvider prefMedProvider = new PreferredMedicalProvider();

            Guid invitationDB_UniqueID = Guid.NewGuid();
            User userDB = new User();
            Company prefMedProvider_CompanyDB = new Company();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                if (prefMedProviderBO == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefMedProviderBO.company == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefMedProviderBO.user == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefMedProviderBO.contactInfo == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                //if (_context.Companies.Any(o => o.TaxID == prefMedProviderBO.company.TaxID && o.id != prefMedProviderBO.company.ID
                //    && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                //{
                //    dbContextTransaction.Rollback();
                //    return new BO.ErrorObject { ErrorMessage = "TaxID already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                //}

                if (_context.Companies.Any(o => o.Name == prefMedProviderBO.company.Name && o.id != prefMedProviderBO.company.ID
                    && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "Company already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
                else if (_context.Users.Any(o => o.UserName == prefMedProviderBO.user.UserName && o.id != prefMedProviderBO.user.ID
                    && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "User Name already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                BO.Company prefMedProviderCompanyBO = prefMedProviderBO.company;
                BO.ContactInfo ContactInfoBO = prefMedProviderBO.contactInfo;
                BO.User userBO = prefMedProviderBO.user;
                BO.Role roleBO = prefMedProviderBO.role;

                prefMedProvider_CompanyDB = _context.Companies.Where(p => p.id == prefMedProviderCompanyBO.ID
                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                      .FirstOrDefault();

                if (prefMedProvider_CompanyDB == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "Company Record Not Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                prefMedProvider_CompanyDB.Name = prefMedProviderCompanyBO.Name;
                prefMedProvider_CompanyDB.Status = System.Convert.ToByte(prefMedProviderCompanyBO.Status);
                prefMedProvider_CompanyDB.CompanyType = System.Convert.ToByte(prefMedProviderCompanyBO.CompanyType);
                if (prefMedProviderCompanyBO.SubsCriptionType != null)
                {
                    prefMedProvider_CompanyDB.SubscriptionPlanType = System.Convert.ToByte(prefMedProviderCompanyBO.SubsCriptionType);
                }
                else
                {
                    prefMedProvider_CompanyDB.SubscriptionPlanType = null;
                }

                prefMedProvider_CompanyDB.TaxID = prefMedProviderCompanyBO.TaxID;
                //prefMedProvider_CompanyDB.AddressId = prefMedProviderCompanyBO.AddressInfo.ID;
                prefMedProvider_CompanyDB.ContactInfoID = ContactInfoBO.ID;
                prefMedProvider_CompanyDB.CompanyStatusTypeID = System.Convert.ToByte(prefMedProviderCompanyBO.CompanyStatusTypeID);
                prefMedProvider_CompanyDB.IsDeleted = prefMedProviderCompanyBO.IsDeleted;
                prefMedProvider_CompanyDB.CreateByUserID = prefMedProviderCompanyBO.CreateByUserID;
                prefMedProvider_CompanyDB.UpdateByUserID = prefMedProviderCompanyBO.UpdateByUserID;
                prefMedProvider_CompanyDB.UpdateDate = DateTime.UtcNow;

                _context.SaveChanges();


                ContactInfo ContactInfo = _context.ContactInfoes.Where(p => p.id == ContactInfoBO.ID
                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                      .FirstOrDefault();

                if (ContactInfo == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "Contact Record Not Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                ContactInfo.CellPhone = ContactInfoBO.CellPhone;
                ContactInfo.EmailAddress = ContactInfoBO.EmailAddress;

                _context.SaveChanges();


                userDB = _context.Users.Where(p => p.id == userBO.ID
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                            .FirstOrDefault();

                if (userDB == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "User Record Not Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                userDB.FirstName = userBO.FirstName;
                userDB.LastName = userBO.LastName;
                userDB.UserType = 2;
                userDB.C2FactAuthEmailEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactEmail"));
                userDB.C2FactAuthSMSEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactSMS"));
                userDB.AddressId = prefMedProvider_CompanyDB.AddressId;
                userDB.ContactInfoId = prefMedProvider_CompanyDB.ContactInfoID;
                userDB.IsDeleted = false;
                userDB.CreateByUserID = 0;
                userDB.CreateDate = DateTime.UtcNow;

                _context.SaveChanges();

                dbContextTransaction.Commit();
            }

            try
            {
                #region Send Email

                var userId = _context.UserCompanies.Where(p => p.CompanyID == prefMedProvider.PrefMedProviderId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.UserID).ToList();

                var userBO = _context.Users.Where(p => userId.Contains(p.id) && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                //var userBO = _context.Users.Where(p => p.id == caseDB.AttorneyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                if (userBO != null)
                {
                    var mailTemplateDB = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "PrefMedicalProviderUpdated".ToUpper()).FirstOrDefault();
                    if (mailTemplateDB == null)
                    {
                        return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        #region Insert Invitation
                        Invitation invitationDB = new Invitation();
                        invitationDB.User = userDB;

                        invitationDB_UniqueID = Guid.NewGuid();
                        invitationDB.UniqueID = invitationDB_UniqueID;
                        invitationDB.CompanyID = prefMedProvider_CompanyDB.id != 0 ? prefMedProvider_CompanyDB.id : 0;
                        invitationDB.CreateDate = DateTime.UtcNow;
                        invitationDB.CreateByUserID = userDB.id;
                        _context.Invitations.Add(invitationDB);
                        _context.SaveChanges();
                        #endregion

                        string VerificationLink = "<a href='http://medicalprovider.codearray.tk/#/account/login'> http://medicalprovider.codearray.tk/#/account/login </a>";
                        string msg = mailTemplateDB.EmailBody;
                        string subject = mailTemplateDB.EmailSubject;

                        string message = string.Format(msg, userBO.FirstName, userBO.UserName, VerificationLink);

                        BO.Email objEmail = new BO.Email { ToEmail = userBO.UserName, Subject = subject, Body = message };
                        objEmail.SendMail();
                    }
                }

                #endregion
            }
            catch (Exception ex) { }

            var result = _context.PreferredMedicalProviders.Include("Company").Include("Company1")
                                                            .Where(p => p.PrefMedProviderId == prefMedProviderBO.company.ID
                                                                 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault();

            BO.PreferredMedicalProviderSignUp acc_ = ConvertPreferredMedicalProviderSignUp<BO.PreferredMedicalProviderSignUp, PreferredMedicalProvider>(result);

            var res = (BO.GbObject)(object)acc_;
            return (object)res;
        }
        #endregion

        #region Get By Company ID
        public override object GetByCompanyId(int id)
        {
            var medicalProvider = _context.PreferredMedicalProviders.Where(p => p.CompanyId == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                    .ToList();

            List<BO.PreferredMedicalProvider> lstprovider = new List<BO.PreferredMedicalProvider>();

            if (medicalProvider == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this companyId.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                medicalProvider.ForEach(item => lstprovider.Add(Convert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(item)));
            }

            return lstprovider;
        }
        #endregion

        #region Get By GetPreferredCompanyDoctorsAndRoomByCompanyId
        public override object GetPreferredCompanyDoctorsAndRoomByCompanyId(int CompanyId, int SpecialityId, int RoomTestId)
        {
            var medicalProvider = _context.PreferredMedicalProviders.Where(p => p.CompanyId == CompanyId
                                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                    .Select(p => p.Company1)
                                                                    .ToList();

            List<BO.PreferredMedicalCompany> PreferredMedicalCompanyBO = new List<BO.PreferredMedicalCompany>();
            medicalProvider.ForEach(p => PreferredMedicalCompanyBO.Add(ConvertPreferredMedicalCompany<BO.PreferredMedicalCompany, Company>(p)));

            foreach (var eachMedicalProvider in PreferredMedicalCompanyBO)
            {
                //if (eachMedicalProvider.RegistrationComplete == true)
                //{
                var locations = _context.Locations.Where(p => p.CompanyID == eachMedicalProvider.ID
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                  .Select(p => p.id);

                var doctorsWithSpeciality = _context.DoctorSpecialities.Where(p => p.SpecialityID == SpecialityId
                                                            && (p.IsDeleted == false))
                                                  .Select(p => p.DoctorID);

                var doctors = _context.DoctorLocationSchedules.Where(p => locations.Contains(p.LocationID) == true && doctorsWithSpeciality.Contains(p.DoctorID) == true
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                              .Select(p => p.Doctor).Distinct()
                                                              .Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                              .Select(p => p).Include("User").Include("User.UserPersonalSettings")
                                                              .ToList();

                List<BO.Doctor> doctorsBO = new List<BO.Doctor>();
                doctors.ForEach(p => doctorsBO.Add(ConvertDoctorAndRoom<BO.Doctor, Doctor>(p)));

                eachMedicalProvider.Doctors = doctorsBO;

                var rooms = _context.Rooms.Include("Location").Where(p => locations.Contains(p.LocationID) == true && p.RoomTestID == RoomTestId
                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                          .ToList();

                List<BO.Room> roomsBO = new List<BO.Room>();
                rooms.ForEach(p => roomsBO.Add(ConvertDoctorAndRoom<BO.Room, Room>(p)));

                eachMedicalProvider.Rooms = roomsBO;
                //}                
            }

            return PreferredMedicalCompanyBO;
        }
        #endregion

        #region Get By GetPreferredMedicalProviderbyCompanyId
        public override object GetPreferredMedicalProviderbyCompanyId(int CompanyId)
        {
            var medicalProvider = _context.PreferredMedicalProviders.Where(p => p.CompanyId == CompanyId
                                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                    .Select(p => p.Company1)
                                                                    .ToList();

            List<BO.PreferredMedicalCompany> PreferredMedicalCompanyBO = new List<BO.PreferredMedicalCompany>();
            medicalProvider.ForEach(p => PreferredMedicalCompanyBO.Add(ConvertPreferredMedicalCompany<BO.PreferredMedicalCompany, Company>(p)));

            return PreferredMedicalCompanyBO;
        }
        #endregion Get By GetPreferredMedicalProvider

        #region Get By PrefMedProvider Id
        public override object GetByPrefMedProviderId(int Id)
        {
            var medicalProvider = _context.PreferredMedicalProviders.Include("Company1.UserCompanies.User")
                                                                     .Where(p => p.Id == Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                    .FirstOrDefault();



            BO.PreferredMedicalProviderSignUp boProviderSignUp = new BO.PreferredMedicalProviderSignUp();

            if (medicalProvider == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this preferred Medcial Provider Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                boProviderSignUp = ConvertPreferredMedicalProviderSignUp<BO.PreferredMedicalProviderSignUp, PreferredMedicalProvider>(medicalProvider);
            }

            return boProviderSignUp;
        }
        #endregion

        #region Get By PrefMedProvider Company Name
        public override object GetByPrefMedProviderCompanyName(string CompanyName)
        {
            var medicalProvider = _context.PreferredMedicalProviders.Include("Company1.UserCompanies.User")
                                                                     .Where(p => p.Company1.Name == CompanyName && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                    .FirstOrDefault();
            BO.PreferredMedicalProviderSignUp boProviderSignUp = new BO.PreferredMedicalProviderSignUp();
            var acc = _context.Companies.Where(o => o.Name == CompanyName && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))).FirstOrDefault();
            if (acc != null)
            {
                boProviderSignUp.CompanyId = acc.id;
                boProviderSignUp.PrefMedProviderId = acc.CompanyStatusTypeID;
                return boProviderSignUp;
            }

            boProviderSignUp.CompanyId = 0;
            return boProviderSignUp;
            //return new BO.ErrorObject { ErrorMessage = "Company already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };

            //if (medicalProvider == null)
            //{
            //    return new BO.ErrorObject { ErrorMessage = "No record found for this preferred Medcial Provider Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            //}
            //else
            //{
            //    boProviderSignUp = ConvertPreferredMedicalProviderSignUp<BO.PreferredMedicalProviderSignUp, PreferredMedicalProvider>(medicalProvider);
            //}


        }
        #endregion

        #region Associate Medical Provider With Company
        public override object AssociateMedicalProviderWithCompany(int PrefMedProviderId, int CompanyId)
        {
            Company CompanyDB = _context.Companies.Where(p => p.id == CompanyId
                                                   && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .FirstOrDefault();

            if (CompanyDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Company dosent exists.", errorObject = "", ErrorLevel = ErrorLevel.Information };
            }

            Company PrefMedProviderCompanyDB = _context.Companies.Where(p => p.id == PrefMedProviderId
                                                   && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .FirstOrDefault();

            if (PrefMedProviderCompanyDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "PrefMedProvider Company dosent exists.", errorObject = "", ErrorLevel = ErrorLevel.Information };
            }

            var preferredMedicalProviderDB = _context.PreferredMedicalProviders.Where(p => p.PrefMedProviderId == PrefMedProviderId && p.CompanyId == CompanyId
                                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                               .FirstOrDefault();

            if (preferredMedicalProviderDB != null)
            {
                return new BO.ErrorObject { ErrorMessage = "PrefMedProvider Company already associated with this company.", errorObject = "", ErrorLevel = ErrorLevel.Information };
            }

            bool IsAddPreferredMedicalProvider = false;
            if (preferredMedicalProviderDB == null)
            {
                preferredMedicalProviderDB = new PreferredMedicalProvider();
                IsAddPreferredMedicalProvider = true;
            }

            preferredMedicalProviderDB.PrefMedProviderId = PrefMedProviderId;
            preferredMedicalProviderDB.CompanyId = CompanyId;
            preferredMedicalProviderDB.IsCreated = false;
            preferredMedicalProviderDB.IsDeleted = false;

            if (IsAddPreferredMedicalProvider == true)
            {
                _context.PreferredMedicalProviders.Add(preferredMedicalProviderDB);
            }

            _context.SaveChanges();

            BO.PreferredMedicalProvider acc_ = Convert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(preferredMedicalProviderDB);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region Get All Medical Provider Exclude Assigned
        public override object GetAllMedicalProviderExcludeAssigned(int CompanyId)
        {
            var AssignedMedicalProvider = _context.PreferredMedicalProviders.Where(p => p.CompanyId == CompanyId
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                            .Select(p => p.PrefMedProviderId);

            var companies = _context.Companies.Where(p => AssignedMedicalProvider.Contains(p.id) == false
                                               && p.CompanyType == 1
                                               && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                              .OrderBy(x => x.Name)
                                              .ToList();



            List<BO.Company> lstCompany = new List<BO.Company>();

            if (companies == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                companies.ForEach(item => lstCompany.Add(CompanyConvert<BO.Company, Company>(item)));
            }

            return lstCompany;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {

            PreferredMedicalProvider preferredMedicalProviderDB = _context.PreferredMedicalProviders.Include("Company")
                                                                                                    .Include("Company1").Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<PreferredMedicalProvider>();

            BO.PreferredMedicalProvider preferredMedicalProviderBO = new BO.PreferredMedicalProvider();

            if (preferredMedicalProviderDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                preferredMedicalProviderBO = Convert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(preferredMedicalProviderDB);
            }

            return (object)preferredMedicalProviderBO;
        }
        #endregion

        #region Delete
        public override object Delete(int id)
        {

            PreferredMedicalProvider preferredMedicalProviderDB = new PreferredMedicalProvider();

            preferredMedicalProviderDB = _context.PreferredMedicalProviders.Where(p => p.Id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault();

            if (preferredMedicalProviderDB != null)
            {
                preferredMedicalProviderDB.IsDeleted = true;
                _context.SaveChanges();
            }
            else
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Medical provider details dosen't exists.", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(preferredMedicalProviderDB);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
