using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Entity.Validation;
using Midas.Common;
using Midas.GreenBill;
using Midas.GreenBill.EntityRepository;
using Midas.GreenBill.BusinessObject;
namespace Midas.GreenBill.DataAccessManager
{
    public class GBUserDataAcessManager<T> : IGBUserDataAcessManager<T>
    {

        IDBContextProvider dbContextProvider = null;
        private int retryCount = ConfigReader.GetSettingsValue<int>("DatabaseRetryCount", 3);
        private int retryTimeInterval = ConfigReader.GetSettingsValue<int>("DatabaseRetryTimeInterval", 10);

        public GBUserDataAcessManager(IDBContextProvider dbContextProvider = null)
        {
            this.dbContextProvider = dbContextProvider ?? new DBContextProvider();
        }

        public T Login(T entity, string userName, string Password, int? nestingLevels = default(int?), bool includeAllVersions = false, bool applySecurity = false)
        {
            try
            {
                var gbObject = (GbObject)(object)entity;
                if (gbObject == null)
                    throw new GbException(string.Format("Null Object cannot be saved. ObjectType : {0}", typeof(T).Name));

                //Update CreatedBy and other tracking fields to child entities

                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());

                List<BusinessValidation> validations = gbObject.Validate();
                var failedValidations = validations.Where(v => v.ValidationResult == BusinessValidationResult.Failure);

                if (failedValidations.Count() > 0)
                {
                    throw new GbValidationException();
                    //format the exception message
                    //throw new GbValidationException(CreateValidationExceptionMessage(failedValidations, typeof(T).Name));
                }


                var gbdata = baseRepo.Login<T>(entity, userName,Password);

                return gbdata;
            }

            catch (GbException gbe)
            {
                //LogManager.LogErrorMessage(gbe.Message, 0, (GbObject)(object)(entity));
                throw;
            }
            catch (Exception ex)
            {
                //LogManager.LogErrorMessage(ex.Message, 0, (MaestroObject)(object)(entity));
                throw new GbException(string.Format("An unknown Error occurred while saving {0} [{1}]", ((GbObject)(object)(entity)).ID, ex.Message));
            }
        }
    }
}
