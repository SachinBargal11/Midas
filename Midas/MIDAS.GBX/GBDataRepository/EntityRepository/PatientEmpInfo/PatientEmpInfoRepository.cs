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
            PatientEmpInfoBO.patientId = PatientEmpInfo.PatientId;
            PatientEmpInfoBO.jobTitle = PatientEmpInfo.JobTitle;
            PatientEmpInfoBO.empName = PatientEmpInfo.EmpName;
            PatientEmpInfoBO.addressInfoId = PatientEmpInfo.AddressInfoId;
            PatientEmpInfoBO.contactInfoId = PatientEmpInfo.ContactInfoId;
            PatientEmpInfoBO.isCurrentEmp = PatientEmpInfo.IsCurrentEmp;

            if (PatientEmpInfo.AddressInfo != null)
            {
                BO.AddressInfo boAddress = new BO.AddressInfo();
                boAddress.Name = PatientEmpInfo.AddressInfo.Name;
                boAddress.Address1 = PatientEmpInfo.AddressInfo.Address1;
                boAddress.Address2 = PatientEmpInfo.AddressInfo.Address2;
                boAddress.City = PatientEmpInfo.AddressInfo.City;
                boAddress.State = PatientEmpInfo.AddressInfo.State;
                boAddress.ZipCode = PatientEmpInfo.AddressInfo.ZipCode;
                boAddress.Country = PatientEmpInfo.AddressInfo.Country;
                boAddress.CreateByUserID = PatientEmpInfo.AddressInfo.CreateByUserID;
                boAddress.ID = PatientEmpInfo.AddressInfo.id;
                PatientEmpInfoBO.addressInfo = boAddress;
            }

            if (PatientEmpInfo.ContactInfo != null)
            {
                BO.ContactInfo boContactInfo = new BO.ContactInfo();
                boContactInfo.Name = PatientEmpInfo.ContactInfo.Name;
                boContactInfo.CellPhone = PatientEmpInfo.ContactInfo.CellPhone;
                boContactInfo.EmailAddress = PatientEmpInfo.ContactInfo.EmailAddress;
                boContactInfo.HomePhone = PatientEmpInfo.ContactInfo.HomePhone;
                boContactInfo.WorkPhone = PatientEmpInfo.ContactInfo.WorkPhone;
                boContactInfo.FaxNo = PatientEmpInfo.ContactInfo.FaxNo;
                boContactInfo.CreateByUserID = PatientEmpInfo.ContactInfo.CreateByUserID;
                boContactInfo.ID = PatientEmpInfo.ContactInfo.id;
                PatientEmpInfoBO.contactInfo = boContactInfo;
            }

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
            //var acc = _context.PatientEmpInfoes.Where(p => p.Id == id && p.IsCurrentEmp == true && (p.IsDeleted.HasValue == false || p.IsDeleted == false)).FirstOrDefault<PatientEmpInfo>();
            var acc = _context.PatientEmpInfoes.Include("addressInfo").Include("contactInfo").Where(p => p.Id == id && (p.IsDeleted.HasValue == false || p.IsDeleted == false)).FirstOrDefault<PatientEmpInfo>();
            BO.PatientEmpInfo acc_ = Convert<BO.PatientEmpInfo, PatientEmpInfo>(acc);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region Get By Patient Id
        public override object GetByPatientId(int PatientId)
        {
            var acc = _context.PatientEmpInfoes.Include("addressInfo").Include("contactInfo").Where(p => p.PatientId == PatientId && (p.IsDeleted.HasValue == false || p.IsDeleted == false)).ToList<PatientEmpInfo>();
            
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.PatientEmpInfo> lstpatientsEmpInfo = new List<BO.PatientEmpInfo>();
            //acc.ForEach(p => lstpatientsEmpInfo.Add(Convert<BO.PatientEmpInfo, PatientEmpInfo>(p)));
            foreach (PatientEmpInfo item in acc)
            {
                lstpatientsEmpInfo.Add(Convert<BO.PatientEmpInfo, PatientEmpInfo>(item));
            }

            return lstpatientsEmpInfo;
        }
        #endregion

        #region Get EmpInfo patient ID
        public override object GetCurrentEmpByPatientId(int PatientId)
        {
            var acc = _context.PatientEmpInfoes.Include("addressInfo")
                                                     .Include("contactInfo")
                                                     .Where(p => p.PatientId == PatientId && p.IsCurrentEmp == true && (p.IsDeleted.HasValue == false || p.IsDeleted == false))
                                                     .FirstOrDefault<PatientEmpInfo>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return acc;
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.PatientEmpInfo patientEmpInfoBO = (BO.PatientEmpInfo)(object)entity;
            BO.AddressInfo addressBO = patientEmpInfoBO.addressInfo;
            BO.ContactInfo contactinfoBO = patientEmpInfoBO.contactInfo;

            PatientEmpInfo patientEmpInfoDB = new PatientEmpInfo();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                AddressInfo addressDB = new AddressInfo();
                ContactInfo contactinfoDB = new ContactInfo();
                //User userDB = new User();

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

                #region patient Emp Info
                if (patientEmpInfoBO != null)
                {
                    if (patientEmpInfoBO.isCurrentEmp == true)
                    {
                        var existingPatientEmpInfoDB = _context.PatientEmpInfoes.Where(p => p.PatientId == patientEmpInfoBO.patientId).ToList();
                        existingPatientEmpInfoDB.ForEach(p => p.IsCurrentEmp = false);
                    }

                    bool Add_patientEmpInfoDB = false;
                    patientEmpInfoDB = _context.PatientEmpInfoes.Where(p => p.Id == patientEmpInfoBO.ID).FirstOrDefault();

                    if (patientEmpInfoDB == null && patientEmpInfoBO.ID <= 0)
                    {
                        patientEmpInfoDB = new PatientEmpInfo();
                        Add_patientEmpInfoDB = true;
                    }
                    else if (patientEmpInfoDB == null && patientEmpInfoBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    patientEmpInfoDB.PatientId = patientEmpInfoBO.patientId;
                    patientEmpInfoDB.JobTitle = patientEmpInfoBO.jobTitle;
                    patientEmpInfoDB.EmpName = patientEmpInfoBO.empName;
                    patientEmpInfoDB.AddressInfoId = addressDB.id;
                    patientEmpInfoDB.ContactInfoId= contactinfoDB.id;
                    patientEmpInfoDB.IsCurrentEmp = patientEmpInfoBO.isCurrentEmp;                    

                    if (Add_patientEmpInfoDB == true)
                    {
                        patientEmpInfoDB = _context.PatientEmpInfoes.Add(patientEmpInfoDB);
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

                patientEmpInfoDB = _context.PatientEmpInfoes.Where(p => p.Id == patientEmpInfoDB.Id).FirstOrDefault<PatientEmpInfo>();
            }

            var res = Convert<BO.PatientEmpInfo, PatientEmpInfo>(patientEmpInfoDB);
            return (object)res;
        }
        #endregion

        #region Delete By ID
        public override object DeleteById(int id)
        {
            var acc = _context.PatientEmpInfoes.Include("addressInfo").Include("contactInfo").Where(p => p.Id == id && (p.IsDeleted.HasValue == false || p.IsDeleted == false)).FirstOrDefault<PatientEmpInfo>();
            if (acc != null)
            {
                if (acc.AddressInfo != null)
                {
                    acc.AddressInfo.IsDeleted = true;
                }
                else
                {
                    return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
                if (acc.ContactInfo != null)
                {
                    acc.ContactInfo.IsDeleted = true;
                }
                else
                {
                    return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
                acc.IsDeleted = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }


            return (object)acc;
        }
        #endregion



        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
