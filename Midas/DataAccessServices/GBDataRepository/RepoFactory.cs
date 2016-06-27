using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GBDataRepository
{
    internal class RepoFactory
    {
    }
}


using Microsoft.SharedData.Maestro.BusinessEntities;
using System;
using BE = Microsoft.SharedData.Maestro.BusinessEntities;

namespace Microsoft.SharedData.Maestro.DataRepository
{
    internal class DataRepositoryFactory
    {
        internal static BaseDataRepository GetDataRepository<T>(MaestroDBEntities context)
        {
            BaseDataRepository repository = null;

            if (typeof(T) == typeof(BE.Organization))
            {
                repository = new OrganizationRepository(context);
            }
            else if (typeof(T) == typeof(BE.Tenant))
            {
                repository = new TenantRepository(context);
            }
            else if (typeof(T) == typeof(BE.Application))
            {
                repository = new ApplicationRepository(context);
            }
            else if (Utility.ValidateType<T>(typeof(SQLDatabaseCollection)))
            {
                repository = new SQLDatabaseCollectionRepository(context);
            }
            else if (typeof(T) == typeof(BE.DataPackage) ||
                     typeof(T) == typeof(BE.SQLDatabase) ||
                     typeof(T) == typeof(BE.OLAPDatabase) ||
                     typeof(T) == typeof(BE.CosmosStreamSet))
            {
                repository = new DataPackageRepository(context);
            }
            else if (typeof(T) == typeof(BE.DataGroup) ||
                     typeof(T) == typeof(BE.SQLFactTable) ||
                     typeof(T) == typeof(BE.SQLDimensionTable) ||
                     typeof(T) == typeof(BE.CosmosStream))
            {
                repository = new DataGroupRepository(context);
            }
            else if (typeof(T) == typeof(BE.DataElement) ||
                     typeof(T) == typeof(BE.CosmosStreamColumn) ||
                     typeof(T) == typeof(BE.SQLColumn))
            {
                repository = new DataElementRepository(context);
            }
            else if (typeof(T) == typeof(BE.SQLFederationSettings))
            {
                repository = new SQLFederationSettingsRepository(context);
            }
            else if (Utility.ValidateType<T>(typeof(Job)))
            {
                repository = new JobRepository(context);
            }
            else if (typeof(T) == typeof(BE.CosmosCluster) ||
                     typeof(T) == typeof(BE.AutoPilotEnvironment) ||
                     typeof(T) == typeof(BE.ResourceGroup))
            {
                repository = new ResourceGroupRepository(context);
            }
            else if (typeof(T) == typeof(BE.CosmosVirtualCluster) ||
                      typeof(T) == typeof(BE.AutoPilotMachineFunction) ||
                      typeof(T) == typeof(BE.Resource))
            {
                repository = new ResourceRepository(context);
            }
            else if (typeof(T) == typeof(BE.AutoPilotMachine))
            {
                repository = new AutoPilotMachineRepository(context);
            }
            else if (typeof(T) == typeof(BE.LogicalEnvironment))
            {
                repository = new LogicalEnvironmentRepository(context);
            }
            else if (typeof(T) == typeof(BE.DRITeam))
            {
                repository = new DRITeamRepository(context);
            }
            else if (typeof(T) == typeof(BE.DeploymentRequest))
            {
                repository = new DeploymentRequestRepository(context);
            }
            else if (typeof(T) == typeof(BE.DeploymentItem))
            {
                repository = new DeploymentItemRepository(context);
            }
            else if (typeof(T) == typeof(BE.ScriptedObject))
            {
                repository = new SQLScriptedObjectRepository(context);
            }
            else if (typeof(T) == typeof(BE.ScriptParameter))
            {
                repository = new SQLScriptParameterRepository(context);
            }
            else if (typeof(T) == typeof(BE.MaestroObjectVersionHistory))
            {
                repository = new MaestroObjectVersionHistoryRepository(context);
            }
            else if (typeof(T) == typeof(BE.JobExecutionInstance))
            {
                repository = new JobExecutionInstanceRepository(context);
            }
            else if (typeof(T) == typeof(BE.JobActionRequests))
            {
                repository = new JobActionRequestsRepository(context);
            }
            else if (typeof(T) == typeof(BE.JobActionRequest))
            {
                repository = new JobActionRequestRepository(context);
            }
            else if (typeof(T) == typeof(BE.PendingRestatement))
            {
                repository = new PendingRestatementsRepository(context);
            }
            else if (typeof(T) == typeof(BE.DWCPartition))
            {
                repository = new DWCPartitionRepository(context);
            }
            else
            {
                throw new NotImplementedException();
            }

            return repository;
        }
    }
}
