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
            caseBO.LocationId = cases.LocationId;
            caseBO.PatientEmpInfoId = cases.PatientEmpInfoId;
            caseBO.CarrierCaseNo = cases.CarrierCaseNo;
            caseBO.Transportation = cases.Transportation;
            caseBO.CaseStatusId = cases.CaseStatusId;
            caseBO.AttorneyId = cases.AttorneyId;
            //caseBO.FileUploadPath = cases.FileUploadPath;

            caseBO.IsDeleted = cases.IsDeleted;
            caseBO.CreateByUserID = cases.CreateByUserID;
            caseBO.UpdateByUserID = cases.UpdateByUserID;

            if (cases.PatientEmpInfo != null)
            {
                if (cases.PatientEmpInfo.IsDeleted.HasValue == false || (cases.PatientEmpInfo.IsDeleted.HasValue == true && cases.PatientEmpInfo.IsDeleted.Value == false))
                {
                    BO.PatientEmpInfo boPatientEmpInfo = new BO.PatientEmpInfo();
                    using (PatientEmpInfoRepository cmp = new PatientEmpInfoRepository(_context))
                    {
                        boPatientEmpInfo = cmp.Convert<BO.PatientEmpInfo, PatientEmpInfo>(cases.PatientEmpInfo);
                        caseBO.PatientEmpInfo = boPatientEmpInfo;
                    }
                }
            }

            if (cases.Patient2 != null)
            {
                BO.Patient2 boPatient2 = new BO.Patient2();
                using (Patient2Repository cmp = new Patient2Repository(_context))
                {                    
                    boPatient2 = cmp.Convert<BO.Patient2, Patient2>(cases.Patient2);
                    caseBO.Patient2 = boPatient2;                    
                }
            }
                
            if (cases.CaseCompanyMappings != null)
            {
                List<BO.CaseCompanyMapping> boCaseCompanyMapping = new List<BO.CaseCompanyMapping>();
                foreach (var casemap in cases.CaseCompanyMappings)
                {
                    if (casemap.IsDeleted.HasValue == false || (casemap.IsDeleted.HasValue == true && casemap.IsDeleted.Value == false))
                    {
                        if (casemap != null)
                        {
                            using (CaseCompanyMappingRepository cmp = new CaseCompanyMappingRepository(_context))
                            {
                                boCaseCompanyMapping.Add(cmp.Convert<BO.CaseCompanyMapping, CaseCompanyMapping>(casemap));
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
                            referralBO.CaseId = eachRefrral.CaseId;
                            referralBO.ReferringCompanyId = eachRefrral.ReferringCompanyId;
                            referralBO.ReferringLocationId = eachRefrral.ReferringLocationId;
                            referralBO.ReferringUserId = eachRefrral.ReferringUserId;
                            referralBO.ReferredToCompanyId = eachRefrral.ReferredToCompanyId;
                            referralBO.ReferredToLocationId = eachRefrral.ReferredToLocationId;
                            referralBO.ReferredToDoctorId = eachRefrral.ReferredToDoctorId;
                            referralBO.ReferredToRoomId = eachRefrral.ReferredToRoomId;
                            referralBO.Note = eachRefrral.Note;
                            referralBO.ReferredByEmail = eachRefrral.ReferredByEmail;
                            referralBO.ReferredToEmail = eachRefrral.ReferredToEmail;
                            referralBO.ReferralAccepted = eachRefrral.ReferralAccepted;
                            referralBO.FirstName = eachRefrral.FirstName;
                            referralBO.LastName = eachRefrral.LastName;
                            referralBO.CellPhone = eachRefrral.CellPhone;
                            referralBO.IsDeleted = eachRefrral.IsDeleted;
                            referralBO.CreateByUserID = eachRefrral.CreateByUserID;
                            referralBO.UpdateByUserID = eachRefrral.UpdateByUserID;

                            BOListReferral.Add(referralBO);
                        }                                
                    }                                      
                }

                caseBO.Referrals = BOListReferral;
            }


            return (T)(object)caseBO;
        }
        #endregion

        #region Entity Conversion ConvertWithPatient
        //public T ConvertWithPatient<T, U>(U entity)
        //{
        //    Patient2 patient2 = entity as Patient2;

        //    if (patient2 == null)
        //        return default(T);

        //    BO.Patient2 patientBO2 = new BO.Patient2();

        //    patientBO2.ID = patient2.Id;

        //    BO.User boUser = new BO.User();
        //    using (UserRepository cmp = new UserRepository(_context))
        //    {
        //        boUser = cmp.Convert<BO.User, User>(patient2.User);
        //        patientBO2.User = boUser;
        //    }

        //    if (patient2.Cases != null)
        //    {
        //        patientBO2.Cases = new List<BO.Case>();

        //        foreach (var eachCase in patient2.Cases)
        //        {
        //            patientBO2.Cases.Add(Convert<BO.Case, Case>(eachCase));
        //        }
        //    }

        //    //Common 
        //    patientBO2.IsDeleted = patient2.IsDeleted;
        //    patientBO2.CreateByUserID = patient2.CreateByUserID;
        //    patientBO2.UpdateByUserID = patient2.UpdateByUserID;

        //    return (T)(object)patientBO2;
        //}
        #endregion

        #region Entity Conversion ConvertToCaseWithUserAndPatient
        public T ConvertToCaseWithUserAndPatient<T, U>(U entity, int CompanyId)
        {
            Patient2 patient2 = entity as Patient2;

            if (patient2 == null)
                return default(T);

            List<BO.CaseWithUserAndPatient> lstCaseWithUserAndPatient = new List<BO.CaseWithUserAndPatient>();

            if (patient2.User != null && patient2.Cases != null)
            {
                //foreach (var eachCase in patient2.Cases)
                foreach (var eachCase in GetByPatientId(patient2.Id) as List<BO.Case>)
                {
                    if (eachCase.CaseCompanyMappings.Any(p => p.Company != null && p.Company.ID == CompanyId) == true 
                        || (eachCase.Referrals != null && eachCase.Referrals.Any(p => p.ReferredToCompanyId == CompanyId) == true))
                    {
                        BO.CaseWithUserAndPatient caseWithUserAndPatient = new BO.CaseWithUserAndPatient();

                        caseWithUserAndPatient.ID = patient2.Id;

                        caseWithUserAndPatient.UserId = patient2.User.id;
                        caseWithUserAndPatient.UserName = patient2.User.UserName;
                        caseWithUserAndPatient.FirstName = patient2.User.FirstName;
                        caseWithUserAndPatient.MiddleName = patient2.User.MiddleName;
                        caseWithUserAndPatient.LastName = patient2.User.LastName;

                        caseWithUserAndPatient.CaseId = eachCase.ID;
                        caseWithUserAndPatient.PatientId = eachCase.PatientId;
                        caseWithUserAndPatient.CaseName = eachCase.CaseName;
                        caseWithUserAndPatient.CaseTypeId = eachCase.CaseTypeId;
                        caseWithUserAndPatient.LocationId = eachCase.LocationId;
                        caseWithUserAndPatient.PatientEmpInfoId = eachCase.PatientEmpInfoId;
                        caseWithUserAndPatient.CarrierCaseNo = eachCase.CarrierCaseNo;
                        caseWithUserAndPatient.Transportation = eachCase.Transportation;
                        caseWithUserAndPatient.CaseStatusId = eachCase.CaseStatusId;
                        caseWithUserAndPatient.AttorneyId = eachCase.AttorneyId;

                        caseWithUserAndPatient.IsDeleted = eachCase.IsDeleted;
                        caseWithUserAndPatient.CreateByUserID = eachCase.CreateByUserID;
                        caseWithUserAndPatient.UpdateByUserID = eachCase.UpdateByUserID;

                        caseWithUserAndPatient.PatientEmpInfo = eachCase.PatientEmpInfo;


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

        #region Entity Conversion GetCaseCompanies
        public override T ConvertCompany<T, U>(U entity)
        {
            Company company = entity as Company;

            if (company == null)
                return default(T);

            BO.Company boCompany = null;

            if(company != null)
            {
                boCompany = new BO.Company();

                boCompany.ID = company.id;
                boCompany.Name = company.Name;
                boCompany.TaxID = company.TaxID;
                boCompany.Status = (BO.GBEnums.AccountStatus)company.Status;
                boCompany.CompanyType = (BO.GBEnums.CompanyType)company.CompanyType;
                boCompany.SubsCriptionType = (BO.GBEnums.SubsCriptionType)company.SubscriptionPlanType;
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
            var acc = _context.Cases.Include("PatientEmpInfo")
                                    .Include("PatientEmpInfo.AddressInfo")
                                    .Include("PatientEmpInfo.ContactInfo")
                                    .Include("CaseCompanyMappings")
                                    .Include("CaseCompanyMappings.Company")
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
            var acc = _context.Cases.Include("PatientEmpInfo")
                                    .Include("PatientEmpInfo.AddressInfo")
                                    .Include("PatientEmpInfo.ContactInfo")
                                    .Include("CaseCompanyMappings")
                                    .Include("CaseCompanyMappings.Company")
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
            var caseList1 = _context.Cases.Include("PatientEmpInfo")
                                    .Include("PatientEmpInfo.AddressInfo")
                                    .Include("PatientEmpInfo.ContactInfo")
                                    .Include("CaseCompanyMappings")
                                    .Include("CaseCompanyMappings.Company")
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
                                                .Include("Case.Patient2.User")                                               
                                                .Include("Case.Patient2.User.UserCompanies")
                                                .Include("Case.Patient2.User.AddressInfo")
                                                .Include("Case.Patient2.User.ContactInfo")
                                                .Where(p => p.ReferredToCompanyId == CompanyId && p.Case.PatientId == PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))                                                 )
                                                .ToList<Referral>();

            var caseList2 = referralList.Select(p => p.Case).ToList();

            if (caseList1 == null && caseList2==null)
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
            var acc = _context.Cases.Include("PatientEmpInfo")
                                    .Include("PatientEmpInfo.AddressInfo")
                                    .Include("PatientEmpInfo.ContactInfo")
                                    .Include("CaseCompanyMappings")
                                    .Include("CaseCompanyMappings.Company")
                                    .Include("CompanyCaseConsentApprovals")
                                    .Include("CaseCompanyConsentDocuments")
                                    .Include("CaseCompanyConsentDocuments.MidasDocument")
                                    .Include("Referrals")
                                    .Where(p => p.PatientId == PatientId && p.CaseStatusId==1
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
                Patient2 patient2DB = new Patient2();
                Location locationDB = new Location();
                CaseCompanyMapping caseCompanyMappingDB = new CaseCompanyMapping();

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

                    if (IsEditMode == false && caseBO.CaseStatusId.HasValue == true && caseBO.CaseStatusId.Value == 1)
                    {
                        bool ExistingOpenCase = _context.Cases.Any(p => p.PatientId == caseBO.PatientId && p.CaseStatusId == 1
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)));
                        if (ExistingOpenCase == true)
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Open case already exists for this patient, cannot add another open case.", ErrorLevel = ErrorLevel.Error };
                        }
                    }
                    else if (IsEditMode == true && caseBO.CaseStatusId.HasValue == true && caseBO.CaseStatusId.Value == 1)
                    {
                        bool ExistinAnotherOpenCase = _context.Cases.Any(p => p.PatientId == caseBO.PatientId && p.CaseStatusId == 1 && p.Id != caseBO.ID
                                                                          && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)));
                        if (ExistinAnotherOpenCase == true)
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Open case already exists for this patient, cannot update this as open case.", ErrorLevel = ErrorLevel.Error };
                        }
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

                    //Commented, need to be implemented
                    //if (IsEditMode == false)
                    //{
                    //    Patient2 patientDB = _context.Patient2.Where(p => p.Id == caseBO.PatientId && (p.IsDeleted.HasValue == false || p.IsDeleted == false)).FirstOrDefault();
                    //    bool machCompanyAndLocation= _context.Locations.Any(p => (p.id == caseBO.LocationId && p.CompanyID == patientDB.CompanyId) &&(p.IsDeleted.HasValue == false || p.IsDeleted == false));
                    //    if (machCompanyAndLocation == false)
                    //    {
                    //        dbContextTransaction.Rollback();
                    //        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Company location for this user is invalid.", ErrorLevel = ErrorLevel.Error };
                    //    }
                    //}

                    caseDB.PatientId = caseBO.PatientId;
                    caseDB.CaseName = IsEditMode == true && caseBO.CaseName == null ? caseDB.CaseName : caseBO.CaseName;
                    caseDB.CaseTypeId = IsEditMode == true && caseBO.CaseTypeId == null ? caseDB.CaseTypeId : caseBO.CaseTypeId;
                    caseDB.LocationId = IsEditMode == true && caseBO.LocationId.HasValue==false ? caseDB.LocationId : caseBO.LocationId.Value;
                    caseDB.PatientEmpInfoId = IsEditMode == true && caseBO.PatientEmpInfoId.HasValue == false ? caseDB.PatientEmpInfoId : caseBO.PatientEmpInfoId;
                    caseDB.CarrierCaseNo = IsEditMode == true && caseBO.CarrierCaseNo == null ? caseDB.CarrierCaseNo : caseBO.CarrierCaseNo;
                    caseDB.Transportation = IsEditMode == true && caseBO.Transportation.HasValue == false ? caseDB.Transportation : caseBO.Transportation.Value;
                    caseDB.CaseStatusId = IsEditMode == true && caseBO.CaseStatusId.HasValue == false ? caseDB.CaseStatusId : caseBO.CaseStatusId.Value;
                    caseDB.AttorneyId = IsEditMode == true && caseBO.AttorneyId.HasValue == false ? caseDB.AttorneyId : caseBO.AttorneyId.Value;

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
                caseDB = _context.Cases.Include("PatientEmpInfo")
                                       .Include("PatientEmpInfo.AddressInfo")
                                       .Include("PatientEmpInfo.ContactInfo")
                                       .Include("CaseCompanyMappings")
                                       .Include("CaseCompanyMappings.Company")
                                       .Include("CompanyCaseConsentApprovals")
                                       .Include("CaseCompanyConsentDocuments")
                                       .Include("CaseCompanyConsentDocuments.MidasDocument")
                                       .Include("Referrals")
                                       .Where(p => p.Id == caseDB.Id).FirstOrDefault<Case>();
            }

            var res = Convert<BO.Case, Case>(caseDB);
            return (object)res;
        }
        #endregion

        #region AddUploadedFileData
        public override object AddUploadedFileData(int id, string FileUploadPath)
        {
            BO.Case caseBO = new BusinessObjects.Case();

            Case caseDB = new Case();

            caseDB = _context.Cases.Include("PatientEmpInfo")
                                      .Include("PatientEmpInfo.AddressInfo")
                                      .Include("PatientEmpInfo.ContactInfo")
                                      .Where(p => p.Id == id).FirstOrDefault<Case>();

            caseDB.FileUploadPath = FileUploadPath;

            _context.Entry(caseDB).State = System.Data.Entity.EntityState.Modified;
            _context.SaveChanges();

            var res = Convert<BO.Case, Case>(caseDB);
            return (object)res;
        }
        #endregion

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
            var acc = _context.Cases.Include("PatientEmpInfo")
                                    .Include("PatientEmpInfo.AddressInfo")
                                    .Include("PatientEmpInfo.ContactInfo")
                                    .Include("PatientVisit2")
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
                if(acc.PatientVisit2 != null)
                {
                    foreach (var item in acc.PatientVisit2)
                    {
                        if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                        {
                            using (PatientVisit2Repository sr = new PatientVisit2Repository(_context))
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

            var AccList = _context.Patient2.Include("User")
                                           .Where(p => (UserList1.Contains(p.Id))
                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                           .ToList<Patient2>();

            var ReferralList = _context.Referrals.Include("Case")
                                                 .Include("Case.CompanyCaseConsentApprovals")
                                                 .Include("Case.Patient2.User")
                                                 .Where(p => p.ReferredToCompanyId == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                 .ToList<Referral>();
            //ReferralList.RemoveAll(referral => referral.Case.CaseStatusId == 2);

            var UserList2 = ReferralList.Select(p => p.Case.Patient2).ToList();

            if (AccList == null && UserList2 == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.CaseWithUserAndPatient> lstCaseWithUserAndPatient = new List<BO.CaseWithUserAndPatient>();
                foreach (Patient2 eachPatient in AccList.Union(UserList2).Distinct())
                {
                    lstCaseWithUserAndPatient.AddRange(ConvertToCaseWithUserAndPatient<List<BO.CaseWithUserAndPatient>, Patient2>(eachPatient, CompanyId));
                }
                return lstCaseWithUserAndPatient;
            }
        }
        #endregion

        #region GetConsentList
        public override object GetConsentList(int id)
        {
            var acc = _context.Cases.Include("CaseCompanyMappings")
                                    .Include("CaseCompanyMappings.Company")
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
            //var patientInCaseMapping = _context.DoctorCaseConsentApprovals.Where(p => p.DoctorId == DoctorId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.CaseId);
            var patientInCaseMapping = _context.PatientVisit2.Where(p => p.DoctorId == DoctorId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.CaseId);
            var patientWithCase = _context.Cases.Where(p => patientInCaseMapping.Contains(p.Id) && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.PatientId);

            var acc = _context.Patient2.Include("User").Include("Cases")
                                       .Where(p => userInCompany.Contains(p.Id) && patientWithCase.Contains(p.Id) && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList<Patient2>();


            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.CaseWithUserAndPatient> lstCaseWithUserAndPatient = new List<BO.CaseWithUserAndPatient>();
                foreach (Patient2 eachPatient in acc)
                {
                    lstCaseWithUserAndPatient.AddRange(ConvertToCaseWithUserAndPatient<List<BO.CaseWithUserAndPatient>, Patient2>(eachPatient, CompanyId));
                }

                return lstCaseWithUserAndPatient;
            }
        }
        #endregion

        #region GetCaseCompanies
        public override object GetCaseCompanies(int caseId)
        {
            var company1 = _context.CaseCompanyMappings.Where(p => p.CaseId == caseId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p => p.Company).ToList();

            var company2 = _context.Referrals.Where(p => p.CaseId == caseId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p => p.Company).ToList();

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

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
