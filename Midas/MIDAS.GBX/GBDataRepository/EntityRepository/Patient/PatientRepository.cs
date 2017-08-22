using MIDAS.GBX.Common;
using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EN;
using MIDAS.GBX.EntityRepository;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net.Http;

using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json;
using System.Web;
using System.Net.Http.Headers;
using System.Configuration;
using MIDAS.GBX.Common;


namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class PatientRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<Patient> _dbSet;

        #region Constructor
        public PatientRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<Patient>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Patient Patient = entity as Patient;

            if (Patient == null)
                return default(T);

            BO.Patient patientBO2 = new BO.Patient();

            patientBO2.ID = Patient.Id;
            patientBO2.SSN = Patient.SSN;
            patientBO2.Weight = Patient.Weight;
            patientBO2.Height = Patient.Height;
            patientBO2.MaritalStatusId = Patient.MaritalStatusId;
            patientBO2.DateOfFirstTreatment = Patient.DateOfFirstTreatment;

            patientBO2.ParentOrGuardianName = Patient.ParentOrGuardianName;
            patientBO2.EmergencyContactName = Patient.EmergencyContactName;
            patientBO2.EmergencyContactPhone = Patient.EmergencyContactPhone;
            patientBO2.LegallyMarried = Patient.LegallyMarried;
            patientBO2.SpouseName = Patient.SpouseName;
            patientBO2.LanguagePreferenceOther = Patient.LanguagePreferenceOther;

            if (Patient.IsDeleted.HasValue)
                patientBO2.IsDeleted = Patient.IsDeleted.Value;
            if (Patient.UpdateByUserID.HasValue)
                patientBO2.UpdateByUserID = Patient.UpdateByUserID.Value;

            if (Patient.User != null)
            {
                if (Patient.User.IsDeleted.HasValue == false || (Patient.User.IsDeleted.HasValue == true && Patient.User.IsDeleted.Value == false))
                {
                    BO.User boUser = new BO.User();
                    using (UserRepository cmp = new UserRepository(_context))
                    {
                        boUser = cmp.Convert<BO.User, User>(Patient.User);
                        patientBO2.User = boUser;
                    }
                }
            }

            List<BO.PatientLanguagePreferenceMapping> PatientLanguagePreferenceMappingsBO = new List<BO.PatientLanguagePreferenceMapping>();
            if (Patient.PatientLanguagePreferenceMappings != null)
            {
                foreach (var eachPatientLanguagePreferenceMapping in Patient.PatientLanguagePreferenceMappings)
                {
                    if (eachPatientLanguagePreferenceMapping.IsDeleted.HasValue == false || (eachPatientLanguagePreferenceMapping.IsDeleted.HasValue == true && eachPatientLanguagePreferenceMapping.IsDeleted.Value == false))
                    {
                        BO.PatientLanguagePreferenceMapping PatientLanguagePreferenceMappingBO = new BO.PatientLanguagePreferenceMapping();
                        PatientLanguagePreferenceMappingBO.PatientId = eachPatientLanguagePreferenceMapping.PatientId;
                        PatientLanguagePreferenceMappingBO.LanguagePreferenceId = eachPatientLanguagePreferenceMapping.LanguagePreferenceId;

                        PatientLanguagePreferenceMappingsBO.Add(PatientLanguagePreferenceMappingBO);
                    }
                }                
            }
            patientBO2.PatientLanguagePreferenceMappings = PatientLanguagePreferenceMappingsBO;

            List<BO.PatientSocialMediaMapping> PatientSocialMediaMappingsBO = new List<BO.PatientSocialMediaMapping>();
            if (Patient.PatientSocialMediaMappings != null)
            {
                foreach (var eachPatientSocialMediaMapping in Patient.PatientSocialMediaMappings)
                {
                    if (eachPatientSocialMediaMapping.IsDeleted.HasValue == false || (eachPatientSocialMediaMapping.IsDeleted.HasValue == true && eachPatientSocialMediaMapping.IsDeleted.Value == false))
                    {
                        BO.PatientSocialMediaMapping PatientSocialMediaMappingBO = new BO.PatientSocialMediaMapping();
                        PatientSocialMediaMappingBO.PatientId = eachPatientSocialMediaMapping.PatientId;
                        PatientSocialMediaMappingBO.SocialMediaId = eachPatientSocialMediaMapping.SocialMediaId;

                        PatientSocialMediaMappingsBO.Add(PatientSocialMediaMappingBO);
                    }
                }
            }
            patientBO2.PatientSocialMediaMappings = PatientSocialMediaMappingsBO;


            if (Patient.PatientDocuments != null)
            {
                List<BO.PatientDocument> boPatientDocuments = new List<BO.PatientDocument>();
                foreach (var item in Patient.PatientDocuments)
                {
                    if (item != null)
                    {
                        if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                        {

                            BO.PatientDocument boPatientDocument = new BO.PatientDocument();

                            boPatientDocument.ID = item.Id;
                            boPatientDocument.PatientId = item.PatientId;
                            boPatientDocument.MidasDocumentId = item.MidasDocumentId;
                            boPatientDocument.DocumentName = item.DocumentName;
                            boPatientDocument.DocumentType = item.DocumentType;

                            boPatientDocuments.Add(boPatientDocument);
                        }
                    }

                }
                patientBO2.PatientDocuments = boPatientDocuments;
            }

            if (Patient.Cases != null)
            {
                List<BO.Case> boCase = new List<BO.Case>();
                foreach (var casemap in Patient.Cases)
                {
                    if (casemap != null)
                    {
                        if (casemap.IsDeleted.HasValue == false || (casemap.IsDeleted.HasValue == true && casemap.IsDeleted.Value == false))
                        {
                            BO.Case caseBO = new BO.Case();

                            caseBO.ID = casemap.Id;
                            caseBO.PatientId = casemap.PatientId;
                            caseBO.CaseName = casemap.CaseName;
                            caseBO.CaseTypeId = casemap.CaseTypeId;
                            //caseBO.LocationId = casemap.LocationId;
                            //caseBO.PatientEmpInfoId = casemap.PatientEmpInfoId;
                            caseBO.CarrierCaseNo = casemap.CarrierCaseNo;
                            caseBO.CaseStatusId = casemap.CaseStatusId;
                            //caseBO.AttorneyId = casemap.AttorneyId;

                            caseBO.IsDeleted = casemap.IsDeleted;
                            caseBO.CreateByUserID = casemap.CreateByUserID;
                            caseBO.UpdateByUserID = casemap.UpdateByUserID;

                            if (casemap.Referrals != null)
                            {
                                List<BO.Referral> BOListReferral = new List<BO.Referral>();
                                foreach (var eachRefrral in casemap.Referrals)
                                {
                                    if (eachRefrral != null)
                                    {
                                        if (eachRefrral.IsDeleted.HasValue == false || (eachRefrral.IsDeleted.HasValue == true && eachRefrral.IsDeleted.Value == false))
                                        {
                                            BO.Referral referralBO = new BO.Referral();

                                            referralBO.ID = eachRefrral.Id;
                                            referralBO.CaseId = eachRefrral.CaseId;
                                            referralBO.PendingReferralId = eachRefrral.PendingReferralId;
                                            referralBO.FromCompanyId = eachRefrral.FromCompanyId;
                                            referralBO.FromLocationId = eachRefrral.FromLocationId;
                                            referralBO.FromDoctorId = eachRefrral.FromDoctorId;
                                            referralBO.FromUserId = eachRefrral.FromUserId;
                                            referralBO.ForSpecialtyId = eachRefrral.ForSpecialtyId;
                                            referralBO.ForRoomId = eachRefrral.ForRoomId;
                                            referralBO.ForRoomTestId = eachRefrral.ForRoomTestId;
                                            referralBO.ToCompanyId = eachRefrral.ToCompanyId;
                                            referralBO.ToLocationId = eachRefrral.ToLocationId;
                                            referralBO.ToDoctorId = eachRefrral.ToDoctorId;
                                            referralBO.ToRoomId = eachRefrral.ToRoomId;
                                            referralBO.ScheduledPatientVisitId = eachRefrral.ScheduledPatientVisitId;
                                            referralBO.DismissedBy = eachRefrral.DismissedBy;
                                            referralBO.IsDeleted = eachRefrral.IsDeleted;
                                            referralBO.CreateByUserID = eachRefrral.CreateByUserID;
                                            referralBO.UpdateByUserID = eachRefrral.UpdateByUserID;

                                            BOListReferral.Add(referralBO);
                                        }
                                    }
                                }

                                caseBO.Referrals = BOListReferral;
                            }

                            boCase.Add(caseBO);
                        }
                    }

                }
                patientBO2.Cases = boCase;
            }

            patientBO2.IsDeleted = Patient.IsDeleted;
            patientBO2.CreateByUserID = Patient.CreateByUserID;
            patientBO2.UpdateByUserID = Patient.UpdateByUserID;

            return (T)(object)patientBO2;
        }

        public T mConvert<T, U>(U entity)
        {
            Patient Patient = entity as Patient;

            if (Patient == null)
                return default(T);

            BO.minPatient mPatientBO2 = new BO.minPatient();

            mPatientBO2.ID = Patient.Id;
            mPatientBO2.MaritalStatusId = Patient.MaritalStatusId;


            if (Patient.IsDeleted.HasValue)
                mPatientBO2.IsDeleted = Patient.IsDeleted.Value;
            if (Patient.UpdateByUserID.HasValue)
                mPatientBO2.UpdateByUserID = Patient.UpdateByUserID.Value;

            if (Patient.User != null)
            {
                if (Patient.User.IsDeleted.HasValue == false || (Patient.User.IsDeleted.HasValue == true && Patient.User.IsDeleted.Value == false))
                {
                    //BO.User boUser = new BO.User();

                    mPatientBO2.FirstName = Patient.User.FirstName;
                    mPatientBO2.MiddleName = Patient.User.MiddleName;
                    mPatientBO2.LastName = Patient.User.LastName;
                    if (Patient.User.Gender.HasValue == true)
                        mPatientBO2.Gender = (BO.GBEnums.Gender)Patient.User.Gender;

                    mPatientBO2.CreateByUserID = Patient.User.CreateByUserID;

                    if (Patient.User.IsDeleted.HasValue)
                        mPatientBO2.IsDeleted = System.Convert.ToBoolean(Patient.User.IsDeleted.Value);
                    if (Patient.User.UpdateByUserID.HasValue)
                        mPatientBO2.UpdateByUserID = Patient.User.UpdateByUserID.Value;


                    if (Patient.User.ContactInfo != null)
                    {
                        // BO.ContactInfo boContactInfo = new BO.ContactInfo();

                        mPatientBO2.CellPhone = Patient.User.ContactInfo.CellPhone;
                        mPatientBO2.EmailAddress = Patient.User.ContactInfo.EmailAddress;
                        mPatientBO2.HomePhone = Patient.User.ContactInfo.HomePhone;
                        mPatientBO2.WorkPhone = Patient.User.ContactInfo.WorkPhone;
                        mPatientBO2.FaxNo = Patient.User.ContactInfo.FaxNo;
                        mPatientBO2.CreateByUserID = Patient.User.ContactInfo.CreateByUserID;

                    }


                    if (Patient.User.AddressInfo != null)
                    {
                        // BO.AddressInfo boAddress = new BO.AddressInfo();
                        //boAddress.Name = user.AddressInfo.Name;
                        mPatientBO2.Address1 = Patient.User.AddressInfo.Address1;
                        mPatientBO2.Address2 = Patient.User.AddressInfo.Address2;
                        mPatientBO2.City = Patient.User.AddressInfo.City;
                        mPatientBO2.State = Patient.User.AddressInfo.State;
                        mPatientBO2.ZipCode = Patient.User.AddressInfo.ZipCode;
                        mPatientBO2.Country = Patient.User.AddressInfo.Country;

                        mPatientBO2.CreateByUserID = Patient.User.AddressInfo.CreateByUserID;

                    }

                }
            }



            mPatientBO2.IsDeleted = Patient.IsDeleted;
            mPatientBO2.CreateByUserID = Patient.CreateByUserID;
            mPatientBO2.UpdateByUserID = Patient.UpdateByUserID;

            return (T)(object)mPatientBO2;
        }

        public override T ConvertToPatient<T, U>(U entity)
        {
            Patient Patient = entity as Patient;

            if (Patient == null)
                return default(T);

            BO.Patient patientBO2 = new BO.Patient();
            patientBO2.ID = Patient.Id;
            if (Patient.User != null)
            {
                BO.User boUser = new BO.User();
                using (UserRepository cmp = new UserRepository(_context))
                {
                    boUser = cmp.Convert<BO.User, User>(Patient.User);
                    patientBO2.User = boUser;
                }
            }

            if (Patient.Cases != null)
            {
                List<BO.Case> cases = new List<BO.Case>();
                cases.Add(new BO.Case
                {
                    ID = Patient.Cases.Select(x => x.Id).FirstOrDefault(),
                    PatientId = Patient.Id,
                    CaseTypeId = 1,
                    CaseStatusId = 1
                });
                patientBO2.Cases = cases;
            }

            patientBO2.IsDeleted = Patient.IsDeleted;
            patientBO2.CreateByUserID = Patient.CreateByUserID;
            patientBO2.UpdateByUserID = Patient.UpdateByUserID;

            return (T)(object)patientBO2;
        }

        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Patient Patient = (BO.Patient)(object)entity;
            var result = Patient.Validate(Patient);
            return result;
        }
        #endregion

        #region Get All Patient
        public override object Get<T>(T entity)
        {
            BO.Patient patientBO = (BO.Patient)(object)entity;

            var acc_ = _context.Patients.Include("User")
                                        .Include("User.UserCompanies")
                                        .Include("User.AddressInfo")
                                        .Include("User.ContactInfo")
                                        .Where(p => p.IsDeleted.HasValue == false || p.IsDeleted == false)
                                        .ToList<Patient>();

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.Patient> lstpatients = new List<BO.Patient>();
            foreach (Patient item in acc_)
            {
                lstpatients.Add(Convert<BO.Patient, Patient>(item));
            }
            return lstpatients;
        }
        #endregion

        #region Get By Company ID For Patient 
        public override object GetByCompanyId(int CompanyId)
        {
            var patientList1 = _context.Patients.Include("User")
                                                .Include("User.UserCompanies")
                                                .Include("User.AddressInfo")
                                                .Include("User.ContactInfo")
                                                .Include("Cases")
                                                .Include("Cases.Referrals")
                                                .Where(p => p.User.UserCompanies.Where(p2 => p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false))
                                                .Any(p3 => p3.CompanyID == CompanyId)
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                .ToList<Patient>();

            var referralList = _context.Referrals.Include("Case")
                                                 .Include("Case.CompanyCaseConsentApprovals")
                                                 .Include("Case.Patient.User")
                                                 .Include("Case.Patient.User.UserCompanies")
                                                 .Include("Case.Patient.User.AddressInfo")
                                                 .Include("Case.Patient.User.ContactInfo")
                                                 .Include("Case.Patient.Cases")
                                                 .Include("Case.Patient.Cases.Referrals")
                                                 .Where(p => (p.FromCompanyId == CompanyId || p.ToCompanyId == CompanyId)
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                        && (p.Case.IsDeleted.HasValue == false || (p.Case.IsDeleted.HasValue == true && p.Case.IsDeleted.Value == false))
                                                        && (p.Case.Patient.IsDeleted.HasValue == false || (p.Case.Patient.IsDeleted.HasValue == true && p.Case.Patient.IsDeleted.Value == false)))
                                                 .ToList<Referral>();

            var patientList2 = referralList.Select(p => p.Case.Patient);

            if (patientList1 == null && patientList2 == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Patient> lstpatients = new List<BO.Patient>();
                foreach (Patient item in patientList1.Union(patientList2).Distinct())
                {
                    lstpatients.Add(Convert<BO.Patient, Patient>(item));
                }
                return lstpatients;
            }

        }
        #endregion

        #region GetByCompanyIdForAncillary Company ID For Patient 
        public override object GetByCompanyIdForAncillary(int CompanyId)
        {
            var patientList1 = _context.Patients.Include("User")
                                                .Include("User.UserCompanies")
                                                .Include("User.AddressInfo")
                                                .Include("User.ContactInfo")
                                                .Include("Cases")
                                                .Include("Cases.Referrals")
                                                .Where(p => p.User.UserCompanies.Where(p2 => p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false))
                                                .Any(p3 => p3.CompanyID == CompanyId)
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                .ToList<Patient>();

            var referralList = _context.Referrals.Include("Case")
                                                 .Include("Case.CompanyCaseConsentApprovals")
                                                 .Include("Case.Patient.User")
                                                 .Include("Case.Patient.User.UserCompanies")
                                                 .Include("Case.Patient.User.AddressInfo")
                                                 .Include("Case.Patient.User.ContactInfo")
                                                 .Include("Case.Patient.Cases")
                                                 .Include("Case.Patient.Cases.Referrals")
                                                 .Where(p => p.FromCompanyId == CompanyId
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                        && (p.Case.IsDeleted.HasValue == false || (p.Case.IsDeleted.HasValue == true && p.Case.IsDeleted.Value == false))
                                                        && (p.Case.Patient.IsDeleted.HasValue == false || (p.Case.Patient.IsDeleted.HasValue == true && p.Case.Patient.IsDeleted.Value == false)))
                                                 .ToList<Referral>();

            var patientList2 = referralList.Select(p => p.Case.Patient);

            if (patientList1 == null && patientList2 == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.minPatient> lstpatients = new List<BO.minPatient>();
                foreach (Patient item in patientList1.Union(patientList2).Distinct())
                {
                    lstpatients.Add(mConvert<BO.minPatient, Patient>(item));
                }
                return lstpatients;
            }

        }
        #endregion


        #region Get By Company ID and DoctorId For Patient 
        public override object Get(int CompanyId, int DoctorId)
        {
            var userInCompany = _context.UserCompanies.Where(p => p.CompanyID == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.UserID);
            //var patientInCaseMapping = _context.DoctorCaseConsentApprovals.Where(p => p.DoctorId == DoctorId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.CaseId);
            var patientInCaseMapping = _context.PatientVisits.Where(p => p.DoctorId == DoctorId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.CaseId);
            var patientWithCase = _context.Cases.Where(p => patientInCaseMapping.Contains(p.Id) && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.PatientId);

            var patientList1 = _context.Patients.Include("User")
                                       .Include("User.UserCompanies")
                                       .Include("User.AddressInfo")
                                       .Include("User.ContactInfo")
                                       .Include("Cases")
                                       .Include("Cases.Referrals")
                                       .Where(p => userInCompany.Contains(p.Id) && patientWithCase.Contains(p.Id) && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList<Patient>();

            var referralList = _context.Referrals.Include("Case")
                                               .Include("Case.CompanyCaseConsentApprovals")
                                               .Include("Case.Patient.User")
                                               .Include("Case.Patient.User.UserCompanies")
                                               .Include("Case.Patient.User.AddressInfo")
                                               .Include("Case.Patient.User.ContactInfo")
                                               .Include("Case.Patient.Cases")
                                               .Include("Case.Patient.Cases.Referrals")
                                               .Where(p => p.ToCompanyId == CompanyId && p.ToDoctorId == DoctorId
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<Referral>();

            var patientList2 = referralList.Select(p => p.Case.Patient).ToList();

            if (patientList1 == null && patientList2 == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Patient> lstpatients = new List<BO.Patient>();
                //acc.ForEach(p => lstpatients.Add(Convert<BO.Patient, Patient>(p)));
                foreach (Patient item in patientList1.Union(patientList2).Distinct())
                {
                    lstpatients.Add(Convert<BO.Patient, Patient>(item));
                }

                return lstpatients;
            }

        }
        #endregion

        #region GetByCompanyWithOpenCases For Patient 
        public override object GetByCompanyWithOpenCases(int CompanyId)
        {
            var openCase = _context.Cases.Where(p => p.CaseStatusId.HasValue == true && p.CaseStatusId == 1
                                                     && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                    .Select(p => p.PatientId)
                                                    .Distinct<int>();


            var acc = _context.Patients.Include("User")
                                      .Include("User.UserCompanies")
                                      .Include("User.AddressInfo")
                                      .Include("User.ContactInfo")
                                      .Where(p => p.User.UserCompanies.Where(p2 => p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false))
                                      .Any(p3 => p3.CompanyID == CompanyId)
                                      && (openCase.Contains(p.Id))
                                      && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                      .ToList<Patient>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Patient> lstpatients = new List<BO.Patient>();
                //acc.ForEach(p => lstpatients.Add(Convert<BO.Patient, Patient>(p)));
                foreach (Patient item in acc)
                {
                    lstpatients.Add(Convert<BO.Patient, Patient>(item));
                }

                return lstpatients;
            }

        }
        #endregion


        #region GetByCompanyWithCloseCases For Patient 
        public override object GetByCompanyWithCloseCases(int CompanyId)
        {
            var openCase = _context.Cases.Where(p => (p.CaseStatusId.HasValue == true && p.CaseStatusId == 1)
                                          && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                         .Select(p => p.PatientId)
                                         .Distinct<int>();


            var acc = _context.Patients.Include("User")
                                     .Include("User.UserCompanies")
                                     .Include("User.AddressInfo")
                                     .Include("User.ContactInfo")
                                     .Where(p => p.User.UserCompanies.Where(p2 => p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false))
                                     .Any(p3 => p3.CompanyID == CompanyId)
                                      && ((p.Cases.Count > 0 && openCase.Contains(p.Id) == false) || (p.Cases.Count <= 0))
                                      && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                     .ToList<Patient>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Patient> lstpatients = new List<BO.Patient>();
                foreach (Patient item in acc)
                {
                    lstpatients.Add(Convert<BO.Patient, Patient>(item));
                }

                return lstpatients;
            }

        }
        #endregion

        #region GetByLocationWithOpenCases For Patient 
        //public override object GetByLocationWithOpenCases(int LocationId)
        //{
        //    var openCase = _context.Cases.Where(p => p.CaseStatusId.HasValue == true && p.CaseStatusId == 1 && p.LocationId == LocationId
        //                                  && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
        //                                 .Select(p => p.PatientId)
        //                                 .Distinct<int>();

        //    var acc = _context.Patients.Include("User")
        //                               .Include("User.UserCompanies")
        //                               .Include("User.AddressInfo")
        //                               .Include("User.ContactInfo")
        //                               .Where(p => (openCase.Contains(p.Id))
        //                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
        //                               .ToList<Patient>();

        //    if (acc == null)
        //    {
        //        return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
        //    }
        //    else
        //    {
        //        List<BO.Patient> lstpatients = new List<BO.Patient>();
        //        //acc.ForEach(p => lstpatients.Add(Convert<BO.Patient, Patient>(p)));
        //        foreach (Patient item in acc)
        //        {
        //            lstpatients.Add(Convert<BO.Patient, Patient>(item));
        //        }

        //        return lstpatients;
        //    }
        //}
        #endregion

        #region Get By ID For Patient 
        public override object Get(int id)
        {
            var acc = _context.Patients.Include("User")
                                       .Include("User.UserCompanies")
                                       .Include("User.AddressInfo")
                                       .Include("User.ContactInfo")
                                       .Include("Cases")
                                       .Include("Cases.Referrals")
                                       .Include("PatientDocuments")
                                       .Include("PatientLanguagePreferenceMappings")
                                       .Include("PatientSocialMediaMappings")
                                       .Where(p => p.Id == id && (p.IsDeleted.HasValue == false || p.IsDeleted == false))
                                       .FirstOrDefault<Patient>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {                          
                BO.Patient acc_ = Convert<BO.Patient, Patient>(acc);
                return (object)acc_;
            }
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {          
            BO.Patient PatientBO = (BO.Patient)(object)entity;
            BO.User userBO = PatientBO.User;
            BO.AddressInfo addressUserBO = (PatientBO.User != null) ? PatientBO.User.AddressInfo : null;
            BO.ContactInfo contactinfoUserBO = (PatientBO.User != null) ? PatientBO.User.ContactInfo : null;

            Guid invitationDB_UniqueID = Guid.NewGuid();
            bool sendMessage = false;

            Patient PatientDB = new Patient();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {

                bool IsEditMode = false;
                IsEditMode = (PatientBO != null && PatientBO.ID > 0) ? true : false;

                UserCompany UserCompanyDB = new UserCompany();
                AddressInfo addressUserDB = new AddressInfo();
                ContactInfo contactinfoDB = new ContactInfo();
                User userDB = new User();

                AddressInfo addressPatientDB = new AddressInfo();
                ContactInfo contactinfoPatientDB = new ContactInfo();


                #region Address Info User
                if (addressUserBO != null)
                {
                    bool Add_addressDB = false;
                    addressUserDB = _context.AddressInfoes.Where(p => p.id == addressUserBO.ID).FirstOrDefault();

                    if (addressUserDB == null && addressUserBO.ID <= 0)
                    {
                        addressUserDB = new AddressInfo();
                        Add_addressDB = true;
                    }
                    else if (addressUserDB == null && addressUserBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Address details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    addressUserDB.Name = IsEditMode == true && addressUserBO.Name == null ? addressUserDB.Name : addressUserBO.Name;
                    addressUserDB.Address1 = IsEditMode == true && addressUserBO.Address1 == null ? addressUserDB.Address1 : addressUserBO.Address1;
                    addressUserDB.Address2 = IsEditMode == true && addressUserBO.Address2 == null ? addressUserDB.Address2 : addressUserBO.Address2;
                    addressUserDB.City = IsEditMode == true && addressUserBO.City == null ? addressUserDB.City : addressUserBO.City;
                    addressUserDB.State = IsEditMode == true && addressUserBO.State == null ? addressUserDB.State : addressUserBO.State;
                    addressUserDB.ZipCode = IsEditMode == true && addressUserBO.ZipCode == null ? addressUserDB.ZipCode : addressUserBO.ZipCode;
                    addressUserDB.Country = IsEditMode == true && addressUserBO.Country == null ? addressUserDB.Country : addressUserBO.Country;
                    //[STATECODE-CHANGE]
                    //addressUserDB.StateCode = IsEditMode == true && addressUserBO.StateCode == null ? addressUserDB.StateCode : addressUserBO.StateCode;
                    //[STATECODE-CHANGE]

                    if (Add_addressDB == true)
                    {
                        addressUserDB = _context.AddressInfoes.Add(addressUserDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid address details.", ErrorLevel = ErrorLevel.Error };
                    }
                    addressUserDB = null;
                }
                #endregion

                #region Contact Info User
                if (contactinfoUserBO != null)
                {
                    bool Add_contactinfoDB = false;
                    contactinfoDB = _context.ContactInfoes.Where(p => p.id == contactinfoUserBO.ID).FirstOrDefault();

                    if (contactinfoDB == null && contactinfoUserBO.ID <= 0)
                    {
                        contactinfoDB = new ContactInfo();
                        Add_contactinfoDB = true;
                    }
                    else if (contactinfoDB == null && contactinfoUserBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Contact details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    contactinfoDB.Name = IsEditMode == true && contactinfoUserBO.Name == null ? contactinfoDB.Name : contactinfoUserBO.Name;
                    contactinfoDB.CellPhone = IsEditMode == true && contactinfoUserBO.CellPhone == null ? contactinfoDB.CellPhone : contactinfoUserBO.CellPhone;
                    contactinfoDB.EmailAddress = IsEditMode == true && contactinfoUserBO.EmailAddress == null ? contactinfoDB.EmailAddress : contactinfoUserBO.EmailAddress;
                    contactinfoDB.HomePhone = IsEditMode == true && contactinfoUserBO.HomePhone == null ? contactinfoDB.HomePhone : contactinfoUserBO.HomePhone;
                    contactinfoDB.WorkPhone = IsEditMode == true && contactinfoUserBO.WorkPhone == null ? contactinfoDB.WorkPhone : contactinfoUserBO.WorkPhone;
                    contactinfoDB.FaxNo = IsEditMode == true && contactinfoUserBO.FaxNo == null ? contactinfoDB.FaxNo : contactinfoUserBO.FaxNo;
                    contactinfoDB.OfficeExtension = IsEditMode == true && contactinfoUserBO.OfficeExtension == null ? contactinfoDB.OfficeExtension : contactinfoUserBO.OfficeExtension;
                    contactinfoDB.AlternateEmail = IsEditMode == true && contactinfoUserBO.AlternateEmail == null ? contactinfoDB.AlternateEmail : contactinfoUserBO.AlternateEmail;
                    contactinfoDB.PreferredCommunication = IsEditMode == true && contactinfoUserBO.PreferredCommunication == null ? contactinfoDB.PreferredCommunication : contactinfoUserBO.PreferredCommunication;
                    contactinfoDB.IsDeleted = IsEditMode == true && contactinfoUserBO.IsDeleted == null ? contactinfoDB.IsDeleted : contactinfoUserBO.IsDeleted;


                    if (Add_contactinfoDB == true)
                    {
                        contactinfoDB = _context.ContactInfoes.Add(contactinfoDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid address details.", ErrorLevel = ErrorLevel.Error };
                    }
                    contactinfoDB = null;
                }
                #endregion

                #region User
                if (userBO != null)
                {
                    bool Add_userDB = false;
                    userDB = _context.Users.Where(p => p.id == userBO.ID).FirstOrDefault();

                    if (userDB == null && userBO.ID <= 0)
                    {
                        userDB = new User();
                        Add_userDB = true;
                        sendMessage = true;
                    }
                    else if (userDB == null && userBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "User Name dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    if (Add_userDB == true)
                    {
                        if (_context.Users.Any(p => p.UserName == userBO.UserName))
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "User Name already exists.", ErrorLevel = ErrorLevel.Error };
                        }
                    }

                    userDB.UserName = Add_userDB == true ? userBO.UserName : userDB.UserName;
                    userDB.FirstName = IsEditMode == true && userBO.FirstName == null ? userDB.FirstName : userBO.FirstName;
                    userDB.MiddleName = IsEditMode == true && userBO.MiddleName == null ? userDB.MiddleName : userBO.MiddleName;
                    userDB.LastName = IsEditMode == true && userBO.LastName == null ? userDB.LastName : userBO.LastName;
                    userDB.Gender = (IsEditMode == true && userBO.Gender <= 0) ? userDB.Gender : System.Convert.ToByte(userBO.Gender);
                    userDB.UserType = Add_userDB == true ? System.Convert.ToByte(userBO.UserType) : userDB.UserType;
                    userDB.UserStatus = System.Convert.ToByte(userBO.Status);
                    userDB.ImageLink = IsEditMode == true && userBO.ImageLink == null ? userDB.ImageLink : userBO.ImageLink;
                    userDB.DateOfBirth = IsEditMode == true && userBO.DateOfBirth == null ? userDB.DateOfBirth : userBO.DateOfBirth;
                    if (Add_userDB == true && string.IsNullOrEmpty(userBO.Password) == false)
                    {
                        userDB.Password = PasswordHash.HashPassword(userBO.Password);
                    }

                    userDB.AddressId = (addressUserDB != null && addressUserDB.id > 0) ? addressUserDB.id : userDB.AddressId;
                    userDB.ContactInfoId = (contactinfoDB != null && contactinfoDB.id > 0) ? contactinfoDB.id : userDB.ContactInfoId;

                    userDB.C2FactAuthEmailEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactEmail"));
                    userDB.C2FactAuthSMSEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactSMS"));

                    userDB.CreateByUserID = Add_userDB == true ? userBO.CreateByUserID : userDB.CreateByUserID;
                    userDB.CreateDate = Add_userDB == true ? DateTime.UtcNow : userDB.CreateDate;

                    userDB.UpdateByUserID = Add_userDB == false ? userBO.UpdateByUserID : userDB.UpdateByUserID;
                    userDB.UpdateDate = Add_userDB == false ? DateTime.UtcNow : userDB.UpdateDate;

                    if (Add_userDB == true)
                    {
                        userDB = _context.Users.Add(userDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid user details.", ErrorLevel = ErrorLevel.Error };
                    }
                    userDB = null;
                }
                #endregion

                #region Patient
                if (PatientBO != null)
                {
                    bool Add_patientDB = false;
                    PatientDB = _context.Patients.Where(p => p.Id == PatientBO.ID).FirstOrDefault();

                    if (PatientDB == null && PatientBO.ID <= 0)
                    {
                        PatientDB = new Patient();
                        Add_patientDB = true;
                    }
                    else if (PatientDB == null && PatientBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    if (IsEditMode == false)
                    {
                        PatientDB.Id = userDB.id;
                    }

                    if (Add_patientDB == true)
                    {
                        if (PatientBO.SSN.Trim() != "" && _context.Patients.Any(p => p.SSN == PatientBO.SSN) == true)
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "SSN already exists.", ErrorLevel = ErrorLevel.Error };
                        }
                    }

                    PatientDB.SSN = IsEditMode == true && PatientBO.SSN == null ? PatientDB.SSN : PatientBO.SSN;
                    PatientDB.Weight = IsEditMode == true && PatientBO.Weight == null ? PatientDB.Weight : PatientBO.Weight;
                    PatientDB.Height = IsEditMode == true && PatientBO.Height == null ? PatientDB.Height : PatientBO.Height;
                    PatientDB.MaritalStatusId = IsEditMode == true && PatientBO.MaritalStatusId == null ? PatientDB.MaritalStatusId : PatientBO.MaritalStatusId;
                    PatientDB.DateOfFirstTreatment = IsEditMode == true && PatientBO.DateOfFirstTreatment == null ? PatientDB.DateOfFirstTreatment : PatientBO.DateOfFirstTreatment;

                    PatientDB.ParentOrGuardianName = IsEditMode == true && PatientBO.ParentOrGuardianName == null ? PatientDB.ParentOrGuardianName : PatientBO.ParentOrGuardianName;
                    PatientDB.EmergencyContactName = IsEditMode == true && PatientBO.EmergencyContactName == null ? PatientDB.EmergencyContactName : PatientBO.EmergencyContactName;
                    PatientDB.EmergencyContactPhone = IsEditMode == true && PatientBO.EmergencyContactPhone == null ? PatientDB.EmergencyContactPhone : PatientBO.EmergencyContactPhone;
                    PatientDB.LegallyMarried = IsEditMode == true && PatientBO.LegallyMarried == null ? PatientDB.LegallyMarried : PatientBO.LegallyMarried;
                    PatientDB.SpouseName = IsEditMode == true && PatientBO.SpouseName == null ? PatientDB.SpouseName : PatientBO.SpouseName;
                    PatientDB.LanguagePreferenceOther = IsEditMode == true && PatientBO.LanguagePreferenceOther == null ? PatientDB.LanguagePreferenceOther : PatientBO.LanguagePreferenceOther;

                    PatientDB.IsDeleted = PatientBO.IsDeleted.HasValue ? PatientBO.IsDeleted : false;

                    if (Add_patientDB == true)
                    {
                        PatientDB = _context.Patients.Add(PatientDB);
                    }
                    _context.SaveChanges();

                    List<BO.PatientLanguagePreferenceMapping> PatientLanguagePreferenceMappingsBO = PatientBO.PatientLanguagePreferenceMappings;

                    var PatientLanguagePreferenceMappingsDB = _context.PatientLanguagePreferenceMappings.Where(p => p.PatientId == PatientDB.Id
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                    .ToList();

                    if (PatientLanguagePreferenceMappingsDB != null)
                    {
                        PatientLanguagePreferenceMappingsDB.ForEach(p => p.IsDeleted = true);
                    }

                    PatientLanguagePreferenceMappingsBO.ForEach(p => _context.PatientLanguagePreferenceMappings.Add(new PatientLanguagePreferenceMapping() {
                        PatientId = PatientDB.Id,
                        LanguagePreferenceId = p.LanguagePreferenceId
                    }));

                    List<BO.PatientSocialMediaMapping> PatientSocialMediaMappingsBO = PatientBO.PatientSocialMediaMappings;

                    var PatientSocialMediaMappingsDB = _context.PatientSocialMediaMappings.Where(p => p.PatientId == PatientDB.Id
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                    .ToList();

                    if (PatientSocialMediaMappingsDB != null)
                    {
                        PatientSocialMediaMappingsDB.ForEach(p => p.IsDeleted = true);
                    }

                    PatientSocialMediaMappingsBO.ForEach(p => _context.PatientSocialMediaMappings.Add(new PatientSocialMediaMapping()
                    {
                        PatientId = PatientDB.Id,
                        SocialMediaId = p.SocialMediaId
                    }));

                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid patient details.", ErrorLevel = ErrorLevel.Error };
                    }
                    PatientDB = null;
                }

                _context.SaveChanges();
                #endregion

                #region User Companies
                if (PatientBO.User.UserCompanies != null)
                {
                    bool add_UserCompany = false;


                    Company companyDB = new Company();

                    foreach (var userCompany in PatientBO.User.UserCompanies)
                    {
                        userCompany.UserId = userDB.id;
                        UserCompanyDB = _context.UserCompanies.Where(p => p.UserID == userDB.id && p.CompanyID == userCompany.Company.ID && p.IsAccepted == true && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                               .FirstOrDefault<UserCompany>();

                        if (UserCompanyDB == null)
                        {
                            UserCompanyDB = new UserCompany();
                            add_UserCompany = true;
                        }

                        UserCompanyDB.CompanyID = userCompany.Company.ID;
                        UserCompanyDB.UserID = userCompany.UserId;
                        UserCompanyDB.UserStatusID = 1;
                        UserCompanyDB.IsAccepted = true;

                        if (add_UserCompany)
                        {
                            _context.UserCompanies.Add(UserCompanyDB);
                        }
                        _context.SaveChanges();
                    }

                }
                #endregion

                #region Insert UserSettings
                var UserSettings = _context.UserPersonalSettings.Where(p => p.UserId == userDB.id && p.CompanyId == UserCompanyDB.CompanyID
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                .FirstOrDefault();
                if (UserSettings == null)
                {
                    UserSettings = new UserPersonalSetting();
                    UserSettings.UserId = userDB.id;
                    UserSettings.CompanyId = UserCompanyDB.CompanyID;
                    UserSettings.IsPublic = true;
                    UserSettings.IsSearchable = true;
                    UserSettings.IsCalendarPublic = true;
                    UserSettings.SlotDuration = 30;
                    UserSettings.PreferredModeOfCommunication = 3;
                    UserSettings.IsPushNotificationEnabled = true;

                    _context.UserPersonalSettings.Add(UserSettings);
                    _context.SaveChanges();
                }
                #endregion

                if (sendMessage == true)
                {
                    #region Insert Invitation
                    Invitation invitationDB = new Invitation();
                    invitationDB.User = userDB;

                    invitationDB_UniqueID = Guid.NewGuid();
                    invitationDB.UniqueID = invitationDB_UniqueID;
                    invitationDB.CompanyID = UserCompanyDB.CompanyID != 0 ? UserCompanyDB.CompanyID : 0;
                    invitationDB.CreateDate = DateTime.UtcNow;
                    invitationDB.CreateByUserID = userDB.id;
                    _context.Invitations.Add(invitationDB);
                    _context.SaveChanges();
                    #endregion
                }

                dbContextTransaction.Commit();

                PatientDB = _context.Patients.Include("User")
                                             .Include("User.UserCompanies")
                                             .Include("User.UserCompanies.Company")
                                             .Include("User.AddressInfo")
                                             .Include("User.ContactInfo")
                                             .Include("PatientLanguagePreferenceMappings")
                                             .Include("PatientSocialMediaMappings")
                                             .Where(p => p.Id == PatientDB.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                             .FirstOrDefault<Patient>();
            }

            if (sendMessage == true)
            {
                try
                {
                    //#region Send Email
                    //string VerificationLink = "<a href='" + Utility.GetConfigValue("PatientVerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("PatientVerificationLink") + "/" + invitationDB_UniqueID + "</a>";
                    //string Message = "Dear " + userBO.FirstName + ",<br><br>Thanks for registering with us.<br><br> Your user name is:- " + userBO.UserName + "<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";
                    //BO.Email objEmail = new BO.Email { ToEmail = userBO.UserName, Subject = "User registered", Body = Message };
                    //objEmail.SendMail();
                    //#endregion
                    

                    IdentityHelper identityHelper = new IdentityHelper();

                    string VerificationLink = "<a href='" + Utility.GetConfigValue("PatientVerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("PatientVerificationLink") + "/" + invitationDB_UniqueID + "</a>";
                    string MailMessageForPatient = "Dear " + userBO.FirstName + ",<br><br>Thanks for registering with us.<br><br> Your user name is:- " + userBO.UserName + "<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";
                    string MailMessageForAdmin = "Dear " + identityHelper.DisplayName + ",<br><br>Thanks for registering new patient.<br><br> Patient email:- " + userBO.UserName + "";
                    string NotificationForPatient = "Your profile has been registerd by: "+ userBO.UserCompanies.Select(c=>c.Company.Name).FirstOrDefault()+ " in Midas Portal";
                    string NotificationForAdmin = "New Patient " + userBO.UserName + " has been registered.";
                    string SmsMessageForPatient = "Dear " + userBO.FirstName + ",<br><br>Thanks for registering with us.<br><br> Your user name is:- " + userBO.UserName + "<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";
                    string SmsMessageForAdmin = "Dear " + identityHelper.DisplayName + ",<br><br>Thanks for registering new patient.<br><br> Patient email:- " + userBO.UserName + "";

                  

                    User AdminUser = _context.Users.Include("ContactInfo")
                                          .Where(p => p.UserName == identityHelper.Email && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                              .FirstOrDefault();

                   

                    #region  patient mail object

                    BO.EmailMessage emPatient = new BO.EmailMessage();
                    emPatient.ApplicationName = "Midas";                 
                    emPatient.ToEmail = "med25@allfriendshub.tk"; //userBO.UserName;                 
                    emPatient.EMailSubject = "Email Header";
                    emPatient.EMailBody = MailMessageForPatient;
                    #endregion
                    #region  admin mail object                 
                    BO.EmailMessage emAdmin = new BO.EmailMessage();
                    emAdmin.ApplicationName = "Midas";               
                    emAdmin.ToEmail = identityHelper.Email;                  
                    emAdmin.EMailSubject = "Email Header";
                    emAdmin.EMailBody = MailMessageForAdmin;
                    #endregion 

                    #region patient sms object
                    BO.SMS smsPatient = new BO.SMS();
                    smsPatient.ApplicationName = "Midas";
                    smsPatient.ToNumber = userBO.ContactInfo.CellPhone;                   
                    smsPatient.Message = SmsMessageForPatient;
                    #endregion 

                    #region admin sms object
                    BO.SMS smsAdmin = new BO.SMS();
                    smsAdmin.ApplicationName = "Midas";
                    smsAdmin.ToNumber = AdminUser.ContactInfo.CellPhone;                 
                    smsAdmin.Message = SmsMessageForAdmin;
                    #endregion

                   
                    NotificationHelper nh = new NotificationHelper();
                    MessagingHelper mh = new MessagingHelper();

                    #region Patient
                    nh.PushNotification("p10@allfriendshub.tk", userBO.UserCompanies.Select(p => p.Company.ID).FirstOrDefault(), NotificationForPatient, "New Patient Registration");   // for Patient user email //userBO.UserName;
                    mh.SendEmailAndSms("med25@allfriendshub.tk", userBO.UserCompanies.Select(p => p.Company.ID).FirstOrDefault(), emPatient, smsPatient);
                    #endregion

                    #region admin 
                    nh.PushNotification(identityHelper.Email, userBO.UserCompanies.Select(p => p.Company.ID).FirstOrDefault(), NotificationForAdmin, "New Patient Registration");  
                    mh.SendEmailAndSms(identityHelper.Email, userBO.UserCompanies.Select(p => p.Company.ID).FirstOrDefault(), emAdmin, smsAdmin);
                    #endregion
                }
                catch (Exception ex)
                {

                }
            }

           

        var res = Convert<BO.Patient, Patient>(PatientDB);
            return (object)res;
        }
        #endregion
        
        #region AddQuickPatient
        public override object AddQuickPatient<T>(T entity)
        {
            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                try
                {
                    BO.AddPatient addpatient = (BO.AddPatient)(object)entity;
                    User userDB = new User();
                    Case caseDB = new Case();
                    Patient patientDB = new Patient();
                    ContactInfo addContact = new ContactInfo();
                    AddressInfo addressDB = new AddressInfo();
                    UserCompany userCompanyDB = new UserCompany();
                    CaseCompanyMapping casecompanymappingDB = new CaseCompanyMapping();
                    Invitation invitationDB = new Invitation();

                    if (_context.Users.Where(usr => usr.UserName == addpatient.UserName).FirstOrDefault<User>() == null)
                    {
                        addContact.CellPhone = addpatient.CellPhone;
                        _context.Entry(addContact).State = System.Data.Entity.EntityState.Added;
                        _context.SaveChanges();

                        _context.Entry(addressDB).State = System.Data.Entity.EntityState.Added;
                        _context.SaveChanges();

                        userDB.UserName = addpatient.UserName;
                        userDB.FirstName = addpatient.FirstName;
                        userDB.LastName = addpatient.LastName;
                        userDB.ContactInfoId = addContact.id;
                        userDB.AddressId = addressDB.id;
                        userDB.UserType = 1;
                        _context.Entry(userDB).State = System.Data.Entity.EntityState.Added;
                        _context.SaveChanges();

                        patientDB.Id = userDB.id;
                        patientDB.SSN = "N/A";
                        _context.Entry(patientDB).State = System.Data.Entity.EntityState.Added;
                        _context.SaveChanges();

                        caseDB.PatientId = patientDB.Id;
                        //caseDB.LocationId = 0;
                        caseDB.CaseStatusId = 1;
                        caseDB.CaseTypeId = 1;
                        _context.Entry(caseDB).State = System.Data.Entity.EntityState.Added;
                        _context.SaveChanges();

                        if (addpatient.CompanyId > 0)
                        {
                            Company company = _context.Companies.Where(p => p.id == addpatient.CompanyId).FirstOrDefault<Company>();
                            if (company != null)
                            {
                                userCompanyDB.User = userDB;
                                userCompanyDB.Company = company;
                                userCompanyDB.IsAccepted = true;
                                invitationDB.Company = company;
                                _context.Entry(userCompanyDB).State = System.Data.Entity.EntityState.Added;
                                _context.SaveChanges();
                            }
                            else
                            {
                                dbContextTransaction.Rollback();
                                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid company details.", ErrorLevel = ErrorLevel.Error };
                            }
                        }
                        else
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid company details.", ErrorLevel = ErrorLevel.Error };
                        }


                        #region Insert Invitation
                        invitationDB.User = userDB;
                        invitationDB.UniqueID = Guid.NewGuid();
                        invitationDB.CreateDate = DateTime.UtcNow;
                        invitationDB.CreateByUserID = 0;
                        _context.Entry(invitationDB).State = System.Data.Entity.EntityState.Added;
                        _context.SaveChanges();
                        #endregion

                        casecompanymappingDB.CompanyId = (int)addpatient.CompanyId;
                        casecompanymappingDB.CaseId = caseDB.Id;
                        casecompanymappingDB.IsOriginator = true;
                        casecompanymappingDB.AddedByCompanyId = (int)addpatient.CompanyId;
                        _context.Entry(casecompanymappingDB).State = System.Data.Entity.EntityState.Added;
                        _context.SaveChanges();

                        var res = ConvertToPatient<BO.Patient, Patient>(patientDB);
                        try
                        {
                            #region Send Email
                            string VerificationLink = "<a href='" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB.UniqueID + "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB.UniqueID + "</a>";
                            string Message = "Dear " + addpatient.FirstName + ",<br><br>Thanks for registering with us.<br><br> Your user name is:- " + addpatient.UserName + "<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";
                            BO.Email objEmail = new BO.Email { ToEmail = addpatient.UserName, Subject = "User registered", Body = Message };
                            objEmail.SendMail();
                            #endregion
                        }
                        catch (Exception ex) { dbContextTransaction.Rollback(); return new BO.ErrorObject { errorObject = "", ErrorMessage = "Error occured while sending mail.", ErrorLevel = ErrorLevel.Error }; }
                        dbContextTransaction.Commit();
                        return (object)res;
                    }
                    else
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { ErrorMessage = "User already exists", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                }
                catch (Exception er)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "An error occurred.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
            }
        }
        #endregion

        #region Delete By ID
        public override object Delete(int id)
        {
            Patient Patient = new Patient();
            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                Patient = _context.Patients.Include("User")
                                            .Include("Cases")
                                            //.Include("PatientEmpInfoes")
                                            //.Include("PatientFamilyMembers")
                                            //.Include("PatientInsuranceInfoes")
                                            .Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                            .FirstOrDefault();

                if (Patient != null)
                {

                    if (Patient.Cases != null)
                    {
                        foreach (var item in Patient.Cases)
                        {
                            if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                            {
                                using (CaseRepository sr = new CaseRepository(_context))
                                {
                                    sr.Delete(item.Id);
                                }
                            }
                        }
                    }
                    //if (Patient.PatientEmpInfoes != null)
                    //{
                    //    foreach (var item in Patient.PatientEmpInfoes)
                    //    {
                    //        if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                    //        {
                    //            using (PatientEmpInfoRepository sr = new PatientEmpInfoRepository(_context))
                    //            {
                    //                sr.Delete(item.Id);
                    //            }
                    //        }
                    //    }
                    //}

                    //if (Patient.PatientFamilyMembers != null)
                    //{
                    //    foreach (var item in Patient.PatientFamilyMembers)
                    //    {
                    //        if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                    //        {
                    //            using (Common.PatientFamilyMemberRepository sr = new Common.PatientFamilyMemberRepository(_context))
                    //            {
                    //                sr.Delete(item.Id);
                    //            }
                    //        }
                    //    }
                    //}

                    //if (Patient.PatientInsuranceInfoes != null)
                    //{
                    //    foreach (var item in Patient.PatientInsuranceInfoes)
                    //    {
                    //        if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                    //        {
                    //            using (PatientInsuranceInfoRepository sr = new PatientInsuranceInfoRepository(_context))
                    //            {
                    //                sr.Delete(item.Id);
                    //            }
                    //        }
                    //    }
                    //}

                    if (Patient.User != null)
                    {
                        if (Patient.User.IsDeleted.HasValue == false || (Patient.User.IsDeleted.HasValue == true && Patient.User.IsDeleted.Value == false))
                        {
                            using (UserRepository sr = new UserRepository(_context))
                            {
                                sr.Delete(Patient.User.id);
                            }
                        }
                    }


                    Patient.IsDeleted = true;
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient details dosent exists.", ErrorLevel = ErrorLevel.Error };
                }

                dbContextTransaction.Commit();
            }
            var res = Convert<BO.Patient, Patient>(Patient);
            return (object)res;
        }
        #endregion

        #region AssociatePatientWithCompany
        public override object AssociatePatientWithCompany(int PatientId, int CompanyId)
        {
            bool add_UserCompany = false;
            bool sendEmail = false;
            Guid invitationDB_UniqueID = Guid.NewGuid();

            var company = _context.Companies.Where(p => p.id == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            if (company == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var Patient = _context.Patients.Where(p => p.Id == PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            if (Patient == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var userCompany = _context.UserCompanies.Where(p => p.UserID == PatientId && p.CompanyID == CompanyId && p.IsAccepted == true && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            if (userCompany == null)
            {
                userCompany = new UserCompany();
                add_UserCompany = true;
                sendEmail = true;
            }

            userCompany.CompanyID = CompanyId;
            userCompany.UserID = PatientId;
            userCompany.UserStatusID = 1;
            userCompany.IsAccepted = true;

            if (add_UserCompany)
            {
                _context.UserCompanies.Add(userCompany);
            }

            _context.SaveChanges();

            var patientDB = _context.Patients.Include("User")
                                              .Include("User.AddressInfo")
                                              .Include("User.ContactInfo")
                                              .Include("Cases")
                                              .Include("Cases.Referrals")
                                              .Include("User.UserCompanyRoles")
                                              .Include("User.UserCompanies")
                                              .Where(p => p.Id == PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<Patient>();

            #region Send Email
            if (sendEmail == true)
            {
                try
                {
                    string VerificationLink = "<a href='" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "</a>";
                    string Message = "Dear " + patientDB.User.FirstName + ",<br><br>Thanks for registering with us.<br><br> Your user name is:- " + patientDB.User.UserName + "<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";
                    BO.Email objEmail = new BO.Email { ToEmail = patientDB.User.UserName, Subject = "User registered", Body = Message };
                    objEmail.SendMail();

                }
                catch (Exception ex) { }
            }
            #endregion

            var res = Convert<BO.Patient, Patient>(patientDB);
            return (object)res;

        }
        #endregion

        #region AssociatePatientWithAttorneyCompany
        public override object AssociatePatientWithAttorneyCompany(int PatientId, int CaseId, int AttorneyCompanyId)
        {
            bool add_UserCompany = false;
            bool add_CaseCompanyMap = false;
            bool sendEmail = false;
            Guid invitationDB_UniqueID = Guid.NewGuid();
            int AddedByCompanyId = 0;

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                //var company = _context.Companies.Where(p => p.id == AttorneyCompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                if (AttorneyCompanyId > 0 && _context.Companies.Any(p => p.id == AttorneyCompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))) == false)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No record found for this Company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                AddedByCompanyId = _context.CaseCompanyMappings.Where(p => p.CaseId == CaseId && p.IsOriginator == true && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p => p.CompanyId).FirstOrDefault();

                var Patient = _context.Patients.Where(p => p.Id == PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                if (Patient == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }


                #region Remove Existing Attorney if exists
                var AttorneyCaseCompanyMapping = _context.CaseCompanyMappings.Where(p => p.CaseId == CaseId
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                         .Include("Company")
                                                         .Where(p => p.Company1.CompanyType == 2)
                                                         .Select(p => p)
                                                         .FirstOrDefault();

                int? PreviousAttorneyCompanyId = null;

                if (AttorneyCaseCompanyMapping != null)
                {
                    PreviousAttorneyCompanyId = AttorneyCaseCompanyMapping.CompanyId;

                    if (AttorneyCaseCompanyMapping.CompanyId != AttorneyCompanyId)
                    {
                        AttorneyCaseCompanyMapping.IsDeleted = true;
                        _context.SaveChanges();
                    }
                }

                if (PreviousAttorneyCompanyId.HasValue == true)
                {
                    var UserCompany = _context.UserCompanies.Where(p => p.UserID == PatientId && p.CompanyID == PreviousAttorneyCompanyId.Value
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault();

                    if (UserCompany != null)
                    {
                        UserCompany.IsDeleted = true;
                        _context.SaveChanges();
                    }
                }
                #endregion


                if (AttorneyCompanyId > 0)
                {
                    #region Add new Attorney
                    var userCompany = _context.UserCompanies.Where(p => p.UserID == PatientId && p.CompanyID == AttorneyCompanyId && p.IsAccepted == true
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                        .FirstOrDefault();

                    if (userCompany == null)
                    {
                        userCompany = new UserCompany();
                        add_UserCompany = true;
                        sendEmail = true;
                    }

                    userCompany.CompanyID = AttorneyCompanyId;
                    userCompany.UserID = PatientId;
                    userCompany.UserStatusID = 1;
                    userCompany.IsAccepted = true;

                    if (add_UserCompany)
                    {
                        _context.UserCompanies.Add(userCompany);
                    }
                    _context.SaveChanges();


                    if (AttorneyCaseCompanyMapping == null || (AttorneyCaseCompanyMapping != null && AttorneyCaseCompanyMapping.CompanyId != AttorneyCompanyId))
                    {
                        var caseCompanyMap = _context.CaseCompanyMappings.Where(p => p.CaseId == CaseId && p.CompanyId == AttorneyCompanyId
                                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                         .FirstOrDefault();

                        if (caseCompanyMap == null)
                        {
                            caseCompanyMap = new CaseCompanyMapping();
                            add_CaseCompanyMap = true;
                            sendEmail = true;
                        }

                        caseCompanyMap.CaseId = CaseId;
                        caseCompanyMap.CompanyId = AttorneyCompanyId;
                        caseCompanyMap.AddedByCompanyId = AddedByCompanyId;// Need to modify API parameters to have additional AddedByCompanyId

                        if (add_CaseCompanyMap)
                        {
                            _context.CaseCompanyMappings.Add(caseCompanyMap);
                        }

                        _context.SaveChanges();
                    }
                    #endregion
                }

                dbContextTransaction.Commit();
            }            
            

            var PatientDB = _context.Patients.Include("User")
                                             .Include("User.UserCompanies")
                                             .Include("User.AddressInfo")
                                             .Include("User.ContactInfo")
                                             .Include("Cases")
                                             .Include("Cases.Referrals")
                                              .Where(p => p.Id == PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<Patient>();

            #region Send Email
            if (sendEmail == true)
            {
                //try
                //{

                //    #region Send Email

                //    if (PatientDB != null)
                //    {
                //        var attorneyCompany = _context.Companies.Include("ContactInfo")
                //                                               .Where(x => x.id == AttorneyCompanyId).FirstOrDefault();

                //        if (attorneyCompany.ContactInfo.EmailAddress != null)
                //        {
                //            string VerificationLink = "<a href='" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "</a>";
                //            var mailTemplateDB = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "AssociatePatientWithAttorneyCompany".ToUpper()).FirstOrDefault();
                //            if (mailTemplateDB == null)
                //            {
                //                return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                //            }
                //            else
                //            {
                //                string msg = mailTemplateDB.EmailBody;
                //                string subject = mailTemplateDB.EmailSubject;

                //                string message = string.Format(msg, attorneyCompany.Name, PatientDB.Id, PatientDB.User.UserName, attorneyCompany.ContactInfo.EmailAddress, VerificationLink);

                //                BO.Email objEmail = new BO.Email { ToEmail = attorneyCompany.ContactInfo.EmailAddress, Subject = subject, Body = message };
                //                objEmail.SendMail();
                //            }
                //        }
                //        else
                //        {
                //            return new BO.ErrorObject { ErrorMessage = "Email address not found for attorney.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                //        }


                //    }

                //    #endregion


                //}
                //catch (Exception ex) { }
            }
            #endregion

            var res = Convert<BO.Patient, Patient>(PatientDB);
            return (object)res;

        }
        #endregion

        #region AssociatePatientWithAttorneyCompany
        public override object AssociatePatientWithMedicalCompany(int PatientId, int CaseId, int MedicalCompanyId)
        {
            bool add_UserCompany = false;
            bool add_CaseCompanyMap = false;
            bool sendEmail = false;
            Guid invitationDB_UniqueID = Guid.NewGuid();
            int AddedByCompanyId = 0;

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                //var company = _context.Companies.Where(p => p.id == AttorneyCompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                if (MedicalCompanyId > 0 && _context.Companies.Any(p => p.id == MedicalCompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))) == false)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No record found for this Company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                AddedByCompanyId = _context.CaseCompanyMappings.Where(p => p.CaseId == CaseId && p.IsOriginator == true && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p => p.CompanyId).FirstOrDefault();

                var Patient = _context.Patients.Where(p => p.Id == PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                if (Patient == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }


                #region Remove Existing Attorney if exists
                var MedicalCaseCompanyMapping = _context.CaseCompanyMappings.Where(p => p.CaseId == CaseId
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                         .Include("Company")
                                                         .Where(p => p.Company1.CompanyType == 1)
                                                         .Select(p => p)
                                                         .FirstOrDefault();

                int? PreviousMedicalCompanyId = null;

                if (MedicalCaseCompanyMapping != null)
                {
                    PreviousMedicalCompanyId = MedicalCaseCompanyMapping.CompanyId;
                }

                if (PreviousMedicalCompanyId.HasValue == true && PreviousMedicalCompanyId.Value != MedicalCompanyId)
                {
                    MedicalCaseCompanyMapping.IsDeleted = true;
                    //_context.SaveChanges();

                    var UserCompany = _context.UserCompanies.Where(p => p.UserID == PatientId && p.CompanyID == PreviousMedicalCompanyId.Value
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                .FirstOrDefault();

                    if (UserCompany != null)
                    {
                        UserCompany.IsDeleted = true;                        
                    }
                    //_context.SaveChanges();
                }
                #endregion

                if (MedicalCompanyId > 0)
                {
                    #region Add new Attorney
                    var userCompany = _context.UserCompanies.Where(p => p.UserID == PatientId && p.CompanyID == MedicalCompanyId && p.IsAccepted == true
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault();

                    if (userCompany == null)
                    {
                        userCompany = new UserCompany();
                        add_UserCompany = true;
                        sendEmail = true;
                    }

                    userCompany.CompanyID = MedicalCompanyId;
                    userCompany.UserID = PatientId;
                    userCompany.UserStatusID = 1;
                    userCompany.IsAccepted = true;

                    if (add_UserCompany)
                    {
                        _context.UserCompanies.Add(userCompany);
                    }
                    //_context.SaveChanges();

                    var caseCompanyMap = _context.CaseCompanyMappings.Where(p => p.CaseId == CaseId && p.CompanyId == MedicalCompanyId
                                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                         .FirstOrDefault();

                    if (caseCompanyMap == null)
                    {
                        caseCompanyMap = new CaseCompanyMapping();
                        add_CaseCompanyMap = true;
                        sendEmail = true;
                    }

                    caseCompanyMap.CaseId = CaseId;
                    caseCompanyMap.CompanyId = MedicalCompanyId;
                    caseCompanyMap.AddedByCompanyId = AddedByCompanyId;// Need to modify API parameters to have additional AddedByCompanyId

                    if (add_CaseCompanyMap)
                    {
                        _context.CaseCompanyMappings.Add(caseCompanyMap);
                    }
                    //_context.SaveChanges();
                    #endregion
                }

                _context.SaveChanges();
                dbContextTransaction.Commit();
            }


            var PatientDB = _context.Patients.Include("User")
                                             .Include("User.UserCompanies")
                                             .Include("User.AddressInfo")
                                             .Include("User.ContactInfo")
                                             .Include("Cases")
                                             .Include("Cases.Referrals")
                                              .Where(p => p.Id == PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<Patient>();

            #region Send Email
            if (sendEmail == true)
            {
                //try
                //{

                //    #region Send Email

                //    if (PatientDB != null)
                //    {
                //        var attorneyCompany = _context.Companies.Include("ContactInfo")
                //                                               .Where(x => x.id == AttorneyCompanyId).FirstOrDefault();

                //        if (attorneyCompany.ContactInfo.EmailAddress != null)
                //        {
                //            string VerificationLink = "<a href='" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "</a>";
                //            var mailTemplateDB = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "AssociatePatientWithAttorneyCompany".ToUpper()).FirstOrDefault();
                //            if (mailTemplateDB == null)
                //            {
                //                return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                //            }
                //            else
                //            {
                //                string msg = mailTemplateDB.EmailBody;
                //                string subject = mailTemplateDB.EmailSubject;

                //                string message = string.Format(msg, attorneyCompany.Name, PatientDB.Id, PatientDB.User.UserName, attorneyCompany.ContactInfo.EmailAddress, VerificationLink);

                //                BO.Email objEmail = new BO.Email { ToEmail = attorneyCompany.ContactInfo.EmailAddress, Subject = subject, Body = message };
                //                objEmail.SendMail();
                //            }
                //        }
                //        else
                //        {
                //            return new BO.ErrorObject { ErrorMessage = "Email address not found for attorney.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                //        }


                //    }

                //    #endregion


                //}
                //catch (Exception ex) { }
            }
            #endregion

            var res = Convert<BO.Patient, Patient>(PatientDB);
            return (object)res;

        }
        #endregion

        #region AssociatePatientWithAncillaryCompany
        public override object AssociatePatientWithAncillaryCompany(int PatientId, int CaseId, int AncillaryCompanyId, int? AddedByCompanyId)
        {
            bool add_UserCompany = false;
            bool add_CaseCompanyMap = false;
            bool sendEmail = false;
            Guid invitationDB_UniqueID = Guid.NewGuid();

            var company = _context.Companies.Where(p => p.id == AncillaryCompanyId
                                                             && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                         .FirstOrDefault();
            if (company == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var Patient = _context.Patients.Where(p => p.Id == PatientId
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                        .FirstOrDefault();
            if (Patient == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var userCompany = _context.UserCompanies.Where(p => p.UserID == PatientId
                                                                        && p.CompanyID == AncillaryCompanyId
                                                                        && p.IsAccepted == true
                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                .FirstOrDefault();

            if (userCompany == null)
            {
                userCompany = new UserCompany();
                add_UserCompany = true;
                sendEmail = true;
            }

            userCompany.CompanyID = AncillaryCompanyId;
            userCompany.UserID = PatientId;
            userCompany.UserStatusID = 1;
            userCompany.IsAccepted = true;

            if (add_UserCompany)
            {
                _context.UserCompanies.Add(userCompany);
            }

            var caseCompanyMap = _context.CaseCompanyMappings.Where(p => p.CaseId == CaseId && p.CompanyId == AncillaryCompanyId
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                             .FirstOrDefault();

            if (caseCompanyMap == null)
            {
                caseCompanyMap = new CaseCompanyMapping();
                add_CaseCompanyMap = true;
                sendEmail = true;
            }

            caseCompanyMap.CaseId = CaseId;
            caseCompanyMap.CompanyId = AncillaryCompanyId;
            if (AddedByCompanyId.HasValue == true)
            caseCompanyMap.AddedByCompanyId = AddedByCompanyId.Value; //Need to modify API parameters to have additional AddedByCompanyId

            if (add_CaseCompanyMap)
            {
                _context.CaseCompanyMappings.Add(caseCompanyMap);
            }

            _context.SaveChanges();

            var PatientDB = _context.Patients.Include("User")
                                             .Include("User.UserCompanies")
                                             .Include("User.AddressInfo")
                                             .Include("User.ContactInfo")
                                             .Include("Cases")
                                             .Include("Cases.Referrals")
                                              .Where(p => p.Id == PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<Patient>();

            #region Send Email
            if (sendEmail == true)
            {
                //try
                //{

                //    #region Send Email

                //    if (PatientDB != null)
                //    {
                //        var attorneyCompany = _context.Companies.Include("ContactInfo")
                //                                               .Where(x => x.id == AttorneyCompanyId).FirstOrDefault();

                //        if (attorneyCompany.ContactInfo.EmailAddress != null)
                //        {
                //            string VerificationLink = "<a href='" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "</a>";
                //            var mailTemplateDB = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "AssociatePatientWithAttorneyCompany".ToUpper()).FirstOrDefault();
                //            if (mailTemplateDB == null)
                //            {
                //                return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                //            }
                //            else
                //            {
                //                string msg = mailTemplateDB.EmailBody;
                //                string subject = mailTemplateDB.EmailSubject;

                //                string message = string.Format(msg, attorneyCompany.Name, PatientDB.Id, PatientDB.User.UserName, attorneyCompany.ContactInfo.EmailAddress, VerificationLink);

                //                BO.Email objEmail = new BO.Email { ToEmail = attorneyCompany.ContactInfo.EmailAddress, Subject = subject, Body = message };
                //                objEmail.SendMail();
                //            }
                //        }
                //        else
                //        {
                //            return new BO.ErrorObject { ErrorMessage = "Email address not found for attorney.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                //        }


                //    }

                //    #endregion


                //}
                //catch (Exception ex) { }
            }
            #endregion

            var res = Convert<BO.Patient, Patient>(PatientDB);
            return (object)res;

        }
        #endregion

        #region AddPatientProfileDocument
        public override object AddPatientProfileDocument(int PatientId, int DocumentId)
        {

            var midasDocument = _context.MidasDocuments.Where(p => p.Id == DocumentId
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                        .FirstOrDefault();

            if (midasDocument == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this DocumentId.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            midasDocument.ObjectId = PatientId;

            //_context.MidasDocuments.Add(midasDocument);

            var patientDocument = _context.PatientDocuments.Where(p => p.PatientId == PatientId
                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .FirstOrDefault();
            if (patientDocument == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this PatientId.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            patientDocument.PatientId = PatientId;
            patientDocument.MidasDocumentId = midasDocument.Id;
            patientDocument.DocumentName = midasDocument.DocumentName;
            patientDocument.DocumentType = midasDocument.DocumentType;

            _context.PatientDocuments.Add(patientDocument);

            _context.SaveChanges();

            var PatientDocumentDB = _context.PatientDocuments
                                              .Where(p => p.Id == patientDocument.Id
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                              .FirstOrDefault<PatientDocument>();

            return (object)PatientDocumentDB;
        }
        #endregion


        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
