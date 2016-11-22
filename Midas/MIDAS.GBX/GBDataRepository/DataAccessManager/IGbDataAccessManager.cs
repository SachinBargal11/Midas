
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MIDAS.GBX.DataAccessManager
{
    public interface IGbDataAccessManager<T>
    {
        Object Save(JObject entity);
        int Delete(T entity);
        Object Get(int id, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);

        Object Get(JObject data, int? nestingLevels = null);
        Object Signup(T gbObject, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object Login(JObject data, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object ValidateInvitation(T gbObject, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);

        Object GenerateToken(int userId);
        Object ValidateToken(string tokenId);
        Object Kill(int tokenId);
        Object DeleteByUserId(int userId);

        Object ValidateOTP(JObject data);
        Object RegenerateOTP(JObject data);

        Object GeneratePasswordLink(JObject data);
        Object ValidatePassword(JObject data);

    }
}
