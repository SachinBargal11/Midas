#region Imports
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Newtonsoft.Json.Linq;
using MIDAS.GBX.EntityRepository;
using MIDAS.GBX.DataRepository.Model;
using BO = MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.EN;
using MIDAS.GBX.Common;

#endregion

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class PreferredAttorneyProviderRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<PreferredAttorneyProvider> _dbSet;

        #region Constructor
        public PreferredAttorneyProviderRepository(MIDASGBXEntities context) : base(context)
        {
            _dbSet = context.Set<PreferredAttorneyProvider>();
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.PreferredAttorneyProviderSignUp attorneyProviderBO = (BO.PreferredAttorneyProviderSignUp)(object)entity;
            var result = attorneyProviderBO.Validate(attorneyProviderBO);
            return result;
        }
        #endregion

        #region Company Conversion
        public T CompanyConvert<T, U>(U entity)
        {
            Company company = entity as Company;
            if (company == null)
                return default(T);

            BO.Company boCompany = new BO.Company();

            boCompany.ID = company.id;
            boCompany.Name = company.Name;
            boCompany.TaxID = company.TaxID;
            boCompany.Status = (BO.GBEnums.AccountStatus)company.Status;
            boCompany.CompanyType = (BO.GBEnums.CompanyType)company.CompanyType;
            boCompany.SubsCriptionType = (BO.GBEnums.SubsCriptionType)company.SubscriptionPlanType;
            boCompany.RegistrationComplete = company.RegistrationComplete;
            boCompany.IsDeleted = company.IsDeleted;
            boCompany.CreateByUserID = company.CreateByUserID;
            boCompany.UpdateByUserID = company.UpdateByUserID;


            return (T)(object)boCompany;
        }
        #endregion

        #region Convert
        public override T Convert<T, U>(U entity)
        {

            PreferredAttorneyProvider preferredAttorneyProvider = entity as PreferredAttorneyProvider;
            if (preferredAttorneyProvider == null)
                return default(T);

            BO.PreferredAttorneyProvider boPreferredAttorneyProvider = new BO.PreferredAttorneyProvider();

            boPreferredAttorneyProvider.ID = preferredAttorneyProvider.Id;
            boPreferredAttorneyProvider.PrefAttorneyProviderId = preferredAttorneyProvider.PrefAttorneyProviderId;
            boPreferredAttorneyProvider.CompanyId = preferredAttorneyProvider.CompanyId;
            boPreferredAttorneyProvider.IsCreated = preferredAttorneyProvider.IsCreated;
            boPreferredAttorneyProvider.IsDeleted = preferredAttorneyProvider.IsDeleted;
            boPreferredAttorneyProvider.CreateByUserID = preferredAttorneyProvider.CreateByUserID;
            boPreferredAttorneyProvider.UpdateByUserID = preferredAttorneyProvider.UpdateByUserID;

            if (preferredAttorneyProvider.Company != null)
            {
                BO.Company Company = new BO.Company();

                if (preferredAttorneyProvider.Company.IsDeleted.HasValue == false
                    || (preferredAttorneyProvider.Company.IsDeleted.HasValue == true && preferredAttorneyProvider.Company.IsDeleted.Value == false))
                {
                    using (CompanyRepository sr = new CompanyRepository(_context))
                    {
                        Company = sr.Convert<BO.Company, Company>(preferredAttorneyProvider.Company);
                        Company.Locations = null;
                    }
                }

                boPreferredAttorneyProvider.Company = Company;
            }

            if (preferredAttorneyProvider.Company1 != null)
            {
                BO.Company Company = new BO.Company();

                if (preferredAttorneyProvider.Company1.IsDeleted.HasValue == false
                    || (preferredAttorneyProvider.Company1.IsDeleted.HasValue == true && preferredAttorneyProvider.Company1.IsDeleted.Value == false))
                {
                    using (CompanyRepository sr = new CompanyRepository(_context))
                    {
                        Company = sr.Convert<BO.Company, Company>(preferredAttorneyProvider.Company1);
                        Company.Locations = null;
                    }
                }

                boPreferredAttorneyProvider.PrefAttorneyProvider = Company;
            }

            return (T)(object)boPreferredAttorneyProvider;
        }
        #endregion

        #region Save Data
        public override object Save<T>(T entity)
        {

            BO.PreferredAttorneyProviderSignUp preferredAttorneyProviderBO = (BO.PreferredAttorneyProviderSignUp)(object)entity;
            PreferredAttorneyProvider preferredMedicalProviderDB = new PreferredAttorneyProvider();

            BO.Company companyBO = preferredAttorneyProviderBO.Company;
            BO.Signup prefAttProviderBO = preferredAttorneyProviderBO.Signup;

            PreferredAttorneyProvider prefAttProvider = new PreferredAttorneyProvider();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                bool IsEditMode = false;
                IsEditMode = (preferredAttorneyProviderBO != null && preferredAttorneyProviderBO.ID > 0) ? true : false;

                if (companyBO == null || (companyBO != null && companyBO.ID <= 0))
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefAttProviderBO == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefAttProviderBO.company == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefAttProviderBO.user == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefAttProviderBO.contactInfo == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (_context.Companies.Any(o => o.TaxID == prefAttProviderBO.company.TaxID && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "TaxID already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (_context.Companies.Any(o => o.Name == prefAttProviderBO.company.Name && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "Company already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
                else if (_context.Users.Any(o => o.UserName == prefAttProviderBO.user.UserName && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "User Name already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                BO.Company prefAttProviderCompanyBO = prefAttProviderBO.company;
                BO.ContactInfo ContactInfoBO = prefAttProviderBO.contactInfo;
                BO.User userBO = prefAttProviderBO.user;
                BO.Role roleBO = prefAttProviderBO.role;

                Company prefAttProvider_CompanyDB = new Company();
                AddressInfo AddressInfo = new AddressInfo();
                ContactInfo ContactInfo = new ContactInfo() { CellPhone = ContactInfoBO.CellPhone, EmailAddress = ContactInfoBO.EmailAddress };

                _context.AddressInfoes.Add(AddressInfo);
                _context.SaveChanges();

                _context.ContactInfoes.Add(ContactInfo);
                _context.SaveChanges();

                prefAttProvider_CompanyDB.Name = prefAttProviderCompanyBO.Name;
                prefAttProvider_CompanyDB.Status = System.Convert.ToByte(prefAttProviderCompanyBO.Status);
                prefAttProvider_CompanyDB.CompanyType = System.Convert.ToByte(prefAttProviderCompanyBO.CompanyType);
                prefAttProvider_CompanyDB.SubscriptionPlanType = System.Convert.ToByte(prefAttProviderCompanyBO.SubsCriptionType);
                prefAttProvider_CompanyDB.TaxID = prefAttProviderCompanyBO.TaxID;
                prefAttProvider_CompanyDB.AddressId = AddressInfo.id;
                prefAttProvider_CompanyDB.ContactInfoID = ContactInfo.id;
                prefAttProvider_CompanyDB.RegistrationComplete = false;
                prefAttProvider_CompanyDB.IsDeleted = false;
                prefAttProvider_CompanyDB.CreateByUserID = 0;
                prefAttProvider_CompanyDB.CreateDate = DateTime.UtcNow;

                _context.Companies.Add(prefAttProvider_CompanyDB);
                _context.SaveChanges();

                User userDB = new User();
                userDB.FirstName = userBO.FirstName;
                userDB.LastName = userBO.LastName;
                userDB.UserName = userBO.UserName;
                userDB.UserType = 3;
                userDB.C2FactAuthEmailEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactEmail"));
                userDB.C2FactAuthSMSEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactSMS"));
                userDB.AddressId = prefAttProvider_CompanyDB.AddressId;
                userDB.ContactInfoId = prefAttProvider_CompanyDB.ContactInfoID;
                userDB.IsDeleted = false;
                userDB.CreateByUserID = 0;
                userDB.CreateDate = DateTime.UtcNow;

                _context.Users.Add(userDB);
                _context.SaveChanges();

                UserCompany UserCompanyDB = new UserCompany();
                UserCompanyDB.UserID = userDB.id;
                UserCompanyDB.CompanyID = prefAttProvider_CompanyDB.id;
                UserCompanyDB.IsDeleted = false;
                UserCompanyDB.CreateByUserID = 0;
                UserCompanyDB.CreateDate = DateTime.UtcNow;

                _context.UserCompanies.Add(UserCompanyDB);
                _context.SaveChanges();


                UserCompanyRole UserCompanyRoleDB = new UserCompanyRole();
                UserCompanyRoleDB.UserID = userDB.id;
                UserCompanyRoleDB.RoleID = (int)roleBO.RoleType;
                UserCompanyRoleDB.IsDeleted = false;
                UserCompanyRoleDB.CreateDate = DateTime.UtcNow;
                UserCompanyRoleDB.CreateByUserID = 0;
                _context.UserCompanyRoles.Add(UserCompanyRoleDB);
                _context.SaveChanges();

                prefAttProvider.PrefAttorneyProviderId = prefAttProvider_CompanyDB.id;
                prefAttProvider.CompanyId = companyBO.ID;
                prefAttProvider.IsCreated = true;
                prefAttProvider.IsDeleted = false;
                prefAttProvider.CreateByUserID = 0;
                prefAttProvider.CreateDate = DateTime.UtcNow;

                _context.PreferredAttorneyProviders.Add(prefAttProvider);
                _context.SaveChanges();

                dbContextTransaction.Commit();
            }

            var result = _context.PreferredAttorneyProviders.Include("Company").Include("Company1")
                                                           .Where(p => p.Id == prefAttProvider.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                           .FirstOrDefault();

            BO.PreferredAttorneyProvider acc_ = Convert<BO.PreferredAttorneyProvider, PreferredAttorneyProvider>(result);

            var res = (BO.GbObject)(object)acc_;
            return (object)res;
        }
        #endregion

        #region Associate Attorney Provider With Company
        public override object AssociatePrefAttorneyProviderWithCompany(int PrefAttorneyProviderId, int CompanyId)
        {
            Company CompanyDB = _context.Companies.Where(p => p.id == CompanyId
                                                   && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .FirstOrDefault();

            if (CompanyDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Company dosent exists.", errorObject = "", ErrorLevel = ErrorLevel.Information };
            }

            Company AttorneyProviderCompanyDB = _context.Companies.Where(p => p.id == PrefAttorneyProviderId
                                                         && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                        .FirstOrDefault();

            if (AttorneyProviderCompanyDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "AttorneyProvider Company dosent exists.", errorObject = "", ErrorLevel = ErrorLevel.Information };
            }

            var AttorneyProviderDB = _context.PreferredAttorneyProviders.Where(p => p.PrefAttorneyProviderId == PrefAttorneyProviderId && p.CompanyId == CompanyId
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                               .FirstOrDefault();

            bool AttorneyProvider = false;
            if (AttorneyProviderDB == null)
            {
                AttorneyProviderDB = new PreferredAttorneyProvider();
                AttorneyProvider = true;
            }

            AttorneyProviderDB.PrefAttorneyProviderId = PrefAttorneyProviderId;
            AttorneyProviderDB.CompanyId = CompanyId;
            AttorneyProviderDB.IsDeleted = false;

            if (AttorneyProvider == true)
            {
                _context.PreferredAttorneyProviders.Add(AttorneyProviderDB);
            }

            _context.SaveChanges();

            BO.PreferredAttorneyProvider acc_ = Convert<BO.PreferredAttorneyProvider, PreferredAttorneyProvider>(AttorneyProviderDB);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region Get All Attorney Provider Exclude Assigned
        public override object GetAllPrefAttorneyProviderExcludeAssigned(int CompanyId)
        {
            var AssignedPrefAttorneyProvider = _context.PreferredAttorneyProviders.Where(p => p.CompanyId == CompanyId
                                                                      && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                      .Select(p => p.PrefAttorneyProviderId);

            var companies = _context.Companies.Where(p => AssignedPrefAttorneyProvider.Contains(p.id) == false
                                               && p.CompanyType == 2
                                               && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                              .ToList();



            List<BO.Company> lstCompany = new List<BO.Company>();

            if (companies == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                companies.ForEach(item => lstCompany.Add(CompanyConvert<BO.Company, Company>(item)));
            }

            return lstCompany;
        }
        #endregion

        #region Get Attorney Provider By Company ID 
        public override object GetPrefAttorneyProviderByCompanyId(int CompanyId)
        {
            var AttorenyProvider = _context.PreferredAttorneyProviders.Include("Company")
                                                                      .Include("Company1")
                                                                      .Where(p => p.CompanyId == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                       .ToList();

            List<BO.PreferredAttorneyProvider> lstprovider = new List<BO.PreferredAttorneyProvider>();

            if (AttorenyProvider == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this companyId.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                AttorenyProvider.ForEach(item => lstprovider.Add(Convert<BO.PreferredAttorneyProvider, PreferredAttorneyProvider>(item)));
            }

            return lstprovider;
        }
        #endregion


        #region Get Attorney Provider By PreferredAttorneyProvider Id
        public override object Get(int Id)
        {
            var AttorenyProvider = _context.PreferredAttorneyProviders.Include("Company")
                                                                      .Include("Company1")
                                                                      .Where(p => p.PrefAttorneyProviderId == Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                       .ToList();

            List<BO.PreferredAttorneyProvider> lstprovider = new List<BO.PreferredAttorneyProvider>();

            if (AttorenyProvider == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this companyId.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                AttorenyProvider.ForEach(item => lstprovider.Add(Convert<BO.PreferredAttorneyProvider, PreferredAttorneyProvider>(item)));
            }

            return lstprovider;
        }
        #endregion 

        #region Delete
        public override object Delete(int id)
        {

            PreferredAttorneyProvider preferredAttProviderDB = new PreferredAttorneyProvider();

            preferredAttProviderDB = _context.PreferredAttorneyProviders.Where(p => p.Id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault();

            if (preferredAttProviderDB != null)
            {
                preferredAttProviderDB.IsDeleted = true;
                _context.SaveChanges();
            }
            else
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Medical provider details dosen't exists.", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.PreferredAttorneyProvider, PreferredAttorneyProvider>(preferredAttProviderDB);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
