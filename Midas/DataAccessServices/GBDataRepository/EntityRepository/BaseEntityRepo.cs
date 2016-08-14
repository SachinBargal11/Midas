using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GBDataRepository.Model;
using BO = Midas.GreenBill.BusinessObject;
using Newtonsoft.Json.Linq;

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

        public virtual Object Save(JObject data)
        {
            throw new NotImplementedException();
        }

        public virtual Object Delete<T>(T entity) where T : BO.GbObject
        {

            throw new NotImplementedException();
        }

        public virtual void PreSave<T>(T entity) where T : BO.GbObject
        {
            //override and do the necessary operations needed for saving an object
        }

        public virtual void PreSave(JObject data)
        {
            //override and do the necessary operations needed for saving an object
        }

        public virtual void PostSave(JObject data)
        {
            //override and do the necessary operations needed for saving an object
        }

        public virtual void PostSave<T>(T entity) where T : BO.GbObject
        {
            //override and do the necessary operations needed after saving an object
        }
        public virtual  Object Signup(JObject data)
        {
            throw new NotImplementedException();
        }

        public virtual T Get<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object Login(JObject entity)
        {
            throw new NotImplementedException();
        }
        public virtual T Convert<T, U>(U entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object Get(JObject entity)
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
