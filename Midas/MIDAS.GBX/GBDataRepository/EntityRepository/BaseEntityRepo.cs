using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using MIDAS.GBX.DataRepository.Model;

namespace MIDAS.GBX.EntityRepository
{
    internal abstract class BaseEntityRepo
    {
        internal MIDASGBXEntities _context;
        private const int ApplicationTypeId = 202;
        public BaseEntityRepo(MIDASGBXEntities context)
        {
            _context = context;
        }

        #region Virtual Methods

        public virtual int? GetLastSavedId()
        {
            throw new NotImplementedException();
        }

        public virtual Object Save<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
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
        public virtual  Object Signup<T>(T data)
        {
            throw new NotImplementedException();
        }

        public virtual Object Get(int id)
        {
            throw new NotImplementedException();
        }

        public virtual Object Login<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object ValidateInvitation<T>(T entity)
        {
            throw new NotImplementedException();
        }
        public virtual T Convert<T, U>(U entity)
        {
            throw new NotImplementedException();
        }
        public virtual T ObjectConvert<T, U>(U entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object Get<T>(T entity)
        {
            throw new NotImplementedException();
        }
        public virtual List<T> GetAuthorizedList<T>(List<T> searchList)
        {
            throw new NotImplementedException();
        }

        public virtual Object DeleteByUserId(int userId)
        {
            throw new NotImplementedException();
        }
        public virtual Object GenerateToken(int id)
        {
            throw new NotImplementedException();
        }
        public virtual Object ValidateToken(string tokenId)
        {
            throw new NotImplementedException();
        }
        public virtual Object Kill(int tokenId)
        {
            throw new NotImplementedException();
        }

        public virtual Object ValidateOTP<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object RegenerateOTP<T>(T entity)
        {
            throw new NotImplementedException();
        }
        public virtual Object GeneratePasswordLink<T>(T entity)
        {
            throw new NotImplementedException();
        }
        public virtual Object ValidatePassword<T>(T entity)
        {
            throw new NotImplementedException();
        }


        public virtual Object Get()
        {
            throw new NotImplementedException();
        }

        public virtual Object Get(string param1)
        {
            throw new NotImplementedException();
        }

        public virtual Object Update<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object Add<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object Save2<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByCompanyId(int CompanyId)
        {
            throw new NotImplementedException();
        }

        public virtual Object ResetPassword<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Object GetByPatientId(int PatientId)
        {
            throw new NotImplementedException();
        }
        public virtual Object DeleteById(int id)
        {
            throw new NotImplementedException();
        }
        
        #endregion
    }
}
