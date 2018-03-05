﻿using MIDAS.GBX.EntityRepository;
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

using Ical.Net;
using Ical.Net.DataTypes;
using Ical.Net.Serialization.iCalendar.Serializers;
using Ical.Net.Serialization;
using Ical.Net.Interfaces.DataTypes;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class PatientVisitRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<PatientVisit> _dbpatientVisit;
        private Dictionary<string, string> dictionary = new Dictionary<string, string>();

        public PatientVisitRepository(MIDASGBXEntities context) : base(context)
        {
            _dbpatientVisit = context.Set<PatientVisit>();
            context.Configuration.ProxyCreationEnabled = false;
            dictionary.Add("rageesh@hotmail.com", "+14252602856");
            dictionary.Add("slaxman@greenyourbills.com", "+19144004328");
            dictionary.Add("vgaonkar@greenyourbills.com", "+19147879623");
            dictionary.Add("midaspatientuser1@outlook.com", "+919022775974");
            dictionary.Add("midaspatientuser2@outlook.com", "+917977935408");
        }

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.PatientVisit patientVisit = (BO.PatientVisit)(object)entity;
            var result = patientVisit.Validate(patientVisit);
            return result;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            if (entity is PatientVisit)
            {
                PatientVisit patientVisit = entity as PatientVisit;
                
                if (patientVisit == null)
                    return default(T);

                BO.PatientVisit patientVisitBO = new BO.PatientVisit();
                patientVisitBO.ID = patientVisit.Id;
                patientVisitBO.CalendarEventId = patientVisit.CalendarEventId;
                patientVisitBO.CaseId = patientVisit.CaseId;
                patientVisitBO.PatientId = patientVisit.PatientId;
                patientVisitBO.LocationId = patientVisit.LocationId;
                patientVisitBO.RoomId = patientVisit.RoomId;
                patientVisitBO.DoctorId = patientVisit.DoctorId;
                patientVisitBO.SpecialtyId = patientVisit.SpecialtyId;
                patientVisitBO.EventStart = patientVisit.EventStart;
                patientVisitBO.EventEnd = patientVisit.EventEnd;
                patientVisitBO.Notes = patientVisit.Notes;
                patientVisitBO.VisitStatusId = patientVisit.VisitStatusId;
                //patientVisitBO.VisitType = patientVisit.VisitType;
                patientVisitBO.IsOutOfOffice = patientVisit.IsOutOfOffice;
                patientVisitBO.LeaveStartDate = patientVisit.LeaveStartDate;
                patientVisitBO.LeaveEndDate = patientVisit.LeaveEndDate;
                patientVisitBO.IsTransportationRequired = patientVisit.IsTransportationRequired;
                patientVisitBO.TransportProviderId = patientVisit.TransportProviderId;
                patientVisitBO.AncillaryProviderId = patientVisit.AncillaryProviderId;
                patientVisitBO.VisitTypeId = patientVisit.VisitTypeId;
                patientVisitBO.VisitTimeStatus = patientVisit.VisitTimeStatus;
                patientVisitBO.IsCancelled = patientVisit.IsCancelled;
                patientVisitBO.IsDeleted = patientVisit.IsDeleted;
                patientVisitBO.CreateByUserID = patientVisit.CreateByUserID;
                patientVisitBO.UpdateByUserID = patientVisit.UpdateByUserID;
                if (patientVisit.EventStart != null)
                {
                    if (patientVisit.CreateDate.Date < System.DateTime.Now.Date)
                    {
                        patientVisitBO.VisitUpdateStatus = false;
                    }
                    else
                    {
                        patientVisitBO.VisitUpdateStatus = true;
                    }
                }
                else
                {
                    patientVisitBO.VisitUpdateStatus = true;
                }

                if (patientVisit.Patient != null)
                {
                    BO.Patient PatientBO = new BO.Patient();
                    using (PatientRepository patientRepo = new PatientRepository(_context))
                    {
                        PatientBO = patientRepo.Convert<BO.Patient, Patient>(patientVisit.Patient);
                        patientVisitBO.Patient = PatientBO;
                    }
                }

                if (patientVisit.Case != null)
                {
                    BO.Case CaseBO = new BO.Case();
                    using (CaseRepository caseRepo = new CaseRepository(_context))
                    {
                        CaseBO = caseRepo.Convert<BO.Case, Case>(patientVisit.Case);
                        patientVisitBO.Case = CaseBO;

                        if (patientVisit.Case.PatientAccidentInfoes != null && patientVisit.Case.PatientAccidentInfoes.Count > 0)
                        {
                            List<BO.PatientAccidentInfo> PatientAccidentInfoBOList = new List<BO.PatientAccidentInfo>();
                            using (PatientAccidentInfoRepository patientAccidentInfoRepo = new PatientAccidentInfoRepository(_context))
                            {
                                foreach (PatientAccidentInfo eachPatientInsuranceInfo in patientVisit.Case.PatientAccidentInfoes)
                                {
                                    if (eachPatientInsuranceInfo.IsDeleted.HasValue == false || (eachPatientInsuranceInfo.IsDeleted.HasValue == true && eachPatientInsuranceInfo.IsDeleted.Value == false))
                                    {
                                        PatientAccidentInfoBOList.Add(patientAccidentInfoRepo.Convert<BO.PatientAccidentInfo, PatientAccidentInfo>(eachPatientInsuranceInfo));
                                    }
                                }

                                patientVisitBO.Case.PatientAccidentInfoes = PatientAccidentInfoBOList;
                            }
                        }
                    }
                }

                if (patientVisit.Doctor != null)
                {
                    BO.Doctor boDoctor = new BO.Doctor();
                    using (DoctorRepository cmp = new DoctorRepository(_context))
                    {
                        boDoctor = cmp.Convert<BO.Doctor, Doctor>(patientVisit.Doctor);
                        patientVisitBO.Doctor = boDoctor;
                    }
                }

                if (patientVisit.Room != null)
                {
                    BO.Room boRoom = new BO.Room();
                    using (RoomRepository cmp = new RoomRepository(_context))
                    {
                        boRoom = cmp.Convert<BO.Room, Room>(patientVisit.Room);
                        patientVisitBO.Room = boRoom;
                    }
                }

                if (patientVisit.Specialty != null)
                {
                    BO.Specialty boSpecialty = new BO.Specialty();
                    using (SpecialityRepository cmp = new SpecialityRepository(_context))
                    {
                        boSpecialty = cmp.Convert<BO.Specialty, Specialty>(patientVisit.Specialty);
                        patientVisitBO.Specialty = boSpecialty;
                    }
                }

                if (patientVisit.Location != null)
                {
                    BO.Location boLocation = new BO.Location();
                    using (LocationRepository cmp = new LocationRepository(_context))
                    {
                        boLocation = cmp.Convert<BO.Location, Location>(patientVisit.Location);
                        patientVisitBO.Location = boLocation;
                    }
                }

                if (patientVisit.CalendarEvent != null)
                {
                    patientVisitBO.CalendarEvent = new BO.CalendarEvent();

                    using (CalendarEventRepository calEventRep = new CalendarEventRepository(_context))
                    {
                        patientVisitBO.CalendarEvent = calEventRep.Convert<BO.CalendarEvent, CalendarEvent>(patientVisit.CalendarEvent);
                    }
                }

                if (patientVisit.PatientVisitDiagnosisCodes != null)
                {
                    List<BO.PatientVisitDiagnosisCode> BOpatientVisitDiagnosisCode = new List<BO.PatientVisitDiagnosisCode>();
                    foreach (var eachVisitDiagnosis in patientVisit.PatientVisitDiagnosisCodes)
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

                    patientVisitBO.PatientVisitDiagnosisCodes = BOpatientVisitDiagnosisCode;
                }

                if (patientVisit.PatientVisitProcedureCodes != null)
                {
                    List<BO.PatientVisitProcedureCode> BOpatientVisitProcedureCode = new List<BO.PatientVisitProcedureCode>();
                    foreach (var eachVisitProcedure in patientVisit.PatientVisitProcedureCodes)
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

                    patientVisitBO.PatientVisitProcedureCodes = BOpatientVisitProcedureCode;
                }


                return (T)(object)patientVisitBO;
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
                    if (location.Company.SubscriptionPlanType != null)
                    {
                        boCompany.SubsCriptionType = (BO.GBEnums.SubsCriptionType)location.Company.SubscriptionPlanType;
                    }
                    else
                    {
                        boCompany.SubsCriptionType = null;
                    }

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
            PatientVisit patientVisit = entity as PatientVisit;

            if (patientVisit == null)
                return default(T);

            BO.mPatientVisits mpatientVisits = new BO.mPatientVisits();

            mpatientVisits.ID = patientVisit.Id;
            mpatientVisits.CalendarEventId = patientVisit.CalendarEventId;
            mpatientVisits.CaseId = patientVisit.CaseId;
            mpatientVisits.PatientId = patientVisit.PatientId;
            mpatientVisits.LocationId = patientVisit.LocationId;
            mpatientVisits.RoomId = patientVisit.RoomId;
            mpatientVisits.DoctorId = patientVisit.DoctorId;
            mpatientVisits.SpecialtyId = patientVisit.SpecialtyId;
            mpatientVisits.VisitTypeId = patientVisit.VisitTypeId;

            if (patientVisit.Location != null)
            {
                if (patientVisit.Location.IsDeleted.HasValue == false || (patientVisit.Location.IsDeleted.HasValue == true && patientVisit.Location.IsDeleted.Value == false))
                {
                    mpatientVisits.LocationName = patientVisit.Location.Name;
                }
            }
            if (patientVisit.Room != null)
            {
                if (patientVisit.Room.IsDeleted.HasValue == false || (patientVisit.Room.IsDeleted.HasValue == true && patientVisit.Room.IsDeleted.Value == false))
                {
                    mpatientVisits.RoomName = patientVisit.Room.Name;
                    if (patientVisit.Room.RoomTest.IsDeleted.HasValue == false || (patientVisit.Room.RoomTest.IsDeleted.HasValue == true && patientVisit.Room.RoomTest.IsDeleted.Value == false))
                    {
                        if (patientVisit.Room.RoomTest != null)
                        {
                            mpatientVisits.RoomTestName = patientVisit.Room.RoomTest.Name;
                        }
                    }
                }
            }
           
            if (patientVisit.Doctor != null)
            {
                if (patientVisit.Doctor.IsDeleted.HasValue == false || (patientVisit.Doctor.IsDeleted.HasValue == true && patientVisit.Doctor.IsDeleted.Value == false))
                {
                    mpatientVisits.DoctorFirstName = patientVisit.Doctor.User.FirstName;
                    mpatientVisits.DoctorLastName = patientVisit.Doctor.User.LastName;
                }
            }
            if (patientVisit.Patient != null)
            {
                if (patientVisit.Patient.IsDeleted.HasValue == false || (patientVisit.Patient.IsDeleted.HasValue == true && patientVisit.Patient.IsDeleted.Value == false))
                {
                    mpatientVisits.PatientFirstName = patientVisit.Patient.User.FirstName;
                    mpatientVisits.PatientLastName = patientVisit.Patient.User.LastName;
                }
            }
            if (patientVisit.CalendarEvent != null)
            {
                if (patientVisit.CalendarEvent.IsDeleted.HasValue == false || (patientVisit.CalendarEvent.IsDeleted.HasValue == true && patientVisit.CalendarEvent.IsDeleted.Value == false))
                {
                    using (CalendarEventRepository calEventRep = new CalendarEventRepository(_context))
                    {
                        mpatientVisits.CalendarEvent = calEventRep.Convert<BO.CalendarEvent, CalendarEvent>(patientVisit.CalendarEvent);
                    }
                }
            }

            mpatientVisits.IsDeleted = patientVisit.IsDeleted;
            mpatientVisits.CreateByUserID = patientVisit.CreateByUserID;
            mpatientVisits.UpdateByUserID = patientVisit.UpdateByUserID;
                        
            return (T)(object)mpatientVisits;
        }

        #endregion

        #region Get By Location Id
        public override object GetByLocationId(int id)
        {
            List<PatientVisit> lstPatientVisit = _context.PatientVisits.Include("CalendarEvent")
                                                                        .Include("Patient")
                                                                        .Include("Patient.User")
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
                                                                        .ToList<PatientVisit>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit> lstBOPatientVisit = new List<BO.PatientVisit>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit, PatientVisit>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region Get By Location Id And Room Id
        public override object Get(int LocationId, int RoomId)
        {
            List<PatientVisit> lstPatientVisit = _context.PatientVisits.Include("Location").Include("Location.Company")
                                                                        .Include("CalendarEvent")
                                                                        .Include("Patient")
                                                                        .Include("Patient.User")
                                                                        .Include("Case")
                                                                        .Include("Doctor")
                                                                        .Include("Doctor.User")
                                                                        .Include("Room").Include("Room.RoomTest")
                                                                        .Include("Specialty")
                                                                        .Include("PatientVisitDiagnosisCodes").Include("PatientVisitDiagnosisCodes.DiagnosisCode")
                                                                        .Include("PatientVisitProcedureCodes").Include("PatientVisitProcedureCodes.ProcedureCode")
                                                                        .Where(p => p.LocationId == LocationId && p.RoomId == RoomId
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<PatientVisit>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location Id and Room Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit> lstBOPatientVisit = new List<BO.PatientVisit>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit, PatientVisit>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region Get By Location Id, Doctor Id & Room Id
        public override object GetByLocationDoctorAndRoomId(int LocationId, int DoctorId, int RoomId)
        {
            List<PatientVisit> lstPatientVisit = _context.PatientVisits.Include("Location").Include("Location.Company")
                                                                        .Include("CalendarEvent")
                                                                        .Include("Patient")
                                                                        .Include("Patient.User")
                                                                        .Include("Case")
                                                                        .Include("Doctor")
                                                                        .Include("Doctor.User")
                                                                        .Include("Room").Include("Room.RoomTest")
                                                                        .Include("Specialty")
                                                                        .Include("PatientVisitDiagnosisCodes").Include("PatientVisitDiagnosisCodes.DiagnosisCode")
                                                                        .Include("PatientVisitProcedureCodes").Include("PatientVisitProcedureCodes.ProcedureCode")
                                                                        .Where(p => p.LocationId == LocationId && p.DoctorId == DoctorId && p.RoomId == RoomId
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<PatientVisit>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location Id and Room Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit> lstBOPatientVisit = new List<BO.PatientVisit>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit, PatientVisit>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region Get By Location Id, Patient Id And Room Id
        public override object GetByLocationRoomAndPatientId(int locationId, int roomId, int patientId)
        {
            List<PatientVisit> lstPatientVisit = _context.PatientVisits.Include("CalendarEvent")
                                                                        .Include("Patient")
                                                                        .Include("Patient.User")
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
                                                                        .ToList<PatientVisit>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location Id, Room Id And Patient Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit> lstBOPatientVisit = new List<BO.PatientVisit>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit, PatientVisit>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region Get By Location Id And Doctor Id
        public override object Get2(int LocationId, int DoctorId)
        {
            List<PatientVisit> lstPatientVisit = _context.PatientVisits.Include("Location").Include("Location.Company")
                                                                        .Include("CalendarEvent")
                                                                        .Include("Patient")
                                                                        .Include("Patient.User")
                                                                        .Include("Case")
                                                                        .Include("Doctor")
                                                                        .Include("Doctor.User")
                                                                        .Include("Room").Include("Room.RoomTest")
                                                                        .Include("Specialty")
                                                                        .Include("PatientVisitDiagnosisCodes").Include("PatientVisitDiagnosisCodes.DiagnosisCode")
                                                                        .Include("PatientVisitProcedureCodes").Include("PatientVisitProcedureCodes.ProcedureCode")
                                                                        .Where(p => p.LocationId == LocationId && p.DoctorId == DoctorId
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<PatientVisit>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location Id and Doctor Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit> lstBOPatientVisit = new List<BO.PatientVisit>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit, PatientVisit>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region Get By Ancillary Id
        public override object GetByAncillaryId(int AncillaryId)
        {
            List<PatientVisit> lstPatientVisit = _context.PatientVisits.Include("Location")
                                                                        .Include("Location.Company")
                                                                        .Include("Location.ContactInfo")
                                                                        .Include("CalendarEvent")
                                                                        .Include("Patient")
                                                                        .Include("Patient.User")
                                                                        .Include("Case")
                                                                        .Include("Doctor")
                                                                        .Include("Doctor.User")
                                                                        .Include("Room").Include("Room.RoomTest")
                                                                        .Include("Specialty")
                                                                        .Include("PatientVisitDiagnosisCodes").Include("PatientVisitDiagnosisCodes.DiagnosisCode")
                                                                        .Include("PatientVisitProcedureCodes").Include("PatientVisitProcedureCodes.ProcedureCode")
                                                                        .Where(p => p.AncillaryProviderId == AncillaryId
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<PatientVisit>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Company Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit> lstBOPatientVisit = new List<BO.PatientVisit>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit, PatientVisit>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region Get By Location Id And Patient Id
        public override object GetByLocationAndPatientId(int LocationId, int PatientId)
        {
            List<PatientVisit> lstPatientVisit = _context.PatientVisits.Include("CalendarEvent")
                                                                        .Include("Patient")
                                                                        .Include("Patient.User")
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
                                                                        .ToList<PatientVisit>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location Id and Patient Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit> lstBOPatientVisit = new List<BO.PatientVisit>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit, PatientVisit>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region Get By Location Id, Doctor Id And Patient Id
        public override object GetByLocationDoctorAndPatientId(int locationId, int doctorId, int patientId)
        {
            List<PatientVisit> lstPatientVisit = _context.PatientVisits.Include("CalendarEvent")
                                                                        .Include("Patient")
                                                                        .Include("Patient.User")
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
                                                                        .ToList<PatientVisit>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location Id, Doctor Id and Patient Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit> lstBOPatientVisit = new List<BO.PatientVisit>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit, PatientVisit>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region GetByPatientId
        public override object GetByPatientId(int patientId)
        {
            List<PatientVisit> lstPatientVisit = _context.PatientVisits.Include("CalendarEvent")
                                                                        .Include("Patient")
                                                                        .Include("Patient.User")
                                                                        .Include("Case")
                                                                        .Include("Doctor")
                                                                        .Include("Doctor.User")
                                                                        .Include("Room").Include("Room.RoomTest")
                                                                        .Include("Location").Include("Location.Company")
                                                                        .Include("Specialty")
                                                                        .Include("PatientVisitDiagnosisCodes").Include("PatientVisitDiagnosisCodes.DiagnosisCode")
                                                                        .Include("PatientVisitProcedureCodes").Include("PatientVisitProcedureCodes.ProcedureCode")
                                                                        .Where(p => p.Case.PatientId == patientId
                                                                                && p.Case.CaseStatusId == 1 //1-- Open
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<PatientVisit>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location Id, Doctor Id and Patient Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit> lstBOPatientVisit = new List<BO.PatientVisit>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit, PatientVisit>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region Get By Doctor Id
        public override object GetByDoctorId(int id)
        {
            List<PatientVisit> lstPatientVisit = _context.PatientVisits.Include("CalendarEvent")                                                                       
                                                                        .Where(p => p.DoctorId == id
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<PatientVisit>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Doctor Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit> lstBOPatientVisit = new List<BO.PatientVisit>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit, PatientVisit>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.PatientVisit patientVisitBO = (BO.PatientVisit)(object)entity;
            BO.CalendarEvent CalendarEventBO = patientVisitBO.CalendarEvent;
            List<BO.PatientVisitDiagnosisCode> PatientVisitDiagnosisCodeBOList = patientVisitBO.PatientVisitDiagnosisCodes;
            List<BO.PatientVisitProcedureCode> PatientVisitProcedureCodeBOList = patientVisitBO.PatientVisitProcedureCodes;
            string patientUserName = string.Empty;
            bool sendNotification = false;
            bool sendNotificationMessage = false;
            int? CompanyId = null;
            bool sendnotificationtodr = false;
            int? DoctorIdOld = null;
            PatientVisit patientVisitDB = new PatientVisit();
            PatientVisit patientVisitDBOld = new PatientVisit();

            if (CalendarEventBO != null)
            {
                List<BO.FreeSlots> currentEventSlots = new List<BO.FreeSlots>();
                CalendarEventRepository calEventRepo = new CalendarEventRepository(_context);
                currentEventSlots = calEventRepo.GetBusySlotsByCalendarEvent(CalendarEventBO) as List<BO.FreeSlots>;
                if (currentEventSlots.Count > 0)
                {
                    DateTime dtStartDate = currentEventSlots.Min(p => p.ForDate);
                    DateTime dtEndDate = currentEventSlots.Max(p => p.ForDate).AddDays(1);

                    List<BO.FreeSlots> freeSlots = new List<BO.FreeSlots>();

                    if (patientVisitBO.DoctorId != null && patientVisitBO.LocationId != null)
                    {
                        //freeSlots = calEventRepo.GetFreeSlotsForDoctorByLocationId(patientVisitBO.DoctorId.Value, patientVisitBO.LocationId.Value, dtStartDate, dtEndDate) as List<BO.FreeSlots>;
                        var result = calEventRepo.GetFreeSlotsForDoctorByLocationId(patientVisitBO.DoctorId.Value, patientVisitBO.LocationId.Value, dtStartDate, dtEndDate);
                        if (result is BO.ErrorObject)
                        {
                            return result;
                        }
                        else
                        {
                            freeSlots = result as List<BO.FreeSlots>;
                        }
                    }
                    else if (patientVisitBO.RoomId != null && patientVisitBO.LocationId != null)
                    {
                        //freeSlots = calEventRepo.GetFreeSlotsForRoomByLocationId(patientVisitBO.RoomId.Value, patientVisitBO.LocationId.Value, dtStartDate, dtEndDate) as List<BO.FreeSlots>;
                        var result = calEventRepo.GetFreeSlotsForRoomByLocationId(patientVisitBO.RoomId.Value, patientVisitBO.LocationId.Value, dtStartDate, dtEndDate);
                        if (result is BO.ErrorObject)
                        {
                            return result;
                        }
                        else
                        {
                            freeSlots = result as List<BO.FreeSlots>;
                        }
                    }

                    foreach (var eachDayEventSlot in currentEventSlots)
                    {
                        DateTime ForDate = eachDayEventSlot.ForDate;
                        foreach (var eachEventSlot in eachDayEventSlot.StartAndEndTimes)
                        {
                            DateTime StartTime = eachEventSlot.StartTime;
                            DateTime EndTime = eachEventSlot.EndTime;
                            var StartAndEndTimesForDate = freeSlots.Where(p => p.ForDate == ForDate).Select(p => p.StartAndEndTimes).FirstOrDefault();
                            if (StartAndEndTimesForDate.Count > 0)
                            {
                                var StartAndEndTimes = StartAndEndTimesForDate.Where(p => p.StartTime >= StartTime && p.StartTime < EndTime).ToList();

                                if (StartAndEndTimes.Count > 0)
                                {
                                    DateTime? checkContinuation = null;
                                    foreach (var eachSlot in StartAndEndTimes.Distinct().OrderBy(p => p.StartTime))
                                    {
                                        if (checkContinuation.HasValue == false)
                                        {
                                            checkContinuation = eachSlot.EndTime;
                                        }
                                        else
                                        {
                                            if (checkContinuation.Value != eachSlot.StartTime)
                                            {
                                                return new BO.ErrorObject { errorObject = "", ErrorMessage = "The doctor or room dosent have continued free slots on the planned visit time of " + checkContinuation.Value.ToString() + ".", ErrorLevel = ErrorLevel.Error };
                                            }
                                            else
                                            {
                                                checkContinuation = eachSlot.EndTime;
                                            }
                                        }
                                    }
                                }
                                else
                                {
                                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "The doctor or room dosent have free slots on the planned visit time of " + ForDate.ToShortDateString() + " (" + StartTime.ToShortTimeString() + " - " + EndTime.ToShortTimeString() + ").", ErrorLevel = ErrorLevel.Error };
                                }
                            }
                            else
                            {
                                return new BO.ErrorObject { errorObject = "", ErrorMessage = "The doctor or room is not availabe on " + ForDate.ToShortDateString() + ".", ErrorLevel = ErrorLevel.Error };
                            }
                        }
                    }
                }
            }

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                patientVisitDBOld = _context.PatientVisits.Where(p => p.Id == patientVisitBO.ID
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault<PatientVisit>();
                if(patientVisitDBOld != null)
                {
                    DoctorIdOld = patientVisitDBOld.DoctorId;
                }
                
                bool IsEditMode = false;
                bool IsAddModeCalendarEvent = false;
                IsEditMode = (patientVisitBO != null && patientVisitBO.ID > 0) ? true : false;
                string patientContactNumber = null;
                User patientuser = null;


                if (patientVisitBO.PatientId == null && patientVisitBO.ID > 0)
                {
                    var patientvisitData = _context.PatientVisits.Where(p => p.Id == patientVisitBO.ID).Select(p => new { p.PatientId, p.CaseId }).FirstOrDefault();
                    patientuser = _context.Users.Where(usr => usr.id == patientvisitData.PatientId).Include("ContactInfo").FirstOrDefault();
                }
                else if (patientVisitBO.PatientId != null && patientVisitBO.PatientId > 0)
                {
                    patientuser = _context.Users.Where(usr => usr.id == patientVisitBO.PatientId).Include("ContactInfo").FirstOrDefault();
                }

                if (patientuser != null)
                {
                    patientUserName = patientuser.UserName;
                    patientContactNumber = patientuser.ContactInfo.CellPhone;
                }

                if (IsEditMode == false)
                {
                    if (patientVisitBO.IsOutOfOffice != true && patientVisitBO.PatientId == null)
                    {
                        if (patientVisitBO.CaseId.HasValue == false && patientVisitBO.LocationId.HasValue == false && patientVisitBO.RoomId.HasValue == false
                            && patientVisitBO.DoctorId.HasValue == false && patientVisitBO.SpecialtyId.HasValue == false)
                        {
                        }
                        else
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass caseId and PatientId.", ErrorLevel = ErrorLevel.Error };
                        }
                    }
                }
                if (patientVisitBO.ID <= 0 && patientVisitBO.PatientId.HasValue == false && patientVisitBO.LocationId.HasValue == false)
                {
                    IsEditMode = (CalendarEventBO != null && CalendarEventBO.ID > 0) ? true : false;
                    IsAddModeCalendarEvent = (CalendarEventBO != null && CalendarEventBO.ID > 0) ? false : true;
                }

                if (IsEditMode == false)
                {
                    if (patientVisitBO.VisitStatusId != 2 && patientVisitBO.VisitStatusId != 4)
                    {
                        if(patientVisitBO.SpecialtyId != null)
                        {  
                        Specialty specialdetail = _context.Specialties.Where(p => p.id == patientVisitBO.SpecialtyId).FirstOrDefault<Specialty>();
                        CompanySpecialtyDetail companyspecialtydetail = _context.CompanySpecialtyDetails.Where(p => p.SpecialtyId == patientVisitBO.SpecialtyId && p.CompanyID == patientVisitBO.AddedByCompanyId).FirstOrDefault<CompanySpecialtyDetail>();
                            if (companyspecialtydetail == null)
                            {
                                var lstPatientVisitDB = _context.PatientVisits.Include("CalendarEvent")
                                                                     .Where(p => (DbFunctions.TruncateTime(p.CalendarEvent.EventStart) == DbFunctions.TruncateTime(CalendarEventBO.EventStart.Value) && p.PatientId == patientVisitBO.PatientId && p.SpecialtyId == patientVisitBO.SpecialtyId && p.CalendarEvent.RecurrenceRule == "")
                                                                             && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)) && (p.IsCancelled.HasValue == false || (p.IsCancelled.HasValue == true && p.IsCancelled.Value == false)))
                                                                            .ToList<PatientVisit>();

                                var lstPatientVisitDBRecurrening = _context.PatientVisits.Include("CalendarEvent")
                                                                 .Where(p => (DbFunctions.TruncateTime(p.CalendarEvent.EventStart) <= DbFunctions.TruncateTime(CalendarEventBO.EventStart.Value) && p.PatientId == patientVisitBO.PatientId && p.SpecialtyId == patientVisitBO.SpecialtyId && p.CalendarEvent.RecurrenceRule != "")
                                                                         && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)) && (p.IsCancelled.HasValue == false || (p.IsCancelled.HasValue == true && p.IsCancelled.Value == false)))
                                                                        .ToList<PatientVisit>();

                                if (lstPatientVisitDB != null)
                                {
                                    if (lstPatientVisitDB.Count > 0)
                                    {
                                        dbContextTransaction.Rollback();
                                        if (specialdetail != null)
                                        {
                                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Multiple Visit has set as No for " + specialdetail.Name + " specialty, Please update the specialty details in Account Setup  -> Specialities", ErrorLevel = ErrorLevel.Error };
                                        }
                                        else
                                        {
                                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Multiple Visit has set as No for this specialty, Please update the specialty details in in Account Setup  -> Specialities", ErrorLevel = ErrorLevel.Error };
                                        }
                                    }
                                }

                                foreach (PatientVisit pv in lstPatientVisitDBRecurrening)
                                {
                                    var calendarevents = _context.CalendarEvents.Where(p => p.Id == pv.CalendarEventId).FirstOrDefault<CalendarEvent>();

                                    var RecurrenceRule = calendarevents.RecurrenceRule;
                                    if (RecurrenceRule != "")
                                    {
                                        var calendar = new Calendar();
                                        RecurrencePattern rr = new RecurrencePattern(RecurrenceRule);
                                        Event evt = new Event();
                                        evt.RecurrenceRules.Add(rr);
                                        evt.Start = new CalDateTime(calendarevents.EventStart, "UTC");
                                        evt.End = new CalDateTime(calendarevents.EventEnd, "UTC");
                                        calendar.Events.Add(evt);
                                        var Occurrences = calendar.GetOccurrences(calendarevents.EventStart.AddYears(-1), calendarevents.EventEnd.AddYears(1));
                                        foreach (var eachOccurrences in Occurrences)
                                        {
                                            if (eachOccurrences.Period.StartTime.Date == CalendarEventBO.EventStart.Value.Date)
                                            {
                                                dbContextTransaction.Rollback();
                                                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Multiple Visit has set as No for " + specialdetail.Name + " specialty, Please update the specialty details in Account Setup  -> Specialities", ErrorLevel = ErrorLevel.Error };
                                            }
                                        }
                                    }
                                }

                            }
                            else
                            {
                                if (companyspecialtydetail.AllowMultipleVisit == false)
                                {

                                    var lstPatientVisitDB = _context.PatientVisits.Include("CalendarEvent")
                                                                     .Where(p => (DbFunctions.TruncateTime(p.CalendarEvent.EventStart) == DbFunctions.TruncateTime(CalendarEventBO.EventStart.Value) && p.PatientId == patientVisitBO.PatientId && p.SpecialtyId == patientVisitBO.SpecialtyId && p.CalendarEvent.RecurrenceRule == "")
                                                                             && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)) && (p.IsCancelled.HasValue == false || (p.IsCancelled.HasValue == true && p.IsCancelled.Value == false)))
                                                                            .ToList<PatientVisit>();

                                    var lstPatientVisitDBRecurrening = _context.PatientVisits.Include("CalendarEvent")
                                                                     .Where(p => (DbFunctions.TruncateTime(p.CalendarEvent.EventStart) <= DbFunctions.TruncateTime(CalendarEventBO.EventStart.Value) && p.PatientId == patientVisitBO.PatientId && p.SpecialtyId == patientVisitBO.SpecialtyId && p.CalendarEvent.RecurrenceRule != "")
                                                                             && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)) && (p.IsCancelled.HasValue == false || (p.IsCancelled.HasValue == true && p.IsCancelled.Value == false)))
                                                                            .ToList<PatientVisit>();

                                    if (lstPatientVisitDB != null)
                                    {
                                        if (lstPatientVisitDB.Count > 0)
                                        {
                                            dbContextTransaction.Rollback();
                                            if (specialdetail != null)
                                            {
                                                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Multiple Visit has set as No for " + specialdetail.Name + " specialty, Please update the specialty details in Account Setup  -> Specialities", ErrorLevel = ErrorLevel.Error };
                                            }
                                            else
                                            {
                                                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Multiple Visit has set as No for this specialty, Please update the specialty details in in Account Setup  -> Specialities", ErrorLevel = ErrorLevel.Error };
                                            }
                                        }
                                    }


                                    foreach (PatientVisit pv in lstPatientVisitDBRecurrening)
                                    {
                                        var calendarevents = _context.CalendarEvents.Where(p => p.Id == pv.CalendarEventId).FirstOrDefault<CalendarEvent>();

                                        var RecurrenceRule = calendarevents.RecurrenceRule;
                                        if (RecurrenceRule != "")
                                        {
                                            var calendar = new Calendar();
                                            RecurrencePattern rr = new RecurrencePattern(RecurrenceRule);
                                            Event evt = new Event();
                                            evt.RecurrenceRules.Add(rr);
                                            evt.Start = new CalDateTime(calendarevents.EventStart, "UTC");
                                            evt.End = new CalDateTime(calendarevents.EventEnd, "UTC");
                                            calendar.Events.Add(evt);
                                            var Occurrences = calendar.GetOccurrences(calendarevents.EventStart.AddYears(-1), calendarevents.EventEnd.AddYears(1));
                                            foreach (var eachOccurrences in Occurrences)
                                            {
                                                if (eachOccurrences.Period.StartTime.Date == CalendarEventBO.EventStart.Value.Date)
                                                {
                                                    dbContextTransaction.Rollback();
                                                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Multiple Visit has set as No for " + specialdetail.Name + " specialty, Please update the specialty details in Account Setup  -> Specialities", ErrorLevel = ErrorLevel.Error };
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
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

                    if (string.IsNullOrWhiteSpace(patientUserName) == false && dictionary.ContainsKey(patientUserName))
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
                            //    body: "Your appointment has been scheduled at " + CalendarEventBO.EventStart.Value + " in " + _context.Locations.Where(loc => loc.id == patientVisitBO.LocationId).Select(lc => lc.Name).FirstOrDefault()
                            //    );

                            //string to = dictionary[patientUserName];
                            if (patientContactNumber != null && patientContactNumber != string.Empty)
                            {
                                string to = patientContactNumber;
                                string body = "Your appointment has been scheduled at " + CalendarEventBO.EventStart.Value + " in " + _context.Locations.Where(loc => loc.id == patientVisitBO.LocationId).Select(lc => lc.Name).FirstOrDefault();

                                string msgid = SMSGateway.SendSMS(to, body);
                            }
                        }
                    }
                    catch (Exception) { }
                    #endregion
                }
                else
                {
                    if (IsEditMode == false && patientVisitBO.CalendarEventId <= 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Calendar Event details.", ErrorLevel = ErrorLevel.Error };
                    }
                    CalendarEventDB = null;
                }
                #endregion

                #region Patient Visit
                if (patientVisitBO != null
                    && ((patientVisitBO.ID <= 0 && patientVisitBO.PatientId.HasValue == true && patientVisitBO.LocationId.HasValue == true)
                        || (patientVisitBO.ID > 0)
                        || (patientVisitBO.IsOutOfOffice == true)))
                {
                    bool Add_patientVisitDB = false;
                    patientVisitDB = _context.PatientVisits.Where(p => p.Id == patientVisitBO.ID
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault();

                    if (patientVisitDB == null && patientVisitBO.ID <= 0)
                    {
                        patientVisitDB = new PatientVisit();
                        Add_patientVisitDB = true;
                        sendNotificationMessage = true;
                    }
                    else if (patientVisitDB == null && patientVisitBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient Visit doesn't exists.", ErrorLevel = ErrorLevel.Error };
                    }
                    patientVisitDB.CalendarEventId = (CalendarEventDB != null && CalendarEventDB.Id > 0) ? CalendarEventDB.Id : ((patientVisitBO.CalendarEventId.HasValue == true) ? patientVisitBO.CalendarEventId.Value : patientVisitDB.CalendarEventId);

                    if (IsEditMode == false && patientVisitBO.CaseId.HasValue == false && patientVisitBO.IsOutOfOffice == false)
                    {
                        int CaseId = _context.Cases.Where(p => p.PatientId == patientVisitBO.PatientId.Value && p.CaseStatusId == 1
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .Select(p => p.Id)
                                                   .FirstOrDefault<int>();

                        if (CaseId == 0)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "No open case exists for given patient.", ErrorLevel = ErrorLevel.Error };
                        }
                        else if (patientVisitBO.CaseId.HasValue == true && patientVisitBO.CaseId.Value != CaseId)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Case id dosent match with open case is for the given patient.", ErrorLevel = ErrorLevel.Error };
                        }
                        else
                        {
                            patientVisitDB.CaseId = CaseId;
                        }
                    }
                    else
                    {
                        patientVisitDB.CaseId = patientVisitBO.CaseId.HasValue == false ? patientVisitDB.CaseId : patientVisitBO.CaseId.Value;
                    }

                    patientVisitDB.PatientId = IsEditMode == true && patientVisitBO.PatientId.HasValue == false ? patientVisitDB.PatientId : (patientVisitBO.PatientId.HasValue == false ? patientVisitDB.PatientId : patientVisitBO.PatientId.Value);
                    patientVisitDB.LocationId = IsEditMode == true && patientVisitBO.LocationId.HasValue == false ? patientVisitDB.LocationId : (patientVisitBO.LocationId.HasValue == false ? patientVisitDB.LocationId : patientVisitBO.LocationId.Value);
                    patientVisitDB.RoomId = patientVisitBO.RoomId;
                    patientVisitDB.DoctorId = patientVisitBO.DoctorId;
                    patientVisitDB.SpecialtyId = patientVisitBO.SpecialtyId;

                    patientVisitDB.EventStart = patientVisitBO.EventStart;
                    patientVisitDB.EventEnd = patientVisitBO.EventEnd;

                    patientVisitDB.Notes = patientVisitBO.Notes;
                    patientVisitDB.VisitStatusId = patientVisitBO.VisitStatusId;
                    //patientVisitDB.VisitType = patientVisitBO.VisitType;
                    patientVisitDB.IsOutOfOffice = patientVisitBO.IsOutOfOffice;
                    patientVisitDB.LeaveStartDate = patientVisitBO.LeaveStartDate;
                    patientVisitDB.LeaveEndDate = patientVisitBO.LeaveEndDate;
                    patientVisitDB.IsTransportationRequired = patientVisitBO.IsTransportationRequired;
                    patientVisitDB.TransportProviderId = patientVisitBO.TransportProviderId;
                    patientVisitDB.AncillaryProviderId = patientVisitBO.AncillaryProviderId;
                    patientVisitDB.VisitTypeId = patientVisitBO.VisitTypeId;

                    if (IsEditMode == false)
                    {
                        patientVisitDB.CreateByUserID = patientVisitBO.CreateByUserID;
                        patientVisitDB.CreateDate = DateTime.UtcNow;
                    }
                    else
                    {
                        patientVisitDB.UpdateByUserID = patientVisitBO.UpdateByUserID;
                        patientVisitDB.UpdateDate = DateTime.UtcNow;
                    }

                    if (Add_patientVisitDB == true)
                    {
                        patientVisitDB = _context.PatientVisits.Add(patientVisitDB);
                    }
                    _context.SaveChanges();

                    if (patientVisitDB.PatientId.HasValue == true && patientVisitDB.CaseId.HasValue == true && patientVisitDB.AncillaryProviderId.HasValue == true)
                    {
                        using (PatientRepository patientRepo = new PatientRepository(_context))
                        {
                            patientRepo.AssociatePatientWithAncillaryCompany(patientVisitDB.PatientId.Value, patientVisitDB.CaseId.Value, patientVisitBO.AncillaryProviderId.Value, patientVisitBO.AddedByCompanyId);
                        }
                    }
                }
                else
                {
                    if (IsEditMode == false && IsAddModeCalendarEvent == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Patient Visit details.", ErrorLevel = ErrorLevel.Error };
                    }
                    patientVisitDB = null;
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
                    int PatientVisitId = patientVisitDB.Id;
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
                    int PatientVisitId = patientVisitDB.Id;
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

                
                if(DoctorIdOld != null)
                {
                    if (DoctorIdOld != patientVisitBO.DoctorId)
                    {
                        if(patientVisitDB.RoomId != null)
                        {
                            if (sendNotificationMessage == false)
                            {
                                sendnotificationtodr = true;
                                sendNotificationMessage = true;
                            }
                        }                        
                    }
                } 

                dbContextTransaction.Commit();

                if (patientVisitDB != null)
                {
                    patientVisitDB = _context.PatientVisits.Include("CalendarEvent")
                                                            .Include("Location")
                                                            .Include("Location.Company")
                                                            .Include("Patient").Include("Patient.User").Include("Patient.User.UserCompanies")
                                                            .Include("PatientVisitDiagnosisCodes").Include("PatientVisitDiagnosisCodes.DiagnosisCode")
                                                            .Include("PatientVisitProcedureCodes").Include("PatientVisitProcedureCodes.ProcedureCode")
                                                            .Include("Room.RoomTest")
                                                            .Where(p => p.Id == patientVisitDB.Id
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault<PatientVisit>();
                }
                else if (CalendarEventDB != null)
                {
                    patientVisitDB = _context.PatientVisits.Include("CalendarEvent")
                                                            .Where(p => p.CalendarEvent.Id == CalendarEventDB.Id
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault<PatientVisit>();
                }

                CompanyId = patientVisitDB.Location.CompanyID;
            }

            if (sendNotificationMessage == true)
            {
                try
                {
                    IdentityHelper identityHelper = new IdentityHelper();
                    User AdminUser = _context.Users.Include("ContactInfo").Include("UserCompanies").Include("UserCompanies.company")
                                         .Where(p => p.UserName == identityHelper.Email && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                             .FirstOrDefault();

                    User patientInfo = _context.Users.Include("ContactInfo").Include("UserCompanies").Include("UserCompanies.company")
                                      .Where(p => p.id == patientVisitBO.PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                          .FirstOrDefault();

                    User ancillaryInfo = _context.Users.Include("ContactInfo").Include("UserCompanies").Include("UserCompanies.company")
                               .Where(p => p.UserType == 5 && p.UserCompanies.Where(p1 => p1.CompanyID == patientVisitBO.AncillaryProviderId && (p1.IsDeleted.HasValue == false || (p1.IsDeleted.HasValue == true && p1.IsDeleted.Value == false))).Any() == true && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                    User doctorInfo = _context.Users.Include("ContactInfo").Include("UserCompanies").Include("UserCompanies.company")
                             .Where(p => p.id == patientVisitBO.DoctorId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                    List<User> lstStaff = _context.Users.Include("ContactInfo").Include("UserCompanies").Include("UserCompanies.company")
                                            .Where(p => p.UserType == 2 && p.UserCompanies.Where(p1 => p1.CompanyID == patientVisitBO.AddedByCompanyId && (p1.IsDeleted.HasValue == false || (p1.IsDeleted.HasValue == true && p1.IsDeleted.Value == false))).Any() && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                .ToList<User>();

                    string MailMessageForPatient, MailMessageForAdmin, MailMessageForAncillary, MailMessageForDoctor = "";
                    string NotificationForPatient, NotificationForAdmin, NotificationForAncillary, NotificationForDoctor = "";
                    string SmsMessageForPatient, SmsMessageForAdmin, SmsMessageForAncillary, SmsMessageForDoctor = "";
                    string MailMessageForStaff, NotificationForStaff, SmsMessageForStaff = "";
                    string MailMessageForAttorney, NotificationForAttorney, SmsMessageForAttorney = "";

                    if (sendnotificationtodr == false)
                    {

                        if (doctorInfo != null && patientVisitBO.RoomId == null)
                        {
                            MailMessageForPatient = "<B>New Appointment Scheduled</B></ BR > Medical provider has schedule a patient visit with Doctor: " + doctorInfo.FirstName + " " + doctorInfo.LastName + "<br><br>Thanks";
                            MailMessageForAdmin = "<B>New Appointment Scheduled</B></BR> A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " is schedule with doctor:" + doctorInfo.FirstName + " " + doctorInfo.LastName + "<br><br>Thanks";
                            MailMessageForAncillary = "<B>New Appointment Scheduled</B></BR> A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " is schedule with doctor:" + doctorInfo.FirstName + " " + doctorInfo.LastName + "<br><br>Thanks";
                            MailMessageForDoctor = "Appointment has been scheduled for patient";

                            NotificationForPatient = "Medical provider has schedule a patient visit with Doctor: " + doctorInfo.FirstName + " " + doctorInfo.LastName;
                            NotificationForAdmin = "New Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " is schedule with doctor:" + doctorInfo.FirstName + " " + doctorInfo.LastName;
                            NotificationForAncillary = "New Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " is schedule with doctor:" + doctorInfo.FirstName + " " + doctorInfo.LastName;
                            NotificationForDoctor = "New Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName;

                            SmsMessageForPatient = "<B>New Appointment Scheduled</B></ BR > Medical provider has schedule a patient visit with Doctor: " + doctorInfo.FirstName + " " + doctorInfo.LastName + "<br><br>Thanks";
                            SmsMessageForAdmin = "<B>New Appointment Scheduled</B></BR> A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " is schedule with doctor:" + doctorInfo.FirstName + " " + doctorInfo.LastName + "<br><br>Thanks";
                            SmsMessageForAncillary = "<B>New Appointment Scheduled</B></BR> A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " is schedule with doctor:" + doctorInfo.FirstName + " " + doctorInfo.LastName + "<br><br>Thanks";
                            SmsMessageForDoctor = "<B>New Appointment Scheduled</B></BR> A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName;

                            MailMessageForStaff = "<B>New Appointment Scheduled</B></BR> A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + "<br><br>Thanks";
                            NotificationForStaff = "New Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName;
                            SmsMessageForStaff = "<B>New Appointment Scheduled</B></BR> A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + "<br><br>Thanks";

                            MailMessageForAttorney = "<B>New Appointment Scheduled</B></BR> A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " is schedule with doctor:" + doctorInfo.FirstName + " " + doctorInfo.LastName + "<br><br>Thanks";
                            NotificationForAttorney = "New Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " is schedule with doctor:" + doctorInfo.FirstName + " " + doctorInfo.LastName;
                            SmsMessageForAttorney = "<B>New Appointment Scheduled</B></BR> A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " is schedule with doctor:" + doctorInfo.FirstName + " " + doctorInfo.LastName + "<br><br>Thanks";
                        }
                        else
                        {
                            MailMessageForPatient = "<B>New Appointment Scheduled</B> </ BR >Medical provider has schedule a " + patientVisitDB.Room.RoomTest.Name + " Test Visit.<br><br>Thanks";
                            MailMessageForAdmin = "<B>New Appointment Scheduled</B></BR>A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " for " + patientVisitDB.Room.RoomTest.Name + " Test Visit <br><br>Thanks";
                            MailMessageForAncillary = "<B>New Appointment Scheduled</B></BR>A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " for " + patientVisitDB.Room.RoomTest.Name + " Test Visit <br><br>Thanks";
                            MailMessageForDoctor = patientVisitDB.Room.RoomTest.Name + " Test visit has been updated for patient: " + patientInfo.FirstName + " " + patientInfo.LastName;

                            NotificationForPatient = "Medical provider has schedule " + patientVisitDB.Room.RoomTest.Name;
                            NotificationForAdmin = "New Appointment scheduel for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " for " + patientVisitDB.Room.RoomTest.Name + " Test Visit";
                            NotificationForAncillary = "New Appointment scheduel for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " for " + patientVisitDB.Room.RoomTest.Name + " Test Visit";
                            NotificationForDoctor = patientVisitDB.Room.RoomTest.Name + " Test visit has been updated for patient: " + patientInfo.FirstName + " " + patientInfo.LastName;

                            SmsMessageForPatient = "<B>New Appointment Scheduled</B> </ BR >Medical provider has schedule a " + patientVisitDB.Room.RoomTest.Name + " Test Visit.<br><br>Thanks";
                            SmsMessageForAdmin = "<B>New Appointment Scheduled</B> </BR>A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " for " + patientVisitDB.Room.RoomTest.Name + " Test Visit <br><br>Thanks";
                            SmsMessageForAncillary = "<B>New Appointment Scheduled </B></BR>A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " for " + patientVisitDB.Room.RoomTest.Name + " Test Visit <br><br>Thanks";
                            SmsMessageForDoctor = patientVisitDB.Room.RoomTest.Name + " Test visit has been updated for patient: " + patientInfo.FirstName + " " + patientInfo.LastName;

                            MailMessageForStaff = "<B>New Appointment Scheduled</B> </BR>A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " for " + patientVisitDB.Room.RoomTest.Name + " Test Visit <br><br>Thanks";
                            NotificationForStaff = "New Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " for " + patientVisitDB.Room.RoomTest.Name + " Test Visit <br><br>Thanks";
                            SmsMessageForStaff = "<B>New Appointment Scheduled</B> </BR>A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " for " + patientVisitDB.Room.RoomTest.Name + " Test Visit <br><br>Thanks";

                            MailMessageForAttorney = "<B>New Appointment Scheduled</B> </BR>A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " for " + patientVisitDB.Room.RoomTest.Name + " Test Visit <br><br>Thanks";
                            NotificationForAttorney = "New Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " for " + patientVisitDB.Room.RoomTest.Name + " Test Visit <br><br>Thanks";
                            SmsMessageForAttorney = "<B>New Appointment Scheduled</B> </BR>A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " for " + patientVisitDB.Room.RoomTest.Name + " Test Visit <br><br>Thanks";
                        }
                    }
                    else
                    {
                        MailMessageForPatient = "";
                        SmsMessageForPatient = "";
                        MailMessageForAdmin = "";
                        SmsMessageForAdmin = "";
                        MailMessageForAncillary = "";
                        SmsMessageForAncillary = "";
                        NotificationForPatient = "";
                        NotificationForAncillary = "";
                        NotificationForStaff = "";
                        MailMessageForStaff = "";

                        MailMessageForDoctor = patientVisitDB.Room.RoomTest.Name + " Test visit has been updated for patient: " + patientInfo.FirstName + " " + patientInfo.LastName;
                        NotificationForDoctor = patientVisitDB.Room.RoomTest.Name + " Test visit has been updated for patient: " + patientInfo.FirstName + " " + patientInfo.LastName;
                        SmsMessageForDoctor = patientVisitDB.Room.RoomTest.Name + " Test visit has been updated for patient: " + patientInfo.FirstName + " " + patientInfo.LastName;
                    }


                    #region  patient mail object
                    BO.EmailMessage emPatient = new BO.EmailMessage();
                    if (patientInfo != null)
                    {
                        emPatient.ApplicationName = "Midas";
                        emPatient.ToEmail = patientInfo.UserName;
                        emPatient.EMailSubject = "MIDAS Notification";
                        emPatient.EMailBody = MailMessageForPatient;
                    }
                    #endregion

                    #region patient sms object
                    BO.SMS smsPatient = new BO.SMS();
                    if (patientInfo != null)
                    {
                        smsPatient.ApplicationName = "Midas";
                        smsPatient.ToNumber = patientInfo.ContactInfo.CellPhone;
                        smsPatient.Message = SmsMessageForPatient;
                    }
                    #endregion 

                    #region  admin mail object                 
                    BO.EmailMessage emAdmin = new BO.EmailMessage();
                    emAdmin.ApplicationName = "Midas";
                    emAdmin.ToEmail = identityHelper.Email;
                    emAdmin.EMailSubject = "MIDAS Notification";
                    emAdmin.EMailBody = MailMessageForAdmin;
                    #endregion

                    #region admin sms object
                    BO.SMS smsAdmin = new BO.SMS();
                    smsAdmin.ApplicationName = "Midas";
                    smsAdmin.ToNumber = AdminUser.ContactInfo.CellPhone;
                    smsAdmin.Message = SmsMessageForAdmin;
                    #endregion

                    #region  Ancillary mail object                 
                    BO.EmailMessage emAncillary = new BO.EmailMessage();
                    if (ancillaryInfo != null)
                    {
                        emAncillary.ApplicationName = "Midas";
                        emAncillary.ToEmail = ancillaryInfo.UserName;
                        emAncillary.EMailSubject = "MIDAS Notification";
                        emAncillary.EMailBody = MailMessageForAncillary;
                    }
                    #endregion

                    #region Ancillary sms object
                    BO.SMS smsAncillary = new BO.SMS();
                    if (ancillaryInfo != null)
                    {
                        smsAncillary.ApplicationName = "Midas";
                        smsAncillary.ToNumber = ancillaryInfo.ContactInfo.CellPhone;
                        smsAncillary.Message = SmsMessageForAncillary;
                    }
                    #endregion

                    #region  Doctor mail object                 
                    BO.EmailMessage emDoctor = new BO.EmailMessage();
                    if (doctorInfo != null)
                    {
                        emDoctor.ApplicationName = "Midas";
                        emDoctor.ToEmail = doctorInfo.UserName;
                        emDoctor.EMailSubject = "MIDAS Notification";
                        emDoctor.EMailBody = MailMessageForDoctor;
                    }
                    #endregion

                    #region Doctor sms object
                    BO.SMS smsDoctor = new BO.SMS();
                    if (doctorInfo != null)
                    {
                        smsDoctor.ApplicationName = "Midas";
                        smsDoctor.ToNumber = doctorInfo.ContactInfo.CellPhone;
                        smsDoctor.Message = SmsMessageForDoctor;
                    }
                    #endregion                 

                    NotificationHelper nh = new NotificationHelper();
                    MessagingHelper mh = new MessagingHelper();

                    if (sendnotificationtodr == false)
                    {
                        #region Patient                  
                        nh.PushNotification(patientInfo.UserName, CompanyId.HasValue == true ? CompanyId.Value : 0, NotificationForPatient, "New Appointment Schedule"); //for patient user mail //patientInfo.UserName;  
                        mh.SendEmailAndSms(patientInfo.UserName, CompanyId.HasValue == true ? CompanyId.Value : 0, emPatient, smsPatient);   //for patient user mail //patientInfo.UserName; 
                        #endregion
                    }

                    if (sendnotificationtodr == false)
                    {
                        #region Ancillary 
                        if (patientVisitBO.AncillaryProviderId != null)
                        {
                            nh.PushNotification(ancillaryInfo.UserName, CompanyId.HasValue == true ? CompanyId.Value : 0, NotificationForAncillary, "New Appointment Schedule");   //email for ancillar (ancillaryInfo.UserName
                            mh.SendEmailAndSms(ancillaryInfo.UserName, CompanyId.HasValue == true ? CompanyId.Value : 0, emAncillary, smsAncillary); // //email for ancillar (ancillaryInfo.UserName
                        }
                        #endregion
                    }

                    if (sendnotificationtodr == false)
                    {
                        #region admin and staff 
                        if (AdminUser.UserType == 4)
                        {
                            if (AdminUser.UserType == 4)
                            {
                                nh.PushNotification(AdminUser.UserName, CompanyId.HasValue == true ? CompanyId.Value : 0, NotificationForDoctor, "New Appointment Schedule");
                                mh.SendEmailAndSms(AdminUser.UserName, CompanyId.HasValue == true ? CompanyId.Value : 0, emDoctor, smsDoctor);
                            }

                            foreach (var item in lstStaff)
                            {
                                #region  staff mail object                 
                                BO.EmailMessage emStaff = new BO.EmailMessage();
                                emAdmin.ApplicationName = "Midas";
                                emAdmin.ToEmail = item.UserName;
                                emAdmin.EMailSubject = "MIDAS Notification";
                                emAdmin.EMailBody = MailMessageForStaff;
                                #endregion

                                #region admin sms object
                                BO.SMS smsStaff = new BO.SMS();
                                smsAdmin.ApplicationName = "Midas";
                                smsAdmin.ToNumber = item.ContactInfo.CellPhone;
                                smsAdmin.Message = SmsMessageForStaff;
                                #endregion

                                nh.PushNotification(item.UserName, CompanyId.HasValue == true ? CompanyId.Value : 0, NotificationForStaff, "New Appointment Schedule");
                                mh.SendEmailAndSms(item.UserName, CompanyId.HasValue == true ? CompanyId.Value : 0, emStaff, smsStaff);
                            }

                        }
                        else
                        {
                            foreach (var item in lstStaff)
                            {
                                #region  staff mail object                 
                                BO.EmailMessage emStaff = new BO.EmailMessage();
                                emAdmin.ApplicationName = "Midas";
                                emAdmin.ToEmail = item.UserName;
                                emAdmin.EMailSubject = "MIDAS Notification";
                                emAdmin.EMailBody = MailMessageForStaff;
                                #endregion

                                #region admin sms object
                                BO.SMS smsStaff = new BO.SMS();
                                smsAdmin.ApplicationName = "Midas";
                                smsAdmin.ToNumber = item.ContactInfo.CellPhone;
                                smsAdmin.Message = SmsMessageForStaff;
                                #endregion

                                nh.PushNotification(item.UserName, CompanyId.HasValue == true ? CompanyId.Value : 0, NotificationForStaff, "New Appointment Schedule");
                                mh.SendEmailAndSms(item.UserName, CompanyId.HasValue == true ? CompanyId.Value : 0, emStaff, smsStaff);
                            }
                        }
                        #endregion
                    }
                    else
                    {
                        nh.PushNotification(AdminUser.UserName, CompanyId.HasValue == true ? CompanyId.Value : 0, NotificationForDoctor, "Appointment Update");
                        mh.SendEmailAndSms(AdminUser.UserName, CompanyId.HasValue == true ? CompanyId.Value : 0, emDoctor, smsDoctor);
                    }

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

            var res = Convert<BO.PatientVisit, PatientVisit>(patientVisitDB);
            return (object)res;
        }
        #endregion

        #region DeleteVisit By ID
        public override object DeleteVisit(int id)
        {
            var acc = _context.PatientVisits.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<PatientVisit>();
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

            var res = Convert<BO.PatientVisit, PatientVisit>(acc);
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
            var acc = _context.PatientVisits.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<PatientVisit>();
            if (acc != null)
            {
                acc.IsCancelled = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.PatientVisit, PatientVisit>(acc);
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
            var acc = _context.PatientVisits.Include("Location").Include("Location.Company")
                                            .Include("Doctor")
                                            .Include("Doctor.User")
                                            .Include("Room").Include("Room.RoomTest")
                                            .Include("Specialty")
                                            .Include("PatientVisitDiagnosisCodes").Include("PatientVisitDiagnosisCodes.DiagnosisCode")
                                            .Include("PatientVisitProcedureCodes").Include("PatientVisitProcedureCodes.ProcedureCode")
                                            .Include("CalendarEvent")
                                            .Where(p => p.CaseId == CaseId
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                            .Distinct().ToList<PatientVisit>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit> lstpatientvisit = new List<BO.PatientVisit>();
                foreach (PatientVisit item in acc)
                {
                    if (item.EventStart == null)
                    {
                        int s = _context.PatientVisits.Where(p => p.CalendarEventId == item.CalendarEventId).Count();
                        if (s <= 1)
                        {
                            //var calendaritem = _context.CalendarEvents.Where(p => p.Id == item.CalendarEventId)
                            if (item.CalendarEvent.EventStart > DateTime.Now.Date)
                            {
                                item.VisitTimeStatus = false;
                                lstpatientvisit.Add(Convert<BO.PatientVisit, PatientVisit>(item));
                            }
                            else
                            {
                                if (item.VisitStatusId == 4)
                                {
                                    item.VisitTimeStatus = false;
                                    lstpatientvisit.Add(Convert<BO.PatientVisit, PatientVisit>(item));
                                }
                                else
                                {
                                    item.VisitTimeStatus = true;
                                    lstpatientvisit.Add(Convert<BO.PatientVisit, PatientVisit>(item));
                                }
                            }
                        }
                    }
                    else
                    {
                        if (item.CalendarEvent.EventStart > DateTime.Now.Date)
                        {
                            item.VisitTimeStatus = false;
                            lstpatientvisit.Add(Convert<BO.PatientVisit, PatientVisit>(item));
                        }
                        else
                        {
                            if (item.VisitStatusId == 4)
                            {
                                item.VisitTimeStatus = false;
                                lstpatientvisit.Add(Convert<BO.PatientVisit, PatientVisit>(item));
                            }
                            else
                            {
                                item.VisitTimeStatus = true;
                                lstpatientvisit.Add(Convert<BO.PatientVisit, PatientVisit>(item));
                            }
                        }
                    }
                }
                return lstpatientvisit;
            }
        }
        #endregion

        #region Get By DoctorID, MedcialProvider and Dates
        public override object GetByDoctorAndDates(int DoctorId, int medicalProviderId, DateTime FromDate, DateTime ToDate)
        {
            if (ToDate == ToDate.Date)
            {
                ToDate = ToDate.AddDays(1);
            }

            List<int> caseid = _context.CaseCompanyMappings.Where(p => p.CompanyId == medicalProviderId 
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                           .Select(p => p.CaseId).ToList<int>();

            DateTime currentDate = DateTime.Now.Date;
            List<BO.PatientVisitCompleted> PatientVisitCompleted = _context.PatientVisits.Where(p => p.DoctorId == DoctorId
                                                                            && (p.EventStart >= FromDate && p.EventStart < ToDate)
                                                                            && p.EventStart < currentDate
                                                                            && p.CaseId.HasValue == true
                                                                            && caseid.Contains((int)p.CaseId)
                                                                            //&& p.VisitStatusId == 1
                                                                            && p.IsOutOfOffice == false
                                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                              .Join(_context.Users, p1 => p1.PatientId, p2 => p2.id, (p1, p2) => new BO.PatientVisitCompleted
                                                              {
                                                                  caseId = p1.CaseId.Value,
                                                                  patientName = p2.FirstName + " " + p2.LastName,
                                                                  visitDate = p1.EventStart.Value
                                                              })
                                                              .ToList<BO.PatientVisitCompleted>();

            foreach (var item in PatientVisitCompleted)
            {
                DateTime visitDate = DateTime.SpecifyKind(item.visitDate, DateTimeKind.Utc);
                item.visitDate = visitDate;
            }

            PatientVisitCompleted.ForEach(p => p.visitDate = DateTime.SpecifyKind(p.visitDate, DateTimeKind.Utc));

            var PatientCalendarEvents = _context.PatientVisits.Where(p => p.DoctorId == DoctorId
                                                                   && p.CaseId.HasValue == true
                                                                   && caseid.Contains((int)p.CaseId)
                                                                   //&& p.VisitStatusId == 1
                                                                   && p.IsOutOfOffice == false
                                                                   && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                              .Join(_context.Users, p1 => p1.PatientId, p2 => p2.id, (p1, p2) => new {
                                                                  caseId = p1.CaseId.Value,
                                                                  patientName = p2.FirstName + " " + p2.LastName,
                                                                  calendarEvent = p1.CalendarEvent
                                                              })
                                                              .ToList();

            foreach (var eachItem in PatientCalendarEvents)
            {
                CalendarEvent eachEvent = eachItem.calendarEvent;

                if (eachEvent.IsDeleted.HasValue == false || (eachEvent.IsDeleted.HasValue == true && eachEvent.IsDeleted.Value == false))
                {
                    Calendar calendar = new Calendar();
                    var newEvent = new Event()
                    {
                        Name = eachEvent.Name,
                        Start = new CalDateTime(eachEvent.EventStart, "UTC"),
                        End = new CalDateTime(eachEvent.EventEnd, "UTC"),
                        Description = eachEvent.Description,
                        IsAllDay = eachEvent.IsAllDay.HasValue == true ? eachEvent.IsAllDay.Value : false,
                        Created = new CalDateTime(eachEvent.CreateDate)
                    };

                    if (String.IsNullOrWhiteSpace(eachEvent.RecurrenceRule) == false)
                    {
                        var keyValuePair = eachEvent.RecurrenceRule.ToUpper().Split(";".ToCharArray());
                        if (keyValuePair.Any(p => p.IndexOf("UNTIL=") != -1))
                        {
                            for (int i = 0; i < keyValuePair.Length; i++)
                            {
                                if (keyValuePair[i].IndexOf("COUNT=") != -1)
                                {
                                    keyValuePair[i] = "";
                                }
                            }
                        }
                        for (int i = 0; i < keyValuePair.Length; i++)
                        {
                            if (keyValuePair[i].IndexOf("COUNT=0") != -1)
                            {
                                keyValuePair[i] = "COUNT=500";
                            }
                        }

                        string modifiedRecurrenceRule = "";

                        foreach (var item in keyValuePair)
                        {
                            if (string.IsNullOrWhiteSpace(item) == false)
                            {
                                modifiedRecurrenceRule += item + ";";
                            }
                        }

                        modifiedRecurrenceRule = modifiedRecurrenceRule.TrimEnd(";".ToCharArray());
                        IRecurrencePattern recPattern = new RecurrencePattern(modifiedRecurrenceRule);
                        if (recPattern.Frequency != FrequencyType.None)
                        {
                            newEvent.RecurrenceRules.Add(recPattern);
                        }
                    }

                    if (String.IsNullOrWhiteSpace(eachEvent.RecurrenceException) == false)
                    {
                        var keyValuePair = eachEvent.RecurrenceException.ToUpper().Split(";".ToCharArray());
                        if (keyValuePair.Any(p => p.IndexOf("UNTIL=") != -1))
                        {
                            for (int i = 0; i < keyValuePair.Length; i++)
                            {
                                if (keyValuePair[i].IndexOf("COUNT=") != -1)
                                {
                                    keyValuePair[i] = "";
                                }
                            }
                        }
                        for (int i = 0; i < keyValuePair.Length; i++)
                        {
                            if (keyValuePair[i].IndexOf("COUNT=0") != -1)
                            {
                                keyValuePair[i] = "COUNT=500";
                            }
                        }

                        string modifiedRecurrenceException = "";

                        foreach (var item in keyValuePair)
                        {
                            if (string.IsNullOrWhiteSpace(item) == false)
                            {
                                modifiedRecurrenceException += item + ";";
                            }
                        }

                        modifiedRecurrenceException = modifiedRecurrenceException.TrimEnd(";".ToCharArray());
                        IRecurrencePattern recPattern = new RecurrencePattern(modifiedRecurrenceException);
                        if (recPattern.Frequency != FrequencyType.None)
                        {
                            newEvent.ExceptionRules.Add(recPattern);
                        }
                    }

                    calendar.Events.Add(newEvent);

                    HashSet<Occurrence> newEventOccurrences = new HashSet<Occurrence>();
                    newEventOccurrences = calendar.GetOccurrences(FromDate, ToDate);

                    string TimeZone = eachEvent.TimeZone;
                    int intTimeZone = 0;
                    int.TryParse(TimeZone, out intTimeZone);

                    intTimeZone = intTimeZone * -1;

                    var Occurrence = newEventOccurrences.Select(p => new BO.PatientVisitCompleted
                    {
                        caseId = eachItem.caseId,
                        patientName = eachItem.patientName,
                        //VisitDate = p.Period.StartTime.AddMinutes(intTimeZone).Value
                        visitDate = p.Period.StartTime.AsUtc
                    }).ToList().Distinct().OrderBy(p => p.visitDate).ToList();

                    PatientVisitCompleted.AddRange(Occurrence.Where(p => (p.visitDate >= FromDate && p.visitDate < ToDate) && p.visitDate >= currentDate));
                }
            }

            if (PatientVisitCompleted == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visits found for these Date range.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return PatientVisitCompleted.Distinct().OrderBy(p => p.visitDate);
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

            List<PatientVisit> lstPatientVisit = _context.PatientVisits.Include("Patient").Include("Patient.User")//.Include("Patient.PatientInsuranceInfoes")
                                                                       .Include("Case").Include("Case.PatientAccidentInfoes")
                                                                       .Where(p => p.DoctorId == DoctorId
                                                                                && ((p.PatientId.HasValue == true) && (userId.Contains(p.PatientId.Value)))
                                                                                && p.EventStart >= FromDate && p.EventStart < ToDate
                                                                                && (p.Patient.IsDeleted.HasValue == false || (p.Patient.IsDeleted.HasValue == true && p.Patient.IsDeleted.Value == false))
                                                                                && (p.Case.IsDeleted.HasValue == false || (p.Case.IsDeleted.HasValue == true && p.Case.IsDeleted.Value == false))
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                .ToList<PatientVisit>();


            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visits found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit> lstBOPatientVisit = new List<BO.PatientVisit>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit, PatientVisit>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        //#region AddUploadedFileData
        //public override object AddUploadedFileData(int id, string FileUploadPath)
        //{

        //    patientVisit patientVisitDB = new patientVisit();

        //    patientVisitDB = _context.patientVisit.Where(p => p.Id == id
        //                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
        //                                           .FirstOrDefault<patientVisit>();
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

        //    var res = Convert<BO.patientVisit, patientVisit>(patientVisitDB);
        //    return (object)res;
        //}
        //#endregion

        //#region Get By GetDocumentList
        //public override object GetDocumentList(int id)
        //{
        //    var acc = _context.patientVisit.Where(p => p.Id == id
        //                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
        //                                    .FirstOrDefault<patientVisit>();
        //    BO.patientVisit acc_ = Convert<BO.patientVisit, patientVisit>(acc);

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
            var acc = _context.PatientVisits.Include("Location").Include("Location.Company")
                                            .Include("Doctor")
                                            .Include("Doctor.User")
                                            .Include("Room").Include("Room.RoomTest")
                                            .Include("Specialty")
                                            .Include("PatientVisitDiagnosisCodes").Include("PatientVisitDiagnosisCodes.DiagnosisCode")
                                            .Include("PatientVisitProcedureCodes").Include("PatientVisitProcedureCodes.ProcedureCode")
                                            .Where(p => p.Id == id
                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                            .FirstOrDefault<PatientVisit>();

            BO.PatientVisit acc_ = Convert<BO.PatientVisit, PatientVisit>(acc);

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
            var caseList = _context.Cases.Where(p => p.PatientId == PatientId && p.CaseStatusId == 1
                                                  && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                      .ToList<Case>();

            List<PatientVisit> lstPatientVisit = new List<PatientVisit>();
            if (caseList != null)
            {
                foreach (var item in caseList)
                {
                    var lstPatientVisitDB = _context.PatientVisits.Include("CalendarEvent")
                                                                      .Where(p => ((p.CaseId.HasValue == true) && (item.Id > 0) && (p.CaseId.Value == item.Id))
                                                                              && (LocationId <= 0 || p.LocationId == LocationId)
                                                                              && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                             .ToList<PatientVisit>();

                    lstPatientVisitDB.ForEach(pv => lstPatientVisit.Add(pv));

                }



            }



            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Patient and Location Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit> lstBOPatientVisit = new List<BO.PatientVisit>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit, PatientVisit>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region Get Location For PatientId
        public override object GetLocationForPatientId(int PatientId)
        {
            var caseList = _context.Cases.Where(p => p.PatientId == PatientId && p.CaseStatusId == 1
                                                  && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                       .ToList<Case>();

            List<PatientVisit> lstPatientVisit = new List<PatientVisit>();
            foreach (var item in caseList)
            {
                var lstPatientVisitDb = _context.PatientVisits.Include("CalendarEvent")
                                                                      .Include("Location")
                                                                      .Include("Location.Company")
                                                                      .Where(p => ((p.CaseId.HasValue == true) && (item.Id > 0) && (p.CaseId.Value == item.Id))
                                                                              && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                      .ToList<PatientVisit>();

                lstPatientVisitDb.ForEach(pv => lstPatientVisit.Add(pv));
            }



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
            PatientVisit patientVisitDB = new PatientVisit();

            patientVisitDB = _context.PatientVisits.Where(p => p.Id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault();

            if (patientVisitDB != null)
            {
                patientVisitDB.IsDeleted = true;
                _context.SaveChanges();
            }
            else
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "No record found.", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.PatientVisit, PatientVisit>(patientVisitDB);
            return (object)res;
        }
        #endregion

        #region Get VisitsBy PatientId
        public override object GetVisitsByPatientId(int PatientId)
        {
            var acc = _context.PatientVisits.Include("CalendarEvent")
                                            .Include("Location")
                                            .Include("Doctor")
                                            .Include("Doctor.User")
                                            .Include("Room")
                                            .Include("Room.RoomTest")
                                            .Include("Patient")
                                            .Include("Patient.User")
                                            .Where(p => p.PatientId == PatientId
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                            .ToList<PatientVisit>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Patient Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
               // List<BO.patientVisit> lstpatientvisit = new List<BO.patientVisit>();
                BO.mPatientVisits mpatientVisits = new BO.mPatientVisits();
                List<BO.mPatientVisits> lstmpatientVisits = new List<BO.mPatientVisits>();
                foreach (PatientVisit item in acc)
                {
                    lstmpatientVisits.Add(GetByvisitsConvert<BO.mPatientVisits, PatientVisit>(item));
                }
                return lstmpatientVisits;
            }
        }
        #endregion

        #region GetAllVisitType
        public override object Get()
        {
            var allVisitType = from vt in _context.VisitTypes
                               where
                               (vt.IsDeleted.HasValue == false || (vt.IsDeleted.HasValue == true && vt.IsDeleted.Value == false))
                               select new
                               {
                                   id = vt.Id,
                                   name = vt.Name,
                                   description = vt.Description
                               };

           var lstalltype =  allVisitType.ToList();

            if (allVisitType == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return lstalltype;

        }
        #endregion

        #region Cancel Single Event Occurrence
        public override object CancelSingleEventOccurrence(int PatientVisitId, DateTime CancelEventStart)
        {
            var CalendarEvent = _context.PatientVisits.Where(p => p.Id == PatientVisitId
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                      .Select(p => p.CalendarEvent)
                                                      .SingleOrDefault();

            if (CalendarEvent != null)
            {
                string RecurrenceException = CalendarEvent.RecurrenceException;
                if (string.IsNullOrWhiteSpace(RecurrenceException) == false)
                {
                    RecurrenceException += ",";
                }
                else
                {
                    RecurrenceException = "";
                }
                
                CalendarEvent.RecurrenceException = RecurrenceException + CancelEventStart.ToString("yyyy-MM-dd");
            }

            _context.SaveChanges();

            return Get(PatientVisitId);
        }
        #endregion

        #region Get By Location Doctor And Speciality Id
        public override object GetByLocationDoctorAndSpecialityId(int LocationId, int DoctorId, int SpecialityId)
        {
            List<PatientVisit> lstPatientVisit = _context.PatientVisits.Include("Location").Include("Location.Company")
                                                                       .Include("CalendarEvent")
                                                                       .Include("Patient")
                                                                       .Include("Patient.User")
                                                                       .Include("Case")
                                                                       .Include("Doctor")
                                                                       .Include("Doctor.User")
                                                                       .Include("Room").Include("Room.RoomTest")
                                                                       .Include("Specialty")
                                                                       .Include("PatientVisitDiagnosisCodes").Include("PatientVisitDiagnosisCodes.DiagnosisCode")
                                                                       .Include("PatientVisitProcedureCodes").Include("PatientVisitProcedureCodes.ProcedureCode")
                                                                       .Where(p => ((LocationId > 0 && p.LocationId == LocationId) || (LocationId <= 0))
                                                                            && ((DoctorId > 0 && p.DoctorId == DoctorId) || (DoctorId <= 0))
                                                                            && ((SpecialityId > 0 && p.SpecialtyId == SpecialityId) || (SpecialityId <= 0))
                                                                            && (LocationId > 0 || DoctorId > 0)
                                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                       .ToList<PatientVisit>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location Id and Doctor Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit> lstBOPatientVisit = new List<BO.PatientVisit>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit, PatientVisit>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        #region Get By Company ID For Patient Visit 
        public override object GetByCompanyId(int Id)
        {
            var patientVisit = _context.PatientVisits.Include("CalendarEvent")
                                            .Include("Location")
                                            .Include("Doctor")
                                            .Include("Doctor.User")
                                            .Include("Specialty")
                                            .Include("Room")
                                            .Include("Room.RoomTest")
                                            .Include("Patient")
                                            .Include("Patient.User")
                                            .Include("PatientVisitDiagnosisCodes").Include("PatientVisitDiagnosisCodes.DiagnosisCode")
                                            .Include("PatientVisitProcedureCodes").Include("PatientVisitProcedureCodes.ProcedureCode")
                                            .Where(p => p.Location.CompanyID == Id
                                               && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                            .ToList<PatientVisit>();

            if (patientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit> lstpatientVisits = new List<BO.PatientVisit>();
                foreach (PatientVisit item in patientVisit)
                {
                    lstpatientVisits.Add(Convert<BO.PatientVisit, PatientVisit>(item));
                }
                return lstpatientVisits;
            }

        }
        #endregion

        #region Get by Company & doctor id
        public override Object GetByCompanyAndDoctorId(int CompanyId, int doctorId)
        {
            var patientVisit = _context.PatientVisits.Include("CalendarEvent")
                                            .Include("Location")
                                            .Include("Doctor")
                                            .Include("Doctor.User")
                                            .Include("Specialty")
                                            .Include("Room")
                                            .Include("Room.RoomTest")
                                            .Include("Patient")
                                            .Include("Patient.User")
                                            .Include("PatientVisitDiagnosisCodes").Include("PatientVisitDiagnosisCodes.DiagnosisCode")
                                            .Include("PatientVisitProcedureCodes").Include("PatientVisitProcedureCodes.ProcedureCode")
                                            .Where(p => p.DoctorId == doctorId && p.Location.CompanyID == CompanyId
                                                    &&  (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                            .ToList();

            if (patientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.PatientVisit> lstPatientVisit = new List<BO.PatientVisit>();
            foreach (PatientVisit item in patientVisit)
            {
                lstPatientVisit.Add(Convert<BO.PatientVisit, PatientVisit>(item));
            }
            return lstPatientVisit;
        }
        #endregion

        #region Get Patient Visit For Date By LocationId
        public override Object GetPatientVisitForDateByLocationId(DateTime ForDate, int LocationId)
        {
            var patientVisit = _context.PatientVisits.Include("CalendarEvent")
                                                     .Include("Location")
                                                     .Include("Doctor")
                                                     .Include("Doctor.User")
                                                     .Include("Specialty")
                                                     .Include("Room")
                                                     .Include("Room.RoomTest")
                                                     .Include("Patient")
                                                     .Include("Patient.User")
                                                     .Where(p => p.LocationId == LocationId
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                     .ToList();

            if (patientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.PatientVisit> lstPatientVisit = new List<BO.PatientVisit>();
            foreach (PatientVisit item in patientVisit)
            {
                lstPatientVisit.Add(Convert<BO.PatientVisit, PatientVisit>(item));
            }

            List<BO.PatientVisitDashboard> lstPatientVisitForDate = new List<BO.PatientVisitDashboard>();

            List<BO.FreeSlots> currentEventSlots = new List<BO.FreeSlots>();
            CalendarEventRepository calEventRepo = new CalendarEventRepository(_context);

            List<int> CalendarEventIds = new List<int>();
            foreach (var eachPatientVisit in lstPatientVisit.Where(p => p.CalendarEventId.HasValue == true).ToList())
            {
                if (CalendarEventIds.Any(p => p == eachPatientVisit.CalendarEventId) == false)
                {
                    CalendarEventIds.Add(eachPatientVisit.CalendarEventId.Value);

                    currentEventSlots = calEventRepo.GetBusySlotsByCalendarEventByLocationId(eachPatientVisit.CalendarEvent, ForDate) as List<BO.FreeSlots>;

                    if (currentEventSlots != null)
                    {
                        BO.FreeSlots ForDateEventSlots = new BO.FreeSlots();
                        ForDateEventSlots = currentEventSlots.Where(p => p.ForDate == ForDate).SingleOrDefault();

                        if (ForDateEventSlots != null)
                        {
                            foreach (var eachStartAndEndTimes in ForDateEventSlots.StartAndEndTimes)
                            {
                                BO.PatientVisitDashboard PatientVisitForDate = new BO.PatientVisitDashboard();
                                PatientVisitForDate.ID = 0;
                                PatientVisitForDate.CalendarEventId = eachPatientVisit.CalendarEventId;
                                PatientVisitForDate.CaseId = eachPatientVisit.CaseId;
                                PatientVisitForDate.PatientId = eachPatientVisit.PatientId;
                                if (eachPatientVisit.Patient != null && eachPatientVisit.Patient.User != null)
                                {
                                    PatientVisitForDate.PatientName = eachPatientVisit.Patient.User.FirstName + " " + eachPatientVisit.Patient.User.LastName;
                                }
                                PatientVisitForDate.LocationId = eachPatientVisit.LocationId;
                                PatientVisitForDate.RoomId = eachPatientVisit.RoomId;
                                if (eachPatientVisit.Room != null)
                                {
                                    PatientVisitForDate.RoomName = eachPatientVisit.Room.name;
                                }
                                PatientVisitForDate.DoctorId = eachPatientVisit.DoctorId;
                                if (eachPatientVisit.Doctor != null && eachPatientVisit.Doctor.user != null)
                                {
                                    PatientVisitForDate.DoctorName = eachPatientVisit.Doctor.user.FirstName + " " + eachPatientVisit.Doctor.user.LastName;
                                }
                                PatientVisitForDate.SpecialtyId = eachPatientVisit.SpecialtyId;
                                if (eachPatientVisit.Specialty != null)
                                {
                                    PatientVisitForDate.SpecialityName = eachPatientVisit.Specialty.Name;
                                }
                                PatientVisitForDate.EventStart = eachStartAndEndTimes.StartTime;
                                PatientVisitForDate.EventEnd = eachStartAndEndTimes.EndTime;
                                PatientVisitForDate.VisitStatusId = 1;
                                PatientVisitForDate.IsCancelled = eachPatientVisit.IsCancelled;
                                PatientVisitForDate.IsDeleted = eachPatientVisit.IsDeleted;

                                lstPatientVisitForDate.Add(PatientVisitForDate);
                            }
                        }
                    }
                }                
            }

            return lstPatientVisitForDate.OrderBy(p => p.EventStart).ToList();
        }
        #endregion

        #region Get Patient Visit For Date By LocationId
        public override Object GetPatientVisitForDateByCompanyId(DateTime ForDate, int CompanyId)
        {
            var CompanyLocations = _context.Locations.Where(p => p.CompanyID == CompanyId
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                     .Select(p => p.id);

            var patientVisit = _context.PatientVisits.Include("CalendarEvent")
                                                     .Include("Location")
                                                     .Include("Doctor")
                                                     .Include("Doctor.User")
                                                     .Include("Specialty")
                                                     .Include("Room")
                                                     .Include("Room.RoomTest")
                                                     .Include("Patient")
                                                     .Include("Patient.User")
                                                     .Where(p => CompanyLocations.Contains(p.LocationId) == true
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                     .ToList();

            if (patientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.PatientVisit> lstPatientVisit = new List<BO.PatientVisit>();
            foreach (PatientVisit item in patientVisit)
            {
                lstPatientVisit.Add(Convert<BO.PatientVisit, PatientVisit>(item));
            }

            List<BO.PatientVisitDashboard> lstPatientVisitForDate = new List<BO.PatientVisitDashboard>();

            List<BO.FreeSlots> currentEventSlots = new List<BO.FreeSlots>();
            CalendarEventRepository calEventRepo = new CalendarEventRepository(_context);

            List<int> CalendarEventIds = new List<int>();
            foreach (var eachPatientVisit in lstPatientVisit.Where(p => p.CalendarEventId.HasValue == true).ToList())
            {
                if (CalendarEventIds.Any(p => p == eachPatientVisit.CalendarEventId) == false)
                {
                    CalendarEventIds.Add(eachPatientVisit.CalendarEventId.Value);

                    currentEventSlots = calEventRepo.GetBusySlotsByCalendarEventByLocationId(eachPatientVisit.CalendarEvent, ForDate) as List<BO.FreeSlots>;

                    if (currentEventSlots != null)
                    {
                        BO.FreeSlots ForDateEventSlots = new BO.FreeSlots();
                        ForDateEventSlots = currentEventSlots.Where(p => p.ForDate == ForDate).SingleOrDefault();

                        if (ForDateEventSlots != null)
                        {
                            foreach (var eachStartAndEndTimes in ForDateEventSlots.StartAndEndTimes)
                            {
                                BO.PatientVisitDashboard PatientVisitForDate = new BO.PatientVisitDashboard();
                                PatientVisitForDate.ID = 0;
                                PatientVisitForDate.CalendarEventId = eachPatientVisit.CalendarEventId;
                                PatientVisitForDate.CaseId = eachPatientVisit.CaseId;
                                PatientVisitForDate.PatientId = eachPatientVisit.PatientId;
                                if (eachPatientVisit.Patient != null && eachPatientVisit.Patient.User != null)
                                {
                                    PatientVisitForDate.PatientName = eachPatientVisit.Patient.User.FirstName + " " + eachPatientVisit.Patient.User.LastName;
                                }
                                PatientVisitForDate.LocationId = eachPatientVisit.LocationId;
                                PatientVisitForDate.RoomId = eachPatientVisit.RoomId;
                                if (eachPatientVisit.Room != null)
                                {
                                    PatientVisitForDate.RoomName = eachPatientVisit.Room.name;
                                }
                                PatientVisitForDate.DoctorId = eachPatientVisit.DoctorId;
                                if (eachPatientVisit.Doctor != null && eachPatientVisit.Doctor.user != null)
                                {
                                    PatientVisitForDate.DoctorName = eachPatientVisit.Doctor.user.FirstName + " " + eachPatientVisit.Doctor.user.LastName;
                                }
                                PatientVisitForDate.SpecialtyId = eachPatientVisit.SpecialtyId;
                                if (eachPatientVisit.Specialty != null)
                                {
                                    PatientVisitForDate.SpecialityName = eachPatientVisit.Specialty.Name;
                                }
                                PatientVisitForDate.EventStart = eachStartAndEndTimes.StartTime;
                                PatientVisitForDate.EventEnd = eachStartAndEndTimes.EndTime;
                                PatientVisitForDate.VisitStatusId = 1;
                                PatientVisitForDate.IsCancelled = eachPatientVisit.IsCancelled;
                                PatientVisitForDate.IsDeleted = eachPatientVisit.IsDeleted;

                                lstPatientVisitForDate.Add(PatientVisitForDate);
                            }
                        }
                    }
                }                
            }

            return (Object)lstPatientVisitForDate.OrderBy(p => p.EventStart).ToList();
        }
        #endregion

        #region Get Doctor Patient Visit For Date By LocationId
        public override Object GetDoctorPatientVisitForDateByLocationId(DateTime ForDate, int DoctorId, int LocationId)
        {
            var patientVisit = _context.PatientVisits.Include("CalendarEvent")
                                                     .Include("Location")
                                                     .Include("Doctor")
                                                     .Include("Doctor.User")
                                                     .Include("Specialty")
                                                     .Include("Room")
                                                     .Include("Room.RoomTest")
                                                     .Include("Patient")
                                                     .Include("Patient.User")
                                                     .Where(p => p.LocationId == LocationId && p.DoctorId == DoctorId
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                     .ToList();

            if (patientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.PatientVisit> lstPatientVisit = new List<BO.PatientVisit>();
            foreach (PatientVisit item in patientVisit)
            {
                lstPatientVisit.Add(Convert<BO.PatientVisit, PatientVisit>(item));
            }

            List<BO.PatientVisitDashboard> lstPatientVisitForDate = new List<BO.PatientVisitDashboard>();

            List<BO.FreeSlots> currentEventSlots = new List<BO.FreeSlots>();
            CalendarEventRepository calEventRepo = new CalendarEventRepository(_context);

            List<int> CalendarEventIds = new List<int>();
            foreach (var eachPatientVisit in lstPatientVisit.Where(p => p.CalendarEventId.HasValue == true).ToList())
            {
                if (CalendarEventIds.Any(p => p == eachPatientVisit.CalendarEventId) == false)
                {
                    CalendarEventIds.Add(eachPatientVisit.CalendarEventId.Value);

                    currentEventSlots = calEventRepo.GetBusySlotsByCalendarEventByLocationId(eachPatientVisit.CalendarEvent, ForDate) as List<BO.FreeSlots>;

                    if (currentEventSlots != null)
                    {
                        BO.FreeSlots ForDateEventSlots = new BO.FreeSlots();
                        ForDateEventSlots = currentEventSlots.Where(p => p.ForDate == ForDate).SingleOrDefault();

                        if (ForDateEventSlots != null)
                        {
                            foreach (var eachStartAndEndTimes in ForDateEventSlots.StartAndEndTimes)
                            {
                                BO.PatientVisitDashboard PatientVisitForDate = new BO.PatientVisitDashboard();
                                PatientVisitForDate.ID = 0;
                                PatientVisitForDate.CalendarEventId = eachPatientVisit.CalendarEventId;
                                PatientVisitForDate.CaseId = eachPatientVisit.CaseId;
                                PatientVisitForDate.PatientId = eachPatientVisit.PatientId;
                                if (eachPatientVisit.Patient != null && eachPatientVisit.Patient.User != null)
                                {
                                    PatientVisitForDate.PatientName = eachPatientVisit.Patient.User.FirstName + " " + eachPatientVisit.Patient.User.LastName;
                                }
                                PatientVisitForDate.LocationId = eachPatientVisit.LocationId;
                                PatientVisitForDate.RoomId = eachPatientVisit.RoomId;
                                if (eachPatientVisit.Room != null)
                                {
                                    PatientVisitForDate.RoomName = eachPatientVisit.Room.name;
                                }
                                PatientVisitForDate.DoctorId = eachPatientVisit.DoctorId;
                                if (eachPatientVisit.Doctor != null && eachPatientVisit.Doctor.user != null)
                                {
                                    PatientVisitForDate.DoctorName = eachPatientVisit.Doctor.user.FirstName + " " + eachPatientVisit.Doctor.user.LastName;
                                }
                                PatientVisitForDate.SpecialtyId = eachPatientVisit.SpecialtyId;
                                if (eachPatientVisit.Specialty != null)
                                {
                                    PatientVisitForDate.SpecialityName = eachPatientVisit.Specialty.Name;
                                }
                                PatientVisitForDate.EventStart = eachStartAndEndTimes.StartTime;
                                PatientVisitForDate.EventEnd = eachStartAndEndTimes.EndTime;
                                PatientVisitForDate.VisitStatusId = 1;
                                PatientVisitForDate.IsCancelled = eachPatientVisit.IsCancelled;
                                PatientVisitForDate.IsDeleted = eachPatientVisit.IsDeleted;

                                lstPatientVisitForDate.Add(PatientVisitForDate);
                            }
                        }
                    }
                }                
            }

            return lstPatientVisitForDate.OrderBy(p => p.EventStart).ToList();
        }
        #endregion

        #region Get Doctor Patient Visit For Date By CompanyId
        public override Object GetDoctorPatientVisitForDateByCompanyId(DateTime ForDate, int DoctorId, int CompanyId)
        {
            var CompanyLocations = _context.Locations.Where(p => p.CompanyID == CompanyId
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                     .Select(p => p.id);

            var patientVisit = _context.PatientVisits.Include("CalendarEvent")
                                                     .Include("Location")
                                                     .Include("Doctor")
                                                     .Include("Doctor.User")
                                                     .Include("Specialty")
                                                     .Include("Room")
                                                     .Include("Room.RoomTest")
                                                     .Include("Patient")
                                                     .Include("Patient.User")
                                                     .Where(p => CompanyLocations.Contains(p.LocationId) == true
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                     .ToList();

            if (patientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.PatientVisit> lstPatientVisit = new List<BO.PatientVisit>();
            foreach (PatientVisit item in patientVisit)
            {
                lstPatientVisit.Add(Convert<BO.PatientVisit, PatientVisit>(item));
            }

            List<BO.PatientVisitDashboard> lstPatientVisitForDate = new List<BO.PatientVisitDashboard>();

            List<BO.FreeSlots> currentEventSlots = new List<BO.FreeSlots>();
            CalendarEventRepository calEventRepo = new CalendarEventRepository(_context);

            List<int> CalendarEventIds = new List<int>();
            foreach (var eachPatientVisit in lstPatientVisit)
            {
                if (CalendarEventIds.Any(p => p == eachPatientVisit.CalendarEventId) == false)
                {
                    CalendarEventIds.Add(eachPatientVisit.CalendarEventId.Value);

                    currentEventSlots = calEventRepo.GetBusySlotsByCalendarEventByLocationId(eachPatientVisit.CalendarEvent, ForDate) as List<BO.FreeSlots>;

                    if (currentEventSlots != null)
                    {
                        BO.FreeSlots ForDateEventSlots = new BO.FreeSlots();
                        ForDateEventSlots = currentEventSlots.Where(p => p.ForDate == ForDate).SingleOrDefault();

                        if (ForDateEventSlots != null)
                        {
                            foreach (var eachStartAndEndTimes in ForDateEventSlots.StartAndEndTimes)
                            {
                                BO.PatientVisitDashboard PatientVisitForDate = new BO.PatientVisitDashboard();
                                PatientVisitForDate.ID = 0;
                                PatientVisitForDate.CalendarEventId = eachPatientVisit.CalendarEventId;
                                PatientVisitForDate.CaseId = eachPatientVisit.CaseId;
                                PatientVisitForDate.PatientId = eachPatientVisit.PatientId;
                                if (eachPatientVisit.Patient != null && eachPatientVisit.Patient.User != null)
                                {
                                    PatientVisitForDate.PatientName = eachPatientVisit.Patient.User.FirstName + " " + eachPatientVisit.Patient.User.LastName;
                                }
                                PatientVisitForDate.LocationId = eachPatientVisit.LocationId;
                                PatientVisitForDate.RoomId = eachPatientVisit.RoomId;
                                if (eachPatientVisit.Room != null)
                                {
                                    PatientVisitForDate.RoomName = eachPatientVisit.Room.name;
                                }
                                PatientVisitForDate.DoctorId = eachPatientVisit.DoctorId;
                                if (eachPatientVisit.Doctor != null && eachPatientVisit.Doctor.user != null)
                                {
                                    PatientVisitForDate.DoctorName = eachPatientVisit.Doctor.user.FirstName + " " + eachPatientVisit.Doctor.user.LastName;
                                }
                                PatientVisitForDate.SpecialtyId = eachPatientVisit.SpecialtyId;
                                if (eachPatientVisit.Specialty != null)
                                {
                                    PatientVisitForDate.SpecialityName = eachPatientVisit.Specialty.Name;
                                }
                                PatientVisitForDate.EventStart = eachStartAndEndTimes.StartTime;
                                PatientVisitForDate.EventEnd = eachStartAndEndTimes.EndTime;
                                PatientVisitForDate.VisitStatusId = 1;
                                PatientVisitForDate.IsCancelled = eachPatientVisit.IsCancelled;
                                PatientVisitForDate.IsDeleted = eachPatientVisit.IsDeleted;

                                lstPatientVisitForDate.Add(PatientVisitForDate);
                            }
                        }
                    }
                }                
            }

            return lstPatientVisitForDate.OrderBy(p => p.EventStart).ToList();
        }
        #endregion

        #region Get Statistical Data On Patient Visit
        public override Object GetStatisticalDataOnPatientVisit(DateTime FromDate, DateTime ToDate, int CompanyId)
        {
            ToDate = ToDate.Date.AddDays(1);

            var CompanyLocations = _context.Locations.Where(p => p.CompanyID == CompanyId
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                     .Select(p => p.id);

            var patientVisit = _context.PatientVisits.Include("CalendarEvent")
                                                     .Include("Location")
                                                     .Include("Doctor")
                                                     .Include("Doctor.User")
                                                     .Include("Room")
                                                     .Include("Room.RoomTest")
                                                     .Include("Patient")
                                                     .Include("Patient.User")
                                                     .Where(p => p.EventStart >= FromDate && p.EventStart < ToDate
                                                            && CompanyLocations.Contains(p.LocationId) == true
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                     .ToList();

            
            List<BO.PatientVisit> lstPatientVisit = new List<BO.PatientVisit>();
            foreach (PatientVisit item in patientVisit)
            {
                lstPatientVisit.Add(Convert<BO.PatientVisit, PatientVisit>(item));
            }

            int Appointments = 0, NoShows = 0, ReferralsInbound = 0, ReferralsOutbound = 0, NewCases = 0;
            Appointments = lstPatientVisit.Where(p => p.VisitStatusId == 2).Count();
            NoShows = lstPatientVisit.Where(p => p.VisitStatusId == 4).Count();

            var Referrals = _context.Referrals.Where(p => p.CreateDate >= FromDate && p.CreateDate < ToDate
                                                    && (p.FromCompanyId == CompanyId || p.ToCompanyId == CompanyId)
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                              .ToList();

            List<BO.Referral> lstReferral = new List<BO.Referral>();
            foreach (var item in Referrals)
            {
                ReferralRepository ReferralRepo = new ReferralRepository(_context);
                lstReferral.Add(ReferralRepo.Convert<BO.Referral, Referral>(item));
            }

            ReferralsInbound = lstReferral.Where(p => p.ToCompanyId == CompanyId).Count();
            ReferralsOutbound = lstReferral.Where(p => p.FromCompanyId == CompanyId).Count();

            var Cases = _context.Cases.Where(p => p.CreateDate >= FromDate && p.CreateDate < ToDate
                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                      .Join(_context.CaseCompanyMappings.Where(p => p.CompanyId == CompanyId && p.IsOriginator == true
                                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))),
                                            c => c.Id, ccm => ccm.CaseId, (c, ccm) => c)
                                      .ToList();

            NewCases = Cases.Count();



            return new {
                appointments = Appointments,
                noShows = NoShows,
                referralsInbound = ReferralsInbound,
                referralsOutbound = ReferralsOutbound,
                newCases = NewCases
            };
        }
        #endregion

        #region Get Doctor Patient Visit For Date By CompanyId
        public override Object GetOpenAppointmentSlotsForDoctorByCompanyId(DateTime ForDate, int DoctorId, int CompanyId)
        {
            var CompanyLocations = _context.Locations.Where(p => p.CompanyID == CompanyId
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                     .Join(_context.DoctorLocationSchedules.Where(p => p.DoctorID == DoctorId
                                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))),
                                                            l => l.id, dls => dls.LocationID, (l, dls) => l)
                                                     .Select(p => p.id)
                                                     .ToList();

            string DoctorName = _context.Doctors.Include("User")
                                                .Where(p => p.Id == DoctorId
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                .Select(p => p.User.FirstName + " " + p.User.LastName)
                                                .FirstOrDefault();

            List<BO.PatientVisitDashboard> lstPatientVisitForDate = new List<BO.PatientVisitDashboard>();

            using (CalendarEventRepository CalEvntRepo = new CalendarEventRepository(_context))
            {
                foreach (var eachLocation in CompanyLocations)
                {
                    var ResultFreeSlots = CalEvntRepo.GetFreeSlotsForDoctorByLocationId(DoctorId, eachLocation, ForDate, ForDate.Date.AddDays(1).AddSeconds(-1));
                    if (ResultFreeSlots is BO.ErrorObject)
                    {
                    }
                    else
                    {
                        List<BO.FreeSlots> freeSlots = ResultFreeSlots as List<BO.FreeSlots>;

                        foreach (var eachfreeSlot in freeSlots)
                        {
                            foreach (var eachStartAndEndTime in eachfreeSlot.StartAndEndTimes)
                            {
                                BO.PatientVisitDashboard PatientVisitForDate = new BO.PatientVisitDashboard();
                                
                                PatientVisitForDate.ID = 0;
                                PatientVisitForDate.CalendarEventId = null;
                                PatientVisitForDate.CaseId = null;
                                PatientVisitForDate.PatientId = null;
                                PatientVisitForDate.LocationId = eachLocation;
                                PatientVisitForDate.RoomId = null;
                                PatientVisitForDate.DoctorId = DoctorId;
                                PatientVisitForDate.DoctorName = DoctorName;
                                PatientVisitForDate.SpecialtyId = null;
                                PatientVisitForDate.EventStart = eachStartAndEndTime.StartTime;
                                PatientVisitForDate.EventEnd = eachStartAndEndTime.EndTime;
                                PatientVisitForDate.VisitStatusId = null;
                                PatientVisitForDate.IsCancelled = null;
                                PatientVisitForDate.IsDeleted = null;

                                lstPatientVisitForDate.Add(PatientVisitForDate);
                            }
                        }
                    }
                }
            }            

            return lstPatientVisitForDate.OrderBy(p => p.EventStart).ThenBy(p => p.DoctorName).ToList();
        }
        #endregion

        #region Get All Doctor Patient Visit For Date By CompanyId
        public override Object GetOpenAppointmentSlotsForAllDoctorByCompanyId(DateTime ForDate, int CompanyId)
        {
            var AllUsersInCompany = _context.UserCompanies.Where(p => p.CompanyID == CompanyId
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                          .Select(p => p.UserID);
            var AllValidUsers = _context.Users.Where(p => AllUsersInCompany.Contains(p.id) == true
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                              .Select(p => p.id);

            var AllDoctorsInCompany = _context.Doctors.Where(p => AllValidUsers.Contains(p.Id)
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                              .Select(p => p.Id)
                                              .ToList();

            List<BO.PatientVisitDashboard> lstDoctorPatientVisitForDate = new List<BO.PatientVisitDashboard>();

            foreach (var eachDoctor in AllDoctorsInCompany)
            {
                List<BO.PatientVisitDashboard> eachDoctorPatientVisitForDate = new List<BO.PatientVisitDashboard>();
                var result = GetOpenAppointmentSlotsForDoctorByCompanyId(ForDate, eachDoctor, CompanyId);
                if (result is List<BO.PatientVisitDashboard>)
                {
                    eachDoctorPatientVisitForDate = result as List<BO.PatientVisitDashboard>;
                }

                if (eachDoctorPatientVisitForDate.Count > 0)
                {
                    lstDoctorPatientVisitForDate.AddRange(eachDoctorPatientVisitForDate);
                }
            }            

            return lstDoctorPatientVisitForDate.OrderBy(p => p.EventStart).ThenBy(p => p.DoctorName).ToList();
        }
        #endregion

        #region Get By Location Id , Doctor Id And Company Id
        public override object GetByLocationDoctorAndCompanyId(int LocationId, int DoctorId, int CompanyId)
        {
            List<PatientVisit> lstPatientVisit = _context.PatientVisits.Include("Location").Include("Location.Company")
                                                                        .Include("CalendarEvent")
                                                                        .Include("Patient")
                                                                        .Include("Patient.User")
                                                                        .Include("Case")
                                                                        .Include("Doctor")
                                                                        .Include("Doctor.User")
                                                                        .Include("Room").Include("Room.RoomTest")
                                                                        .Include("Specialty")
                                                                        .Include("PatientVisitDiagnosisCodes").Include("PatientVisitDiagnosisCodes.DiagnosisCode")
                                                                        .Include("PatientVisitProcedureCodes").Include("PatientVisitProcedureCodes.ProcedureCode")
                                                                        .Where(p => p.LocationId == LocationId && p.DoctorId == DoctorId && p.Location.CompanyID == CompanyId
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<PatientVisit>();

            if (lstPatientVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location Id and Doctor Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisit> lstBOPatientVisit = new List<BO.PatientVisit>();
                lstPatientVisit.ForEach(p => lstBOPatientVisit.Add(Convert<BO.PatientVisit, PatientVisit>(p)));

                return lstBOPatientVisit;
            }
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
