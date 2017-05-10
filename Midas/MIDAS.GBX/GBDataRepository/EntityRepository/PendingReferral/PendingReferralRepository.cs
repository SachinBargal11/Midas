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
//using Docs.Pdf;

namespace MIDAS.GBX.DataRepository.EntityRepository.Common
{
    internal class PendingReferralRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<PendingReferral> _dbReferral;

        public PendingReferralRepository(MIDASGBXEntities context) : base(context)
        {
            _dbReferral = context.Set<PendingReferral>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            PendingReferral pendingReferral = entity as PendingReferral;

            if (pendingReferral == null)
                return default(T);

            BO.PendingReferral pendingReferralBO = new BO.PendingReferral();

            pendingReferralBO.ID = pendingReferral.Id;
            pendingReferralBO.PatientVisitId = pendingReferral.PatientVisitId;
            pendingReferralBO.FromCompanyId = pendingReferral.FromCompanyId;
            pendingReferralBO.FromLocationId = pendingReferral.FromLocationId;
            pendingReferralBO.FromDoctorId = pendingReferral.FromDoctorId;
            pendingReferralBO.ForSpecialtyId = pendingReferral.ForSpecialtyId;
            pendingReferralBO.ForRoomId = pendingReferral.ForRoomId;
            pendingReferralBO.ForRoomTestId = pendingReferral.ForRoomTestId;
            pendingReferralBO.IsReferralCreated = pendingReferral.IsReferralCreated;
            pendingReferralBO.DismissedBy = pendingReferral.DismissedBy;

            if (pendingReferral.PatientVisit2 != null)
            {
                if (pendingReferral.PatientVisit2.IsDeleted.HasValue == false || (pendingReferral.PatientVisit2.IsDeleted.HasValue == true && pendingReferral.PatientVisit2.IsDeleted.Value == false))
                {
                    BO.PatientVisit2 boPatientVisit= new BO.PatientVisit2();
                                       
                        boPatientVisit.ID = pendingReferral.PatientVisit2.Id;
                        boPatientVisit.CalendarEventId = pendingReferral.PatientVisit2.CalendarEventId;
                        boPatientVisit.CaseId = pendingReferral.PatientVisit2.CaseId;
                        boPatientVisit.PatientId = pendingReferral.PatientVisit2.PatientId;
                        boPatientVisit.LocationId = pendingReferral.PatientVisit2.LocationId;
                        boPatientVisit.RoomId = pendingReferral.PatientVisit2.RoomId;
                        boPatientVisit.DoctorId = pendingReferral.PatientVisit2.DoctorId;
                        boPatientVisit.SpecialtyId = pendingReferral.PatientVisit2.SpecialtyId;
                        boPatientVisit.EventStart = pendingReferral.PatientVisit2.EventStart;
                        boPatientVisit.EventEnd = pendingReferral.PatientVisit2.EventEnd;
                        boPatientVisit.Notes = pendingReferral.PatientVisit2.Notes;
                        boPatientVisit.VisitStatusId = pendingReferral.PatientVisit2.VisitStatusId;
                        boPatientVisit.VisitType = pendingReferral.PatientVisit2.VisitType;
                        boPatientVisit.IsOutOfOffice = pendingReferral.PatientVisit2.IsOutOfOffice;
                        boPatientVisit.LeaveStartDate = pendingReferral.PatientVisit2.LeaveStartDate;
                        boPatientVisit.LeaveEndDate = pendingReferral.PatientVisit2.LeaveEndDate;
                        boPatientVisit.IsTransportationRequired = pendingReferral.PatientVisit2.IsTransportationRequired;
                        boPatientVisit.TransportProviderId = pendingReferral.PatientVisit2.TransportProviderId;
                        boPatientVisit.IsCancelled = pendingReferral.PatientVisit2.IsCancelled;
                        if (pendingReferral.PatientVisit2.Case != null)
                        {
                            if (pendingReferral.PatientVisit2.Case.IsDeleted.HasValue == false || (pendingReferral.PatientVisit2.Case.IsDeleted.HasValue == true && pendingReferral.PatientVisit2.Case.IsDeleted.Value == false))
                            {
                                BO.Case boCase = new BO.Case();
                                
                                boCase.ID = pendingReferral.PatientVisit2.Case.Id;
                                boCase.PatientId = pendingReferral.PatientVisit2.Case.PatientId;
                                boCase.CaseName = pendingReferral.PatientVisit2.Case.CaseName;
                                boCase.CaseTypeId = pendingReferral.PatientVisit2.Case.CaseTypeId;
                                boCase.LocationId = pendingReferral.PatientVisit2.Case.LocationId;
                                boCase.PatientEmpInfoId = pendingReferral.PatientVisit2.Case.PatientEmpInfoId;
                                boCase.CarrierCaseNo = pendingReferral.PatientVisit2.Case.CarrierCaseNo;
                                boCase.CaseStatusId = pendingReferral.PatientVisit2.Case.CaseStatusId;
                                boCase.AttorneyId = pendingReferral.PatientVisit2.Case.AttorneyId;

                                if (pendingReferral.PatientVisit2.Case.Patient2.IsDeleted.HasValue == false || (pendingReferral.PatientVisit2.Case.Patient2.IsDeleted.HasValue == true && pendingReferral.PatientVisit2.Case.Patient2.IsDeleted.Value == false))
                                 {
                                   BO.Patient2 boPatient = new BO.Patient2();

                                    boPatient.ID = pendingReferral.PatientVisit2.Case.Patient2.Id;
                                    boPatient.SSN = pendingReferral.PatientVisit2.Case.Patient2.SSN;
                                    boPatient.Weight = pendingReferral.PatientVisit2.Case.Patient2.Weight;
                                    boPatient.Height = pendingReferral.PatientVisit2.Case.Patient2.Height;
                                    boPatient.MaritalStatusId = pendingReferral.PatientVisit2.Case.Patient2.MaritalStatusId;
                                    boPatient.DateOfFirstTreatment = pendingReferral.PatientVisit2.Case.Patient2.DateOfFirstTreatment;

                                   if (pendingReferral.PatientVisit2.Case.Patient2.User.IsDeleted.HasValue == false || (pendingReferral.PatientVisit2.Case.Patient2.User.IsDeleted.HasValue == true && pendingReferral.PatientVisit2.Case.Patient2.User.IsDeleted.Value == false))
                                   {
                                    BO.User boUser = new BO.User();
                                    boUser.UserName = pendingReferral.PatientVisit2.Case.Patient2.User.UserName;
                                    boUser.ID = pendingReferral.PatientVisit2.Case.Patient2.User.id;
                                    boUser.FirstName = pendingReferral.PatientVisit2.Case.Patient2.User.FirstName;
                                    boUser.MiddleName = pendingReferral.PatientVisit2.Case.Patient2.User.MiddleName;
                                    boUser.LastName = pendingReferral.PatientVisit2.Case.Patient2.User.LastName;
                                    boUser.ImageLink = pendingReferral.PatientVisit2.Case.Patient2.User.ImageLink;
                                    boUser.UserType = (BO.GBEnums.UserType)pendingReferral.PatientVisit2.Case.Patient2.User.UserType;

                                    if (pendingReferral.PatientVisit2.Case.Patient2.User.Gender.HasValue == true)
                                        boUser.Gender = (BO.GBEnums.Gender)pendingReferral.PatientVisit2.Case.Patient2.User.Gender;

                                    boUser.CreateByUserID = pendingReferral.PatientVisit2.Case.Patient2.User.CreateByUserID;

                                    if (pendingReferral.PatientVisit2.Case.Patient2.User.C2FactAuthEmailEnabled.HasValue)
                                        boUser.C2FactAuthEmailEnabled = pendingReferral.PatientVisit2.Case.Patient2.User.C2FactAuthEmailEnabled.Value;
                                    if (pendingReferral.PatientVisit2.Case.Patient2.User.C2FactAuthSMSEnabled.HasValue)
                                        boUser.C2FactAuthSMSEnabled = pendingReferral.PatientVisit2.Case.Patient2.User.C2FactAuthSMSEnabled.Value;
                                    if (pendingReferral.PatientVisit2.Case.Patient2.User.DateOfBirth.HasValue)
                                        boUser.DateOfBirth = pendingReferral.PatientVisit2.Case.Patient2.User.DateOfBirth.Value;
                                    if (pendingReferral.PatientVisit2.Case.Patient2.User.DateOfBirth.HasValue)
                                        boUser.DateOfBirth = pendingReferral.PatientVisit2.Case.Patient2.User.DateOfBirth.Value;

                                    boPatient.User = boUser;
                                }

                                    boCase.Patient2 = boPatient;
                                }

                            

                                boPatientVisit.Case = boCase;
                                
                            }
                        }
                        

                       // boPatientVisit = cmp.Convert<BO.PatientVisit2, PatientVisit2>(pendingReferral.PatientVisit2);
                        pendingReferralBO.PatientVisit2 = boPatientVisit;
                    
                }
            }

            if (pendingReferral.Doctor != null)
            {
                if (pendingReferral.Doctor.IsDeleted.HasValue == false || (pendingReferral.Doctor.IsDeleted.HasValue == true && pendingReferral.Doctor.IsDeleted.Value == false))
                {
                    BO.Doctor boDoctor = new BO.Doctor();
                    using (DoctorRepository cmp = new DoctorRepository(_context))
                    {
                        boDoctor = cmp.Convert<BO.Doctor, Doctor>(pendingReferral.Doctor);
                        pendingReferralBO.Doctor = boDoctor;
                    }
                }
            }

            if (pendingReferral.Specialty != null)
            {
                if (pendingReferral.Specialty.IsDeleted.HasValue == false || (pendingReferral.Specialty.IsDeleted.HasValue == true && pendingReferral.Specialty.IsDeleted.Value == false))
                {
                    BO.Specialty boSpecialty = new BO.Specialty();
                    using (SpecialityRepository cmp = new SpecialityRepository(_context))
                    {
                        boSpecialty = cmp.Convert<BO.Specialty, Specialty>(pendingReferral.Specialty);
                        pendingReferralBO.Specialty = boSpecialty;
                    }
                }
            }

            if (pendingReferral.Room != null)
            {
                if (pendingReferral.Room.IsDeleted.HasValue == false || (pendingReferral.Room.IsDeleted.HasValue == true && pendingReferral.Room.IsDeleted.Value == false))
                {
                    BO.Room boRoom = new BO.Room();
                    using (RoomRepository cmp = new RoomRepository(_context))
                    {
                        boRoom = cmp.Convert<BO.Room, Room>(pendingReferral.Room);
                        pendingReferralBO.Room = boRoom;
                    }
                }
            }

            if (pendingReferral.RoomTest != null)
            {
                if (pendingReferral.RoomTest.IsDeleted.HasValue == false || (pendingReferral.RoomTest.IsDeleted.HasValue == true && pendingReferral.RoomTest.IsDeleted.Value == false))
                {
                    BO.RoomTest boRoomTest = new BO.RoomTest();
                    using (RoomTestRepository cmp = new RoomTestRepository(_context))
                    {
                        boRoomTest = cmp.Convert<BO.RoomTest, RoomTest>(pendingReferral.RoomTest);
                        pendingReferralBO.RoomTest = boRoomTest;
                    }
                }
            }

                                       
            if (pendingReferral.PendingReferralProcedureCodes != null)
            {
                List<BO.PendingReferralProcedureCode> boPendingReferralProcedureCode = new List<BO.PendingReferralProcedureCode>();
                
                foreach (var eachPendingReferralProcedureCodes in pendingReferral.PendingReferralProcedureCodes)
                {
                    if (eachPendingReferralProcedureCodes.IsDeleted.HasValue == false || (eachPendingReferralProcedureCodes.IsDeleted.HasValue == true && eachPendingReferralProcedureCodes.IsDeleted.Value == false))
                    {
                        BO.PendingReferralProcedureCode pendingReferralProcedureCode = new BO.PendingReferralProcedureCode();

                        pendingReferralProcedureCode.ID = eachPendingReferralProcedureCodes.Id;
                        pendingReferralProcedureCode.PendingReferralId = eachPendingReferralProcedureCodes.PendingReferralId;
                        pendingReferralProcedureCode.ProcedureCodeId = eachPendingReferralProcedureCodes.ProcedureCodeId;


                     
                        if (eachPendingReferralProcedureCodes.ProcedureCode != null)
                        {
                            if (eachPendingReferralProcedureCodes.ProcedureCode.IsDeleted.HasValue == false || (eachPendingReferralProcedureCodes.ProcedureCode.IsDeleted.HasValue == true && eachPendingReferralProcedureCodes.ProcedureCode.IsDeleted.Value == false))
                            {
                                BO.ProcedureCode boProcedureCode = new BO.ProcedureCode();

                                boProcedureCode.ID = eachPendingReferralProcedureCodes.ProcedureCode.Id;
                                boProcedureCode.ProcedureCodeText = eachPendingReferralProcedureCodes.ProcedureCode.ProcedureCodeText;
                                boProcedureCode.ProcedureCodeDesc = eachPendingReferralProcedureCodes.ProcedureCode.ProcedureCodeDesc;
                                boProcedureCode.Amount = eachPendingReferralProcedureCodes.ProcedureCode.Amount;
                                boProcedureCode.CompanyId = eachPendingReferralProcedureCodes.ProcedureCode.CompanyId;
                                boProcedureCode.SpecialityId = eachPendingReferralProcedureCodes.ProcedureCode.SpecialityId;
                                boProcedureCode.RoomId = eachPendingReferralProcedureCodes.ProcedureCode.RoomId;
                                boProcedureCode.RoomTestId = eachPendingReferralProcedureCodes.ProcedureCode.RoomTestId;

                                pendingReferralProcedureCode.ProcedureCode = boProcedureCode;
                            }
                        }


                        boPendingReferralProcedureCode.Add(pendingReferralProcedureCode);
                    }
                }

                pendingReferralBO.PendingReferralProcedureCodes = boPendingReferralProcedureCode;                
            }
            return (T)(object)pendingReferralBO;
        }
        #endregion

