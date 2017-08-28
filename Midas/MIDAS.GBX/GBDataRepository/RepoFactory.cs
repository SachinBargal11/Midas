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
using MIDAS.GBX.DataRepository.EntityRepository.FileUpload;

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
            else if (typeof(T) == typeof(BO.Signup))
            {
                repo = new CompanyRepository(context);
            }
            else if (typeof(T) == typeof(BO.User))
            {
                repo = new UserRepository(context);
            }
            else if (typeof(T) == typeof(BO.OTP))
            {
                repo = new OTPRepository(context);
            }
            else if (typeof(T) == typeof(BO.PasswordToken))
            {
                repo = new PasswordTokenRepository(context);
            }
            else if (typeof(T) == typeof(BO.Location))
            {
                repo = new LocationRepository(context);
            }
            else if (typeof(T) == typeof(BO.Invitation))
            {
                repo = new InvitationRepository(context);
            }
            else if (typeof(T) == typeof(BO.SaveLocation))
            {
                repo = new LocationRepository(context);
            }
            else if (typeof(T) == typeof(BO.AddUser))
            {
                repo = new UserRepository(context);
            }
            else if (typeof(T) == typeof(BO.ValidateOTP))
            {
                repo = new OTPRepository(context);
            }
            else if (typeof(T) == typeof(BO.Specialty))
            {
                repo = new SpecialityRepository(context);
            }
            else if (typeof(T) == typeof(BO.SpecialtyDetails))
            {
                repo = new SpecialityDetailsRepository(context);
            }
            else if (typeof(T) == typeof(BO.CompanySpecialtyDetails))
            {
                repo = new CompanySpecialityDetailsRepository(context);
            }
            else if (typeof(T) == typeof(BO.Doctor))
            {
                repo = new DoctorRepository(context);
            }
            else if (typeof(T) == typeof(BO.DoctorSpeciality))
            {
                repo = new DoctorSpecialityRepository(context);
            }
            else if (typeof(T) == typeof(BO.RoomTest))
            {
                repo = new RoomTestRepository(context);
            }
            else if (typeof(T) == typeof(BO.Room))
            {
                repo = new RoomRepository(context);
            }
            else if (typeof(T) == typeof(BO.Schedule))
            {
                repo = new ScheduleRepository(context);
            }
            else if (typeof(T) == typeof(BO.UserCompany))
            {
                repo = new UserCompanyRepository(context);
            }
            else if (typeof(T) == typeof(BO.DoctorLocationSchedule))
            {
                repo = new DoctorLocationScheduleRepository(context);
            }
            else if (typeof(T) == typeof(List<BO.DoctorLocationSchedule>))
            {
                repo = new DoctorLocationScheduleRepository(context);
            }
            //else if (typeof(T) == typeof(BO.Patient))
            //{
            //    repo = new PatientRepository(context);
            //}
            else if (typeof(T) == typeof(BO.Log))
            {
                repo = new LogRepository(context);
            }
            else if (typeof(T) == typeof(BO.UserCompany))
            {
                repo = new UserCompanyRepository(context);
            }
            else if (typeof(T) == typeof(BO.Common.State))
            {
                repo = new StateRepository(context);
            }
            else if (typeof(T) == typeof(BO.Common.City))
            {
                repo = new CityRepository(context);
            }
            else if (typeof(T) == typeof(BO.Common.MaritalStatus))
            {
                repo = new MaritalStatusRepository(context);
            }
            else if (typeof(T) == typeof(BO.Common.Gender))
            {
                repo = new GenderRepository(context);
            }
            else if (typeof(T) == typeof(BO.Patient))
            {
                repo = new PatientRepository(context);
            }
            else if (typeof(T) == typeof(BO.Case))
            {
                repo = new CaseRepository(context);
            }
            else if (typeof(T) == typeof(BO.PatientInsuranceInfo))
            {
                repo = new PatientInsuranceInfoRepository(context);
            }
            else if (typeof(T) == typeof(BO.PatientEmpInfo))
            {
                repo = new PatientEmpInfoRepository(context);
            }
            else if (typeof(T) == typeof(BO.Common.PolicyOwner))
            {
                repo = new PolicyOwnerRepository(context);
            }
            else if (typeof(T) == typeof(BO.Common.InsuranceType))
            {
                repo = new InsuranceTypeRepository(context);
            }
            else if (typeof(T) == typeof(BO.PatientAccidentInfo))
            {
                repo = new PatientAccidentInfoRepository(context);
            }
            else if (typeof(T) == typeof(BO.PatientFamilyMember))
            {
                repo = new PatientFamilyMemberRepository(context);
            }
            else if (typeof(T) == typeof(BO.Common.PatientType))
            {
                repo = new PatientTypeRepository(context);
            }
            else if (typeof(T) == typeof(BO.Common.Relation))
            {
                repo = new RelationRepository(context);
            }
            else if (typeof(T) == typeof(BO.RefferingOffice))
            {
                repo = new RefferingOfficeRepository(context);
            }
            else if (typeof(T) == typeof(BO.AttorneyMaster))
            {
                repo = new AttorneyMasterRepository(context);
            }
            else if (typeof(T) == typeof(BO.CaseInsuranceMapping))
            {
                repo = new CaseInsuranceMappingRepository(context);
            }
            else if (typeof(T) == typeof(BO.Common.CaseType))
            {
                repo = new CaseTypeRepository(context);
            }
            else if (typeof(T) == typeof(BO.Common.CaseStatus))
            {
                repo = new CaseStatusRepository(context);
            }
            else if (typeof(T) == typeof(BO.AdjusterMaster))
            {
                repo = new AdjusterMasterRepository(context);
            }
            else if (typeof(T) == typeof(BO.InsuranceMaster))
            {
                repo = new InsuranceMasterRepository(context);
            }
            //else if (typeof(T) == typeof(BO.PatientVisit))
            //{
            //    repo = new PatientVisitRepository(context);
            //}
            //else if (typeof(T) == typeof(BO.PatientVisitEvent))
            //{
            //    repo = new PatientVisitEventRepository(context);
            //}
            else if (typeof(T) == typeof(BO.PatientVisit))
            {
                repo = new PatientVisitRepository(context);
            }
            else if (typeof(T) == typeof(BO.CalendarEvent))
            {
                repo = new CalendarEventRepository(context);
            }            
            else if (typeof(T) == typeof(BO.CaseCompanyMapping))
            {
                repo = new CaseCompanyMappingRepository(context);
            }
            else if (typeof(T) == typeof(BO.CompanyCaseConsentApproval))
            {
                repo = new CompanyCaseConsentApprovalRepository(context);
            }
            //else if (typeof(T) == typeof(BO.Referral))
            //{
            //    repo = new ReferralRepository(context);
            //}
            else if (typeof(T) == typeof(BO.Document))
            {
                repo = new FileUploadRepository(context);
            }
            else if (typeof(T) == typeof(BO.Notification))
            {
                repo = new NotificationRepository(context);
            }
            else if (typeof(T) == typeof(BO.AddPatient))
            {
                repo = new PatientRepository(context);
            }
            else if (typeof(T) == typeof(BO.DiagnosisType))
            {
                repo = new DiagnosisTypeRepository(context);
            }
            else if (typeof(T) == typeof(BO.DiagnosisCode))
            {
                repo = new DiagnosisCodeRepository(context);
            }
            else if (typeof(T) == typeof(BO.ProcedureCode))
            {
                repo = new ProcedureCodeRepository(context);
            }
            else if (typeof(T) == typeof(BO.CompanyCaseConsentBase64))
            {
                repo = new CompanyCaseConsentApprovalRepository(context);
            }
            else if (typeof(T) == typeof(BO.DocumentNodeObjectMapping))
            {
                repo = new DocumentNodeObjectMappingRepository(context);
            }
            else if (typeof(T) == typeof(BO.PreferredMedicalProviderSignUp))
            {
                repo = new PreferredMedicalProviderRepository(context);
            }
            else if (typeof(T) == typeof(BO.PreferredAttorneyProviderSignUp))
            {
                repo = new PreferredAttorneyProviderRepository(context);
            }
            else if (typeof(T) == typeof(BO.UserPersonalSetting))
            {
                repo = new UserPersonalSettingRepository(context);
            }
            else if (typeof(T) == typeof(BO.PendingReferral))
            {
                repo = new PendingReferralRepository(context);
            }
            else if (typeof(T) == typeof(BO.VisitReports))
            {
                repo = new ReportsRepository(context);
            }
            else if (typeof(T) == typeof(BO.Referral))
            {
                repo = new ReferralRepository(context);
            }            
            else if (typeof(T) == typeof(BO.MergePDF) || typeof(T) == typeof(BO.Document) || typeof(T) == typeof(BO.Common.UploadInfo))
            {
                repo = new DocumentManagerRepository(context);
            }
            else if (typeof(T) == typeof(BO.Common.TemplateType))
            {
                repo = new TemplateTypeRepository(context);
            }
            else if (typeof(T) == typeof(BO.GeneralSetting))
            {
                repo = new GeneralSettingRepository(context);
            }
            else if (typeof(T) == typeof(BO.PreferredAncillarProviderSignUp))
            {
                repo = new PreferredAncillaryProviderRepository(context);
            }
            else if (typeof(T) == typeof(BO.ProcedureCodeCompanyMapping))
            {
                repo = new ProcedureCodeCompanyMappingRepository(context);
            }
            else if (typeof(T) == typeof(BO.CompanyICDTypeCode))
            {
                repo = new ICDTypeCodeRepository(context);
            }
            else if (typeof(T) == typeof(BO.IMEVisit))
            {
                repo = new IMEvisitRepository(context);
            }
            else if (typeof(T) == typeof(BO.EOVisit))
            {
                repo = new EOVisitRepository(context);
            }
            else if (typeof(T) == typeof(BO.AttorneyVisit))
            {
                repo = new AttorneyVisitRepository(context);
            }
            else if (typeof(T) == typeof(BO.Common.LanguagePreference))
            {
                repo = new LanguagePreferenceRepository(context);
            }
            else if (typeof(T) == typeof(BO.Common.SocialMedia))
            {
                repo = new SocialMediaRepository(context);
            }
            else if (typeof(T) == typeof(BO.PatientVisitUnscheduled))
            {
                repo = new PatientVisitUnscheduledRepository(context);
            }
            else if (typeof(T) == typeof(BO.SchoolInformation))
            {
                repo = new SchoolInformationRepository(context);
            }
            else if (typeof(T) == typeof(BO.PlaintiffVehicle))
            {
                repo = new PlaintiffVehicleRepository(context);
            }
            else if (typeof(T) == typeof(BO.DefendantVehicle))
            {
                repo = new DefendantVehicleRepository(context);
            }
            else if (typeof(T) == typeof(BO.PatientPriorAccidentInjury))
            {
                repo = new DefendantVehicleRepository(context);
            }

            return repo;
        }
    }
}

