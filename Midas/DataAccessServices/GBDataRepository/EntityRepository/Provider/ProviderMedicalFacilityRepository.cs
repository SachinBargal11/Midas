using Midas.GreenBill.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GBDataRepository.Model;
using System.Data.Entity;
using BO = Midas.GreenBill.BusinessObject;
using Newtonsoft.Json.Linq;

namespace Midas.GreenBill.EntityRepository
{
    internal class ProviderMedicalFacilityRepository : BaseEntityRepo
    {
        private DbSet<ProviderMedicalFacility> _dbSet;

        #region Constructor
        public ProviderMedicalFacilityRepository(GreenBillsDbEntities context) : base(context)
        {
            _dbSet = context.Set<ProviderMedicalFacility>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            ProviderMedicalFacility providermedicalfacility = entity as ProviderMedicalFacility;
            if (providermedicalfacility == null)
                return default(T);

            BO.ProviderMedicalFacility providermedicalfacilityBO = new BO.ProviderMedicalFacility();

            providermedicalfacilityBO.ID = providermedicalfacility.ID;
            providermedicalfacilityBO.IsDeleted = providermedicalfacility.IsDeleted;
            providermedicalfacilityBO.CreateByUserID = providermedicalfacility.CreateByUserID;
            providermedicalfacilityBO.CreateDate = providermedicalfacility.CreateDate;

            if (providermedicalfacility.Address != null)
            {
                BO.Address boBillingAddress = new BO.Address();
                boBillingAddress.Name = providermedicalfacility.Address.Name;
                boBillingAddress.Address1 = providermedicalfacility.Address.Address1;
                boBillingAddress.Address2 = providermedicalfacility.Address.Address2;
                boBillingAddress.City = providermedicalfacility.Address.City;
                boBillingAddress.State = providermedicalfacility.Address.State;
                boBillingAddress.ZipCode = providermedicalfacility.Address.ZipCode;
                boBillingAddress.Country = providermedicalfacility.Address.Country;
                boBillingAddress.CreateByUserID = providermedicalfacility.Address.CreateByUserID;
                boBillingAddress.CreateDate = providermedicalfacility.Address.CreateDate;
                boBillingAddress.ID = providermedicalfacility.Address.ID;
                providermedicalfacilityBO.BillingAddress = boBillingAddress;
            }

            if (providermedicalfacility.Address1 != null)
            {
                BO.Address boTreatingAddress = new BO.Address();
                boTreatingAddress.Name = providermedicalfacility.Address1.Name;
                boTreatingAddress.Address1 = providermedicalfacility.Address1.Address1;
                boTreatingAddress.Address2 = providermedicalfacility.Address1.Address2;
                boTreatingAddress.City = providermedicalfacility.Address1.City;
                boTreatingAddress.State = providermedicalfacility.Address1.State;
                boTreatingAddress.ZipCode = providermedicalfacility.Address1.ZipCode;
                boTreatingAddress.Country = providermedicalfacility.Address1.Country;
                boTreatingAddress.CreateByUserID = providermedicalfacility.Address1.CreateByUserID;
                boTreatingAddress.CreateDate = providermedicalfacility.Address1.CreateDate;
                boTreatingAddress.ID = providermedicalfacility.Address1.ID;
                providermedicalfacilityBO.TreatingAddress = boTreatingAddress;
            }

            if (providermedicalfacility.ContactInfo != null)
            {
                BO.ContactInfo boBillingContactInfo = new BO.ContactInfo();
                boBillingContactInfo.Name = providermedicalfacility.ContactInfo.Name;
                boBillingContactInfo.CellPhone = providermedicalfacility.ContactInfo.CellPhone;
                boBillingContactInfo.EmailAddress = providermedicalfacility.ContactInfo.EmailAddress;
                boBillingContactInfo.HomePhone = providermedicalfacility.ContactInfo.HomePhone;
                boBillingContactInfo.WorkPhone = providermedicalfacility.ContactInfo.WorkPhone;
                boBillingContactInfo.FaxNo = providermedicalfacility.ContactInfo.FaxNo;
                boBillingContactInfo.CreateByUserID = providermedicalfacility.ContactInfo.CreateByUserID;
                boBillingContactInfo.CreateDate = providermedicalfacility.ContactInfo.CreateDate;
                boBillingContactInfo.ID = providermedicalfacility.ContactInfo.ID;
                providermedicalfacilityBO.BillingContactInfo = boBillingContactInfo;
            }

            if (providermedicalfacility.ContactInfo1 != null)
            {
                BO.ContactInfo boTreatingContactInfo = new BO.ContactInfo();
                boTreatingContactInfo.Name = providermedicalfacility.ContactInfo.Name;
                boTreatingContactInfo.CellPhone = providermedicalfacility.ContactInfo.CellPhone;
                boTreatingContactInfo.EmailAddress = providermedicalfacility.ContactInfo.EmailAddress;
                boTreatingContactInfo.HomePhone = providermedicalfacility.ContactInfo.HomePhone;
                boTreatingContactInfo.WorkPhone = providermedicalfacility.ContactInfo.WorkPhone;
                boTreatingContactInfo.FaxNo = providermedicalfacility.ContactInfo.FaxNo;
                boTreatingContactInfo.CreateByUserID = providermedicalfacility.ContactInfo.CreateByUserID;
                boTreatingContactInfo.CreateDate = providermedicalfacility.ContactInfo.CreateDate;
                boTreatingContactInfo.ID = providermedicalfacility.ContactInfo.ID;
                providermedicalfacilityBO.TreatingContactInfo = boTreatingContactInfo;
            }

            if (providermedicalfacility.Provider != null)
            {
                BO.Provider boProvider = new BO.Provider();

                boProvider.ID = providermedicalfacility.Provider.ID;
                boProvider.NPI = providermedicalfacility.Provider.NPI;
                boProvider.FederalTaxId = providermedicalfacility.Provider.FederalTaxId;
                boProvider.Prefix = providermedicalfacility.Provider.Prefix;
                providermedicalfacilityBO.Provider = boProvider;
            }

            if (providermedicalfacility.MedicalFacility != null)
            {
                BO.MedicalFacility boMedicalFacility = new BO.MedicalFacility();

                boMedicalFacility.ID = providermedicalfacility.MedicalFacility.ID;
                boMedicalFacility.Name = providermedicalfacility.MedicalFacility.Name;
                boMedicalFacility.Prefix = providermedicalfacility.MedicalFacility.Prefix;
                boMedicalFacility.DefaultAttorneyUserID = providermedicalfacility.MedicalFacility.DefaultAttorneyUserID;
                boMedicalFacility.CreateByUserID = providermedicalfacility.MedicalFacility.CreateByUserID;
                providermedicalfacilityBO.CreateDate = providermedicalfacility.MedicalFacility.CreateDate;
                providermedicalfacilityBO.MedicalFacility = boMedicalFacility;
            }


            return (T)(object)providermedicalfacilityBO;
        }
        #endregion


