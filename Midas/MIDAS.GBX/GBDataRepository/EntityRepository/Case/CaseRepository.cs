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
            caseBO.FileUploadPath = cases.FileUploadPath;

            caseBO.IsDeleted = cases.IsDeleted;
            caseBO.CreateByUserID = cases.CreateByUserID;
            caseBO.UpdateByUserID = cases.UpdateByUserID;

            BO.PatientEmpInfo boPatientEmpInfo = new BO.PatientEmpInfo();
            using (PatientEmpInfoRepository cmp = new PatientEmpInfoRepository(_context))
            {
               
                boPatientEmpInfo = cmp.Convert<BO.PatientEmpInfo, PatientEmpInfo>(cases.PatientEmpInfo);
                caseBO.PatientEmpInfo = boPatientEmpInfo;
            }

            BO.Patient2 boPatient2 = new BO.Patient2();
            using (Patient2Repository cmp = new Patient2Repository(_context))
            {

                boPatient2 = cmp.Convert<BO.Patient2, Patient2>(cases.Patient2);
                caseBO.Patient2 = boPatient2;
            }


            List<BO.CaseCompanyMapping> boCaseCompanyMapping = new List<BO.CaseCompanyMapping>();
            foreach (var casemap in cases.CaseCompanyMappings)
            {
                using (CaseCompanyMappingRepository cmp = new CaseCompanyMappingRepository(_context))
                {
                    boCaseCompanyMapping.Add(cmp.Convert<BO.CaseCompanyMapping, CaseCompanyMapping>(casemap));
                }
            }
            caseBO.CaseCompanyMappings = boCaseCompanyMapping;

            return (T)(object)caseBO;
        }
        #endregion

        #region Entity Conversion
        public T ConvertWithPatient<T, U>(U entity)
        {
            Patient2 patient2 = entity as Patient2;

            if (patient2 == null)
                return default(T);

            BO.Patient2 patientBO2 = new BO.Patient2();

            patientBO2.ID = patient2.Id;
            
            BO.User boUser = new BO.User();
            using (UserRepository cmp = new UserRepository(_context))
            {
                boUser = cmp.Convert<BO.User, User>(patient2.User);
                patientBO2.User = boUser;
            }

            if (patient2.Cases != null)
            {
                patientBO2.Cases = new List<BO.Case>();

                foreach (var eachCase in patient2.Cases)
                {
                    patientBO2.Cases.Add(Convert<BO.Case, Case>(eachCase));
                }
            }

            //Common 
            patientBO2.IsDeleted = patient2.IsDeleted;
            patientBO2.CreateByUserID = patient2.CreateByUserID;
            patientBO2.UpdateByUserID = patient2.UpdateByUserID;

            return (T)(object)patientBO2;
        }
        #endregion

        #region Entity Conversion
        public T ConvertToCaseWithUserAndPatient<T, U>(U entity)
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

                    //BO.PatientEmpInfo boPatientEmpInfo = new BO.PatientEmpInfo();
                    using (PatientEmpInfoRepository cmp = new PatientEmpInfoRepository(_context))
                    {

                        //boPatientEmpInfo = cmp.Convert<BO.PatientEmpInfo, PatientEmpInfo>(eachCase.PatientEmpInfo);
                        //caseWithUserAndPatient.PatientEmpInfo = boPatientEmpInfo;
                        caseWithUserAndPatient.PatientEmpInfo = eachCase.PatientEmpInfo;
                    }

                    //Common 
                    caseWithUserAndPatient.IsDeleted = eachCase.IsDeleted;
                    caseWithUserAndPatient.CreateByUserID = eachCase.CreateByUserID;
                    caseWithUserAndPatient.UpdateByUserID = eachCase.UpdateByUserID;

                    lstCaseWithUserAndPatient.Add(caseWithUserAndPatient);
                }                
            }            

            return (T)(object)lstCaseWithUserAndPatient;
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
                Document.Add("fileUploadPath", acc_.FileUploadPath);
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
                                    .Where(p => p.Id == id
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                    .FirstOrDefault<Case>();
            if (acc != null)
            {
                //if (acc.PatientEmpInfo != null)
                //{
                //    acc.PatientEmpInfo.IsDeleted = true;
                //}
                //else
                //{
                //    return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                //}
                //if (acc.PatientEmpInfo.AddressInfo != null)
                //{
                //    acc.PatientEmpInfo.AddressInfo.IsDeleted = true;
                //}
                //else
                //{
                //    return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                //}
                //if (acc.PatientEmpInfo.ContactInfo != null)
                //{
                //    acc.PatientEmpInfo.ContactInfo.IsDeleted = true;
                //}
                //else
                //{
                //    return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                //}

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
            var User = _context.UserCompanies.Where(p => p.CompanyID == CompanyId && p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                        .Select(p => p.UserID)
                                        .Distinct<int>();

            var acc = _context.Patient2.Include("User")
                                       .Where(p =>  (User.Contains(p.Id))
                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                    .ToList<Patient2>();


            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.CaseWithUserAndPatient> lstCaseWithUserAndPatient = new List<BO.CaseWithUserAndPatient>();
                foreach (Patient2 eachPatient in acc)
                {
                    lstCaseWithUserAndPatient.AddRange(ConvertToCaseWithUserAndPatient<List<BO.CaseWithUserAndPatient>, Patient2>(eachPatient));
                }

                return lstCaseWithUserAndPatient;
            }            
        }
        #endregion


        #region Get By Company ID and DoctorId For
        public override object Get(int CompanyId,int DoctorId)
        {
            var userInCompany = _context.UserCompanies.Where(p => p.CompanyID == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.UserID);
            var patientInCaseMapping = _context.DoctorCaseConsentApprovals.Where(p => p.DoctorId == DoctorId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.CaseId);
            var patientWithCase = _context.Cases.Where(p => patientInCaseMapping.Contains(p.Id) && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.PatientId);

            var acc = _context.Patient2.Include("User")
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
                    lstCaseWithUserAndPatient.AddRange(ConvertToCaseWithUserAndPatient<List<BO.CaseWithUserAndPatient>, Patient2>(eachPatient));
                }

                return lstCaseWithUserAndPatient;
            }
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
