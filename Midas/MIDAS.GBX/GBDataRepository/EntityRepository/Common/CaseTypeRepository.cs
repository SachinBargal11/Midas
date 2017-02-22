using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository.Common
{
   internal class CaseTypeRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<CaseType> _dbSet;

        #region Constructor
        public CaseTypeRepository(MIDASGBXEntities context)
            : base(context)
        {

            _dbSet = context.Set<CaseType>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            List<CaseType> caseType = entity as List<CaseType>;

            if (caseType == null)
                return default(T);

            List<BO.Common.CaseType> boCaseTypes = new List<BO.Common.CaseType>();
            foreach (var eachCaseType in caseType)
            {
                BO.Common.CaseType boCaseType = new BO.Common.CaseType();

                boCaseType.CaseTypeText = eachCaseType.CaseTypeText;

                if (eachCaseType.IsDeleted.HasValue)
                    boCaseType.IsDeleted = eachCaseType.IsDeleted.Value;

                boCaseTypes.Add(boCaseType);
            }

           

            

            return (T)(object)boCaseTypes;
        }
        #endregion

        #region Entity Conversion
        public override T ObjectConvert<T, U>(U entity)
        {
            CaseType caseType = entity as CaseType;

            if (caseType == null)
                return default(T);

           
                BO.Common.CaseType boCaseType = new BO.Common.CaseType();

                boCaseType.CaseTypeText = caseType.CaseTypeText;

                if (caseType.IsDeleted.HasValue)
                    boCaseType.IsDeleted = caseType.IsDeleted.Value;

            return (T)(object)boCaseType;
        }
        #endregion
        

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Common.CaseType caseType = (BO.Common.CaseType)(object)entity;
            var result = caseType.Validate(caseType);
            return result;
        }
        #endregion

        #region Get All Case Type
        public override Object Get()
        {
            var acc = _context.CaseTypes.Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)).ToList<CaseType>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No Case type info found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Common.CaseType> acc_ = Convert<List<BO.Common.CaseType>, List<CaseType>>(acc);
                return (object)acc_;
            }
        }
        #endregion

        #region Get By Id 
        public override object Get(int id)
        {

            var acc = _context.CaseTypes.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<CaseType>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case Type Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                BO.Common.CaseType acc_ = ObjectConvert<BO.Common.CaseType, CaseType>(acc);
                return (object)acc_;
            }
        }
        #endregion

     

   

        public void Dispose()
        {
            // Use SupressFinalize in case a subclass 
            // of this type implements a finalizer.
            GC.SuppressFinalize(this);
        }
    }
}
