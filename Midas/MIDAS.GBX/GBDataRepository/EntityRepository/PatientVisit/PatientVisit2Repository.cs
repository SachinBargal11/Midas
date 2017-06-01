using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;
using Twilio;
using Twilio.Types;
using Twilio.Rest.Api.V2010.Account;
using System.Configuration;
using MIDAS.GBX.DataRepository.EntityRepository.Common;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class PatientVisit2Repository : BaseEntityRepo, IDisposable
    {
        private DbSet<PatientVisit2> _dbPatientVisit2;
        private Dictionary<string, string> dictionary = new Dictionary<string, string>();

        public PatientVisit2Repository(MIDASGBXEntities context) : base(context)
        {
            _dbPatientVisit2 = context.Set<PatientVisit2>();
            context.Configuration.ProxyCreationEnabled = false;
            dictionary.Add("rageesh@hotmail.com", "+14252602856");
            dictionary.Add("slaxman@greenyourbills.com", "+19144004328");
            dictionary.Add("vgaonkar@greenyourbills.com", "+19147879623");
       }

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.PatientVisit2 patientVisit2 = (BO.PatientVisit2)(object)entity;
            var result = patientVisit2.Validate(patientVisit2);
            return result;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            if (entity is PatientVisit2)
            {
                PatientVisit2 patientVisit2 = entity as PatientVisit2;

                if (patientVisit2 == null)
                    return default(T);

                BO.PatientVisit2 patientVisit2BO = new BO.PatientVisit2();
                patientVisit2BO.ID = patientVisit2.Id;
                patientVisit2BO.CalendarEventId = patientVisit2.CalendarEventId;
                patientVisit2BO.CaseId = patientVisit2.CaseId;
                patientVisit2BO.PatientId = patientVisit2.PatientId;
                patientVisit2BO.LocationId = patientVisit2.LocationId;
                patientVisit2BO.RoomId = patientVisit2.RoomId;
                patientVisit2BO.DoctorId = patientVisit2.DoctorId;
                patientVisit2BO.SpecialtyId = patientVisit2.SpecialtyId;
                patientVisit2BO.EventStart = patientVisit2.EventStart;
                patientVisit2BO.EventEnd = patientVisit2.EventEnd;
                patientVisit2BO.Notes = patientVisit2.Notes;
                patientVisit2BO.VisitStatusId = patientVisit2.VisitStatusId;
                patientVisit2BO.VisitType = patientVisit2.VisitType;
                patientVisit2BO.IsOutOfOffice = patientVisit2.IsOutOfOffice;
                patientVisit2BO.LeaveStartDate = patientVisit2.LeaveStartDate;
                patientVisit2BO.LeaveEndDate = patientVisit2.LeaveEndDate;
                patientVisit2BO.IsTransportationRequired = patientVisit2.IsTransportationRequired;
                patientVisit2BO.TransportProviderId = patientVisit2.TransportProviderId;

                patientVisit2BO.IsCancelled = patientVisit2.IsCancelled;
                patientVisit2BO.IsDeleted = patientVisit2.IsDeleted;
                patientVisit2BO.CreateByUserID = patientVisit2.CreateByUserID;
                patientVisit2BO.UpdateByUserID = patientVisit2.UpdateByUserID;               

                if (patientVisit2.Patient2 != null)
                {
                    BO.Patient2 Patient2BO = new BO.Patient2();
                    using (Patient2Repository patient2Repo = new Patient2Repository(_context))
                    {
                        Patient2BO = patient2Repo.Convert<BO.Patient2, Patient2>(patientVisit2.Patient2);
                        patientVisit2BO.Patient2 = Patient2BO;

                        if (patientVisit2.Patient2.PatientInsuranceInfoes != null && patientVisit2.Patient2.PatientInsuranceInfoes.Count > 0)
                        {
                            List<BO.PatientInsuranceInfo> PatientInsuranceInfoBOList = new List<BO.PatientInsuranceInfo>();
                            using (PatientInsuranceInfoRepository patientInsuranceInfoRepo = new PatientInsuranceInfoRepository(_context))
                            {
                                foreach (PatientInsuranceInfo eachPatientInsuranceInfo in patientVisit2.Patient2.PatientInsuranceInfoes)
                                {
                                    if (eachPatientInsuranceInfo.IsDeleted.HasValue == false || (eachPatientInsuranceInfo.IsDeleted.HasValue == true && eachPatientInsuranceInfo.IsDeleted.Value == false))
                                    {
                                        PatientInsuranceInfoBOList.Add(patientInsuranceInfoRepo.Convert<BO.PatientInsuranceInfo, PatientInsuranceInfo>(eachPatientInsuranceInfo));
                                    }
                                }

                                patientVisit2BO.Patient2.PatientInsuranceInfoes = PatientInsuranceInfoBOList;
                            }
                        }
                    }
                }

                if (patientVisit2.Case != null)
                {
                    BO.Case CaseBO = new BO.Case();
                    using (CaseRepository caseRepo = new CaseRepository(_context))
                    {
                        CaseBO = caseRepo.Convert<BO.Case, Case>(patientVisit2.Case);
                        patientVisit2BO.Case = CaseBO;

                        if (patientVisit2.Case.PatientAccidentInfoes != null && patientVisit2.Case.PatientAccidentInfoes.Count > 0)
                        {
                            List<BO.PatientAccidentInfo> PatientAccidentInfoBOList = new List<BO.PatientAccidentInfo>();
                            using (PatientAccidentInfoRepository patientAccidentInfoRepo = new PatientAccidentInfoRepository(_context))
                            {
                                foreach (PatientAccidentInfo eachPatientInsuranceInfo in patientVisit2.Case.PatientAccidentInfoes)
                                {
                                    if (eachPatientInsuranceInfo.IsDeleted.HasValue == false || (eachPatientInsuranceInfo.IsDeleted.HasValue == true && eachPatientInsuranceInfo.IsDeleted.Value == false))
                                    {
                                        PatientAccidentInfoBOList.Add(patientAccidentInfoRepo.Convert<BO.PatientAccidentInfo, PatientAccidentInfo>(eachPatientInsuranceInfo));
                                    }
                                }

                                patientVisit2BO.Case.PatientAccidentInfoes = PatientAccidentInfoBOList;
                            }
                        }
                    }
                }

                if (patientVisit2.Doctor != null)
                {
                    BO.Doctor boDoctor = new BO.Doctor();
                    using (DoctorRepository cmp = new DoctorRepository(_context))
                    {
                        boDoctor = cmp.Convert<BO.Doctor, Doctor>(patientVisit2.Doctor);
                        patientVisit2BO.Doctor = boDoctor;
                    }
                }

                if (patientVisit2.Room != null)
                {
                    BO.Room boRoom = new BO.Room();
                    using (RoomRepository cmp = new RoomRepository(_context))
                    {
                        boRoom = cmp.Convert<BO.Room, Room>(patientVisit2.Room);
                        patientVisit2BO.Room = boRoom;
                    }
                }

                if (patientVisit2.Specialty != null)
                {
                    BO.Specialty boSpecialty = new BO.Specialty();
                    using (SpecialityRepository cmp = new SpecialityRepository(_context))
                    {
                        boSpecialty = cmp.Convert<BO.Specialty, Specialty>(patientVisit2.Specialty);
                        patientVisit2BO.Specialty = boSpecialty;
                    }
                }

                if (patientVisit2.Location != null)
                {
                    BO.Location boLocation = new BO.Location();
                    using (LocationRepository cmp = new LocationRepository(_context))
                    {
                        boLocation = cmp.Convert<BO.Location, Location>(patientVisit2.Location);
                        patientVisit2BO.Location = boLocation;
                    }
                }

                if (patientVisit2.CalendarEvent != null)
                {
                    patientVisit2BO.CalendarEvent = new BO.CalendarEvent();

                    using (CalendarEventRepository calEventRep = new CalendarEventRepository(_context))
                    {
                        patientVisit2BO.CalendarEvent = calEventRep.Convert<BO.CalendarEvent, CalendarEvent>(patientVisit2.CalendarEvent);
                    }
                }

                if (patientVisit2.PatientVisitDiagnosisCodes != null)
                {
                    List<BO.PatientVisitDiagnosisCode> BOpatientVisitDiagnosisCode = new List<BO.PatientVisitDiagnosisCode>();
                    foreach (var eachVisitDiagnosis in patientVisit2.PatientVisitDiagnosisCodes)
                    {
                        if (eachVisitDiagnosis != null)
                        {
                            if (eachVisitDiagnosis.IsDeleted.HasValue == false || (eachVisitDiagnosis.IsDeleted.HasValue == true && eachVisitDiagnosis.IsDeleted.Value == false))
                            {
                                BO.PatientVisitDiagnosisCode patientVisitDiagnosisCodeBO = new BO.PatientVisitDiagnosisCode();

                                patientVisitDiagnosisCodeBO.ID = eachVisitDiagnosis.Id;
                                patientVisitDiagnosisCodeBO.DiagnosisCodeId = eachVisitDiagnosis.DiagnosisCodeId;
                                patientVisitDiagnosisCodeBO.PatientVisitId = eachVisitDiagnosis.PatientVisitId;
                                patientVisitDiagnosisCodeBO.IsDeleted = eachVisitDiagnosis.IsDeleted;
                                patientVisitDiagnosisCodeBO.CreateByUserID = eachVisitDiagnosis.CreateByUserID;
                                patientVisitDiagnosisCodeBO.UpdateByUserID = eachVisitDiagnosis.UpdateByUserID;

                                if (eachVisitDiagnosis.DiagnosisCode != null)
                                {
                                    using (DiagnosisCodeRepository repoDiagnosisCode = new DiagnosisCodeRepository(_context))
                                    {
                                        BO.DiagnosisCode diagCode = repoDiagnosisCode.Convert<BO.DiagnosisCode, DiagnosisCode>(eachVisitDiagnosis.DiagnosisCode);

                                        patientVisitDiagnosisCodeBO.DiagnosisCode = diagCode;
                                    }
                                }

                                BOpatientVisitDiagnosisCode.Add(patientVisitDiagnosisCodeBO);
                            }
                        }
                    }

                    patientVisit2BO.PatientVisitDiagnosisCodes = BOpatientVisitDiagnosisCode;
                }

                if (patientVisit2.PatientVisitProcedureCodes != null)
                {
                    List<BO.PatientVisitProcedureCode> BOpatientVisitProcedureCode = new List<BO.PatientVisitProcedureCode>();
                    foreach (var eachVisitProcedure in patientVisit2.PatientVisitProcedureCodes)
                    {
                        if (eachVisitProcedure != null)
                        {
                            if (eachVisitProcedure.IsDeleted.HasValue == false || (eachVisitProcedure.IsDeleted.HasValue == true && eachVisitProcedure.IsDeleted.Value == false))
                            {
                                BO.PatientVisitProcedureCode patientVisitProcedureCodeBO = new BO.PatientVisitProcedureCode();

                                patientVisitProcedureCodeBO.ID = eachVisitProcedure.Id;
                                patientVisitProcedureCodeBO.ProcedureCodeId = eachVisitProcedure.ProcedureCodeId;
                                patientVisitProcedureCodeBO.PatientVisitId = eachVisitProcedure.PatientVisitId;
                                patientVisitProcedureCodeBO.IsDeleted = eachVisitProcedure.IsDeleted;
                                patientVisitProcedureCodeBO.CreateByUserID = eachVisitProcedure.CreateByUserID;
                                patientVisitProcedureCodeBO.UpdateByUserID = eachVisitProcedure.UpdateByUserID;

                                if (eachVisitProcedure.ProcedureCode != null)
                                {
                                    using (ProcedureCodeRepository repoProcedureCode = new ProcedureCodeRepository(_context))
                                    {
                                        BO.ProcedureCode procCode = repoProcedureCode.Convert<BO.ProcedureCode, ProcedureCode>(eachVisitProcedure.ProcedureCode);

                                        patientVisitProcedureCodeBO.ProcedureCode = procCode;
                                    }
                                }

                                BOpatientVisitProcedureCode.Add(patientVisitProcedureCodeBO);
                            }
                        }
                    }

                    patientVisit2BO.PatientVisitProcedureCodes = BOpatientVisitProcedureCode;
                }


                return (T)(object)patientVisit2BO;
            }
            else if (entity is CalendarEvent)
            {
                CalendarEvent CalendarEventDB = entity as CalendarEvent;

                if (CalendarEventDB == null)
                    return default(T);

                BO.CalendarEvent CalendarEvent = new BO.CalendarEvent();
                using (CalendarEventRepository calEventRep = new CalendarEventRepository(_context))
                {
                    CalendarEvent = calEventRep.Convert<BO.CalendarEvent, CalendarEvent>(CalendarEventDB);
                }

                return (T)(object)CalendarEvent;
            }
            else if (entity is Location)
            {
                Location location = entity as Location;

                if (location == null)
                    return default(T);

                BO.Location locationBO = new BO.Location();

                locationBO.ID = location.id;
                locationBO.Name = location.Name;
                locationBO.IsDefault = location.IsDefault;
                locationBO.LocationType = (BO.GBEnums.LocationType)location.LocationType;
                if (location.IsDeleted.HasValue)
                    locationBO.IsDeleted = location.IsDeleted.Value;
                if (location.UpdateByUserID.HasValue)
                    locationBO.UpdateByUserID = location.UpdateByUserID.Value;

                if (location.Company != null)
                {
                    BO.Company boCompany = new BO.Company();
                    boCompany.ID = location.Company.id;
                    boCompany.Name = location.Company.Name;
                    boCompany.TaxID = location.Company.TaxID;
                    boCompany.Status = (BO.GBEnums.AccountStatus)location.Company.Status;
                    boCompany.CompanyType = (BO.GBEnums.CompanyType)location.Company.CompanyType;
                    boCompany.SubsCriptionType = (BO.GBEnums.SubsCriptionType)location.Company.SubscriptionPlanType;

                    locationBO.Company = boCompany;
                }

                return (T)(object)locationBO;
            }

            return default(T);
        }
        #endregion

        #region GetByvisitsConvert Entity Conversion

        public T GetByvisitsConvert<T, U>(U entity)
        {
            PatientVisit2 patientVisit2 = entity as PatientVisit2;

            if (patientVisit2 == null)
                return default(T);

            BO.mPatientVisits mpatientVisits = new BO.mPatientVisits();

            mpatientVisits.ID = patientVisit2.Id;
            mpatientVisits.CalendarEventId = patientVisit2.CalendarEventId;
            mpatientVisits.CaseId = patientVisit2.CaseId;
            mpatientVisits.PatientId = patientVisit2.PatientId;
            mpatientVisits.LocationId = patientVisit2.LocationId;
            mpatientVisits.RoomId = patientVisit2.RoomId;
            mpatientVisits.DoctorId = patientVisit2.DoctorId;
            mpatientVisits.SpecialtyId = patientVisit2.SpecialtyId;
            mpatientVisits.LocationName = patientVisit2.Location.Name;
            mpatientVisits.RoomName = patientVisit2.Room.Name;
            mpatientVisits.RoomTestName = patientVisit2.Room.RoomTest.Name;
            mpatientVisits.DoctorFirstName = patientVisit2.Doctor.User.FirstName;
            mpatientVisits.DoctorLastName = patientVisit2.Doctor.User.LastName;
            mpatientVisits.PatientFirstName = patientVisit2.Patient2.User.FirstName;
            mpatientVisits.PatientLastName = patientVisit2.Patient2.User.LastName;

            using (CalendarEventRepository calEventRep = new CalendarEventRepository(_context))
            {
                mpatientVisits.CalendarEvent = calEventRep.Convert<BO.CalendarEvent, CalendarEvent>(patientVisit2.CalendarEvent);
            }

            mpatientVisits.IsDeleted = patientVisit2.IsDeleted;
            mpatientVisits.CreateByUserID = patientVisit2.CreateByUserID;
            mpatientVisits.UpdateByUserID = patientVisit2.UpdateByUserID;
                        
            return (T)(object)mpatientVisits;
        }

        #endregion

        #region Get By Location Id
        public override object GetByLocationId(int id)
        {
            List<PatientVisit2> lstPatientVisit = _context.PatientVisit2.Include("CalendarEvent")
                                                                        .Include("Patient2")
                                                                        .Include("Patient2.User")
                                                                        .Include("Case")
                                                                        .Include("Doctor")
                                                                        .Include("Doctor.User")
                                                                        .Include("Room").Include("Room.RoomTest")
                                                                        .Include("Location").Include("Location.Company")
                                                                        .Include("Specialty")
                                                                        .Include("PatientVisitDiagnosisCodes").Include("PatientVisitDiagnosisCodes.DiagnosisCode")
                                                                        .Include("PatientVisitProcedureCodes").Include("PatientVisitProcedureCodes.ProcedureCode")
                                                                        .Where(p => p.LocationId == id
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<PatientVisit2>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit2> lstBOPatientVisit = new List<BO.PatientVisit2>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit2, PatientVisit2>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region Get By Location Id And Room Id
        public override object Get(int LocationId, int RoomId)
        {
            List<PatientVisit2> lstPatientVisit = _context.PatientVisit2.Include("Location").Include("Location.Company")
                                                                        .Include("CalendarEvent")
                                                                        .Include("Patient2")
                                                                        .Include("Patient2.User")
                                                                        .Include("Case")
                                                                        .Include("Doctor")
                                                                        .Include("Doctor.User")
                                                                        .Include("Room").Include("Room.RoomTest")
                                                                        .Include("Specialty")
                                                                        .Include("PatientVisitDiagnosisCodes").Include("PatientVisitDiagnosisCodes.DiagnosisCode")
                                                                        .Include("PatientVisitProcedureCodes").Include("PatientVisitProcedureCodes.ProcedureCode")
                                                                        .Where(p => p.LocationId == LocationId && p.RoomId == RoomId
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<PatientVisit2>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location Id and Room Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit2> lstBOPatientVisit = new List<BO.PatientVisit2>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit2, PatientVisit2>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region Get By Location Id, Patient Id And Room Id
        public override object GetByLocationRoomAndPatientId(int locationId, int roomId, int patientId)
        {
            List<PatientVisit2> lstPatientVisit = _context.PatientVisit2.Include("CalendarEvent")
                                                                        .Include("Patient2")
                                                                        .Include("Patient2.User")
                                                                        .Include("Case")
                                                                        .Include("Doctor")
                                                                        .Include("Doctor.User")
                                                                        .Include("Room").Include("Room.RoomTest")
                                                                        .Include("Location").Include("Location.Company")
                                                                        .Include("Specialty")
                                                                        .Include("PatientVisitDiagnosisCodes").Include("PatientVisitDiagnosisCodes.DiagnosisCode")
                                                                        .Include("PatientVisitProcedureCodes").Include("PatientVisitProcedureCodes.ProcedureCode")
                                                                        .Where(p => p.LocationId == locationId && p.RoomId == roomId && p.PatientId == patientId
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<PatientVisit2>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location Id, Room Id And Patient Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit2> lstBOPatientVisit = new List<BO.PatientVisit2>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit2, PatientVisit2>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region Get By Location Id And Doctor Id
        public override object Get2(int LocationId, int DoctorId)
        {
            List<PatientVisit2> lstPatientVisit = _context.PatientVisit2.Include("Location").Include("Location.Company")
                                                                        .Include("CalendarEvent")
                                                                        .Include("Patient2")
                                                                        .Include("Patient2.User")
                                                                        .Include("Case")
                                                                        .Include("Doctor")
                                                                        .Include("Doctor.User")
                                                                        .Include("Room").Include("Room.RoomTest")
                                                                        .Include("Specialty")
                                                                        .Include("PatientVisitDiagnosisCodes").Include("PatientVisitDiagnosisCodes.DiagnosisCode")
                                                                        .Include("PatientVisitProcedureCodes").Include("PatientVisitProcedureCodes.ProcedureCode")
                                                                        .Where(p => p.LocationId == LocationId && p.DoctorId == DoctorId
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<PatientVisit2>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location Id and Doctor Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit2> lstBOPatientVisit = new List<BO.PatientVisit2>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit2, PatientVisit2>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region Get By Location Id And Patient Id
        public override object GetByLocationAndPatientId(int LocationId, int PatientId)
        {
            List<PatientVisit2> lstPatientVisit = _context.PatientVisit2.Include("CalendarEvent")
                                                                        .Include("Patient2")
                                                                        .Include("Patient2.User")
                                                                        .Include("Case")
                                                                        .Include("Doctor")
                                                                        .Include("Doctor.User")
                                                                        .Include("Room").Include("Room.RoomTest")
                                                                        .Include("Location").Include("Location.Company")
                                                                        .Include("Specialty")
                                                                        .Include("PatientVisitDiagnosisCodes").Include("PatientVisitDiagnosisCodes.DiagnosisCode")
                                                                        .Include("PatientVisitProcedureCodes").Include("PatientVisitProcedureCodes.ProcedureCode")
                                                                        .Where(p => p.LocationId == LocationId && p.Case.PatientId == PatientId
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<PatientVisit2>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location Id and Patient Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit2> lstBOPatientVisit = new List<BO.PatientVisit2>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit2, PatientVisit2>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region Get By Location Id, Doctor Id And Patient Id
        public override object GetByLocationDoctorAndPatientId(int locationId, int doctorId, int patientId)
        {
            List<PatientVisit2> lstPatientVisit = _context.PatientVisit2.Include("CalendarEvent")
                                                                        .Include("Patient2")
                                                                        .Include("Patient2.User")
                                                                        .Include("Case")
                                                                        .Include("Doctor")
                                                                        .Include("Doctor.User")
                                                                        .Include("Room").Include("Room.RoomTest")
                                                                        .Include("Location").Include("Location.Company")
                                                                        .Include("Specialty")
                                                                        .Include("PatientVisitDiagnosisCodes").Include("PatientVisitDiagnosisCodes.DiagnosisCode")
                                                                        .Include("PatientVisitProcedureCodes").Include("PatientVisitProcedureCodes.ProcedureCode")
                                                                        .Where(p => p.LocationId == locationId && p.DoctorId == doctorId && p.Case.PatientId == patientId
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<PatientVisit2>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location Id, Doctor Id and Patient Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit2> lstBOPatientVisit = new List<BO.PatientVisit2>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit2, PatientVisit2>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region Get By Doctor Id
        public override object GetByDoctorId(int id)
        {
            List<PatientVisit2> lstPatientVisit = _context.PatientVisit2.Include("CalendarEvent")                                                                       
                                                                        .Where(p => p.DoctorId == id
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<PatientVisit2>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Doctor Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit2> lstBOPatientVisit = new List<BO.PatientVisit2>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit2, PatientVisit2>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.PatientVisit2 PatientVisit2BO = (BO.PatientVisit2)(object)entity;
            BO.CalendarEvent CalendarEventBO = PatientVisit2BO.CalendarEvent;
            List<BO.PatientVisitDiagnosisCode> PatientVisitDiagnosisCodeBOList = PatientVisit2BO.PatientVisitDiagnosisCodes;
            List<BO.PatientVisitProcedureCode> PatientVisitProcedureCodeBOList = PatientVisit2BO.PatientVisitProcedureCodes;
            string patientUserName = string.Empty;
            bool sendNotification = false;

            PatientVisit2 PatientVisit2DB = new PatientVisit2();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                bool IsEditMode = false;
                bool IsAddModeCalendarEvent = false;
                IsEditMode = (PatientVisit2BO != null && PatientVisit2BO.ID > 0) ? true : false;

                if (PatientVisit2BO.PatientId == null && PatientVisit2BO.ID > 0)
                {
                    var patientvisitData = _context.PatientVisit2.Where(p => p.Id == PatientVisit2BO.ID).Select(p => new { p.PatientId, p.CaseId }).FirstOrDefault();
                    patientUserName = _context.Users.Where(usr => usr.id == patientvisitData.PatientId).Select(p => p.UserName).FirstOrDefault();
                }

                if (PatientVisit2BO.PatientId != null && PatientVisit2BO.PatientId > 0)
                    patientUserName = _context.Users.Where(usr => usr.id == PatientVisit2BO.PatientId).Select(p => p.UserName).FirstOrDefault();

                if (IsEditMode == false)
                {
                    if (PatientVisit2BO.IsOutOfOffice != true && PatientVisit2BO.PatientId == null)
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass caseId and PatientId.", ErrorLevel = ErrorLevel.Error };
                    }
                }
                if (PatientVisit2BO.ID <= 0 && PatientVisit2BO.PatientId.HasValue == false && PatientVisit2BO.LocationId.HasValue == false)
                {
                    IsEditMode = (CalendarEventBO != null && CalendarEventBO.ID > 0) ? true : false;
                    IsAddModeCalendarEvent = (CalendarEventBO != null && CalendarEventBO.ID > 0) ? false : true;
                }

                CalendarEvent CalendarEventDB = new CalendarEvent();
                #region Calendar Event
                if (CalendarEventBO != null)
                {
                    bool Add_CalendarEventDB = false;
                    CalendarEventDB = _context.CalendarEvents.Where(p => p.Id == CalendarEventBO.ID
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                             .FirstOrDefault();

                    if (CalendarEventDB == null && CalendarEventBO.ID <= 0)
                    {
                        CalendarEventDB = new CalendarEvent();
                        Add_CalendarEventDB = true;
                    }
                    else if (CalendarEventDB == null && CalendarEventBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Calendar Event details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    if (dictionary.ContainsKey(patientUserName))
                    {
                        if (CalendarEventDB.EventStart != CalendarEventBO.EventStart.Value) sendNotification = true;
                    }

                    CalendarEventDB.Name = IsEditMode == true && CalendarEventBO.Name == null ? CalendarEventDB.Name : CalendarEventBO.Name;
                    CalendarEventDB.EventStart = IsEditMode == true && CalendarEventBO.EventStart.HasValue == false ? CalendarEventDB.EventStart : CalendarEventBO.EventStart.Value;
                    CalendarEventDB.EventEnd = IsEditMode == true && CalendarEventBO.EventEnd.HasValue == false ? CalendarEventDB.EventEnd : CalendarEventBO.EventEnd.Value;
                    CalendarEventDB.TimeZone = CalendarEventBO.TimeZone;
                    CalendarEventDB.Description = CalendarEventBO.Description;
                    CalendarEventDB.RecurrenceId = CalendarEventBO.RecurrenceId;
                    CalendarEventDB.RecurrenceRule = IsEditMode == true && CalendarEventBO.RecurrenceRule == null ? CalendarEventDB.RecurrenceRule : CalendarEventBO.RecurrenceRule;
                    CalendarEventDB.RecurrenceException = IsEditMode == true && CalendarEventBO.RecurrenceException == null ? CalendarEventDB.RecurrenceException : CalendarEventBO.RecurrenceException;
                    CalendarEventDB.IsAllDay = CalendarEventBO.IsAllDay;

                    if (IsEditMode == false)
                    {
                        CalendarEventDB.CreateByUserID = CalendarEventBO.CreateByUserID;
                        CalendarEventDB.CreateDate = DateTime.UtcNow;
                    }
                    else
                    {
                        CalendarEventDB.UpdateByUserID = CalendarEventBO.UpdateByUserID;
                        CalendarEventDB.UpdateDate = DateTime.UtcNow;
                    }

                    if (Add_CalendarEventDB == true)
                    {
                        CalendarEventDB = _context.CalendarEvents.Add(CalendarEventDB);
                    }
                    _context.SaveChanges();

                    #region send SMS notification 
                    try
                    {
                        if (sendNotification)
                        {
                            //string accountSid = ConfigurationManager.AppSettings.Get("TWILIO_ACCOUNT_ID");      //-- Account SID from twilio.com/console : AC48ba9355b0bae1234caa9e29dc73b407                            
                            //string authToken = ConfigurationManager.AppSettings.Get("TWILIO_AUTH_TOKEN");       //-- bAuth Token from twilio.com/console : 74b9f9f1c60c200d28b8c5b22968e65f
                            //TwilioClient.Init(accountSid, authToken);
                            //var to = new PhoneNumber(dictionary[patientUserName]);
                            //var message = MessageResource.Create(
                            //    to,
                            //    from: new PhoneNumber(ConfigurationManager.AppSettings.Get("TWILIO_FROM_PHN")), //-- +14252150865
                            //    body: "Your appointment has been scheduled at " + CalendarEventBO.EventStart.Value + " in " + _context.Locations.Where(loc => loc.id == PatientVisit2BO.LocationId).Select(lc => lc.Name).FirstOrDefault()
                            //    );

                            string to = dictionary[patientUserName];
                            string body = "Your appointment has been scheduled at " + CalendarEventBO.EventStart.Value + " in " + _context.Locations.Where(loc => loc.id == PatientVisit2BO.LocationId).Select(lc => lc.Name).FirstOrDefault();

                            string msgid = SMSGateway.SendSMS(to, body);
                        }
                    }
                    catch (Exception) { }
                    #endregion
                }
                else
                {
                    if (IsEditMode == false && PatientVisit2BO.CalendarEventId <= 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Calendar Event details.", ErrorLevel = ErrorLevel.Error };
                    }
                    CalendarEventDB = null;
                }
                #endregion

                #region Patient Visit
                if (PatientVisit2BO != null && ((PatientVisit2BO.ID <= 0 && PatientVisit2BO.PatientId.HasValue == true && PatientVisit2BO.LocationId.HasValue == true) || (PatientVisit2BO.ID > 0)))
                {
                    bool Add_PatientVisit2DB = false;
                    PatientVisit2DB = _context.PatientVisit2.Where(p => p.Id == PatientVisit2BO.ID
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault();

                    if (PatientVisit2DB == null && PatientVisit2BO.ID <= 0)
                    {
                        PatientVisit2DB = new PatientVisit2();
                        Add_PatientVisit2DB = true;
                    }
                    else if (PatientVisit2DB == null && PatientVisit2BO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient Visit doesn't exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    //PatientVisit2DB.CalendarEventId = PatientVisit2BO.CalendarEventId.HasValue == false ? PatientVisit2DB.CalendarEventId : PatientVisit2BO.CalendarEventId.Value;
                    PatientVisit2DB.CalendarEventId = (CalendarEventDB != null && CalendarEventDB.Id > 0) ? CalendarEventDB.Id : ((PatientVisit2BO.CalendarEventId.HasValue == true) ? PatientVisit2BO.CalendarEventId.Value : PatientVisit2DB.CalendarEventId);

                    if (IsEditMode == false && PatientVisit2BO.CaseId.HasValue == false)
                    {
                        int CaseId = _context.Cases.Where(p => p.PatientId == PatientVisit2BO.PatientId.Value && p.CaseStatusId == 1
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .Select(p => p.Id)
                                                   .FirstOrDefault<int>();

                        PatientVisit2DB.CaseId = CaseId;
                    }
                    else
                    {
                        PatientVisit2DB.CaseId = PatientVisit2BO.CaseId.HasValue == false ? PatientVisit2DB.CaseId : PatientVisit2BO.CaseId.Value;
                    }

                    if (IsEditMode == false)
                    {
                        int CaseId = _context.Cases.Where(p => p.PatientId == PatientVisit2BO.PatientId.Value && p.CaseStatusId == 1
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .Select(p => p.Id)
                                                   .FirstOrDefault<int>();

                        if (CaseId == 0)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "No open case exists for given patient.", ErrorLevel = ErrorLevel.Error };
                        }
                        else if (PatientVisit2BO.CaseId.HasValue == true && PatientVisit2BO.CaseId.Value != CaseId)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Case id dosent match with open case is for the given patient.", ErrorLevel = ErrorLevel.Error };
                        }
                        else
                        {
                            PatientVisit2DB.CaseId = CaseId;
                        }
                    }
                    else
                    {
                        PatientVisit2DB.CaseId = PatientVisit2BO.CaseId.HasValue == false ? PatientVisit2DB.CaseId : PatientVisit2BO.CaseId.Value;
                    }


                    PatientVisit2DB.PatientId = IsEditMode == true && PatientVisit2BO.PatientId.HasValue == false ? PatientVisit2DB.PatientId : PatientVisit2BO.PatientId.Value;
                    PatientVisit2DB.LocationId = IsEditMode == true && PatientVisit2BO.LocationId.HasValue == false ? PatientVisit2DB.LocationId : PatientVisit2BO.LocationId.Value;
                    PatientVisit2DB.RoomId = PatientVisit2BO.RoomId;
                    PatientVisit2DB.DoctorId = PatientVisit2BO.DoctorId;
                    PatientVisit2DB.SpecialtyId = PatientVisit2BO.SpecialtyId;

                    PatientVisit2DB.EventStart = PatientVisit2BO.EventStart;
                    PatientVisit2DB.EventEnd = PatientVisit2BO.EventEnd;

                    PatientVisit2DB.Notes = PatientVisit2BO.Notes;
                    PatientVisit2DB.VisitStatusId = PatientVisit2BO.VisitStatusId;
                    PatientVisit2DB.VisitType = PatientVisit2BO.VisitType;
                    PatientVisit2DB.IsOutOfOffice = PatientVisit2BO.IsOutOfOffice;
                    PatientVisit2DB.LeaveStartDate = PatientVisit2BO.LeaveStartDate;
                    PatientVisit2DB.LeaveEndDate = PatientVisit2BO.LeaveEndDate;
                    PatientVisit2DB.IsTransportationRequired = PatientVisit2BO.IsTransportationRequired;
                    PatientVisit2DB.TransportProviderId = PatientVisit2BO.TransportProviderId;

                    if (IsEditMode == false)
                    {
                        PatientVisit2DB.CreateByUserID = PatientVisit2BO.CreateByUserID;
                        PatientVisit2DB.CreateDate = DateTime.UtcNow;
                    }
                    else
                    {
                        PatientVisit2DB.UpdateByUserID = PatientVisit2BO.UpdateByUserID;
                        PatientVisit2DB.UpdateDate = DateTime.UtcNow;
                    }

                    if (Add_PatientVisit2DB == true)
                    {
                        PatientVisit2DB = _context.PatientVisit2.Add(PatientVisit2DB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false && IsAddModeCalendarEvent == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Patient Visit details.", ErrorLevel = ErrorLevel.Error };
                    }
                    PatientVisit2DB = null;
                }

                _context.SaveChanges();
                #endregion

                #region PatientVisitDiagnosisCode
                if (PatientVisitDiagnosisCodeBOList == null || (PatientVisitDiagnosisCodeBOList != null && PatientVisitDiagnosisCodeBOList.Count <= 0))
                {
                    //return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Patient Visit Diagnosis Code.", ErrorLevel = ErrorLevel.Error };
                }
                else
                {
                    int PatientVisitId = PatientVisit2DB.Id;
                    List<int> NewDiagnosisCodeIds = PatientVisitDiagnosisCodeBOList.Select(p => p.DiagnosisCodeId).ToList();

                    List<PatientVisitDiagnosisCode> ReomveDiagnosisCodeDB = new List<PatientVisitDiagnosisCode>();
                    ReomveDiagnosisCodeDB = _context.PatientVisitDiagnosisCodes.Where(p => p.PatientVisitId == PatientVisitId
                                                                                    && NewDiagnosisCodeIds.Contains(p.DiagnosisCodeId) == false
                                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                               .ToList();

                    ReomveDiagnosisCodeDB.ForEach(p => { p.IsDeleted = true; p.UpdateByUserID = 0; p.UpdateDate = DateTime.UtcNow; });

                    _context.SaveChanges();

                    foreach (BO.PatientVisitDiagnosisCode eachPatientVisitDiagnosisCode in PatientVisitDiagnosisCodeBOList)
                    {
                        PatientVisitDiagnosisCode AddDiagnosisCodeDB = new PatientVisitDiagnosisCode();
                        AddDiagnosisCodeDB = _context.PatientVisitDiagnosisCodes.Where(p => p.PatientVisitId == PatientVisitId
                                                                                    && p.DiagnosisCodeId == eachPatientVisitDiagnosisCode.DiagnosisCodeId
                                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                               .FirstOrDefault();

                        if (AddDiagnosisCodeDB == null)
                        {
                            AddDiagnosisCodeDB = new PatientVisitDiagnosisCode();

                            AddDiagnosisCodeDB.PatientVisitId = PatientVisitId;
                            AddDiagnosisCodeDB.DiagnosisCodeId = eachPatientVisitDiagnosisCode.DiagnosisCodeId;

                            _context.PatientVisitDiagnosisCodes.Add(AddDiagnosisCodeDB);
                        }
                    }

                    _context.SaveChanges();
                }
                #endregion

                #region PatientVisitProcedureCode
                if (PatientVisitProcedureCodeBOList == null || (PatientVisitProcedureCodeBOList != null && PatientVisitProcedureCodeBOList.Count <= 0))
                {
                    //return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Patient Visit Procedure Code.", ErrorLevel = ErrorLevel.Error };
                }
                else
                {
                    int PatientVisitId = PatientVisit2DB.Id;
                    List<int> NewProcedureCodeIds = PatientVisitProcedureCodeBOList.Select(p => p.ProcedureCodeId).ToList();

                    List<PatientVisitProcedureCode> ReomveProcedureCodeDB = new List<PatientVisitProcedureCode>();
                    ReomveProcedureCodeDB = _context.PatientVisitProcedureCodes.Where(p => p.PatientVisitId == PatientVisitId
                                                                                    && NewProcedureCodeIds.Contains(p.ProcedureCodeId) == false
                                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                               .ToList();

                    ReomveProcedureCodeDB.ForEach(p => { p.IsDeleted = true; p.UpdateByUserID = 0; p.UpdateDate = DateTime.UtcNow; });

                    _context.SaveChanges();

                    foreach (BO.PatientVisitProcedureCode eachPatientVisitProcedureCode in PatientVisitProcedureCodeBOList)
                    {
                        PatientVisitProcedureCode AddProcedureCodeDB = new PatientVisitProcedureCode();
                        AddProcedureCodeDB = _context.PatientVisitProcedureCodes.Where(p => p.PatientVisitId == PatientVisitId
                                                                                    && p.ProcedureCodeId == eachPatientVisitProcedureCode.ProcedureCodeId
                                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                               .FirstOrDefault();

                        if (AddProcedureCodeDB == null)
                        {
                            AddProcedureCodeDB = new PatientVisitProcedureCode();

                            AddProcedureCodeDB.PatientVisitId = PatientVisitId;
                            AddProcedureCodeDB.ProcedureCodeId = eachPatientVisitProcedureCode.ProcedureCodeId;

                            _context.PatientVisitProcedureCodes.Add(AddProcedureCodeDB);
                        }
                    }

                    _context.SaveChanges();
                }
                #endregion

                dbContextTransaction.Commit();

                int preferredCommunicationType = 3;
               

                if (IsEditMode == false)
                {
                    User currentUser = _context.Users.Where(p => p.id == PatientVisit2DB.CreateByUserID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
                    Doctor doctor = _context.Doctors.Where(p => p.Id == PatientVisit2DB.DoctorId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
                    ContactInfo contact = _context.Users.Where(p => p.id == PatientVisit2DB.PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p => p.ContactInfo).FirstOrDefault();
                    Patient2 patient = _context.Patient2.Where(p => p.Id == PatientVisit2DB.PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                    User doctor_user = _context.Users.Where(p => p.id == PatientVisit2DB.DoctorId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                    if (currentUser != null)
                    {
                        #region UserType Doctor
                        if (currentUser.UserType == 4 || currentUser.UserType == 2)
                        {
                            try
                            {
                                if (preferredCommunicationType == 1)
                                {
                                    if (contact.EmailAddress != null)
                                    {
                                        #region Send Email

                                        var userBO = _context.Users.Where(p => p.id == PatientVisit2DB.PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                                        if (userBO != null)
                                        {
                                            var mailTemplateDB = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "PatientVisitCreatedByDoctor".ToUpper()).FirstOrDefault();
                                            if (mailTemplateDB == null)
                                            {
                                                return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                                            }
                                            else
                                            {
                                                string LoginLink2 = "<a href='http://www.patient.codearray.tk'>http://www.patient.codearray.tk</a>";
                                                string msg = mailTemplateDB.EmailBody;
                                                string subject = mailTemplateDB.EmailSubject;

                                                string message = string.Format(msg, patient.User.FirstName, doctor_user.FirstName, CalendarEventBO.Name, CalendarEventBO.EventStart.Value, LoginLink2);

                                                BO.Email objEmail = new BO.Email { ToEmail = patient.User.UserName, Subject = subject, Body = message };
                                                objEmail.SendMail();
                                            }
                                        }

                                        #endregion
                                    }
                                }
                                if (preferredCommunicationType == 2)
                                {
                                    if (contact.CellPhone != null)
                                    {
                                        #region send SMS notification 
                                        try
                                        {
                                            string to = dictionary[patientUserName];
                                            //string body = "Your appointment has been scheduled at " + CalendarEventBO.EventStart.Value + " in " + _context.Locations.Where(loc => loc.id == PatientVisit2BO.LocationId).Select(lc => lc.Name).FirstOrDefault();
                                            string body = " Doctor " + doctor_user.FirstName + " has created a visit " + CalendarEventBO.Name + " on " + CalendarEventBO.EventStart.Value + "." + "  Please visit Midas portal http://www.patient.codearray.tk to view details.";
                                            string msgid = SMSGateway.SendSMS(to, body);
                                        }
                                        catch (Exception) { }
                                        #endregion
                                    }

                                }
                                if (preferredCommunicationType == 3)
                                {
                                    if (contact.EmailAddress != null)
                                    {
                                        #region Send Email

                                        var userBO = _context.Users.Where(p => p.id == PatientVisit2DB.PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                                        if (userBO != null)
                                        {
                                            var mailTemplateDB = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "PatientVisitCreatedByDoctor".ToUpper()).FirstOrDefault();
                                            if (mailTemplateDB == null)
                                            {
                                                return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                                            }
                                            else
                                            {
                                                string LoginLink2 = "<a href='http://www.patient.codearray.tk'>http://www.patient.codearray.tk</a>";
                                                string msg = mailTemplateDB.EmailBody;
                                                string subject = mailTemplateDB.EmailSubject;

                                                string message = string.Format(msg, patient.User.FirstName, doctor_user.FirstName, CalendarEventBO.Name, CalendarEventBO.EventStart.Value, LoginLink2);
                                                //string message = string.Format(msg, userBO.FirstName, doctor_user.FirstName, CalendarEventBO.Name, CalendarEventBO.EventStart.Value, LoginLink2);

                                                BO.Email objEmail = new BO.Email { ToEmail = patient.User.UserName, Subject = subject, Body = message };
                                                //BO.Email objEmail = new BO.Email { ToEmail = userBO.FirstName, Subject = subject, Body = message };
                                                objEmail.SendMail();
                                            }
                                        }

                                        #endregion
                                    }
                                    if (contact.CellPhone != null)
                                    {
                                        #region send SMS notification 
                                        try
                                        {
                                            string to = dictionary[patientUserName];
                                            //string body = "Your appointment has been scheduled at " + CalendarEventBO.EventStart.Value + " in " + _context.Locations.Where(loc => loc.id == PatientVisit2BO.LocationId).Select(lc => lc.Name).FirstOrDefault();
                                            string body = " Doctor " + doctor_user.FirstName + " has created a visit " + CalendarEventBO.Name + " on " + CalendarEventBO.EventStart.Value + "." + "  Please visit Midas portal http://www.patient.codearray.tk to view details.";
                                            string msgid = SMSGateway.SendSMS(to, body);
                                        }
                                        catch (Exception) { }
                                        #endregion

                                    }

                                }

                            }
                            catch (Exception e) { }
                        }
                        #endregion

                        #region UserType Patient
                        if (currentUser.UserType == 1)
                        {
                            try
                            {
                                if (preferredCommunicationType == 1)
                                {
                                    if (contact.EmailAddress != null)
                                    {
                                        #region Send Email

                                        var userBO = _context.Users.Where(p => p.id == PatientVisit2DB.PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                                        if (userBO != null)
                                        {
                                            var mailTemplateDB = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "PatientVisitCreatedByPatient".ToUpper()).FirstOrDefault();
                                            if (mailTemplateDB == null)
                                            {
                                                return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                                            }
                                            else
                                            {
                                                string LoginLink2 = "<a href='http://www.medicalprovider.codearray.tk'> http://www.medicalprovider.codearray.tk </a>";
                                                string msg = mailTemplateDB.EmailBody;
                                                string subject = mailTemplateDB.EmailSubject;

                                                string message = string.Format(msg, doctor.User.FirstName, patient.User.FirstName, CalendarEventBO.Name, CalendarEventBO.EventStart.Value, LoginLink2);

                                                BO.Email objEmail = new BO.Email { ToEmail = doctor.User.UserName, Subject = subject, Body = message };
                                                objEmail.SendMail();
                                            }
                                        }

                                        #endregion
                                    }
                                }
                                if (preferredCommunicationType == 2)
                                {
                                    if (contact.CellPhone != null)
                                    {
                                        #region send SMS notification 
                                        try
                                        {
                                            string to = doctor.User.UserName;
                                            //string body = "Your appointment has been scheduled at " + CalendarEventBO.EventStart.Value + " in " + _context.Locations.Where(loc => loc.id == PatientVisit2BO.LocationId).Select(lc => lc.Name).FirstOrDefault();
                                            string body = " Patient " + patient.User.FirstName + " has created a visit " + CalendarEventBO.Name + " on " + CalendarEventBO.EventStart.Value + "." + "  Please visit Midas portal http://www.medicalprovider.codearray.tk  to view details.";
                                            string msgid = SMSGateway.SendSMS(to, body);
                                        }
                                        catch (Exception) { }
                                        #endregion
                                    }

                                }
                                if (preferredCommunicationType == 3)
                                {
                                    if (contact.EmailAddress != null)
                                    {
                                        #region Send Email

                                        var userBO = _context.Users.Where(p => p.id == PatientVisit2DB.PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                                        if (userBO != null)
                                        {
                                            var mailTemplateDB = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "PatientVisitCreatedByPatient".ToUpper()).FirstOrDefault();
                                            if (mailTemplateDB == null)
                                            {
                                                return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                                            }
                                            else
                                            {
                                                string LoginLink2 = "<a href='http://www.medicalprovider.codearray.tk'> http://www.medicalprovider.codearray.tk </a>";
                                                string msg = mailTemplateDB.EmailBody;
                                                string subject = mailTemplateDB.EmailSubject;

                                                string message = string.Format(msg, doctor.User.FirstName, patient.User.FirstName, CalendarEventBO.Name, CalendarEventBO.EventStart.Value, LoginLink2);
                                                //string message = string.Format(msg, doctor.User.FirstName, userBO.FirstName, CalendarEventBO.Name, CalendarEventBO.EventStart.Value, LoginLink2);

                                                BO.Email objEmail = new BO.Email { ToEmail = doctor.User.UserName, Subject = subject, Body = message };

                                                objEmail.SendMail();
                                            }
                                        }

                                        #endregion
                                    }
                                    if (contact.CellPhone != null)
                                    {
                                        #region send SMS notification 
                                        try
                                        {
                                            string to = doctor.User.UserName;
                                            //string body = "Your appointment has been scheduled at " + CalendarEventBO.EventStart.Value + " in " + _context.Locations.Where(loc => loc.id == PatientVisit2BO.LocationId).Select(lc => lc.Name).FirstOrDefault();
                                            string body = " Patient " + patient.User.FirstName + " has created a visit " + CalendarEventBO.Name + " on " + CalendarEventBO.EventStart.Value + "." + "  Please visit Midas portal http://www.medicalprovider.codearray.tk  to view details.";
                                            string msgid = SMSGateway.SendSMS(to, body);
                                        }
                                        catch (Exception) { }
                                        #endregion

                                    }

                                }

                            }
                            catch (Exception e) { }

                        

                        }
                        #endregion
                    }
                }


                if (PatientVisit2DB != null)
                {
                    PatientVisit2DB = _context.PatientVisit2.Include("CalendarEvent")
                                                            .Include("Patient2").Include("Patient2.User").Include("Patient2.User.UserCompanies")
                                                            .Include("PatientVisitDiagnosisCodes").Include("PatientVisitDiagnosisCodes.DiagnosisCode")
                                                            .Include("PatientVisitProcedureCodes").Include("PatientVisitProcedureCodes.ProcedureCode")
                                                            .Where(p => p.Id == PatientVisit2DB.Id
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault<PatientVisit2>();
                }
                else if (CalendarEventDB != null)
                {
                    PatientVisit2DB = _context.PatientVisit2.Include("CalendarEvent")
                                                            .Where(p => p.CalendarEvent.Id == CalendarEventDB.Id
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault<PatientVisit2>();
                }
            }

            var res = Convert<BO.PatientVisit2, PatientVisit2>(PatientVisit2DB);
            return (object)res;
        }
        #endregion

        #region DeleteVisit By ID
        public override object DeleteVisit(int id)
        {
            var acc = _context.PatientVisit2.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<PatientVisit2>();
            if (acc != null)
            {
                if (acc.CalendarEvent != null)
                {
                    acc.CalendarEvent.IsDeleted = true;
                    acc.CalendarEvent.UpdateByUserID = 0;
                    acc.CalendarEvent.UpdateDate = DateTime.UtcNow;
                }

                acc.IsDeleted = true;
                acc.UpdateByUserID = 0;
                acc.UpdateDate = DateTime.UtcNow;

                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.PatientVisit2, PatientVisit2>(acc);
            return (object)res;
        }
        #endregion

        #region DeleteCalendarEvent By ID
        public override object DeleteCalendarEvent(int id)
        {
            var acc = _context.CalendarEvents.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<CalendarEvent>();
            if (acc != null)
            {
                acc.IsDeleted = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.CalendarEvent, CalendarEvent>(acc);
            return (object)res;
        }
        #endregion

        #region CancleVisit By ID
        public override object CancleVisit(int id)
        {
            var acc = _context.PatientVisit2.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<PatientVisit2>();
            if (acc != null)
            {
                acc.IsCancelled = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.PatientVisit2, PatientVisit2>(acc);
            return (object)res;
        }
        #endregion

        #region CancleCalendarEvent By ID
        public override object CancleCalendarEvent(int id)
        {
            var acc = _context.CalendarEvents.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<CalendarEvent>();
            if (acc != null)
            {
                acc.IsCancelled = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.CalendarEvent, CalendarEvent>(acc);
            return (object)res;
        }
        #endregion

        #region Get By Case Id
        public override object GetByCaseId(int CaseId)
        {
            var acc = _context.PatientVisit2.Include("Location").Include("Location.Company")
                                            .Include("Doctor")
                                            .Include("Doctor.User")
                                            .Include("Room").Include("Room.RoomTest")
                                            .Include("Specialty")
                                            .Include("PatientVisitDiagnosisCodes").Include("PatientVisitDiagnosisCodes.DiagnosisCode")
                                            .Include("PatientVisitProcedureCodes").Include("PatientVisitProcedureCodes.ProcedureCode")
                                            .Where(p => p.CaseId == CaseId
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                            .ToList<PatientVisit2>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit2> lstpatientvisit = new List<BO.PatientVisit2>();
                foreach (PatientVisit2 item in acc)
                {
                    lstpatientvisit.Add(Convert<BO.PatientVisit2, PatientVisit2>(item));
                }
                return lstpatientvisit;
            }
        }
        #endregion

        #region Get By Dates
        public override object GetByDoctorAndDates(int DoctorId, DateTime FromDate, DateTime ToDate)
        {
            if (ToDate == ToDate.Date)
            {
                ToDate = ToDate.AddDays(1);
            }

            List<PatientVisit2> lstPatientVisit = _context.PatientVisit2.Include("Patient2").Include("Patient2.User").Include("Patient2.PatientInsuranceInfoes")
                                                                        .Include("Case").Include("Case.PatientAccidentInfoes")
                                                                        .Where(p => p.DoctorId == DoctorId
                                                                                 && p.EventStart >= FromDate && p.EventStart < ToDate
                                                                                && (p.Patient2.IsDeleted.HasValue == false || (p.Patient2.IsDeleted.HasValue == true && p.Patient2.IsDeleted.Value == false))
                                                                                && (p.Case.IsDeleted.HasValue == false || (p.Case.IsDeleted.HasValue == true && p.Case.IsDeleted.Value == false))
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<PatientVisit2>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visits found for these Date range.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit2> lstBOPatientVisit = new List<BO.PatientVisit2>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit2, PatientVisit2>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region Get By Name
        public override object GetByDoctorDatesAndName(int DoctorId, DateTime FromDate, DateTime ToDate, string Name)
        {
            List<string> names = Name.Trim().Split(' ').ToList();
            List<string> names2 = new List<string>();
            foreach (var name in names)
            {
                if (string.IsNullOrEmpty(name.Trim()) == false)
                {
                    names2.Add(name.Trim());
                }
            }

            var userId = _context.Users.Where(p => names2.Contains(p.FirstName) || names2.Contains(p.MiddleName) || names2.Contains(p.LastName)
                                                   && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                  .Select(p => p.id);

            List<PatientVisit2> lstPatientVisit = _context.PatientVisit2.Include("Patient2").Include("Patient2.User").Include("Patient2.PatientInsuranceInfoes")
                                                                       .Include("Case").Include("Case.PatientAccidentInfoes")
                                                                       .Where(p => p.DoctorId == DoctorId
                                                                                && ((p.PatientId.HasValue == true) && (userId.Contains(p.PatientId.Value)))
                                                                                && p.EventStart >= FromDate && p.EventStart < ToDate
                                                                                && (p.Patient2.IsDeleted.HasValue == false || (p.Patient2.IsDeleted.HasValue == true && p.Patient2.IsDeleted.Value == false))
                                                                                && (p.Case.IsDeleted.HasValue == false || (p.Case.IsDeleted.HasValue == true && p.Case.IsDeleted.Value == false))
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                .ToList<PatientVisit2>();


            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visits found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit2> lstBOPatientVisit = new List<BO.PatientVisit2>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit2, PatientVisit2>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        //#region AddUploadedFileData
        //public override object AddUploadedFileData(int id, string FileUploadPath)
        //{

        //    PatientVisit2 patientVisitDB = new PatientVisit2();

        //    patientVisitDB = _context.PatientVisit2.Where(p => p.Id == id
        //                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
        //                                           .FirstOrDefault<PatientVisit2>();
        //    if (patientVisitDB != null)
        //    {
        //        patientVisitDB.FileUploadPath = FileUploadPath;
        //    }
        //    else
        //    {
        //        return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
        //    }

        //    _context.Entry(patientVisitDB).State = System.Data.Entity.EntityState.Modified;
        //    _context.SaveChanges();

        //    var res = Convert<BO.PatientVisit2, PatientVisit2>(patientVisitDB);
        //    return (object)res;
        //}
        //#endregion

        //#region Get By GetDocumentList
        //public override object GetDocumentList(int id)
        //{
        //    var acc = _context.PatientVisit2.Where(p => p.Id == id
        //                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
        //                                    .FirstOrDefault<PatientVisit2>();
        //    BO.PatientVisit2 acc_ = Convert<BO.PatientVisit2, PatientVisit2>(acc);

        //    Dictionary<string, object> Document = new Dictionary<string, object>();
        //    if (acc_ != null)
        //    {
        //        Document.Add("id", acc_.ID);
        //        Document.Add("fileUploadPath", acc_.FileUploadPath);
        //    }
        //    if (acc_ == null)
        //    {
        //        return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
        //    }

        //    return (object)Document;
        //}
        //#endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.PatientVisit2.Include("Location").Include("Location.Company")
                                            .Include("Doctor")
                                            .Include("Doctor.User")
                                            .Include("Room").Include("Room.RoomTest")
                                            .Include("Specialty")
                                            .Include("PatientVisitDiagnosisCodes").Include("PatientVisitDiagnosisCodes.DiagnosisCode")
                                            .Include("PatientVisitProcedureCodes").Include("PatientVisitProcedureCodes.ProcedureCode")
                                            .Where(p => p.Id == id
                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                            .FirstOrDefault<PatientVisit2>();

            BO.PatientVisit2 acc_ = Convert<BO.PatientVisit2, PatientVisit2>(acc);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region Get By PatientId And LocationId
        public override object GetByPatientIdAndLocationId(int PatientId, int LocationId)
        {
            int caseId = _context.Cases.Where(p => p.PatientId == PatientId && p.CaseStatusId == 1
                                                  && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                       .Select(p => p.Id).FirstOrDefault();

            List<PatientVisit2> lstPatientVisit = _context.PatientVisit2.Include("CalendarEvent")
                                                                        .Where(p => ((p.CaseId.HasValue == true) && (caseId > 0) && (p.CaseId.Value == caseId))
                                                                                && (LocationId <= 0 || p.LocationId == LocationId)
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<PatientVisit2>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Patient and Location Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit2> lstBOPatientVisit = new List<BO.PatientVisit2>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit2, PatientVisit2>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region Get Location For PatientId
        public override object GetLocationForPatientId(int PatientId)
        {
            int caseId = _context.Cases.Where(p => p.PatientId == PatientId && p.CaseStatusId == 1
                                                  && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                       .Select(p => p.Id).FirstOrDefault();

            List<PatientVisit2> lstPatientVisit = _context.PatientVisit2.Include("CalendarEvent")
                                                                        .Include("Location")
                                                                        .Include("Location.Company")
                                                                        .Where(p => ((p.CaseId.HasValue == true) && (caseId > 0) && (p.CaseId.Value == caseId))
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<PatientVisit2>();


            IEnumerable<Location> Locations = lstPatientVisit.Select(p => p.Location).ToList().Distinct();


            if (Locations == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No location found for this Patient Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Location> lstBOLocation = new List<BO.Location>();

                foreach (var eachLocation in Locations)
                {
                    lstBOLocation.Add(Convert<BO.Location, Location>(eachLocation));
                }

                return lstBOLocation;
            }
        }
        #endregion

        #region Delete
        public override object Delete(int id)
        {
            PatientVisit2 patientVisit2DB = new PatientVisit2();

            patientVisit2DB = _context.PatientVisit2.Where(p => p.Id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault();

            if (patientVisit2DB != null)
            {
                patientVisit2DB.IsDeleted = true;
                _context.SaveChanges();
            }
            else
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "No record found.", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.PatientVisit2, PatientVisit2>(patientVisit2DB);
            return (object)res;
        }
        #endregion

        #region Get VisitsBy PatientId
        public override object GetVisitsByPatientId(int PatientId)
        {
            var acc = _context.PatientVisit2.Include("CalendarEvent")
                                            .Include("Location")
                                            .Include("Doctor")
                                            .Include("Doctor.User")
                                            .Include("Room")
                                            .Include("Room.RoomTest")
                                            .Include("Patient2")
                                            .Include("Patient2.User")
                                            .Where(p => p.PatientId == PatientId
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                            .ToList<PatientVisit2>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Patient Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
               // List<BO.PatientVisit2> lstpatientvisit = new List<BO.PatientVisit2>();
                BO.mPatientVisits mpatientVisits = new BO.mPatientVisits();
                List<BO.mPatientVisits> lstmpatientVisits = new List<BO.mPatientVisits>();
                foreach (PatientVisit2 item in acc)
                {
                    lstmpatientVisits.Add(GetByvisitsConvert<BO.mPatientVisits, PatientVisit2>(item));
                }
                return lstmpatientVisits;
            }
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
