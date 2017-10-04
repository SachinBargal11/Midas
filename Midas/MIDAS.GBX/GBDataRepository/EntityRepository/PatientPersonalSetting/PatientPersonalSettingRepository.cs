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
    internal class PatientPersonalSettingRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<PatientPersonalSetting> _dbPatientPersonalSetting;

        #region Constructor
        public PatientPersonalSettingRepository(MIDASGBXEntities context) : base(context)
        {
            _dbPatientPersonalSetting = context.Set<PatientPersonalSetting>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion Convert
        public override T Convert<T, U>(U entity)
        {
            PatientPersonalSetting PatientPersonalSettingDB = entity as PatientPersonalSetting;

            if (PatientPersonalSettingDB == null)
                return default(T);

            BO.PatientPersonalSetting PatientPersonalSettingBO = new BO.PatientPersonalSetting();

            PatientPersonalSettingBO.ID = PatientPersonalSettingDB.Id;
            PatientPersonalSettingBO.PatientId = PatientPersonalSettingDB.PatientId;            
            PatientPersonalSettingBO.PreferredModeOfCommunication = PatientPersonalSettingDB.PreferredModeOfCommunication;
            PatientPersonalSettingBO.IsPushNotificationEnabled = PatientPersonalSettingDB.IsPushNotificationEnabled;
            PatientPersonalSettingBO.CalendarViewId = PatientPersonalSettingDB.CalendarViewId;
            PatientPersonalSettingBO.PreferredUIViewId = PatientPersonalSettingDB.PreferredUIViewId;

            PatientPersonalSettingBO.IsDeleted = PatientPersonalSettingDB.IsDeleted;
            PatientPersonalSettingBO.CreateByUserID = PatientPersonalSettingDB.CreateByUserID;
            PatientPersonalSettingBO.UpdateByUserID = PatientPersonalSettingDB.UpdateByUserID;

            if (PatientPersonalSettingDB.Patient != null)
            {
                if (PatientPersonalSettingDB.Patient.IsDeleted.HasValue == false || (PatientPersonalSettingDB.Patient.IsDeleted.HasValue == true && PatientPersonalSettingDB.Patient.IsDeleted.Value == false))
                {
                    BO.Patient PatientBO = new BO.Patient();
                    using (PatientRepository cmp = new PatientRepository(_context))
                    {
                        PatientBO = cmp.Convert<BO.Patient, Patient>(PatientPersonalSettingDB.Patient);
                        PatientPersonalSettingBO.Patient = PatientBO;
                    }
                }
            }

            return (T)(object)PatientPersonalSettingBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.PatientPersonalSetting PatientPersonalSettingBO = (BO.PatientPersonalSetting)(object)entity;
            var result = PatientPersonalSettingBO.Validate(PatientPersonalSettingBO);
            return result;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.PatientPersonalSettings.Include("Patient")
                                                   .Where(p => p.Id == id
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .FirstOrDefault<PatientPersonalSetting>();

            BO.PatientPersonalSetting acc_ = Convert<BO.PatientPersonalSetting, PatientPersonalSetting>(acc);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region GetByPatientId
        public override Object GetByPatientId(int PatientId)
        {
            var acc = _context.PatientPersonalSettings.Include("Patient")
                                                      .Where(p => p.PatientId == PatientId 
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                      .FirstOrDefault();

            BO.PatientPersonalSetting acc_ = Convert<BO.PatientPersonalSetting, PatientPersonalSetting>(acc);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.PatientPersonalSetting PatientPersonalSettingBO = (BO.PatientPersonalSetting)(object)entity;
            PatientPersonalSetting PatientPersonalSettingDB = new PatientPersonalSetting();


            if (PatientPersonalSettingBO != null)
            {
                bool Add_PatientPersonalSetting = false;
                PatientPersonalSettingDB = _context.PatientPersonalSettings.Where(p => p.PatientId == PatientPersonalSettingBO.PatientId
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                           .FirstOrDefault();

                if (PatientPersonalSettingDB == null)
                {
                    PatientPersonalSettingDB = new PatientPersonalSetting();
                    Add_PatientPersonalSetting = true;
                }

                PatientPersonalSettingDB.PatientId = PatientPersonalSettingBO.PatientId;
                PatientPersonalSettingDB.PreferredModeOfCommunication = PatientPersonalSettingBO.PreferredModeOfCommunication;
                PatientPersonalSettingDB.IsPushNotificationEnabled = PatientPersonalSettingBO.IsPushNotificationEnabled;
                PatientPersonalSettingDB.CalendarViewId = PatientPersonalSettingBO.CalendarViewId;
                PatientPersonalSettingDB.PreferredUIViewId = PatientPersonalSettingBO.PreferredUIViewId;


                if (Add_PatientPersonalSetting == true)
                {
                    PatientPersonalSettingDB = _context.PatientPersonalSettings.Add(PatientPersonalSettingDB);
                }
                _context.SaveChanges();
            }

            PatientPersonalSettingDB = _context.PatientPersonalSettings.Include("Patient")
                                                                       .Where(p => p.Id == PatientPersonalSettingDB.Id).FirstOrDefault<PatientPersonalSetting>();


            var res = Convert<BO.PatientPersonalSetting, PatientPersonalSetting>(PatientPersonalSettingDB);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

    }
}
