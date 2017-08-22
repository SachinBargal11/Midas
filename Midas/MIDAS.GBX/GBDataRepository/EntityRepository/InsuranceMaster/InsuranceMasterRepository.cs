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
                boInsuranceMaster.ZeusID = eachInsuranceMaster.ZeusID;
                boInsuranceMaster.PriorityBilling = eachInsuranceMaster.PriorityBilling;
                boInsuranceMaster.Only1500Form = eachInsuranceMaster.Only1500Form;
                boInsuranceMaster.PaperAuthorization = eachInsuranceMaster.PaperAuthorization;
                boInsuranceMaster.CreatedByCompanyId = eachInsuranceMaster.CreatedByCompanyId;

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
                    //[STATECODE-CHANGE]
                    //boAddress.StateCode = eachInsuranceMaster.AddressInfo.StateCode;
                    //[STATECODE-CHANGE]
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
                    boContactInfo.OfficeExtension = eachInsuranceMaster.ContactInfo.OfficeExtension;
                    boContactInfo.AlternateEmail = eachInsuranceMaster.ContactInfo.AlternateEmail;
                    boContactInfo.PreferredCommunication = eachInsuranceMaster.ContactInfo.PreferredCommunication;
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
            boInsuranceMaster.ZeusID = insuranceMaster.ZeusID;
            boInsuranceMaster.PriorityBilling = insuranceMaster.PriorityBilling;
            boInsuranceMaster.Only1500Form = insuranceMaster.Only1500Form;
            boInsuranceMaster.PaperAuthorization = insuranceMaster.PaperAuthorization;
            boInsuranceMaster.CreatedByCompanyId = insuranceMaster.CreatedByCompanyId;

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
                boAddress.IsDeleted = insuranceMaster.AddressInfo.IsDeleted;
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
                boContactInfo.OfficeExtension = insuranceMaster.ContactInfo.OfficeExtension;
                boContactInfo.AlternateEmail = insuranceMaster.ContactInfo.AlternateEmail;
                boContactInfo.PreferredCommunication = insuranceMaster.ContactInfo.PreferredCommunication;
                boContactInfo.CreateByUserID = insuranceMaster.ContactInfo.CreateByUserID;
                boContactInfo.ID = insuranceMaster.ContactInfo.id;
                boContactInfo.IsDeleted = insuranceMaster.ContactInfo.IsDeleted;               
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
            var acc = _context.InsuranceMasters.Include("addressInfo").Include("contactInfo")
                                               .Where(p => (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<InsuranceMaster>();
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
        public override Object Get(int id)
        {
            var acc = _context.InsuranceMasters.Include("addressInfo").Include("contactInfo")
                                               .Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .FirstOrDefault();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No Insurance Master info found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                BO.InsuranceMaster acc_ = ObjectConvert<BO.InsuranceMaster, InsuranceMaster>(acc);
                return (object)acc_;
            }
        }
        #endregion

        #region Get Master And By CompanyId
        public override Object GetMasterAndByCompanyId(int CompanyId)
        {
            var acc = _context.InsuranceMasters.Include("addressInfo").Include("contactInfo")
                                               .Where(p => (p.CreatedByCompanyId.HasValue == false || (p.CreatedByCompanyId.HasValue == true && p.CreatedByCompanyId.Value == CompanyId))
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<InsuranceMaster>();
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
        public override object GetInsuranceDetails(int id, int CompanyId)
        {

            var acc = _context.InsuranceMasters.Include("addressInfo").Include("contactInfo")
                                               .Where(p => p.Id == id 
                                                    && (p.CreatedByCompanyId.HasValue == false || (p.CreatedByCompanyId.HasValue == true && p.CreatedByCompanyId.Value == CompanyId))
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .FirstOrDefault<InsuranceMaster>();

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

        #region Delete
        public override object Delete(int id, int CompanyId)
        {

            InsuranceMaster insuranceMasterDB = _context.InsuranceMasters.Include("addressInfo").Include("contactInfo")
                                                                         .Where(p => p.Id == id && p.CreatedByCompanyId.HasValue == true && p.CreatedByCompanyId == CompanyId
                                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                         .FirstOrDefault<InsuranceMaster>();           
            if (insuranceMasterDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this InsuranceMaster.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
           
            insuranceMasterDB.AddressInfo.IsDeleted = true;
            insuranceMasterDB.ContactInfo.IsDeleted = true;
            insuranceMasterDB.IsDeleted = true;
           
            _context.Entry(insuranceMasterDB).State = System.Data.Entity.EntityState.Modified;
            _context.SaveChanges();

            var res = ObjectConvert<BO.InsuranceMaster, InsuranceMaster>(insuranceMasterDB);
            return (object)res;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.InsuranceMaster insuranceMasterBO = (BO.InsuranceMaster)(object)entity;
            BO.AddressInfo addressBO = insuranceMasterBO.AddressInfo;
            BO.ContactInfo contactinfoBO = insuranceMasterBO.ContactInfo;
           
            if (insuranceMasterBO.CreatedByCompanyId.HasValue == true)
            {
                InsuranceMaster insuranceMasterDB = new InsuranceMaster();

                using (var dbContextTransaction = _context.Database.BeginTransaction())
                {

                    bool IsEditMode = false;
                    IsEditMode = (insuranceMasterBO != null && insuranceMasterBO.ID > 0) ? true : false;

                    AddressInfo addressDB = new AddressInfo();
                    ContactInfo contactinfoDB = new ContactInfo();

                    #region Address
                    if (addressBO != null)
                    {
                        bool Add_addressDB = false;
                        addressDB = _context.AddressInfoes.Where(p => p.id == addressBO.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                        if (addressDB == null && addressBO.ID <= 0)
                        {
                            addressDB = new AddressInfo();
                            Add_addressDB = true;
                        }
                        else if (addressDB == null && addressBO.ID > 0)
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Address details dosent exists.", ErrorLevel = ErrorLevel.Error };
                        }

                        addressDB.Name = IsEditMode == true && addressBO.Name == null ? addressDB.Name : addressBO.Name;
                        addressDB.Address1 = IsEditMode == true && addressBO.Address1 == null ? addressDB.Address1 : addressBO.Address1;
                        addressDB.Address2 = IsEditMode == true && addressBO.Address2 == null ? addressDB.Address2 : addressBO.Address2;
                        addressDB.City = IsEditMode == true && addressBO.City == null ? addressDB.City : addressBO.City;
                        addressDB.State = IsEditMode == true && addressBO.State == null ? addressDB.State : addressBO.State;
                        addressDB.ZipCode = IsEditMode == true && addressBO.ZipCode == null ? addressDB.ZipCode : addressBO.ZipCode;
                        addressDB.Country = IsEditMode == true && addressBO.Country == null ? addressDB.Country : addressBO.Country;
                        //[STATECODE-CHANGE]
                        //addressDB.StateCode = IsEditMode == true && addressBO.StateCode == null ? addressDB.StateCode : addressBO.StateCode;
                        //[STATECODE-CHANGE]

                        if (Add_addressDB == true)
                        {
                            addressDB = _context.AddressInfoes.Add(addressDB);
                        }
                        _context.SaveChanges();
                    }
                    else
                    {
                        if (IsEditMode == false)
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid address details.", ErrorLevel = ErrorLevel.Error };
                        }
                        addressDB = null;
                    }
                    #endregion

                    #region Contact Info
                    if (contactinfoBO != null)
                    {
                        bool Add_contactinfoDB = false;
                        contactinfoDB = _context.ContactInfoes.Where(p => p.id == contactinfoBO.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                        if (contactinfoDB == null && contactinfoBO.ID <= 0)
                        {
                            contactinfoDB = new ContactInfo();
                            Add_contactinfoDB = true;
                        }
                        else if (contactinfoDB == null && contactinfoBO.ID > 0)
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Contact details dosent exists.", ErrorLevel = ErrorLevel.Error };
                        }

                        contactinfoDB.Name = IsEditMode == true && contactinfoBO.Name == null ? contactinfoDB.Name : contactinfoBO.Name;
                        contactinfoDB.CellPhone = IsEditMode == true && contactinfoBO.CellPhone == null ? contactinfoDB.CellPhone : contactinfoBO.CellPhone;
                        contactinfoDB.EmailAddress = IsEditMode == true && contactinfoBO.EmailAddress == null ? contactinfoDB.EmailAddress : contactinfoBO.EmailAddress;
                        contactinfoDB.HomePhone = IsEditMode == true && contactinfoBO.HomePhone == null ? contactinfoDB.HomePhone : contactinfoBO.HomePhone;
                        contactinfoDB.WorkPhone = IsEditMode == true && contactinfoBO.WorkPhone == null ? contactinfoDB.WorkPhone : contactinfoBO.WorkPhone;
                        contactinfoDB.FaxNo = IsEditMode == true && contactinfoBO.FaxNo == null ? contactinfoDB.FaxNo : contactinfoBO.FaxNo;
                        contactinfoDB.OfficeExtension = IsEditMode == true && contactinfoBO.OfficeExtension == null ? contactinfoDB.OfficeExtension : contactinfoBO.OfficeExtension;
                        contactinfoDB.AlternateEmail = IsEditMode == true && contactinfoBO.AlternateEmail == null ? contactinfoDB.AlternateEmail : contactinfoBO.AlternateEmail;
                        contactinfoDB.PreferredCommunication = IsEditMode == true && contactinfoBO.PreferredCommunication == null ? contactinfoDB.PreferredCommunication : contactinfoBO.PreferredCommunication;
                        contactinfoDB.IsDeleted = contactinfoBO.IsDeleted;

                        if (Add_contactinfoDB == true)
                        {
                            contactinfoDB = _context.ContactInfoes.Add(contactinfoDB);
                        }
                        _context.SaveChanges();
                    }
                    else
                    {
                        if (IsEditMode == false)
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid contact details.", ErrorLevel = ErrorLevel.Error };
                        }
                        contactinfoDB = null;
                    }
                    #endregion

                    #region Insurance Master
                    if (insuranceMasterBO != null)
                    {


                        bool Add_insuranceMasterDB = false;
                        insuranceMasterDB = _context.InsuranceMasters.Where(p => p.Id == insuranceMasterBO.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<InsuranceMaster>();

                        if (insuranceMasterDB == null && insuranceMasterBO.ID <= 0)
                        {
                            insuranceMasterDB = new InsuranceMaster();
                            Add_insuranceMasterDB = true;
                        }
                        else if (insuranceMasterDB == null && insuranceMasterBO.ID > 0)
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Insurance Master information dosent exists.", ErrorLevel = ErrorLevel.Error };
                        }

                        insuranceMasterDB.CompanyCode = insuranceMasterBO.CompanyCode;
                        insuranceMasterDB.CompanyName = IsEditMode == true && insuranceMasterBO.CompanyName == null ? insuranceMasterDB.CompanyName : insuranceMasterBO.CompanyName;
                        insuranceMasterDB.ZeusID = insuranceMasterBO.ZeusID;
                        insuranceMasterDB.PriorityBilling = insuranceMasterBO.PriorityBilling;
                        insuranceMasterDB.Only1500Form = insuranceMasterBO.Only1500Form;
                        insuranceMasterDB.PaperAuthorization = insuranceMasterBO.PaperAuthorization;
                        insuranceMasterDB.CreatedByCompanyId = insuranceMasterBO.CreatedByCompanyId;

                        insuranceMasterDB.AddressInfoId = (addressDB != null && addressDB.id > 0) ? addressDB.id : insuranceMasterDB.AddressInfoId;
                        insuranceMasterDB.ContactInfoId = (contactinfoDB != null && contactinfoDB.id > 0) ? contactinfoDB.id : insuranceMasterDB.ContactInfoId;

                        if (Add_insuranceMasterDB == true)
                        {
                            insuranceMasterDB = _context.InsuranceMasters.Add(insuranceMasterDB);
                        }
                        _context.SaveChanges();
                    }
                    else
                    {
                        if (IsEditMode == false)
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid insurance master information details.", ErrorLevel = ErrorLevel.Error };
                        }
                        insuranceMasterDB = null;
                    }

                    _context.SaveChanges();
                    #endregion

                    dbContextTransaction.Commit();

                    insuranceMasterDB = _context.InsuranceMasters.Include("addressInfo").Include("contactInfo").Where(p => p.Id == insuranceMasterDB.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<InsuranceMaster>();
                }

                var res = ObjectConvert<BO.InsuranceMaster, InsuranceMaster>(insuranceMasterDB);
                return (object)res;
            }
            else
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Cannot add or update Master Insurance data.", ErrorLevel = ErrorLevel.Error };
            }            
        }
        #endregion

        #region Get Master And By CaseId
        public override object GetMasterAndByCaseId(int CaseId)
        {
            var CompanyId = _context.CaseCompanyMappings.Where(p => p.CaseId == CaseId && p.IsOriginator == true
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                        .Select(p => p.CompanyId);

            var acc = _context.InsuranceMasters.Include("addressInfo").Include("contactInfo")
                                               .Where(p => (p.CreatedByCompanyId.HasValue == false || (p.CreatedByCompanyId.HasValue == true && CompanyId.Contains(p.CreatedByCompanyId.Value)))
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<InsuranceMaster>();
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

        public void Dispose()
        {
            // Use SupressFinalize in case a subclass 
            // of this type implements a finalizer.
            GC.SuppressFinalize(this);
        }
    }
}
