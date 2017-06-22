using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Newtonsoft.Json.Linq;
using MIDAS.GBX.DataAccessManager;
using MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.WebAPI.ErrorHelper;

namespace MIDAS.GBX.WebAPI
{
    public class GbApiRequestHandler<T> : IRequestHandler<T>
    {
        private IGbDataAccessManager<T> dataAccessManager;

        public GbApiRequestHandler()
        {
            dataAccessManager = new GbDataAccessManager<T>();
        }

        public string Download(HttpRequestMessage request, int caseId, int documentid)
        {
            string path = dataAccessManager.Download(caseId, documentid);
            if (caseId > 0)
            {
                return path;
            }
            else
            {
                return string.Empty;
            }
        }

        public object DownloadSignedConsent(HttpRequestMessage request, T gbObject)
        {
            object path = dataAccessManager.DownloadSignedConsent(gbObject);
            return path;
        }

        public HttpResponseMessage CreateGbObject(HttpRequestMessage request, T gbObject)
        {
            var objResult = dataAccessManager.Save(gbObject);
 
            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage UpdateMedicalProvider(HttpRequestMessage request, T gbObject)
        {
            var objResult = dataAccessManager.UpdateMedicalProvider(gbObject);

            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage UpdateAttorneyProvider(HttpRequestMessage request, T gbObject)
        {
            var objResult = dataAccessManager.UpdateAttorneyProvider(gbObject);

            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }
        
        public HttpResponseMessage CreateGbObject(HttpRequestMessage request, List<T> gbObject)
        {
            var objResult = dataAccessManager.Save(gbObject);

            try
            {
                var res = (object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage CreateGbDocObject(HttpRequestMessage request, int id, string type, List<HttpContent> streamContent, string uploadpath)
        {
            var objResult = dataAccessManager.Save(id, type, streamContent, uploadpath);

            try
            {
                var res = (object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.OK, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage CreateGbDocObject1(HttpRequestMessage request, int caseid, int companyid, List<HttpContent> streamContent, string uploadpath, bool signed)
        {
            var objResult = new object();
            objResult = dataAccessManager.ConsentSave(caseid, companyid, streamContent, uploadpath, signed);

            try
            {
                var res = (object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.OK, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage CreateGbObject1(HttpRequestMessage request, T gbObject)
        {
            var objResult = dataAccessManager.AssociateLocationToDoctors(gbObject);

            try
            {
                //var res = (GbObject)(object)objResult;
                var res = (object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage CreateGb(HttpRequestMessage request, T gbObject)
        {
            var objResult = dataAccessManager.AssociateDoctorToLocations(gbObject);

            try
            {
                //var res = (GbObject)(object)objResult;
                var res = (object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage CreateGbObject2(HttpRequestMessage request, T gbObject)
        {
            var objResult = dataAccessManager.AddQuickPatient(gbObject);

            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        private static string GetCurrentUserFromContext(HttpRequestMessage request)
        {
            //use the usertoken to determine the  user
            return "";
        }

        public HttpResponseMessage GetObject(HttpRequestMessage request, int id, string type)
        {
            var objResult = dataAccessManager.Get(id, type);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetObject(HttpRequestMessage request, int id, string objectType, string documentType)
        {
            var objResult = dataAccessManager.Get(id, objectType, documentType);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetObject(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.Get(id);
            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetDiagnosisType(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.GetDiagnosisType(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetConsentList(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.GetConsentList(id);
            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage DeleteGbObject(HttpRequestMessage request, T gbObject)
        {
            int ID = dataAccessManager.Delete(gbObject);

            if (ID > 0)
            {
                var res = (GbObject)(object)gbObject;
                res.ID = ID;
                return request.CreateResponse<T>(HttpStatusCode.Accepted, (T)(object)res);
            }
            else
            {
                return request.CreateResponse<T>(HttpStatusCode.NoContent, gbObject);
            }
        }

        public HttpResponseMessage DeleteObject(HttpRequestMessage request, T gbObject)
        {
            var objResult = dataAccessManager.DeleteObject(gbObject);

            try
            {
                var res = (object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage Delete(HttpRequestMessage request, int id)
        {
            var res = dataAccessManager.Delete(id);
            if (id > 0)
            {
                return request.CreateResponse(HttpStatusCode.Accepted, res);
            }
            else
            {
                return request.CreateResponse(HttpStatusCode.NoContent, new ErrorObject { ErrorMessage = "Id can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }
        }

        public HttpResponseMessage Delete(HttpRequestMessage request, int param1, int param2, int param3)
        {
            var res = dataAccessManager.Delete(param1, param2, param3);
            if (param1 > 0)
            {
                return request.CreateResponse(HttpStatusCode.Accepted, res);
            }
            else
            {
                return request.CreateResponse(HttpStatusCode.NoContent, new ErrorObject { ErrorMessage = "Id can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }
        }

        

        public HttpResponseMessage DeleteFile(HttpRequestMessage request,int caseId, int id)
        {
            var res = dataAccessManager.DeleteFile(caseId,id);
            if (id > 0)
            {
                return request.CreateResponse(HttpStatusCode.Accepted, res);
            }
            else
            {
                return request.CreateResponse(HttpStatusCode.NoContent, new ErrorObject { ErrorMessage = "Id can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }
        }
        

        public HttpResponseMessage ValidateUniqueName(HttpRequestMessage request, T gbObject)
        {
            throw new NotImplementedException();
        }

        public HttpResponseMessage UpdateGbObject(HttpRequestMessage request, T gbObject)
        {
            throw new NotImplementedException();
        }

        public HttpResponseMessage GetGbObjects(HttpRequestMessage request, T gbObject)
        {
            var objResult = dataAccessManager.Get(gbObject);
            try
            {
                var res = (object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);                
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetViewStatus(HttpRequestMessage request, int id, bool status)
        {
            var objResult = dataAccessManager.GetViewStatus(id, status);
            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        #region Signup
        public HttpResponseMessage SignUp(HttpRequestMessage request, T gbObject)
        {
            Signup signUPBO = (Signup)(object)gbObject;

            if (signUPBO.company == null)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "Company object can't be null", errorObject = "",ErrorLevel=ErrorLevel.Error });
            }
            else if (signUPBO.user == null)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "User object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }
            else if (signUPBO.role == null)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "Role object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }

            var objResult = dataAccessManager.Signup(gbObject);
            try
            {
                if (((GbObject)objResult).ID > 0)
                {
                    return request.CreateResponse(HttpStatusCode.Created, objResult);
                }
                else
                {
                    return request.CreateResponse(HttpStatusCode.Conflict, objResult);
                }
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }
        #endregion

        #region UpdateCompany
        public HttpResponseMessage UpdateCompany(HttpRequestMessage request, T gbObject)
        {
            Signup signUPBO = (Signup)(object)gbObject;

            if (signUPBO.company == null)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "Company object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }
            else if (signUPBO.user == null)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "User object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }

            var objResult = dataAccessManager.UpdateCompany(gbObject);
            try
            {
                if (((GbObject)objResult).ID > 0)
                {
                    return request.CreateResponse(HttpStatusCode.Created, objResult);
                }
                else
                {
                    return request.CreateResponse(HttpStatusCode.Conflict, objResult);
                }
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }
        #endregion

        #region Login
        public HttpResponseMessage Login(HttpRequestMessage request, T gbObject)
        {
            User userBO = (User)(object)gbObject;
            if (userBO == null)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "User object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }
            var objResult = dataAccessManager.Login(gbObject);

            try
            {
                var res = (GbObject)(object)objResult;
                return request.CreateResponse(HttpStatusCode.Created, objResult);

            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }
        #endregion

        #region Login
        public object Login(T gbObject)
        {
            User userBO = (User)(object)gbObject;

            var objResult = dataAccessManager.Login(gbObject);
            return objResult;
        }
        #endregion

        public HttpResponseMessage ValidateInvitation(HttpRequestMessage request, T gbObject)
        {
            Invitation invitationBO = (Invitation)(object)gbObject;
            if (invitationBO == null)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "Invitation object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }
            var objResult = dataAccessManager.ValidateInvitation(gbObject);

            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, objResult);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        #region Token Related Functions
        public HttpResponseMessage GenerateToken(HttpRequestMessage request, int userId)
        {
            throw new NotImplementedException();
        }

        public HttpResponseMessage ValidateToken(HttpRequestMessage request, string tokenId)
        {
            throw new NotImplementedException();
        }

        public HttpResponseMessage Kill(HttpRequestMessage requeststring, int tokenId)
        {
            throw new NotImplementedException();
        }

        public HttpResponseMessage DeleteByUserId(HttpRequestMessage request, int userId)
        {
            throw new NotImplementedException();
        }

        public HttpResponseMessage ValidateOTP(HttpRequestMessage request, T gbObject)
        {
            ValidateOTP otpBO = (ValidateOTP)(object)gbObject;
            if (otpBO == null)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "OTP object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }
            var objResult = dataAccessManager.ValidateOTP(gbObject);

            try
            {
                var res = (GbObject)(object)objResult;
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage RegenerateOTP(HttpRequestMessage request, T gbObject)
        {
            OTP otpBO = (OTP)(object)gbObject;
            if (otpBO == null)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "OTP object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }
            var objResult = dataAccessManager.RegenerateOTP(gbObject);

            try
            {
                var res = (GbObject)(object)objResult;
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GeneratePasswordLink(HttpRequestMessage request, T gbObject)
        {
            PasswordToken otpBO = (PasswordToken)(object)gbObject;
            if (otpBO == null)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "OTP object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }
            var objResult = dataAccessManager.GeneratePasswordLink(gbObject);

            try
            {
                var res = (GbObject)(object)objResult;
                return request.CreateResponse(HttpStatusCode.Created, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage ValidatePassword(HttpRequestMessage request, T gbObject)
        {
            PasswordToken otpBO = (PasswordToken)(object)gbObject;
            if (otpBO == null)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "OTP object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }
            var objResult = dataAccessManager.ValidatePassword(gbObject);

            try
            {
                var res = (GbObject)(object)objResult;
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }
        #endregion


        public HttpResponseMessage GetObjects(HttpRequestMessage request)
        {
            var objResult = dataAccessManager.Get();
            try
            {
                //var res = (GbObject)(object)objResult;
                var res = (object)objResult;

                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetObjects(HttpRequestMessage request, string param1)
        {
            var objResult = dataAccessManager.Get(param1);
            try
            {
                //var res = (GbObject)(object)objResult;
                var res = (object)objResult;

                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetIsExistingUser(HttpRequestMessage request, string User, string SSN)
        {
            var objResult = dataAccessManager.GetIsExistingUser(User, SSN);
            try
            {
                var res = (object)objResult;

                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage AddUploadedFileData(HttpRequestMessage request, int id, string FileUploadPath)
        {
            var objResult = dataAccessManager.AddUploadedFileData(id, FileUploadPath);

            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByLocationAndSpecialty(HttpRequestMessage request, int locationId, int specialtyId)
        {
            var objResult = dataAccessManager.GetByLocationAndSpecialty(locationId, specialtyId);

            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetBySpecialityInAllApp(HttpRequestMessage request, int specialtyId)
        {
            var objResult = dataAccessManager.GetBySpecialityInAllApp(specialtyId);

            try
            {
                //var res = (GbObject)(object)objResult;
                var res = (object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetAllCompanyAndLocation(HttpRequestMessage request)
        {
            var objResult = dataAccessManager.GetAllCompanyAndLocation();
            try
            {
                //var res = (GbObject)(object)objResult;
                var res = (object)objResult;

                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }
        public HttpResponseMessage GetByRoomInAllApp(HttpRequestMessage request, int roomTestId)
        {
            var objResult = dataAccessManager.GetByRoomInAllApp(roomTestId);

            try
            {
                // var res = (GbObject)(object)objResult;
                var res = (object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetGbObjects(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.GetByCompanyId(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetAllExcludeCompany(HttpRequestMessage request, int CompanyId)
        {
            var objResult = dataAccessManager.GetAllExcludeCompany(CompanyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetGbObjects2(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.GetByCompanyWithOpenCases(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetGbObjects3(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.GetByLocationWithOpenCases(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetGbObjects4(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.GetByCompanyWithCloseCases(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetOpenCaseForPatient(HttpRequestMessage request, int PatientId)
        {
            var objResult = dataAccessManager.GetOpenCaseForPatient(PatientId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByReferringCompanyId(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.GetByReferringCompanyId(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByReferredToCompanyId(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.GetByReferredToCompanyId(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage IsInsuranceInfoAdded(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.IsInsuranceInfoAdded(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetgbObjects(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.GetByInsuranceMasterId(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        //public HttpResponseMessage CreateGbObjectPatient(HttpRequestMessage request, T gbObject)
        //{
        //    var objResult = dataAccessManager.Add(gbObject);

        //    try
        //    {
        //        var res = (GbObject)(object)objResult;
        //        if (res != null)
        //            return request.CreateResponse(HttpStatusCode.Created, res);
        //        else
        //            return request.CreateResponse(HttpStatusCode.NotFound, res);
        //    }
        //    catch (Exception ex)
        //    {
        //        return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
        //    }
        //}

        public HttpResponseMessage ResetPassword(HttpRequestMessage request, T gbObject)
        {
            var objResult = dataAccessManager.ResetPassword(gbObject);

            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByCaseId(HttpRequestMessage request, int CaseId)
        {
            var objResult = dataAccessManager.GetByCaseId(CaseId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }
        public HttpResponseMessage GetByPatientId(HttpRequestMessage request, int PatientId)
        {
            var objResult = dataAccessManager.GetByPatientId(PatientId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByLocationId(HttpRequestMessage request, int LocationId)
        {
            var objResult = dataAccessManager.GetByLocationId(LocationId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByReferringLocationId(HttpRequestMessage request, int LocationId)
        {
            var objResult = dataAccessManager.GetByReferringLocationId(LocationId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByReferringToLocationId(HttpRequestMessage request, int LocationId)
        {
            var objResult = dataAccessManager.GetByReferringToLocationId(LocationId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByDoctorId(HttpRequestMessage request, int DoctorId)
        {
            var objResult = dataAccessManager.GetByDoctorId(DoctorId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByObjectIdAndType(HttpRequestMessage request, int objectId, string objectType)
        {
            var objResult = dataAccessManager.GetByObjectIdAndType(objectId, objectType);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByReferringUserId(HttpRequestMessage request, int UserId)
        {
            var objResult = dataAccessManager.GetByReferringUserId(UserId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByReferredToDoctorId(HttpRequestMessage request, int DoctorId)
        {
            var objResult = dataAccessManager.GetByReferredToDoctorId(DoctorId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetPatientAccidentInfoByPatientId(HttpRequestMessage request, int PatientId)
        {
            var objResult = dataAccessManager.GetPatientAccidentInfoByPatientId(PatientId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetReadOnly(HttpRequestMessage request, int CaseId, int companyId)
        {
            var objResult = dataAccessManager.GetReadOnly(CaseId,companyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        
        public HttpResponseMessage GetCurrentEmpByPatientId(HttpRequestMessage request, int PatientId)
        {
            var objResult = dataAccessManager.GetCurrentEmpByPatientId(PatientId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetCurrentROByPatientId(HttpRequestMessage request, int PatientId)
        {
            var objResult = dataAccessManager.GetCurrentROByPatientId(PatientId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }        

        public HttpResponseMessage DeleteById(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.DeleteById(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetDocumentList(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.GetDocumentList(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }
        public HttpResponseMessage DeleteVisit(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.DeleteVisit(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }
        
        public HttpResponseMessage DeleteCalendarEvent(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.DeleteCalendarEvent(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage CancleVisit(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.CancleVisit(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }
        
        public HttpResponseMessage CancleCalendarEvent(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.CancleCalendarEvent(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }


        public HttpResponseMessage GetGbObjects(HttpRequestMessage request, int param1, int param2)
        {
            var objResult = dataAccessManager.Get(param1, param2);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetGbObjects2(HttpRequestMessage request, int param1, int param2)
        {
            var objResult = dataAccessManager.Get2(param1, param2);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByCaseAndCompanyId(HttpRequestMessage request, int caseId, int companyId)
        {
            var objResult = dataAccessManager.GetByCaseAndCompanyId(caseId, companyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }


        public HttpResponseMessage DismissPendingReferral(HttpRequestMessage request, int PendingReferralId, int userId)
        {
            var objResult = dataAccessManager.DismissPendingReferral(PendingReferralId, userId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

    
        public HttpResponseMessage AssociateUserToCompany(HttpRequestMessage request, string UserName, int CompanyId, bool sendEmail)
        {
            var objResult = dataAccessManager.AssociateUserToCompany(UserName, CompanyId, sendEmail);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByDoctorAndDates(HttpRequestMessage request, int DoctorId, DateTime FromDate, DateTime ToDate)
        {
            var objResult = dataAccessManager.GetByDoctorAndDates(DoctorId, FromDate, ToDate);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByDoctorDatesAndName(HttpRequestMessage request, int DoctorId, DateTime FromDate, DateTime ToDate,string Name)
        {
            var objResult = dataAccessManager.GetByDoctorDatesAndName(DoctorId, FromDate, ToDate,Name);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByRoomId(HttpRequestMessage request, int RoomId)
        {
            var objResult = dataAccessManager.GetByRoomId(RoomId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByRoomTestId(HttpRequestMessage request, int RoomTestId)
        {
            var objResult = dataAccessManager.GetByRoomTestId(RoomTestId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetBySpecialityId(HttpRequestMessage request, int specialityId)
        {
            var objResult = dataAccessManager.GetBySpecialityId(specialityId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetBySpecialityAndCompanyId(HttpRequestMessage request, int specialityId,int companyId,bool showAll)
        {
            var objResult = dataAccessManager.GetBySpecialityAndCompanyId(specialityId, companyId, showAll);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByRoomTestAndCompanyId(HttpRequestMessage request, int roomTestId, int companyId, bool showAll)
        {
            var objResult = dataAccessManager.GetByRoomTestAndCompanyId(roomTestId, companyId, showAll);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByPatientVisitId(HttpRequestMessage request, int patientVisitId)
        {
            var objResult = dataAccessManager.GetByPatientVisitId(patientVisitId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }
        

        public HttpResponseMessage GenerateReferralDocument(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.GenerateReferralDocument(id);
            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage AssociateAttorneyWithCompany(HttpRequestMessage request, int AttorneyId, int CompanyId)
        {
            var objResult = dataAccessManager.AssociateAttorneyWithCompany(AttorneyId,CompanyId);

            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage DisassociateAttorneyWithCompany(HttpRequestMessage request, int AttorneyId, int CompanyId)
        {
            var objResult = dataAccessManager.DisassociateAttorneyWithCompany(AttorneyId, CompanyId);

            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage AssociateDoctorWithCompany(HttpRequestMessage request, int DoctorId, int CompanyId)
        {
            var objResult = dataAccessManager.AssociateDoctorWithCompany(DoctorId, CompanyId);

            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage AssociatePatientWithCompany(HttpRequestMessage request, int PatientId, int CompanyId)
        {
            var objResult = dataAccessManager.AssociatePatientWithCompany(PatientId, CompanyId);

            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage AssociatePatientWithAttorneyCompany(HttpRequestMessage request, int PatientId, int CaseId, int AttorneyCompanyId)
        {
            var objResult = dataAccessManager.AssociatePatientWithAttorneyCompany(PatientId, CaseId, AttorneyCompanyId);

            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage AssociatePatientWithAncillaryCompany(HttpRequestMessage request, int PatientId, int CaseId, int AncillaryCompanyId)
        {
            var objResult = dataAccessManager.AssociatePatientWithAncillaryCompany(PatientId, CaseId, AncillaryCompanyId);

            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage DisassociateDoctorWithCompany(HttpRequestMessage request, int DoctorId, int CompanyId)
        {
            var objResult = dataAccessManager.DisassociateDoctorWithCompany(DoctorId, CompanyId);

            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByLocationAndPatientId(HttpRequestMessage request, int LocationId, int PatientId)
        {
            var objResult = dataAccessManager.GetByLocationAndPatientId(LocationId, PatientId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByLocationDoctorAndPatientId(HttpRequestMessage request, int locationId, int doctorId, int patientId)
        {
            var objResult = dataAccessManager.GetByLocationDoctorAndPatientId(locationId, doctorId, patientId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetBySpecialtyAndCompanyId(HttpRequestMessage request, int specialtyId, int companyId)
        {
            var objResult = dataAccessManager.GetBySpecialtyAndCompanyId(specialtyId, companyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByUserAndCompanyId(HttpRequestMessage request, int userId, int companyId)
        {
            var objResult = dataAccessManager.GetByUserAndCompanyId(userId, companyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage AssociateMedicalProviderWithCompany(HttpRequestMessage request, int PrefMedProviderId, int CompanyId)
        {
            var objResult = dataAccessManager.AssociateMedicalProviderWithCompany(PrefMedProviderId, CompanyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }
        
        public HttpResponseMessage GetAllMedicalProviderExcludeAssigned(HttpRequestMessage request, int CompanyId)
        {
            var objResult = dataAccessManager.GetAllMedicalProviderExcludeAssigned(CompanyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByPrefMedProviderId(HttpRequestMessage request, int PrefMedProviderId)
        {
            var objResult = dataAccessManager.GetByPrefMedProviderId(PrefMedProviderId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetPreferredCompanyDoctorsAndRoomByCompanyId(HttpRequestMessage request, int CompanyId, int SpecialityId, int RoomTestId)
        {
            var objResult = dataAccessManager.GetPreferredCompanyDoctorsAndRoomByCompanyId(CompanyId, SpecialityId, RoomTestId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetPendingReferralByCompanyId(HttpRequestMessage request, int CompanyId)
        {
            var objResult = dataAccessManager.GetPendingReferralByCompanyId(CompanyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetPendingReferralByCompanyId2(HttpRequestMessage request, int CompanyId)
        {
            var objResult = dataAccessManager.GetPendingReferralByCompanyId2(CompanyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByFromCompanyId(HttpRequestMessage request, int companyId)
        {
            var objResult = dataAccessManager.GetByFromCompanyId(companyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByToCompanyId(HttpRequestMessage request, int companyId)
        {
            var objResult = dataAccessManager.GetByToCompanyId(companyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetReferralByFromCompanyId(HttpRequestMessage request, int companyId)
        {
            var objResult = dataAccessManager.GetReferralByFromCompanyId(companyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetReferralByToCompanyId(HttpRequestMessage request, int companyId)
        {
            var objResult = dataAccessManager.GetReferralByToCompanyId(companyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByFromLocationId(HttpRequestMessage request, int locationId)
        {
            var objResult = dataAccessManager.GetByFromLocationId(locationId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByToLocationId(HttpRequestMessage request, int locationId)
        {
            var objResult = dataAccessManager.GetByToLocationId(locationId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByFromDoctorAndCompanyId(HttpRequestMessage request, int doctorId, int companyId)
        {
            var objResult = dataAccessManager.GetByFromDoctorAndCompanyId(doctorId, companyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByToDoctorAndCompanyId(HttpRequestMessage request, int doctorId, int companyId)
        {
            var objResult = dataAccessManager.GetByToDoctorAndCompanyId(doctorId, companyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetReferralByFromDoctorAndCompanyId(HttpRequestMessage request, int doctorId, int companyId)
        {
            var objResult = dataAccessManager.GetReferralByFromDoctorAndCompanyId(doctorId, companyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetReferralByToDoctorAndCompanyId(HttpRequestMessage request, int doctorId, int companyId)
        {
            var objResult = dataAccessManager.GetReferralByToDoctorAndCompanyId(doctorId, companyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByForRoomId(HttpRequestMessage request, int roomId)
        {
            var objResult = dataAccessManager.GetByForRoomId(roomId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByToRoomId(HttpRequestMessage request, int roomId)
        {
            var objResult = dataAccessManager.GetByToRoomId(roomId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByForSpecialtyId(HttpRequestMessage request, int specialtyId)
        {
            var objResult = dataAccessManager.GetByForSpecialtyId(specialtyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByForRoomTestId(HttpRequestMessage request, int roomTestId)
        {
            var objResult = dataAccessManager.GetByForRoomTestId(roomTestId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetFreeSlotsForDoctorByLocationId(HttpRequestMessage request, int DoctorId, int LocationId, DateTime StartDate, DateTime EndDate)
        {
            var objResult = dataAccessManager.GetFreeSlotsForDoctorByLocationId(DoctorId, LocationId, StartDate, EndDate);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetFreeSlotsForRoomByLocationId(HttpRequestMessage request, int RoomId, int LocationId, DateTime StartDate, DateTime EndDate)
        {
            var objResult = dataAccessManager.GetFreeSlotsForRoomByLocationId(RoomId, LocationId, StartDate, EndDate);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage AssociateVisitWithReferral(HttpRequestMessage request, int ReferralId, int PatientVisitId)
        {
            var objResult = dataAccessManager.AssociateVisitWithReferral(ReferralId, PatientVisitId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage AssociatePrefAttorneyProviderWithCompany(HttpRequestMessage request, int PrefAttorneyProviderId, int CompanyId)
        {
            var objResult = dataAccessManager.AssociatePrefAttorneyProviderWithCompany(PrefAttorneyProviderId, CompanyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetAllPrefAttorneyProviderExcludeAssigned(HttpRequestMessage request, int CompanyId)
        {
            var objResult = dataAccessManager.GetAllPrefAttorneyProviderExcludeAssigned(CompanyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetAllPrefAncillaryProviderExcludeAssigned(HttpRequestMessage request, int CompanyId)
        {
            var objResult = dataAccessManager.GetAllPrefAncillaryProviderExcludeAssigned(CompanyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetPrefAncillaryProviderByCompanyId(HttpRequestMessage request, int companyId)
        {
            var objResult = dataAccessManager.GetPrefAncillaryProviderByCompanyId(companyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetPrefAttorneyProviderByCompanyId(HttpRequestMessage request, int companyId)
        {
            var objResult = dataAccessManager.GetPrefAttorneyProviderByCompanyId(companyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByCompanyAndDoctorId(HttpRequestMessage request, int companyId, int doctorId)
        {
            var objResult = dataAccessManager.GetByCompanyAndDoctorId(companyId, doctorId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByDocumentId(HttpRequestMessage request, int documentId)
        {
            var objResult = dataAccessManager.GetByDocumentId(documentId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByAncillaryId(HttpRequestMessage request, int AncillaryId)
        {
            var objResult = dataAccessManager.GetByAncillaryId(AncillaryId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetUpdatedCompanyById(HttpRequestMessage request, int CompanyId)
        {
            var objResult = dataAccessManager.GetUpdatedCompanyById(CompanyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetProcedureCodeBySpecialtyExcludingAssigned(HttpRequestMessage request, int specialtyId, int CompanyId)
        {
            var objResult = dataAccessManager.GetProcedureCodeBySpecialtyExcludingAssigned(specialtyId, CompanyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetProcedureCodeByRoomTestExcludingAssigned(HttpRequestMessage request, int roomTestId, int CompanyId)
        {
            var objResult = dataAccessManager.GetProcedureCodeByRoomTestExcludingAssigned(roomTestId, CompanyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage AddPatientProfileDocument(HttpRequestMessage request, int PatientId, int DocumentId)
        {
            var objResult = dataAccessManager.AddPatientProfileDocument(PatientId, DocumentId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

    }
}
