using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.EntityRepository;
using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.DataRepository.EntityRepository;
using MIDAS.GBX.DataRepository.EntityRepository.Common;

namespace MIDAS.GBX
{
    internal class RepoFactory
    {
        internal static BaseEntityRepo GetRepo<T>(MIDASGBXEntities context)
        {
            BaseEntityRepo repo = null;
            if (typeof(T) == typeof(BO.Company))
            {
                repo = new CompanyRepository(context);
            }
            if (typeof(T) == typeof(BO.Signup))
            {
                repo = new CompanyRepository(context);
            }
            if (typeof(T) == typeof(BO.User))
            {
                repo = new UserRepository(context);
            }
            if (typeof(T) == typeof(BO.OTP))
            {
                repo = new OTPRepository(context);
            }
            if (typeof(T) == typeof(BO.PasswordToken))
            {
                repo = new PasswordTokenRepository(context);
            }
            if (typeof(T) == typeof(BO.Location))
            {
                repo = new LocationRepository(context);
            }
            if (typeof(T) == typeof(BO.Invitation))
            {
                repo = new InvitationRepository(context);
            }
            if (typeof(T) == typeof(BO.SaveLocation))
            {
                repo = new LocationRepository(context);
            }
            if (typeof(T) == typeof(BO.AddUser))
            {
                repo = new UserRepository(context);
            }
            if (typeof(T) == typeof(BO.ValidateOTP))
            {
                repo = new OTPRepository(context);
            }
            if (typeof(T) == typeof(BO.Specialty))
            {
                repo = new SpecialityRepository(context);
            }
            if (typeof(T) == typeof(BO.SpecialtyDetails))
            {
                repo = new SpecialityDetailsRepository(context);
            }
            if (typeof(T) == typeof(BO.CompanySpecialtyDetails))
            {
                repo = new CompanySpecialityDetailsRepository(context);
            }
            if (typeof(T) == typeof(BO.Doctor))
            {
                repo = new DoctorRepository(context);
            } 
            if (typeof(T) == typeof(BO.DoctorSpeciality))
            {
                repo = new DoctorSpecialityRepository(context);
            }
            if (typeof(T) == typeof(BO.RoomTest))
            {
                repo = new RoomTestRepository(context);
            }
            if (typeof(T) == typeof(BO.Room))
            {
                repo = new RoomRepository(context);
            }
            if (typeof(T) == typeof(BO.Schedule))
            {
                repo = new ScheduleRepository(context);
            }
            if (typeof(T) == typeof(BO.UserCompany))
            {
                repo = new UserCompanyRepository(context);
            }
            if (typeof(T) == typeof(BO.DoctorLocationSchedule))
            {
                repo = new DoctorLocationScheduleRepository(context);
            }
            if (typeof(T) == typeof(BO.Patient))
            {
                repo = new PatientRepository(context);
            }
            if (typeof(T) == typeof(BO.Log))
            {
                repo = new LogRepository(context);
            }
            if (typeof(T) == typeof(BO.UserCompany))
            {
                repo = new UserCompanyRepository(context);
            }
            if (typeof(T) == typeof(BO.Common.State))
            {
                repo = new StateRepository(context);
            }
            else if (typeof(T) == typeof(BO.Common.City))
            {
                repo = new CityRepository(context);
            }
            if (typeof(T) == typeof(BO.Common.MaritalStatus))
            {
                repo = new MaritalStatusRepository(context);
            }
            if (typeof(T) == typeof(BO.Common.Gender))
            {
                repo = new GenderRepository(context);
            }
            if (typeof(T) == typeof(BO.Patient2))
            {
                repo = new Patient2Repository(context);
            }
            if (typeof(T) == typeof(BO.Case))
            {
                repo = new CaseRepository(context);
            }
            if (typeof(T) == typeof(BO.PatientInsuranceInfo))
            {
                repo = new PatientInsuranceInfoRepository(context);
            }
            if (typeof(T) == typeof(BO.PatientEmpInfo))
            {
                repo = new PatientEmpInfoRepository(context);
            }
            if (typeof(T) == typeof(BO.Common.PolicyOwner))
            {
                repo = new PolicyOwnerRepository(context);
            }
            if (typeof(T) == typeof(BO.Common.InsuranceType))
            {
                repo = new InsuranceTypeRepository(context);
            }
            if (typeof(T) == typeof(BO.PatientAccidentInfo))
            {
                repo = new PatientAccidentInfoRepository(context);
            }
            if (typeof(T) == typeof(BO.PatientFamilyMember))
            {
                repo = new PatientFamilyMemberRepository(context);
            }            
            if (typeof(T) == typeof(BO.Common.PatientType))
            {
                repo = new PatientTypeRepository(context);
            }
            if (typeof(T) == typeof(BO.Common.Relation))
            {
                repo = new RelationRepository(context);
            }
            if (typeof(T) == typeof(BO.RefferingOffice))
            {
                repo = new RefferingOfficeRepository(context);
            }
            if (typeof(T) == typeof(BO.CaseInsuranceMapping))
            {
                repo = new CaseInsuranceMappingRepository(context);
            }
            if (typeof(T) == typeof(BO.Common.CaseType))
            {
                repo = new CaseTypeRepository(context);
            }
            if (typeof(T) == typeof(BO.Common.CaseStatus))
            {
                repo = new CaseStatusRepository(context);
            }
            if (typeof(T) == typeof(BO.AdjusterMaster))
            {
                repo = new AdjusterMasterRepository(context);
            }
            return repo;
        }
    }
}

