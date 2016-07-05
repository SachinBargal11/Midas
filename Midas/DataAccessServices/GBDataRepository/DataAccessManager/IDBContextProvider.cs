using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Midas.GreenBill.Model;

namespace Midas.GreenBill.DataAccessManager
{
    public interface IDBContextProvider
    {
        GreenBillsDbEntities GetGbDBContext();
    }
}
