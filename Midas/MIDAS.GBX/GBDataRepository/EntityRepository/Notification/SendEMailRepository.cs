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

        #region Send EMail List From Queue
        public override object SendListFromQueue<T>(List<T> entity)
        {
            List<BO.EMailSend> EMailListSendBO = (List<BO.EMailSend>)(object)entity;
            List<BO.EMailSend> EMailListSendBOResult = new List<BO.EMailSend>();

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
                    BO.EMailSend result = Convert<BO.EMailSend, EMailQueue>(EMailQueueDB);
                    EMailListSendBOResult.Add(result);
                }                
            }

            return (object)EMailListSendBOResult;
        }
        #endregion

        public void Dispose()
        {
            //throw new NotImplementedException();
        }
    }
}
