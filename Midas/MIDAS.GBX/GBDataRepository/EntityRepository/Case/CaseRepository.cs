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
    internal class CaseRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<Case> _dbCase;

        public CaseRepository(MIDASGBXEntities context) : base(context)
        {
            _dbCase = context.Set<Case>();
            context.Configuration.ProxyCreationEnabled = false;
        }


        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            List<Case> listcase = entity as List<Case>;
            if (listcase == null)
                return default(T);

            List<BO.Case> BOcaselist = new List<BO.Case>();
            foreach (var mcase in listcase)
            {
                BO.Case boCase = new BO.Case();

                boCase.ID = mcase.Id;
                boCase.PatientId = mcase.PatientId;
                boCase.CaseName = mcase.CaseName;
                boCase.CaseTypeId = (int)mcase.CaseTypeId;
                boCase.Age = (decimal)mcase.Age;
                boCase.DateOfInjury = mcase.DateOfInjury;
                boCase.LocationId = mcase.LocationId;
                boCase.PatientAddressId = mcase.PatientAddressId;
                boCase.PatientContactInfoId =mcase.PatientContactInfoId;
                boCase.EmpInfo =mcase.EmpInfo;
                boCase.InsuranceInfoId =mcase.InsuranceInfoId;
                boCase.VehiclePlateNo = mcase.VehiclePlateNo;
                boCase.AccidentAddressId = mcase.AccidentAddressId;
                boCase.CarrierCaseNo = mcase.CarrierCaseNo;
                boCase.Transportation = mcase.Transportation;
                boCase.DateOfFirstTreatment = mcase.DateOfFirstTreatment;
                boCase.CaseStatusId = mcase.CaseStatusId;
                boCase.AttorneyId = mcase.AttorneyId;

                BO.User boUser = new BO.User();
                using (UserRepository cmp = new UserRepository(_context))
                {
                    boUser = cmp.Convert<BO.User, User>(mcase.User);
                    boCase.User = boUser;
                }

                BOcaselist.Add(boCase);
            }


            return (T)(object)BOcaselist;
        }
        #endregion

        #region Entity Conversion
        public override T ObjectConvert<T, U>(U entity)
        {
            Case cases = entity as Case;

            if (cases == null)
                return default(T);

            BO.Case caseBO = new BO.Case();
            caseBO.ID = cases.Id;
            caseBO.PatientId = cases.PatientId;
            caseBO.CaseName = cases.CaseName;
            caseBO.CaseTypeId = (int)cases.CaseTypeId;
            caseBO.Age = (decimal)cases.Age;
            caseBO.DateOfInjury = cases.DateOfInjury;
            caseBO.LocationId = cases.LocationId;
            caseBO.PatientAddressId = cases.PatientAddressId;
            caseBO.PatientContactInfoId = cases.PatientContactInfoId;
            caseBO.EmpInfo = cases.EmpInfo;
            caseBO.InsuranceInfoId = cases.InsuranceInfoId;
            caseBO.VehiclePlateNo = cases.VehiclePlateNo;
            caseBO.AccidentAddressId = cases.AccidentAddressId;
            caseBO.CarrierCaseNo = cases.CarrierCaseNo;
            caseBO.Transportation = cases.Transportation;
            caseBO.DateOfFirstTreatment = cases.DateOfFirstTreatment;
            caseBO.CaseStatusId = cases.CaseStatusId;
            caseBO.AttorneyId = cases.AttorneyId;

            BO.User boUser = new BO.User();
            using (UserRepository cmp = new UserRepository(_context))
            {
                boUser = cmp.Convert<BO.User, User>(cases.User);
                caseBO.User = boUser;
            }
            BO.Location Location = new BO.Location();
            using (LocationRepository cmp = new LocationRepository(_context))
            {
                Location = cmp.Convert<BO.Location, Location>(cases.Location);
                caseBO.Location = Location;
            }





            return (T)(object)caseBO;
        }
        #endregion


        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.Cases.Include("User").Include("Location").Where(p => p.Id == id ).FirstOrDefault<Case>();
            BO.Case acc_ = ObjectConvert<BO.Case, Case>(acc);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region Get All 
        public override Object Get<T>(T entity)
        {
            var acc = _context.Cases.Include("User").Include("Location").ToList<Case>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Case> acc_ = Convert<List<BO.Case>, List<Case>>(acc);
                return (object)acc_;
            }

        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            Case cases = new Case();
            var res = Convert<BO.Case, Case>(cases);
            return (object)res;

        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
