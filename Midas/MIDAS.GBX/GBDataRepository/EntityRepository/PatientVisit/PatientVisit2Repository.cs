using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class PatientVisit2Repository : BaseEntityRepo, IDisposable
    {
        private DbSet<PatientVisit2> _dbPatientVisit2;

        public PatientVisit2Repository(MIDASGBXEntities context) : base(context)
        {
            _dbPatientVisit2 = context.Set<PatientVisit2>();
            context.Configuration.ProxyCreationEnabled = false;
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
            
            patientVisit2BO.IsDeleted = patientVisit2.IsDeleted;
            patientVisit2BO.CreateByUserID = patientVisit2.CreateByUserID;
            patientVisit2BO.UpdateByUserID = patientVisit2.UpdateByUserID;

            patientVisit2BO.CalendarEvent = new BO.CalendarEvent();

            using (CalendarEventRepository calEventRep = new CalendarEventRepository(_context))
            {
                patientVisit2BO.CalendarEvent = calEventRep.Convert<BO.CalendarEvent, CalendarEvent>(patientVisit2.CalendarEvent);
            }
            
            return (T)(object)patientVisit2BO;
            
        }
        #endregion

        #region Get By Location Id
        public override object GetByLocationId(int id)
        {
            List<PatientVisit2> lstPatientVisit = _context.PatientVisit2.Include("CalendarEvent")
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
            List<PatientVisit2> lstPatientVisit = _context.PatientVisit2.Include("CalendarEvent")
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

        #region Get By Location Id And Doctor Id
        public override object Get2(int LocationId, int DoctorId)
        {
            List<PatientVisit2> lstPatientVisit = _context.PatientVisit2.Include("CalendarEvent")
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

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
