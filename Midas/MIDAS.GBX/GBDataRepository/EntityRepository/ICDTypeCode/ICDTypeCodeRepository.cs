#region Imports
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Newtonsoft.Json.Linq;
using MIDAS.GBX.EntityRepository;
using MIDAS.GBX.DataRepository.Model;
using BO = MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.EN;
using MIDAS.GBX.Common;

#endregion

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class ICDTypeCodeRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<ICDTypeCode> _dbSet;
        private DbSet<CompanyICDTypeCode> _dbcompanyICD;

        #region Constructor
        public ICDTypeCodeRepository(MIDASGBXEntities context) : base(context)
        {
            _dbSet = context.Set<ICDTypeCode>();
            _dbcompanyICD = context.Set<CompanyICDTypeCode>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.CompanyICDTypeCode companyICDTypeCode = (BO.CompanyICDTypeCode)(object)entity;
            var result = companyICDTypeCode.Validate(companyICDTypeCode);
            return result;
        }
        #endregion

        #region Get ICDTypeCode By CompanyId
        public override object GetICDTypeCodeByCompanyId(int CompanyId)
        {
            var ICDTypeCodeDB = from icd in _context.ICDTypeCodes
                                  join cit in _context.CompanyICDTypeCodes on icd.Id equals cit.ICDTypeCodeID
                                  where
                                  cit.CompanyID == CompanyId
                                  && (icd.IsDeleted.HasValue == false || (icd.IsDeleted.HasValue == true && icd.IsDeleted.Value == false))
                                  && (cit.IsDeleted.HasValue == false || (cit.IsDeleted.HasValue == true && cit.IsDeleted.Value == false))
                                  select new 
                                  {
                                    icd.Id,
                                    icd.Code,
                                    icd.IsDeleted    
                                  }
                                  
                                  ;

            return ICDTypeCodeDB;
            
        }
        #endregion


        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}

