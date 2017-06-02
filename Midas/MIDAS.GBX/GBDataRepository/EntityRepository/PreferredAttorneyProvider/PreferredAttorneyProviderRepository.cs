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

        #region New Conversion
        public T ConvertPreferredAttorneyProviderSignUp<T, U>(U entity)
        {
            PreferredAttorneyProvider preferredAttorneyProviderr = entity as PreferredAttorneyProvider;
            if (preferredAttorneyProviderr == null)
                return default(T);

            BO.PreferredAttorneyProviderSignUp PreferredAttorneyProviderSignUpBO = new BO.PreferredAttorneyProviderSignUp();

            PreferredAttorneyProviderSignUpBO.ID = preferredAttorneyProviderr.Id;
            PreferredAttorneyProviderSignUpBO.PrefAttorneyProviderId = preferredAttorneyProviderr.PrefAttorneyProviderId;
            PreferredAttorneyProviderSignUpBO.CompanyId = preferredAttorneyProviderr.CompanyId;
            PreferredAttorneyProviderSignUpBO.IsCreated = preferredAttorneyProviderr.IsCreated;

            PreferredAttorneyProviderSignUpBO.Signup = new BO.Signup();
            if (preferredAttorneyProviderr.Company1 != null)
            {
                if (preferredAttorneyProviderr.Company1.IsDeleted.HasValue == false || (preferredAttorneyProviderr.Company1.IsDeleted.HasValue == true && preferredAttorneyProviderr.Company1.IsDeleted.Value == false))
                {
                    BO.Company boCompany = new BO.Company();
                    using (CompanyRepository sr = new CompanyRepository(_context))
                    {
                        boCompany = sr.Convert<BO.Company, Company>(preferredAttorneyProviderr.Company1);

                        PreferredAttorneyProviderSignUpBO.Signup.company = boCompany;
                    }
                }
            }

            if (preferredAttorneyProviderr.Company1.ContactInfo != null)
            {

                BO.ContactInfo boContactInfo = new BO.ContactInfo();
                boContactInfo.Name = preferredAttorneyProviderr.Company1.ContactInfo.Name;
                boContactInfo.CellPhone = preferredAttorneyProviderr.Company1.ContactInfo.CellPhone;
                boContactInfo.EmailAddress = preferredAttorneyProviderr.Company1.ContactInfo.EmailAddress;
                boContactInfo.HomePhone = preferredAttorneyProviderr.Company1.ContactInfo.HomePhone;
                boContactInfo.WorkPhone = preferredAttorneyProviderr.Company1.ContactInfo.WorkPhone;
                boContactInfo.FaxNo = preferredAttorneyProviderr.Company1.ContactInfo.FaxNo;
                boContactInfo.CreateByUserID = preferredAttorneyProviderr.Company1.ContactInfo.CreateByUserID;
                boContactInfo.ID = preferredAttorneyProviderr.Company1.ContactInfo.id;
                boContactInfo.OfficeExtension = preferredAttorneyProviderr.Company1.ContactInfo.OfficeExtension;
                boContactInfo.AlternateEmail = preferredAttorneyProviderr.Company1.ContactInfo.AlternateEmail;
                boContactInfo.PreferredCommunication = preferredAttorneyProviderr.Company1.ContactInfo.PreferredCommunication;

                PreferredAttorneyProviderSignUpBO.Signup.contactInfo = boContactInfo;

            }

            if (preferredAttorneyProviderr.Company1.UserCompanies != null)
            {
                BO.User lstUser = new BO.User();
                if (preferredAttorneyProviderr.Company1.UserCompanies.Count >= 1)
                {
                    var item = preferredAttorneyProviderr.Company1.UserCompanies.FirstOrDefault();

                    if (item.IsDeleted.HasValue == false || (item.IsDeleted.HasValue == true && item.IsDeleted.Value == false))
                    {
                        var userDB = _context.Users.Where(p => p.id == item.UserID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                   .FirstOrDefault();

                        using (UserRepository sr = new UserRepository(_context))
                        {
                            BO.User BOUser = new BO.User();
                            BOUser = sr.Convert<BO.User, User>(userDB);
                            BOUser.UserCompanies = null;
                            BOUser.ContactInfo = null;
                            BOUser.AddressInfo = null;
                            BOUser.Roles = null;

                            lstUser = BOUser;
                        }
                    }
                }

                PreferredAttorneyProviderSignUpBO.Signup.user = lstUser;
            }

            return (T)(object)PreferredAttorneyProviderSignUpBO;
        }
        #endregion

        #region Save Data
        public override object Save<T>(T entity)
        {

            BO.PreferredAttorneyProviderSignUp preferredAttorneyProviderBO = (BO.PreferredAttorneyProviderSignUp)(object)entity;
            PreferredAttorneyProvider preferredMedicalProviderDB = new PreferredAttorneyProvider();

            BO.Company companyBO = preferredAttorneyProviderBO.Company;
            BO.Signup prefAttProviderBO = preferredAttorneyProviderBO.Signup;
            Guid invitationDB_UniqueID = Guid.NewGuid();
            User userDB = new User();
            UserCompany UserCompanyDB = new UserCompany();

            PreferredAttorneyProvider prefAttProvider = new PreferredAttorneyProvider();
            bool IsEditMode = false;
            IsEditMode = (preferredAttorneyProviderBO != null && preferredAttorneyProviderBO.ID > 0) ? true : false;

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
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
                prefAttProvider_CompanyDB.BlobStorageTypeId = 1;
                prefAttProvider_CompanyDB.RegistrationComplete = false;
                prefAttProvider_CompanyDB.IsDeleted = false;
                prefAttProvider_CompanyDB.CreateByUserID = prefAttProviderCompanyBO.CreateByUserID;
                prefAttProvider_CompanyDB.UpdateByUserID = prefAttProviderCompanyBO.UpdateByUserID;
                prefAttProvider_CompanyDB.CreateDate = DateTime.UtcNow;

                _context.Companies.Add(prefAttProvider_CompanyDB);
                _context.SaveChanges();

                
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

                
                UserCompanyDB.UserID = userDB.id;
                UserCompanyDB.CompanyID = prefAttProvider_CompanyDB.id;
                UserCompanyDB.IsDeleted = false;
                UserCompanyDB.CreateByUserID = 0;
                UserCompanyDB.CreateDate = DateTime.UtcNow;
                UserCompanyDB.IsAccepted = true;

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
                prefAttProvider.CreateByUserID = prefAttProvider_CompanyDB.CreateByUserID;
                prefAttProvider.UpdateByUserID = prefAttProvider_CompanyDB.UpdateByUserID;
                prefAttProvider.CreateDate = DateTime.UtcNow;

                _context.PreferredAttorneyProviders.Add(prefAttProvider);
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
            if (IsEditMode == false)
            {
                try
                {
                    #region Send Email

                    #region Send Email

                    var CurrentUser = _context.Users.Where(p => p.id == prefAttProvider.CreateByUserID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault<User>();
                    var CurrentCompanyId = _context.UserCompanies.Where(p => p.UserID == CurrentUser.id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.CompanyID).FirstOrDefault();
                    var CurrentCompany = _context.Companies.Where(p => p.id == CurrentCompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                    if (CurrentUser != null)
                    {
                        if (CurrentUser.UserType == 3)
                        {

                            //var patient = _context.Users.Where(p => p.id == caseDB.PatientId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                            // var medicalprovider = _context.CaseCompanyMappings.Where(p => p.CaseId == caseDB.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.CompanyId).FirstOrDefault();
                            var attorneyprovider_UserId = _context.UserCompanies.Where(p => p.CompanyID == prefAttProvider.PrefAttorneyProviderId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.UserID).FirstOrDefault();
                            var attorneyprovider_user = _context.Users.Where(p => p.id == attorneyprovider_UserId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();



                            if (attorneyprovider_user != null)
                            {

                                var PreferredAttorneyAddByAttorney = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "PreferredAttorneyAddByAttorney".ToUpper()).FirstOrDefault();                               
                                if (PreferredAttorneyAddByAttorney == null)
                                {
                                    return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                                }
                                else
                                {


                                    #region Send mail to attorney
                                    string VarificationLink1 = "<a href='" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "</a>";
                                    string msg1 = PreferredAttorneyAddByAttorney.EmailBody;
                                    string subject1 = PreferredAttorneyAddByAttorney.EmailSubject;

                                    string message1 = string.Format(msg1, attorneyprovider_user.FirstName, CurrentUser.FirstName, CurrentCompany.Name, VarificationLink1);

                                    BO.Email objEmail1 = new BO.Email { ToEmail = attorneyprovider_user.UserName, Subject = subject1, Body = message1 };
                                    objEmail1.SendMail();
                                    #endregion

                                  
                                }

                            }


                        }
                        else if (CurrentUser.UserType == 2 || CurrentUser.UserType == 4)
                        {                          
                            var attorneyprovider_UserId = _context.UserCompanies.Where(p => p.CompanyID == prefAttProvider.PrefAttorneyProviderId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.UserID).FirstOrDefault();
                            var attorneyprovider_user = _context.Users.Where(p => p.id == attorneyprovider_UserId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();



                            if (attorneyprovider_user != null)
                            {

                                var PreferredAttorneyAddByProvider = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "PreferredAttorneyAddByProvider".ToUpper()).FirstOrDefault();
                                if (PreferredAttorneyAddByProvider == null)
                                {
                                    return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                                }
                                else
                                {


                                    #region Send mail to attorney
                                    string VarificationLink1 = "<a href='" + Utility.GetConfigValue("AttorneyVerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("AttorneyVerificationLink") + "/" + invitationDB_UniqueID + "</a>";
                                    string msg1 = PreferredAttorneyAddByProvider.EmailBody;
                                    string subject1 = PreferredAttorneyAddByProvider.EmailSubject;

                                    string message1 = string.Format(msg1, attorneyprovider_user.FirstName, CurrentUser.FirstName, CurrentCompany.Name, VarificationLink1);

                                    BO.Email objEmail1 = new BO.Email { ToEmail = attorneyprovider_user.UserName, Subject = subject1, Body = message1 };
                                    objEmail1.SendMail();
                                    #endregion


                                }

                            }
                        }
                    }

                   

                    #endregion

                    //var userId = _context.UserCompanies.Where(p => p.CompanyID == prefAttProvider.PrefAttorneyProviderId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.UserID).ToList();

                    //var userBO = _context.Users.Where(p => userId.Contains(p.id) && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                    //if (userBO != null)
                    //{
                    //    var mailTemplateDB = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "PrefAttorneyProviderCreated".ToUpper()).FirstOrDefault();
                    //    if (mailTemplateDB == null)
                    //    {
                    //        return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    //    }
                    //    else
                    //    {
                    //        #region Insert Invitation
                    //        Invitation invitationDB = new Invitation();
                    //        invitationDB.User = userDB;

                    //        invitationDB_UniqueID = Guid.NewGuid();
                    //        invitationDB.UniqueID = invitationDB_UniqueID;
                    //        invitationDB.CompanyID = UserCompanyDB.CompanyID != 0 ? UserCompanyDB.CompanyID : 0;
                    //        invitationDB.CreateDate = DateTime.UtcNow;
                    //        invitationDB.CreateByUserID = userDB.id;
                    //        _context.Invitations.Add(invitationDB);
                    //        _context.SaveChanges();
                    //        #endregion

                    //        string VerificationLink = "<a href='" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "</a>";
                    //        string msg = mailTemplateDB.EmailBody;
                    //        string subject = mailTemplateDB.EmailSubject;

                    //        string message = string.Format(msg, userBO.FirstName, userBO.UserName, VerificationLink);

                    //        BO.Email objEmail = new BO.Email { ToEmail = userBO.UserName, Subject = subject, Body = message };
                    //        objEmail.SendMail();
                    //    }
                    //}

                    #endregion
                }
                catch (Exception ex) { }

            }
            else
            {
                #region Send Email

                var userId = _context.UserCompanies.Where(p => p.CompanyID == prefAttProvider.PrefAttorneyProviderId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.UserID).ToList();

                var userBO = _context.Users.Where(p => userId.Contains(p.id) && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                if (userBO != null)
                {
                    var mailTemplateDB = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "PrefAttorneyProviderUpdated".ToUpper()).FirstOrDefault();
                    if (mailTemplateDB == null)
                    {
                        return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                       

                        //string VerificationLink = "<a href='" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "</a>";
                        string LoginLink2 = "<a href='http://www.patient.codearray.tk/#/account/login'>http://www.patient.codearray.tk/#/account/login </a>";
                        string msg = mailTemplateDB.EmailBody;
                        string subject = mailTemplateDB.EmailSubject;

                        string message = string.Format(msg, userBO.FirstName, userBO.UserName, LoginLink2);

                        BO.Email objEmail = new BO.Email { ToEmail = userBO.UserName, Subject = subject, Body = message };
                        objEmail.SendMail();
                    }
                }

                #endregion

            }
            var result = _context.PreferredAttorneyProviders.Include("Company").Include("Company1")
                                                           .Where(p => p.Id == prefAttProvider.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                           .FirstOrDefault();

            BO.PreferredAttorneyProvider acc_ = Convert<BO.PreferredAttorneyProvider, PreferredAttorneyProvider>(result);

            var res = (BO.GbObject)(object)acc_;
            return (object)res;
        }
        #endregion

        #region Update Attorney Provider
        public override object UpdateAttorneyProvider<T>(T entity)
        {

            BO.PreferredAttorneyProviderSignUp preferredÀttorneyProviderBO = (BO.PreferredAttorneyProviderSignUp)(object)entity;
            PreferredAttorneyProvider preferredAttorneyProviderDB = new PreferredAttorneyProvider();

            BO.Signup prefAttProviderBO = preferredÀttorneyProviderBO.Signup;
            //BO.Company company = preferredÀttorneyProviderBO.Company;
            PreferredAttorneyProvider prefAttProvider = new PreferredAttorneyProvider();

            Guid invitationDB_UniqueID = Guid.NewGuid();
            User userDB = new User();
            Company prefAttProvider_CompanyDB = new Company();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
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

                if (_context.Companies.Any(o => o.TaxID == prefAttProviderBO.company.TaxID && o.id != prefAttProviderBO.company.ID
                    && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "TaxID already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                if (_context.Companies.Any(o => o.Name == prefAttProviderBO.company.Name && o.id != prefAttProviderBO.company.ID
                    && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "Company already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
                else if (_context.Users.Any(o => o.UserName == prefAttProviderBO.user.UserName && o.id != prefAttProviderBO.user.ID
                    && (o.IsDeleted.HasValue == false || (o.IsDeleted.HasValue == true && o.IsDeleted.Value == false))))
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "User Name already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                BO.Company prefAttProviderCompanyBO = prefAttProviderBO.company;
                BO.ContactInfo ContactInfoBO = prefAttProviderBO.contactInfo;
                BO.User userBO = prefAttProviderBO.user;
                BO.Role roleBO = prefAttProviderBO.role;

                prefAttProvider_CompanyDB = _context.Companies.Where(p => p.id == prefAttProviderCompanyBO.ID
                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                      .FirstOrDefault();

                if (prefAttProvider_CompanyDB == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "Company Record Not Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                prefAttProvider_CompanyDB.Name = prefAttProviderCompanyBO.Name;
                prefAttProvider_CompanyDB.Status = System.Convert.ToByte(prefAttProviderCompanyBO.Status);
                prefAttProvider_CompanyDB.CompanyType = System.Convert.ToByte(prefAttProviderCompanyBO.CompanyType);
                prefAttProvider_CompanyDB.SubscriptionPlanType = System.Convert.ToByte(prefAttProviderCompanyBO.SubsCriptionType);
                prefAttProvider_CompanyDB.TaxID = prefAttProviderCompanyBO.TaxID;
                prefAttProvider_CompanyDB.AddressId = prefAttProvider_CompanyDB.AddressId;
                prefAttProvider_CompanyDB.ContactInfoID = prefAttProvider_CompanyDB.ContactInfoID;
                prefAttProvider_CompanyDB.RegistrationComplete = false;
                prefAttProvider_CompanyDB.IsDeleted = false;
                prefAttProvider_CompanyDB.UpdateByUserID = 0;
                prefAttProvider_CompanyDB.UpdateDate = DateTime.UtcNow;

                _context.SaveChanges();


                ContactInfo ContactInfo = _context.ContactInfoes.Where(p => p.id == ContactInfoBO.ID
                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                      .FirstOrDefault();

                if (ContactInfo == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "Contact Record Not Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                ContactInfo.CellPhone = ContactInfoBO.CellPhone;
                ContactInfo.EmailAddress = ContactInfoBO.EmailAddress;

                _context.SaveChanges();


                userDB = _context.Users.Where(p => p.id == userBO.ID
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                            .FirstOrDefault();

                if (userDB == null)
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { ErrorMessage = "User Record Not Found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }

                userDB.FirstName = userBO.FirstName;
                userDB.LastName = userBO.LastName;
                userDB.UserName = userBO.UserName;
                userDB.UserType = 2;
                userDB.C2FactAuthEmailEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactEmail"));
                userDB.C2FactAuthSMSEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactSMS"));
                userDB.AddressId = prefAttProvider_CompanyDB.AddressId;
                userDB.ContactInfoId = prefAttProvider_CompanyDB.ContactInfoID;
                userDB.IsDeleted = false;
                userDB.CreateByUserID = 0;
                userDB.CreateDate = DateTime.UtcNow;

                _context.SaveChanges();

                prefAttProvider.PrefAttorneyProviderId = prefAttProviderBO.company.ID;
                prefAttProvider.CompanyId = preferredÀttorneyProviderBO.CompanyId;
                prefAttProvider.IsCreated = true;
                prefAttProvider.IsDeleted = false;
                prefAttProvider.CreateByUserID = prefAttProvider_CompanyDB.CreateByUserID;
                prefAttProvider.UpdateByUserID = prefAttProvider_CompanyDB.UpdateByUserID;
                prefAttProvider.CreateDate = DateTime.UtcNow;

                _context.PreferredAttorneyProviders.Add(prefAttProvider);
                _context.SaveChanges();

                dbContextTransaction.Commit();
            }

            try
            {
                #region Send Email

                var userId = _context.UserCompanies.Where(p => p.CompanyID == prefAttProvider.PrefAttorneyProviderId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.UserID).ToList();

                var userBO = _context.Users.Where(p => userId.Contains(p.id) && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                //var userBO = _context.Users.Where(p => p.id == caseDB.AttorneyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

                if (userBO != null)
                {
                    var mailTemplateDB = _context.MailTemplates.Where(x => x.TemplateName.ToUpper() == "PrefAttorneyProviderUpdated".ToUpper()).FirstOrDefault();
                    if (mailTemplateDB == null)
                    {
                        return new BO.ErrorObject { ErrorMessage = "No record found Mail Template.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        #region Insert Invitation
                        Invitation invitationDB = new Invitation();
                        invitationDB.User = userDB;

                        invitationDB_UniqueID = Guid.NewGuid();
                        invitationDB.UniqueID = invitationDB_UniqueID;
                        invitationDB.CompanyID = prefAttProvider_CompanyDB.id != 0 ? prefAttProvider_CompanyDB.id : 0;
                        invitationDB.CreateDate = DateTime.UtcNow;
                        invitationDB.CreateByUserID = userDB.id;
                        _context.Invitations.Add(invitationDB);
                        _context.SaveChanges();
                        #endregion

                        //string VerificationLink = "<a href='http://medicalprovider.codearray.tk/#/account/login'> http://medicalprovider.codearray.tk/#/account/login </a>";
                        string VerificationLink = "<a href='http://attorney.codearray.tk/#/account/login'> http://attorney.codearray.tk/#/account/login </a>";
                        string msg = mailTemplateDB.EmailBody;
                        string subject = mailTemplateDB.EmailSubject;

                        string message = string.Format(msg, userBO.FirstName, userBO.UserName, VerificationLink);

                        BO.Email objEmail = new BO.Email { ToEmail = userBO.UserName, Subject = subject, Body = message };
                        objEmail.SendMail();
                    }
                }

                #endregion
            }
            catch (Exception ex) { }

            var result = _context.PreferredAttorneyProviders.Include("Company").Include("Company1")
                                                            .Where(p => p.PrefAttorneyProviderId == prefAttProviderBO.company.ID
                                                                 && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault();

            BO.PreferredAttorneyProviderSignUp acc_ = ConvertPreferredAttorneyProviderSignUp<BO.PreferredAttorneyProviderSignUp, PreferredAttorneyProvider>(result);

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
                                              .OrderBy(x => x.Name)
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
                                                                      .OrderBy(p => p.Company1.Name)
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

        #region Get By  Id
        public override object Get(int Id)
         {
            var AttorenyProvider = _context.PreferredAttorneyProviders.Include("Company1.UserCompanies.User")
                                                                      .Where(p => p.Id == Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                      .FirstOrDefault();

            BO.PreferredAttorneyProviderSignUp boProviderSignUp = new BO.PreferredAttorneyProviderSignUp();

            if (AttorenyProvider == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this preferred Attorney Provider.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                boProviderSignUp = ConvertPreferredAttorneyProviderSignUp<BO.PreferredAttorneyProviderSignUp, PreferredAttorneyProvider>(AttorenyProvider);
            }

            return boProviderSignUp;
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
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Attorney provider details dosen't exists.", ErrorLevel = ErrorLevel.Error };
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
