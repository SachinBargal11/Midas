using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MessagingServiceManager.Entities;

namespace MessagingServiceManager.Repository
{
    public class MessagingRepository
    {
        public Entities.Application GetApplication(int applicationid)
        {
            using (MessagingEntities db = new MessagingEntities())
            {
                var application = db.Applications.Where(a => a.Id == applicationid).FirstOrDefault();
                if (application != null)
                {
                    var messagingApplication = new Entities.Application
                    {
                        Id = application.Id,
                        Name = application.Name,
                        QueueTypeID = application.QueueTypeId
                    };

                    return messagingApplication;
                }
            }

            return null;
        }

        public Entities.Application GetApplication(string applicationname)
        {
            using (MessagingEntities db = new MessagingEntities())
            {
                var application = db.Applications.Where(a => a.Name == applicationname).FirstOrDefault();
                if (application != null)
                {
                    var messagingApplication = new Entities.Application
                    {
                        Id = application.Id,
                        Name = application.Name,
                        QueueTypeID = application.QueueTypeId
                    };

                    return messagingApplication;
                }
            }

            return null;
        }

        public Entities.EMailConfiguration GetEmailConfiguration(int applicationid)
        {
            using (MessagingEntities db = new MessagingEntities())
            {
                var emailConfiguration = db.EMailConfigurations.Where(a => a.ApplicationID == applicationid && a.IsDeleted == false).FirstOrDefault();
                if (emailConfiguration != null)
                {
                    var messagingemailConfiguration = new Entities.EMailConfiguration
                    {
                        Id = emailConfiguration.Id,
                        ApplicationID = emailConfiguration.ApplicationID,
                        MaxNumberOfRetry = emailConfiguration.MaxNumberOfRetry,
                        SMTPClientHostName = emailConfiguration.SMTPClientHostName,
                        SMTPClientPassword = emailConfiguration.SMTPClientPassword,
                        SmtpClientPortNumber = emailConfiguration.SmtpClientPortNumber,
                        SMTPClientUserName = emailConfiguration.SMTPClientUserName,
                        IsDeleted = emailConfiguration.IsDeleted,
                        IsSSLEnabled = emailConfiguration.IsSSLEnabled
                    };

                    return messagingemailConfiguration;
                }
            }

            return null;
        }

        public Entities.SMSConfiguration GetSMSConfiguration(int applicationid)
        {
            using (MessagingEntities db = new MessagingEntities())
            {
                var smsConfiguration = db.SMSConfigurations.Where(a => a.ApplicationID == applicationid).FirstOrDefault();
                if (smsConfiguration != null)
                {
                    var messagingsmsConfiguration = new Entities.SMSConfiguration
                    {
                        Id = smsConfiguration.Id,
                        ApplicationID = smsConfiguration.ApplicationID,
                        MaxNumberOfRetry = smsConfiguration.MaxNumberOfRetry,
                        AccountSid = smsConfiguration.AccountSid,
                        AuthToken = smsConfiguration.AuthToken
                    };

                    return messagingsmsConfiguration;
                }
            }

            return null;
        }

        public Entities.QueueType GetQueueType(int id)
        {
            using (MessagingEntities db = new MessagingEntities())
            {
                var queuetype = db.QueueTypes.Where(a => a.Id == id).FirstOrDefault();
                if (queuetype != null)
                {
                    var messagingqueuetype = new Entities.QueueType
                    {
                        Id = queuetype.Id,
                        QueueTypeName = queuetype.QueueTypeName
                    };

                    return messagingqueuetype;
                }
            }

            return null;
        }

        public Entities.EMailQueueItem GetEmailFromQueue(int queueid)
        {
            using (MessagingEntities db = new MessagingEntities())
            {
                var emailqueue = db.EMailQueues.Where(a => a.Id == queueid).FirstOrDefault();
                if (emailqueue != null)
                {
                    var messagingemailqueue = new Entities.EMailQueueItem
                    {
                        Id = emailqueue.Id,
                        ApplicationID = emailqueue.ApplicationID,
                        CreatedDate = emailqueue.CreatedDate,
                        EmailObject = emailqueue.EmailObject,
                        DeliveryDate = emailqueue.DeliveryDate,
                        DeliveryResponse = emailqueue.DeliveryResponse,
                        NumberOfAttempts = emailqueue.NumberOfAttempts,
                        StatusID = emailqueue.StatusID
                    };

                    return messagingemailqueue;
                }
            }

            return null;
        }

        public IEnumerable<Entities.EMailQueueItem> GetEmailFromQueueByApplicationID(int applicationid)
        {
            using (MessagingEntities db = new MessagingEntities())
            {
                return db.EMailQueues.Where(a => a.Id == applicationid).Select(e => new Entities.EMailQueueItem
                {
                    Id = e.Id,
                    ApplicationID = e.ApplicationID,
                    CreatedDate = e.CreatedDate,
                    EmailObject = e.EmailObject,
                    DeliveryDate = e.DeliveryDate,
                    DeliveryResponse = e.DeliveryResponse,
                    NumberOfAttempts = e.NumberOfAttempts,
                    StatusID = e.StatusID
                }).ToList();
            }
        }

        public IEnumerable<Entities.EMailQueueItem> GetPendingEmailFromQueue()
        {
            using (MessagingEntities db = new MessagingEntities())
            {
                return db.EMailQueues.Where(a => a.StatusID == (int)MessageDeliveryStatus.Scheduled).Select(e => new Entities.EMailQueueItem
                {
                    Id = e.Id,
                    ApplicationID = e.ApplicationID,
                    CreatedDate = e.CreatedDate,
                    EmailObject = e.EmailObject,
                    DeliveryDate = e.DeliveryDate,
                    DeliveryResponse = e.DeliveryResponse,
                    NumberOfAttempts = e.NumberOfAttempts,
                    StatusID = e.StatusID
                }).ToList();
            }
        }

