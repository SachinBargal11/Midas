﻿using MIDAS.GBX.Common;
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
    internal class UserRepository : BaseEntityRepo,IDisposable
    {
        private DbSet<User> _dbSet;
        private DbSet<OTP> _dbOTP;
        private DbSet<UserCompany> _dbUserCompany;
        private DbSet<UserCompanyRole> _dbUserCompanyRole;
        private DbSet<Invitation> _dbInvitation;

        #region Constructor
        public UserRepository(MIDASGBXEntities context) : base(context)
        {
            _dbSet = context.Set<User>();
            _dbOTP= context.Set<OTP>();
            _dbUserCompany = context.Set<UserCompany>();
            _dbUserCompanyRole = context.Set<UserCompanyRole>();
            _dbInvitation = context.Set<Invitation>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            if (entity.GetType().Name == "OTP")
            {
                OTP otp = entity as OTP;

                if (otp == null)
                    return default(T);

                BO.OTP boOTP = new BO.OTP();
                boOTP.Pin = otp.Pin;
                BO.User boUser_ = new BusinessObjects.User();
                boUser_.ID = otp.UserID;
                boOTP.User = boUser_;
                return (T)(object)boOTP;
            }
                User user = entity as User;
            if (user == null)
                return default(T);

            BO.User boUser = new BO.User();

            boUser.UserName = user.UserName;
            boUser.ID = user.id;
            boUser.FirstName = user.FirstName;
            boUser.LastName = user.LastName;
            boUser.ImageLink = user.ImageLink;
            boUser.UserType = (BO.GBEnums.UserType)user.UserType;
            boUser.Gender = (BO.GBEnums.Gender)user.UserType;
            boUser.CreateByUserID = user.CreateByUserID;

            if (user.C2FactAuthEmailEnabled.HasValue)
                boUser.C2FactAuthEmailEnabled = user.C2FactAuthEmailEnabled.Value;
            if (user.C2FactAuthSMSEnabled.HasValue)
                boUser.C2FactAuthSMSEnabled = user.C2FactAuthSMSEnabled.Value;
            if (user.DateOfBirth.HasValue)
                boUser.DateOfBirth = user.DateOfBirth.Value;
            if (user.DateOfBirth.HasValue)
                boUser.DateOfBirth = user.DateOfBirth.Value;
            if (user.IsDeleted.HasValue)
                boUser.IsDeleted = System.Convert.ToBoolean(user.IsDeleted.Value);
            if (user.UpdateByUserID.HasValue)
                boUser.UpdateByUserID = user.UpdateByUserID.Value;

            if (user.AddressInfo != null)
            {
                BO.AddressInfo boAddress = new BO.AddressInfo();
                boAddress.Name = user.AddressInfo.Name;
                boAddress.Address1 = user.AddressInfo.Address1;
                boAddress.Address2 = user.AddressInfo.Address2;
                boAddress.City = user.AddressInfo.City;
                boAddress.State = user.AddressInfo.State;
                boAddress.ZipCode = user.AddressInfo.ZipCode;
                boAddress.Country = user.AddressInfo.Country;
                boAddress.CreateByUserID = user.AddressInfo.CreateByUserID;
                boAddress.ID = user.AddressInfo.id;
                boUser.AddressInfo = boAddress;
            }

            if (user.ContactInfo != null)
            {
                BO.ContactInfo boContactInfo = new BO.ContactInfo();
                boContactInfo.Name = user.ContactInfo.Name;
                boContactInfo.CellPhone = user.ContactInfo.CellPhone;
                boContactInfo.EmailAddress = user.ContactInfo.EmailAddress;
                boContactInfo.HomePhone = user.ContactInfo.HomePhone;
                boContactInfo.WorkPhone = user.ContactInfo.WorkPhone;
                boContactInfo.FaxNo = user.ContactInfo.FaxNo;
                boContactInfo.CreateByUserID = user.ContactInfo.CreateByUserID;
                boContactInfo.ID = user.ContactInfo.id;
                boUser.ContactInfo = boContactInfo;
            }

            return (T)(object)boUser;
        }
        #endregion

        #region Delete
        public override Object Delete<T>(T entity)
        {
            BO.User userBO = entity as BO.User;

            User userDB = new User();
            userDB.id = userBO.ID;
            _dbSet.Remove(_context.Users.Single<User>(p => p.id == userBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return userDB;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            dynamic result=null;
            if (typeof(T) == typeof(BO.AddUser))
            {
                BO.AddUser addUser = (BO.AddUser)(object)entity;
                result = addUser.Validate(addUser);
            }
            if (typeof(T) == typeof(BO.User))
            {
                BO.User addUser = (BO.User)(object)entity;
                result = addUser.Validate(addUser);
            }
            return result;
        }
        #endregion

        #region Save Data
        public override Object Save<T>(T entity)
        {
            BO.AddUser addUserBO = (BO.AddUser)(object)entity;
            BO.AddressInfo addressBO = addUserBO.address;
            BO.ContactInfo contactinfoBO = addUserBO.contactInfo;

            BO.User userBO = addUserBO.user;
            BO.Role roleBO = addUserBO.role;
            BO.Company companyBO = addUserBO.company;

            if (addUserBO.user == null)
            {
                return new BO.ErrorObject { ErrorMessage = "User object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            if (addUserBO.role == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Role object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            User userDB = new User();
            AddressInfo addressDB = new AddressInfo();
            ContactInfo contactinfoDB = new ContactInfo();
            UserCompany userCompanyDB = new UserCompany();
            UserCompanyRole userCompanyRoleDB = new UserCompanyRole();
            Role roleDB = new Role();
            Invitation invitationDB = new Invitation();

            #region Address
            if (addressBO != null)
            {
                addressDB.id = addressBO.ID;
                addressDB.Name = addressBO.Name;
                addressDB.Address1 = addressBO.Address1;
                addressDB.Address2 = addressBO.Address2;
                addressDB.City = addressBO.City;
                addressDB.State = addressBO.State;
                addressDB.ZipCode = addressBO.ZipCode;
                addressDB.Country = addressBO.Country;
            }
            #endregion

            #region Contact Info
            if (contactinfoBO != null)
            {
                contactinfoDB.id = contactinfoBO.ID;
                contactinfoDB.Name = contactinfoBO.Name;
                contactinfoDB.CellPhone = contactinfoBO.CellPhone;
                contactinfoDB.EmailAddress = contactinfoBO.EmailAddress;
                contactinfoDB.HomePhone = contactinfoBO.HomePhone;
                contactinfoDB.WorkPhone = contactinfoBO.WorkPhone;
                contactinfoDB.FaxNo = contactinfoBO.FaxNo;
                contactinfoDB.IsDeleted = contactinfoBO.IsDeleted;
            }
            #endregion

            #region User
            userDB.UserName = userBO.UserName;
            userDB.FirstName = userBO.FirstName;
            userDB.LastName = userBO.LastName;
            userDB.id = userBO.ID;
            userDB.Gender = System.Convert.ToByte(userBO.Gender);
            userDB.UserType = System.Convert.ToByte(userBO.UserType);
            userDB.ImageLink = userBO.ImageLink;
            userDB.UserStatus = System.Convert.ToByte(userBO.Status);
            if (userBO.DateOfBirth.HasValue)
                userDB.DateOfBirth = userBO.DateOfBirth.Value;
            userDB.Password = userBO.Password;

            if (userBO.IsDeleted.HasValue)
                userDB.IsDeleted = userBO.IsDeleted.Value;

            userDB.AddressInfo = addressDB;
            userDB.ContactInfo = contactinfoDB;

            #region Company
            if(companyBO!=null)
            if (companyBO.ID > 0)
            {
                Company company = _context.Companies.Where(p => p.id == companyBO.ID).FirstOrDefault<Company>();
                if (company != null)
                {
                    userCompanyDB.User = userDB;
                    userCompanyDB.Company = company;
                    invitationDB.Company = company;
                }
                else
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid company details.", ErrorLevel = ErrorLevel.Error };
            }
            #endregion

            #region Role
            roleDB.Name = roleBO.Name;
            roleDB.RoleType = System.Convert.ToByte(roleBO.RoleType);
            if (roleBO.IsDeleted.HasValue)
                roleDB.IsDeleted = roleBO.IsDeleted.Value;
            #endregion

            switch (userBO.UserType)
            {
                case MIDAS.GBX.BusinessObjects.GBEnums.UserType.Admin:
                    break;
                case MIDAS.GBX.BusinessObjects.GBEnums.UserType.Owner:
                    break;
                case MIDAS.GBX.BusinessObjects.GBEnums.UserType.Doctor:
                    break;
                case MIDAS.GBX.BusinessObjects.GBEnums.UserType.Patient:
                    break;
                case MIDAS.GBX.BusinessObjects.GBEnums.UserType.Attorney:
                    break;
                case MIDAS.GBX.BusinessObjects.GBEnums.UserType.Adjuster:
                    break;
                case MIDAS.GBX.BusinessObjects.GBEnums.UserType.Accounts:
                    break;
                default:
                    break;
            }
            #endregion

            if (userDB.id > 0)
            {
                //Find User By ID
                User usr = userDB.id > 0 ? _context.Users.Include("AddressInfo").Include("ContactInfo").Where(p => p.id == userDB.id).FirstOrDefault<User>() : _context.Users.Include("Address").Include("ContactInfo").Where(p => p.id == userDB.id).FirstOrDefault<User>();

                if (usr != null)
                {
                    #region User
                    if (userBO.UpdateByUserID.HasValue)
                        usr.UpdateByUserID = userBO.UpdateByUserID.Value;
                    usr.UpdateDate = DateTime.UtcNow;
                    usr.IsDeleted = userBO.IsDeleted;
                    usr.UserName = userBO.UserName == null ? usr.UserName : userBO.UserName;
                    usr.FirstName = userBO.FirstName == null ? usr.FirstName : userBO.FirstName;
                    usr.MiddleName = userBO.MiddleName == null ? usr.MiddleName : userBO.MiddleName;
                    usr.LastName = userBO.LastName == null ? usr.LastName : userBO.LastName;
                    usr.Gender = System.Convert.ToByte(userBO.Gender);
                    usr.UserType = System.Convert.ToByte(userBO.UserType);
                    usr.UserStatus = System.Convert.ToByte(userBO.Status);
                    usr.ImageLink = userBO.ImageLink;
                    usr.DateOfBirth = userBO.DateOfBirth;
                    if (userBO.Password != null)
                        usr.Password = PasswordHash.HashPassword(userBO.Password);
                    usr.IsDeleted = userBO.IsDeleted;
                    #endregion

                    #region Address
                    if (addressBO != null)
                    {
                        usr.AddressInfo.CreateByUserID = usr.CreateByUserID;
                        usr.AddressInfo.CreateDate = usr.CreateDate;
                        if (userBO.UpdateByUserID.HasValue)
                            usr.AddressInfo.UpdateByUserID = userBO.UpdateByUserID.Value;
                        usr.AddressInfo.UpdateDate = DateTime.UtcNow;
                        usr.AddressInfo.Name = addressBO.Name == null ? usr.AddressInfo.Name : addressBO.Name;
                        usr.AddressInfo.Address1 = addressBO.Address1 == null ? usr.AddressInfo.Address1 : addressBO.Address1;
                        usr.AddressInfo.Address2 = addressBO.Address2 == null ? usr.AddressInfo.Address2 : addressBO.Address2;
                        usr.AddressInfo.City = addressBO.City == null ? usr.AddressInfo.City : addressBO.City;
                        usr.AddressInfo.State = addressBO.State == null ? usr.AddressInfo.State : addressBO.State;
                        usr.AddressInfo.ZipCode = addressBO.ZipCode == null ? usr.AddressInfo.ZipCode : addressBO.ZipCode;
                        usr.AddressInfo.Country = addressBO.Country;
                    }
                    #endregion

                    #region Contact Info 
                    if (contactinfoBO != null)
                    {
                        usr.ContactInfo.CreateByUserID = usr.CreateByUserID;
                        usr.ContactInfo.CreateDate = usr.CreateDate;
                        if (userBO.UpdateByUserID.HasValue)
                            usr.ContactInfo.UpdateByUserID = userBO.UpdateByUserID.Value;
                        usr.ContactInfo.UpdateDate = DateTime.UtcNow;
                        usr.ContactInfo.Name = contactinfoBO.Name;
                        usr.ContactInfo.CellPhone = contactinfoBO.CellPhone;
                        usr.ContactInfo.EmailAddress = contactinfoBO.EmailAddress;
                        usr.ContactInfo.HomePhone = contactinfoBO.HomePhone;
                        usr.ContactInfo.WorkPhone = contactinfoBO.WorkPhone;
                        usr.ContactInfo.FaxNo = contactinfoBO.FaxNo;
                    }
                    #endregion
                }
                else
                {
                    return new BO.ErrorObject { ErrorMessage = "No record found for this user.", errorObject = "", ErrorLevel = ErrorLevel.Warning };
                }

                _context.Entry(usr).State = System.Data.Entity.EntityState.Modified;
                userDB = usr;
                _context.SaveChanges();

                BO.User usr_ = Convert<BO.User, User>(userDB);
                var res_ = (BO.GbObject)(object)usr_;
                return (object)res_;
            }
            else
            {
                if (_context.Users.Any(o => o.UserName == userBO.UserName))
                {
                    return new BO.ErrorObject { ErrorMessage = "User already exists.", errorObject = "", ErrorLevel = ErrorLevel.Information };
                }
                userDB.CreateDate = DateTime.UtcNow;
                userDB.CreateByUserID = userBO.CreateByUserID;

                addressDB.CreateDate = DateTime.UtcNow;
                addressDB.CreateByUserID = userBO.CreateByUserID;

                contactinfoDB.CreateDate = DateTime.UtcNow;
                contactinfoDB.CreateByUserID = userBO.CreateByUserID;

                _dbSet.Add(userDB);
            }

            _context.SaveChanges();

            #region Insert User Block
            userCompanyDB.CreateDate = DateTime.UtcNow;
            userCompanyDB.CreateByUserID = companyBO.CreateByUserID;
            _dbUserCompany.Add(userCompanyDB);
            _context.SaveChanges();
            #endregion

            #region Insert User Company Role
            userCompanyRoleDB.User = userCompanyDB.User;
            userCompanyRoleDB.Role = roleDB;
            userCompanyRoleDB.CreateDate = DateTime.UtcNow;
            userCompanyRoleDB.CreateByUserID = companyBO.CreateByUserID;
            _dbUserCompanyRole.Add(userCompanyRoleDB);
            _context.SaveChanges();
            #endregion

            #region Insert Invitation
            invitationDB.User = userCompanyDB.User;

            invitationDB.UniqueID = Guid.NewGuid();
            invitationDB.CreateDate = DateTime.UtcNow;
            invitationDB.CreateByUserID = companyBO.CreateByUserID;
            _dbInvitation.Add(invitationDB);
            _context.SaveChanges();
            #endregion

            BO.User acc_ = Convert<BO.User, User>(userDB);
            try
            {
                #region Send Email
                string VerificationLink = "<a href='" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB.UniqueID + "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB.UniqueID + "</a>";
                string Message = "Dear " + userBO.FirstName + ",<br><br>Thanks for registering with us.<br><br> Your user name is:- " + userBO.UserName + "<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";
                BO.Email objEmail = new BO.Email { ToEmail = userBO.UserName, Subject = "User registered", Body = Message };
                objEmail.SendMail();
                #endregion
            }
            catch (Exception ex)
            {

            }
            var res = (BO.GbObject)(object)acc_;
            return (object)res;
        }

        #endregion

        #region Get User By ID
        public override Object Get(int id)
        {
            var acc = _context.Users.Include("AddressInfo").Include("ContactInfo").Where(p => p.id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<User>();
            if(acc==null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this user.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                BO.User acc_ = Convert<BO.User, User>(acc);
                return (object)acc_;
            }

        }
        #endregion

        #region Login

        public override Object Login<T>(T entity)
        {
            BO.User userBO = (BO.User)(object)entity;

            string Pass = userBO.Password;
            dynamic data_ = _context.Users.Where(x => x.UserName == userBO.UserName).FirstOrDefault();
            if(data_==null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this user.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            bool isPasswordCorrect = false;
            try
            {
                isPasswordCorrect = PasswordHash.ValidatePassword(userBO.Password, ((User)data_).Password);

                if(!isPasswordCorrect)
                    return new BO.ErrorObject { ErrorMessage = "Invalid credentials.Please check details..", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            catch
            {
                return new BO.ErrorObject { ErrorMessage = "Invalid credentials.Please check details..", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
           
            BO.User acc_ = isPasswordCorrect ? Convert<BO.User, User>(data_) : null;
            if (!userBO.forceLogin)
            {
                if (acc_.C2FactAuthEmailEnabled)
                {

                    var otpOld = _context.OTPs.Where(p => p.UserID == acc_.ID).ToList<OTP>();
                    otpOld.ForEach(a => { a.IsDeleted = true; a.UpdateDate = DateTime.UtcNow; a.UpdateByUserID = System.Convert.ToInt32(Utility.GetConfigValue("DefaultAdminUserID")); });
                    if (otpOld != null)
                    {
                        _context.SaveChanges();
                    }

                    //Send OTP Via Email

                    OTP otpDB = new OTP();
                    otpDB.OTP1 = Utility.GenerateRandomNumber(6);
                    otpDB.Pin = Utility.GenerateRandomNo();
                    otpDB.UserID = acc_.ID;
                    otpDB.CreateDate = DateTime.UtcNow;
                    otpDB.CreateByUserID = System.Convert.ToInt32(Utility.GetConfigValue("DefaultAdminUserID"));

                    _dbOTP.Add(otpDB);
                    _context.SaveChanges();

                    string Message = "Dear " + acc_.UserName + ",<br><br>As per your request, a One Time Password (OTP) has been generated and the same is <i><b>" + otpDB.OTP1.ToString() + "</b></i><br><br>Please use this OTP to complete the Login. Reference number is " + otpDB.Pin.ToString() + " <br><br>*** This is an auto-generated email. Please do not reply to this email.*** <br><br>Thanks";

                    BO.Email objEmail = new BO.Email { ToEmail = acc_.UserName, Subject = "Alert Message From GBX MIDAS", Body = Message };
                    objEmail.SendMail();
                   
                    otpDB.UserID = acc_.ID;
                    otpDB.OTP1 = 0000;

                    BO.OTP boOTP = Convert<BO.OTP, OTP>(otpDB);
                    using (UserCompanyRepository sr = new UserCompanyRepository(_context))
                    {
                        BO.UserCompany usrComp = new BO.UserCompany();
                        usrComp.User = new BO.User();
                        usrComp.User.ID = acc_.ID;
                        boOTP.company = ((BO.UserCompany)sr.Get(usrComp)).Company;
                    }
                    boOTP.User = acc_;
                    return boOTP;
                }
                else if (acc_.C2FactAuthSMSEnabled)
                {
                    //Send OTP Via SMS
                }
            }

            BO.OTP boOTP_ = new BusinessObjects.OTP();
            using (UserCompanyRepository sr = new UserCompanyRepository(_context))
            {
                boOTP_.company = ((BO.UserCompany)sr.Get(acc_.ID)).Company;
            }
            boOTP_.User = acc_;
            return boOTP_;
        }
        #endregion

        #region Get By Filter
        public override object Get<T>(T entity)
        {
            BO.User userBO = (BO.User)(object)entity;
            List<BO.User> lstUsers = new List<BO.User>();

            if (userBO.UserCompanies != null)
            {
                if (userBO.UserCompanies[0].Company.ID > 0)
                {
                    int CompID = userBO.UserCompanies[0].Company.ID;
                    byte UserTpe = System.Convert.ToByte(userBO.UserType);
                    switch (userBO.UserType)
                    {
                        case BO.GBEnums.UserType.Attorney:
                        case BO.GBEnums.UserType.Adjuster:
                        case BO.GBEnums.UserType.Accounts:
                        case BO.GBEnums.UserType.Patient:
                        case BO.GBEnums.UserType.Admin:
                        case BO.GBEnums.UserType.Owner:
                        case BO.GBEnums.UserType.Doctor:

                            var data = _context.Users.Include("AddressInfo").Include("ContactInfo").Include("UserCompanies").Where(p => (p.IsDeleted == false || p.IsDeleted == null) && p.UserType == UserTpe && p.UserCompanies.Any(d => d.CompanyID == CompID)).ToList<User>();
                            if (data == null || data.Count == 0)
                                return new BO.ErrorObject { ErrorMessage = "No records found for this Company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                            foreach (User item in data)
                            {
                                lstUsers.Add(Convert<BO.User, User>(item));
                            }
                            return lstUsers;
                        default:
                            var data1 = _context.Users.Include("AddressInfo").Include("ContactInfo").Include("UserCompanies").Where(p => (p.IsDeleted == false || p.IsDeleted == null) && p.UserCompanies.Any(d => d.CompanyID == CompID)).ToList<User>();
                            if (data1 == null || data1.Count == 0)
                                return new BO.ErrorObject { ErrorMessage = "No records found for this Company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                            foreach (User item in data1)
                            {
                                lstUsers.Add(Convert<BO.User, User>(item));
                            }
                            return lstUsers;
                    }

                }
                return null;
            }
            else
            {
                switch (userBO.UserType)
                {
                    case BO.GBEnums.UserType.Attorney:
                    case BO.GBEnums.UserType.Adjuster:
                    case BO.GBEnums.UserType.Accounts:
                    case BO.GBEnums.UserType.Patient:
                    case BO.GBEnums.UserType.Admin:
                    case BO.GBEnums.UserType.Owner:
                    case BO.GBEnums.UserType.Doctor:
                        byte UserTpe = System.Convert.ToByte(userBO.UserType);
                        var acc_ = _context.Users.Include("AddressInfo").Include("ContactInfo").Include("UserCompanies").Where(p => (p.IsDeleted == false || p.IsDeleted == null) && p.UserType == UserTpe).ToList<User>();
                        if (acc_ == null || acc_.Count == 0)
                            return new BO.ErrorObject { ErrorMessage = "No records found for this user.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                        foreach (User item in acc_)
                        {
                            lstUsers.Add(Convert<BO.User, User>(item));
                        }

                        return lstUsers;
                    default:
                        {
                            var acc1 = _context.Users.Include("AddressInfo").Include("ContactInfo").Include("UserCompanies").Where(p => (p.IsDeleted == false || p.IsDeleted == null)).ToList<User>();
                            if (acc1 == null || acc1.Count == 0)
                                return new BO.ErrorObject { ErrorMessage = "No records found for this user.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                            foreach (User item in acc1)
                            {
                                lstUsers.Add(Convert<BO.User, User>(item));
                            }

                            return lstUsers;
                        }
                }
            }
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}
