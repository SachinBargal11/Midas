#region Imports
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using GBDataRepository.Model;
using BO = Midas.GreenBill.BusinessObject;
using Midas.Common;
using Midas.GreenBill.EN;
using System.Web.Script.Serialization;
using Newtonsoft.Json.Linq;
#endregion

namespace Midas.GreenBill.EntityRepository
{
    internal class DoctorRepository : BaseEntityRepo
    {
        private DbSet<Doctor> _dbSet;

        #region Constructor
        public DoctorRepository(GreenBillsDbEntities context) : base(context)
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

            BO.Doctor boDoctor = new BO.Doctor();

            boDoctor.LicenseNumber = doctor.LicenseNumber;
            boDoctor.ID = doctor.ID;
            boDoctor.WCBAuthorization = doctor.WCBAuthorization;
            boDoctor.WcbRatingCode = doctor.WcbRatingCode;
            boDoctor.NPI = doctor.NPI;
            boDoctor.FederalTaxId = doctor.FederalTaxId;
            boDoctor.TaxType = (BO.GBEnums.TaxType)doctor.TaxType;
            boDoctor.AssignNumber = doctor.AssignNumber;
            boDoctor.Title = doctor.Title;
            boDoctor.CreateByUserID = doctor.CreateByUserID;
            boDoctor.CreateDate = doctor.CreateDate;

            if (doctor.IsDeleted.HasValue)
                boDoctor.IsDeleted = System.Convert.ToBoolean(doctor.IsDeleted.Value);
            if (doctor.UpdateByUserID.HasValue)
                boDoctor.UpdateByUserID = doctor.UpdateByUserID.Value;
            if (doctor.UpdateDate.HasValue)
                boDoctor.UpdateDate = doctor.UpdateDate.Value;

            if (doctor.User != null)
            {
                BO.User boUser = new BO.User();
                boUser.UserName = doctor.User.UserName;
                boUser.ID = doctor.User.ID;
                boUser.FirstName = doctor.User.FirstName;
                boUser.LastName = doctor.User.LastName;
                boUser.ImageLink = doctor.User.ImageLink;
                boUser.UserType = (BO.GBEnums.UserType)doctor.User.UserType;
                boUser.Gender = (BO.GBEnums.Gender)doctor.User.UserType;
                boUser.CreateByUserID = doctor.User.CreateByUserID;
                boUser.CreateDate = doctor.User.CreateDate;
                boDoctor.DoctorUser = boUser;
            }

            return (T)(object)boDoctor;
        }
        #endregion

