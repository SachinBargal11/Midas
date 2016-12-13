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
    internal class DoctorSpecialityRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<DoctorSpeciality> _dbSet;

        #region Constructor
        public DoctorSpecialityRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<DoctorSpeciality>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            DoctorSpeciality doctorspecility = entity as DoctorSpeciality;

            if (doctorspecility == null)
                return default(T);

            BO.DoctorSpeciality doctorspecilityBO = new BO.DoctorSpeciality();

            doctorspecilityBO.IsDeleted = doctorspecility.IsDeleted;
            if (doctorspecilityBO.UpdateByUserID.HasValue)
                doctorspecilityBO.UpdateByUserID = doctorspecility.UpdateByUserID.Value;

            BO.Doctor boDoctor = new BO.Doctor();
            using (DoctorRepository sr = new DoctorRepository(_context))
            {
                boDoctor = sr.Convert<BO.Doctor, Doctor>(doctorspecility.Doctor);
                doctorspecilityBO.Doctor = boDoctor;
            }

            BO.Specialty boSpecliality = new BO.Specialty();
            using (SpecialityRepository sr = new SpecialityRepository(_context))
            {
                boSpecliality = sr.Convert<BO.Specialty, Specialty>(doctorspecility.Specialty);
                doctorspecilityBO.Specialty = boSpecliality;
            }

            return (T)(object)doctorspecilityBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.DoctorSpeciality doctor = (BO.DoctorSpeciality)(object)entity;
            var result = doctor.Validate(doctor);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.DoctorSpeciality doctorSpecialityBO = (BO.DoctorSpeciality)(object)entity;

            DoctorSpeciality doctorSpecilityDB = null;
            Doctor doctorDB = null;
            Specialty specilityDB = null;
            if (doctorSpecialityBO.Specialties.Count() > 0)
            {
                foreach (int item in doctorSpecialityBO.Specialties)
                {
                    doctorDB = new Doctor();
                    specilityDB = new Specialty();
                    doctorSpecilityDB = new DoctorSpeciality();
                    #region Doctor
                    doctorSpecilityDB.IsDeleted = doctorSpecialityBO.IsDeleted.HasValue ? doctorSpecialityBO.IsDeleted.Value : false;
                    #endregion
                    //Find existsing record
                    DoctorSpeciality doctor_ = _context.DoctorSpecialities.Where(p => (p.DoctorID == doctorSpecialityBO.Doctor.ID) && (p.SpecialityID == item)).FirstOrDefault<DoctorSpeciality>();
                    if (doctor_ != null)
                        return new BO.ErrorObject { ErrorMessage = "Record already exists for this doctor and specility " + item .ToString()+ ".", errorObject = "", ErrorLevel = ErrorLevel.Error };

                    //Find Record By ID
                    Doctor doctor = _context.Doctors.Include("User").Where(p => p.id == doctorSpecialityBO.Doctor.ID).FirstOrDefault<Doctor>();
                    if (doctor == null)
                        return new BO.ErrorObject { ErrorMessage = "Invalid doctor details.", errorObject = "", ErrorLevel = ErrorLevel.Error };

                    doctorSpecilityDB.Doctor = doctor;
                    _context.Entry(doctor).State = System.Data.Entity.EntityState.Modified;

                    //Find Record By ID
                    Specialty speclity = _context.Specialties.Where(p => p.id == item).FirstOrDefault<Specialty>();
                    if (speclity == null)
                        return new BO.ErrorObject { ErrorMessage = "Invalid specility " + item .ToString()+ " details.", errorObject = "", ErrorLevel = ErrorLevel.Error };

                    doctorSpecilityDB.Specialty = speclity;
                    _context.Entry(speclity).State = System.Data.Entity.EntityState.Modified;


                    if (doctorSpecilityDB.id > 0)
                    {

                        //Find Doctor By ID
                        doctor_ = _context.DoctorSpecialities.Where(p => p.id == doctorSpecilityDB.id).FirstOrDefault<DoctorSpeciality>();

                        if (doctor_ != null)
                        {
                            #region Doctor
                            doctor_.id = doctorSpecialityBO.Doctor.ID;
                            doctorSpecilityDB.IsDeleted = doctorSpecialityBO.IsDeleted.HasValue ? doctorSpecialityBO.IsDeleted.Value : false;
                            doctor.UpdateDate = doctorSpecialityBO.UpdateDate;
                            doctor.UpdateByUserID = doctorSpecialityBO.UpdateByUserID;
                            #endregion

                            _context.Entry(doctor).State = System.Data.Entity.EntityState.Modified;
                        }

                    }
                    else
                    {
                        doctorSpecilityDB.CreateDate = doctorSpecialityBO.CreateDate;
                        doctorSpecilityDB.CreateByUserID = doctorSpecialityBO.CreateByUserID;

                        _dbSet.Add(doctorSpecilityDB);
                    }
                }
            }
            _context.SaveChanges();

            var res = Convert<BO.DoctorSpeciality, DoctorSpeciality>(doctorSpecilityDB);
            return (object)res;
        }
        #endregion

        #region Delete
        public override object Delete<T>(T entity)
        {
            BO.DoctorSpeciality doctorBO = entity as BO.DoctorSpeciality;

            DoctorSpeciality doctorDB = new DoctorSpeciality();
            doctorDB.id = doctorBO.ID;
            _dbSet.Remove(_context.DoctorSpecialities.Single<DoctorSpeciality>(p => p.id == doctorBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return doctorBO;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            BO.DoctorSpeciality acc_ = Convert<BO.DoctorSpeciality, DoctorSpeciality>(_context.DoctorSpecialities.Where(p => p.id == id && p.IsDeleted == false).FirstOrDefault<DoctorSpeciality>());
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
            var acc_ = _context.DoctorSpecialities.Where(p => p.IsDeleted == false || p.IsDeleted == null).ToList<DoctorSpeciality>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.DoctorSpeciality> lstDoctors = new List<BO.DoctorSpeciality>();
            foreach (DoctorSpeciality item in acc_)
            {
                lstDoctors.Add(Convert<BO.DoctorSpeciality, DoctorSpeciality>(item));
            }
            return lstDoctors;
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
