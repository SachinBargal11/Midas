using Midas.GreenBill.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midas.GreenBill.DataAccessManager
{
    public interface IGbDataAccessManager<T>
    {
        int Save(T entity);

        T Get(T entity,int id, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);

        List<T> Get(T entity,string name, int? nestingLevels = null, bool includeAllVersions = false);

        List<T> Get(T entity,List<EntitySearchParameter> filter, int? nestingLevels = null);

        //List<GbObject> GetDependencies(int id, int parentId, bool applySecurity = true);

        //List<GbObject> GetDependencies(List<int> itemIds, int parentId, bool applySecurity = true);

    }
}
