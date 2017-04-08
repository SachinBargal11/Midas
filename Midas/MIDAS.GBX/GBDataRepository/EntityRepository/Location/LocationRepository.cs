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
    internal class LocationRepository : BaseEntityRepo,IDisposable
    {
        private DbSet<Location> _dbSet;

        #region Constructor
        public LocationRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<Location>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Location location = entity as Location;

            if (location == null)
                return default(T);

            BO.Location locationBO = new BO.Location();

            locationBO.ID = location.id;
            locationBO.Name = location.Name;
            locationBO.IsDefault = location.IsDefault;
            locationBO.LocationType = (BO.GBEnums.LocationType)location.LocationType;
            if (location.IsDeleted.HasValue)
                locationBO.IsDeleted = location.IsDeleted.Value;
            if (location.UpdateByUserID.HasValue)
                locationBO.UpdateByUserID = location.UpdateByUserID.Value;



            if (location.Company != null)
            {
                BO.Company boCompany = new BO.Company();
                boCompany.ID = location.Company.id;
                boCompany.Name = location.Company.Name;
                boCompany.TaxID = location.Company.TaxID;
                boCompany.Status = (BO.GBEnums.AccountStatus)location.Company.Status;
                boCompany.CompanyType = (BO.GBEnums.CompanyType)location.Company.CompanyType;
                boCompany.SubsCriptionType = (BO.GBEnums.SubsCriptionType)location.Company.SubscriptionPlanType;

                locationBO.Company = boCompany;               
            }

                if (location.AddressInfo != null)
            {
                BO.AddressInfo boAddress = new BO.AddressInfo();
                boAddress.Name = location.AddressInfo.Name;
                boAddress.Address1 = location.AddressInfo.Address1;
                boAddress.Address2 = location.AddressInfo.Address2;
                boAddress.City = location.AddressInfo.City;
                boAddress.State = location.AddressInfo.State;
                boAddress.ZipCode = location.AddressInfo.ZipCode;
                boAddress.Country = location.AddressInfo.Country;
                //[STATECODE-CHANGE]
                //boAddress.StateCode = location.AddressInfo.StateCode;
                //[STATECODE-CHANGE]
                boAddress.CreateByUserID = location.AddressInfo.CreateByUserID;
                boAddress.ID = location.AddressInfo.id;
                if (location.AddressInfo.IsDeleted.HasValue)
                    boAddress.IsDeleted = location.AddressInfo.IsDeleted.Value;
                if (location.AddressInfo.UpdateByUserID.HasValue)
                    boAddress.UpdateByUserID = location.AddressInfo.UpdateByUserID.Value;
                locationBO.AddressInfo = boAddress;
            }

            if (location.ContactInfo != null)
            {
                BO.ContactInfo boContactInfo = new BO.ContactInfo();
                boContactInfo.Name = location.ContactInfo.Name;
                boContactInfo.CellPhone = location.ContactInfo.CellPhone;
                boContactInfo.EmailAddress = location.ContactInfo.EmailAddress;
                boContactInfo.HomePhone = location.ContactInfo.HomePhone;
                boContactInfo.WorkPhone = location.ContactInfo.WorkPhone;
                boContactInfo.FaxNo = location.ContactInfo.FaxNo;
                boContactInfo.CreateByUserID = location.ContactInfo.CreateByUserID;
                boContactInfo.ID = location.ContactInfo.id;
                if (location.ContactInfo.IsDeleted.HasValue)
                    boContactInfo.IsDeleted = location.ContactInfo.IsDeleted.Value;
                if (location.ContactInfo.UpdateByUserID.HasValue)
                    boContactInfo.UpdateByUserID = location.ContactInfo.UpdateByUserID.Value;
                locationBO.ContactInfo = boContactInfo;
            }
            BO.Schedule boSchedule = new BO.Schedule();
            using (ScheduleRepository cmp = new ScheduleRepository(_context))
            {
                boSchedule = cmp.Convert<BO.Schedule, Schedule>(location.Schedule);
                // cmp.Save(boSchedule);
                locationBO.Schedule = boSchedule;
            }
            return (T)(object)locationBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.SaveLocation saveLocation = (BO.SaveLocation)(object)entity;
            var result = saveLocation.Validate(saveLocation);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.SaveLocation saveLocationBO = (BO.SaveLocation)(object)entity;

            if (saveLocationBO.location == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Location object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            if (saveLocationBO.location.ID == 0)
            {
                if (saveLocationBO.addressInfo == null)
                {
                    return new BO.ErrorObject { ErrorMessage = "Addressinfo object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
            }
            if (saveLocationBO.location.ID == 0)
            {
                if (saveLocationBO.contactInfo == null)
                {
                    return new BO.ErrorObject { ErrorMessage = "Contactinfo object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
            }
            if (saveLocationBO.location.ID == 0)
            {
             if (saveLocationBO.company == null)
                {
                    return new BO.ErrorObject { ErrorMessage = "Company object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
            }


            BO.Location locationBO = saveLocationBO.location;
            BO.Company companyBO = saveLocationBO.company;
            BO.AddressInfo addressBO = saveLocationBO.addressInfo;
            BO.ContactInfo contactinfoBO = saveLocationBO.contactInfo;

            Location locationDB = new Location();
            Company companyDB = new Company();
            User userDB = new User();
            AddressInfo addressDB = new AddressInfo();
            ContactInfo contactinfoDB = new ContactInfo();

            #region Location
            locationDB.id = locationBO.ID;
            locationDB.Name = locationBO.Name;
            locationDB.LocationType = System.Convert.ToByte(locationBO.LocationType);
            locationDB.IsDefault = locationBO.IsDefault;
            locationDB.IsDeleted = locationBO.IsDeleted.HasValue ? locationBO.IsDeleted : false;
            #endregion

            #region Company
            if (companyBO.ID > 0)
            {
                Company company = _context.Companies.Where(p => p.id == companyBO.ID).FirstOrDefault<Company>();
                if (company != null)
                {
                    locationDB.Company = company;
                    _context.Entry(company).State = System.Data.Entity.EntityState.Modified;
                }
                else
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Company details.", ErrorLevel = ErrorLevel.Error };
            }
            #endregion

            #region Address
            if (addressBO != null)
            {
                addressDB.id = addressBO.ID;
                addressDB.Name = addressBO.Name;
                addressDB.Address1 = addressBO.Address1;
                addressDB.Address2 = addressBO.Address2;
                addressDB.City = addressBO.City;
                addressDB.State = addressBO.State;
                addressDB.ZipCode = addressBO.ZipCode;
                addressDB.Country = addressBO.Country;
                //[STATECODE-CHANGE]
                //addressDB.StateCode = addressBO.StateCode;
                //[STATECODE-CHANGE]
            }
            #endregion

            #region Contact Info

            if (contactinfoBO != null)
            {
                contactinfoDB.id = contactinfoBO.ID;
                contactinfoDB.Name = contactinfoBO.Name;
                contactinfoDB.CellPhone = contactinfoBO.CellPhone;
                contactinfoDB.EmailAddress = contactinfoBO.EmailAddress;
                contactinfoDB.HomePhone = contactinfoBO.HomePhone;
                contactinfoDB.WorkPhone = contactinfoBO.WorkPhone;
                contactinfoDB.FaxNo = contactinfoBO.FaxNo;
                if (contactinfoBO.IsDeleted.HasValue)
                    contactinfoDB.IsDeleted = contactinfoBO.IsDeleted;
            }
            #endregion

            //Added code to get data in AddressInfo and ContactInfo
            locationDB.AddressInfo = addressDB;
            locationDB.ContactInfo = contactinfoDB;

            if (saveLocationBO.schedule != null)
            {
                #region Schedule
                if (saveLocationBO.schedule != null)
                    if (saveLocationBO.schedule.ID > 0)
                    {
                        Schedule schedule = _context.Schedules.Where(p => p.id == saveLocationBO.schedule.ID).FirstOrDefault<Schedule>();
                        if (schedule != null)
                        {
                            locationDB.Schedule = schedule;
                        }
                        else
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Schedule.", ErrorLevel = ErrorLevel.Error };
                    }
                #endregion
            }
            else
            {
                //Default schedule

                Schedule defaultschedule = _context.Schedules.Where(p => p.IsDefault == true).FirstOrDefault<Schedule>();
                if (defaultschedule != null)
                {
                    locationDB.Schedule = defaultschedule;
                }
                else
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please set default schedule in database.", ErrorLevel = ErrorLevel.Error };
            }

            if (locationDB.id > 0)
            {
                //For Update Record
                
                //Find Location By ID
                Location location = _context.Locations.Include("Company").Include("ContactInfo").Include("AddressInfo").Where(p => p.id == locationDB.id).FirstOrDefault<Location>();

                if (location != null)
                {
                    #region Location
                    locationDB.id = locationBO.ID;
                    location.Name = locationBO.Name==null?location.Name:locationBO.Name;
                    location.LocationType = locationBO.LocationType==null? location.LocationType: System.Convert.ToByte(locationBO.LocationType);
                    location.IsDefault = locationBO.IsDefault;
                    location.IsDeleted = locationBO.IsDeleted == null ? locationBO.IsDeleted : locationDB.IsDeleted;
                    location.UpdateDate = locationBO.UpdateDate;
                    location.UpdateByUserID = locationBO.UpdateByUserID;
                    #endregion

                    #region AddressInfo
                    location.AddressInfo.CreateByUserID = location.CreateByUserID;
                    location.AddressInfo.CreateDate = location.CreateDate;
                    if (locationBO.UpdateByUserID.HasValue)
                        location.AddressInfo.UpdateByUserID = locationBO.UpdateByUserID.Value;
                    location.AddressInfo.UpdateDate = DateTime.UtcNow;
                    location.AddressInfo.Name = addressBO.Name;
                    location.AddressInfo.Address1 = addressBO.Address1;
                    location.AddressInfo.Address2 = addressBO.Address2;
                    location.AddressInfo.City = addressBO.City;
                    location.AddressInfo.State = addressBO.State;
                    location.AddressInfo.ZipCode = addressBO.ZipCode;
                    location.AddressInfo.Country = addressBO.Country;
                    //[STATECODE-CHANGE]
                    //location.AddressInfo.StateCode = addressBO.StateCode;
                    //[STATECODE-CHANGE]
                    location.AddressInfo.UpdateDate = addressBO.UpdateDate;
                    location.AddressInfo.UpdateByUserID = addressBO.UpdateByUserID;
                    #endregion

                    #region Contact Info
                    location.ContactInfo.CreateByUserID = location.CreateByUserID;
                    location.ContactInfo.CreateDate = location.CreateDate;
                    if (locationBO.UpdateByUserID.HasValue)
                        location.ContactInfo.UpdateByUserID = locationBO.UpdateByUserID.Value;
                    location.ContactInfo.UpdateDate = DateTime.UtcNow;
                    location.ContactInfo.Name = contactinfoBO.Name;
                    location.ContactInfo.CellPhone = contactinfoBO.CellPhone;
                    location.ContactInfo.EmailAddress = contactinfoBO.EmailAddress;
                    location.ContactInfo.HomePhone = contactinfoBO.HomePhone;
                    location.ContactInfo.WorkPhone = contactinfoBO.WorkPhone;
                    location.ContactInfo.FaxNo = contactinfoBO.FaxNo;
                    location.ContactInfo.UpdateDate = contactinfoBO.UpdateDate;
                    location.ContactInfo.UpdateByUserID = contactinfoBO.UpdateByUserID;
                    #endregion

                    #region Schedule
                    if (saveLocationBO.schedule != null)
                        if (saveLocationBO.schedule.ID > 0)
                        {
                            Schedule schedule = _context.Schedules.Where(p => p.id == saveLocationBO.schedule.ID).FirstOrDefault<Schedule>();
                            if (schedule != null)
                            {
                                location.Schedule = schedule;
                            }
                            else
                                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Schedule.", ErrorLevel = ErrorLevel.Error };
                        }
                    #endregion

                    _context.Entry(location).State = System.Data.Entity.EntityState.Modified;
                }

            }
            else
            {
                locationDB.CreateDate = companyBO.CreateDate;
                locationDB.CreateByUserID = companyBO.CreateByUserID;

                addressDB.CreateDate = companyBO.CreateDate;
                addressDB.CreateByUserID = companyBO.CreateByUserID;

                contactinfoDB.CreateDate = companyBO.CreateDate;
                contactinfoDB.CreateByUserID = companyBO.CreateByUserID;

                locationDB.AddressInfo = addressDB;
                locationDB.ContactInfo = contactinfoDB;
                _dbSet.Add(locationDB);
            }
            _context.SaveChanges();

            var res = Convert<BO.Location, Location>(locationDB);
            return (object)res;
        }
        #endregion

        #region Delete
        public override object Delete<T>(T entity)
        {
            BO.Location locationBO = entity as BO.Location;

            Location locationDB = new Location();
            locationDB.id = locationBO.ID;
            _dbSet.Remove(_context.Locations.Single<Location>(p => p.id == locationBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return locationBO;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            BO.Location acc_ = Convert<BO.Location, Location>(_context.Locations.Include("AddressInfo").Include("ContactInfo").Include("Company").Include("Schedule").Where(p => p.id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<Location>());
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this location.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }
        #endregion

        #region Get By Filter
        public override object Get<T>(T entity)
        {
            List<BO.Location> lstLocations = new List<BO.Location>();
            BO.Location locationBO = (BO.Location)(object)entity;
            if (locationBO != null)
            {
                if (locationBO.Company != null)
                {
                    var acc_ = _context.Locations.Include("AddressInfo").Include("ContactInfo").Include("Company").Include("Schedule").Where(p => (p.IsDeleted == false || p.IsDeleted == null) && (p.CompanyID==locationBO.Company.ID)).ToList<Location>();
                    if (acc_ == null)
                    {
                        return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                    foreach (Location item in acc_)
                    {
                        lstLocations.Add(Convert<BO.Location, Location>(item));
                    }
                }
                else if (locationBO.Name != null)
                {
                    var acc_ = _context.Locations.Include("AddressInfo").Include("ContactInfo").Include("Company").Include("Schedule").Where(p => (p.IsDeleted == false || p.IsDeleted == null) && p.Name == locationBO.Name).ToList<Location>();
                    if (acc_ == null)
                    {
                        return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                    foreach (Location item in acc_)
                    {
                        lstLocations.Add(Convert<BO.Location, Location>(item));
                    }
                }
                else
                {
                    var acc_ = _context.Locations.Include("AddressInfo").Include("ContactInfo").Include("Company").Include("Schedule").Where(p => (p.IsDeleted == false || p.IsDeleted == null)).ToList<Location>();
                    if (acc_ == null)
                    {
                        return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                    foreach (Location item in acc_)
                    {
                        lstLocations.Add(Convert<BO.Location, Location>(item));
                    }
                }
            }
            
            return lstLocations;
        }
        #endregion

        #region Get All Locations and their Companies
        public override Object Get()
        {
            var acc_ = _context.Locations.Include("Company").Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)).ToList<Location>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.Location> lstLocations = new List<BO.Location>();
            foreach (Location item in acc_)
            {
                lstLocations.Add(Convert<BO.Location, Location>(item));
            }
            return lstLocations;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
