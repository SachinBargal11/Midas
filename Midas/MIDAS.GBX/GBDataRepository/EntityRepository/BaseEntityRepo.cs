using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using MIDAS.GBX.DataRepository.Model;
using System.Net.Http;

namespace MIDAS.GBX.EntityRepository
{
    internal abstract class BaseEntityRepo
    {
        internal MIDASGBXEntities _context;
        private const int ApplicationTypeId = 202;
        public BaseEntityRepo(MIDASGBXEntities context)
        {
            _context = context;
        }

        #region Virtual Methods

        public virtual int? GetLastSavedId()
        {
            throw new NotImplementedException();
        }

        public virtual string Download(int caseId, int documentid)
        {
            throw new NotImplementedException();
        }
        public virtual Object Save<T>(T entity)
        {
            throw new NotImplementedException();
        }
        public virtual Object UpdateMedicalProvider<T>(T entity)
        {
            throw new NotImplementedException();
        }
        public virtual Object UpdateAttorneyProvider<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object Save<T>(List<T> entity)
        {
            throw new NotImplementedException();
        }
        public virtual Object SaveDoctor<T>(T entity)
        {
            throw new NotImplementedException();
        }
        public virtual Object Save(int id, string type, List<HttpContent> streamContent,string uploadpath)
        {
            throw new NotImplementedException();
        }

        public virtual Object SaveAsBlob(int id, int CompanyId, string objecttype, string documenttype, string uploadpath, int createUserId, int updateUserId)
        {
            throw new NotImplementedException();
        }

        public virtual Object AddQuickPatient<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object SaveIMEVisit<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object SaveEOVisit<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object ConsentSave(int caseid, int companyid, List<HttpContent> streamContent, string uploadpath,bool signed)
        {
            throw new NotImplementedException();
        }

        public virtual Object Get(int id, string type)
        {
            throw new NotImplementedException();
        }

        public virtual Object Get(int id, string objectType, string documentType)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetViewStatus(int id, bool status)
        {
            throw new NotImplementedException();
        }

        public virtual Object Upload(List<HttpContent> streamContent, string path, int id, string type,string sourcePath)
        {
            throw new NotImplementedException();
        }

        public virtual Object UploadSignedConsent(int id, string type, string sourcePath)
        {
            throw new NotImplementedException();
        }

        public virtual Object AddPatientProfileDocument(int PatientId, int DocumentId)
        {
            throw new NotImplementedException();
        }

        public virtual Object AddUploadedFileData(int id, string FileUploadPath)
        {
            throw new NotImplementedException();
        }
        
        public virtual Object GetByLocationAndSpecialty(int locationId, int specialtyId)
        {
            throw new NotImplementedException();
        }


        public virtual Object AssociateLocationToDoctors<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object AssociateDoctorToLocations<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate(int id, string type, List<HttpContent> streamContent)
        {
            throw new NotImplementedException();
        }

        public virtual Object Delete<T>(T entity) where T : BO.GbObject
        {
            throw new NotImplementedException();
        }

        public virtual void PreSave<T>(T entity) where T : BO.GbObject
        {
            //override and do the necessary operations needed for saving an object
        }

        public virtual void PreSave(JObject data)
        {
            //override and do the necessary operations needed for saving an object
        }

        public virtual void PostSave(JObject data)
        {
            //override and do the necessary operations needed for saving an object
        }

        public virtual void PostSave<T>(T entity) where T : BO.GbObject
        {
            //override and do the necessary operations needed after saving an object
        }
        public virtual  Object Signup<T>(T data)
        {
            throw new NotImplementedException();
        }

        public virtual Object UpdateCompany<T>(T data)
        {
            throw new NotImplementedException();
        }

        public virtual Object Get(int id)
        {
            throw new NotImplementedException();
        }
        