        public Entities.SMSQueueItem GetSMSFromQueue(int queueid)
        {
            using (MessagingEntities db = new MessagingEntities())
            {
                var smsqueue = db.SMSQueues.Where(a => a.Id == queueid).FirstOrDefault();
                if (smsqueue != null)
                {
                    var messagingsmslqueue = new Entities.SMSQueueItem
                    {
                        Id = smsqueue.Id,
                        ApplicationID = smsqueue.ApplicationID,
                        CreatedDate = smsqueue.CreatedDate,
                        SMSObject = smsqueue.SMSObject,
                        DeliveryDate = smsqueue.DeliveryDate,
                        DeliveryResponse = smsqueue.DeliveryResponse,
                        NumberOfAttempts = smsqueue.NumberOfAttempts,
                        StatusID = smsqueue.StatusID
                    };

                    return messagingsmslqueue;
                }
            }

            return null;
        }

        public IEnumerable<Entities.SMSQueueItem> GetSMSFromQueueByApplicationID(int applicationid)
        {
            using (MessagingEntities db = new MessagingEntities())
            {
                return db.SMSQueues.Where(a => a.Id == applicationid).Select(e => new Entities.SMSQueueItem
                {
                    Id = e.Id,
                    ApplicationID = e.ApplicationID,
                    CreatedDate = e.CreatedDate,
                    SMSObject = e.SMSObject,
                    DeliveryDate = e.DeliveryDate,
                    DeliveryResponse = e.DeliveryResponse,
                    NumberOfAttempts = e.NumberOfAttempts,
                    StatusID = e.StatusID
                }).ToList();
            }
        }

        public IEnumerable<Entities.SMSQueueItem> GetPendingSMSFromQueue()
        {
            using (MessagingEntities db = new MessagingEntities())
            {
                return db.SMSQueues.Where(a => a.StatusID == (int)MessageDeliveryStatus.Scheduled).Select(e => new Entities.SMSQueueItem
                {
                    Id = e.Id,
                    ApplicationID = e.ApplicationID,
                    CreatedDate = e.CreatedDate,
                    SMSObject = e.SMSObject,
                    DeliveryDate = e.DeliveryDate,
                    DeliveryResponse = e.DeliveryResponse,
                    NumberOfAttempts = e.NumberOfAttempts,
                    StatusID = e.StatusID
                }).ToList();
            }
        }

        public void AddEmailToQueue(Entities.EMailQueueItem queue)
        {
            using (MessagingEntities db = new MessagingEntities())
            {
                EMailQueue mailqueue = new EMailQueue
                {
                    ApplicationID = queue.ApplicationID,
                    StatusID = queue.StatusID,
                    EmailObject = queue.EmailObject,
                    CreatedDate = queue.CreatedDate,
                    DeliveryDate = queue.DeliveryDate,
                    NumberOfAttempts = queue.NumberOfAttempts,
                    DeliveryResponse = queue.DeliveryResponse
                };

                db.EMailQueues.Add(mailqueue);
                db.SaveChanges();
            }
        }

        public void AddSMSToQueue(Entities.SMSQueueItem queue)
        {
            using (MessagingEntities db = new MessagingEntities())
            {
                SMSQueue smsqueue = new SMSQueue
                {
                    ApplicationID = queue.ApplicationID,
                    StatusID = queue.StatusID,
                    SMSObject = queue.SMSObject,
                    CreatedDate = queue.CreatedDate,
                    DeliveryDate = queue.DeliveryDate,
                    NumberOfAttempts = queue.NumberOfAttempts,
                    DeliveryResponse = queue.DeliveryResponse
                };

                db.SMSQueues.Add(smsqueue);
                db.SaveChanges();
            }
        }

        public DataOperationStatus UpdateEmailToQueue(Entities.EMailQueueItem queue)
        {
            using (MessagingEntities db = new MessagingEntities())
            {
                var mailqueue = db.EMailQueues.Where(q => q.Id == queue.Id).FirstOrDefault();
                if(mailqueue!= null)
                {
                    mailqueue.ApplicationID = queue.ApplicationID;
                    mailqueue.StatusID = queue.StatusID;
                    mailqueue.EmailObject = queue.EmailObject;
                    mailqueue.CreatedDate = queue.CreatedDate;
                    mailqueue.DeliveryDate = queue.DeliveryDate;
                    mailqueue.NumberOfAttempts = queue.NumberOfAttempts;
                    mailqueue.DeliveryResponse = queue.DeliveryResponse;

                    db.SaveChanges();
                    return DataOperationStatus.SavedSuccessfully;
                }
                else
                {
                    return DataOperationStatus.RecordNotExist;
                }
            }
        }

        public DataOperationStatus UpdateSMSToQueue(Entities.SMSQueueItem queue)
        {
            using (MessagingEntities db = new MessagingEntities())
            {
                var smsqueue = db.SMSQueues.Where(q => q.Id == queue.Id).FirstOrDefault();
                if (smsqueue != null)
                {
                    smsqueue.ApplicationID = queue.ApplicationID;
                    smsqueue.StatusID = queue.StatusID;
                    smsqueue.SMSObject = queue.SMSObject;
                    smsqueue.CreatedDate = queue.CreatedDate;
                    smsqueue.DeliveryDate = queue.DeliveryDate;
                    smsqueue.NumberOfAttempts = queue.NumberOfAttempts;
                    smsqueue.DeliveryResponse = queue.DeliveryResponse;

                    db.SaveChanges();
                    return DataOperationStatus.SavedSuccessfully;
                }
                else
                {
                    return DataOperationStatus.RecordNotExist;
                }
            }
        }
    }
}