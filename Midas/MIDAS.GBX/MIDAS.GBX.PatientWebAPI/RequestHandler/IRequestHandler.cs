using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;

namespace MIDAS.GBX.PatientWebAPI.RequestHandler
{
    public interface IRequestHandler<T>
    {
        HttpResponseMessage Login(HttpRequestMessage request, T gbObject);
        HttpResponseMessage RegenerateOTP(HttpRequestMessage request, T gbObject);
        HttpResponseMessage ValidateOTP(HttpRequestMessage request, T gbObject);
        HttpResponseMessage CreateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage SaveDoctor(HttpRequestMessage request, T gbObject);
        HttpResponseMessage CreateGbDocObject(HttpRequestMessage request, int id, string type, List<HttpContent> streamContent,string uploadpath);
        HttpResponseMessage CreateGbDocObject1(HttpRequestMessage request, int caseid, int companyid, List<HttpContent> streamContent, string uploadpath, bool signed);
        HttpResponseMessage GetObject(HttpRequestMessage request, int id, string type);
        HttpResponseMessage GetGbObjects(HttpRequestMessage request, T gbObject);
        HttpResponseMessage GetObject(HttpRequestMessage request, int id);
        HttpResponseMessage GetCaseCompanies(HttpRequestMessage request, int caseId);
        HttpResponseMessage ValidatePassword(HttpRequestMessage request, T gbObject);
        HttpResponseMessage ValidateInvitation(HttpRequestMessage request, T gbObject);
        HttpResponseMessage UpdateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage GeneratePasswordLink(HttpRequestMessage request, T gbObject);
        HttpResponseMessage GetObjects(HttpRequestMessage request);
        HttpResponseMessage GetByPatientVisitId(HttpRequestMessage request, int patientVisitId);
        HttpResponseMessage GetObjects(HttpRequestMessage request, string param1);
        HttpResponseMessage GetGbObjects(HttpRequestMessage request, int id);
        HttpResponseMessage GetgbObjects(HttpRequestMessage request, int id);
        HttpResponseMessage GetGbObjects2(HttpRequestMessage request, int id);
        HttpResponseMessage GetGbObjects2(HttpRequestMessage request, int param1,int param2);
        HttpResponseMessage ResetPassword(HttpRequestMessage request, T gbObject);
        HttpResponseMessage GetByPatientId(HttpRequestMessage request, int PatientId);
        HttpResponseMessage DeleteById(HttpRequestMessage request, int id);
        HttpResponseMessage DeleteObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage GetByCaseId(HttpRequestMessage request, int CaseId);
        HttpResponseMessage GetCurrentEmpByPatientId(HttpRequestMessage request, int PatientId);
        HttpResponseMessage GetCurrentROByPatientId(HttpRequestMessage request, int PatientId);
        HttpResponseMessage Delete(HttpRequestMessage request, int id);
        HttpResponseMessage Delete(HttpRequestMessage request, int param1,int param2, int param3);
        HttpResponseMessage GetByDoctorId(HttpRequestMessage request, int id);
        HttpResponseMessage DeleteVisit(HttpRequestMessage request, int id);
        HttpResponseMessage DeleteCalendarEvent(HttpRequestMessage request, int id);
        HttpResponseMessage CancleVisit(HttpRequestMessage request, int id);
        HttpResponseMessage CancleCalendarEvent(HttpRequestMessage request, int id);
        HttpResponseMessage IsInsuranceInfoAdded(HttpRequestMessage request, int id);
        HttpResponseMessage GetByLocationId(HttpRequestMessage request, int id);
        HttpResponseMessage GetGbObjects(HttpRequestMessage request, int param1, int param2);
        HttpResponseMessage AddUploadedFileData(HttpRequestMessage request, int id, string FileUploadPath);
        HttpResponseMessage GetDocumentList(HttpRequestMessage request, int id);
        HttpResponseMessage GetByRoomId(HttpRequestMessage request, int RoomId);
        HttpResponseMessage GetByLocationAndSpecialty(HttpRequestMessage request, int locationId, int specialtyId);
        HttpResponseMessage DeleteFile(HttpRequestMessage request, int caseId, int id);
        string Download(HttpRequestMessage request, int caseId, int documentid);
        object DownloadSignedConsent(HttpRequestMessage request, T gbObject);
        HttpResponseMessage GetOpenCaseForPatient(HttpRequestMessage request, int PatientId);
        HttpResponseMessage GetConsentList(HttpRequestMessage request, int id);
        HttpResponseMessage GetByLocationAndPatientId(HttpRequestMessage request, int LocationId, int PatientId);
        HttpResponseMessage GetByLocationDoctorAndPatientId(HttpRequestMessage request, int locationId, int doctorId, int patientId);
        HttpResponseMessage GetByLocationRoomAndPatientId(HttpRequestMessage request, int locationId, int roomId, int patientId);
        HttpResponseMessage GetLocationForPatientId(HttpRequestMessage request, int patientId);
        HttpResponseMessage GetByPatientIdAndLocationId(HttpRequestMessage request, int PatientId, int LocationId);
        HttpResponseMessage GetByDocumentId(HttpRequestMessage request, int documentId);
        HttpResponseMessage GetByObjectIdAndType(HttpRequestMessage request, int objectId,string objectType);
        HttpResponseMessage GetVisitsByPatientId(HttpRequestMessage request, int PatientId);
        HttpResponseMessage GetReadOnly(HttpRequestMessage request, int CaseId, int companyId);
        HttpResponseMessage GetOpenCaseCompaniesByPatientId(HttpRequestMessage request, int PatientId);
    }
}
