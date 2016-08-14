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
using System.Data.SqlClient;
using GBBusinessObjects;

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

        public Object Get(JObject data, int? nestingLevels = default(int?))
        {

            try
            {
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


                var gbdata = baseRepo.Get(data);

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
                //throw new GbException(string.Format("An unknown Error occurred while saving {0} [{1}]", ((GbObject)(object)(entity)).ID, ex.Message));
                throw;
            }
        }

        //public List<T> Get(T entity,List<EntitySearchParameter> filter, int? nestingLevels = default(int?))
        //{
        //    try
        //    {
        //        var gbObject = (GbObject)(object)entity;
        //        if (gbObject == null)
        //            throw new GbException(string.Format("Null Object cannot be saved. ObjectType : {0}", typeof(T).Name));

        //        //Update CreatedBy and other tracking fields to child entities

        //        BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());

        //        List<BusinessValidation> validations = gbObject.Validate();
        //        var failedValidations = validations.Where(v => v.ValidationResult == BusinessValidationResult.Failure);

        //        if (failedValidations.Count() > 0)
        //        {
        //            throw new GbValidationException();
        //            //format the exception message
        //            //throw new GbValidationException(CreateValidationExceptionMessage(failedValidations, typeof(T).Name));
        //        }


        //        var gbdata = baseRepo.Get<T>(entity,filter);

        //        return gbdata;
        //    }

        //    catch (GbException gbe)
        //    {
        //        //LogManager.LogErrorMessage(gbe.Message, 0, (GbObject)(object)(entity));
        //        throw;
        //    }
        //    catch (Exception ex)
        //    {
        //        //LogManager.LogErrorMessage(ex.Message, 0, (MaestroObject)(object)(entity));
        //        throw new GbException(string.Format("An unknown Error occurred while saving {0} [{1}]", ((GbObject)(object)(entity)).ID, ex.Message));
        //    }
        //}
        #region Save

        public Object Login(JObject data, int? nestingLevels = default(int?), bool includeAllVersions = false, bool applySecurity = false)
        {
            try
            {
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


                var gbSavedObject = baseRepo.Login(data);

                return gbSavedObject;
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
        public Object Save(JObject data)
        {
            try
            {
                //var gbObject = (GbObject)(object)entity;
                if (data == null)
                    throw new GbException(string.Format("Null Object cannot be saved. ObjectType : {0}", typeof(T).Name));

                //Update CreatedBy and other tracking fields to child entities

                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());

                baseRepo.PreSave(data);

                //List<BusinessValidation> validations = gbObject.Validate();
                //var failedValidations = validations.Where(v => v.ValidationResult == BusinessValidationResult.Failure);

                //if (failedValidations.Count() > 0)
                //{
                //    throw new GbValidationException();
                //    //format the exception message
                //    //throw new GbValidationException(CreateValidationExceptionMessage(failedValidations, typeof(T).Name));
                //}


                var gbSavedObject = baseRepo.Save(data);

                //Excecute Object postsave 
                baseRepo.PostSave(data);

                return gbSavedObject;
            }

            catch (GbException gbe)
            {
                //LogManager.LogErrorMessage(gbe.Message, 0, (GbObject)(object)(entity));
                throw;
            }
            catch (Exception ex)
            {
                //switch (ex.GetType().Name)
                //{
                //    case "DbUpdateException":
                //        SqlException innerException = ex.InnerException.InnerException as SqlException;
                //        if (innerException != null && (innerException.Number == 2627 || innerException.Number == 2601))
                //        {
                //            //your handling stuff
                //            ErrorHandler err = new ErrorHandler();
                //            err.ErrorMessage = ex.InnerException.Message;
                //            err.UIMessage = "Duplicate entry not allowed.";
                //            err.ExceptionType = ex.GetType().FullName;

                //            return err;
                //        }
                //        break;
                //    default:
                //        throw new GbException(string.Format("An unknown Error occurred while saving {0} [{1}]", ((GbObject)(object)(data)).ID, ex.Message));
                //}
                //LogManager.LogErrorMessage(ex.Message, 0, (MaestroObject)(object)(entity));
                throw new GbException(string.Format("An unknown Error occurred while saving {0} [{1}]", ((GbObject)(object)(data)).ID, ex.Message));
            }
        }
        #endregion
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
                // throw new GbValidationException(CreateValidationExceptionMessage(failedValidations, typeof(T).Name));
                //}


                var gbdata = baseRepo.Signup(data);

                return gbdata;
            }
            catch (DbEntityValidationException ex)
            {
                // Retrieve the error messages as a list of strings.
                var errorMessages = ex.EntityValidationErrors
                        .SelectMany(x => x.ValidationErrors)
                        .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                // Throw a new DbEntityValidationException with the improved exception message.
                throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
            }
            catch (GbException gbe)
            {
                //LogManager.LogErrorMessage(gbe.Message, 0, (GbObject)(object)(entity));
                throw;
            }
            catch (Exception ex)
            {
                //LogManager.LogErrorMessage(ex.Message, 0, (MaestroObject)(object)(entity));
                throw new GbException(string.Format("An unknown Error occurred while saving  [{0}]",ex.InnerException.Message));
            }

        }

        //List<T> IGbDataAccessManager<T>.Get(T entity, string name, int? nestingLevels, bool includeAllVersions)
        //{

        //    try
        //    {
        //        var gbObject = (GbObject)(object)entity;
        //        if (gbObject == null)
        //            throw new GbException(string.Format("Null Object cannot be saved. ObjectType : {0}", typeof(T).Name));

        //        //Update CreatedBy and other tracking fields to child entities

        //        BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());

        //        List<BusinessValidation> validations = gbObject.Validate();
        //        var failedValidations = validations.Where(v => v.ValidationResult == BusinessValidationResult.Failure);

        //        if (failedValidations.Count() > 0)
        //        {
        //            throw new GbValidationException();
        //            //format the exception message
        //            //throw new GbValidationException(CreateValidationExceptionMessage(failedValidations, typeof(T).Name));
        //        }

        //        var gbdata = baseRepo.Get<T>(entity, name);

        //        return gbdata;
        //    }
        //    catch (GbException gbe)
        //    {
        //        //LogManager.LogErrorMessage(gbe.Message, 0, (GbObject)(object)(entity));
        //        throw;
        //    }
        //    catch (Exception ex)
        //    {
        //        //LogManager.LogErrorMessage(ex.Message, 0, (MaestroObject)(object)(entity));
        //        throw new GbException(string.Format("An unknown Error occurred while saving {0} [{1}]", ((GbObject)(object)(entity)).ID, ex.Message));
        //    }
        //}

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
    }
}
