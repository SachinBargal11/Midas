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
        private DbSet<DoctorRoomTestMapping> _dbSetDocRoomTestMapping;

        #region Constructor
        public DoctorRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSetDocSpecility = context.Set<DoctorSpeciality>();
            _dbSet = context.Set<Doctor>();
            _dbSetDocRoomTestMapping = context.Set<DoctorRoomTestMapping>();
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
            doctorBO.TaxType = (BO.GBEnums.TaxType)doctor.TaxTypeId;

            if (doctor.IsDeleted.HasValue)
                doctorBO.IsDeleted = doctor.IsDeleted.Value;
            if (doctor.UpdateByUserID.HasValue)
                doctorBO.UpdateByUserID = doctor.UpdateByUserID.Value;

            doctorBO.IsCalendarPublic = doctor.IsCalendarPublic;
            doctorBO.GenderId = doctor.GenderId;

            if (doctor.User != null)
            {
                if (doctor.User.IsDeleted.HasValue == false || (doctor.User.IsDeleted.HasValue == true && doctor.User.IsDeleted.Value == false))
                {
                    BO.User boUser = new BO.User();
                    using (UserRepository sr = new UserRepository(_context))
                    {
                        boUser = sr.Convert<BO.User, User>(doctor.User);
                        doctorBO.user = boUser;
                    }

                    if (doctor.DoctorSpecialities != null)
                    {
                        List<BO.DoctorSpeciality> lstDoctorSpecility = new List<BO.DoctorSpeciality>();
                        foreach (var item in doctor.DoctorSpecialities)
                        {

                            if (item.IsDeleted == false)
                            {
                                using (DoctorSpecialityRepository sr = new DoctorSpecialityRepository(_context))
                                {
                                    lstDoctorSpecility.Add(sr.ObjectConvert<BO.DoctorSpeciality, DoctorSpeciality>(item));
                                }
                            }
                        }
                        doctorBO.DoctorSpecialities = lstDoctorSpecility;
                    }

                    if (doctor.DoctorRoomTestMappings != null)
                    {
                        List<BO.DoctorRoomTestMapping> lstDoctorRoomTestMapping = new List<BO.DoctorRoomTestMapping>();
                        foreach (var item in doctor.DoctorRoomTestMappings)
                        {

                            if (item.IsDeleted == false)
                            {
                                BO.DoctorRoomTestMapping doctorRoomTestMappingBO = new BO.DoctorRoomTestMapping();
                                doctorRoomTestMappingBO.ID = item.Id;
                                doctorRoomTestMappingBO.IsDeleted = item.IsDeleted;
                                if (doctorRoomTestMappingBO.UpdateByUserID.HasValue)
                                    doctorRoomTestMappingBO.UpdateByUserID = item.UpdateByUserID.Value;

                                if (item.RoomTest != null && (item.RoomTest.IsDeleted.HasValue == false || (item.RoomTest.IsDeleted.HasValue == true && item.RoomTest.IsDeleted.Value == false)))
                                {
                                    BO.RoomTest boRoomTest = new BO.RoomTest();
                                    using (RoomTestRepository sr = new RoomTestRepository(_context))
                                    {
                                        boRoomTest = sr.Convert<BO.RoomTest, RoomTest>(item.RoomTest);
                                        doctorRoomTestMappingBO.RoomTest = boRoomTest;
                                    }
                                }
                                lstDoctorRoomTestMapping.Add(doctorRoomTestMappingBO);
                            }
                        }
                        doctorBO.DoctorRoomTestMappings = lstDoctorRoomTestMapping;
                    }

                    //if (doctor.User.UserCompanies != null && doctorBO.user.UserCompanies != null && doctorBO.user.UserCompanies.Count <= 0)
                    if (doctor.User.UserCompanies != null)
                    {
                        List<BO.UserCompany> lstUserCompany = new List<BO.UserCompany>();
                        foreach (var item in doctor.User.UserCompanies)
                        {
                            if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                            {
                                using (UserCompanyRepository sr = new UserCompanyRepository(_context))
                                {
                                    BO.UserCompany BOUserCompany = new BO.UserCompany();
                                    BOUserCompany = sr.Convert<BO.UserCompany, UserCompany>(item);
                                    BOUserCompany.User = null;
                                    lstUserCompany.Add(BOUserCompany);
                                }
                            }


                        }
                        doctorBO.user.UserCompanies = lstUserCompany;
                    }

                    if (doctor.DoctorLocationSchedules != null)
                    {
                        List<BO.DoctorLocationSchedule> lstDoctorLocationSchedule = new List<BO.DoctorLocationSchedule>();
                        foreach (var item in doctor.DoctorLocationSchedules)
                        {
                            if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                            {
                                using (DoctorLocationScheduleRepository sr = new DoctorLocationScheduleRepository(_context))
                                {
                                    BO.DoctorLocationSchedule BODoctorLocationSchedule = new BO.DoctorLocationSchedule();
                                    BODoctorLocationSchedule = sr.Convert<BO.DoctorLocationSchedule, DoctorLocationSchedule>(item);
                                    BODoctorLocationSchedule.doctor = null;
                                    BODoctorLocationSchedule.schedule = null;
                                    lstDoctorLocationSchedule.Add(BODoctorLocationSchedule);
                                }
                            }


                        }
                        doctorBO.DoctorLocationSchedules = lstDoctorLocationSchedule;
                    }
                }

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
            doctorBO.TaxType = (BO.GBEnums.TaxType)doctor.TaxTypeId;

            if (doctor.IsDeleted.HasValue)
                doctorBO.IsDeleted = doctor.IsDeleted.Value;
            if (doctor.UpdateByUserID.HasValue)
                doctorBO.UpdateByUserID = doctor.UpdateByUserID.Value;

            doctorBO.IsCalendarPublic = doctor.IsCalendarPublic;

            if (doctor.DoctorSpecialities != null)
            {
                List<BO.DoctorSpeciality> lstDoctorSpecility = new List<BO.DoctorSpeciality>();
                foreach (var item in doctor.DoctorSpecialities)
                {
                    if (item.IsDeleted == false)
                    {

                        using (DoctorSpecialityRepository sr = new DoctorSpecialityRepository(_context))
                        {
                            lstDoctorSpecility.Add(sr.ObjectConvert<BO.DoctorSpeciality, DoctorSpeciality>(item));
                        }
                    }
                }
                doctorBO.DoctorSpecialities = lstDoctorSpecility;
            }


            return (T)(object)doctorBO;
        }

        public override T ObjectConvertbySpecialtyId<T, U>(U entity, int specialtyId)
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
            doctorBO.TaxType = (BO.GBEnums.TaxType)doctor.TaxTypeId;

            if (doctor.IsDeleted.HasValue)
                doctorBO.IsDeleted = doctor.IsDeleted.Value;
            if (doctor.UpdateByUserID.HasValue)
                doctorBO.UpdateByUserID = doctor.UpdateByUserID.Value;

            doctorBO.IsCalendarPublic = doctor.IsCalendarPublic;

            if (doctor.DoctorSpecialities != null)
            {
                List<BO.DoctorSpeciality> lstDoctorSpecility = new List<BO.DoctorSpeciality>();
                foreach (var item in doctor.DoctorSpecialities)
                {
                    if (item.IsDeleted == false)
                    {
                        if (item.SpecialityID == specialtyId)
                        {
                            using (DoctorSpecialityRepository sr = new DoctorSpecialityRepository(_context))
                            {
                                lstDoctorSpecility.Add(sr.ObjectConvert<BO.DoctorSpeciality, DoctorSpeciality>(item));
                            }
                        }
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
            List<DoctorRoomTestMapping> lstDoctorRoomTestMapping = new List<DoctorRoomTestMapping>();
            List<ProcedureCode> lstProcedureCode = new List<ProcedureCode>();
            List<ProcedureCodeCompanyMapping> lstProcedureCodeCompanyMapping = new List<ProcedureCodeCompanyMapping>();

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
                    updUserBO.user.MiddleName = string.IsNullOrEmpty(user_.MiddleName) ? user_.MiddleName : doctorBO.user.MiddleName;
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

                if (doctorDB.Id != 0)
                {
                    var newspecialitylist = doctorBO.DoctorSpecialities.Select(c => c.ID).ToList();
                    var olddoctorspeciality = _context.DoctorSpecialities.Where(c => c.DoctorID == doctorBO.user.ID).Select(c => c.SpecialityID).ToList();
                    foreach (var oldspc in olddoctorspeciality)
                    {
                        if (!newspecialitylist.Contains(oldspc))
                        {
                            // Deleting the Doctor Appointments
                            DateTime currentDate = DateTime.Now.Date;
                            var acc = _context.PatientVisits.Include("CalendarEvent").Where(p => p.DoctorId == doctorDB.Id && p.SpecialtyId ==  oldspc && p.CalendarEvent.EventStart >= currentDate && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList<PatientVisit>();
                            foreach (PatientVisit pv in acc)
                            {
                                if (pv != null)
                                {
                                    pv.CalendarEvent.IsDeleted = true;
                                    pv.CalendarEvent.UpdateByUserID = 0;
                                    pv.CalendarEvent.UpdateDate = DateTime.UtcNow;
                                }

                                pv.IsDeleted = true;
                                pv.UpdateByUserID = 0;
                                pv.UpdateDate = DateTime.UtcNow;

                                _context.SaveChanges();
                            }
                        }
                    }

                    var newroomtestlist = doctorBO.DoctorRoomTestMappings.Select(c => c.ID).ToList();
                    var oldroomtestspeciality = _context.DoctorRoomTestMappings.Where(c => c.DoctorId == doctorBO.user.ID).Select(c => c.RoomTestId).ToList();
                    foreach (var oldspc in oldroomtestspeciality)
                    {
                        if (!newroomtestlist.Contains(oldspc))
                        {
                            var acc_ = _context.Rooms.Include("RoomTest")
                            .Where(p => p.RoomTestID == oldspc && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                            && p.RoomTest.DoctorRoomTestMappings.Where(p2 => (p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false)))
                            .Any(p3 => p3.DoctorId == doctorBO.user.ID)).ToList();
                            // Deleting the Doctor Appointments
                            foreach (var rooms in acc_)
                            {
                                DateTime currentDate = DateTime.Now.Date;
                                var acc = _context.PatientVisits.Include("CalendarEvent").Where(p => p.DoctorId == doctorDB.Id && p.RoomId == rooms.id && p.CalendarEvent.EventStart >= currentDate && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList<PatientVisit>();
                                foreach (PatientVisit pv in acc)
                                {
                                    if (pv != null)
                                    {
                                        pv.CalendarEvent.IsDeleted = true;
                                        pv.CalendarEvent.UpdateByUserID = 0;
                                        pv.CalendarEvent.UpdateDate = DateTime.UtcNow;
                                    }

                                    pv.IsDeleted = true;
                                    pv.UpdateByUserID = 0;
                                    pv.UpdateDate = DateTime.UtcNow;

                                    _context.SaveChanges();
                                }
                            }
                        }
                    }
                }

                if (doctorBO.DoctorSpecialities.Count > 0)
                {
                    var olddoctorspecialities = _context.DoctorSpecialities.Where(c => c.DoctorID == doctorBO.user.ID).ToList<DoctorSpeciality>();
                    _dbSetDocSpecility.RemoveRange(_context.DoctorSpecialities.Where(c => c.DoctorID == doctorBO.user.ID));
                    _context.SaveChanges();
                    Specialty specilityDB = null;
                    DoctorSpeciality doctorSpecilityDB = null;

                    // to get company id
                    var compnayinfo = doctorBO.user.UserCompanies.ToList().Select(p => p.Company).FirstOrDefault();

                    // New CompanyProducrecode Mappings Code Insert
                    foreach (var item in doctorBO.DoctorSpecialities)
                    {
                        BO.DoctorSpeciality doctorSpecialityBO = (BO.DoctorSpeciality)(object)item;
                        specilityDB = new Specialty();
                        doctorSpecilityDB = new DoctorSpeciality();
                        doctorSpecilityDB.IsDeleted = doctorSpecialityBO.IsDeleted.HasValue ? doctorSpecialityBO.IsDeleted.Value : false;
                        doctorSpecilityDB.Doctor = doctorDB;
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
                        // get all procedure code by speciality
                        lstProcedureCode = _context.ProcedureCodes.Where(s => s.SpecialityId == doctorSpecialityBO.ID).ToList<ProcedureCode>();


                        //check whether the procedure codes for this speciality and company is added

                        var procedureCodeInfo = (from pccm in _context.ProcedureCodeCompanyMappings
                                                 join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                                 where pccm.CompanyID == compnayinfo.ID
                                                       && pc.SpecialityId == doctorSpecialityBO.ID
                                                       && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                                 select new
                                                 {
                                                     id = pccm.ID,
                                                     procedureCodeId = pc.Id,
                                                     procedureCodeText = pc.ProcedureCodeText,
                                                     procedureCodeDesc = pc.ProcedureCodeDesc,
                                                     amount = pccm.Amount,
                                                     isPreffredCode = pccm.IsPreffredCode
                                                 }).ToList();

                        if (procedureCodeInfo.Count == 0)
                        {
                            foreach (var item1 in lstProcedureCode)
                            {
                                ProcedureCodeCompanyMapping procedureCodeCompanyMappingDB = new ProcedureCodeCompanyMapping();
                                procedureCodeCompanyMappingDB.ProcedureCodeID = item1.Id;
                                procedureCodeCompanyMappingDB.CompanyID = compnayinfo.ID;
                                procedureCodeCompanyMappingDB.Amount = item1.Amount;
                                procedureCodeCompanyMappingDB.EffectiveFromDate = null;
                                procedureCodeCompanyMappingDB.EffectiveToDate = null;
                                procedureCodeCompanyMappingDB.IsPreffredCode = false;
                                procedureCodeCompanyMappingDB = _context.ProcedureCodeCompanyMappings.Add(procedureCodeCompanyMappingDB);
                                _context.SaveChanges();
                            }
                        }
                        else
                        {
                            var procedureCodeInfo1 = (from pccm in _context.ProcedureCodeCompanyMappings
                                                      join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                                      where pccm.CompanyID == compnayinfo.ID
                                                            && pc.SpecialityId == doctorSpecialityBO.ID
                                                            && (pccm.IsDeleted.HasValue == false)
                                                            && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                                      select new
                                                      {
                                                          id = pccm.ID,
                                                          procedureCodeId = pc.Id,
                                                          procedureCodeText = pc.ProcedureCodeText,
                                                          procedureCodeDesc = pc.ProcedureCodeDesc,
                                                          amount = pccm.Amount,
                                                          isPreffredCode = pccm.IsPreffredCode
                                                      }).ToList();

                            if (procedureCodeInfo1.Count == 0)
                            {
                                foreach (var item3 in procedureCodeInfo)
                                {
                                    var procedureCodeCompanyMappingDB = _context.ProcedureCodeCompanyMappings.Where(p => p.ID == item3.id).FirstOrDefault();
                                    if (procedureCodeCompanyMappingDB != null)
                                    {
                                        procedureCodeCompanyMappingDB.IsDeleted = false;
                                        _context.SaveChanges();
                                    }

                                }
                            }

                        }
                    }



                    // Delete Old Compnay Procedure Codes if it is not mapped for any doctor to that compnay

                    HashSet<int> sentIDs = new HashSet<int>(lstDoctorSpecility.Select(s => s.Specialty.id));

                    var olddoctorspecialitiesResult = olddoctorspecialities.Where(m => !sentIDs.Contains(m.SpecialityID));

                    foreach (var deleteitem in olddoctorspecialitiesResult)
                    {
                        var compnaydoctorspelist = _context.Doctors.Include("User").Include("DoctorSpecialities").Include("DoctorSpecialities.Specialty")
                                          .Where(p => (p.User.IsDeleted.HasValue == false || (p.User.IsDeleted.HasValue == true && p.User.IsDeleted.Value == false))
                                                    && p.User.UserCompanies.Where(p2 => (p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false)))
                                                     .Any(p3 => p3.CompanyID == compnayinfo.ID)
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                    && (p.DoctorSpecialities.Any(p4 => p4.SpecialityID == deleteitem.SpecialityID)))
                                          .ToList<Doctor>();

                        if (compnaydoctorspelist.Count == 0)
                        {
                            var procedureCodeInfodelete = (from pccm in _context.ProcedureCodeCompanyMappings
                                                           join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                                           where pccm.CompanyID == compnayinfo.ID
                                                                 && pc.SpecialityId == deleteitem.SpecialityID
                                                                 && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                                                 && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                                           select new
                                                           {
                                                               id = pccm.ID,
                                                               procedureCodeId = pc.Id,
                                                               procedureCodeText = pc.ProcedureCodeText,
                                                               procedureCodeDesc = pc.ProcedureCodeDesc,
                                                               amount = pccm.Amount,
                                                               isPreffredCode = pccm.IsPreffredCode
                                                           }).ToList();

                            if (procedureCodeInfodelete.Count > 0)
                            {
                                foreach (var item3 in procedureCodeInfodelete)
                                {
                                    var procedureCodeCompanyMappingDB = _context.ProcedureCodeCompanyMappings.Where(p => p.ID == item3.id).FirstOrDefault();

                                    if (procedureCodeCompanyMappingDB != null)
                                    {
                                        procedureCodeCompanyMappingDB.IsDeleted = true;
                                        _context.SaveChanges();
                                    }
                                }
                            }
                        }
                    }
                }
                doctorDB.DoctorSpecialities = lstDoctorSpecility;

                if (doctorBO.DoctorRoomTestMappings != null)
                {
                    if (doctorBO.DoctorRoomTestMappings.Count > 0)
                    {
                        var olddoctorTestspecialities = _context.DoctorRoomTestMappings.Where(c => c.DoctorId == doctorBO.user.ID).ToList<DoctorRoomTestMapping>();
                        _dbSetDocRoomTestMapping.RemoveRange(_context.DoctorRoomTestMappings.Where(c => c.DoctorId == doctorBO.user.ID));
                        _context.SaveChanges();
                        RoomTest roomTestDB = null;
                        DoctorRoomTestMapping doctorRoomTestMappingDB = null;
                        var compnayinfo = doctorBO.user.UserCompanies.ToList().Select(p => p.Company).FirstOrDefault();

                        foreach (var item in doctorBO.DoctorRoomTestMappings)
                        {
                            if (item.ID > 0)
                            {
                                BO.DoctorRoomTestMapping doctorRoomTestMappingBO = (BO.DoctorRoomTestMapping)(object)item;
                                roomTestDB = new RoomTest();
                                doctorRoomTestMappingDB = new DoctorRoomTestMapping();
                                doctorRoomTestMappingDB.IsDeleted = doctorRoomTestMappingBO.IsDeleted.HasValue ? doctorRoomTestMappingBO.IsDeleted.Value : false;
                                doctorRoomTestMappingDB.Doctor = doctorDB;
                                //Find Record By ID
                                RoomTest roomTest = _context.RoomTests.Where(p => p.id == doctorRoomTestMappingBO.ID).FirstOrDefault<RoomTest>();
                                if (roomTest == null)
                                {
                                    dbContextTransaction.Rollback();
                                    return new BO.ErrorObject { ErrorMessage = "Invalid specility " + item.ToString() + " details.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                                }
                                if (!lstDoctorRoomTestMapping.Select(p => p.RoomTest).Contains(roomTest))
                                {
                                    doctorRoomTestMappingDB.RoomTest = roomTest;
                                    _context.Entry(roomTest).State = System.Data.Entity.EntityState.Modified;
                                    lstDoctorRoomTestMapping.Add(doctorRoomTestMappingDB);
                                };

                                // get all procedure code by speciality
                                lstProcedureCode = _context.ProcedureCodes.Where(s => s.RoomTestId == doctorRoomTestMappingBO.ID).ToList<ProcedureCode>();


                                //check whether the procedure codes for this speciality and company is added

                                var testProcedureCodeInfo = (from pccm in _context.ProcedureCodeCompanyMappings
                                                             join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                                             where pccm.CompanyID == compnayinfo.ID
                                                                   && pc.RoomTestId == doctorRoomTestMappingBO.ID
                                                                   && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                                                   && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                                             select new
                                                             {
                                                                 id = pccm.ID,
                                                                 procedureCodeId = pc.Id,
                                                                 procedureCodeText = pc.ProcedureCodeText,
                                                                 procedureCodeDesc = pc.ProcedureCodeDesc,
                                                                 amount = pccm.Amount,
                                                                 isPreffredCode = pccm.IsPreffredCode
                                                             }).ToList();

                                if (testProcedureCodeInfo.Count == 0)
                                {
                                    foreach (var item1 in lstProcedureCode)
                                    {
                                        ProcedureCodeCompanyMapping procedureCodeCompanyMappingDB = new ProcedureCodeCompanyMapping();
                                        procedureCodeCompanyMappingDB.ProcedureCodeID = item1.Id;
                                        procedureCodeCompanyMappingDB.CompanyID = compnayinfo.ID;
                                        procedureCodeCompanyMappingDB.Amount = item1.Amount;
                                        procedureCodeCompanyMappingDB.EffectiveFromDate = null;
                                        procedureCodeCompanyMappingDB.EffectiveToDate = null;
                                        procedureCodeCompanyMappingDB.IsPreffredCode = false;
                                        procedureCodeCompanyMappingDB = _context.ProcedureCodeCompanyMappings.Add(procedureCodeCompanyMappingDB);
                                        _context.SaveChanges();
                                    }
                                }
                                else
                                {
                                    var testProcedureCodeInfo1 = (from pccm in _context.ProcedureCodeCompanyMappings
                                                                  join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                                                  where pccm.CompanyID == compnayinfo.ID
                                                                        && pc.RoomTestId == doctorRoomTestMappingBO.ID
                                                                        && (pccm.IsDeleted.HasValue == false)
                                                                        && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                                                  select new
                                                                  {
                                                                      id = pccm.ID,
                                                                      procedureCodeId = pc.Id,
                                                                      procedureCodeText = pc.ProcedureCodeText,
                                                                      procedureCodeDesc = pc.ProcedureCodeDesc,
                                                                      amount = pccm.Amount,
                                                                      isPreffredCode = pccm.IsPreffredCode
                                                                  }).ToList();

                                    if (testProcedureCodeInfo1.Count == 0)
                                    {
                                        foreach (var item3 in testProcedureCodeInfo)
                                        {
                                            var procedureCodeCompanyMappingDB = _context.ProcedureCodeCompanyMappings.Where(p => p.ID == item3.id).FirstOrDefault();

                                            if (procedureCodeCompanyMappingDB != null)
                                            {
                                                procedureCodeCompanyMappingDB.IsDeleted = false;
                                                _context.SaveChanges();
                                            }
                                        }
                                    }
                                }
                            }

                            // Delete Old Compnay Procedure Codes if it is not mapped for any doctor to that compnay

                            HashSet<int> sentIDs = new HashSet<int>(lstDoctorRoomTestMapping.Select(s => s.RoomTest.id));

                            var olddoctorTestspecialitiesResult = olddoctorTestspecialities.Where(m => !sentIDs.Contains(m.RoomTestId));
                            foreach (var deletetestitme in olddoctorTestspecialitiesResult)
                            {
                                var compnaydoctorspelist = _context.Doctors.Include("User").Include("DoctorRoomTestMappings").Include("DoctorRoomTestMappings.RoomTest")
                                                  .Where(p => (p.User.IsDeleted.HasValue == false || (p.User.IsDeleted.HasValue == true && p.User.IsDeleted.Value == false))
                                                            && p.User.UserCompanies.Where(p2 => (p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false)))
                                                             .Any(p3 => p3.CompanyID == compnayinfo.ID)
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                            && (p.DoctorRoomTestMappings.Any(p4 => p4.RoomTestId == deletetestitme.RoomTestId)))
                                                  .ToList<Doctor>();

                                var rommSpecilatiesContains = _context.Rooms.Include("RoomTest").Include("Location")
                                                        .Where(p => p.RoomTestID == deletetestitme.RoomTestId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                        && p.Location.CompanyID == compnayinfo.ID).ToList();

                                if (compnaydoctorspelist.Count == 0 && rommSpecilatiesContains.Count == 0)
                                {
                                    var procedureCodeInfodelete = (from pccm in _context.ProcedureCodeCompanyMappings
                                                                   join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                                                   where pccm.CompanyID == compnayinfo.ID
                                                                         && pc.RoomTestId == deletetestitme.RoomTestId
                                                                         && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                                                         && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                                                   select new
                                                                   {
                                                                       id = pccm.ID,
                                                                       procedureCodeId = pc.Id,
                                                                       procedureCodeText = pc.ProcedureCodeText,
                                                                       procedureCodeDesc = pc.ProcedureCodeDesc,
                                                                       amount = pccm.Amount,
                                                                       isPreffredCode = pccm.IsPreffredCode
                                                                   }).ToList();

                                    if (procedureCodeInfodelete.Count > 0)
                                    {
                                        foreach (var item3 in procedureCodeInfodelete)
                                        {
                                            var procedureCodeCompanyMappingDB = _context.ProcedureCodeCompanyMappings.Where(p => p.ID == item3.id).FirstOrDefault();

                                            if (procedureCodeCompanyMappingDB != null)
                                            {
                                                procedureCodeCompanyMappingDB.IsDeleted = true;
                                                _context.SaveChanges();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else
                    {
                        var olddoctorTestspecialities = _context.DoctorRoomTestMappings.Where(c => c.DoctorId == doctorBO.user.ID).ToList<DoctorRoomTestMapping>();
                        _dbSetDocRoomTestMapping.RemoveRange(_context.DoctorRoomTestMappings.Where(c => c.DoctorId == doctorBO.user.ID));
                        _context.SaveChanges();

                        var compnayinfo = doctorBO.user.UserCompanies.ToList().Select(p => p.Company).FirstOrDefault();
                        // Delete Old Compnay Procedure Codes if it is not mapped for any doctor to that compnay

                        foreach (var deletetestitme in olddoctorTestspecialities)
                        {
                            var compnaydoctorspelist = _context.Doctors.Include("User").Include("DoctorRoomTestMappings").Include("DoctorRoomTestMappings.RoomTest")
                                              .Where(p => (p.User.IsDeleted.HasValue == false || (p.User.IsDeleted.HasValue == true && p.User.IsDeleted.Value == false))
                                                        && p.User.UserCompanies.Where(p2 => (p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false)))
                                                         .Any(p3 => p3.CompanyID == compnayinfo.ID)
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                        && (p.DoctorRoomTestMappings.Any(p4 => p4.RoomTestId == deletetestitme.RoomTestId)))
                                              .ToList<Doctor>();


                            var rommSpecilatiesContains = _context.Rooms.Include("RoomTest").Include("Location")
                                                          .Where(p => p.RoomTestID == deletetestitme.RoomTestId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                          && p.Location.CompanyID == compnayinfo.ID).ToList();

                            if (compnaydoctorspelist.Count == 0 && rommSpecilatiesContains.Count == 0)
                            {
                                var procedureCodeInfodelete = (from pccm in _context.ProcedureCodeCompanyMappings
                                                               join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                                               where pccm.CompanyID == compnayinfo.ID
                                                                     && pc.RoomTestId == deletetestitme.RoomTestId
                                                                     && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                                                     && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                                               select new
                                                               {
                                                                   id = pccm.ID,
                                                                   procedureCodeId = pc.Id,
                                                                   procedureCodeText = pc.ProcedureCodeText,
                                                                   procedureCodeDesc = pc.ProcedureCodeDesc,
                                                                   amount = pccm.Amount,
                                                                   isPreffredCode = pccm.IsPreffredCode
                                                               }).ToList();

                                if (procedureCodeInfodelete.Count > 0)
                                {
                                    foreach (var item3 in procedureCodeInfodelete)
                                    {
                                        var procedureCodeCompanyMappingDB = _context.ProcedureCodeCompanyMappings.Where(p => p.ID == item3.id).FirstOrDefault();

                                        if (procedureCodeCompanyMappingDB != null)
                                        {
                                            procedureCodeCompanyMappingDB.IsDeleted = true;
                                            _context.SaveChanges();
                                        }
                                    }
                                }
                            }
                        }
                    }
                    doctorDB.DoctorRoomTestMappings = lstDoctorRoomTestMapping;
                }
                var doc = 0;
                if (doctorDB.Id > 0)
                {
                    //Find Doctor By ID
                    Doctor doctor = _context.Doctors.Where(p => p.Id == doctorBO.user.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<Doctor>();

                    if (doctor == null)
                    {
                        doc = 1;
                        doctorDB = new Doctor();
                    }
                    #region Doctor

                    doctorDB.Id = doctorBO.ID;
                    doctorDB.LicenseNumber = string.IsNullOrEmpty(doctorBO.LicenseNumber) ? doctor.LicenseNumber : doctorBO.LicenseNumber;
                    doctorDB.WCBAuthorization = string.IsNullOrEmpty(doctorBO.WCBAuthorization) ? doctor.WCBAuthorization : doctorBO.WCBAuthorization;
                    doctorDB.WcbRatingCode = string.IsNullOrEmpty(doctorBO.WcbRatingCode) ? doctor.WcbRatingCode : doctorBO.WcbRatingCode;
                    doctorDB.NPI = string.IsNullOrEmpty(doctorBO.NPI) ? doctor.NPI : doctorBO.NPI;
                    doctorDB.Title = string.IsNullOrEmpty(doctorBO.Title) ? doctor.Title : doctorBO.Title;
                    doctorDB.TaxTypeId = !Enum.IsDefined(typeof(BO.GBEnums.TaxType), doctorBO.TaxType) ? System.Convert.ToByte((BO.GBEnums.TaxType)doctor.TaxTypeId) : System.Convert.ToByte(doctorBO.TaxType);
                    doctorDB.IsDeleted = doctorBO.IsDeleted.HasValue ? doctorBO.IsDeleted : (doctorBO.IsDeleted.HasValue ? doctor.IsDeleted : false);
                    doctorDB.UpdateDate = doctorBO.UpdateDate;
                    doctorDB.UpdateByUserID = doctorBO.UpdateByUserID;
                    doctorDB.IsCalendarPublic = doctorBO.IsCalendarPublic;
                    doctorDB.GenderId = doctorBO.GenderId;

                    doctorDB.CreateByUserID = 1;
                    doctorDB.CreateDate = DateTime.UtcNow;
                    #endregion
                    // doctorDB = doctor;                                
                    // _context.Entry(doctorDB).State = System.Data.Entity.EntityState.Modified;
                    doctorDB = _context.Doctors.Add(doctorDB);
                    //else
                    //{
                    //    dbContextTransaction.Rollback();
                    //    return new BO.ErrorObject { ErrorMessage = "Please pass valid doctor details.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    //}
                }
                else
                {
                    doctorDB.LicenseNumber = doctorBO.LicenseNumber;
                    doctorDB.WCBAuthorization = doctorBO.WCBAuthorization;
                    doctorDB.WcbRatingCode = doctorBO.WcbRatingCode;
                    doctorDB.NPI = doctorBO.NPI;
                    doctorDB.Title = doctorBO.Title;
                    doctorDB.TaxTypeId = System.Convert.ToByte(doctorBO.TaxType);
                    doctorDB.IsDeleted = doctorBO.IsDeleted.HasValue ? doctorBO.IsDeleted : false;
                    doctorDB.UpdateDate = doctorBO.UpdateDate;
                    doctorDB.UpdateByUserID = doctorBO.UpdateByUserID;
                    doctorDB.CreateDate = doctorBO.CreateDate;
                    doctorDB.CreateByUserID = doctorBO.CreateByUserID;
                    doctorDB.IsCalendarPublic = doctorBO.IsCalendarPublic;
                    doctorDB.GenderId = doctorBO.GenderId;

                    doctorDB.UpdateByUserID = 1;
                    doctorDB.UpdateDate = DateTime.UtcNow;

                    _dbSet.Add(doctorDB);
                }
                _context.SaveChanges();
                dbContextTransaction.Commit();

                if (doc == 1)
                {
                    if (lstDoctorSpecility.Count > 0)
                    {

                        foreach (var item in lstDoctorSpecility)
                        {
                            DoctorSpeciality doctorSpecilityDB = new DoctorSpeciality();
                            doctorSpecilityDB.IsDeleted = false;
                            doctorSpecilityDB.DoctorID = doctorDB.Id;
                            doctorSpecilityDB.SpecialityID = item.Specialty.id;
                            doctorSpecilityDB.CreateByUserID = doctorBO.CreateByUserID;
                            _context.DoctorSpecialities.Add(doctorSpecilityDB);
                        }
                        _context.SaveChanges();

                    }
                    if (lstDoctorRoomTestMapping.Count > 0)
                    {
                        foreach (var item1 in lstDoctorRoomTestMapping)
                        {
                            DoctorRoomTestMapping doctorRoomTestMappingDB = new DoctorRoomTestMapping();
                            doctorRoomTestMappingDB.IsDeleted = false;
                            doctorRoomTestMappingDB.DoctorId = doctorDB.Id;
                            doctorRoomTestMappingDB.RoomTestId = item1.RoomTest.id;
                            doctorRoomTestMappingDB.CreateByUserID = item1.CreateByUserID;
                            doctorRoomTestMappingDB.CreateDate = DateTime.UtcNow;
                            _context.Entry(doctorRoomTestMappingDB).State = System.Data.Entity.EntityState.Added;
                            //_context.DoctorRoomTestMappings.Add(doctorRoomTestMappingDB);
                        }

                        _context.SaveChanges();

                    }

                }
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
                                              .Include("DoctorRoomTestMappings")
                                              .Include("DoctorRoomTestMappings.RoomTest")
                                              .Include("User.UserCompanyRoles").Where(p => p.Id == id && p.IsDeleted == false).Include(a => a.DoctorSpecialities).Include(b => b.DoctorRoomTestMappings).
                                              FirstOrDefault<Doctor>();

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

        #region Get By ID and CompnayID

        public override object GetDoctorByIDAndCompnayID(int id, int CompnayID)
        {
            var doc = _context.Doctors.Include("User")
                                            .Include("User.AddressInfo")
                                            .Include("User.ContactInfo")
                                            .Include("DoctorSpecialities")
                                            .Include("DoctorSpecialities.Specialty")
                                            .Include("DoctorRoomTestMappings")
                                            .Include("DoctorRoomTestMappings.RoomTest")
                                            .Include("User.UserCompanyRoles").Where(p => p.Id == id && (p.IsDeleted == false || p.IsDeleted == null)).Include(a => a.DoctorSpecialities).Include(b => b.DoctorRoomTestMappings)
                                            .Select(p => new
                                            {
                                                Doctors = p,
                                                User = p.User,
                                                AddressInfo = p.User.AddressInfo,
                                                ContactInfo = p.User.ContactInfo,
                                                DoctorSpecialities = p.DoctorSpecialities,
                                                Specialty = from sp in p.DoctorSpecialities
                                                            select new
                                                            {
                                                                sp.Specialty
                                                            },
                                                DoctorRoomTestMappings = p.DoctorRoomTestMappings,
                                                RoomTest = from rt in p.DoctorRoomTestMappings
                                                           select new
                                                           {
                                                               rt.RoomTest
                                                           },
                                                UserCompanyRoles = p.User.UserCompanyRoles.Where(ucr => ucr.UserID == id && ucr.CompanyID == CompnayID && (ucr.IsDeleted == false || ucr.IsDeleted == null)),
                                                UserCompanies = p.User.UserCompanies.Where(uc => uc.UserID == id && uc.CompanyID == CompnayID && (uc.IsDeleted == false || uc.IsDeleted == null))
                                            }).ToList().Select(p => p.Doctors).ToList();

            BO.Doctor doctorBO = new BO.Doctor();

            if (doc == null || doc.Count == 0)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Doctor.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                var doctorDB = doc.FirstOrDefault();
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
                                           .Include("DoctorRoomTestMappings")
                                           .Include("DoctorRoomTestMappings.RoomTest")
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

                foreach (var EachDoctor in doctorDB)
                {
                    boDoctor.Add(Convert<BO.Doctor, Doctor>(EachDoctor));
                }

            }

            return (object)boDoctor;
        }
        #endregion


        #region Get By Company ID and Speciality
        public override object GetDoctorsByCompanyIdAndSpeciality(int companyId, int specialtyId)
        {
            var doctorDB = _context.Doctors.Include("User")
                                           .Include("User.AddressInfo")
                                           .Include("User.ContactInfo")
                                           .Include("DoctorSpecialities")
                                           .Include("DoctorSpecialities.Specialty")
                                           .Include("DoctorRoomTestMappings")
                                           .Include("DoctorRoomTestMappings.RoomTest")
                                           .Include("User.UserCompanyRoles")
                                           .Where(p => (p.User.IsDeleted.HasValue == false || (p.User.IsDeleted.HasValue == true && p.User.IsDeleted.Value == false))
                                                     && p.User.UserCompanies.Where(p2 => (p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false)))
                                                                            .Any(p3 => p3.CompanyID == companyId)
                                                     && p.DoctorSpecialities.Where(p2 => p2.IsDeleted == false).Any(p3 => p3.SpecialityID == specialtyId)
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

                foreach (var EachDoctor in doctorDB)
                {
                    boDoctor.Add(Convert<BO.Doctor, Doctor>(EachDoctor));
                }

            }

            return (object)boDoctor;
        }
        #endregion

        #region Get By Company ID and TestSpeciality
        public override object GetDoctorsByCompanyIdAndTestSpeciality(int companyId, int roomTestId)
        {
            var doctorDB = _context.Doctors.Include("User")
                                           .Include("User.AddressInfo")
                                           .Include("User.ContactInfo")
                                           .Include("DoctorSpecialities")
                                           .Include("DoctorSpecialities.Specialty")
                                           .Include("DoctorRoomTestMappings")
                                           .Include("DoctorRoomTestMappings.RoomTest")
                                           .Include("User.UserCompanyRoles")
                                           .Where(p => (p.User.IsDeleted.HasValue == false || (p.User.IsDeleted.HasValue == true && p.User.IsDeleted.Value == false))
                                                     && p.User.UserCompanies.Where(p2 => (p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false)))
                                                                            .Any(p3 => p3.CompanyID == companyId)
                                                     && p.DoctorRoomTestMappings.Where(p2 => p2.IsDeleted == false).Any(p3 => p3.RoomTestId == roomTestId)
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

                foreach (var EachDoctor in doctorDB)
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

        #region GetByLocationAndRoomTest
        public override object Get1(int locationId, int roomTestId)
        {
            List<int> doctorInLocation = _context.DoctorLocationSchedules.Where(p => p.LocationID == locationId
                                                                          && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                          .Select(p => p.DoctorID)
                                                                          .Distinct()
                                                                          .ToList();

            List<int> doctorWithSpecialty = _context.DoctorRoomTestMappings.Where(p => p.RoomTestId == roomTestId
                                                                               && (p.IsDeleted == false))
                                                                               .Select(p => p.DoctorId)
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

            var acc_ = _context.Doctors.Include("User")
                                       .Include("User.UserCompanies")
                                       .Include("User.UserCompanies.Company")
                                       .Include("DoctorSpecialities")
                                       .Include("DoctorSpecialities.Specialty")
                                       .Include("DoctorRoomTestMappings")
                                       .Include("DoctorRoomTestMappings.RoomTest")
                                       .Include("DoctorLocationSchedules")
                                       .Include("DoctorLocationSchedules.Location")
                                       .Include("DoctorLocationSchedules.Location.Company")
                                       .Where(p => p.DoctorSpecialities.Where(p2 => p2.IsDeleted == false).Any(p3 => p3.SpecialityID == specialtyId)
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

        #region AssociateDoctorWithCompany
        public override object AssociateDoctorWithCompany(int DoctorId, int CompanyId)
        {
            bool add_UserCompany = false;
            bool sendEmail = false;
            Guid invitationDB_UniqueID = Guid.NewGuid();

            var company = _context.Companies.Where(p => p.id == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            if (company == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var Doctor = _context.Doctors.Where(p => p.Id == DoctorId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            if (Doctor == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Doctor.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var userCompany = _context.UserCompanies.Where(p => p.UserID == DoctorId && p.CompanyID == CompanyId && p.IsAccepted == true && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            if (userCompany == null)
            {
                userCompany = new UserCompany();
                add_UserCompany = true;
                sendEmail = true;
            }

            userCompany.CompanyID = CompanyId;
            userCompany.UserID = DoctorId;
            userCompany.UserStatusID = 1;
            userCompany.IsAccepted = true;

            if (add_UserCompany)
            {
                _context.UserCompanies.Add(userCompany);
            }

            _context.SaveChanges();

            var doctorDB = _context.Doctors.Include("User")
                                              .Include("User.AddressInfo")
                                              .Include("User.ContactInfo")
                                              .Include("DoctorSpecialities")
                                              .Include("DoctorSpecialities.Specialty")
                                              .Include("User.UserCompanyRoles")
                                              .Include("User.UserCompanies")
                                              .Where(p => p.Id == DoctorId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<Doctor>();

            #region Send Email
            if (sendEmail == true)
            {
                try
                {
                    string VerificationLink = "<a href='" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "</a>";
                    string Message = "Dear " + doctorDB.User.FirstName + ",<br><br>Thanks for registering with us.<br><br> Your user name is:- " + doctorDB.User.UserName + "<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";
                    BO.Email objEmail = new BO.Email { ToEmail = doctorDB.User.UserName, Subject = "User registered", Body = Message };
                    objEmail.SendMail();

                }
                catch (Exception ex) { }
            }
            #endregion

            var res = Convert<BO.Doctor, Doctor>(doctorDB);
            return (object)res;

        }
        #endregion

        #region GetAllReadingDoctorsForCompany
        public override object Get(int companyId, string emptystring)
        {
            //BO.Doctor doctorBO = (BO.Doctor)(object)entity;
            var userstocompany = _context.UserCompanies.Where(x => x.CompanyID == companyId).ToList();

            var docspec = _context.DoctorSpecialities.Where(x => x.Specialty.SchedulingAvailable == false).ToList();

            var acc_ = _context.Doctors.Include("User")
                                       .Include("User.UserCompanyRoles")
                                       .Include("DoctorSpecialities")
                                       .Where(p => p.IsDeleted == false || p.IsDeleted == null
                                       //&& p.User.UserCompanies.Where(p2 => (p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false)))
                                       //            .Any(p3 => p3.CompanyID == companyId)
                                       && p.User.UserCompanyRoles.Where(p4 => (p4.IsDeleted.HasValue == false || (p4.IsDeleted.HasValue == true && p4.IsDeleted.Value == false)))
                                                   .Any(p3 => p3.CompanyID == companyId && p3.RoleID == 3)
                                                  && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                        .ToList<Doctor>();
                                       //&& p.User.UserCompanies.Contains(companyId)                                       

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.Doctor> lstDoctors = new List<BO.Doctor>();
            foreach (Doctor item in acc_)
            {
                int _docCount = _context.UserCompanyRoles.Where(p => p.UserID == item.User.id && p.CompanyID == companyId && p.RoleID == 3 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Count();
                if (_docCount != 0)
                {
                    lstDoctors.Add(Convert<BO.Doctor, Doctor>(item));
                }
            }
            return lstDoctors;
        }
        #endregion


        #region GetAllReadingDoctorsForCompanyLocationTestSpecialityId
        public override object Get(int companyId, string locationId, string roomId)
        {
            //BO.Doctor doctorBO = (BO.Doctor)(object)entity;
            //var userstocompany = _context.UserCompanies.Where(x => x.CompanyID == companyId).ToList();

            //var docspec = _context.DoctorSpecialities.Where(x => x.Specialty.SchedulingAvailable == false).ToList();
            int RoomId = int.Parse(roomId);
            int LocationId = int.Parse(locationId);
            var docroom = _context.Rooms.Where(p => p.id == RoomId).FirstOrDefault();

            var acc_ = _context.Doctors.Include("User")
                                       .Include("User.UserCompanyRoles")
                                       .Include("DoctorRoomTestMappings")
                                       .Include("DoctorLocationSchedules")                                       
                                       .Where(p => p.IsDeleted == false || p.IsDeleted == null 
                                       //&& p.User.UserCompanies.Where(p2 => (p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false)))
                                       //            .Any(p3 => p3.CompanyID == companyId)
                                       //&& p.User.UserCompanyRoles.Where(p4 => (p4.IsDeleted.HasValue == false || (p4.IsDeleted.HasValue == true && p4.IsDeleted.Value == false)))
                                       //            .Any(p3 => p3.CompanyID == companyId && p3.RoleID == 3)
                                       //&& p.DoctorLocationSchedules.Where(p7 => (p7.IsDeleted.HasValue == false || (p7.IsDeleted.HasValue == true && p7.IsDeleted.Value == false)))
                                       //            .Any(p8 => p8.LocationID == LocationId)
                                       //&& p.DoctorRoomTestMappings.Where(p5 => (p5.IsDeleted.HasValue == false || (p5.IsDeleted.HasValue == true && p5.IsDeleted.Value == false)))
                                       //            .Any(p6 => p6.RoomTestId == docroom.RoomTestID)
                                       && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                        .ToList<Doctor>();
            //&& p.User.UserCompanies.Contains(companyId)                                       

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.Doctor> lstDoctors = new List<BO.Doctor>();
            foreach (Doctor item in acc_)
            {
                int _docCount = _context.UserCompanyRoles.Where(p => p.UserID == item.User.id && p.CompanyID == companyId && p.RoleID == 3 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Count();
                if (_docCount != 0)
                {
                    int _locCount = _context.DoctorLocationSchedules.Where(p => p.DoctorID == item.User.id && p.LocationID == LocationId  && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Count();
                    if (_locCount != 0)
                    {
                        int _roomtestCount = _context.DoctorRoomTestMappings.Where(p => p.DoctorId == item.User.id && p.RoomTestId == docroom.RoomTestID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Count();
                        if (_roomtestCount != 0)
                        {
                            lstDoctors.Add(Convert<BO.Doctor, Doctor>(item));
                        }
                    }
                }
            }
            return lstDoctors;
        }
        #endregion

        #region DisassociateDoctorWithCompany
        public override object DisassociateDoctorWithCompany(int DoctorId, int CompanyId)
        {
            var company = _context.Companies.Where(p => p.id == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            if (company == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var doctor = _context.Doctors.Where(p => p.Id == DoctorId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            if (doctor == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Doctor.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var user = _context.Users.Where(p => p.id == DoctorId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            if (user == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this User.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var userCompany = _context.UserCompanies.Include("User.AddressInfo")
                                                    .Include("User.ContactInfo")
                                                    .Where(p => p.UserID == DoctorId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                    .ToList();
            bool isUcdelete = false;

            DateTime currentDate = DateTime.Now;
            var patientVisit = _context.PatientVisits.Include("CalendarEvent")
                                         .Include("Location")
                                         .Where(p => p.DoctorId == DoctorId && p.CalendarEvent.EventStart >= currentDate
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                         .ToList();

            if (patientVisit != null)
            {
                if (patientVisit.Count > 0)
                {
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Future appointments already schedule, Are you sure you want to cancel all the appointments asscoited to this location", ErrorLevel = ErrorLevel.Error };
                }
            }


            var EUO = _context.EOVisits.Include("CalendarEvent")                                         
                                         .Where(p => p.DoctorId == DoctorId && p.CalendarEvent.EventStart >= currentDate
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                         .ToList();

            if (EUO != null)
            {
                if (EUO.Count > 0)
                {
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Future EUO visits already schedule, Are you sure you want to cancel all the appointments asscoited to this location", ErrorLevel = ErrorLevel.Error };
                }
            }

            if (userCompany != null)
            {
                #region Commented Code
                /* var Uc = _context.UserCompanies.Where(p => p.UserID == DoctorId && p.CompanyID == CompanyId
                                                                                 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                 .FirstOrDefault();

                 if (userCompany.Count == 1)
                 {
                     if (Uc != null)
                     {
                         Uc.User.IsDeleted = true;
                         Uc.User.Doctor.IsDeleted = true;
                         Uc.User.AddressInfo.IsDeleted = true;
                         Uc.User.ContactInfo.IsDeleted = true;
                         isUcdelete = true;
                         _context.SaveChanges();
                     }
                 }
                 else
                 {
                     var UserCompanies = _context.UserCompanies.Where(p => p.UserID == DoctorId && p.CompanyID == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
                     if (UserCompanies != null)
                     {
                         UserCompanies.IsDeleted = true;
                         _context.SaveChanges();
                     }

                     var UserCompanyRoles = _context.UserCompanyRoles.Where(p => p.UserID == DoctorId && p.CompanyID == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList();
                     if (UserCompanyRoles != null && UserCompanyRoles.Count > 0)
                     {
                         foreach (var item in UserCompanyRoles)
                         {
                             var UserCompanyRolesdelete = _context.UserCompanyRoles.Where(p => p.id == item.id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
                             if (UserCompanyRolesdelete != null)
                             {
                                 UserCompanyRolesdelete.IsDeleted = true;
                                 _context.SaveChanges();
                             }
                         }
                     }
                 }*/
                #endregion

                var UserCompanies = _context.UserCompanies.Where(p => p.UserID == DoctorId && p.CompanyID == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
                if (UserCompanies != null)
                {
                    UserCompanies.IsDeleted = true;
                    _context.SaveChanges();
                }

                var UserCompanyRoles = _context.UserCompanyRoles.Where(p => p.UserID == DoctorId && p.CompanyID == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList();
                if (UserCompanyRoles != null && UserCompanyRoles.Count > 0)
                {
                    foreach (var item in UserCompanyRoles)
                    {
                        var UserCompanyRolesdelete = _context.UserCompanyRoles.Where(p => p.id == item.id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
                        if (UserCompanyRolesdelete != null)
                        {
                            UserCompanyRolesdelete.IsDeleted = true;
                            _context.SaveChanges();
                        }
                    }
                }
            }


            if (!_context.UserCompanyRoles.Any(y => y.RoleID == 3 && y.CompanyID != CompanyId && y.UserID == DoctorId))
            {
                // Delete Old Company Test Speciality Procedure Codes if it is not mapped for any doctor to that company

                var olddoctorTestspecialities = _context.DoctorRoomTestMappings.Where(c => c.DoctorId == DoctorId).ToList<DoctorRoomTestMapping>();
                _dbSetDocRoomTestMapping.RemoveRange(_context.DoctorRoomTestMappings.Where(c => c.DoctorId == DoctorId));
                _context.SaveChanges();

                foreach (var deletetestitme in olddoctorTestspecialities)
                {
                    var compnaydoctorspelist = _context.Doctors.Include("User").Include("DoctorRoomTestMappings").Include("DoctorRoomTestMappings.RoomTest")
                                      .Where(p => (p.User.IsDeleted.HasValue == false || (p.User.IsDeleted.HasValue == true && p.User.IsDeleted.Value == false))
                                                && p.User.UserCompanies.Where(p2 => (p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false)))
                                                 .Any(p3 => p3.CompanyID == CompanyId)
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                && (p.DoctorRoomTestMappings.Any(p4 => p4.RoomTestId == deletetestitme.RoomTestId)))
                                      .ToList<Doctor>();

                    var rommSpecilatiesContains = _context.Rooms.Include("RoomTest").Include("Location")
                                                         .Where(p => p.RoomTestID == deletetestitme.RoomTestId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                         && p.Location.CompanyID == CompanyId).ToList();

                    if (compnaydoctorspelist.Count == 0 && rommSpecilatiesContains.Count == 0)
                    {
                        var procedureCodeInfodelete = (from pccm in _context.ProcedureCodeCompanyMappings
                                                       join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                                       where pccm.CompanyID == CompanyId
                                                             && pc.RoomTestId == deletetestitme.RoomTestId
                                                             && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                                             && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                                       select new
                                                       {
                                                           id = pccm.ID,
                                                           procedureCodeId = pc.Id,
                                                           procedureCodeText = pc.ProcedureCodeText,
                                                           procedureCodeDesc = pc.ProcedureCodeDesc,
                                                           amount = pccm.Amount,
                                                           isPreffredCode = pccm.IsPreffredCode
                                                       }).ToList();

                        if (procedureCodeInfodelete.Count > 0)
                        {
                            foreach (var item3 in procedureCodeInfodelete)
                            {
                                var procedureCodeCompanyMappingDB = _context.ProcedureCodeCompanyMappings.Where(p => p.ID == item3.id).FirstOrDefault();

                                if (procedureCodeCompanyMappingDB != null)
                                {
                                    procedureCodeCompanyMappingDB.IsDeleted = true;
                                    _context.SaveChanges();
                                }
                            }
                        }
                    }
                }

                // Delete Old Compnay Procedure Codes if it is not mapped for any doctor to that company
                var doctorspecialities = _context.DoctorSpecialities.Where(c => c.DoctorID == DoctorId).ToList<DoctorSpeciality>();
                _dbSetDocSpecility.RemoveRange(_context.DoctorSpecialities.Where(c => c.DoctorID == DoctorId));
                _context.SaveChanges();

                foreach (var deletetestitme in doctorspecialities)
                {
                    var compnaydoctorspelist = _context.Doctors.Include("User").Include("DoctorSpecialities").Include("DoctorSpecialities.Specialty")
                                      .Where(p => (p.User.IsDeleted.HasValue == false || (p.User.IsDeleted.HasValue == true && p.User.IsDeleted.Value == false))
                                                && p.User.UserCompanies.Where(p2 => (p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false)))
                                                 .Any(p3 => p3.CompanyID == CompanyId)
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                && (p.DoctorSpecialities.Any(p4 => p4.SpecialityID == deletetestitme.SpecialityID)))
                                      .ToList<Doctor>();


                    if (compnaydoctorspelist.Count == 0)
                    {
                        var procedureCodeInfodelete = (from pccm in _context.ProcedureCodeCompanyMappings
                                                       join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                                       where pccm.CompanyID == CompanyId
                                                             && pc.SpecialityId == deletetestitme.SpecialityID
                                                             && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                                             && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                                       select new
                                                       {
                                                           id = pccm.ID,
                                                           procedureCodeId = pc.Id,
                                                           procedureCodeText = pc.ProcedureCodeText,
                                                           procedureCodeDesc = pc.ProcedureCodeDesc,
                                                           amount = pccm.Amount,
                                                           isPreffredCode = pccm.IsPreffredCode
                                                       }).ToList();

                        if (procedureCodeInfodelete.Count > 0)
                        {
                            foreach (var item3 in procedureCodeInfodelete)
                            {
                                var procedureCodeCompanyMappingDB = _context.ProcedureCodeCompanyMappings.Where(p => p.ID == item3.id).FirstOrDefault();

                                if (procedureCodeCompanyMappingDB != null)
                                {
                                    procedureCodeCompanyMappingDB.IsDeleted = true;
                                    _context.SaveChanges();
                                }
                            }
                        }
                    }
                }
            }

            string strmessage = "";

            if (isUcdelete == true)
            {
                strmessage = "The user with Id " + DoctorId + " is diassociated from company Id " + CompanyId + " and user is deleted.";
            }
            else
            {
                strmessage = "The user with Id " + DoctorId + " is diassociated from company Id " + CompanyId + ".";
            }

            return new { message = strmessage };
        }
        #endregion

        #region DisassociateDoctorWithCompanyAppointment
        public override object DisassociateDoctorWithCompanyandAppointment(int DoctorId, int CompanyId)
        {
            var company = _context.Companies.Where(p => p.id == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            if (company == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var doctor = _context.Doctors.Where(p => p.Id == DoctorId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            if (doctor == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Doctor.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var user = _context.Users.Where(p => p.id == DoctorId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            if (user == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this User.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var userCompany = _context.UserCompanies.Include("User.AddressInfo")
                                                    .Include("User.ContactInfo")
                                                    .Where(p => p.UserID == DoctorId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                    .ToList();
            bool isUcdelete = false;

            // Deleting the Doctor Appointments
            DateTime currentDate = DateTime.Now.Date;
            var acc = _context.PatientVisits.Include("CalendarEvent").Where(p => p.DoctorId == DoctorId && p.CalendarEvent.EventStart >= currentDate && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList<PatientVisit>();
            foreach (PatientVisit pv in acc)
            {
                if (pv != null)
                {
                    pv.CalendarEvent.IsDeleted = true;
                    pv.CalendarEvent.UpdateByUserID = 0;
                    pv.CalendarEvent.UpdateDate = DateTime.UtcNow;
                }

                pv.IsDeleted = true;
                pv.UpdateByUserID = 0;
                pv.UpdateDate = DateTime.UtcNow;

                _context.SaveChanges();
            }

            // Deleting the EUO Visit            
            var EUOacc = _context.EOVisits.Include("CalendarEvent").Where(p => p.DoctorId == DoctorId && p.CalendarEvent.EventStart >= currentDate && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList<EOVisit>();
            foreach (EOVisit pv in EUOacc)
            {
                if (pv != null)
                {
                    pv.CalendarEvent.IsDeleted = true;
                    pv.CalendarEvent.UpdateByUserID = 0;
                    pv.CalendarEvent.UpdateDate = DateTime.UtcNow;
                }

                pv.IsDeleted = true;
                pv.UpdateByUserID = 0;
                pv.UpdateDate = DateTime.UtcNow;

                _context.SaveChanges();
            }


            if (userCompany != null)
            {
                #region Commented Code
                /*var Uc = _context.UserCompanies.Where(p => p.UserID == DoctorId && p.CompanyID == CompanyId
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                .FirstOrDefault();

                if (userCompany.Count == 1)
                {
                    if (Uc != null)
                    {
                        Uc.User.IsDeleted = true;
                        Uc.User.Doctor.IsDeleted = true;
                        Uc.User.AddressInfo.IsDeleted = true;
                        Uc.User.ContactInfo.IsDeleted = true;
                        isUcdelete = true;
                        _context.SaveChanges();
                    }
                }
                else
                {
                    var UserCompanies = _context.UserCompanies.Where(p => p.UserID == DoctorId && p.CompanyID == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
                    if (UserCompanies != null)
                    {
                        UserCompanies.IsDeleted = true;
                        _context.SaveChanges();
                    }

                    var UserCompanyRoles = _context.UserCompanyRoles.Where(p => p.UserID == DoctorId && p.CompanyID == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList();
                    if (UserCompanyRoles != null && UserCompanyRoles.Count > 0)
                    {
                        foreach (var item in UserCompanyRoles)
                        {
                            var UserCompanyRolesdelete = _context.UserCompanyRoles.Where(p => p.id == item.id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
                            if (UserCompanyRolesdelete != null)
                            {
                                UserCompanyRolesdelete.IsDeleted = true;
                                _context.SaveChanges();
                            }
                        }
                    }
                }*/

                #endregion

                var UserCompanies = _context.UserCompanies.Where(p => p.UserID == DoctorId && p.CompanyID == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
                if (UserCompanies != null)
                {
                    UserCompanies.IsDeleted = true;
                    _context.SaveChanges();
                }

                var UserCompanyRoles = _context.UserCompanyRoles.Where(p => p.UserID == DoctorId && p.CompanyID == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList();
                if (UserCompanyRoles != null && UserCompanyRoles.Count > 0)
                {
                    foreach (var item in UserCompanyRoles)
                    {
                        var UserCompanyRolesdelete = _context.UserCompanyRoles.Where(p => p.id == item.id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
                        if (UserCompanyRolesdelete != null)
                        {
                            UserCompanyRolesdelete.IsDeleted = true;
                            _context.SaveChanges();
                        }
                    }
                }
            }

            if (!_context.UserCompanyRoles.Any(y => y.RoleID == 3 && y.CompanyID != CompanyId && y.UserID == DoctorId))
            {

                // Delete Old Company Test Speciality Procedure Codes if it is not mapped for any doctor to that company

                var olddoctorTestspecialities = _context.DoctorRoomTestMappings.Where(c => c.DoctorId == DoctorId).ToList<DoctorRoomTestMapping>();
                _dbSetDocRoomTestMapping.RemoveRange(_context.DoctorRoomTestMappings.Where(c => c.DoctorId == DoctorId));
                _context.SaveChanges();

                foreach (var deletetestitme in olddoctorTestspecialities)
                {
                    var compnaydoctorspelist = _context.Doctors.Include("User").Include("DoctorRoomTestMappings").Include("DoctorRoomTestMappings.RoomTest")
                                      .Where(p => (p.User.IsDeleted.HasValue == false || (p.User.IsDeleted.HasValue == true && p.User.IsDeleted.Value == false))
                                                && p.User.UserCompanies.Where(p2 => (p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false)))
                                                 .Any(p3 => p3.CompanyID == CompanyId)
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                && (p.DoctorRoomTestMappings.Any(p4 => p4.RoomTestId == deletetestitme.RoomTestId)))
                                      .ToList<Doctor>();

                    var rommSpecilatiesContains = _context.Rooms.Include("RoomTest").Include("Location")
                                                        .Where(p => p.RoomTestID == deletetestitme.RoomTestId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                        && p.Location.CompanyID == CompanyId).ToList();

                    if (compnaydoctorspelist.Count == 0 && rommSpecilatiesContains.Count == 0)
                    {
                        var procedureCodeInfodelete = (from pccm in _context.ProcedureCodeCompanyMappings
                                                       join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                                       where pccm.CompanyID == CompanyId
                                                             && pc.RoomTestId == deletetestitme.RoomTestId
                                                             && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                                             && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                                       select new
                                                       {
                                                           id = pccm.ID,
                                                           procedureCodeId = pc.Id,
                                                           procedureCodeText = pc.ProcedureCodeText,
                                                           procedureCodeDesc = pc.ProcedureCodeDesc,
                                                           amount = pccm.Amount,
                                                           isPreffredCode = pccm.IsPreffredCode
                                                       }).ToList();

                        if (procedureCodeInfodelete.Count > 0)
                        {
                            foreach (var item3 in procedureCodeInfodelete)
                            {
                                var procedureCodeCompanyMappingDB = _context.ProcedureCodeCompanyMappings.Where(p => p.ID == item3.id).FirstOrDefault();

                                if (procedureCodeCompanyMappingDB != null)
                                {
                                    procedureCodeCompanyMappingDB.IsDeleted = true;
                                    _context.SaveChanges();
                                }
                            }
                        }
                    }
                }

                // Delete Old Compnay Procedure Codes if it is not mapped for any doctor to that company
                var doctorspecialities = _context.DoctorSpecialities.Where(c => c.DoctorID == DoctorId).ToList<DoctorSpeciality>();
                _dbSetDocSpecility.RemoveRange(_context.DoctorSpecialities.Where(c => c.DoctorID == DoctorId));
                _context.SaveChanges();

                foreach (var deletetestitme in doctorspecialities)
                {
                    var compnaydoctorspelist = _context.Doctors.Include("User").Include("DoctorSpecialities").Include("DoctorSpecialities.Specialty")
                                      .Where(p => (p.User.IsDeleted.HasValue == false || (p.User.IsDeleted.HasValue == true && p.User.IsDeleted.Value == false))
                                                && p.User.UserCompanies.Where(p2 => (p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false)))
                                                 .Any(p3 => p3.CompanyID == CompanyId)
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                && (p.DoctorSpecialities.Any(p4 => p4.SpecialityID == deletetestitme.SpecialityID)))
                                      .ToList<Doctor>();
                    if (compnaydoctorspelist.Count == 0)
                    {
                        var procedureCodeInfodelete = (from pccm in _context.ProcedureCodeCompanyMappings
                                                       join pc in _context.ProcedureCodes on pccm.ProcedureCodeID equals pc.Id
                                                       where pccm.CompanyID == CompanyId
                                                             && pc.SpecialityId == deletetestitme.SpecialityID
                                                             && (pccm.IsDeleted.HasValue == false || (pccm.IsDeleted.HasValue == true && pccm.IsDeleted.Value == false))
                                                             && (pc.IsDeleted.HasValue == false || (pc.IsDeleted.HasValue == true && pc.IsDeleted.Value == false))
                                                       select new
                                                       {
                                                           id = pccm.ID,
                                                           procedureCodeId = pc.Id,
                                                           procedureCodeText = pc.ProcedureCodeText,
                                                           procedureCodeDesc = pc.ProcedureCodeDesc,
                                                           amount = pccm.Amount,
                                                           isPreffredCode = pccm.IsPreffredCode
                                                       }).ToList();

                        if (procedureCodeInfodelete.Count > 0)
                        {
                            foreach (var item3 in procedureCodeInfodelete)
                            {
                                var procedureCodeCompanyMappingDB = _context.ProcedureCodeCompanyMappings.Where(p => p.ID == item3.id).FirstOrDefault();

                                if (procedureCodeCompanyMappingDB != null)
                                {
                                    procedureCodeCompanyMappingDB.IsDeleted = true;
                                    _context.SaveChanges();
                                }
                            }
                        }
                    }
                }
            }

            string strmessage = "";

            if (isUcdelete == true)
            {
                strmessage = "The user with Id " + DoctorId + " is diassociated from company Id " + CompanyId + " and user is deleted.";
            }
            else
            {
                strmessage = "The user with Id " + DoctorId + " is diassociated from company Id " + CompanyId + ".";
            }

            return new { message = strmessage };
        }
        #endregion

        #region GetDoctorTaxTypes
        public override object GetDoctorTaxTypes()
        {
            var doctorTaxTypes = _context.DoctorTaxTypes.Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                         .Select(p => new
                                         {
                                             id = p.Id,
                                             name = p.Name,
                                             description = p.Description
                                         }).ToList();

            if (doctorTaxTypes == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return doctorTaxTypes;
        }
        #endregion

        #region GetAllDistictSpecialityOfDoctorByComapanyId
        public override object GetAllDoctorSpecialityByCompany(int id)
        {
            List<Doctor> alldoctorlist = new List<Doctor>();
            alldoctorlist = _context.Doctors.Include("User").Include("DoctorSpecialities").Include("DoctorSpecialities.Specialty")
                                        .Where(p => (p.User.IsDeleted.HasValue == false || (p.User.IsDeleted.HasValue == true && p.User.IsDeleted.Value == false))
                                                  && p.User.UserCompanies.Where(p2 => (p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false)))
                                                   .Any(p3 => p3.CompanyID == id)
                                                  && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                        .ToList<Doctor>();

            var compdoctorSpecialityList = alldoctorlist.Select(p => p.DoctorSpecialities.ToList<DoctorSpeciality>()).ToList();
            List<Specialty> newalldocspecDB = new List<Specialty>();
            foreach (var spec in compdoctorSpecialityList)
            {
                var test = spec.Select(p => p.Specialty).ToList();
                newalldocspecDB.AddRange(test);
            }

            List<BO.Specialty> newalldocspec = new List<BO.Specialty>();
            foreach (var specilaitu in newalldocspecDB)
            {
                BO.Specialty specobj = new BO.Specialty();
                specobj.ColorCode = specilaitu.ColorCode;
                specobj.ID = specilaitu.id;
                specobj.IsUnitApply = specilaitu.IsUnitApply.HasValue ? specilaitu.IsUnitApply.Value : false;
                specobj.MandatoryProcCode = specilaitu.MandatoryProcCode;
                specobj.Name = specilaitu.Name;
                specobj.SpecialityCode = specilaitu.SpecialityCode;

                if (!newalldocspec.Select(p => p.ID).Contains(specilaitu.id))
                {
                    newalldocspec.Add(specobj);
                }
            }
            return newalldocspec.Distinct().ToList().OrderBy(p => p.Name);
        }
        #endregion

        #region GetAllDistictTestSpecialityOfDoctorByComapanyId
        public override object GetAllDoctorTestSpecialityByCompany(int id)
        {
            List<Doctor> alldoctorlist = new List<Doctor>();
            alldoctorlist = _context.Doctors.Include("User").Include("DoctorRoomTestMappings").Include("DoctorRoomTestMappings.RoomTest")
                                        .Where(p => (p.User.IsDeleted.HasValue == false || (p.User.IsDeleted.HasValue == true && p.User.IsDeleted.Value == false))
                                                  && p.User.UserCompanies.Where(p2 => (p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false)))
                                                   .Any(p3 => p3.CompanyID == id)
                                                  && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                        .ToList<Doctor>();

            var compdoctorSpecialityList = alldoctorlist.Select(p => p.DoctorRoomTestMappings.ToList<DoctorRoomTestMapping>()).ToList();
            List<RoomTest> newalldocspecDB = new List<RoomTest>();
            foreach (var spec in compdoctorSpecialityList)
            {
                var test = spec.Select(p => p.RoomTest).ToList();
                newalldocspecDB.AddRange(test);
            }

              List<Room> rommSpecilaties = new List<Room>();
              rommSpecilaties = _context.Rooms.Include("RoomTest").Include("Location")
              .Where(p => (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
              && p.Location.CompanyID == id).ToList<Room>();
          
           

            List<BO.RoomTest> newalldocspec = new List<BO.RoomTest>();
            foreach (var specilaitu in newalldocspecDB)
            {
                BO.RoomTest specobj = new BO.RoomTest();
                specobj.ColorCode = specilaitu.ColorCode;
                specobj.ID = specilaitu.id;
                specobj.ShowProcCode = specilaitu.ShowProcCode.HasValue ? specilaitu.ShowProcCode.Value : true;
                specobj.name = specilaitu.Name;
                if (!newalldocspec.Select(p => p.ID).Contains(specilaitu.id))
                {
                    newalldocspec.Add(specobj);
                }
            }

            foreach (var spectest in rommSpecilaties)
            {
                BO.RoomTest specobj = new BO.RoomTest();
                specobj.ColorCode = spectest.RoomTest.ColorCode;
                specobj.ID = spectest.RoomTest.id;
                specobj.ShowProcCode = spectest.RoomTest.ShowProcCode.HasValue ? spectest.RoomTest.ShowProcCode.Value : true;
                specobj.name = spectest.RoomTest.Name;
                if (!newalldocspec.Select(p => p.ID).Contains(spectest.RoomTest.id))
                {
                    newalldocspec.Add(specobj);
                }

            }


            return newalldocspec.Distinct().ToList().OrderBy(p => p.name);
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