        public virtual Object GetDiagnosisType(int id)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetCaseCompanies(int caseId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetConsentList(int id)
        {
            throw new NotImplementedException();
        }

        public virtual Object GenerateReferralDocument(int id)
        {
            throw new NotImplementedException();
        }

        //public virtual Object IsInsuranceInfoAdded(int id)
        //{
        //    throw new NotImplementedException();
        //}

        public virtual object AssociateUserToCompany(string UserName, int CompanyId, bool sendEmail)
        {
            throw new NotImplementedException();
        }


        public virtual Object Login<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object LoginWithUserName<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object Login2<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object ValidateInvitation<T>(T entity)
        {
            throw new NotImplementedException();
        }
        public virtual T Convert<T, U>(U entity)
        {
            throw new NotImplementedException();
        }

        public virtual T ConvertCompany<T, U>(U entity)
        {
            throw new NotImplementedException();
        }

        public virtual T ConvertToPatient<T, U>(U entity)
        {
            throw new NotImplementedException();
        }

        public virtual T Convert<T, U>(U entity, bool PrimaryLevel = true)
        {
            throw new NotImplementedException();
        }

        public virtual T ObjectConvert<T, U>(U entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object Get<T>(T entity)
        {
            throw new NotImplementedException();
        }
        public virtual List<T> GetAuthorizedList<T>(List<T> searchList)
        {
            throw new NotImplementedException();
        }

        public virtual Object DeleteByUserId(int userId)
        {
            throw new NotImplementedException();
        }
        public virtual Object GenerateToken(int id)
        {
            throw new NotImplementedException();
        }
        public virtual Object ValidateToken(string tokenId)
        {
            throw new NotImplementedException();
        }
        public virtual Object Kill(int tokenId)
        {
            throw new NotImplementedException();
        }

        public virtual Object ValidateOTP<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object RegenerateOTP<T>(T entity)
        {
            throw new NotImplementedException();
        }
        public virtual Object GeneratePasswordLink<T>(T entity)
        {
            throw new NotImplementedException();
        }
        public virtual Object ValidatePassword<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object Get()
        {
            throw new NotImplementedException();
        }

        public virtual Object Get(string param1)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetIsExistingUser(string User, string SSN)
        {
            throw new NotImplementedException();
        }

        public virtual Object Update<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object Add<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object Save2<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByCompanyId(int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByCompanyIdForAncillary(int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetAllExcludeCompany(int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByPatientVisitId(int patientVisitId)
        {
            throw new NotImplementedException();
        }
      
        public virtual Object GetByReferringCompanyId(int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByReferredToCompanyId(int CompanyId)
        {
            throw new NotImplementedException();
        }


        public virtual Object GetByCompanyWithOpenCases(int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetOpenCaseForPatient(int PatientId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetOpenCaseForPatient(int PatientId, int CompanyId)
        {
            throw new NotImplementedException();
        }

        //public virtual Object GetByLocationWithOpenCases(int LocationId)
        //{
        //    throw new NotImplementedException();
        //}

        public virtual Object GetByCompanyWithCloseCases(int CompanyId)
        {
            throw new NotImplementedException();
        }        

        public virtual Object GetByInsuranceMasterId(int InsuranceMasterId)
        {
            throw new NotImplementedException();
        }

        public virtual Object ResetPassword<T>(T entity)
        {
            throw new NotImplementedException();
        }        

        public virtual Object GetByPatientId(int PatientId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByLocationId(int LocationId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByReferringLocationId(int LocationId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByReferringToLocationId(int LocationId)
        {
            throw new NotImplementedException();
        }


        public virtual Object GetByDoctorId(int DoctorId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByDoctorAndCompanyId(int doctorId, int companyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByReferringUserId(int UserId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByReferredToDoctorId(int DoctorId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetCurrentROByPatientId(int PatientId)
        {
            throw new NotImplementedException();
        }
        
        public virtual Object DeleteById(int id)
        {
            throw new NotImplementedException();
        }
        
        public virtual Object DeleteFile(int caseId, int id)
        {
            throw new NotImplementedException();
        }
        public virtual Object CancleVisit(int id)
        {
            throw new NotImplementedException();
        }

        public virtual Object DeleteAllAppointmentsandDoctorLocationSchedule(int id)
        {
            throw new NotImplementedException();
        }

        public virtual Object CancleCalendarEvent(int id)
        {
            throw new NotImplementedException();
        }

        public virtual object DeleteObject<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual object Delete(int id)
        {
            throw new NotImplementedException();
        }

        public virtual object Delete(int param1,int param2,int param3)
        {
            throw new NotImplementedException();
        }

        public virtual object GetDocumentList(int id)
        {
            throw new NotImplementedException();
        }
        public virtual object DeleteCalendarEvent(int id)
        {
            throw new NotImplementedException();
        }
        public virtual object DeleteVisit(int id)
        {
            throw new NotImplementedException();
        }
        public virtual object GetPatientAccidentInfoByPatientId(int id)
        {
            throw new NotImplementedException();
        }

        public virtual object GetCurrentEmpByPatientId(int id)
        {
            throw new NotImplementedException();
        }

        public virtual object GetByUserId(int UserId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByCaseId(int CaseId)
        {
            throw new NotImplementedException();
        }

        public virtual Object Get(int param1, int param2)
        {
            throw new NotImplementedException();
        }

        public virtual Object Get2(int param1, int param2)
        {
            throw new NotImplementedException();
        }

        public virtual Object Get1(int param1, int param2)
        {
            throw new NotImplementedException();
        }

        public virtual Object Get3(int param1, int param2)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByCaseAndCompanyId(int caseId, int companyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object DismissPendingReferral(int PendingReferralId, int userId)
        {
            throw new NotImplementedException();
        }
        

        public virtual Object GetByLocationAndPatientId(int LocationId, int PatientId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByDoctorAndDates(int DoctorId,int medicalProviderId, DateTime FromDate, DateTime ToDate)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByDoctorDatesAndName(int DoctorId, DateTime FromDate, DateTime ToDate, string Name)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByRoomId(int RoomId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByRoomTestId(int RoomTestId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetBySpecialityId(int specialityId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetBySpecialityAndCompanyId(int specialityId,int companyId,bool showAll)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByRoomTestAndCompanyId(int roomTestId, int companyId, bool showAll)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetBySpecialityInAllApp(int specialityId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetAllDoctorSpecialityByCompany(int compnayId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetAllDoctorTestSpecialityByCompany(int compnayId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByRoomInAllApp(int roomTestId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetAllCompanyAndLocation()
        {
            throw new NotImplementedException();
        }

        public virtual Object AssociateAttorneyWithCompany(int AttorneyId, int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object AssociatePatientWithCompany(int PatientId, int CompanyId)
        {
            throw new NotImplementedException();
        }
        
        public virtual Object DisassociateAttorneyWithCompany(int AttorneyId, int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object AssociateDoctorWithCompany(int DoctorId, int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object AssociatePatientWithAttorneyCompany(int PatientId, int CaseId, int AttorneyCompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object AssociatePatientWithMedicalCompany(int PatientId, int CaseId, int MedicalCompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object AssociatePatientWithAncillaryCompany(int PatientId, int CaseId, int AncillaryCompanyId, int? AddedByCompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object DisassociateDoctorWithCompany(int DoctorId, int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByLocationDoctorAndPatientId(int locationId, int doctorId, int patientId)
        {
            throw new NotImplementedException();
        }
        public virtual object DownloadSignedConsent<T>(T entity)
        {
            throw new NotImplementedException();
        }
        
        public virtual Object GetByLocationRoomAndPatientId(int locationId, int roomId, int patientId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetBySpecialtyAndCompanyId(int specialtyId, int companyId)
        {
            throw new NotImplementedException();
        }
        
        public virtual Object GetByUserAndCompanyId(int userId, int companyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object AssociateMedicalProviderWithCompany(int PrefMedProviderId, int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object AssociateAncillaryProviderWithCompany(int PreAncillaryProviderId, int CompanyId)
        {
            throw new NotImplementedException();
        }
       

        public virtual Object GetAllMedicalProviderExcludeAssigned(int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByPrefMedProviderId(int PrefMedProviderId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetPreferredCompanyDoctorsAndRoomByCompanyId(int CompanyId, int SpecialityId, int RoomTestId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetPendingReferralByCompanyId(int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetPendingReferralByCompanyId2(int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByFromCompanyId(int companyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByToCompanyId(int companyId)
        {
            throw new NotImplementedException();
        }
        
        public virtual Object GetReferralByFromCompanyId(int companyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetReferralByToCompanyId(int companyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByFromLocationId(int locationId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByToLocationId(int locationId)
        {
            throw new NotImplementedException();
        }
        
        public virtual Object GetByFromDoctorAndCompanyId(int doctorId, int companyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByToDoctorAndCompanyId(int doctorId, int companyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetReferralByFromDoctorAndCompanyId(int doctorId, int companyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetReferralByToDoctorAndCompanyId(int doctorId, int companyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByForRoomId(int roomId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByToRoomId(int roomId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByForSpecialtyId(int roomId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByForRoomTestId(int roomTestId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetFreeSlotsForDoctorByLocationId(int DoctorId, int LocationId, DateTime StartDate, DateTime EndDate)
        {
            throw new NotImplementedException();
        }
        
        public virtual Object GetBusySlotsForPatients(int PatientId, DateTime StartDate, DateTime EndDate)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetBusySlotsForDoctors(int DoctorId, DateTime StartDate, DateTime EndDate)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetFreeSlotsForRoomByLocationId(int RoomId, int LocationId, DateTime StartDate, DateTime EndDate)
        {
            throw new NotImplementedException();
        }

        public virtual Object AssociateVisitWithReferral(int ReferralId, int PatientVisitId)
        {
            throw new NotImplementedException();
        }

        public virtual Object AssociatePrefAttorneyProviderWithCompany(int PrefAttorneyProviderId, int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetAllPrefAttorneyProviderExcludeAssigned(int CompanyId)
        {
            throw new NotImplementedException();
        }
        
        public virtual Object GetPrefAttorneyProviderByCompanyId(int companyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetAllPrefAncillaryProviderExcludeAssigned(int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetPrefAncillaryProviderByCompanyId(int companyId)
        {
            throw new NotImplementedException();
        }


        public virtual Object GetLocationForPatientId(int patientId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByPatientIdAndLocationId(int PatientId, int LocationId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByCompanyAndDoctorId(int companyId, int doctorId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByDocumentId(int documentId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByObjectIdAndType(int objectId, string objectType)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetVisitsByPatientId(int PatientId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByAncillaryId(int AncillaryId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetUpdatedCompanyById(int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual object GetBusySlotsByCalendarEvent(BO.CalendarEvent CalEvent)
        {
            throw new NotImplementedException();
        }

        public virtual object GetBusySlotsByCalendarEventByLocationId(BO.CalendarEvent CalEvent, DateTime ForDate)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetProcedureCodeBySpecialtyExcludingAssigned(int specialtyId, int companyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetProcedureCodeByRoomTestExcludingAssigned(int roomTestId, int companyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetReadOnly(int CaseId,int companyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetOpenCaseCompaniesByPatientId(int PatientId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetRecurrenceByCaseAndSpecialtyAndDoctorId(int caseId,int specialtyId, int doctorId)
        {
            throw new NotImplementedException();
        }        

        public virtual Object GetICDTypeCodeByCompanyId(int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetDoctorTaxTypes()
        {
            throw new NotImplementedException();
        }

        public virtual Object GetOpenCasesByCompanyWithPatient(int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByPatientVisitIdWithProcedureCodes(int PatientVisitId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetMasterAndByCompanyId(int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual object Delete(int id, int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual object GetInsuranceDetails(int id, int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual object CancelSingleEventOccurrence(int PatientVisitId, DateTime CancelEventStart)
        {
            throw new NotImplementedException();
        }

        public virtual object GetByLocationDoctorAndSpecialityId(int LocationId, int DoctorId, int SpecialtyId)
        {
            throw new NotImplementedException();
        }

        public virtual object GetByCompanyAndAttorneyId(int CompanyId, int AttorneyId)
        {
            throw new NotImplementedException();
        }

        //public virtual object GetByLocationAndAttorneyId(int LocationId, int AttorneyId)
        //{
        //    throw new NotImplementedException();
        //}

        public virtual Object GetMasterAndByCaseId(int CaseId)
        {
            throw new NotImplementedException();
        }

        public virtual object GenerateOTPForCompany(int companyId)
        {
            throw new NotImplementedException();
        }

        public virtual object ValidateOTPForCompany(string otp)
        {
            throw new NotImplementedException();
        }

        public virtual object AssociatePreferredCompany(string otp, int currentCompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object SaveReferralPatientVisitUnscheduled<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetReferralPatientVisitUnscheduledByCompanyId(int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual object DeletePreferredCompany(int preferredCompanyId, int currentCompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetPrefProviderByAncillaryCompanyId(int AncillaryCompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetPatientVisitForDateByLocationId(DateTime ForDate, int LocationId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetPatientVisitForDateByCompanyId(DateTime ForDate, int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetDoctorPatientVisitForDateByLocationId(DateTime ForDate, int DoctorId, int LocationId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetDoctorPatientVisitForDateByCompanyId(DateTime ForDate, int DoctorId, int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetAttorneyVisitForDateByCompanyId(DateTime ForDate, int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetStatisticalDataOnPatientVisit(DateTime FromDate, DateTime ToDate, int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetOpenAppointmentSlotsForDoctorByCompanyId(DateTime ForDate, int DoctorId, int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetOpenAppointmentSlotsForAllDoctorByCompanyId(DateTime ForDate, int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetDoctors<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetStatisticalDataOnCaseByCaseType(DateTime FromDate, DateTime ToDate, int CompanyId, int CaseStatusId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetStatisticalDataOnCaseByInsuranceProvider(DateTime FromDate, DateTime ToDate, int CompanyId, int CaseStatusId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetMedicalProviders<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetCaseForCompanyId(int CaseId, int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByRoomTestAndCompanyId(int roomTestId, int companyId)
        {
            throw new NotImplementedException();
        }

        public virtual object UpdatePrefferedProcedureCode(int id)
        {
            throw new NotImplementedException();
        }

        public virtual Object DeleteAllAppointmentsandDoctorLocationSchedule<T>(T gbObject)
        {
            throw new NotImplementedException();
        }

        public virtual Object DeleteObj<T>(T gbObject)
        {
            throw new NotImplementedException();
        }


        public virtual Object DisassociateDoctorWithCompanyandAppointment(int DoctorId, int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetUserByUserName(string param1)
        {
            throw new NotImplementedException();
        }

        public virtual Object Mapusertothecompnay(string param1, int CompanyId,int CurrentUserId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetUserByIDAndCompnayID(int id, int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetDoctorByIDAndCompnayID(int id, int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByLocationRoomDoctorId(int LocationId, int DoctorId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetAllProcedureCodesbySpecaltyCompanyId(int CompanyId, int SpecialtyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetProcedureCodesbySpecialtyCompanyIdforVisit(int CompanyId, int SpecialtyId)
        {
            throw new NotImplementedException();
        }
       

        public virtual Object GetAllProcedureCodesbyRoomTestCompanyIdforVisit(int CompanyId, int RoomTestId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByLocationDoctorAndCompanyId(int locationId, int doctorId, int companyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByLocationDoctorAndRoomId(int locationId, int doctorId, int roomId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetVisitStatusbyPatientVisitSpecialityId(int PatientVisitId, int specialityId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetVisitStatusbyPatientVisitRoomTestId(int PatientVisitId, int roomTestId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetPreffredProcedureCodesForVisitUpdate(int CompanyId, int SpecialtyId)
        {
            throw new NotImplementedException();
        }


        public virtual Object GetPreffredRoomProcedureCodesForVisitUpdate(int CompanyId, int roomTestId)
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}
