using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.Common;

namespace MIDAS.GBX.DataRepository.EntityRepository.Common
{
    internal class AttorneyMasterRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<Attorney> _dbAttorney;
        private DbSet<AddressInfo> _dbAttorneyAddressInfo;
        private DbSet<ContactInfo> _dbAttorneyContactInfo;

        public AttorneyMasterRepository(MIDASGBXEntities context) : base(context)
        {
            _dbAttorney = context.Set<Attorney>();
            _dbAttorneyAddressInfo = context.Set<AddressInfo>();
            _dbAttorneyContactInfo = context.Set<ContactInfo>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        
        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.AttorneyMaster AttorneyMaster = (BO.AttorneyMaster)(object)entity;
            var result = AttorneyMaster.Validate(AttorneyMaster);
            return result;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Attorney attorney = entity as Attorney;

            if (entity == null) return default(T);

            BO.AttorneyMaster attorneyBO = new BO.AttorneyMaster();
            attorneyBO.ID = attorney.Id;

            if (attorney.User != null)
            {
                if (attorney.User.IsDeleted.HasValue == false || (attorney.User.IsDeleted.HasValue == true && attorney.User.IsDeleted.Value == false))
                {
                    BO.User boUser = new BO.User();
                    using (UserRepository cmp = new UserRepository(_context))
                    {
                        boUser = cmp.Convert<BO.User, User>(attorney.User);
                        attorneyBO.User = boUser;
                    }
                }
            }
            attorneyBO.IsDeleted = attorney.IsDeleted;
            attorneyBO.CreateByUserID = attorney.CreateByUserID;
            attorneyBO.UpdateByUserID = attorney.UpdateByUserID;

            return (T)(object)attorneyBO;
        }
        #endregion

