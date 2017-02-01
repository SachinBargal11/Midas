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
    internal class PatientRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<Patient> _dbSet;

        #region Constructor
        public PatientRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<Patient>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Patient patient = entity as Patient;

            if (patient == null)
                return default(T);

            BO.Patient patientBO = new BO.Patient();

            patientBO.ID = patient.id;
            patientBO.PatientID = patient.PatientID;
            patientBO.SSN = patient.SSN;
            patientBO.WCBNo = patient.WCBNo;
            patientBO.JobTitle = patient.JobTitle;
            patientBO.WorkActivities = patient.WorkActivities;
            patientBO.CarrierCaseNo = patient.CarrierCaseNo;
            patientBO.ChartNo = patient.ChartNo;
            patientBO.CompanyID = patient.CompanyID;
            patientBO.LocationID = patient.LocationID;
            
            if (patient.IsDeleted.HasValue)
                patientBO.IsDeleted = patient.IsDeleted.Value;
            if (patient.UpdateByUserID.HasValue)
                patientBO.UpdateByUserID = patient.UpdateByUserID.Value;
            
            //useful to get whole structure in responce.
            BO.Company boCompany = new BO.Company();
            using (CompanyRepository cmp = new CompanyRepository(_context))
            {
                boCompany = cmp.Convert<BO.Company, Company>(patient.Company);
                patientBO.Company = boCompany;
            }

            BO.User boUser = new BO.User();
            using (UserRepository cmp = new UserRepository(_context))
            {
                boUser = cmp.Convert<BO.User, User>(patient.User);
                patientBO.User = boUser;
            }

            BO.Location boLocation = new BO.Location();
            using (LocationRepository cmp = new LocationRepository(_context))
            {
                boLocation = cmp.Convert<BO.Location, Location>(patient.Location);
                patientBO.Location = boLocation;
            }

            return (T)(object)patientBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Patient patient = (BO.Patient)(object)entity;
            var result = patient.Validate(patient);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.Patient patientBO = (BO.Patient)(object)entity;
            BO.Company companyBO = patientBO.Company;
            BO.Location locationBO = patientBO.Location;
            BO.User userBO = patientBO.User;

            Patient patientDB = new Patient();
            Company companyDB = new Company();
            Location locationDB = new Location();
            User userDB = new User();


            #region Patient
            patientDB.id = patientBO.ID;
            patientDB.PatientID = patientBO.PatientID;
            patientDB.SSN = patientBO.SSN;
            patientDB.WCBNo = patientBO.WCBNo;
            patientDB.JobTitle = patientBO.JobTitle;
            patientDB.WorkActivities = patientBO.WorkActivities;
            patientDB.CarrierCaseNo = patientBO.CarrierCaseNo;
            patientDB.ChartNo = patientBO.ChartNo;
            patientDB.IsDeleted = patientBO.IsDeleted.HasValue ? patientBO.IsDeleted : false;

            #endregion

            #region Company
            if (companyBO.ID > 0)
            {
                Company company = _context.Companies.Where(p => p.id == companyBO.ID).FirstOrDefault<Company>();
                if (company != null)
                {
                    patientDB.Company = company;
                    _context.Entry(company).State = System.Data.Entity.EntityState.Modified;
                }
                else
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Company details.", ErrorLevel = ErrorLevel.Error };
            }
            #endregion

            #region Location
            if (locationBO.ID > 0)
            {
                Location location = _context.Locations.Where(p => p.id == locationBO.ID).FirstOrDefault<Location>();
                if (location != null)
                {
                    patientDB.Location = location;
                    _context.Entry(location).State = System.Data.Entity.EntityState.Modified;
                }
                else
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid location details.", ErrorLevel = ErrorLevel.Error };
            }
            #endregion

            #region User
            if (userBO.ID > 0)
            {
                User user = _context.Users.Where(p => p.id == userBO.ID).FirstOrDefault<User>();
                if (user != null)
                {
                    patientDB.User = user;
                    _context.Entry(user).State = System.Data.Entity.EntityState.Modified;
                }
                else
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid location details.", ErrorLevel = ErrorLevel.Error };
            }
            #endregion

            //Update
            if (patientDB.id > 0)
            {

                //Find Patient By ID
                Patient patient = _context.Patients.Include("Company").Include("Location").Include("User").Where(p => p.id == patientDB.id).FirstOrDefault<Patient>();

                if (patient != null)
                {
                    #region Patient
                    patient.SSN = patientBO.SSN != null ? patientBO.SSN : patient.SSN;
                    patient.WCBNo = patientBO.WCBNo != null ? patientBO.WCBNo : patient.WCBNo;
                    patient.JobTitle = patientBO.JobTitle != null ? patientBO.JobTitle : patient.JobTitle;
                    patient.WorkActivities = patientBO.WorkActivities != null ? patientBO.WorkActivities : patient.WorkActivities;
                    patient.CarrierCaseNo = patientBO.CarrierCaseNo != null ? patientBO.CarrierCaseNo : patient.CarrierCaseNo;
                    patient.ChartNo = patientBO.ChartNo != null ? patientBO.ChartNo : patient.ChartNo;
                    patient.CompanyID = patientBO.CompanyID != null ? patientBO.CompanyID : patient.CompanyID;
                    patient.LocationID = patientBO.LocationID != null ? patientBO.LocationID : patient.LocationID;
                    patient.IsDeleted = patientBO.IsDeleted.HasValue ? patientBO.IsDeleted : false;
                    patient.UpdateDate = patientBO.UpdateDate;
                    patient.UpdateByUserID = patientBO.UpdateByUserID;
                    #endregion

                    #region Location
                    patient.LocationID = locationBO.ID;
                    patient.Location.Name = locationBO.Name==null?patient.Location.Name:locationBO.Name;
                    patient.Location.LocationType = locationBO.LocationType==null? patient.Location.LocationType: System.Convert.ToByte(locationBO.LocationType);
                    patient.Location.IsDefault = locationBO.IsDefault;
                    patient.Location.IsDeleted = locationBO.IsDeleted == null ? locationBO.IsDeleted : locationDB.IsDeleted;
                    patient.Location.UpdateDate = locationBO.UpdateDate;
                    patient.Location.UpdateByUserID = locationBO.UpdateByUserID;
                    #endregion

                    #region user
                    if (userBO.UpdateByUserID.HasValue)
                        patient.User.UpdateByUserID = userBO.UpdateByUserID.Value;
                    patient.User.UpdateDate = DateTime.UtcNow;
                    patient.User.IsDeleted = userBO.IsDeleted;
                    
                    patient.User.UserName = userBO.UserName == null ? patient.User.UserName : userBO.UserName;
                    patient.User.FirstName = userBO.FirstName == null ? patient.User.FirstName : userBO.FirstName;
                    patient.User.MiddleName = userBO.MiddleName == null ? patient.User.MiddleName : userBO.MiddleName;
                    patient.User.LastName = userBO.LastName == null ? patient.User.LastName : userBO.LastName;
                    patient.User.Gender = System.Convert.ToByte(userBO.Gender);
                    patient.User.UserType = System.Convert.ToByte(userBO.UserType);
                    patient.User.UserStatus = System.Convert.ToByte(userBO.Status);
                    patient.User.ImageLink = userBO.ImageLink;
                    patient.User.DateOfBirth = userBO.DateOfBirth;


                    #endregion

                    #region compnay
                    patient.CompanyID = companyBO.ID;
                    #endregion

                    _context.Entry(patient).State = System.Data.Entity.EntityState.Modified;
                }

            }
            else
            {
                patientDB.CreateDate = companyBO.CreateDate;
                patientDB.CreateByUserID = companyBO.CreateByUserID;

                locationDB.CreateDate = companyBO.CreateDate;
                locationDB.CreateByUserID = companyBO.CreateByUserID;

                userDB.CreateDate = companyBO.CreateDate;
                userDB.CreateByUserID = companyBO.CreateByUserID;

                _dbSet.Add(patientDB);
            }
            _context.SaveChanges();

            var res = Convert<BO.Patient, Patient>(patientDB);
            return (object)res;
        }
        #endregion

        #region Delete
        public override object Delete<T>(T entity)
        {
            BO.Patient patientBO = entity as BO.Patient;

            Patient doctorDB = new Patient();
            doctorDB.id = patientBO.ID;
            _dbSet.Remove(_context.Patients.Single<Patient>(p => p.id == patientBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return patientBO;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.Patients.Include("User").Include("Company").Include("Location").Where(p => p.id == id && p.IsDeleted == false).FirstOrDefault<Patient>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                BO.Patient acc_ = Convert<BO.Patient, Patient>(acc);
                return (object)acc_;
            }            
        }
        #endregion

        #region Get By Filter
        public override object Get<T>(T entity)
        {
            BO.Patient patientBO = (BO.Patient)(object)entity;
            var acc_ = _context.Patients.Include("User").Include("Company").Include("Location").Where(p => p.IsDeleted == false || p.IsDeleted == null).ToList<Patient>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.Patient> lstpatients = new List<BO.Patient>();
            foreach (Patient item in acc_)
            {
                lstpatients.Add(Convert<BO.Patient, Patient>(item));
            }
            return lstpatients;
        }
        #endregion

        #region Update
        public override object Update<T>(T entity)
        {
            BO.Patient patientBO = (BO.Patient)(object)entity;
            BO.Company companyBO = patientBO.Company;
            BO.Location locationBO = patientBO.Location;
            BO.User userBO = patientBO.User;

            Patient patient = _context.Patients.Include("Company").Include("Location").Include("User")
                                      .Where(p => p.id == patientBO.ID)
                                      .FirstOrDefault<Patient>();

            #region Patient
            patient.id = patientBO.ID;
            patient.PatientID = patientBO.PatientID;
            patient.SSN = patientBO.SSN;
            patient.WCBNo = patientBO.WCBNo;
            patient.JobTitle = patientBO.JobTitle;
            patient.WorkActivities = patientBO.WorkActivities;
            patient.CarrierCaseNo = patientBO.CarrierCaseNo;
            patient.ChartNo = patientBO.ChartNo;

            if (patientBO.Company == null)
            {
                patient.CompanyID = patientBO.CompanyID != 0 ? patientBO.CompanyID : patient.CompanyID;
            }
            else
            {
                patient.CompanyID = companyBO.ID != 0 ? companyBO.ID : patient.CompanyID;
            }

            if (patientBO.Location == null)
            {
                patient.LocationID = patientBO.LocationID;
            }
            else
            {
                patient.LocationID = locationBO.ID;
            }

            patient.IsDeleted = patientBO.IsDeleted.HasValue ? patientBO.IsDeleted : false;
            patient.UpdateDate = patientBO.UpdateDate;
            patient.UpdateByUserID = patientBO.UpdateByUserID;
            #endregion

            _context.Entry(patient).State = System.Data.Entity.EntityState.Modified;

            _context.SaveChanges();

            patient = _context.Patients.Include("Company").Include("Location").Include("User")
                                       .Where(p => p.id == patientBO.ID)
                                       .FirstOrDefault<Patient>();

            var res = Convert<BO.Patient, Patient>(patient);

            return (object)res;
        }
        #endregion

        #region Add
        public override object Add<T>(T entity)
        {
            BO.Patient patientBO = (BO.Patient)(object)entity;
            BO.Company companyBO = patientBO.Company;
            BO.Location locationBO = patientBO.Location;
            BO.User userBO = patientBO.User;
            BO.AddressInfo addressBO = patientBO.User.AddressInfo;
            BO.ContactInfo contactinfoBO = patientBO.User.ContactInfo;

            Guid invitationDB_UniqueID = Guid.NewGuid();

            Patient patientDB = new Patient();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                Company companyDB = new Company();
                Location locationDB = new Location();
                User userDB = new User();
                AddressInfo addressDB = new AddressInfo();
                ContactInfo contactinfoDB = new ContactInfo();

                #region Address
                if (addressBO != null)
                {
                    bool Add_addressDB = false;
                    addressDB = _context.AddressInfoes.Where(p => p.id == addressBO.ID).FirstOrDefault();
                    
                    if (addressDB == null)
                    {
                        addressDB = new AddressInfo();
                        Add_addressDB = true;
                    }
                    addressDB.id = addressBO.ID;
                    addressDB.Name = addressBO.Name;
                    addressDB.Address1 = addressBO.Address1;
                    addressDB.Address2 = addressBO.Address2;
                    addressDB.City = addressBO.City;
                    addressDB.State = addressBO.State;
                    addressDB.ZipCode = addressBO.ZipCode;
                    addressDB.Country = addressBO.Country;

                    if (Add_addressDB == true)
                    {
                        addressDB = _context.AddressInfoes.Add(addressDB);
                        _context.SaveChanges();
                    }
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Address details.", ErrorLevel = ErrorLevel.Error };
                }
                #endregion                

                #region Contact Info
                if (contactinfoBO != null)
                {
                    bool Add_contactinfoDB = false;
                    contactinfoDB = _context.ContactInfoes.Where(p => p.id == contactinfoBO.ID).FirstOrDefault();

                    if (contactinfoDB == null)
                    {
                        contactinfoDB = new ContactInfo();
                        Add_contactinfoDB = true;
                    }
                    contactinfoDB.id = contactinfoBO.ID;
                    contactinfoDB.Name = contactinfoBO.Name;
                    contactinfoDB.CellPhone = contactinfoBO.CellPhone;
                    contactinfoDB.EmailAddress = contactinfoBO.EmailAddress;
                    contactinfoDB.HomePhone = contactinfoBO.HomePhone;
                    contactinfoDB.WorkPhone = contactinfoBO.WorkPhone;
                    contactinfoDB.FaxNo = contactinfoBO.FaxNo;
                    contactinfoDB.IsDeleted = contactinfoBO.IsDeleted;

                    if (Add_contactinfoDB == true)
                    {
                        contactinfoDB = _context.ContactInfoes.Add(contactinfoDB);
                        _context.SaveChanges();
                    }
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
                    userDB = _context.Users.Where(p => p.UserName == userBO.UserName).FirstOrDefault();

                    if (userDB == null)
                    {
                        userDB = new User();
                        userDB.UserName = userBO.UserName;
                        userDB.FirstName = userBO.FirstName;
                        userDB.MiddleName = userBO.MiddleName;
                        userDB.LastName = userBO.LastName;
                        userDB.Gender = System.Convert.ToByte(userBO.Gender);
                        userDB.UserType = System.Convert.ToByte(userBO.UserType);
                        userDB.UserStatus = System.Convert.ToByte(userBO.Status);
                        userDB.ImageLink = userBO.ImageLink;
                        userDB.DateOfBirth = userBO.DateOfBirth;
                        if (userBO.Password != null)
                            userDB.Password = PasswordHash.HashPassword(userBO.Password);
                        userDB.IsDeleted = userBO.IsDeleted;

                        userDB.AddressId = addressDB.id;
                        userDB.ContactInfoId = contactinfoDB.id;

                        if (userDB.UpdateByUserID.HasValue)
                            userDB.UpdateByUserID = userBO.UpdateByUserID.Value;
                        userDB.UpdateDate = DateTime.UtcNow;
                        userDB.IsDeleted = userBO.IsDeleted;

                        userDB = _context.Users.Add(userDB);
                        _context.SaveChanges();
                    }
                    else
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "User Name already exists.", ErrorLevel = ErrorLevel.Error };
                    }
                    
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid User details.", ErrorLevel = ErrorLevel.Error };
                }
                #endregion                

                #region Patient
                patientDB.PatientID = userDB.id;
                patientDB.SSN = patientBO.SSN;
                patientDB.WCBNo = patientBO.WCBNo;
                patientDB.JobTitle = patientBO.JobTitle;
                patientDB.WorkActivities = patientBO.WorkActivities;
                patientDB.CarrierCaseNo = patientBO.CarrierCaseNo;
                patientDB.ChartNo = patientBO.ChartNo;
                patientDB.IsDeleted = patientBO.IsDeleted.HasValue ? patientBO.IsDeleted : false;

                companyDB = _context.Companies.Where(p => p.id == patientBO.CompanyID).FirstOrDefault();
                if (companyDB != null)
                {
                    patientDB.CompanyID = patientBO.CompanyID;
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid User Company Id.", ErrorLevel = ErrorLevel.Error };
                }

                locationDB = _context.Locations.Where(p => p.id == patientBO.LocationID && p.CompanyID == patientBO.CompanyID).FirstOrDefault();
                if (locationDB != null)
                {
                    patientDB.LocationID = patientBO.LocationID;
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid User Location Id.", ErrorLevel = ErrorLevel.Error };
                }

                patientDB = _context.Patients.Add(patientDB);
                _context.SaveChanges();
                #endregion

                #region Insert Invitation
                Invitation invitationDB = new Invitation();
                invitationDB.User = userDB;

                invitationDB_UniqueID = Guid.NewGuid();

                invitationDB.UniqueID = invitationDB_UniqueID;
                invitationDB.CompanyID = patientBO.CompanyID;
                invitationDB.CreateDate = DateTime.UtcNow;
                invitationDB.CreateByUserID = patientBO.CompanyID;
                _context.Invitations.Add(invitationDB);
                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                patientDB = _context.Patients.Include("Company").Include("Location").Where(p => p.id == patientDB.id).FirstOrDefault<Patient>();
            }

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

            var res = Convert<BO.Patient, Patient>(patientDB);
            return (object)res;
        }
        #endregion

        #region Update2
        public override object Save2<T>(T entity)
        {
            BO.Patient patientBO = (BO.Patient)(object)entity;
            BO.Company companyBO = patientBO.Company;
            BO.Location locationBO = patientBO.Location;
            BO.User userBO = patientBO.User;
            BO.AddressInfo addressBO = patientBO.User.AddressInfo;
            BO.ContactInfo contactinfoBO = patientBO.User.ContactInfo;

            Patient patientDB = new Patient();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                Company companyDB = new Company();
                Location locationDB = new Location();
                User userDB = new User();
                AddressInfo addressDB = new AddressInfo();
                ContactInfo contactinfoDB = new ContactInfo();

                #region Address
                if (addressBO != null)
                {
                    bool Add_addressDB = false;
                    addressDB = _context.AddressInfoes.Where(p => p.id == addressBO.ID).FirstOrDefault();

                    if (addressDB == null && addressBO.ID <= 0)
                    {
                        addressDB = new AddressInfo();
                        Add_addressDB = true;
                    }
                    else if (addressDB == null && addressBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Address details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    addressDB.id = addressBO.ID;
                    addressDB.Name = addressBO.Name;
                    addressDB.Address1 = addressBO.Address1;
                    addressDB.Address2 = addressBO.Address2;
                    addressDB.City = addressBO.City;
                    addressDB.State = addressBO.State;
                    addressDB.ZipCode = addressBO.ZipCode;
                    addressDB.Country = addressBO.Country;

                    if (Add_addressDB == true)
                    {
                        addressDB = _context.AddressInfoes.Add(addressDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Address details.", ErrorLevel = ErrorLevel.Error };
                }
                #endregion                

                #region Contact Info
                if (contactinfoBO != null)
                {
                    bool Add_contactinfoDB = false;
                    contactinfoDB = _context.ContactInfoes.Where(p => p.id == contactinfoBO.ID).FirstOrDefault();

                    if (contactinfoDB == null && contactinfoBO.ID <= 0)
                    {
                        contactinfoDB = new ContactInfo();
                        Add_contactinfoDB = true;
                    }
                    else if (contactinfoDB == null && contactinfoBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Contact details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }
                    contactinfoDB.id = contactinfoBO.ID;
                    contactinfoDB.Name = contactinfoBO.Name;
                    contactinfoDB.CellPhone = contactinfoBO.CellPhone;
                    contactinfoDB.EmailAddress = contactinfoBO.EmailAddress;
                    contactinfoDB.HomePhone = contactinfoBO.HomePhone;
                    contactinfoDB.WorkPhone = contactinfoBO.WorkPhone;
                    contactinfoDB.FaxNo = contactinfoBO.FaxNo;
                    contactinfoDB.IsDeleted = contactinfoBO.IsDeleted;

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
                    
                    if (Add_userDB == true)
                    {
                        userDB.Password = PasswordHash.HashPassword(userBO.Password);
                    }

                    userDB.AddressId = addressDB.id;
                    userDB.ContactInfoId = contactinfoDB.id;

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

                #region Patient
                if (patientBO != null)
                {
                    bool Add_patientDB = false;
                    patientDB = _context.Patients.Where(p => p.id == patientBO.ID).FirstOrDefault();

                    if (patientDB == null && patientBO.ID <= 0)
                    {
                        patientDB = new Patient();
                        Add_patientDB = true;
                    }
                    else if (patientDB == null && patientBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    patientDB.PatientID = userDB.id;
                    patientDB.SSN = patientBO.SSN;
                    patientDB.WCBNo = patientBO.WCBNo;
                    patientDB.JobTitle = patientBO.JobTitle;
                    patientDB.WorkActivities = patientBO.WorkActivities;
                    patientDB.CarrierCaseNo = patientBO.CarrierCaseNo;
                    patientDB.ChartNo = patientBO.ChartNo;
                    patientDB.IsDeleted = patientBO.IsDeleted.HasValue ? patientBO.IsDeleted : false;

                    companyDB = _context.Companies.Where(p => p.id == patientBO.CompanyID).FirstOrDefault();
                    if (companyDB != null)
                    {
                        patientDB.CompanyID = patientBO.CompanyID;
                    }
                    else
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid User Company Id.", ErrorLevel = ErrorLevel.Error };
                    }

                    locationDB = _context.Locations.Where(p => p.id == patientBO.LocationID && p.CompanyID == patientBO.CompanyID).FirstOrDefault();
                    if (locationDB != null)
                    {
                        patientDB.LocationID = patientBO.LocationID;
                    }
                    else
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid User Location Id.", ErrorLevel = ErrorLevel.Error };
                    }

                    if (Add_patientDB == true)
                    {
                        patientDB = _context.Patients.Add(patientDB);
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

                dbContextTransaction.Commit();

                patientDB = _context.Patients.Include("Company").Include("Location").Where(p => p.id == patientDB.id).FirstOrDefault<Patient>();
            }

            var res = Convert<BO.Patient, Patient>(patientDB);
            return (object)res;
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
