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
    internal class SpecialityRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<Specialty> _dbSet;
        

        #region Constructor
        public SpecialityRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<Specialty>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Specialty specialty = entity as Specialty;

            if (specialty == null)
                return default(T);

            BO.Specialty specialtyBO = new BO.Specialty();

            specialtyBO.ID = specialty.id;
            specialtyBO.Name = specialty.Name;
            specialtyBO.SpecialityCode = specialty.SpecialityCode;
            specialtyBO.MandatoryProcCode = specialty.MandatoryProcCode;
            specialtyBO.SchedulingAvailable = specialty.SchedulingAvailable;
            if (specialty.IsUnitApply.HasValue)
                specialtyBO.IsDeleted = specialty.IsUnitApply.Value;
            if (specialty.IsDeleted.HasValue)
                specialtyBO.IsDeleted = specialty.IsDeleted.Value;
            if (specialty.UpdateByUserID.HasValue)
                specialtyBO.UpdateByUserID = specialty.UpdateByUserID.Value;
            
            specialtyBO.ColorCode = specialty.ColorCode;

            return (T)(object)specialtyBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Specialty specialty = (BO.Specialty)(object)entity;
            var result = specialty.Validate(specialty);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.Specialty specialtyBO = (BO.Specialty)(object)entity;

            Specialty speclityDB = new Specialty();

            #region Specialty
            speclityDB.id = specialtyBO.ID;
            speclityDB.Name = specialtyBO.Name;
            speclityDB.SpecialityCode = specialtyBO.SpecialityCode;
            speclityDB.IsUnitApply = specialtyBO.IsUnitApply;
            speclityDB.IsDeleted = specialtyBO.IsDeleted.HasValue ? specialtyBO.IsDeleted.Value : false;
            speclityDB.ColorCode = specialtyBO.ColorCode;
            #endregion


            if (speclityDB.id > 0)
            {

                //Find Specialty By ID
                Specialty specialty = _context.Specialties.Where(p => p.id == speclityDB.id).FirstOrDefault<Specialty>();

                if (specialty != null)
                {
                    #region Specialty
                    specialty.id = specialtyBO.ID;
                    specialty.Name = specialtyBO.Name != null ? specialtyBO.Name : specialty.Name;
                    specialty.IsUnitApply = specialtyBO.IsUnitApply != null ? specialtyBO.IsUnitApply : specialty.IsUnitApply;
                    specialty.SpecialityCode = specialtyBO.SpecialityCode != null ? specialtyBO.SpecialityCode : specialty.SpecialityCode;
                    specialty.IsDeleted = specialtyBO.IsDeleted != null ? specialtyBO.IsDeleted : specialty.IsDeleted;
                    specialty.UpdateByUserID = specialtyBO.UpdateByUserID;
                    specialty.ColorCode = specialtyBO.ColorCode != null ? specialtyBO.ColorCode : specialty.ColorCode;
                    #endregion

                    _context.Entry(specialty).State = System.Data.Entity.EntityState.Modified;

                }
                else
                {
                    return new BO.ErrorObject { ErrorMessage = "No record found for this Specialty.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

            }
            else
            {
                speclityDB.CreateByUserID = specialtyBO.CreateByUserID;

                _dbSet.Add(speclityDB);
            }
            _context.SaveChanges();

            BO.Log log = new BO.Log();

            using (LogRepository lg = new LogRepository(_context))
            {
                log.requestId = "3";
                log.responseId = "3";
                log.machinename = Utility.MachineName();
                //log.ipaddress = Utility.GetIpaddress().ToString();
                log.ipaddress = "190.2.12.104";
                log.country = "YY";
                log.userId = 2;
                log.requestUrl = "www.ost.in";
                log.IsDeleted = false;

                lg.Save(log);

            }




            var res = Convert<BO.Specialty, Specialty>(speclityDB);
            return (object)res;
        }
        #endregion

        #region Delete
        public override object Delete<T>(T entity)
        {
            BO.Specialty specialtyBO = entity as BO.Specialty;

            Specialty speclityDB = new Specialty();
            speclityDB.id = specialtyBO.ID;
            _dbSet.Remove(_context.Specialties.Single<Specialty>(p => p.id == specialtyBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return specialtyBO;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            BO.Specialty acc_ = Convert<BO.Specialty, Specialty>(_context.Specialties.Where(p => p.id == id && p.IsDeleted == false).FirstOrDefault<Specialty>());
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Specialty.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }
        #endregion

        #region Get By Filter
        public override object Get<T>(T entity)
        {
            var acc_ = _context.Specialties.Where(p => p.IsDeleted == false || p.IsDeleted == null).ToList<Specialty>();
            var accrommtest_ = _context.RoomTests.Where(p => p.IsDeleted == false || p.IsDeleted == null).ToList<RoomTest>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
             //var  accnew_ = acc_.Union(accrommtest_);
            List<BO.Specialty> lstSpecialties = new List<BO.Specialty>();
            foreach (Specialty item in acc_)
            {
                lstSpecialties.Add(Convert<BO.Specialty, Specialty>(item));
            }
            return lstSpecialties;
        }
        #endregion

        #region Get By LocationId
        public override object GetByLocationId(int LocationId)
        {
            List<int> doctorsInLocation = _context.DoctorLocationSchedules.Where(p => p.LocationID == LocationId
                                                                                  && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                          .Select(p => p.DoctorID)
                                                                          .Distinct()
                                                                          .ToList();

            var acc_ = _context.Specialties.Where(p => (p.DoctorSpecialities.Any(p2 => doctorsInLocation.Contains(p2.DoctorID)
                                                                                   && (p2.IsDeleted == false)) == true)
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                           .Distinct()
                                           .ToList();

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Specialty.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.Specialty> SpecialtyBO = new List<BO.Specialty>();

            acc_.ForEach(p => SpecialtyBO.Add(Convert<BO.Specialty, Specialty>(p)));

            return (object)SpecialtyBO;
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