        #region Entity Conversion
        public T ConvertPendingReferralList<T, U>(U entity)
        {
            PendingReferral pendingReferral = entity as PendingReferral;

            if (pendingReferral == null)
                return default(T);

            List<BO.PendingReferralList> PendingReferralListBO = new List<BO.PendingReferralList>();

            if (pendingReferral.PendingReferralProcedureCodes != null)
            {
                foreach (var eachPendingReferralProcedureCodes in pendingReferral.PendingReferralProcedureCodes)
                {
                    if (eachPendingReferralProcedureCodes.IsDeleted.HasValue == false || (eachPendingReferralProcedureCodes.IsDeleted.HasValue == true && eachPendingReferralProcedureCodes.IsDeleted.Value == false))
                    {
                        BO.PendingReferralList PendingReferralList = new BO.PendingReferralList();

                        PendingReferralList.ID = pendingReferral.Id;
                        PendingReferralList.PatientVisitId = pendingReferral.PatientVisitId;
                        PendingReferralList.FromCompanyId = pendingReferral.FromCompanyId;
                        PendingReferralList.FromLocationId = pendingReferral.FromLocationId;
                        PendingReferralList.FromDoctorId = pendingReferral.FromDoctorId;
                        PendingReferralList.ForSpecialtyId = pendingReferral.ForSpecialtyId;
                        PendingReferralList.ForRoomId = pendingReferral.ForRoomId;
                        PendingReferralList.ForRoomTestId = pendingReferral.ForRoomTestId;
                        PendingReferralList.IsReferralCreated = pendingReferral.IsReferralCreated;
                        PendingReferralList.DismissedBy = pendingReferral.DismissedBy;

                        if (pendingReferral.Doctor != null)
                        {
                            if (pendingReferral.Doctor.IsDeleted.HasValue == false || (pendingReferral.Doctor.IsDeleted.HasValue == true && pendingReferral.Doctor.IsDeleted.Value == false))
                            {                              
                                PendingReferralList.DoctorFirstName = pendingReferral.Doctor.User.FirstName;
                                PendingReferralList.DoctorLastName = pendingReferral.Doctor.User.LastName;
                              
                            }
                        }

                        if (pendingReferral.Specialty != null)
                        {
                            if (pendingReferral.Specialty.IsDeleted.HasValue == false || (pendingReferral.Specialty.IsDeleted.HasValue == true && pendingReferral.Specialty.IsDeleted.Value == false))
                            {
                                BO.Specialty boSpecialty = new BO.Specialty();
                                using (SpecialityRepository cmp = new SpecialityRepository(_context))
                                {
                                    boSpecialty = cmp.Convert<BO.Specialty, Specialty>(pendingReferral.Specialty);
                                    PendingReferralList.Specialty = boSpecialty;
                                }
                            }
                        }

                        if (pendingReferral.Room != null)
                        {
                            if (pendingReferral.Room.IsDeleted.HasValue == false || (pendingReferral.Room.IsDeleted.HasValue == true && pendingReferral.Room.IsDeleted.Value == false))
                            {
                                BO.Room boRoom = new BO.Room();
                                using (RoomRepository cmp = new RoomRepository(_context))
                                {
                                    boRoom = cmp.Convert<BO.Room, Room>(pendingReferral.Room);
                                    PendingReferralList.Room = boRoom;
                                }
                            }
                        }

                        if (pendingReferral.RoomTest != null)
                        {
                            if (pendingReferral.RoomTest.IsDeleted.HasValue == false || (pendingReferral.RoomTest.IsDeleted.HasValue == true && pendingReferral.RoomTest.IsDeleted.Value == false))
                            {
                                BO.RoomTest boRoomTest = new BO.RoomTest();
                                using (RoomTestRepository cmp = new RoomTestRepository(_context))
                                {
                                    boRoomTest = cmp.Convert<BO.RoomTest, RoomTest>(pendingReferral.RoomTest);
                                    PendingReferralList.RoomTest = boRoomTest;
                                }
                            }
                        }

                        PendingReferralList.CaseId = pendingReferral.PatientVisit2.Case.Id;
                        PendingReferralList.PatientId = pendingReferral.PatientVisit2.PatientId.HasValue == true ? pendingReferral.PatientVisit2.PatientId.Value : 0;
                        PendingReferralList.UserId = pendingReferral.PatientVisit2.Case.Patient2.User.id;
                        PendingReferralList.PatientFirstName = pendingReferral.PatientVisit2.Case.Patient2.User.FirstName;
                        PendingReferralList.PatientLastName = pendingReferral.PatientVisit2.Case.Patient2.User.LastName;

                        BO.PendingReferralProcedureCode pendingReferralProcedureCode = new BO.PendingReferralProcedureCode();

                        pendingReferralProcedureCode.ID = eachPendingReferralProcedureCodes.Id;
                        pendingReferralProcedureCode.PendingReferralId = eachPendingReferralProcedureCodes.PendingReferralId;
                        pendingReferralProcedureCode.ProcedureCodeId = eachPendingReferralProcedureCodes.ProcedureCodeId;

                        if (eachPendingReferralProcedureCodes.ProcedureCode != null)
                        {
                            if (eachPendingReferralProcedureCodes.ProcedureCode.IsDeleted.HasValue == false || (eachPendingReferralProcedureCodes.ProcedureCode.IsDeleted.HasValue == true && eachPendingReferralProcedureCodes.ProcedureCode.IsDeleted.Value == false))
                            {
                                BO.ProcedureCode boProcedureCode = new BO.ProcedureCode();

                                boProcedureCode.ID = eachPendingReferralProcedureCodes.ProcedureCode.Id;
                                boProcedureCode.ProcedureCodeText = eachPendingReferralProcedureCodes.ProcedureCode.ProcedureCodeText;
                                boProcedureCode.ProcedureCodeDesc = eachPendingReferralProcedureCodes.ProcedureCode.ProcedureCodeDesc;
                                boProcedureCode.Amount = eachPendingReferralProcedureCodes.ProcedureCode.Amount;
                                boProcedureCode.CompanyId = eachPendingReferralProcedureCodes.ProcedureCode.CompanyId;
                                boProcedureCode.SpecialityId = eachPendingReferralProcedureCodes.ProcedureCode.SpecialityId;
                                boProcedureCode.RoomId = eachPendingReferralProcedureCodes.ProcedureCode.RoomId;
                                boProcedureCode.RoomTestId = eachPendingReferralProcedureCodes.ProcedureCode.RoomTestId;

                                pendingReferralProcedureCode.ProcedureCode = boProcedureCode;
                            }
                        }

                        PendingReferralList.PendingReferralProcedureCode = pendingReferralProcedureCode;

                        PendingReferralListBO.Add(PendingReferralList);
                    }                    
                }                
            }

            if (pendingReferral.PendingReferralProcedureCodes == null || (pendingReferral.PendingReferralProcedureCodes != null && pendingReferral.PendingReferralProcedureCodes.Count <= 0))
            {
                BO.PendingReferralList PendingReferralList = new BO.PendingReferralList();

                PendingReferralList.ID = pendingReferral.Id;
                PendingReferralList.PatientVisitId = pendingReferral.PatientVisitId;
                PendingReferralList.FromCompanyId = pendingReferral.FromCompanyId;
                PendingReferralList.FromLocationId = pendingReferral.FromLocationId;
                PendingReferralList.FromDoctorId = pendingReferral.FromDoctorId;
                PendingReferralList.ForSpecialtyId = pendingReferral.ForSpecialtyId;
                PendingReferralList.ForRoomId = pendingReferral.ForRoomId;
                PendingReferralList.ForRoomTestId = pendingReferral.ForRoomTestId;
                PendingReferralList.IsReferralCreated = pendingReferral.IsReferralCreated;
                PendingReferralList.DismissedBy = pendingReferral.DismissedBy;

                if (pendingReferral.Doctor != null)
                {
                    if (pendingReferral.Doctor.IsDeleted.HasValue == false || (pendingReferral.Doctor.IsDeleted.HasValue == true && pendingReferral.Doctor.IsDeleted.Value == false))
                    {
                        PendingReferralList.DoctorFirstName = pendingReferral.Doctor.User.FirstName;
                        PendingReferralList.DoctorLastName = pendingReferral.Doctor.User.LastName;

                    }
                }

                if (pendingReferral.Specialty != null)
                {
                    if (pendingReferral.Specialty.IsDeleted.HasValue == false || (pendingReferral.Specialty.IsDeleted.HasValue == true && pendingReferral.Specialty.IsDeleted.Value == false))
                    {
                        BO.Specialty boSpecialty = new BO.Specialty();
                        using (SpecialityRepository cmp = new SpecialityRepository(_context))
                        {
                            boSpecialty = cmp.Convert<BO.Specialty, Specialty>(pendingReferral.Specialty);
                            PendingReferralList.Specialty = boSpecialty;
                        }
                    }
                }

                if (pendingReferral.Room != null)
                {
                    if (pendingReferral.Room.IsDeleted.HasValue == false || (pendingReferral.Room.IsDeleted.HasValue == true && pendingReferral.Room.IsDeleted.Value == false))
                    {
                        BO.Room boRoom = new BO.Room();
                        using (RoomRepository cmp = new RoomRepository(_context))
                        {
                            boRoom = cmp.Convert<BO.Room, Room>(pendingReferral.Room);
                            PendingReferralList.Room = boRoom;
                        }
                    }
                }

                if (pendingReferral.RoomTest != null)
                {
                    if (pendingReferral.RoomTest.IsDeleted.HasValue == false || (pendingReferral.RoomTest.IsDeleted.HasValue == true && pendingReferral.RoomTest.IsDeleted.Value == false))
                    {
                        BO.RoomTest boRoomTest = new BO.RoomTest();
                        using (RoomTestRepository cmp = new RoomTestRepository(_context))
                        {
                            boRoomTest = cmp.Convert<BO.RoomTest, RoomTest>(pendingReferral.RoomTest);
                            PendingReferralList.RoomTest = boRoomTest;
                        }
                    }
                }

                PendingReferralList.CaseId = pendingReferral.PatientVisit2.Case.Id;
                PendingReferralList.PatientId = pendingReferral.PatientVisit2.PatientId.HasValue == true ? pendingReferral.PatientVisit2.PatientId.Value : 0;
                PendingReferralList.UserId = pendingReferral.PatientVisit2.Case.Patient2.User.id;
                PendingReferralList.PatientFirstName = pendingReferral.PatientVisit2.Case.Patient2.User.FirstName;
                PendingReferralList.PatientLastName = pendingReferral.PatientVisit2.Case.Patient2.User.LastName;

                PendingReferralListBO.Add(PendingReferralList);
            }


            return (T)(object)PendingReferralListBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.PendingReferral referralBO = (BO.PendingReferral)(object)entity;
            var result = referralBO.Validate(referralBO);
            return result;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.PendingReferrals.Include("PatientVisit2")                                              
                                              .Include("PatientVisit2.Case.Patient2.User")
                                              .Include("Doctor")
                                              .Include("Doctor.User")
                                              .Include("Specialty")                                             
                                              .Include("RoomTest")
                                              .Include("PendingReferralProcedureCodes")
                                              .Include("PendingReferralProcedureCodes.ProcedureCode")
                                        .Where(p => p.Id == id
                                         && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                        .FirstOrDefault<PendingReferral>();

            BO.PendingReferral acc_ = Convert<BO.PendingReferral, PendingReferral>(acc);
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }
        #endregion

        public override object GetByCompanyId(int CompanyId)
        {
            var acc = _context.PendingReferrals.Include("PatientVisit2")
                                              .Include("PatientVisit2.Case.Patient2.User")
                                              .Include("Doctor")
                                              .Include("Doctor.User")
                                              .Include("Specialty")
                                              .Include("RoomTest")
                                              .Include("PendingReferralProcedureCodes")
                                              .Include("PendingReferralProcedureCodes.ProcedureCode")
                                       .Where(p => p.FromCompanyId == CompanyId
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                       .ToList<PendingReferral>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PendingReferral> lstPendingReferral = new List<BO.PendingReferral>();
                foreach (PendingReferral item in acc)
                {
                    lstPendingReferral.Add(Convert<BO.PendingReferral,PendingReferral>(item));
                }
                return lstPendingReferral;
            }
        }

        public override object GetPendingReferralByCompanyId(int CompanyId)
        {
            var acc = _context.PendingReferrals.Include("PatientVisit2")
                                              .Include("PatientVisit2.Case.Patient2.User")
                                              .Include("Doctor")
                                              .Include("Doctor.User")
                                              .Include("Specialty")
                                              .Include("RoomTest")
                                              .Include("PendingReferralProcedureCodes")
                                              .Include("PendingReferralProcedureCodes.ProcedureCode")
                                       .Where(p => p.FromCompanyId == CompanyId && p.IsReferralCreated == false
                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                       .ToList<PendingReferral>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PendingReferralList> PendingReferralListBO = new List<BO.PendingReferralList>();
                foreach (PendingReferral item in acc)
                {
                    PendingReferralListBO.AddRange(ConvertPendingReferralList<List<BO.PendingReferralList>, PendingReferral>(item));
                }
                return PendingReferralListBO;
            }
        }

        public override object GetByDoctorId(int DoctorId)
        {
            var acc = _context.PendingReferrals.Include("PatientVisit2")
                                              .Include("PatientVisit2.Case.Patient2.User")
                                              .Include("Doctor")
                                              .Include("Doctor.User")
                                              .Include("Specialty")
                                              .Include("RoomTest")
                                              .Include("PendingReferralProcedureCodes")
                                              .Include("PendingReferralProcedureCodes.ProcedureCode")
                                       .Where(p => p.FromDoctorId == DoctorId
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                       .ToList<PendingReferral>();


            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PendingReferral> lstPendingReferral = new List<BO.PendingReferral>();
                foreach (PendingReferral item in acc)
                {
                    lstPendingReferral.Add(Convert<BO.PendingReferral, PendingReferral>(item));
                }
                return lstPendingReferral;
            }
        }

        public override object GetBySpecialityId(int specialityId)
        {
            var acc = _context.PendingReferrals.Include("PatientVisit2")
                                              .Include("PatientVisit2.Case.Patient2.User")
                                              .Include("Doctor")
                                              .Include("Doctor.User")
                                              .Include("Specialty")
                                              .Include("RoomTest")
                                              .Include("PendingReferralProcedureCodes")
                                              .Include("PendingReferralProcedureCodes.ProcedureCode")
                                       .Where(p => p.ForSpecialtyId == specialityId
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                       .ToList<PendingReferral>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PendingReferral> lstPendingReferral = new List<BO.PendingReferral>();
                foreach (PendingReferral item in acc)
                {
                    lstPendingReferral.Add(Convert<BO.PendingReferral, PendingReferral>(item));
                }
                return lstPendingReferral;
            }
        }

        public override object GetByRoomId(int RoomId)
        {
            var acc = _context.PendingReferrals.Include("PatientVisit2")
                                              .Include("PatientVisit2.Case.Patient2.User")
                                              .Include("Doctor")
                                              .Include("Doctor.User")
                                              .Include("Specialty")
                                              .Include("RoomTest")
                                              .Include("PendingReferralProcedureCodes")
                                              .Include("PendingReferralProcedureCodes.ProcedureCode")
                                       .Where(p => p.ForRoomId == RoomId
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                       .ToList<PendingReferral>();

            
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            {
                List<BO.PendingReferral> lstPendingReferral = new List<BO.PendingReferral>();
                foreach (PendingReferral item in acc)
                {
                    lstPendingReferral.Add(Convert<BO.PendingReferral, PendingReferral>(item));
                }
                return lstPendingReferral;
            }
        }

        public override object GetByPatientVisitId(int patientVisitId)
        {
            var acc = _context.PendingReferrals.Include("PatientVisit2")
                                              .Include("PatientVisit2.Case.Patient2.User")
                                              .Include("Doctor")
                                              .Include("Doctor.User")
                                              .Include("Specialty")
                                              .Include("RoomTest")
                                              .Include("PendingReferralProcedureCodes")
                                              .Include("PendingReferralProcedureCodes.ProcedureCode")
                                       .Where(p => p.PatientVisitId == patientVisitId
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                       .ToList<PendingReferral>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            {
                List<BO.PendingReferral> lstPendingReferral = new List<BO.PendingReferral>();
                foreach (PendingReferral item in acc)
                {
                    lstPendingReferral.Add(Convert<BO.PendingReferral, PendingReferral>(item));
                }
                return lstPendingReferral;
            }
        }

        public override object DismissPendingReferral(int PendingReferralId, int userId)
        {
            PendingReferral pendingReferral = _context.PendingReferrals.Include("PatientVisit2")
                                              .Include("PatientVisit2.Case.Patient2.User")
                                              .Include("Doctor")
                                              .Include("Doctor.User")
                                              .Include("Specialty")
                                              .Include("RoomTest")
                                              .Include("PendingReferralProcedureCodes")
                                              .Include("PendingReferralProcedureCodes.ProcedureCode")
                                               .Where(p => p.Id == PendingReferralId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .FirstOrDefault<PendingReferral>();

            if (pendingReferral == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                pendingReferral.DismissedBy = userId;
            }
        
            _context.SaveChanges();

            BO.PendingReferral acc_ = Convert<BO.PendingReferral, PendingReferral>(pendingReferral);
            
            return (object)acc_;
        }

        #region save
        //public override object Save<T>(T entity)
        //{
        //    BO.PendingReferral pendingReferralBO = (BO.PendingReferral)(object)entity;
        //    PendingReferral pendingReferralDB = new PendingReferral();
        //    List<BO.PendingReferralProcedureCode> PendingReferralProcedureCodeBOList = pendingReferralBO.PendingReferralProcedureCodes;

        //    if (pendingReferralBO != null)
        //    {              
        //        pendingReferralDB = _context.PendingReferrals.Where(p => p.Id == pendingReferralBO.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
        //        bool add_pendingReferral = false;

        //        if (pendingReferralDB == null && pendingReferralBO.ID > 0)
        //        {
        //            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Pending Referral data.", ErrorLevel = ErrorLevel.Error };
        //        }
        //        else if (pendingReferralDB == null && pendingReferralBO.ID <= 0)
        //        {
        //            pendingReferralDB = _context.PendingReferrals.Where(p => p.FromCompanyId == pendingReferralBO.FromCompanyId
        //                                && p.PatientVisitId == pendingReferralBO.PatientVisitId
        //                                && p.FromDoctorId == pendingReferralBO.FromDoctorId
        //                                && p.FromLocationId == pendingReferralBO.FromLocationId
        //                                && p.ForSpecialtyId == pendingReferralBO.ForSpecialtyId
        //                                && p.ForRoomTestId == pendingReferralBO.ForRoomTestId
        //                                && p.ForRoomId == pendingReferralBO.ForRoomId
        //                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
        //            if (pendingReferralDB != null)
        //            {
        //                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Pending Referral data for procedure codes already exists.", ErrorLevel = ErrorLevel.Error };
        //            }
        //            else
        //            {
        //                pendingReferralDB = new PendingReferral();
        //                add_pendingReferral = true;
        //            }
        //        }

        //        pendingReferralDB.PatientVisitId = pendingReferralBO.PatientVisitId;
        //        pendingReferralDB.FromCompanyId = pendingReferralBO.FromCompanyId;
        //        pendingReferralDB.FromLocationId = pendingReferralBO.FromLocationId;
        //        pendingReferralDB.FromDoctorId = pendingReferralBO.FromDoctorId;
        //        pendingReferralDB.ForSpecialtyId = pendingReferralBO.ForSpecialtyId;
        //        pendingReferralDB.ForRoomId = pendingReferralBO.ForRoomId;
        //        pendingReferralDB.ForRoomTestId = pendingReferralBO.ForRoomTestId;
        //        pendingReferralDB.IsReferralCreated = pendingReferralBO.IsReferralCreated;
        //        pendingReferralDB.DismissedBy = pendingReferralBO.DismissedBy;


        //        if (add_pendingReferral == true)
        //        {
        //            pendingReferralDB = _context.PendingReferrals.Add(pendingReferralDB);
        //        }
        //        _context.SaveChanges();

        //        #region PendingReferralProcedureCode
        //        if (PendingReferralProcedureCodeBOList == null || (PendingReferralProcedureCodeBOList != null && PendingReferralProcedureCodeBOList.Count <= 0))
        //        {
        //            //return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Patient Visit Procedure Code.", ErrorLevel = ErrorLevel.Error };
        //        }
        //        else
        //        {
        //            int PendingReferralId = pendingReferralDB.Id;
        //            List<int> NewProcedureCodeIds = PendingReferralProcedureCodeBOList.Select(p => p.ProcedureCodeId).ToList();

        //            List<PendingReferralProcedureCode> ReomveProcedureCodeDB = new List<PendingReferralProcedureCode>();
        //            ReomveProcedureCodeDB = _context.PendingReferralProcedureCodes.Where(p => p.PendingReferralId == PendingReferralId
        //                                                                            && NewProcedureCodeIds.Contains(p.ProcedureCodeId) == false
        //                                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
        //                                                                       .ToList();

        //            ReomveProcedureCodeDB.ForEach(p => { p.IsDeleted = true; p.UpdateByUserID = 0; p.UpdateDate = DateTime.UtcNow; });

        //            _context.SaveChanges();

        //            foreach (BO.PendingReferralProcedureCode eachPendingReferralProcedureCode in PendingReferralProcedureCodeBOList)
        //            {
        //                PendingReferralProcedureCode AddProcedureCodeDB = new PendingReferralProcedureCode();
        //                AddProcedureCodeDB = _context.PendingReferralProcedureCodes.Where(p => p.PendingReferralId == PendingReferralId
        //                                                                            && p.ProcedureCodeId == eachPendingReferralProcedureCode.ProcedureCodeId
        //                                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
        //                                                                       .FirstOrDefault();

        //                if (AddProcedureCodeDB == null)
        //                {
        //                    AddProcedureCodeDB = new PendingReferralProcedureCode();

        //                    AddProcedureCodeDB.PendingReferralId = PendingReferralId;
        //                    AddProcedureCodeDB.ProcedureCodeId = eachPendingReferralProcedureCode.ProcedureCodeId;

        //                    _context.PendingReferralProcedureCodes.Add(AddProcedureCodeDB);
        //                }
        //            }

        //            _context.SaveChanges();
        //        }
        //        #endregion

        //    }
        //    else
        //    {
        //        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid details.", ErrorLevel = ErrorLevel.Error };
        //    }
        //    _context.SaveChanges();

        //    pendingReferralDB = _context.PendingReferrals.Include("PatientVisit2")
        //                                      .Include("PatientVisit2.Case.Patient2.User")
        //                                      .Include("Doctor")
        //                                      .Include("Doctor.User")
        //                                      .Include("Specialty")
        //                                      .Include("RoomTest")
        //                                      .Include("PendingReferralProcedureCodes")
        //                                      .Include("PendingReferralProcedureCodes.ProcedureCode")
        //                                  .Where(p => p.Id == pendingReferralDB.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
        //                                                                      .FirstOrDefault<PendingReferral>();



        //    var res = Convert<BO.PendingReferral, PendingReferral>(pendingReferralDB);
        //    return (object)res;
        //}
        #endregion


        #region save
        public override object Save<T>(List<T> entities)
        {
            List<BO.PendingReferral> lstPendingReferralBO = (List<BO.PendingReferral>)(object)entities;            

            List<PendingReferral> lstPendingReferralDB = new  List<PendingReferral>();
            List<BO.PendingReferral> boListPendingReferral = new List<BO.PendingReferral>();

            int patientVisitId = 0;
            if (lstPendingReferralBO != null)
            {
                using (var dbContextTransaction = _context.Database.BeginTransaction())
                {
                    foreach (var item in lstPendingReferralBO)
                    {
                        if (item.IsReferralCreated == false)
                        {
                            patientVisitId = item.PatientVisitId;

                            PendingReferral pendingReferralDB = new PendingReferral();
                            pendingReferralDB = _context.PendingReferrals
                                                        .Where(p => p.Id == item.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                            bool add_pendingReferral = false;

                            if (pendingReferralDB == null && item.ID > 0)
                            {
                                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Pending Referral data.", ErrorLevel = ErrorLevel.Error };
                            }
                            else if (pendingReferralDB == null && item.ID <= 0)
                            {
                                pendingReferralDB = new PendingReferral();
                                add_pendingReferral = true;

                                //pendingReferralDB = _context.PendingReferrals.Where(p => p.FromCompanyId == item.FromCompanyId
                                //                    && p.PatientVisitId == item.PatientVisitId
                                //                    && p.FromDoctorId == item.FromDoctorId
                                //                    && p.FromLocationId == item.FromLocationId
                                //                    && p.ForSpecialtyId == item.ForSpecialtyId
                                //                    && p.ForRoomTestId == item.ForRoomTestId
                                //                    && p.ForRoomId == item.ForRoomId
                                //                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                                //if (pendingReferralDB != null)
                                //{
                                //    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Pending Referral data for procedure codes already exists.", ErrorLevel = ErrorLevel.Error };
                                //}
                                //else
                                //{
                                //    pendingReferralDB = new PendingReferral();
                                //    add_pendingReferral = true;
                                //}
                            }

                            pendingReferralDB.PatientVisitId = item.PatientVisitId;
                            pendingReferralDB.FromCompanyId = item.FromCompanyId;
                            pendingReferralDB.FromLocationId = item.FromLocationId;
                            pendingReferralDB.FromDoctorId = item.FromDoctorId;
                            pendingReferralDB.ForSpecialtyId = item.ForSpecialtyId;
                            pendingReferralDB.ForRoomId = item.ForRoomId;
                            pendingReferralDB.ForRoomTestId = item.ForRoomTestId;
                            pendingReferralDB.IsReferralCreated = item.IsReferralCreated;
                            pendingReferralDB.DismissedBy = item.DismissedBy;

                            if (add_pendingReferral == true)
                            {
                                pendingReferralDB = _context.PendingReferrals.Add(pendingReferralDB);
                            }
                            _context.SaveChanges();

                            lstPendingReferralDB.Add(pendingReferralDB);

                            #region PendingReferralProcedureCode
                            List<BO.PendingReferralProcedureCode> PendingReferralProcedureCodeBOList = item.PendingReferralProcedureCodes;
                            if (PendingReferralProcedureCodeBOList == null || (PendingReferralProcedureCodeBOList != null && PendingReferralProcedureCodeBOList.Count <= 0))
                            {
                                //return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Patient Visit Procedure Code.", ErrorLevel = ErrorLevel.Error };
                            }
                            else
                            {
                                int PendingReferralId = pendingReferralDB.Id;
                                List<int> NewProcedureCodeIds = PendingReferralProcedureCodeBOList.Select(p => p.ProcedureCodeId).ToList();

                                List<PendingReferralProcedureCode> ReomveProcedureCodeDB = new List<PendingReferralProcedureCode>();
                                ReomveProcedureCodeDB = _context.PendingReferralProcedureCodes.Where(p => p.PendingReferralId == PendingReferralId
                                                                                                && NewProcedureCodeIds.Contains(p.ProcedureCodeId) == false
                                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                           .ToList();

                                ReomveProcedureCodeDB.ForEach(p => { p.IsDeleted = true; p.UpdateByUserID = 0; p.UpdateDate = DateTime.UtcNow; });

                                _context.SaveChanges();

                                foreach (BO.PendingReferralProcedureCode eachPendingReferralProcedureCode in PendingReferralProcedureCodeBOList)
                                {
                                    PendingReferralProcedureCode AddProcedureCodeDB = new PendingReferralProcedureCode();
                                    AddProcedureCodeDB = _context.PendingReferralProcedureCodes.Where(p => p.PendingReferralId == PendingReferralId
                                                                                                && p.ProcedureCodeId == eachPendingReferralProcedureCode.ProcedureCodeId
                                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                           .FirstOrDefault();

                                    if (AddProcedureCodeDB == null)
                                    {
                                        AddProcedureCodeDB = new PendingReferralProcedureCode();

                                        AddProcedureCodeDB.PendingReferralId = PendingReferralId;
                                        AddProcedureCodeDB.ProcedureCodeId = eachPendingReferralProcedureCode.ProcedureCodeId;

                                        _context.PendingReferralProcedureCodes.Add(AddProcedureCodeDB);
                                    }
                                }


                            }
                            #endregion

                            _context.SaveChanges();
                        }                        
                    }

                    dbContextTransaction.Commit();
                }                    
            }
            else
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid details.", ErrorLevel = ErrorLevel.Error };
            }

            var acc = _context.PendingReferrals.Include("PatientVisit2")
                                              .Include("PatientVisit2.Case.Patient2.User")
                                              .Include("Doctor")
                                              .Include("Doctor.User")
                                              .Include("Specialty")
                                              .Include("RoomTest")
                                              .Include("PendingReferralProcedureCodes")
                                              .Include("PendingReferralProcedureCodes.ProcedureCode")
                                       .Where(p => p.PatientVisitId == patientVisitId
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                       .ToList<PendingReferral>();

            List<BO.PendingReferral> lstPendingReferral = new List<BO.PendingReferral>();
            foreach (PendingReferral item in acc)
            {
                lstPendingReferral.Add(Convert<BO.PendingReferral, PendingReferral>(item));
            }

            return (object)lstPendingReferral;            
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

}
