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

using Ical.Net;
using Ical.Net.DataTypes;
using Ical.Net.Serialization.iCalendar.Serializers;
using Ical.Net.Serialization;
using Ical.Net.Interfaces.DataTypes;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class IMEvisitRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<IMEVisit> _dbIMEVisit;
        private Dictionary<string, string> dictionary = new Dictionary<string, string>();

        public IMEvisitRepository(MIDASGBXEntities context) : base(context)
        {
            _dbIMEVisit = context.Set<IMEVisit>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.IMEVisit IMEVisit = (BO.IMEVisit)(object)entity;
            var result = IMEVisit.Validate(IMEVisit);
            return result;
        }
        #endregion

        #region Entity Conversion
        public T ConvertIMEvisit<T, U>(U entity)
        {
            if (entity is IMEVisit)
            {
                IMEVisit IMEVisit = entity as IMEVisit;

                if (IMEVisit == null)
                    return default(T);

                BO.IMEVisit IMEVisitBO = new BO.IMEVisit();
                IMEVisitBO.ID = IMEVisit.ID;
                IMEVisitBO.CalendarEventId = IMEVisit.CalendarEventId;
                IMEVisitBO.CaseId = IMEVisit.CaseId;
                IMEVisitBO.PatientId = IMEVisit.PatientId;
                IMEVisitBO.EventStart = IMEVisit.EventStart;
                IMEVisitBO.EventEnd = IMEVisit.EventEnd;
                IMEVisitBO.Notes = IMEVisit.Notes;
                IMEVisitBO.VisitStatusId = IMEVisit.VisitStatusId;
                IMEVisitBO.TransportProviderId = IMEVisit.TransportProviderId;
                IMEVisitBO.DoctorName = IMEVisit.DoctorName;
                IMEVisitBO.VisitCreatedByCompanyId = IMEVisit.VisitCreatedByCompanyId;
                IMEVisitBO.IsDeleted = IMEVisit.IsDeleted;
                IMEVisitBO.CreateByUserID = IMEVisit.CreateByUserID;
                IMEVisitBO.UpdateByUserID = IMEVisit.UpdateByUserID;

                if (IMEVisit.Patient != null)
                {
                    BO.Patient PatientBO = new BO.Patient();
                    using (PatientRepository patientRepo = new PatientRepository(_context))
                    {
                        PatientBO = patientRepo.Convert<BO.Patient, Patient>(IMEVisit.Patient);
                        IMEVisitBO.Patient = PatientBO;
                    }
                }

                if (IMEVisit.TransportProviderId != null)
                {
                    BO.Company CompanyBO = new BO.Company();
                    using (PatientRepository patientRepo = new PatientRepository(_context))
                    {
                        CompanyBO = patientRepo.Convert<BO.Company, Company>(IMEVisit.Company);
                        IMEVisitBO.Company = CompanyBO;
                    }
                }

                if (IMEVisit.CalendarEvent != null)
                {
                    IMEVisitBO.CalendarEvent = new BO.CalendarEvent();

                    using (CalendarEventRepository calEventRep = new CalendarEventRepository(_context))
                    {
                        IMEVisitBO.CalendarEvent = calEventRep.Convert<BO.CalendarEvent, CalendarEvent>(IMEVisit.CalendarEvent);
                    }
                }

                return (T)(object)IMEVisitBO;
            }

            return default(T);
        }
        #endregion

        #region SaveIMEVisit
        public override object SaveIMEVisit<T>(T entity)
        {
            BO.IMEVisit IMEVisitBO = (BO.IMEVisit)(object)entity;
            BO.CalendarEvent CalendarEventBO = IMEVisitBO.CalendarEvent;
            string patientUserName = string.Empty;
            bool sendNotification = false;
            bool sendMessage = false;

            //CalenderEventBO
            if (CalendarEventBO != null)
            {
                List<BO.FreeSlots> currentEventSlots = new List<BO.FreeSlots>();
                CalendarEventRepository calEventRepo = new CalendarEventRepository(_context);
                currentEventSlots = calEventRepo.GetBusySlotsByCalendarEvent(CalendarEventBO) as List<BO.FreeSlots>;

                if (currentEventSlots.Count > 0)
                {
                    DateTime dtStartDate = currentEventSlots.Min(p => p.ForDate);
                    DateTime dtEndDate = currentEventSlots.Max(p => p.ForDate).AddDays(1);

                    List<BO.StartAndEndTime> busySlots = new List<BO.StartAndEndTime>();

                    if (IMEVisitBO.PatientId != null)
                    {
                        var result = calEventRepo.GetBusySlotsForPatients(IMEVisitBO.PatientId.Value, dtStartDate, dtEndDate);
                        if (result is BO.ErrorObject)
                        {
                            return result;
                        }
                        else
                        {
                            busySlots = result as List<BO.StartAndEndTime>;
                        }
                    }
                    if (busySlots != null && busySlots.Count > 0)
                    {
                        foreach (var eachDayEventSlot in currentEventSlots)
                        {
                            DateTime ForDate = eachDayEventSlot.ForDate;
                            foreach (var eachEventSlot in eachDayEventSlot.StartAndEndTimes)
                            {
                                DateTime StartTime = eachEventSlot.StartTime;
                                DateTime EndTime = eachEventSlot.EndTime;
                                var StartAndEndTimesForDate = busySlots.Where(p => p.StartTime.Date == ForDate).ToList();
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
                                                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "The patient dosent have continued free slots on the planned visit time of " + checkContinuation.Value.ToString() + ".", ErrorLevel = ErrorLevel.Error };
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
                                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "The patient dosent have free slots on the planned visit time of " + ForDate.ToShortDateString() + " (" + StartTime.ToShortTimeString() + " - " + EndTime.ToShortTimeString() + ").", ErrorLevel = ErrorLevel.Error };
                                    }
                                }
                                else
                                {
                                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "The patient is not availabe on " + ForDate.ToShortDateString() + ".", ErrorLevel = ErrorLevel.Error };
                                }
                            }
                        }
                    }
                }
            }

            IMEVisit IMEVisitDB = new IMEVisit();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                bool IsEditMode = false;
                bool IsAddModeCalendarEvent = false;

                IsEditMode = (IMEVisitBO != null && IMEVisitBO.ID > 0) ? true : false;
                string patientContactNumber = null;
                User patientuser = null;

                if (IMEVisitBO.PatientId == null && IMEVisitBO.ID > 0)
                {
                    var IMEvisitData = _context.IMEVisits.Where(p => p.ID == IMEVisitBO.ID).Select(p => new { p.PatientId, p.CaseId }).FirstOrDefault();

                    patientuser = _context.Users.Where(usr => usr.id == IMEvisitData.PatientId).Include("ContactInfo").FirstOrDefault();
                }
                else if (IMEVisitBO.PatientId != null && IMEVisitBO.PatientId > 0)
                {
                    patientuser = _context.Users.Where(usr => usr.id == IMEVisitBO.PatientId).Include("ContactInfo").FirstOrDefault();
                }

                if (patientuser != null)
                {
                    patientUserName = patientuser.UserName;
                    patientContactNumber = patientuser.ContactInfo.CellPhone;
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

                    //if (string.IsNullOrWhiteSpace(patientUserName) == false && dictionary.ContainsKey(patientUserName))
                    //{
                    //    if (CalendarEventDB.EventStart != CalendarEventBO.EventStart.Value) sendNotification = true;
                    //}

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

                    //#region send SMS notification 
                    //try
                    //{
                    //    if (sendNotification)
                    //    {
                    //        if (patientContactNumber != null && patientContactNumber != string.Empty)
                    //        {
                    //            string to = patientContactNumber;
                    //             //string body = "Your appointment has been scheduled at " + CalendarEventBO.EventStart.Value + " in " + _context.Locations.Where(loc => loc.id == patientVisitBO.LocationId).Select(lc => lc.Name).FirstOrDefault();
                    //            string body = "";
                    //            string msgid = SMSGateway.SendSMS(to, body);
                    //        }
                    //    }
                    //}
                    //catch (Exception) { }
                    //#endregion
                }
                else
                {
                    if (IsEditMode == false && IMEVisitBO.CalendarEventId <= 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Calendar Event details.", ErrorLevel = ErrorLevel.Error };
                    }
                    CalendarEventDB = null;
                }
                #endregion

                #region IME Visit
                if (IMEVisitBO != null && ((IMEVisitBO.ID <= 0 && IMEVisitBO.PatientId.HasValue == true) || (IMEVisitBO.ID > 0)))
                {
                    bool Add_IMEVisitDB = false;
                    IMEVisitDB = _context.IMEVisits.Where(p => p.ID == IMEVisitBO.ID
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault();

                    if (IMEVisitDB == null && IMEVisitBO.ID <= 0)
                    {
                        IMEVisitDB = new IMEVisit();
                        Add_IMEVisitDB = true;
                        sendMessage = true;
                    }
                    else if (IMEVisitDB == null && IMEVisitBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient Visit doesn't exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    IMEVisitDB.CalendarEventId = (CalendarEventDB != null && CalendarEventDB.Id > 0) ? CalendarEventDB.Id : ((IMEVisitBO.CalendarEventId.HasValue == true) ? IMEVisitBO.CalendarEventId.Value : IMEVisitDB.CalendarEventId);
                    

                    if (IsEditMode == false && IMEVisitBO.CaseId.HasValue == false)
                    {
                        int CaseId = _context.Cases.Where(p => p.PatientId == IMEVisitBO.PatientId.Value && p.CaseStatusId == 1
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .Select(p => p.Id)
                                                   .FirstOrDefault<int>();

                        if (CaseId == 0)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "No open case exists for given patient.", ErrorLevel = ErrorLevel.Error };
                        }
                        else if (IMEVisitBO.CaseId.HasValue == true && IMEVisitBO.CaseId.Value != CaseId)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Case id dosent match with open case is for the given patient.", ErrorLevel = ErrorLevel.Error };
                        }
                        else
                        {
                            IMEVisitDB.CaseId = CaseId;
                        }
                    }
                    else
                    {
                        IMEVisitDB.CaseId = IMEVisitBO.CaseId.HasValue == false ? IMEVisitDB.CaseId : IMEVisitBO.CaseId.Value;
                    }

                    IMEVisitDB.PatientId = IsEditMode == true && IMEVisitBO.PatientId.HasValue == false ? IMEVisitDB.PatientId : (IMEVisitBO.PatientId.HasValue == false ? IMEVisitDB.PatientId : IMEVisitBO.PatientId.Value);
                    IMEVisitDB.EventStart = IMEVisitBO.EventStart;
                    IMEVisitDB.EventEnd = IMEVisitBO.EventEnd;

                    IMEVisitDB.Notes = IMEVisitBO.Notes;
                    IMEVisitDB.VisitStatusId = IMEVisitBO.VisitStatusId;
                    IMEVisitDB.TransportProviderId = IMEVisitBO.TransportProviderId;
                    IMEVisitDB.DoctorName = IMEVisitBO.DoctorName;
                    IMEVisitDB.VisitCreatedByCompanyId = IsEditMode == true ? IMEVisitDB.VisitCreatedByCompanyId : IMEVisitBO.VisitCreatedByCompanyId.Value;

                    if (IsEditMode == false)
                    {
                        IMEVisitDB.CreateByUserID = IMEVisitBO.CreateByUserID;
                        IMEVisitDB.CreateDate = DateTime.UtcNow;
                    }
                    else
                    {
                        IMEVisitDB.UpdateByUserID = IMEVisitBO.UpdateByUserID;
                        IMEVisitDB.UpdateDate = DateTime.UtcNow;
                    }

                    if (Add_IMEVisitDB == true)
                    {
                        IMEVisitDB = _context.IMEVisits.Add(IMEVisitDB);
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
                    IMEVisitDB = null;
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                if (IMEVisitDB != null)
                {
                    IMEVisitDB = _context.IMEVisits.Include("CalendarEvent")
                                                    .Include("Patient").Include("Patient.Cases")
                                                    .Include("Patient.User").Include("Patient.User.UserCompanies")
                                                    .Where(p => p.ID == IMEVisitDB.ID
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault<IMEVisit>();

                }
                else if (CalendarEventDB != null)
                {
                    IMEVisitDB = _context.IMEVisits.Include("CalendarEvent")
                                                            .Where(p => p.CalendarEvent.Id == CalendarEventDB.Id
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault<IMEVisit>();
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

                    User patientInfo = _context.Users.Include("ContactInfo").Include("UserCompanies").Include("UserCompanies.company")
                                      .Where(p => p.id == IMEVisitBO.PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                          .FirstOrDefault();

                    User ancillaryInfo = _context.Users.Include("ContactInfo").Include("UserCompanies").Include("UserCompanies.company")
                                  .Where(p => p.UserType == 5 && p.UserCompanies.Where(p1 => p1.CompanyID == IMEVisitBO.TransportProviderId && (p1.IsDeleted.HasValue == false || (p1.IsDeleted.HasValue == true && p1.IsDeleted.Value == false))).Any()==true  && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                    List<User> lstStaff = _context.Users.Include("ContactInfo").Include("UserCompanies").Include("UserCompanies.company")
                                         .Where(p => p.UserType == 2 && p.UserCompanies.Where(p1 => p1.CompanyID == IMEVisitBO.VisitCreatedByCompanyId && (p1.IsDeleted.HasValue == false || (p1.IsDeleted.HasValue == true && p1.IsDeleted.Value == false))).Any() && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                             .ToList<User>();

                    //string VerificationLink = "<a href='" + Utility.GetConfigValue("PatientVerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("PatientVerificationLink") + "/" + invitationDB_UniqueID + "</a>";
                    string MailMessageForPatient = "<B> New Appointment Scheduled</B></ BR >Medical provider has schedule a patient visit with Doctor: " + IMEVisitBO.DoctorName+"<br><br>Thanks";
                    string MailMessageForAdmin = "<B> New Appointment Scheduled</B></BR>A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " is schedule with doctor:" + IMEVisitBO.DoctorName + "<br><br>Thanks";
                    string MailMessageForAncillary= "<B> New Appointment Scheduled</B></BR>A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " is schedule with doctor:" + IMEVisitBO.DoctorName + "<br><br>Thanks";

                    string NotificationForPatient = "Medical provider has schedule a patient visit with Doctor: " + IMEVisitBO.DoctorName;  
                    string NotificationForAdmin = "New Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " is schedule with doctor:" + IMEVisitBO.DoctorName;                    
                    string NotificationForAncillary = "New Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " is schedule with doctor:" + IMEVisitBO.DoctorName;

                    string SmsMessageForPatient = "<B> New Appointment Scheduled</B></ BR >Medical provider has schedule a patient visit with Doctor: " + IMEVisitBO.DoctorName + "<br><br>Thanks";
                    string SmsMessageForAdmin = "<B> New Appointment Scheduled</B></BR>A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " is schedule with doctor:" + IMEVisitBO.DoctorName + "<br><br>Thanks";
                    string SmsMessageForAncillary = "<B> New Appointment Scheduled</B></BR>A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + " is schedule with doctor:" + IMEVisitBO.DoctorName + "<br><br>Thanks";


                    string MailMessageForStaff = "<B> New Appointment Scheduled</B></BR>A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + "<br><br>Thanks";
                    string NotificationForStaff = "New Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName;
                    string SmsMessageForStaff = "<B> New Appointment Scheduled</B></BR>A new Appointment schedule for patient : " + patientInfo.FirstName + " " + patientInfo.LastName + "<br><br>Thanks";







                    #region  patient mail object

                    BO.EmailMessage emPatient = new BO.EmailMessage();
                    if(patientInfo!=null)
                    {
                        emPatient.ApplicationName = "Midas";
                        emPatient.ToEmail = patientInfo.UserName; ;               
                        emPatient.EMailSubject = "MIDAS Notification";
                        emPatient.EMailBody = MailMessageForPatient;
                    }                    
                    #endregion

                    #region patient sms object
                    BO.SMS smsPatient = new BO.SMS();
                    if(patientInfo!=null)
                    {
                        smsPatient.ApplicationName = "Midas";
                        smsPatient.ToNumber = patientInfo.ContactInfo.CellPhone;
                        smsPatient.Message = SmsMessageForPatient;
                    }                
                    #endregion 


                    #region  admin mail object                 
                    BO.EmailMessage emAdmin = new BO.EmailMessage();
                    if(identityHelper!=null)
                    {
                        emAdmin.ApplicationName = "Midas";
                        emAdmin.ToEmail = identityHelper.Email;
                        emAdmin.EMailSubject = "MIDAS Notification";
                        emAdmin.EMailBody = MailMessageForAdmin;
                    }                  
                    #endregion 
                  
                    #region admin sms object
                    BO.SMS smsAdmin = new BO.SMS();
                    if(AdminUser!=null)
                    {
                        smsAdmin.ApplicationName = "Midas";
                        smsAdmin.ToNumber = AdminUser.ContactInfo.CellPhone;
                        smsAdmin.Message = SmsMessageForAdmin;
                    }                  
                    #endregion

                    #region  Ancillary mail object                 
                    BO.EmailMessage emAncillary = new BO.EmailMessage();
                    if(ancillaryInfo!=null)
                    {
                        emAdmin.ApplicationName = "Midas";
                        emAdmin.ToEmail = ancillaryInfo.UserName;
                        emAdmin.EMailSubject = "MIDAS Notification";
                        emAdmin.EMailBody = MailMessageForAncillary;
                    }                 
                    #endregion

                    #region Ancillary sms object
                    BO.SMS smsAncillary = new BO.SMS();
                    if(ancillaryInfo!=null)
                    {
                        smsAdmin.ApplicationName = "Midas";
                        smsAdmin.ToNumber = ancillaryInfo.ContactInfo.CellPhone;
                        smsAdmin.Message = SmsMessageForAncillary;
                    }               
                  #endregion


                    NotificationHelper nh = new NotificationHelper();
                    MessagingHelper mh = new MessagingHelper();

                    #region Patient                  
                    nh.PushNotification(patientInfo.UserName, patientInfo.UserCompanies.Select(p => p.Company.id).FirstOrDefault(), NotificationForPatient, "New Appointment Schedule");  
                    mh.SendEmailAndSms(patientInfo.UserName, patientInfo.UserCompanies.Select(p => p.Company.id).FirstOrDefault(), emPatient, smsPatient);
                    #endregion

                   
                    #region admin and staff 
                    if (AdminUser.UserType == 4 || AdminUser.UserType==3)
                    {
                        nh.PushNotification(AdminUser.UserName, AdminUser.UserCompanies.Select(p => p.Company.id).FirstOrDefault(), NotificationForAdmin, "New Appointment Schedule");
                        mh.SendEmailAndSms(AdminUser.UserName, AdminUser.UserCompanies.Select(p => p.Company.id).FirstOrDefault(), emAdmin, smsAdmin);
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

                            nh.PushNotification(item.UserName, AdminUser.UserCompanies.Select(p => p.Company.id).FirstOrDefault(), NotificationForStaff, "New Appointment Schedule");
                            mh.SendEmailAndSms(item.UserName, AdminUser.UserCompanies.Select(p => p.Company.id).FirstOrDefault(), emStaff, smsStaff);
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

                            nh.PushNotification(item.UserName, AdminUser.UserCompanies.Select(p => p.Company.id).FirstOrDefault(), NotificationForStaff, "New Appointment Schedule");
                            mh.SendEmailAndSms(item.UserName, AdminUser.UserCompanies.Select(p => p.Company.id).FirstOrDefault(), emStaff, smsStaff);
                        }
                    }

                    #endregion

                    #region Ancillary 
                    if (IMEVisitBO.TransportProviderId!=null)
                    {                                              
                        nh.PushNotification(ancillaryInfo.UserName, ancillaryInfo.UserCompanies.Select(p => p.Company.id).FirstOrDefault(), NotificationForAncillary, "New Appointment Schedule");
                        mh.SendEmailAndSms(ancillaryInfo.UserName, ancillaryInfo.UserCompanies.Select(p => p.Company.id).FirstOrDefault(), emAncillary, smsAncillary); 
                    }
                   
                    #endregion
                }
                catch (Exception ex)
                {
                   
                }
            }

            var res = ConvertIMEvisit<BO.IMEVisit, IMEVisit>(IMEVisitDB);
            return (object)res;
        }
        #endregion

        #region Get By Company ID
        public override object GetByCompanyId(int id)
        {
            //var caseId = _context.CaseCompanyMappings.Where(p => p.CompanyId == id
            //                                                 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
            //                                                     ).Select(p => p.CaseId);
            var IMEVisit = _context.IMEVisits.Include("CalendarEvent")
                                             .Include("Patient").Include("Patient.Cases").Include("Patient.User")
                                             .Where(p => p.VisitCreatedByCompanyId == id
                                              && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                             .ToList();

            List<BO.IMEVisit> boIMEVisit = new List<BO.IMEVisit>();
            if (IMEVisit == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachVisit in IMEVisit)
                {
                    boIMEVisit.Add(ConvertIMEvisit<BO.IMEVisit, IMEVisit>(EachVisit));
                }

            }

            return (object)boIMEVisit;
        }
        #endregion

        #region Get By Patient Id
        public override object GetByPatientId(int PatientId)
        {
            var acc = _context.IMEVisits.Include("CalendarEvent")
                                        .Include("Patient").Include("Patient.Cases").Include("Patient.User")
                                        .Where(p => p.PatientId == PatientId 
                                         &&(p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                        .ToList<IMEVisit>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.IMEVisit> lstVisit = new List<BO.IMEVisit>();
            foreach (IMEVisit item in acc)
            {
                lstVisit.Add(ConvertIMEvisit<BO.IMEVisit, IMEVisit>(item));
            }

            return lstVisit;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}