        #region Save Data
        public override object Save(JObject data)
        {
            #region Business Objects
            BO.Address BillingAddressBO= data["billingaddress"].ToObject<BO.Address>();
            BO.Address TreatingAddressBO = data["treatingaddress"].ToObject<BO.Address>();
            BO.ContactInfo BillingContactInfoBO = data["billingcontactinfo"].ToObject<BO.ContactInfo>();
            BO.ContactInfo TreatingContactInfoBO = data["treatingcontactinfo"].ToObject<BO.ContactInfo>();
            BO.Provider ProviderBO = data["provider"].ToObject<BO.Provider>();
            BO.MedicalFacility MedicalFacilityBO = data["medicalfacility"].ToObject<BO.MedicalFacility>();
            BO.ProviderMedicalFacility ProviderMedicalFacilityBO = data["providermedicalfacility"].ToObject<BO.ProviderMedicalFacility>();
            #endregion

            #region Database Objects
            Provider providerDB = new Provider();
            Address billingAddressDB = new Address();
            Address treatingAddressDB = new Address();
            ContactInfo billingContactInfoDB = new ContactInfo();
            ContactInfo treatingContactInfoDB = new ContactInfo();
            MedicalFacility medicalFacilityDB = new MedicalFacility();
            ProviderMedicalFacility providermedicalFacilityDB = new ProviderMedicalFacility();
            #endregion

            providermedicalFacilityDB.ID = ProviderMedicalFacilityBO.ID;

            billingAddressDB.ID = BillingAddressBO.ID;
            billingAddressDB.Name = BillingAddressBO.Name;
            billingAddressDB.Address1 = BillingAddressBO.Address1;
            billingAddressDB.Address2 = BillingAddressBO.Address2;
            billingAddressDB.City = BillingAddressBO.City;
            billingAddressDB.State = BillingAddressBO.State;
            billingAddressDB.ZipCode = BillingAddressBO.ZipCode;
            billingAddressDB.Country = BillingAddressBO.Country;

            treatingAddressDB.ID = TreatingAddressBO.ID;
            treatingAddressDB.Name = TreatingAddressBO.Name;
            treatingAddressDB.Address1 = TreatingAddressBO.Address1;
            treatingAddressDB.Address2 = TreatingAddressBO.Address2;
            treatingAddressDB.City = TreatingAddressBO.City;
            treatingAddressDB.State = TreatingAddressBO.State;
            treatingAddressDB.ZipCode = TreatingAddressBO.ZipCode;
            treatingAddressDB.Country = TreatingAddressBO.Country;

            billingContactInfoDB.ID = BillingContactInfoBO.ID;
            billingContactInfoDB.Name = BillingContactInfoBO.Name;
            billingContactInfoDB.CellPhone = BillingContactInfoBO.CellPhone;
            billingContactInfoDB.EmailAddress = BillingContactInfoBO.EmailAddress;
            billingContactInfoDB.HomePhone = BillingContactInfoBO.HomePhone;
            billingContactInfoDB.WorkPhone = BillingContactInfoBO.WorkPhone;
            billingContactInfoDB.FaxNo = BillingContactInfoBO.FaxNo;

            treatingContactInfoDB.ID = TreatingContactInfoBO.ID;
            treatingContactInfoDB.Name = TreatingContactInfoBO.Name;
            treatingContactInfoDB.CellPhone = TreatingContactInfoBO.CellPhone;
            treatingContactInfoDB.EmailAddress = TreatingContactInfoBO.EmailAddress;
            treatingContactInfoDB.HomePhone = TreatingContactInfoBO.HomePhone;
            treatingContactInfoDB.WorkPhone = TreatingContactInfoBO.WorkPhone;
            treatingContactInfoDB.FaxNo = TreatingContactInfoBO.FaxNo;

            providermedicalFacilityDB.Address = billingAddressDB;
            providermedicalFacilityDB.Address1= treatingAddressDB;

            providermedicalFacilityDB.ContactInfo = billingContactInfoDB;
            providermedicalFacilityDB.ContactInfo1 = treatingContactInfoDB;

            //Find Provider
            Provider provider = _context.Providers.Where(p => p.Name == ProviderBO.Name).FirstOrDefault<Provider>();
            if (provider != null)
                providermedicalFacilityDB.ProviderID = provider.ID;

            //Find Medical Facility
            MedicalFacility medicalfacility = _context.MedicalFacilities.Where(p => p.Name == MedicalFacilityBO.Name).FirstOrDefault<MedicalFacility>();
            if (medicalfacility != null)
                providermedicalFacilityDB.MedicalFacilityID = medicalfacility.ID;


            if (providermedicalFacilityDB.ID > 0)
            {
                //Find medicalFacility By ID
                ProviderMedicalFacility usr = _context.ProviderMedicalFacilities.Include("Address").Include("ContactInfo").Include("Address1").Include("ContactInfo1").Include("MedicalFacility").Include("Provider").Where(p => p.ID == providermedicalFacilityDB.ID).FirstOrDefault<ProviderMedicalFacility>();

                if (usr != null)
                {
                    usr.Address.CreateByUserID = usr.Address.CreateByUserID;
                    usr.Address.CreateDate = usr.Address.CreateDate;
                    usr.Address.UpdateByUserID = TreatingContactInfoBO.UpdateByUserID;
                    usr.Address.UpdateDate = DateTime.UtcNow;
                    usr.Address.Name = BillingAddressBO.Name;
                    usr.Address.Address1 = BillingAddressBO.Address1;
                    usr.Address.Address2 = BillingAddressBO.Address2;
                    usr.Address.City = BillingAddressBO.City;
                    usr.Address.State = BillingAddressBO.State;
                    usr.Address.ZipCode = BillingAddressBO.ZipCode;
                    usr.Address.Country = BillingAddressBO.Country;

                    usr.Address1.CreateByUserID = usr.Address1.CreateByUserID;
                    usr.Address1.CreateDate = usr.Address1.CreateDate;
                    usr.Address1.UpdateByUserID = TreatingContactInfoBO.UpdateByUserID;
                    usr.Address1.UpdateDate = DateTime.UtcNow;
                    usr.Address1.Name = TreatingAddressBO.Name;
                    usr.Address1.Address1 = TreatingAddressBO.Address1;
                    usr.Address1.Address2 = TreatingAddressBO.Address2;
                    usr.Address1.City = TreatingAddressBO.City;
                    usr.Address1.State = TreatingAddressBO.State;
                    usr.Address1.ZipCode = TreatingAddressBO.ZipCode;
                    usr.Address1.Country = TreatingAddressBO.Country;

                    usr.ContactInfo.CreateByUserID = usr.ContactInfo.CreateByUserID;
                    usr.ContactInfo.CreateDate = usr.ContactInfo.CreateDate;
                    usr.ContactInfo.UpdateByUserID = TreatingContactInfoBO.UpdateByUserID;
                    usr.ContactInfo.UpdateDate = DateTime.UtcNow;
                    usr.ContactInfo.Name = BillingContactInfoBO.Name;
                    usr.ContactInfo.CellPhone = BillingContactInfoBO.CellPhone;
                    usr.ContactInfo.EmailAddress = BillingContactInfoBO.EmailAddress;
                    usr.ContactInfo.HomePhone = BillingContactInfoBO.HomePhone;
                    usr.ContactInfo.WorkPhone = BillingContactInfoBO.WorkPhone;
                    usr.ContactInfo.FaxNo = BillingContactInfoBO.FaxNo;

                    usr.ContactInfo1.CreateByUserID = usr.ContactInfo1.CreateByUserID;
                    usr.ContactInfo1.CreateDate = usr.ContactInfo1.CreateDate;
                    usr.ContactInfo1.UpdateByUserID = TreatingContactInfoBO.UpdateByUserID;
                    usr.ContactInfo1.UpdateDate = DateTime.UtcNow;
                    usr.ContactInfo1.Name = TreatingContactInfoBO.Name;
                    usr.ContactInfo1.CellPhone = TreatingContactInfoBO.CellPhone;
                    usr.ContactInfo1.EmailAddress = TreatingContactInfoBO.EmailAddress;
                    usr.ContactInfo1.HomePhone = TreatingContactInfoBO.HomePhone;
                    usr.ContactInfo1.WorkPhone = TreatingContactInfoBO.WorkPhone;
                    usr.ContactInfo1.FaxNo = TreatingContactInfoBO.FaxNo;

                    usr.UpdateDate = DateTime.UtcNow;
                    usr.UpdateByUserID = TreatingContactInfoBO.UpdateByUserID;
                }
                _context.Entry(usr).State = System.Data.Entity.EntityState.Modified;
                providermedicalFacilityDB = usr;
            }
            else
            {
                providermedicalFacilityDB.CreateDate = DateTime.UtcNow;
                providermedicalFacilityDB.CreateByUserID = ProviderMedicalFacilityBO.CreateByUserID;

                providermedicalFacilityDB.Address.CreateDate = DateTime.UtcNow;
                providermedicalFacilityDB.Address.CreateByUserID = ProviderMedicalFacilityBO.CreateByUserID;

                providermedicalFacilityDB.Address1.CreateDate = DateTime.UtcNow;
                providermedicalFacilityDB.Address1.CreateByUserID = ProviderMedicalFacilityBO.CreateByUserID;

                providermedicalFacilityDB.ContactInfo.CreateDate = DateTime.UtcNow;
                providermedicalFacilityDB.ContactInfo.CreateByUserID = ProviderMedicalFacilityBO.CreateByUserID;

                providermedicalFacilityDB.ContactInfo1.CreateDate = DateTime.UtcNow;
                providermedicalFacilityDB.ContactInfo1.CreateByUserID = ProviderMedicalFacilityBO.CreateByUserID;

                _dbSet.Add(providermedicalFacilityDB);
            }

            _context.SaveChanges();

            BO.ProviderMedicalFacility acc_ = Convert<BO.ProviderMedicalFacility, ProviderMedicalFacility>(providermedicalFacilityDB);
            var res = (BO.GbObject)(object)acc_;
            return (object)res;
        }
        #endregion

