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
    internal class CompanyRepository : BaseEntityRepo,IDisposable
    {
        private DbSet<Company> _dbSet;
        private DbSet<User> _dbuser;
        private DbSet<UserCompany> _dbUserCompany;
        private DbSet<UserCompanyRole> _dbUserCompanyRole;
        private DbSet<Invitation> _dbInvitation;

        #region Constructor
        public CompanyRepository(MIDASGBXEntities context) : base(context)
        {
            _dbSet = context.Set<Company>();
            _dbuser = context.Set<User>();
            _dbUserCompany = context.Set<UserCompany>();
            _dbUserCompanyRole = context.Set<UserCompanyRole>();
            _dbInvitation = context.Set<Invitation>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            if (entity.GetType().Name == "Invitation")
            {
                BO.User boUser = new BO.User();
                Invitation invitation = entity as Invitation;
                if (invitation == null)
                    return default(T);

                BO.Invitation boInvitation = new BO.Invitation();
                boUser.ID = invitation.UserID;
                boInvitation.InvitationID = invitation.InvitationID;
                boInvitation.User = boUser;
                return (T)(object)boInvitation;
            }
            else
            {
                Company company = entity as Company;
                if (company == null)
                    return default(T);

                BO.Company boCompany = new BO.Company();

                boCompany.ID = company.id;
                boCompany.Name = company.Name;
                boCompany.TaxID = company.TaxID == null ? null : company.TaxID;
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

                if (company.Locations != null)
                {
                    List<BO.Location> lstLocation = new List<BO.Location>();
                    foreach (var item in company.Locations)
                    {
                        using (LocationRepository sr = new LocationRepository(_context))
                        {
                            BO.Location location = sr.Convert<BO.Location, Location>(item);
                            location.Company = null;
                            lstLocation.Add(location);
                        }
                    }

                    boCompany.Locations = lstLocation;
                }
                return (T)(object)boCompany;
            }


        }
        #endregion

        #region UpdateCompanysignup Conversion
        public T ConvertUpdateCompanySignUp<T, U>(U entity)
        {
            Company company = entity as Company;
            if (company == null)
                return default(T);

            BO.UpdateCompany updateCompanyBO = new BO.UpdateCompany();

            updateCompanyBO.Signup = new BO.Signup();
            if (company != null)
            {
                if (company.IsDeleted.HasValue == false || (company.IsDeleted.HasValue == true && company.IsDeleted.Value == false))
                {
                    BO.Company boCompany = new BO.Company();
                    using (CompanyRepository sr = new CompanyRepository(_context))
                    {
                        boCompany = sr.Convert<BO.Company, Company>(company);

                        updateCompanyBO.Signup.company = boCompany;
                    }
                }
            }

            if (company.ContactInfo != null)
            {

                BO.ContactInfo boContactInfo = new BO.ContactInfo();
                boContactInfo.ID = company.ContactInfo.id;
                boContactInfo.CellPhone = company.ContactInfo.CellPhone;
                boContactInfo.EmailAddress = company.ContactInfo.EmailAddress;

                updateCompanyBO.Signup.contactInfo = boContactInfo;

            }

            if (company.UserCompanies != null)
            {
                BO.User lstUser = new BO.User();
                if (company.UserCompanies.Count >= 1)
                {
                    var item = company.UserCompanies.FirstOrDefault();

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

                updateCompanyBO.Signup.user = lstUser;
            }

            return (T)(object)updateCompanyBO;
        }
        #endregion

        #region Delete
        public override Object Delete<T>(T entity)
        {
            BO.Company companyBO = entity as BO.Company;

            Company companyDB = new Company();
            companyDB.id = companyBO.ID;
            _dbSet.Remove(_context.Companies.Single<Company>(p => p.id == companyBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return companyDB;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Signup signUPBO = (BO.Signup)(object)entity;
            BO.Company companyBO = signUPBO.company;
            BO.User userBO = signUPBO.user;


            var result = companyBO.Validate(companyBO);
            return result;
        }
        #endregion

        #region Save Data
        public override object Save<T>(T data)
        {
            return base.Save(data);
        }
        #endregion

        #region Signup
        public override Object Signup<T>(T data)
        {
            BO.Signup signUPBO = (BO.Signup)(object)data;

            bool flagUser = false;

            BO.User userBO = signUPBO.user;
            BO.Company companyBO = signUPBO.company;
            BO.AddressInfo addressBO = signUPBO.addressInfo;
            BO.ContactInfo contactinfoBO = signUPBO.contactInfo;
            BO.Role roleBO = signUPBO.role;

            Company companyDB = new Company();
            User userDB = new User();
            AddressInfo addressDB = new AddressInfo();
            ContactInfo contactinfoDB = new ContactInfo();
            UserCompany userCompanyDB = new UserCompany();
            UserCompanyRole userCompanyRoleDB = new UserCompanyRole();
            Invitation invitationDB = new Invitation();

            if (string.IsNullOrEmpty(companyBO.TaxID) == false && _context.Companies.Any(o => o.TaxID == companyBO.TaxID))
            {
                return new BO.ErrorObject { ErrorMessage = "TaxID already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            if (_context.Companies.Any(o => o.Name == companyBO.Name))
            {
                return new BO.ErrorObject { ErrorMessage = "Company already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else if (_context.Users.Any(o => o.UserName == userBO.UserName))
            {
                flagUser = true;
            }

            #region Company

            companyDB.Name = companyBO.Name;
            companyDB.id = companyBO.ID;
            companyDB.TaxID = companyBO.TaxID;
            companyDB.Status = System.Convert.ToByte(companyBO.Status);
            companyDB.CompanyType = System.Convert.ToByte(companyBO.CompanyType);
            if (companyBO.SubsCriptionType.HasValue == true)
            {
                companyDB.SubscriptionPlanType = System.Convert.ToInt16(companyBO.SubsCriptionType);
            }
            else
            {
                companyDB.SubscriptionPlanType = null;
            }
            companyDB.CompanyStatusTypeID = 2; // CompanyStatusTypeID = 2 --- RegistrationComplete
            companyDB.BlobStorageTypeId = 1;

            if (companyDB.IsDeleted.HasValue)
                companyDB.IsDeleted = companyBO.IsDeleted.Value;

            #endregion

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
                if (contactinfoBO.IsDeleted.HasValue)
                    contactinfoDB.IsDeleted = contactinfoBO.IsDeleted;
            }
            #endregion

            #region User
            if (!flagUser)
            {
                userDB.UserName = userBO.UserName;
                userDB.MiddleName = userBO.MiddleName;
                userDB.FirstName = userBO.FirstName;
                userDB.LastName = userBO.LastName;
                userDB.Gender = System.Convert.ToByte(userBO.Gender);
                userDB.UserType = System.Convert.ToByte(userBO.UserType);
                userDB.C2FactAuthEmailEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactEmail"));
                userDB.C2FactAuthSMSEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactSMS"));
                userDB.ImageLink = userBO.ImageLink;
                if (userBO.DateOfBirth.HasValue)
                    userDB.DateOfBirth = userBO.DateOfBirth.Value;

                if (userBO.IsDeleted.HasValue)
                    userDB.IsDeleted = userBO.IsDeleted.Value;

                userDB.AddressInfo = addressDB;
                userDB.ContactInfo = contactinfoDB;
                userCompanyDB.User = userDB;
                userCompanyDB.IsAccepted = true;
            }
            else
            {
                //Find Record By Name
                User user_ = _context.Users.Where(p => p.UserName == userBO.UserName).FirstOrDefault<User>();
                userCompanyDB.User = user_;
                userCompanyDB.IsAccepted = true;
                _context.Entry(user_).State = System.Data.Entity.EntityState.Modified;
            }

            #endregion

            UserCompany cmp = new UserCompany();
            cmp.Company = companyDB;

            companyDB.AddressInfo = addressDB;
            companyDB.ContactInfo = contactinfoDB;

            if (companyDB.id > 0)
            {
                //For Update Record
            }
            else
            {
                companyDB.CreateDate = companyBO.CreateDate;
                companyDB.CreateByUserID = companyBO.CreateByUserID;

                userDB.CreateDate = companyBO.CreateDate;
                userDB.CreateByUserID = companyBO.CreateByUserID;

                addressDB.CreateDate = companyBO.CreateDate;
                addressDB.CreateByUserID = companyBO.CreateByUserID;

                contactinfoDB.CreateDate = companyBO.CreateDate;
                contactinfoDB.CreateByUserID = companyBO.CreateByUserID;

                _dbSet.Add(companyDB);
            }
            _context.SaveChanges();

            #region Insert User Block
            userCompanyDB.IsAccepted = true;
            userCompanyDB.Company = companyDB;
            userCompanyDB.UserStatusID = 1; //UserStatusID = 1 --- UserStatus Pending
            userCompanyDB.CreateDate = companyBO.CreateDate;
            userCompanyDB.CreateByUserID = companyBO.CreateByUserID;
            _dbUserCompany.Add(userCompanyDB);
            _context.SaveChanges();
            #endregion

            #region Insert User Company Role
            userCompanyRoleDB.User = userCompanyDB.User;
            userCompanyRoleDB.RoleID = (int)roleBO.RoleType;
            userCompanyRoleDB.CreateDate = companyBO.CreateDate;
            userCompanyRoleDB.CreateByUserID = companyBO.CreateByUserID;
            _dbUserCompanyRole.Add(userCompanyRoleDB);
            _context.SaveChanges();
            #endregion

            #region Insert Invitation
            invitationDB.User = userCompanyDB.User;
            invitationDB.Company = companyDB;
            invitationDB.UniqueID = Guid.NewGuid();
            invitationDB.CreateDate = companyBO.CreateDate;
            invitationDB.CreateByUserID = companyBO.CreateByUserID;
            _dbInvitation.Add(invitationDB);
            _context.SaveChanges();
            #endregion



            #region Update referral
            //var referral = _context.Referrals.Where(p => p.ReferredToEmail == userDB.UserName && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList<Referral>();

            //foreach (var eachReferral in referral)
            //{
            //    eachReferral.ReferredToCompanyId = companyDB.id;
            //    eachReferral.ReferralAccepted = true;
            //}

            _context.SaveChanges();
            #endregion

            BO.Company acc_ = Convert<BO.Company, Company>(companyDB);
            try
            {
                //#region Send Email

                //string VerificationLink = "<a href='"+ Utility.GetConfigValue("VerificationLink") + "/"+invitationDB.UniqueID+ "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB.UniqueID + "</a>";
                //string Message = "Dear " + userBO.FirstName + ",<br><br>Thanks for registering with us.<br><br> Your user name is:- " + userBO.UserName + "<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink+"</b><br><br>Thanks";
                //BO.Email objEmail = new BO.Email { ToEmail = userBO.UserName, Subject = "Company registered", Body = Message };
                //objEmail.SendMail();
                //#endregion

                #region Notification and messaging code for Medical provider
                if (companyBO.CompanyType == BO.GBEnums.CompanyType.MedicalProvider)
                {
                    #region notification for Add Company
                    try
                    {
                 
                        string VerificationLink = "<a href='" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB.UniqueID + "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB.UniqueID + "</a>";
                    
                        string MailMessageForCompany = "Dear " + userBO.FirstName + ",<br><br>You have been registered in midas portal as a Medical Provider. <br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";
                        string NotificationForCompany = "You have been registered in midas portal as a Medical Provider. ";
                        string SmsMessageForCompany = "Dear " + userBO.FirstName + ",<br><br>You have been registered in midas portal as a Medical provider. <br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";
                                                              
                        NotificationHelper nh = new NotificationHelper();
                        MessagingHelper mh = new MessagingHelper();

                        #region Send notification                       
                                #region  company mail object                 
                                BO.EmailMessage emCompany = new BO.EmailMessage();
                                 emCompany.ApplicationName = "Midas";
                                 emCompany.ToEmail = userBO.UserName;
                                 emCompany.EMailSubject = "MIDAS Notification";
                                 emCompany.EMailBody = MailMessageForCompany;
                                #endregion

                                #region company sms object
                                BO.SMS smsCompany = new BO.SMS();
                                  smsCompany.ApplicationName = "Midas";
                                  smsCompany.ToNumber = contactinfoBO.CellPhone;
                                  smsCompany.Message = SmsMessageForCompany;
                                #endregion

                                nh.PushNotification(userBO.UserName, companyBO.ID, NotificationForCompany, "New Patient Registration");
                                mh.SendEmailAndSms(userBO.UserName, companyBO.ID, emCompany, smsCompany);                         
                       
                        #endregion
                    }
                    catch (Exception ex)
                    {
                    }
                    #endregion
                }
                #endregion
                #region Notification and messaging code for Attorney provider
                if (companyBO.CompanyType == BO.GBEnums.CompanyType.Attorney)
                {
                    #region notification for Add Company
                    try
                    {

                        string VerificationLink = "<a href='" + Utility.GetConfigValue("AttorneyVerificationLink") + "/" + invitationDB.UniqueID + "' target='_blank'>" + Utility.GetConfigValue("AttorneyVerificationLink") + "/" + invitationDB.UniqueID + "</a>";

                        string MailMessageForCompany = "Dear " + userBO.FirstName + ",<br><br>You have been registered in midas portal as a Attorney Provider. <br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";
                        string NotificationForCompany = "You have been registered in midas portal as a Attorney Provider. ";
                        string SmsMessageForCompany = "Dear " + userBO.FirstName + ",<br><br>You have been registered in midas portal as a Attorney provider. <br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";

                        NotificationHelper nh = new NotificationHelper();
                        MessagingHelper mh = new MessagingHelper();

                        #region Send notification                       
                        #region  company mail object                 
                        BO.EmailMessage emStaff = new BO.EmailMessage();
                        emStaff.ApplicationName = "Midas";
                        emStaff.ToEmail = userBO.UserName;
                        emStaff.EMailSubject = "MIDAS Notification";
                        emStaff.EMailBody = MailMessageForCompany;
                        #endregion

                        #region company sms object
                        BO.SMS smsStaff = new BO.SMS();
                        smsStaff.ApplicationName = "Midas";
                        smsStaff.ToNumber = contactinfoBO.CellPhone;
                        smsStaff.Message = SmsMessageForCompany;
                        #endregion

                        nh.PushNotification(userBO.UserName, companyBO.ID, NotificationForCompany, "New Patient Registration");
                        mh.SendEmailAndSms(userBO.UserName, companyBO.ID, emStaff, smsStaff);

                        #endregion
                    }
                    catch (Exception ex)
                    {
                    }
                    #endregion
                }
                #endregion
                #region Notification and messaging code for Ancillar provider
                if (companyBO.CompanyType == BO.GBEnums.CompanyType.Ancillary)
                {
                    #region notification for Add Company
                    try
                    {

                        string VerificationLink = "<a href='" + Utility.GetConfigValue("AncillaryVerificationLink") + "/" + invitationDB.UniqueID + "' target='_blank'>" + Utility.GetConfigValue("AncillaryVerificationLink") + "/" + invitationDB.UniqueID + "</a>";

                        string MailMessageForCompany = "Dear " + userBO.FirstName + ",<br><br>You have been registered in midas portal as a Ancillary Provider. <br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";
                        string NotificationForCompany = "You have been registered in midas portal as a Ancillary Provider. ";
                        string SmsMessageForCompany = "Dear " + userBO.FirstName + ",<br><br>You have been registered in midas portal as a Ancillary provider. <br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";

                        NotificationHelper nh = new NotificationHelper();
                        MessagingHelper mh = new MessagingHelper();

                        #region Send notification                       
                        #region  company mail object                 
                        BO.EmailMessage emStaff = new BO.EmailMessage();
                        emStaff.ApplicationName = "Midas";
                        emStaff.ToEmail = userBO.UserName;
                        emStaff.EMailSubject = "MIDAS Notification";
                        emStaff.EMailBody = MailMessageForCompany;
                        #endregion

                        #region company sms object
                        BO.SMS smsStaff = new BO.SMS();
                        smsStaff.ApplicationName = "Midas";
                        smsStaff.ToNumber = contactinfoBO.CellPhone;
                        smsStaff.Message = SmsMessageForCompany;
                        #endregion

                        nh.PushNotification(userBO.UserName, companyBO.ID, NotificationForCompany, "New Patient Registration");
                        mh.SendEmailAndSms(userBO.UserName, companyBO.ID, emStaff, smsStaff);

                        #endregion
                    }
                    catch (Exception ex)
                    {
                    }
                    #endregion
                }
                #endregion
            }
            catch (Exception ex)
            {
                //Message sending failed
            }


            var res = (BO.GbObject)(object)acc_;
            return (object)res;
        }
        #endregion

        #region UpdateCompany
        public override Object UpdateCompany<T>(T data)
        {
            BO.Signup signUPBO = (BO.Signup)(object)data;

            BO.User userBO = signUPBO.user;
            BO.Company companyBO = signUPBO.company;
            BO.AddressInfo addressBO = signUPBO.addressInfo;
            BO.ContactInfo contactinfoBO = signUPBO.contactInfo;
            BO.Role roleBO = signUPBO.role;
            Guid invitationDB_UniqueID = Guid.NewGuid();

            Company companyDB = new Company();
            User userDB = new User();
            AddressInfo addressDB = new AddressInfo();
            ContactInfo contactinfoDB = new ContactInfo();
            UserCompany userCompanyDB = new UserCompany();
            UserCompanyRole userCompanyRoleDB = new UserCompanyRole();
            Invitation invitationDB = new Invitation();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                if (signUPBO == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (signUPBO.company == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (signUPBO.user == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (signUPBO.contactInfo == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                #region Company

                companyDB = _context.Companies.Where(p => p.id == companyBO.ID 
                                                               && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                        .FirstOrDefault();

                if (companyDB == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "Company Record Not Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                companyDB.TaxID = companyBO.TaxID;

                if (companyBO.SubsCriptionType != null)
                {
                    companyDB.SubscriptionPlanType = (int)companyBO.SubsCriptionType;
                }
                else
                {
                    companyDB.SubscriptionPlanType = null;
                }
                
                companyDB.CompanyStatusTypeID = 2; // CompanyStatusTypeID = 2 --- RegistrationComplete

                _context.SaveChanges();
                        

                #endregion

                #region contactInfo
                contactinfoDB = _context.ContactInfoes.Where(p => p.id == contactinfoBO.ID
                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                      .FirstOrDefault();

                if (contactinfoDB == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "Contact Record Not Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                contactinfoDB.CellPhone = contactinfoBO.CellPhone;

                _context.SaveChanges();

                #endregion

                #region User
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
                userDB.C2FactAuthEmailEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactEmail"));
                userDB.C2FactAuthSMSEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactSMS"));

                #region password

                BO.ResetPassword resetPassword = new BO.ResetPassword();
                resetPassword.OldPassword = userDB.Password;
                //if (userDB != null)
                //{
                //        resetPassword.NewPassword = PasswordHash.HashPassword(userBO.Password);
                //        userDB.Password = resetPassword.NewPassword;
                // }
                if (userDB != null)
                {
                    if (companyDB.CompanyStatusTypeID == 2) //CompanyStatusTypeID == 2 --- Registration Complete 
                    {
                        resetPassword.NewPassword = PasswordHash.HashPassword(userBO.Password);
                        userDB.Password = resetPassword.NewPassword;
                        companyDB.CompanyStatusTypeID = 3; //CompanyStatusTypeID = 3 --- Active
                    }
                }
                #endregion

                _context.SaveChanges();

                userDB = _context.Users.Where(p => p.id == userBO.ID 
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                .FirstOrDefault();

                #endregion

                dbContextTransaction.Commit();
            }

            BO.Company acc_ = Convert<BO.Company, Company>(companyDB);

            try
            {
                if (userDB != null)
                {
                    var updateCompany = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "CompanyUpdated".ToUpper()).FirstOrDefault();

                    if (updateCompany == null)
                    {
                        return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        //#region Send mail to attorney
                        //string msg1 = updateCompany.EmailBody;
                        //string subject1 = updateCompany.EmailSubject;

                        //string message1 = string.Format(msg1, userDB.FirstName);

                        //BO.Email objEmail1 = new BO.Email { ToEmail = userDB.UserName, Subject = subject1, Body = message1 };
                        //objEmail1.SendMail();
                        //#endregion

                        #region Notification and messaging code for Medical provider
                        if (companyBO.CompanyType == BO.GBEnums.CompanyType.MedicalProvider)
                        {
                            #region notification for update Company
                            try
                            {

                                //string VerificationLink = "<a href='" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB.UniqueID + "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB.UniqueID + "</a>";

                                string MailMessageForCompany = "Dear " + userBO.FirstName + "<br><br>Company details have been modified successfully.</b><br><br>Thanks";
                                string NotificationForCompany = "Company details have been modified successfully.";
                                string SmsMessageForCompany = "Dear " + userBO.FirstName + "<br><br>Company details have been modified successfully.</b><br><br>Thanks";

                                NotificationHelper nh = new NotificationHelper();
                                MessagingHelper mh = new MessagingHelper();

                                #region Send notification                       
                                #region  company mail object                 
                                BO.EmailMessage emCompany = new BO.EmailMessage();
                                emCompany.ApplicationName = "Midas";
                                emCompany.ToEmail = userBO.UserName;
                                emCompany.EMailSubject = "MIDAS Notification";
                                emCompany.EMailBody = MailMessageForCompany;
                                #endregion

                                #region company sms object
                                BO.SMS smsCompany = new BO.SMS();
                                smsCompany.ApplicationName = "Midas";
                                smsCompany.ToNumber = contactinfoBO.CellPhone;
                                smsCompany.Message = SmsMessageForCompany;
                                #endregion

                                nh.PushNotification(userBO.UserName, companyBO.ID, NotificationForCompany, "New Patient Registration");
                                mh.SendEmailAndSms(userBO.UserName, companyBO.ID, emCompany, smsCompany);

                                #endregion
                            }
                            catch (Exception ex)
                            {
                            }
                            #endregion
                        }
                        #endregion
                        #region Notification and messaging code for Attorney provider
                        if (companyBO.CompanyType == BO.GBEnums.CompanyType.Attorney)
                        {
                            #region notification for Update Company
                            try
                            {

                                string MailMessageForCompany = "Dear " + userBO.FirstName + "<br><br>Company details have been modified successfully.</b><br><br>Thanks";
                                string NotificationForCompany = "Company details have been modified successfully.";
                                string SmsMessageForCompany = "Dear " + userBO.FirstName + "<br><br>Company details have been modified successfully.</b><br><br>Thanks";

                                NotificationHelper nh = new NotificationHelper();
                                MessagingHelper mh = new MessagingHelper();

                                #region Send notification                       
                                #region  company mail object                 
                                BO.EmailMessage emStaff = new BO.EmailMessage();
                                emStaff.ApplicationName = "Midas";
                                emStaff.ToEmail = userBO.UserName;
                                emStaff.EMailSubject = "MIDAS Notification";
                                emStaff.EMailBody = MailMessageForCompany;
                                #endregion

                                #region company sms object
                                BO.SMS smsStaff = new BO.SMS();
                                smsStaff.ApplicationName = "Midas";
                                smsStaff.ToNumber = contactinfoBO.CellPhone;
                                smsStaff.Message = SmsMessageForCompany;
                                #endregion

                                nh.PushNotification(userBO.UserName, companyBO.ID, NotificationForCompany, "New Patient Registration");
                                mh.SendEmailAndSms(userBO.UserName, companyBO.ID, emStaff, smsStaff);

                                #endregion
                            }
                            catch (Exception ex)
                            {
                            }
                            #endregion
                        }
                        #endregion
                        #region Notification and messaging code for Ancillar provider
                        if (companyBO.CompanyType == BO.GBEnums.CompanyType.Ancillary)
                        {
                            #region notification for Update Company
                            try
                            {

                                string MailMessageForCompany = "Dear " + userBO.FirstName + "<br><br>Company details have been modified successfully.</b><br><br>Thanks";
                                string NotificationForCompany = "Company details have been modified successfully.";
                                string SmsMessageForCompany = "Dear " + userBO.FirstName + "<br><br>Company details have been modified successfully.</b><br><br>Thanks";

                                NotificationHelper nh = new NotificationHelper();
                                MessagingHelper mh = new MessagingHelper();

                                #region Send notification                       
                                #region  company mail object                 
                                BO.EmailMessage emStaff = new BO.EmailMessage();
                                emStaff.ApplicationName = "Midas";
                                emStaff.ToEmail = userBO.UserName;
                                emStaff.EMailSubject = "MIDAS Notification";
                                emStaff.EMailBody = MailMessageForCompany;
                                #endregion

                                #region company sms object
                                BO.SMS smsStaff = new BO.SMS();
                                smsStaff.ApplicationName = "Midas";
                                smsStaff.ToNumber = contactinfoBO.CellPhone;
                                smsStaff.Message = SmsMessageForCompany;
                                #endregion

                                nh.PushNotification(userBO.UserName, companyBO.ID, NotificationForCompany, "New Patient Registration");
                                mh.SendEmailAndSms(userBO.UserName, companyBO.ID, emStaff, smsStaff);

                                #endregion
                            }
                            catch (Exception ex)
                            {
                            }
                            #endregion
                        }
                        #endregion
                    }
                }

            }
            catch (Exception ex) { }

            var res = (BO.GbObject)(object)acc_;
            return (object)res;
        }
        #endregion

        #region Get RegisteredCompany by Id
        public override Object GetUpdatedCompanyById(int CompanyId)
        {
            var company = _context.Companies.Include("ContactInfo")
                                            .Include("UserCompanies.User")
                                            .Where(p => p.id == CompanyId
                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                            .FirstOrDefault();

            BO.UpdateCompany boUpdateCompany = new BO.UpdateCompany();

            if (company == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                boUpdateCompany = ConvertUpdateCompanySignUp<BO.UpdateCompany, Company>(company);
            }

            return boUpdateCompany;
        }
        #endregion

        #region Get Company By ID
        public override Object Get(int id)
        {
            BO.Company acc_ = Convert<BO.Company, Company>(_context.Companies.Where(p => p.id == id).FirstOrDefault<Company>());
            return acc_;
        }
        #endregion

        #region Get All Companies
        public override Object Get()
        {
            var acc_ = _context.Companies.Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)).OrderBy(p => p.Name).ToList<Company>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.Company> lstCompanies = new List<BO.Company>();
            foreach (Company item in acc_)
            {
                lstCompanies.Add(Convert<BO.Company, Company>(item));
            }
            return lstCompanies;
        }
        #endregion

        #region Get All Company and their Location
        public override Object GetAllCompanyAndLocation()
        {
            var acc_ = _context.Companies.Include("Locations").Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)).ToList<Company>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.Company> lstCompanies = new List<BO.Company>();
            foreach (Company item in acc_)
            {
                lstCompanies.Add(Convert<BO.Company, Company>(item));
            }
            return lstCompanies;
        }
        #endregion      

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
