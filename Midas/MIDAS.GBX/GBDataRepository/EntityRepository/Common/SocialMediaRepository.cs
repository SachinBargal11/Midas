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
    internal class SocialMediaRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<CaseStatu> _dbSet;

        #region Constructor
        public SocialMediaRepository(MIDASGBXEntities context)
            : base(context)
        {

            _dbSet = context.Set<CaseStatu>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            List<SocialMedia> SocialMedias = entity as List<SocialMedia>;

            if (SocialMedias == null)
                return default(T);

            List<BO.Common.SocialMedia> SocialMediasBO = new List<BO.Common.SocialMedia>();
            foreach (var eachSocialMedia in SocialMedias)
            {
                BO.Common.SocialMedia SocialMediaBO = new BO.Common.SocialMedia();

                SocialMediaBO.Name = eachSocialMedia.Name;

                if (eachSocialMedia.IsDeleted.HasValue)
                    SocialMediaBO.IsDeleted = eachSocialMedia.IsDeleted.Value;

                SocialMediasBO.Add(SocialMediaBO);
            }

            return (T)(object)SocialMediasBO;
        }
        #endregion

        #region Get All Case Status
        public override Object Get()
        {
            var acc = _context.SocialMedias.Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)).ToList<SocialMedia>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No Language Preferences info found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Common.SocialMedia> acc_ = Convert<List<BO.Common.SocialMedia>, List<SocialMedia>>(acc);
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
