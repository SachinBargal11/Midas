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
    internal class PatientPriorAccidentInjuryRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<PatientPriorAccidentInjury> _dbAccidentInfo;

        public PatientPriorAccidentInjuryRepository(MIDASGBXEntities context) : base(context)
        {
            _dbAccidentInfo = context.Set<PatientPriorAccidentInjury>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            PatientPriorAccidentInjury PatientPriorAccidentInjuryDB = entity as PatientPriorAccidentInjury;

            if (PatientPriorAccidentInjuryDB == null)
                return default(T);

            BO.PatientPriorAccidentInjury PatientPriorAccidentInjuryBO = new BO.PatientPriorAccidentInjury();
            PatientPriorAccidentInjuryBO.ID = PatientPriorAccidentInjuryDB.Id;
            PatientPriorAccidentInjuryBO.CaseId = PatientPriorAccidentInjuryDB.CaseId;
            PatientPriorAccidentInjuryBO.AccidentBefore = PatientPriorAccidentInjuryDB.AccidentBefore;
            PatientPriorAccidentInjuryBO.AccidentBeforeExplain = PatientPriorAccidentInjuryDB.AccidentBeforeExplain;
            PatientPriorAccidentInjuryBO.LawsuitWorkerCompBefore = PatientPriorAccidentInjuryDB.LawsuitWorkerCompBefore;
            PatientPriorAccidentInjuryBO.LawsuitWorkerCompBeforeExplain = PatientPriorAccidentInjuryDB.LawsuitWorkerCompBeforeExplain;
            PatientPriorAccidentInjuryBO.PhysicalComplaintsBefore = PatientPriorAccidentInjuryDB.PhysicalComplaintsBefore;
            PatientPriorAccidentInjuryBO.PhysicalComplaintsBeforeExplain = PatientPriorAccidentInjuryDB.PhysicalComplaintsBeforeExplain;
            PatientPriorAccidentInjuryBO.OtherInformation = PatientPriorAccidentInjuryDB.OtherInformation;

            PatientPriorAccidentInjuryBO.IsDeleted = PatientPriorAccidentInjuryDB.IsDeleted;
            PatientPriorAccidentInjuryBO.CreateByUserID = PatientPriorAccidentInjuryDB.CreateByUserID;
            PatientPriorAccidentInjuryBO.UpdateByUserID = PatientPriorAccidentInjuryDB.UpdateByUserID;

            return (T)(object)PatientPriorAccidentInjuryBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.PatientPriorAccidentInjury PatientPriorAccidentInjuryBO = (BO.PatientPriorAccidentInjury)(object)entity;
            var result = PatientPriorAccidentInjuryBO.Validate(PatientPriorAccidentInjuryBO);
            return result;
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.PatientPriorAccidentInjury PatientPriorAccidentInjuryBO = (BO.PatientPriorAccidentInjury)(object)entity;

            PatientPriorAccidentInjury PatientPriorAccidentInjuryDB = new PatientPriorAccidentInjury();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                bool IsEditMode = false;
                IsEditMode = (PatientPriorAccidentInjuryBO != null && PatientPriorAccidentInjuryBO.ID > 0) ? true : false;

                #region Patient Prior Accident Injury
                if (PatientPriorAccidentInjuryBO != null)
                {
                    bool Add_PatientPriorAccidentInjuryDB = false;
                    PatientPriorAccidentInjuryDB = _context.PatientPriorAccidentInjuries.Where(p => p.Id == PatientPriorAccidentInjuryBO.ID).FirstOrDefault();

                    if (PatientPriorAccidentInjuryDB == null && PatientPriorAccidentInjuryBO.ID <= 0)
                    {
                        PatientPriorAccidentInjuryDB = new PatientPriorAccidentInjury();
                        Add_PatientPriorAccidentInjuryDB = true;
                    }
                    else if (PatientPriorAccidentInjuryDB == null && PatientPriorAccidentInjuryBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient Prior Accident Injury dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }
                    if (IsEditMode == false)
                    {
                        PatientPriorAccidentInjuryDB.CaseId = PatientPriorAccidentInjuryBO.CaseId;
                    }

                    PatientPriorAccidentInjuryDB.AccidentBefore = (IsEditMode == true && PatientPriorAccidentInjuryBO.AccidentBefore == null) ? PatientPriorAccidentInjuryDB.AccidentBefore : PatientPriorAccidentInjuryBO.AccidentBefore;
                    PatientPriorAccidentInjuryDB.AccidentBeforeExplain = (IsEditMode == true && PatientPriorAccidentInjuryBO.AccidentBeforeExplain == null) ? PatientPriorAccidentInjuryDB.AccidentBeforeExplain : PatientPriorAccidentInjuryBO.AccidentBeforeExplain;
                    PatientPriorAccidentInjuryDB.LawsuitWorkerCompBefore = (IsEditMode == true && PatientPriorAccidentInjuryBO.LawsuitWorkerCompBefore == null) ? PatientPriorAccidentInjuryDB.LawsuitWorkerCompBefore : PatientPriorAccidentInjuryBO.LawsuitWorkerCompBefore;
                    PatientPriorAccidentInjuryDB.LawsuitWorkerCompBeforeExplain = (IsEditMode == true && PatientPriorAccidentInjuryBO.LawsuitWorkerCompBeforeExplain == null) ? PatientPriorAccidentInjuryDB.LawsuitWorkerCompBeforeExplain : PatientPriorAccidentInjuryBO.LawsuitWorkerCompBeforeExplain;
                    PatientPriorAccidentInjuryDB.PhysicalComplaintsBefore = (IsEditMode == true && PatientPriorAccidentInjuryBO.PhysicalComplaintsBefore == null) ? PatientPriorAccidentInjuryDB.PhysicalComplaintsBefore : PatientPriorAccidentInjuryBO.PhysicalComplaintsBefore;
                    PatientPriorAccidentInjuryDB.PhysicalComplaintsBeforeExplain = (IsEditMode == true && PatientPriorAccidentInjuryBO.PhysicalComplaintsBeforeExplain == null) ? PatientPriorAccidentInjuryDB.PhysicalComplaintsBeforeExplain : PatientPriorAccidentInjuryBO.PhysicalComplaintsBeforeExplain;
                    PatientPriorAccidentInjuryDB.OtherInformation = (IsEditMode == true && PatientPriorAccidentInjuryBO.OtherInformation == null) ? PatientPriorAccidentInjuryDB.OtherInformation : PatientPriorAccidentInjuryBO.OtherInformation;
                    
                    PatientPriorAccidentInjuryDB.IsDeleted = (IsEditMode == true && PatientPriorAccidentInjuryBO.IsDeleted == null) ? PatientPriorAccidentInjuryDB.IsDeleted : PatientPriorAccidentInjuryBO.IsDeleted;

                    if (Add_PatientPriorAccidentInjuryDB == true)
                    {
                        PatientPriorAccidentInjuryDB = _context.PatientPriorAccidentInjuries.Add(PatientPriorAccidentInjuryDB);
                    }
                    _context.SaveChanges();                    
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Patient Prior Accident Injury details.", ErrorLevel = ErrorLevel.Error };
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                PatientPriorAccidentInjuryDB = _context.PatientPriorAccidentInjuries.Where(p => p.Id == PatientPriorAccidentInjuryDB.Id).FirstOrDefault<PatientPriorAccidentInjury>();
            }

            var res = Convert<BO.PatientPriorAccidentInjury, PatientPriorAccidentInjury>(PatientPriorAccidentInjuryDB);
            return (object)res;
        }
        #endregion

        #region Get By Case ID 
        public override object GetByCaseId(int id)
        {
            var acc = _context.PatientPriorAccidentInjuries.Where(p => p.CaseId == id
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                           .ToList<PatientPriorAccidentInjury>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientPriorAccidentInjury> lstPatientPriorAccidentInjury = new List<BO.PatientPriorAccidentInjury>();
                foreach (PatientPriorAccidentInjury item in acc)
                {
                    lstPatientPriorAccidentInjury.Add(Convert<BO.PatientPriorAccidentInjury, PatientPriorAccidentInjury>(item));
                }
                return lstPatientPriorAccidentInjury;
            }
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
