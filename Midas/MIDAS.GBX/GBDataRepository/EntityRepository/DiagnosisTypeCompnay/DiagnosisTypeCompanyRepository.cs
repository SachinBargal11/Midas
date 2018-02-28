using MIDAS.GBX.Common;
using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EN;
using MIDAS.GBX.EntityRepository;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class DiagnosisTypeCompanyRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<DiagnosisTypeCompany> _dbSet;

        #region Constructor
        public DiagnosisTypeCompanyRepository(MIDASGBXEntities context): base(context)
        {
            _dbSet = context.Set<DiagnosisTypeCompany>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            DiagnosisTypeCompany diagnosisTypeCompany = entity as DiagnosisTypeCompany;

            if (diagnosisTypeCompany == null)
                return default(T);

            BO.DiagnosisTypeCompany diagnosisTypeCompanyBO = new BO.DiagnosisTypeCompany();

            diagnosisTypeCompanyBO.ID = diagnosisTypeCompany.Id;
            diagnosisTypeCompanyBO.DiagnosisTypeText = diagnosisTypeCompany.DiagnosisTypeText;
            diagnosisTypeCompanyBO.CompanyId = diagnosisTypeCompany.CompanyID;
            if (diagnosisTypeCompanyBO.IsDeleted.HasValue)
                diagnosisTypeCompanyBO.IsDeleted = diagnosisTypeCompany.IsDeleted.Value;
            if (diagnosisTypeCompanyBO.UpdateByUserID.HasValue)
                diagnosisTypeCompanyBO.UpdateByUserID = diagnosisTypeCompany.UpdatedByUserID.Value;
            return (T)(object)diagnosisTypeCompanyBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.DiagnosisTypeCompany diagnosisTypeCompany = (BO.DiagnosisTypeCompany)(object)entity;
            var result = diagnosisTypeCompany.Validate(diagnosisTypeCompany);
            return result;
        }
        #endregion

        #region Get By Company ID
        public override object GetByCompanyId(int id)
        {
            var boDiagnosisTypeCompanyDB = _context.DiagnosisTypeCompanies.Where(p => p.CompanyID == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                           .ToList<DiagnosisTypeCompany>();

            List<BO.DiagnosisTypeCompany> boDiagnosisTypeCompany = new List<BO.DiagnosisTypeCompany>();

            if (boDiagnosisTypeCompanyDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Diagnosis Type.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            else
            {
                foreach (var boDiagnosisTypeCompanyList in boDiagnosisTypeCompanyDB)
                {
                    boDiagnosisTypeCompany.Add(Convert<BO.DiagnosisTypeCompany, DiagnosisTypeCompany>(boDiagnosisTypeCompanyList));
                }
            }

            return (object)boDiagnosisTypeCompany;
        }
        #endregion

        #region GetAll
        public override object Get()
        {
            var acc_ = _context.DiagnosisTypeCompanies.Where(p => p.IsDeleted == false || p.IsDeleted == null).ToList<DiagnosisTypeCompany>();

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.DiagnosisTypeCompany> lstDiagnosisTypeCompany = new List<BO.DiagnosisTypeCompany>();

            foreach (DiagnosisTypeCompany item in acc_)
            {
                lstDiagnosisTypeCompany.Add(Convert<BO.DiagnosisTypeCompany, DiagnosisTypeCompany>(item));
            }

            return lstDiagnosisTypeCompany;
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