        #region Get All attornies
        public override object Get()
        {
            //var acc_ = _context.Attorneys.Include("User").Include("User.AddressInfo").Include("User.ContactInfo").Include("User.UserCompanies").Where(p => p.IsDeleted.HasValue == false || p.IsDeleted == false).ToList<Attorney>();
            //if (acc_ == null) return new BO.ErrorObject { ErrorMessage = "No records found for Attorney.", errorObject = "", ErrorLevel = ErrorLevel.Error };

            var User = _context.Users.Where(p => p.UserType == 3 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p => p.id);

            var UserCompany = _context.UserCompanies.Where(p => User.Contains(p.UserID) && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p => p.CompanyID);

            var company = _context.Companies.Where(p => UserCompany.Contains(p.id) && p.CompanyType == 2 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList();

            List<BO.Company> lstCompany = new List<BO.Company>();

            if (company == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Attorny.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                company.ForEach(item => lstCompany.Add(CompanyConvert<BO.Company, Company>(item)));
            }

            return lstCompany;
        }
        #endregion
    
        #region Get By Id 
        public override object Get(int id)
        {
            var acc = _context.Attorneys.Include("User")
                                        .Include("User.AddressInfo")
                                        .Include("User.ContactInfo")
                                        .Include("User.UserCompanies")
                                        .Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                        .FirstOrDefault<Attorney>();

            if (acc == null) return new BO.ErrorObject { ErrorMessage = "No record found for this Attorney.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            else
            {
                BO.AttorneyMaster acc_ = Convert<BO.AttorneyMaster, Attorney>(acc);
                return (object)acc_;
            }
        }
        #endregion

        #region Get By Company Id 
        //public override object GetByCompanyId(int id)
        //{
        //    var acc = _context.Attorneys.Include("User")
        //                                .Include("User.AddressInfo")
        //                                .Include("User.ContactInfo")
        //                                .Include("User.UserCompanies")
        //                                .Where(p => (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
        //                                          && p.User.UserCompanies.Where(p2 => p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false))
        //                                                                 .Any(p2 => p2.CompanyID == id) == true)
        //                                .ToList<Attorney>();

        //    List<BO.AttorneyMaster> lstattornies = new List<BO.AttorneyMaster>();
        //    if (acc == null) return new BO.ErrorObject { ErrorMessage = "No record found for this Company Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
        //    else
        //    {
        //        acc.ForEach(item => lstattornies.Add(Convert<BO.AttorneyMaster, Attorney>(item)));
        //    }

        //    return lstattornies;
        //}
        #endregion

        #region Get All Excluding CompanyId
        public override object GetAllExcludeCompany(int CompanyId)
        {
            var acc = _context.Attorneys.Include("User")
                                        .Include("User.AddressInfo")
                                        .Include("User.ContactInfo")
                                        .Include("User.UserCompanies")
                                        .Where(p => (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                  && p.User.UserCompanies.Where(p2 => p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false))
                                                                         .Any(p2 => p2.CompanyID != CompanyId) == true)
                                        .ToList<Attorney>();

            List<BO.AttorneyMaster> lstattornies = new List<BO.AttorneyMaster>();
            if (acc == null) return new BO.ErrorObject { ErrorMessage = "No record found for this Company Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            else
            {
                acc.ForEach(item => lstattornies.Add(Convert<BO.AttorneyMaster, Attorney>(item)));
            }

            return lstattornies;
        }
        #endregion

        #region Save Data
        public override Object Save<T>(T entity)
        {
            BO.AttorneyMaster addAttorneyBO = (BO.AttorneyMaster)(object)entity;
            BO.User userBO = addAttorneyBO.User;
            BO.AddressInfo addressUserBO = (addAttorneyBO.User != null) ? addAttorneyBO.User.AddressInfo : null;
            BO.ContactInfo contactinfoUserBO = (addAttorneyBO.User != null) ? addAttorneyBO.User.ContactInfo : null;
            Guid invitationDB_UniqueID = Guid.NewGuid();
            Attorney _attny = new Attorney();
            bool sendEmail = false;

            if (addAttorneyBO.ID != addAttorneyBO.User.ID) return new BO.ErrorObject { errorObject = "", ErrorMessage = "Attorney doesn't match the User.", ErrorLevel = ErrorLevel.Error };

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                bool IsEditMode = false;
                IsEditMode = (addAttorneyBO != null && addAttorneyBO.ID > 0) ? true : false;

                Company CompanyDB = new Company();
                UserCompany UserCompanyDB = new UserCompany();
                AddressInfo addressUserDB = new AddressInfo();
                ContactInfo contactinfoDB = new ContactInfo();
                User userDB = new User();

                #region Address Info User
                if (addressUserBO != null)
                {
                    bool Add_addressDB = false;
                    addressUserDB = _context.AddressInfoes.Where(p => p.id == addressUserBO.ID).FirstOrDefault();

                    if (addressUserDB == null && addressUserBO.ID <= 0)
                    {
                        addressUserDB = new AddressInfo();
                        Add_addressDB = true;
                    }
                    else if (addressUserDB == null && addressUserBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Address details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    //addressUserDB.id = addressUserBO.ID;
                    addressUserDB.Name = IsEditMode == true && addressUserBO.Name == null ? addressUserDB.Name : addressUserBO.Name;
                    addressUserDB.Address1 = IsEditMode == true && addressUserBO.Address1 == null ? addressUserDB.Address1 : addressUserBO.Address1;
                    addressUserDB.Address2 = IsEditMode == true && addressUserBO.Address2 == null ? addressUserDB.Address2 : addressUserBO.Address2;
                    addressUserDB.City = IsEditMode == true && addressUserBO.City == null ? addressUserDB.City : addressUserBO.City;
                    addressUserDB.State = IsEditMode == true && addressUserBO.State == null ? addressUserDB.State : addressUserBO.State;
                    addressUserDB.ZipCode = IsEditMode == true && addressUserBO.ZipCode == null ? addressUserDB.ZipCode : addressUserBO.ZipCode;
                    addressUserDB.Country = IsEditMode == true && addressUserBO.Country == null ? addressUserDB.Country : addressUserBO.Country;
                    //[STATECODE-CHANGE]
                    //addressUserDB.StateCode = IsEditMode == true && addressUserBO.StateCode == null ? addressUserDB.StateCode : addressUserBO.StateCode;
                    //[STATECODE-CHANGE]
                    if (Add_addressDB == true) addressUserDB = _context.AddressInfoes.Add(addressUserDB);
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid address details.", ErrorLevel = ErrorLevel.Error };
                    }
                    addressUserDB = null;
                }
                #endregion

                #region Contact Info User
                if (contactinfoUserBO != null)
                {
                    bool Add_contactinfoDB = false;
                    contactinfoDB = _context.ContactInfoes.Where(p => p.id == contactinfoUserBO.ID).FirstOrDefault();

                    if (contactinfoDB == null && contactinfoUserBO.ID <= 0)
                    {
                        contactinfoDB = new ContactInfo();
                        Add_contactinfoDB = true;
                    }
                    else if (contactinfoDB == null && contactinfoUserBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Contact details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    //contactinfoDB.id = contactinfoUserBO.ID;
                    contactinfoDB.Name = IsEditMode == true && contactinfoUserBO.Name == null ? contactinfoDB.Name : contactinfoUserBO.Name;
                    contactinfoDB.CellPhone = IsEditMode == true && contactinfoUserBO.CellPhone == null ? contactinfoDB.CellPhone : contactinfoUserBO.CellPhone;
                    contactinfoDB.EmailAddress = IsEditMode == true && contactinfoUserBO.EmailAddress == null ? contactinfoDB.EmailAddress : contactinfoUserBO.EmailAddress;
                    contactinfoDB.HomePhone = IsEditMode == true && contactinfoUserBO.HomePhone == null ? contactinfoDB.HomePhone : contactinfoUserBO.HomePhone;
                    contactinfoDB.WorkPhone = IsEditMode == true && contactinfoUserBO.WorkPhone == null ? contactinfoDB.WorkPhone : contactinfoUserBO.WorkPhone;
                    contactinfoDB.FaxNo = IsEditMode == true && contactinfoUserBO.FaxNo == null ? contactinfoDB.FaxNo : contactinfoUserBO.FaxNo;
                    contactinfoDB.IsDeleted = IsEditMode == true && contactinfoUserBO.IsDeleted == null ? contactinfoDB.IsDeleted : contactinfoUserBO.IsDeleted;
                    contactinfoDB.OfficeExtension = IsEditMode == true && contactinfoUserBO.OfficeExtension == null ? contactinfoDB.OfficeExtension : contactinfoUserBO.OfficeExtension;
                    contactinfoDB.AlternateEmail = IsEditMode == true && contactinfoUserBO.AlternateEmail == null ? contactinfoDB.AlternateEmail : contactinfoUserBO.AlternateEmail;
                    contactinfoDB.PreferredCommunication = IsEditMode == true && contactinfoUserBO.PreferredCommunication == null ? contactinfoDB.PreferredCommunication : contactinfoUserBO.PreferredCommunication;

                    if (Add_contactinfoDB == true) contactinfoDB = _context.ContactInfoes.Add(contactinfoDB);
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid address details.", ErrorLevel = ErrorLevel.Error };
                    }
                    contactinfoDB = null;
                }
                #endregion

                #region User
                if (userBO != null)
                {
                    bool Add_userDB = false;
                    userDB = _context.Users.Where(p => p.id == userBO.ID).FirstOrDefault();

                    if (userDB == null && userBO.ID <= 0)
                    {
                        userDB = new User();
                        Add_userDB = true;
                        sendEmail = true;
                    }
                    else if (userDB == null && userBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "User Name dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    if (Add_userDB == true)
                    {
                        if (_context.Users.Any(p => p.UserName == userBO.UserName))
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
                    userDB.UserType = Add_userDB == true ? System.Convert.ToByte(BO.GBEnums.UserType.Attorney) : userDB.UserType;
                    userDB.UserStatus = System.Convert.ToByte(userBO.Status);
                    userDB.ImageLink = IsEditMode == true && userBO.ImageLink == null ? userDB.ImageLink : userBO.ImageLink;
                    userDB.DateOfBirth = IsEditMode == true && userBO.DateOfBirth == null ? userDB.DateOfBirth : userBO.DateOfBirth;

                    if (Add_userDB == true && string.IsNullOrEmpty(userBO.Password) == false) userDB.Password = PasswordHash.HashPassword(userBO.Password);

                    //userDB.AddressId = addressUserDB.id;
                    userDB.AddressId = (addressUserDB != null && addressUserDB.id > 0) ? addressUserDB.id : userDB.AddressId;
                    //userDB.ContactInfoId = contactinfoDB.id;
                    userDB.ContactInfoId = (contactinfoDB != null && contactinfoDB.id > 0) ? contactinfoDB.id : userDB.ContactInfoId;

                    userDB.C2FactAuthEmailEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactEmail"));
                    userDB.C2FactAuthSMSEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactSMS"));

                    userDB.CreateByUserID = Add_userDB == true ? userBO.CreateByUserID : userDB.CreateByUserID;
                    userDB.CreateDate = Add_userDB == true ? DateTime.UtcNow : userDB.CreateDate;

                    userDB.UpdateByUserID = Add_userDB == false ? userBO.UpdateByUserID : userDB.UpdateByUserID;
                    userDB.UpdateDate = Add_userDB == false ? DateTime.UtcNow : userDB.UpdateDate;

                    if (Add_userDB == true) userDB = _context.Users.Add(userDB);
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

                #region Attorney
                if (addAttorneyBO != null)
                {
                    bool Add_attorneyDB = false;
                    _attny = _context.Attorneys.Where(p => p.Id == addAttorneyBO.ID).FirstOrDefault();

                    if (_attny == null && addAttorneyBO.ID <= 0 && IsEditMode == false)
                    {
                        _attny = new Attorney();
                        Add_attorneyDB = true;
                    }
                    else if (_attny == null && addAttorneyBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Attorney dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    _attny.Id = IsEditMode == false ? userDB.id : addAttorneyBO.ID;
                    _attny.IsDeleted = addAttorneyBO.IsDeleted.HasValue ? addAttorneyBO.IsDeleted : false;

                    if (Add_attorneyDB == true) _attny = _context.Attorneys.Add(_attny);
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid attorney details.", ErrorLevel = ErrorLevel.Error };
                    }
                    _attny = null;
                }

                _context.SaveChanges();
                #endregion

                #region User Companies
                if (addAttorneyBO.User.UserCompanies != null)
                {
                    bool add_UserCompany = false;

                    Company companyDB = new Company();

                    foreach (var userCompany in addAttorneyBO.User.UserCompanies)
                    {
                        userCompany.UserId = userDB.id;
                        UserCompanyDB = _context.UserCompanies.Where(p => p.UserID == userDB.id && p.CompanyID == userCompany.Company.ID && p.IsAccepted==true && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                               .FirstOrDefault<UserCompany>();

                        if (UserCompanyDB == null)
                        {
                            UserCompanyDB = new UserCompany();
                            add_UserCompany = true;
                        }

                        UserCompanyDB.CompanyID = userCompany.Company.ID;
                        UserCompanyDB.UserID = userCompany.UserId;                                            
                        if (add_UserCompany)
                        {
                            _context.UserCompanies.Add(UserCompanyDB);
                        }
                        _context.SaveChanges();
                    }

                }
                #endregion

                #region Insert Invitation
                if (sendEmail == true)
                {
                    Invitation invitationDB = new Invitation();
                    invitationDB.User = userDB;

                    invitationDB_UniqueID = Guid.NewGuid();
                    invitationDB.UniqueID = invitationDB_UniqueID;
                    invitationDB.CompanyID = UserCompanyDB.CompanyID != 0 ? UserCompanyDB.CompanyID : 0;
                    invitationDB.CreateDate = DateTime.UtcNow;
                    invitationDB.CreateByUserID = userDB.id;
                    _context.Invitations.Add(invitationDB);
                    _context.SaveChanges();
                }
                #endregion

                dbContextTransaction.Commit();

                _attny = _context.Attorneys.Include("User")
                                           .Include("User.AddressInfo")
                                           .Include("User.ContactInfo")
                                           .Include("User.UserCompanies")
                                           .Where(p => p.Id == _attny.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                           .FirstOrDefault<Attorney>();
                #region Send Email
                if (sendEmail == true)
                {
                    try
                    {
                        string VerificationLink = "<a href='" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "</a>";
                        string Message = "Dear " + userBO.FirstName + ",<br><br>Thanks for registering with us.<br><br> Your user name is:- " + userBO.UserName + "<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";
                        BO.Email objEmail = new BO.Email { ToEmail = userBO.UserName, Subject = "User registered", Body = Message };
                        objEmail.SendMail();

                    }
                    catch (Exception ex) { }
                }
                #endregion

                BO.AttorneyMaster res = Convert<BO.AttorneyMaster, Attorney>(_attny);
                return (object)res;
            }
        }
        #endregion

        #region AssociateAttorneyWithCompany
        public override object AssociateAttorneyWithCompany(int AttorneyId , int CompanyId)
        {
            bool add_UserCompany = false;
            bool sendEmail = false;
            Guid invitationDB_UniqueID = Guid.NewGuid();
            BO.AttorneyMaster addAttorneyBO = new BO.AttorneyMaster();
            BO.User userBO = addAttorneyBO.User;


            var company = _context.Companies.Where(p => p.id == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            if (company == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var attorneys = _context.Attorneys.Where( p => p.Id == AttorneyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            if (attorneys == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Attorney.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var userCompany = _context.UserCompanies.Where( p => p.UserID == AttorneyId && p.CompanyID == CompanyId && p.IsAccepted ==true && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            if (userCompany == null)
            {
                userCompany = new UserCompany();
                add_UserCompany = true;
                sendEmail = true;
            }

            userCompany.CompanyID = CompanyId;
            userCompany.UserID = AttorneyId;

            if (add_UserCompany)
            {
                _context.UserCompanies.Add(userCompany);
            }

            _context.SaveChanges();

            var _attny = _context.Attorneys.Include("User")
                                       .Include("User.AddressInfo")
                                       .Include("User.ContactInfo")
                                       .Include("User.UserCompanies")
                                       .Where(p => p.Id == AttorneyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                       .FirstOrDefault<Attorney>();

            #region Send Email
            if (sendEmail == true)
            {
                try
                {
                    string VerificationLink = "<a href='" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "</a>";
                    string Message = "Dear " + _attny.User.FirstName + ",<br><br>Thanks for registering with us.<br><br> Your user name is:- " + _attny.User.UserName + "<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";
                    BO.Email objEmail = new BO.Email { ToEmail = _attny.User.UserName, Subject = "User registered", Body = Message };
                    objEmail.SendMail();

                }
                catch (Exception ex) { }
            }
            #endregion

            var res = Convert<BO.AttorneyMaster, Attorney>(_attny);
            return (object)res;

        }
        #endregion

        #region DisassociateAttorneyWithCompany
        public override object DisassociateAttorneyWithCompany(int AttorneyId, int CompanyId)
        {
            var company = _context.Companies.Where(p => p.id == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            if (company == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var attorneys = _context.Attorneys.Where(p => p.Id == AttorneyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            if (attorneys == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Attorney.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var userCompany = _context.UserCompanies.Where(p => p.UserID == AttorneyId && p.CompanyID == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            if (userCompany != null)
            {
                userCompany.IsDeleted = true;
            }

            _context.SaveChanges();

            var _attny = _context.Attorneys.Include("User")
                                       .Include("User.AddressInfo")
                                       .Include("User.ContactInfo")
                                       .Include("User.UserCompanies")
                                       .Where(p => p.Id == AttorneyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                       .FirstOrDefault<Attorney>();

            var res = Convert<BO.AttorneyMaster, Attorney>(_attny);
            return (object)res;

        }
        #endregion

        //AttorneyProvider

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
            boCompany.SubsCriptionType = (BO.GBEnums.SubsCriptionType)company.SubscriptionPlanType;
            boCompany.RegistrationComplete = company.RegistrationComplete;
            boCompany.IsDeleted = company.IsDeleted;
            boCompany.CreateByUserID = company.CreateByUserID;
            boCompany.UpdateByUserID = company.UpdateByUserID;


            return (T)(object)boCompany;
        }
        #endregion

        #region AttorneyProviderConvert
        public T AttorneyProviderConvert<T, U>(U entity)
        {

            AttorneyProvider attorneyProvider = entity as AttorneyProvider;
            if (attorneyProvider == null)
                return default(T);

            BO.AttorneyProvider boAttorneyProvider = new BO.AttorneyProvider();

            boAttorneyProvider.ID = attorneyProvider.Id;
            boAttorneyProvider.AttorneyProviderId = attorneyProvider.AttorneyProviderId;
            boAttorneyProvider.CompanyId = attorneyProvider.CompanyId;
            boAttorneyProvider.IsDeleted = attorneyProvider.IsDeleted;
            boAttorneyProvider.CreateByUserID = attorneyProvider.CreateByUserID;
            boAttorneyProvider.UpdateByUserID = attorneyProvider.UpdateByUserID;

            if (attorneyProvider.Company != null)
            {
                BO.Company Company = new BO.Company();

                if (attorneyProvider.Company.IsDeleted.HasValue == false
                    || (attorneyProvider.Company.IsDeleted.HasValue == true && attorneyProvider.Company.IsDeleted.Value == false))
                {
                    using (CompanyRepository sr = new CompanyRepository(_context))
                    {
                        Company = sr.Convert<BO.Company, Company>(attorneyProvider.Company);
                        Company.Locations = null;
                    }
                }

                boAttorneyProvider.Company = Company;
            }

            if (attorneyProvider.Company1 != null)
            {
                BO.Company Company = new BO.Company();

                if (attorneyProvider.Company1.IsDeleted.HasValue == false
                    || (attorneyProvider.Company1.IsDeleted.HasValue == true && attorneyProvider.Company1.IsDeleted.Value == false))
                {
                    using (CompanyRepository sr = new CompanyRepository(_context))
                    {
                        Company = sr.Convert<BO.Company, Company>(attorneyProvider.Company1);
                        Company.Locations = null;
                    }
                }

                boAttorneyProvider.AtorneyProvider = Company;
            }

            return (T)(object)boAttorneyProvider;
        }
        #endregion

        #region Associate Attorney Provider With Company
        public override object AssociateAttorneyProviderWithCompany(int AttorneyProviderId, int CompanyId)
        {
            Company CompanyDB = _context.Companies.Where(p => p.id == CompanyId
                                                   && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .FirstOrDefault();

            if (CompanyDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Company dosent exists.", errorObject = "", ErrorLevel = ErrorLevel.Information };
            }

            Company AttorneyProviderCompanyDB = _context.Companies.Where(p => p.id == AttorneyProviderId
                                                         && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                        .FirstOrDefault();

            if (AttorneyProviderCompanyDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "AttorneyProvider Company dosent exists.", errorObject = "", ErrorLevel = ErrorLevel.Information };
            }

            var AttorneyProviderDB = _context.AttorneyProviders.Where(p => p.AttorneyProviderId == AttorneyProviderId && p.CompanyId == CompanyId
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                               .FirstOrDefault();

            bool AttorneyProvider = false;
            if (AttorneyProviderDB == null)
            {
                AttorneyProviderDB = new AttorneyProvider();
                AttorneyProvider = true;
            }

            AttorneyProviderDB.AttorneyProviderId = AttorneyProviderId;
            AttorneyProviderDB.CompanyId = CompanyId;
            AttorneyProviderDB.IsDeleted = false;

            if (AttorneyProvider == true)
            {
                _context.AttorneyProviders.Add(AttorneyProviderDB);
            }

            _context.SaveChanges();

            BO.AttorneyProvider acc_ = AttorneyProviderConvert<BO.AttorneyProvider, AttorneyProvider>(AttorneyProviderDB);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region Get All Attorney Provider Exclude Assigned
        public override object GetAllAttorneyProviderExcludeAssigned(int CompanyId)
        {
            var AssignedAttorneyProvider = _context.AttorneyProviders.Where(p => p.CompanyId == CompanyId
                                                                      && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                      .Select(p => p.AttorneyProviderId);

            var companies = _context.Companies.Where(p => AssignedAttorneyProvider.Contains(p.id) == false 
                                               && p.CompanyType == 2
                                               && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
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

        #region Get Attorney Provider By Company ID 
        public override object GetAttorneyProviderByCompanyId(int CompanyId)
        {
            var AttorenyProvider = _context.AttorneyProviders.Include("Company")
                                                             .Include("Company1")
                                                             .Where(p => p.CompanyId == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                    .ToList();

            List<BO.AttorneyProvider> lstprovider = new List<BO.AttorneyProvider>();

            if (AttorenyProvider == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this companyId.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                AttorenyProvider.ForEach(item => lstprovider.Add(AttorneyProviderConvert<BO.AttorneyProvider, AttorneyProvider>(item)));
            }

            return lstprovider;
        }
        #endregion 


        #region Delete By ID
        public override object Delete(int id)
        {
            Attorney attorney = new Attorney();
            
            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                attorney = _context.Attorneys.Include("User").Include("User.AddressInfo").Include("User.ContactInfo").Where(p => p.Id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault();

                if (attorney != null)
                {
                    attorney.IsDeleted = true;
                    attorney.User.IsDeleted = true;
                    attorney.User.AddressInfo.IsDeleted = true;
                    attorney.User.ContactInfo.IsDeleted = true;
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Attorney details dosent exists.", ErrorLevel = ErrorLevel.Error };
                }

                dbContextTransaction.Commit();
            }
            var res = Convert<BO.AttorneyMaster, Attorney>(attorney);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
