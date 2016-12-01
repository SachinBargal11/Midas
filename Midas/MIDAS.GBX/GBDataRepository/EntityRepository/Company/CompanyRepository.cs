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
    internal class CompanyRepository : BaseEntityRepo,IDisposable
    {
        private DbSet<Company> _dbSet;
        private DbSet<User> _dbuser;
        private DbSet<UserCompany> _dbUserCompany;
        private DbSet<UserCompanyRole> _dbUserCompanyRole;
        private DbSet<Invitation> _dbInvitation;
        #region Constructor
        public CompanyRepository(MIDASGBXEntities context) : base(context)
        {
            _dbSet = context.Set<Company>();
            _dbuser = context.Set<User>();
            _dbUserCompany = context.Set<UserCompany>();
            _dbUserCompanyRole = context.Set<UserCompanyRole>();
            _dbInvitation = context.Set<Invitation>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            if (entity.GetType().Name == "Invitation")
            {
                BO.User boUser = new BO.User();
                Invitation invitation = entity as Invitation;
                if (invitation == null)
                    return default(T);

                BO.Invitation boInvitation = new BO.Invitation();
                boUser.ID = invitation.UserID;
                boInvitation.InvitationID = invitation.InvitationID;
                boInvitation.User = boUser;
                return (T)(object)boInvitation;
            }
            else
            {
                Company company = entity as Company;
                if (company == null)
                    return default(T);

                BO.Company boCompany = new BO.Company();

                boCompany.ID = company.id;
                boCompany.Name = company.Name;
                boCompany.Status = (BO.GBEnums.AccountStatus)company.Status;
                boCompany.CompanyType = (BO.GBEnums.CompanyType)company.Status;
                boCompany.SubsCriptionType = (BO.GBEnums.SubsCriptionType)company.Status;
                return (T)(object)boCompany;
            }


        }
        #endregion

        #region Delete
        public override Object Delete<T>(T entity)
        {
            BO.Company companyBO = entity as BO.Company;

            Company companyDB = new Company();
            companyDB.id = companyBO.ID;
            _dbSet.Remove(_context.Companies.Single<Company>(p => p.id == companyBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return companyDB;
        }
        #endregion


        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Signup signUPBO = (BO.Signup)(object)entity;
            BO.Company companyBO = signUPBO.company;
            BO.User userBO = signUPBO.user;


            var result = companyBO.Validate(companyBO);
            return result;
        }
        #endregion

        #region Save Data
        public override object Save<T>(T data)
        {
            return base.Save(data);
        }
        #endregion


        #region Signup
        public override Object Signup<T>(T data)
        {
            BO.Signup signUPBO = (BO.Signup)(object)data;

            bool flagUser = false;

            BO.User userBO = signUPBO.user;
            BO.Company companyBO = signUPBO.company;
            BO.AddressInfo addressBO = signUPBO.addressInfo;
            BO.ContactInfo contactinfoBO = signUPBO.contactInfo;
            BO.Role roleBO = signUPBO.role;

            Company companyDB = new Company();
            User userDB = new User();
            AddressInfo addressDB = new AddressInfo();
            ContactInfo contactinfoDB = new ContactInfo();
            UserCompany userCompanyDB = new UserCompany();
            UserCompanyRole userCompanyRoleDB = new UserCompanyRole();
            Role roleDB = new Role();
            Invitation invitationDB = new Invitation();

            if (_context.Companies.Any(o => o.Name == companyBO.Name))
            {
                return new BO.ErrorObject { ErrorMessage = "Company already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else if (_context.Users.Any(o => o.UserName == userBO.UserName))
            {
                flagUser = true;
            }

            #region Company
            companyDB.Name = companyBO.Name;
            companyDB.id = companyBO.ID;
            companyDB.TaxID = companyBO.TaxID;
            companyDB.Status = System.Convert.ToByte(companyBO.Status);
            companyDB.CompanyType = System.Convert.ToByte(companyBO.CompanyType);
            companyDB.SubscriptionPlanType = System.Convert.ToByte(companyBO.SubsCriptionType);
            if (companyDB.IsDeleted.HasValue)
                companyDB.IsDeleted = companyBO.IsDeleted.Value;
            #endregion

            #region Address
            if (addressBO != null)
            {
                addressDB.id = addressBO.ID;
                addressDB.Name = addressBO.Name;
                addressDB.Address1 = addressBO.Address1;
                addressDB.Address2 = addressBO.Address2;
                addressDB.City = addressBO.City;
                addressDB.State = addressBO.State;
                addressDB.ZipCode = addressBO.ZipCode;
                addressDB.Country = addressBO.Country;
            }
            #endregion

            #region Contact Info

            if (contactinfoBO != null)
            {
                contactinfoDB.id = contactinfoBO.ID;
                contactinfoDB.Name = contactinfoBO.Name;
                contactinfoDB.CellPhone = contactinfoBO.CellPhone;
                contactinfoDB.EmailAddress = contactinfoBO.EmailAddress;
                contactinfoDB.HomePhone = contactinfoBO.HomePhone;
                contactinfoDB.WorkPhone = contactinfoBO.WorkPhone;
                contactinfoDB.FaxNo = contactinfoBO.FaxNo;
                if (contactinfoBO.IsDeleted.HasValue)
                    contactinfoDB.IsDeleted = contactinfoBO.IsDeleted;
            }
            #endregion

            #region User
            if (!flagUser)
            {
                userDB.UserName = userBO.UserName;
                userDB.MiddleName = userBO.MiddleName;
                userDB.FirstName = userBO.FirstName;
                userDB.LastName = userBO.LastName;
                userDB.Gender = System.Convert.ToByte(userBO.Gender);
                userDB.UserType = System.Convert.ToByte(userBO.UserType);
                userDB.C2FactAuthEmailEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactEmail"));
                userDB.C2FactAuthSMSEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactSMS"));
                userDB.ImageLink = userBO.ImageLink;
                if (userBO.DateOfBirth.HasValue)
                    userDB.DateOfBirth = userBO.DateOfBirth.Value;
                //userDB.Password = PasswordHash.HashPassword(userBO.Password);

                if (userBO.IsDeleted.HasValue)
                    userDB.IsDeleted = userBO.IsDeleted.Value;

                userDB.AddressInfo = addressDB;
                userDB.ContactInfo = contactinfoDB;
                userCompanyDB.User = userDB;
            }
            else
            {
                ////Find Record By Name
                User user_ = _context.Users.Where(p => p.UserName == userBO.UserName).FirstOrDefault<User>();
                userCompanyDB.User = user_;
                _context.Entry(user_).State = System.Data.Entity.EntityState.Modified;
            }

            #endregion

            #region Role
            roleDB.Name = roleBO.Name;
            roleDB.RoleType = System.Convert.ToByte(roleBO.RoleType);
            if (roleBO.IsDeleted.HasValue)
                roleDB.IsDeleted = roleBO.IsDeleted.Value;
            #endregion

            UserCompany cmp = new UserCompany();
            cmp.Company = companyDB;

            companyDB.AddressInfo = addressDB;
            companyDB.ContactInfo = contactinfoDB;

            if (companyDB.id > 0)
            {
                //For Update Record
            }
            else
            {
                companyDB.CreateDate = DateTime.UtcNow;
                companyDB.CreateByUserID = companyBO.CreateByUserID;

                userDB.CreateDate = DateTime.UtcNow;
                userDB.CreateByUserID = companyBO.CreateByUserID;

                addressDB.CreateDate = DateTime.UtcNow;
                addressDB.CreateByUserID = companyBO.CreateByUserID;

                contactinfoDB.CreateDate = DateTime.UtcNow;
                contactinfoDB.CreateByUserID = companyBO.CreateByUserID;

                _dbSet.Add(companyDB);
                //_dbuser.Add(userDB);
            }
            _context.SaveChanges();


            #region Insert User Block
            userCompanyDB.Company = companyDB;
            userCompanyDB.CreateDate = DateTime.UtcNow;
            userCompanyDB.CreateByUserID = companyBO.CreateByUserID;
            _dbUserCompany.Add(userCompanyDB);
            _context.SaveChanges();
            #endregion

            #region Insert User Company Role
            userCompanyRoleDB.User = userCompanyDB.User;
            userCompanyRoleDB.Role = roleDB;
            userCompanyRoleDB.CreateDate = DateTime.UtcNow;
            userCompanyRoleDB.CreateByUserID = companyBO.CreateByUserID;
            _dbUserCompanyRole.Add(userCompanyRoleDB);
            _context.SaveChanges();
            #endregion

            #region Insert Invitation
            invitationDB.User = userCompanyDB.User;
            invitationDB.Company = companyDB;
            invitationDB.UniqueID = Guid.NewGuid();
            invitationDB.CreateDate = DateTime.UtcNow;
            invitationDB.CreateByUserID = companyBO.CreateByUserID;
            _dbInvitation.Add(invitationDB);
            _context.SaveChanges();
            #endregion

            BO.Company acc_ = Convert<BO.Company, Company>(companyDB);
            try
            {
                #region Send Email
                
                string VerificationLink = "<a href='"+ Utility.GetConfigValue("VerificationLink") + "/"+invitationDB.UniqueID+ "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB.UniqueID + "</a>";
                string Message = "Dear " + userBO.FirstName + ",<br><br>Thanks for registering with us.<br><br> Your user name is:- " + userBO.UserName + "<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink+"</b><br><br>Thanks";
                Utility.SendEmail(Message, "Company registered", userBO.UserName);
                #endregion
            }
            catch (Exception ex)
            {

            }

            var res = (BO.GbObject)(object)acc_;
            return (object)res;
        }
        #endregion

        #region Get Company By ID
        public override Object Get(int id)
        {
            BO.Company acc_ = Convert<BO.Company, Company>(_context.Companies.Where(p => p.id == id).FirstOrDefault<Company>());
            if (acc_ == null)
            {
                return acc_;
            }
            else
            {
                return acc_;
            }
        }
        #endregion

        public void Dispose()
        {
            Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
