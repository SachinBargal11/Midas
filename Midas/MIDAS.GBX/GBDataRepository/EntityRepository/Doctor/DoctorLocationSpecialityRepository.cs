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
    internal class DoctorLocationSpecialityRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<DoctorLocationSpecialty> _dbSet;

        #region Constructor
        public DoctorLocationSpecialityRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<DoctorLocationSpecialty>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            DoctorLocationSpecialty doctorlocationspeciality= entity as DoctorLocationSpecialty;

            if (doctorlocationspeciality == null)
                return default(T);

            BO.DoctorLocationSpeciality doctorlocationspecialityBO = new BO.DoctorLocationSpeciality();

            doctorlocationspecialityBO.ID = doctorlocationspeciality.Id;
            if (doctorlocationspecialityBO.IsDeleted.HasValue)
                doctorlocationspecialityBO.IsDeleted = doctorlocationspeciality.IsDeleted.Value;
            if (doctorlocationspeciality.UpdateByUserID.HasValue)
                doctorlocationspecialityBO.UpdateByUserID = doctorlocationspeciality.UpdateByUserID.Value;

            BO.Doctor boDoctor = new BO.Doctor();
            using (DoctorRepository cmp = new DoctorRepository(_context))
            {
                boDoctor = cmp.ObjectConvert<BO.Doctor, Doctor>(doctorlocationspeciality.Doctor);

                if (boDoctor != null && doctorlocationspeciality.Doctor != null && doctorlocationspeciality.Doctor.User != null)
                {
                    using (UserRepository userRep = new UserRepository(_context))
                    {
                        boDoctor.user = userRep.Convert<BO.User, User>(doctorlocationspeciality.Doctor.User);
                    }
                }

                doctorlocationspecialityBO.doctor = boDoctor;
            }

            BO.Location boLocation = new BO.Location();
            using (LocationRepository cmp = new LocationRepository(_context))
            {
                boLocation = cmp.Convert<BO.Location, Location>(doctorlocationspeciality.Location);
                doctorlocationspecialityBO.location = boLocation;
            }

            BO.Specialty boSpeciality = new BO.Specialty();
            using (SpecialityRepository cmp = new SpecialityRepository(_context))
            {
                boSpeciality = cmp.Convert<BO.Specialty, Specialty>(doctorlocationspeciality.Specialty);
                doctorlocationspecialityBO.speciality = boSpeciality;
            }

            return (T)(object)doctorlocationspecialityBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            if (entity is List<BO.DoctorLocationSpeciality>)
            {
                List<BO.DoctorLocationSpeciality> lstdoctorlocationspeciality = (List<BO.DoctorLocationSpeciality>)(object)entity;
                   //var result = lstdoctorlocationspeciality.Validate(lstdoctorlocationspeciality);
                List<MIDAS.GBX.BusinessObjects.BusinessValidation> result = new List<BO.BusinessValidation>();
                return result;
            }
            else
            {
                BO.DoctorLocationSpeciality doctorlocationspeciality = (BO.DoctorLocationSpeciality)(object)entity;
                var result = doctorlocationspeciality.Validate(doctorlocationspeciality);
                return result;
            }
        }
        #endregion

        #region Associate Location To Doctors
        public override object AssociateLocationToDoctors<T>(T entity)
        {
            List<BO.DoctorLocationSpeciality> lstDoctorLocationSpecialityBO = (List<BO.DoctorLocationSpeciality>)(object)entity;

            if (lstDoctorLocationSpecialityBO == null || (lstDoctorLocationSpecialityBO != null && lstDoctorLocationSpecialityBO.Count == 0))
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid info.", ErrorLevel = ErrorLevel.Error };
            }

            List<DoctorLocationSpecialty> lstDoctorLocationScheduleDB = new List<DoctorLocationSpecialty>();

            List<int> forLocationIds = lstDoctorLocationSpecialityBO.Select(p => p.location.ID).Distinct().ToList<int>();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                foreach (var eachDoctorLocationSpecialityBO in lstDoctorLocationSpecialityBO)
                {
                    int? LocationId = null, DoctorId = null, SpecialityId = null;

                    if (eachDoctorLocationSpecialityBO.location != null)
                    {
                        LocationId = eachDoctorLocationSpecialityBO.location.ID;
                    }
                    if (eachDoctorLocationSpecialityBO.doctor != null)
                    {
                        DoctorId = eachDoctorLocationSpecialityBO.doctor.ID;
                    }
                    if (eachDoctorLocationSpecialityBO.speciality != null)
                    {
                        SpecialityId = eachDoctorLocationSpecialityBO.speciality.ID;
                    }

                    if (LocationId.HasValue == false || (LocationId.HasValue == true && LocationId.Value <= 0))
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Location Id.", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        bool ExistsLocation = _context.Locations.Any(p => p.id == LocationId.Value
                                                                 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)));

                        if (ExistsLocation == false)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass existing Location Id.", ErrorLevel = ErrorLevel.Error };
                        }
                    }

                    if (DoctorId.HasValue == false || (DoctorId.HasValue == true && DoctorId.Value <= 0))
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Doctor Id.", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        bool ExistsDoctor = _context.Doctors.Any(p => p.Id == DoctorId.Value
                                                                 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)));

                        if (ExistsDoctor == false)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass existing Doctor Id.", ErrorLevel = ErrorLevel.Error };
                        }
                    }

                    if (SpecialityId.HasValue == false || (SpecialityId.HasValue == true && SpecialityId.Value <= 0))
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Speciality Id.", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        bool ExistsSpeciality= _context.Specialties.Any(p => p.id == SpecialityId.Value
                                                               && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)));

                        if (ExistsSpeciality == false)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass existing Speciality Id.", ErrorLevel = ErrorLevel.Error };
                        }
                    }

                    DoctorLocationSpecialty doctorLocationSpecialityDB = _context.DoctorLocationSpecialties.Where(p => p.LocationId == LocationId.Value && p.DoctorId == DoctorId.Value
                                                                                                              && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<DoctorLocationSpecialty>();

                    if (doctorLocationSpecialityDB != null)
                    {
                        doctorLocationSpecialityDB.SpecialtyId = SpecialityId.Value;
                    }
                    else
                    {
                        doctorLocationSpecialityDB = new DoctorLocationSpecialty();
                        doctorLocationSpecialityDB.LocationId = LocationId.Value;
                        doctorLocationSpecialityDB.DoctorId = DoctorId.Value;
                        doctorLocationSpecialityDB.SpecialtyId = SpecialityId.Value;

                        _context.DoctorLocationSpecialties.Add(doctorLocationSpecialityDB);
                    }

                    _context.SaveChanges();
                }

                dbContextTransaction.Commit();

                lstDoctorLocationScheduleDB = _context.DoctorLocationSpecialties.Include("Doctor")
                                                                              .Include("Location")
                                                                              .Include("Specialty")
                                                                              .Where(p => forLocationIds.Contains(p.LocationId)
                                                                                          && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                  .ToList<DoctorLocationSpecialty>();
            }

            List<BO.DoctorLocationSpeciality> res = new List<BO.DoctorLocationSpeciality>();
            lstDoctorLocationScheduleDB.ForEach(p => res.Add(Convert<BO.DoctorLocationSpeciality, DoctorLocationSpecialty>(p)));

            return (object)res;
        }
        #endregion

        #region Associate Doctor To Locations 
        public override object AssociateDoctorToLocations<T>(T entity)
        {
            List<BO.DoctorLocationSpeciality> lstDoctorLocationSpecialityBO = (List<BO.DoctorLocationSpeciality>)(object)entity;

            if (lstDoctorLocationSpecialityBO == null || (lstDoctorLocationSpecialityBO != null && lstDoctorLocationSpecialityBO.Count == 0))
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid info.", ErrorLevel = ErrorLevel.Error };
            }

            List<DoctorLocationSpecialty> lstDoctorLocationSpecialityDB = new List<DoctorLocationSpecialty>();

            List<int> forDoctorIds = lstDoctorLocationSpecialityBO.Select(p => p.doctor.ID).Distinct().ToList<int>();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                foreach (var eachDoctorLocationSpecialityBO in lstDoctorLocationSpecialityBO)
                {
                    int? LocationId = null, DoctorId = null, SpecialityId = null;

                    if (eachDoctorLocationSpecialityBO.location != null)
                    {
                        LocationId = eachDoctorLocationSpecialityBO.location.ID;
                    }
                    if (eachDoctorLocationSpecialityBO.doctor != null)
                    {
                        DoctorId = eachDoctorLocationSpecialityBO.doctor.ID;
                    }
                    if (eachDoctorLocationSpecialityBO.speciality != null)
                    {
                        SpecialityId = eachDoctorLocationSpecialityBO.speciality.ID;
                    }

                    if (LocationId.HasValue == false || (LocationId.HasValue == true && LocationId.Value <= 0))
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Location Id.", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        bool ExistsLocation = _context.Locations.Any(p => p.id == LocationId.Value
                                                                 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)));

                        if (ExistsLocation == false)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass existing Location Id.", ErrorLevel = ErrorLevel.Error };
                        }
                    }

                    if (DoctorId.HasValue == false || (DoctorId.HasValue == true && DoctorId.Value <= 0))
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Doctor Id.", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        bool ExistsDoctor = _context.Doctors.Any(p => p.Id == DoctorId.Value
                                                                 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)));

                        if (ExistsDoctor == false)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass existing Doctor Id.", ErrorLevel = ErrorLevel.Error };
                        }
                    }

                    if (SpecialityId.HasValue == false || (SpecialityId.HasValue == true && SpecialityId.Value <= 0))
                    {
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Speciality Id.", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        bool ExistsSpeciality= _context.Schedules.Any(p => p.id == SpecialityId.Value
                                                               && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)));

                        if (ExistsSpeciality == false)
                        {
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass existing Speciality Id.", ErrorLevel = ErrorLevel.Error };
                        }
                    }

                    DoctorLocationSpecialty doctorLocationSpecialityDB = _context.DoctorLocationSpecialties.Where(p => p.LocationId == LocationId.Value && p.DoctorId == DoctorId.Value
                                                                                                              && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<DoctorLocationSpecialty>();

                    if (doctorLocationSpecialityDB != null)
                    {
                        doctorLocationSpecialityDB.SpecialtyId = SpecialityId.Value;
                    }
                    else
                    {
                        doctorLocationSpecialityDB = new DoctorLocationSpecialty();
                        doctorLocationSpecialityDB.LocationId = LocationId.Value;
                        doctorLocationSpecialityDB.DoctorId = DoctorId.Value;
                        doctorLocationSpecialityDB.SpecialtyId = SpecialityId.Value;

                        _context.DoctorLocationSpecialties.Add(doctorLocationSpecialityDB);
                    }

                    _context.SaveChanges();
                }

                dbContextTransaction.Commit();

                lstDoctorLocationSpecialityDB = _context.DoctorLocationSpecialties.Include("Doctor")
                                                                              .Include("Location")
                                                                              .Include("Specialty")
                                                                              .Where(p => forDoctorIds.Contains(p.DoctorId)
                                                                                          && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                  .ToList<DoctorLocationSpecialty>();
            }

            List<BO.DoctorLocationSpeciality> res = new List<BO.DoctorLocationSpeciality>();
            lstDoctorLocationSpecialityDB.ForEach(p => res.Add(Convert<BO.DoctorLocationSpeciality, DoctorLocationSpecialty>(p)));

            return (object)res;
        }
        #endregion
               
        #region Get By ID
        public override object Get(int id)
        {
            BO.DoctorLocationSpeciality acc_ = Convert<BO.DoctorLocationSpeciality, DoctorLocationSpecialty>(_context.DoctorLocationSpecialties.Include("Doctor").Include("Location").Include("Specialty").Where(p => p.Id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<DoctorLocationSpecialty>());
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this DoctorLocationSpeciality.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }
        #endregion
                
        #region Get By Location Id
        public override object GetByLocationId(int id)
        {
            List<BO.DoctorLocationSpeciality> lstDoctorLocationSpeciality = new List<BO.DoctorLocationSpeciality>();

            var acc_ = _context.DoctorLocationSpecialties.Include("Doctor").Include("Doctor.User")
                                                       .Include("Location").Include("Location.AddressInfo").Include("Location.ContactInfo")
                                                       .Include("Specialty")
                                                       .Where(p => p.LocationId == id && (p.IsDeleted == false || p.IsDeleted == null)).ToList<DoctorLocationSpecialty>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                foreach (DoctorLocationSpecialty item in acc_)
                {
                    lstDoctorLocationSpeciality.Add(Convert<BO.DoctorLocationSpeciality, DoctorLocationSpecialty>(item));
                }

                return lstDoctorLocationSpeciality;
            }
        }
        #endregion

        #region Get By Doctor Id
        public override object GetByDoctorId(int id)
        {
            List<BO.DoctorLocationSpeciality> lstDoctorLocationSpeciality = new List<BO.DoctorLocationSpeciality>();

            var acc_ = _context.DoctorLocationSpecialties.Include("Doctor").Include("Doctor.User")
                                                       .Include("Location").Include("Location.AddressInfo").Include("Location.ContactInfo")
                                                       .Include("Specialty")
                                                       .Where(p => p.DoctorId == id && (p.IsDeleted == false || p.IsDeleted == null)).ToList<DoctorLocationSpecialty>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                foreach (DoctorLocationSpecialty item in acc_)
                {
                    lstDoctorLocationSpeciality.Add(Convert<BO.DoctorLocationSpeciality, DoctorLocationSpecialty>(item));
                }

                return lstDoctorLocationSpeciality;
            }
        }
        #endregion

        #region Get By Location Id and Doctor Id
        public override object Get(int locationId, int doctorId)
        {
            List<BO.DoctorLocationSpeciality> lstDoctorLocationSpeciality = new List<BO.DoctorLocationSpeciality>();

            var acc_ = _context.DoctorLocationSpecialties.Include("Doctor").Include("Doctor.User")
                                                       .Include("Location").Include("Location.AddressInfo").Include("Location.ContactInfo")
                                                       .Include("Specialty").Where(p => (p.LocationId == locationId && p.DoctorId == doctorId) && (p.IsDeleted == false || p.IsDeleted == null)).ToList<DoctorLocationSpecialty>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                foreach (DoctorLocationSpecialty item in acc_)
                {
                    lstDoctorLocationSpeciality.Add(Convert<BO.DoctorLocationSpeciality, DoctorLocationSpecialty>(item));
                }

                return lstDoctorLocationSpeciality;
            }
        }
        #endregion


        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
