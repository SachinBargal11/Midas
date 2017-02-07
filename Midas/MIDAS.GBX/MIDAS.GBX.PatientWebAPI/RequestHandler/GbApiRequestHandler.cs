using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.DataAccessManager;

namespace MIDAS.GBX.PatientWebAPI.RequestHandler
{
    public class GbApiRequestHandler<T> : IRequestHandler<T>
    {
        private IGbDataAccessManager<T> dataAccessManager;

        public GbApiRequestHandler()
        {
            dataAccessManager = new GbDataAccessManager<T>();
        }

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

        public HttpResponseMessage UpdateGbObject(HttpRequestMessage request, T gbObject)
        {
            var objResult = dataAccessManager.Update(gbObject);

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
    }
}