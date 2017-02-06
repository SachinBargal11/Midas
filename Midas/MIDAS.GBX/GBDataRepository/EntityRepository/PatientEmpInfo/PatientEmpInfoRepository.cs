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
    internal class PatientEmpInfoRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<PatientEmpInfo> _dbEmpInfo;

        public PatientEmpInfoRepository(MIDASGBXEntities context) : base(context)
        {
            _dbEmpInfo = context.Set<PatientEmpInfo>();
            context.Configuration.ProxyCreationEnabled = false;
        }


        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            PatientEmpInfo PatientEmpInfo = entity as PatientEmpInfo;

            if (PatientEmpInfo == null)
                return default(T);

            BO.PatientEmpInfo PatientEmpInfoBO = new BO.PatientEmpInfo();
            PatientEmpInfoBO.ID = PatientEmpInfo.Id;
            PatientEmpInfoBO.PatientId = PatientEmpInfo.PatientId;
            PatientEmpInfoBO.JobTitle = PatientEmpInfo.JobTitle;
            PatientEmpInfoBO.EmpName = PatientEmpInfo.EmpName;
            //PatientEmpInfoBO.EmpAddressId = PatientEmpInfo.EmpAddressId;
            //PatientEmpInfoBO.EmpContactInfoId = PatientEmpInfo.EmpContactInfoId;
            PatientEmpInfoBO.IsCurrentEmp = PatientEmpInfo.IsCurrentEmp;


           
            //BO.Case cases = new BO.Case();
            //using (CaseRepository cmp = new CaseRepository(_context))
            //{
            //    cases = cmp.Convert<BO.Case, Case>(InsuranceInfos.Cases);
            //    insuranceBO.Cases = cases;
            //}

            return (T)(object)PatientEmpInfoBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.PatientEmpInfo patientEmpInfo = (BO.PatientEmpInfo)(object)entity;
            var result = patientEmpInfo.Validate(patientEmpInfo);
            return result;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.PatientEmpInfoes.Include("User").Where(p => p.Id == id).FirstOrDefault<PatientEmpInfo>();
            BO.PatientEmpInfo acc_ = Convert<BO.PatientEmpInfo, PatientEmpInfo>(acc);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region Get All 
        public override Object Get<T>(T entity)
        {
            BO.PatientEmpInfo patientEmpInfo = (BO.PatientEmpInfo)(object)entity;
            var acc = _context.PatientEmpInfoes.Include("User").ToList<PatientEmpInfo>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.PatientEmpInfo> listpatientEmpInfo = new List<BO.PatientEmpInfo>();
            foreach (PatientEmpInfo item in acc)
            {
                listpatientEmpInfo.Add(Convert<BO.PatientEmpInfo, PatientEmpInfo>(item));
            }
            return listpatientEmpInfo;

        }
        #endregion

     





        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
