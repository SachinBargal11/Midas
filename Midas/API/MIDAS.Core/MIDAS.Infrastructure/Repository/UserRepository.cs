using MIDAS.Core.Entities.User;
using MIDAS.Core.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.Infrastructure.Repository
{
    public class UserRepository : IUserRepository
    {
        UserDataContext context = new UserDataContext();
        public void Add(Core.Entities.User.User b)
        {
            context.User.Add(b);
            context.SaveChanges();

        }

        public void Edit(Core.Entities.User.User b)
        {
            //context.Entry(b).State = System.Data.Entity.EntityState.Modified;
        }

        public void Remove(string Id)
        {
            User b = context.User.Find(Id);
            context.User.Remove(b);
            context.SaveChanges();
        }

        public IEnumerable<Core.Entities.User.User> GetUsers()
        {
            return context.User;
        }

        public Core.Entities.User.User FindById(int Id)
        {
            var c = (from r in context.User where r.ID == Id select r).FirstOrDefault();
            return c;
        }


        public User Login(string UserName, string Password)
        {
            var c = (from r in context.User where r.UserName == UserName && r.Password==Password select r).FirstOrDefault();
            return c;
        }
    }
}
