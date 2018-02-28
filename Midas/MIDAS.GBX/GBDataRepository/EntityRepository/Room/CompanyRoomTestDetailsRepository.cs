using MIDAS.GBX.Common;
using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EN;
using MIDAS.GBX.EntityRepository;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class CompanyRoomTestDetailsRepository : BaseEntityRepo
    {
        private DbSet<CompanyRoomTestDetail> _dbSet;

        #region Constructor
        public CompanyRoomTestDetailsRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<CompanyRoomTestDetail>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            CompanyRoomTestDetail companyroomtestdetail = entity as CompanyRoomTestDetail;

            if (companyroomtestdetail == null)
                return default(T);

            BO.CompanyRoomTestDetails companyroomtestDetailBO = new BO.CompanyRoomTestDetails();

            companyroomtestDetailBO.ID = companyroomtestdetail.id;
            companyroomtestDetailBO.RoomTestID = companyroomtestdetail.RoomTestID;
            companyroomtestDetailBO.CompanyID = companyroomtestdetail.CompanyID;
            if (companyroomtestdetail.ShowProcCode.HasValue)
                companyroomtestDetailBO.ShowProcCode = companyroomtestdetail.ShowProcCode;
            if (companyroomtestdetail.RoomTest != null)
            {
                BO.RoomTest boRoomTest = new BO.RoomTest();
                using (RoomTestRepository rtr = new RoomTestRepository(_context))
                {
                    boRoomTest = rtr.Convert<BO.RoomTest, RoomTest>(companyroomtestdetail.RoomTest);
                    companyroomtestDetailBO.RoomTest = boRoomTest;
                }
            }
            if (companyroomtestdetail.Company != null)
            {
                BO.Company boCompany = new BO.Company();
                using (CompanyRepository cmp = new CompanyRepository(_context))
                {
                    boCompany = cmp.Convert<BO.Company, Company>(companyroomtestdetail.Company);
                    companyroomtestDetailBO.Company = boCompany;
                }
            }
            return (T)(object)companyroomtestDetailBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.CompanyRoomTestDetails companyroomtestdetail = (BO.CompanyRoomTestDetails)(object)entity;
            var result = companyroomtestdetail.Validate(companyroomtestdetail);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.CompanyRoomTestDetails companyroomtestDetailBO = (BO.CompanyRoomTestDetails)(object)entity;

            CompanyRoomTestDetail companyroomtestDetailDB = new CompanyRoomTestDetail();

            if (companyroomtestDetailBO.RoomTest == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Test Test Specialty object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            if (companyroomtestDetailBO.Company == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Company object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            BO.Company companyBO = companyroomtestDetailBO.Company;
            BO.RoomTest roomtestBO = companyroomtestDetailBO.RoomTest;

            #region RoomTest
            companyroomtestDetailDB.id = companyroomtestDetailBO.ID;
            companyroomtestDetailDB.RoomTestID = companyroomtestDetailBO.RoomTestID;
            companyroomtestDetailDB.CompanyID = companyroomtestDetailBO.CompanyID;
            companyroomtestDetailDB.ShowProcCode = companyroomtestDetailBO.ShowProcCode;
            companyroomtestDetailDB.IsDeleted = companyroomtestDetailBO.IsDeleted;
            #endregion

            #region RoomTest
            if (roomtestBO.ID > 0)
            {
                RoomTest roomtest = _context.RoomTests.Where(p => p.id == roomtestBO.ID).FirstOrDefault<RoomTest>();
                if (roomtest != null)
                {
                    companyroomtestDetailDB.RoomTest = roomtest;
                }
                else
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Test Specialty details.", ErrorLevel = ErrorLevel.Error };
            }
            #endregion

            #region Company
            if (companyBO.ID > 0)
            {
                Company company = _context.Companies.Where(p => p.id == companyBO.ID).FirstOrDefault<Company>();
                if (company != null)
                {
                    companyroomtestDetailDB.Company = company;
                }
                else
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Company details.", ErrorLevel = ErrorLevel.Error };
            }
            #endregion


            if (companyroomtestDetailDB.id > 0)
            {

                //Find RoomTest By ID
                CompanyRoomTestDetail companyroomtestdetail = _context.CompanyRoomTestDetails.Where(p => p.id == companyroomtestDetailDB.id).FirstOrDefault<CompanyRoomTestDetail>();

                if (companyroomtestdetail != null)
                {
                    #region Specialty
                    companyroomtestdetail.RoomTestID = companyroomtestDetailBO.RoomTest.ID != null ? companyroomtestDetailBO.RoomTest.ID : companyroomtestdetail.RoomTest.id;
                    companyroomtestdetail.CompanyID = companyroomtestDetailBO.CompanyID != null ? companyroomtestDetailBO.CompanyID : companyroomtestdetail.CompanyID;
                    companyroomtestdetail.ShowProcCode = companyroomtestDetailBO.ShowProcCode != null ? companyroomtestDetailBO.ShowProcCode : companyroomtestdetail.ShowProcCode;
                    companyroomtestdetail.IsDeleted = companyroomtestDetailBO.IsDeleted != null ? companyroomtestDetailBO.IsDeleted : companyroomtestdetail.IsDeleted;
                    companyroomtestdetail.UpdateDate = DateTime.UtcNow;
                    companyroomtestdetail.UpdateByUserID = companyroomtestDetailBO.UpdateByUserID;
                    #endregion

                    _context.Entry(companyroomtestdetail).State = System.Data.Entity.EntityState.Modified;
                }

            }
            else
            {
                companyroomtestDetailDB.CreateDate = DateTime.UtcNow;
                companyroomtestDetailDB.CreateByUserID = companyroomtestDetailDB.CreateByUserID;

                _dbSet.Add(companyroomtestDetailDB);
            }
            _context.SaveChanges();

            var res = Convert<BO.CompanyRoomTestDetails, CompanyRoomTestDetail>(companyroomtestDetailDB);
            return (object)res;
        }
        #endregion

        #region Delete
        public override object Delete<T>(T entity)
        {
            BO.CompanyRoomTestDetails companyroomtestDetailBO = entity as BO.CompanyRoomTestDetails;

            CompanyRoomTestDetail companyroomtestDetailDB = new CompanyRoomTestDetail();
            companyroomtestDetailDB.id = companyroomtestDetailBO.ID;
            _dbSet.Remove(_context.CompanyRoomTestDetails.Single<CompanyRoomTestDetail>(p => p.id == companyroomtestDetailBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return companyroomtestDetailBO;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            BO.CompanyRoomTestDetails acc_ = Convert<BO.CompanyRoomTestDetails, CompanyRoomTestDetail>(_context.CompanyRoomTestDetails.Include("Company").Include("RoomTest").Where(p => p.id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<CompanyRoomTestDetail>());
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Test Specialty detail.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }
        #endregion

        #region GetByRoomTestAndCompanyId
        public override object GetByRoomTestAndCompanyId(int roomTestId, int companyId)
        {
            var acc = _context.CompanyRoomTestDetails.Include("Company").Include("RoomTest").Where(p => p.RoomTestID == roomTestId && p.CompanyID == companyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();

            BO.CompanyRoomTestDetails acc_ = Convert<BO.CompanyRoomTestDetails, CompanyRoomTestDetail>(acc);
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Test Specialty and Company detail.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }
        #endregion

        #region Get By Filter
        public override object Get<T>(T entity)
        {
            BO.CompanyRoomTestDetails TestSpecialties = new BO.CompanyRoomTestDetails();

            BO.CompanyRoomTestDetails companyRoomTestDetailBO = (BO.CompanyRoomTestDetails)(object)entity;
            if (companyRoomTestDetailBO != null)
            {
                if (companyRoomTestDetailBO.RoomTest != null && companyRoomTestDetailBO.Company != null)
                {
                    var acc_ = _context.CompanyRoomTestDetails.Include("RoomTest").Include("Company").Where(p => (p.IsDeleted == false || p.IsDeleted == null) && p.RoomTestID == companyRoomTestDetailBO.RoomTest.ID && p.CompanyID == companyRoomTestDetailBO.Company.ID).ToList<CompanyRoomTestDetail>();
                    if (acc_ == null)
                    {
                        return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                    else
                    {
                        if (acc_.Count > 0)
                        {
                            TestSpecialties = Convert<BO.CompanyRoomTestDetails, CompanyRoomTestDetail>(acc_[0]);
                        }
                        else
                        {
                            return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                        }
                    }
                }
                else
                {
                    return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
            }
            else
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return TestSpecialties;
        }
        #endregion
    }
}
