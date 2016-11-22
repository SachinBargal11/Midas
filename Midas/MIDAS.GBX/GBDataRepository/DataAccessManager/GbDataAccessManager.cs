using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Entity.Validation;
using Newtonsoft.Json.Linq;
using System.Data.SqlClient;
using MIDAS.GBX.Common;
using MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.EntityRepository;
using GBDataRepository.Model;
using System.Data.Entity.Infrastructure;

namespace MIDAS.GBX.DataAccessManager
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

                //List<BusinessValidation> validations = gbObject.Validate();
                //var failedValidations = validations.Where(v => v.ValidationResult == BusinessValidationResult.Failure);

                //if (failedValidations.Count() > 0)
                //{
                //    throw new GbValidationException();
                //}


                var gbSavedObject = baseRepo.Delete(gbObject);

                //Excecute Object postsave 
                baseRepo.PostSave(gbObject);

                return ((GBDataObject)gbSavedObject).ID;
            }

            catch (GbException gbe)
            {
                //LogManager.LogErrorMessage(gbe.Message, 0, (GbObject)(object)(entity))
                throw;
            }
            catch (Exception ex)
            {
                throw new GbException(string.Format("An unknown Error occurred while saving {0} [{1}]", ((GbObject)(object)(entity)).ID, ex.Message));
            }
        }

        #region Token Realated Functions
        public object DeleteByUserId(int userId)
        {
            throw new NotImplementedException();
        }

        public object GenerateToken(int userId)
        {
            throw new NotImplementedException();
        }
        public object ValidateToken(string tokenId)
        {
            throw new NotImplementedException();
        }
        public object Kill(int tokenId)
        {
            throw new NotImplementedException();
        }
        #endregion

        public Object Get(JObject data, int? nestingLevels = default(int?))
        {

            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());

               var gbdata = baseRepo.Get(data);

                return gbdata;
            }
            catch (GbException gbe)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw;
            }
        }



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
                return gbe;
            }
            catch (Exception ex)
            {
                return ex;
            }

        }
        #endregion
        public Object Signup(T data, int? nestingLevels = default(int?), bool includeAllVersions = false, bool applySecurity = false)
        {
            try
            {
                if (data == null)
                    throw new GbException(string.Format("Null Object cannot be saved. ObjectType : {0}", typeof(T).Name));

                //Update CreatedBy and other tracking fields to child entities

                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());

                List<MIDAS.GBX.BusinessObjects.BusinessValidation> validationResults = baseRepo.Validate(data);
                if (validationResults.Count > 0)
                {
                    return new ErrorObject { ErrorMessage = "Please check error object for more details", errorObject = validationResults,ErrorLevel=ErrorLevel.Validation };
                }
                else
                {
                    var gbdata = baseRepo.Signup(data);
                    return gbdata;
                }
            }
            catch (DbEntityValidationException ex)
            {
                return ex;
            }
            catch (DbUpdateException ex)
            {
                var sqlex = ex.InnerException.InnerException as SqlException;

                return new ErrorObject { ErrorMessage = "Unique key exception.Please refer error object for more details.", errorObject = sqlex,ErrorLevel=ErrorLevel.Exception };
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

        public Object ValidateInvitation(T data, int? nestingLevels = default(int?), bool includeAllVersions = false, bool applySecurity = false)
        {
            try
            {
                if (data == null)
                    throw new GbException(string.Format("Null Object cannot be saved. ObjectType : {0}", typeof(T).Name));

                //Update CreatedBy and other tracking fields to child entities

                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());

                List<MIDAS.GBX.BusinessObjects.BusinessValidation> validationResults = baseRepo.Validate(data);
                if (validationResults.Count > 0)
                {
                    return new ErrorObject { ErrorMessage = "Please check error object for more details", errorObject = validationResults, ErrorLevel = ErrorLevel.Validation };
                }
                else
                {
                    var gbSavedObject = baseRepo.ValidateInvitation(data);

                    return gbSavedObject;
                }


            }
            catch (DbEntityValidationException ex)
            {
                return ex;
            }
            catch (DbUpdateException ex)
            {
                var sqlex = ex.InnerException.InnerException as SqlException;

                return new ErrorObject { ErrorMessage = "Unique key exception.Please refer error object for more details.", errorObject = sqlex, ErrorLevel = ErrorLevel.Exception };
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



        Object IGbDataAccessManager<T>.Get(int id, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());


                var gbdata = baseRepo.Get(id);

                return gbdata;
            }

            catch (GbException gbe)
            {
                //LogManager.LogErrorMessage(gbe.Message, 0, (GbObject)(object)(entity));
                return gbe;
            }
            catch (Exception ex)
            {
                //LogManager.LogErrorMessage(ex.Message, 0, (MaestroObject)(object)(entity));
                return ex;
            }
        }

        public object ValidateOTP(JObject data)
        {
            try
            {
                if (data == null)
                    throw new GbException(string.Format("Null Object cannot be saved. ObjectType : {0}", typeof(T).Name));

                //Update CreatedBy and other tracking fields to child entities

                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());


                var gbSavedObject = baseRepo.ValidateOTP(data);

                return gbSavedObject;
            }

            catch (GbException gbe)
            {
                //LogManager.LogErrorMessage(gbe.Message, 0, (GbObject)(object)(entity));
                return gbe;
            }
            catch (Exception ex)
            {
                //LogManager.LogErrorMessage(ex.Message, 0, (MaestroObject)(object)(entity));
                return ex;
            }
        }

        public object RegenerateOTP(JObject data)
        {
            try
            {
                if (data == null)
                    throw new GbException(string.Format("Null Object cannot be saved. ObjectType : {0}", typeof(T).Name));

                //Update CreatedBy and other tracking fields to child entities

                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());


                var gbSavedObject = baseRepo.RegenerateOTP(data);

                return gbSavedObject;
            }

            catch (GbException gbe)
            {
                //LogManager.LogErrorMessage(gbe.Message, 0, (GbObject)(object)(entity));
                return gbe;
            }
            catch (Exception ex)
            {
                //LogManager.LogErrorMessage(ex.Message, 0, (MaestroObject)(object)(entity));
                return ex;
            }
        }

        public object GeneratePasswordLink(JObject data)
        {
            try
            {
                if (data == null)
                    throw new GbException(string.Format("Null Object cannot be saved. ObjectType : {0}", typeof(T).Name));

                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());


                var gbSavedObject = baseRepo.GeneratePasswordLink(data);

                return gbSavedObject;
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

        public object ValidatePassword(JObject data)
        {
            try
            {
                if (data == null)
                    throw new GbException(string.Format("Null Object cannot be saved. ObjectType : {0}", typeof(T).Name));

                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());


                var gbSavedObject = baseRepo.ValidatePassword(data);

                return gbSavedObject;
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
