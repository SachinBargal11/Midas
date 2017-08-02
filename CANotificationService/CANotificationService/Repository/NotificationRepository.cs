using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CANotificationService.Models;

namespace CANotificationService.Repository
{
    public class NotificationRepository
    {
        public NotificationUser GetUser(string username, string applicationname)
        {
            NotificationUser notificationUser;
            using (NotificationEntities dc = new NotificationEntities())
            {
                var user = dc.Users.Where(u => u.UserName == username && u.Application.Name == applicationname).FirstOrDefault();
                if (user != null)
                {
                    notificationUser = new NotificationUser
                    {
                        UserName = user.UserName,
                        ApplicationID = (int)user.ApplicationID,
                        ApplicationName = user.Application.Name
                    };

                    return notificationUser;
                }
            }

            return null;
        }

        public IEnumerable<NotificationUser> GetUsers(string applicationname)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                return dc.Users.Where(u => u.Application.Name == applicationname).Select(a => new NotificationUser
                {
                    UserName = a.UserName,
                    ApplicationID = (int)a.ApplicationID,
                    ApplicationName = a.Application.Name
                }).ToList();
            }
        }

        public List<NotificationUserConnection> GetUserConnections(string username, string applicationname)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                var user = dc.Users.Where(u => u.UserName == username && u.Application.Name == applicationname).FirstOrDefault();
                if (user != null)
                {
                    var userConnections = user.UserConnections.Select(x => new NotificationUserConnection
                    {
                        ConnectionId = x.Id,
                        UserAgent = x.UserAgent,
                        UserName = x.UserName
                    }).ToList();

                    return userConnections;
                }
            }

            return null;
        }

        public void AddUserConnection(NotificationUserConnection connection)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                UserConnection userconnection = new UserConnection
                {
                    Id = connection.ConnectionId,
                    UserName = connection.UserName,
                    UserAgent = connection.UserAgent
                };

                dc.UserConnections.Add(userconnection);
                dc.SaveChanges();
            }
        }

        public void RemoveUserConnection(string connectionid)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                UserConnection connection = dc.UserConnections.Where(x => x.Id == connectionid).FirstOrDefault();
                if (connection != null)
                {
                    dc.UserConnections.Remove(connection);
                    dc.SaveChanges();
                }
            }
        }

        public void RemoveUserConnectionAll()
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                    dc.UserConnections.RemoveRange(dc.UserConnections);
                    dc.SaveChanges();
            }
        }

        public List<NotificationMessage> GetNotificationMessages(DateTime lastruntime)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                return dc.Messages
                    .Where(a => a.NotificationTime > lastruntime)
                    .OrderByDescending(a => a.NotificationTime)
                    .Select(n => new NotificationMessage
                    {
                        Id = n.Id,
                        Message = n.NotificationMessage,
                        ReceiverUserID = n.ReceiverUserID,
                        EventName = n.Event.Name,
                        EventID = n.EventID,
                        NotificationTime = n.NotificationTime,
                        ApplicationName = n.Event.Application.Name,
                        ApplicationID = n.Event.Application.Id,
                        IsRead = n.IsRead
                    }).ToList();
            }
        }

        public void UpdateMessageStatus(int messageid)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                var message = dc.Messages.Where(m => m.Id == messageid && m.IsRead == false).FirstOrDefault();
                message.IsRead = true;
                dc.SaveChanges();
            }
        }

        public void UpdateMessageStatus(string username)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                var messages = dc.Messages.Where(m => m.ReceiverUserID == username && m.IsRead == false).ToList();
                messages.ForEach(m =>
                {
                    m.IsRead = true;
                    m.NotificationTime = DateTime.Now;
                });
                dc.SaveChanges();
            }
        }

        public List<NotificationMessage> GetNotificationMessages(string applicationname, string username)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                return dc.Messages
                    .Where(a => a.Event.Application.Name == applicationname && a.ReceiverUserID == username)
                    .OrderByDescending(a => a.NotificationTime)
                    .Select(n => new NotificationMessage
                    {
                        Id = n.Id,
                        Message = n.NotificationMessage,
                        ReceiverUserID = n.ReceiverUserID,
                        EventName = n.Event.Name,
                        EventID = n.EventID,
                        NotificationTime = n.NotificationTime,
                        ApplicationName = n.Event.Application.Name,
                        ApplicationID = n.Event.Application.Id,
                        IsRead = n.IsRead
                    }).ToList();
            }
        }

        public void AddMessage(string receiverusername, string notificationmessage, int eventid)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                //User has subscribed for event then add message to users message notification queue.
                if (dc.EventSubscriptions.Any(s => s.UserID == receiverusername && s.EventID == eventid))
                {
                    Message message = new Message
                    {
                        ReceiverUserID = receiverusername,
                        NotificationMessage = notificationmessage,
                        EventID = eventid,
                        IsRead = false,
                        NotificationTime = DateTime.Now
                    };

                    dc.Messages.Add(message);
                    dc.SaveChanges();
                }
            }
        }

        public void AddApplication(string applicationname)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                Application application = new Application { Name = applicationname };
                dc.Applications.Add(application);
                dc.SaveChanges();
            }
        }

        public IEnumerable<NotificationApplication> GetApplications()
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
              return dc.Applications.Select(a=> new NotificationApplication { ApplicationID = a.Id, ApplicationName = a.Name }).ToList();
            }
        }

        public NotificationApplication GetApplication(string applicationName)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                var application = dc.Applications.Where(a => a.Name == applicationName).FirstOrDefault();
                if (application != null)
                {
                    return new NotificationApplication
                    {
                        ApplicationID = application.Id,
                        ApplicationName = application.Name
                    };
                }
                else
                {
                    return null;
                }
            }
        }

        public NotificationApplication GetApplication(int applicationid)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                var application = dc.Applications.Where(a => a.Id == applicationid).FirstOrDefault();
                if (application != null)
                {
                    return new NotificationApplication
                    {
                        ApplicationID = application.Id,
                        ApplicationName = application.Name
                    };
                }
                else
                {
                    return null;
                }
            }
        }

        public void AddApplicationGroup(string applicationname, string groupname)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                Application application = dc.Applications.Where(a => a.Name == applicationname).FirstOrDefault();

                if(application != null)
                {
                    if(dc.ApplicationGroups.Any(a=> a.Application.Name == applicationname && a.Name == groupname))
                    {
                        throw new Exception(string.Format("An application group with groupname {0} already exists.", groupname));
                    }

                    ApplicationGroup applicationgroup = new ApplicationGroup();
                    applicationgroup.ApplicationID = application.Id;
                    applicationgroup.Name = groupname;

                    dc.ApplicationGroups.Add(applicationgroup);
                    dc.SaveChanges();
                }
                else
                {
                    throw new Exception(string.Format("The application with name {0} doen not exists.", applicationname));
                }

                
            }
        }

        public IEnumerable<NotificationApplicationGroupDetail> GetApplicationGroup(string applicationName)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                return dc.ApplicationGroups.Where(a => a.Application.Name == applicationName).Select(ag => new NotificationApplicationGroupDetail
                {
                    ApplicationGroupID = ag.ID,
                    ApplicationID = ag.ApplicationID,
                    ApplicationGroupName = ag.Name,
                    ApplicationName = ag.Application.Name
                }).ToList();
            }
        }

        public NotificationApplicationGroupDetail GetApplicationGroup(string applicationName, string groupname)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                return dc.ApplicationGroups.Where(a => a.Application.Name == applicationName && a.Name == groupname)
                    .Select(ag => new NotificationApplicationGroupDetail
                    {
                        ApplicationGroupID = ag.ID,
                        ApplicationID = ag.ApplicationID,
                        ApplicationGroupName = ag.Name,
                        ApplicationName = ag.Application.Name
                    }).FirstOrDefault();
            }
        }

        public NotificationApplicationGroupDetail GetApplicationGroup(int groupid)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                return dc.ApplicationGroups.Where(a => a.ID == groupid)
                    .Select(ag => new NotificationApplicationGroupDetail
                    {
                        ApplicationGroupID = ag.ID,
                        ApplicationID = ag.ApplicationID,
                        ApplicationGroupName = ag.Name,
                        ApplicationName = ag.Application.Name
                    }).FirstOrDefault();
            }
        }

        public void AddApplicationEvent(string applicationname, string eventname)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                Application application = dc.Applications.Where(a => a.Name == applicationname).FirstOrDefault();

                if (application != null)
                {
                    if (dc.Events.Any(a => a.Application.Name == applicationname && a.Name == eventname))
                    {
                        throw new Exception(string.Format("An application event with eventname {0} already exists.", eventname));
                    }

                    Event myevent = new Event();
                    myevent.ApplicationID = application.Id;
                    myevent.Name = eventname;

                    dc.Events.Add(myevent);
                    dc.SaveChanges();
                }
                else
                {
                    throw new Exception(string.Format("The application with name {0} doen not exists.", applicationname));
                }
            }
        }

        public IEnumerable<NotificationEventDetail> GetApplicationEvent(string applicationName)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                return dc.Events.Where(a => a.Application.Name == applicationName).Select(ae => new NotificationEventDetail
                {
                    EventID = ae.Id,
                    ApplicationID = ae.ApplicationID,
                    EventName = ae.Name,
                    ApplicationName = ae.Application.Name
                }).ToList();
            }
        }

        public NotificationEventDetail GetApplicationEvent(string applicationName, string eventname)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                return dc.Events.Where(a => a.Application.Name == applicationName && a.Name == eventname)
                    .Select(ae => new NotificationEventDetail
                    {
                        EventID = ae.Id,
                        ApplicationID = ae.ApplicationID,
                        EventName = ae.Name,
                        ApplicationName = ae.Application.Name
                    }).FirstOrDefault();
            }
        }

        public NotificationEventDetail GetApplicationEvent(int eventid)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                return dc.Events.Where(a => a.Id == eventid)
                    .Select(ae => new NotificationEventDetail
                    {
                        EventID = ae.Id,
                        ApplicationID = ae.ApplicationID,
                        EventName = ae.Name,
                        ApplicationName = ae.Application.Name
                    }).FirstOrDefault();
            }
        }

        public void AddEventGroup(int groupid, int eventid)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                ApplicationGroup applicationgroup = dc.ApplicationGroups.Where(a => a.ID == groupid).FirstOrDefault();

                if (applicationgroup != null)
                {
                    if (dc.EventGroups.Any(a => a.GroupID == groupid && a.EventID == eventid))
                    {
                        throw new Exception(string.Format("A mapping for GroupID {0} and EventID {1} already exists.", groupid, eventid));
                    }

                    EventGroup eventgroup = new EventGroup();
                    eventgroup.EventID = eventid;
                    eventgroup.GroupID = groupid;

                    dc.EventGroups.Add(eventgroup);
                    dc.SaveChanges();
                }
                else
                {
                    throw new Exception(string.Format("The application with GroupID {0} doen not exists.", groupid));
                }
            }
        }

        public IEnumerable<NotificationEventGroupDetail> GetGroupEvent(string applicationName, string groupname)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                return dc.EventGroups.Where(a => a.Event.Application.Name == applicationName && a.ApplicationGroup.Name == groupname).Select(ae => new NotificationEventGroupDetail
                {
                    EventID = ae.EventID,
                    EventName = ae.Event.Name,
                    GroupID = ae.GroupID,
                    GroupName = ae.ApplicationGroup.Name,
                    EventGroupID = ae.ID
                }).ToList();
            }
        }

        public IEnumerable<NotificationEventGroupDetail> GetGroupEvent(int groupid)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                return dc.EventGroups.Where(a => a.GroupID == groupid)
                    .Select(ae => new NotificationEventGroupDetail
                    {
                        EventID = ae.EventID,
                        EventName = ae.Event.Name,
                        GroupID = ae.GroupID,
                        GroupName = ae.ApplicationGroup.Name,
                        EventGroupID = ae.ID
                    }).ToList();
            }
        }

        public void SubscribeEvent(string applicationname, string username, int eventid)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                Application application = dc.Applications.Where(a => a.Name == applicationname).FirstOrDefault();
                if (application == null)
                {
                    throw new Exception(string.Format("The application with name {0} doen not exists.", applicationname));
                }

                Event myevent = dc.Events.Where(a => a.Id == eventid).FirstOrDefault();

                if (myevent == null)
                {
                    throw new Exception(string.Format("The application event with name {0} doen not exists.", eventid));
                }

                if (dc.EventSubscriptions.Any(s=> s.EventID == eventid && s.UserID == username))
                {
                    throw new Exception(string.Format("A mapping for EventID {0} and UserName {1} already exists.", eventid, username));
                }

                var user = dc.Users.Where(u => u.Application.Name == applicationname && u.UserName == username).FirstOrDefault();
                if(user == null)
                {
                    user = new User
                    {
                        ApplicationID = application.Id,
                        UserName = username
                    };

                    dc.Users.Add(user);
                }

                EventSubscription subscription = new EventSubscription
                {
                    EventID = eventid,
                    UserID = username
                };

                dc.EventSubscriptions.Add(subscription);

                dc.SaveChanges();
            }
        }

        public void SubscribeEvent(string applicationname, string username, int[] eventids)
        {
            var eventsNotEixtsInDB = string.Empty;
            var eventsAlreadyMappedWithUser = string.Empty;
            var eventsNewlyMappedWithUser = string.Empty;
            string message = string.Empty;

            using (NotificationEntities dc = new NotificationEntities())
            {
                dc.Database.BeginTransaction();
                //Check if application exists
                Application application = dc.Applications.Where(a => a.Name == applicationname).FirstOrDefault();
                if (application == null)
                {
                    throw new Exception( string.Format("The application with name {0} doen not exists.", applicationname));
                }

                if (eventids.Count() > 0)
                {
                    dc.EventSubscriptions.RemoveRange(dc.EventSubscriptions.Where(a => eventids.Contains(a.EventID)).ToList());

                    foreach (var item in eventids)
                    {
                        EventSubscription subscription = new EventSubscription
                        {
                            EventID = item,
                            UserID = username
                        };

                        dc.EventSubscriptions.Add(subscription);
                    }

                    if (eventsNewlyMappedWithUser != string.Empty)
                    {
                        var user = dc.Users.Where(u => u.Application.Name == applicationname && u.UserName == username).FirstOrDefault();
                        if (user == null)
                        {
                            user = new User
                            {
                                ApplicationID = application.Id,
                                UserName = username
                            };

                            dc.Users.Add(user);
                        }
                        dc.SaveChanges();
                        dc.Database.CurrentTransaction.Commit();
                    }
                    else
                    {
                        dc.Database.CurrentTransaction.Rollback();
                    }
                }
            }
        }

        public bool HasEventSubscription(string receiverusername, int eventid)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                return dc.EventSubscriptions.Any(s => s.UserID == receiverusername && s.EventID == eventid);
            }
        }

        public bool HasEventSubscription(string applicationname, string receiverusername, string eventname)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                return dc.EventSubscriptions.Any(s => s.Event.Application.Name == applicationname && s.UserID == receiverusername && s.Event.Name == eventname);
            }
        }

        public IEnumerable<NotificationEventSubscriptionDetail> GetSubscription(string applicationname, string username)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                return dc.EventSubscriptions.Where(a => a.Event.Application.Name == applicationname && a.UserID == username)
                    .Select(ae => new NotificationEventSubscriptionDetail
                    {
                        EventID = ae.EventID,
                        EventName = ae.Event.Name,
                        ApplicationID = ae.Event.ApplicationID,
                        UserID = ae.UserID,
                        AppliicationName = ae.Event.Application.Name,
                        SubscriptionID = ae.Id
                    }).ToList();
            }
        }

        public NotificationEventSubscriptionDetail GetSubscription(string applicationname, string username, int eventid)
        {
            using (NotificationEntities dc = new NotificationEntities())
            {
                return dc.EventSubscriptions.Where(a => a.Event.Application.Name == applicationname && a.UserID == username && a.EventID == eventid)
                    .Select(ae => new NotificationEventSubscriptionDetail
                    {
                        EventID = ae.EventID,
                        EventName = ae.Event.Name,
                        ApplicationID = ae.Event.ApplicationID,
                        UserID = ae.UserID,
                        AppliicationName = ae.Event.Application.Name,
                        SubscriptionID = ae.Id
                    }).FirstOrDefault();
            }
        }
    }
}