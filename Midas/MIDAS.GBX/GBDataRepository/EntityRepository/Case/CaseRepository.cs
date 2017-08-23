using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.DataRepository.EntityRepository.Common;
using MIDAS.GBX.Common;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class CaseRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<Case> _dbCase;

        public CaseRepository(MIDASGBXEntities context) : base(context)
        {
            _dbCase = context.Set<Case>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion Convert
        public override T Convert<T, U>(U entity)
        {
            Case cases = entity as Case;

            if (cases == null)
                return default(T);

            BO.Case caseBO = new BO.Case();

            caseBO.ID = cases.Id;
            caseBO.PatientId = cases.PatientId;
            caseBO.CaseName = cases.CaseName;
            caseBO.CaseTypeId = cases.CaseTypeId;
            caseBO.CarrierCaseNo = cases.CarrierCaseNo;
            caseBO.CaseStatusId = cases.CaseStatusId;
            caseBO.ClaimFileNumber = cases.ClaimFileNumber;
            caseBO.Medicare = cases.Medicare;
            caseBO.Medicaid = cases.Medicaid;
            caseBO.SSDisabililtyIncome = cases.SSDisabililtyIncome;

            caseBO.IsDeleted = cases.IsDeleted;
            caseBO.CreateByUserID = cases.CreateByUserID;
            caseBO.UpdateByUserID = cases.UpdateByUserID;

            if (cases.PatientEmpInfoes != null)
            {
                var PatientEmpInfo = cases.PatientEmpInfoes.Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)).FirstOrDefault();
                if (PatientEmpInfo != null)
                {
                    BO.PatientEmpInfo boPatientEmpInfo = new BO.PatientEmpInfo();
                    using (PatientEmpInfoRepository cmp = new PatientEmpInfoRepository(_context))
                    {
                        boPatientEmpInfo = cmp.Convert<BO.PatientEmpInfo, PatientEmpInfo>(PatientEmpInfo);
                        caseBO.PatientEmpInfo = boPatientEmpInfo;
                    }
                }
            }

            if (cases.Patient != null)
            {
                BO.Patient boPatient = new BO.Patient();
                using (PatientRepository cmp = new PatientRepository(_context))
                {
                    boPatient = cmp.Convert<BO.Patient, Patient>(cases.Patient);
                    caseBO.Patient = boPatient;
                }
            }
            
            if (cases.CaseCompanyMappings != null)
            {
                List<BO.CaseCompanyMapping> boCaseCompanyMapping = new List<BO.CaseCompanyMapping>();
                foreach (var casemap in cases.CaseCompanyMappings)
                {
                    if (casemap != null)
                    {
                        if (casemap.IsDeleted.HasValue == false || (casemap.IsDeleted.HasValue == true && casemap.IsDeleted.Value == false))
                        {                            
                            using (CaseCompanyMappingRepository cmp = new CaseCompanyMappingRepository(_context))
                            {
                                boCaseCompanyMapping.Add(cmp.Convert<BO.CaseCompanyMapping, CaseCompanyMapping>(casemap));
                            }

                            if (casemap.IsOriginator == true)
                            {
                                caseBO.OrignatorCompanyId = casemap.CompanyId;
                                caseBO.OrignatorCompanyName = (casemap.Company != null) ? casemap.Company.Name : "";

                                if (casemap.Company1 != null && casemap.Company1.CompanyType == 1)
                                {
                                    caseBO.MedicalProviderId = casemap.CompanyId;
                                    caseBO.AttorneyProviderId = cases.CaseCompanyMappings.Where(p => p.AddedByCompanyId == casemap.CompanyId && (p.Company1 != null && p.Company1.CompanyType == 2)
                                                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p => p.CompanyId).FirstOrDefault();
                                }
                                else if (casemap.Company1 != null && casemap.Company1.CompanyType == 2)
                                {
                                    caseBO.AttorneyProviderId = casemap.CompanyId;
                                    caseBO.MedicalProviderId = cases.CaseCompanyMappings.Where(p => p.AddedByCompanyId == casemap.CompanyId && (p.Company1 != null && p.Company1.CompanyType == 1)
                                                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p => p.CompanyId).FirstOrDefault();
                                }
                            }
                        }
                    }
                }

                caseBO.CaseCompanyMappings = boCaseCompanyMapping;
            }

            if (cases.CompanyCaseConsentApprovals != null)
            {
                List<BO.CompanyCaseConsentApproval> boCompanyCaseConsentApproval = new List<BO.CompanyCaseConsentApproval>();
                foreach (var casemap in cases.CompanyCaseConsentApprovals)
                {
                    if (casemap.IsDeleted.HasValue == false || (casemap.IsDeleted.HasValue == true && casemap.IsDeleted.Value == false))
                    {
                        if (casemap != null)
                        {
                            using (CompanyCaseConsentApprovalRepository cmp = new CompanyCaseConsentApprovalRepository(_context))
                            {
                                boCompanyCaseConsentApproval.Add(cmp.Convert<BO.CompanyCaseConsentApproval, CompanyCaseConsentApproval>(casemap));
                            }
                        }
                    }
                }
                caseBO.CompanyCaseConsentApprovals = boCompanyCaseConsentApproval;
            }

            if (cases.CaseCompanyConsentDocuments != null)
            {
                List<BO.CaseCompanyConsentDocument> boCaseCompanyConsentDocument = new List<BO.CaseCompanyConsentDocument>();

                foreach (var eachcaseCompanyConsentDocument in cases.CaseCompanyConsentDocuments)
                {
                    if (eachcaseCompanyConsentDocument.IsDeleted.HasValue == false || (eachcaseCompanyConsentDocument.IsDeleted.HasValue == true && eachcaseCompanyConsentDocument.IsDeleted.Value == false))
                    {
                        BO.CaseCompanyConsentDocument caseCompanyConsentDocument = new BO.CaseCompanyConsentDocument();

                        caseCompanyConsentDocument.ID = eachcaseCompanyConsentDocument.Id;
                        caseCompanyConsentDocument.CaseId = eachcaseCompanyConsentDocument.CaseId;
                        caseCompanyConsentDocument.CompanyId = eachcaseCompanyConsentDocument.CompanyId;
                        caseCompanyConsentDocument.DocumentName = eachcaseCompanyConsentDocument.DocumentName;
                        caseCompanyConsentDocument.MidasDocumentId = eachcaseCompanyConsentDocument.MidasDocumentId;
                        caseCompanyConsentDocument.IsDeleted = eachcaseCompanyConsentDocument.IsDeleted;
                        caseCompanyConsentDocument.UpdateByUserID = eachcaseCompanyConsentDocument.UpdateUserId;
                        caseCompanyConsentDocument.CreateByUserID = (int)(eachcaseCompanyConsentDocument.CreateUserId.HasValue == true ? eachcaseCompanyConsentDocument.CreateUserId.Value : 0);

                        if (eachcaseCompanyConsentDocument.MidasDocument != null)
                        {
                            if (eachcaseCompanyConsentDocument.MidasDocument.IsDeleted.HasValue == false || (eachcaseCompanyConsentDocument.MidasDocument.IsDeleted.HasValue == true && eachcaseCompanyConsentDocument.MidasDocument.IsDeleted.Value == false))
                            {
                                BO.MidasDocument boMidasDocument = new BO.MidasDocument();

                                boMidasDocument.ID = eachcaseCompanyConsentDocument.Id;
                                boMidasDocument.ObjectType = eachcaseCompanyConsentDocument.MidasDocument.ObjectType;
                                boMidasDocument.ObjectId = eachcaseCompanyConsentDocument.MidasDocument.ObjectId;
                                boMidasDocument.DocumentPath = eachcaseCompanyConsentDocument.MidasDocument.DocumentPath;
                                boMidasDocument.DocumentName = eachcaseCompanyConsentDocument.MidasDocument.DocumentName;
                                boMidasDocument.IsDeleted = eachcaseCompanyConsentDocument.MidasDocument.IsDeleted;
                                boMidasDocument.UpdateByUserID = eachcaseCompanyConsentDocument.MidasDocument.UpdateUserId;
                                boMidasDocument.CreateByUserID = (int)(eachcaseCompanyConsentDocument.MidasDocument.CreateUserId.HasValue == true ? eachcaseCompanyConsentDocument.MidasDocument.CreateUserId.Value : 0);

                                caseCompanyConsentDocument.MidasDocument = boMidasDocument;
                            }
                        }
                        if (eachcaseCompanyConsentDocument.Company != null)
                        {
                            if (eachcaseCompanyConsentDocument.Company.IsDeleted.HasValue == false || (eachcaseCompanyConsentDocument.Company.IsDeleted.HasValue == true && eachcaseCompanyConsentDocument.Company.IsDeleted.Value == false))
                            {
                                BO.Company boCompany = new BO.Company();
                                boCompany.ID = eachcaseCompanyConsentDocument.Company.id;
                                boCompany.Name = eachcaseCompanyConsentDocument.Company.Name;
                                boCompany.TaxID = eachcaseCompanyConsentDocument.Company.TaxID;
                                boCompany.Status = (BO.GBEnums.AccountStatus)eachcaseCompanyConsentDocument.Company.Status;
                                boCompany.CompanyType = (BO.GBEnums.CompanyType)eachcaseCompanyConsentDocument.Company.CompanyType;

                                caseCompanyConsentDocument.Company = boCompany;
                            }
                        }
                        boCaseCompanyConsentDocument.Add(caseCompanyConsentDocument);
                    }
                }

                caseBO.CaseCompanyConsentDocuments = boCaseCompanyConsentDocument;
            }

            if (cases.Referrals != null)
            {
                List<BO.Referral> BOListReferral = new List<BO.Referral>();
                foreach (var eachRefrral in cases.Referrals)
                {
                    if (eachRefrral != null)
                    {
                        if (eachRefrral.IsDeleted.HasValue == false || (eachRefrral.IsDeleted.HasValue == true && eachRefrral.IsDeleted.Value == false))
                        {
                            BO.Referral referralBO = new BO.Referral();

                            referralBO.ID = eachRefrral.Id;
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
                            referralBO.CaseId = eachRefrral.CaseId;
                            referralBO.IsDeleted = eachRefrral.IsDeleted;
                            referralBO.CreateByUserID = eachRefrral.CreateByUserID;
                            referralBO.UpdateByUserID = eachRefrral.UpdateByUserID;

                            BOListReferral.Add(referralBO);
                        }
                    }
                }

                caseBO.Referrals = BOListReferral;
            }

            caseBO.caseSource = cases.CaseSource;

            return (T)(object)caseBO;
        }
        #endregion

        #region Entity Conversion ConvertToCaseWithUserAndPatient
        public T ConvertToCaseWithUserAndPatient<T, U>(U entity, int CompanyId)
        {
            Patient patient = entity as Patient;

            if (patient == null)
                return default(T);

            List<BO.CaseWithUserAndPatient> lstCaseWithUserAndPatient = new List<BO.CaseWithUserAndPatient>();

            if (patient.User != null && patient.Cases != null)
            {
                foreach (var eachCase in GetByPatientId(patient.Id) as List<BO.Case>)
                {
                    if (eachCase.CaseCompanyMappings.Any(p => p.Company != null && p.Company.ID == CompanyId) == true
                        || (eachCase.Referrals != null && eachCase.Referrals.Any(p => p.ToCompanyId == CompanyId) == true))
                    {
                        BO.CaseWithUserAndPatient caseWithUserAndPatient = new BO.CaseWithUserAndPatient();

                        caseWithUserAndPatient.ID = patient.Id;

                        caseWithUserAndPatient.UserId = patient.User.id;
                        caseWithUserAndPatient.UserName = patient.User.UserName;
                        caseWithUserAndPatient.FirstName = patient.User.FirstName;
                        caseWithUserAndPatient.MiddleName = patient.User.MiddleName;
                        caseWithUserAndPatient.LastName = patient.User.LastName;

                        caseWithUserAndPatient.CaseId = eachCase.ID;
                        caseWithUserAndPatient.PatientId = eachCase.PatientId;
                        caseWithUserAndPatient.CaseName = eachCase.CaseName;
                        caseWithUserAndPatient.CaseTypeId = eachCase.CaseTypeId;
                        //caseWithUserAndPatient.LocationId = eachCase.LocationId;
                        //caseWithUserAndPatient.PatientEmpInfoId = eachCase.PatientEmpInfoId;
                        caseWithUserAndPatient.CarrierCaseNo = eachCase.CarrierCaseNo;
                        caseWithUserAndPatient.CaseStatusId = eachCase.CaseStatusId;
                        caseWithUserAndPatient.ClaimFileNumber = eachCase.ClaimFileNumber;

                        caseWithUserAndPatient.IsDeleted = eachCase.IsDeleted;
                        caseWithUserAndPatient.CreateByUserID = eachCase.CreateByUserID;
                        caseWithUserAndPatient.UpdateByUserID = eachCase.UpdateByUserID;

                        caseWithUserAndPatient.PatientEmpInfo = eachCase.PatientEmpInfo;
                                                
                        caseWithUserAndPatient.caseSource = eachCase.caseSource;

                        caseWithUserAndPatient.OrignatorCompanyId = eachCase.OrignatorCompanyId;
                        //caseWithUserAndPatient.OrignatorCompanyName = eachCase.CaseCompanyMappings.Where(c => c.IsOriginator = true).Select(c2 => c2.Company.Name).FirstOrDefault();
                        caseWithUserAndPatient.OrignatorCompanyName = eachCase.OrignatorCompanyName;

                        caseWithUserAndPatient.MedicalProviderId = eachCase.MedicalProviderId;
                        caseWithUserAndPatient.AttorneyProviderId = eachCase.AttorneyProviderId;


                        List<BO.CaseCompanyMapping> boCaseCompanyMapping = new List<BO.CaseCompanyMapping>();
                        foreach (var item in eachCase.CaseCompanyMappings)
                        {
                            if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                            {
                                boCaseCompanyMapping.Add(item);
                            }
                        }
                        caseWithUserAndPatient.CaseCompanyMappings = boCaseCompanyMapping;

                        List<BO.CompanyCaseConsentApproval> boCompanyCaseConsentApproval = new List<BO.CompanyCaseConsentApproval>();
                        foreach (var item in eachCase.CompanyCaseConsentApprovals)
                        {
                            if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                            {
                                boCompanyCaseConsentApproval.Add(item);
                            }
                        }
                        caseWithUserAndPatient.CompanyCaseConsentApprovals = boCompanyCaseConsentApproval;

                        List<BO.CaseCompanyConsentDocument> boCaseCompanyConsentDocument = new List<BO.CaseCompanyConsentDocument>();
                        foreach (var item in eachCase.CaseCompanyConsentDocuments)
                        {
                            if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                            {
                                boCaseCompanyConsentDocument.Add(item);
                            }
                        }
                        caseWithUserAndPatient.CaseCompanyConsentDocuments = boCaseCompanyConsentDocument;


                        List<BO.Referral> boReferral = new List<BO.Referral>();
                        foreach (var item in eachCase.Referrals)
                        {
                            if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                            {
                                boReferral.Add(item);
                            }
                        }
                        caseWithUserAndPatient.Referrals = boReferral;

                        if (eachCase.PatientAccidentInfoes != null)
                        {
                            List<BO.PatientAccidentInfo> boPatientAccidentInfo = new List<BO.PatientAccidentInfo>();
                            foreach (var item in eachCase.PatientAccidentInfoes)
                            {
                                if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                                {
                                    boPatientAccidentInfo.Add(item);
                                }
                            }
                            caseWithUserAndPatient.PatientAccidentInfoes = boPatientAccidentInfo;

                        }

                        //Common 
                        caseWithUserAndPatient.IsDeleted = eachCase.IsDeleted;
                        caseWithUserAndPatient.CreateByUserID = eachCase.CreateByUserID;
                        caseWithUserAndPatient.UpdateByUserID = eachCase.UpdateByUserID;

                        lstCaseWithUserAndPatient.Add(caseWithUserAndPatient);
                    }
                }
            }

            return (T)(object)lstCaseWithUserAndPatient;
        }
        #endregion

        #region Entity Conversion ConvertToCaseWithUserAndPatient
        public T ConvertToCaseWithPatientName<T, U>(U entity, int CompanyId)
        {
            Patient patient = entity as Patient;

            if (patient == null)
                return default(T);

            List<BO.CaseWithPatientName> lstCaseWithPatient = new List<BO.CaseWithPatientName>();

            if (patient.User != null && patient.Cases != null)
            {
                foreach (var eachCase in GetByPatientId(patient.Id) as List<BO.Case>)
                {
                    if (eachCase.CaseCompanyMappings.Any(p => p.Company != null && p.Company.ID == CompanyId) == true
                        || (eachCase.Referrals != null && eachCase.Referrals.Any(p => p.ToCompanyId == CompanyId) == true))
                    {
                        BO.CaseWithPatientName caseWithPatient = new BO.CaseWithPatientName();
                      
                        caseWithPatient.FirstName = patient.User.FirstName;
                        caseWithPatient.MiddleName = patient.User.MiddleName;
                        caseWithPatient.LastName = patient.User.LastName;

                        caseWithPatient.CaseId = eachCase.ID;
                        
                       
                        caseWithPatient.CaseTypeId = eachCase.CaseTypeId;
                       
                        caseWithPatient.CaseStatusId = eachCase.CaseStatusId;

                        caseWithPatient.IsDeleted = eachCase.IsDeleted;
                        caseWithPatient.CreateByUserID = eachCase.CreateByUserID;
                        caseWithPatient.UpdateByUserID = eachCase.UpdateByUserID;
                                                                   
                        caseWithPatient.caseSource = eachCase.caseSource;
                        caseWithPatient.ClaimFileNumber = eachCase.ClaimFileNumber;

                        caseWithPatient.OrignatorCompanyId = eachCase.OrignatorCompanyId;
                        //caseWithPatient.OrignatorCompanyName = eachCase.CaseCompanyMappings.Where(c => c.IsOriginator = true).Select(c2 => c2.Company.Name).FirstOrDefault();
                        caseWithPatient.OrignatorCompanyName = eachCase.OrignatorCompanyName;

                        caseWithPatient.MedicalProviderId = eachCase.MedicalProviderId;
                        caseWithPatient.AttorneyProviderId = eachCase.AttorneyProviderId;

                        lstCaseWithPatient.Add(caseWithPatient);
                    }
                }
            }

            return (T)(object)lstCaseWithPatient;
        }
        #endregion

        #region Entity Conversion GetCaseCompanies
        public override T ConvertCompany<T, U>(U entity)
        {
            Company company = entity as Company;

            if (company == null)
                return default(T);

            BO.Company boCompany = null;

            if (company != null)
            {
                boCompany = new BO.Company();

                boCompany.ID = company.id;
                boCompany.Name = company.Name;
                boCompany.TaxID = company.TaxID;
                boCompany.Status = (BO.GBEnums.AccountStatus)company.Status;
                boCompany.CompanyType = (BO.GBEnums.CompanyType)company.CompanyType;
                if (company.SubscriptionPlanType != null)
                {
                    boCompany.SubsCriptionType = (BO.GBEnums.SubsCriptionType)company.SubscriptionPlanType;
                }
                else
                {
                    boCompany.SubsCriptionType = null;
                }

                var companyTypeDB = company.CompanyType1;
                if (company.CompanyType != 0)
                {
                    boCompany.CompanyType1 = new BO.CompanyType();
                    boCompany.CompanyType1.ID = companyTypeDB.id;
                    boCompany.CompanyType1.Name = companyTypeDB.Name;
                    boCompany.CompanyType1.IsDeleted = companyTypeDB.IsDeleted;
                    boCompany.CompanyType1.CreateByUserID = companyTypeDB.CreateByUserID;
                    boCompany.CompanyType1.UpdateByUserID = companyTypeDB.UpdateByUserID;
                  
                }
               
            }

            return (T)(object)boCompany;
        }
        #endregion


        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Case cases = (BO.Case)(object)entity;
            var result = cases.Validate(cases);
            return result;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.Cases.Include("PatientEmpInfoes")
                                    .Include("PatientEmpInfoes.AddressInfo")
                                    .Include("PatientEmpInfoes.ContactInfo")
                                    .Include("CaseCompanyMappings")
                                    .Include("CaseCompanyMappings.Company")
                                    .Include("CaseCompanyMappings.Company1")
                                    .Include("CompanyCaseConsentApprovals")
                                    .Include("CaseCompanyConsentDocuments")
                                    .Include("CaseCompanyConsentDocuments.MidasDocument")
                                    .Include("Referrals")
                                    .Where(p => p.Id == id
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                    .FirstOrDefault<Case>();

            BO.Case acc_ = Convert<BO.Case, Case>(acc);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region Get By Patient Id
        public override object GetByPatientId(int PatientId)
        {
            var acc = _context.Cases.Include("PatientEmpInfoes")
                                    .Include("PatientEmpInfoes.AddressInfo")
                                    .Include("PatientEmpInfoes.ContactInfo")
                                    .Include("CaseCompanyMappings")
                                    .Include("CaseCompanyMappings.Company")
                                    .Include("CaseCompanyMappings.Company1")
                                    .Include("CompanyCaseConsentApprovals")
                                    .Include("CaseCompanyConsentDocuments")
                                    .Include("CaseCompanyConsentDocuments.MidasDocument")
                                    .Include("Referrals")                                    
                                    .Where(p => p.PatientId == PatientId
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                    .ToList<Case>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.Case> lstcase = new List<BO.Case>();
            foreach (Case item in acc)
            {
                lstcase.Add(Convert<BO.Case, Case>(item));
            }

            return lstcase;
        }
        #endregion

        #region Get By Patient Id and CompanyId
        public override object Get2(int PatientId, int CompanyId)
        {
            var caseList1 = _context.Cases.Include("PatientEmpInfoes")
                                    .Include("PatientEmpInfoes.AddressInfo")
                                    .Include("PatientEmpInfoes.ContactInfo")
                                    .Include("CaseCompanyMappings")
                                    .Include("CaseCompanyMappings.Company")
                                    .Include("CaseCompanyMappings.Company1")
                                    .Include("CompanyCaseConsentApprovals")
                                    .Include("CaseCompanyConsentDocuments")
                                    .Include("CaseCompanyConsentDocuments.MidasDocument")
                                    .Include("Referrals")
                                    .Where(p => p.PatientId == PatientId
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                    .ToList<Case>();

            caseList1 = caseList1.Where(p => p.CaseCompanyMappings.Any(p2 => p2.CompanyId == CompanyId) == true).ToList();

            var referralList = _context.Referrals.Include("Case")
                                                .Include("Case.CompanyCaseConsentApprovals")
                                                .Include("Case.CaseCompanyMappings")
                                                .Include("Case.Patient.User")
                                                .Include("Case.Patient.User.UserCompanies")
                                                .Include("Case.Patient.User.AddressInfo")
                                                .Include("Case.Patient.User.ContactInfo")
                                                .Where(p => p.FromCompanyId == CompanyId && p.Case.PatientId == PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                .ToList<Referral>();

            var caseList2 = referralList.Select(p => p.Case).ToList();


            if (caseList1 == null && caseList2 == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.Case> lstcase = new List<BO.Case>();
            foreach (Case item in caseList1.Union(caseList2))
            {
                lstcase.Add(Convert<BO.Case, Case>(item));
            }

            return lstcase;
        }
        #endregion

        #region Get Open Cases By Patient Id
        public override object GetOpenCaseForPatient(int PatientId)
        {
            var acc = _context.Cases.Include("PatientEmpInfoes")
                                    .Include("PatientEmpInfoes.AddressInfo")
                                    .Include("PatientEmpInfoes.ContactInfo")
                                    .Include("CaseCompanyMappings")
                                    .Include("CaseCompanyMappings.Company")
                                    .Include("CaseCompanyMappings.Company1")
                                    .Include("CompanyCaseConsentApprovals")
                                    .Include("CaseCompanyConsentDocuments")
                                    .Include("CaseCompanyConsentDocuments.MidasDocument")
                                    .Include("Referrals")
                                    .Where(p => p.PatientId == PatientId && p.CaseStatusId == 1
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                    .ToList<Case>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.Case> lstcase = new List<BO.Case>();
            foreach (Case item in acc)
            {
                lstcase.Add(Convert<BO.Case, Case>(item));
            }

            return lstcase;
        }
        #endregion

        #region Get Open Cases By Patient Id
        public override object GetOpenCaseForPatient(int PatientId, int CompanyId)
        {
            var acc = _context.Cases.Include("PatientEmpInfoes")
                                    .Include("PatientEmpInfoes.AddressInfo")
                                    .Include("PatientEmpInfoes.ContactInfo")
                                    .Include("CaseCompanyMappings")
                                    .Include("CaseCompanyMappings.Company")
                                    .Include("CaseCompanyMappings.Company1")
                                    .Include("CompanyCaseConsentApprovals")
                                    .Include("CaseCompanyConsentDocuments")
                                    .Include("CaseCompanyConsentDocuments.MidasDocument")
                                    .Include("Referrals")
                                    .Where(p => p.PatientId == PatientId && p.CaseStatusId == 1 
                                        && (p.CaseCompanyMappings.Any(p2 => p2.CompanyId == CompanyId 
                                            && (p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false))) == true)
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                    .ToList<Case>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.Case> lstcase = new List<BO.Case>();
            foreach (Case item in acc)
            {
                lstcase.Add(Convert<BO.Case, Case>(item));
            }

            return lstcase;
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.Case caseBO = (BO.Case)(object)entity;
            BO.Location locationBO = new BO.Location();
            List<BO.CaseCompanyMapping> lstCaseCompanyMapping = caseBO.CaseCompanyMappings;
            BO.CaseCompanyMapping caseCompanyMappingBO = new BO.CaseCompanyMapping();

            Case caseDB = new Case();
            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                Patient patientDB = new Patient();
                Location locationDB = new Location();

                bool IsEditMode = false;
                IsEditMode = (caseBO != null && caseBO.ID > 0) ? true : false;

                #region case
                if (caseBO != null)
                {
                    bool Add_caseDB = false;
                    caseDB = _context.Cases.Where(p => p.Id == caseBO.ID).FirstOrDefault();

                    if (caseDB == null && caseBO.ID <= 0)
                    {
                        caseDB = new Case();
                        Add_caseDB = true;
                    }
                    else if (caseDB == null && caseBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Case dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }
                    
                    if (IsEditMode == true)
                    {
                        bool matchCaseAndPatient = _context.Cases.Any(p => p.PatientId == caseBO.PatientId && p.Id == caseBO.ID
                                                                       && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)));
                        if (matchCaseAndPatient == false)
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "The case is not associated with the given patient", ErrorLevel = ErrorLevel.Error };
                        }
                    }                    

                    caseDB.PatientId = caseBO.PatientId;
                    caseDB.CaseName = IsEditMode == true && caseBO.CaseName == null ? caseDB.CaseName : caseBO.CaseName;
                    caseDB.CaseTypeId = IsEditMode == true && caseBO.CaseTypeId == null ? caseDB.CaseTypeId : caseBO.CaseTypeId;
                    caseDB.CarrierCaseNo = IsEditMode == true && caseBO.CarrierCaseNo == null ? caseDB.CarrierCaseNo : caseBO.CarrierCaseNo;
                    caseDB.CaseStatusId = IsEditMode == true && caseBO.CaseStatusId.HasValue == false ? caseDB.CaseStatusId : caseBO.CaseStatusId.Value;
                    caseDB.ClaimFileNumber = IsEditMode == true && caseBO.ClaimFileNumber.HasValue == false ? caseDB.ClaimFileNumber : caseBO.ClaimFileNumber;
                    caseDB.CreateByUserID = IsEditMode == true && caseBO.CreateByUserID == 0 ? caseDB.CreateByUserID : caseBO.CreateByUserID;
                    caseDB.UpdateByUserID = IsEditMode == true && caseBO.UpdateByUserID == 0 ? caseDB.UpdateByUserID : caseBO.UpdateByUserID;
                    caseDB.CaseSource = IsEditMode == true && caseBO.caseSource == null ? caseDB.CaseSource : caseBO.caseSource;
                    caseDB.Medicare = IsEditMode == true && caseBO.Medicare == null ? caseDB.Medicare : caseBO.Medicare;
                    caseDB.Medicaid = IsEditMode == true && caseBO.Medicaid == null ? caseDB.Medicaid : caseBO.Medicaid;
                    caseDB.SSDisabililtyIncome = IsEditMode == true && caseBO.SSDisabililtyIncome == null ? caseDB.SSDisabililtyIncome : caseBO.SSDisabililtyIncome;

                    if (Add_caseDB == true)
                    {
                        caseDB = _context.Cases.Add(caseDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid case details.", ErrorLevel = ErrorLevel.Error };
                    }
                    caseDB = null;
                }

                _context.SaveChanges();
                #endregion

                #region caseCompanymapping
                if (lstCaseCompanyMapping == null || (lstCaseCompanyMapping != null && lstCaseCompanyMapping.Count <= 0))
                {
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid case, company mapping.", ErrorLevel = ErrorLevel.Error };
                }
                else
                {
                    foreach (BO.CaseCompanyMapping eachcaseCompanyMapping in lstCaseCompanyMapping)
                    {
                        eachcaseCompanyMapping.CaseId = caseDB.Id;
                        using (CaseCompanyMappingRepository caseCompanyMapRepo = new CaseCompanyMappingRepository(_context))
                        {
                            var result = caseCompanyMapRepo.Save(eachcaseCompanyMapping);
                            if (result is BO.ErrorObject)
                            {
                                return result;
                            }
                        }
                    }
                }
                #endregion

                dbContextTransaction.Commit();
                caseDB = _context.Cases.Include("PatientEmpInfoes")
                                       .Include("PatientEmpInfoes.AddressInfo")
                                       .Include("PatientEmpInfoes.ContactInfo")
                                       .Include("CaseCompanyMappings")
                                       .Include("CaseCompanyMappings.Company")
                                       .Include("CaseCompanyMappings.Company1")
                                       .Include("CompanyCaseConsentApprovals")
                                       .Include("CaseCompanyConsentDocuments")
                                       .Include("CaseCompanyConsentDocuments.MidasDocument")
                                       .Include("Referrals")                                     
                                       .Where(p => p.Id == caseDB.Id).FirstOrDefault<Case>();

                try
                {
                    #region Send Email

                    if (IsEditMode)
                    {
                        var CurrentUser = _context.Users.Where(p => p.id == caseDB.UpdateByUserID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<User>();

                        if (CurrentUser != null)
                        {
                            if (CurrentUser.UserType == 3) //UserType = 3 - Attorney
                            {
                                //Get patient user associated with the case
                                var patient = _context.Users
                                    .Where(p => p.id == caseDB.PatientId
                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();


                                //var medicalprovider = _context.CaseCompanyMappings.Where(p => p.CaseId == caseDB.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.CompanyId).FirstOrDefault();
                                //var medicalprovider_UserId = _context.UserCompanies.Where(p => p.CompanyID == medicalprovider && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.UserID).FirstOrDefault();
                                //var medicalprovider_user = _context.Users.Where(p => p.id == medicalprovider_UserId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
                                //var userId = _context.UserCompanies.Where(p => p.CompanyID == caseDB.AttorneyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.UserID).ToList();

                                //var medicalprovider_user = _context.Users.Where(p => userId.Contains(p.id) && p.UserType == 3 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
                                var medicalprovider_userdetail = (from cm in caseDB.CaseCompanyMappings
                                                                  join uc in _context.UserCompanies on cm.CompanyId equals uc.CompanyID
                                                                  join u in _context.Users on uc.UserID equals u.id
                                                                  where cm.CaseId == caseDB.Id
                                                                  && cm.IsOriginator == false
                                                                  && cm.Company1.CompanyType == 1 // CompanyType-1 =  Medical Provider
                                                                  && (cm.IsDeleted.HasValue == false || (cm.IsDeleted.HasValue == true && cm.IsDeleted.Value == false))
                                                                  && (uc.IsDeleted.HasValue == false || (uc.IsDeleted.HasValue == true && uc.IsDeleted.Value == false))
                                                                  && (u.IsDeleted.HasValue == false || (u.IsDeleted.HasValue == true && u.IsDeleted.Value == false))
                                                                  && (u.UserType == 2 || u.UserType == 4) //UserType -2 = Medical Staff, 4- Doctor
                                                                  select new
                                                                  {
                                                                      Email = u.UserName,
                                                                      u.FirstName,
                                                                      u.LastName
                                                                  }).FirstOrDefault();

                                if (medicalprovider_userdetail != null && patient != null)
                                {

                                    var medicalProviderTemplate = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "MedicalProviderTemplateUpdate".ToUpper()).FirstOrDefault();
                                    //var attorneyTemplate = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "AttorneyTemplate".ToUpper()).FirstOrDefault();
                                    var patientCaseTemplate = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "PatientCaseTemplateByAttorneyUpdate".ToUpper()).FirstOrDefault();
                                    if (medicalProviderTemplate == null || patientCaseTemplate == null)
                                    {
                                        return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                                    }
                                    else
                                    {


                                        #region Send mail to medical provider
                                        string LoginLink1 = "<a href='" + Utility.GetConfigValue("MedicalProviderLoginLink") + "'> '" + Utility.GetConfigValue("MedicalProviderLoginLink") + "' </a>";
                                        string msg1 = medicalProviderTemplate.EmailBody;
                                        string subject1 = medicalProviderTemplate.EmailSubject;

                                        string message1 = string.Format(msg1, medicalprovider_userdetail.FirstName, CurrentUser.FirstName, LoginLink1);

                                        BO.Email objEmail1 = new BO.Email { ToEmail = medicalprovider_userdetail.Email, Subject = subject1, Body = message1 };
                                        objEmail1.SendMail();
                                        #endregion

                                        #region Send mail to patient
                                        string LoginLink2 = "<a href='" + Utility.GetConfigValue("PatientLoginLink") + "'> '" + Utility.GetConfigValue("PatientLoginLink") + "' </a>";
                                        string msg2 = patientCaseTemplate.EmailBody;
                                        string subject2 = patientCaseTemplate.EmailSubject;

                                        string message2 = string.Format(msg2, patient.FirstName, CurrentUser.FirstName, medicalprovider_userdetail.FirstName, LoginLink2);

                                        BO.Email objEmail2 = new BO.Email { ToEmail = patient.UserName, Subject = subject2, Body = message2 };
                                        objEmail2.SendMail();
                                        #endregion



                                    }

                                }


                            }
                            else if (CurrentUser.UserType == 2 || CurrentUser.UserType == 4) //UserType = 2 -- Medical Provider Staff, UserType = 4 -- Doctor
                            {

                                //var userId = _context.UserCompanies.Where(p => p.CompanyID == caseDB.AttorneyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.UserID).ToList();

                                //var attorney = _context.Users.Where(p => userId.Contains(p.id) && p.UserType == 3 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                                var patient = _context.Users.Where(p => p.id == caseDB.PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
                                var attorneyProviderder_userdetail = (from cm in caseDB.CaseCompanyMappings
                                                                      join uc in _context.UserCompanies on cm.CompanyId equals uc.CompanyID
                                                                      join u in _context.Users on uc.UserID equals u.id
                                                                      where cm.CaseId == caseDB.Id
                                                                      && cm.IsOriginator == false
                                                                      && cm.Company1.CompanyType == 2 // CompanyType-2 =  Attorney provider
                                                                      && (cm.IsDeleted.HasValue == false || (cm.IsDeleted.HasValue == true && cm.IsDeleted.Value == false))
                                                                      && (uc.IsDeleted.HasValue == false || (uc.IsDeleted.HasValue == true && uc.IsDeleted.Value == false))
                                                                      && (u.IsDeleted.HasValue == false || (u.IsDeleted.HasValue == true && u.IsDeleted.Value == false))
                                                                      && (u.UserType == 3) //UserType -3 = staff 
                                                                      select new
                                                                      {
                                                                          Email = u.UserName,
                                                                          u.FirstName,
                                                                          u.LastName
                                                                      }).FirstOrDefault();


                                if (attorneyProviderder_userdetail != null && patient != null)
                                {

                                    //var medicalProviderTemplate = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "MedicalProviderTemplate".ToUpper()).FirstOrDefault();
                                    var attorneyTemplate = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "AttorneyTemplateUpdate".ToUpper()).FirstOrDefault();
                                    var patientCaseTemplate = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "PatientCaseTemplateByMedicalProviderUpdate".ToUpper()).FirstOrDefault();
                                    if (attorneyTemplate == null || patientCaseTemplate == null)
                                    {
                                        return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                                    }
                                    else
                                    {
                                        #region Send mail to attorney
                                        string LoginLink = "<a href='" + Utility.GetConfigValue("AttorneyProviderLoginLink") + "'> '" + Utility.GetConfigValue("AttorneyProviderLoginLink") + "' </a>";
                                        string msg = attorneyTemplate.EmailBody;
                                        string subject = attorneyTemplate.EmailSubject;

                                        string message = string.Format(msg, attorneyProviderder_userdetail.FirstName, CurrentUser.FirstName, LoginLink);

                                        BO.Email objEmail = new BO.Email { ToEmail = attorneyProviderder_userdetail.Email, Subject = subject, Body = message };
                                        objEmail.SendMail();
                                        #endregion

                                        #region Send mail to patient
                                        string LoginLink2 = "<a href='" + Utility.GetConfigValue("PatientLoginLink") + "'> '" + Utility.GetConfigValue("PatientLoginLink") + "' </a>";
                                        string msg2 = patientCaseTemplate.EmailBody;
                                        string subject2 = patientCaseTemplate.EmailSubject;

                                        string message2 = string.Format(msg2, patient.FirstName, CurrentUser.FirstName, attorneyProviderder_userdetail.FirstName, LoginLink2);

                                        BO.Email objEmail2 = new BO.Email { ToEmail = patient.UserName, Subject = subject2, Body = message2 };
                                        objEmail2.SendMail();
                                        #endregion



                                    }

                                }
                            }
                        }
                    }
                    else
                    {

                        var CurrentUser = _context.Users.Where(p => p.id == caseDB.CreateByUserID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<User>();

                        if (CurrentUser != null)
                        {
                            if (CurrentUser.UserType == 3)
                            {

                                var patient = _context.Users.Where(p => p.id == caseDB.PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                                //var medicalprovider = _context.CaseCompanyMappings.Where(p => p.CaseId == caseDB.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.CompanyId).FirstOrDefault();
                                //var medicalprovider_UserId = _context.UserCompanies.Where(p => p.CompanyID == medicalprovider && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.UserID).FirstOrDefault();
                                //var medicalprovider_user = _context.Users.Where(p => p.id == medicalprovider_UserId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                                //var userId = _context.UserCompanies.Where(p => p.CompanyID == caseDB.AttorneyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.UserID).ToList();

                                //var medicalprovider_user = _context.Users.Where(p => userId.Contains(p.id) && p.UserType == 3 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();


                                var medicalprovider_userdetail = (from cm in caseDB.CaseCompanyMappings
                                                                  join uc in _context.UserCompanies on cm.CompanyId equals uc.CompanyID
                                                                  join u in _context.Users on uc.UserID equals u.id
                                                                  where cm.CaseId == caseDB.Id
                                                                  && cm.IsOriginator == false
                                                                  && cm.Company1.CompanyType == 1 // CompanyType-1 =  Medical Provider
                                                                  && (cm.IsDeleted.HasValue == false || (cm.IsDeleted.HasValue == true && cm.IsDeleted.Value == false))
                                                                  && (uc.IsDeleted.HasValue == false || (uc.IsDeleted.HasValue == true && uc.IsDeleted.Value == false))
                                                                  && (u.IsDeleted.HasValue == false || (u.IsDeleted.HasValue == true && u.IsDeleted.Value == false))
                                                                  && (u.UserType == 2 || u.UserType == 4) //UserType -2 = Medical Staff, 4- Doctor
                                                                  select new
                                                                  {
                                                                      Email = u.UserName,
                                                                      u.FirstName,
                                                                      u.LastName
                                                                  }).FirstOrDefault();

                                if (medicalprovider_userdetail != null && patient != null)
                                {

                                    var medicalProviderTemplate = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "MedicalProviderTemplate".ToUpper()).FirstOrDefault();
                                    //var attorneyTemplate = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "AttorneyTemplate".ToUpper()).FirstOrDefault();
                                    var patientCaseTemplate = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "PatientCaseTemplateByAttorney".ToUpper()).FirstOrDefault();
                                    if (medicalProviderTemplate == null || patientCaseTemplate == null)
                                    {
                                        return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                                    }
                                    else
                                    {


                                        #region Send mail to medical provider
                                        string LoginLink1 = "<a href='" + Utility.GetConfigValue("MedicalProviderLoginLink") + "'> '" + Utility.GetConfigValue("MedicalProviderLoginLink") + "' </a>";
                                        string msg1 = medicalProviderTemplate.EmailBody;
                                        string subject1 = medicalProviderTemplate.EmailSubject;

                                        string message1 = string.Format(msg1, medicalprovider_userdetail.FirstName, CurrentUser.FirstName, LoginLink1);

                                        BO.Email objEmail1 = new BO.Email { ToEmail = medicalprovider_userdetail.Email, Subject = subject1, Body = message1 };
                                        objEmail1.SendMail();
                                        #endregion

                                        #region Send mail to patient
                                        string LoginLink2 = "<a href='" + Utility.GetConfigValue("PatientLoginLink") + "'> '" + Utility.GetConfigValue("PatientLoginLink") + "' </a>";
                                        string msg2 = patientCaseTemplate.EmailBody;
                                        string subject2 = patientCaseTemplate.EmailSubject;

                                        string message2 = string.Format(msg2, patient.FirstName, CurrentUser.FirstName, medicalprovider_userdetail.FirstName, LoginLink2);

                                        BO.Email objEmail2 = new BO.Email { ToEmail = patient.UserName, Subject = subject2, Body = message2 };
                                        objEmail2.SendMail();
                                        #endregion



                                    }

                                }


                            }
                            else if (CurrentUser.UserType == 2 || CurrentUser.UserType == 4)
                            {

                                //var userId = _context.UserCompanies.Where(p => p.CompanyID == caseDB.AttorneyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.UserID).ToList();

                                //var attorney = _context.Users.Where(p => userId.Contains(p.id) && p.UserType == 3 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                                var patient = _context.Users.Where(p => p.id == caseDB.PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                                var attorneyProviderder_userdetail = (from cm in caseDB.CaseCompanyMappings
                                                                      join uc in _context.UserCompanies on cm.CompanyId equals uc.CompanyID
                                                                      join u in _context.Users on uc.UserID equals u.id
                                                                      where cm.CaseId == caseDB.Id
                                                                      && cm.IsOriginator == false
                                                                      && cm.Company1.CompanyType == 2 // CompanyType-2 =  Attorney provider
                                                                      && (cm.IsDeleted.HasValue == false || (cm.IsDeleted.HasValue == true && cm.IsDeleted.Value == false))
                                                                      && (uc.IsDeleted.HasValue == false || (uc.IsDeleted.HasValue == true && uc.IsDeleted.Value == false))
                                                                      && (u.IsDeleted.HasValue == false || (u.IsDeleted.HasValue == true && u.IsDeleted.Value == false))
                                                                      && (u.UserType == 3) //UserType -3 = staff 
                                                                      select new
                                                                      {
                                                                          Email = u.UserName,
                                                                          u.FirstName,
                                                                          u.LastName
                                                                      }).FirstOrDefault();

                                if (attorneyProviderder_userdetail != null && patient != null)
                                {

                                    //var medicalProviderTemplate = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "MedicalProviderTemplate".ToUpper()).FirstOrDefault();
                                    var attorneyTemplate = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "AttorneyTemplate".ToUpper()).FirstOrDefault();
                                    var patientCaseTemplate = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "PatientCaseTemplateByMedicalProvider".ToUpper()).FirstOrDefault();
                                    if (attorneyTemplate == null || patientCaseTemplate == null)
                                    {
                                        return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                                    }
                                    else
                                    {
                                        #region Send mail to attorney
                                        string LoginLink = "<a href='" + Utility.GetConfigValue("AttorneyProviderLoginLink") + "'> '" + Utility.GetConfigValue("AttorneyProviderLoginLink") + "' </a>";
                                        string msg = attorneyTemplate.EmailBody;
                                        string subject = attorneyTemplate.EmailSubject;

                                        string message = string.Format(msg, attorneyProviderder_userdetail.FirstName, CurrentUser.FirstName, LoginLink);

                                        BO.Email objEmail = new BO.Email { ToEmail = attorneyProviderder_userdetail.Email, Subject = subject, Body = message };
                                        objEmail.SendMail();
                                        #endregion

                                        #region Send mail to patient
                                        string LoginLink2 = "<a href='"+ Utility.GetConfigValue("PatientLoginLink") + "'> '"+Utility.GetConfigValue("PatientLoginLink")+"' </a>";
                                        // "<a href='" + Utility.GetConfigValue("PatientVerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>"
                                        string msg2 = patientCaseTemplate.EmailBody;
                                        string subject2 = patientCaseTemplate.EmailSubject;

                                        string message2 = string.Format(msg2, patient.FirstName, CurrentUser.FirstName, attorneyProviderder_userdetail.FirstName, LoginLink2);

                                        BO.Email objEmail2 = new BO.Email { ToEmail = patient.UserName, Subject = subject2, Body = message2 };
                                        objEmail2.SendMail();
                                        #endregion



                                    }

                                }
                            }
                        }
                    }
                    #endregion
                }
                catch (Exception ex) { }

            }

            var res = Convert<BO.Case, Case>(caseDB);
            return (object)res;
        }
        #endregion

        //#region AddUploadedFileData
        //public override object AddUploadedFileData(int id, string FileUploadPath)
        //{
        //    BO.Case caseBO = new BusinessObjects.Case();

        //    Case caseDB = new Case();
        //    caseDB = _context.Cases.Include("PatientEmpInfo")
        //                              .Include("PatientEmpInfo.AddressInfo")
        //                              .Include("PatientEmpInfo.ContactInfo")
        //                              .Where(p => p.Id == id).FirstOrDefault<Case>();

        //    caseDB.FileUploadPath = FileUploadPath;
        //    _context.Entry(caseDB).State = System.Data.Entity.EntityState.Modified;
        //    _context.SaveChanges();
        //    var res = Convert<BO.Case, Case>(caseDB);
        //    return (object)res;
        //}
        //#endregion
        #region Get DocumentList By ID
        public override object GetDocumentList(int id)
        {
            var acc = _context.Cases.Where(p => p.Id == id
                                     && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                    .FirstOrDefault<Case>();

            BO.Case acc_ = Convert<BO.Case, Case>(acc);

            Dictionary<string, object> Document = new Dictionary<string, object>();
            if (acc != null)
            {
                Document.Add("id", acc_.ID);
                // Document.Add("fileUploadPath", acc_.FileUploadPath);
            }


            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)Document;
        }
        #endregion

        #region Delete By ID
        public override object Delete(int id)
        {
            var acc = _context.Cases.Include("PatientEmpInfoes")
                                    .Include("PatientEmpInfoes.AddressInfo")
                                    .Include("PatientEmpInfoes.ContactInfo")
                                    .Include("PatientVisit")
                                    .Include("CaseCompanyMappings")
                                    .Include("CaseInsuranceMappings")
                                    .Include("CompanyCaseConsentApprovals")
                                    .Include("CaseCompanyConsentDocuments")
                                    .Include("PatientAccidentInfoes")
                                    .Where(p => p.Id == id
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                    .FirstOrDefault<Case>();
            if (acc != null)
            {
                if (acc.PatientVisits != null)
                {
                    foreach (var item in acc.PatientVisits)
                    {
                        if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                        {
                            using (PatientVisitRepository sr = new PatientVisitRepository(_context))
                            {
                                sr.DeleteVisit(item.Id);
                            }
                        }
                    }
                }

                if (acc.CaseInsuranceMappings != null)
                {
                    foreach (var item in acc.CaseInsuranceMappings)
                    {
                        if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                        {
                            using (CaseInsuranceMappingRepository sr = new CaseInsuranceMappingRepository(_context))
                            {
                                sr.Delete(item.Id);
                            }
                        }
                    }
                }

                if (acc.CaseCompanyMappings != null)
                {
                    foreach (var item in acc.CaseCompanyMappings)
                    {
                        if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                        {
                            using (CaseCompanyMappingRepository sr = new CaseCompanyMappingRepository(_context))
                            {
                                sr.Delete(item.Id);
                            }
                        }
                    }
                }

                if (acc.CompanyCaseConsentApprovals != null)
                {
                    foreach (var item in acc.CompanyCaseConsentApprovals)
                    {
                        if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                        {
                            using (CompanyCaseConsentApprovalRepository sr = new CompanyCaseConsentApprovalRepository(_context))
                            {
                                int DocumentId = _context.CaseCompanyConsentDocuments.Where(p => p.CaseId == item.CaseId && p.CompanyId == item.CompanyId)
                                                         .Select(p => p.MidasDocumentId)
                                                         .FirstOrDefault();
                                sr.Delete(item.CaseId, DocumentId, item.CompanyId);
                            }
                        }
                    }
                }

                if (acc.PatientAccidentInfoes != null)
                {
                    foreach (var item in acc.PatientAccidentInfoes)
                    {
                        if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                        {
                            using (PatientAccidentInfoRepository sr = new PatientAccidentInfoRepository(_context))
                            {
                                sr.Delete(item.Id);
                            }
                        }
                    }
                }

                acc.IsDeleted = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.Case, Case>(acc);
            return (object)res;
        }
        #endregion

        #region Get By Company Id
        public override object GetByCompanyId(int CompanyId)
        {
            var UserList1 = _context.UserCompanies.Where(p => p.CompanyID == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                  .Select(p => p.UserID)
                                                  .Distinct<int>();

            var AccList = _context.Patients.Include("User")
                                           .Where(p => (UserList1.Contains(p.Id))
                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                           .ToList<Patient>();

            var ReferralList = _context.Referrals.Include("Case")
                                                 .Include("Case.CompanyCaseConsentApprovals")
                                                 .Include("Case.Patient.User")
                                                 .Where(p => p.ToCompanyId == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                 .ToList<Referral>();
            ReferralList.RemoveAll(referral => referral.Case.CaseStatusId == 2);

            var UserList2 = ReferralList.Select(p => p.Case.Patient).ToList();

            if (AccList == null && UserList2 == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.CaseWithUserAndPatient> lstCaseWithUserAndPatient = new List<BO.CaseWithUserAndPatient>();
                foreach (Patient eachPatient in AccList.Union(UserList2).Distinct())
                {
                    lstCaseWithUserAndPatient.AddRange(ConvertToCaseWithUserAndPatient<List<BO.CaseWithUserAndPatient>, Patient>(eachPatient, CompanyId));
                }
                return lstCaseWithUserAndPatient;
            }
        }
        #endregion

        #region Get ReadOnly By Case Id
        public override object GetReadOnly(int caseId,int companyId)
        {

            //var referredBy = (from re in _context.Referral2
            //                  join co in _context.Companies on re.FromCompanyId equals co.id
            //                  where re.CaseId == caseId && re.ToCompanyId == companyId
            //                        && (re.IsDeleted.HasValue == false || (re.IsDeleted.HasValue == true && re.IsDeleted.Value == false))
            //                        && (co.IsDeleted.HasValue == false || (co.IsDeleted.HasValue == true && co.IsDeleted.Value == false))
            //                  select co.Name).FirstOrDefault();

            var CaseReadOnly1 = _context.sp_CaseGetReadOnly(caseId, companyId);
            var CaseReadOnly = CaseReadOnly1.ToList();

            if (CaseReadOnly != null && CaseReadOnly.Count() > 0)
            {
                return CaseReadOnly.FirstOrDefault();
            }
            else
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            //return CaseReadOnly;

            //var CaseInfo = (from ca in _context.Cases

            //                join ccm_Ori in _context.CaseCompanyMappings on ca.Id equals ccm_Ori.CaseId
            //                join co_Ori in _context.Companies on ccm_Ori.CompanyId equals co_Ori.id

            //                join us in _context.Users on ca.PatientId equals us.id
            //                join ct in _context.CaseTypes on ca.CaseTypeId equals ct.Id
            //                join cs in _context.CaseStatus on ca.CaseStatusId equals cs.Id
            //                join lo in _context.Locations on ca.LocationId equals lo.id

            //                //join ccm_Att in _context.CaseCompanyMappings on ca.Id equals ccm_Att.CaseId  // For  attorney
            //                //join co_Att in _context.Companies on ccm_Att.CompanyId equals co_Att.id

            //                join ccm_CS in _context.CaseCompanyMappings on ca.Id equals ccm_CS.CaseId  // For  attorney or medical provider company
            //                join co_CS in _context.Companies on ccm_CS.CompanyId equals co_CS.id //m changes AddedByCompanyId to companyid

            //                //join co in _context.Companies on ccm.AddedByCompanyId equals co.id                            
            //                //join co2 in _context.Companies on ccm2.AddedByCompanyId equals co2.id  //   For  attorney or medical provider company




            //                where ca.Id == caseId && (ca.IsDeleted.HasValue == false || (ca.IsDeleted.HasValue == true && ca.IsDeleted.Value == false))

            //                        && ccm_Ori.IsOriginator == true && (ccm_Ori.IsDeleted.HasValue == false || (ccm_Ori.IsDeleted.HasValue == true && ccm_Ori.IsDeleted.Value == false))
            //                        && (co_Ori.IsDeleted.HasValue == false || (co_Ori.IsDeleted.HasValue == true && co_Ori.IsDeleted.Value == false))

            //                        && (us.IsDeleted.HasValue == false || (us.IsDeleted.HasValue == true && us.IsDeleted.Value == false))
            //                        && (ct.IsDeleted.HasValue == false || (ct.IsDeleted.HasValue == true && ct.IsDeleted.Value == false))
            //                        && (cs.IsDeleted.HasValue == false || (cs.IsDeleted.HasValue == true && cs.IsDeleted.Value == false))
            //                        && (lo.IsDeleted.HasValue == false || (lo.IsDeleted.HasValue == true && lo.IsDeleted.Value == false))

            //                        //&& ccm_Att.IsOriginator == false && ccm_Att.AddedByCompanyId == ccm_Ori.CompanyId && (ccm_Att.IsDeleted.HasValue == false || (ccm_Att.IsDeleted.HasValue == true && ccm_Att.IsDeleted.Value == false)) // For  attorney or medical provider company
            //                        //&& co_Att.CompanyType == 2 && (co_Att.IsDeleted.HasValue == false || (co_Att.IsDeleted.HasValue == true && co_Att.IsDeleted.Value == false))

            //                        && ccm_CS.IsOriginator == false && (ccm_CS.IsDeleted.HasValue == false || (ccm_CS.IsDeleted.HasValue == true && ccm_CS.IsDeleted.Value == false))
            //                        && (co_CS.IsDeleted.HasValue == false || (co_CS.IsDeleted.HasValue == true && co_CS.IsDeleted.Value == false))




            //                //&& (co.IsDeleted.HasValue == false || (co.IsDeleted.HasValue == true && co.IsDeleted.Value == false))


            //                select new
            //                {
            //                    CaseId = ca.Id,
            //                    OriginatorCompanyId = ccm_Ori.CompanyId,
            //                    ca.PatientId,
            //                    PatientName = us.FirstName + " " + us.MiddleName + " " + us.LastName,
            //                    ct.CaseTypeText,
            //                    cs.CaseStatusText,
            //                    LocationName = lo.Name,
            //                    ca.CarrierCaseNo,

            //                     CompanyName = ccm_Ori.CompanyId == companyId ? co_CS.Name : co_Ori.Name ,
            //                    //CompanyName = "", // ccm_Ori.CompanyId == companyId && co_Ori.CompanyType == 1 ? co_Att.Name : (ccm_Ori.CompanyId == companyId && co_Ori.CompanyType == 2 ? "" : ""),

            //                    CaseSource = ccm_Ori.CompanyId == companyId ? ca.CaseSource : co_Ori.Name,
            //                    //CaseSource =  ccm.AddedByCompanyId == companyId ? ca.CaseSource : co.Name,

            //                    ca.CreateByUserID,
            //                    ca.CreateDate,
            //                    ca.UpdateByUserID,
            //                    ca.UpdateDate
            //                }).FirstOrDefault();
          

            //if (CaseInfo == null)
            //{
            //    return new BO.ErrorObject { ErrorMessage = "No record found for this Case.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            //}
            //else
            //{
              
            //    return CaseInfo;
            //}
        }
        #endregion

        #region Get By Company Id for Ancillary
        public override object GetByCompanyIdForAncillary(int CompanyId)
        {
            var UserList1 = _context.UserCompanies.Where(p => p.CompanyID == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                  .Select(p => p.UserID)
                                                  .Distinct<int>();

            var AccList = _context.Patients.Include("User")
                                           .Where(p => (UserList1.Contains(p.Id))
                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                           .ToList<Patient>();

            var ReferralList = _context.Referrals.Include("Case")
                                                 .Include("Case.CompanyCaseConsentApprovals")
                                                 .Include("Case.Patient.User")
                                                 .Where(p => p.ToCompanyId == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                 .ToList<Referral>();
            ReferralList.RemoveAll(referral => referral.Case.CaseStatusId == 2);

            var UserList2 = ReferralList.Select(p => p.Case.Patient).ToList();

            if (AccList == null && UserList2 == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.CaseWithPatientName> lstCaseWithPatient = new List<BO.CaseWithPatientName>();
                foreach (Patient eachPatient in AccList.Union(UserList2).Distinct())
                {
                    lstCaseWithPatient.AddRange(ConvertToCaseWithPatientName<List<BO.CaseWithPatientName>, Patient>(eachPatient, CompanyId));
                }
                return lstCaseWithPatient;
            }
        }
        #endregion

        #region GetConsentList
        public override object GetConsentList(int id)
        {
            var acc = _context.Cases.Include("CaseCompanyMappings")
                                    .Include("CaseCompanyMappings.Company")
                                    .Include("CaseCompanyMappings.Company1")
                                    .Include("CompanyCaseConsentApprovals")
                                    .Include("CaseCompanyConsentDocuments")
                                    .Include("CaseCompanyConsentDocuments.MidasDocument")
                                    .Where(p => p.Id == id
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                    .FirstOrDefault<Case>();

            BO.Case acc_ = Convert<BO.Case, Case>(acc);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region Get By Company ID and DoctorId For
        public override object Get(int CompanyId, int DoctorId)
        {
            var userInCompany = _context.UserCompanies.Where(p => p.CompanyID == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.UserID);
            
            var patientInCaseMapping = _context.PatientVisits.Where(p => p.DoctorId == DoctorId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.CaseId);
            var patientWithCase = _context.Cases.Where(p => patientInCaseMapping.Contains(p.Id) && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.PatientId);

            var patientList1 = _context.Patients.Include("User").Include("Cases")
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

            if (patientList1 == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.CaseWithUserAndPatient> lstCaseWithUserAndPatient = new List<BO.CaseWithUserAndPatient>();
                foreach (Patient eachPatient in patientList1.Union(patientList2).Distinct())
                {
                    lstCaseWithUserAndPatient.AddRange(ConvertToCaseWithUserAndPatient<List<BO.CaseWithUserAndPatient>, Patient>(eachPatient, CompanyId));
                }

                return lstCaseWithUserAndPatient;
            }
        }
        #endregion

        #region GetCaseCompanies
        public override object GetCaseCompanies(int caseId)
        {
            var company1 = _context.CaseCompanyMappings.Where(p => p.CaseId == caseId
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                       .Select(p => p.Company1)
                                                       .Include("CompanyType1")
                                                       .ToList();
           
            var company2 = _context.Referrals.Where(p => p.CaseId == caseId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                             .Select(p => p.Company1)
                                             .Include("CompanyType1")
                                             .ToList();

            if (company1 == null && company2 == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.Company> lstcompany = new List<BO.Company>();

            foreach (var item in company1.Union(company2).Distinct())
            {
                BO.Company boCompany = ConvertCompany<BO.Company, Company>(item);
                if (boCompany != null)
                {
                    lstcompany.Add(boCompany);
                }
            }

            return (object)lstcompany;
        }
        #endregion

        #region GetCaseCompanies
        public override object GetOpenCaseCompaniesByPatientId(int PatientId)
        {
            var openCases = _context.Cases.Where(p => p.PatientId == PatientId && p.CaseStatusId == 1
                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                          .Select(p => p.Id);

            var company1 = _context.CaseCompanyMappings.Where(p => openCases.Contains(p.CaseId)
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                       .Select(p => /*p.Company1*/new
                                                       {
                                                           p.Company1.id,
                                                           p.Company1.Status,
                                                           p.Company1.Name,
                                                           p.Company1.CompanyType,
                                                           //p.Company1.SubscriptionPlanType,
                                                           //p.Company1.CompanyStatusTypeID,
                                                           //p.Company1.TaxID,
                                                           p.Company1.IsDeleted,
                                                           //p.Company1.CreateByUserID,
                                                           //p.Company1.CreateDate,
                                                           //p.Company1.UpdateByUserID,
                                                           //p.Company1.UpdateDate,

                                                           companyType1 = new { p.Company1.CompanyType1.id, p.Company1.CompanyType1.Name, p.Company1.CompanyType1.IsDeleted },
                                                           CompanyCaseConsentApproval = _context.CompanyCaseConsentApprovals.Where(ccca => ccca.CaseId == p.CaseId
                                                                                                            && ccca.CompanyId == p.Company1.id
                                                                                                            && (ccca.IsDeleted.HasValue == false || (ccca.IsDeleted.HasValue == true && ccca.IsDeleted.Value == false)))
                                                                                                         .Select(ccca => new {
                                                                                                             ccca.Id, ccca.CaseId, ccca. CompanyId, ccca.ConsentGivenTypeId, ccca.IsDeleted
                                                                                                         })
                                                                                                         .FirstOrDefault(),
                                                           CaseCompanyConsentDocument = _context.CaseCompanyConsentDocuments.Where(cccd => cccd.CaseId == p.CaseId
                                                                                                            && cccd.CompanyId == p.Company1.id
                                                                                                            && (cccd.IsDeleted.HasValue == false || (cccd.IsDeleted.HasValue == true && cccd.IsDeleted.Value == false)))
                                                                                                          .Select(cccd => new {
                                                                                                              cccd.Id, cccd.CaseId, cccd.CompanyId, cccd.DocumentName, cccd.DocumentType, cccd.MidasDocumentId, cccd.IsDeleted
                                                                                                          })
                                                                                                          .FirstOrDefault(),

                                                           p.CaseId
                                                       });
            //.Include("CompanyType1");

            var company2 = _context.Referrals.Where(p => openCases.Contains(p.CaseId)
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                             .Select(p => /*p.Company1*/new
                                             {
                                                 p.Company1.id,
                                                 p.Company1.Status,
                                                 p.Company1.Name,
                                                 p.Company1.CompanyType,
                                                 //p.Company1.SubscriptionPlanType,
                                                 //p.Company1.CompanyStatusTypeID,
                                                 //p.Company1.TaxID,
                                                 p.Company1.IsDeleted,
                                                 //p.Company1.CreateByUserID,
                                                 //p.Company1.CreateDate,
                                                 //p.Company1.UpdateByUserID,
                                                 //p.Company1.UpdateDate,

                                                 companyType1 = new { p.Company1.CompanyType1.id, p.Company1.CompanyType1.Name, p.Company1.CompanyType1.IsDeleted },
                                                 CompanyCaseConsentApproval = _context.CompanyCaseConsentApprovals.Where(ccca => ccca.CaseId == p.CaseId
                                                                                                            && ccca.CompanyId == p.Company1.id
                                                                                                            && (ccca.IsDeleted.HasValue == false || (ccca.IsDeleted.HasValue == true && ccca.IsDeleted.Value == false)))
                                                                                                         .Select(ccca => new {
                                                                                                             ccca.Id,
                                                                                                             ccca.CaseId,
                                                                                                             ccca.CompanyId,
                                                                                                             ccca.ConsentGivenTypeId,
                                                                                                             ccca.IsDeleted
                                                                                                         })
                                                                                                         .FirstOrDefault(),
                                                 CaseCompanyConsentDocument = _context.CaseCompanyConsentDocuments.Where(cccd => cccd.CaseId == p.CaseId
                                                                                                  && cccd.CompanyId == p.Company1.id
                                                                                                  && (cccd.IsDeleted.HasValue == false || (cccd.IsDeleted.HasValue == true && cccd.IsDeleted.Value == false)))
                                                                                                          .Select(cccd => new {
                                                                                                              cccd.Id,
                                                                                                              cccd.CaseId,
                                                                                                              cccd.CompanyId,
                                                                                                              cccd.DocumentName,
                                                                                                              cccd.DocumentType,
                                                                                                              cccd.MidasDocumentId,
                                                                                                              cccd.IsDeleted
                                                                                                          })
                                                                                                          .FirstOrDefault(),

                                                 p.CaseId
                                             });
                                             //.Include("CompanyType1");

            if (company1 == null && company2 == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            //List<BO.Company> lstcompany = new List<BO.Company>();

            //foreach (var item in company1.Union(company2).Distinct())
            //{
            //    BO.Company boCompany = ConvertCompany<BO.Company, Company>(item);
            //    if (boCompany != null)
            //    {
            //        lstcompany.Add(boCompany);
            //    }
            //}

            //return (object)lstcompany;
            return company1.Union(company2).Distinct().ToList();
        }
        #endregion

        #region Get Open Cases By Company With Patient
        public override object GetOpenCasesByCompanyWithPatient(int CompanyId)
        {
            var result = _context.CaseCompanyMappings.Where(p => p.CompanyId == CompanyId
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                     .Join(_context.Cases.Where(p => p.CaseStatusId == 1
                                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))), 
                                                           ccm => ccm.CaseId, c => c.Id, (ccm, c) => c)
                                                     .Join(_context.Patients.Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)),
                                                           c => c.PatientId, pat => pat.Id, (c, pat) => new
                                                           {
                                                               CaseId = c.Id,
                                                               PatientId = pat.Id
                                                           })
                                                     .Join(_context.Users.Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)),
                                                           caseandpatient => caseandpatient.PatientId, u => u.id, (caseandpatient, u) => new
                                                           {
                                                               CaseId = caseandpatient.CaseId,
                                                               PatientId = caseandpatient.PatientId,
                                                               CaseAndPatientName = caseandpatient.CaseId + " - " + u.FirstName + " " + u.LastName
                                                           })
                                                     .ToList();

            if (result == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return result;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
