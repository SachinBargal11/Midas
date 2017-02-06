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
    internal class PatientEmpInfoRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<PatientEmpInfo> _dbEmpInfo;

        public PatientEmpInfoRepository(MIDASGBXEntities context) : base(context)
        {
            _dbEmpInfo = context.Set<PatientEmpInfo>();
            context.Configuration.ProxyCreationEnabled = false;
        }


        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            PatientEmpInfo PatientEmpInfo = entity as PatientEmpInfo;

            if (PatientEmpInfo == null)
                return default(T);

            BO.PatientEmpInfo PatientEmpInfoBO = new BO.PatientEmpInfo();
            PatientEmpInfoBO.ID = PatientEmpInfo.Id;
            PatientEmpInfoBO.PatientId = PatientEmpInfo.PatientId;
            PatientEmpInfoBO.JobTitle = PatientEmpInfo.JobTitle;
            PatientEmpInfoBO.EmpName = PatientEmpInfo.EmpName;
            PatientEmpInfoBO.AddressInfoId = PatientEmpInfo.AddressInfoId;
            PatientEmpInfoBO.ContactInfoId = PatientEmpInfo.ContactInfoId;
            PatientEmpInfoBO.IsCurrentEmp = PatientEmpInfo.IsCurrentEmp;
           
            return (T)(object)PatientEmpInfoBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.PatientEmpInfo patientEmpInfo = (BO.PatientEmpInfo)(object)entity;
            var result = patientEmpInfo.Validate(patientEmpInfo);
            return result;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.PatientEmpInfoes.Where(p => p.Id == id).FirstOrDefault<PatientEmpInfo>();
            BO.PatientEmpInfo acc_ = Convert<BO.PatientEmpInfo, PatientEmpInfo>(acc);

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
        //    BO.PatientEmpInfo patientEmpInfo = (BO.PatientEmpInfo)(object)entity;
        //    var acc = _context.PatientEmpInfoes.Include("User").ToList<PatientEmpInfo>();
        //    if (acc == null)
        //    {
        //        return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
        //    }
        //    List<BO.PatientEmpInfo> listpatientEmpInfo = new List<BO.PatientEmpInfo>();
        //    foreach (PatientEmpInfo item in acc)
        //    {
        //        listpatientEmpInfo.Add(Convert<BO.PatientEmpInfo, PatientEmpInfo>(item));
        //    }
        //    return listpatientEmpInfo;

        //}
        //#endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.PatientEmpInfo insuranceBO = (BO.PatientEmpInfo)(object)entity;
            BO.AddressInfo addressBO = insuranceBO.AddressInfo;
            BO.ContactInfo contactinfoBO = insuranceBO.ContactInfo;


            PatientEmpInfo insuranceDB = new PatientEmpInfo();

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
                    insuranceDB = _context.PatientEmpInfoes.Where(p => p.Id == insuranceBO.ID).FirstOrDefault();

                    if (insuranceDB == null && insuranceBO.ID <= 0)
                    {
                        insuranceDB = new PatientEmpInfo();
                        Add_insuranceDB = true;
                    }
                    else if (insuranceDB == null && insuranceBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    insuranceDB.PatientId = insuranceBO.PatientId;
                    insuranceDB.JobTitle = insuranceBO.JobTitle;
                    insuranceDB.EmpName = insuranceBO.EmpName;
                    insuranceDB.AddressInfoId = addressDB.id;
                    insuranceDB.ContactInfoId= contactinfoDB.id;
                    insuranceDB.IsCurrentEmp = insuranceBO.IsCurrentEmp;

                    if (Add_insuranceDB == true)
                    {
                        insuranceDB = _context.PatientEmpInfoes.Add(insuranceDB);
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

                insuranceDB = _context.PatientEmpInfoes.Where(p => p.Id == insuranceDB.Id).FirstOrDefault<PatientEmpInfo>();
            }

            var res = Convert<BO.PatientEmpInfo, PatientEmpInfo>(insuranceDB);
            return (object)res;
        }
        #endregion





        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
