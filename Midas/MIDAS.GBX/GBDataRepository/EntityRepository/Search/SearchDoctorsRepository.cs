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

            IQueryable<int> AllDoctors = _context.Doctors.Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                         .Select(p => p.Id);

            IQueryable<int> DoYouNeedTransportionDoctors = null;
            if (searchDoctors.DoYouNeedTransportion == true)
            {
                var MedicalProviderWithAncillary = _context.PreferredAncillaryProviders.Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))
                                                                                       .Select(p => p.CompanyId);

                var Users = _context.UserCompanies.Where(p => MedicalProviderWithAncillary.Contains(p.CompanyID) == true
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                  .Select(p => p.UserID);

                DoYouNeedTransportionDoctors = _context.Doctors.Where(p => Users.Contains(p.Id) == true
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                               .Select(p => p.Id);
            }
            else
            {
                DoYouNeedTransportionDoctors = AllDoctors;
            }

            IQueryable<int> GenderIdDoctors = null;
            if (searchDoctors.GenderId.HasValue == true)
            {
                GenderIdDoctors = _context.Doctors.Where(p => p.GenderId == searchDoctors.GenderId.Value
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                  .Select(p => p.Id);
            }
            else
            {
                GenderIdDoctors = AllDoctors;
            }

            IQueryable<int> PatientNeedsDoctors = null;
            PatientNeedsDoctors = _context.DoctorLocationSchedules.Include("Location").Where(p => p.Location.HandicapRamp == searchDoctors.HandicapRamp
                                                                        && p.Location.StairsToOffice == searchDoctors.StairsToOffice
                                                                        && p.Location.PublicTransportNearOffice == searchDoctors.PublicTransportNearOffice)
                                                                  .Select(p => p.DoctorID);

            IQueryable<int> MultipleDoctors = null;
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

                MultipleDoctors = _context.UserCompanies.Where(p => MultipleDoctorCompanies.Contains(p.CompanyID) == true
                                                        && Doctors.Contains(p.UserID) == true
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                  .Select(p => p.UserID);
            }
            else
            {
                MultipleDoctors = AllDoctors;
            }

            var SearchDoctorsList = _context.Doctors.Where(p => DoYouNeedTransportionDoctors.Contains(p.Id) == true
                                                        && GenderIdDoctors.Contains(p.Id) == true
                                                        && PatientNeedsDoctors.Contains(p.Id) == true
                                                        && MultipleDoctors.Contains(p.Id) == true
                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                    .Join(_context.Users.Where(p => p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)), 
                                                        dt => dt.Id, usr => usr.id, (dt, usr) => new {
                                                            id = dt.Id,
                                                            title = dt.Title,
                                                            genderId = dt.GenderId,
                                                            firstName = usr.FirstName,
                                                            middleName = usr.MiddleName,
                                                            lastName = usr.LastName
                                                        })
                                                    .ToList();

            return (object)SearchDoctorsList;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
