using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository
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
            PatientEmpInfoBO.CaseId = PatientEmpInfo.CaseId;
            PatientEmpInfoBO.JobTitle = PatientEmpInfo.JobTitle;
            PatientEmpInfoBO.EmpName = PatientEmpInfo.EmpName;
            PatientEmpInfoBO.AddressInfoId = PatientEmpInfo.AddressInfoId;
            PatientEmpInfoBO.ContactInfoId = PatientEmpInfo.ContactInfoId;
            PatientEmpInfoBO.Salary = PatientEmpInfo.Salary;
            PatientEmpInfoBO.HourOrYearly = PatientEmpInfo.HourOrYearly;
            PatientEmpInfoBO.LossOfEarnings = PatientEmpInfo.LossOfEarnings;
            PatientEmpInfoBO.DatesOutOfWork = PatientEmpInfo.DatesOutOfWork;
            PatientEmpInfoBO.HoursPerWeek = PatientEmpInfo.HoursPerWeek;
            PatientEmpInfoBO.AccidentAtEmployment = PatientEmpInfo.AccidentAtEmployment;

            if (PatientEmpInfo.AddressInfo != null)
            {
                if (PatientEmpInfo.AddressInfo.IsDeleted.HasValue == false || (PatientEmpInfo.AddressInfo.IsDeleted.HasValue == true && PatientEmpInfo.AddressInfo.IsDeleted.Value == false))
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
                    PatientEmpInfoBO.AddressInfo = boAddress;
                }
            }

            if (PatientEmpInfo.ContactInfo != null)
            {
                if (PatientEmpInfo.ContactInfo.IsDeleted.HasValue == false || (PatientEmpInfo.ContactInfo.IsDeleted.HasValue == true && PatientEmpInfo.ContactInfo.IsDeleted.Value == false))
                {
                    BO.ContactInfo boContactInfo = new BO.ContactInfo();
                    boContactInfo.Name = PatientEmpInfo.ContactInfo.Name;
                    boContactInfo.CellPhone = PatientEmpInfo.ContactInfo.CellPhone;
                    boContactInfo.EmailAddress = PatientEmpInfo.ContactInfo.EmailAddress;
                    boContactInfo.HomePhone = PatientEmpInfo.ContactInfo.HomePhone;
                    boContactInfo.WorkPhone = PatientEmpInfo.ContactInfo.WorkPhone;
                    boContactInfo.FaxNo = PatientEmpInfo.ContactInfo.FaxNo;
                    boContactInfo.OfficeExtension = PatientEmpInfo.ContactInfo.OfficeExtension;
                    boContactInfo.AlternateEmail = PatientEmpInfo.ContactInfo.AlternateEmail;
                    boContactInfo.PreferredCommunication = PatientEmpInfo.ContactInfo.PreferredCommunication;
                    boContactInfo.CreateByUserID = PatientEmpInfo.ContactInfo.CreateByUserID;
                    boContactInfo.ID = PatientEmpInfo.ContactInfo.id;
                    PatientEmpInfoBO.ContactInfo = boContactInfo;
                }
            }

            //Common 
            PatientEmpInfoBO.IsDeleted = PatientEmpInfo.IsDeleted;
            PatientEmpInfoBO.CreateByUserID = PatientEmpInfo.CreateByUserID;
            PatientEmpInfoBO.UpdateByUserID = PatientEmpInfo.UpdateByUserID;

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
            var acc = _context.PatientEmpInfoes.Include("addressInfo").Include("contactInfo").Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<PatientEmpInfo>();
            BO.PatientEmpInfo acc_ = Convert<BO.PatientEmpInfo, PatientEmpInfo>(acc);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.PatientEmpInfo patientEmpInfoBO = (BO.PatientEmpInfo)(object)entity;
            BO.AddressInfo addressBO = patientEmpInfoBO.AddressInfo;
            BO.ContactInfo contactinfoBO = patientEmpInfoBO.ContactInfo;

            PatientEmpInfo patientEmpInfoDB = new PatientEmpInfo();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {

                bool IsEditMode = false;
                IsEditMode = (patientEmpInfoBO != null && patientEmpInfoBO.ID > 0) ? true : false;

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

                    addressDB.Name= IsEditMode == true && addressBO.Name == null ? addressDB.Name : addressBO.Name;
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
                    
                    contactinfoDB.Name =IsEditMode == true && contactinfoBO.Name == null ? contactinfoDB.Name : contactinfoBO.Name;
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

                #region patient Emp Info
                if (patientEmpInfoBO != null)
                {
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
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient employee information dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    patientEmpInfoDB.CaseId = patientEmpInfoBO.CaseId;
                    patientEmpInfoDB.JobTitle = IsEditMode == true && patientEmpInfoBO.JobTitle == null ? patientEmpInfoDB.JobTitle : patientEmpInfoBO.JobTitle;
                    patientEmpInfoDB.EmpName = IsEditMode == true && patientEmpInfoBO.EmpName == null ? patientEmpInfoDB.EmpName : patientEmpInfoBO.EmpName;
                    patientEmpInfoDB.AddressInfoId = (addressDB != null && addressDB.id > 0) ? addressDB.id : patientEmpInfoDB.AddressInfoId;
                    patientEmpInfoDB.ContactInfoId = (contactinfoDB != null && contactinfoDB.id > 0) ? contactinfoDB.id : patientEmpInfoDB.ContactInfoId;
                    patientEmpInfoDB.Salary = IsEditMode == true && patientEmpInfoBO.Salary == null ? patientEmpInfoDB.Salary : patientEmpInfoBO.Salary;
                    patientEmpInfoDB.HourOrYearly = IsEditMode == true && patientEmpInfoBO.HourOrYearly == null ? patientEmpInfoDB.HourOrYearly : patientEmpInfoBO.HourOrYearly;
                    patientEmpInfoDB.LossOfEarnings = IsEditMode == true && patientEmpInfoBO.LossOfEarnings == null ? patientEmpInfoDB.LossOfEarnings : patientEmpInfoBO.LossOfEarnings;
                    patientEmpInfoDB.DatesOutOfWork = IsEditMode == true && patientEmpInfoBO.DatesOutOfWork == null ? patientEmpInfoDB.DatesOutOfWork : patientEmpInfoBO.DatesOutOfWork;
                    patientEmpInfoDB.HoursPerWeek = IsEditMode == true && patientEmpInfoBO.HoursPerWeek == null ? patientEmpInfoDB.HoursPerWeek : patientEmpInfoBO.HoursPerWeek;
                    patientEmpInfoDB.AccidentAtEmployment = IsEditMode == true && patientEmpInfoBO.AccidentAtEmployment == null ? patientEmpInfoDB.AccidentAtEmployment : patientEmpInfoBO.AccidentAtEmployment;

                    if (Add_patientEmpInfoDB == true)
                    {
                        patientEmpInfoDB = _context.PatientEmpInfoes.Add(patientEmpInfoDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid patient employee information details.", ErrorLevel = ErrorLevel.Error };
                    }
                    patientEmpInfoDB = null;
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                patientEmpInfoDB = _context.PatientEmpInfoes.Include("addressInfo").Include("contactInfo").Where(p => p.Id == patientEmpInfoDB.Id).FirstOrDefault<PatientEmpInfo>();
            }

            var res = Convert<BO.PatientEmpInfo, PatientEmpInfo>(patientEmpInfoDB);
            return (object)res;
        }
        #endregion

        #region Get By Case Id
        public override object GetByCaseId(int CaseId)
        {
            var acc = _context.PatientEmpInfoes.Include("addressInfo").Include("contactInfo")
                                               .Where(p => p.CaseId == CaseId 
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .FirstOrDefault();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            BO.PatientEmpInfo patientsEmpInfo = new BO.PatientEmpInfo();
            patientsEmpInfo = Convert<BO.PatientEmpInfo, PatientEmpInfo>(acc);
            //foreach (PatientEmpInfo item in acc)
            //{
            //    lstpatientsEmpInfo.Add(Convert<BO.PatientEmpInfo, PatientEmpInfo>(item));
            //}

            return patientsEmpInfo;
        }
        #endregion

        #region Delete By ID
        public override object Delete(int id)
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

            var res = Convert<BO.PatientEmpInfo, PatientEmpInfo>(acc);
            return (object)res;
        }
        #endregion

        #region Get EmpInfo patient ID
        //public override object GetCurrentEmpByPatientId(int PatientId)
        //{
        //    var acc = _context.PatientEmpInfoes.Include("addressInfo")
        //                                             .Include("contactInfo")
        //                                             .Where(p => p.PatientId == PatientId && p.IsCurrentEmp == true && (p.IsDeleted.HasValue == false || p.IsDeleted == false))
        //                                             .FirstOrDefault<PatientEmpInfo>();

        //    if (acc == null)
        //    {
        //        return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
        //    }

        //    else
        //    {
        //        BO.PatientEmpInfo acc_ = Convert<BO.PatientEmpInfo, PatientEmpInfo>(acc);
        //        return (object)acc_;
        //    }

        //}
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
