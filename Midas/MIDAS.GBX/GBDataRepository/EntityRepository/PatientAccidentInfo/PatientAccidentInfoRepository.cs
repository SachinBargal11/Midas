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
            PatientAccidentInfo PatientAccidentInfoDB = entity as PatientAccidentInfo;

            if (PatientAccidentInfoDB == null)
                return default(T);

            BO.PatientAccidentInfo PatientAccidentInfoBO = new BO.PatientAccidentInfo();
            PatientAccidentInfoBO.ID = PatientAccidentInfoDB.Id;
            PatientAccidentInfoBO.CaseId = PatientAccidentInfoDB.CaseId;
            PatientAccidentInfoBO.AccidentDate = PatientAccidentInfoDB.AccidentDate;
            PatientAccidentInfoBO.Weather = PatientAccidentInfoDB.Weather;
            PatientAccidentInfoBO.PlateNumber = PatientAccidentInfoDB.PlateNumber;
            PatientAccidentInfoBO.AccidentAddressInfoId = PatientAccidentInfoDB.AccidentAddressInfoId;
            PatientAccidentInfoBO.PoliceAtScene = PatientAccidentInfoDB.PoliceAtScene;
            PatientAccidentInfoBO.Precinct = PatientAccidentInfoDB.Precinct;
            PatientAccidentInfoBO.ReportNumber = PatientAccidentInfoDB.ReportNumber;
            PatientAccidentInfoBO.PatientTypeId = PatientAccidentInfoDB.PatientTypeId;
            PatientAccidentInfoBO.WearingSeatBelts = PatientAccidentInfoDB.WearingSeatBelts;
            PatientAccidentInfoBO.AirBagsDeploy = PatientAccidentInfoDB.AirBagsDeploy;
            PatientAccidentInfoBO.PhotosTaken = PatientAccidentInfoDB.PhotosTaken;
            PatientAccidentInfoBO.AccidentDescription = PatientAccidentInfoDB.AccidentDescription;
            PatientAccidentInfoBO.Witness = PatientAccidentInfoDB.Witness;
            PatientAccidentInfoBO.DescribeInjury = PatientAccidentInfoDB.DescribeInjury;
            PatientAccidentInfoBO.HospitalName = PatientAccidentInfoDB.HospitalName;
            PatientAccidentInfoBO.Ambulance = PatientAccidentInfoDB.Ambulance;
            PatientAccidentInfoBO.HospitalAddressInfoId = PatientAccidentInfoDB.HospitalAddressInfoId;
            PatientAccidentInfoBO.TreatedAndReleased = PatientAccidentInfoDB.TreatedAndReleased;
            PatientAccidentInfoBO.Admitted = PatientAccidentInfoDB.Admitted;
            PatientAccidentInfoBO.DateOfAdmission = PatientAccidentInfoDB.DateOfAdmission;
            PatientAccidentInfoBO.XRaysTaken = PatientAccidentInfoDB.XRaysTaken;
            PatientAccidentInfoBO.DurationAtHospital = PatientAccidentInfoDB.DurationAtHospital;
            PatientAccidentInfoBO.MedicalReportNumber = PatientAccidentInfoDB.MedicalReportNumber;
            PatientAccidentInfoBO.AdditionalPatients = PatientAccidentInfoDB.AdditionalPatients;            

            if (PatientAccidentInfoDB.AddressInfo != null)
            {
                if (PatientAccidentInfoDB.AddressInfo.IsDeleted.HasValue == false || (PatientAccidentInfoDB.AddressInfo.IsDeleted.HasValue == true && PatientAccidentInfoDB.AddressInfo.IsDeleted.Value == false))
                {
                    BO.AddressInfo boAddress = new BO.AddressInfo();
                    boAddress.Name = PatientAccidentInfoDB.AddressInfo.Name;
                    boAddress.Address1 = PatientAccidentInfoDB.AddressInfo.Address1;
                    boAddress.Address2 = PatientAccidentInfoDB.AddressInfo.Address2;
                    boAddress.City = PatientAccidentInfoDB.AddressInfo.City;
                    boAddress.State = PatientAccidentInfoDB.AddressInfo.State;
                    boAddress.ZipCode = PatientAccidentInfoDB.AddressInfo.ZipCode;
                    boAddress.Country = PatientAccidentInfoDB.AddressInfo.Country;
                    boAddress.CreateByUserID = PatientAccidentInfoDB.AddressInfo.CreateByUserID;
                    boAddress.ID = PatientAccidentInfoDB.AddressInfo.id;
                    PatientAccidentInfoBO.AccidentAddressInfo = boAddress;
                }
            }
            if (PatientAccidentInfoDB.AddressInfo1 != null)
            {
                if (PatientAccidentInfoDB.AddressInfo1.IsDeleted.HasValue == false || (PatientAccidentInfoDB.AddressInfo1.IsDeleted.HasValue == true && PatientAccidentInfoDB.AddressInfo1.IsDeleted.Value == false))
                {
                    BO.AddressInfo boAddress1 = new BO.AddressInfo();
                    boAddress1.Name = PatientAccidentInfoDB.AddressInfo1.Name;
                    boAddress1.Address1 = PatientAccidentInfoDB.AddressInfo1.Address1;
                    boAddress1.Address2 = PatientAccidentInfoDB.AddressInfo1.Address2;
                    boAddress1.City = PatientAccidentInfoDB.AddressInfo1.City;
                    boAddress1.State = PatientAccidentInfoDB.AddressInfo1.State;
                    boAddress1.ZipCode = PatientAccidentInfoDB.AddressInfo1.ZipCode;
                    boAddress1.Country = PatientAccidentInfoDB.AddressInfo1.Country;
                    boAddress1.CreateByUserID = PatientAccidentInfoDB.AddressInfo1.CreateByUserID;
                    boAddress1.ID = PatientAccidentInfoDB.AddressInfo1.id;
                    PatientAccidentInfoBO.HospitalAddressInfo = boAddress1;
                }
            }

            PatientAccidentInfoBO.AccidentWitnesses = new List<BO.AccidentWitness>();
            if (PatientAccidentInfoDB.AccidentWitnesses != null)
            {
                foreach (var eachAccidentWitness in PatientAccidentInfoDB.AccidentWitnesses)
                {
                    BO.AccidentWitness AccidentWitnessBO = new BO.AccidentWitness();
                    AccidentWitnessBO.ID = eachAccidentWitness.Id;
                    AccidentWitnessBO.PatientAccidentInfoId = eachAccidentWitness.PatientAccidentInfoId;
                    AccidentWitnessBO.WitnessName = eachAccidentWitness.WitnessName;
                    AccidentWitnessBO.WitnessContactNumber = eachAccidentWitness.WitnessContactNumber;
                    AccidentWitnessBO.IsDeleted = eachAccidentWitness.IsDeleted;

                    PatientAccidentInfoBO.AccidentWitnesses.Add(AccidentWitnessBO);
                }
            }

            PatientAccidentInfoBO.AccidentTreatments = new List<BO.AccidentTreatment>();
            if (PatientAccidentInfoDB.AccidentTreatments != null)
            {
                foreach (var eachAccidentTreatment in PatientAccidentInfoDB.AccidentTreatments)
                {
                    BO.AccidentTreatment AccidentTreatmentBO = new BO.AccidentTreatment();
                    AccidentTreatmentBO.ID = eachAccidentTreatment.Id;
                    AccidentTreatmentBO.PatientAccidentInfoId = eachAccidentTreatment.PatientAccidentInfoId;
                    AccidentTreatmentBO.MedicalFacilityName = eachAccidentTreatment.MedicalFacilityName;
                    AccidentTreatmentBO.DoctorName = eachAccidentTreatment.DoctorName;
                    AccidentTreatmentBO.ContactNumber = eachAccidentTreatment.ContactNumber;
                    AccidentTreatmentBO.Address = eachAccidentTreatment.Address;
                    AccidentTreatmentBO.IsDeleted = eachAccidentTreatment.IsDeleted;

                    PatientAccidentInfoBO.AccidentTreatments.Add(AccidentTreatmentBO);
                }
            }

            PatientAccidentInfoBO.IsDeleted = PatientAccidentInfoDB.IsDeleted;
            PatientAccidentInfoBO.CreateByUserID = PatientAccidentInfoDB.CreateByUserID;
            PatientAccidentInfoBO.UpdateByUserID = PatientAccidentInfoDB.UpdateByUserID;

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
                return new BO.ErrorObject { ErrorMessage = "No record found for this PatientAccident Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                BO.PatientAccidentInfo acc_ = Convert<BO.PatientAccidentInfo, PatientAccidentInfo>(acc);
                return (object)acc_;
            }
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.PatientAccidentInfo PatientAccidentInfoBO = (BO.PatientAccidentInfo)(object)entity;
            BO.AddressInfo AccidentAddressInfoBO = PatientAccidentInfoBO.AccidentAddressInfo;
            BO.AddressInfo HospitalAddressInfoBO = PatientAccidentInfoBO.HospitalAddressInfo;

            PatientAccidentInfo PatientAccidentInfoDB = new PatientAccidentInfo();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                AddressInfo AccidentAddressInfoDB = new AddressInfo();
                AddressInfo HospitalAddressInfoDB = new AddressInfo();

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
                    //[STATECODE-CHANGE]
                    //AccidentAddressInfoDB.StateCode = (IsAccAddressEditMode == true && AccidentAddressInfoBO.StateCode == null) ? AccidentAddressInfoDB.StateCode : AccidentAddressInfoBO.StateCode;
                    //[STATECODE-CHANGE]

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
                    //[STATECODE-CHANGE]
                    //HospitalAddressInfoDB.StateCode = (IsHosAddressEditMode == true && HospitalAddressInfoBO.StateCode == null) ? HospitalAddressInfoDB.StateCode : HospitalAddressInfoBO.StateCode;
                    //[STATECODE-CHANGE]

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
                        PatientAccidentInfoDB.CaseId = PatientAccidentInfoBO.CaseId;
                    }

                    PatientAccidentInfoDB.AccidentDate = (IsEditMode == true && PatientAccidentInfoBO.AccidentDate == null) ? PatientAccidentInfoDB.AccidentDate : PatientAccidentInfoBO.AccidentDate;
                    PatientAccidentInfoDB.Weather = (IsEditMode == true && PatientAccidentInfoBO.Weather == null) ? PatientAccidentInfoDB.Weather : PatientAccidentInfoBO.Weather;
                    PatientAccidentInfoDB.PlateNumber = (IsEditMode == true && PatientAccidentInfoBO.PlateNumber == null) ? PatientAccidentInfoDB.PlateNumber : PatientAccidentInfoBO.PlateNumber;
                    PatientAccidentInfoDB.AccidentAddressInfoId = (IsEditMode == true && PatientAccidentInfoBO.AccidentAddressInfoId == null) ? PatientAccidentInfoDB.AccidentAddressInfoId : AccidentAddressInfoDB.id;
                    PatientAccidentInfoDB.HospitalName = (IsEditMode == true && PatientAccidentInfoBO.HospitalName == null) ? PatientAccidentInfoDB.HospitalName : PatientAccidentInfoBO.HospitalName;
                    PatientAccidentInfoDB.PoliceAtScene = (IsEditMode == true && PatientAccidentInfoBO.PoliceAtScene == null) ? PatientAccidentInfoDB.PoliceAtScene : PatientAccidentInfoBO.PoliceAtScene;
                    PatientAccidentInfoDB.Precinct = (IsEditMode == true && PatientAccidentInfoBO.Precinct == null) ? PatientAccidentInfoDB.Precinct : PatientAccidentInfoBO.Precinct;
                    PatientAccidentInfoDB.ReportNumber = (IsEditMode == true && PatientAccidentInfoBO.ReportNumber == null) ? PatientAccidentInfoDB.ReportNumber : PatientAccidentInfoBO.ReportNumber;
                    PatientAccidentInfoDB.PatientTypeId = (IsEditMode == true && PatientAccidentInfoBO.PatientTypeId == null) ? PatientAccidentInfoDB.PatientTypeId : PatientAccidentInfoBO.PatientTypeId.Value;
                    PatientAccidentInfoDB.WearingSeatBelts = (IsEditMode == true && PatientAccidentInfoBO.WearingSeatBelts == null) ? PatientAccidentInfoDB.WearingSeatBelts : PatientAccidentInfoBO.WearingSeatBelts;
                    PatientAccidentInfoDB.AirBagsDeploy = (IsEditMode == true && PatientAccidentInfoBO.AirBagsDeploy == null) ? PatientAccidentInfoDB.AirBagsDeploy : PatientAccidentInfoBO.AirBagsDeploy;
                    PatientAccidentInfoDB.PhotosTaken = (IsEditMode == true && PatientAccidentInfoBO.PhotosTaken == null) ? PatientAccidentInfoDB.PhotosTaken : PatientAccidentInfoBO.PhotosTaken;
                    PatientAccidentInfoDB.AccidentDescription = (IsEditMode == true && PatientAccidentInfoBO.AccidentDescription == null) ? PatientAccidentInfoDB.AccidentDescription : PatientAccidentInfoBO.AccidentDescription;
                    PatientAccidentInfoDB.Witness = (IsEditMode == true && PatientAccidentInfoBO.Witness == null) ? PatientAccidentInfoDB.Witness : PatientAccidentInfoBO.Witness;
                    PatientAccidentInfoDB.DescribeInjury = (IsEditMode == true && PatientAccidentInfoBO.DescribeInjury == null) ? PatientAccidentInfoDB.DescribeInjury : PatientAccidentInfoBO.DescribeInjury;
                    PatientAccidentInfoDB.Ambulance = (IsEditMode == true && PatientAccidentInfoBO.Ambulance == null) ? PatientAccidentInfoDB.Ambulance : PatientAccidentInfoBO.Ambulance;
                    PatientAccidentInfoDB.HospitalAddressInfoId = (IsEditMode == true && PatientAccidentInfoBO.HospitalAddressInfoId == null) ? PatientAccidentInfoDB.HospitalAddressInfoId : HospitalAddressInfoDB.id;
                    PatientAccidentInfoDB.TreatedAndReleased = (IsEditMode == true && PatientAccidentInfoBO.TreatedAndReleased == null) ? PatientAccidentInfoDB.TreatedAndReleased : PatientAccidentInfoBO.TreatedAndReleased;
                    PatientAccidentInfoDB.Admitted = (IsEditMode == true && PatientAccidentInfoBO.Admitted == null) ? PatientAccidentInfoDB.Admitted : PatientAccidentInfoBO.Admitted;
                    PatientAccidentInfoDB.DateOfAdmission = (IsEditMode == true && PatientAccidentInfoBO.DateOfAdmission == null) ? PatientAccidentInfoDB.DateOfAdmission : PatientAccidentInfoBO.DateOfAdmission;
                    PatientAccidentInfoDB.XRaysTaken = (IsEditMode == true && PatientAccidentInfoBO.XRaysTaken == null) ? PatientAccidentInfoDB.XRaysTaken : PatientAccidentInfoBO.XRaysTaken;
                    PatientAccidentInfoDB.DurationAtHospital = (IsEditMode == true && PatientAccidentInfoBO.DurationAtHospital == null) ? PatientAccidentInfoDB.DurationAtHospital : PatientAccidentInfoBO.DurationAtHospital;
                    PatientAccidentInfoDB.MedicalReportNumber = (IsEditMode == true && PatientAccidentInfoBO.MedicalReportNumber == null) ? PatientAccidentInfoDB.MedicalReportNumber : PatientAccidentInfoBO.MedicalReportNumber;
                    PatientAccidentInfoDB.AdditionalPatients = (IsEditMode == true && PatientAccidentInfoBO.AdditionalPatients == null) ? PatientAccidentInfoDB.AdditionalPatients : PatientAccidentInfoBO.AdditionalPatients;

                    if (Add_PatientAccidentInfoDB == true)
                    {
                        PatientAccidentInfoDB = _context.PatientAccidentInfoes.Add(PatientAccidentInfoDB);
                    }
                    _context.SaveChanges();

                    List<BO.AccidentWitness> AccidentWitnesses = PatientAccidentInfoBO.AccidentWitnesses;
                    if (AccidentWitnesses != null)
                    {
                        var AccidentWitnessId = AccidentWitnesses.Select(p => p.ID);
                        var RemoveAccidentWitness = _context.AccidentWitnesses.Where(p => AccidentWitnessId.Contains(p.Id) == false 
                                                                && p.PatientAccidentInfoId == PatientAccidentInfoDB.Id
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .ToList();

                        RemoveAccidentWitness.ForEach(p => p.IsDeleted = true);

                        foreach (var eachAccidentWitnesses in AccidentWitnesses)
                        {
                            bool AddUpdateAccidentWitness_Add = false;
                            var AddUpdateAccidentWitness = _context.AccidentWitnesses.Where(p => p.Id == eachAccidentWitnesses.ID
                                                                        && p.PatientAccidentInfoId == PatientAccidentInfoDB.Id
                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                   .FirstOrDefault();

                            if (AddUpdateAccidentWitness == null)
                            {
                                AddUpdateAccidentWitness = new AccidentWitness();
                                AddUpdateAccidentWitness_Add = true;
                            }

                            AddUpdateAccidentWitness.PatientAccidentInfoId = PatientAccidentInfoDB.Id;
                            AddUpdateAccidentWitness.WitnessName = eachAccidentWitnesses.WitnessName;
                            AddUpdateAccidentWitness.WitnessContactNumber = eachAccidentWitnesses.WitnessContactNumber;

                            if (AddUpdateAccidentWitness_Add == true)
                            {
                                _context.AccidentWitnesses.Add(AddUpdateAccidentWitness);
                            }
                        }

                        _context.SaveChanges();
                    }
                    else
                    {
                        var RemoveAccidentWitness = _context.AccidentWitnesses.Where(p => p.PatientAccidentInfoId == PatientAccidentInfoDB.Id
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .ToList();

                        RemoveAccidentWitness.ForEach(p => p.IsDeleted = true);

                        _context.SaveChanges();
                    }

                    List<BO.AccidentTreatment> AccidentTreatments = PatientAccidentInfoBO.AccidentTreatments;
                    if (AccidentTreatments != null)
                    {
                        var AccidentTreatmentId = AccidentTreatments.Select(p => p.ID);
                        var RemoveAccidentTreatments = _context.AccidentTreatments.Where(p => AccidentTreatmentId.Contains(p.Id) == false
                                                                && p.PatientAccidentInfoId == PatientAccidentInfoDB.Id
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .ToList();

                        RemoveAccidentTreatments.ForEach(p => p.IsDeleted = true);

                        foreach (var eachAccidentTreatment in AccidentTreatments)
                        {
                            bool AddUpdateAccidentTreatments_Add = false;
                            var AddUpdateAccidentTreatments = _context.AccidentTreatments.Where(p => p.Id == eachAccidentTreatment.ID
                                                                        && p.PatientAccidentInfoId == PatientAccidentInfoDB.Id
                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                   .FirstOrDefault();

                            if (AddUpdateAccidentTreatments == null)
                            {
                                AddUpdateAccidentTreatments = new AccidentTreatment();
                                AddUpdateAccidentTreatments_Add = true;
                            }

                            AddUpdateAccidentTreatments.PatientAccidentInfoId = PatientAccidentInfoDB.Id;
                            AddUpdateAccidentTreatments.MedicalFacilityName = eachAccidentTreatment.MedicalFacilityName;
                            AddUpdateAccidentTreatments.DoctorName = eachAccidentTreatment.DoctorName;
                            AddUpdateAccidentTreatments.ContactNumber = eachAccidentTreatment.ContactNumber;
                            AddUpdateAccidentTreatments.Address = eachAccidentTreatment.Address;

                            if (AddUpdateAccidentTreatments_Add == true)
                            {
                                _context.AccidentTreatments.Add(AddUpdateAccidentTreatments);
                            }
                        }

                        _context.SaveChanges();
                    }
                    else
                    {
                        var RemoveAccidentTreatments = _context.AccidentTreatments.Where(p => p.PatientAccidentInfoId == PatientAccidentInfoDB.Id
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .ToList();

                        RemoveAccidentTreatments.ForEach(p => p.IsDeleted = true);

                        _context.SaveChanges();
                    }
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Patient Accident details.", ErrorLevel = ErrorLevel.Error };
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

        #region Get By Case ID 
        public override object GetByCaseId(int id)
        {
            var acc = _context.PatientAccidentInfoes.Include("AddressInfo")
                                                    .Include("AddressInfo1")
                                                    .Include("AccidentWitnesses")
                                                    .Include("AccidentTreatments")
                                                    .Where(p => p.CaseId == id 
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                    .ToList<PatientAccidentInfo>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientAccidentInfo> lstrefoffice = new List<BO.PatientAccidentInfo>();
                foreach (PatientAccidentInfo item in acc)
                {
                    lstrefoffice.Add(Convert<BO.PatientAccidentInfo, PatientAccidentInfo>(item));
                }
                return lstrefoffice;
            }
        }
        #endregion

        #region Delete By ID
        public override object Delete(int id)
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
