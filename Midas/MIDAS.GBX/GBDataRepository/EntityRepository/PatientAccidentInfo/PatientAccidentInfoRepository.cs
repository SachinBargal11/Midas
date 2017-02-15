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
    internal class PatientAccidentInfoRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<PatientAccidentInfo> _dbAccidentInfo;

        public PatientAccidentInfoRepository(MIDASGBXEntities context) : base(context)
        {
            _dbAccidentInfo = context.Set<PatientAccidentInfo>();
            context.Configuration.ProxyCreationEnabled = false;
        }


        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            PatientAccidentInfo PatientEmpInfo = entity as PatientAccidentInfo;

            if (PatientEmpInfo == null)
                return default(T);

            BO.PatientAccidentInfo PatientAccidentInfoBO = new BO.PatientAccidentInfo();
            PatientAccidentInfoBO.ID = PatientEmpInfo.Id;
            PatientAccidentInfoBO.accidentDate = PatientEmpInfo.AccidentDate;
            PatientAccidentInfoBO.plateNumber = PatientEmpInfo.PlateNumber;
            PatientAccidentInfoBO.reportNumber = PatientEmpInfo.ReportNumber;
            PatientAccidentInfoBO.accidentAddressInfoId = PatientEmpInfo.AccidentAddressInfoId;
            PatientAccidentInfoBO.hospitalName = PatientEmpInfo.HospitalName;
            PatientAccidentInfoBO.hospitalAddressInfoId = PatientEmpInfo.HospitalAddressInfoId;
            PatientAccidentInfoBO.dateOfAdmission = PatientEmpInfo.DateOfAdmission;
            PatientAccidentInfoBO.additionalPatients = PatientEmpInfo.AdditionalPatients;
            PatientAccidentInfoBO.describeInjury = PatientEmpInfo.DescribeInjury;
            PatientAccidentInfoBO.patientTypeId = PatientEmpInfo.PatientTypeId;
            PatientAccidentInfoBO.caseId = PatientEmpInfo.CaseId;

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
                PatientAccidentInfoBO.accidentAddressInfo = boAddress;
            }
            if (PatientEmpInfo.AddressInfo1 != null)
            {
                BO.AddressInfo boAddress1 = new BO.AddressInfo();
                boAddress1.Name = PatientEmpInfo.AddressInfo1.Name;
                boAddress1.Address1 = PatientEmpInfo.AddressInfo1.Address1;
                boAddress1.Address2 = PatientEmpInfo.AddressInfo1.Address2;
                boAddress1.City = PatientEmpInfo.AddressInfo1.City;
                boAddress1.State = PatientEmpInfo.AddressInfo1.State;
                boAddress1.ZipCode = PatientEmpInfo.AddressInfo1.ZipCode;
                boAddress1.Country = PatientEmpInfo.AddressInfo1.Country;
                boAddress1.CreateByUserID = PatientEmpInfo.AddressInfo1.CreateByUserID;
                boAddress1.ID = PatientEmpInfo.AddressInfo1.id;
                PatientAccidentInfoBO.hospitalAddressInfo = boAddress1;
            }

            return (T)(object)PatientAccidentInfoBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.PatientAccidentInfo PatientAccidentInfo = (BO.PatientAccidentInfo)(object)entity;
            var result = PatientAccidentInfo.Validate(PatientAccidentInfo);
            return result;
        }
        #endregion

        #region Get By Id 
        public override object Get(int id)
        {

            var acc = _context.PatientAccidentInfoes.Include("AddressInfo")
                                                     .Include("AddressInfo1")
                                                     .Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                     .FirstOrDefault<PatientAccidentInfo>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this RefferingOffice.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                BO.PatientAccidentInfo acc_ = Convert<BO.PatientAccidentInfo, PatientAccidentInfo>(acc);
                return (object)acc_;
            }
        }
        #endregion

        //#region Get By Patient Id
        //public override object GetByPatientId(int PatientId)
        //{
        //    var acc = _context.PatientAccidentInfoes.Include("AddressInfo")
        //                                             .Include("AddressInfo1")
        //                                             .Where(p => p.PatientId == PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
        //                                             .ToList<PatientAccidentInfo>();

        //    if (acc == null)
        //    {
        //        return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
        //    }

        //    List<BO.PatientAccidentInfo> lstpatientsEmpInfo = new List<BO.PatientAccidentInfo>();
        //    //acc.ForEach(p => lstpatientsEmpInfo.Add(Convert<BO.PatientEmpInfo, PatientEmpInfo>(p)));
        //    foreach (PatientAccidentInfo item in acc)
        //    {
        //        lstpatientsEmpInfo.Add(Convert<BO.PatientAccidentInfo, PatientAccidentInfo>(item));
        //    }

        //    return lstpatientsEmpInfo;
        //}
        //#endregion


        //#region save
        //public override object Save<T>(T entity)
        //{
        //    BO.PatientAccidentInfo PatientAccidentInfoBO = (BO.PatientAccidentInfo)(object)entity;
        //    BO.AddressInfo AccidentAddressInfoBO = PatientAccidentInfoBO.accidentAddressInfo;
        //    BO.AddressInfo HospitalAddressInfoBO = PatientAccidentInfoBO.hospitalAddressInfo;

        //    PatientAccidentInfo PatientAccidentInfoDB = new PatientAccidentInfo();

        //    using (var dbContextTransaction = _context.Database.BeginTransaction())
        //    {
        //        AddressInfo AccidentAddressInfoDB = new AddressInfo();
        //        AddressInfo HospitalAddressInfoDB = new AddressInfo();
        //        //User userDB = new User();

        //        #region accident Address 
        //        if (AccidentAddressInfoBO != null)
        //        {
        //            bool Add_addressDB = false;
        //            AccidentAddressInfoDB = _context.AddressInfoes.Where(p => p.id == AccidentAddressInfoBO.ID).FirstOrDefault();

        //            if (AccidentAddressInfoDB == null && AccidentAddressInfoBO.ID <= 0)
        //            {
        //                AccidentAddressInfoDB = new AddressInfo();
        //                Add_addressDB = true;
        //            }
        //            else if (AccidentAddressInfoDB == null && AccidentAddressInfoBO.ID > 0)
        //            {
        //                dbContextTransaction.Rollback();
        //                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Address details dosent exists.", ErrorLevel = ErrorLevel.Error };
        //            }

        //            AccidentAddressInfoDB.id = AccidentAddressInfoBO.ID;
        //            AccidentAddressInfoDB.Name = AccidentAddressInfoBO.Name;
        //            AccidentAddressInfoDB.Address1 = AccidentAddressInfoBO.Address1;
        //            AccidentAddressInfoDB.Address2 = AccidentAddressInfoBO.Address2;
        //            AccidentAddressInfoDB.City = AccidentAddressInfoBO.City;
        //            AccidentAddressInfoDB.State = AccidentAddressInfoBO.State;
        //            AccidentAddressInfoDB.ZipCode = AccidentAddressInfoBO.ZipCode;
        //            AccidentAddressInfoDB.Country = AccidentAddressInfoBO.Country;

        //            if (Add_addressDB == true)
        //            {
        //                AccidentAddressInfoDB = _context.AddressInfoes.Add(AccidentAddressInfoDB);
        //            }
        //            _context.SaveChanges();
        //        }
        //        else
        //        {
        //            dbContextTransaction.Rollback();
        //            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Address details.", ErrorLevel = ErrorLevel.Error };
        //        }
        //        #endregion

        //        #region Hospital Address 
        //        if (HospitalAddressInfoBO != null)
        //        {
        //            bool Add_addressDB = false;
        //            HospitalAddressInfoDB = _context.AddressInfoes.Where(p => p.id == HospitalAddressInfoBO.ID).FirstOrDefault();

        //            if (HospitalAddressInfoDB == null && HospitalAddressInfoBO.ID <= 0)
        //            {
        //                HospitalAddressInfoDB = new AddressInfo();
        //                Add_addressDB = true;
        //            }
        //            else if (HospitalAddressInfoDB == null && HospitalAddressInfoBO.ID > 0)
        //            {
        //                dbContextTransaction.Rollback();
        //                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Address details dosent exists.", ErrorLevel = ErrorLevel.Error };
        //            }

        //            HospitalAddressInfoDB.id = HospitalAddressInfoBO.ID;
        //            HospitalAddressInfoDB.Name = HospitalAddressInfoBO.Name;
        //            HospitalAddressInfoDB.Address1 = HospitalAddressInfoBO.Address1;
        //            HospitalAddressInfoDB.Address2 = HospitalAddressInfoBO.Address2;
        //            HospitalAddressInfoDB.City = HospitalAddressInfoBO.City;
        //            HospitalAddressInfoDB.State = HospitalAddressInfoBO.State;
        //            HospitalAddressInfoDB.ZipCode = HospitalAddressInfoBO.ZipCode;
        //            HospitalAddressInfoDB.Country = HospitalAddressInfoBO.Country;

        //            if (Add_addressDB == true)
        //            {
        //                HospitalAddressInfoDB = _context.AddressInfoes.Add(HospitalAddressInfoDB);
        //            }
        //            _context.SaveChanges();
        //        }
        //        else
        //        {
        //            dbContextTransaction.Rollback();
        //            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Address details.", ErrorLevel = ErrorLevel.Error };
        //        }
        //        #endregion

        //        #region patient Accident Info
        //        if (PatientAccidentInfoBO != null)
        //        {
        //            if (PatientAccidentInfoBO.isCurrentAccident == true)
        //            {
        //                var existingPatientAccidentInfoDB = _context.PatientAccidentInfoes.Where(p => p.PatientId == PatientAccidentInfoBO.patientId).ToList();
        //                existingPatientAccidentInfoDB.ForEach(p => p.IsCurrentAccident = false);
        //            }
        //            bool Add_PatientAccidentInfoDB = false;
        //            PatientAccidentInfoDB = _context.PatientAccidentInfoes.Where(p => p.Id == PatientAccidentInfoBO.ID).FirstOrDefault();

        //            if (PatientAccidentInfoDB == null && PatientAccidentInfoBO.ID <= 0)
        //            {
        //                PatientAccidentInfoDB = new PatientAccidentInfo();
        //                Add_PatientAccidentInfoDB = true;
        //            }
        //            else if (PatientAccidentInfoDB == null && PatientAccidentInfoBO.ID > 0)
        //            {
        //                dbContextTransaction.Rollback();
        //                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient dosent exists.", ErrorLevel = ErrorLevel.Error };
        //            }

        //            PatientAccidentInfoDB.PatientId = PatientAccidentInfoBO.patientId;
        //            PatientAccidentInfoDB.AccidentDate = PatientAccidentInfoBO.accidentDate;
        //            PatientAccidentInfoDB.PlateNumber = PatientAccidentInfoBO.plateNumber;
        //            PatientAccidentInfoDB.ReportNumber = PatientAccidentInfoBO.reportNumber;
        //            PatientAccidentInfoDB.HospitalName = PatientAccidentInfoBO.hospitalName;
        //            PatientAccidentInfoDB.DateOfAdmission = PatientAccidentInfoBO.dateOfAdmission;
        //            PatientAccidentInfoDB.AdditionalPatients = PatientAccidentInfoBO.additionalPatients;
        //            PatientAccidentInfoDB.DescribeInjury = PatientAccidentInfoBO.describeInjury;
        //            PatientAccidentInfoDB.PatientTypeId = PatientAccidentInfoBO.patientTypeId;
        //            PatientAccidentInfoDB.AccidentAddressInfoId = AccidentAddressInfoDB.id;
        //            PatientAccidentInfoDB.HospitalAddressInfoId = HospitalAddressInfoDB.id;
        //            PatientAccidentInfoDB.IsCurrentAccident = PatientAccidentInfoBO.isCurrentAccident;

        //            if (Add_PatientAccidentInfoDB == true)
        //            {
        //                PatientAccidentInfoDB = _context.PatientAccidentInfoes.Add(PatientAccidentInfoDB);
        //            }
        //            _context.SaveChanges();
        //        }
        //        else
        //        {
        //            dbContextTransaction.Rollback();
        //            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Patient details.", ErrorLevel = ErrorLevel.Error };
        //        }

        //        _context.SaveChanges();
        //        #endregion

        //        dbContextTransaction.Commit();

        //        PatientAccidentInfoDB = _context.PatientAccidentInfoes.Where(p => p.Id == PatientAccidentInfoDB.Id).FirstOrDefault<PatientAccidentInfo>();
        //    }

        //    var res = Convert<BO.PatientAccidentInfo, PatientAccidentInfo>(PatientAccidentInfoDB);
        //    return (object)res;
        //}
        //#endregion


        #region save
        public override object Save<T>(T entity)
        {
            BO.PatientAccidentInfo PatientAccidentInfoBO = (BO.PatientAccidentInfo)(object)entity;
            BO.AddressInfo AccidentAddressInfoBO = PatientAccidentInfoBO.accidentAddressInfo;
            BO.AddressInfo HospitalAddressInfoBO = PatientAccidentInfoBO.hospitalAddressInfo;

            PatientAccidentInfo PatientAccidentInfoDB = new PatientAccidentInfo();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                AddressInfo AccidentAddressInfoDB = new AddressInfo();
                AddressInfo HospitalAddressInfoDB = new AddressInfo();
                //User userDB = new User();

                bool IsEditMode = false;
                IsEditMode = (PatientAccidentInfoBO != null && PatientAccidentInfoBO.ID > 0) ? true : false;

                bool IsAccAddressEditMode = false;
                IsAccAddressEditMode = (AccidentAddressInfoBO != null && AccidentAddressInfoBO.ID > 0) ? true : false;
                bool IsHosAddressEditMode = false;
                IsHosAddressEditMode = (HospitalAddressInfoBO != null && HospitalAddressInfoBO.ID > 0) ? true : false;

                #region accident Address 
                if (AccidentAddressInfoBO != null)
                {
                    bool Add_addressDB = false;
                    AccidentAddressInfoDB = _context.AddressInfoes.Where(p => p.id == AccidentAddressInfoBO.ID).FirstOrDefault();

                    if (AccidentAddressInfoDB == null && AccidentAddressInfoBO.ID <= 0)
                    {
                        AccidentAddressInfoDB = new AddressInfo();
                        Add_addressDB = true;
                    }
                    else if (AccidentAddressInfoDB == null && AccidentAddressInfoBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Accident address details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    // AccidentAddressInfoDB.id = (IsAccAddressEditMode == true && AccidentAddressInfoBO.ID <= 0) ? AccidentAddressInfoDB.id : AccidentAddressInfoBO.ID;
                    AccidentAddressInfoDB.Name = (IsAccAddressEditMode == true && AccidentAddressInfoBO.Name == null) ? AccidentAddressInfoDB.Name : AccidentAddressInfoBO.Name;
                    AccidentAddressInfoDB.Address1 = (IsAccAddressEditMode == true && AccidentAddressInfoBO.Address1 == null) ? AccidentAddressInfoDB.Address1 : AccidentAddressInfoBO.Address1;
                    AccidentAddressInfoDB.Address2 = (IsAccAddressEditMode == true && AccidentAddressInfoBO.Address2 == null) ? AccidentAddressInfoDB.Address2 : AccidentAddressInfoBO.Address2;
                    AccidentAddressInfoDB.City = (IsAccAddressEditMode == true && AccidentAddressInfoBO.City == null) ? AccidentAddressInfoDB.City :  AccidentAddressInfoBO.City;
                    AccidentAddressInfoDB.State = (IsAccAddressEditMode == true && AccidentAddressInfoBO.State == null) ? AccidentAddressInfoDB.State : AccidentAddressInfoBO.State;
                    AccidentAddressInfoDB.ZipCode = (IsAccAddressEditMode == true && AccidentAddressInfoBO.ZipCode == null) ? AccidentAddressInfoDB.ZipCode : AccidentAddressInfoBO.ZipCode;
                    AccidentAddressInfoDB.Country = (IsAccAddressEditMode == true && AccidentAddressInfoBO.Country == null) ? AccidentAddressInfoDB.Country : AccidentAddressInfoBO.Country;

                    if (Add_addressDB == true)
                    {
                        AccidentAddressInfoDB = _context.AddressInfoes.Add(AccidentAddressInfoDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Accident address details.", ErrorLevel = ErrorLevel.Error };
                }
                #endregion

                #region Hospital Address 
                if (HospitalAddressInfoBO != null)
                {
                    bool Add_addressDB = false;
                    HospitalAddressInfoDB = _context.AddressInfoes.Where(p => p.id == HospitalAddressInfoBO.ID).FirstOrDefault();

                    if (HospitalAddressInfoDB == null && HospitalAddressInfoBO.ID <= 0)
                    {
                        HospitalAddressInfoDB = new AddressInfo();
                        Add_addressDB = true;
                    }
                    else if (HospitalAddressInfoDB == null && HospitalAddressInfoBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Hospital address details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    // HospitalAddressInfoDB.id = HospitalAddressInfoBO.ID;
                    HospitalAddressInfoDB.Name = (IsHosAddressEditMode == true && HospitalAddressInfoBO.Name == null) ? HospitalAddressInfoDB.Name : HospitalAddressInfoBO.Name;
                    HospitalAddressInfoDB.Address1 = (IsHosAddressEditMode == true && HospitalAddressInfoBO.Address1 == null) ? HospitalAddressInfoDB.Address1 : HospitalAddressInfoBO.Address1;
                    HospitalAddressInfoDB.Address2 = (IsHosAddressEditMode == true && HospitalAddressInfoBO.Address2 == null) ? HospitalAddressInfoDB.Address2 : HospitalAddressInfoBO.Address2;
                    HospitalAddressInfoDB.City = (IsHosAddressEditMode == true && HospitalAddressInfoBO.City == null) ? HospitalAddressInfoDB.City : HospitalAddressInfoBO.City;
                    HospitalAddressInfoDB.State = (IsHosAddressEditMode == true && HospitalAddressInfoBO.State == null) ? HospitalAddressInfoDB.State : HospitalAddressInfoBO.State;
                    HospitalAddressInfoDB.ZipCode = (IsHosAddressEditMode == true && HospitalAddressInfoBO.ZipCode == null) ? HospitalAddressInfoDB.ZipCode : HospitalAddressInfoBO.ZipCode;
                    HospitalAddressInfoDB.Country = (IsHosAddressEditMode == true && HospitalAddressInfoBO.Country == null) ? HospitalAddressInfoDB.Country : HospitalAddressInfoBO.Country;

                    if (Add_addressDB == true)
                    {
                        HospitalAddressInfoDB = _context.AddressInfoes.Add(HospitalAddressInfoDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid hospital address details.", ErrorLevel = ErrorLevel.Error };
                }
                #endregion

                #region patient Accident Info
                if (PatientAccidentInfoBO != null)
                {
                    //if (PatientAccidentInfoBO.isCurrentAccident == true)
                    //{
                    //    var existingPatientAccidentInfoDB = _context.PatientAccidentInfoes.Where(p => p.PatientId == PatientAccidentInfoBO.patientId).ToList();
                    //    existingPatientAccidentInfoDB.ForEach(p => p.IsCurrentAccident = false);
                    //}
                    bool Add_PatientAccidentInfoDB = false;
                    PatientAccidentInfoDB = _context.PatientAccidentInfoes.Where(p => p.Id == PatientAccidentInfoBO.ID).FirstOrDefault();

                    if (PatientAccidentInfoDB == null && PatientAccidentInfoBO.ID <= 0)
                    {
                        PatientAccidentInfoDB = new PatientAccidentInfo();
                        Add_PatientAccidentInfoDB = true;
                    }
                    else if (PatientAccidentInfoDB == null && PatientAccidentInfoBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }
                    if (IsEditMode == false)
                    {
                        PatientAccidentInfoDB.CaseId = PatientAccidentInfoBO.caseId;
                    }
                    PatientAccidentInfoDB.AccidentDate = (IsEditMode == true && PatientAccidentInfoBO.accidentDate == null) ? PatientAccidentInfoDB.AccidentDate : PatientAccidentInfoBO.accidentDate;
                    PatientAccidentInfoDB.PlateNumber = (IsEditMode == true && PatientAccidentInfoBO.plateNumber == null) ? PatientAccidentInfoDB.PlateNumber : PatientAccidentInfoBO.plateNumber;
                    PatientAccidentInfoDB.ReportNumber = (IsEditMode == true && PatientAccidentInfoBO.reportNumber == null) ? PatientAccidentInfoDB.ReportNumber : PatientAccidentInfoBO.reportNumber;
                    PatientAccidentInfoDB.HospitalName = (IsEditMode == true && PatientAccidentInfoBO.hospitalName == null) ? PatientAccidentInfoDB.HospitalName : PatientAccidentInfoBO.hospitalName;
                    PatientAccidentInfoDB.DateOfAdmission = (IsEditMode == true && PatientAccidentInfoBO.dateOfAdmission == null) ? PatientAccidentInfoDB.DateOfAdmission : PatientAccidentInfoBO.dateOfAdmission;
                    PatientAccidentInfoDB.AdditionalPatients = (IsEditMode == true && PatientAccidentInfoBO.additionalPatients == null) ? PatientAccidentInfoDB.AdditionalPatients : PatientAccidentInfoBO.additionalPatients;
                    PatientAccidentInfoDB.DescribeInjury = (IsEditMode == true && PatientAccidentInfoBO.describeInjury == null) ? PatientAccidentInfoDB.DescribeInjury :  PatientAccidentInfoBO.describeInjury;
                    PatientAccidentInfoDB.PatientTypeId = (IsEditMode == true && PatientAccidentInfoBO.patientTypeId == null) ? PatientAccidentInfoDB.PatientTypeId :  PatientAccidentInfoBO.patientTypeId.Value;
                    PatientAccidentInfoDB.AccidentAddressInfoId = (IsEditMode == true && PatientAccidentInfoBO.accidentAddressInfoId == null) ? PatientAccidentInfoDB.AccidentAddressInfoId : AccidentAddressInfoDB.id;
                    PatientAccidentInfoDB.HospitalAddressInfoId = (IsEditMode == true && PatientAccidentInfoBO.hospitalAddressInfoId == null) ? PatientAccidentInfoDB.HospitalAddressInfoId :  HospitalAddressInfoDB.id;

                    if (Add_PatientAccidentInfoDB == true)
                    {
                        PatientAccidentInfoDB = _context.PatientAccidentInfoes.Add(PatientAccidentInfoDB);
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

                PatientAccidentInfoDB = _context.PatientAccidentInfoes.Where(p => p.Id == PatientAccidentInfoDB.Id).FirstOrDefault<PatientAccidentInfo>();
            }

            var res = Convert<BO.PatientAccidentInfo, PatientAccidentInfo>(PatientAccidentInfoDB);
            return (object)res;
        }
        #endregion





        #region Delete By ID
        public override object DeleteById(int id)
        {
            var acc = _context.PatientAccidentInfoes.Include("addressInfo")
                              .Include("addressInfo1")
                              .Where(p => p.Id == id && (p.IsDeleted.HasValue == false || p.IsDeleted == false)).FirstOrDefault<PatientAccidentInfo>();

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
                if (acc.AddressInfo1 != null)
                {
                    acc.AddressInfo1.IsDeleted = true;
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

            var res = Convert<BO.PatientAccidentInfo, PatientAccidentInfo>(acc);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
