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
            UserCompany usercompany = entity as UserCompany;

            if (usercompany == null)
                return default(T);

            BO.UserCompany usercompanyBO = new BO.UserCompany();

            usercompanyBO.ID = usercompany.id;

            if (usercompany.IsDeleted.HasValue)
                usercompanyBO.IsDeleted = usercompany.IsDeleted.Value;
            if (usercompany.UpdateByUserID.HasValue)
                usercompanyBO.UpdateByUserID = usercompany.UpdateByUserID.Value;

            using (UserRepository sr = new UserRepository(_context))
            {
                BO.User boUser = sr.Convert<BO.User, User>(usercompany.User);
                usercompanyBO.User = boUser;
            }

            using (CompanyRepository sr = new CompanyRepository(_context))
            {
                BO.Company boCompany = sr.Convert<BO.Company, Company>(usercompany.Company);
                usercompanyBO.Company = boCompany;
            }

            return (T)(object)usercompanyBO;
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
        public override object AssociateUserToCompany(string username, int companyid, bool verifyUser)
        {
            User UserDB = _context.Users.Where(p => p.UserName == username && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
            Company CompanyDB = _context.Companies.Where(p => p.id == companyid && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
            BO.UserCompany UserCompanyBO = new BO.UserCompany();

            UserCompany UserCompanyDB=new UserCompany();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                if (UserDB != null && CompanyDB != null)
                {
                    UserCompanyDB.UserID = UserDB.id;
                    UserCompanyDB.CompanyID = CompanyDB.id;
                    UserCompanyDB.IsDeleted = UserCompanyBO.IsDeleted;
                    UserCompanyDB.CreateByUserID = UserCompanyBO.CreateByUserID;
                    UserCompanyDB.CreateDate = UserCompanyBO.CreateDate;
                    UserCompanyDB.UpdateByUserID = UserCompanyBO.UpdateByUserID;
                    UserCompanyDB.UpdateDate = UserCompanyBO.UpdateDate;


                    UserCompanyDB = _context.UserCompanies.Add(UserCompanyDB);

                    _context.SaveChanges();



                    BO.AddUser addUserBO = new BO.AddUser();
                    BO.User userBO = addUserBO.user;
                    User userDB = new User();
                    Invitation invitationDB = new Invitation();
                    if (verifyUser)
                    {


                        #region Insert Invitation
                        invitationDB.User = UserCompanyDB.User;
                        invitationDB.UniqueID = Guid.NewGuid();
                        invitationDB.CreateDate = DateTime.UtcNow;
                        invitationDB.CreateByUserID = userBO.CreateByUserID;
                        _dbInvitation.Add(invitationDB);
                        _context.SaveChanges();
                        #endregion

                        BO.User acc_ = Convert<BO.User, User>(userDB);
                        try
                        {
                            #region Send Email
                            string VerificationLink = "<a href='" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB.UniqueID + "' target='_blank'>" + Utility.GetConfigValue("VerificationLink") + "/" + invitationDB.UniqueID + "</a>";
                            string Message = "Dear " + userBO.FirstName + ",<br><br>Thanks for registering with us.<br><br> Your user name is:- " + userBO.UserName + "<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";
                            BO.Email objEmail = new BO.Email { ToEmail = userBO.UserName, Subject = "User registered", Body = Message };
                            objEmail.SendMail();
                            #endregion
                        }
                        catch (Exception ex) { }
                    }


                }
                else
                {
                    return new BO.ErrorObject { ErrorMessage = "Please pass valid user and company details.", errorObject = "", ErrorLevel = ErrorLevel.Information };
                }

                dbContextTransaction.Commit();

            }

            var res = Convert<BO.UserCompany, UserCompany>(UserCompanyDB);
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
