using MIDAS.GBX.Common;
using MIDAS.GBX.DataAccessManager;
using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.DataRepository
{
    public class GbNotificationManager<T> : IGbNotificationManager<T>
    {
        IDBContextProvider dbContextProvider = null;

        public GbNotificationManager(IDBContextProvider dbContextProvider = null)
        {
            this.dbContextProvider = dbContextProvider ?? new DBContextProvider();
        }

        public object AddToQueue(T notificationObject)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.AddToQueue(notificationObject);

                return gbdata;
            }

            catch (GbException gbe)
            {
                return gbe;
            }
            catch (Exception ex)
            {
                return ex;
            }
        }

        public object ReadFromQueue()
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.ReadFromQueue();

                return gbdata;
            }

            catch (GbException gbe)
            {
                return gbe;
            }
            catch (Exception ex)
            {
                return ex;
            }
        }

        //public object SendSMSFromQueue(T smsObject)
        //{
        //    try
        //    {
        //        BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
        //        var gbdata = baseRepo.SendSMSFromQueue(smsObject);

        //        return gbdata;
        //    }

        //    catch (GbException gbe)
        //    {
        //        return gbe;
        //    }
        //    catch (Exception ex)
        //    {
        //        return ex;
        //    }
        //}

        public object SendListFromQueue(List<T> notificationObject)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.SendListFromQueue(notificationObject);

                return gbdata;
            }

            catch (GbException gbe)
            {
                return gbe;
            }
            catch (Exception ex)
            {
                return ex;
            }
        }
    }
}
