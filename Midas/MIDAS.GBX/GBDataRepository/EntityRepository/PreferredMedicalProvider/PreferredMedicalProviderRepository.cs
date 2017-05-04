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
            boPreferredMedicalProvider.IsDeleted = preferredMedicalProvider.IsDeleted;
            boPreferredMedicalProvider.CreateByUserID = preferredMedicalProvider.CreateByUserID;
            boPreferredMedicalProvider.UpdateByUserID = preferredMedicalProvider.UpdateByUserID;

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

                boPreferredMedicalProvider.PrefMedProvider = Company;
            }

            return (T)(object)boPreferredMedicalProvider;
        }
        #endregion

        #region New Conversion
        public T NewConvert<T, U>(U entity)
        {
            Doctor doctor = entity as Doctor;
            if (doctor == null)
                return default(T);

            BO.Doctor boDoctor = new BO.Doctor();

            boDoctor.ID = doctor.Id;
            boDoctor.LicenseNumber= doctor.LicenseNumber;
            boDoctor.NPI = doctor.NPI;
            boDoctor.Title = doctor.Title;

            if (doctor.User != null)
            {
                if (doctor.User.IsDeleted.HasValue == false || (doctor.User.IsDeleted.HasValue == true && doctor.User.IsDeleted.Value == false))
                {
                    BO.User boUser = new BO.User();
                    using (UserRepository sr = new UserRepository(_context))
                    {
                        boUser = sr.Convert<BO.User, User>(doctor.User);
                        boDoctor.user = boUser;
                    }

                    if (doctor.DoctorSpecialities != null)
                    {
                        List<BO.DoctorSpeciality> lstDoctorSpecility = new List<BO.DoctorSpeciality>();
                        foreach (var item in doctor.DoctorSpecialities)
                        {

                            if (item.IsDeleted == false)
                            {
                                using (DoctorSpecialityRepository sr = new DoctorSpecialityRepository(_context))
                                {
                                    lstDoctorSpecility.Add(sr.ObjectConvert<BO.DoctorSpeciality, DoctorSpeciality>(item));
                                }
                            }
                        }
                        boDoctor.DoctorSpecialities = lstDoctorSpecility;
                    }
                 }

            }


            return (T)(object)boDoctor;
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

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
           
            BO.PreferredMedicalProviderSignUp medicalProviderBO = (BO.PreferredMedicalProviderSignUp)(object)entity;
           
            var result = medicalProviderBO.Validate(medicalProviderBO);
            return result;
        }
        #endregion

        #region Save Data
        public override object Save<T>(T entity)
        {

            BO.PreferredMedicalProviderSignUp preferredMedicalProviderBO = (BO.PreferredMedicalProviderSignUp)(object)entity;
            PreferredMedicalProvider preferredMedicalProviderDB = new PreferredMedicalProvider();

            BO.Company companyBO = preferredMedicalProviderBO.Company;
            BO.Signup prefMedProviderBO = preferredMedicalProviderBO.Signup;

            PreferredMedicalProvider prefMedProvider = new PreferredMedicalProvider();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                bool IsEditMode = false;
                IsEditMode = (preferredMedicalProviderBO != null && preferredMedicalProviderBO.ID > 0) ? true : false;

                if (companyBO == null || (companyBO != null && companyBO.ID <= 0))
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefMedProviderBO == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefMedProviderBO.company == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefMedProviderBO.user == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefMedProviderBO.contactInfo == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (_context.Companies.Any(o => o.TaxID == prefMedProviderBO.company.TaxID && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "TaxID already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (_context.Companies.Any(o => o.Name == prefMedProviderBO.company.Name && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "Company already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
                else if (_context.Users.Any(o => o.UserName == prefMedProviderBO.user.UserName && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "User Name already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                BO.Company prefMedProviderCompanyBO = prefMedProviderBO.company;
                BO.ContactInfo ContactInfoBO = prefMedProviderBO.contactInfo;
                BO.User userBO = prefMedProviderBO.user;
                BO.Role roleBO = prefMedProviderBO.role;

                Company prefMedProvider_CompanyDB = new Company();
                AddressInfo AddressInfo = new AddressInfo();
                ContactInfo ContactInfo = new ContactInfo() { CellPhone = ContactInfoBO.CellPhone, EmailAddress = ContactInfoBO.EmailAddress };

                _context.AddressInfoes.Add(AddressInfo);
                _context.SaveChanges();

                _context.ContactInfoes.Add(ContactInfo);
                _context.SaveChanges();

                prefMedProvider_CompanyDB.Name = prefMedProviderCompanyBO.Name;
                prefMedProvider_CompanyDB.Status = System.Convert.ToByte(prefMedProviderCompanyBO.Status);
                prefMedProvider_CompanyDB.CompanyType = System.Convert.ToByte(prefMedProviderCompanyBO.CompanyType);
                prefMedProvider_CompanyDB.SubscriptionPlanType = System.Convert.ToByte(prefMedProviderCompanyBO.SubsCriptionType);
                prefMedProvider_CompanyDB.TaxID = prefMedProviderCompanyBO.TaxID;
                prefMedProvider_CompanyDB.AddressId = AddressInfo.id;
                prefMedProvider_CompanyDB.ContactInfoID = ContactInfo.id;
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

               
                UserCompanyRole UserCompanyRoleDB = new UserCompanyRole();
                UserCompanyRoleDB.UserID = userDB.id;
                UserCompanyRoleDB.RoleID = (int)roleBO.RoleType;
                UserCompanyRoleDB.IsDeleted = false;
                UserCompanyRoleDB.CreateDate = DateTime.UtcNow;
                UserCompanyRoleDB.CreateByUserID = 0;
                _context.UserCompanyRoles.Add(UserCompanyRoleDB);
                _context.SaveChanges();
                
                prefMedProvider.PrefMedProviderId = prefMedProvider_CompanyDB.id;
                prefMedProvider.CompanyId = companyBO.ID;
                prefMedProvider.IsCreated = true;
                prefMedProvider.IsDeleted = false;
                prefMedProvider.CreateByUserID = 0;
                prefMedProvider.CreateDate = DateTime.UtcNow;

                _context.PreferredMedicalProviders.Add(prefMedProvider);
                _context.SaveChanges();

                dbContextTransaction.Commit();
            }

            var result = _context.PreferredMedicalProviders.Include("Company").Include("Company1")
                                                           .Where(p => p.Id == prefMedProvider.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                           .FirstOrDefault();

            BO.PreferredMedicalProvider acc_ = Convert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(result);

            var res = (BO.GbObject)(object)acc_;
            return (object)res;
        }
        #endregion

        //#region Get By Company ID
        //public override object GetByCompanyId(int id)
        //{
        //    var medicalProvider = _context.PreferredMedicalProviders.Where(p => p.CompanyId == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
        //                                                            .ToList();

        //    List<BO.PreferredMedicalProvider> lstprovider = new List<BO.PreferredMedicalProvider>();

        //    if (medicalProvider == null)
        //    {
        //        return new BO.ErrorObject { ErrorMessage = "No record found for this companyId.", errorObject = "", ErrorLevel = ErrorLevel.Error };
        //    }
        //    else
        //    {
        //       medicalProvider.ForEach(item => lstprovider.Add(Convert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(item)));
        //    }

        //    return lstprovider;
        //}
        //#endregion

        #region Get By Company ID
        public override object GetByCompanyId(int id)
        {
            var medicalProvider = _context.PreferredMedicalProviders.Where(p => p.CompanyId == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                   .Select(p => p.PrefMedProviderId)
                                                                                .ToList();

            var Company = _context.Companies.Where(p => medicalProvider.Contains(p.id) && p.RegistrationComplete == true && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                       .Select(p => p.id)   
                                                                       .ToList();

            var User = _context.UserCompanies.Where(p => Company.Contains(p.CompanyID) && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                 .Select(p => p.UserID)
                                                                 .ToList();

            var doctor = _context.Doctors.Where(p => User.Contains(p.Id) && p.IsCalendarPublic == true && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                         .ToList();

            List<BO.Doctor> doctorList = new List<BO.Doctor>();

            if (doctor == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                doctor.ForEach(item => doctorList.Add(NewConvert<BO.Doctor, Doctor>(item)));
            }

            return doctorList;
        }
        #endregion

        #region Get By PrefMedProvider Id
        public override object GetByPrefMedProviderId(int PrefMedProviderId)
        {
            var medicalProvider = _context.PreferredMedicalProviders.Where(p => p.PrefMedProviderId == PrefMedProviderId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                    .ToList();

            List<BO.PreferredMedicalProvider> lstprovider = new List<BO.PreferredMedicalProvider>();

            if (medicalProvider == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this preferred Medcial Provider Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                medicalProvider.ForEach(item => lstprovider.Add(Convert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(item)));
            }

            return lstprovider;
        }
        #endregion

        #region Associate Medical Provider With Company
        public override object AssociateMedicalProviderWithCompany(int PrefMedProviderId, int CompanyId)
        {
            Company CompanyDB = _context.Companies.Where(p => p.id == CompanyId
                                                   && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .FirstOrDefault();

            if (CompanyDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Company dosent exists.", errorObject = "", ErrorLevel = ErrorLevel.Information };
            }

            Company PrefMedProviderCompanyDB = _context.Companies.Where(p => p.id == PrefMedProviderId
                                                   && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .FirstOrDefault();

            if (PrefMedProviderCompanyDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "PrefMedProvider Company dosent exists.", errorObject = "", ErrorLevel = ErrorLevel.Information };
            }

            var preferredMedicalProviderDB = _context.PreferredMedicalProviders.Where(p => p.PrefMedProviderId == PrefMedProviderId && p.CompanyId == CompanyId 
                                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                               .FirstOrDefault();

            bool IsAddPreferredMedicalProvider = false;
            if (preferredMedicalProviderDB == null)
            {
                preferredMedicalProviderDB = new PreferredMedicalProvider();
                IsAddPreferredMedicalProvider = true;
            }

            preferredMedicalProviderDB.PrefMedProviderId = PrefMedProviderId;
            preferredMedicalProviderDB.CompanyId = CompanyId;
            preferredMedicalProviderDB.IsCreated = false;
            preferredMedicalProviderDB.IsDeleted = false;

            if (IsAddPreferredMedicalProvider == true)
            {
                _context.PreferredMedicalProviders.Add(preferredMedicalProviderDB);
            }

            _context.SaveChanges();

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
            var AssignedMedicalProvider = _context.PreferredMedicalProviders.Where(p => p.CompanyId == CompanyId
                                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                            .Select(p => p.PrefMedProviderId);

            var companies = _context.Companies.Where(p => AssignedMedicalProvider.Contains(p.id) == false
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
            List<BO.PreferredMedicalProviderSignUp> lstPreferredMedicalProvider = new List<BO.PreferredMedicalProviderSignUp>();
            foreach (PreferredMedicalProvider item in acc_)
            {
                lstPreferredMedicalProvider.Add(Convert<BO.PreferredMedicalProviderSignUp, PreferredMedicalProvider>(item));
            }
            return lstPreferredMedicalProvider;
        }
        #endregion

        #region Delete
        public override object Delete(int id)
        {

            PreferredMedicalProvider preferredMedicalProviderDB = new PreferredMedicalProvider();

            preferredMedicalProviderDB = _context.PreferredMedicalProviders.Where(p => p.Id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault();

            if (preferredMedicalProviderDB != null)
            {
                preferredMedicalProviderDB.IsDeleted = true;
                _context.SaveChanges();
            }
            else
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Medical provider details dosen't exists.", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(preferredMedicalProviderDB);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
