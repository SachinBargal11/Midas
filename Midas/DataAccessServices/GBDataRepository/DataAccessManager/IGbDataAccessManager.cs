using Midas.GreenBill.EntityRepository;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midas.GreenBill.DataAccessManager
{
    public interface IGbDataAccessManager<T>
    {
        Object Save(JObject entity);
        int Delete(T entity);
        Object Get(int id, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);

        Object Get(JObject data, int? nestingLevels = null);
        Object Signup(JObject data, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);
        Object Login(JObject data, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);

        //List<GbObject> GetDependencies(int id, int parentId, bool applySecurity = true);

        //List<GbObject> GetDependencies(List<int> itemIds, int parentId, bool applySecurity = true);

    }
}
