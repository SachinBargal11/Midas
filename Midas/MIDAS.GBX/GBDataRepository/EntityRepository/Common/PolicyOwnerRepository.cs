using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.EntityRepository;
using System.Data.Entity;
using MIDAS.GBX.DataRepository.Model;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository.Common
{
    internal class PolicyOwnerRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<PolicyOwner> _dbState;

        public PolicyOwnerRepository(MIDASGBXEntities context) : base(context)
        {
            _dbState = context.Set<PolicyOwner>();
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            List<PolicyOwner> policyOwners = entity as List<PolicyOwner>;
            if (policyOwners == null)
                return default(T);

            List<BO.Common.PolicyOwner> boPolicyOwners = new List<BO.Common.PolicyOwner>();
            foreach (var eachOwnerType in policyOwners)
            {
                BO.Common.PolicyOwner boPOwner = new BO.Common.PolicyOwner();

                boPOwner.ID = eachOwnerType.Id;
                boPOwner.DisplayText = eachOwnerType.DisplayText;
                boPOwner.IsDeleted = eachOwnerType.IsDeleted;

                boPolicyOwners.Add(boPOwner);
            }


            return (T)(object)boPolicyOwners;
        }
        #endregion

        #region Entity Conversion
        public override T ObjectConvert<T, U>(U entity)
        {
            PolicyOwner policyOwner = entity as PolicyOwner;

            if (policyOwner == null)
                return default(T);

            BO.Common.PolicyOwner boPOwner = new BO.Common.PolicyOwner();

            boPOwner.ID = policyOwner.Id;
            boPOwner.DisplayText = policyOwner.DisplayText;
            boPOwner.IsDeleted = policyOwner.IsDeleted;

            return (T)(object)boPOwner;
        }
        #endregion

        #region Get All States
        public override Object Get()
        {
            var acc = _context.PolicyOwners.Where(p => p.IsDeleted.HasValue == false || p.IsDeleted == false).ToList<PolicyOwner>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No policy owner info found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Common.PolicyOwner> acc_ = Convert<List<BO.Common.PolicyOwner>, List<PolicyOwner>>(acc);
                return (object)acc_;
            }
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.PolicyOwners.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || p.IsDeleted == false)).FirstOrDefault<PolicyOwner>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            BO.Common.PolicyOwner acc_ = ObjectConvert<BO.Common.PolicyOwner, PolicyOwner>(acc);

            return (object)acc_;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
