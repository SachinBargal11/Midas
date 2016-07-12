using MIDAS.Core.Entities.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.Core.Interface
{
    public interface IAccountRepository
    {
        void Add(Account b);
        void Edit(Account b);
        void Remove(string ID);
        IEnumerable<Account> GetAccount();
        Account FindById(int ID);
    }
}
