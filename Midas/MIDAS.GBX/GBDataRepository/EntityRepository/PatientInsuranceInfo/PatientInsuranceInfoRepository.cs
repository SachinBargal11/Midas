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
    internal class PatientInsuranceInfoRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<PatientInsuranceInfo> _dbInsurance;

        public PatientInsuranceInfoRepository(MIDASGBXEntities context) : base(context)
        {
            _dbInsurance = context.Set<PatientInsuranceInfo>();
            context.Configuration.ProxyCreationEnabled = false;
        }


        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            PatientInsuranceInfo InsuranceInfos = entity as PatientInsuranceInfo;

            if (InsuranceInfos == null)
                return default(T);

            BO.PatientInsuranceInfo insuranceBO = new BO.PatientInsuranceInfo();
            insuranceBO.ID = InsuranceInfos.Id;
            insuranceBO.patientId = InsuranceInfos.PatientId;
            insuranceBO.policyHoldersName = InsuranceInfos.PolicyHolderName;
            insuranceBO.policyHolderAddressInfoId = InsuranceInfos.PolicyHolderAddressInfoId;
            insuranceBO.policyHolderContactInfoId = InsuranceInfos.PolicyHolderContactInfoId;
            insuranceBO.policyOwnerId = InsuranceInfos.PolicyOwnerId;

            insuranceBO.InsuranceMasterId = InsuranceInfos.InsuranceMasterId;

            insuranceBO.insuranceCompanyCode = InsuranceInfos.InsuranceCompanyCode;
            insuranceBO.insuranceCompanyAddressInfoId = InsuranceInfos.InsuranceCompanyAddressInfoId;
            insuranceBO.insuranceCompanyContactInfoId = InsuranceInfos.InsuranceCompanyContactInfoId;
            insuranceBO.policyNo = InsuranceInfos.PolicyNo;
            insuranceBO.contactPerson = InsuranceInfos.ContactPerson;
            insuranceBO.insuranceTypeId = InsuranceInfos.InsuranceTypeId;
            insuranceBO.isInActive = InsuranceInfos.IsInActive;

            if (InsuranceInfos.AddressInfo != null)
            {
                BO.AddressInfo boAddress = new BO.AddressInfo();
                boAddress.Name = InsuranceInfos.AddressInfo.Name;
                boAddress.Address1 = InsuranceInfos.AddressInfo.Address1;
                boAddress.Address2 = InsuranceInfos.AddressInfo.Address2;
                boAddress.City = InsuranceInfos.AddressInfo.City;
                boAddress.State = InsuranceInfos.AddressInfo.State;
                boAddress.ZipCode = InsuranceInfos.AddressInfo.ZipCode;
                boAddress.Country = InsuranceInfos.AddressInfo.Country;
                //[STATECODE-CHANGE]
                //boAddress.StateCode = InsuranceInfos.AddressInfo.StateCode;
                //[STATECODE-CHANGE]
                boAddress.CreateByUserID = InsuranceInfos.AddressInfo.CreateByUserID;
                boAddress.ID = InsuranceInfos.AddressInfo.id;
                insuranceBO.addressInfo = boAddress;
            }

            if (InsuranceInfos.ContactInfo != null)
            {
                BO.ContactInfo boContactInfo = new BO.ContactInfo();
                boContactInfo.Name = InsuranceInfos.ContactInfo.Name;
                boContactInfo.CellPhone = InsuranceInfos.ContactInfo.CellPhone;
                boContactInfo.EmailAddress = InsuranceInfos.ContactInfo.EmailAddress;
                boContactInfo.HomePhone = InsuranceInfos.ContactInfo.HomePhone;
                boContactInfo.WorkPhone = InsuranceInfos.ContactInfo.WorkPhone;
                boContactInfo.FaxNo = InsuranceInfos.ContactInfo.FaxNo;
                boContactInfo.CreateByUserID = InsuranceInfos.ContactInfo.CreateByUserID;
                boContactInfo.ID = InsuranceInfos.ContactInfo.id;
                insuranceBO.contactInfo = boContactInfo;
            }

            if (InsuranceInfos.AddressInfo1 != null)
            {
                BO.AddressInfo boAddress1 = new BO.AddressInfo();
                boAddress1.Name = InsuranceInfos.AddressInfo1.Name;
                boAddress1.Address1 = InsuranceInfos.AddressInfo1.Address1;
                boAddress1.Address2 = InsuranceInfos.AddressInfo1.Address2;
                boAddress1.City = InsuranceInfos.AddressInfo1.City;
                boAddress1.State = InsuranceInfos.AddressInfo1.State;
                boAddress1.ZipCode = InsuranceInfos.AddressInfo1.ZipCode;
                boAddress1.Country = InsuranceInfos.AddressInfo1.Country;
                //[STATECODE-CHANGE]
                //boAddress1.StateCode = InsuranceInfos.AddressInfo1.StateCode;
                //[STATECODE-CHANGE]
                boAddress1.CreateByUserID = InsuranceInfos.AddressInfo1.CreateByUserID;
                boAddress1.ID = InsuranceInfos.AddressInfo1.id;
                insuranceBO.addressInfo1 = boAddress1;
            }

            if (InsuranceInfos.ContactInfo1 != null)
            {
                BO.ContactInfo boContactInfo1 = new BO.ContactInfo();
                boContactInfo1.Name = InsuranceInfos.ContactInfo1.Name;
                boContactInfo1.CellPhone = InsuranceInfos.ContactInfo1.CellPhone;
                boContactInfo1.EmailAddress = InsuranceInfos.ContactInfo1.EmailAddress;
                boContactInfo1.HomePhone = InsuranceInfos.ContactInfo1.HomePhone;
                boContactInfo1.WorkPhone = InsuranceInfos.ContactInfo1.WorkPhone;
                boContactInfo1.FaxNo = InsuranceInfos.ContactInfo1.FaxNo;
                boContactInfo1.CreateByUserID = InsuranceInfos.ContactInfo1.CreateByUserID;
                boContactInfo1.ID = InsuranceInfos.ContactInfo1.id;
                insuranceBO.contactInfo1 = boContactInfo1;
            }

            BO.InsuranceMaster boInsuranceMaster = new BO.InsuranceMaster();
            using (InsuranceMasterRepository cmp = new InsuranceMasterRepository(_context))
            {
                boInsuranceMaster = cmp.ObjectConvert<BO.InsuranceMaster, InsuranceMaster>(InsuranceInfos.InsuranceMaster);
                insuranceBO.InsuranceMaster = boInsuranceMaster;
            }


            insuranceBO.IsDeleted = InsuranceInfos.IsDeleted;
            insuranceBO.CreateByUserID = InsuranceInfos.CreateByUserID;
            insuranceBO.UpdateByUserID = InsuranceInfos.UpdateByUserID;

            return (T)(object)insuranceBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.PatientInsuranceInfo insurance = (BO.PatientInsuranceInfo)(object)entity;
            var result = insurance.Validate(insurance);
            return result;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.PatientInsuranceInfoes.Include("addressInfo").Include("contactInfo")
                                                     .Include("addressInfo1").Include("contactInfo1")
                                                     .Include("InsuranceMaster")
                                                     .Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                     .FirstOrDefault<PatientInsuranceInfo>();
            BO.PatientInsuranceInfo acc_ = Convert<BO.PatientInsuranceInfo, PatientInsuranceInfo>(acc);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region Get By patient ID
        public override object GetByPatientId(int PatientId)
        {
            var acc = _context.PatientInsuranceInfoes.Include("addressInfo").Include("contactInfo")
                                                     .Include("addressInfo1").Include("contactInfo1")
                                                     .Include("InsuranceMaster")
                                                     .Where(p => p.PatientId == PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                     .ToList<PatientInsuranceInfo>();
            
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.PatientInsuranceInfo> lstpatientsInsuranceInfo = new List<BO.PatientInsuranceInfo>();
            //acc.ForEach(p => lstpatientsEmpInfo.Add(Convert<BO.PatientEmpInfo, PatientEmpInfo>(p)));
            foreach (PatientInsuranceInfo item in acc)
            {
                lstpatientsInsuranceInfo.Add(Convert<BO.PatientInsuranceInfo, PatientInsuranceInfo>(item));
            }

            return lstpatientsInsuranceInfo;
        }
        #endregion

        #region Is InsuranceInfo Added
        public override object IsInsuranceInfoAdded(int id)
        {
            var acc = _context.PatientInsuranceInfoes.Where(p => p.PatientId == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                     .FirstOrDefault<PatientInsuranceInfo>();
           
            if (acc == null)
            {
                return false;
            }
            else
            {
                return true;
            }            
        }
        #endregion


        #region save
        public override object Save<T>(T entity)
        {
            BO.PatientInsuranceInfo insuranceBO = (BO.PatientInsuranceInfo)(object)entity;
            BO.AddressInfo addressinfoPolicyHolderBO = insuranceBO.addressInfo1;
            BO.ContactInfo contactinfoPolicyHolderBO = insuranceBO.contactInfo1;
            BO.AddressInfo addressinfoInsuranceCompanyBO = insuranceBO.addressInfo;
            BO.ContactInfo contactinfoInsuranceCompanyBO = insuranceBO.contactInfo;

            PatientInsuranceInfo insuranceDB = new PatientInsuranceInfo();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {

                bool IsEditMode = false;
                IsEditMode = (insuranceBO != null && insuranceBO.ID > 0) ? true : false;

                AddressInfo addressinfoPolicyHolderDB = new AddressInfo();
                ContactInfo contactinfoPolicyHolderDB = new ContactInfo();
                AddressInfo addressinfoInsuranceCompanyDB = new AddressInfo();
                ContactInfo contactinfoInsuranceCompanyDB = new ContactInfo();

                User userDB = new User();

                #region Address Poliy Holder
                if (addressinfoPolicyHolderBO != null)
                {
                    bool Add_addressDB = false;
                    addressinfoPolicyHolderDB = _context.AddressInfoes.Where(p => p.id == addressinfoPolicyHolderBO.ID).FirstOrDefault();

                    if (addressinfoPolicyHolderDB == null && addressinfoPolicyHolderBO.ID <= 0)
                    {
                        addressinfoPolicyHolderDB = new AddressInfo();
                        Add_addressDB = true;
                    }
                    else if (addressinfoPolicyHolderDB == null && addressinfoPolicyHolderBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Policy address details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    addressinfoPolicyHolderDB.Name = IsEditMode == true && addressinfoPolicyHolderBO.Name == null ? addressinfoPolicyHolderDB.Name : addressinfoPolicyHolderBO.Name;
                    addressinfoPolicyHolderDB.Address1 = IsEditMode == true && addressinfoPolicyHolderBO.Address1 == null ? addressinfoPolicyHolderDB.Address1 : addressinfoPolicyHolderBO.Address1;
                    addressinfoPolicyHolderDB.Address2 = IsEditMode == true && addressinfoPolicyHolderBO.Address2 == null ? addressinfoPolicyHolderDB.Address2 : addressinfoPolicyHolderBO.Address2;
                    addressinfoPolicyHolderDB.City = IsEditMode == true && addressinfoPolicyHolderBO.City == null ? addressinfoPolicyHolderDB.City : addressinfoPolicyHolderBO.City;
                    addressinfoPolicyHolderDB.State = IsEditMode == true && addressinfoPolicyHolderBO.State == null ? addressinfoPolicyHolderDB.State : addressinfoPolicyHolderBO.State;
                    addressinfoPolicyHolderDB.ZipCode = IsEditMode == true && addressinfoPolicyHolderBO.ZipCode == null ? addressinfoPolicyHolderDB.ZipCode : addressinfoPolicyHolderBO.ZipCode;
                    addressinfoPolicyHolderDB.Country = IsEditMode == true && addressinfoPolicyHolderBO.Country == null ? addressinfoPolicyHolderDB.Country : addressinfoPolicyHolderBO.Country;
                    //[STATECODE-CHANGE]
                    //addressinfoPolicyHolderDB.StateCode = IsEditMode == true && addressinfoPolicyHolderBO.StateCode == null ? addressinfoPolicyHolderDB.StateCode : addressinfoPolicyHolderBO.StateCode;
                    //[STATECODE-CHANGE]

                    if (Add_addressDB == true)
                    {
                        addressinfoPolicyHolderDB = _context.AddressInfoes.Add(addressinfoPolicyHolderDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid policy address details.", ErrorLevel = ErrorLevel.Error };
                    }
                    addressinfoPolicyHolderDB = null;
                }
                #endregion

                #region Contact Info Policy Holder
                if (contactinfoPolicyHolderBO != null)
                {
                    bool Add_contactinfoDB = false;
                    contactinfoPolicyHolderDB = _context.ContactInfoes.Where(p => p.id == contactinfoPolicyHolderBO.ID).FirstOrDefault();

                    if (contactinfoPolicyHolderDB == null && contactinfoPolicyHolderBO.ID <= 0)
                    {
                        contactinfoPolicyHolderDB = new ContactInfo();
                        Add_contactinfoDB = true;
                    }
                    else if (contactinfoPolicyHolderDB == null && contactinfoPolicyHolderBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Policy contact details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    contactinfoPolicyHolderDB.Name = IsEditMode == true && contactinfoPolicyHolderBO.Name == null ? contactinfoPolicyHolderDB.Name : contactinfoPolicyHolderBO.Name;
                    contactinfoPolicyHolderDB.CellPhone = IsEditMode == true && contactinfoPolicyHolderBO.CellPhone == null ? contactinfoPolicyHolderDB.CellPhone : contactinfoPolicyHolderBO.CellPhone;
                    contactinfoPolicyHolderDB.EmailAddress = IsEditMode == true && contactinfoPolicyHolderBO.EmailAddress == null ? contactinfoPolicyHolderDB.EmailAddress : contactinfoPolicyHolderBO.EmailAddress;
                    contactinfoPolicyHolderDB.HomePhone = IsEditMode == true && contactinfoPolicyHolderBO.HomePhone == null ? contactinfoPolicyHolderDB.HomePhone : contactinfoPolicyHolderBO.HomePhone;
                    contactinfoPolicyHolderDB.WorkPhone = IsEditMode == true && contactinfoPolicyHolderBO.WorkPhone == null ? contactinfoPolicyHolderDB.WorkPhone : contactinfoPolicyHolderBO.WorkPhone;
                    contactinfoPolicyHolderDB.FaxNo = IsEditMode == true && contactinfoPolicyHolderBO.FaxNo == null ? contactinfoPolicyHolderDB.FaxNo : contactinfoPolicyHolderBO.FaxNo;
                    contactinfoPolicyHolderDB.IsDeleted = contactinfoPolicyHolderBO.IsDeleted;

                    if (Add_contactinfoDB == true)
                    {
                        contactinfoPolicyHolderDB = _context.ContactInfoes.Add(contactinfoPolicyHolderDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid policy contact details.", ErrorLevel = ErrorLevel.Error };
                    }
                    contactinfoPolicyHolderDB = null;
                }
                #endregion

                #region Address Insurance Company
                if (addressinfoInsuranceCompanyBO != null)
                {
                    bool Add_addressDB = false;
                    addressinfoInsuranceCompanyDB = _context.AddressInfoes.Where(p => p.id == addressinfoInsuranceCompanyBO.ID).FirstOrDefault();

                    if (addressinfoInsuranceCompanyDB == null && addressinfoInsuranceCompanyBO.ID <= 0)
                    {
                        addressinfoInsuranceCompanyDB = new AddressInfo();
                        Add_addressDB = true;
                    }
                    else if (addressinfoInsuranceCompanyDB == null && addressinfoInsuranceCompanyBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Insurance address details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    addressinfoInsuranceCompanyDB.id = addressinfoInsuranceCompanyBO.ID;
                    addressinfoInsuranceCompanyDB.Name = IsEditMode == true && addressinfoInsuranceCompanyBO.Name == null ? addressinfoInsuranceCompanyDB.Name : addressinfoInsuranceCompanyBO.Name;
                    addressinfoInsuranceCompanyDB.Address1 = IsEditMode == true && addressinfoInsuranceCompanyBO.Address1 == null ? addressinfoInsuranceCompanyDB.Address1 : addressinfoInsuranceCompanyBO.Address1;
                    addressinfoInsuranceCompanyDB.Address2 = IsEditMode == true && addressinfoInsuranceCompanyBO.Address2 == null ? addressinfoInsuranceCompanyDB.Address2 : addressinfoInsuranceCompanyBO.Address2;
                    addressinfoInsuranceCompanyDB.City = IsEditMode == true && addressinfoInsuranceCompanyBO.City == null ? addressinfoInsuranceCompanyDB.City : addressinfoInsuranceCompanyBO.City;
                    addressinfoInsuranceCompanyDB.State = IsEditMode == true && addressinfoInsuranceCompanyBO.State == null ? addressinfoInsuranceCompanyDB.State : addressinfoInsuranceCompanyBO.State;
                    addressinfoInsuranceCompanyDB.ZipCode = IsEditMode == true && addressinfoInsuranceCompanyBO.ZipCode == null ? addressinfoInsuranceCompanyDB.ZipCode : addressinfoInsuranceCompanyBO.ZipCode;
                    addressinfoInsuranceCompanyDB.Country = IsEditMode == true && addressinfoInsuranceCompanyBO.Country == null ? addressinfoInsuranceCompanyDB.Country : addressinfoInsuranceCompanyBO.Country;
                    //[STATECODE-CHANGE]
                    //addressinfoInsuranceCompanyDB.StateCode = IsEditMode == true && addressinfoInsuranceCompanyBO.StateCode == null ? addressinfoInsuranceCompanyDB.StateCode : addressinfoInsuranceCompanyBO.StateCode;
                    //[STATECODE-CHANGE]

                    if (Add_addressDB == true)
                    {
                        addressinfoInsuranceCompanyDB = _context.AddressInfoes.Add(addressinfoInsuranceCompanyDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    //if (IsEditMode == false)
                    //{
                    //    dbContextTransaction.Rollback();
                    //    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid insurance address details.", ErrorLevel = ErrorLevel.Error };
                    //}
                    addressinfoInsuranceCompanyDB = null;
                }
                #endregion

                #region Contact Info Insurance Company
                if (contactinfoInsuranceCompanyBO != null)
                {
                    bool Add_contactinfoDB = false;
                    contactinfoInsuranceCompanyDB = _context.ContactInfoes.Where(p => p.id == contactinfoInsuranceCompanyBO.ID).FirstOrDefault();

                    if (contactinfoInsuranceCompanyDB == null && contactinfoInsuranceCompanyBO.ID <= 0)
                    {
                        contactinfoInsuranceCompanyDB = new ContactInfo();
                        Add_contactinfoDB = true;
                    }
                    else if (contactinfoInsuranceCompanyDB == null && contactinfoInsuranceCompanyBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Insurance contact details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    contactinfoInsuranceCompanyDB.Name = IsEditMode == true && contactinfoInsuranceCompanyBO.Name == null ? contactinfoInsuranceCompanyDB.Name : contactinfoInsuranceCompanyBO.Name;
                    contactinfoInsuranceCompanyDB.CellPhone = IsEditMode == true && contactinfoInsuranceCompanyBO.CellPhone == null ? contactinfoInsuranceCompanyDB.CellPhone : contactinfoInsuranceCompanyBO.CellPhone;
                    contactinfoInsuranceCompanyDB.EmailAddress = IsEditMode == true && contactinfoInsuranceCompanyBO.EmailAddress == null ? contactinfoInsuranceCompanyDB.EmailAddress : contactinfoInsuranceCompanyBO.EmailAddress;
                    contactinfoInsuranceCompanyDB.HomePhone = IsEditMode == true && contactinfoInsuranceCompanyBO.HomePhone == null ? contactinfoInsuranceCompanyDB.HomePhone : contactinfoInsuranceCompanyBO.HomePhone;
                    contactinfoInsuranceCompanyDB.WorkPhone = IsEditMode == true && contactinfoInsuranceCompanyBO.WorkPhone == null ? contactinfoInsuranceCompanyDB.WorkPhone : contactinfoInsuranceCompanyBO.WorkPhone;
                    contactinfoInsuranceCompanyDB.FaxNo = IsEditMode == true && contactinfoInsuranceCompanyBO.FaxNo == null ? contactinfoInsuranceCompanyDB.FaxNo : contactinfoInsuranceCompanyBO.FaxNo;
                    contactinfoInsuranceCompanyDB.IsDeleted = contactinfoInsuranceCompanyBO.IsDeleted;

                    if (Add_contactinfoDB == true)
                    {
                        contactinfoInsuranceCompanyDB = _context.ContactInfoes.Add(contactinfoInsuranceCompanyDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid insurance contact details.", ErrorLevel = ErrorLevel.Error };
                    }
                    contactinfoInsuranceCompanyDB = null;
                }
                #endregion

                #region insurance
                if (insuranceBO != null)
                {
                    bool Add_insuranceDB = false;
                    insuranceDB = _context.PatientInsuranceInfoes.Where(p => p.Id == insuranceBO.ID).FirstOrDefault<PatientInsuranceInfo>();

                    if (insuranceDB == null && insuranceBO.ID <= 0)
                    {
                        insuranceDB = new PatientInsuranceInfo();
                        Add_insuranceDB = true;
                    }
                    else if (insuranceDB == null && insuranceBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient Insurance dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }
                    insuranceDB.PatientId = insuranceBO.patientId;
                    insuranceDB.PolicyHolderName = IsEditMode == true && insuranceBO.policyHoldersName == null ? insuranceDB.PolicyHolderName : insuranceBO.policyHoldersName;
                    insuranceDB.PolicyHolderAddressInfoId = (addressinfoPolicyHolderDB != null && addressinfoPolicyHolderDB.id > 0) ? addressinfoPolicyHolderDB.id : insuranceDB.PolicyHolderAddressInfoId;
                    insuranceDB.PolicyHolderContactInfoId = (contactinfoPolicyHolderDB != null && contactinfoPolicyHolderDB.id > 0) ? contactinfoPolicyHolderDB.id : insuranceDB.PolicyHolderContactInfoId;
                    insuranceDB.PolicyOwnerId = IsEditMode == true && insuranceBO.policyOwnerId == null ? insuranceDB.PolicyOwnerId : insuranceBO.policyOwnerId;
                    insuranceDB.InsuranceCompanyCode = IsEditMode == true && insuranceBO.insuranceCompanyCode == null ? insuranceDB.InsuranceCompanyCode : insuranceBO.insuranceCompanyCode;
                    insuranceDB.InsuranceCompanyAddressInfoId = (addressinfoInsuranceCompanyDB != null && addressinfoInsuranceCompanyDB.id > 0) ? addressinfoInsuranceCompanyDB.id : insuranceDB.InsuranceCompanyAddressInfoId;
                    insuranceDB.InsuranceCompanyContactInfoId = (contactinfoInsuranceCompanyDB != null && contactinfoInsuranceCompanyDB.id > 0) ? contactinfoInsuranceCompanyDB.id : insuranceDB.InsuranceCompanyContactInfoId;
                    insuranceDB.PolicyNo = IsEditMode == true && insuranceBO.policyNo == null ? insuranceDB.PolicyNo : insuranceBO.policyNo;
                    insuranceDB.ContactPerson = IsEditMode == true && insuranceBO.contactPerson == null ? insuranceDB.ContactPerson : insuranceBO.contactPerson;
                    insuranceDB.InsuranceTypeId = IsEditMode == true && insuranceBO.insuranceTypeId == null ? insuranceDB.InsuranceTypeId : insuranceBO.insuranceTypeId;
                    insuranceDB.IsInActive = insuranceBO.isInActive;

                    //insuranceDB.InsuranceMasterId = IsEditMode == true && insuranceBO.InsuranceMasterId == null ? insuranceDB.InsuranceMasterId : insuranceBO.InsuranceMasterId;
                    InsuranceMaster InsuranceMasterDB = _context.InsuranceMasters.Where(p => insuranceBO.InsuranceMasterId.HasValue == true && p.Id == insuranceBO.InsuranceMasterId).FirstOrDefault();
                    if (InsuranceMasterDB != null)
                    {
                        insuranceDB.InsuranceMasterId = insuranceBO.InsuranceMasterId;
                    }
                    else
                    {
                        if (IsEditMode == false)
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Insurance Master Id.", ErrorLevel = ErrorLevel.Error };
                        }
                    }

                    if (Add_insuranceDB == true)
                    {
                        insuranceDB = _context.PatientInsuranceInfoes.Add(insuranceDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Patient Insurance details.", ErrorLevel = ErrorLevel.Error };
                    }
                    insuranceDB = null;
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                insuranceDB = _context.PatientInsuranceInfoes.Include("InsuranceMaster").Where(p => p.Id == insuranceDB.Id).FirstOrDefault<PatientInsuranceInfo>();
            }

            var res = Convert<BO.PatientInsuranceInfo, PatientInsuranceInfo>(insuranceDB);
            return (object)res;
         }
        #endregion

        #region Delete By ID
        public override object Delete(int id)
        {
            var acc = _context.PatientInsuranceInfoes.Include("addressInfo").Include("contactInfo")
                              .Include("addressInfo1").Include("contactInfo1")
                              .Include("InsuranceMaster")
                              .Where(p => p.Id == id && (p.IsDeleted.HasValue == false || p.IsDeleted == false)).FirstOrDefault<PatientInsuranceInfo>();

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
              
                if (acc.AddressInfo1 != null)
                {
                    acc.AddressInfo1.IsDeleted = true;
                }
                if (acc.ContactInfo1 != null)
                {
                    acc.ContactInfo1.IsDeleted = true;
                }
                if (acc.InsuranceMaster != null)
                {
                    acc.InsuranceMaster.IsDeleted = true;
                }
                acc.IsDeleted = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.PatientInsuranceInfo, PatientInsuranceInfo>(acc);
            return (object)res;
        }
        #endregion



        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
