using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Twilio;
using Twilio.Types;
using BO = MIDAS.GBX.BusinessObjects;
using Twilio.Rest.Api.V2010.Account;

namespace MIDAS.GBX.Notification.EntityRepository.SMS
{
    internal class SMSRepository : BaseEntityRepo, IDisposable
    {
        public SMSRepository() : base()
        {

        }

        #region SendSMS
        public override object SendSMS<T>(T smsObject)
        {
            BO.SMS SMSBO = (BO.SMS)(object)smsObject;

            string accountSid = SMSBO.twilio_account_id;
            string authToken = SMSBO.twilio_auth_token;
            TwilioClient.Init(accountSid, authToken);

            var FromNumber = new PhoneNumber(SMSBO.FromNumber);
            var ToNumber = new PhoneNumber(SMSBO.ToNumber);
            
            var Message = SMSBO.Message;

            var message = MessageResource.Create(
                ToNumber,
                from: FromNumber,
                body: Message
            );

            SMSBO.MessageResource = new BO.MessageResource() {
                AccountSid = message.AccountSid,
                ApiVersion = message.ApiVersion,
                Body = message.Body,
                DateCreated = message.DateCreated,
                DateSent = message.DateSent,
                DateUpdated = message.DateUpdated,
                //Direction = message.Direction,
                ErrorCode = message.ErrorCode,
                ErrorMessage = message.ErrorMessage,
                From = message.From.ToString(),
                MessagingServiceSid = message.MessagingServiceSid,
                NumMedia = message.NumMedia,
                NumSegments = message.NumSegments,
                Price = message.Price,
                PriceUnit = message.PriceUnit,
                Sid = message.Sid,
                //Status = message.Status,
                SubresourceUris = message.SubresourceUris,
                To = message.To,
                Uri = message.Uri
            };

            return (object)SMSBO;
        }
        #endregion

        #region SendSMS
        public override object SendMultipleSMS<T>(T multipleSMSObject)
        {
            BO.MultipleSMS MultipleSMSBO = (BO.MultipleSMS)(object)multipleSMSObject;

            string accountSid = MultipleSMSBO.twilio_account_id;
            string authToken = MultipleSMSBO.twilio_auth_token;
            TwilioClient.Init(accountSid, authToken);

            var FromNumber = new PhoneNumber(MultipleSMSBO.FromNumber);

            foreach (var eachSMS in MultipleSMSBO.SMSList)
            {
                var ToNumber = new PhoneNumber(eachSMS.ToNumber);

                var Message = eachSMS.Message;

                var message = MessageResource.Create(
                    ToNumber,
                    from: FromNumber,
                    body: Message
                );

                eachSMS.MessageResource = new BO.MessageResource()
                {
                    AccountSid = message.AccountSid,
                    ApiVersion = message.ApiVersion,
                    Body = message.Body,
                    DateCreated = message.DateCreated,
                    DateSent = message.DateSent,
                    DateUpdated = message.DateUpdated,
                    //Direction = message.Direction,
                    ErrorCode = message.ErrorCode,
                    ErrorMessage = message.ErrorMessage,
                    From = message.From.ToString(),
                    MessagingServiceSid = message.MessagingServiceSid,
                    NumMedia = message.NumMedia,
                    NumSegments = message.NumSegments,
                    Price = message.Price,
                    PriceUnit = message.PriceUnit,
                    Sid = message.Sid,
                    //Status = message.Status,
                    SubresourceUris = message.SubresourceUris,
                    To = message.To,
                    Uri = message.Uri
                };
            }
            

            return (object)MultipleSMSBO;
        }
        #endregion

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~SMSRepository() {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }
        #endregion
    }
}