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
    internal class UserCompanyRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<UserCompany> _dbSet;
        private DbSet<Invitation> _dbInvitation;

        #region Constructor
        public UserCompanyRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<UserCompany>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            if (entity.GetType().Name != "User")
            {
                UserCompany usercompany = entity as UserCompany;

                if (usercompany == null)
                    return default(T);

                BO.UserCompany usercompanyBO = new BO.UserCompany();

                usercompanyBO.ID = usercompany.id;

                if (usercompany.IsDeleted.HasValue)
                    usercompanyBO.IsDeleted = usercompany.IsDeleted.Value;
                if (usercompany.UpdateByUserID.HasValue)
                    usercompanyBO.UpdateByUserID = usercompany.UpdateByUserID.Value;

                if (usercompany.User.IsDeleted.HasValue == false || (usercompany.User.IsDeleted.HasValue == true && usercompany.User.IsDeleted.Value == false))
                {
                    using (UserRepository sr = new UserRepository(_context))
                    {
                        BO.User boUser = sr.Convert<BO.User, User>(usercompany.User);
                        usercompanyBO.User = boUser;
                    }
                }

                if (usercompany.Company.IsDeleted.HasValue == false || (usercompany.Company.IsDeleted.HasValue == true && usercompany.Company.IsDeleted.Value == false))
                {
                    using (CompanyRepository sr = new CompanyRepository(_context))
                    {
                        BO.Company boCompany = sr.Convert<BO.Company, Company>(usercompany.Company);
                        usercompanyBO.Company = boCompany;
                    }
                }

                return (T)(object)usercompanyBO;
            }
            else
            {
                User userDB = entity as User;
                BO.User boUser = new BO.User();

                if (userDB.IsDeleted.HasValue == false || (userDB.IsDeleted.HasValue == true && userDB.IsDeleted.Value == false))
                {
                    using (UserRepository sr = new UserRepository(_context))
                    {
                        boUser = sr.Convert<BO.User, User>(userDB);
                    }
                }

                if (boUser.UserCompanies == null && userDB.UserCompanies != null)
                {
                    boUser.UserCompanies = new List<BO.UserCompany>();

                    foreach (var eachUserCompany in userDB.UserCompanies)
                    {
                        if (eachUserCompany.IsDeleted.HasValue == false || (eachUserCompany.IsDeleted.HasValue == true && eachUserCompany.IsDeleted.Value == false))
                        {
                            BO.UserCompany usercompanyBO = new BO.UserCompany();

                            usercompanyBO.ID = eachUserCompany.id;
                            usercompanyBO.UserId = eachUserCompany.UserID;
                            usercompanyBO.CompanyId = eachUserCompany.CompanyID;

                            usercompanyBO.IsDeleted = eachUserCompany.IsDeleted;
                            usercompanyBO.CreateByUserID = eachUserCompany.CreateByUserID;
                            usercompanyBO.UpdateByUserID = eachUserCompany.UpdateByUserID;

                            boUser.UserCompanies.Add(usercompanyBO);
                        }
                    }
                }

                return (T)(object)boUser;
            }
        }
        #endregion

        #region Delete
        public override Object Delete<T>(T entity)
        {
            BO.UserCompany usercompanyBO = entity as BO.UserCompany;

            UserCompany usercompanyDB = new UserCompany();
            usercompanyDB.id = usercompanyBO.ID;
            _dbSet.Remove(_context.UserCompanies.Single<UserCompany>(p => p.id == usercompanyBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return usercompanyDB;
        }
        #endregion


        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.UserCompany usercompanyBO = (BO.UserCompany)(object)entity;
            BO.Company companyBO = usercompanyBO.Company;
            BO.User userBO = usercompanyBO.User;


            var result = usercompanyBO.Validate(companyBO);
            return result;
        }
        #endregion

        #region Save Data
        public override object Save<T>(T data)
        {
            return base.Save(data);
        }
        #endregion

        #region Associate User To Company
        public override object AssociateUserToCompany(string UserName, int CompanyId, bool sendEmail)
        {
            User UserDB = _context.Users.Where(p => p.UserName == UserName
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                        .FirstOrDefault();

            if (UserDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "User dosent exists.", errorObject = "", ErrorLevel = ErrorLevel.Information };
            }

            Company CompanyDB = _context.Companies.Where(p => p.id == CompanyId
                                                          && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                  .FirstOrDefault();

            if (CompanyDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Company dosent exists.", errorObject = "", ErrorLevel = ErrorLevel.Information };
            }

            UserCompany UserCompanyDB1 = _context.UserCompanies.Where(p => (p.UserID == UserDB.id && p.CompanyID== CompanyId)
                                               && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                       .FirstOrDefault();
            if (UserCompanyDB1==null)
            { 
            UserCompany UserCompanyDB = new UserCompany();

            Guid invitationDB_UniqueID = Guid.NewGuid();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                if (UserDB != null && CompanyDB != null)
                {
                    UserCompanyDB.UserID = UserDB.id;
                    UserCompanyDB.CompanyID = CompanyDB.id;
                    UserCompanyDB.IsDeleted = false;
                    UserCompanyDB.CreateByUserID = 0;
                    UserCompanyDB.CreateDate = DateTime.UtcNow;

                    UserCompanyDB = _context.UserCompanies.Add(UserCompanyDB);

                    _context.SaveChanges();

                    if (sendEmail == true)
                    {
                        #region Insert Invitation
                        Invitation invitationDB = new Invitation();
                        invitationDB.User = UserCompanyDB.User;
                        invitationDB_UniqueID = Guid.NewGuid();

                        invitationDB.UniqueID = invitationDB_UniqueID;
                        invitationDB.CompanyID = UserCompanyDB.CompanyID;
                        invitationDB.CreateDate = DateTime.UtcNow;
                        invitationDB.CreateByUserID = UserCompanyDB.CreateByUserID;

                        _context.Invitations.Add(invitationDB);

                        _context.SaveChanges();
                        #endregion
                    }
                }
                else
                {
                    return new BO.ErrorObject { ErrorMessage = "Please pass valid user and company details.", errorObject = "", ErrorLevel = ErrorLevel.Information };
                }

                dbContextTransaction.Commit();

                UserDB = _context.Users.Include("AddressInfo")
                                       .Include("ContactInfo")
                                       .Include("UserCompanyRoles")
                                       .Include("UserCompanies")                                     
                                       .Where(p => p.id == UserDB.id
                                               && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                       .FirstOrDefault<User>();
            }

            if (sendEmail == true)
            {
                try
                {
                    #region Send Email
                    string VerificationLink = "<a href='" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB_UniqueID + "</a>";
                    string Message = "Dear " + UserDB.FirstName + ",<br><br>Thanks for registering with us.<br><br> Your user name is:- " + UserDB.UserName + "<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";
                    BO.Email objEmail = new BO.Email { ToEmail = UserDB.UserName, Subject = "User registered", Body = Message };
                    objEmail.SendMail();
                    #endregion
                }
                catch (Exception ex)
                {
                }
            }

        }
        else
         {
                return new BO.ErrorObject { ErrorMessage = "User is already  associated with this Company.", errorObject = "", ErrorLevel = ErrorLevel.Information };
         }

            var res = Convert<BO.User, User>(UserDB);
            return (object)res;
        }
        #endregion



        #region Get User Company By ID
        public override Object Get(int id)
        {
            BO.UserCompany acc_ = Convert<BO.UserCompany, UserCompany>(_context.UserCompanies.Include("User").Include("Company").Where(p => p.id == id).FirstOrDefault<UserCompany>());
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

        #region Get User Company By ID
        public override Object GetByUserId(int UserId)
        {
            BO.UserCompany acc_ = Convert<BO.UserCompany, UserCompany>(_context.UserCompanies.Include("User").Include("Company").Where(p => p.UserID == UserId).FirstOrDefault<UserCompany>());
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

        #region Get By Filter
        public override object Get<T>(T entity)
        {
            BO.UserCompany usercompanyBO = (BO.UserCompany)(object)entity;
            List<BO.UserCompany> lstUserCompanies = new List<BO.UserCompany>();
            dynamic result = null;
            var acc_ = _context.UserCompanies.Include("User").Include("Company").Where(p => p.IsDeleted == false || p.IsDeleted == null) as IQueryable<UserCompany>;
            if (acc_ == null || acc_.Count() == 0)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            if (usercompanyBO.Company != null)
            {
             if (usercompanyBO.Company.ID > 0)
                {
                    if (usercompanyBO.Company.ID > 0)
                    {
                        result = acc_.Where(x => x.Company.id == usercompanyBO.Company.ID);
                    }
                }   
            }
            else if(usercompanyBO.User!=null)
            {
                if (usercompanyBO.User.ID > 0)
                    result = acc_.Where(x => x.User.id == usercompanyBO.User.ID);
            }
            else
            {
                result = acc_;
            }
            foreach (UserCompany item in result)
            {
                lstUserCompanies.Add(Convert<BO.UserCompany, UserCompany>(item));
            }
            return lstUserCompanies;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
