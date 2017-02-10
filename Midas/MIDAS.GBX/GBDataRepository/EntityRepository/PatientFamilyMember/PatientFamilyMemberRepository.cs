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
            patientfamilymemberBO.PatientId = patientfamilymember.PatientId;
            patientfamilymemberBO.RelationId = patientfamilymember.RelationId;
            patientfamilymemberBO.FullName = patientfamilymember.FullName;
            patientfamilymemberBO.FamilyName = patientfamilymember.FamilyName;
            patientfamilymemberBO.Prefix = patientfamilymember.Prefix;
            patientfamilymemberBO.Sufix = patientfamilymember.Sufix;
            patientfamilymemberBO.Age = patientfamilymember.Age;
            patientfamilymemberBO.RaceId = (byte)patientfamilymember.RaceId;
            patientfamilymemberBO.EthnicitesId = (byte)patientfamilymember.EthnicitesId;
            patientfamilymemberBO.GenderId = (byte)patientfamilymember.GenderId;
            patientfamilymemberBO.CellPhone = patientfamilymember.CellPhone;
            patientfamilymemberBO.WorkPhone = patientfamilymember.WorkPhone;
            patientfamilymemberBO.PrimaryContact = patientfamilymember.PrimaryContact;
            patientfamilymemberBO.IsInActive = patientfamilymember.IsInActive;



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

     
        #region Get By Patient Id
        public override object GetByPatientId(int PatientId)
        {
            var acc = _context.PatientFamilyMembers.Include("Patient2").Where(p => p.PatientId == PatientId && (p.IsDeleted.HasValue == false || p.IsDeleted == false)).ToList<PatientFamilyMember>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.PatientFamilyMember> lstPatientFamilyMember = new List<BO.PatientFamilyMember>();
            //acc.ForEach(p => lstpatientsEmpInfo.Add(Convert<BO.PatientEmpInfo, PatientEmpInfo>(p)));
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
            BO.Patient2 patient2BO = new BO.Patient2();
            BO.Common.Gender genderBO = new BO.Common.Gender();
            BO.Relation relationBO = new BO.Relation();

            PatientFamilyMember patientfamilymemberDB = new PatientFamilyMember();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                Patient2 patient2DB = new Patient2();
                Gender genderDB = new Gender();
                Relation relationDB = new Relation();
                

                #region patient2
                if (patientfamilymemberBO != null)
                {
                    if (patientfamilymemberBO.IsInActive == true)
                    {
                        var existingPatientInfoDB = _context.PatientFamilyMembers.Where(p => p.PatientId == patientfamilymemberBO.PatientId).ToList();
                        existingPatientInfoDB.ForEach(p => p.IsInActive = false);
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

                    patientfamilymemberDB.PatientId = patientfamilymemberBO.PatientId;
                    patientfamilymemberDB.RelationId = patientfamilymemberBO.RelationId;
                    patientfamilymemberDB.FullName = patientfamilymemberBO.FullName;
                    patientfamilymemberDB.FamilyName = patientfamilymemberBO.FamilyName;
                    patientfamilymemberDB.Prefix = patientfamilymemberBO.Prefix;
                    patientfamilymemberDB.Sufix = patientfamilymemberBO.Sufix;
                    patientfamilymemberDB.Age = patientfamilymemberBO.Age;
                    patientfamilymemberDB.RaceId = patientfamilymemberBO.RaceId;
                    patientfamilymemberDB.EthnicitesId = patientfamilymemberBO.EthnicitesId;
                    patientfamilymemberDB.GenderId = (byte)patientfamilymemberBO.GenderId;
                    patientfamilymemberDB.CellPhone = patientfamilymemberBO.CellPhone;
                    patientfamilymemberDB.WorkPhone = patientfamilymemberBO.WorkPhone;
                    patientfamilymemberDB.PrimaryContact = patientfamilymemberBO.PrimaryContact;
                    patientfamilymemberDB.IsInActive = patientfamilymemberBO.IsInActive;

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
        public override object DeleteById(int id)
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


            return (object)acc;
        }
        #endregion





        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
