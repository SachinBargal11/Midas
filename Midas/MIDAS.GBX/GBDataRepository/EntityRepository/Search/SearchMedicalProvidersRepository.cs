using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.DataRepository.EntityRepository.Common;
using MIDAS.GBX.Common;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class SearchMedicalProvidersRepository : BaseEntityRepo, IDisposable
    {
        //private DbSet<Company> _dbCompany;

        public SearchMedicalProvidersRepository(MIDASGBXEntities context) : base(context)
        {
            //_dbCompany = context.Set<Company>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.SearchMedicalProviders searchMedicalProviders = (BO.SearchMedicalProviders)(object)entity;
            var result = searchMedicalProviders.Validate(searchMedicalProviders);
            return result;
        }
        #endregion

        #region save
        public override object GetMedicalProviders<T>(T entity)
        {
            BO.SearchMedicalProviders searchMedicalProviders = (BO.SearchMedicalProviders)(object)entity;

            int CurrentCompanyId = searchMedicalProviders.CurrentCompanyId;
            IQueryable<int> CurrentCompanyMedicalProviders = _context.PreferredMedicalProviders.Where(p => p.CompanyId == CurrentCompanyId
                                                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                              .Select(p => p.PrefMedProviderId);

            IQueryable<int> DoYouNeedTransportionMedicalProviders = null;
            if (searchMedicalProviders.DoYouNeedTransportion == true)
            {
                DoYouNeedTransportionMedicalProviders = _context.PreferredAncillaryProviders.Where(p => CurrentCompanyMedicalProviders.Contains(p.CompanyId) == true
                                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                   .Select(p => p.CompanyId);                
            }
            else
            {
                DoYouNeedTransportionMedicalProviders = CurrentCompanyMedicalProviders;
            }

            //TimeSpan SlotStart = searchMedicalProviders.AvailableFromDateTime.Value.TimeOfDay;
            //TimeSpan SlotEnd = searchMedicalProviders.AvailableToDateTime.Value.TimeOfDay;

            //IQueryable<int> AvailableFromAndToDateTime = null;
            //AvailableFromAndToDateTime = _context.Locations.Where(p => CurrentCompanyMedicalProviders.Contains(p.CompanyID) == true
            //                                                    && p.ScheduleID.HasValue == true
            //                                                    && (p.Schedule.IsDeleted.HasValue == false || (p.Schedule.IsDeleted.HasValue == true && p.Schedule.IsDeleted.Value == false))
            //                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
            //                                     .Join(_context.ScheduleDetails.Where(p => p.SlotStart >= SlotStart && p.SlotEnd <= SlotEnd
            //                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))),
            //                                            l => l.ScheduleID, sd => sd.ScheduleID, (l, sd) => l)
            //                                     .Select(p => p.CompanyID);

            IQueryable<int> GenderIdDoctorMedicalProviders = null;
            if (searchMedicalProviders.GenderId.HasValue == true)
            {
                var GenderIdDoctors = _context.Doctors.Where(p => p.GenderId == searchMedicalProviders.GenderId.Value
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                  .Select(p => p.Id);

                GenderIdDoctorMedicalProviders = _context.UserCompanies.Where(p => GenderIdDoctors.Contains(p.UserID) == true
                                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                       .Select(p => p.CompanyID);
            }
            else
            {
                GenderIdDoctorMedicalProviders = CurrentCompanyMedicalProviders;
            }

            IQueryable<int> PatientNeedsMedicalProviders = null;
            PatientNeedsMedicalProviders = _context.Locations.Where(p => p.HandicapRamp == searchMedicalProviders.HandicapRamp
                                                                    && p.StairsToOffice == searchMedicalProviders.StairsToOffice
                                                                    && p.PublicTransportNearOffice == searchMedicalProviders.PublicTransportNearOffice
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                             .Select(p => p.CompanyID);

            IQueryable<int> MultipleDoctorMedicalProviders = null;
            if (searchMedicalProviders.MultipleDoctors == true)
            {
                var Doctors = _context.Doctors.Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                              .Select(p => p.Id);

                var DoctorUsers = _context.UserCompanies.Where(p => CurrentCompanyMedicalProviders.Contains(p.CompanyID) == true
                                                            && Doctors.Contains(p.UserID) == true
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)));

                MultipleDoctorMedicalProviders = DoctorUsers.GroupBy(p => p.CompanyID)
                                                            .Select(p => new { p.Key, Count = p.Count() })
                                                            .Where(p => p.Count > 1)
                                                            .Select(p => p.Key);
            }
            else
            {
                MultipleDoctorMedicalProviders = CurrentCompanyMedicalProviders;
            }

            var SearchMedicalProvidersList = _context.Companies.Where(p => CurrentCompanyMedicalProviders.Contains(p.id) == true
                                                                    && DoYouNeedTransportionMedicalProviders.Contains(p.id) == true
                                                                    && GenderIdDoctorMedicalProviders.Contains(p.id) == true
                                                                    && PatientNeedsMedicalProviders.Contains(p.id) == true
                                                                    && MultipleDoctorMedicalProviders.Contains(p.id) == true
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                               .Select(p => new
                                                               {
                                                                   id = p.id,
                                                                   name = p.Name
                                                               })
                                                               .ToList();

            return (object)SearchMedicalProvidersList;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
