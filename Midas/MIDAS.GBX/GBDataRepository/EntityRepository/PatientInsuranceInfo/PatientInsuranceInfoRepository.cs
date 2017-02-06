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
            var acc = _context.PatientInsuranceInfoes.Where(p => p.Id == id).FirstOrDefault<PatientInsuranceInfo>();
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
            BO.AddressInfo addressBO = insuranceBO.AddressInfo;
            BO.ContactInfo contactinfoBO = insuranceBO.ContactInfo;


            PatientInsuranceInfo insuranceDB = new PatientInsuranceInfo();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                AddressInfo addressDB = new AddressInfo();
                ContactInfo contactinfoDB = new ContactInfo();
                User userDB = new User();

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

                    addressDB.id = addressBO.ID;
                    addressDB.Name = addressBO.Name;
                    addressDB.Address1 = addressBO.Address1;
                    addressDB.Address2 = addressBO.Address2;
                    addressDB.City = addressBO.City;
                    addressDB.State = addressBO.State;
                    addressDB.ZipCode = addressBO.ZipCode;
                    addressDB.Country = addressBO.Country;

                    if (Add_addressDB == true)
                    {
                        addressDB = _context.AddressInfoes.Add(addressDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Address details.", ErrorLevel = ErrorLevel.Error };
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
                    contactinfoDB.id = contactinfoBO.ID;
                    contactinfoDB.Name = contactinfoBO.Name;
                    contactinfoDB.CellPhone = contactinfoBO.CellPhone;
                    contactinfoDB.EmailAddress = contactinfoBO.EmailAddress;
                    contactinfoDB.HomePhone = contactinfoBO.HomePhone;
                    contactinfoDB.WorkPhone = contactinfoBO.WorkPhone;
                    contactinfoDB.FaxNo = contactinfoBO.FaxNo;
                    contactinfoDB.IsDeleted = contactinfoBO.IsDeleted;

                    if (Add_contactinfoDB == true)
                    {
                        contactinfoDB = _context.ContactInfoes.Add(contactinfoDB);
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
                    insuranceDB.PolicyHolderAddressInfoId = insuranceBO.PolicyHolderAddressInfoId;
                    insuranceDB.PolicyHolderContactInfoId = insuranceBO.PolicyHolderContactInfoId;
                    insuranceDB.PolicyOwnerId = insuranceBO.PolicyOwnerId;
                    insuranceDB.InsuranceCompanyCode = insuranceBO.InsuranceCompanyCode;
                    insuranceDB.InsuranceCompanyAddressInfoId = insuranceBO.InsuranceCompanyAddressInfoId;
                    insuranceDB.InsuranceCompanyContactInfoId = insuranceBO.InsuranceCompanyContactInfoId;
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
