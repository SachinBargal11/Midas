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

            if (otpCompanyMapping.Company != null)
            {
                Company company = otpCompanyMapping.Company;
                BO.Company boCompany = new BO.Company();
                boCompany.ID = company.id;
                boCompany.Name = company.Name;
                boCompany.TaxID = company.TaxID == null ? null : company.TaxID;
                boCompany.Status = (BO.GBEnums.AccountStatus)company.Status;
                boCompany.CompanyType = (BO.GBEnums.CompanyType)company.CompanyType;
                if (company.SubscriptionPlanType != null)
                {
                    boCompany.SubsCriptionType = (BO.GBEnums.SubsCriptionType)company.SubscriptionPlanType;
                }
                else
                {
                    boCompany.SubsCriptionType = null;
                }
                boCompany.CompanyStatusTypeID = (BO.GBEnums.CompanyStatusType)company.CompanyStatusTypeID;

                otpCompanyMappingBO.Company = boCompany;
            }

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
            var OTPCompanyMappings = _context.OTPCompanyMappings.Where(p => p.CompanyId == companyId && p.UsedByCompanyId == null && p.ValidUntil >= DateTime.UtcNow).ToList();
            if (OTPCompanyMappings.Count > 0)
            {
                OTPCompanyMappings.ForEach(a => { a.IsCancelled = true; a.UpdateDate = DateTime.UtcNow; a.UpdateByUserID = System.Convert.ToInt32(Utility.GetConfigValue("DefaultAdminUserID")); });
                _context.SaveChanges();
            }

            OTPCompanyMapping OTPCompanyMapping = new OTPCompanyMapping();
            OTPCompanyMapping.OTP = Utility.GenerateRandomNo().ToString();
            OTPCompanyMapping.CompanyId = companyId;
            OTPCompanyMapping.ValidUntil = DateTime.UtcNow.AddMinutes(30);
            //OTPCompanyMapping.OTPForDate = DateTime.UtcNow;

            OTPCompanyMapping.CreateDate = DateTime.UtcNow;
            OTPCompanyMapping.CreateByUserID = System.Convert.ToInt32(Utility.GetConfigValue("DefaultAdminUserID"));

            _dbSet.Add(OTPCompanyMapping);
            _context.SaveChanges();

            //var OTPCompanyMappingsDB = _context.OTPCompanyMappings.Where(p => (p.IsCancelled.HasValue == false || (p.IsCancelled.HasValue == true && p.IsCancelled.Value == false))
            //                                                                  && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
            //                                                                  && p.ValidUntil >= DateTime.UtcNow)
            //                                                      .FirstOrDefault<OTPCompanyMapping>();

            var OTPCompanyMappingsDB = _context.OTPCompanyMappings.Where(p => p.Id == OTPCompanyMapping.Id
                                                                              && (p.IsCancelled.HasValue == false || (p.IsCancelled.HasValue == true && p.IsCancelled.Value == false))
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

            var OTPCompanyMappings = _context.OTPCompanyMappings.Include("Company")
                                                                .Where(p => p.OTP == otp && p.UsedByCompanyId == null && p.ValidUntil >= DateTime.UtcNow
                                                                            && (p.IsCancelled.HasValue == false || (p.IsCancelled.HasValue == true && p.IsCancelled.Value == false))
                                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                .FirstOrDefault();

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
                    if (OTPCompanyMapping.CompanyId == currentCompanyId)
                    {
                        return new BO.ErrorObject { ErrorMessage = "Cannot add self (company) as preferred provider.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }

                    BO.GBEnums.CompanyType companyType = OTPCompanyMapping.Company.CompanyType;

                    BO.GBEnums.CompanyType currentCompanyType = _context.Companies.Where(p => p.id == currentCompanyId
                                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                  .Select(p1 => (BO.GBEnums.CompanyType)p1.CompanyType)
                                                                                  .FirstOrDefault();

                    using (var dbContextTransaction = _context.Database.BeginTransaction())
                    {
                        if (companyType == BO.GBEnums.CompanyType.MedicalProvider)
                        {
                            using (PreferredMedicalProviderRepository cmp = new PreferredMedicalProviderRepository(_context))
                            {
                                cmp.AssociateMedicalProviderWithCompany(OTPCompanyMapping.CompanyId, currentCompanyId);
                            }
                        }
                        else if (companyType == BO.GBEnums.CompanyType.Attorney)
                        {
                            using (PreferredAttorneyProviderRepository cmp = new PreferredAttorneyProviderRepository(_context))
                            {
                                cmp.AssociatePrefAttorneyProviderWithCompany(OTPCompanyMapping.CompanyId, currentCompanyId);
                            }
                        }
                        else if (companyType == BO.GBEnums.CompanyType.Ancillary)
                        {
                            using (PreferredAncillaryProviderRepository cmp = new PreferredAncillaryProviderRepository(_context))
                            {
                                cmp.AssociateAncillaryProviderWithCompany(OTPCompanyMapping.CompanyId, currentCompanyId);
                            }
                        }

                        if (currentCompanyType == BO.GBEnums.CompanyType.MedicalProvider)
                        {
                            using (PreferredMedicalProviderRepository cmp = new PreferredMedicalProviderRepository(_context))
                            {
                                cmp.AssociateMedicalProviderWithCompany(currentCompanyId, OTPCompanyMapping.CompanyId);
                            }
                        }
                        else if (currentCompanyType == BO.GBEnums.CompanyType.Attorney)
                        {
                            using (PreferredAttorneyProviderRepository cmp = new PreferredAttorneyProviderRepository(_context))
                            {
                                cmp.AssociatePrefAttorneyProviderWithCompany(currentCompanyId, OTPCompanyMapping.CompanyId);
                            }
                        }
                        else if (currentCompanyType == BO.GBEnums.CompanyType.Ancillary)
                        {
                            using (PreferredAncillaryProviderRepository cmp = new PreferredAncillaryProviderRepository(_context))
                            {
                                cmp.AssociateAncillaryProviderWithCompany(currentCompanyId, OTPCompanyMapping.CompanyId);
                            }
                        }

                        var OTPCompanyMappingDB = _context.OTPCompanyMappings.Include("Company")
                                                                     .Where(p => p.OTP == otp && p.UsedByCompanyId == null && p.ValidUntil >= DateTime.UtcNow
                                                                        && (p.IsCancelled.HasValue == false || (p.IsCancelled.HasValue == true && p.IsCancelled.Value == false))
                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                     .FirstOrDefault();
                        if (OTPCompanyMappingDB != null)
                        {
                            OTPCompanyMappingDB.UsedByCompanyId = currentCompanyId;
                            OTPCompanyMappingDB.UsedAtDate = DateTime.UtcNow;
                            OTPCompanyMappingDB.UpdateByUserID = System.Convert.ToInt32(Utility.GetConfigValue("DefaultAdminUserID"));
                            OTPCompanyMappingDB.UpdateDate = DateTime.UtcNow;
                            _context.SaveChanges();

                            dbContextTransaction.Commit();
                        }

                        var res = Convert<BO.OTPCompanyMapping, OTPCompanyMapping>(OTPCompanyMappingDB);
                        return (object)res;
                    }
                }
            }
            catch (Exception ex)
            {
                return new BO.ErrorObject { ErrorMessage = "Error occured while associating company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
        }
        #endregion

        #region Delete preferred comapny
        public override object DeletePreferredCompany(int preferredCompanyId, int currentCompanyId)
        {

            try
            {
                BO.GBEnums.CompanyType prferredCompanyType = _context.Companies.Where(p => p.id == preferredCompanyId
                                                                                      && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                               .Select(p1 => (BO.GBEnums.CompanyType)p1.CompanyType)
                                                                               .FirstOrDefault();

                BO.GBEnums.CompanyType currentCompanyType = _context.Companies.Where(p => p.id == currentCompanyId
                                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                  .Select(p1 => (BO.GBEnums.CompanyType)p1.CompanyType)
                                                                                  .FirstOrDefault();

                using (var dbContextTransaction = _context.Database.BeginTransaction())
                {
                    if (prferredCompanyType == BO.GBEnums.CompanyType.MedicalProvider)
                    {
                        PreferredMedicalProvider PreferredMedicalProviderDB = null;
                        PreferredMedicalProviderDB = _context.PreferredMedicalProviders.Where(p => p.PrefMedProviderId == preferredCompanyId
                                                                                      && p.CompanyId == currentCompanyId
                                                                                      && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                                                             ).FirstOrDefault();
                        if (PreferredMedicalProviderDB != null)
                        {
                            PreferredMedicalProviderDB.IsDeleted = true;
                            PreferredMedicalProviderDB.UpdateDate = DateTime.UtcNow;
                            PreferredMedicalProviderDB.UpdateByUserID = System.Convert.ToInt32(Utility.GetConfigValue("DefaultAdminUserID"));
                            _context.SaveChanges();

                        }
                        else
                        {
                            return new BO.ErrorObject { ErrorMessage = "This Medical provider is not associated with this company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                        }
                    }
                    else if (prferredCompanyType == BO.GBEnums.CompanyType.Attorney)
                    {
                        PreferredAttorneyProvider PreferredAttorneyProviderDB = null;
                        PreferredAttorneyProviderDB = _context.PreferredAttorneyProviders.Where(p => p.PrefAttorneyProviderId == preferredCompanyId
                                                                                      && p.CompanyId == currentCompanyId
                                                                                      && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                                                             ).FirstOrDefault();
                        if (PreferredAttorneyProviderDB != null)
                        {
                            PreferredAttorneyProviderDB.IsDeleted = true;
                            PreferredAttorneyProviderDB.UpdateDate = DateTime.UtcNow;
                            PreferredAttorneyProviderDB.UpdateByUserID = System.Convert.ToInt32(Utility.GetConfigValue("DefaultAdminUserID"));
                            _context.SaveChanges();

                        }
                        else
                        {
                            return new BO.ErrorObject { ErrorMessage = "This Attorney provider is not associated with this company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                        }
                    }
                    else if (prferredCompanyType == BO.GBEnums.CompanyType.Ancillary)
                    {
                        PreferredAncillaryProvider PreferredAncillaryProviderDB = null;
                        PreferredAncillaryProviderDB = _context.PreferredAncillaryProviders.Where(p => p.PrefAncillaryProviderId == preferredCompanyId
                                                                                      && p.CompanyId == currentCompanyId
                                                                                      && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                                                             ).FirstOrDefault();
                        if (PreferredAncillaryProviderDB != null)
                        {
                            PreferredAncillaryProviderDB.IsDeleted = true;
                            PreferredAncillaryProviderDB.UpdateDate = DateTime.UtcNow;
                            PreferredAncillaryProviderDB.UpdateByUserID = System.Convert.ToInt32(Utility.GetConfigValue("DefaultAdminUserID"));
                            _context.SaveChanges();

                        }
                        else
                        {
                            return new BO.ErrorObject { ErrorMessage = "This Ancillary provider is not associated with this company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                        }
                    }

                    if (currentCompanyType == BO.GBEnums.CompanyType.MedicalProvider)
                    {
                        PreferredMedicalProvider PreferredMedicalProviderDB = null;
                        PreferredMedicalProviderDB = _context.PreferredMedicalProviders.Where(p => p.PrefMedProviderId == currentCompanyId
                                                                                      && p.CompanyId == preferredCompanyId
                                                                                      && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                                                             ).FirstOrDefault();
                        if (PreferredMedicalProviderDB != null)
                        {
                            PreferredMedicalProviderDB.IsDeleted = true;
                            PreferredMedicalProviderDB.UpdateDate = DateTime.UtcNow;
                            PreferredMedicalProviderDB.UpdateByUserID = System.Convert.ToInt32(Utility.GetConfigValue("DefaultAdminUserID"));
                            _context.SaveChanges();

                        }
                        else
                        {
                            return new BO.ErrorObject { ErrorMessage = "This Medical provider is not associated with this company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                        }
                    }
                    else if (currentCompanyType == BO.GBEnums.CompanyType.Attorney)
                    {
                        PreferredAttorneyProvider PreferredAttorneyProviderDB = null;
                        PreferredAttorneyProviderDB = _context.PreferredAttorneyProviders.Where(p => p.PrefAttorneyProviderId == currentCompanyId
                                                                                      && p.CompanyId == preferredCompanyId
                                                                                      && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                                                             ).FirstOrDefault();
                        if (PreferredAttorneyProviderDB != null)
                        {
                            PreferredAttorneyProviderDB.IsDeleted = true;
                            PreferredAttorneyProviderDB.UpdateDate = DateTime.UtcNow;
                            PreferredAttorneyProviderDB.UpdateByUserID = System.Convert.ToInt32(Utility.GetConfigValue("DefaultAdminUserID"));
                            _context.SaveChanges();

                        }
                        else
                        {
                            return new BO.ErrorObject { ErrorMessage = "This Attorney provider is not associated with this company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                        }
                    }
                    else if (currentCompanyType == BO.GBEnums.CompanyType.Ancillary)
                    {
                        PreferredAncillaryProvider PreferredAncillaryProviderDB = null;
                        PreferredAncillaryProviderDB = _context.PreferredAncillaryProviders.Where(p => p.PrefAncillaryProviderId == currentCompanyId
                                                                                      && p.CompanyId == preferredCompanyId
                                                                                      && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                                                             ).FirstOrDefault();
                        if (PreferredAncillaryProviderDB != null)
                        {
                            PreferredAncillaryProviderDB.IsDeleted = true;
                            PreferredAncillaryProviderDB.UpdateDate = DateTime.UtcNow;
                            PreferredAncillaryProviderDB.UpdateByUserID = System.Convert.ToInt32(Utility.GetConfigValue("DefaultAdminUserID"));
                            _context.SaveChanges();

                        }
                        else
                        {
                            return new BO.ErrorObject { ErrorMessage = "This Ancillary provider is not associated with this company.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                        }
                    }

                    dbContextTransaction.Commit();

                    return true;
                }
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
