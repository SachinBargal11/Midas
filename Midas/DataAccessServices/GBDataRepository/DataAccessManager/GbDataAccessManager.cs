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
using Newtonsoft.Json.Linq;

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

        public int Delete(T entity)
        {
            try
            {
                var gbObject = (GbObject)(object)entity;
                if (gbObject == null)
                    throw new GbException(string.Format("Null Object cannot be saved. ObjectType : {0}", typeof(T).Name));

                //Update CreatedBy and other tracking fields to child entities

                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());

                baseRepo.PreSave(gbObject);

                List<BusinessValidation> validations = gbObject.Validate();
                var failedValidations = validations.Where(v => v.ValidationResult == BusinessValidationResult.Failure);

                if (failedValidations.Count() > 0)
                {
                    throw new GbValidationException();
                    //format the exception message
                    //throw new GbValidationException(CreateValidationExceptionMessage(failedValidations, typeof(T).Name));
                }


                var gbSavedObject = baseRepo.Delete(gbObject);

                //Excecute Object postsave 
                baseRepo.PostSave(gbObject);

                return ((GBDataRepository.Model.GBDataObject)gbSavedObject).ID;
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

        public List<T> Get(T entity,List<EntitySearchParameter> filter, int? nestingLevels = default(int?))
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


                var gbdata = baseRepo.Get<T>(entity,filter);

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



        public Object Signup(JObject data, int? nestingLevels = default(int?), bool includeAllVersions = false, bool applySecurity = false)
        {
            try
            {
                //var gbObject = (GbObject)(object)data;
                if (data == null)
                    throw new GbException(string.Format("Null Object cannot be saved. ObjectType : {0}", typeof(T).Name));

                //Update CreatedBy and other tracking fields to child entities

                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());

                //List<BusinessValidation> validations = gbObject.Validate();
                //var failedValidations = validations.Where(v => v.ValidationResult == BusinessValidationResult.Failure);

                //if (failedValidations.Count() > 0)
                //{
                //    throw new GbValidationException();
                //    //format the exception message
                //    //throw new GbValidationException(CreateValidationExceptionMessage(failedValidations, typeof(T).Name));
                //}


                var gbdata = baseRepo.Signup(data);

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
                throw new GbException(string.Format("An unknown Error occurred while saving {0} [{1}]", ((GbObject)(object)(data)).ID, ex.Message));
            }
        }

        List<T> IGbDataAccessManager<T>.Get(T entity, string name, int? nestingLevels, bool includeAllVersions)
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

                var gbdata = baseRepo.Get<T>(entity, name);

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

        T IGbDataAccessManager<T>.Get(T entity, int? nestingLevels, bool includeAllVersions, bool applySecurity)
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


                var gbdata = baseRepo.Get<T>(entity);

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

        int IGbDataAccessManager<T>.Save(T entity)
        {
            try
            {
                var gbObject = (GbObject)(object)entity;
                if (gbObject == null)
                    throw new GbException(string.Format("Null Object cannot be saved. ObjectType : {0}", typeof(T).Name));

                //Update CreatedBy and other tracking fields to child entities
                
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());

                baseRepo.PreSave(gbObject);

                List<BusinessValidation> validations = gbObject.Validate();
                var failedValidations = validations.Where(v => v.ValidationResult == BusinessValidationResult.Failure);

                if (failedValidations.Count() > 0)
                {
                    throw new GbValidationException();
                    //format the exception message
                    //throw new GbValidationException(CreateValidationExceptionMessage(failedValidations, typeof(T).Name));
                }


                var gbSavedObject = baseRepo.Save(gbObject);

                //Excecute Object postsave 
                baseRepo.PostSave(gbObject);

                return ((GbObject)gbSavedObject).ID;
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
