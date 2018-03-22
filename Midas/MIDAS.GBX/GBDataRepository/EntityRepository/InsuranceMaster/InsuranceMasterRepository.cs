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
                boInsuranceMaster.ContactInfoId = eachInsuranceMaster.ContactInfoId;
                boInsuranceMaster.InsuranceMasterTypeId = eachInsuranceMaster.InsuranceMasterTypeId;
                boInsuranceMaster.ZeusID = eachInsuranceMaster.ZeusID;
                boInsuranceMaster.PriorityBilling = eachInsuranceMaster.PriorityBilling;
                boInsuranceMaster.Only1500Form = eachInsuranceMaster.Only1500Form;
                boInsuranceMaster.PaperAuthorization = eachInsuranceMaster.PaperAuthorization;
                boInsuranceMaster.CreatedByCompanyId = eachInsuranceMaster.CreatedByCompanyId;

                if (eachInsuranceMaster.IsDeleted.HasValue)
                    boInsuranceMaster.IsDeleted = eachInsuranceMaster.IsDeleted.Value;

                if (eachInsuranceMaster.InsuranceAddressInfoes != null)
                {
                    //foreach (var item in eachInsuranceMaster.InsuranceAddressInfoes)
                    //{
                    //    BO.InsuranceAddressInfo boAddress = new BO.InsuranceAddressInfo();
                    //    boAddress.InsuranceMasterId = item.InsuranceMasterId;
                    //    boAddress.Name = item.Name;
                    //    boAddress.Address1 = item.Address1;
                    //    boAddress.Address2 = item.Address2;
                    //    boAddress.City = item.City;
                    //    boAddress.State = item.State;
                    //    boAddress.ZipCode = item.ZipCode;
                    //    boAddress.Country = item.Country;
                    //    //[STATECODE-CHANGE]
                    //    //boAddress.StateCode = item.StateCode;
                    //    //[STATECODE-CHANGE]
                    //    boAddress.CreateByUserID = item.CreateByUserID;
                    //    boAddress.IsDefault = item.IsDefault;
                    //    boAddress.ID = item.id;
                    //    boInsuranceMaster.InsuranceAddressInfo.Add(boAddress);
                    //}

                    if (eachInsuranceMaster.InsuranceAddressInfoes != null)
                    {
                        List<BO.InsuranceAddressInfo> InsuranceAddressInfoBOList = new List<BO.InsuranceAddressInfo>();
                        foreach (var item in eachInsuranceMaster.InsuranceAddressInfoes)
                        {
                            InsuranceAddressInfoBOList.Add(ConvertInsuranceAddress<BO.InsuranceAddressInfo, InsuranceAddressInfo>(item));
                        }

                        boInsuranceMaster.InsuranceAddressInfo = InsuranceAddressInfoBOList;
                    }
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

                if (eachInsuranceMaster.InsuranceMasterType != null)
                {
                    BO.InsuranceMasterType boInsuranceMasterType = new BO.InsuranceMasterType();
                    boInsuranceMasterType.InsuranceMasterTypeText = eachInsuranceMaster.InsuranceMasterType.InsuranceMasterTypeText;
                    boInsuranceMasterType.CreateByUserID = eachInsuranceMaster.InsuranceMasterType.CreateByUserID;
                    boInsuranceMasterType.ID = eachInsuranceMaster.InsuranceMasterType.Id;

                    boInsuranceMaster.InsuranceMasterType = boInsuranceMasterType;
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
            boInsuranceMaster.ContactInfoId = insuranceMaster.ContactInfoId;
            boInsuranceMaster.InsuranceMasterTypeId = insuranceMaster.InsuranceMasterTypeId;
            boInsuranceMaster.ZeusID = insuranceMaster.ZeusID;
            boInsuranceMaster.PriorityBilling = insuranceMaster.PriorityBilling;
            boInsuranceMaster.Only1500Form = insuranceMaster.Only1500Form;
            boInsuranceMaster.PaperAuthorization = insuranceMaster.PaperAuthorization;
            boInsuranceMaster.CreatedByCompanyId = insuranceMaster.CreatedByCompanyId;

            if (insuranceMaster.IsDeleted.HasValue)
                boInsuranceMaster.IsDeleted = insuranceMaster.IsDeleted.Value;

            if (insuranceMaster.InsuranceAddressInfoes != null)
            {
                List<BO.InsuranceAddressInfo> InsuranceAddressInfoBOList = new List<BO.InsuranceAddressInfo>();
                foreach (var item in insuranceMaster.InsuranceAddressInfoes)
                {
                    InsuranceAddressInfoBOList.Add(ConvertInsuranceAddress<BO.InsuranceAddressInfo, InsuranceAddressInfo>(item));
                }

                boInsuranceMaster.InsuranceAddressInfo = InsuranceAddressInfoBOList;
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

        public override T ConvertInsuranceAddress<T, U>(U entity)
        {
            InsuranceAddressInfo insuranceAddressInfo = entity as InsuranceAddressInfo;

            if (insuranceAddressInfo == null)
                return default(T);

            BO.InsuranceAddressInfo insuranceAddressInfoBO = new BO.InsuranceAddressInfo();
            insuranceAddressInfoBO.ID = insuranceAddressInfo.id;
            insuranceAddressInfoBO.InsuranceMasterId = insuranceAddressInfo.InsuranceMasterId;
            insuranceAddressInfoBO.Name = insuranceAddressInfo.Name;
            insuranceAddressInfoBO.Address1 = insuranceAddressInfo.Address1;
            insuranceAddressInfoBO.Address2 = insuranceAddressInfo.Address2;
            insuranceAddressInfoBO.City = insuranceAddressInfo.City;
            insuranceAddressInfoBO.State = insuranceAddressInfo.State;
            insuranceAddressInfoBO.ZipCode = insuranceAddressInfo.ZipCode;
            insuranceAddressInfoBO.Country = insuranceAddressInfo.Country;
            //[STATECODE-CHANGE]
            //boAddress.StateCode = item.StateCode;
            //[STATECODE-CHANGE]
            insuranceAddressInfoBO.CreateByUserID = insuranceAddressInfo.CreateByUserID;
            if (insuranceAddressInfo.IsDeleted.HasValue)
                insuranceAddressInfoBO.IsDeleted = insuranceAddressInfo.IsDeleted.Value;
            if (insuranceAddressInfo.IsDefault.HasValue)
                insuranceAddressInfoBO.IsDefault = insuranceAddressInfo.IsDefault.Value;
            return (T)(object)insuranceAddressInfoBO;
        }


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
            var acc = _context.InsuranceMasters.Include("insuranceAddressInfoes").Include("contactInfo").Include("insuranceMasterType")
                                               .Where(p => (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p => new
                                               {
                                                   InsuranceMasters = p,
                                                   ContactInfo = p.ContactInfo,
                                                   InsuranceMasterType = p.InsuranceMasterType,
                                                   InsuranceAddressInfoes = p.InsuranceAddressInfoes.Where(y => (y.IsDeleted.HasValue == false || (y.IsDeleted.HasValue == true && y.IsDeleted.Value == false))),
                                                   PatientInsuranceInfoes = p.PatientInsuranceInfoes
                                               }).ToList().Select(p => p.InsuranceMasters).ToList<InsuranceMaster>();

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
            var acc = _context.InsuranceMasters.Include("insuranceAddressInfoes").Include("contactInfo").Include("insuranceMasterType")
                                               .Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p => new
                                               {
                                                   InsuranceMasters = p,
                                                   ContactInfo = p.ContactInfo,
                                                   InsuranceMasterType = p.InsuranceMasterType,
                                                   InsuranceAddressInfoes = p.InsuranceAddressInfoes.Where(y => (y.IsDeleted.HasValue == false || (y.IsDeleted.HasValue == true && y.IsDeleted.Value == false))),
                                                   PatientInsuranceInfoes = p.PatientInsuranceInfoes

                                               }).ToList().Select(p => p.InsuranceMasters).ToList<InsuranceMaster>().FirstOrDefault();
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
            var acccompnay = _context.InsuranceMasters.Include("insuranceAddressInfoes").Include("contactInfo").Include("insuranceMasterType")
                                               .Where(p => (p.CreatedByCompanyId.HasValue == true && p.CreatedByCompanyId.Value == CompanyId)
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p => new
                                                    {
                                                        InsuranceMasters = p,
                                                        ContactInfo = p.ContactInfo,
                                                        InsuranceMasterType = p.InsuranceMasterType,
                                                        InsuranceAddressInfoes = p.InsuranceAddressInfoes.Where(y => (y.IsDeleted.HasValue == false || (y.IsDeleted.HasValue == true && y.IsDeleted.Value == false))),
                                                        PatientInsuranceInfoes = p.PatientInsuranceInfoes

                                                    }).ToList().Select(p => p.InsuranceMasters).ToList<InsuranceMaster>().OrderBy(s => s.CompanyName).ToList<InsuranceMaster>();

            var accMaster = _context.InsuranceMasters.Include("insuranceAddressInfoes").Include("contactInfo").Include("insuranceMasterType")
                                              .Where(p => (p.CreatedByCompanyId.HasValue == false)
                                                   && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p => new
                                                   {
                                                       InsuranceMasters = p,
                                                       ContactInfo = p.ContactInfo,
                                                       InsuranceMasterType = p.InsuranceMasterType,
                                                       InsuranceAddressInfoes = p.InsuranceAddressInfoes.Where(y => (y.IsDeleted.HasValue == false || (y.IsDeleted.HasValue == true && y.IsDeleted.Value == false))),
                                                       PatientInsuranceInfoes = p.PatientInsuranceInfoes

                                                   }).ToList().Select(p => p.InsuranceMasters).ToList<InsuranceMaster>().OrderBy(s => s.CompanyName).ToList<InsuranceMaster>();

            var acc = acccompnay.Concat(accMaster)
                 .GroupBy(x => x.CompanyName)
                 .Select(g => g.OrderBy(x => x.CreateByUserID != null && x.CreateByUserID != 0).First())
                 .ToList();


            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No Insurance Master info found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                List<BO.InsuranceMaster> acc_ = Convert<List<BO.InsuranceMaster>, List<InsuranceMaster>>(acc).OrderBy(p => p.CompanyName).ToList();
                return (object)acc_;
            }
        }
        #endregion

        #region Get By Id 
        public override object GetInsuranceDetails(int id, int CompanyId)
        {

            var acc = _context.InsuranceMasters.Include("insuranceAddressInfoes").Include("contactInfo").Include("insuranceMasterType")
                                               .Where(p => p.Id == id
                                                    && (p.CreatedByCompanyId.HasValue == false || (p.CreatedByCompanyId.HasValue == true && p.CreatedByCompanyId.Value == CompanyId))
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p => new
                                                    {
                                                        InsuranceMasters = p,
                                                        ContactInfo = p.ContactInfo,
                                                        InsuranceMasterType = p.InsuranceMasterType,
                                                        InsuranceAddressInfoes = p.InsuranceAddressInfoes.Where(y => (y.IsDeleted.HasValue == false || (y.IsDeleted.HasValue == true && y.IsDeleted.Value == false))),
                                                        PatientInsuranceInfoes = p.PatientInsuranceInfoes

                                                    }).ToList().Select(p => p.InsuranceMasters).ToList<InsuranceMaster>().FirstOrDefault<InsuranceMaster>();

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

            InsuranceMaster insuranceMasterDB = _context.InsuranceMasters.Include("insuranceAddressInfoes").Include("contactInfo").Include("insuranceMasterType")
                                                                         .Where(p => p.Id == id && p.CreatedByCompanyId.HasValue == true && p.CreatedByCompanyId == CompanyId
                                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                         .FirstOrDefault<InsuranceMaster>();
            if (insuranceMasterDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this InsuranceMaster.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            //insuranceMasterDB.AddressInfo.IsDeleted = true;
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
            List<BO.InsuranceAddressInfo> insuranceaddressBO = insuranceMasterBO.InsuranceAddressInfo;
            BO.ContactInfo contactinfoBO = insuranceMasterBO.ContactInfo;
            BO.InsuranceMasterType insuranceMasterTypeBO = insuranceMasterBO.InsuranceMasterType;
            if (insuranceMasterBO.CreatedByCompanyId.HasValue == true)
            {
                InsuranceMaster insuranceMasterDB = new InsuranceMaster();
                InsuranceMaster isinsuranceMasterDBMain = new InsuranceMaster();

                using (var dbContextTransaction = _context.Database.BeginTransaction())
                {
                    isinsuranceMasterDBMain = _context.InsuranceMasters.Include("insuranceAddressInfoes").Include("contactInfo").Include("insuranceMasterType").Where(p => p.Id == insuranceMasterBO.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<InsuranceMaster>();

                    bool IsEditMode = false;
                    IsEditMode = (insuranceMasterBO != null && insuranceMasterBO.ID > 0 && isinsuranceMasterDBMain.CreatedByCompanyId > 0) ? true : false;
                    bool IsNameAlredayExits = false;
                    bool IsCodeAlredayExists = false;
                    if (IsEditMode)
                    {
                        var hasEditName = (_context.InsuranceMasters.Include("insuranceAddressInfoes").Include("contactInfo").Include("insuranceMasterType").Where(p => p.CompanyName == insuranceMasterBO.CompanyName && p.CreatedByCompanyId == insuranceMasterBO.CreatedByCompanyId && p.Id != insuranceMasterBO.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<InsuranceMaster>());
                        IsNameAlredayExits = (hasEditName != null) ? true : false;

                        var hasEditcode = (_context.InsuranceMasters.Include("insuranceAddressInfoes").Include("contactInfo").Include("insuranceMasterType").Where(p => p.CompanyCode == insuranceMasterBO.CompanyCode && p.CreatedByCompanyId == insuranceMasterBO.CreatedByCompanyId && p.Id != insuranceMasterBO.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<InsuranceMaster>());
                        IsCodeAlredayExists = (hasEditcode != null) ? true : false;
                    }
                    else
                    {
                        var hasEditName = (_context.InsuranceMasters.Include("insuranceAddressInfoes").Include("contactInfo").Include("insuranceMasterType").Where(p => p.CompanyName == insuranceMasterBO.CompanyName && p.CreatedByCompanyId == insuranceMasterBO.CreatedByCompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<InsuranceMaster>());
                        IsNameAlredayExits = (hasEditName != null) ? true : false;

                        var hasEditcode = (_context.InsuranceMasters.Include("insuranceAddressInfoes").Include("contactInfo").Include("insuranceMasterType").Where(p => p.CompanyCode == insuranceMasterBO.CompanyCode && p.CreatedByCompanyId == insuranceMasterBO.CreatedByCompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<InsuranceMaster>());
                        IsCodeAlredayExists = (hasEditcode != null) ? true : false;
                    }

                    if (IsNameAlredayExits && IsCodeAlredayExists)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Already Same Insurance Code and Name Exists.", ErrorLevel = ErrorLevel.Error };
                    }
                    else if (IsNameAlredayExits)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Already Same Insurance Name Exists.", ErrorLevel = ErrorLevel.Error };
                    }
                    else if (IsCodeAlredayExists)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Already Same Insurance Code Exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    ContactInfo contactinfoDB = new ContactInfo();


                    #region Contact Info
                    if (contactinfoBO != null)
                    {
                        bool Add_contactinfoDB = false;
                        if (isinsuranceMasterDBMain != null && isinsuranceMasterDBMain.CreatedByCompanyId > 0)
                        {
                            contactinfoDB = _context.ContactInfoes.Where(p => p.id == contactinfoBO.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
                        }
                        else
                        {
                            contactinfoDB = null;
                            contactinfoBO.ID = 0;
                        }


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
                        if (isinsuranceMasterDBMain != null && isinsuranceMasterDBMain.CreatedByCompanyId > 0)
                        {
                            insuranceMasterDB = _context.InsuranceMasters.Where(p => p.Id == insuranceMasterBO.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<InsuranceMaster>();
                        }
                        else
                        {
                            insuranceMasterDB = null;
                            insuranceMasterBO.ID = 0;
                        }

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
                        insuranceMasterDB.InsuranceMasterTypeId = insuranceMasterBO.InsuranceMasterTypeId;
                        insuranceMasterDB.ZeusID = insuranceMasterBO.ZeusID;
                        insuranceMasterDB.PriorityBilling = insuranceMasterBO.PriorityBilling;
                        insuranceMasterDB.Only1500Form = insuranceMasterBO.Only1500Form;
                        insuranceMasterDB.PaperAuthorization = insuranceMasterBO.PaperAuthorization;
                        insuranceMasterDB.CreatedByCompanyId = insuranceMasterBO.CreatedByCompanyId;

                        //insuranceMasterDB.AddressInfoId = (addressDB != null && addressDB.id > 0) ? addressDB.id : insuranceMasterDB.AddressInfoId;
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

                    InsuranceAddressInfo insuranceAddressDB = new InsuranceAddressInfo();
                    #region Address
                    if (insuranceAddressDB != null)
                    {
                        var insuranceID = insuranceMasterDB.Id == 0 ? insuranceAddressDB.InsuranceMasterId : insuranceMasterDB.Id;
                        var oldaddresslist = _context.InsuranceAddressInfoes.Where(p => (p.InsuranceMasterId == insuranceID) && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList<InsuranceAddressInfo>();
                        if (oldaddresslist.Count > 0)
                        {
                            HashSet<int> removeIDs = new HashSet<int>(insuranceaddressBO.Select(s => s.ID));
                            var oldaddresslistResult = oldaddresslist.Where(m => !removeIDs.Contains(m.id));
                            foreach (var itemdelete in oldaddresslistResult)
                            {
                                if (itemdelete.id != 0)
                                {
                                    InsuranceAddressInfo insuranceAddressInfoD = _context.InsuranceAddressInfoes.Where(p => p.id == itemdelete.id).FirstOrDefault<InsuranceAddressInfo>();
                                    if (insuranceAddressInfoD != null)
                                    {
                                        insuranceAddressInfoD.IsDeleted = true;
                                        _context.SaveChanges();
                                    }
                                }
                            }
                        }

                        foreach (var item in insuranceaddressBO)
                        {
                            bool Add_insuranceAddressDB = false;
                            if (isinsuranceMasterDBMain != null && isinsuranceMasterDBMain.CreatedByCompanyId > 0)
                            {
                                insuranceAddressDB = _context.InsuranceAddressInfoes.Where(p => p.id == item.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
                            }
                            else
                            {
                                insuranceAddressDB = null;
                                item.ID = 0;
                            }


                            if (insuranceAddressDB == null && item.ID <= 0)
                            {
                                insuranceAddressDB = new InsuranceAddressInfo();
                                Add_insuranceAddressDB = true;
                            }
                            else if (insuranceAddressDB == null && item.ID > 0)
                            {
                                dbContextTransaction.Rollback();
                                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Address details dosent exists.", ErrorLevel = ErrorLevel.Error };
                            }

                            insuranceAddressDB.InsuranceMasterId = IsEditMode == true && insuranceMasterDB.Id == 0 ? insuranceAddressDB.InsuranceMasterId : insuranceMasterDB.Id;
                            insuranceAddressDB.Name = IsEditMode == true && item.Name == null ? insuranceAddressDB.Name : item.Name;
                            insuranceAddressDB.Address1 = IsEditMode == true && item.Address1 == null ? insuranceAddressDB.Address1 : item.Address1;
                            insuranceAddressDB.Address2 = IsEditMode == true && item.Address2 == null ? insuranceAddressDB.Address2 : item.Address2;
                            insuranceAddressDB.City = IsEditMode == true && item.City == null ? insuranceAddressDB.City : item.City;
                            insuranceAddressDB.State = IsEditMode == true && item.State == null ? insuranceAddressDB.State : item.State;
                            insuranceAddressDB.ZipCode = IsEditMode == true && item.ZipCode == null ? insuranceAddressDB.ZipCode : item.ZipCode;
                            insuranceAddressDB.Country = IsEditMode == true && item.Country == null ? insuranceAddressDB.Country : item.Country;
                            insuranceAddressDB.IsDefault = IsEditMode == true && item.IsDefault == null ? insuranceAddressDB.IsDefault : item.IsDefault;
                            //[STATECODE-CHANGE]
                            //addressDB.StateCode = IsEditMode == true && addressBO.StateCode == null ? addressDB.StateCode : addressBO.StateCode;
                            //[STATECODE-CHANGE]

                            if (Add_insuranceAddressDB == true)
                            {
                                insuranceAddressDB = _context.InsuranceAddressInfoes.Add(insuranceAddressDB);
                            }
                            _context.SaveChanges();
                        }
                    }
                    else
                    {
                        if (IsEditMode == false)
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid address details.", ErrorLevel = ErrorLevel.Error };
                        }
                        insuranceAddressDB = null;
                    }
                    #endregion

                    dbContextTransaction.Commit();

                    insuranceMasterDB = _context.InsuranceMasters.Include("insuranceAddressInfoes").Include("contactInfo").Include("insuranceMasterType")
                                                   .Where(p => p.Id == insuranceMasterDB.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p => new
                                                   {
                                                       InsuranceMasters = p,
                                                       ContactInfo = p.ContactInfo,
                                                       InsuranceMasterType = p.InsuranceMasterType,
                                                       InsuranceAddressInfoes = p.InsuranceAddressInfoes.Where(y => (y.IsDeleted.HasValue == false || (y.IsDeleted.HasValue == true && y.IsDeleted.Value == false))),
                                                       PatientInsuranceInfoes = p.PatientInsuranceInfoes

                                                   }).ToList().Select(p => p.InsuranceMasters).ToList<InsuranceMaster>().FirstOrDefault<InsuranceMaster>();

                    //insuranceMasterDB = _context.InsuranceMasters.Include("insuranceAddressInfoes").Include("contactInfo").Include("insuranceMasterType").Where(p => p.Id == insuranceMasterDB.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<InsuranceMaster>();
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

            var acc = _context.InsuranceMasters.Include("insuranceAddressInfoes").Include("contactInfo").Include("insuranceMasterType")
                                               .Where(p => (p.CreatedByCompanyId.HasValue == false || (p.CreatedByCompanyId.HasValue == true && CompanyId.Contains(p.CreatedByCompanyId.Value)))
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p => new
                                                    {
                                                        InsuranceMasters = p,
                                                        ContactInfo = p.ContactInfo,
                                                        InsuranceMasterType = p.InsuranceMasterType,
                                                        InsuranceAddressInfoes = p.InsuranceAddressInfoes.Where(y => (y.IsDeleted.HasValue == false || (y.IsDeleted.HasValue == true && y.IsDeleted.Value == false))),
                                                        PatientInsuranceInfoes = p.PatientInsuranceInfoes
                                                    }).ToList().Select(p => p.InsuranceMasters).ToList<InsuranceMaster>();

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
