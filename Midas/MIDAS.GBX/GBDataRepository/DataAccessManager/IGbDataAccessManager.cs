
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;

namespace MIDAS.GBX.DataAccessManager
{
    public interface IGbDataAccessManager<T>
    {
        Object Save(T gbObject);
        Object UpdateMedicalProvider(T gbObject);
        Object UpdateAttorneyProvider(T gbObject);
        Object Save(List<T> gbObject);
        Object SaveDoctor(T gbObject);
        Object Save(int id, string type, List<HttpContent> streamContent,string uploadpath);
        Object SaveAsBlob(int id, int CompanyId, string objectType, string docType, string uploadpath);
        Object AddQuickPatient(T gbObject);
        Object ConsentSave(int caseid, int companyid, List<HttpContent> streamContent, string uploadpath,bool signed);
        Object AssociateLocationToDoctors(T gbObject);
        Object AssociateDoctorToLocations(T gbObject);
        int Delete(T entity);
        Object DeleteObject(T entity);
        object Delete(int id);
        object Delete(int param1, int param2, int param3);        
        object DeleteFile(int caseId, int id);
        string Download(int caseId, int documentid);
        object DownloadSignedConsent(T gbObject);
        object GetDocumentList(int id);
        Object GetViewStatus(int id, bool status);
        Object Get(int id, string type);
        Object Get(int id, string objectType, string documentType);
        Object Get(int id, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetDiagnosisType(int id, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetCaseCompanies(int caseId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object IsInsuranceInfoAdded(int id, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);        
        Object Get(T gbObject, int? nestingLevels = null);
        Object Signup(T gbObject, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object UpdateCompany(T gbObject, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object Login(T gbObject, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object Login2(T gbObject, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object ValidateInvitation(T gbObject, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        
        Object AddUploadedFileData(int id, string FileUploadPath, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByLocationAndSpecialty(int locationId, int specialtyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetBySpecialityInAllApp(int specialtyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByRoomInAllApp(int roomTestId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GenerateToken(int userId);
        Object ValidateToken(string tokenId);
        Object Kill(int tokenId);
        Object DeleteByUserId(int userId);

        Object ValidateOTP(T gbObject);
        Object RegenerateOTP(T gbObject);

        Object GeneratePasswordLink(T gbObject);
        Object ValidatePassword(T gbObject);


        Object Get(int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetAllCompanyAndLocation(int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object Get(string param1, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object Update(T gbObject);
        Object Add(T gbObject);
        Object GetByCompanyId(int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByCompanyIdForAncillary(int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetAllExcludeCompany(int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetConsentList(int id, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByReferringCompanyId(int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByReferredToCompanyId(int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);

        Object GetByCompanyWithOpenCases(int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetOpenCaseForPatient(int PatientId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByLocationWithOpenCases(int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByCompanyWithCloseCases(int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByInsuranceMasterId(int InsuranceMasterId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);        
        Object GetByCaseId(int CaseId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByPatientId(int PatientId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByLocationId(int LocationId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByReferringLocationId(int LocationId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByReferringToLocationId(int LocationId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);

        Object GetByDoctorId(int DoctorId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByPatientVisitId(int patientVisitId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);       
        Object GetByReferringUserId(int UserId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByReferredToDoctorId(int DoctorId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetCurrentEmpByPatientId(int PatientId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetPatientAccidentInfoByPatientId(int PatientId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetCurrentROByPatientId(int PatientId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object ResetPassword(T gbObject);
        Object DeleteById(int id);
        Object DeleteCalendarEvent(int id);
        Object DeleteVisit(int id);
        Object CancleVisit(int id);
        Object CancleCalendarEvent(int id);
        Object GetByDoctorAndDates(int DoctorId, DateTime FromDate,DateTime ToDate, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByDoctorDatesAndName(int DoctorId, DateTime FromDate, DateTime ToDate,string Name, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        
        Object Get(int param1, int param2, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByCaseAndCompanyId(int caseId, int companyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);       
        Object Get2(int param1, int param2, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object DismissPendingReferral(int PendingReferralId, int userId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);        
        Object GetByLocationAndPatientId(int LocationId, int PatientId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object AssociateUserToCompany(string UserName, int CompanyId, bool sendEmail, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByRoomId(int RoomId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByRoomTestId(int RoomTestId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetBySpecialityId(int specialityId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetBySpecialityAndCompanyId(int specialityId,int companyId,bool showAll, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByRoomTestAndCompanyId(int roomTestId, int companyId, bool showAll, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GenerateReferralDocument(int id, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object AssociateAttorneyWithCompany(int AttorneyId,int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object DisassociateAttorneyWithCompany(int AttorneyId, int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object AssociateDoctorWithCompany(int DoctorId, int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object AssociatePatientWithCompany(int PatientId, int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object AssociatePatientWithAttorneyCompany(int PatientId, int CaseId, int AttorneyCompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object AssociatePatientWithAncillaryCompany(int PatientId, int CaseId, int AncillaryCompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object DisassociateDoctorWithCompany(int DoctorId, int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByLocationDoctorAndPatientId(int locationId, int doctorId, int patientId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByLocationRoomAndPatientId(int locationId, int roomId, int patientId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetBlobServiceProvider(int companyid);
        Object GetBySpecialtyAndCompanyId(int specialtyId, int companyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByUserAndCompanyId(int userId, int companyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object AssociateMedicalProviderWithCompany(int PrefMedProviderId, int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetAllMedicalProviderExcludeAssigned(int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByPrefMedProviderId(int PrefMedProviderId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetPreferredCompanyDoctorsAndRoomByCompanyId(int CompanyId, int SpecialityId, int RoomTestId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetPendingReferralByCompanyId(int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetPendingReferralByCompanyId2(int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByFromCompanyId(int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByToCompanyId(int companyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetReferralByFromCompanyId(int companyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetReferralByToCompanyId(int companyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByFromLocationId(int locationId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByToLocationId(int locationId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByFromDoctorAndCompanyId(int doctorId, int companyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByToDoctorAndCompanyId(int doctorId, int companyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetReferralByFromDoctorAndCompanyId(int doctorId, int companyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetReferralByToDoctorAndCompanyId(int doctorId, int companyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByForRoomId(int roomId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByToRoomId(int roomId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByForSpecialtyId(int specialtyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByForRoomTestId(int roomTestId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetFreeSlotsForDoctorByLocationId(int DoctorId, int LocationId, DateTime StartDate, DateTime EndDate, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetFreeSlotsForRoomByLocationId(int RoomId, int LocationId, DateTime StartDate, DateTime EndDate, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object AssociateVisitWithReferral(int ReferralId, int PatientVisitId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object AssociatePrefAttorneyProviderWithCompany(int PrefAttorneyProviderId, int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetAllPrefAttorneyProviderExcludeAssigned(int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetPrefAttorneyProviderByCompanyId(int companyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetAllPrefAncillaryProviderExcludeAssigned(int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetPrefAncillaryProviderByCompanyId(int companyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetLocationForPatientId(int patientId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByPatientIdAndLocationId(int PatientId, int LocationId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByCompanyAndDoctorId(int companyId, int doctorId);
        Object GetByDocumentId(int documentId);
        Object GetByObjectIdAndType(int documentId, string objectType);
        Object GetVisitsByPatientId(int PatientId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByAncillaryId(int AncillaryId);
        Object GetReadOnly(int CaseId);      
        Object GetUpdatedCompanyById(int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetProcedureCodeBySpecialtyExcludingAssigned(int specialtyId, int CompanyId);
        Object GetProcedureCodeByRoomTestExcludingAssigned(int roomTestId, int CompanyId);

    }
}
