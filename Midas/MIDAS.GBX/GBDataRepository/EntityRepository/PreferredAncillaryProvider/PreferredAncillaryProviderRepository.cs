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
    internal class PreferredAncillaryProviderRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<PreferredMedicalProvider> _dbSet;
       
        #region Constructor
        public PreferredAncillaryProviderRepository(MIDASGBXEntities context) : base(context)
        {
            _dbSet = context.Set<PreferredMedicalProvider>();           
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {

            PreferredAncillaryProvider preferredAncillaryProvider = entity as PreferredAncillaryProvider;
            if (preferredAncillaryProvider == null)
                return default(T);

            BO.PreferredAncillarProvider boPreferredAncillaryProvider = new BO.PreferredAncillarProvider();

            boPreferredAncillaryProvider.ID = preferredAncillaryProvider.Id;
            boPreferredAncillaryProvider.PrefMedProviderId = preferredAncillaryProvider.PrefAncillaryProviderId;
            boPreferredAncillaryProvider.CompanyId = preferredAncillaryProvider.CompanyId;
            boPreferredAncillaryProvider.IsCreated = preferredAncillaryProvider.IsCreated;
            boPreferredAncillaryProvider.IsDeleted = preferredAncillaryProvider.IsDeleted;
            boPreferredAncillaryProvider.CreateByUserID = preferredAncillaryProvider.CreateByUserID;
            boPreferredAncillaryProvider.UpdateByUserID = preferredAncillaryProvider.UpdateByUserID;

            if (preferredAncillaryProvider.Company != null)
            {
                BO.Company Company = new BO.Company();
               
                if (preferredAncillaryProvider.Company.IsDeleted.HasValue == false 
                    || (preferredAncillaryProvider.Company.IsDeleted.HasValue == true && preferredAncillaryProvider.Company.IsDeleted.Value == false))
                {
                    using (CompanyRepository sr = new CompanyRepository(_context))
                    {
                        Company = sr.Convert<BO.Company, Company>(preferredAncillaryProvider.Company);
                        Company.Locations = null;
                    }
                }

                boPreferredAncillaryProvider.Company = Company;
            }

            if (preferredAncillaryProvider.Company1 != null)
            {
                BO.Company Company = new BO.Company();

                if (preferredAncillaryProvider.Company1.IsDeleted.HasValue == false 
                    || (preferredAncillaryProvider.Company1.IsDeleted.HasValue == true && preferredAncillaryProvider.Company1.IsDeleted.Value == false))
                {
                    using (CompanyRepository sr = new CompanyRepository(_context))
                    {
                        Company = sr.Convert<BO.Company, Company>(preferredAncillaryProvider.Company1);
                        Company.Locations = null;
                    }
                }

                boPreferredAncillaryProvider.PrefMedProvider = Company;
            }

            return (T)(object)boPreferredAncillaryProvider;
        }
        #endregion

        #region Entity Conversion
        public T ConvertToPreferredProvider<T, U>(U entity)
        {
            if (entity is BO.PreferredMedicalProvider)
            {
                BO.PreferredMedicalProvider PreferredMedicalProviderBO = entity as BO.PreferredMedicalProvider;
                if (PreferredMedicalProviderBO == null)
                    return default(T);

                BO.PreferredProvider PreferredProviderBO = new BO.PreferredProvider();

                PreferredProviderBO.ID = PreferredMedicalProviderBO.ID;
                PreferredProviderBO.PrefProviderId = PreferredMedicalProviderBO.PrefMedProviderId;
                PreferredProviderBO.CompanyId = PreferredMedicalProviderBO.CompanyId;
                PreferredProviderBO.IsCreated = PreferredMedicalProviderBO.IsCreated;
                PreferredProviderBO.IsDeleted = PreferredMedicalProviderBO.IsDeleted;
                PreferredProviderBO.CreateByUserID = PreferredMedicalProviderBO.CreateByUserID;
                PreferredProviderBO.UpdateByUserID = PreferredMedicalProviderBO.UpdateByUserID;

                if (PreferredMedicalProviderBO.Company != null)
                {
                    PreferredProviderBO.Company = PreferredMedicalProviderBO.Company;
                }

                if (PreferredMedicalProviderBO.PrefMedProvider != null)
                {
                    PreferredProviderBO.PrefProvider = PreferredMedicalProviderBO.PrefMedProvider;
                }

                return (T)(object)PreferredProviderBO;
            }
            else if (entity is BO.PreferredAttorneyProvider)
            {
                BO.PreferredAttorneyProvider PreferredAttorneyProviderBO = entity as BO.PreferredAttorneyProvider;
                if (PreferredAttorneyProviderBO == null)
                    return default(T);

                BO.PreferredProvider PreferredProviderBO = new BO.PreferredProvider();

                PreferredProviderBO.ID = PreferredAttorneyProviderBO.ID;
                PreferredProviderBO.PrefProviderId = PreferredAttorneyProviderBO.PrefAttorneyProviderId;
                PreferredProviderBO.CompanyId = PreferredAttorneyProviderBO.CompanyId;
                PreferredProviderBO.IsCreated = PreferredAttorneyProviderBO.IsCreated;
                PreferredProviderBO.IsDeleted = PreferredAttorneyProviderBO.IsDeleted;
                PreferredProviderBO.CreateByUserID = PreferredAttorneyProviderBO.CreateByUserID;
                PreferredProviderBO.UpdateByUserID = PreferredAttorneyProviderBO.UpdateByUserID;

                if (PreferredAttorneyProviderBO.Company != null)
                {
                    PreferredProviderBO.Company = PreferredAttorneyProviderBO.Company;
                }

                if (PreferredAttorneyProviderBO.PrefAttorneyProvider != null)
                {
                    PreferredProviderBO.PrefProvider = PreferredAttorneyProviderBO.PrefAttorneyProvider;
                }

                return (T)(object)PreferredProviderBO;
            }

            return default(T);
        }
        #endregion

        #region New Conversion
        public T ConvertPreferredAncillaryCompany<T, U>(U entity)
        {
            Company company = entity as Company;
            if (company == null)
                return default(T);

            BO.PreferredAncillaryCompany PreferredAncillaryCompanyBO = new BO.PreferredAncillaryCompany();

            PreferredAncillaryCompanyBO.ID = company.id;
            PreferredAncillaryCompanyBO.Name = company.Name;
            //PreferredAncillaryCompanyBO.RegistrationComplete = company.RegistrationComplete;
            PreferredAncillaryCompanyBO.IsDeleted = company.IsDeleted;
            PreferredAncillaryCompanyBO.CreateByUserID = company.CreateByUserID;
            PreferredAncillaryCompanyBO.UpdateByUserID = company.UpdateByUserID;


            return (T)(object)PreferredAncillaryCompanyBO;
        }
        #endregion
        
        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
           
            BO.PreferredAncillarProviderSignUp ancillaryProviderBO = (BO.PreferredAncillarProviderSignUp)(object)entity;
           
            var result = ancillaryProviderBO.Validate(ancillaryProviderBO);
            return result;
        }
        #endregion

        #region Save Data
        public override object Save<T>(T entity)
        {

            BO.PreferredAncillarProviderSignUp preferredAncillaryProviderBO = (BO.PreferredAncillarProviderSignUp)(object)entity;
            PreferredAncillaryProvider preferredAncillaryProviderDB = new PreferredAncillaryProvider();

            BO.Company companyBO = preferredAncillaryProviderBO.Company;
            BO.Signup prefAncProviderBO = preferredAncillaryProviderBO.Signup;

            PreferredAncillaryProvider prefAncProvider = new PreferredAncillaryProvider();
            Guid invitationDB_UniqueID = Guid.NewGuid();
            User userDB = new User();
            UserCompany UserCompanyDB = new UserCompany();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                bool IsEditMode = false;
                IsEditMode = (preferredAncillaryProviderBO != null && preferredAncillaryProviderBO.ID > 0) ? true : false;

                if (companyBO == null || (companyBO != null && companyBO.ID <= 0))
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefAncProviderBO == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefAncProviderBO.company == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefAncProviderBO.user == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (prefAncProviderBO.contactInfo == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "No Record Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                //if (_context.Companies.Any(o => o.TaxID == prefAncProviderBO.company.TaxID && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                //{
                //    dbContextTransaction.Rollback();
                //    return new BO.ErrorObject { ErrorMessage = "TaxID already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                //}

                if (_context.Companies.Any(o => o.Name == prefAncProviderBO.company.Name && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "Company already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
                else if (_context.Users.Any(o => o.UserName == prefAncProviderBO.user.UserName && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "User Name already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                BO.Company prefAncillaryProviderCompanyBO = prefAncProviderBO.company;
                BO.ContactInfo ContactInfoBO = prefAncProviderBO.contactInfo;
                BO.User userBO = prefAncProviderBO.user;
                BO.Role roleBO = prefAncProviderBO.role;

                Company prefAncProvider_CompanyDB = new Company();
                AddressInfo AddressInfo = new AddressInfo();
                ContactInfo ContactInfo = new ContactInfo() { CellPhone = ContactInfoBO.CellPhone, EmailAddress = ContactInfoBO.EmailAddress };

                _context.AddressInfoes.Add(AddressInfo);
                _context.SaveChanges();

                _context.ContactInfoes.Add(ContactInfo);
                _context.SaveChanges();

                if (prefAncillaryProviderCompanyBO.SubsCriptionType != null)
                {
                    prefAncProvider_CompanyDB.SubscriptionPlanType = System.Convert.ToByte(prefAncillaryProviderCompanyBO.SubsCriptionType);
                }
                else
                {
                    prefAncProvider_CompanyDB.SubscriptionPlanType = null;
                }
                prefAncProvider_CompanyDB.Name = prefAncillaryProviderCompanyBO.Name;
                prefAncProvider_CompanyDB.Status = System.Convert.ToByte(prefAncillaryProviderCompanyBO.Status);
                prefAncProvider_CompanyDB.CompanyType = System.Convert.ToByte(prefAncillaryProviderCompanyBO.CompanyType);
             
               // prefAncProvider_CompanyDB.TaxID = prefAncillaryProviderCompanyBO.TaxID;
                prefAncProvider_CompanyDB.AddressId = AddressInfo.id;
                prefAncProvider_CompanyDB.ContactInfoID = ContactInfo.id;
                prefAncProvider_CompanyDB.BlobStorageTypeId = 1;
                prefAncProvider_CompanyDB.CompanyStatusTypeID = 1;
                prefAncProvider_CompanyDB.IsDeleted = false;
                prefAncProvider_CompanyDB.CreateByUserID = prefAncillaryProviderCompanyBO.CreateByUserID;
                prefAncProvider_CompanyDB.UpdateByUserID = prefAncillaryProviderCompanyBO.UpdateByUserID;
                prefAncProvider_CompanyDB.CreateDate = DateTime.UtcNow;

                _context.Companies.Add(prefAncProvider_CompanyDB);
                _context.SaveChanges();

                
                userDB.FirstName = userBO.FirstName;
                userDB.LastName = userBO.LastName;
                userDB.UserName = userBO.UserName;
                userDB.UserType = 5;
                userDB.C2FactAuthEmailEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactEmail"));
                userDB.C2FactAuthSMSEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactSMS"));
                userDB.AddressId = prefAncProvider_CompanyDB.AddressId;
                userDB.ContactInfoId = prefAncProvider_CompanyDB.ContactInfoID;
                userDB.IsDeleted = false;
                userDB.CreateByUserID = 0;
                userDB.CreateDate = DateTime.UtcNow;

                _context.Users.Add(userDB);
                _context.SaveChanges();
              
                UserCompanyDB.UserID = userDB.id;
                UserCompanyDB.CompanyID = prefAncProvider_CompanyDB.id;
                UserCompanyDB.IsDeleted = false;
                UserCompanyDB.CreateByUserID = 0;
                UserCompanyDB.CreateDate = DateTime.UtcNow;
                UserCompanyDB.IsAccepted = true;
                UserCompanyDB.UserStatusID = 1;

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

                prefAncProvider.PrefAncillaryProviderId = prefAncProvider_CompanyDB.id;
                prefAncProvider.CompanyId = companyBO.ID;
                prefAncProvider.IsCreated = true;
                prefAncProvider.IsDeleted = false;
                prefAncProvider.CreateByUserID = prefAncProvider_CompanyDB.CreateByUserID;
                prefAncProvider.UpdateByUserID = prefAncProvider_CompanyDB.UpdateByUserID;
                prefAncProvider.CreateDate = DateTime.UtcNow;

                _context.PreferredAncillaryProviders.Add(prefAncProvider);
                _context.SaveChanges();

                dbContextTransaction.Commit();
            }

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

            try
            {
                #region Send Email

                var CurrentUser = _context.Users.Where(p => p.id == prefAncProvider.CreateByUserID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<User>();
                var CurrentCompanyId= _context.UserCompanies.Where(p => p.UserID == CurrentUser.id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2=>p2.CompanyID).FirstOrDefault();
                var CurrentCompany = _context.Companies.Where(p => p.id == CurrentCompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                if (CurrentUser != null)
                {
                    if (CurrentUser.UserType == 3)
                    {

                        //var patient = _context.Users.Where(p => p.id == caseDB.PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                       // var medicalprovider = _context.CaseCompanyMappings.Where(p => p.CaseId == caseDB.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.CompanyId).FirstOrDefault();
                        var medicalprovider_UserId = _context.UserCompanies.Where(p => p.CompanyID == prefAncProvider.PrefAncillaryProviderId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.UserID).FirstOrDefault();
                        var ancillaryprovider_user = _context.Users.Where(p => p.id == medicalprovider_UserId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();



                        if (ancillaryprovider_user != null )
                        {

                            var PreferredMedicalAddByAttorney = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "PreferredAncillaryAddByAttorney".ToUpper()).FirstOrDefault();
                            //var attorneyTemplate = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "AttorneyTemplate".ToUpper()).FirstOrDefault();
                            //var patientCaseTemplate = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "PatientCaseTemplateByAttorney".ToUpper()).FirstOrDefault();
                            if (PreferredMedicalAddByAttorney == null )
                            {
                                return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                            }
                            else
                            {


                                #region Send mail to anillary provider
                                string VarificationLink1 = "<a href='" + Utility.GetConfigValue("AncillaryVerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("AncillaryVerificationLink") + "/" + invitationDB_UniqueID + "</a>";
                                string msg1 = PreferredMedicalAddByAttorney.EmailBody;
                                string subject1 = PreferredMedicalAddByAttorney.EmailSubject;

                                string message1 = string.Format(msg1, ancillaryprovider_user.FirstName, CurrentUser.FirstName, CurrentCompany.Name, VarificationLink1);

                                BO.Email objEmail1 = new BO.Email { ToEmail = ancillaryprovider_user.UserName, Subject = subject1, Body = message1 };
                                objEmail1.SendMail();
                                #endregion

                                //#region Send mail to patient
                                //string LoginLink2 = "<a href='http://www.patient.codearray.tk/#/account/login'>http://www.patient.codearray.tk/#/account/login </a>";
                                //string msg2 = patientCaseTemplate.EmailBody;
                                //string subject2 = patientCaseTemplate.EmailSubject;

                                //string message2 = string.Format(msg2, patient.FirstName, CurrentUser.FirstName, medicalprovider_user.FirstName, LoginLink2);

                                //BO.Email objEmail2 = new BO.Email { ToEmail = patient.UserName, Subject = subject2, Body = message2 };
                                //objEmail2.SendMail();
                                



                            }

                        }


                    }
                    else if (CurrentUser.UserType == 2 || CurrentUser.UserType == 4)
                    {
                  
                        var medicalprovider_UserId = _context.UserCompanies.Where(p => p.CompanyID == prefAncProvider.PrefAncillaryProviderId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.UserID).FirstOrDefault();
                        var ancillaryprovider_user = _context.Users.Where(p => p.id == medicalprovider_UserId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                        if (ancillaryprovider_user != null)
                        {

                            var PreferredMedicalAddByProvider = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "PreferredAncillaryAddByMedProvider".ToUpper()).FirstOrDefault();
                           
                            if (PreferredMedicalAddByProvider == null)
                            {
                                return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                            }
                            else
                            {


                                #region Send mail to ancillary provider
                                string VarificationLink1 = "<a href='" + Utility.GetConfigValue("AncillaryVerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("AncillaryVerificationLink") + "/" + invitationDB_UniqueID + "</a>";
                                string msg1 = PreferredMedicalAddByProvider.EmailBody;
                                string subject1 = PreferredMedicalAddByProvider.EmailSubject;

                                string message1 = string.Format(msg1, ancillaryprovider_user.FirstName, CurrentUser.FirstName, CurrentCompany.Name, VarificationLink1);

                                BO.Email objEmail1 = new BO.Email { ToEmail = ancillaryprovider_user.UserName, Subject = subject1, Body = message1 };
                                objEmail1.SendMail();
                                #endregion

                            }

                        }
                    }
                }

              

                #endregion
            }
            catch (Exception ex) { }

            var result = _context.PreferredAncillaryProviders.Include("Company").Include("Company1")
                                                           .Where(p => p.Id == prefAncProvider.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                           .FirstOrDefault();

            BO.PreferredAncillarProvider acc_ = Convert<BO.PreferredAncillarProvider, PreferredAncillaryProvider>(result);

            var res = (BO.GbObject)(object)acc_;
            return (object)res;
        }
        #endregion
        
        #region Get By Company ID
        public override object GetByCompanyId(int id)
        {
            var medicalProvider = _context.PreferredMedicalProviders.Where(p => p.CompanyId == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                    .ToList();

            List<BO.PreferredMedicalProvider> lstprovider = new List<BO.PreferredMedicalProvider>();

            if (medicalProvider == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this companyId.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                medicalProvider.ForEach(item => lstprovider.Add(Convert<BO.PreferredMedicalProvider, PreferredMedicalProvider>(item)));
            }

            return lstprovider;
        }
        #endregion
        
        #region Associate Medical Provider With Company
        public override object AssociateAncillaryProviderWithCompany(int PrefAncillaryProviderId, int CompanyId)
        {
            Company CompanyDB = _context.Companies.Where(p => p.id == CompanyId
                                                   && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .FirstOrDefault();

            if (CompanyDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Company dosent exists.", errorObject = "", ErrorLevel = ErrorLevel.Information };
            }

            Company PrefAncillaryProviderCompanyDB = _context.Companies.Where(p => p.id == PrefAncillaryProviderId
                                                   && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .FirstOrDefault();

            if (PrefAncillaryProviderCompanyDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "PrefAncillaryProvider Company dosent exists.", errorObject = "", ErrorLevel = ErrorLevel.Information };
            }

            var preferredAncillaryProviderDB = _context.PreferredAncillaryProviders.Where(p => p.PrefAncillaryProviderId == PrefAncillaryProviderId && p.CompanyId == CompanyId 
                                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                               .FirstOrDefault();

            if (preferredAncillaryProviderDB != null)
            {
                return new BO.ErrorObject { ErrorMessage = "PrefAncillaryProviderId Company already associated with this company.", errorObject = "", ErrorLevel = ErrorLevel.Information };
            }

            bool IsAddPreferredAncillaryProvider = false;
            if (preferredAncillaryProviderDB == null)
            {
                preferredAncillaryProviderDB = new PreferredAncillaryProvider();
                IsAddPreferredAncillaryProvider = true;
            }

            preferredAncillaryProviderDB.PrefAncillaryProviderId = PrefAncillaryProviderId;
            preferredAncillaryProviderDB.CompanyId = CompanyId;
            preferredAncillaryProviderDB.IsCreated = false;
            preferredAncillaryProviderDB.IsDeleted = false;

            if (IsAddPreferredAncillaryProvider == true)
            {
                _context.PreferredAncillaryProviders.Add(preferredAncillaryProviderDB);
            }

            _context.SaveChanges();

            BO.PreferredAncillarProvider acc_ = Convert<BO.PreferredAncillarProvider, PreferredAncillaryProvider>(preferredAncillaryProviderDB);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region Get All Ancillary Provider Exclude Assigned
        public override object GetAllPrefAncillaryProviderExcludeAssigned(int CompanyId)
        {
            var AssignedPrefAncillaryProviderId = _context.PreferredAncillaryProviders.Where(p => p.CompanyId == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                            .Select(p => p.PrefAncillaryProviderId);

            var companies = _context.Companies.Where(p => AssignedPrefAncillaryProviderId.Contains(p.id)==false
                                               && p.CompanyType == 6 
                                               && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                              .OrderBy(x=> x.Name)
                                              .ToList();

            
                            
            List<BO.PreferredAncillaryCompany> lstPreferredAncillaryCompany = new List<BO.PreferredAncillaryCompany>();

            if (companies == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                companies.ForEach(item => lstPreferredAncillaryCompany.Add(ConvertPreferredAncillaryCompany<BO.PreferredAncillaryCompany, Company>(item)));
            }

            return lstPreferredAncillaryCompany;
        }
        #endregion

        #region Get Ancillary Provider By Company ID 
        public override object GetPrefAncillaryProviderByCompanyId(int CompanyId)
        {
            var AncillaryProvider = _context.PreferredAncillaryProviders.Include("Company")
                                                                      .Include("Company1")
                                                                      .Where(p => p.CompanyId == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                      .OrderBy(p => p.Company1.Name)
                                                                      .ToList();

            List<BO.PreferredAncillarProvider> lstprovider = new List<BO.PreferredAncillarProvider>();

            if (AncillaryProvider == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this companyId.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                AncillaryProvider.ForEach(item => lstprovider.Add(Convert<BO.PreferredAncillarProvider, PreferredAncillaryProvider>(item)));
            }

            return lstprovider;
        }
        #endregion

        #region Get Ancillary Provider By Company ID 
        public override object GetPrefProviderByAncillaryCompanyId(int AncillaryCompanyId)
        {
            List<BO.PreferredMedicalProvider> lstPreferredMedicalProvider = new List<BO.PreferredMedicalProvider>();

            using (PreferredMedicalProviderRepository PrefMedProvRepo = new PreferredMedicalProviderRepository(_context))
            {
                var result = PrefMedProvRepo.GetByCompanyId(AncillaryCompanyId);

                if (!(result is BO.ErrorObject))
                {
                    lstPreferredMedicalProvider = result as List<BO.PreferredMedicalProvider>;
                }
            }

            List<BO.PreferredAttorneyProvider> lstPreferredAttorneyProvider = new List<BO.PreferredAttorneyProvider>();

            using (PreferredAttorneyProviderRepository PrefAttProvRepo = new PreferredAttorneyProviderRepository(_context))
            {
                var result = PrefAttProvRepo.GetPrefAttorneyProviderByCompanyId(AncillaryCompanyId);

                if (!(result is BO.ErrorObject))
                {
                    lstPreferredAttorneyProvider = result as List<BO.PreferredAttorneyProvider>;
                }
            }

            List<BO.PreferredProvider> lstPreferredProvider = new List<BO.PreferredProvider>();

            if (lstPreferredMedicalProvider != null && lstPreferredMedicalProvider.Count > 0)
            {
                lstPreferredMedicalProvider.ForEach(item => lstPreferredProvider.Add(ConvertToPreferredProvider<BO.PreferredProvider, BO.PreferredMedicalProvider>(item)));
            }

            if (lstPreferredAttorneyProvider != null && lstPreferredAttorneyProvider.Count > 0)
            {
                lstPreferredAttorneyProvider.ForEach(item => lstPreferredProvider.Add(ConvertToPreferredProvider<BO.PreferredProvider, BO.PreferredAttorneyProvider>(item)));
            }            

            return lstPreferredAttorneyProvider;
        }
        #endregion
        
        #region Delete
        public override object Delete(int id)
        {

            PreferredAncillaryProvider preferredAncillaryProviderDB = new PreferredAncillaryProvider();

            preferredAncillaryProviderDB = _context.PreferredAncillaryProviders.Where(p => p.Id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault();

            if (preferredAncillaryProviderDB != null)
            {
                preferredAncillaryProviderDB.IsDeleted = true;
                _context.SaveChanges();
            }
            else
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Ancillary provider details dosen't exists.", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.PreferredAncillarProvider, PreferredAncillaryProvider>(preferredAncillaryProviderDB);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
