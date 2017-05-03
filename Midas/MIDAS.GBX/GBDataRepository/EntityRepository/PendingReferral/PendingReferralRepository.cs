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

            if (pendingReferral.PatientVisit2 != null)
            {
                if (pendingReferral.PatientVisit2.IsDeleted.HasValue == false || (pendingReferral.PatientVisit2.IsDeleted.HasValue == true && pendingReferral.PatientVisit2.IsDeleted.Value == false))
                {
                    BO.PatientVisit2 boPatientVisit= new BO.PatientVisit2();
                    using (PatientVisit2Repository cmp = new PatientVisit2Repository(_context))
                    {
                        boPatientVisit = cmp.Convert<BO.PatientVisit2, PatientVisit2>(pendingReferral.PatientVisit2);
                        pendingReferralBO.PatientVisit2 = boPatientVisit;
                    }
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
                                               .Include("PatientVisit2.Case")
                                               .Include("Doctor")
                                               .Include("Specialty")
                                               .Include("Room")
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
                                              .Include("PatientVisit2.Case")
                                              .Include("Doctor")
                                              .Include("Specialty")
                                              .Include("Room")
                                              .Include("RoomTest")
                                              .Include("PendingReferralProcedureCodes")
                                              .Include("PendingReferralProcedureCodes.ProcedureCode")
                                       .Where(p => p.FromCompanyId == CompanyId
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                       .FirstOrDefault<PendingReferral>();

            BO.PendingReferral acc_ = Convert<BO.PendingReferral, PendingReferral>(acc);
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }

        public override object GetByDoctorId(int DoctorId)
        {
            var acc = _context.PendingReferrals.Include("PatientVisit2")
                                              .Include("PatientVisit2.Case")
                                              .Include("Doctor")
                                              .Include("Specialty")
                                              .Include("Room")
                                              .Include("RoomTest")
                                              .Include("PendingReferralProcedureCodes")
                                              .Include("PendingReferralProcedureCodes.ProcedureCode")
                                       .Where(p => p.FromDoctorId == DoctorId
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                       .FirstOrDefault<PendingReferral>();

            BO.PendingReferral acc_ = Convert<BO.PendingReferral, PendingReferral>(acc);
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }

        public override object GetBySpecialityId(int specialityId)
        {
            var acc = _context.PendingReferrals.Include("PatientVisit2")
                                              .Include("PatientVisit2.Case")
                                              .Include("Doctor")
                                              .Include("Specialty")
                                              .Include("Room")
                                              .Include("RoomTest")
                                              .Include("PendingReferralProcedureCodes")
                                              .Include("PendingReferralProcedureCodes.ProcedureCode")
                                       .Where(p => p.ForSpecialtyId == specialityId
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                       .FirstOrDefault<PendingReferral>();

            BO.PendingReferral acc_ = Convert<BO.PendingReferral, PendingReferral>(acc);
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }

        public override object GetByRoomId(int RoomId)
        {
            var acc = _context.PendingReferrals.Include("PatientVisit2")
                                              .Include("PatientVisit2.Case")
                                              .Include("Doctor")
                                              .Include("Specialty")
                                              .Include("Room")
                                              .Include("RoomTest")
                                              .Include("PendingReferralProcedureCodes")
                                              .Include("PendingReferralProcedureCodes.ProcedureCode")
                                       .Where(p => p.ForRoomId == RoomId
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                       .FirstOrDefault<PendingReferral>();

            BO.PendingReferral acc_ = Convert<BO.PendingReferral, PendingReferral>(acc);
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }

        public override object GetByPatientVisitId(int patientVisitId)
        {
            var acc = _context.PendingReferrals.Include("PatientVisit2")
                                              .Include("PatientVisit2.Case")
                                              .Include("Doctor")
                                              .Include("Specialty")
                                              .Include("Room")
                                              .Include("RoomTest")
                                              .Include("PendingReferralProcedureCodes")
                                              .Include("PendingReferralProcedureCodes.ProcedureCode")
                                       .Where(p => p.PatientVisitId == patientVisitId
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                       .FirstOrDefault<PendingReferral>();

            BO.PendingReferral acc_ = Convert<BO.PendingReferral, PendingReferral>(acc);
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }


        #region save
        public override object Save<T>(T entity)
        {
            BO.PendingReferral pendingReferralBO = (BO.PendingReferral)(object)entity;
            PendingReferral pendingReferralDB = new PendingReferral();

            if (pendingReferralBO != null)
            {              
                pendingReferralDB = _context.PendingReferrals.Where(p => p.Id == pendingReferralBO.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
                bool add_pendingReferral = false;

                if (pendingReferralDB == null && pendingReferralBO.ID > 0)
                {
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Pending Referral data.", ErrorLevel = ErrorLevel.Error };
                }
                else if (pendingReferralDB == null && pendingReferralBO.ID <= 0)
                {
                    pendingReferralDB = new PendingReferral();
                    add_pendingReferral = true;
                }


                pendingReferralDB.PatientVisitId = pendingReferralBO.PatientVisitId;
                pendingReferralDB.FromCompanyId = pendingReferralBO.FromCompanyId;
                pendingReferralDB.FromLocationId = pendingReferralBO.FromLocationId;
                pendingReferralDB.FromDoctorId = pendingReferralBO.FromDoctorId;
                pendingReferralDB.ForSpecialtyId = pendingReferralBO.ForSpecialtyId;
                pendingReferralDB.ForRoomId = pendingReferralBO.ForRoomId;
                pendingReferralDB.ForRoomTestId = pendingReferralBO.ForRoomTestId;
                pendingReferralDB.IsReferralCreated = pendingReferralBO.IsReferralCreated;

               
                if (add_pendingReferral == true)
                {
                    pendingReferralDB = _context.PendingReferrals.Add(pendingReferralDB);
                }
                _context.SaveChanges();

            }
            else
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid details.", ErrorLevel = ErrorLevel.Error };
            }
            _context.SaveChanges();

            ////METHOD TO GENERATE REFFERAL DOCUMENT AND SAVE IN MIDASDOCUMENTS/CASEDOCUMENTS TABLE
          //  this.GenerateReferralDocument(pendingReferralDB.Id);

            pendingReferralDB = _context.PendingReferrals.Include("PatientVisit2")
                                              .Include("PatientVisit2.Case")
                                              .Include("Doctor")
                                              .Include("Specialty")
                                              .Include("Room")
                                              .Include("RoomTest")
                                              .Include("PendingReferralProcedureCodes")
                                              .Include("PendingReferralProcedureCodes.ProcedureCode")
                                          .Where(p => p.Id == pendingReferralDB.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                              .FirstOrDefault<PendingReferral>();



            var res = Convert<BO.PendingReferral, PendingReferral>(pendingReferralDB);
            return (object)res;
        }
        #endregion


        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

}
