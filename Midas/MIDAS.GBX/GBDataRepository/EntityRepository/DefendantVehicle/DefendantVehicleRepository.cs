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
    internal class DefendantVehicleRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<DefendantVehicle> _dbAccidentInfo;

        public DefendantVehicleRepository(MIDASGBXEntities context) : base(context)
        {
            _dbAccidentInfo = context.Set<DefendantVehicle>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            DefendantVehicle DefendantVehicleDB = entity as DefendantVehicle;

            if (DefendantVehicleDB == null)
                return default(T);

            BO.DefendantVehicle DefendantVehicleBO = new BO.DefendantVehicle();
            DefendantVehicleBO.ID = DefendantVehicleDB.Id;
            DefendantVehicleBO.CaseId = DefendantVehicleDB.CaseId;
            DefendantVehicleBO.VehicleNumberPlate = DefendantVehicleDB.VehicleNumberPlate;
            DefendantVehicleBO.State = DefendantVehicleDB.State;
            DefendantVehicleBO.VehicleMakeModel = DefendantVehicleDB.VehicleMakeModel;
            DefendantVehicleBO.VehicleMakeYear = DefendantVehicleDB.VehicleMakeYear;
            DefendantVehicleBO.VehicleOwnerName = DefendantVehicleDB.VehicleOwnerName;
            DefendantVehicleBO.VehicleOperatorName = DefendantVehicleDB.VehicleOperatorName;
            DefendantVehicleBO.VehicleInsuranceCompanyName = DefendantVehicleDB.VehicleInsuranceCompanyName;
            DefendantVehicleBO.VehiclePolicyNumber = DefendantVehicleDB.VehiclePolicyNumber;
            DefendantVehicleBO.VehicleClaimNumber = DefendantVehicleDB.VehicleClaimNumber;

            DefendantVehicleBO.IsDeleted = DefendantVehicleDB.IsDeleted;
            DefendantVehicleBO.CreateByUserID = DefendantVehicleDB.CreateByUserID;
            DefendantVehicleBO.UpdateByUserID = DefendantVehicleDB.UpdateByUserID;

            return (T)(object)DefendantVehicleBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.DefendantVehicle DefendantVehicleBO = (BO.DefendantVehicle)(object)entity;
            var result = DefendantVehicleBO.Validate(DefendantVehicleBO);
            return result;
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.DefendantVehicle DefendantVehicleBO = (BO.DefendantVehicle)(object)entity;

            DefendantVehicle DefendantVehicleDB = new DefendantVehicle();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                bool IsEditMode = false;
                IsEditMode = (DefendantVehicleBO != null && DefendantVehicleBO.ID > 0) ? true : false;

                #region patient Accident Info
                if (DefendantVehicleBO != null)
                {
                    bool Add_DefendantVehicleDB = false;
                    DefendantVehicleDB = _context.DefendantVehicles.Where(p => p.Id == DefendantVehicleBO.ID).FirstOrDefault();

                    if (DefendantVehicleDB == null && DefendantVehicleBO.ID <= 0)
                    {
                        DefendantVehicleDB = new DefendantVehicle();
                        Add_DefendantVehicleDB = true;
                    }
                    else if (DefendantVehicleDB == null && DefendantVehicleBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Defendant Vehicle dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }
                    if (IsEditMode == false)
                    {
                        DefendantVehicleDB.CaseId = DefendantVehicleBO.CaseId;
                    }

                    DefendantVehicleDB.VehicleNumberPlate = (IsEditMode == true && DefendantVehicleBO.VehicleNumberPlate == null) ? DefendantVehicleDB.VehicleNumberPlate : DefendantVehicleBO.VehicleNumberPlate;
                    DefendantVehicleDB.State = (IsEditMode == true && DefendantVehicleBO.State == null) ? DefendantVehicleDB.State : DefendantVehicleBO.State;
                    DefendantVehicleDB.VehicleMakeModel = (IsEditMode == true && DefendantVehicleBO.VehicleMakeModel == null) ? DefendantVehicleDB.VehicleMakeModel : DefendantVehicleBO.VehicleMakeModel;
                    DefendantVehicleDB.VehicleMakeYear = (IsEditMode == true && DefendantVehicleBO.VehicleMakeYear == null) ? DefendantVehicleDB.VehicleMakeYear : DefendantVehicleBO.VehicleMakeYear;
                    DefendantVehicleDB.VehicleOwnerName = (IsEditMode == true && DefendantVehicleBO.VehicleOwnerName == null) ? DefendantVehicleDB.VehicleOwnerName : DefendantVehicleBO.VehicleOwnerName;
                    DefendantVehicleDB.VehicleOperatorName = (IsEditMode == true && DefendantVehicleBO.VehicleOperatorName == null) ? DefendantVehicleDB.VehicleOperatorName : DefendantVehicleBO.VehicleOperatorName;
                    DefendantVehicleDB.VehicleInsuranceCompanyName = (IsEditMode == true && DefendantVehicleBO.VehicleInsuranceCompanyName == null) ? DefendantVehicleDB.VehicleInsuranceCompanyName : DefendantVehicleBO.VehicleInsuranceCompanyName;
                    DefendantVehicleDB.VehiclePolicyNumber = (IsEditMode == true && DefendantVehicleBO.VehiclePolicyNumber == null) ? DefendantVehicleDB.VehiclePolicyNumber : DefendantVehicleBO.VehiclePolicyNumber;
                    DefendantVehicleDB.VehicleClaimNumber = (IsEditMode == true && DefendantVehicleBO.VehicleClaimNumber == null) ? DefendantVehicleDB.VehicleClaimNumber : DefendantVehicleBO.VehicleClaimNumber;
                    DefendantVehicleDB.IsDeleted = (IsEditMode == true && DefendantVehicleBO.IsDeleted == null) ? DefendantVehicleDB.IsDeleted : DefendantVehicleBO.IsDeleted;

                    if (Add_DefendantVehicleDB == true)
                    {
                        DefendantVehicleDB.CreateByUserID = 0;
                        DefendantVehicleDB.CreateDate = DateTime.UtcNow;

                        DefendantVehicleDB = _context.DefendantVehicles.Add(DefendantVehicleDB);
                    }
                    else
                    {
                        DefendantVehicleDB.UpdateByUserID = 0;
                        DefendantVehicleDB.UpdateDate = DateTime.UtcNow;
                    }
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Defendant Vehicle details.", ErrorLevel = ErrorLevel.Error };
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                DefendantVehicleDB = _context.DefendantVehicles.Where(p => p.Id == DefendantVehicleDB.Id).FirstOrDefault<DefendantVehicle>();
            }

            var res = Convert<BO.DefendantVehicle, DefendantVehicle>(DefendantVehicleDB);
            return (object)res;
        }
        #endregion

        #region Get By Case ID 
        public override object GetByCaseId(int id)
        {
            var acc = _context.DefendantVehicles.Where(p => p.CaseId == id
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                .FirstOrDefault<DefendantVehicle>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                BO.DefendantVehicle result = new BO.DefendantVehicle();
                result = Convert<BO.DefendantVehicle, DefendantVehicle>(acc);

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
