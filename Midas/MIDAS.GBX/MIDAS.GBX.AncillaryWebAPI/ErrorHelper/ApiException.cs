#region Using namespaces.
using System;
using System.Data.Entity.Validation;
using System.Net;
using System.Runtime.Serialization;
#endregion


namespace MIDAS.GBX.AncillaryWebAPI.ErrorHelper
{
    /// <summary>
    /// Api Exception
    /// </summary>
    [Serializable]
    [DataContract]
    public class ApiException : Exception, IApiExceptions
    {
        #region Public Serializable properties.
        [DataMember]
        public int ErrorCode { get; set; }
        [DataMember]
        public string ErrorDescription { get; set; }
        [DataMember]
        public HttpStatusCode HttpStatus { get; set; }
        
        string reasonPhrase = "ApiException";

        [DataMember]
        public string ReasonPhrase
        {
            get { return this.reasonPhrase; }

            set { this.reasonPhrase = value; }
        }
        [DataMember]
        public Exception Exception { get; set; }
        [DataMember]
        public DbEntityValidationException DbEntityValidationException { get; set; }
        #endregion
    }
}