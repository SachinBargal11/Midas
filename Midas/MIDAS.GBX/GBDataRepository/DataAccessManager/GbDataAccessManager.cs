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

                List<BusinessValidation> validations = gbObject.Validate();
                var failedValidations = validations.Where(v => v.ValidationResult == BusinessValidationResult.Failure);

                if (failedValidations.Count() > 0)
                {
                    throw new GbValidationException();
                }


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
                throw;
            }
            catch (DbEntityValidationException e)
            {
                List<string> lstError = new List<string>();
                foreach (var eve in e.EntityValidationErrors)
                {
                    lstError.Add(string.Format("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State));
                    foreach (var ve in eve.ValidationErrors)
                    {
                        lstError.Add(string.Format( "- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage));
                    }
                }
                return lstError;
            }
            catch (Exception ex)
            {
                switch (ex.GetType().Name)
                {
                    case "DbUpdateException":
                        SqlException innerException = ex.InnerException.InnerException as SqlException;
                        if (innerException != null && (innerException.Number == 2627 || innerException.Number == 2601))
                        {
                            //your handling stuff
                            ErrorHandler err = new ErrorHandler();
                            err.ErrorMessage = ex.InnerException.Message;
                            err.UIMessage = "Duplicate entry not allowed.";
                            err.ExceptionType = ex.GetType().FullName;

                            return err;
                        }
                        break;
                    default:
                        return ex;
                }
                //LogManager.LogErrorMessage(ex.Message, 0, (MaestroObject)(object)(entity));
                return ex;
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
                //throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                return ex;
            }
            catch (GbException gbe)
            {
                //LogManager.LogErrorMessage(gbe.Message, 0, (GbObject)(object)(entity));
                return gbe;
            }
            catch (Exception ex)
            {
                //LogManager.LogErrorMessage(ex.Message, 0, (MaestroObject)(object)(entity));
                //throw new GbException(string.Format("An unknown Error occurred while saving  [{0}]",ex.InnerException.Message));
                return ex;
            }

        }

        public Object ValidateInvitation(JObject data, int? nestingLevels = default(int?), bool includeAllVersions = false, bool applySecurity = false)
        {
            try
            {
                if (data == null)
                    throw new GbException(string.Format("Null Object cannot be saved. ObjectType : {0}", typeof(T).Name));

                //Update CreatedBy and other tracking fields to child entities

                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());


                var gbSavedObject = baseRepo.ValidateInvitation(data);

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
