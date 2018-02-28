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
    internal class CaseStatusRepository : BaseEntityRepo, IDisposable
    {
        
       
        private DbSet<CaseStatu> _dbSet;

        #region Constructor
        public CaseStatusRepository(MIDASGBXEntities context)
            : base(context)
        {

            _dbSet = context.Set<CaseStatu>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            List<CaseStatu> caseStatus = entity as List<CaseStatu>;

            if (caseStatus == null)
                return default(T);

            List<BO.Common.CaseStatus> boCaseStatuses = new List<BO.Common.CaseStatus>();
            foreach (var eachCaseStatus in caseStatus)
            {
                BO.Common.CaseStatus boCaseStatus = new BO.Common.CaseStatus();

                boCaseStatus.CaseStatusText = eachCaseStatus.CaseStatusText;

                if (eachCaseStatus.IsDeleted.HasValue)
                    boCaseStatus.IsDeleted = eachCaseStatus.IsDeleted.Value;

                boCaseStatuses.Add(boCaseStatus);
            }





            return (T)(object)boCaseStatuses;
        }
        #endregion

        #region Entity Conversion
        public override T ObjectConvert<T, U>(U entity)
        {
            CaseStatu caseStatus = entity as CaseStatu;

            if (caseStatus == null)
                return default(T);


            BO.Common.CaseStatus boCaseStatus = new BO.Common.CaseStatus();

            boCaseStatus.CaseStatusText = caseStatus.CaseStatusText;

            if (boCaseStatus.IsDeleted.HasValue)
                boCaseStatus.IsDeleted = boCaseStatus.IsDeleted.Value;

            return (T)(object)boCaseStatus;
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

        #region Get All Case Status
        public override Object Get()
        {
            var acc = _context.CaseStatus.Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)).ToList<CaseStatu>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No Case Status info found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Common.CaseStatus> acc_ = Convert<List<BO.Common.CaseStatus>, List<CaseStatu>>(acc);
                return (object)acc_;
            }
        }
        #endregion

        #region Get By Id 
        public override object Get(int id)
        {

            var acc = _context.CaseStatus.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<CaseStatu>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case Status Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                BO.Common.CaseStatus acc_ = ObjectConvert<BO.Common.CaseStatus, CaseStatu>(acc);
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
