using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;
using Twilio;
using Twilio.Types;
using Twilio.Rest.Api.V2010.Account;
using Newtonsoft.Json;
using System.Net.Mail;
using System.Net;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class SendEMailRepository : BaseEntityRepo, IDisposable
    {
        public SendEMailRepository(MIDASGBXEntities context) : base(context)
        {
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            EMailQueue EMailQueueDB = entity as EMailQueue;

            if (EMailQueueDB == null)
                return default(T);

            BO.EMailQueue EMailSendBO = new BO.EMailQueue();

            EMailSendBO.ID = EMailQueueDB.Id;
            EMailSendBO.AppId = EMailQueueDB.AppId;
            EMailSendBO.FromEmail = EMailQueueDB.FromEmail;
            EMailSendBO.ToEmail = EMailQueueDB.ToEmail;
            EMailSendBO.CcEmail = EMailQueueDB.CcEmail;
            EMailSendBO.BccEmail = EMailQueueDB.BccEmail;
            EMailSendBO.EMailSubject = EMailQueueDB.EMailSubject;
            EMailSendBO.EMailBody = EMailQueueDB.EMailBody;
            EMailSendBO.CreatedDate = EMailQueueDB.CreatedDate;
            EMailSendBO.DeliveryDate = EMailQueueDB.DeliveryDate;
            EMailSendBO.NumberOfAttempts = EMailQueueDB.NumberOfAttempts;
            EMailSendBO.ResultObject = EMailQueueDB.ResultObject;

            return (T)(object)EMailSendBO;
        }
        #endregion

        #region Send EMail List From Queue
        public override object SendListFromQueue<T>(List<T> entity)
        {
            List<BO.EMailSend> EMailListSendBO = (List<BO.EMailSend>)(object)entity;
            List<BO.EMailQueue> EMailListQueueBOResult = new List<BO.EMailQueue>();

            foreach (var eachEMail in EMailListSendBO)
            {
                EMailQueue EMailQueueDB = null;

                try
                {
                    EMailQueueDB = _context.EMailQueues.Where(p => p.Id == eachEMail.ID).FirstOrDefault();

                    var client = new SmtpClient(eachEMail.SmtpClient, int.Parse(eachEMail.SmtpClient_Port))
                    {
                        Credentials = new NetworkCredential(eachEMail.NetworkCredential_EMail, eachEMail.NetworkCredential_Pwd),
                        EnableSsl = true,
                    };

                    var mail = new System.Net.Mail.MailMessage(eachEMail.FromEmail, eachEMail.ToEmail);
                    mail.Subject = eachEMail.EMailSubject;
                    mail.Body = eachEMail.EMailSubject;
                    mail.IsBodyHtml = true;

                    //Task.Factory.StartNew(() => client.Send(mail));
                    client.Send(mail);                    

                    if (EMailQueueDB != null)
                    {
                        EMailQueueDB.DeliveryDate = DateTime.UtcNow;
                        EMailQueueDB.NumberOfAttempts += 1;
                        EMailQueueDB.ResultObject = "SUCCESS";

                        _context.SaveChanges();
                    }
                }
                catch (Exception ex)
                {
                    if (EMailQueueDB != null)
                    {
                        EMailQueueDB.NumberOfAttempts += 1;
                        EMailQueueDB.ResultObject = ex.ToString();

                        _context.SaveChanges();
                    }
                }

                if (EMailQueueDB != null)
                {
                    BO.EMailQueue result = Convert<BO.EMailQueue, EMailQueue>(EMailQueueDB);
                    EMailListQueueBOResult.Add(result);
                }                
            }

            return (object)EMailListQueueBOResult;
        }
        #endregion

        public void Dispose()
        {
            //throw new NotImplementedException();
        }
    }
}