        #region Delete
        public override Object Delete<T>(T entity)
        {
            BO.Doctor doctorBO = entity as BO.Doctor;

            Doctor doctorDB = new Doctor();
            doctorDB.ID = doctorDB.ID;
            _dbSet.Remove(_context.Doctors.Single<Doctor>(p => p.ID == doctorDB.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return doctorDB;
        }
        #endregion

        #region Save Data
        public override Object Save(JObject data)
        {
            BO.Address addressBO;
            BO.ContactInfo contactinfoBO;

            BO.User userBO = data["user"].ToObject<BO.User>();
            BO.Doctor doctorBO = data["doctor"].ToObject<BO.Doctor>();

            addressBO = data["address"] == null ? new BO.Address() : data["address"].ToObject<BO.Address>();
            contactinfoBO = data["contactinfo"] == null ? new BO.ContactInfo() : data["contactinfo"].ToObject<BO.ContactInfo>();

            User userDB = new User();
            Address addressDB = new Address();
            ContactInfo contactinfoDB = new ContactInfo();
            Doctor doctorDB = new Doctor();

            if (userDB.ID != 0)
                if (_context.Users.Any(o => o.UserName == userBO.UserName))
                {
                    return new BO.GbObject { Message = Constants.UserAlreadyExists };
                }

            #region Doctor
            doctorDB.LicenseNumber = doctorBO.LicenseNumber;
            doctorDB.ID = doctorBO.ID;
            doctorDB.WCBAuthorization = doctorBO.WCBAuthorization;
            doctorDB.WcbRatingCode = doctorBO.WcbRatingCode;
            doctorDB.NPI = doctorBO.NPI;
            doctorDB.FederalTaxId = doctorBO.FederalTaxId;
            doctorDB.TaxType = System.Convert.ToByte(doctorBO.TaxType);
            doctorDB.AssignNumber = doctorBO.AssignNumber;
            doctorDB.Title = doctorBO.Title;
            #endregion

            #region Address
            addressDB.ID = addressBO.ID;
            addressDB.Name = addressBO.Name;
            addressDB.Address1 = addressBO.Address1;
            addressDB.Address2 = addressBO.Address2;
            addressDB.City = addressBO.City;
            addressDB.State = addressBO.State;
            addressDB.ZipCode = addressBO.ZipCode;
            addressDB.Country = addressBO.Country;
            #endregion

            #region Contact Info
            contactinfoDB.ID = contactinfoBO.ID;
            contactinfoDB.Name = contactinfoBO.Name;
            contactinfoDB.CellPhone = contactinfoBO.CellPhone;
            contactinfoDB.EmailAddress = contactinfoBO.EmailAddress;
            contactinfoDB.HomePhone = contactinfoBO.HomePhone;
            contactinfoDB.WorkPhone = contactinfoBO.WorkPhone;
            contactinfoDB.FaxNo = contactinfoBO.FaxNo;
            contactinfoDB.IsDeleted = contactinfoBO.IsDeleted;
            #endregion

            #region User
            userDB.UserName = userBO.UserName;
            userDB.FirstName = userBO.FirstName;
            userDB.LastName = userBO.LastName;
            userDB.ID = userBO.ID;
            userDB.Gender = System.Convert.ToByte(userBO.Gender);
            userDB.UserType = System.Convert.ToByte(userBO.UserType);
            userDB.ImageLink = userBO.ImageLink;
            if (userBO.DateOfBirth.HasValue)
                userDB.DateOfBirth = userBO.DateOfBirth.Value;
            userDB.Password = userBO.Password;

            if (userBO.IsDeleted.HasValue)
                userDB.IsDeleted = userBO.IsDeleted.Value;

            userDB.Address = addressDB;
            userDB.ContactInfo = contactinfoDB;
            doctorDB.User = userDB;
            #endregion

            if (doctorDB.ID > 0)
            {
                //Find Doctor By ID
                Doctor doctor = doctorDB.ID > 0 ? _context.Doctors.Include("User").Where(p => p.ID == doctorDB.ID).FirstOrDefault<Doctor>() : _context.Doctors.Include("User").Where(p => p.ID == doctorDB.ID).FirstOrDefault<Doctor>();

                if (doctor != null)
                {
                    #region Doctor
                    if (userBO.UpdateByUserID.HasValue)
                        doctor.UpdateByUserID = userBO.UpdateByUserID.Value;
                    doctor.UpdateDate = DateTime.UtcNow;
                    doctor.IsDeleted = userBO.IsDeleted;

                    doctor.LicenseNumber = doctorBO.LicenseNumber;
                    doctor.ID = doctorBO.ID;
                    doctor.WCBAuthorization = doctorBO.WCBAuthorization;
                    doctor.WcbRatingCode = doctorBO.WcbRatingCode;
                    doctor.NPI = doctorBO.NPI;
                    doctor.FederalTaxId = doctorBO.FederalTaxId;
                    doctor.TaxType = System.Convert.ToByte(doctorBO.TaxType);
                    doctor.AssignNumber = doctorBO.AssignNumber;
                    doctor.Title = doctorBO.Title;

                    doctor.User.UserName = userBO.UserName;
                    doctor.User.FirstName = userBO.FirstName;
                    doctor.User.LastName = userBO.LastName;
                    doctor.User.Gender = System.Convert.ToByte(userBO.Gender);
                    doctor.User.UserType = System.Convert.ToByte(userBO.UserType);
                    doctor.User.ImageLink = userBO.ImageLink;
                    doctor.User.DateOfBirth = userBO.DateOfBirth;
                    doctor.User.Password = userBO.Password;
                    doctor.User.IsDeleted = userBO.IsDeleted;
                    #endregion

                    User usr = _context.Users.Include("Address").Include("Account").Include("ContactInfo").Where(p => p.ID == doctor.DoctorID).FirstOrDefault<User>();
                    #region Address
                    usr.Address.CreateByUserID = doctor.CreateByUserID;
                    usr.Address.CreateDate = doctor.CreateDate;
                    if (userBO.UpdateByUserID.HasValue)
                        usr.Address.UpdateByUserID = userBO.UpdateByUserID.Value;
                    usr.Address.UpdateDate = DateTime.UtcNow;
                    usr.Address.Name = addressBO.Name;
                    usr.Address.Address1 = addressBO.Address1;
                    usr.Address.Address2 = addressBO.Address2;
                    usr.Address.City = addressBO.City;
                    usr.Address.State = addressBO.State;
                    usr.Address.ZipCode = addressBO.ZipCode;
                    usr.Address.Country = addressBO.Country;
                    #endregion

                    #region Contact Info
                    usr.ContactInfo.CreateByUserID = doctor.CreateByUserID;
                    usr.ContactInfo.CreateDate = doctor.CreateDate;
                    if (userBO.UpdateByUserID.HasValue)
                        usr.ContactInfo.UpdateByUserID = userBO.UpdateByUserID.Value;
                    usr.ContactInfo.UpdateDate = DateTime.UtcNow;
                    usr.ContactInfo.Name = contactinfoBO.Name;
                    usr.ContactInfo.CellPhone = contactinfoBO.CellPhone;
                    usr.ContactInfo.EmailAddress = contactinfoBO.EmailAddress;
                    usr.ContactInfo.HomePhone = contactinfoBO.HomePhone;
                    usr.ContactInfo.WorkPhone = contactinfoBO.WorkPhone;
                    usr.ContactInfo.FaxNo = contactinfoBO.FaxNo;
                    #endregion

                }
                else
                {
                    throw new GbException();
                }
                _context.Entry(doctor).State = System.Data.Entity.EntityState.Modified;
                doctorDB = doctor;
            }
            else
            {
                userDB.CreateDate = DateTime.UtcNow;
                userDB.CreateByUserID = userBO.CreateByUserID;

                addressDB.CreateDate = DateTime.UtcNow;
                addressDB.CreateByUserID = userBO.CreateByUserID;

                contactinfoDB.CreateDate = DateTime.UtcNow;
                contactinfoDB.CreateByUserID = userBO.CreateByUserID;

                doctorDB.CreateDate = DateTime.UtcNow;
                doctorDB.CreateByUserID = userBO.CreateByUserID;

                _dbSet.Add(doctorDB);
            }

            _context.SaveChanges();
            BO.Doctor acc_ = Convert<BO.Doctor, Doctor>(doctorDB);
            try
            {
                #region Send Email
                string Message = "Dear " + userBO.FirstName + "," + Environment.NewLine + "Your user name is:- " + userBO.UserName + "" + Environment.NewLine + "Password:-" + userDB.Password + Environment.NewLine + "Thanks";
                Utility.SendEmail(Message, "User registered", userBO.UserName);
                acc_.Message = "Mail sent";
                #endregion
            }
            catch (Exception ex)
            {
                acc_.Message = "Unable to send email.";

            }
            var res = (BO.GbObject)(object)acc_;
            return (object)res;
        }
        #endregion

        #region Get Doctor By ID
        public override Object Get(int id)
        {
            BO.Doctor acc_ = Convert<BO.Doctor, Doctor>(_context.Doctors.Include("User").Where(p => p.ID == id).FirstOrDefault<Doctor>());
            return (object)acc_;
        }
        #endregion

        #region Login
        public override Object Login(JObject entity)
        {
            BO.User userBO = entity["user"].ToObject<BO.User>();
            string Pass = userBO.Password;
            dynamic data = _context.Users.Include("Account").Where(x => x.UserName == userBO.UserName && x.Password == Pass).FirstOrDefault();
            BO.User acc_ = Convert<BO.User, User>(data);

            //return acc_ != null ? (object)acc_ : new BO.GbObject { Message = Constants.InvalidCredentials };
            return acc_;
        }
        #endregion

        //#region Get User By Name
        //public override Object Get(JObject entity, string name)
        //{
        //    List<EntitySearchParameter> searchParameters = new List<EntitySearchParameter>();
        //    EntitySearchParameter param = new EntitySearchParameter();
        //    param.name = name;
        //    searchParameters.Add(param);

        //    return Get<T>(entity, searchParameters);
        //}
        //#endregion

        #region Get User By Search Parameters
        public override Object Get(JObject data)
        {
            List<BO.Doctor> userBO;
            userBO = data != null ? (data["doctor"] != null ? data["doctor"].ToObject<List<BO.Doctor>>() : new List<BO.Doctor>()) : new List<BO.Doctor>();

            List<EntitySearchParameter> searchParameters = new List<EntityRepository.EntitySearchParameter>();
            foreach (BO.Doctor item in userBO)
            {
                EntitySearchParameter param = new EntityRepository.EntitySearchParameter();
                param.id = item.ID;
                searchParameters.Add(param);
            }


            Dictionary<Type, String> filterMap = new Dictionary<Type, string>();
            filterMap.Add(typeof(BO.Doctor), "");
            IQueryable<Doctor> query = EntitySearch.CreateSearchQuery<Doctor>(_context.Doctors, searchParameters, filterMap);
            List<Doctor> Users = query.ToList<Doctor>();

            return (object)Users;
        }
        #endregion
    }
}
