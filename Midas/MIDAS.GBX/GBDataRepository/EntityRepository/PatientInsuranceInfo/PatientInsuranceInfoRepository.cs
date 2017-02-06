﻿using MIDAS.GBX.EntityRepository;
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
            insuranceBO.PatientId = InsuranceInfos.PatientId;
            insuranceBO.PolicyHoldersName = InsuranceInfos.PolicyHolderName;
            insuranceBO.PolicyHolderAddressInfoId = InsuranceInfos.PolicyHolderAddressInfoId;
            insuranceBO.PolicyHolderContactInfoId = InsuranceInfos.PolicyHolderContactInfoId;
            insuranceBO.PolicyOwnerId = InsuranceInfos.PolicyOwnerId;
            insuranceBO.InsuranceCompanyCode = InsuranceInfos.InsuranceCompanyCode;
            insuranceBO.InsuranceCompanyAddressInfoId = InsuranceInfos.InsuranceCompanyAddressInfoId;
            insuranceBO.InsuranceCompanyContactInfoId = InsuranceInfos.InsuranceCompanyContactInfoId;
            insuranceBO.PolicyNo = InsuranceInfos.PolicyNo;
            insuranceBO.ContactPerson = InsuranceInfos.ContactPerson;
            insuranceBO.ClaimFileNo = InsuranceInfos.ClaimFileNo;
            insuranceBO.WCBNo = InsuranceInfos.WCBNo;
            insuranceBO.InsuranceType = InsuranceInfos.InsuranceType;
            insuranceBO.IsInActive = InsuranceInfos.IsInActive;

            //BO.User boUser = new BO.User();
            //using (UserRepository cmp = new UserRepository(_context))
            //{
            //    boUser = cmp.Convert<BO.User, User>(InsuranceInfos.User);
            //    insuranceBO.User = boUser;
            //}
            //BO.Case cases = new BO.Case();
            //using (CaseRepository cmp = new CaseRepository(_context))
            //{
            //    cases = cmp.Convert<BO.Case, Case>(InsuranceInfos.Cases);
            //    insuranceBO.Cases = cases;
            //}

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
            var acc = _context.PatientInsuranceInfoes.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || p.IsDeleted == false)).FirstOrDefault<PatientInsuranceInfo>();
            BO.PatientInsuranceInfo acc_ = Convert<BO.PatientInsuranceInfo, PatientInsuranceInfo>(acc);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        //#region Get All 
        //public override Object Get<T>(T entity)
        //{
        //    BO.InsuranceInfo insuranceBO = (BO.InsuranceInfo)(object)entity;
        //    var acc = _context.InsuranceInfoes.Include("User").ToList<InsuranceInfo>();
        //    if (acc == null)
        //    {
        //        return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
        //    }
        //    List<BO.InsuranceInfo> listinsurance = new List<BO.InsuranceInfo>();
        //    foreach (InsuranceInfo item in acc)
        //    {
        //        listinsurance.Add(Convert<BO.InsuranceInfo, InsuranceInfo>(item));
        //    }
        //    return listinsurance;

        //}
        //#endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.PatientInsuranceInfo insuranceBO = (BO.PatientInsuranceInfo)(object)entity;
            BO.AddressInfo addressinfoPolicyHolderBO = insuranceBO.AddressInfo;
            BO.ContactInfo contactinfoPolicyHolderBO = insuranceBO.ContactInfo;
            BO.AddressInfo addressinfoInsuranceCompanyBO = insuranceBO.AddressInfo1;
            BO.ContactInfo contactinfoInsuranceCompanyBO = insuranceBO.ContactInfo1;

            PatientInsuranceInfo insuranceDB = new PatientInsuranceInfo();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
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
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Address details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    //addressinfoPolicyHolderDB.id = addressinfoPolicyHolderBO.ID;
                    addressinfoPolicyHolderDB.Name = addressinfoPolicyHolderBO.Name;
                    addressinfoPolicyHolderDB.Address1 = addressinfoPolicyHolderBO.Address1;
                    addressinfoPolicyHolderDB.Address2 = addressinfoPolicyHolderBO.Address2;
                    addressinfoPolicyHolderDB.City = addressinfoPolicyHolderBO.City;
                    addressinfoPolicyHolderDB.State = addressinfoPolicyHolderBO.State;
                    addressinfoPolicyHolderDB.ZipCode = addressinfoPolicyHolderBO.ZipCode;
                    addressinfoPolicyHolderDB.Country = addressinfoPolicyHolderBO.Country;

                    if (Add_addressDB == true)
                    {
                        addressinfoPolicyHolderDB = _context.AddressInfoes.Add(addressinfoPolicyHolderDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Address details.", ErrorLevel = ErrorLevel.Error };
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
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Contact details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    //contactinfoPolicyHolderDB.id = contactinfoPolicyHolderBO.ID;
                    contactinfoPolicyHolderDB.Name = contactinfoPolicyHolderBO.Name;
                    contactinfoPolicyHolderDB.CellPhone = contactinfoPolicyHolderBO.CellPhone;
                    contactinfoPolicyHolderDB.EmailAddress = contactinfoPolicyHolderBO.EmailAddress;
                    contactinfoPolicyHolderDB.HomePhone = contactinfoPolicyHolderBO.HomePhone;
                    contactinfoPolicyHolderDB.WorkPhone = contactinfoPolicyHolderBO.WorkPhone;
                    contactinfoPolicyHolderDB.FaxNo = contactinfoPolicyHolderBO.FaxNo;
                    contactinfoPolicyHolderDB.IsDeleted = contactinfoPolicyHolderBO.IsDeleted;

                    if (Add_contactinfoDB == true)
                    {
                        contactinfoPolicyHolderDB = _context.ContactInfoes.Add(contactinfoPolicyHolderDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Contact details.", ErrorLevel = ErrorLevel.Error };
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
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Insurance  Address details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    //addressinfoInsuranceCompanyDB.id = addressinfoInsuranceCompanyBO.ID;
                    addressinfoInsuranceCompanyDB.Name = addressinfoInsuranceCompanyBO.Name;
                    addressinfoInsuranceCompanyDB.Address1 = addressinfoInsuranceCompanyBO.Address1;
                    addressinfoInsuranceCompanyDB.Address2 = addressinfoInsuranceCompanyBO.Address2;
                    addressinfoInsuranceCompanyDB.City = addressinfoInsuranceCompanyBO.City;
                    addressinfoInsuranceCompanyDB.State = addressinfoInsuranceCompanyBO.State;
                    addressinfoInsuranceCompanyDB.ZipCode = addressinfoInsuranceCompanyBO.ZipCode;
                    addressinfoInsuranceCompanyDB.Country = addressinfoInsuranceCompanyBO.Country;

                    if (Add_addressDB == true)
                    {
                        addressinfoInsuranceCompanyDB = _context.AddressInfoes.Add(addressinfoInsuranceCompanyDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Address details.", ErrorLevel = ErrorLevel.Error };
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
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Contact details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    //contactinfoInsuranceCompanyDB.id = contactinfoInsuranceCompanyBO.ID;
                    contactinfoInsuranceCompanyDB.Name = contactinfoInsuranceCompanyBO.Name;
                    contactinfoInsuranceCompanyDB.CellPhone = contactinfoInsuranceCompanyBO.CellPhone;
                    contactinfoInsuranceCompanyDB.EmailAddress = contactinfoInsuranceCompanyBO.EmailAddress;
                    contactinfoInsuranceCompanyDB.HomePhone = contactinfoInsuranceCompanyBO.HomePhone;
                    contactinfoInsuranceCompanyDB.WorkPhone = contactinfoInsuranceCompanyBO.WorkPhone;
                    contactinfoInsuranceCompanyDB.FaxNo = contactinfoInsuranceCompanyBO.FaxNo;
                    contactinfoInsuranceCompanyDB.IsDeleted = contactinfoInsuranceCompanyBO.IsDeleted;

                    if (Add_contactinfoDB == true)
                    {
                        contactinfoInsuranceCompanyDB = _context.ContactInfoes.Add(contactinfoInsuranceCompanyDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Contact details.", ErrorLevel = ErrorLevel.Error };
                }
                #endregion

                #region insurance
                if (insuranceBO != null)
                {
                    bool Add_insuranceDB = false;
                    insuranceDB = _context.PatientInsuranceInfoes.Where(p => p.Id == insuranceBO.ID).FirstOrDefault();

                    if (insuranceDB == null && insuranceBO.ID <= 0)
                    {
                        insuranceDB = new PatientInsuranceInfo();
                        Add_insuranceDB = true;
                    }
                    else if (insuranceDB == null && insuranceBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    insuranceDB.PatientId = insuranceBO.PatientId;
                    insuranceDB.PolicyHolderName = insuranceBO.PolicyHoldersName;
                    insuranceDB.PolicyHolderAddressInfoId = addressinfoPolicyHolderDB.id;
                    insuranceDB.PolicyHolderContactInfoId = contactinfoPolicyHolderDB.id;
                    insuranceDB.PolicyOwnerId = insuranceBO.PolicyOwnerId;
                    insuranceDB.InsuranceCompanyCode = insuranceBO.InsuranceCompanyCode;
                    insuranceDB.InsuranceCompanyAddressInfoId = addressinfoInsuranceCompanyDB.id;
                    insuranceDB.InsuranceCompanyContactInfoId = contactinfoInsuranceCompanyDB.id;
                    insuranceDB.PolicyNo = insuranceBO.PolicyNo;
                    insuranceDB.ContactPerson = insuranceBO.ContactPerson;
                    insuranceDB.ClaimFileNo = insuranceBO.ClaimFileNo;
                    insuranceDB.WCBNo = insuranceBO.WCBNo;
                    insuranceDB.InsuranceType = insuranceBO.InsuranceType;
                    insuranceDB.IsInActive = insuranceBO.IsInActive;

                    if (Add_insuranceDB == true)
                    {
                        insuranceDB = _context.PatientInsuranceInfoes.Add(insuranceDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Patient details.", ErrorLevel = ErrorLevel.Error };
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                insuranceDB = _context.PatientInsuranceInfoes.Where(p => p.Id == insuranceDB.Id).FirstOrDefault<PatientInsuranceInfo>();
            }

            var res = Convert<BO.PatientInsuranceInfo, PatientInsuranceInfo>(insuranceDB);
            return (object)res;
        }
        #endregion
        
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}