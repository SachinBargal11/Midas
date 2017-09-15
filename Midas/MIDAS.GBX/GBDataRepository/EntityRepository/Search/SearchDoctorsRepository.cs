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
    internal class SearchDoctorsRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<Doctor> _dbDoctor;

        public SearchDoctorsRepository(MIDASGBXEntities context) : base(context)
        {
            _dbDoctor = context.Set<Doctor>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.SearchDoctors searchDoctors = (BO.SearchDoctors)(object)entity;
            var result = searchDoctors.Validate(searchDoctors);
            return result;
        }
        #endregion

        #region save
        public override object GetDoctors<T>(T entity)
        {
            BO.SearchDoctors searchDoctors = (BO.SearchDoctors)(object)entity;

            var AllDoctors = _context.Doctors.Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false));

            List<int> DoctorIds = new List<int>();

            if (searchDoctors.DoYouNeedTransportion == true)
            {
                var MedicalProviderWithAncillary = _context.PreferredAncillaryProviders.Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                                                       .Select(p => p.CompanyId);

                var Users = _context.UserCompanies.Where(p => MedicalProviderWithAncillary.Contains(p.CompanyID) == true
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                  .Select(p => p.UserID);

                DoctorIds = _context.Doctors.Where(p => Users.Contains(p.Id) == true 
                                                && (DoctorIds.Count > 0 ? DoctorIds.Contains(p.Id) == true : true)
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                            .Select(p => p.Id)
                                            .ToList();
            }

            if (searchDoctors.GenderId.HasValue == true)
            {
                DoctorIds = _context.Doctors.Where(p => p.GenderId == searchDoctors.GenderId.Value 
                                                && (DoctorIds.Count > 0 ? DoctorIds.Contains(p.Id) == true : true)
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                            .Select(p => p.Id)
                                            .ToList();
            }

            DoctorIds = _context.DoctorLocationSchedules.Include("Location").Where(p => p.Location.HandicapRamp == searchDoctors.HandicapRamp
                                                            && p.Location.StairsToOffice == searchDoctors.StairsToOffice
                                                            && p.Location.PublicTransportNearOffice == searchDoctors.PublicTransportNearOffice
                                                            && (DoctorIds.Count > 0 ? DoctorIds.Contains(p.DoctorID) == true : true))
                                                        .Select(p => p.DoctorID)
                                                        .ToList();

            if (searchDoctors.MultipleDoctors == true)
            {
                var MedicalProvider = _context.Companies.Where(p => p.CompanyType == 1
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                        .Select(p => p.id);

                var Doctors = _context.Doctors.Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                              .Select(p => p.Id);

                var Users = _context.UserCompanies.Where(p => MedicalProvider.Contains(p.CompanyID) == true
                                                        && Doctors.Contains(p.UserID) == true
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)));

                var MultipleDoctorCompanies = Users.GroupBy(p => p.CompanyID)
                                                   .Select(p => new { p.Key, Count = p.Count() })
                                                   .Where(p => p.Count >= 2)
                                                   .Select(p => p.Key);

                DoctorIds = _context.UserCompanies.Where(p => MultipleDoctorCompanies.Contains(p.CompanyID) == true
                                                        && Doctors.Contains(p.UserID) == true
                                                        && (DoctorIds.Count > 0 ? DoctorIds.Contains(p.UserID) == true : true)
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                  .Select(p => p.UserID)
                                                  .ToList();
            }

            var SearchDoctorsList = _context.Doctors.Where(p => DoctorIds.Contains(p.Id) == true
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                    .Select(p => new {
                                                        id = p.Id,
                                                        title = p.Title,
                                                        genderId = p.GenderId                                                                                                                                                                        
                                                    });

            return (object)SearchDoctorsList;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
