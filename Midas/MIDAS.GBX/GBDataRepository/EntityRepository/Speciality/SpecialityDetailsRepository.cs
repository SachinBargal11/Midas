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
    internal class SpecialityDetailsRepository : BaseEntityRepo
    {
        private DbSet<SpecialtyDetail> _dbSet;

        #region Constructor
        public SpecialityDetailsRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<SpecialtyDetail>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            SpecialtyDetail specialtydetail = entity as SpecialtyDetail;

            if (specialtydetail == null)
                return default(T);

            BO.SpecialtyDetails specialtyDetailBO = new BO.SpecialtyDetails();

            specialtyDetailBO.ID = specialtydetail.id;
            if (specialtydetail.ReevalDays.HasValue)
                specialtyDetailBO.ReevalDays = specialtydetail.ReevalDays.Value;
            if (specialtydetail.ReevalVisitCount.HasValue)
                specialtyDetailBO.ReevalVisitCount = specialtydetail.ReevalVisitCount.Value;
            if (specialtydetail.InitialDays.HasValue)
                specialtyDetailBO.InitialDays = specialtydetail.InitialDays.Value;
            if (specialtydetail.InitialVisitCount.HasValue)
                specialtyDetailBO.InitialVisitCount = specialtydetail.InitialVisitCount.Value;
            if (specialtydetail.MaxReval.HasValue)
                specialtyDetailBO.MaxReval = specialtydetail.MaxReval.Value;
            if (specialtydetail.IsInitialEvaluation.HasValue)
                specialtyDetailBO.IsInitialEvaluation = specialtydetail.IsInitialEvaluation.Value;
            if (specialtydetail.Include1500.HasValue)
                specialtyDetailBO.Include1500 = specialtydetail.Include1500.Value;
            if (specialtydetail.AllowMultipleVisit.HasValue)
                specialtyDetailBO.AllowMultipleVisit = specialtydetail.AllowMultipleVisit.Value;
            if (specialtydetail.IsDeleted.HasValue)
                specialtyDetailBO.IsDeleted = specialtydetail.IsDeleted.Value;
            if (specialtydetail.UpdateByUserID.HasValue)
                specialtyDetailBO.UpdateByUserID = specialtydetail.UpdateByUserID.Value;

            BO.Specialty boSpecialty = new BO.Specialty();
            //using (SpecialityRepository sr = new SpecialityRepository(_context))
            //{
            //    boSpecialty = sr.Convert<BO.Specialty, Specialty>(specialtydetail.Specialty);
            //    specialtyDetailBO.Specialty = boSpecialty;
            //}
            return (T)(object)specialtyDetailBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.SpecialtyDetails specialtydetail = (BO.SpecialtyDetails)(object)entity;
            var result = specialtydetail.Validate(specialtydetail);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.SpecialtyDetails specialtyDetailBO = (BO.SpecialtyDetails)(object)entity;

            SpecialtyDetail speclityDetailDB = new SpecialtyDetail();

            if (specialtyDetailBO.Specialty == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Specialty object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            BO.Specialty specilityBO = specialtyDetailBO.Specialty;

            #region Specialty
            speclityDetailDB.id = specialtyDetailBO.ID;
            speclityDetailDB.ReevalDays = specialtyDetailBO.ReevalDays;
            speclityDetailDB.ReevalVisitCount = specialtyDetailBO.ReevalVisitCount;
            speclityDetailDB.InitialDays = specialtyDetailBO.InitialDays;
            speclityDetailDB.InitialVisitCount = specialtyDetailBO.InitialVisitCount;
            speclityDetailDB.MaxReval = specialtyDetailBO.MaxReval;
            speclityDetailDB.IsInitialEvaluation = specialtyDetailBO.IsInitialEvaluation;
            speclityDetailDB.Include1500 = specialtyDetailBO.Include1500;
            speclityDetailDB.AllowMultipleVisit = specialtyDetailBO.AllowMultipleVisit;
            speclityDetailDB.IsDeleted = specialtyDetailBO.IsDeleted;
            #endregion

            #region Specialty
            if (specilityBO.ID > 0)
            {
                //Specialty speclity = _context.Specialties.Where(p => p.id == specilityBO.ID).FirstOrDefault<Specialty>();
                //if (speclity != null)
                //{
                //    speclityDetailDB.Specialty = speclity;
                //    _context.Entry(speclity).State = System.Data.Entity.EntityState.Modified;
                //}
                //else
                //    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Speclity details.", ErrorLevel = ErrorLevel.Error };
            }
            #endregion


            if (speclityDetailDB.id > 0)
            {

                //Find Specialty By ID
                SpecialtyDetail specialtydetail = _context.SpecialtyDetails.Where(p => p.id == speclityDetailDB.id).FirstOrDefault<SpecialtyDetail>();

                if (specialtydetail != null)
                {
                    #region Specialty
                    speclityDetailDB.ReevalDays = specialtyDetailBO.ReevalDays != null ? specialtyDetailBO.ReevalDays : specialtydetail.ReevalDays;
                    speclityDetailDB.ReevalVisitCount = specialtyDetailBO.ReevalVisitCount != null ? specialtyDetailBO.ReevalVisitCount : specialtydetail.ReevalVisitCount;
                    speclityDetailDB.InitialDays = specialtyDetailBO.InitialDays != null ? specialtyDetailBO.InitialDays : specialtydetail.InitialDays;
                    speclityDetailDB.InitialVisitCount = specialtyDetailBO.InitialVisitCount != null ? specialtyDetailBO.InitialVisitCount : specialtydetail.InitialVisitCount;
                    speclityDetailDB.MaxReval = specialtyDetailBO.MaxReval != null ? specialtyDetailBO.MaxReval : specialtydetail.MaxReval;
                    speclityDetailDB.IsInitialEvaluation = specialtyDetailBO.IsDeleted != null ? specialtyDetailBO.IsDeleted : specialtydetail.IsDeleted;
                    speclityDetailDB.Include1500 = specialtyDetailBO.IsDeleted != null ? specialtyDetailBO.IsDeleted : specialtydetail.IsDeleted;
                    speclityDetailDB.AllowMultipleVisit = specialtyDetailBO.IsDeleted != null ? specialtyDetailBO.IsDeleted : specialtydetail.IsDeleted;
                    speclityDetailDB.IsDeleted = specialtyDetailBO.IsDeleted != null ? specialtyDetailBO.IsDeleted : specialtydetail.IsDeleted;
                    specialtydetail.IsDeleted = specialtyDetailBO.IsDeleted != null ? specialtyDetailBO.IsDeleted : specialtydetail.IsDeleted;
                    specialtydetail.UpdateDate = DateTime.UtcNow;
                    specialtydetail.UpdateByUserID = specialtyDetailBO.UpdateByUserID;
                    #endregion

                    _context.Entry(specialtydetail).State = System.Data.Entity.EntityState.Modified;
                }

            }
            else
            {
                speclityDetailDB.CreateDate = DateTime.UtcNow;
                speclityDetailDB.CreateByUserID = specialtyDetailBO.CreateByUserID;

                _dbSet.Add(speclityDetailDB);
            }
            _context.SaveChanges();

            var res = Convert<BO.SpecialtyDetails, SpecialtyDetail>(speclityDetailDB);
            return (object)res;
        }
        #endregion

        #region Delete
        public override object Delete<T>(T entity)
        {
            BO.SpecialtyDetails specialtyDetailBO = entity as BO.SpecialtyDetails;

            SpecialtyDetail speclityDetailDB = new SpecialtyDetail();
            speclityDetailDB.id = specialtyDetailBO.ID;
            _dbSet.Remove(_context.SpecialtyDetails.Single<SpecialtyDetail>(p => p.id == specialtyDetailBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return specialtyDetailBO;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            BO.SpecialtyDetails acc_ = Convert<BO.SpecialtyDetails, SpecialtyDetail>(_context.SpecialtyDetails.Where(p => p.id == id && p.IsDeleted == false).FirstOrDefault<SpecialtyDetail>());
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Specialty detail.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }
        #endregion


        #region Get By Filter
        public override object Get<T>(T entity)
        {
            List<BO.SpecialtyDetails> lstSpecialties = new List<BO.SpecialtyDetails>();
            BO.SpecialtyDetails specialtyDetailBO = (BO.SpecialtyDetails)(object)entity;
            if (specialtyDetailBO == null)
            {
                if (specialtyDetailBO.Specialty != null)
                {
                    var acc_ = _context.SpecialtyDetails.Include("Specialty").Where(p => p.IsDeleted == false || p.IsDeleted == null && p.SpecialtyId == specialtyDetailBO.Specialty.ID).ToList<SpecialtyDetail>();
                    if (acc_ == null)
                    {
                        return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                    foreach (SpecialtyDetail item in acc_)
                    {
                        lstSpecialties.Add(Convert<BO.SpecialtyDetails, SpecialtyDetail>(item));
                    }
                }
                else
                {
                    var acc_ = _context.SpecialtyDetails.Include("Specialty").Where(p => p.IsDeleted == false || p.IsDeleted == null).ToList<SpecialtyDetail>();
                    if (acc_ == null)
                    {
                        return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                    foreach (SpecialtyDetail item in acc_)
                    {
                        lstSpecialties.Add(Convert<BO.SpecialtyDetails, SpecialtyDetail>(item));
                    }
                }
            }

            return lstSpecialties;
        }
        #endregion

    }
}
