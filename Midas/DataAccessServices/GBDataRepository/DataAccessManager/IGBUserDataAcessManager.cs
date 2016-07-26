using Midas.GreenBill.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midas.GreenBill.DataAccessManager
{
    public interface IGBUserDataAcessManager<T>
    {
        T Login(T entity, string userName,string Password, int? nestingLevels = null, bool includeAllVersions = false, bool applySecurity = false);

    }
}
