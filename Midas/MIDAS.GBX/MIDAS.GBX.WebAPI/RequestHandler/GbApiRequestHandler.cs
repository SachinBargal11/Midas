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
        

        private static string GetCurrentUserFromContext(HttpRequestMessage request)
        {
            //use the usertoken to determine the  user
            return "";
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
                return request.CreateResponse(HttpStatusCode.Created, objResult);
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
    }
}
