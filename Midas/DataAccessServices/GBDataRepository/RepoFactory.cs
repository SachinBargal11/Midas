using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = Midas.GreenBill.BusinessObject;
using Midas.GreenBill.EntityRepository;
using GBDataRepository.Model;

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
            else if (typeof(T) == typeof(BO.Address))
            {
                repo = new AddressRepository(context);
            }
            else if (typeof(T) == typeof(BO.ContactInfo))
            {
                repo = new ContactRepository(context);
            }
            else if (typeof(T) == typeof(BO.Provider))
            {
                repo = new ProviderRepository(context);
            }
            else if (typeof(T) == typeof(BO.MedicalFacility))
            {
                repo = new MedicalFacilityRepository(context);
            }
            return repo;
        }
    }
}

