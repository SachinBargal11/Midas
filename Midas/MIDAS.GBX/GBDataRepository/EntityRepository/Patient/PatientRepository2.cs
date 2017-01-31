using MIDAS.GBX.Common;
using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EN;
using MIDAS.GBX.EntityRepository;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class PatientRepository2 : BaseEntityRepo, IDisposable
    {
        private DbSet<Patient2> _dbSet;

        #region Constructor
        public PatientRepository2(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<Patient2>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Patient2 patient2 = entity as Patient2;

            if (patient2 == null)
                return default(T);

            BO.Patient2 patientBO2 = new BO.Patient2();

            patientBO2.ID = patient2.id;
            patientBO2.SSN = patient2.SSN;
            patientBO2.WCBNo = patient2.WCBNo;
            patientBO2.LocationID = patient2.LocationID;
            patientBO2.Weight = patient2.Weight;
            //patientBO2.MaritalStatus = patient2.MaritalStatus;
            patientBO2.DrivingLicence = patient2.DrivingLicence;
            patientBO2.EmergenceyContactNumber = patient2.EmergencyContactNumber;
            patientBO2.EmergenceyContactRelation = patient2.EmergencyContactRelation;
            patientBO2.EmergenceyContactName = patient2.EmergencyContactName;
            if (patient2.IsDeleted.HasValue)
                patientBO2.IsDeleted = patient2.IsDeleted.Value;
            if (patient2.UpdateByUserID.HasValue)
                patientBO2.UpdateByUserID = patient2.UpdateByUserID.Value;

            //useful to get whole structure in responce.
            //BO.Company boCompany = new BO.Company();
            //using (CompanyRepository cmp = new CompanyRepository(_context))
            //{
            //    boCompany = cmp.Convert<BO.Company, Company>(patient2.Company);
            //    patientBO2.Company = boCompany;
            //}

            BO.User boUser = new BO.User();
            using (UserRepository cmp = new UserRepository(_context))
            {
                boUser = cmp.Convert<BO.User, User>(patient2.User);
                patientBO2.User = boUser;
            }

            BO.Location boLocation = new BO.Location();
            using (LocationRepository cmp = new LocationRepository(_context))
            {
                boLocation = cmp.Convert<BO.Location, Location>(patient2.Location);
                patientBO2.Location = boLocation;
            }

            return (T)(object)patientBO2;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Patient2 patient2 = (BO.Patient2)(object)entity;
            var result = patient2.Validate(patient2);
            return result;
        }
        #endregion

        #region Get By ID For Patient 
        public override object Get(int id)
        {
            var acc = _context.Patient2.Include("User").Include("Location").Where(p => p.id == id && p.IsDeleted == false).FirstOrDefault<Patient2>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                BO.Patient2 acc_ = Convert<BO.Patient2, Patient2>(acc);
                return (object)acc_;
            }
        }
        #endregion



        public void Dispose()
        {
            // Use SupressFinalize in case a subclass 
            // of this type implements a finalizer.
            GC.SuppressFinalize(this);
        }
    }
}
