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
using System.Data.Entity.Infrastructure;
using System.Net.Http;

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

                var gbSavedObject = baseRepo.Delete(gbObject);

                //Excecute Object postsave 
                baseRepo.PostSave(gbObject);

                return 0;
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

        public object Delete(int id)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());

                var refid = baseRepo.Delete(id);

                return refid;
            }
            catch (GbException gbe)
            {
                //LogManager.LogErrorMessage(gbe.Message, 0, (GbObject)(object)(entity))
                throw;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public object GetDocumentList(int id)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());

                var refid = baseRepo.GetDocumentList(id);

                return refid;
            }
            catch (GbException gbe)
            {
                //LogManager.LogErrorMessage(gbe.Message, 0, (GbObject)(object)(entity))
                throw;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public object DeleteVisit(int id)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());

                var refid = baseRepo.DeleteVisit(id);

                return refid;
            }
            catch (GbException gbe)
            {
                //LogManager.LogErrorMessage(gbe.Message, 0, (GbObject)(object)(entity))
                throw;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public object DeleteCalendarEvent(int id)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());

                var refid = baseRepo.DeleteCalendarEvent(id);

                return refid;
            }
            catch (GbException gbe)
            {
                //LogManager.LogErrorMessage(gbe.Message, 0, (GbObject)(object)(entity))
                throw;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public object CancleVisit(int id)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());

                var refid = baseRepo.CancleVisit(id);

                return refid;
            }
            catch (GbException gbe)
            {
                //LogManager.LogErrorMessage(gbe.Message, 0, (GbObject)(object)(entity))
                throw;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public object CancleCalendarEvent(int id)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());

                var refid = baseRepo.CancleCalendarEvent(id);

                return refid;
            }
            catch (GbException gbe)
            {
                //LogManager.LogErrorMessage(gbe.Message, 0, (GbObject)(object)(entity))
                throw;
            }
            catch (Exception ex)
            {
                throw;
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

        public Object Get(T entity, int? nestingLevels = default(int?))
        {

            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());

                var gbdata = baseRepo.Get(entity);

                return gbdata;
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



        #region Login

        public Object Login(T data, int? nestingLevels = default(int?), bool includeAllVersions = false, bool applySecurity = false)
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
                    var gbdata = baseRepo.Login(data);
                    return gbdata;
                }
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
        #endregion

        #region Save
        public Object Save(int id, string type, List<HttpContent> streamContent,string uploadpath)
        {
            BaseEntityRepo baseRepo = RepoFactory.GetRepo<Document>(dbContextProvider.GetGbDBContext());
            List<MIDAS.GBX.BusinessObjects.BusinessValidation> validationResults = baseRepo.Validate(id, type, streamContent);
            if (validationResults.Count > 0)
            {
                return new ErrorObject { ErrorMessage = "Please check error object for more details", errorObject = validationResults, ErrorLevel = ErrorLevel.Validation };
            }
            else
            {
                var gbdata = baseRepo.Save(id, type, streamContent, uploadpath);
                return gbdata;
            }
        }
        #endregion


        #region Save
        public Object Save(T data)
        {
            try
            {
                //var gbObject = (GbObject)(object)entity;
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
                    var gbdata = baseRepo.Save(data);
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
        #endregion

        public Object AssociateLocationToDoctors(T data)
        {
            try
            {
                //var gbObject = (GbObject)(object)entity;
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
                    var gbdata = baseRepo.AssociateLocationToDoctors(data);
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

        public Object AssociateDoctorToLocations(T data)
        {
            try
            {
                //var gbObject = (GbObject)(object)entity;
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
                    var gbdata = baseRepo.AssociateDoctorToLocations(data);
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

        public Object Get(int id, int? nestingLevels, bool includeAllVersions, bool applySecurity)
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

        public Object Get(int id, string type)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.Get(id, type);

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


        public object ValidateOTP(T data)
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
                    var gbSavedObject = baseRepo.ValidateOTP(data);

                    return gbSavedObject;
                }
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

        public object RegenerateOTP(T data)
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
                    var gbSavedObject = baseRepo.RegenerateOTP(data);

                    return gbSavedObject;
                }
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

        public object GeneratePasswordLink(T data)
        {
            try
            {
                if (data == null)
                    throw new GbException(string.Format("Null Object cannot be saved. ObjectType : {0}", typeof(T).Name));

                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());

                List<MIDAS.GBX.BusinessObjects.BusinessValidation> validationResults = baseRepo.Validate(data);
                if (validationResults.Count > 0)
                {
                    return new ErrorObject { ErrorMessage = "Please check error object for more details", errorObject = validationResults, ErrorLevel = ErrorLevel.Validation };
                }
                else
                {
                    var gbSavedObject = baseRepo.GeneratePasswordLink(data);

                    return gbSavedObject;
                }
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

        public object ValidatePassword(T data)
        {
            try
            {
                if (data == null)
                    throw new GbException(string.Format("Null Object cannot be saved. ObjectType : {0}", typeof(T).Name));

                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());

                List<MIDAS.GBX.BusinessObjects.BusinessValidation> validationResults = baseRepo.Validate(data);
                if (validationResults.Count > 0)
                {
                    return new ErrorObject { ErrorMessage = "Please check error object for more details", errorObject = validationResults, ErrorLevel = ErrorLevel.Validation };
                }
                else
                {
                    var gbSavedObject = baseRepo.ValidatePassword(data);

                    return gbSavedObject;
                }
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

        public Object Get(int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.Get();

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

        public Object IsInsuranceInfoAdded(int id, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.IsInsuranceInfoAdded(id);

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

        public Object Get(string param1, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.Get(param1);

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

        public object Update(T data)
        {
            try
            {
                if (data == null)
                    throw new GbException(string.Format("Null Object cannot be saved. ObjectType : {0}", typeof(T).Name));

                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());

                List<MIDAS.GBX.BusinessObjects.BusinessValidation> validationResults = baseRepo.Validate(data);
                if (validationResults.Count > 0)
                {
                    return new ErrorObject { ErrorMessage = "Please check error object for more details", errorObject = validationResults, ErrorLevel = ErrorLevel.Validation };
                }
                else
                {
                    var gbdata = baseRepo.Update(data);
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

        public object Add(T data)
        {
            try
            {
                if (data == null)
                    throw new GbException(string.Format("Null Object cannot be saved. ObjectType : {0}", typeof(T).Name));

                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());

                List<MIDAS.GBX.BusinessObjects.BusinessValidation> validationResults = baseRepo.Validate(data);
                if (validationResults.Count > 0)
                {
                    return new ErrorObject { ErrorMessage = "Please check error object for more details", errorObject = validationResults, ErrorLevel = ErrorLevel.Validation };
                }
                else
                {
                    var gbdata = baseRepo.Save2(data);
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

        #region ResetPassword
        public Object ResetPassword(T data)
        {
            try
            {
                //var gbObject = (GbObject)(object)entity;
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
                    var gbdata = baseRepo.ResetPassword(data);
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
        #endregion

        public Object GetByCompanyId(int CompanyId, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.GetByCompanyId(CompanyId);

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

        public Object GetByCompanyWithOpenCases(int CompanyId, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.GetByCompanyWithOpenCases(CompanyId);

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

        public Object GetByLocationWithOpenCases(int LocationId, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.GetByLocationWithOpenCases(LocationId);

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

        public Object GetByCompanyWithCloseCases(int CompanyId, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.GetByCompanyWithCloseCases(CompanyId);

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

        public Object GetByInsuranceMasterId(int InsuranceMasterId, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.GetByInsuranceMasterId(InsuranceMasterId);

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



        public Object GetByCaseId(int CaseId, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.GetByCaseId(CaseId);

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

        public Object GetByPatientId(int PatientId, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.GetByPatientId(PatientId);

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

        public Object GetByLocationId(int LocationId, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.GetByLocationId(LocationId);

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

        public Object GetByDoctorId(int DoctorId, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.GetByDoctorId(DoctorId);

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

        public Object GetByDates(DateTime FromDate,DateTime ToDate, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.GetByDates(FromDate, ToDate);

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

        public Object AddUploadedFileData(int id, string FileUploadPath, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.AddUploadedFileData(id,FileUploadPath);

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

        public Object GetByLocationAndSpecialty(int locationId, int specialtyId, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.GetByLocationAndSpecialty(locationId, specialtyId);

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

        public Object GetBySpecialityInAllApp(int specialtyId, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.GetBySpecialityInAllApp(specialtyId);

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

        public Object GetByRoomInAllApp(int roomId, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.GetByRoomInAllApp(roomId);

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

        public Object GetPatientAccidentInfoByPatientId(int PatientId, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.GetPatientAccidentInfoByPatientId(PatientId);

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

        public Object GetCurrentEmpByPatientId(int PatientId, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.GetCurrentEmpByPatientId(PatientId);

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

        public Object GetCurrentROByPatientId(int PatientId, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.GetCurrentROByPatientId(PatientId);

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

        
        public object DeleteById(int id)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.DeleteById(id);

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

        public Object Get(int param1, int param2, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.Get(param1, param2);

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

        public Object Get2(int param1, int param2, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.Get2(param1, param2);

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

        public Object AssociateUserToCompany(string UserName, int CompanyId, bool sendEmail, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.AssociateUserToCompany(UserName, CompanyId, sendEmail);

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

        public Object GetByRoomId(int RoomId, int? nestingLevels, bool includeAllVersions, bool applySecurity)
        {
            try
            {
                BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>(dbContextProvider.GetGbDBContext());
                var gbdata = baseRepo.GetByRoomId(RoomId);

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
    }
}
