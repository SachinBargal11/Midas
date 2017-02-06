
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MIDAS.GBX.DataAccessManager
{
    public interface IGbDataAccessManager<T>
    {
        Object Save(T gbObject);
        int Delete(T entity);
        Object Get(int id, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);

        Object Get(T gbObject, int? nestingLevels = null);
        Object Signup(T gbObject, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object Login(T gbObject, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object ValidateInvitation(T gbObject, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);

        Object GenerateToken(int userId);
        Object ValidateToken(string tokenId);
        Object Kill(int tokenId);
        Object DeleteByUserId(int userId);

        Object ValidateOTP(T gbObject);
        Object RegenerateOTP(T gbObject);

        Object GeneratePasswordLink(T gbObject);
        Object ValidatePassword(T gbObject);


        Object Get(int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object Get(string param1, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object Update(T gbObject);
        Object Add(T gbObject);
        Object GetByCompanyId(int CompanyId, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object ResetPassword(T gbObject);
    }
}
