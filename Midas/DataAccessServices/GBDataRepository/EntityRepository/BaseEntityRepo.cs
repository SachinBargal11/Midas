using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Midas.GreenBill.Model;
using BO = Midas.GreenBill.BusinessObject;
namespace Midas.GreenBill.EntityRepository
{
    internal abstract class BaseEntityRepo
    {
        internal GreenBillsDbEntities _context;
        private const int ApplicationTypeId = 202;
        public BaseEntityRepo(GreenBillsDbEntities context)
        {
            _context = context;
        }

        #region Virtual Methods

        public virtual int? GetLastSavedId()
        {
            throw new NotImplementedException();
        }

        public virtual Object Save<T>(T entity) where T : BO.GbObject
        {

            throw new NotImplementedException();
        }

        public virtual void PreSave<T>(T entity) where T : BO.GbObject
        {
            //override and do the necessary operations needed for saving an object
        }

        public virtual void PostSave<T>(T entity) where T : BO.GbObject
        {
            //override and do the necessary operations needed after saving an object
        }


        public virtual T Get<T>(T entity,int id)
        {
            throw new NotImplementedException();
        }

        public virtual T Convert<T, U>(U entity)
        {
            throw new NotImplementedException();
        }

        public virtual List<T> Get<T>(T entity,string name)
        {
            throw new NotImplementedException();
        }
        public virtual List<T> Get<T>(T entity,List<EntitySearchParameter> searchParameters)
        {
            throw new NotImplementedException();
        }
        public virtual List<T> GetAuthorizedList<T>(List<T> searchList)
        {
            throw new NotImplementedException();
        }


        #endregion
    }
}
