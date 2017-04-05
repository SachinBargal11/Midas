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
            attorneyBO.companyId = attorney.CompanyId;
            attorneyBO.ID = attorney.Id;

            BO.User boUser = new BO.User();
            using (UserRepository cmp = new UserRepository(_context))
            {
                boUser = cmp.Convert<BO.User, User>(attorney.User);
                attorneyBO.User = boUser;
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
            var acc_ = _context.Attorneys.Include("User").Include("User.AddressInfo").Include("User.ContactInfo").Where(p => p.IsDeleted.HasValue == false || p.IsDeleted == false).ToList<Attorney>();
            if (acc_ == null) return new BO.ErrorObject { ErrorMessage = "No records found for Attorney.", errorObject = "", ErrorLevel = ErrorLevel.Error };

            List<BO.AttorneyMaster> lstattornies = new List<BO.AttorneyMaster>();
            acc_.ForEach(item => lstattornies.Add(Convert<BO.AttorneyMaster, Attorney>(item)));

            return lstattornies;
        }
        #endregion

        #region Get By Id 
        public override object Get(int id)
        {
            var acc = _context.Attorneys.Include("User")
                                        .Include("User.AddressInfo")
                                        .Include("User.ContactInfo")
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
        public override object GetByCompanyId(int id)
        {
            var acc = _context.Attorneys.Include("User")
                                        .Include("User.AddressInfo")
                                        .Include("User.ContactInfo")
                                        .Where(p => p.CompanyId == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
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
                    _attny.CompanyId = addAttorneyBO.companyId == null ? _attny.CompanyId : addAttorneyBO.companyId;
                    _attny.IsDeleted = addAttorneyBO.IsDeleted.HasValue ? addAttorneyBO.IsDeleted : false;

                    CompanyDB = _context.Companies.Where(p => addAttorneyBO.companyId.HasValue == true && p.id == addAttorneyBO.companyId).FirstOrDefault();
                    if (CompanyDB != null) _attny.CompanyId = addAttorneyBO.companyId;

                    else
                    {
                        if (IsEditMode == false)
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid User Company Id.", ErrorLevel = ErrorLevel.Error };
                        }
                    }

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

                #region Insert Invitation
                if (sendEmail == true)
                {
                    Invitation invitationDB = new Invitation();
                    invitationDB.User = userDB;

                    invitationDB_UniqueID = Guid.NewGuid();
                    invitationDB.UniqueID = invitationDB_UniqueID;
                    invitationDB.CompanyID = _attny.CompanyId.HasValue == true ? _attny.CompanyId.Value : 0;
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
