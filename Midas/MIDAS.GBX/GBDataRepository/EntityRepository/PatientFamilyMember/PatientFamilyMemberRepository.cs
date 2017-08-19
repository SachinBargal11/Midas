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
    internal class PatientFamilyMemberRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<PatientFamilyMember> _dbPatientFamilyMember;

        public PatientFamilyMemberRepository(MIDASGBXEntities context) : base(context)
        {
            _dbPatientFamilyMember = context.Set<PatientFamilyMember>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            PatientFamilyMember patientfamilymember = entity as PatientFamilyMember;

            if (patientfamilymember == null)
                return default(T);

            BO.PatientFamilyMember patientfamilymemberBO = new BO.PatientFamilyMember();

            patientfamilymemberBO.ID = patientfamilymember.Id;
            patientfamilymemberBO.CaseId = patientfamilymember.CaseId;
            patientfamilymemberBO.RelationId = patientfamilymember.RelationId;
            patientfamilymemberBO.FirstName = patientfamilymember.FirstName;
            patientfamilymemberBO.MiddleName = patientfamilymember.MiddleName;
            patientfamilymemberBO.LastName = patientfamilymember.LastName;
            patientfamilymemberBO.Age = patientfamilymember.Age;
            patientfamilymemberBO.RaceId = (byte)patientfamilymember.RaceId;
            patientfamilymemberBO.EthnicitesId = (byte)patientfamilymember.EthnicitesId;
            patientfamilymemberBO.GenderId = (byte)patientfamilymember.GenderId;
            patientfamilymemberBO.CellPhone = patientfamilymember.CellPhone;
            patientfamilymemberBO.WorkPhone = patientfamilymember.WorkPhone;
            patientfamilymemberBO.PrimaryContact = patientfamilymember.PrimaryContact;
            patientfamilymemberBO.IsDeleted = patientfamilymember.IsDeleted;
            patientfamilymemberBO.CreateByUserID = patientfamilymember.CreateByUserID;
            patientfamilymemberBO.UpdateByUserID = patientfamilymember.UpdateByUserID;



            return (T)(object)patientfamilymemberBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.PatientFamilyMember PatientFamilyMember = (BO.PatientFamilyMember)(object)entity;
            var result = PatientFamilyMember.Validate(PatientFamilyMember);
            return result;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.PatientFamilyMembers.Where(p => p.Id == id 
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .FirstOrDefault<PatientFamilyMember>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            BO.PatientFamilyMember acc_ = Convert<BO.PatientFamilyMember, PatientFamilyMember>(acc);            

            return (object)acc_;
        }
        #endregion

        #region Get By Patient Id
        //public override object GetByPatientId(int PatientId)
        //{
        //    var acc = _context.PatientFamilyMembers.Include("Patient").Where(p => p.PatientId == PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList<PatientFamilyMember>();

        //    if (acc == null)
        //    {
        //        return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
        //    }

        //    List<BO.PatientFamilyMember> lstPatientFamilyMember = new List<BO.PatientFamilyMember>();
        //    //acc.ForEach(p => lstpatientsEmpInfo.Add(Convert<BO.PatientEmpInfo, PatientEmpInfo>(p)));
        //    foreach (PatientFamilyMember item in acc)
        //    {
        //        lstPatientFamilyMember.Add(Convert<BO.PatientFamilyMember, PatientFamilyMember>(item));
        //    }

        //    return lstPatientFamilyMember;
        //}
        #endregion

        #region Get By Case Id
        public override object GetByCaseId(int CaseId)
        {
            var acc = _context.PatientFamilyMembers//.Include("Patient")
                                                   .Where(p => p.CaseId == CaseId 
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .ToList<PatientFamilyMember>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.PatientFamilyMember> lstPatientFamilyMember = new List<BO.PatientFamilyMember>();

            foreach (PatientFamilyMember item in acc)
            {
                lstPatientFamilyMember.Add(Convert<BO.PatientFamilyMember, PatientFamilyMember>(item));
            }

            return lstPatientFamilyMember;
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.PatientFamilyMember patientfamilymemberBO = (BO.PatientFamilyMember)(object)entity;
            BO.Patient patientBO = new BO.Patient();
            BO.Common.Gender genderBO = new BO.Common.Gender();
            BO.Relation relationBO = new BO.Relation();

            PatientFamilyMember patientfamilymemberDB = new PatientFamilyMember();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                bool IsEditMode = false;
                IsEditMode = (patientfamilymemberBO != null && patientfamilymemberBO.ID > 0) ? true : false;

                Patient patient2DB = new Patient();
                Gender genderDB = new Gender();
                Relation relationDB = new Relation();                

                #region Patient Family Members
                if (patientfamilymemberBO != null)
                {
                    //if (patientfamilymemberBO.IsInActive == true)
                    //{
                    //    var existingPatientInfoDB = _context.PatientFamilyMembers.Where(p => p.PatientId == patientfamilymemberBO.PatientId).ToList();
                    //    existingPatientInfoDB.ForEach(p => p.IsInActive = false);
                    //}

                    if (patientfamilymemberBO.PrimaryContact.HasValue == true && patientfamilymemberBO.PrimaryContact == true)
                    {
                        var existingPatientInfoDB = _context.PatientFamilyMembers.Where(p => p.CaseId == patientfamilymemberBO.CaseId).ToList();
                        existingPatientInfoDB.ForEach(p => p.PrimaryContact = false);
                    }

                    bool Add_patientfamilymemberDB = false;
                    patientfamilymemberDB = _context.PatientFamilyMembers.Where(p => p.Id == patientfamilymemberBO.ID).FirstOrDefault();

                    if (patientfamilymemberDB == null && patientfamilymemberBO.ID <= 0)
                    {
                        patientfamilymemberDB = new PatientFamilyMember();
                        Add_patientfamilymemberDB = true;
                    }
                    else if (patientfamilymemberDB == null && patientfamilymemberBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    if (IsEditMode == false)
                    {
                        patientfamilymemberDB.CaseId = patientfamilymemberBO.CaseId;
                    }
                    
                    patientfamilymemberDB.RelationId = (IsEditMode == true && patientfamilymemberBO.RelationId <= 0) ? patientfamilymemberDB.RelationId : patientfamilymemberBO.RelationId;
                    patientfamilymemberDB.FirstName = (IsEditMode == true && patientfamilymemberBO.FirstName == null) ? patientfamilymemberDB.FirstName : patientfamilymemberBO.FirstName;
                    patientfamilymemberDB.MiddleName = (IsEditMode == true && patientfamilymemberBO.MiddleName == null) ? patientfamilymemberDB.MiddleName : patientfamilymemberBO.MiddleName;
                    patientfamilymemberDB.LastName = (IsEditMode == true && patientfamilymemberBO.LastName == null) ? patientfamilymemberDB.LastName : patientfamilymemberBO.LastName;
                    patientfamilymemberDB.Age = (IsEditMode == true && patientfamilymemberBO.Age <= 0) ? patientfamilymemberDB.Age : patientfamilymemberBO.Age;
                    patientfamilymemberDB.RaceId = (IsEditMode == true && patientfamilymemberBO.RaceId.HasValue == false) ? patientfamilymemberDB.RaceId : patientfamilymemberBO.RaceId;
                    patientfamilymemberDB.EthnicitesId = (IsEditMode == true && patientfamilymemberBO.EthnicitesId.HasValue == false) ? patientfamilymemberDB.EthnicitesId : patientfamilymemberBO.EthnicitesId;
                    patientfamilymemberDB.GenderId = (IsEditMode == true && patientfamilymemberBO.GenderId <= 0) ? patientfamilymemberDB.GenderId : patientfamilymemberBO.GenderId;
                    patientfamilymemberDB.CellPhone = (IsEditMode == true && patientfamilymemberBO.CellPhone == null) ? patientfamilymemberDB.CellPhone : patientfamilymemberBO.CellPhone;
                    patientfamilymemberDB.WorkPhone = (IsEditMode == true && patientfamilymemberBO.WorkPhone == null) ? patientfamilymemberDB.WorkPhone : patientfamilymemberBO.WorkPhone;
                    patientfamilymemberDB.PrimaryContact = (IsEditMode == true && patientfamilymemberBO.PrimaryContact == null) ? patientfamilymemberDB.PrimaryContact : patientfamilymemberBO.PrimaryContact;

                    if (Add_patientfamilymemberDB == true)
                    {
                        patientfamilymemberDB = _context.PatientFamilyMembers.Add(patientfamilymemberDB);
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

                patientfamilymemberDB = _context.PatientFamilyMembers.Where(p => p.Id == patientfamilymemberDB.Id).FirstOrDefault<PatientFamilyMember>();
            }

            var res = Convert<BO.PatientFamilyMember, PatientFamilyMember>(patientfamilymemberDB);
            return (object)res;
        }
        #endregion

        #region Delete By ID
        public override object Delete(int id)
        {
            var acc = _context.PatientFamilyMembers.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || p.IsDeleted == false)).FirstOrDefault<PatientFamilyMember>();

            if (acc != null)
            {
                acc.IsDeleted = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.PatientFamilyMember, PatientFamilyMember>(acc);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
