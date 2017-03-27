
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
        Object Save(int id, string type, List<HttpContent> streamContent,string uploadpath);
        Object AssociateLocationToDoctors(T gbObject);
        Object AssociateDoctorToLocations(T gbObject);
        int Delete(T entity);
        object Delete(int id);
        object GetDocumentList(int id);

        Object Get(int id, string type);
        Object Get(int id, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object IsInsuranceInfoAdded(int id, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);        
        Object Get(T gbObject, int? nestingLevels = null);
        Object Signup(T gbObject, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object Login(T gbObject, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object ValidateInvitation(T gbObject, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        
        Object AddUploadedFileData(int id, string FileUploadPath, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByLocationAndSpecialty(int locationId, int specialtyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetBySpecialityInAllApp(int specialtyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByRoomInAllApp(int roomId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GenerateToken(int userId);
        Object ValidateToken(string tokenId);
        Object Kill(int tokenId);
        Object DeleteByUserId(int userId);

        Object ValidateOTP(T gbObject);
        Object RegenerateOTP(T gbObject);

        Object GeneratePasswordLink(T gbObject);
        Object ValidatePassword(T gbObject);


        Object Get(int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object Get(string param1, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object Update(T gbObject);
        Object Add(T gbObject);
        Object GetByCompanyId(int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByCompanyWithOpenCases(int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByLocationWithOpenCases(int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByCompanyWithCloseCases(int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByInsuranceMasterId(int InsuranceMasterId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);        
        Object GetByCaseId(int CaseId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByPatientId(int PatientId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByLocationId(int LocationId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByDoctorId(int DoctorId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetCurrentEmpByPatientId(int PatientId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetPatientAccidentInfoByPatientId(int PatientId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetCurrentROByPatientId(int PatientId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object ResetPassword(T gbObject);
        Object DeleteById(int id);
        Object DeleteCalendarEvent(int id);
        Object DeleteVisit(int id);
        Object CancleVisit(int id);
        Object CancleCalendarEvent(int id);
        Object GetByDates(DateTime FromDate,DateTime ToDate, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        
        Object Get(int param1, int param2, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object Get2(int param1, int param2, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object AssociateUserToCompany(string UserName, int CompanyId, bool sendEmail, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object GetByRoomId(int RoomId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
    }
}
