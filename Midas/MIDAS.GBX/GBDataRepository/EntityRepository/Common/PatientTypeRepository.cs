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
    internal class PatientTypeRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<PatientType> _dbState;

        public PatientTypeRepository(MIDASGBXEntities context) : base(context)
        {
            _dbState = context.Set<PatientType>();
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            List<PatientType> patientType = entity as List<PatientType>;
            if (patientType == null)
                return default(T);

            List<BO.Common.PatientType> boPatientType = new List<BO.Common.PatientType>();
            foreach (var eachPatientType in patientType)
            {
                BO.Common.PatientType boPatType = new BO.Common.PatientType();

                boPatType.ID = eachPatientType.Id;
                boPatType.PatientTypeText = eachPatientType.PatientTypeText;
                boPatType.IsDeleted = eachPatientType.IsDeleted;

                boPatientType.Add(boPatType);
            }


            return (T)(object)boPatientType;
        }
        #endregion

        #region Entity Conversion
        public override T ObjectConvert<T, U>(U entity)
        {
            PatientType patientType = entity as PatientType;

            if (patientType == null)
                return default(T);

            BO.Common.PatientType boPatType = new BO.Common.PatientType();

            boPatType.ID = patientType.Id;
            boPatType.PatientTypeText = patientType.PatientTypeText;
            boPatType.IsDeleted = patientType.IsDeleted;

            return (T)(object)boPatType;
        }
        #endregion

        #region Get All Patient Type
        public override Object Get()
        {
            var acc = _context.PatientTypes.Where(p => p.IsDeleted.HasValue == false || p.IsDeleted == false).ToList<PatientType>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No patient type info found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Common.PatientType> acc_ = Convert<List<BO.Common.PatientType>, List<PatientType>>(acc);
                return (object)acc_;
            }
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.PatientTypes.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || p.IsDeleted == false)).FirstOrDefault<PatientType>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            BO.Common.PatientType acc_ = ObjectConvert<BO.Common.PatientType, PatientType>(acc);

            return (object)acc_;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
