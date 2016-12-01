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
    internal class DoctorRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<Doctor> _dbSet;

        #region Constructor
        public DoctorRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<Doctor>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Doctor doctor = entity as Doctor;

            if (doctor == null)
                return default(T);

            BO.Doctor doctorBO = new BO.Doctor();

            doctorBO.ID = doctor.id;
            doctorBO.LicenseNumber = doctor.LicenseNumber;
            doctorBO.WCBAuthorization = doctor.WCBAuthorization;
            doctorBO.WcbRatingCode = doctor.WcbRatingCode;
            doctorBO.NPI = doctor.NPI;
            doctorBO.Title = doctor.Title;
            doctorBO.TaxType = (BO.GBEnums.TaxType)doctor.TaxType;

            if (doctor.IsDeleted.HasValue)
                doctorBO.IsDeleted = doctor.IsDeleted.Value;
            if (doctor.UpdateByUserID.HasValue)
                doctorBO.UpdateByUserID = doctor.UpdateByUserID.Value;
            if (doctor.UpdateDate.HasValue)
                doctorBO.UpdateDate = doctor.UpdateDate.Value;

            BO.User boUser = new BO.User();
            using (UserRepository sr = new UserRepository(_context))
            {
                boUser = sr.Convert<BO.User, User>(doctor.User);
                doctorBO.User = boUser;
            }

            return (T)(object)boUser;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Doctor doctor = (BO.Doctor)(object)entity;
            var result = doctor.Validate(doctor);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.Doctor doctorBO = (BO.Doctor)(object)entity;

            Doctor doctorDB = new Doctor();

            #region Specialty
            doctorDB.id = doctorBO.ID;
            doctorDB.LicenseNumber = doctorBO.LicenseNumber;
            doctorDB.WCBAuthorization = doctorBO.WCBAuthorization;
            doctorDB.WcbRatingCode = doctorBO.WcbRatingCode;
            doctorDB.NPI = doctorBO.NPI;
            doctorDB.Title = doctorBO.Title;
            doctorDB.TaxType = System.Convert.ToByte(doctorBO.TaxType);
            doctorDB.IsDeleted = doctorBO.IsDeleted.HasValue ? doctorBO.IsDeleted : false;
            #endregion


            if (doctorDB.id > 0)
            {

                //Find Doctor By ID
                Doctor doctor = _context.Doctors.Where(p => p.id == doctorDB.id).FirstOrDefault<Doctor>();

                if (doctor != null)
                {
                    #region Doctor
                    doctor.LicenseNumber = doctorBO.LicenseNumber!=null? doctorBO.LicenseNumber: doctor.LicenseNumber;
                    doctor.WCBAuthorization = doctorBO.WCBAuthorization != null ? doctorBO.WCBAuthorization : doctor.WCBAuthorization;
                    doctor.WcbRatingCode = doctorBO.WcbRatingCode != null ? doctorBO.WcbRatingCode : doctor.WcbRatingCode;
                    doctor.NPI = doctorBO.NPI != null ? doctorBO.NPI : doctor.NPI;
                    doctor.Title = doctorBO.Title != null ? doctorBO.Title : doctor.Title;
                    doctor.TaxType = System.Convert.ToByte(doctorBO.TaxType);
                    doctor.IsDeleted = doctorBO.IsDeleted.HasValue ? doctorBO.IsDeleted : false;
                    doctor.UpdateDate = DateTime.UtcNow;
                    doctor.UpdateByUserID = doctorBO.UpdateByUserID;
                    #endregion

                    _context.Entry(doctor).State = System.Data.Entity.EntityState.Modified;
                }

            }
            else
            {
                doctorDB.CreateDate = DateTime.UtcNow;
                doctorDB.CreateByUserID = doctorBO.CreateByUserID;

                _dbSet.Add(doctorDB);
            }
            _context.SaveChanges();

            var res = Convert<BO.Doctor, Doctor>(doctorDB);
            return (object)res;
        }
        #endregion

        #region Delete
        public override object Delete<T>(T entity)
        {
            BO.Doctor doctorBO = entity as BO.Doctor;

            Doctor doctorDB = new Doctor();
            doctorDB.id = doctorBO.ID;
            _dbSet.Remove(_context.Doctors.Single<Doctor>(p => p.id == doctorBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return doctorBO;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            BO.Doctor acc_ = Convert<BO.Doctor, Doctor>(_context.Doctors.Where(p => p.id == id && p.IsDeleted == false).FirstOrDefault<Doctor>());
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
            var acc_ = _context.Doctors.Where(p => p.IsDeleted == false || p.IsDeleted == null).ToList<Doctor>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.Doctor> lstDoctors = new List<BO.Doctor>();
            foreach (Doctor item in acc_)
            {
                lstDoctors.Add(Convert<BO.Doctor, Doctor>(item));
            }
            return lstDoctors;
        }
        #endregion


        public void Dispose()
        {
            Dispose();
            // Use SupressFinalize in case a subclass 
            // of this type implements a finalizer.
            GC.SuppressFinalize(this);
        }
    }
}
