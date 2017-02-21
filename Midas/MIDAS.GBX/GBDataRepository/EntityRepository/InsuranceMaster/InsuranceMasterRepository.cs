using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    class InsuranceMasterRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<InsuranceMaster> _dbSet;
       
        #region Constructor
        public InsuranceMasterRepository(MIDASGBXEntities context)
            : base(context)
        {

            _dbSet = context.Set<InsuranceMaster>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            List<InsuranceMaster> insuranceMaster = entity as List<InsuranceMaster>;

            if (insuranceMaster == null)
                return default(T);

            List<BO.InsuranceMaster> boInsuranceMasters = new List<BO.InsuranceMaster>();
            foreach (var eachInsuranceMaster in insuranceMaster)
            {
                BO.InsuranceMaster boInsuranceMaster = new BO.InsuranceMaster();

                boInsuranceMaster.ID = eachInsuranceMaster.Id;
                boInsuranceMaster.CompanyCode = eachInsuranceMaster.CompanyCode;
                boInsuranceMaster.CompanyName = eachInsuranceMaster.CompanyName;
                boInsuranceMaster.AddressInfoId = eachInsuranceMaster.AddressInfoId;
                boInsuranceMaster.ContactInfoId = eachInsuranceMaster.ContactInfoId;


                //if (eachInsuranceMaster.IsDeleted.HasValue)
                //    boInsuranceMaster.IsDeleted = eachInsuranceMaster.IsDeleted.Value;

                if (eachInsuranceMaster.AddressInfo != null)
                {
                    BO.AddressInfo boAddress = new BO.AddressInfo();
                    boAddress.Name = eachInsuranceMaster.AddressInfo.Name;
                    boAddress.Address1 = eachInsuranceMaster.AddressInfo.Address1;
                    boAddress.Address2 = eachInsuranceMaster.AddressInfo.Address2;
                    boAddress.City = eachInsuranceMaster.AddressInfo.City;
                    boAddress.State = eachInsuranceMaster.AddressInfo.State;
                    boAddress.ZipCode = eachInsuranceMaster.AddressInfo.ZipCode;
                    boAddress.Country = eachInsuranceMaster.AddressInfo.Country;
                    boAddress.CreateByUserID = eachInsuranceMaster.AddressInfo.CreateByUserID;
                    boAddress.ID = eachInsuranceMaster.AddressInfo.id;
                    boInsuranceMaster.AddressInfo = boAddress;
                }

                if (eachInsuranceMaster.ContactInfo != null)
                {
                    BO.ContactInfo boContactInfo = new BO.ContactInfo();
                    boContactInfo.Name = eachInsuranceMaster.ContactInfo.Name;
                    boContactInfo.CellPhone = eachInsuranceMaster.ContactInfo.CellPhone;
                    boContactInfo.EmailAddress = eachInsuranceMaster.ContactInfo.EmailAddress;
                    boContactInfo.HomePhone = eachInsuranceMaster.ContactInfo.HomePhone;
                    boContactInfo.WorkPhone = eachInsuranceMaster.ContactInfo.WorkPhone;
                    boContactInfo.FaxNo = eachInsuranceMaster.ContactInfo.FaxNo;
                    boContactInfo.CreateByUserID = eachInsuranceMaster.ContactInfo.CreateByUserID;
                    boContactInfo.ID = eachInsuranceMaster.ContactInfo.id;
                    boInsuranceMaster.ContactInfo = boContactInfo;
                }

                boInsuranceMaster.IsDeleted = eachInsuranceMaster.IsDeleted;
                boInsuranceMaster.CreateByUserID = eachInsuranceMaster.CreateByUserID;
                boInsuranceMaster.UpdateByUserID = eachInsuranceMaster.UpdateByUserID;

                boInsuranceMasters.Add(boInsuranceMaster);
            }

            return (T)(object)boInsuranceMasters;
        }
        #endregion

        #region Entity Conversion
        public override T ObjectConvert<T, U>(U entity)
        {
            InsuranceMaster insuranceMaster = entity as InsuranceMaster;

            if (insuranceMaster == null)
                return default(T);

            BO.InsuranceMaster boInsuranceMaster = new BO.InsuranceMaster();

            boInsuranceMaster.ID = insuranceMaster.Id;
            boInsuranceMaster.CompanyCode = insuranceMaster.CompanyCode;
            boInsuranceMaster.CompanyName = insuranceMaster.CompanyName;
            boInsuranceMaster.AddressInfoId = insuranceMaster.AddressInfoId;
            boInsuranceMaster.ContactInfoId = insuranceMaster.ContactInfoId;

            //if (insuranceMaster.IsDeleted.HasValue)
            //    boInsuranceMaster.IsDeleted = insuranceMaster.IsDeleted.Value;

            if (insuranceMaster.AddressInfo != null)
            {
                BO.AddressInfo boAddress = new BO.AddressInfo();
                boAddress.Name = insuranceMaster.AddressInfo.Name;
                boAddress.Address1 = insuranceMaster.AddressInfo.Address1;
                boAddress.Address2 = insuranceMaster.AddressInfo.Address2;
                boAddress.City = insuranceMaster.AddressInfo.City;
                boAddress.State = insuranceMaster.AddressInfo.State;
                boAddress.ZipCode = insuranceMaster.AddressInfo.ZipCode;
                boAddress.Country = insuranceMaster.AddressInfo.Country;
                boAddress.CreateByUserID = insuranceMaster.AddressInfo.CreateByUserID;
                boAddress.ID = insuranceMaster.AddressInfo.id;
                boInsuranceMaster.AddressInfo = boAddress;
            }

            if (insuranceMaster.ContactInfo != null)
            {
                BO.ContactInfo boContactInfo = new BO.ContactInfo();
                boContactInfo.Name = insuranceMaster.ContactInfo.Name;
                boContactInfo.CellPhone = insuranceMaster.ContactInfo.CellPhone;
                boContactInfo.EmailAddress = insuranceMaster.ContactInfo.EmailAddress;
                boContactInfo.HomePhone = insuranceMaster.ContactInfo.HomePhone;
                boContactInfo.WorkPhone = insuranceMaster.ContactInfo.WorkPhone;
                boContactInfo.FaxNo = insuranceMaster.ContactInfo.FaxNo;
                boContactInfo.CreateByUserID = insuranceMaster.ContactInfo.CreateByUserID;
                boContactInfo.ID = insuranceMaster.ContactInfo.id;
                boInsuranceMaster.ContactInfo = boContactInfo;
            }

            boInsuranceMaster.IsDeleted = insuranceMaster.IsDeleted;
            boInsuranceMaster.CreateByUserID = insuranceMaster.CreateByUserID;
            boInsuranceMaster.UpdateByUserID = insuranceMaster.UpdateByUserID;

            return (T)(object)boInsuranceMaster;
        }
        #endregion


        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.InsuranceMaster insuranceMaster = (BO.InsuranceMaster)(object)entity;
            var result = insuranceMaster.Validate(insuranceMaster);
            return result;
        }
        #endregion

        #region Get All Insurance Master
        public override Object Get()
        {
            var acc = _context.InsuranceMasters.Include("addressInfo").Include("contactInfo").Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)).ToList<InsuranceMaster>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No Insurance Master info found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.InsuranceMaster> acc_ = Convert<List<BO.InsuranceMaster>, List<InsuranceMaster>>(acc);
                return (object)acc_;
            }
        }
        #endregion

        #region Get By Id 
        public override object Get(int id)
        {

            var acc = _context.InsuranceMasters.Include("addressInfo").Include("contactInfo").Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<InsuranceMaster>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Insurance Master Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                BO.InsuranceMaster acc_ = ObjectConvert<BO.InsuranceMaster, InsuranceMaster>(acc);
                return (object)acc_;
            }
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
