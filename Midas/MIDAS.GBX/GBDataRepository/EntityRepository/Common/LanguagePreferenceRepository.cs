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
    internal class LanguagePreferenceRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<CaseStatu> _dbSet;

        #region Constructor
        public LanguagePreferenceRepository(MIDASGBXEntities context)
            : base(context)
        {

            _dbSet = context.Set<CaseStatu>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            List<LanguagePreference> LanguagePreferences = entity as List<LanguagePreference>;

            if (LanguagePreferences == null)
                return default(T);

            List<BO.Common.LanguagePreference> LanguagePreferencesBO = new List<BO.Common.LanguagePreference>();
            foreach (var eachLanguagePreference in LanguagePreferences)
            {
                BO.Common.LanguagePreference LanguagePreferenceBO = new BO.Common.LanguagePreference();

                LanguagePreferenceBO.Name = eachLanguagePreference.Name;

                if (eachLanguagePreference.IsDeleted.HasValue)
                    LanguagePreferenceBO.IsDeleted = eachLanguagePreference.IsDeleted.Value;

                LanguagePreferencesBO.Add(LanguagePreferenceBO);
            }

            return (T)(object)LanguagePreferencesBO;
        }
        #endregion

        #region Get All Case Status
        public override Object Get()
        {
            var acc = _context.LanguagePreferences.Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)).ToList<LanguagePreference>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No Language Preferences info found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Common.LanguagePreference> acc_ = Convert<List<BO.Common.LanguagePreference>, List<LanguagePreference>>(acc);
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
