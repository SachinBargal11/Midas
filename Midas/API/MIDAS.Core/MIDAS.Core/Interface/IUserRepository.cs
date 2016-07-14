using MIDAS.Core.Entities.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.Core.Interface
{
    public interface IUserRepository
    {
        void Add(User b);
        void Edit(User b);
        void Remove(string ID);
        IEnumerable<User> GetUsers();
        User FindById(int ID);
        User Login(string UserName,string Password);
    }
}
