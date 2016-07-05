using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Entity.Validation;
using Midas.Common;

namespace Midas.GreenBill.DataAccessManager
{
    public class GbDataAccessManager<T> : IGbDataAccessManager<T>
    {

        IDBContextProvider dbContextProvider = null;
        private int retryCount = ConfigReader.GetSettingsValue<int>("DatabaseRetryCount", 3);
        private int retryTimeInterval = ConfigReader.GetSettingsValue<int>("DatabaseRetryTimeInterval", 10);

        public GbDataAccessManager(IDBContextProvider dbContextProvider = null)
        {
            this.dbContextProvider = dbContextProvider ?? new DBContextProvider();
        }

        List<T> IGbDataAccessManager<T>.Get(string name, int? nestingLevels, bool includeAllVersions)
        {
            throw new NotImplementedException();
        }

        T IGbDataAccessManager<T>.Get(int id, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            throw new NotImplementedException();
        }

        int IGbDataAccessManager<T>.Save(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
