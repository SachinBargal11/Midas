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
    internal class OTPCompanyMappingRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<OTPCompanyMapping> _dbSet;

        #region Constructor
        public OTPCompanyMappingRepository(MIDASGBXEntities context) : base(context)
        {
            _dbSet = context.Set<OTPCompanyMapping>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            OTPCompanyMapping otpCompanyMapping = entity as OTPCompanyMapping;

            if (otpCompanyMapping == null)
                return default(T);

            BO.OTPCompanyMapping otpCompanyMappingBO = new BO.OTPCompanyMapping();


            otpCompanyMappingBO.ID = otpCompanyMapping.Id;
            otpCompanyMappingBO.OTP = otpCompanyMapping.OTP;
            otpCompanyMappingBO.CompanyId = otpCompanyMapping.CompanyId;
            otpCompanyMappingBO.ValidUntil = otpCompanyMapping.ValidUntil;
            otpCompanyMappingBO.UsedByCompanyId = otpCompanyMapping.UsedByCompanyId;
            otpCompanyMappingBO.UsedAtDate = otpCompanyMapping.UsedAtDate;
            otpCompanyMappingBO.IsCancelled = otpCompanyMapping.IsCancelled;
            otpCompanyMappingBO.OTPForDate = otpCompanyMapping.OTPForDate;


           

            if (otpCompanyMapping.IsDeleted.HasValue)
                otpCompanyMappingBO.IsDeleted = otpCompanyMapping.IsDeleted.Value;
            if (otpCompanyMapping.UpdateByUserID.HasValue)
                otpCompanyMappingBO.UpdateByUserID = otpCompanyMapping.UpdateByUserID.Value;

            return (T)(object)otpCompanyMappingBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.OTPCompanyMapping otpCompanyMapping = (BO.OTPCompanyMapping)(object)entity;
            var result = otpCompanyMapping.Validate(otpCompanyMapping);
            return result;
        }
        #endregion

        #region GenerateOTP For Company
        public override object GenerateOTPForCompany(int companyId)
        {           
            var OTPCompanyMappings = _context.OTPCompanyMappings.Where(p =>p.CompanyId== companyId && p.UsedByCompanyId == null && p.ValidUntil>=DateTime.UtcNow).ToList();
            if (OTPCompanyMappings.Count>0)
            {
                OTPCompanyMappings.ForEach(a => { a.IsCancelled = true; a.UpdateDate = DateTime.UtcNow; a.UpdateByUserID = System.Convert.ToInt32(Utility.GetConfigValue("DefaultAdminUserID")); });          
                _context.SaveChanges();
            }           

            OTPCompanyMapping OTPCompanyMapping = new OTPCompanyMapping();
            OTPCompanyMapping.OTP = Utility.GenerateRandomNo().ToString();
            OTPCompanyMapping.CompanyId = companyId;
            OTPCompanyMapping.ValidUntil = DateTime.UtcNow.AddMinutes(30);
            OTPCompanyMapping.OTPForDate = DateTime.UtcNow;

            OTPCompanyMapping.CreateDate = DateTime.UtcNow;
            OTPCompanyMapping.CreateByUserID = System.Convert.ToInt32(Utility.GetConfigValue("DefaultAdminUserID"));

            _dbSet.Add(OTPCompanyMapping);
            _context.SaveChanges();

            var OTPCompanyMappingsDB = _context.OTPCompanyMappings.Where(p => (p.IsCancelled.HasValue == false || (p.IsCancelled.HasValue == true && p.IsCancelled.Value == false))
                                                                              && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                                              && p.ValidUntil >= DateTime.UtcNow)
                                                                  .FirstOrDefault<OTPCompanyMapping>();

   
           var res = Convert<BO.OTPCompanyMapping, OTPCompanyMapping>(OTPCompanyMappingsDB);
          
            return (object)res;
        }
        #endregion

        #region Validate OTP For Company
        public override object ValidateOTPForCompany(string otp)
        {
            
            var OTPCompanyMappings = _context.OTPCompanyMappings.Where(p => p.OTP == otp && p.UsedByCompanyId == null && p.ValidUntil >= DateTime.UtcNow
                                                                            && p.IsCancelled.HasValue == false || (p.IsCancelled.HasValue == true && p.IsCancelled.Value == false)
                                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                                       ).FirstOrDefault();

            if (OTPCompanyMappings == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Invalid OTP.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.OTPCompanyMapping, OTPCompanyMapping>(OTPCompanyMappings);
            return (object)res;
           
        }
        #endregion

        #region Associate preferred comapny
        public override object AssociatePreferredCompany(string otp, int currentCompanyId)
        {
               
            try
            {
                BO.OTPCompanyMapping OTPCompanyMapping = (BO.OTPCompanyMapping)ValidateOTPForCompany(otp);

                if (OTPCompanyMapping == null)
                {
                    return new BO.ErrorObject { ErrorMessage = "Invalid OTP.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
                else
                {
                    int companyType = _context.Companies.Where(p => p.id == OTPCompanyMapping.CompanyId
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                                           ).Select(p1 => p1.CompanyType).FirstOrDefault();

                    int currentCompanyType = _context.Companies.Where(p => p.id == currentCompanyId
                                                                   && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                                          ).Select(p1 => p1.CompanyType).FirstOrDefault();


                    if (companyType == 1)
                    {

                        using (PreferredMedicalProviderRepository cmp = new PreferredMedicalProviderRepository(_context))
                        {
                            cmp.AssociateMedicalProviderWithCompany(OTPCompanyMapping.CompanyId, currentCompanyId);
                        }
                    }
                    else if (companyType == 2)
                    {
                        using (PreferredAttorneyProviderRepository cmp = new PreferredAttorneyProviderRepository(_context))
                        {
                            cmp.AssociatePrefAttorneyProviderWithCompany(OTPCompanyMapping.CompanyId, currentCompanyId);
                        }
                    }
                    else if (companyType == 6)
                    {
                        using (PreferredAncillaryProviderRepository cmp = new PreferredAncillaryProviderRepository(_context))
                        {
                            cmp.AssociateAncillaryProviderWithCompany(OTPCompanyMapping.CompanyId, currentCompanyId);
                        }
                    }


                    if (currentCompanyType == 1)
                    {

                        using (PreferredMedicalProviderRepository cmp = new PreferredMedicalProviderRepository(_context))
                        {
                            cmp.AssociateMedicalProviderWithCompany(currentCompanyId, OTPCompanyMapping.CompanyId);
                        }
                    }
                    else if (currentCompanyType == 2)
                    {
                        using (PreferredAttorneyProviderRepository cmp = new PreferredAttorneyProviderRepository(_context))
                        {
                            cmp.AssociatePrefAttorneyProviderWithCompany(currentCompanyId, OTPCompanyMapping.CompanyId);
                        }
                    }
                    else if (currentCompanyType == 6)
                    {
                        using (PreferredAncillaryProviderRepository cmp = new PreferredAncillaryProviderRepository(_context))
                        {
                            cmp.AssociateAncillaryProviderWithCompany(currentCompanyId, OTPCompanyMapping.CompanyId);
                        }
                    }
                }

                OTPCompanyMapping OTPCompanyMappingDB = _context.OTPCompanyMappings.Where(p => p.OTP == otp && p.UsedByCompanyId == null && p.ValidUntil >= DateTime.UtcNow
                                                                          && p.IsCancelled.HasValue == false || (p.IsCancelled.HasValue == true && p.IsCancelled.Value == false)
                                                                          && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                                     ).FirstOrDefault();
                if (OTPCompanyMappingDB != null)
                {
                    OTPCompanyMappingDB.UsedByCompanyId = currentCompanyId;
                    OTPCompanyMappingDB.UsedAtDate= DateTime.UtcNow;
                    OTPCompanyMappingDB.UpdateByUserID = System.Convert.ToInt32(Utility.GetConfigValue("DefaultAdminUserID"));
                    OTPCompanyMappingDB.UpdateDate = DateTime.UtcNow;
                    _context.SaveChanges();
                }


                return "Company has been associated successfully.";

            }
            catch (Exception ex)
            {
                return new BO.ErrorObject { ErrorMessage = "Error occured while associating company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
                             
        }
        #endregion

        public void Dispose()
        {
            // Use SupressFinalize in case a subclass 
            // of this type implements a finalizer.
            GC.SuppressFinalize(this);
        }
    }
}
