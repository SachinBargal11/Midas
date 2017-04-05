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
    internal class DoctorRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<Doctor> _dbSet;
        private DbSet<DoctorSpeciality> _dbSetDocSpecility;

        #region Constructor
        public DoctorRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSetDocSpecility = context.Set<DoctorSpeciality>();
            _dbSet = context.Set<Doctor>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
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
            doctorBO.TaxType = (BO.GBEnums.TaxType)doctor.TaxType;

            if (doctor.IsDeleted.HasValue)
                doctorBO.IsDeleted = doctor.IsDeleted.Value;
            if (doctor.UpdateByUserID.HasValue)
                doctorBO.UpdateByUserID = doctor.UpdateByUserID.Value;

            if (doctor.User != null)
            {
                BO.User boUser = new BO.User();
                using (UserRepository sr = new UserRepository(_context))
                {
                    boUser = sr.Convert<BO.User, User>(doctor.User);
                    doctorBO.user = boUser;             
                }

                List<BO.DoctorSpeciality> lstDoctorSpecility = new List<BO.DoctorSpeciality>();
                foreach (var item in doctor.DoctorSpecialities)
                {
                    using (DoctorSpecialityRepository sr = new DoctorSpecialityRepository(_context))
                    {
                        lstDoctorSpecility.Add(sr.ObjectConvert<BO.DoctorSpeciality, DoctorSpeciality>(item));
                    }
                }
                doctorBO.DoctorSpecialities = lstDoctorSpecility;

                List<BO.UserCompany> lstUserCompany = new List<BO.UserCompany>();
                foreach (var item in doctor.User.UserCompanies)
                {
                    using (UserCompanyRepository sr = new UserCompanyRepository(_context))
                    {
                        lstUserCompany.Add(sr.Convert<BO.UserCompany, UserCompany>(item));
                    }


                }
                doctorBO.user.UserCompanies = lstUserCompany;

                List<BO.DoctorLocationSchedule> lstDoctorLocationSchedule = new List<BO.DoctorLocationSchedule>();
                foreach (var item in doctor.DoctorLocationSchedules)
                {
                    using (DoctorLocationScheduleRepository sr = new DoctorLocationScheduleRepository(_context))
                    {
                        lstDoctorLocationSchedule.Add(sr.Convert<BO.DoctorLocationSchedule, DoctorLocationSchedule>(item));
                    }


                }
                doctorBO.DoctorLocationSchedules = lstDoctorLocationSchedule;




            }

            return (T)(object)doctorBO;
        }
        #endregion
        #region Entity Conversion
        public override T ObjectConvert<T, U>(U entity)
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
            doctorBO.TaxType = (BO.GBEnums.TaxType)doctor.TaxType;

            if (doctor.IsDeleted.HasValue)
                doctorBO.IsDeleted = doctor.IsDeleted.Value;
            if (doctor.UpdateByUserID.HasValue)
                doctorBO.UpdateByUserID = doctor.UpdateByUserID.Value;

            if (doctor.DoctorSpecialities != null)
            {
                List<BO.DoctorSpeciality> lstDoctorSpecility = new List<BO.DoctorSpeciality>();
                foreach (var item in doctor.DoctorSpecialities)
                {
                    using (DoctorSpecialityRepository sr = new DoctorSpecialityRepository(_context))
                    {
                        lstDoctorSpecility.Add(sr.ObjectConvert<BO.DoctorSpeciality, DoctorSpeciality>(item));
                    }
                }
                doctorBO.DoctorSpecialities = lstDoctorSpecility;
            }


            return (T)(object)doctorBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Doctor doctor = (BO.Doctor)(object)entity;
            var result = doctor.Validate(doctor);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.Doctor doctorBO = (BO.Doctor)(object)entity;
            BO.ErrorObject errObj = new BO.ErrorObject();
            BO.User userBO = new BO.User();
            Doctor doctorDB = new Doctor();
            User userDB = new User();
            List<DoctorSpeciality> lstDoctorSpecility = new List<DoctorSpeciality>();
            doctorDB.Id = doctorBO.ID;

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                ////Find Record By ID
                User user_ = _context.Users.Include("UserCompanyRoles").Include("AddressInfo").Include("ContactInfo").Where(p => p.id == doctorBO.user.ID).FirstOrDefault<User>();
                if (user_ != null)
                {
                    BO.AddUser updUserBO = new BO.AddUser();                    
                    updUserBO.user = doctorBO.user;
                    updUserBO.user.UserName = string.IsNullOrEmpty(user_.UserName) ? user_.UserName : doctorBO.user.UserName;
                    updUserBO.user.FirstName = string.IsNullOrEmpty(user_.FirstName) ? user_.FirstName : doctorBO.user.FirstName;
                    updUserBO.user.LastName = string.IsNullOrEmpty(user_.LastName) ? user_.LastName : doctorBO.user.LastName;
                    updUserBO.user.MiddleName = string.IsNullOrEmpty(user_.MiddleName) ? user_.MiddleName: doctorBO.user.MiddleName;                    
                    updUserBO.user.Gender = doctorBO.user.Gender;
                    updUserBO.user.UserType = !Enum.IsDefined(typeof(BO.GBEnums.UserType), doctorBO.user.UserType) ? (BO.GBEnums.UserType)user_.UserType : doctorBO.user.UserType;
                    updUserBO.user.ImageLink = string.IsNullOrEmpty(doctorBO.user.ImageLink) ? user_.ImageLink : doctorBO.user.ImageLink;
                    updUserBO.user.C2FactAuthEmailEnabled = doctorBO.user.C2FactAuthEmailEnabled == true || doctorBO.user.C2FactAuthEmailEnabled == false ? doctorBO.user.C2FactAuthEmailEnabled : (bool)user_.C2FactAuthEmailEnabled;
                    updUserBO.user.C2FactAuthEmailEnabled = doctorBO.user.C2FactAuthSMSEnabled == true || doctorBO.user.C2FactAuthSMSEnabled == false ? doctorBO.user.C2FactAuthSMSEnabled : (bool)user_.C2FactAuthSMSEnabled;
                    updUserBO.user.ID = doctorBO.user.ID;                    
                    updUserBO.user.Roles = doctorBO.user.Roles;                    
                    updUserBO.company = doctorBO.user.UserCompanies.ToList().Select(p => p.Company).FirstOrDefault();
                    updUserBO.role = doctorBO.user.Roles.ToArray();
                   // if (doctorBO.DoctorSpecialities.Count > 0) updUserBO.DoctorSpecialities = doctorBO.user.DoctorSpecialities;
                    if (doctorBO.user.AddressInfo != null && doctorBO.user.AddressInfo.ID > 0) updUserBO.address = doctorBO.user.AddressInfo;
                    if (doctorBO.user.ContactInfo != null && doctorBO.user.ContactInfo.ID > 0) updUserBO.contactInfo = doctorBO.user.ContactInfo;
                    using (UserRepository userRepo = new UserRepository(_context))
                    {
                        object obj = userRepo.Save<BO.AddUser>(updUserBO);
                        if (obj.GetType() == errObj.GetType())
                        {
                            errObj = (BO.ErrorObject)obj;
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { ErrorMessage = errObj.ErrorMessage, errorObject = "", ErrorLevel = ErrorLevel.Error };
                        }
                        else userBO = (BO.User)obj;                        
                        doctorDB.User = _context.Users.Include("UserCompanyRoles").Include("UserCompanies").Where(p => p.id == doctorBO.user.ID).FirstOrDefault<User>();
                    }                    
                    //_context.Entry(user_).State = System.Data.Entity.EntityState.Modified;
                }
                else
                {
                    BO.AddUser addUserBO = new BO.AddUser();
                    addUserBO.user = doctorBO.user;
                   // addUserBO.user.DoctorSpecialities = doctorBO.DoctorSpecialities;
                    addUserBO.user.Roles = doctorBO.user.Roles;
                    addUserBO.company = doctorBO.user.UserCompanies.ToList().Select(p => p.Company).FirstOrDefault();
                    addUserBO.role = doctorBO.user.Roles.ToArray();
                    addUserBO.address = doctorBO.user.AddressInfo;
                    addUserBO.contactInfo = doctorBO.user.ContactInfo;
                    using (UserRepository userRepo = new UserRepository(_context))
                    {
                        object obj = userRepo.Save<BO.AddUser>(addUserBO);
                        if (obj.GetType() == errObj.GetType())
                        {
                            errObj = (BO.ErrorObject)obj;
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { ErrorMessage = errObj.ErrorMessage, errorObject = "", ErrorLevel = ErrorLevel.Error };
                        }
                        else userBO = (BO.User)obj;
                        doctorBO.user.ID = userBO.ID;
                        doctorDB.User = _context.Users.Include("UserCompanyRoles").Include("UserCompanies").Where(p => p.id == doctorBO.user.ID && p.UserCompanyRoles.Any(x => x.RoleID == (int)BO.GBEnums.RoleType.Doctor)).FirstOrDefault<User>();
                    }
                }

                if (doctorBO.DoctorSpecialities.Count > 0)
                {
                    //_dbSetDocSpecility.RemoveRange(_context.DoctorSpecialities.Where(c => c.DoctorID == doctorBO.user.ID));
                    //_context.SaveChanges();
                    Specialty specilityDB = null;
                    DoctorSpeciality doctorSpecilityDB = null;
                    foreach (var item in doctorBO.DoctorSpecialities)
                    {
                        BO.DoctorSpeciality doctorSpecialityBO = (BO.DoctorSpeciality)(object)item;
                        specilityDB = new Specialty();
                        doctorSpecilityDB = new DoctorSpeciality();
                        doctorSpecilityDB.IsDeleted = doctorSpecialityBO.IsDeleted.HasValue ? doctorSpecialityBO.IsDeleted.Value : false;
                        doctorSpecilityDB.Doctor  = doctorDB;
                        //Find Record By ID
                        Specialty speclity = _context.Specialties.Where(p => p.id == doctorSpecialityBO.ID).FirstOrDefault<Specialty>();
                        if (speclity == null)
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { ErrorMessage = "Invalid specility " + item.ToString() + " details.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                        }
                        if (!lstDoctorSpecility.Select(p => p.Specialty).Contains(speclity))
                        {
                            doctorSpecilityDB.Specialty = speclity;
                            _context.Entry(speclity).State = System.Data.Entity.EntityState.Modified;
                            lstDoctorSpecility.Add(doctorSpecilityDB);
                        };
                    }
                }
                doctorDB.DoctorSpecialities = lstDoctorSpecility;
                
                if (doctorDB.Id > 0)
                {
                    //Find Doctor By ID
                    Doctor doctor = _context.Doctors.Where(p => p.Id == doctorDB.Id).FirstOrDefault<Doctor>();

                    if (doctor != null)
                    {
                        #region Doctor
                        // doctorDB.Id = doctorBO.ID;
                        doctorDB.LicenseNumber = string.IsNullOrEmpty(doctorBO.LicenseNumber) ? doctor.LicenseNumber : doctorBO.LicenseNumber;
                        doctorDB.WCBAuthorization = string.IsNullOrEmpty(doctorBO.WCBAuthorization) ? doctor.WCBAuthorization : doctorBO.WCBAuthorization;
                        doctorDB.WcbRatingCode = string.IsNullOrEmpty(doctorBO.WcbRatingCode) ? doctor.WcbRatingCode : doctorBO.WcbRatingCode;
                        doctorDB.NPI = string.IsNullOrEmpty(doctorBO.NPI) ? doctor.NPI : doctorBO.NPI;
                        doctorDB.Title = string.IsNullOrEmpty(doctorBO.Title) ? doctor.Title : doctorBO.Title;
                        doctorDB.TaxType = !Enum.IsDefined(typeof(BO.GBEnums.TaxType), doctorBO.TaxType) ? System.Convert.ToByte((BO.GBEnums.TaxType)doctor.TaxType) : System.Convert.ToByte(doctorBO.TaxType);
                        doctorDB.IsDeleted = doctorBO.IsDeleted.HasValue ? doctorBO.IsDeleted : (doctorBO.IsDeleted.HasValue ? doctor.IsDeleted : false);
                        doctorDB.UpdateDate = doctorBO.UpdateDate;
                        doctorDB.UpdateByUserID = doctorBO.UpdateByUserID;
                        #endregion
                       // doctorDB = doctor;                                
                       // _context.Entry(doctorDB).State = System.Data.Entity.EntityState.Modified;
                    }
                    else
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { ErrorMessage = "Please pass valid doctor details.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                }
                else
                {
                    doctorDB.LicenseNumber = doctorBO.LicenseNumber;
                    doctorDB.WCBAuthorization = doctorBO.WCBAuthorization;
                    doctorDB.WcbRatingCode = doctorBO.WcbRatingCode;
                    doctorDB.NPI = doctorBO.NPI;
                    doctorDB.Title = doctorBO.Title;
                    doctorDB.TaxType = System.Convert.ToByte(doctorBO.TaxType);
                    doctorDB.IsDeleted = doctorBO.IsDeleted.HasValue ? doctorBO.IsDeleted : false;
                    doctorDB.UpdateDate = doctorBO.UpdateDate;
                    doctorDB.UpdateByUserID = doctorBO.UpdateByUserID;
                    doctorDB.CreateDate = doctorBO.CreateDate;
                    doctorDB.CreateByUserID = doctorBO.CreateByUserID;

                    _dbSet.Add(doctorDB);
                }
                _context.SaveChanges();
                dbContextTransaction.Commit();
            }
            var res = Convert<BO.Doctor, Doctor>(doctorDB);
            return (object)res;
        }
        #endregion

        #region Delete
        public override object Delete(int id)
        {
                      
            Doctor doctorDB = new Doctor();
           

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                doctorDB = _context.Doctors.Where(p => p.Id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault();

                if (doctorDB != null)
                {
                    doctorDB.IsDeleted = true;
                    _context.SaveChanges();                   
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Doctor details dosent exists.", ErrorLevel = ErrorLevel.Error };
                }
                dbContextTransaction.Commit();

            }
            var res = ObjectConvert<BO.Doctor, Doctor>(doctorDB);
            return (object)res;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            //BO.Doctor acc_ = Convert<BO.Doctor, Doctor>(_context.Doctors.Include("User").Include("User.UserCompanyRoles").Where(p => p.Id == id && p.IsDeleted == false).Include(a => a.User.DoctorSpecialities).FirstOrDefault<Doctor>());
            //if (acc_ == null)
            //{
            //    return new BO.ErrorObject { ErrorMessage = "No record found for this Specialty.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            //}

            Doctor doctorDB = _context.Doctors.Include("User")
                                              .Include("User.AddressInfo")
                                              .Include("User.ContactInfo")
                                              .Include("DoctorSpecialities")
                                              .Include("DoctorSpecialities.Specialty")
                                              .Include("User.UserCompanyRoles").Where(p => p.Id == id && p.IsDeleted == false).Include(a => a.DoctorSpecialities).FirstOrDefault<Doctor>();

            BO.Doctor doctorBO = new BO.Doctor();

            if (doctorDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Doctor.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                doctorBO = Convert<BO.Doctor, Doctor>(doctorDB);
            }

            return (object)doctorBO;
        }
        #endregion

        #region Get By Company ID
        public override object GetByCompanyId(int id)
        {
            var doctorDB = _context.Doctors.Include("User")
                                           .Include("User.AddressInfo")
                                           .Include("User.ContactInfo")
                                           .Include("DoctorSpecialities")
                                           .Include("DoctorSpecialities.Specialty")
                                           .Include("User.UserCompanyRoles")
                                           .Where(p => (p.User.IsDeleted.HasValue == false || (p.User.IsDeleted.HasValue == true && p.User.IsDeleted.Value == false)) 
                                                     && p.User.UserCompanies.Where(p2 => (p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false)))
                                                                            .Any(p3 => p3.CompanyID == id)
                                                     && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                           .ToList<Doctor>();




            BO.Doctor doctorBO = new BO.Doctor();
            List<BO.Doctor> boDoctor = new List<BO.Doctor>();
            if (doctorDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Doctor.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
              
                foreach(var EachDoctor in doctorDB)
                {
                    boDoctor.Add(Convert<BO.Doctor, Doctor>(EachDoctor));
                }
              
            }

            return (object)boDoctor;
        }
        #endregion

        #region GetByLocationAndSpecialty
        public override object GetByLocationAndSpecialty(int locationId, int specialtyId)
        {
            List<int> doctorInLocation = _context.DoctorLocationSchedules.Where(p => p.LocationID == locationId 
                                                                          && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                          .Select(p => p.DoctorID)
                                                                          .Distinct()
                                                                          .ToList();

            List<int> doctorWithSpecialty = _context.DoctorSpecialities.Where(p => p.SpecialityID == specialtyId
                                                                               && (p.IsDeleted == false))
                                                                               .Select(p => p.DoctorID)
                                                                               .Distinct()
                                                                               .ToList();

            var acc_ = _context.Doctors.Where(p => doctorInLocation.Contains(p.Id) && doctorWithSpecialty.Contains(p.Id)
                                                 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                 .ToList();

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Specialty.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.Doctor> doctorBO = new List<BO.Doctor>();

            foreach (Doctor item in acc_)
            {
                doctorBO.Add(Convert<BO.Doctor, Doctor>(item));
            }
            return (object)doctorBO;
        }
        #endregion

        #region GetBySpecialty
        public override object GetBySpecialityInAllApp(int specialtyId)
        {

            var acc_ = _context.Doctors.Include("User").Include("DoctorSpecialities.Specialty").Include("User.UserCompanies.Company").Include("DoctorLocationSchedules.Location").Where(p => p.DoctorSpecialities.Where(p2 => p2.IsDeleted == false).Any(p3 => p3.SpecialityID == specialtyId)
                                              && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                              .ToList();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Specialty.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.Doctor> doctorBO = new List<BO.Doctor>();

            foreach (Doctor item in acc_)
            {
                doctorBO.Add(Convert<BO.Doctor, Doctor>(item));
            }
            return (object)doctorBO;
        }
        #endregion

        #region GetAll
        public override object Get()
        {
            //BO.Doctor doctorBO = (BO.Doctor)(object)entity;

            var acc_ = _context.Doctors.Include("User").Include("User.UserCompanyRoles").Where(p => p.IsDeleted == false || p.IsDeleted == null).Include(a => a.DoctorSpecialities).ToList<Doctor>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.Doctor> lstDoctors = new List<BO.Doctor>();
            foreach (Doctor item in acc_)
            {
                lstDoctors.Add(Convert<BO.Doctor, Doctor>(item));
            }
            return lstDoctors;
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
