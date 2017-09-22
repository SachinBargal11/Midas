using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ical.Net;
using Ical.Net.DataTypes;
using Ical.Net.Serialization.iCalendar.Serializers;
using Ical.Net.Serialization;
using Ical.Net.Interfaces.DataTypes;
using MIDAS.GBX.DataRepository.EntityRepository.Common;
using BO = MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.EntityRepository;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class AttorneyVisitRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<AttorneyVisit> _dbpatientVisit;

        public AttorneyVisitRepository(MIDASGBXEntities context) : base(context)
        {
            _dbpatientVisit = context.Set<AttorneyVisit>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.AttorneyVisit AttorneyVisitBO = (BO.AttorneyVisit)(object)entity;
            var result = AttorneyVisitBO.Validate(AttorneyVisitBO);
            return result;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            if (entity is AttorneyVisit)
            {
                AttorneyVisit AttorneyVisitDB = entity as AttorneyVisit;

                if (AttorneyVisitDB == null)
                    return default(T);

                BO.AttorneyVisit AttorneyVisitBO = new BO.AttorneyVisit();
                AttorneyVisitBO.ID = AttorneyVisitDB.Id;
                AttorneyVisitBO.CalendarEventId = AttorneyVisitDB.CalendarEventId;
                AttorneyVisitBO.CaseId = AttorneyVisitDB.CaseId;
                AttorneyVisitBO.PatientId = AttorneyVisitDB.PatientId;
                AttorneyVisitBO.CompanyId = AttorneyVisitDB.CompanyId;
                AttorneyVisitBO.AttorneyId = AttorneyVisitDB.AttorneyId;
                AttorneyVisitBO.EventStart = AttorneyVisitDB.EventStart;
                AttorneyVisitBO.EventEnd = AttorneyVisitDB.EventEnd;
                AttorneyVisitBO.Subject = AttorneyVisitDB.Subject;
                AttorneyVisitBO.VisitStatusId = AttorneyVisitDB.VisitStatusId;
                AttorneyVisitBO.ContactPerson = AttorneyVisitDB.ContactPerson;
                AttorneyVisitBO.Agenda = AttorneyVisitDB.Agenda;

                AttorneyVisitBO.IsDeleted = AttorneyVisitDB.IsDeleted;
                AttorneyVisitBO.CreateByUserID = AttorneyVisitDB.CreateByUserID;
                AttorneyVisitBO.UpdateByUserID = AttorneyVisitDB.UpdateByUserID;

                if (AttorneyVisitDB.Patient != null)
                {
                    BO.Patient PatientBO = new BO.Patient();
                    using (PatientRepository patientRepo = new PatientRepository(_context))
                    {
                        PatientBO = patientRepo.Convert<BO.Patient, Patient>(AttorneyVisitDB.Patient);
                        AttorneyVisitBO.Patient = PatientBO;
                    }
                }

                if (AttorneyVisitDB.Case != null)
                {
                    BO.Case CaseBO = new BO.Case();
                    using (CaseRepository caseRepo = new CaseRepository(_context))
                    {
                        CaseBO = caseRepo.Convert<BO.Case, Case>(AttorneyVisitDB.Case);
                        AttorneyVisitBO.Case = CaseBO;

                        if (AttorneyVisitDB.Case.PatientAccidentInfoes != null && AttorneyVisitDB.Case.PatientAccidentInfoes.Count > 0)
                        {
                            List<BO.PatientAccidentInfo> PatientAccidentInfoBOList = new List<BO.PatientAccidentInfo>();
                            using (PatientAccidentInfoRepository patientAccidentInfoRepo = new PatientAccidentInfoRepository(_context))
                            {
                                foreach (PatientAccidentInfo eachPatientInsuranceInfo in AttorneyVisitDB.Case.PatientAccidentInfoes)
                                {
                                    if (eachPatientInsuranceInfo.IsDeleted.HasValue == false || (eachPatientInsuranceInfo.IsDeleted.HasValue == true && eachPatientInsuranceInfo.IsDeleted.Value == false))
                                    {
                                        PatientAccidentInfoBOList.Add(patientAccidentInfoRepo.Convert<BO.PatientAccidentInfo, PatientAccidentInfo>(eachPatientInsuranceInfo));
                                    }
                                }

                                AttorneyVisitBO.Case.PatientAccidentInfoes = PatientAccidentInfoBOList;
                            }
                        }
                    }
                }                

                if (AttorneyVisitDB.Company != null)
                {
                    BO.Company boCompany = new BO.Company();
                    using (CompanyRepository cmp = new CompanyRepository(_context))
                    {
                        boCompany = cmp.Convert<BO.Company, Company>(AttorneyVisitDB.Company);
                        AttorneyVisitBO.Company = boCompany;
                    }
                }

                if (AttorneyVisitDB.CalendarEvent != null)
                {
                    AttorneyVisitBO.CalendarEvent = new BO.CalendarEvent();

                    using (CalendarEventRepository calEventRep = new CalendarEventRepository(_context))
                    {
                        AttorneyVisitBO.CalendarEvent = calEventRep.Convert<BO.CalendarEvent, CalendarEvent>(AttorneyVisitDB.CalendarEvent);
                    }
                }

                return (T)(object)AttorneyVisitBO;
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

            return default(T);
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.AttorneyVisit AttorneyVisitBO = (BO.AttorneyVisit)(object)entity;
            BO.CalendarEvent CalendarEventBO = AttorneyVisitBO.CalendarEvent;

            AttorneyVisit AttorneyVisitDB = new AttorneyVisit();
            bool sendMessage = false;

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                bool IsEditMode = false;
                bool IsAddModeCalendarEvent = false;
                IsEditMode = (AttorneyVisitBO != null && AttorneyVisitBO.ID > 0) ? true : false;
                
                if (AttorneyVisitBO.ID <= 0 && AttorneyVisitBO.PatientId.HasValue == false && AttorneyVisitBO.CompanyId.HasValue == false)
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
                }
                else
                {
                    if (IsEditMode == false && AttorneyVisitBO.CalendarEventId <= 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Calendar Event details.", ErrorLevel = ErrorLevel.Error };
                    }
                    CalendarEventDB = null;
                }
                #endregion

                #region Patient Visit
                if (AttorneyVisitBO != null
                    && ((AttorneyVisitBO.ID <= 0 && AttorneyVisitBO.PatientId.HasValue == true && AttorneyVisitBO.CompanyId.HasValue == true)
                        || (AttorneyVisitBO.ID > 0)))
                {
                    bool Add_patientVisitDB = false;
                    AttorneyVisitDB = _context.AttorneyVisits.Where(p => p.Id == AttorneyVisitBO.ID
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault();

                    if (AttorneyVisitDB == null && AttorneyVisitBO.ID <= 0)
                    {
                        AttorneyVisitDB = new AttorneyVisit();
                        Add_patientVisitDB = true;
                        sendMessage = true;
                    }
                    else if (AttorneyVisitDB == null && AttorneyVisitBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Attorney Visit doesn't exists.", ErrorLevel = ErrorLevel.Error };
                    }
                    AttorneyVisitDB.CalendarEventId = (CalendarEventDB != null && CalendarEventDB.Id > 0) ? CalendarEventDB.Id : ((AttorneyVisitBO.CalendarEventId.HasValue == true) ? AttorneyVisitBO.CalendarEventId.Value : AttorneyVisitDB.CalendarEventId);

                    if (IsEditMode == false && AttorneyVisitBO.CaseId.HasValue == false)
                    {
                        int CaseId = _context.Cases.Where(p => p.PatientId == AttorneyVisitBO.PatientId.Value && p.CaseStatusId == 1
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .Select(p => p.Id)
                                                   .FirstOrDefault<int>();

                        if (CaseId == 0)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "No open case exists for given patient.", ErrorLevel = ErrorLevel.Error };
                        }
                        else if (AttorneyVisitBO.CaseId.HasValue == true && AttorneyVisitBO.CaseId.Value != CaseId)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Case id dosent match with open case is for the given patient.", ErrorLevel = ErrorLevel.Error };
                        }
                        else
                        {
                            AttorneyVisitDB.CaseId = CaseId;
                        }
                    }
                    else
                    {
                        AttorneyVisitDB.CaseId = AttorneyVisitBO.CaseId.HasValue == false ? AttorneyVisitDB.CaseId : AttorneyVisitBO.CaseId.Value;
                    }

                    AttorneyVisitDB.PatientId = IsEditMode == true && AttorneyVisitBO.PatientId.HasValue == false ? AttorneyVisitDB.PatientId : (AttorneyVisitBO.PatientId.HasValue == false ? AttorneyVisitDB.PatientId : AttorneyVisitBO.PatientId.Value);
                    AttorneyVisitDB.AttorneyId = IsEditMode == true && AttorneyVisitBO.AttorneyId.HasValue == false ? AttorneyVisitDB.AttorneyId : (AttorneyVisitBO.AttorneyId.HasValue == false ? AttorneyVisitDB.AttorneyId : AttorneyVisitBO.AttorneyId.Value);
                    AttorneyVisitDB.CompanyId = IsEditMode == true && AttorneyVisitBO.CompanyId.HasValue == false ? AttorneyVisitDB.CompanyId : (AttorneyVisitBO.CompanyId.HasValue == false ? AttorneyVisitDB.CompanyId : AttorneyVisitBO.CompanyId.Value);

                    AttorneyVisitDB.EventStart = AttorneyVisitBO.EventStart;
                    AttorneyVisitDB.EventEnd = AttorneyVisitBO.EventEnd;

                    AttorneyVisitDB.Subject = AttorneyVisitBO.Subject;
                    AttorneyVisitDB.VisitStatusId = AttorneyVisitBO.VisitStatusId;
                    AttorneyVisitDB.ContactPerson = AttorneyVisitBO.ContactPerson;
                    AttorneyVisitDB.Agenda = AttorneyVisitBO.Agenda;

                    if (IsEditMode == false)
                    {
                        AttorneyVisitDB.CreateByUserID = AttorneyVisitBO.CreateByUserID;
                        AttorneyVisitDB.CreateDate = DateTime.UtcNow;
                    }
                    else
                    {
                        AttorneyVisitDB.UpdateByUserID = AttorneyVisitBO.UpdateByUserID;
                        AttorneyVisitDB.UpdateDate = DateTime.UtcNow;
                    }

                    if (Add_patientVisitDB == true)
                    {
                        AttorneyVisitDB = _context.AttorneyVisits.Add(AttorneyVisitDB);
                    }
                    _context.SaveChanges();

                    //if (AttorneyVisitDB.PatientId.HasValue == true && AttorneyVisitDB.CaseId.HasValue == true && AttorneyVisitDB.AncillaryProviderId.HasValue == true)
                    //{
                    //    using (PatientRepository patientRepo = new PatientRepository(_context))
                    //    {
                    //        patientRepo.AssociatePatientWithAncillaryCompany(AttorneyVisitDB.PatientId.Value, AttorneyVisitDB.CaseId.Value, AttorneyVisitBO.AncillaryProviderId.Value, AttorneyVisitBO.AddedByCompanyId);
                    //    }
                    //}
                }
                else
                {
                    if (IsEditMode == false && IsAddModeCalendarEvent == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Attorney Visit details.", ErrorLevel = ErrorLevel.Error };
                    }
                    AttorneyVisitDB = null;
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                if (AttorneyVisitDB != null)
                {
                    AttorneyVisitDB = _context.AttorneyVisits.Include("CalendarEvent")
                                                             .Include("Company")
                                                             .Include("Patient").Include("Patient.User").Include("Patient.User.UserCompanies")                                                            
                                                             .Where(p => p.Id == AttorneyVisitDB.Id
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                             .FirstOrDefault<AttorneyVisit>();
                }
                else if (CalendarEventDB != null)
                {
                    AttorneyVisitDB = _context.AttorneyVisits.Include("CalendarEvent")
                                                             .Where(p => p.CalendarEvent.Id == CalendarEventDB.Id
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                             .FirstOrDefault<AttorneyVisit>();
                }
            }

            if (sendMessage == true)
            {
                try
                {
                    IdentityHelper identityHelper = new IdentityHelper();

                    User AdminUser = _context.Users.Include("ContactInfo").Include("UserCompanies").Include("UserCompanies.company")
                                        .Where(p => p.UserName == identityHelper.Email && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                            .FirstOrDefault();

                   

                    //var AdminUser_CompanyId = AdminUser.UserCompanies.Select(p2 => p2.CompanyID).FirstOrDefault();
                  
                    List<User> lstStaff = _context.Users.Include("ContactInfo").Include("UserCompanies")
                                                     .Where(p => p.UserType == 2 
                                                        && p.UserCompanies.Any(p1 => p1.CompanyID == AttorneyVisitBO.CompanyId 
                                                            && (p1.IsDeleted.HasValue == false || (p1.IsDeleted.HasValue == true && p1.IsDeleted.Value == false))) == true
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                      .ToList();

                    User patientInfo = _context.Users.Include("ContactInfo").Include("UserCompanies").Include("UserCompanies.company")
                                      .Where(p => p.id == AttorneyVisitBO.PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                          .FirstOrDefault();

                    User attorneyInfo = _context.Users.Include("ContactInfo").Include("UserCompanies").Include("UserCompanies.company")
                                      .Where(p => p.id == AttorneyVisitBO.AttorneyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                          .FirstOrDefault();



                    string MailMessageForPatient = "<B> New Appointment Scheduled</B></ BR >Attorney provider has scheduled a client visit with Attorney: " + attorneyInfo.FirstName + " " + attorneyInfo.LastName + "<br><br>Thanks";                                                  
                    string NotificationForPatient = "Attorney provider has schedule a client visit with Attorney: " + attorneyInfo.FirstName + " " + attorneyInfo.LastName;                  
                    string SmsMessageForPatient = "<B> New Appointment Scheduled</B></ BR >Attorney provider has scheduled a patient visit with Attorney: " + attorneyInfo.FirstName + " " + attorneyInfo.LastName + "<br><br>Thanks";
                   
                                 
                    string MailMessageForStaff = "<B> New Appointment Scheduled</B></BR>A new Appointment has been scheduled for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + "<br><br>Thanks";
                    string NotificationForStaff = "A new Appointment has been scheduled for patient :" + patientInfo.FirstName + " " + patientInfo.LastName;
                    string SmsMessageForStaff = "<B> New Appointment Scheduled</B></BR>A new Appointment has been scheduled for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + "<br><br>Thanks";



                    #region  patient mail object

                    BO.EmailMessage emPatient = new BO.EmailMessage();
                    emPatient.ApplicationName = "Midas";
                    emPatient.ToEmail = patientInfo.UserName;                 
                    emPatient.EMailSubject = "MIDAS Notification";
                    emPatient.EMailBody = MailMessageForPatient;
                    #endregion

                    #region patient sms object
                    BO.SMS smsPatient = new BO.SMS();
                    smsPatient.ApplicationName = "Midas";
                    smsPatient.ToNumber = patientInfo.ContactInfo.CellPhone;
                    smsPatient.Message = SmsMessageForPatient;
                    #endregion 

                   
                    NotificationHelper nh = new NotificationHelper();
                    MessagingHelper mh = new MessagingHelper();

                        #region Patient
                        nh.PushNotification(patientInfo.UserName, AdminUser.UserCompanies.Select(p => p.Company.id).FirstOrDefault(), NotificationForPatient, "New Appointment Schedule");  //patientInfo.UserName for Patient user email 
                        mh.SendEmailAndSms(patientInfo.UserName, AdminUser.UserCompanies.Select(p => p.Company.id).FirstOrDefault(), emPatient, smsPatient);
                        #endregion

                        foreach (var item in lstStaff)
                        {
                            #region  staff mail object                 
                            BO.EmailMessage emStaff = new BO.EmailMessage();
                            emStaff.ApplicationName = "Midas";
                            emStaff.ToEmail = item.UserName;
                            emStaff.EMailSubject = "MIDAS Notification";
                            emStaff.EMailBody = MailMessageForStaff;
                            #endregion

                            #region admin sms object
                            BO.SMS smsStaff = new BO.SMS();
                            smsStaff.ApplicationName = "Midas";
                            smsStaff.ToNumber = item.ContactInfo.CellPhone;
                            smsStaff.Message = SmsMessageForStaff;
                            #endregion

                            nh.PushNotification(item.UserName, item.UserCompanies.Select(p => p.Company.id).FirstOrDefault(), NotificationForStaff, "New Appointment Schedule"); //item.UserName
                            mh.SendEmailAndSms(item.UserName, item.UserCompanies.Select(p => p.Company.id).FirstOrDefault(), emStaff, smsStaff);
                        }
                    
                  
                }
                catch (Exception ex)
                {

                }
            }

            var res = Convert<BO.AttorneyVisit, AttorneyVisit>(AttorneyVisitDB);
            return (object)res;
        }
        #endregion

        #region Get By Company And Attorney Id
        public override object GetByCompanyAndAttorneyId(int CompanyId, int AttorneyId)
        {
            List<AttorneyVisit> lstAttorneyVisit = _context.AttorneyVisits.Include("CalendarEvent")
                                                                          .Include("Patient")
                                                                          .Include("Patient.User")
                                                                          .Include("Case")
                                                                          .Include("Company")
                                                                          .Where(p => p.CompanyId == CompanyId
                                                                                && ((AttorneyId > 0 && p.AttorneyId == AttorneyId) || (AttorneyId <= 0))
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                          .ToList<AttorneyVisit>();

            if (lstAttorneyVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Company and Attorney Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.AttorneyVisit> lstBOAttorneyVisit = new List<BO.AttorneyVisit>();
                lstAttorneyVisit.ForEach(p => lstBOAttorneyVisit.Add(Convert<BO.AttorneyVisit, AttorneyVisit>(p)));

                return lstBOAttorneyVisit;
            }
        }
        #endregion

        #region Get By Company And Attorney Id
        //public override object GetByLocationAndAttorneyId(int LocationId, int AttorneyId)
        //{
        //    List<AttorneyVisit> lstAttorneyVisit = _context.AttorneyVisits.Include("CalendarEvent")
        //                                                                  .Include("Patient")
        //                                                                  .Include("Patient.User")
        //                                                                  .Include("Case")
        //                                                                  .Include("Location").Include("Location.Company")
        //                                                                  .Where(p => p.LocationId == LocationId
        //                                                                        && ((AttorneyId > 0 && p.AttorneyId == AttorneyId) || (AttorneyId <= 0))
        //                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
        //                                                                  .ToList<AttorneyVisit>();

        //    if (lstAttorneyVisit == null)
        //    {
        //        return new BO.ErrorObject { ErrorMessage = "No visit found for this Company and Attorney Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
        //    }
        //    else
        //    {
        //        List<BO.AttorneyVisit> lstBOAttorneyVisit = new List<BO.AttorneyVisit>();
        //        lstAttorneyVisit.ForEach(p => lstBOAttorneyVisit.Add(Convert<BO.AttorneyVisit, AttorneyVisit>(p)));

        //        return lstBOAttorneyVisit;
        //    }
        //}
        #endregion

        #region Get By Company And Attorney Id
        public override object GetByPatientId(int PatientId)
        {
            List<AttorneyVisit> lstAttorneyVisit = _context.AttorneyVisits.Include("CalendarEvent")
                                                                          .Include("Patient")
                                                                          .Include("Patient.User")
                                                                          .Include("Case")
                                                                          .Include("Company")
                                                                          .Where(p => p.PatientId == PatientId
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                          .ToList<AttorneyVisit>();

            if (lstAttorneyVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Company and Attorney Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.AttorneyVisit> lstBOAttorneyVisit = new List<BO.AttorneyVisit>();
                lstAttorneyVisit.ForEach(p => lstBOAttorneyVisit.Add(Convert<BO.AttorneyVisit, AttorneyVisit>(p)));

                return lstBOAttorneyVisit;
            }
        }
        #endregion

        #region Get By Id
        public override object Get(int id)
        {
            AttorneyVisit AttorneyVisit = _context.AttorneyVisits.Include("CalendarEvent")
                                                                          .Include("Patient")
                                                                          .Include("Patient.User")
                                                                          .Include("Case")
                                                                          .Include("Company")
                                                                          .Where(p => p.Id == id
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                          .FirstOrDefault<AttorneyVisit>();

            if (AttorneyVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.AttorneyVisit> lstBOAttorneyVisit = new List<BO.AttorneyVisit>();
                var res =  Convert<BO.AttorneyVisit, AttorneyVisit>(AttorneyVisit);

                return (object)res;
            }
        }
        #endregion

        #region Get By Case Id
        public override object GetByCaseId(int caseId)
        {
            List<AttorneyVisit> lstAttorneyVisit = _context.AttorneyVisits.Include("CalendarEvent")
                                                                          .Include("Patient")
                                                                          .Include("Patient.User")
                                                                          .Include("Case")
                                                                          .Include("Company")
                                                                          .Where(p => p.CaseId == caseId
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                          .ToList<AttorneyVisit>();

            if (lstAttorneyVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.AttorneyVisit> lstBOAttorneyVisit = new List<BO.AttorneyVisit>();
                lstAttorneyVisit.ForEach(p => lstBOAttorneyVisit.Add(Convert<BO.AttorneyVisit, AttorneyVisit>(p)));

                return lstBOAttorneyVisit;
            }
        }
        #endregion

        #region Get Attorney Visit For Date By CompanyId
        public override Object GetAttorneyVisitForDateByCompanyId(DateTime ForDate, int CompanyId)
        {
            var attorneyVisit = _context.AttorneyVisits.Include("CalendarEvent")
                                                       .Include("Patient")
                                                       .Include("Patient.User")
                                                       .Where(p => p.CompanyId == CompanyId
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)));

            if (attorneyVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.AttorneyVisit> lstAttorneyVisit = new List<BO.AttorneyVisit>();
            foreach (AttorneyVisit item in attorneyVisit)
            {
                lstAttorneyVisit.Add(Convert<BO.AttorneyVisit, AttorneyVisit>(item));
            }

            List<BO.AttorneyVisitDashboard> lstAttorneyVisitDashboardForDate = new List<BO.AttorneyVisitDashboard>();

            List<BO.FreeSlots> currentEventSlots = new List<BO.FreeSlots>();
            CalendarEventRepository calEventRepo = new CalendarEventRepository(_context);

            foreach (var eachAttorneyVisit in lstAttorneyVisit)
            {
                currentEventSlots = calEventRepo.GetBusySlotsByCalendarEventByLocationId(eachAttorneyVisit.CalendarEvent, ForDate) as List<BO.FreeSlots>;

                if (currentEventSlots != null)
                {
                    BO.FreeSlots ForDateEventSlots = new BO.FreeSlots();
                    ForDateEventSlots = currentEventSlots.Where(p => p.ForDate == ForDate).SingleOrDefault();

                    if (ForDateEventSlots != null)
                    {
                        foreach (var eachStartAndEndTimes in ForDateEventSlots.StartAndEndTimes)
                        {
                            BO.AttorneyVisitDashboard AttorneyVisitDashboardForDate = new BO.AttorneyVisitDashboard();
                            AttorneyVisitDashboardForDate.ID = 0;
                            AttorneyVisitDashboardForDate.CalendarEventId = eachAttorneyVisit.CalendarEventId;
                            AttorneyVisitDashboardForDate.CaseId = eachAttorneyVisit.CaseId;
                            AttorneyVisitDashboardForDate.PatientId = eachAttorneyVisit.PatientId;
                            if (eachAttorneyVisit.Patient != null && eachAttorneyVisit.Patient.User != null)
                            {
                                AttorneyVisitDashboardForDate.PatientName = eachAttorneyVisit.Patient.User.FirstName + " " + eachAttorneyVisit.Patient.User.LastName;
                            }
                            AttorneyVisitDashboardForDate.AttorneyId = eachAttorneyVisit.AttorneyId;
                            AttorneyVisitDashboardForDate.EventStart = eachStartAndEndTimes.StartTime;
                            AttorneyVisitDashboardForDate.EventEnd = eachStartAndEndTimes.EndTime;
                            AttorneyVisitDashboardForDate.Subject = eachAttorneyVisit.Subject;
                            AttorneyVisitDashboardForDate.VisitStatusId = 1;
                            AttorneyVisitDashboardForDate.ContactPerson = eachAttorneyVisit.ContactPerson;
                            AttorneyVisitDashboardForDate.CompanyId = eachAttorneyVisit.CompanyId;
                            AttorneyVisitDashboardForDate.Agenda = eachAttorneyVisit.Agenda;
                            AttorneyVisitDashboardForDate.IsDeleted = eachAttorneyVisit.IsDeleted;

                            lstAttorneyVisitDashboardForDate.Add(AttorneyVisitDashboardForDate);
                        }
                    }
                }
            }

            return lstAttorneyVisitDashboardForDate;
        }
        #endregion

        #region Delete By Id
        public override object Delete(int id)
        {
            var attorneyVisit = _context.AttorneyVisits.Include("CalendarEvent")
                                                       .Where(p => p.Id == id
                                                              && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                       .FirstOrDefault<AttorneyVisit>();

            if (attorneyVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                attorneyVisit.CalendarEvent.IsDeleted = true;
                attorneyVisit.IsDeleted = true;
                _context.SaveChanges();

                var res = Convert<BO.AttorneyVisit, AttorneyVisit>(attorneyVisit);

                return (object)res;
            }
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
