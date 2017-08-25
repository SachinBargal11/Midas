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
    internal class SchoolInformationRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<SchoolInformation> _dbSchoolInformation;

        public SchoolInformationRepository(MIDASGBXEntities context) : base(context)
        {
            _dbSchoolInformation = context.Set<SchoolInformation>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            SchoolInformation SchoolInformationDB = entity as SchoolInformation;

            if (SchoolInformationDB == null)
                return default(T);

            BO.SchoolInformation SchoolInformationBO = new BO.SchoolInformation();
            SchoolInformationBO.ID = SchoolInformationDB.Id;
            SchoolInformationBO.CaseId = SchoolInformationDB.CaseId;
            SchoolInformationBO.NameOfSchool = SchoolInformationDB.NameOfSchool;
            SchoolInformationBO.Grade = SchoolInformationDB.Grade;
            SchoolInformationBO.LossOfTime = SchoolInformationDB.LossOfTime;
            SchoolInformationBO.DatesOutOfSchool = SchoolInformationDB.DatesOutOfSchool;            

            //Common 
            SchoolInformationBO.IsDeleted = SchoolInformationDB.IsDeleted;
            SchoolInformationBO.CreateByUserID = SchoolInformationDB.CreateByUserID;
            SchoolInformationBO.UpdateByUserID = SchoolInformationDB.UpdateByUserID;

            return (T)(object)SchoolInformationBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.SchoolInformation SchoolInformationBO = (BO.SchoolInformation)(object)entity;
            var result = SchoolInformationBO.Validate(SchoolInformationBO);
            return result;
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.SchoolInformation SchoolInformationBO = (BO.SchoolInformation)(object)entity;

            SchoolInformation SchoolInformationDB = new SchoolInformation();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {

                bool IsEditMode = false;
                IsEditMode = (SchoolInformationBO != null && SchoolInformationBO.ID > 0) ? true : false;                

                #region patient Emp Info
                if (SchoolInformationBO != null)
                {
                    bool Add_SchoolInformationDB = false;
                    SchoolInformationDB = _context.SchoolInformations.Where(p => p.Id == SchoolInformationBO.ID).FirstOrDefault();

                    if (SchoolInformationDB == null && SchoolInformationBO.ID <= 0)
                    {
                        SchoolInformationDB = new SchoolInformation();
                        Add_SchoolInformationDB = true;
                    }
                    else if (SchoolInformationDB == null && SchoolInformationBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient school information dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    SchoolInformationDB.CaseId = SchoolInformationBO.CaseId;
                    SchoolInformationDB.NameOfSchool = IsEditMode == true && SchoolInformationBO.NameOfSchool == null ? SchoolInformationDB.NameOfSchool : SchoolInformationBO.NameOfSchool;
                    SchoolInformationDB.Grade = IsEditMode == true && SchoolInformationBO.Grade == null ? SchoolInformationDB.Grade : SchoolInformationBO.Grade;
                    SchoolInformationDB.LossOfTime = IsEditMode == true && SchoolInformationBO.LossOfTime == null ? SchoolInformationDB.LossOfTime : SchoolInformationBO.LossOfTime;
                    SchoolInformationDB.DatesOutOfSchool = IsEditMode == true && SchoolInformationBO.DatesOutOfSchool == null ? SchoolInformationDB.DatesOutOfSchool : SchoolInformationBO.DatesOutOfSchool;
                    SchoolInformationDB.Grade = IsEditMode == true && SchoolInformationBO.Grade == null ? SchoolInformationDB.Grade : SchoolInformationBO.Grade;
                    SchoolInformationDB.Grade = IsEditMode == true && SchoolInformationBO.Grade == null ? SchoolInformationDB.Grade : SchoolInformationBO.Grade;

                    if (Add_SchoolInformationDB == true)
                    {
                        SchoolInformationDB = _context.SchoolInformations.Add(SchoolInformationDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid patient school information details.", ErrorLevel = ErrorLevel.Error };
                    }
                    SchoolInformationDB = null;
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                SchoolInformationDB = _context.SchoolInformations.Where(p => p.Id == SchoolInformationDB.Id).FirstOrDefault<SchoolInformation>();
            }

            var res = Convert<BO.SchoolInformation, SchoolInformation>(SchoolInformationDB);
            return (object)res;
        }
        #endregion

        #region Get By Case Id
        public override object GetByCaseId(int CaseId)
        {
            var acc = _context.SchoolInformations.Where(p => p.CaseId == CaseId
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .FirstOrDefault();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            BO.SchoolInformation SchoolInformationBO = new BO.SchoolInformation();
            SchoolInformationBO = Convert<BO.SchoolInformation, SchoolInformation>(acc);
            //foreach (PatientEmpInfo item in acc)
            //{
            //    lstpatientsEmpInfo.Add(Convert<BO.PatientEmpInfo, PatientEmpInfo>(item));
            //}

            return SchoolInformationBO;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
