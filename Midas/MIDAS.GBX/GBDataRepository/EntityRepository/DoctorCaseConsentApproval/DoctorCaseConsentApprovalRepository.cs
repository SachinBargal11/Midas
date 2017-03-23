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
    internal class DoctorCaseConsentApprovalRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<DoctorCaseConsentApproval> _dbDoctorCaseConsentApproval;

        public DoctorCaseConsentApprovalRepository(MIDASGBXEntities context) : base(context)
        {
            _dbDoctorCaseConsentApproval = context.Set<DoctorCaseConsentApproval>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            DoctorCaseConsentApproval doctorCaseConsentApprovals = entity as DoctorCaseConsentApproval;

            if (doctorCaseConsentApprovals == null)
                return default(T);

            BO.DoctorCaseConsentApproval doctorCaseConsentApprovalBO = new BO.DoctorCaseConsentApproval();

            doctorCaseConsentApprovalBO.ID = doctorCaseConsentApprovals.Id;
            doctorCaseConsentApprovalBO.DoctorId = doctorCaseConsentApprovals.DoctorId;
            doctorCaseConsentApprovalBO.CaseId = doctorCaseConsentApprovals.CaseId;
            doctorCaseConsentApprovalBO.ConsentReceived = doctorCaseConsentApprovals.ConsentReceived;
            doctorCaseConsentApprovalBO.IsDeleted = doctorCaseConsentApprovals.IsDeleted;
            doctorCaseConsentApprovalBO.CreateByUserID = doctorCaseConsentApprovals.CreateByUserID;
            doctorCaseConsentApprovalBO.UpdateByUserID = doctorCaseConsentApprovals.UpdateByUserID;

            //BO.Case boCase = new BO.Case();
            //using (CaseRepository cmp = new CaseRepository(_context))
            //{

            //    boCase = cmp.Convert<BO.Case, Case>(doctorCaseConsentApprovals.Case);
            //    doctorCaseConsentApprovalBO.Case = boCase;
            //}
            //BO.Doctor boDoctor = new BO.Doctor();
            //using (DoctorRepository cmp = new DoctorRepository(_context))
            //{

            //    boDoctor = cmp.Convert<BO.Doctor, Doctor>(doctorCaseConsentApprovals.Doctor);
            //    doctorCaseConsentApprovalBO.Doctor = boDoctor;
            //}

            return (T)(object)doctorCaseConsentApprovalBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.DoctorCaseConsentApproval doctorCaseConsentApproval = (BO.DoctorCaseConsentApproval)(object)entity;
            var result = doctorCaseConsentApproval.Validate(doctorCaseConsentApproval);
            return result;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

}


