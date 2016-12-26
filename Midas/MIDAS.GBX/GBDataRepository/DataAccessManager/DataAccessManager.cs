using MIDAS.GBX.Common;
using MIDAS.GBX.DataAccessManager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;
namespace MIDAS.GBX.DataRepository
{
    public class DataAccessManager
    {
        IDBContextProvider dbContextProvider = null;
        public DataAccessManager(IDBContextProvider dbContextProvider = null)
        {
            this.dbContextProvider = dbContextProvider ?? new DBContextProvider();
        }

        public Object Login(BO.User user)
        {
            try
            {
                EntityRepository.UserRepository userRepo = new EntityRepository.UserRepository(dbContextProvider.GetGbDBContext());

                    var gbdata = userRepo.Login(user);
                    return gbdata;
  
            }

            catch (GbException gbe)
            {
                //LogManager.LogErrorMessage(gbe.Message, 0, (GbObject)(object)(entity));
                throw;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
