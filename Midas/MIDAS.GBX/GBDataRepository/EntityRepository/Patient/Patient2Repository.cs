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
    internal class Patient2Repository : BaseEntityRepo, IDisposable
    {
        private DbSet<Patient2> _dbSet;

        #region Constructor
        public Patient2Repository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<Patient2>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Patient2 patient2 = entity as Patient2;

            if (patient2 == null)
                return default(T);

            BO.Patient2 patientBO2 = new BO.Patient2();

            patientBO2.ID = patient2.Id;
            patientBO2.SSN = patient2.SSN;
            //patientBO2.WCBNo = patient2.WCBNo;
            //patientBO2.LocationID = patient2.LocationID;
            patientBO2.CompanyId = patient2.CompanyId.HasValue == true ? patient2.CompanyId.Value : 0;
            patientBO2.Weight = patient2.Weight;
            patientBO2.Weight = patient2.Height;
            patientBO2.MaritalStatusId = patient2.MaritalStatusId;
            patientBO2.DateOfFirstTreatment = patient2.DateOfFirstTreatment;
            patientBO2.AttorneyName = patient2.AttorneyName;
            patientBO2.AttorneyAddressInfoId = patient2.AttorneyAddressInfoId;
            patientBO2.AttorneyContactInfoId = patient2.AttorneyContactInfoId;
            //patientBO2.PatientEmpInfoId = patient2.PatientEmpInfoId;
            //patientBO2.PatientInsuranceInfoId = patient2.InsuranceInfoId;
            //patientBO2.AccidentInfoId = patient2.AccidentInfoId;
            //patientBO2.AttorneyInfoId = patient2.AttorneyInfoId;
            //patientBO2.ReferingOfficeId = patient2.ReferingOfficeId;
            
            if (patient2.IsDeleted.HasValue)
                patientBO2.IsDeleted = patient2.IsDeleted.Value;
            if (patient2.UpdateByUserID.HasValue)
                patientBO2.UpdateByUserID = patient2.UpdateByUserID.Value;

            //useful to get whole structure in responce.
            //if (patientBO2.CompanyId.HasValue == true)
            //{ 
            //    BO.Company boCompany = new BO.Company();
            //    using (CompanyRepository cmp = new CompanyRepository(_context))
            //    {
            //        boCompany = cmp.Convert<BO.Company, Company>(patient2.Company);
            //        patientBO2.Company = boCompany;
            //    }
            //}

            BO.User boUser = new BO.User();
            using (UserRepository cmp = new UserRepository(_context))
            {
                boUser = cmp.Convert<BO.User, User>(patient2.User);
                patientBO2.User = boUser;
            }

            //BO.Location boLocation = new BO.Location();
            //using (LocationRepository cmp = new LocationRepository(_context))
            //{
            //    boLocation = cmp.Convert<BO.Location, Location>(patient2.Location);
            //    patientBO2.Location = boLocation;
            //}

            return (T)(object)patientBO2;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Patient2 patient2 = (BO.Patient2)(object)entity;
            var result = patient2.Validate(patient2);
            return result;
        }
        #endregion

        #region Get By ID For Patient 
        public override object Get(int id)
        {
            var acc = _context.Patient2.Include("User").Include("Location").Where(p => p.Id == id && p.IsDeleted == false).FirstOrDefault<Patient2>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                BO.Patient2 acc_ = Convert<BO.Patient2, Patient2>(acc);
                return (object)acc_;
            }
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.Patient2 patient2BO = (BO.Patient2)(object)entity;
            //BO.Company CompanyBO = patient2BO.Company;
            //BO.Location locationBO = patient2BO.Location;
            BO.User userBO = patient2BO.User;
            BO.AddressInfo addressUserBO = patient2BO.User.AddressInfo;
            BO.ContactInfo contactinfoUserBO = patient2BO.User.ContactInfo;
            BO.AddressInfo addressPatientBO = patient2BO.AddressInfo;
            BO.ContactInfo contactinfoPatientBO = patient2BO.ContactInfo;

            Guid invitationDB_UniqueID = Guid.NewGuid();
            bool sendEmail = false;

            Patient2 patient2DB = new Patient2();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                Company CompanyDB = new Company();
                //Location locationDB = new Location();
                AddressInfo addressUserDB = new AddressInfo();
                ContactInfo contactinfoDB = new ContactInfo();
                User userDB = new User();

                AddressInfo addressPatientDB = new AddressInfo();
                ContactInfo contactinfoPatientDB = new ContactInfo();


                #region Address User
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
                    addressUserDB.Name = addressUserBO.Name;
                    addressUserDB.Address1 = addressUserBO.Address1;
                    addressUserDB.Address2 = addressUserBO.Address2;
                    addressUserDB.City = addressUserBO.City;
                    addressUserDB.State = addressUserBO.State;
                    addressUserDB.ZipCode = addressUserBO.ZipCode;
                    addressUserDB.Country = addressUserBO.Country;

                    if (Add_addressDB == true)
                    {
                        addressUserDB = _context.AddressInfoes.Add(addressUserDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Address details.", ErrorLevel = ErrorLevel.Error };
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
                    contactinfoDB.Name = contactinfoUserBO.Name;
                    contactinfoDB.CellPhone = contactinfoUserBO.CellPhone;
                    contactinfoDB.EmailAddress = contactinfoUserBO.EmailAddress;
                    contactinfoDB.HomePhone = contactinfoUserBO.HomePhone;
                    contactinfoDB.WorkPhone = contactinfoUserBO.WorkPhone;
                    contactinfoDB.FaxNo = contactinfoUserBO.FaxNo;
                    contactinfoDB.IsDeleted = contactinfoUserBO.IsDeleted;

                    if (Add_contactinfoDB == true)
                    {
                        contactinfoDB = _context.ContactInfoes.Add(contactinfoDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Contact details.", ErrorLevel = ErrorLevel.Error };
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
                    userDB.FirstName = userBO.FirstName;
                    userDB.MiddleName = userBO.MiddleName;
                    userDB.LastName = userBO.LastName;
                    userDB.Gender = System.Convert.ToByte(userBO.Gender);
                    userDB.UserType = Add_userDB == true ? System.Convert.ToByte(userBO.UserType) : userDB.UserType;
                    userDB.UserStatus = System.Convert.ToByte(userBO.Status);
                    userDB.ImageLink = userBO.ImageLink;
                    userDB.DateOfBirth = userBO.DateOfBirth;

                    if (Add_userDB == true && string.IsNullOrEmpty(userBO.Password) == false)
                    {
                        userDB.Password = PasswordHash.HashPassword(userBO.Password);
                    }

                    userDB.AddressId = addressUserDB.id;
                    userDB.ContactInfoId = contactinfoDB.id;

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
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid User details.", ErrorLevel = ErrorLevel.Error };
                }
                #endregion

                #region AttorneyAddressInfoId
                if (addressPatientBO != null)
                {
                    bool Add_addressDB = false;
                    addressPatientDB = _context.AddressInfoes.Where(p => p.id == addressPatientBO.ID).FirstOrDefault();

                    if (addressPatientDB == null && addressPatientBO.ID <= 0)
                    {
                        addressPatientDB = new AddressInfo();
                        Add_addressDB = true;
                    }
                    else if (addressPatientDB == null && addressPatientBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Attorney Address details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    //addressPatientDB.id = addressPatientBO.ID;
                    addressPatientDB.Name = addressPatientBO.Name;
                    addressPatientDB.Address1 = addressPatientBO.Address1;
                    addressPatientDB.Address2 = addressPatientBO.Address2;
                    addressPatientDB.City = addressPatientBO.City;
                    addressPatientDB.State = addressPatientBO.State;
                    addressPatientDB.ZipCode = addressPatientBO.ZipCode;
                    addressPatientDB.Country = addressPatientBO.Country;

                    if (Add_addressDB == true)
                    {
                        addressPatientDB = _context.AddressInfoes.Add(addressPatientDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Attorney Address details.", ErrorLevel = ErrorLevel.Error };
                }
                #endregion

                #region AttorneyContactInfoId
                if (contactinfoPatientBO != null)
                {
                    bool Add_contactinfoDB = false;
                    contactinfoPatientDB = _context.ContactInfoes.Where(p => p.id == contactinfoPatientBO.ID).FirstOrDefault();

                    if (contactinfoPatientDB == null && contactinfoPatientBO.ID <= 0)
                    {
                        contactinfoPatientDB = new ContactInfo();
                        Add_contactinfoDB = true;
                    }
                    else if (contactinfoPatientDB == null && contactinfoPatientBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Attorney Contact details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }
                    
                    //contactinfoPatientDB.id = contactinfoPatientBO.ID;
                    contactinfoPatientDB.Name = contactinfoPatientBO.Name;
                    contactinfoPatientDB.CellPhone = contactinfoPatientBO.CellPhone;
                    contactinfoPatientDB.EmailAddress = contactinfoPatientBO.EmailAddress;
                    contactinfoPatientDB.HomePhone = contactinfoPatientBO.HomePhone;
                    contactinfoPatientDB.WorkPhone = contactinfoPatientBO.WorkPhone;
                    contactinfoPatientDB.FaxNo = contactinfoPatientBO.FaxNo;
                    contactinfoPatientDB.IsDeleted = contactinfoPatientBO.IsDeleted;

                    if (Add_contactinfoDB == true)
                    {
                        contactinfoPatientDB = _context.ContactInfoes.Add(contactinfoPatientDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Attorney Contact details.", ErrorLevel = ErrorLevel.Error };
                }
                #endregion

                #region Patient
                if (patient2BO != null)
                {
                    bool Add_patientDB = false;
                    patient2DB = _context.Patient2.Where(p => p.Id == patient2BO.ID).FirstOrDefault();

                    if (patient2DB == null && patient2BO.ID <= 0)
                    {
                        patient2DB = new Patient2();
                        Add_patientDB = true;
                    }
                    else if (patient2DB == null && patient2BO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    patient2DB.Id = userDB.id;

                    if (Add_patientDB == true)
                    {
                        if (_context.Patient2.Any(p => p.SSN == patient2BO.SSN))
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "SSN already exists.", ErrorLevel = ErrorLevel.Error };
                        }
                    }

                    patient2DB.SSN = patient2BO.SSN;
                    patient2DB.CompanyId = patient2BO.CompanyId;
                    patient2DB.Weight = patient2BO.Weight;
                    patient2DB.Weight = patient2BO.Height;
                    patient2DB.MaritalStatusId = patient2BO.MaritalStatusId;
                    patient2DB.DateOfFirstTreatment = patient2BO.DateOfFirstTreatment;
                    patient2DB.AttorneyName = patient2BO.AttorneyName;
                    patient2DB.AttorneyAddressInfoId = addressPatientDB.id;
                    patient2DB.AttorneyContactInfoId = contactinfoPatientDB.id;

                    patient2DB.IsDeleted = patient2BO.IsDeleted.HasValue ? patient2BO.IsDeleted : false;

                    CompanyDB = _context.Companies.Where(p => p.id == patient2BO.CompanyId).FirstOrDefault();
                    if (CompanyDB != null)
                    {
                        patient2DB.CompanyId = patient2BO.CompanyId;
                    }
                    else
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid User Company Id.", ErrorLevel = ErrorLevel.Error };
                    }

                    //locationDB = _context.Locations.Where(p => p.id == patient2BO.LocationID).FirstOrDefault();
                    //if (locationDB != null)
                    //{
                    //    patient2DB.LocationID = patient2BO.LocationID;
                    //}
                    //else
                    //{
                    //    dbContextTransaction.Rollback();
                    //    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid User Location Id.", ErrorLevel = ErrorLevel.Error };
                    //}

                    if (Add_patientDB == true)
                    {
                        patient2DB = _context.Patient2.Add(patient2DB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Patient details.", ErrorLevel = ErrorLevel.Error };
                }

                _context.SaveChanges();
                #endregion

                if (sendEmail == true)
                {
                    #region Insert Invitation
                    Invitation invitationDB = new Invitation();
                    invitationDB.User = userDB;

                    invitationDB_UniqueID = Guid.NewGuid();

                    invitationDB.UniqueID = invitationDB_UniqueID;
                    invitationDB.CompanyID = patient2DB.CompanyId.HasValue == true ? patient2DB.CompanyId.Value : 0;
                    invitationDB.CreateDate = DateTime.UtcNow;
                    invitationDB.CreateByUserID = userDB.id;
                    _context.Invitations.Add(invitationDB);
                    _context.SaveChanges();
                    #endregion
                }

                dbContextTransaction.Commit();

                patient2DB = _context.Patient2.Include("Company").Where(p => p.Id == patient2DB.Id).FirstOrDefault<Patient2>();
            }

            if (sendEmail == true)
            {
                try
                {
                    #region Send Email
                    string VerificationLink = "<a href='" + Utility.GetConfigValue("PatientVerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("PatientVerificationLink") + "/" + invitationDB_UniqueID + "</a>";
                    string Message = "Dear " + userBO.FirstName + ",<br><br>Thanks for registering with us.<br><br> Your user name is:- " + userBO.UserName + "<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";
                    BO.Email objEmail = new BO.Email { ToEmail = userBO.UserName, Subject = "User registered", Body = Message };
                    objEmail.SendMail();
                    #endregion
                }
                catch (Exception ex)
                {

                }
            }

            var res = Convert<BO.Patient2, Patient2>(patient2DB);
            return (object)res;
        }
        #endregion

        #region Get All Patient
        public override object Get<T>(T entity)
        {
            BO.Patient2 patientBO = (BO.Patient2)(object)entity;
            var acc_ = _context.Patient2.Include("User").Include("Location").Where(p => p.IsDeleted == false || p.IsDeleted == null).ToList<Patient2>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.Patient2> lstpatients = new List<BO.Patient2>();
            foreach (Patient2 item in acc_)
            {
                lstpatients.Add(Convert<BO.Patient2, Patient2>(item));
            }
            return lstpatients;
        }
        #endregion


        public void Dispose()
        {
            // Use SupressFinalize in case a subclass 
            // of this type implements a finalizer.
            GC.SuppressFinalize(this);
        }
    }
}
