using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class NotificationRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<Notification> _dbNotification;

        public NotificationRepository(MIDASGBXEntities context) : base(context)
        {
            _dbNotification = context.Set<Notification>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Notification2 notification = (BO.Notification2)(object)entity;
            var result = notification.Validate(notification);
            return result;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            if (entity is Notification)
            {
                Notification notification = entity as Notification;

                if (notification == null)
                    return default(T);

                BO.Notification2 notificationBO = new BO.Notification2();
                notificationBO.ID = notification.Id;
                notificationBO.CompanyId = notification.CompanyId;
                notificationBO.LocationId = notification.LocationId;
                notificationBO.StartDate = notification.StartDate;
                notificationBO.EndDate = notification.EndDate;
                notificationBO.IsViewed = notification.IsViewed;
                              
                notificationBO.CreateByUserID = notification.CreateByUserID;               

                if (notification.IsDeleted.HasValue)
                    notificationBO.IsDeleted = notification.IsDeleted.Value;
                if (notification.UpdateByUserID.HasValue)
                    notificationBO.UpdateByUserID = notification.UpdateByUserID.Value;
              

                //if (notification.Company != null)
                //{
                //    BO.Company boCompany = new BO.Company();
                //    using (CompanyRepository cmp = new CompanyRepository(_context))
                //    {
                //        boCompany = cmp.Convert<BO.Company, Company>(notification.Company);
                //        notificationBO.Company = boCompany;
                //    }
                //}
                //if (notification.Location != null)
                //{
                //    BO.Location boLocation = new BO.Location();
                //    using (LocationRepository cmp = new LocationRepository(_context))
                //    {
                //        boLocation = cmp.Convert<BO.Location, Location>(notification.Location);
                //        notificationBO.Location = boLocation;
                //    }
                //}


                return (T)(object)notificationBO;
            }
            else if (entity is CalendarEvent)
            {
                CalendarEvent CalendarEventDB = entity as CalendarEvent;

                if (CalendarEventDB == null)
                    return default(T);

                BO.CalendarEvent CalendarEvent = new BO.CalendarEvent();
                using (CalendarEventRepository calEventRep = new CalendarEventRepository(_context))
                {
                    CalendarEvent = calEventRep.Convert<BO.CalendarEvent, CalendarEvent>(CalendarEventDB);
                }

                return (T)(object)CalendarEvent;
            }

            return default(T);
        }
        #endregion

        #region Get
        public override object Get()
        {

            List<Notification> lstNotification = _context.Notifications.Where(p=> (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                       .ToList<Notification>();
            if (lstNotification == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Notification not found .", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Notification2> lstBONotification = new List<BO.Notification2>();
                lstNotification.ForEach(p => lstBONotification.Add(Convert<BO.Notification2, Notification>(p)));

                return lstBONotification;
            }
        }
        #endregion
              
        #region Get By Company Id
        public override object GetByCompanyId(int id)
        {
            List<Notification> lstNotification = _context.Notifications
                                                                        .Where(p => p.CompanyId == id
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<Notification>();

            if (lstNotification == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Notification not found for this Company Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Notification2> lstBONotification = new List<BO.Notification2>();
                lstNotification.ForEach(p => lstBONotification.Add(Convert<BO.Notification2, Notification>(p)));

                return lstBONotification;
            }
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.Notification2 NotificationBO = (BO.Notification2)(object)entity;
           

            Notification NotificationDB = new Notification();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                bool IsEditMode = false;
               
                IsEditMode = (NotificationBO != null && NotificationBO.ID > 0) ? true : false;

                
               
                #region Notification
                if (NotificationBO != null && ((NotificationBO.ID <= 0 && NotificationBO.CompanyId.HasValue == true && NotificationBO.LocationId.HasValue == true) || (NotificationBO.ID > 0)))
                {
                    bool Add_NotificationDB = false;
                    NotificationDB = _context.Notifications.Where(p => p.Id == NotificationBO.ID).FirstOrDefault();

                    if (NotificationDB == null && NotificationBO.ID <= 0)
                    {
                        NotificationDB = new Notification();
                        Add_NotificationDB = true;
                    }
                    else if (NotificationDB == null && NotificationBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Notification Id dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }
                    
                    NotificationDB.CompanyId = IsEditMode == true && NotificationBO.CompanyId.HasValue == false ? NotificationDB.CompanyId : NotificationBO.CompanyId.Value;
                    NotificationDB.LocationId = IsEditMode == true && NotificationBO.LocationId.HasValue == false ? NotificationDB.LocationId : NotificationBO.LocationId.Value;
                   
                    NotificationDB.NotificationMessage = IsEditMode == true && NotificationBO.NotificationMessage == null ? NotificationDB.NotificationMessage : NotificationBO.NotificationMessage;
                    NotificationDB.StartDate = IsEditMode == true && NotificationBO.StartDate == null ? NotificationDB.StartDate : NotificationBO.StartDate;
                    NotificationDB.EndDate = IsEditMode == true && NotificationBO.EndDate == null ? NotificationDB.EndDate : NotificationBO.EndDate;
                    NotificationDB.IsViewed = NotificationBO.IsViewed;
                    NotificationDB.IsDeleted = NotificationBO.IsDeleted.HasValue ? NotificationBO.IsDeleted : false;
                    if (IsEditMode == false)
                    {
                        NotificationDB.CreateByUserID = NotificationBO.CreateByUserID;
                        NotificationDB.CreateDate = DateTime.UtcNow;
                    }
                    else
                    {
                        NotificationDB.UpdateByUserID = NotificationBO.UpdateByUserID;
                        NotificationDB.UpdateDate = DateTime.UtcNow;
                    }

                    if (Add_NotificationDB == true)
                    {
                        NotificationDB = _context.Notifications.Add(NotificationDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false )
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Notification details.", ErrorLevel = ErrorLevel.Error };
                    }
                    NotificationDB = null;
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                if (NotificationDB != null)
                {
                    NotificationDB = _context.Notifications
                                                            .Where(p => p.Id == NotificationDB.Id
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault<Notification>();
                }
                
            }

            var res = Convert<BO.Notification2, Notification>(NotificationDB);
            return (object)res;
        }
        #endregion

        #region Viewstatus
        public override object GetViewStatus(int id, bool status)
        {
            var acc = _context.Notifications.Where(p => p.Id == id
                                             && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                            .FirstOrDefault<Notification>();
            if (acc != null)
            {
                acc.IsViewed = status;
                _context.SaveChanges();
            }
            BO.Notification2 acc_ = Convert<BO.Notification2, Notification>(acc);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.Notifications                                            
                                            .Where(p => p.Id == id
                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                            .FirstOrDefault<Notification>();

            BO.Notification2 acc_ = Convert<BO.Notification2, Notification>(acc);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
