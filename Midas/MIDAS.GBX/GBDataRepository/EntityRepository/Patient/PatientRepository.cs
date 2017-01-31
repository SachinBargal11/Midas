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

                addressDB = _context.AddressInfoes.Add(addressDB);

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

                contactinfoDB = _context.ContactInfoes.Add(contactinfoDB);

                #region User
                if (userDB.UpdateByUserID.HasValue)
                    userDB.UpdateByUserID = userBO.UpdateByUserID.Value;
                userDB.UpdateDate = DateTime.UtcNow;
                userDB.IsDeleted = userBO.IsDeleted;
                userDB.UserName = userBO.UserName == null ? userDB.UserName : userBO.UserName;
                userDB.FirstName = userBO.FirstName == null ? userDB.FirstName : userBO.FirstName;
                userDB.MiddleName = userBO.MiddleName == null ? userDB.MiddleName : userBO.MiddleName;
                userDB.LastName = userBO.LastName == null ? userDB.LastName : userBO.LastName;
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
                #endregion

                userDB = _context.Users.Add(userDB);

                _context.SaveChanges();

                #region Patient
                //patientDB.id = patientBO.ID;
                patientDB.PatientID = userDB.id;
                patientDB.SSN = patientBO.SSN;
                patientDB.WCBNo = patientBO.WCBNo;
                patientDB.JobTitle = patientBO.JobTitle;
                patientDB.WorkActivities = patientBO.WorkActivities;
                patientDB.CarrierCaseNo = patientBO.CarrierCaseNo;
                patientDB.ChartNo = patientBO.ChartNo;
                patientDB.IsDeleted = patientBO.IsDeleted.HasValue ? patientBO.IsDeleted : false;

                patientDB.LocationID = patientBO.LocationID;
                patientDB.CompanyID = patientBO.CompanyID;
                #endregion

                patientDB = _context.Patients.Add(patientDB);

                _context.SaveChanges();

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

        public void Dispose()
        {
            // Use SupressFinalize in case a subclass 
            // of this type implements a finalizer.
            GC.SuppressFinalize(this);
        }
    }
}
