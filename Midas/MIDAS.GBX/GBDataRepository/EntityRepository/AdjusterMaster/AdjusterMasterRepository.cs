using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository.Common
{
    internal class AdjusterMasterRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<AdjusterMaster> _dbAdjusterMaster;

        public AdjusterMasterRepository(MIDASGBXEntities context) : base(context)
        {
            _dbAdjusterMaster = context.Set<AdjusterMaster>();
            context.Configuration.ProxyCreationEnabled = false;
        }


        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            AdjusterMaster adjusterMasterDB = entity as AdjusterMaster;

            if (adjusterMasterDB == null)
                return default(T);

            BO.AdjusterMaster adjusterMasterBO = new BO.AdjusterMaster();

            adjusterMasterBO.ID = adjusterMasterDB.Id;
            adjusterMasterBO.CompanyId = adjusterMasterDB.CompanyId;
            adjusterMasterBO.FirstName = adjusterMasterDB.FirstName;
            adjusterMasterBO.MiddleName = adjusterMasterDB.MiddleName;
            adjusterMasterBO.LastName = adjusterMasterDB.LastName;
            adjusterMasterBO.InsuranceMasterId = adjusterMasterDB.InsuranceMasterId;
            adjusterMasterBO.AddressInfoId = adjusterMasterDB.AddressInfoId;
            adjusterMasterBO.ContactInfoId = adjusterMasterDB.ContactInfoId;

            if (adjusterMasterDB.AddressInfo != null)
            {
                BO.AddressInfo boAddress = new BO.AddressInfo();
                boAddress.Name = adjusterMasterDB.AddressInfo.Name;
                boAddress.Address1 = adjusterMasterDB.AddressInfo.Address1;
                boAddress.Address2 = adjusterMasterDB.AddressInfo.Address2;
                boAddress.City = adjusterMasterDB.AddressInfo.City;
                boAddress.State = adjusterMasterDB.AddressInfo.State;
                boAddress.ZipCode = adjusterMasterDB.AddressInfo.ZipCode;
                boAddress.Country = adjusterMasterDB.AddressInfo.Country;
                //[STATECODE-CHANGE]
                //boAddress.StateCode = adjusterMasterDB.AddressInfo.StateCode;
                //[STATECODE-CHANGE]
                boAddress.CreateByUserID = adjusterMasterDB.AddressInfo.CreateByUserID;
                boAddress.ID = adjusterMasterDB.AddressInfo.id;
                adjusterMasterBO.AddressInfo = boAddress;
            }
            if (adjusterMasterDB.ContactInfo != null)
            {
                BO.ContactInfo boContactInfo = new BO.ContactInfo();
                boContactInfo.Name = adjusterMasterDB.ContactInfo.Name;
                boContactInfo.CellPhone = adjusterMasterDB.ContactInfo.CellPhone;
                boContactInfo.EmailAddress = adjusterMasterDB.ContactInfo.EmailAddress;
                boContactInfo.HomePhone = adjusterMasterDB.ContactInfo.HomePhone;
                boContactInfo.WorkPhone = adjusterMasterDB.ContactInfo.WorkPhone;
                boContactInfo.FaxNo = adjusterMasterDB.ContactInfo.FaxNo;
                boContactInfo.CreateByUserID = adjusterMasterDB.ContactInfo.CreateByUserID;
                boContactInfo.ID = adjusterMasterDB.ContactInfo.id;
                adjusterMasterBO.ContactInfo = boContactInfo;
            }
                     


            //Common 
            adjusterMasterBO.IsDeleted = adjusterMasterDB.IsDeleted;
            adjusterMasterBO.CreateByUserID = adjusterMasterDB.CreateByUserID;
            adjusterMasterBO.UpdateByUserID = adjusterMasterDB.UpdateByUserID;

            return (T)(object)adjusterMasterBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.AdjusterMaster adjusterMaster = (BO.AdjusterMaster)(object)entity;
            var result = adjusterMaster.Validate(adjusterMaster);
            return result;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.AdjusterMasters.Include("InsuranceMaster")
                .Include("AddressInfo")
                .Include("ContactInfo")
                .Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<AdjusterMaster>();
            BO.AdjusterMaster acc_ = Convert<BO.AdjusterMaster, AdjusterMaster>(acc);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region Get By Company Id
        public override object GetByCompanyId(int CompanyId)
        {
            var acc = _context.AdjusterMasters.Include("addressInfo").Include("contactInfo").Include("InsuranceMaster").Where(p => p.CompanyId == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList<AdjusterMaster>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.AdjusterMaster> lstAdjusterMaster = new List<BO.AdjusterMaster>();
            foreach (AdjusterMaster item in acc)
            {
                lstAdjusterMaster.Add(Convert<BO.AdjusterMaster, AdjusterMaster>(item));
            }

            return lstAdjusterMaster;
        }
        #endregion

        #region Get By InsuranceMaster Id
        public override object GetByInsuranceMasterId(int InsuranceMasterId)
        {
            var acc = _context.AdjusterMasters.Include("addressInfo").Include("contactInfo").Include("InsuranceMaster").Where(p => p.InsuranceMasterId == InsuranceMasterId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList<AdjusterMaster>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.AdjusterMaster> lstadjusterMaster = new List<BO.AdjusterMaster>();
            foreach (AdjusterMaster item in acc)
            {
                lstadjusterMaster.Add(Convert<BO.AdjusterMaster, AdjusterMaster>(item));
            }

            return lstadjusterMaster;
        }
        #endregion

        #region Get By Company And InsuranceMaster Id
        public override object Get(int CompanyId, int InsuranceMasterId)
        {
            var acc = _context.AdjusterMasters.Include("addressInfo")
                                              .Include("contactInfo")
                                              .Include("InsuranceMaster")
                                              .Where(p => p.CompanyId == CompanyId && p.InsuranceMasterId == InsuranceMasterId
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList<AdjusterMaster>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.AdjusterMaster> lstAdjusterMaster = new List<BO.AdjusterMaster>();
            foreach (AdjusterMaster item in acc)
            {
                lstAdjusterMaster.Add(Convert<BO.AdjusterMaster, AdjusterMaster>(item));
            }

            return lstAdjusterMaster;
        }
        #endregion

        #region Get All 
        public override object Get<T>(T entity)
        {
            BO.AdjusterMaster adjusterMasterBO = (BO.AdjusterMaster)(object)entity;

            var acc_ = _context.AdjusterMasters.Include("AddressInfo")
                                        .Include("ContactInfo")
                                        .Include("InsuranceMaster")
                                        .Where(p => p.IsDeleted.HasValue == false || p.IsDeleted == false)
                                        .ToList<AdjusterMaster>();

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.AdjusterMaster> lstadjusterMaster = new List<BO.AdjusterMaster>();
            foreach (AdjusterMaster item in acc_)
            {
                lstadjusterMaster.Add(Convert<BO.AdjusterMaster, AdjusterMaster>(item));
            }
            return lstadjusterMaster;
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.AdjusterMaster adjusterMasterBO = (BO.AdjusterMaster)(object)entity;
            BO.AddressInfo addressBO = adjusterMasterBO.AddressInfo;
            BO.ContactInfo contactinfoBO = adjusterMasterBO.ContactInfo;

            AdjusterMaster adjusterMasterDB = new AdjusterMaster();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {

                bool IsEditMode = false;
                IsEditMode = (adjusterMasterBO != null && adjusterMasterBO.ID > 0) ? true : false;

                AddressInfo addressDB = new AddressInfo();
                ContactInfo contactinfoDB = new ContactInfo();

                #region Address
                if (addressBO != null)
                {
                    bool Add_addressDB = false;
                    addressDB = _context.AddressInfoes.Where(p => p.id == addressBO.ID).FirstOrDefault();

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
                    // addressDB.StateCode = IsEditMode == true && addressBO.StateCode == null ? addressDB.StateCode : addressBO.StateCode;
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
                    contactinfoDB = _context.ContactInfoes.Where(p => p.id == contactinfoBO.ID).FirstOrDefault();

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

                #region AdjusterMaster

                if (adjusterMasterBO != null)
                {
                    bool Add_adjusterMasterDB = false;
                    adjusterMasterDB = _context.AdjusterMasters.Where(p => p.Id == adjusterMasterBO.ID).FirstOrDefault();

                    if (adjusterMasterDB == null && adjusterMasterBO.ID <= 0)
                    {
                        adjusterMasterDB = new AdjusterMaster();
                        Add_adjusterMasterDB = true;
                    }
                    else if (adjusterMasterDB == null && adjusterMasterBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Adjuster information dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    adjusterMasterDB.CompanyId = adjusterMasterBO.CompanyId;
                    adjusterMasterDB.InsuranceMasterId = adjusterMasterBO.InsuranceMasterId;
                    adjusterMasterDB.FirstName = IsEditMode == true && adjusterMasterBO.FirstName == null ? adjusterMasterDB.FirstName : adjusterMasterBO.FirstName;
                    adjusterMasterDB.MiddleName = IsEditMode == true && adjusterMasterBO.MiddleName == null ? adjusterMasterDB.MiddleName : adjusterMasterBO.MiddleName;
                    adjusterMasterDB.LastName = IsEditMode == true && adjusterMasterBO.LastName == null ? adjusterMasterDB.LastName : adjusterMasterBO.LastName;
                    adjusterMasterDB.AddressInfoId =(addressDB != null && addressDB.id > 0) ? addressDB.id : adjusterMasterDB.AddressInfoId;
                    adjusterMasterDB.ContactInfoId = (contactinfoDB != null && contactinfoDB.id > 0) ? contactinfoDB.id : adjusterMasterDB.ContactInfoId;

                    if (Add_adjusterMasterDB == true)
                    {
                        adjusterMasterDB = _context.AdjusterMasters.Add(adjusterMasterDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid adjuster information details.", ErrorLevel = ErrorLevel.Error };
                    }
                    adjusterMasterDB = null;
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                adjusterMasterDB = _context.AdjusterMasters.Include("AddressInfo")
                .Include("ContactInfo").Include("InsuranceMaster").Where(p => p.Id == adjusterMasterDB.Id).FirstOrDefault<AdjusterMaster>();
            }

            var res = Convert<BO.AdjusterMaster, AdjusterMaster>(adjusterMasterDB);
            return (object)res;
        }
        #endregion

        #region Delete By ID
        public override object Delete(int id)
        {
            var acc = _context.AdjusterMasters.Include("AddressInfo")
                .Include("ContactInfo")
                .Include("InsuranceMaster")
                .Where(p => p.Id == id && (p.IsDeleted.HasValue == false || p.IsDeleted == false))
                                              .FirstOrDefault<AdjusterMaster>();
            if (acc != null)
            {
                if (acc.AddressInfo != null)
                {
                    acc.AddressInfo.IsDeleted = true;
                }
                if (acc.ContactInfo != null)
                {
                    acc.ContactInfo.IsDeleted = true;
                }
                //if (acc.InsuranceMaster != null)
                //{
                //    acc.InsuranceMaster.IsDeleted = true;
                //}
                acc.IsDeleted = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.AdjusterMaster, AdjusterMaster>(acc);
            return (object)res;
        }
        #endregion

        
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
