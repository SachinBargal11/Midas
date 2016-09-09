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
    internal class MedicalFacilityRepository : BaseEntityRepo
    {
        private DbSet<MedicalFacility> _dbSet;

        #region Constructor
        public MedicalFacilityRepository(GreenBillsDbEntities context) : base(context)
        {
            _dbSet = context.Set<MedicalFacility>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            MedicalFacility medicalfacility = entity as MedicalFacility;
            if (medicalfacility == null)
                return default(T);

            BO.MedicalFacility boMedicalFacility = new BO.MedicalFacility();

            boMedicalFacility.ID = medicalfacility.ID;
            boMedicalFacility.Name = medicalfacility.Name;
            boMedicalFacility.Prefix = medicalfacility.Prefix;
            boMedicalFacility.DefaultAttorneyUserID = medicalfacility.DefaultAttorneyUserID.Value;
            boMedicalFacility.CreateByUserID = medicalfacility.CreateByUserID;
            boMedicalFacility.CreateDate = medicalfacility.CreateDate;

            if (medicalfacility.Address != null)
            {
                BO.Address boAddress = new BO.Address();
                boAddress.Name = medicalfacility.Address.Name;
                boAddress.Address1 = medicalfacility.Address.Address1;
                boAddress.Address2 = medicalfacility.Address.Address2;
                boAddress.City = medicalfacility.Address.City;
                boAddress.State = medicalfacility.Address.State;
                boAddress.ZipCode = medicalfacility.Address.ZipCode;
                boAddress.Country = medicalfacility.Address.Country;
                boAddress.CreateByUserID = medicalfacility.Address.CreateByUserID;
                boAddress.CreateDate = medicalfacility.Address.CreateDate;
                boAddress.ID = medicalfacility.Address.ID;
                boMedicalFacility.Address = boAddress;
            }

            if (medicalfacility.ContactInfo != null)
            {
                BO.ContactInfo boContactInfo = new BO.ContactInfo();
                boContactInfo.Name = medicalfacility.ContactInfo.Name;
                boContactInfo.CellPhone = medicalfacility.ContactInfo.CellPhone;
                boContactInfo.EmailAddress = medicalfacility.ContactInfo.EmailAddress;
                boContactInfo.HomePhone = medicalfacility.ContactInfo.HomePhone;
                boContactInfo.WorkPhone = medicalfacility.ContactInfo.WorkPhone;
                boContactInfo.FaxNo = medicalfacility.ContactInfo.FaxNo;
                boContactInfo.CreateByUserID = medicalfacility.ContactInfo.CreateByUserID;
                boContactInfo.CreateDate = medicalfacility.ContactInfo.CreateDate;
                boContactInfo.ID = medicalfacility.ContactInfo.ID;
                boMedicalFacility.ContactInfo = boContactInfo;
            }

            if (medicalfacility.Account != null)
            {
                BO.Account boAccount = new BO.Account();
                boAccount.Name = medicalfacility.Account.Name;
                boAccount.Status = (BO.GBEnums.AccountStatus)medicalfacility.Account.Status;
                boAccount.CreateByUserID = medicalfacility.Account.CreateByUserID;
                boAccount.CreateDate = medicalfacility.Account.CreateDate;
                boAccount.ID = medicalfacility.Account.ID;
                boMedicalFacility.Account = boAccount;
            }

                return (T)(object)boMedicalFacility;
        }
        #endregion

        #region Delete
        public override Object Delete<T>(T entity)
        {
            BO.MedicalFacility contactinfoBO = entity as BO.MedicalFacility;

            MedicalFacility contactinfoDB = new MedicalFacility();
            contactinfoDB.ID = contactinfoBO.ID;
            _dbSet.Remove(_context.MedicalFacilities.Single<MedicalFacility>(p => p.ID == contactinfoBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return contactinfoDB;
        }
        #endregion

        #region Save Data
        public override object Save(JObject data)
        {
            BO.Account accountBO = data["account"].ToObject<BO.Account>();
            BO.Address addressBO = data["address"]==null?new BO.Address(): data["address"].ToObject<BO.Address>();
            BO.ContactInfo contactinfoBO = data["contactinfo"] == null ? new BO.ContactInfo() : data["contactinfo"].ToObject<BO.ContactInfo>();
            BO.User userBO = data["user"].ToObject<BO.User>();
            BO.MedicalFacility medfacilityBO = data["medicalfacility"].ToObject<BO.MedicalFacility>();

            Account accountDB = new Account();
            User userDB = new User();
            Address addressDB = new Address();
            ContactInfo contactinfoDB = new ContactInfo();
            MedicalFacility medfacilityDB = new MedicalFacility();

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
            #endregion

            #region Medical Facility
            medfacilityDB.ID = medfacilityBO.ID;
            medfacilityDB.Name = medfacilityBO.Name;
            medfacilityDB.Prefix = medfacilityBO.Prefix;
            medfacilityDB.IsDeleted = medfacilityBO.IsDeleted;
            #endregion

            medfacilityDB.Address = addressDB;
            medfacilityDB.ContactInfo = contactinfoDB;

            //Find Account
            Account acct = _context.Accounts.Where(p => p.ID == accountBO.ID).FirstOrDefault<Account>();
            if (acct != null)
                medfacilityDB.AccountID = acct.ID;
            else
                throw new GbException("Invalid account.Please check account detail.");

            //Find Default Attorney
            User user = _context.Users.Where(p => p.ID == userBO.ID).FirstOrDefault<User>();
            if (user != null)
                medfacilityDB.DefaultAttorneyUserID = user.ID;

            if (medfacilityBO.ID > 0)
            {
                //Find Medical Facility By ID
                MedicalFacility usr = _context.MedicalFacilities.Include("Account").Include("Address").Include("User").Include("ContactInfo").Where(p => p.ID == medfacilityBO.ID).FirstOrDefault<MedicalFacility>();

                if (usr != null)
                {
                    #region User
                    medfacilityDB.UpdateByUserID = medfacilityBO.UpdateByUserID;
                    medfacilityDB.UpdateDate = DateTime.UtcNow;
                    medfacilityDB.IsDeleted = medfacilityBO.IsDeleted;
                    medfacilityDB.Name = medfacilityBO.Name;
                    medfacilityDB.Prefix = medfacilityBO.Prefix;
                    medfacilityDB.IsDeleted = medfacilityBO.IsDeleted;
                    #endregion

                    #region Address
                    usr.Address.UpdateByUserID = userBO.UpdateByUserID;
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
                    usr.ContactInfo.UpdateByUserID = userBO.UpdateByUserID;
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
                _context.Entry(usr).State = System.Data.Entity.EntityState.Modified;
                medfacilityDB = usr;
            }
            else
            {
                medfacilityDB.CreateDate = DateTime.UtcNow;
                medfacilityDB.CreateByUserID = userBO.CreateByUserID;

                addressDB.CreateDate = DateTime.UtcNow;
                addressDB.CreateByUserID = userBO.CreateByUserID;

                contactinfoDB.CreateDate = DateTime.UtcNow;
                contactinfoDB.CreateByUserID = userBO.CreateByUserID;

                _dbSet.Add(medfacilityDB);
            }

            _context.SaveChanges();

            BO.MedicalFacility acc_ = Convert<BO.MedicalFacility, MedicalFacility>(medfacilityDB);
            var res = (BO.GbObject)(object)acc_;
            return (object)res;

        }
        #endregion

        #region Get MedicalFacilities By ID
        public override Object Get(int id)
        {
            
            BO.MedicalFacility acc_ = Convert<BO.MedicalFacility, MedicalFacility>(_context.MedicalFacilities.Include("Account").Include("ContactInfo").Include("Address").Include("User").Where(p => p.ID == id).FirstOrDefault<MedicalFacility>());
            return (object)acc_;
        }
        #endregion


        //#region Get MedicalFacilities By Name
        //public override List<T> Get<T>(T entity, string name)
        //{
        //    List<EntitySearchParameter> searchParameters = new List<EntitySearchParameter>();
        //    EntitySearchParameter param = new EntitySearchParameter();
        //    param.name = name;
        //    searchParameters.Add(param);

        //    return Get<T>(entity, searchParameters);
        //}
        //#endregion

        //#region Get MedicalFacilities By Search Parameters
        //public override List<T> Get<T>(T entity, List<EntitySearchParameter> searchParameters)
        //{
        //    Dictionary<Type, String> filterMap = new Dictionary<Type, string>();
        //    filterMap.Add(typeof(BO.MedicalFacility), "");
        //    IQueryable<MedicalFacility> query = EntitySearch.CreateSearchQuery<MedicalFacility>(_context.MedicalFacilities, searchParameters, filterMap);
        //    List<MedicalFacility> contactinfoes = query.ToList<MedicalFacility>();
        //    List<T> boMedicalFacilities = new List<T>();
        //    contactinfoes.ForEach(t => boMedicalFacilities.Add(Convert<T, MedicalFacility>(t)));
        //    return boMedicalFacilities;
        //}
        //#endregion
    }
}
