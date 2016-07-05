using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Midas.GreenBill.Model;
using BO = Midas.GreenBill.BusinessObject;
using Midas.GreenBill.EntityRepository;

namespace Midas.GreenBill
{
    internal class RepoFactory
    {
        internal static BaseEntityRepo GetRepo<T>(GreenBillsDbEntities context)
        {
            BaseEntityRepo repo = null;
            if (typeof(T) == typeof(BO.Account))
            {
                repo  = new AccountRepository(context);
            }
            else if (typeof(T) == typeof(BO.User))
            {
                repo  = new UserRepository(context);
            }
            return repo;
        }
    }
}

