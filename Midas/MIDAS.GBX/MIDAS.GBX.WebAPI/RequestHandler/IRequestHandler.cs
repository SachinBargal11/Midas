using System;
using System.Collections.Generic;
using System.Net.Http;
using Newtonsoft.Json.Linq;

namespace MIDAS.GBX.WebAPI
{
    public interface IRequestHandler<T> 
    {
        HttpResponseMessage ValidateInvitation(HttpRequestMessage request, T gbObject);
        HttpResponseMessage GetGbObjects(HttpRequestMessage request, T gbObject);
        HttpResponseMessage GetObject(HttpRequestMessage request, int id);
        HttpResponseMessage GetDiagnosisType(HttpRequestMessage request, int id);
        HttpResponseMessage GetConsentList(HttpRequestMessage request, int id);
        HttpResponseMessage GetObject(HttpRequestMessage request, int id, string type);
        HttpResponseMessage CreateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage CreateGbObject1(HttpRequestMessage request, T gbObject);
        HttpResponseMessage CreateGbObject2(HttpRequestMessage request, T gbObject);
        HttpResponseMessage CreateGbDocObject(HttpRequestMessage request, int id, string type, List<HttpContent> streamContent,string uploadpath);
        HttpResponseMessage CreateGbDocObject1(HttpRequestMessage request, int caseid, int companyid, List<HttpContent> streamContent, string uploadpath);
        HttpResponseMessage CreateGb(HttpRequestMessage request, T gbObject);
        HttpResponseMessage UpdateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage DeleteGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage ValidateUniqueName(HttpRequestMessage request, T gbObject);
        HttpResponseMessage SignUp(HttpRequestMessage request, T gbObject);
        HttpResponseMessage Login(HttpRequestMessage request, T gbObject);
        
        HttpResponseMessage AddUploadedFileData(HttpRequestMessage request, int id, string FileUploadPath);
        HttpResponseMessage GenerateToken(HttpRequestMessage request,int userId);
        HttpResponseMessage ValidateToken(HttpRequestMessage request,string tokenId);
        HttpResponseMessage Kill(HttpRequestMessage requeststring,int tokenId);
        HttpResponseMessage DeleteByUserId(HttpRequestMessage request,int userId);
        HttpResponseMessage ValidateOTP(HttpRequestMessage request, T gbObject);
        HttpResponseMessage RegenerateOTP(HttpRequestMessage request, T gbObject);
        HttpResponseMessage Delete(HttpRequestMessage request, int id);
        HttpResponseMessage Delete(HttpRequestMessage request, int param1, int param2, int param3);        
        HttpResponseMessage DeleteFile(HttpRequestMessage request,int caseId, int id);
        string Download(HttpRequestMessage request, int caseId, int documentid);
        HttpResponseMessage GetDocumentList(HttpRequestMessage request, int id);
        HttpResponseMessage GeneratePasswordLink(HttpRequestMessage request, T gbObject);
        HttpResponseMessage ValidatePassword(HttpRequestMessage request, T gbObject);
        HttpResponseMessage GetByLocationAndSpecialty(HttpRequestMessage request, int locationId, int specialtyId);
        HttpResponseMessage GetBySpecialityInAllApp(HttpRequestMessage request, int specialtyId);
        HttpResponseMessage GetByRoomInAllApp(HttpRequestMessage request, int roomTestId);

        HttpResponseMessage GetViewStatus(HttpRequestMessage request, int id, bool status);
        HttpResponseMessage GetObjects(HttpRequestMessage request);
        HttpResponseMessage GetAllCompanyAndLocation(HttpRequestMessage request);
        HttpResponseMessage GetObjects(HttpRequestMessage request, string param1);
        HttpResponseMessage GetGbObjects(HttpRequestMessage request, int id);
        HttpResponseMessage GetGbObjects2(HttpRequestMessage request, int id);
        HttpResponseMessage GetGbObjects3(HttpRequestMessage request, int id);
        HttpResponseMessage GetgbObjects(HttpRequestMessage request, int id);
        HttpResponseMessage GetGbObjects4(HttpRequestMessage request, int id);
        HttpResponseMessage GetOpenCaseForPatient(HttpRequestMessage request, int PatientId);
        HttpResponseMessage GetByReferringCompanyId(HttpRequestMessage request, int id);
        HttpResponseMessage GetByReferredToCompanyId(HttpRequestMessage request, int id);
        HttpResponseMessage IsInsuranceInfoAdded(HttpRequestMessage request, int id);
        HttpResponseMessage ResetPassword(HttpRequestMessage request, T gbObject);
        HttpResponseMessage GetByCaseId(HttpRequestMessage request, int CaseId);
        HttpResponseMessage GetByPatientId(HttpRequestMessage request, int CaseId);
        HttpResponseMessage GetByLocationId(HttpRequestMessage request, int id);
        HttpResponseMessage GetByReferringLocationId(HttpRequestMessage request, int id);
        HttpResponseMessage GetByReferringToLocationId(HttpRequestMessage request, int id);
        HttpResponseMessage GetByDoctorId(HttpRequestMessage request, int id);
        HttpResponseMessage GetByReferringUserId(HttpRequestMessage request, int id);
        HttpResponseMessage GetByReferredToDoctorId(HttpRequestMessage request, int id);
        HttpResponseMessage GetPatientAccidentInfoByPatientId(HttpRequestMessage request, int PatientId);
        HttpResponseMessage GetCurrentROByPatientId(HttpRequestMessage request, int PatientId);
        HttpResponseMessage DeleteById(HttpRequestMessage request, int id);
        HttpResponseMessage DeleteVisit(HttpRequestMessage request, int id);
        HttpResponseMessage DeleteCalendarEvent(HttpRequestMessage request, int id);
        HttpResponseMessage CancleVisit(HttpRequestMessage request, int id);
        HttpResponseMessage CancleCalendarEvent(HttpRequestMessage request, int id);
        HttpResponseMessage GetCurrentEmpByPatientId(HttpRequestMessage request, int PatientId);

        HttpResponseMessage GetGbObjects(HttpRequestMessage request, int param1, int param2);
        HttpResponseMessage GetGbObjects2(HttpRequestMessage request, int param1, int param2);
        HttpResponseMessage AssociateUserToCompany(HttpRequestMessage request, string UserName, int CompanyId, bool sendEmail);
        HttpResponseMessage GetByDoctorAndDates(HttpRequestMessage request, int DoctorId,  DateTime FromDate,DateTime ToDate);
        HttpResponseMessage GetByDoctorDatesAndName(HttpRequestMessage request, int DoctorId, DateTime FromDate, DateTime ToDate,string Name);
        HttpResponseMessage GetByRoomId(HttpRequestMessage request, int RoomId);
        HttpResponseMessage GetByRoomTestId(HttpRequestMessage request, int RoomTestId);
        HttpResponseMessage GetBySpecialityId(HttpRequestMessage request, int specialityId);
        HttpResponseMessage GenerateReferralDocument(HttpRequestMessage request, int id);
        HttpResponseMessage GetAllExcludeCompany(HttpRequestMessage request, int CompanyId);
        
    }
}
