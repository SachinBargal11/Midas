using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.DataRepository.Model;

namespace MIDAS.GBX.DataAccessManager
{
    public interface IDBContextProvider
    {
        MIDASGBXEntities GetGbDBContext();
    }
}
