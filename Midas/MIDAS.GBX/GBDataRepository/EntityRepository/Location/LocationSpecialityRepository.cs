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
    internal class LocationSpecialityRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<LocationSpeciality> _dbSet;

        #region Constructor
        public LocationSpecialityRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<LocationSpeciality>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            LocationSpeciality Locationspecility = entity as LocationSpeciality;

            if (Locationspecility == null)
                return default(T);

            BO.LocationSpeciality LocationspecilityBO = new BO.LocationSpeciality();

            LocationspecilityBO.IsDeleted = Locationspecility.IsDeleted;
            if (LocationspecilityBO.UpdateByUserID.HasValue)
                LocationspecilityBO.UpdateByUserID = Locationspecility.UpdateByUserID.Value;

            BO.Location boLocation = new BO.Location();
            using (LocationRepository sr = new LocationRepository(_context))
            {
                boLocation = sr.Convert<BO.Location, Location>(Locationspecility.Location);
                LocationspecilityBO.location = boLocation;
            }

            BO.Specialty boSpecliality = new BO.Specialty();
            using (SpecialityRepository sr = new SpecialityRepository(_context))
            {
                boSpecliality = sr.Convert<BO.Specialty, Specialty>(Locationspecility.Specialty);
                LocationspecilityBO.Specialty = boSpecliality;
            }

            return (T)(object)LocationspecilityBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.LocationSpeciality Location = (BO.LocationSpeciality)(object)entity;
            var result = Location.Validate(Location);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.LocationSpeciality LocationSpecialityBO = (BO.LocationSpeciality)(object)entity;

            LocationSpeciality LocationSpecilityDB = null;
            Location LocationDB = null;
            Specialty specilityDB = null;
            if (LocationSpecialityBO.Specialties.Count() > 0)
            {
                foreach (int item in LocationSpecialityBO.Specialties)
                {
                    LocationDB = new Location();
                    specilityDB = new Specialty();
                    LocationSpecilityDB = new LocationSpeciality();
                    #region Location
                    LocationSpecilityDB.IsDeleted = LocationSpecialityBO.IsDeleted.HasValue ? LocationSpecialityBO.IsDeleted.Value : false;
                    #endregion
                    //Find existsing record
                    LocationSpeciality Location_ = _context.LocationSpecialities.Where(p => (p.LocationID == LocationSpecialityBO.location.ID) && (p.SpecialityID == item)).FirstOrDefault<LocationSpeciality>();
                    if (Location_ != null)
                        return new BO.ErrorObject { ErrorMessage = "Record already exists for this Location and specility " + item.ToString() + ".", errorObject = "", ErrorLevel = ErrorLevel.Error };

                    //Find Record By ID
                    Location Location = _context.Locations.Include("User").Where(p => p.id == LocationSpecialityBO.location.ID).FirstOrDefault<Location>();
                    if (Location == null)
                        return new BO.ErrorObject { ErrorMessage = "Invalid Location details.", errorObject = "", ErrorLevel = ErrorLevel.Error };

                    LocationSpecilityDB.Location = Location;
                    _context.Entry(Location).State = System.Data.Entity.EntityState.Modified;

                    //Find Record By ID
                    Specialty speclity = _context.Specialties.Where(p => p.id == item).FirstOrDefault<Specialty>();
                    if (speclity == null)
                        return new BO.ErrorObject { ErrorMessage = "Invalid specility " + item.ToString() + " details.", errorObject = "", ErrorLevel = ErrorLevel.Error };

                    LocationSpecilityDB.Specialty = speclity;
                    _context.Entry(speclity).State = System.Data.Entity.EntityState.Modified;


                    if (LocationSpecilityDB.id > 0)
                    {

                        //Find Location By ID
                        Location_ = _context.LocationSpecialities.Where(p => p.id == LocationSpecilityDB.id).FirstOrDefault<LocationSpeciality>();

                        if (Location_ != null)
                        {
                            #region Location
                            Location_.id = LocationSpecialityBO.location.ID;
                            LocationSpecilityDB.IsDeleted = LocationSpecialityBO.IsDeleted.HasValue ? LocationSpecialityBO.IsDeleted.Value : false;
                            Location.UpdateDate = LocationSpecialityBO.UpdateDate;
                            Location.UpdateByUserID = LocationSpecialityBO.UpdateByUserID;
                            #endregion

                            _context.Entry(Location).State = System.Data.Entity.EntityState.Modified;
                        }

                    }
                    else
                    {
                        LocationSpecilityDB.CreateDate = LocationSpecialityBO.CreateDate;
                        LocationSpecilityDB.CreateByUserID = LocationSpecialityBO.CreateByUserID;

                        _dbSet.Add(LocationSpecilityDB);
                    }
                }
            }
            _context.SaveChanges();

            var res = Convert<BO.LocationSpeciality, LocationSpeciality>(LocationSpecilityDB);
            return (object)res;
        }
        #endregion

        #region Delete
        public override object Delete<T>(T entity)
        {
            BO.LocationSpeciality LocationBO = entity as BO.LocationSpeciality;

            LocationSpeciality LocationDB = new LocationSpeciality();
            LocationDB.id = LocationBO.ID;
            _dbSet.Remove(_context.LocationSpecialities.Single<LocationSpeciality>(p => p.id == LocationBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return LocationBO;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            BO.LocationSpeciality acc_ = Convert<BO.LocationSpeciality, LocationSpeciality>(_context.LocationSpecialities.Where(p => p.id == id && p.IsDeleted == false).FirstOrDefault<LocationSpeciality>());
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
            var acc_ = _context.LocationSpecialities.Where(p => p.IsDeleted == false || p.IsDeleted == null).ToList<LocationSpeciality>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.LocationSpeciality> lstLocations = new List<BO.LocationSpeciality>();
            foreach (LocationSpeciality item in acc_)
            {
                lstLocations.Add(Convert<BO.LocationSpeciality, LocationSpeciality>(item));
            }
            return lstLocations;
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
