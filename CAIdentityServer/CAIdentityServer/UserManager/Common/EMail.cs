using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace UserManager.Common
{
    public class Email : IDisposable
    {
        private string _subject;
        public string Subject
        {
            get
            {
                return _subject;
            }
            set
            {
                _subject = value;
            }
        }

        private string _body;
        public string Body
        {
            get
            {
                return _body;
            }
            set
            {
                _body = value;
            }
        }

        private string _toemail;
        public string ToEmail
        {
            get
            {
                return _toemail;
            }
            set
            {
                _toemail = value;
            }
        }

        private string _fromemail;
        public string FromEmail
        {
            get
            {
                return _fromemail;
            }
            set
            {
                _fromemail = value;
            }
        }

        private string _ccemail;
        public string CCEmail
        {
            get
            {
                return _ccemail;
            }
            set
            {
                _ccemail = value;
            }
        }
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
        public void SendMail()
        {
            string smtpHostName = Utility.GetConfigValue("SMTPHostName"),
                smtpUserName = Utility.GetConfigValue("SMTPUsername"),
                smtpPassword = Utility.GetConfigValue("SMTPPassword"),
                adminSupportEMail = Utility.GetConfigValue("SystemAdminSupportEmail");
            int smtpPortNumber = Convert.ToInt32(Utility.GetConfigValue("SMTPPortNumber"));

            var client = new SmtpClient(smtpHostName, smtpPortNumber)
            {
                Credentials = new NetworkCredential(smtpUserName, smtpPassword),
                EnableSsl = true,
            };

            var mail = new MailMessage(adminSupportEMail, ToEmail);
            mail.Subject = Subject;
            mail.Body = Body;
            mail.IsBodyHtml = true;

            Task.Factory.StartNew(() => client.Send(mail));
        }
    }
}
