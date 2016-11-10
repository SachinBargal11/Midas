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
using static MIDAS.GBX.BusinessObjects.GBEnums;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class UserRepository : BaseEntityRepo
    {
        private DbSet<User> _dbSet;
        private DbSet<OTP> _dbOTP;
        #region Constructor
        public UserRepository(MIDASGBXEntities context) : base(context)
        {
            _dbSet = context.Set<User>();
            _dbOTP= context.Set<OTP>();
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
                boOTP.StatusCode = System.Net.HttpStatusCode.Accepted;
                BO.User boUser_ = new BusinessObjects.User();
                boUser_.ID = otp.UserID;
                boOTP.Message = "OTP sent";
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
            boUser.CreateDate = user.CreateDate;

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
            if (user.UpdateDate.HasValue)
                boUser.UpdateDate = user.UpdateDate.Value;

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
                boAddress.CreateDate = user.AddressInfo.CreateDate;
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
                boContactInfo.CreateDate = user.ContactInfo.CreateDate;
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

        #region Save Data
        public override Object Save(JObject data)
        {
            BO.AddressInfo addressBO;
            BO.ContactInfo contactinfoBO;

            BO.User userBO = data["user"].ToObject<BO.User>();

            addressBO = data["addressInfo"] == null ? new BO.AddressInfo() : data["address"].ToObject<BO.AddressInfo>();
            contactinfoBO = data["contactinfo"] == null ? new BO.ContactInfo() : data["contactinfo"].ToObject<BO.ContactInfo>();

            User userDB = new User();
            AddressInfo addressDB = new AddressInfo();
            ContactInfo contactinfoDB = new ContactInfo();

                           if (_context.Users.Any(o => o.UserName == userBO.UserName))
                {
                    return new BO.GbObject { Message = Constants.UserAlreadyExists };
                }

            #region Address
            addressDB.id = addressBO.ID;
            addressDB.Name = addressBO.Name;
            addressDB.Address1 = addressBO.Address1;
            addressDB.Address2 = addressBO.Address2;
            addressDB.City = addressBO.City;
            addressDB.State = addressBO.State;
            addressDB.ZipCode = addressBO.ZipCode;
            addressDB.Country = addressBO.Country;
            #endregion

            #region Contact Info
            contactinfoDB.id = contactinfoBO.ID;
            contactinfoDB.Name = contactinfoBO.Name;
            contactinfoDB.CellPhone = contactinfoBO.CellPhone;
            contactinfoDB.EmailAddress = contactinfoBO.EmailAddress;
            contactinfoDB.HomePhone = contactinfoBO.HomePhone;
            contactinfoDB.WorkPhone = contactinfoBO.WorkPhone;
            contactinfoDB.FaxNo = contactinfoBO.FaxNo;
            contactinfoDB.IsDeleted = contactinfoBO.IsDeleted;
            #endregion

            #region User
            userDB.UserName = userBO.UserName;
            userDB.FirstName = userBO.FirstName;
            userDB.LastName = userBO.LastName;
            userDB.id = userBO.ID;
            userDB.Gender = System.Convert.ToByte(userBO.Gender);
            userDB.UserType = System.Convert.ToByte(userBO.UserType);
            userDB.ImageLink = userBO.ImageLink;
            userDB.UserStatus= System.Convert.ToByte(userBO.Status);
            if (userBO.DateOfBirth.HasValue)
                userDB.DateOfBirth = userBO.DateOfBirth.Value;
            userDB.Password = userBO.Password;

            if (userBO.IsDeleted.HasValue)
                userDB.IsDeleted = userBO.IsDeleted.Value;

            userDB.AddressInfo = addressDB;
            userDB.ContactInfo = contactinfoDB;
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
                    usr.UserName = userBO.UserName==null?usr.UserName: userBO.UserName;
                    usr.FirstName = userBO.FirstName == null ? usr.FirstName : userBO.FirstName;
                    usr.MiddleName = userBO.MiddleName == null? usr.MiddleName : userBO.MiddleName;
                    usr.LastName = userBO.LastName == null ? usr.LastName : userBO.LastName;
                    usr.Gender = System.Convert.ToByte(userBO.Gender);
                    usr.UserType = System.Convert.ToByte(userBO.UserType);
                    usr.UserStatus = System.Convert.ToByte(userBO.Status);
                    usr.ImageLink = userBO.ImageLink;
                    usr.DateOfBirth = userBO.DateOfBirth;
                    usr.Password = PasswordHash.HashPassword(userBO.Password);
                    usr.IsDeleted = userBO.IsDeleted;
                    #endregion

                    #region Address
                    usr.AddressInfo.CreateByUserID = usr.CreateByUserID;
                    usr.AddressInfo.CreateDate = usr.CreateDate;
                    if (userBO.UpdateByUserID.HasValue)
                        usr.AddressInfo.UpdateByUserID = userBO.UpdateByUserID.Value;
                    usr.AddressInfo.UpdateDate = DateTime.UtcNow;
                    usr.AddressInfo.Name = addressBO.Name;
                    usr.AddressInfo.Address1 = addressBO.Address1;
                    usr.AddressInfo.Address2 = addressBO.Address2;
                    usr.AddressInfo.City = addressBO.City;
                    usr.AddressInfo.State = addressBO.State;
                    usr.AddressInfo.ZipCode = addressBO.ZipCode;
                    usr.AddressInfo.Country = addressBO.Country;
                    #endregion

                    #region Contact Info
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
                    #endregion
                }
                else
                {
                    throw new GbException();
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
                userDB.CreateDate = DateTime.UtcNow;
                userDB.CreateByUserID = userBO.CreateByUserID;

                addressDB.CreateDate = DateTime.UtcNow;
                addressDB.CreateByUserID = userBO.CreateByUserID;

                contactinfoDB.CreateDate = DateTime.UtcNow;
                contactinfoDB.CreateByUserID = userBO.CreateByUserID;

                _dbSet.Add(userDB);
            }

            _context.SaveChanges();
            BO.User acc_ = Convert<BO.User, User>(userDB);
            try
            {
                #region Send Email
                string Message = "Dear " + userBO.FirstName + "," + Environment.NewLine + "Your user name is:- " + userBO.UserName + "" + Environment.NewLine + "Password:-" + userDB.Password + Environment.NewLine + "Thanks";
                Utility.SendEmail(Message, "User registered", userBO.UserName);
                acc_.Message = "Mail sent";
                #endregion
            }
            catch (Exception ex)
            {
                acc_.ErrorMessage = "Unable to send email.";

            }
            var res = (BO.GbObject)(object)acc_;
            return (object)res;
        }
        #endregion

        #region Get User By ID
        public override Object Get(int id)
        {
            BO.User acc_ = Convert<BO.User, User>(_context.Users.Include("Address").Include("ContactInfo").Where(p => p.id == id).FirstOrDefault<User>());
            return (object)acc_;
        }
        #endregion

        #region Login
        public override Object Login(JObject entity)
        {
            BO.User userBO = entity["user"].ToObject<BO.User>();
            string Pass = userBO.Password;
            dynamic data_ = _context.Users.Where(x => x.UserName == userBO.UserName).FirstOrDefault();
            if(data_==null)
            {
                return new BO.User { ErrorMessage = "No record found for this username.", StatusCode = System.Net.HttpStatusCode.NotFound };
            }
            bool isPasswordCorrect = false;
            try
            {
                isPasswordCorrect = PasswordHash.ValidatePassword(userBO.Password, ((User)data_).Password);
            }
            catch
            {
                return new BO.User { ErrorMessage = "Invalid credentials.Please check your password", StatusCode = System.Net.HttpStatusCode.NotFound };
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
                    Utility.SendEmail(Message, "Alert Message From GBX MIDAS", userBO.UserName);
                    acc_.Message = "OTP sent";
                    acc_.StatusCode = System.Net.HttpStatusCode.Accepted;

                    otpDB.UserID = acc_.ID;
                    otpDB.OTP1 = 0000;

                    BO.OTP boOTP = Convert<BO.OTP, OTP>(otpDB);
                    boOTP.User = acc_;
                    return boOTP;
                }
                else if (acc_.C2FactAuthSMSEnabled)
                {
                    //Send OTP Via SMS
                }
            }
            if(acc_!=null)
            acc_.StatusCode = System.Net.HttpStatusCode.Created;
            else
                acc_.StatusCode = System.Net.HttpStatusCode.NotFound;

            BO.OTP boOTP_ = new BusinessObjects.OTP();
            boOTP_.User = acc_;
            boOTP_.StatusCode = System.Net.HttpStatusCode.Created;
            return boOTP_;
        }
        #endregion

        #region Get Users By parameters
        public override object Get(JObject entity)
        {
            //To Do Search Query
            BO.User userBO = entity["user"].ToObject<BO.User>();

            dynamic data_ = _context.Users.Where(x => x.UserName == userBO.UserName).FirstOrDefault();
            if (data_ == null)
            {
                return new BO.User { ErrorMessage = "No record found for this username.", StatusCode = System.Net.HttpStatusCode.NotFound };
            }
            else
            {
                BO.User user = Convert<BO.User, User>(data_);
                user.StatusCode = System.Net.HttpStatusCode.Created;
                return user;
            }

        }
        #endregion
    }
}