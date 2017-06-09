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
            boUser.MiddleName = user.MiddleName;
            boUser.LastName = user.LastName;
            boUser.ImageLink = user.ImageLink;
            boUser.UserType = (BO.GBEnums.UserType)user.UserType;

            if (user.Gender.HasValue == true)
                boUser.Gender = (BO.GBEnums.Gender)user.Gender;

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
                //[STATECODE-CHANGE]
                boAddress.StateCode = user.AddressInfo.StateCode;
                //[STATECODE-CHANGE]
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
                boContactInfo.OfficeExtension = user.ContactInfo.OfficeExtension;
                boContactInfo.AlternateEmail = user.ContactInfo.AlternateEmail;
                boContactInfo.PreferredCommunication = user.ContactInfo.PreferredCommunication;


                boUser.ContactInfo = boContactInfo;
            }

            if (user.UserCompanies != null && user.UserCompanies.Count > 0)
            {
                List<BO.UserCompany> boUserCompany = new List<BO.UserCompany>();
                user.UserCompanies.Where(p => p.IsAccepted == true && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                  .ToList().ForEach(x => boUserCompany.Add(new BO.UserCompany() { CompanyId = x.CompanyID, UserId = x.UserID, UserStatusID = (BO.GBEnums.UserStatu)x.UserStatusID, CreateByUserID = x.CreateByUserID, ID = x.id, IsDeleted = x.IsDeleted, UpdateByUserID = x.UpdateByUserID }));
                boUser.UserCompanies = boUserCompany;
            }

            if (user.UserCompanyRoles != null)
            {
                List<BO.Role> roles = new List<BO.Role>();
                //user.UserCompanyRoles.ToList().ForEach(p => roles.Add(new BO.Role() { RoleType = (BO.GBEnums.RoleType)p.RoleID, Name = Enum.GetName(typeof(BO.GBEnums.RoleType), p.RoleID) }));
                user.UserCompanyRoles.Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                     .ToList().ForEach(p => roles.Add(new BO.Role() { ID = p.id, RoleType = (BO.GBEnums.RoleType)p.RoleID, Name = Enum.GetName(typeof(BO.GBEnums.RoleType),p.RoleID) }));
                boUser.Roles = roles;
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

        #region Delete
        public override Object Delete(int id)
        {
            var acc = _context.Users.Include("UserCompanies").Where(p => p.id == id
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                    .FirstOrDefault<User>();
            if (acc != null)
            {
               if(acc.UserCompanies!=null)
                {
                    foreach (var item in acc.UserCompanies)
                    {
                        if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                        {
                            using (UserCompanyRepository sr = new UserCompanyRepository(_context))
                            {
                                sr.Delete(item.id);
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

            var res = Convert<BO.User, User>(acc);
            return (object)res;         
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
            BO.User userBO = addUserBO.user;
            if (addUserBO.user == null) return new BO.ErrorObject { ErrorMessage = "User object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error };
            if (userBO.ID == 0) if (addUserBO.role == null) return new BO.ErrorObject { ErrorMessage = "Role object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error };            

            BO.AddressInfo addressBO = addUserBO.address;
            BO.ContactInfo contactinfoBO = addUserBO.contactInfo;
            BO.Role[] roleBO = addUserBO.role;
            BO.Company companyBO = addUserBO.company;
            foreach (Enum f in roleBO.Select(p => p.RoleType)) if (!Enum.IsDefined(typeof(BO.GBEnums.RoleType), f)) return new BO.ErrorObject { ErrorMessage = "RoleType does not exist.", errorObject = "", ErrorLevel = ErrorLevel.Warning };

            User userDB = new User();
            AddressInfo addressDB = new AddressInfo();
            ContactInfo contactinfoDB = new ContactInfo();
            UserCompany userCompanyDB = new UserCompany();
            UserCompanyRole userCompanyRoleDB = new UserCompanyRole();
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
                //[STATECODE-CHANGE]
                //addressDB.StateCode = addressBO.StateCode;
                //[STATECODE-CHANGE]
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
                contactinfoDB.OfficeExtension = contactinfoBO.OfficeExtension;
                contactinfoDB.AlternateEmail = contactinfoBO.AlternateEmail;
                contactinfoDB.PreferredCommunication = contactinfoBO.PreferredCommunication;
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
            userDB.Password = userBO.Password;
            userDB.AddressInfo = addressDB;
            userDB.ContactInfo = contactinfoDB;            
            if (userBO.DateOfBirth.HasValue) userDB.DateOfBirth = userBO.DateOfBirth.Value;
            if (userBO.IsDeleted.HasValue) userDB.IsDeleted = userBO.IsDeleted.Value;
            userDB.C2FactAuthEmailEnabled = true;

            #region Company
            if (companyBO != null)
                if (companyBO.ID > 0)
                {
                    Company company = _context.Companies.Where(p => p.id == companyBO.ID 
                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                     .FirstOrDefault<Company>();
                    if (company != null)
                    {
                        userCompanyDB.User = userDB;
                        userCompanyDB.Company = company;
                        userCompanyDB.UserStatusID = 1;
                        userCompanyDB.IsAccepted = true;
                        invitationDB.Company = company;
                    }
                    else return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid company details.", ErrorLevel = ErrorLevel.Error };
                }
            #endregion

            switch (userBO.UserType)
            {
                case MIDAS.GBX.BusinessObjects.GBEnums.UserType.Staff: break;
                default: break;
            }
            #endregion

            if (userDB.id > 0)
            {
                //Find User By ID
                User usr = userDB.id > 0 ? _context.Users.Include("AddressInfo").Include("ContactInfo").Include("UserCompanyRoles").Include("UserCompanies").Where(p => p.id == userDB.id).FirstOrDefault<User>() : _context.Users.Include("Address").Include("ContactInfo").Include("UserCompanyRoles").Where(p => p.id == userDB.id).FirstOrDefault<User>();

                List<int> companyRoles_New = roleBO.Select(p => (int)p.RoleType).ToList<int>();

                //Call for removing data
                List<UserCompanyRole> removeUserCompanyRoles = _context.UserCompanyRoles.Where(p => p.UserID == usr.id && !companyRoles_New.Contains(p.RoleID) && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList<UserCompanyRole>();
                if (removeUserCompanyRoles != null && removeUserCompanyRoles.Count > 0)
                {
                    removeUserCompanyRoles.ForEach(p => p.IsDeleted = true);
                    _context.SaveChanges();
                }

                List<int> existingUserCompanyRoles = _context.UserCompanyRoles.Where(p => p.UserID == usr.id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p => (int)p.RoleID).ToList<int>();
                //Call to insert data
                List<UserCompanyRole> insertUserCompanyRoles = companyRoles_New.Where(p => !existingUserCompanyRoles.Contains(p)).Select(p => new UserCompanyRole { UserID = usr.id, RoleID = p }).ToList<UserCompanyRole>();
                //foreach (var child in usr.UserCompanyRoles.ToList()) _context.UserCompanyRoles.Remove(child);

                if (insertUserCompanyRoles != null && insertUserCompanyRoles.Count > 0) insertUserCompanyRoles.ForEach(P => _context.UserCompanyRoles.Add(P));
                //usr.UserCompanyRoles = insertUserCompanyRoles;

                _context.SaveChanges();

                if (usr != null)
                {
                    #region User                    
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
                    if (userBO.UpdateByUserID.HasValue) usr.UpdateByUserID = userBO.UpdateByUserID.Value;
                    if (userBO.Password != null) usr.Password = PasswordHash.HashPassword(userBO.Password);
                    usr.IsDeleted = userBO.IsDeleted;
                    #endregion

                    #region Address
                    if (addressBO != null)
                    {
                        usr.AddressInfo.CreateByUserID = usr.CreateByUserID;
                        usr.AddressInfo.CreateDate = usr.CreateDate;
                        usr.AddressInfo.UpdateDate = DateTime.UtcNow;
                        usr.AddressInfo.Name = addressBO.Name == null ? usr.AddressInfo.Name : addressBO.Name;
                        usr.AddressInfo.Address1 = addressBO.Address1 == null ? usr.AddressInfo.Address1 : addressBO.Address1;
                        usr.AddressInfo.Address2 = addressBO.Address2 == null ? usr.AddressInfo.Address2 : addressBO.Address2;
                        usr.AddressInfo.City = addressBO.City == null ? usr.AddressInfo.City : addressBO.City;
                        usr.AddressInfo.State = addressBO.State == null ? usr.AddressInfo.State : addressBO.State;
                        usr.AddressInfo.ZipCode = addressBO.ZipCode == null ? usr.AddressInfo.ZipCode : addressBO.ZipCode;
                        usr.AddressInfo.Country = addressBO.Country;
                        //[STATECODE-CHANGE]
                        usr.AddressInfo.StateCode = addressBO.StateCode;
                        //[STATECODE-CHANGE]
                        if (userBO.UpdateByUserID.HasValue) usr.AddressInfo.UpdateByUserID = userBO.UpdateByUserID.Value;
                    }
                    #endregion

                    #region Contact Info 
                    if (contactinfoBO != null)
                    {
                        usr.ContactInfo.CreateByUserID = usr.CreateByUserID;
                        usr.ContactInfo.CreateDate = usr.CreateDate;
                        usr.ContactInfo.UpdateDate = DateTime.UtcNow;
                        usr.ContactInfo.Name = contactinfoBO.Name;
                        usr.ContactInfo.CellPhone = contactinfoBO.CellPhone;
                        usr.ContactInfo.EmailAddress = contactinfoBO.EmailAddress;
                        usr.ContactInfo.HomePhone = contactinfoBO.HomePhone;
                        usr.ContactInfo.WorkPhone = contactinfoBO.WorkPhone;
                        usr.ContactInfo.FaxNo = contactinfoBO.FaxNo;
                        if (userBO.UpdateByUserID.HasValue) usr.ContactInfo.UpdateByUserID = userBO.UpdateByUserID.Value;
                        usr.ContactInfo.OfficeExtension = contactinfoBO.OfficeExtension;
                        usr.ContactInfo.AlternateEmail = contactinfoBO.AlternateEmail;
                        usr.ContactInfo.PreferredCommunication = contactinfoBO.PreferredCommunication;

                    }
                    #endregion
                }
                else return new BO.ErrorObject { ErrorMessage = "No record found for this user.", errorObject = "", ErrorLevel = ErrorLevel.Warning };

                _context.Entry(usr).State = System.Data.Entity.EntityState.Modified;
                userDB = usr;
                _context.SaveChanges();

                BO.User usr_ = Convert<BO.User, User>(userDB);
                var res_ = (BO.GbObject)(object)usr_;
                return (object)res_;
            }
            else
            {
                if (_context.Users.Any(o => o.UserName == userBO.UserName && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false)))) return new BO.ErrorObject { ErrorMessage = "User already exists.", errorObject = "", ErrorLevel = ErrorLevel.Information };

                userDB.CreateDate = DateTime.UtcNow;
                userDB.CreateByUserID = userBO.CreateByUserID;

                addressDB.CreateDate = DateTime.UtcNow;
                addressDB.CreateByUserID = userBO.CreateByUserID;

                contactinfoDB.CreateDate = DateTime.UtcNow;
                contactinfoDB.CreateByUserID = userBO.CreateByUserID;

                _context.Users.Add(userDB);
            }

            _context.SaveChanges();

            #region Insert User Block
            if (userCompanyDB.Company.id > 0)
            {
                userCompanyDB.CreateDate = DateTime.UtcNow;
                userCompanyDB.CreateByUserID = companyBO.CreateByUserID;
                _dbUserCompany.Add(userCompanyDB);
                _context.SaveChanges();
            }
            else { return new BO.ErrorObject { ErrorMessage = "Please pass valid company details.", errorObject = "", ErrorLevel = ErrorLevel.Information }; }
            #endregion

            #region Insert User Company Role
            //userCompanyRoleDB.User = userCompanyDB.User;
            //userCompanyRoleDB.RoleID = (int)(roleBO.RoleType);
            //userCompanyRoleDB.CreateDate = DateTime.UtcNow;
            //userCompanyRoleDB.CreateByUserID = companyBO.CreateByUserID;
            //_dbUserCompanyRole.Add(userCompanyRoleDB);
            roleBO.ToList().ForEach(rl => _dbUserCompanyRole.Add(new UserCompanyRole()
            {
                CreateByUserID = userBO.CreateByUserID,
                CreateDate = DateTime.UtcNow,
                RoleID = (int)rl.RoleType,
                UserID = userDB.id,
                IsDeleted = false
            }));
            _context.SaveChanges();
            #endregion

            #region Insert Invitation
            invitationDB.User = userCompanyDB.User;
            invitationDB.UniqueID = Guid.NewGuid();
            invitationDB.CreateDate = DateTime.UtcNow;
            invitationDB.CreateByUserID = userBO.CreateByUserID;
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
            catch (Exception ex) { }

            var res = (BO.GbObject)(object)acc_;
            return (object)res;
        }

        #endregion

        #region Get User By ID
        public override Object Get(int id)
        {
            var acc = _context.Users.Include("AddressInfo").Include("ContactInfo").Include("UserCompanyRoles").Where(p => p.id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<User>();
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

        #region Is existing User
        public override Object Get(string user)
        {
            var acc = _context.Users.Include("AddressInfo").Include("ContactInfo").Include("UserCompanyRoles").Where(p => p.UserName == user && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<User>();
            if (acc == null)
            {
                return false;
            }
            else
            {
                return true;
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

            //Check if the User even if valid is logging as invalid User Type
            bool isUserTypeValid = false;
            try
            {
                if (userBO.UserType == (BO.GBEnums.UserType)((User)data_).UserType)
                {
                    isUserTypeValid = true;
                }
                //else if (userBO.UserType == 0) //Since ADMIN API dosent check for usertype. Need to be removed later.
                //{
                //    isUserTypeValid = true;
                //}

                if (!isUserTypeValid)
                    return new BO.ErrorObject { ErrorMessage = "Invalid user type. Please check details..", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            catch
            {
                return new BO.ErrorObject { ErrorMessage = "Invalid user type. Please check details..", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            //Check if the User even if valid is logging as invalid User Type
            BO.User acc_ = isPasswordCorrect && isUserTypeValid ? Convert<BO.User, User>(data_) : null;

            //bool UseOTP = true;
            //if (bool.TryParse(Utility.GetConfigValue("UseOTP"), out UseOTP))
            //{
            //    userBO.forceLogin = UseOTP;
            //}
            //userBO.forceLogin = true;

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
                        boOTP.usercompanies = ((List<BO.UserCompany>)sr.Get(usrComp)).ToList();
                    }
                    boOTP.User = acc_;

                    List<BO.Role> RoleBO1 = new List<BO.Role>();
                    var roles1 = _context.UserCompanyRoles.Where(p => p.UserID == acc_.ID && (p.IsDeleted.HasValue == false || p.IsDeleted == false)).ToList();
                    foreach (var item in roles1)
                    {
                        RoleBO1.Add(new BO.Role()
                        {
                            ID = item.RoleID,
                            Name = Enum.GetName(typeof(BO.GBEnums.RoleType), item.RoleID),
                            RoleType = (BO.GBEnums.RoleType)item.RoleID
                        });
                    }
                    boOTP.User.Roles = RoleBO1;
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
                BO.UserCompany usrComp = new BO.UserCompany();
                usrComp.User = new BO.User();
                usrComp.User.ID = acc_.ID;
                boOTP_.usercompanies = ((List<BO.UserCompany>)sr.Get(usrComp)).ToList();
            }
            boOTP_.User = acc_;

            List<BO.Role> RoleBO = new List<BO.Role>();
            var roles = _context.UserCompanyRoles.Where(p => p.UserID == acc_.ID && (p.IsDeleted.HasValue == false || p.IsDeleted == false)).ToList();
            foreach (var item in roles)
            {
                RoleBO.Add(new BO.Role()
                {
                    ID = item.RoleID,
                    Name = Enum.GetName(typeof(BO.GBEnums.RoleType), item.RoleID),
                    RoleType = (BO.GBEnums.RoleType)item.RoleID
                });
            }
            boOTP_.User.Roles = RoleBO;
            return boOTP_;
        }

        public override Object Login2<T>(T entity)
        {
            BO.User userBO = (BO.User)(object)entity;

            string Pass = userBO.Password;
            dynamic data_ = _context.Users.Where(x => x.UserName == userBO.UserName).FirstOrDefault();
            if (data_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this user.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            bool isPasswordCorrect = false;
            try
            {
                isPasswordCorrect = PasswordHash.ValidatePassword(userBO.Password, ((User)data_).Password);

                if (!isPasswordCorrect)
                    return new BO.ErrorObject { ErrorMessage = "Invalid credentials.Please check details..", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            catch
            {
                return new BO.ErrorObject { ErrorMessage = "Invalid credentials.Please check details..", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            //Check if the User even if valid is logging as invalid User Type
            BO.User acc_ = isPasswordCorrect ? Convert<BO.User, User>(data_) : null;
           
            return acc_;
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
                        case BO.GBEnums.UserType.Patient:
                        case BO.GBEnums.UserType.Staff:
                            var data = _context.Users.Include("AddressInfo").Include("ContactInfo").Include("UserCompanies").Include("UserCompanyRoles").Where(p => (p.IsDeleted == false || p.IsDeleted == null) && p.UserType == UserTpe && p.UserCompanies.Any(d => d.CompanyID == CompID)).ToList<User>();
                            if (data == null || data.Count == 0)
                                return new BO.ErrorObject { ErrorMessage = "No records found for this Company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                            foreach (User item in data)
                            {
                                lstUsers.Add(Convert<BO.User, User>(item));
                            }
                            return lstUsers;
                        default:
                            var data1 = _context.Users.Include("AddressInfo").Include("ContactInfo").Include("UserCompanies").Include("UserCompanyRoles").Where(p => p.UserType != 1 && (p.IsDeleted == false || p.IsDeleted == null) && p.UserCompanies.Any(d => d.CompanyID == CompID)).ToList<User>();
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
                    case BO.GBEnums.UserType.Patient:
                    case BO.GBEnums.UserType.Staff:
                        byte UserTpe = System.Convert.ToByte(userBO.UserType);
                        var acc_ = _context.Users.Include("AddressInfo").Include("ContactInfo").Include("UserCompanies").Include("UserCompanyRoles").Where(p => (p.IsDeleted == false || p.IsDeleted == null) && p.UserType == UserTpe).ToList<User>();
                        if (acc_ == null || acc_.Count == 0)
                            return new BO.ErrorObject { ErrorMessage = "No records found for this user.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                        foreach (User item in acc_)
                        {
                            lstUsers.Add(Convert<BO.User, User>(item));
                        }

                        return lstUsers;
                    default:
                        {
                            var acc1 = _context.Users.Include("AddressInfo").Include("ContactInfo").Include("UserCompanies").Include("UserCompanyRoles").Where(p => p.UserType != 1 && (p.IsDeleted == false || p.IsDeleted == null)).ToList<User>();
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

        #region ResetPassword
        public override Object ResetPassword<T>(T entity)
        {
            BO.AddUser addUserBO = (BO.AddUser)(object)entity;
            BO.User userBO = addUserBO.user;
            BO.Company companyBO = addUserBO.company;

            if (addUserBO.user == null)
            {
                return new BO.ErrorObject { ErrorMessage = "User object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            if (userBO.ID == 0)
            {
                return new BO.ErrorObject { ErrorMessage = "Invalid user id", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            User userDB = new User();
            Company companyDB = new Company();
            Invitation invitationDB = new Invitation();

            userDB = userBO.ID > 0 ? _context.Users.Where(p => p.id == userBO.ID).FirstOrDefault<User>() : null;

            var userCompany = _context.UserCompanies.Where(p => p.UserID == userBO.ID && p.CompanyID == companyBO.ID
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
                                                                
            companyDB = _context.Companies.Where(p => p.id == companyBO.ID
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                        .FirstOrDefault();

            if (companyBO == null)
            {
                userDB.Password = PasswordHash.HashPassword(userBO.Password);
            }
            else
            {
                if (_context.UserCompanies.Any(p => p.UserID == userBO.ID && p.CompanyID == companyBO.ID
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))) == true)
                {
                    if (companyDB.CompanyStatusTypeID == 2 && userCompany.UserStatusID == 2)
                    {
                        userDB.Password = PasswordHash.HashPassword(userBO.Password);
                        companyDB.CompanyStatusTypeID = 3;
                    }
                    else if (companyDB.CompanyStatusTypeID == 3 && userCompany.UserStatusID == 1)
                    {
                        userDB.Password = PasswordHash.HashPassword(userBO.Password);
                        userCompany.UserStatusID = 2;
                    }
                }
            }
            //if (companyBO == null)
            //{
            //    userDB.Password = PasswordHash.HashPassword(userBO.Password);
            //}
            //else
            //{
            //    if (_context.UserCompanies.Any(p => p.UserID == userBO.ID && p.CompanyID == companyBO.ID
            //                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))) == true)
            //    {
            //        companyDB = _context.Companies.Where(p => p.id == companyBO.ID
            //                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
            //                                            .FirstOrDefault();

            //        if (companyDB.CompanyStatusTypeID == 2)
            //        {
            //            userDB.Password = PasswordHash.HashPassword(userBO.Password);
            //            companyDB.CompanyStatusTypeID = 3;
            //        }
            //    }
            //}

            _context.SaveChanges();

            userDB = _context.Users.Where(p => p.id == userBO.ID).FirstOrDefault<User>();

            BO.User acc_ = Convert<BO.User, User>(userDB);

            var res = (BO.GbObject)(object)acc_;
            return (object)res;
        }

        #endregion
    }
}
