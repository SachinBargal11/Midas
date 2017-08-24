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
    internal class PlaintiffVehicleRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<PlaintiffVehicle> _dbAccidentInfo;

        public PlaintiffVehicleRepository(MIDASGBXEntities context) : base(context)
        {
            _dbAccidentInfo = context.Set<PlaintiffVehicle>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            PlaintiffVehicle PlaintiffVehicleDB = entity as PlaintiffVehicle;

            if (PlaintiffVehicleDB == null)
                return default(T);

            BO.PlaintiffVehicle PlaintiffVehicleBO = new BO.PlaintiffVehicle();
            PlaintiffVehicleBO.ID = PlaintiffVehicleDB.Id;
            PlaintiffVehicleBO.CaseId = PlaintiffVehicleDB.CaseId;
            PlaintiffVehicleBO.VehicleNumberPlate = PlaintiffVehicleDB.VehicleNumberPlate;
            PlaintiffVehicleBO.State = PlaintiffVehicleDB.State;
            PlaintiffVehicleBO.VehicleMakeModel = PlaintiffVehicleDB.VehicleMakeModel;
            PlaintiffVehicleBO.VehicleMakeYear = PlaintiffVehicleDB.VehicleMakeYear;
            PlaintiffVehicleBO.VehicleOwnerName = PlaintiffVehicleDB.VehicleOwnerName;
            PlaintiffVehicleBO.VehicleOperatorName = PlaintiffVehicleDB.VehicleOperatorName;
            PlaintiffVehicleBO.VehicleInsuranceCompanyName = PlaintiffVehicleDB.VehicleInsuranceCompanyName;
            PlaintiffVehicleBO.VehiclePolicyNumber = PlaintiffVehicleDB.VehiclePolicyNumber;
            PlaintiffVehicleBO.VehicleClaimNumber = PlaintiffVehicleDB.VehicleClaimNumber;
            PlaintiffVehicleBO.VehicleLocation = PlaintiffVehicleDB.VehicleLocation;
            PlaintiffVehicleBO.VehicleDamageDiscription = PlaintiffVehicleDB.VehicleDamageDiscription;
            PlaintiffVehicleBO.RelativeVehicle = PlaintiffVehicleDB.RelativeVehicle;
            PlaintiffVehicleBO.RelativeVehicleMakeModel = PlaintiffVehicleDB.RelativeVehicleMakeModel;
            PlaintiffVehicleBO.RelativeVehicleMakeYear = PlaintiffVehicleDB.RelativeVehicleMakeYear;
            PlaintiffVehicleBO.RelativeVehicleOwnerName = PlaintiffVehicleDB.RelativeVehicleOwnerName;
            PlaintiffVehicleBO.RelativeVehicleInsuranceCompanyName = PlaintiffVehicleDB.RelativeVehicleInsuranceCompanyName;
            PlaintiffVehicleBO.RelativeVehiclePolicyNumber = PlaintiffVehicleDB.RelativeVehiclePolicyNumber;
            PlaintiffVehicleBO.VehicleResolveDamage = PlaintiffVehicleDB.VehicleResolveDamage;
            PlaintiffVehicleBO.VehicleDriveable = PlaintiffVehicleDB.VehicleDriveable;
            PlaintiffVehicleBO.VehicleEstimatedDamage = PlaintiffVehicleDB.VehicleEstimatedDamage;
            PlaintiffVehicleBO.RelativeVehicleLocation = PlaintiffVehicleDB.RelativeVehicleLocation;
            PlaintiffVehicleBO.VehicleClientHaveTitle = PlaintiffVehicleDB.VehicleClientHaveTitle;
            PlaintiffVehicleBO.RelativeVehicleOwner = PlaintiffVehicleDB.RelativeVehicleOwner;

            PlaintiffVehicleBO.IsDeleted = PlaintiffVehicleDB.IsDeleted;
            PlaintiffVehicleBO.CreateByUserID = PlaintiffVehicleDB.CreateByUserID;
            PlaintiffVehicleBO.UpdateByUserID = PlaintiffVehicleDB.UpdateByUserID;

            return (T)(object)PlaintiffVehicleBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.PlaintiffVehicle PlaintiffVehicleBO = (BO.PlaintiffVehicle)(object)entity;
            var result = PlaintiffVehicleBO.Validate(PlaintiffVehicleBO);
            return result;
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.PlaintiffVehicle PlaintiffVehicleBO = (BO.PlaintiffVehicle)(object)entity;

            PlaintiffVehicle PlaintiffVehicleDB = new PlaintiffVehicle();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                bool IsEditMode = false;
                IsEditMode = (PlaintiffVehicleBO != null && PlaintiffVehicleBO.ID > 0) ? true : false;

                #region patient Accident Info
                if (PlaintiffVehicleBO != null)
                {
                    bool Add_PlaintiffVehicleDB = false;
                    PlaintiffVehicleDB = _context.PlaintiffVehicles.Where(p => p.Id == PlaintiffVehicleBO.ID).FirstOrDefault();

                    if (PlaintiffVehicleDB == null && PlaintiffVehicleBO.ID <= 0)
                    {
                        PlaintiffVehicleDB = new PlaintiffVehicle();
                        Add_PlaintiffVehicleDB = true;
                    }
                    else if (PlaintiffVehicleDB == null && PlaintiffVehicleBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Plaintiff Vehicle dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }
                    if (IsEditMode == false)
                    {
                        PlaintiffVehicleDB.CaseId = PlaintiffVehicleBO.CaseId;
                    }

                    PlaintiffVehicleDB.VehicleNumberPlate = (IsEditMode == true && PlaintiffVehicleBO.VehicleNumberPlate == null) ? PlaintiffVehicleDB.VehicleNumberPlate : PlaintiffVehicleBO.VehicleNumberPlate;
                    PlaintiffVehicleDB.State = (IsEditMode == true && PlaintiffVehicleBO.State == null) ? PlaintiffVehicleDB.State : PlaintiffVehicleBO.State;
                    PlaintiffVehicleDB.VehicleMakeModel = (IsEditMode == true && PlaintiffVehicleBO.VehicleMakeModel == null) ? PlaintiffVehicleDB.VehicleMakeModel : PlaintiffVehicleBO.VehicleMakeModel;
                    PlaintiffVehicleDB.VehicleMakeYear = (IsEditMode == true && PlaintiffVehicleBO.VehicleMakeYear == null) ? PlaintiffVehicleDB.VehicleMakeYear : PlaintiffVehicleBO.VehicleMakeYear;
                    PlaintiffVehicleDB.VehicleOwnerName = (IsEditMode == true && PlaintiffVehicleBO.VehicleOwnerName == null) ? PlaintiffVehicleDB.VehicleOwnerName : PlaintiffVehicleBO.VehicleOwnerName;
                    PlaintiffVehicleDB.VehicleOperatorName = (IsEditMode == true && PlaintiffVehicleBO.VehicleOperatorName == null) ? PlaintiffVehicleDB.VehicleOperatorName : PlaintiffVehicleBO.VehicleOperatorName;
                    PlaintiffVehicleDB.VehicleInsuranceCompanyName = (IsEditMode == true && PlaintiffVehicleBO.VehicleInsuranceCompanyName == null) ? PlaintiffVehicleDB.VehicleInsuranceCompanyName : PlaintiffVehicleBO.VehicleInsuranceCompanyName;
                    PlaintiffVehicleDB.VehiclePolicyNumber = (IsEditMode == true && PlaintiffVehicleBO.VehiclePolicyNumber == null) ? PlaintiffVehicleDB.VehiclePolicyNumber : PlaintiffVehicleBO.VehiclePolicyNumber;
                    PlaintiffVehicleDB.VehicleClaimNumber = (IsEditMode == true && PlaintiffVehicleBO.VehicleClaimNumber == null) ? PlaintiffVehicleDB.VehicleClaimNumber : PlaintiffVehicleBO.VehicleClaimNumber;
                    PlaintiffVehicleDB.VehicleLocation = (IsEditMode == true && PlaintiffVehicleBO.VehicleLocation == null) ? PlaintiffVehicleDB.VehicleLocation : PlaintiffVehicleBO.VehicleLocation;
                    PlaintiffVehicleDB.VehicleDamageDiscription = (IsEditMode == true && PlaintiffVehicleBO.VehicleDamageDiscription == null) ? PlaintiffVehicleDB.VehicleDamageDiscription : PlaintiffVehicleBO.VehicleDamageDiscription;
                    PlaintiffVehicleDB.RelativeVehicle = (IsEditMode == true && PlaintiffVehicleBO.RelativeVehicle == null) ? PlaintiffVehicleDB.RelativeVehicle : PlaintiffVehicleBO.RelativeVehicle;
                    PlaintiffVehicleDB.RelativeVehicleMakeModel = (IsEditMode == true && PlaintiffVehicleBO.RelativeVehicleMakeModel == null) ? PlaintiffVehicleDB.RelativeVehicleMakeModel : PlaintiffVehicleBO.RelativeVehicleMakeModel;
                    PlaintiffVehicleDB.RelativeVehicleMakeYear = (IsEditMode == true && PlaintiffVehicleBO.RelativeVehicleMakeYear == null) ? PlaintiffVehicleDB.RelativeVehicleMakeYear : PlaintiffVehicleBO.RelativeVehicleMakeYear;
                    PlaintiffVehicleDB.RelativeVehicleOwnerName = (IsEditMode == true && PlaintiffVehicleBO.RelativeVehicleOwnerName == null) ? PlaintiffVehicleDB.RelativeVehicleOwnerName : PlaintiffVehicleBO.RelativeVehicleOwnerName;
                    PlaintiffVehicleDB.RelativeVehicleInsuranceCompanyName = (IsEditMode == true && PlaintiffVehicleBO.RelativeVehicleInsuranceCompanyName == null) ? PlaintiffVehicleDB.RelativeVehicleInsuranceCompanyName : PlaintiffVehicleBO.RelativeVehicleInsuranceCompanyName;
                    PlaintiffVehicleDB.RelativeVehiclePolicyNumber = (IsEditMode == true && PlaintiffVehicleBO.RelativeVehiclePolicyNumber == null) ? PlaintiffVehicleDB.RelativeVehiclePolicyNumber : PlaintiffVehicleBO.RelativeVehiclePolicyNumber;
                    PlaintiffVehicleDB.VehicleResolveDamage = (IsEditMode == true && PlaintiffVehicleBO.VehicleResolveDamage == null) ? PlaintiffVehicleDB.VehicleResolveDamage : PlaintiffVehicleBO.VehicleResolveDamage;
                    PlaintiffVehicleDB.VehicleDriveable = (IsEditMode == true && PlaintiffVehicleBO.VehicleDriveable == null) ? PlaintiffVehicleDB.VehicleDriveable : PlaintiffVehicleBO.VehicleDriveable;
                    PlaintiffVehicleDB.VehicleEstimatedDamage = (IsEditMode == true && PlaintiffVehicleBO.VehicleEstimatedDamage == null) ? PlaintiffVehicleDB.VehicleEstimatedDamage : PlaintiffVehicleBO.VehicleEstimatedDamage;
                    PlaintiffVehicleDB.RelativeVehicleLocation = (IsEditMode == true && PlaintiffVehicleBO.RelativeVehicleLocation == null) ? PlaintiffVehicleDB.RelativeVehicleLocation : PlaintiffVehicleBO.RelativeVehicleLocation;
                    PlaintiffVehicleDB.VehicleClientHaveTitle = (IsEditMode == true && PlaintiffVehicleBO.VehicleClientHaveTitle == null) ? PlaintiffVehicleDB.VehicleClientHaveTitle : PlaintiffVehicleBO.VehicleClientHaveTitle;
                    PlaintiffVehicleDB.RelativeVehicleOwner = (IsEditMode == true && PlaintiffVehicleBO.RelativeVehicleOwner == null) ? PlaintiffVehicleDB.RelativeVehicleOwner : PlaintiffVehicleBO.RelativeVehicleOwner;
                    PlaintiffVehicleDB.IsDeleted = (IsEditMode == true && PlaintiffVehicleBO.IsDeleted == null) ? PlaintiffVehicleDB.IsDeleted : PlaintiffVehicleBO.IsDeleted;

                    if (Add_PlaintiffVehicleDB == true)
                    {
                        PlaintiffVehicleDB.CreateByUserID = 0;
                        PlaintiffVehicleDB.CreateDate = DateTime.UtcNow;

                        PlaintiffVehicleDB = _context.PlaintiffVehicles.Add(PlaintiffVehicleDB);
                    }
                    else
                    {
                        PlaintiffVehicleDB.UpdateByUserID = 0;
                        PlaintiffVehicleDB.UpdateDate = DateTime.UtcNow;
                    }
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Plaintiff Vehicle details.", ErrorLevel = ErrorLevel.Error };
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                PlaintiffVehicleDB = _context.PlaintiffVehicles.Where(p => p.Id == PlaintiffVehicleDB.Id).FirstOrDefault<PlaintiffVehicle>();
            }

            var res = Convert<BO.PlaintiffVehicle, PlaintiffVehicle>(PlaintiffVehicleDB);
            return (object)res;
        }
        #endregion

        #region Get By Case ID 
        public override object GetByCaseId(int id)
        {
            var acc = _context.PlaintiffVehicles.Where(p => p.CaseId == id
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                .FirstOrDefault<PlaintiffVehicle>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                BO.PlaintiffVehicle result = new BO.PlaintiffVehicle();
                result = Convert<BO.PlaintiffVehicle, PlaintiffVehicle>(acc);

                return result;
            }
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