        #region Get ProviderMedicalFacility By ID
        public override T Get<T>(T entity)
        {
            BO.ProviderMedicalFacility acc_ = Convert<BO.ProviderMedicalFacility, ProviderMedicalFacility>(_context.ProviderMedicalFacilities.Include("Address").Include("ContactInfo").Include("Address1").Include("ContactInfo1").Include("MedicalFacility").Include("Provider").Where(p => p.ID == ((BO.GbObject)(object)entity).ID).FirstOrDefault<ProviderMedicalFacility>());
            return (T)(object)acc_;
        }
        #endregion


        //#region Get Provider By Name
        //public override List<T> Get<T>(T entity, string name)
        //{
        //    List<EntitySearchParameter> searchParameters = new List<EntitySearchParameter>();
        //    EntitySearchParameter param = new EntitySearchParameter();
        //    param.name = name;
        //    searchParameters.Add(param);

        //    return Get<T>(entity, searchParameters);
        //}
        //#endregion

        //#region Get Provider By Search Parameters
        //public override List<T> Get<T>(T entity, List<EntitySearchParameter> searchParameters)
        //{
        //    Dictionary<Type, String> filterMap = new Dictionary<Type, string>();
        //    filterMap.Add(typeof(BO.Provider), "");
        //    IQueryable<Provider> query = EntitySearch.CreateSearchQuery<Provider>(_context.Providers, searchParameters, filterMap);
        //    List<Provider> contactinfoes = query.ToList<Provider>();
        //    List<T> boProvider = new List<T>();
        //    contactinfoes.ForEach(t => boProvider.Add(Convert<T, Provider>(t)));
        //    return boProvider;
        //}
        //#endregion
    }
}
