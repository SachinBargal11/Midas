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
    internal class ReferralRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<Referral> _dbReferral;

        public ReferralRepository(MIDASGBXEntities context) : base(context)
        {
            _dbReferral = context.Set<Referral>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Referral referral = entity as Referral;

            if (referral == null)
                return default(T);

            BO.Referral referralBO = new BO.Referral();

            referralBO.ID = referral.Id;
            referralBO.PendingReferralId = referral.PendingReferralId;
            referralBO.FromCompanyId = referral.FromCompanyId;
            referralBO.FromLocationId = referral.FromLocationId;
            referralBO.FromDoctorId = referral.FromDoctorId;
            referralBO.FromUserId = referral.FromUserId;
            referralBO.ForSpecialtyId = referral.ForSpecialtyId;
            referralBO.ForRoomId = referral.ForRoomId;
            referralBO.ForRoomTestId = referral.ForRoomTestId;
            referralBO.ToCompanyId = referral.ToCompanyId;
            referralBO.ToLocationId = referral.ToLocationId;
            referralBO.ToDoctorId = referral.ToDoctorId;
            referralBO.ToRoomId = referral.ToRoomId;
            referralBO.ScheduledPatientVisitId = referral.ScheduledPatientVisitId;
            referralBO.DismissedBy = referral.DismissedBy;
            referralBO.CaseId = referral.CaseId;
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

            //if (referral.User != null)
            //{
            //    if (referral.User.IsDeleted.HasValue == false || (referral.User.IsDeleted.HasValue == true && referral.User.IsDeleted.Value == false))
            //    {
            //        BO.User boUser = new BO.User();
            //        using (UserRepository cmp = new UserRepository(_context))
            //        {
            //            boUser = cmp.Convert<BO.User, User>(referral.User);
            //            boUser.AddressInfo = null;
            //            boUser.ContactInfo = null;
            //            boUser.UserCompanies = null;
            //            boUser.Roles = null;

            //            referralBO.User = boUser;
            //        }
            //    }
            //}

            if (referral.User1 != null)
            {
                if (referral.User1.IsDeleted.HasValue == false || (referral.User1.IsDeleted.HasValue == true && referral.User1.IsDeleted.Value == false))
                {

                    BO.User boUser1 = new BO.User();
                    using (UserRepository cmp = new UserRepository(_context))
                    {
                        boUser1 = cmp.Convert<BO.User, User>(referral.User1);

                        referralBO.User1 = boUser1;
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

            if (referral.Case != null)
            {
                if (referral.Case.IsDeleted.HasValue == false || (referral.Case.IsDeleted.HasValue == true && referral.Case.IsDeleted.Value == false))
                {
                    BO.Case boCase = new BO.Case();
                    using (CaseRepository cmp = new CaseRepository(_context))
                    {
                        boCase = cmp.Convert<BO.Case, Case>(referral.Case);
                        boCase.PatientEmpInfo = null;
                        if (boCase.Patient != null)
                        {
                            boCase.Patient.Cases = null;
                        }                        
                        boCase.Referrals = null;
                        referralBO.Case = boCase;
                    }
                }
            }                

            return (T)(object)referralBO;
        }
        #endregion

        #region ReferralList Conversion
        public T ConvertReferralList<T, U>(U entity)
        {
            Referral Referral = entity as Referral;

            if (Referral == null)
                return default(T);

            BO.ReferralList ReferralListBO = new BO.ReferralList();

            ReferralListBO.ID = Referral.Id;
            ReferralListBO.PendingReferralId = Referral.PendingReferralId;
            ReferralListBO.FromCompanyId = Referral.FromCompanyId;
            ReferralListBO.FromLocationId = Referral.FromLocationId;
            ReferralListBO.FromDoctorId = Referral.FromDoctorId;
            ReferralListBO.FromUserId = Referral.FromUserId;
            ReferralListBO.ForSpecialtyId = Referral.ForSpecialtyId;
            ReferralListBO.ForRoomId = Referral.ForRoomId;
            ReferralListBO.ForRoomTestId = Referral.ForRoomTestId;
            ReferralListBO.ToCompanyId = Referral.ToCompanyId;
            ReferralListBO.ToLocationId = Referral.ToLocationId;
            ReferralListBO.ToDoctorId = Referral.ToDoctorId;
            ReferralListBO.ToRoomId = Referral.ToRoomId;
            ReferralListBO.ScheduledPatientVisitId = Referral.ScheduledPatientVisitId;
            ReferralListBO.DismissedBy = Referral.DismissedBy;
            ReferralListBO.CaseId = Referral.CaseId;
            ReferralListBO.FromUserId = Referral.FromUserId;
            ReferralListBO.IsDeleted = Referral.IsDeleted;
            ReferralListBO.CreateByUserID = Referral.CreateByUserID;
            ReferralListBO.UpdateByUserID = Referral.UpdateByUserID;

            if (Referral.PendingReferral != null)
            {
                if (Referral.PendingReferral.IsDeleted.HasValue == false || (Referral.PendingReferral.IsDeleted.HasValue == true && Referral.PendingReferral.IsDeleted.Value == false))
                {
                    //if (Referral.PendingReferral.PatientVisit2 != null)
                    //{
                    //    if (Referral.PendingReferral.PatientVisit2.IsDeleted.HasValue == false || (Referral.PendingReferral.PatientVisit2.IsDeleted.HasValue == true && Referral.PendingReferral.PatientVisit2.IsDeleted.Value == false))
                    //    {
                    //        ReferralListBO.PatientVisitId = Referral.PendingReferral.PatientVisitId;
                    //    }
                    //}
                    ReferralListBO.PatientVisitId = Referral.PendingReferral.PatientVisitId;
                }
            }

            ReferralListBO.CaseId = Referral.CaseId;

            if (Referral.Case != null)
            {
                if (Referral.Case.IsDeleted.HasValue == false || (Referral.Case.IsDeleted.HasValue == true && Referral.Case.IsDeleted.Value == false))
                {
                    BO.Case boCase = new BO.Case();
                    using (CaseRepository cmp = new CaseRepository(_context))
                    {
                        boCase = cmp.Convert<BO.Case, Case>(Referral.Case);
                        boCase.PatientEmpInfo = null;
                        boCase.Patient = null;
                        boCase.Referrals = null;
                        ReferralListBO.Case = boCase;
                    }
                }

                if (Referral.Case.Patient != null)
                {
                    if (Referral.Case.Patient.IsDeleted.HasValue == false || (Referral.Case.Patient.IsDeleted.HasValue == true && Referral.Case.Patient.IsDeleted.Value == false))
                    {
                        if (Referral.Case.Patient.User != null)
                        {
                            if (Referral.Case.Patient.User.IsDeleted.HasValue == false || (Referral.Case.Patient.User.IsDeleted.HasValue == true && Referral.Case.Patient.User.IsDeleted.Value == false))
                            {
                                ReferralListBO.PatientFirstName = Referral.Case.Patient.User.FirstName;
                                ReferralListBO.PatientLastName = Referral.Case.Patient.User.LastName;
                            }
                        }
                    }
                }
            }

            if (Referral.Company != null)
            {
                if (Referral.Company.IsDeleted.HasValue == false || (Referral.Company.IsDeleted.HasValue == true && Referral.Company.IsDeleted.Value == false))
                {
                    ReferralListBO.FromCompanyName = Referral.Company.Name;
                }
            }

            if (Referral.Company1 != null)
            {
                if (Referral.Company1.IsDeleted.HasValue == false || (Referral.Company1.IsDeleted.HasValue == true && Referral.Company1.IsDeleted.Value == false))
                {
                    ReferralListBO.ToCompanyName = Referral.Company1.Name;
                }
            }

            if (Referral.Doctor != null)
            {
                if (Referral.Doctor.IsDeleted.HasValue == false || (Referral.Doctor.IsDeleted.HasValue == true && Referral.Doctor.IsDeleted.Value == false))
                {
                    ReferralListBO.FromDoctorFirstName = Referral.Doctor.User.FirstName;
                    ReferralListBO.FromDoctorLastName = Referral.Doctor.User.LastName;
                }
            }

            if (Referral.Doctor1 != null)
            {
                if (Referral.Doctor1.IsDeleted.HasValue == false || (Referral.Doctor1.IsDeleted.HasValue == true && Referral.Doctor1.IsDeleted.Value == false))
                {
                    ReferralListBO.ToDoctorFirstName = Referral.Doctor1.User.FirstName;
                    ReferralListBO.ToDoctorLastName = Referral.Doctor1.User.LastName;
                }
            }

            if (Referral.Location != null)
            {
                if (Referral.Location.IsDeleted.HasValue == false || (Referral.Location.IsDeleted.HasValue == true && Referral.Location.IsDeleted.Value == false))
                {
                    ReferralListBO.FromLocationName = Referral.Location.Name;
                }
            }

            if (Referral.Location1 != null)
            {
                if (Referral.Location1.IsDeleted.HasValue == false || (Referral.Location1.IsDeleted.HasValue == true && Referral.Location1.IsDeleted.Value == false))
                {
                    ReferralListBO.ToLocationName = Referral.Location1.Name;
                }
            }

            if (Referral.Room != null)
            {
                if (Referral.Room.IsDeleted.HasValue == false || (Referral.Room.IsDeleted.HasValue == true && Referral.Room.IsDeleted.Value == false))
                {
                    BO.Room boRoom = new BO.Room();
                    using (RoomRepository cmp = new RoomRepository(_context))
                    {
                        boRoom = cmp.Convert<BO.Room, Room>(Referral.Room);
                        boRoom.location = null;
                        boRoom.schedule = null;
                        ReferralListBO.Room = boRoom;
                    }
                }
            }

            if (Referral.Room1 != null)
            {
                if (Referral.Room1.IsDeleted.HasValue == false || (Referral.Room1.IsDeleted.HasValue == true && Referral.Room1.IsDeleted.Value == false))
                {
                    BO.Room boRoom = new BO.Room();
                    using (RoomRepository cmp = new RoomRepository(_context))
                    {
                        boRoom = cmp.Convert<BO.Room, Room>(Referral.Room1);
                        boRoom.location = null;
                        boRoom.schedule = null;
                        ReferralListBO.Room1 = boRoom;
                    }
                }
            }

            if (Referral.RoomTest != null)
            {
                if (Referral.RoomTest.IsDeleted.HasValue == false || (Referral.RoomTest.IsDeleted.HasValue == true && Referral.RoomTest.IsDeleted.Value == false))
                {
                    BO.RoomTest boRoomTest = new BO.RoomTest();
                    using (RoomTestRepository cmp = new RoomTestRepository(_context))
                    {
                        boRoomTest = cmp.Convert<BO.RoomTest, RoomTest>(Referral.RoomTest);
                        boRoomTest.rooms = null;
                        ReferralListBO.RoomTest = boRoomTest;
                    }
                }
            }

            if (Referral.Specialty != null)
            {
                if (Referral.Specialty.IsDeleted.HasValue == false || (Referral.Specialty.IsDeleted.HasValue == true && Referral.Specialty.IsDeleted.Value == false))
                {
                    BO.Specialty boSpecialty = new BO.Specialty();
                    using (SpecialityRepository cmp = new SpecialityRepository(_context))
                    {
                        boSpecialty = cmp.Convert<BO.Specialty, Specialty>(Referral.Specialty);
                        boSpecialty.SpecialtyDetails = null;
                        ReferralListBO.Specialty = boSpecialty;
                    }
                }
            }

            if (Referral.User1 != null)
            {
                if (Referral.User1.IsDeleted.HasValue == false || (Referral.User1.IsDeleted.HasValue == true && Referral.User1.IsDeleted.Value == false))
                {
                   
                    BO.User boUser = new BO.User();
                    using (UserRepository cmp = new UserRepository(_context))
                    {
                        boUser = cmp.Convert<BO.User, User>(Referral.User1);
                    
                        ReferralListBO.User1 = boUser;
                    }
                }
            }

            ReferralListBO.ReferralProcedureCode = new List<BO.ReferralProcedureCode>();

            if (Referral.ReferralProcedureCodes != null)
            {
                foreach (var eachReferralProcedureCodes in Referral.ReferralProcedureCodes)
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

                        ReferralListBO.ReferralProcedureCode.Add(referralProcedureCode);
                    }
                }
            }

            if (Referral.ReferralDocuments != null)
            {
                List<BO.ReferralDocument> boReferralDocument = new List<BO.ReferralDocument>();

                foreach (var eachReferralDocument in Referral.ReferralDocuments)
                {
                    if (eachReferralDocument.IsDeleted.HasValue == false || (eachReferralDocument.IsDeleted.HasValue == true && eachReferralDocument.IsDeleted.Value == false))
                    {
                        BO.ReferralDocument referralDocument = new BO.ReferralDocument();

                        referralDocument.ID = eachReferralDocument.Id;
                        referralDocument.ReferralId = eachReferralDocument.ReferralId;
                        referralDocument.DocumentName = eachReferralDocument.DocumentName;
                        referralDocument.MidasDocumentId = eachReferralDocument.MidasDocumentId;
                        referralDocument.IsDeleted = eachReferralDocument.IsDeleted;
                        referralDocument.UpdateByUserID = eachReferralDocument.UpdateUserId;
                        referralDocument.CreateByUserID = (int)(eachReferralDocument.CreateUserId.HasValue == true ? eachReferralDocument.CreateUserId.Value : 0);

                        if (eachReferralDocument.MidasDocument != null)
                        {
                            BO.MidasDocument boMidasDocument = new BO.MidasDocument();

                            boMidasDocument.ID = eachReferralDocument.Id;
                            boMidasDocument.ObjectType = eachReferralDocument.MidasDocument.ObjectType;
                            boMidasDocument.ObjectId = eachReferralDocument.MidasDocument.ObjectId;
                            boMidasDocument.DocumentPath = eachReferralDocument.MidasDocument.DocumentPath;
                            boMidasDocument.DocumentName = eachReferralDocument.MidasDocument.DocumentName;
                            boMidasDocument.IsDeleted = eachReferralDocument.MidasDocument.IsDeleted;
                            boMidasDocument.UpdateByUserID = eachReferralDocument.MidasDocument.UpdateUserId;
                            boMidasDocument.CreateByUserID = (int)(eachReferralDocument.MidasDocument.CreateUserId.HasValue == true ? eachReferralDocument.MidasDocument.CreateUserId.Value : 0);

                            referralDocument.MidasDocument = boMidasDocument;
                        }


                        boReferralDocument.Add(referralDocument);
                    }
                }

                ReferralListBO.ReferralDocument = boReferralDocument;
            }

            //if(Referral != null)
            //{
            //    if (Referral.Case != null)
            //    {
            //        if (Referral.Case.IsDeleted.HasValue == false || (Referral.Case.IsDeleted.HasValue == true && Referral.Case.IsDeleted.Value == false))
            //        {
            //            BO.Case boCase = new BO.Case();
            //            using (CaseRepository cmp = new CaseRepository(_context))
            //            {
            //                boCase = cmp.Convert<BO.Case, Case>(Referral.Case);
            //                boCase.PatientEmpInfo = null;
            //                boCase.Patient = null;
            //                boCase.Referrals = null;
            //                ReferralListBO.Case = boCase;
            //            }
            //        }
            //    }
            //}
            

            return (T)(object)ReferralListBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Referral referralBO = (BO.Referral)(object)entity;
            var result = referralBO.Validate(referralBO);
            return result;
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.Referral referralBO = (BO.Referral)(object)entity;
            Referral referralDB = new Referral();
            List<BO.ReferralProcedureCode> ReferralProcedureCodeBOList = referralBO.ReferralProcedureCode;

            if (referralBO != null)
            {
                using (var dbContextTransaction = _context.Database.BeginTransaction())
                {
                    referralDB = _context.Referrals.Where(p => p.Id == referralBO.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                    bool add_referral = false;

                    if (referralDB == null && referralBO.ID > 0)
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Referral data.", ErrorLevel = ErrorLevel.Error };
                    }
                    else if (referralDB == null && referralBO.ID <= 0)
                    {
                        referralDB = new Referral();
                        add_referral = true;
                    }

                    referralDB.PendingReferralId = referralBO.PendingReferralId;
                    referralDB.FromCompanyId = referralBO.FromCompanyId;
                    referralDB.FromLocationId = referralBO.FromLocationId;
                    referralDB.FromDoctorId = referralBO.FromDoctorId;
                    referralDB.FromUserId = referralBO.FromUserId;
                    referralDB.ForSpecialtyId = referralBO.ForSpecialtyId;
                    referralDB.ForRoomId = referralBO.ForRoomId;
                    referralDB.ForRoomTestId = referralBO.ForRoomTestId;
                    referralDB.ToCompanyId = referralBO.ToCompanyId;
                    referralDB.ToLocationId = referralBO.ToLocationId;
                    referralDB.ToDoctorId = referralBO.ToDoctorId;
                    referralDB.ToRoomId = referralBO.ToRoomId;
                    //referralDB.ScheduledPatientVisitId = referralBO.ScheduledPatientVisitId;
                    referralDB.DismissedBy = referralBO.DismissedBy;

                    if (referralBO.PendingReferralId.HasValue == true && referralBO.CaseId <= 0)
                    {
                        int? CaseId = _context.PendingReferrals.Include("PatientVisit")
                                                               .Where(p => p.Id == referralBO.PendingReferralId)
                                                               .Select(p => p.PatientVisit.CaseId)
                                                               .FirstOrDefault();
                        if (CaseId.HasValue == true)
                        {
                            referralDB.CaseId = CaseId.Value;
                        }
                        else
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid CaseId.", ErrorLevel = ErrorLevel.Error };
                        }
                    }
                    else if (referralBO.PendingReferralId.HasValue == false && referralBO.CaseId <= 0)
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid PendingReferralId, CaseId.", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        referralDB.CaseId = referralBO.CaseId;
                    }                    

                    if (add_referral == true)
                    {
                        referralDB.CreateByUserID = 1;
                        referralDB.CreateDate = DateTime.UtcNow;
                        referralDB = _context.Referrals.Add(referralDB);
                    }
                    else
                    {
                        referralDB.UpdateByUserID = 1;
                        referralDB.UpdateDate = DateTime.UtcNow;
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
            //_context.SaveChanges();

            ////METHOD TO GENERATE REFFERAL DOCUMENT AND SAVE IN MIDASDOCUMENTS/CASEDOCUMENTS TABLE
            var result = this.GenerateReferralDocument(referralDB.Id);
            if (result is BO.ErrorObject)
            {
                return result;
            }

            referralDB = _context.Referrals.Include("Company")
                                          .Include("Company1")
                                          .Include("Location")
                                          .Include("Location1")
                                          .Include("Doctor")
                                          .Include("Doctor.User")
                                          .Include("Doctor1")
                                          .Include("Doctor1.User")
                                          .Include("Case")
                                          .Include("Case.CaseCompanyMappings")
                                          .Include("Case.CompanyCaseConsentApprovals")
                                          .Include("Case.CaseCompanyConsentDocuments")
                                          .Include("Case.Patient")
                                          .Include("Case.Patient.User")
                                          .Include("Room")
                                          .Include("Room1")
                                          .Include("RoomTest")
                                          .Include("Specialty")
                                          .Include("User1")
                                          .Include("ReferralProcedureCodes")
                                          .Include("ReferralProcedureCodes.ProcedureCode")
                                          .Include("ReferralDocuments")
                                          .Include("ReferralDocuments.MidasDocument")
                                          .Where(p => p.Id == referralDB.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                              .FirstOrDefault<Referral>();

            var res = Convert<BO.Referral, Referral>(referralDB);
            return (object)res;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.Referrals.Include("Company")
                                        .Include("Company1")
                                        .Include("Location")
                                        .Include("Location1")
                                        .Include("Doctor")
                                        .Include("Doctor.User")
                                        .Include("Doctor1")
                                        .Include("Doctor1.User")
                                        .Include("Case")
                                        .Include("Case.CaseCompanyMappings")
                                        .Include("Case.CompanyCaseConsentApprovals")
                                        .Include("Case.CaseCompanyConsentDocuments")
                                        .Include("Case.Patient")
                                        .Include("Case.Patient.User")
                                        .Include("Room")
                                        .Include("Room1")
                                        .Include("RoomTest")
                                        .Include("Specialty")
                                        .Include("User1")
                                        .Include("ReferralProcedureCodes")
                                        .Include("ReferralProcedureCodes.ProcedureCode")
                                        .Include("ReferralDocuments")
                                        .Include("ReferralDocuments.MidasDocument")
                                        .Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            BO.Referral acc_ = Convert<BO.Referral, Referral>(acc);

            return (object)acc_;
        }
        #endregion

        #region Get By FromCompanyId
        public override object GetByFromCompanyId(int companyId)
        {
            var referralDB = _context.Referrals.Include("Company")
                                                .Include("Company1")
                                                .Include("Location")
                                                .Include("Location1")
                                                .Include("Doctor")
                                                .Include("Doctor.User")
                                                .Include("Doctor1")
                                                .Include("Doctor1.User")
                                                .Include("Case")
                                                .Include("Case.CaseCompanyMappings")
                                                .Include("Case.CompanyCaseConsentApprovals")
                                                .Include("Case.CaseCompanyConsentDocuments")
                                                .Include("Case.Patient")
                                                .Include("Case.Patient.User")
                                                .Include("Room")
                                                .Include("Room1")
                                                .Include("RoomTest")
                                                .Include("Specialty")
                                                .Include("User1")
                                                .Include("ReferralProcedureCodes")
                                                .Include("ReferralProcedureCodes.ProcedureCode")
                                                .Include("ReferralDocuments")
                                                .Include("ReferralDocuments.MidasDocument")

                                               .Where(p => p.FromCompanyId == companyId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<Referral>();

            List<BO.Referral> boReferral = new List<BO.Referral>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral, Referral>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get By ToCompanyId
        public override object GetByToCompanyId(int companyId)
        {
            var referralDB = _context.Referrals.Include("Company")
                                                .Include("Company1")
                                                .Include("Location")
                                                .Include("Location1")
                                                .Include("Doctor")
                                                .Include("Doctor.User")
                                                .Include("Doctor1")
                                                .Include("Doctor1.User")
                                                .Include("Case")
                                                .Include("Case.CaseCompanyMappings")
                                                .Include("Case.CompanyCaseConsentApprovals")
                                                .Include("Case.CaseCompanyConsentDocuments")
                                                .Include("Case.Patient")
                                                .Include("Case.Patient.User")
                                                .Include("Room")
                                                .Include("Room1")
                                                .Include("RoomTest")
                                                .Include("Specialty")
                                                .Include("User1")
                                                .Include("ReferralProcedureCodes")
                                                .Include("ReferralProcedureCodes.ProcedureCode")
                                                .Include("ReferralDocuments")
                                                .Include("ReferralDocuments.MidasDocument")

                                               .Where(p => p.ToCompanyId == companyId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<Referral>();

            List<BO.Referral> boReferral = new List<BO.Referral>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral, Referral>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get Referral By From CompanyId
        public override object GetReferralByFromCompanyId(int companyId)
        {
            var referralDB = _context.Referrals.Include("Company")
                                               .Include("Company1")
                                               .Include("Location")
                                               .Include("Location1")
                                               .Include("Doctor")
                                               .Include("Doctor.User")
                                               .Include("Doctor1")
                                               .Include("Doctor1.User")
                                               .Include("Case")
                                               .Include("Case.CaseCompanyMappings")
                                               .Include("Case.CompanyCaseConsentApprovals")
                                               .Include("Case.CaseCompanyConsentDocuments")
                                               .Include("Case.Patient")
                                               .Include("Case.Patient.User")
                                               .Include("Room")
                                               .Include("Room1")
                                               .Include("RoomTest")
                                               .Include("Specialty")
                                               .Include("User1")
                                               .Include("ReferralProcedureCodes")
                                               .Include("ReferralProcedureCodes.ProcedureCode")
                                               .Include("ReferralDocuments")
                                               .Include("ReferralDocuments.MidasDocument")
                                               .Include("ReferralDocuments")
                                               .Include("ReferralDocuments.MidasDocument")

                                               .Where(p => p.FromCompanyId == companyId && p.ToCompanyId != companyId
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .OrderByDescending(p => p.Id).ToList<Referral>();

            List<BO.ReferralList> boReferral = new List<BO.ReferralList>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(ConvertReferralList<BO.ReferralList, Referral>(EachReferral));
                }

            }

            return boReferral;
        }
        #endregion

        #region Get Referral By To Company Id
        public override object GetReferralByToCompanyId(int companyId)
        {
            var referralDB = _context.Referrals.Include("Company")
                                                .Include("Company1")
                                                .Include("Location")
                                                .Include("Location1")
                                                .Include("Doctor")
                                                .Include("Doctor.User")
                                                .Include("Doctor1")
                                                .Include("Doctor1.User")
                                                .Include("Case")
                                                .Include("Case.CaseCompanyMappings")
                                                .Include("Case.CompanyCaseConsentApprovals")
                                                .Include("Case.CaseCompanyConsentDocuments")
                                                .Include("Case.Patient")
                                                .Include("Case.Patient.User")
                                                .Include("Room")
                                                .Include("Room1")
                                                .Include("RoomTest")
                                                .Include("Specialty")
                                                .Include("User1")
                                                .Include("ReferralProcedureCodes")
                                                .Include("ReferralProcedureCodes.ProcedureCode")
                                                .Include("ReferralDocuments")
                                                .Include("ReferralDocuments.MidasDocument")

                                               .Where(p => p.ToCompanyId == companyId && p.FromCompanyId != companyId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .OrderByDescending(p => p.Id).ToList<Referral>();

            List<BO.ReferralList> boReferral = new List<BO.ReferralList>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(ConvertReferralList<BO.ReferralList, Referral>(EachReferral));
                }

            }

            return boReferral;
        }
        #endregion

        #region Get Referral By To Company Id
        public override object GetInhouseReferralByCompanyId(int companyId)
        {
            var referralDB = _context.Referrals.Include("Company")
                                                .Include("Company1")
                                                .Include("Location")
                                                .Include("Location1")
                                                .Include("Doctor")
                                                .Include("Doctor.User")
                                                .Include("Doctor1")
                                                .Include("Doctor1.User")
                                                .Include("Case")
                                                .Include("Case.CaseCompanyMappings")
                                                .Include("Case.CompanyCaseConsentApprovals")
                                                .Include("Case.CaseCompanyConsentDocuments")
                                                .Include("Case.Patient")
                                                .Include("Case.Patient.User")
                                                .Include("Room")
                                                .Include("Room1")
                                                .Include("RoomTest")
                                                .Include("Specialty")
                                                .Include("User1")
                                                .Include("ReferralProcedureCodes")
                                                .Include("ReferralProcedureCodes.ProcedureCode")
                                                .Include("ReferralDocuments")
                                                .Include("ReferralDocuments.MidasDocument")

                                               .Where(p => p.ToCompanyId == companyId && p.FromCompanyId == companyId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .OrderByDescending(p => p.Id).ToList<Referral>();

            List<BO.ReferralList> boReferral = new List<BO.ReferralList>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(ConvertReferralList<BO.ReferralList, Referral>(EachReferral));
                }

            }

            return boReferral;
        }
        #endregion

        #region Get By From LocationId
        public override object GetByFromLocationId(int locationId)
        {
            var referralDB = _context.Referrals.Include("Company")
                                                .Include("Company1")
                                                .Include("Location")
                                                .Include("Location1")
                                                .Include("Doctor")
                                                .Include("Doctor.User")
                                                .Include("Doctor1")
                                                .Include("Doctor1.User")
                                                .Include("Case")
                                                .Include("Case.CaseCompanyMappings")
                                                .Include("Case.CompanyCaseConsentApprovals")
                                                .Include("Case.CaseCompanyConsentDocuments")
                                                .Include("Case.Patient")
                                                .Include("Case.Patient.User")
                                                .Include("Room")
                                                .Include("Room1")
                                                .Include("RoomTest")
                                                .Include("Specialty")
                                                .Include("User1")
                                                .Include("ReferralProcedureCodes")
                                                .Include("ReferralProcedureCodes.ProcedureCode")
                                                .Include("ReferralDocuments")
                                                .Include("ReferralDocuments.MidasDocument")

                                               .Where(p => p.FromLocationId == locationId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<Referral>();

            List<BO.Referral> boReferral = new List<BO.Referral>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Location ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral, Referral>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get By To LocationId
        public override object GetByToLocationId(int locationId)
        {
            var referralDB = _context.Referrals.Include("Company")
                                                .Include("Company1")
                                                .Include("Location")
                                                .Include("Location1")
                                                .Include("Doctor")
                                                .Include("Doctor.User")
                                                .Include("Doctor1")
                                                .Include("Doctor1.User")
                                                .Include("Case")
                                                .Include("Case.CaseCompanyMappings")
                                                .Include("Case.CompanyCaseConsentApprovals")
                                                .Include("Case.CaseCompanyConsentDocuments")
                                                .Include("Case.Patient")
                                                .Include("Case.Patient.User")
                                                .Include("Room")
                                                .Include("Room1")
                                                .Include("RoomTest")
                                                .Include("Specialty")
                                                .Include("User1")
                                                .Include("ReferralProcedureCodes")
                                                .Include("ReferralProcedureCodes.ProcedureCode")
                                                .Include("ReferralDocuments")
                                                .Include("ReferralDocuments.MidasDocument")

                                               .Where(p => p.ToLocationId == locationId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<Referral>();

            List<BO.Referral> boReferral = new List<BO.Referral>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Location ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral, Referral>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get By From Doctor And Company Id
        public override object GetByFromDoctorAndCompanyId(int doctorId, int companyId)
        {
            var referralDB = _context.Referrals.Include("Company")
                                                .Include("Company1")
                                                .Include("Location")
                                                .Include("Location1")
                                                .Include("Doctor")
                                                .Include("Doctor.User")
                                                .Include("Doctor1")
                                                .Include("Doctor1.User")
                                                .Include("Case")
                                                .Include("Case.CaseCompanyMappings")
                                                .Include("Case.CompanyCaseConsentApprovals")
                                                .Include("Case.CaseCompanyConsentDocuments")
                                                .Include("Case.Patient")
                                                .Include("Case.Patient.User")
                                                .Include("Room")
                                                .Include("Room1")
                                                .Include("RoomTest")
                                                .Include("Specialty")
                                                .Include("User1")
                                                .Include("ReferralProcedureCodes")
                                                .Include("ReferralProcedureCodes.ProcedureCode")
                                                .Include("ReferralDocuments")
                                               .Include("ReferralDocuments.MidasDocument")

                                                .Where(p => p.FromDoctorId == doctorId && p.FromCompanyId == companyId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                .ToList<Referral>();

            List<BO.Referral> boReferral = new List<BO.Referral>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Doctor ID and Company ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral, Referral>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get By To Doctor And Company Id
        public override object GetByToDoctorAndCompanyId(int doctorId, int companyId)
        {
            var referralDB = _context.Referrals.Include("Company")
                                                .Include("Company1")
                                                .Include("Location")
                                                .Include("Location1")
                                                .Include("Doctor")
                                                .Include("Doctor.User")
                                                .Include("Doctor1")
                                                .Include("Doctor1.User")
                                                .Include("Case")
                                                .Include("Case.CaseCompanyMappings")
                                                .Include("Case.CompanyCaseConsentApprovals")
                                                .Include("Case.CaseCompanyConsentDocuments")
                                                .Include("Case.Patient")
                                                .Include("Case.Patient.User")
                                                .Include("Room")
                                                .Include("Room1")
                                                .Include("RoomTest")
                                                .Include("Specialty")
                                                .Include("User1")
                                                .Include("ReferralProcedureCodes")
                                                .Include("ReferralProcedureCodes.ProcedureCode")
                                                .Include("ReferralDocuments")
                                               .Include("ReferralDocuments.MidasDocument")

                                                .Where(p => p.ToDoctorId == doctorId && p.ToCompanyId == companyId
                                                 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                .ToList<Referral>();

            List<BO.Referral> boReferral = new List<BO.Referral>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Doctor ID and Company ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral, Referral>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get Referral By From Doctor And Company Id
        public override object GetReferralByFromDoctorAndCompanyId(int doctorId, int companyId)
        {
            var referralDB = _context.Referrals.Include("Company")
                                               .Include("Company1")
                                               .Include("Location")
                                               .Include("Location1")
                                               .Include("Doctor")
                                               .Include("Doctor.User")
                                               .Include("Doctor1")
                                               .Include("Doctor1.User")
                                               .Include("Case")
                                               .Include("Case.CaseCompanyMappings")
                                               .Include("Case.CompanyCaseConsentApprovals")
                                               .Include("Case.CaseCompanyConsentDocuments")
                                               .Include("Case.Patient")
                                               .Include("Case.Patient.User")
                                               .Include("Room")
                                               .Include("Room1")
                                               .Include("RoomTest")
                                               .Include("Specialty")
                                               .Include("User1")
                                               .Include("ReferralProcedureCodes")
                                               .Include("ReferralProcedureCodes.ProcedureCode")
                                               .Include("ReferralDocuments")
                                               .Include("ReferralDocuments.MidasDocument")

                                               .Where(p => p.FromDoctorId == doctorId && p.FromCompanyId == companyId && p.ToCompanyId != companyId
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .OrderByDescending(p => p.Id).ToList<Referral>();

            List<BO.ReferralList> boReferral = new List<BO.ReferralList>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Doctor ID and Company ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(ConvertReferralList<BO.ReferralList, Referral>(EachReferral));
                   
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get Referral By To Doctor And Company Id
        public override object GetReferralByToDoctorAndCompanyId(int doctorId, int companyId)
        {
            var referralDB = _context.Referrals.Include("Company")
                                               .Include("Company1")
                                               .Include("Location")
                                               .Include("Location1")
                                               .Include("Doctor")
                                               .Include("Doctor.User")
                                               .Include("Doctor1")
                                               .Include("Doctor1.User")
                                               .Include("Case")
                                               .Include("Case.CaseCompanyMappings")
                                               .Include("Case.CompanyCaseConsentApprovals")
                                               .Include("Case.CaseCompanyConsentDocuments")
                                               .Include("Case.Patient")
                                               .Include("Case.Patient.User")
                                               .Include("Room")
                                               .Include("Room1")
                                               .Include("RoomTest")
                                               .Include("Specialty")
                                               .Include("User1")
                                               .Include("ReferralProcedureCodes")
                                               .Include("ReferralProcedureCodes.ProcedureCode")
                                               .Include("ReferralDocuments")
                                               .Include("ReferralDocuments.MidasDocument")

                                               .Where(p => p.ToDoctorId == doctorId && p.ToCompanyId == companyId && p.FromCompanyId != companyId
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .OrderByDescending(p => p.Id).ToList<Referral>();

            List<BO.ReferralList> boReferral = new List<BO.ReferralList>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Doctor ID and Company ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(ConvertReferralList<BO.ReferralList, Referral>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion


        #region Get inhouse Referral By  Doctor And Company Id
        public override object GetInhouseReferralByDoctorAndCompanyId(int doctorId, int companyId)
        {
            var referralDB = _context.Referrals.Include("Company")
                                               .Include("Company1")
                                               .Include("Location")
                                               .Include("Location1")
                                               .Include("Doctor")
                                               .Include("Doctor.User")
                                               .Include("Doctor1")
                                               .Include("Doctor1.User")
                                               .Include("Case")
                                               .Include("Case.CaseCompanyMappings")
                                               .Include("Case.CompanyCaseConsentApprovals")
                                               .Include("Case.CaseCompanyConsentDocuments")
                                               .Include("Case.Patient")
                                               .Include("Case.Patient.User")
                                               .Include("Room")
                                               .Include("Room1")
                                               .Include("RoomTest")
                                               .Include("Specialty")
                                               .Include("User1")
                                               .Include("ReferralProcedureCodes")
                                               .Include("ReferralProcedureCodes.ProcedureCode")
                                               .Include("ReferralDocuments")
                                               .Include("ReferralDocuments.MidasDocument")

                                               .Where(p => p.ToDoctorId == doctorId && p.ToCompanyId == companyId && p.FromCompanyId == companyId
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .OrderByDescending(p => p.Id).ToList<Referral>();

            List<BO.ReferralList> boReferral = new List<BO.ReferralList>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Doctor ID and Company ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(ConvertReferralList<BO.ReferralList, Referral>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get By For Room Id
        public override object GetByForRoomId(int roomId)
        {
            var referralDB = _context.Referrals.Include("Company")
                                                .Include("Company1")
                                                .Include("Location")
                                                .Include("Location1")
                                                .Include("Doctor")
                                                .Include("Doctor.User")
                                                .Include("Doctor1")
                                                .Include("Doctor1.User")
                                                .Include("Case")
                                                .Include("Case.CaseCompanyMappings")
                                                .Include("Case.CompanyCaseConsentApprovals")
                                                .Include("Case.CaseCompanyConsentDocuments")
                                                .Include("Case.Patient")
                                                .Include("Case.Patient.User")
                                                .Include("Room")
                                                .Include("Room1")
                                                .Include("RoomTest")
                                                .Include("Specialty")
                                                .Include("User1")
                                                .Include("ReferralProcedureCodes")
                                                .Include("ReferralProcedureCodes.ProcedureCode")
                                                .Include("ReferralDocuments")
                                               .Include("ReferralDocuments.MidasDocument")

                                               .Where(p => p.ForRoomId == roomId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<Referral>();

            List<BO.Referral> boReferral = new List<BO.Referral>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Room ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral, Referral>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get By To Room Id
        public override object GetByToRoomId(int roomId)
        {
            var referralDB = _context.Referrals.Include("Company")
                                                .Include("Company1")
                                                .Include("Location")
                                                .Include("Location1")
                                                .Include("Doctor")
                                                .Include("Doctor.User")
                                                .Include("Doctor1")
                                                .Include("Doctor1.User")
                                                .Include("Case")
                                                .Include("Case.CaseCompanyMappings")
                                                .Include("Case.CompanyCaseConsentApprovals")
                                                .Include("Case.CaseCompanyConsentDocuments")
                                                .Include("Case.Patient")
                                                .Include("Case.Patient.User")
                                                .Include("Room")
                                                .Include("Room1")
                                                .Include("RoomTest")
                                                .Include("Specialty")
                                                .Include("User1")
                                                .Include("ReferralProcedureCodes")
                                                .Include("ReferralProcedureCodes.ProcedureCode")
                                                .Include("ReferralDocuments")
                                               .Include("ReferralDocuments.MidasDocument")

                                               .Where(p => p.ToRoomId == roomId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<Referral>();

            List<BO.Referral> boReferral = new List<BO.Referral>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Room ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral, Referral>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get By For Specialty Id
        public override object GetByForSpecialtyId(int specialtyId)
        {
            var referralDB = _context.Referrals.Include("Company")
                                               .Include("Company1")
                                               .Include("Location")
                                               .Include("Location1")
                                               .Include("Doctor")
                                               .Include("Doctor.User")
                                               .Include("Doctor1")
                                               .Include("Doctor1.User")
                                               .Include("Case")
                                               .Include("Case.CaseCompanyMappings")
                                               .Include("Case.CompanyCaseConsentApprovals")
                                               .Include("Case.CaseCompanyConsentDocuments")
                                               .Include("Case.Patient")
                                               .Include("Case.Patient.User")
                                               .Include("Room")
                                               .Include("Room1")
                                               .Include("RoomTest")
                                               .Include("Specialty")
                                               .Include("User1")
                                               .Include("ReferralProcedureCodes")
                                               .Include("ReferralProcedureCodes.ProcedureCode")
                                               .Include("ReferralDocuments")
                                               .Include("ReferralDocuments.MidasDocument")

                                               .Where(p => p.ForSpecialtyId == specialtyId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<Referral>();

            List<BO.Referral> boReferral = new List<BO.Referral>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Specialty ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral, Referral>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get By For Room Test Id
        public override object GetByForRoomTestId(int roomTestId)
        {
            var referralDB = _context.Referrals.Include("Company")
                                               .Include("Company1")
                                               .Include("Location")
                                               .Include("Location1")
                                               .Include("Doctor")
                                               .Include("Doctor.User")
                                               .Include("Doctor1")
                                               .Include("Doctor1.User")
                                               .Include("Case")
                                               .Include("Case.CaseCompanyMappings")
                                               .Include("Case.CompanyCaseConsentApprovals")
                                               .Include("Case.CaseCompanyConsentDocuments")
                                               .Include("Case.Patient")
                                               .Include("Case.Patient.User")
                                               .Include("Room")
                                               .Include("Room1")
                                               .Include("RoomTest")
                                               .Include("Specialty")
                                               .Include("User1")
                                               .Include("ReferralProcedureCodes")
                                               .Include("ReferralProcedureCodes.ProcedureCode")
                                               .Include("ReferralDocuments")
                                               .Include("ReferralDocuments.MidasDocument")

                                               .Where(p => p.ForRoomTestId == roomTestId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<Referral>();

            List<BO.Referral> boReferral = new List<BO.Referral>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this RoomTest ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral, Referral>(EachReferral));
                }

            }

            return (object)boReferral;
        }
        #endregion


        #region Get By Case and CompanyId
        public override object GetByCaseAndCompanyId(int caseId,int companyId)
        {
            var referralDB = _context.Referrals.Include("Company")
                                               .Include("Company1")
                                               .Include("Location")
                                               .Include("Location1")
                                               .Include("Doctor")
                                               .Include("Doctor.User")
                                               .Include("Doctor1")
                                               .Include("Doctor1.User")
                                               .Include("Case")
                                               .Include("Case.CaseCompanyMappings")
                                               .Include("Case.CompanyCaseConsentApprovals")
                                               .Include("Case.CaseCompanyConsentDocuments")
                                               .Include("Case.Patient")
                                               .Include("Case.Patient.User")
                                               .Include("Room")
                                               .Include("Room1")
                                               .Include("RoomTest")
                                               .Include("Specialty")
                                               .Include("User1")                                               
                                               .Include("ReferralProcedureCodes")
                                               .Include("ReferralProcedureCodes.ProcedureCode")
                                               .Include("ReferralDocuments")
                                               .Include("ReferralDocuments.MidasDocument")

                                               .Where(p => p.CaseId == caseId && p.FromCompanyId == companyId
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .OrderByDescending(p => p.Id).ToList<Referral>();

            List<BO.ReferralList> boReferral = new List<BO.ReferralList>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case ID and Company ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachReferral in referralDB)
                {
                    boReferral.Add(ConvertReferralList<BO.ReferralList, Referral>(EachReferral));

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
                                             .Include("Case.Patient")
                                             .Include("Case.Patient.User")
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
                        pdfText = pdfText.Replace("{{PatientName}}", acc.Case.Patient.User.FirstName + " " + acc.Case.Patient.User.LastName)
                                         .Replace("{{CreateDate}}", acc.CreateDate.ToShortDateString())
                                         .Replace("{{ReferredToDoctor}}", acc.Doctor != null ? (acc.Doctor.User.FirstName + " " + acc.Doctor.User.LastName) : "")
                                         //.Replace("{{Note}}", acc.Note)
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
                            CreateDate = DateTime.UtcNow,
                            CreateUserId = acc.CreateByUserID
                        });
                        _context.Entry(midasdoc).State = System.Data.Entity.EntityState.Added;
                        _context.SaveChanges();

                        ReferralDocument referralDoc = _context.ReferralDocuments.Add(new ReferralDocument()
                        {
                            MidasDocumentId = midasdoc.Id,
                            ReferralId = id,
                            DocumentName = "Referral_Case_" + acc.Case.Id + ".pdf",
                            CreateDate = DateTime.UtcNow,
                            CreateUserId = acc.CreateByUserID
                        });
                        _context.Entry(referralDoc).State = System.Data.Entity.EntityState.Added;
                        _context.SaveChanges();

                        dbContextTransaction.Commit();
                    }
                    catch (Exception er)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { ErrorMessage = er.Message, errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                }
            }
            else
                return new BO.ErrorObject { ErrorMessage = "No record found for referral id", errorObject = "", ErrorLevel = ErrorLevel.Error };

            return acc;           
        }

        #region Associate Visit With Referral
        public override object AssociateVisitWithReferral(int ReferralId, int PatientVisitId)
        {
            var referralDB = _context.Referrals.Where(p => p.Id == ReferralId
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .FirstOrDefault();

            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Room ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                referralDB.ScheduledPatientVisitId = PatientVisitId;
                _context.SaveChanges();

                var acc = _context.Referrals.Include("Company")
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
                                        .Include("User1")
                                        .Include("ReferralProcedureCodes")
                                        .Include("ReferralProcedureCodes.ProcedureCode")
                                        .Where(p => p.Id == referralDB.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                if (acc == null)
                {
                    return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                BO.Referral acc_ = Convert<BO.Referral, Referral>(acc);

                return (object)acc_;
            }            
        }
        #endregion


        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

}
