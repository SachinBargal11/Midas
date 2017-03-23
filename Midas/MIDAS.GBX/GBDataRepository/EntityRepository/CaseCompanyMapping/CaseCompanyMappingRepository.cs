using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository.Common
{
    internal class CaseCompanyMappingRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<CaseCompanyMapping> _dbCaseCompanyMapping;

        public CaseCompanyMappingRepository(MIDASGBXEntities context) : base(context)
        {
            _dbCaseCompanyMapping = context.Set<CaseCompanyMapping>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            CaseCompanyMapping caseCompanyMappings = entity as CaseCompanyMapping;

            if (caseCompanyMappings == null)
                return default(T);

            BO.CaseCompanyMapping caseCompanyMappingBO = new BO.CaseCompanyMapping();

            caseCompanyMappingBO.ID = caseCompanyMappings.Id;
            caseCompanyMappingBO.CaseId = caseCompanyMappings.CaseId;
            caseCompanyMappingBO.CompanyId = caseCompanyMappings.CompanyId;
            caseCompanyMappingBO.IsDeleted = caseCompanyMappings.IsDeleted;
            caseCompanyMappingBO.CreateByUserID = caseCompanyMappings.CreateByUserID;
            caseCompanyMappingBO.UpdateByUserID = caseCompanyMappings.UpdateByUserID;

            //BO.Case boCase = new BO.Case();
            //using (CaseRepository cmp = new CaseRepository(_context))
            //{

            //    boCase = cmp.Convert<BO.Case, Case>(caseCompanyMappings.Case);
            //    caseCompanyMappingBO.Case = boCase;
            //}
            //BO.Company boCompany = new BO.Company();
            //using (CompanyRepository cmp = new CompanyRepository(_context))
            //{

            //    boCompany = cmp.Convert<BO.Company, Company>(caseCompanyMappings.Company);
            //    caseCompanyMappingBO.Company = boCompany;
            //}

            return (T)(object)caseCompanyMappingBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.CaseCompanyMapping CaseCompanyMapping = (BO.CaseCompanyMapping)(object)entity;
            var result = CaseCompanyMapping.Validate(CaseCompanyMapping);
            return result;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
