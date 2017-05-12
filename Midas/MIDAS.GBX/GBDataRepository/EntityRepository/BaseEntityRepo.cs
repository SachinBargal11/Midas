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

        public virtual Object SaveAsBlob(int id, int CompanyId, string objecttype, string documenttype, string uploadpath)
        {
            throw new NotImplementedException();
        }

        public virtual Object AddQuickPatient<T>(T entity)
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

        public virtual Object IsInsuranceInfoAdded(int id)
        {
            throw new NotImplementedException();
        }

        public virtual object AssociateUserToCompany(string UserName, int CompanyId, bool sendEmail)
        {
            throw new NotImplementedException();
        }


        public virtual Object Login<T>(T entity)
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

        public virtual Object GetByLocationWithOpenCases(int LocationId)
        {
            throw new NotImplementedException();
        }

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

        public virtual Object DismissPendingReferral(int PendingReferralId, int userId)
        {
            throw new NotImplementedException();
        }
        

        public virtual Object GetByLocationAndPatientId(int LocationId, int PatientId)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByDoctorAndDates(int DoctorId, DateTime FromDate, DateTime ToDate)
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

        public virtual Object DisassociateAttorneyWithCompany(int AttorneyId, int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object AssociateDoctorWithCompany(int DoctorId, int CompanyId)
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

        public virtual Object GetFreeSlotsForRoomByLocationId(int RoomId, int LocationId, DateTime StartDate, DateTime EndDate)
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}
