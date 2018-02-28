using System;
using System.Collections.Generic;
using System.Data.Entity.Core.EntityClient;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.DataRepository.Model;

using MIDAS.GBX.Common;

namespace MIDAS.GBX.DataAccessManager
{
    public class DBContextProvider : IDBContextProvider
    {
        public MIDASGBXEntities GetGbDBContext()
        {
            MIDASGBXEntities context = null;
            string serverName = ConfigReader.GetSettingsValue<string>("GbDatabaseServer", "greenbills.ch005g7cguar.us-west-2.rds.amazonaws.com,1433");
            string databaseName = ConfigReader.GetSettingsValue<string>("GbDatabase", "MIDAS");
            string modelName = ConfigReader.GetSettingsValue<string>("ModelName", "MIDAS");

            string entityConnection = ConnectionStringProvider.GetEntityConnection(serverName, databaseName, modelName);

            context = new MIDASGBXEntities();


            // ((IObjectContextAdapter)context).ObjectContext.CommandTimeout = ConfigReader.GetSettingsValue<int>("CommandTimeout", 300);

            return context;
        }
    }

    public class ConnectionStringProvider
    {
        private const string CONST_SqlProvider = "System.Data.SqlClient";
        private const string FORMAT_ModelConnectionString = @"res://*/{0}.csdl|res://*/{1}.ssdl|res://*/{2}.msl";

        #region GetEntityConnection
        internal static string GetEntityConnection(string serverName, string databaseName = "MaestroDB", string modelName = "Maestro")
        {
            if (string.IsNullOrEmpty(modelName) == true ||
                string.IsNullOrEmpty(serverName) == true ||
                string.IsNullOrEmpty(databaseName) == true)
            {
                throw new ApplicationException("Failed to open connection to database due to null or empty parameters for connection string");
            }

            EntityConnectionStringBuilder entityConnBuilder = new EntityConnectionStringBuilder();


            SqlConnectionStringBuilder connBuilder = GetSqlConnectionBuilder(serverName, databaseName);
            connBuilder.MultipleActiveResultSets = true;

            entityConnBuilder.Provider = CONST_SqlProvider;
            entityConnBuilder.ProviderConnectionString = connBuilder.ConnectionString;
            entityConnBuilder.Metadata = string.Format(FORMAT_ModelConnectionString, modelName, modelName, modelName);
            return entityConnBuilder.ToString();
        }
        #endregion

        #region GetSqlConnection
        private static SqlConnection GetSqlConnection(string serverName, string databaseName)
        {
            SqlConnectionStringBuilder connBuilder = GetSqlConnectionBuilder(serverName, databaseName);
            return new SqlConnection(connBuilder.ConnectionString);
        }
        private static SqlConnectionStringBuilder GetSqlConnectionBuilder(string serverName, string databaseName)
        {
            SqlConnectionStringBuilder connBuilder = new SqlConnectionStringBuilder();

            connBuilder.DataSource = serverName;
            connBuilder.InitialCatalog = databaseName;
            //connBuilder.IntegratedSecurity = true;
            connBuilder.UserID = "sqlserver";
            connBuilder.Password = "Qwinix123!";
            connBuilder.ConnectTimeout = ConfigReader.GetSettingsValue<int>("ConnectionTimeout", 60);
            connBuilder.Pooling = ConfigReader.GetSettingsValue<bool>("Pooling", true);
            connBuilder.MinPoolSize = ConfigReader.GetSettingsValue<int>("MinPoolSize", 10);
            connBuilder.MultiSubnetFailover = ConfigReader.GetSettingsValue<bool>("MultiSubnetFailover", true);

            return connBuilder;
        }
        #endregion
    }
}
