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
    internal class PreferredMedicalProviderRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<PreferredMedicalProvider> _dbSet;
       
        #region Constructor
        public PreferredMedicalProviderRepository(MIDASGBXEntities context) : base(context)
        {
            _dbSet = context.Set<PreferredMedicalProvider>();           
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {

            PreferredMedicalProvider preferredMedicalProvider = entity as PreferredMedicalProvider;
                if (preferredMedicalProvider == null)
                    return default(T);

                BO.PreferredMedicalProvider boPreferredMedicalProvider = new BO.PreferredMedicalProvider();

            boPreferredMedicalProvider.ID = preferredMedicalProvider.Id;
            boPreferredMedicalProvider.PrefMedProviderId = preferredMedicalProvider.PrefMedProviderId;
            boPreferredMedicalProvider.CompanyId = preferredMedicalProvider.CompanyId;
            boPreferredMedicalProvider.IsCreated = preferredMedicalProvider.IsCreated;

            if (preferredMedicalProvider.Company != null)
            {
                BO.Company Company = new BO.Company();
               
                    if (preferredMedicalProvider.Company.IsDeleted == false)
                    {

                        using (CompanyRepository sr = new CompanyRepository(_context))
                        {
                        Company = sr.Convert<BO.Company, Company>(preferredMedicalProvider.Company);
                        }
                    }

                boPreferredMedicalProvider.Company = Company;
            }

            if (preferredMedicalProvider.Company1 != null)
            {
                BO.Company Company = new BO.Company();

                if (preferredMedicalProvider.Company1.IsDeleted == false)
                {

                    using (CompanyRepository sr = new CompanyRepository(_context))
                    {
                        Company = sr.Convert<BO.Company, Company>(preferredMedicalProvider.Company1);
                    }
                }

                boPreferredMedicalProvider.Company = Company;
            }

            return (T)(object)boPreferredMedicalProvider;
            


        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
           
            BO.PreferredMedicalProvider medicalProviderBO = (BO.PreferredMedicalProvider)(object)entity;
           
            var result = medicalProviderBO.Validate(medicalProviderBO);
            return result;
        }
        #endregion

        #region Save Data
        public override object Save<T>(T entity)
        {

            BO.PreferredMedicalProvider preferredMedicalProviderBO = (BO.PreferredMedicalProvider)(object)entity;
            PreferredMedicalProvider preferredMedicalProviderDB = new PreferredMedicalProvider();

            BO.Signup signUPBO = new BO.Signup();

            bool flagUser = false;

            BO.Company companyBO = preferredMedicalProviderBO.Company;
            BO.Signup prefMedProviderBO = preferredMedicalProviderBO.Signup;

            Company companyDB = new Company();
            AddressInfo addressDB = new AddressInfo();
            ContactInfo contactinfoDB = new ContactInfo();
            UserCompany userCompanyDB = new UserCompany();
            UserCompanyRole userCompanyRoleDB = new UserCompanyRole();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                bool IsEditMode = false;
                IsEditMode = (preferredMedicalProviderBO != null && preferredMedicalProviderBO.ID > 0) ? true : false;

                if (companyBO == null || (companyBO != null && companyBO.ID <= 0))
                {
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefMedProviderBO == null)
                {
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefMedProviderBO.company == null)
                {
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefMedProviderBO.user == null)
                {
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefMedProviderBO.contactInfo == null)
                {
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (_context.Companies.Any(o => o.TaxID == prefMedProviderBO.company.TaxID && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                {
                    return new BO.ErrorObject { ErrorMessage = "TaxID already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (_context.Companies.Any(o => o.Name == prefMedProviderBO.company.Name && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                {
                    return new BO.ErrorObject { ErrorMessage = "Company already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
                else if (_context.Users.Any(o => o.UserName == prefMedProviderBO.user.UserName && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                {
                    flagUser = true;
                }

                BO.Company CompanyBO = prefMedProviderBO.company;
                BO.ContactInfo ContactInfoBO = prefMedProviderBO.contactInfo;
                BO.User userBO = prefMedProviderBO.user;

                Company prefMedProvider_CompanyDB = new Company();

                prefMedProvider_CompanyDB.Name = CompanyBO.Name;
                prefMedProvider_CompanyDB.Status = System.Convert.ToByte(companyBO.Status);
                prefMedProvider_CompanyDB.CompanyType = System.Convert.ToByte(companyBO.CompanyType);
                prefMedProvider_CompanyDB.SubscriptionPlanType = System.Convert.ToByte(companyBO.SubsCriptionType);
                prefMedProvider_CompanyDB.TaxID = companyBO.TaxID;
                prefMedProvider_CompanyDB.AddressInfo = new AddressInfo();
                prefMedProvider_CompanyDB.ContactInfo = new ContactInfo() { CellPhone = ContactInfoBO.CellPhone, EmailAddress = ContactInfoBO.EmailAddress };
                prefMedProvider_CompanyDB.RegistrationComplete = false;
                prefMedProvider_CompanyDB.IsDeleted = false;
                prefMedProvider_CompanyDB.CreateByUserID = 0;
                prefMedProvider_CompanyDB.CreateDate = DateTime.UtcNow;

                _context.Companies.Add(prefMedProvider_CompanyDB);
                _context.SaveChanges();

                User userDB = new User();
                userDB.FirstName = userBO.FirstName;
                userDB.LastName = userBO.LastName;
                userDB.UserName = userBO.UserName;
                userDB.UserType = 2;
                userDB.C2FactAuthEmailEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactEmail"));
                userDB.C2FactAuthSMSEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactSMS"));
                userDB.AddressId = prefMedProvider_CompanyDB.AddressId;
                userDB.ContactInfoId = prefMedProvider_CompanyDB.ContactInfoID;
                userDB.IsDeleted = false;
                userDB.CreateByUserID = 0;
                userDB.CreateDate = DateTime.UtcNow;

                _context.Users.Add(userDB);
                _context.SaveChanges();

                UserCompany UserCompanyDB = new UserCompany();
                UserCompanyDB.UserID = userDB.id;
                UserCompanyDB.CompanyID = prefMedProvider_CompanyDB.id;
                UserCompanyDB.IsDeleted = false;
                UserCompanyDB.CreateByUserID = 0;
                UserCompanyDB.CreateDate = DateTime.UtcNow;

                _context.UserCompanies.Add(UserCompanyDB);
                _context.SaveChanges();

                BO.Role roleBO = signUPBO.role;
                UserCompanyRole UserCompanyRoleDB = new UserCompanyRole();
                UserCompanyRoleDB.User = userCompanyDB.User;
                UserCompanyRoleDB.RoleID = (int)roleBO.RoleType;
                UserCompanyRoleDB.IsDeleted = false;
                UserCompanyRoleDB.CreateDate = DateTime.UtcNow;
                UserCompanyRoleDB.CreateByUserID = 0;
                _context.UserCompanyRoles.Add(UserCompanyRoleDB);
                _context.SaveChanges();

                PreferredMedicalProvider prefMedProvider = new PreferredMedicalProvider();
                prefMedProvider.PrefMedProviderId = prefMedProvider_CompanyDB.id;
                prefMedProvider.CompanyId = companyBO.ID;
                prefMedProvider.IsCreated = true;
                prefMedProvider.IsDeleted = false;
                prefMedProvider.CreateByUserID = 0;
                prefMedProvider.CreateDate = DateTime.UtcNow;

                _context.PreferredMedicalProviders.Add(prefMedProvider);
                _context.SaveChanges();
            }


            BO.Company acc_ = Convert<BO.Company, Company>(companyDB);

            var res = (BO.GbObject)(object)acc_;
            return (object)res;
        }
        #endregion

        #region Get By Company ID
        public override object GetByCompanyId(int id)
        {
            //var preferredMedicalProviderDB = _context.PreferredMedicalProviders.Include("Company")
            //                                                                   .Include("Company1")
            //                                                                   .Where(p => p.ForCompanyId==id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))                                                                                                       
            //                                                                   .ToList<PreferredMedicalProvider>();

            BO.PreferredMedicalProvider preferredMedicalProviderBO = new BO.PreferredMedicalProvider();
            List<BO.PreferredMedicalProvider> boPreferredMedicalProvider = new List<BO.PreferredMedicalProvider>();
            //if (preferredMedicalProviderDB == null)
            //{
            //    return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            //}
            //else
            //{

            //    foreach (var EachPreferredMedicalProvider in preferredMedicalProviderDB)
            //    {
            //        boPreferredMedicalProvider.Add(Convert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(EachPreferredMedicalProvider));
            //    }

            //}

            return (object)boPreferredMedicalProvider;
        }
        #endregion

        #region Associate Medical Provider With Company
        public override object AssociateMedicalProviderWithCompany(int PrefMedProviderId, int CompanyId)
        {
            Company CompanyDB = _context.Companies.Where(p => p.id == CompanyId
                                                   && p.CompanyType == 1
                                                   && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .FirstOrDefault();

            if (CompanyDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Company dosent exists.", errorObject = "", ErrorLevel = ErrorLevel.Information };
            }

            var preferredMedicalProviderDB = _context.PreferredMedicalProviders.Where(p => p.PrefMedProviderId == PrefMedProviderId 
                                                                                                     && p.CompanyId == CompanyId 
                                                                                                     && p.Company.CompanyType == 1
                                                                                                     && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                                     .FirstOrDefault();

            BO.PreferredMedicalProvider acc_ = Convert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(preferredMedicalProviderDB);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region Get All Medical Provider Exclude Assigned
        public override object GetAllMedicalProviderExcludeAssigned(int CompanyId)
        {
            var acc = _context.PreferredMedicalProviders.Where(p => p.CompanyId == CompanyId && p.Company.CompanyType == 1 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList<PreferredMedicalProvider>();
                            
            List<BO.PreferredMedicalProvider> lstProviders = new List<BO.PreferredMedicalProvider>();

            if (acc == null) return new BO.ErrorObject { ErrorMessage = "No record found for this Company Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };

            else
            {
                acc.ForEach(item => lstProviders.Add(Convert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(item)));
            }

            return lstProviders;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
           
            PreferredMedicalProvider preferredMedicalProviderDB = _context.PreferredMedicalProviders.Include("Company")
                                                                                                    .Include("Company1").Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<PreferredMedicalProvider>();

            BO.PreferredMedicalProvider preferredMedicalProviderBO = new BO.PreferredMedicalProvider();

            if (preferredMedicalProviderDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                preferredMedicalProviderBO = Convert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(preferredMedicalProviderDB);
            }

            return (object)preferredMedicalProviderBO;
        }
        #endregion

        #region GetAll
        public override object Get()
        {
            //BO.Doctor doctorBO = (BO.Doctor)(object)entity;

            var acc_ = _context.PreferredMedicalProviders
                                                         .Include("Company")
                                                         .Include("Company1").Where(p => p.IsDeleted == false || p.IsDeleted == null).ToList<PreferredMedicalProvider>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.PreferredMedicalProvider> lstPreferredMedicalProvider = new List<BO.PreferredMedicalProvider>();
            foreach (PreferredMedicalProvider item in acc_)
            {
                lstPreferredMedicalProvider.Add(Convert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(item));
            }
            return lstPreferredMedicalProvider;
        }
        #endregion

        #region Delete
        public override object Delete(int id)
        {

            PreferredMedicalProvider preferredMedicalProviderDB = new PreferredMedicalProvider();


            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                preferredMedicalProviderDB = _context.PreferredMedicalProviders.Where(p => p.Id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault();

                if (preferredMedicalProviderDB != null)
                {
                    preferredMedicalProviderDB.IsDeleted = true;
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Medical provider details dosent exists.", ErrorLevel = ErrorLevel.Error };
                }
                dbContextTransaction.Commit();

            }
            var res = ObjectConvert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(preferredMedicalProviderDB);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
