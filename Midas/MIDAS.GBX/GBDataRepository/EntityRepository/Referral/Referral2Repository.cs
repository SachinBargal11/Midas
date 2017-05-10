using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;
using System.Configuration;
using MIDAS.GBX.EN;
using Docs.Pdf;
using System.IO;

namespace MIDAS.GBX.DataRepository.EntityRepository.Common
{
    internal class Referral2Repository : BaseEntityRepo, IDisposable
    {
        private DbSet<Referral2> _dbReferral;

        public Referral2Repository(MIDASGBXEntities context) : base(context)
        {
            _dbReferral = context.Set<Referral2>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Referral2 referral = entity as Referral2;

            if (referral == null)
                return default(T);

            BO.Referral2 referralBO = new BO.Referral2();

            referralBO.ID = referral.Id;
            referralBO.PendingReferralId = referral.PendingReferralId;
            referralBO.FromCompanyId = referral.FromCompanyId;
            referralBO.FromLocationId = referral.FromLocationId;
            referralBO.FromDoctorId = referral.FromDoctorId;
            referralBO.ForSpecialtyId = referral.ForSpecialtyId;
            referralBO.ForRoomId = referral.ForRoomId;
            referralBO.ForRoomTestId = referral.ForRoomTestId;
            referralBO.ToCompanyId = referral.ToCompanyId;
            referralBO.ToLocationId = referral.ToLocationId;
            referralBO.ToDoctorId = referral.ToDoctorId;
            referralBO.ToRoomId = referral.ToRoomId;
            referralBO.ScheduledPatientVisitId = referral.ScheduledPatientVisitId;
            referralBO.DismissedBy = referral.DismissedBy;
            referralBO.IsDeleted = referral.IsDeleted;
            referralBO.CreateByUserID = referral.CreateByUserID;
            referralBO.UpdateByUserID = referral.UpdateByUserID;

            if (referral.Company != null)
            {
                if (referral.Company.IsDeleted.HasValue == false || (referral.Company.IsDeleted.HasValue == true && referral.Company.IsDeleted.Value == false))
                {
                    BO.Company boCompany = new BO.Company();
                    using (CompanyRepository cmp = new CompanyRepository(_context))
                    {
                        boCompany = cmp.Convert<BO.Company, Company>(referral.Company);
                        boCompany.Locations = null;
                        referralBO.Company = boCompany;
                    }
                }
            }

            if (referral.Company1 != null)
            {
                if (referral.Company1.IsDeleted.HasValue == false || (referral.Company1.IsDeleted.HasValue == true && referral.Company1.IsDeleted.Value == false))
                {
                    BO.Company boCompany1 = new BO.Company();
                    using (CompanyRepository cmp = new CompanyRepository(_context))
                    {
                        boCompany1 = cmp.Convert<BO.Company, Company>(referral.Company1);
                        boCompany1.Locations = null;
                        referralBO.Company1 = boCompany1;
                    }
                }
            }

            if (referral.Location != null)
            {
                if (referral.Location.IsDeleted.HasValue == false || (referral.Location.IsDeleted.HasValue == true && referral.Location.IsDeleted.Value == false))
                {
                    BO.Location boLocation = new BO.Location();
                    using (LocationRepository cmp = new LocationRepository(_context))
                    {
                        boLocation = cmp.Convert<BO.Location, Location>(referral.Location);
                        referralBO.Location = boLocation;
                    }
                }
            }

            if (referral.Location1 != null)
            {
                if (referral.Location1.IsDeleted.HasValue == false || (referral.Location1.IsDeleted.HasValue == true && referral.Location1.IsDeleted.Value == false))
                {
                    BO.Location boLocation1 = new BO.Location();
                    using (LocationRepository cmp = new LocationRepository(_context))
                    {
                        boLocation1 = cmp.Convert<BO.Location, Location>(referral.Location1);
                        referralBO.Location1 = boLocation1;
                    }
                }
            }

            if (referral.Doctor != null)
            {
                if (referral.Doctor.IsDeleted.HasValue == false || (referral.Doctor.IsDeleted.HasValue == true && referral.Doctor.IsDeleted.Value == false))
                {
                    BO.Doctor boDoctor = new BO.Doctor();
                    using (DoctorRepository cmp = new DoctorRepository(_context))
                    {
                        boDoctor = cmp.Convert<BO.Doctor, Doctor>(referral.Doctor);
                        referralBO.Doctor = boDoctor;
                    }
                }
            }

            if (referral.Doctor1 != null)
            {
                if (referral.Doctor1.IsDeleted.HasValue == false || (referral.Doctor1.IsDeleted.HasValue == true && referral.Doctor1.IsDeleted.Value == false))
                {
                    BO.Doctor boDoctor = new BO.Doctor();
                    using (DoctorRepository cmp = new DoctorRepository(_context))
                    {
                        boDoctor = cmp.Convert<BO.Doctor, Doctor>(referral.Doctor1);
                        referralBO.Doctor1 = boDoctor;
                    }
                }
            }

            //if (referral.PatientVisit2 != null)
            //{
            //    if (referral.PatientVisit2.IsDeleted.HasValue == false || (referral.PatientVisit2.IsDeleted.HasValue == true && referral.PatientVisit2.IsDeleted.Value == false))
            //    {
            //        BO.PatientVisit2 boPatientVisit2 = new BO.PatientVisit2();
            //        using (PatientVisit2Repository cmp = new PatientVisit2Repository(_context))
            //        {
            //            boPatientVisit2 = cmp.Convert<BO.PatientVisit2, PatientVisit2>(referral.PatientVisit2);
            //            referralBO.PatientVisit2 = boPatientVisit2;
            //        }
            //    }
            //}

            //if (referral.PendingReferral != null)
            //{
            //    if (referral.PendingReferral.IsDeleted.HasValue == false || (referral.PendingReferral.IsDeleted.HasValue == true && referral.PendingReferral.IsDeleted.Value == false))
            //    {
            //        BO.PendingReferral boPendingReferral = new BO.PendingReferral();
            //        using (PendingReferralRepository cmp = new PendingReferralRepository(_context))
            //        {
            //            boPendingReferral = cmp.Convert<BO.PendingReferral, PendingReferral>(referral.PendingReferral);
            //            referralBO.PendingReferral = boPendingReferral;
            //        }
            //    }
            //}

            if (referral.Room != null)
            {
                if (referral.Room.IsDeleted.HasValue == false || (referral.Room.IsDeleted.HasValue == true && referral.Room.IsDeleted.Value == false))
                {
                    BO.Room boRoom = new BO.Room();
                    using (RoomRepository cmp = new RoomRepository(_context))
                    {
                        boRoom = cmp.Convert<BO.Room, Room>(referral.Room);
                        referralBO.Room = boRoom;
                    }
                }
            }

            if (referral.Room1 != null)
            {
                if (referral.Room1.IsDeleted.HasValue == false || (referral.Room1.IsDeleted.HasValue == true && referral.Room1.IsDeleted.Value == false))
                {
                    BO.Room boRoom1 = new BO.Room();
                    using (RoomRepository cmp = new RoomRepository(_context))
                    {
                        boRoom1 = cmp.Convert<BO.Room, Room>(referral.Room1);
                        referralBO.Room1 = boRoom1;
                    }
                }
            }

            if (referral.RoomTest != null)
            {
                if (referral.RoomTest.IsDeleted.HasValue == false || (referral.RoomTest.IsDeleted.HasValue == true && referral.RoomTest.IsDeleted.Value == false))
                {
                    BO.RoomTest boRoomTest = new BO.RoomTest();
                    using (RoomTestRepository cmp = new RoomTestRepository(_context))
                    {
                        boRoomTest = cmp.Convert<BO.RoomTest, RoomTest>(referral.RoomTest);
                        boRoomTest.rooms = null;
                        referralBO.RoomTest = boRoomTest;
                    }
                }
            }

            if (referral.Specialty != null)
            {
                if (referral.Specialty.IsDeleted.HasValue == false || (referral.Specialty.IsDeleted.HasValue == true && referral.Specialty.IsDeleted.Value == false))
                {
                    BO.Specialty boSpecialty = new BO.Specialty();
                    using (SpecialityRepository cmp = new SpecialityRepository(_context))
                    {
                        boSpecialty = cmp.Convert<BO.Specialty, Specialty>(referral.Specialty);
                        referralBO.Specialty = boSpecialty;
                    }
                }
            }


            if (referral.User != null)
            {
                if (referral.User.IsDeleted.HasValue == false || (referral.User.IsDeleted.HasValue == true && referral.User.IsDeleted.Value == false))
                {
                    BO.User boUser = new BO.User();
                    using (UserRepository cmp = new UserRepository(_context))
                    {
                        boUser = cmp.Convert<BO.User, User>(referral.User);
                        boUser.AddressInfo = null;
                        boUser.ContactInfo = null;
                        boUser.UserCompanies = null;
                        boUser.Roles = null;

                        referralBO.User = boUser;
                    }
                }
            }

            if (referral.ReferralProcedureCodes != null)
            {
                List<BO.ReferralProcedureCode> boReferralProcedureCode = new List<BO.ReferralProcedureCode>();

                foreach (var eachReferralProcedureCodes in referral.ReferralProcedureCodes)
                {
                    if (eachReferralProcedureCodes.IsDeleted.HasValue == false || (eachReferralProcedureCodes.IsDeleted.HasValue == true && eachReferralProcedureCodes.IsDeleted.Value == false))
                    {
                        BO.ReferralProcedureCode referralProcedureCode = new BO.ReferralProcedureCode();

                        referralProcedureCode.ID = eachReferralProcedureCodes.Id;
                        referralProcedureCode.ReferralId = eachReferralProcedureCodes.ReferralId;
                        referralProcedureCode.ProcedureCodeId = eachReferralProcedureCodes.ProcedureCodeId;

                        if (eachReferralProcedureCodes.ProcedureCode != null)
                        {
                            if (eachReferralProcedureCodes.ProcedureCode.IsDeleted.HasValue == false || (eachReferralProcedureCodes.ProcedureCode.IsDeleted.HasValue == true && eachReferralProcedureCodes.ProcedureCode.IsDeleted.Value == false))
                            {
                                BO.ProcedureCode boProcedureCode = new BO.ProcedureCode();

                                boProcedureCode.ID = eachReferralProcedureCodes.ProcedureCode.Id;
                                boProcedureCode.ProcedureCodeText = eachReferralProcedureCodes.ProcedureCode.ProcedureCodeText;
                                boProcedureCode.ProcedureCodeDesc = eachReferralProcedureCodes.ProcedureCode.ProcedureCodeDesc;
                                boProcedureCode.Amount = eachReferralProcedureCodes.ProcedureCode.Amount;
                                boProcedureCode.CompanyId = eachReferralProcedureCodes.ProcedureCode.CompanyId;
                                boProcedureCode.SpecialityId = eachReferralProcedureCodes.ProcedureCode.SpecialityId;
                                boProcedureCode.RoomId = eachReferralProcedureCodes.ProcedureCode.RoomId;
                                boProcedureCode.RoomTestId = eachReferralProcedureCodes.ProcedureCode.RoomTestId;

                                referralProcedureCode.ProcedureCode = boProcedureCode;
                            }
                        }

                        boReferralProcedureCode.Add(referralProcedureCode);
                        
                    }
                }
                referralBO.ReferralProcedureCode = boReferralProcedureCode;
            }

            return (T)(object)referralBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Referral2 referralBO = (BO.Referral2)(object)entity;
            var result = referralBO.Validate(referralBO);
            return result;
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.Referral2 referralBO = (BO.Referral2)(object)entity;
            Referral2 referralDB = new Referral2();
            List<BO.ReferralProcedureCode> ReferralProcedureCodeBOList = referralBO.ReferralProcedureCode;

            if (referralBO != null)
            {
                using (var dbContextTransaction = _context.Database.BeginTransaction())
                {
                    referralDB = _context.Referral2.Where(p => p.Id == referralBO.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                    bool add_referral = false;

                    if (referralDB == null && referralBO.ID > 0)
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Referral data.", ErrorLevel = ErrorLevel.Error };
                    }
                    else if (referralDB == null && referralBO.ID <= 0)
                    {
                        referralDB = new Referral2();
                        add_referral = true;
                    }

                    referralDB.PendingReferralId = referralBO.PendingReferralId;
                    referralDB.FromCompanyId = referralBO.FromCompanyId;
                    referralDB.FromLocationId = referralBO.FromLocationId;
                    referralDB.FromDoctorId = referralBO.FromDoctorId;
                    referralDB.ForSpecialtyId = referralBO.ForSpecialtyId;
                    referralDB.ForRoomId = referralBO.ForRoomId;
                    referralDB.ForRoomTestId = referralBO.ForRoomTestId;
                    referralDB.ToCompanyId = referralBO.ToCompanyId;
                    referralDB.ToLocationId = referralBO.ToLocationId;
                    referralDB.ToDoctorId = referralBO.ToDoctorId;
                    referralDB.ToRoomId = referralBO.ToRoomId;
                    //referralDB.ScheduledPatientVisitId = referralBO.ScheduledPatientVisitId;
                    referralDB.DismissedBy = referralBO.DismissedBy;

                    if (add_referral == true)
                    {
                        referralDB = _context.Referral2.Add(referralDB);
                    }
                    _context.SaveChanges();

                    #region ReferralProcedureCode
                    if (ReferralProcedureCodeBOList == null || (ReferralProcedureCodeBOList != null && ReferralProcedureCodeBOList.Count <= 0))
                    {
                        //return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Patient Visit Procedure Code.", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        int ReferralId = referralDB.Id;
                        List<int> NewProcedureCodeIds = ReferralProcedureCodeBOList.Select(p => p.ProcedureCodeId).ToList();

                        List<ReferralProcedureCode> ReomveProcedureCodeDB = new List<ReferralProcedureCode>();
                        ReomveProcedureCodeDB = _context.ReferralProcedureCodes.Where(p => p.ReferralId == ReferralId
                                                                                        && NewProcedureCodeIds.Contains(p.ProcedureCodeId) == false
                                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                   .ToList();

                        ReomveProcedureCodeDB.ForEach(p => { p.IsDeleted = true; p.UpdateByUserID = 0; p.UpdateDate = DateTime.UtcNow; });

                        _context.SaveChanges();

                        foreach (BO.ReferralProcedureCode eachReferralProcedureCode in ReferralProcedureCodeBOList)
                        {
                            ReferralProcedureCode AddProcedureCodeDB = new ReferralProcedureCode();
                            AddProcedureCodeDB = _context.ReferralProcedureCodes.Where(p => p.ReferralId == ReferralId
                                                                                        && p.ProcedureCodeId == eachReferralProcedureCode.ProcedureCodeId
                                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                   .FirstOrDefault();

                            if (AddProcedureCodeDB == null)
                            {
                                AddProcedureCodeDB = new ReferralProcedureCode();

                                AddProcedureCodeDB.ReferralId = ReferralId;
                                AddProcedureCodeDB.ProcedureCodeId = eachReferralProcedureCode.ProcedureCodeId;

                                _context.ReferralProcedureCodes.Add(AddProcedureCodeDB);
                            }
                        }

                        _context.SaveChanges();
                    }
                    #endregion

                    //Set Pending Referral IsReferralCreated = true
                    var PendingReferral = _context.PendingReferrals.Where(p => p.Id == referralDB.PendingReferralId).FirstOrDefault();
                    if (PendingReferral != null)
                    {
                        PendingReferral.IsReferralCreated = true;
                        _context.SaveChanges();
                    }

                    dbContextTransaction.Commit();
                }
            }
            else
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid details.", ErrorLevel = ErrorLevel.Error };
            }
            _context.SaveChanges();

            ////METHOD TO GENERATE REFFERAL DOCUMENT AND SAVE IN MIDASDOCUMENTS/CASEDOCUMENTS TABLE
            this.GenerateReferralDocument(referralDB.Id);

            referralDB = _context.Referral2.Include("Company")
                                          .Include("Company1")
                                          .Include("Location")
                                          .Include("Location1")
                                          .Include("Doctor")
                                          .Include("Doctor.User")
                                          .Include("Doctor1")
                                          .Include("Doctor1.User")
                                          //.Include("PatientVisit2")
                                          //.Include("PendingReferral")
                                          .Include("Room")
                                          .Include("Room1")
                                          .Include("RoomTest")
                                          .Include("Specialty")
                                          .Include("User")
                                          .Include("ReferralProcedureCodes")
                                          .Include("ReferralProcedureCodes.ProcedureCode")
                                          .Where(p => p.Id == referralDB.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                              .FirstOrDefault<Referral2>();

            var res = Convert<BO.Referral2, Referral2>(referralDB);
            return (object)res;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.Referral2.Include("Company")
                                        .Include("Company1")
                                        .Include("Location")
                                        .Include("Location1")
                                        .Include("Doctor")
                                        .Include("Doctor.User")
                                        .Include("Doctor1")
                                        .Include("Doctor1.User")
                                        //.Include("PatientVisit2")
                                        //.Include("PendingReferral")
                                        .Include("Room")
                                        .Include("Room1")
                                        .Include("RoomTest")
                                        .Include("Specialty")
                                        .Include("User")
                                        .Include("ReferralProcedureCodes")
                                        .Include("ReferralProcedureCodes.ProcedureCode")
                                        .Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            BO.Referral2 acc_ = Convert<BO.Referral2, Referral2>(acc);

            return (object)acc_;
        }
        #endregion

        #region Get By FromCompanyId
        public override object GetByFromCompanyId(int companyId)
        {
            var referralDB = _context.Referral2.Include("Company")
                                                .Include("Company1")
                                                .Include("Location")
                                                .Include("Location1")
                                                .Include("Doctor")
                                                .Include("Doctor.User")
                                                .Include("Doctor1")
                                                .Include("Doctor1.User")
                                                //.Include("PatientVisit2")
                                                //.Include("PendingReferral")
                                                .Include("Room")
                                                .Include("Room1")
                                                .Include("RoomTest")
                                                .Include("Specialty")
                                                .Include("User")
                                                .Include("ReferralProcedureCodes")
                                                .Include("ReferralProcedureCodes.ProcedureCode")

                                               .Where(p => p.FromCompanyId == companyId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<Referral2>();

            List<BO.Referral2> boReferral = new List<BO.Referral2>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral2, Referral2>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get By ToCompanyId
        public override object GetByToCompanyId(int companyId)
        {
            var referralDB = _context.Referral2.Include("Company")
                                                .Include("Company1")
                                                .Include("Location")
                                                .Include("Location1")
                                                .Include("Doctor")
                                                .Include("Doctor.User")
                                                .Include("Doctor1")
                                                .Include("Doctor1.User")
                                                //.Include("PatientVisit2")
                                                //.Include("PendingReferral")
                                                .Include("Room")
                                                .Include("Room1")
                                                .Include("RoomTest")
                                                .Include("Specialty")
                                                .Include("User")
                                                .Include("ReferralProcedureCodes")
                                                .Include("ReferralProcedureCodes.ProcedureCode")
                                               .Where(p => p.ToCompanyId == companyId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<Referral2>();

            List<BO.Referral2> boReferral = new List<BO.Referral2>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral2, Referral2>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get By From LocationId
        public override object GetByFromLocationId(int locationId)
        {
            var referralDB = _context.Referral2.Include("Company")
                                                .Include("Company1")
                                                .Include("Location")
                                                .Include("Location1")
                                                .Include("Doctor")
                                                .Include("Doctor.User")
                                                .Include("Doctor1")
                                                .Include("Doctor1.User")
                                                //.Include("PatientVisit2")
                                                //.Include("PendingReferral")
                                                .Include("Room")
                                                .Include("Room1")
                                                .Include("RoomTest")
                                                .Include("Specialty")
                                                .Include("User")
                                                .Include("ReferralProcedureCodes")
                                                .Include("ReferralProcedureCodes.ProcedureCode")

                                               .Where(p => p.FromLocationId == locationId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<Referral2>();

            List<BO.Referral2> boReferral = new List<BO.Referral2>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Location ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral2, Referral2>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get By To LocationId
        public override object GetByToLocationId(int locationId)
        {
            var referralDB = _context.Referral2.Include("Company")
                                                .Include("Company1")
                                                .Include("Location")
                                                .Include("Location1")
                                                .Include("Doctor")
                                                .Include("Doctor.User")
                                                .Include("Doctor1")
                                                .Include("Doctor1.User")
                                                //.Include("PatientVisit2")
                                                //.Include("PendingReferral")
                                                .Include("Room")
                                                .Include("Room1")
                                                .Include("RoomTest")
                                                .Include("Specialty")
                                                .Include("User")
                                                .Include("ReferralProcedureCodes")
                                                .Include("ReferralProcedureCodes.ProcedureCode")

                                               .Where(p => p.ToLocationId == locationId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<Referral2>();

            List<BO.Referral2> boReferral = new List<BO.Referral2>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Location ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral2, Referral2>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get By From Doctor Id
        public override object GetByFromDoctorAndCompanyId(int doctorId, int companyId)
        {
            var referralDB = _context.Referral2.Include("Company")
                                                .Include("Company1")
                                                .Include("Location")
                                                .Include("Location1")
                                                .Include("Doctor")
                                                .Include("Doctor.User")
                                                .Include("Doctor1")
                                                .Include("Doctor1.User")
                                                //.Include("PatientVisit2")
                                                //.Include("PendingReferral")
                                                .Include("Room")
                                                .Include("Room1")
                                                .Include("RoomTest")
                                                .Include("Specialty")
                                                .Include("User")
                                                .Include("ReferralProcedureCodes")
                                                .Include("ReferralProcedureCodes.ProcedureCode")
                                                .Where(p => p.FromDoctorId == doctorId && p.FromCompanyId == companyId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                .ToList<Referral2>();

            List<BO.Referral2> boReferral = new List<BO.Referral2>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Doctor ID and Company ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral2, Referral2>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get By To Doctor Id
        public override object GetByToDoctorAndCompanyId(int doctorId, int companyId)
        {
            var referralDB = _context.Referral2.Include("Company")
                                                .Include("Company1")
                                                .Include("Location")
                                                .Include("Location1")
                                                .Include("Doctor")
                                                .Include("Doctor.User")
                                                .Include("Doctor1")
                                                .Include("Doctor1.User")
                                                //.Include("PatientVisit2")
                                                //.Include("PendingReferral")
                                                .Include("Room")
                                                .Include("Room1")
                                                .Include("RoomTest")
                                                .Include("Specialty")
                                                .Include("User")
                                                .Include("ReferralProcedureCodes")
                                                .Include("ReferralProcedureCodes.ProcedureCode")
                                                .Where(p => p.ToDoctorId == doctorId && p.ToCompanyId == companyId
                                                 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                .ToList<Referral2>();

            List<BO.Referral2> boReferral = new List<BO.Referral2>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Doctor ID and Company ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral2, Referral2>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get By For Room Id
        public override object GetByForRoomId(int roomId)
        {
            var referralDB = _context.Referral2.Include("Company")
                                                .Include("Company1")
                                                .Include("Location")
                                                .Include("Location1")
                                                .Include("Doctor")
                                                .Include("Doctor.User")
                                                .Include("Doctor1")
                                                .Include("Doctor1.User")
                                                //.Include("PatientVisit2")
                                                //.Include("PendingReferral")
                                                .Include("Room")
                                                .Include("Room1")
                                                .Include("RoomTest")
                                                .Include("Specialty")
                                                .Include("User")
                                                .Include("ReferralProcedureCodes")
                                                .Include("ReferralProcedureCodes.ProcedureCode")

                                               .Where(p => p.ForRoomId == roomId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<Referral2>();

            List<BO.Referral2> boReferral = new List<BO.Referral2>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Room ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral2, Referral2>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get By To Room Id
        public override object GetByToRoomId(int roomId)
        {
            var referralDB = _context.Referral2.Include("Company")
                                                .Include("Company1")
                                                .Include("Location")
                                                .Include("Location1")
                                                .Include("Doctor")
                                                .Include("Doctor.User")
                                                .Include("Doctor1")
                                                .Include("Doctor1.User")
                                                //.Include("PatientVisit2")
                                                //.Include("PendingReferral")
                                                .Include("Room")
                                                .Include("Room1")
                                                .Include("RoomTest")
                                                .Include("Specialty")
                                                .Include("User")
                                                .Include("ReferralProcedureCodes")
                                                .Include("ReferralProcedureCodes.ProcedureCode")

                                               .Where(p => p.ToRoomId == roomId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<Referral2>();

            List<BO.Referral2> boReferral = new List<BO.Referral2>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Room ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral2, Referral2>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get By For Specialty Id
        public override object GetByForSpecialtyId(int specialtyId)
        {
            var referralDB = _context.Referral2.Include("Company")
                                                .Include("Company1")
                                                .Include("Location")
                                                .Include("Location1")
                                                .Include("Doctor")
                                                .Include("Doctor.User")
                                                .Include("Doctor1")
                                                .Include("Doctor1.User")
                                                //.Include("PatientVisit2")
                                                //.Include("PendingReferral")
                                                .Include("Room")
                                                .Include("Room1")
                                                .Include("RoomTest")
                                                .Include("Specialty")
                                                .Include("User")
                                                .Include("ReferralProcedureCodes")
                                                .Include("ReferralProcedureCodes.ProcedureCode")

                                               .Where(p => p.ForSpecialtyId == specialtyId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<Referral2>();

            List<BO.Referral2> boReferral = new List<BO.Referral2>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Specialty ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral2, Referral2>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get By For Room Test Id
        public override object GetByForRoomTestId(int roomTestId)
        {
            var referralDB = _context.Referral2.Include("Company")
                                                .Include("Company1")
                                                .Include("Location")
                                                .Include("Location1")
                                                .Include("Doctor")
                                                .Include("Doctor.User")
                                                .Include("Doctor1")
                                                .Include("Doctor1.User")
                                                //.Include("PatientVisit2")
                                                //.Include("PendingReferral")
                                                .Include("Room")
                                                .Include("Room1")
                                                .Include("RoomTest")
                                                .Include("Specialty")
                                                .Include("User")
                                                .Include("ReferralProcedureCodes")
                                                .Include("ReferralProcedureCodes.ProcedureCode")

                                               .Where(p => p.ForRoomTestId == roomTestId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<Referral2>();

            List<BO.Referral2> boReferral = new List<BO.Referral2>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this RoomTest ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral2, Referral2>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion

        public string GetTemplateDocument(string templateType)
        {
            TemplateTypeRepository templateTypeRepo = new TemplateTypeRepository(_context);
            BO.Common.TemplateType templateData = (BO.Common.TemplateType)templateTypeRepo.Get(templateType);

            return templateData.TemplateText;
        }

        public override object GenerateReferralDocument(int id)
        {
            HtmlToPdf htmlPDF = new HtmlToPdf();
            string path = string.Empty;
            string pdfText = GetTemplateDocument(Constants.ReferralType);
            var acc = _context.Referrals.Include("Case")
                                             .Include("Case.Patient2")
                                             .Include("Case.Patient2.User")
                                             .Include("Doctor")
                                             .Include("Doctor.User")
                                             .Include("Company")
                                             .Where(p => p.Id == id).FirstOrDefault();
            if (acc != null)
            {
                using (var dbContextTransaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        pdfText = pdfText.Replace("{{PatientName}}", acc.Case.Patient2.User.FirstName + " " + acc.Case.Patient2.User.LastName)
                                         .Replace("{{CreateDate}}", acc.CreateDate.ToShortDateString())
                                         .Replace("{{ReferredToDoctor}}", acc.Doctor != null ? (acc.Doctor.User.FirstName + " " + acc.Doctor.User.LastName) : "")
                                         .Replace("{{Note}}", acc.Note)
                                         .Replace("{{CompanyName}}", acc.Company.Name);

                        path = ConfigurationManager.AppSettings.Get("LOCAL_PATH") + "\\app_data\\uploads\\case_" + acc.Case.Id;
                        htmlPDF.OpenHTML(pdfText);
                        if (!Directory.Exists(path)) Directory.CreateDirectory(ConfigurationManager.AppSettings.Get("LOCAL_PATH") + "\\app_data\\uploads\\case_" + acc.Case.Id);
                        htmlPDF.SavePDF(@path + "\\Referral_Case_" + acc.Case.Id + ".pdf");

                        MidasDocument midasdoc = _context.MidasDocuments.Add(new MidasDocument()
                        {
                            ObjectType = Constants.ReferralType,
                            ObjectId = id,
                            DocumentName = "Referral_Case_" + acc.Case.Id + ".pdf",
                            DocumentPath = ConfigurationManager.AppSettings.Get("BLOB_PATH") + "/app_data/uploads/case_" + acc.Case.Id,
                            CreateDate = DateTime.UtcNow
                        });
                        _context.Entry(midasdoc).State = System.Data.Entity.EntityState.Added;
                        _context.SaveChanges();

                        ReferralDocument referralDoc = _context.ReferralDocuments.Add(new ReferralDocument()
                        {
                            MidasDocumentId = midasdoc.Id,
                            ReferralId = id,
                            DocumentName = "Referral_Case_" + acc.Case.Id + ".pdf",
                            CreateDate = DateTime.UtcNow
                        });
                        _context.Entry(referralDoc).State = System.Data.Entity.EntityState.Added;
                        _context.SaveChanges();

                        dbContextTransaction.Commit();
                    }
                    catch (Exception)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { ErrorMessage = "Error occurred in document upload/save.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                }
            }
            else
                return new BO.ErrorObject { ErrorMessage = "No record found for referral id", errorObject = "", ErrorLevel = ErrorLevel.Error };

            return acc;
        }


        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

}
