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
    internal class GeneralSettingRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<GeneralSetting> _dbUserPersonalSetting;

        #region Constructor
        public GeneralSettingRepository(MIDASGBXEntities context) : base(context)
        {
            _dbUserPersonalSetting = context.Set<GeneralSetting>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion Convert
        public override T Convert<T, U>(U entity)
        {
            GeneralSetting generalSetting = entity as GeneralSetting;

            if (generalSetting == null)
                return default(T);

            BO.GeneralSetting generalSettingBO = new BO.GeneralSetting();

            generalSettingBO.ID = generalSetting.Id;
            generalSettingBO.CompanyId = generalSetting.CompanyId;
            generalSettingBO.SlotDuration = generalSetting.SlotDuration;
            generalSettingBO.IsDeleted = generalSetting.IsDeleted;
            generalSettingBO.CreateByUserID = generalSetting.CreateByUserID;
            generalSettingBO.UpdateByUserID = generalSetting.UpdateByUserID;

            if (generalSetting.Company != null)
            {
                if (generalSetting.Company.IsDeleted.HasValue == false || (generalSetting.Company.IsDeleted.HasValue == true && generalSetting.Company.IsDeleted.Value == false))
                {
                    BO.Company boCompany = new BO.Company();
                    using (UserRepository cmp = new UserRepository(_context))
                    {
                        boCompany = cmp.Convert<BO.Company, Company>(generalSetting.Company);
                        generalSettingBO.Company = boCompany;
                    }
                }
            }                


            return (T)(object)generalSettingBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.GeneralSetting generalSetting = (BO.GeneralSetting)(object)entity;
            var result = generalSetting.Validate(generalSetting);
            return result;
        }
        #endregion

      

        #region save
        public override object Save<T>(T entity)
        {
            BO.GeneralSetting generalSettingBO = (BO.GeneralSetting)(object)entity;
            GeneralSetting generalSettingDB = new GeneralSetting();


            if (generalSettingBO != null)
            {
                bool Add_generalSetting = false;
                generalSettingDB = _context.GeneralSettings.Where(p => p.CompanyId == generalSettingBO.CompanyId
                                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                      .FirstOrDefault();

                if (generalSettingDB == null)
                {
                    generalSettingDB = new GeneralSetting();
                    Add_generalSetting = true;
                }


                generalSettingDB.CompanyId = generalSettingBO.CompanyId;              
                generalSettingDB.SlotDuration =  generalSettingBO.SlotDuration;

                if (Add_generalSetting == true)
                {
                    generalSettingDB = _context.GeneralSettings.Add(generalSettingDB);
                }
                _context.SaveChanges();
            }

            generalSettingDB = _context.GeneralSettings.Include("Company")
                                                                 .Where(p => p.Id == generalSettingDB.Id).FirstOrDefault<GeneralSetting>();


            var res = Convert<BO.GeneralSetting, GeneralSetting>(generalSettingDB);
            return (object)res;
        }
        #endregion

        #region Get By Company Id
        public override object GetByCompanyId(int CompanyId)
        {
            var acc = _context.GeneralSettings.Include("Company")
                                    .Where(p => p.CompanyId == CompanyId
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                    .FirstOrDefault<GeneralSetting>();

            BO.GeneralSetting acc_ = Convert<BO.GeneralSetting, GeneralSetting>(acc);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion



        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
