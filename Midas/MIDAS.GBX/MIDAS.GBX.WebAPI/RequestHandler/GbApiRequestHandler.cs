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

        public HttpResponseMessage CreateGbObject(HttpRequestMessage request, JObject gbObject)
        {
            Object ID = dataAccessManager.Save(gbObject);

            try
            {
                var res = (GbObject)(object)ID;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, ID);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, ID);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new GbObject { ErrorMessage = "Invalid parameters." });
            }
        }
        

        private static string GetCurrentUserFromContext(HttpRequestMessage request)
        {
            //use the usertoken to determine the  user
            return "";
        }
        public HttpResponseMessage GetObject(HttpRequestMessage request, int id)
        {

            Object ID = dataAccessManager.Get(id);
            try
            {
                var res = (GbObject)(object)ID;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, ID);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, ID);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new GbObject { ErrorMessage = "Invalid parameters." });
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

        public HttpResponseMessage GetGbObjects(HttpRequestMessage request,JObject data)
        {
            Object objResult = dataAccessManager.Get(data);

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
                return request.CreateResponse(HttpStatusCode.BadRequest, new GbObject { ErrorMessage = "Invalid parameters." });
            }
        }

        public HttpResponseMessage SignUp(HttpRequestMessage request, JObject data)
        {
            Object objResult = dataAccessManager.Signup(data);
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
            catch
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage Login(HttpRequestMessage request, JObject data)
        {
            Object objResult = dataAccessManager.Login(data);

            try
            {
                var res = (GbObject)(object)objResult;
                return request.CreateResponse(res.StatusCode, objResult);

            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new GbObject { ErrorMessage = "Invalid parameters." });
            }
        }

        public HttpResponseMessage ValidateInvitation(HttpRequestMessage request, JObject data)
        {
            Object objResult = dataAccessManager.ValidateInvitation(data);

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
                return request.CreateResponse(HttpStatusCode.BadRequest, new GbObject { ErrorMessage = "Invalid parameters." });
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

        public HttpResponseMessage ValidateOTP(HttpRequestMessage request, JObject data)
        {
            Object objResult = dataAccessManager.ValidateOTP(data);

            try
            {
                var res = (GbObject)(object)objResult;
                return request.CreateResponse(res.StatusCode, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new GbObject { ErrorMessage = "Invalid parameters." });
            }
        }

        public HttpResponseMessage RegenerateOTP(HttpRequestMessage request, JObject data)
        {
            Object objResult = dataAccessManager.RegenerateOTP(data);

            try
            {
                var res = (GbObject)(object)objResult;
                return request.CreateResponse(res.StatusCode, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new GbObject { ErrorMessage = "Invalid parameters." });
            }
        }

        public HttpResponseMessage GeneratePasswordLink(HttpRequestMessage request, JObject data)
        {
            Object objResult = dataAccessManager.GeneratePasswordLink(data);

            try
            {
                var res = (GbObject)(object)objResult;
                return request.CreateResponse(res.StatusCode, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new GbObject { ErrorMessage = "Invalid parameters." });
            }
        }

        public HttpResponseMessage ValidatePassword(HttpRequestMessage request, JObject data)
        {
            Object objResult = dataAccessManager.ValidatePassword(data);

            try
            {
                var res = (GbObject)(object)objResult;
                return request.CreateResponse(res.StatusCode, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new GbObject { ErrorMessage = "Invalid parameters." });
            }
        }
        #endregion
    }
}
