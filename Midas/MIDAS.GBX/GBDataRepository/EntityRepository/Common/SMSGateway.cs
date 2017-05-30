using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Twilio;
using Twilio.Types;
using Twilio.Rest.Api.V2010.Account;

namespace MIDAS.GBX.DataRepository.EntityRepository.Common
{
    public static class  SMSGateway
    {
        public static string SendSMS(string phoneNumber, string messageBody)
        {
            string accountSid = ConfigurationManager.AppSettings.Get("TWILIO_ACCOUNT_ID");      //-- Account SID from twilio.com/console : AC48ba9355b0bae1234caa9e29dc73b407                            
            string authToken = ConfigurationManager.AppSettings.Get("TWILIO_AUTH_TOKEN");       //-- bAuth Token from twilio.com/console : 74b9f9f1c60c200d28b8c5b22968e65f
            TwilioClient.Init(accountSid, authToken);
            var message = MessageResource.Create(
                new PhoneNumber(phoneNumber),
                from: new PhoneNumber(ConfigurationManager.AppSettings.Get("TWILIO_FROM_PHN")), //-- +14252150865
                body: messageBody
                );
           return message.Sid;
        }
    }
}
