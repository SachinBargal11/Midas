using MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.Common;
using MIDAS.GBX.Notification.EntityRepository;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MIDAS.GBX.Notification.UtilityAccessManager
{
    public class UtilityAccessManager<T> : IUtilityAccessManager<T>
    {
        //public object SendSMS(T smsObject)
        //{
        //    try
        //    {
        //        //var gbObject = (GbObject)(object)entity;
        //        if (smsObject == null)
        //            throw new Exception(string.Format("Null Object. ObjectType : {0}", typeof(T).Name));

        //        //Update CreatedBy and other tracking fields to child entities

        //        BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>();

        //        //List<MIDAS.GBX.BusinessObjects.BusinessValidation> validationResults = baseRepo.Validate(data);
        //        //if (validationResults.Count > 0)
        //        //{
        //        //    return new ErrorObject { ErrorMessage = "Please check error object for more details", errorObject = validationResults, ErrorLevel = ErrorLevel.Validation };
        //        //}
        //        //else
        //        //{
        //        //    var gbdata = baseRepo.Save(data);
        //        //    return gbdata;
        //        //}

        //        var gbdata = baseRepo.SendSMS(smsObject);
        //        return gbdata;
        //    }
        //    catch (DbEntityValidationException ex)
        //    {
        //        return ex;
        //    }
        //    catch (DbUpdateException ex)
        //    {
        //        var sqlex = ex.InnerException.InnerException as SqlException;

        //        return new ErrorObject { ErrorMessage = "Unique key exception.Please refer error object for more details.", errorObject = sqlex, ErrorLevel = ErrorLevel.Exception };
        //    }
        //    catch (GbException gbe)
        //    {
        //        return gbe;
        //    }
        //    catch (Exception ex)
        //    {
        //        return ex;
        //    }
        //}

        //public object SendMultipleSMS(T multipleSMSObject)
        //{
        //    try
        //    {
        //        //var gbObject = (GbObject)(object)entity;
        //        if (multipleSMSObject == null)
        //            throw new Exception(string.Format("Null Object. ObjectType : {0}", typeof(T).Name));

        //        //Update CreatedBy and other tracking fields to child entities

        //        BaseEntityRepo baseRepo = RepoFactory.GetRepo<T>();

        //        //List<MIDAS.GBX.BusinessObjects.BusinessValidation> validationResults = baseRepo.Validate(data);
        //        //if (validationResults.Count > 0)
        //        //{
        //        //    return new ErrorObject { ErrorMessage = "Please check error object for more details", errorObject = validationResults, ErrorLevel = ErrorLevel.Validation };
        //        //}
        //        //else
        //        //{
        //        //    var gbdata = baseRepo.Save(data);
        //        //    return gbdata;
        //        //}

        //        var gbdata = baseRepo.SendMultipleSMS(multipleSMSObject);
        //        return gbdata;
        //    }
        //    catch (DbEntityValidationException ex)
        //    {
        //        return ex;
        //    }
        //    catch (DbUpdateException ex)
        //    {
        //        var sqlex = ex.InnerException.InnerException as SqlException;

        //        return new ErrorObject { ErrorMessage = "Unique key exception.Please refer error object for more details.", errorObject = sqlex, ErrorLevel = ErrorLevel.Exception };
        //    }
        //    catch (GbException gbe)
        //    {
        //        return gbe;
        //    }
        //    catch (Exception ex)
        //    {
        //        return ex;
        //    }
        //}
    }
}