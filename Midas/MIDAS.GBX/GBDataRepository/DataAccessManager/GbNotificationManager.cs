﻿using MIDAS.GBX.Common;
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

        public object AddSMSToQueue(T smsObject)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.AddSMSToQueue(smsObject);

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

        public object ReadSMSFromQueue()
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.ReadSMSFromQueue();

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

        public object SendSMSFromQueue(T smsObject)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.SendSMSFromQueue(smsObject);

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

        public object testSMS(string test)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.testSMS(test);

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
