using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository.Common
{
    internal class ReferralRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<Referral> _dbReferral;

        public ReferralRepository(MIDASGBXEntities context) : base(context)
        {
            _dbReferral = context.Set<Referral>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Referral referral = entity as Referral;

            if (referral == null)
                return default(T);

            BO.Referral referralBO = new BO.Referral();

            referralBO.ID = referral.Id;
            referralBO.CaseId = referral.CaseId;
            referralBO.ReferringCompanyId = referral.ReferringCompanyId;
            referralBO.ReferringLocationId = referral.ReferringLocationId;
            referralBO.ReferringDoctorId = referral.ReferringDoctorId;
            referralBO.ReferredToCompanyId = referral.ReferredToCompanyId;
            referralBO.ReferredToLocationId = referral.ReferredToLocationId;
            referralBO.ReferredToDoctorId = referral.ReferredToDoctorId;
            referralBO.ReferredToRoomId = referral.ReferredToRoomId;
            referralBO.Note = referral.Note;
            referralBO.ReferredByEmail = referral.ReferredByEmail;
            referralBO.ReferredToEmail = referral.ReferredToEmail;
            referralBO.ReferralAccepted = referral.ReferralAccepted;
            referralBO.IsDeleted = referral.IsDeleted;
            referralBO.CreateByUserID = referral.CreateByUserID;
            referralBO.UpdateByUserID = referral.UpdateByUserID;

            BO.Company boCompany = new BO.Company();
            using (CompanyRepository cmp = new CompanyRepository(_context))
            {

                boCompany = cmp.Convert<BO.Company, Company>(referral.Company);
                referralBO.Company = boCompany;
            }
            BO.Company boCompany1 = new BO.Company();
            using (CompanyRepository cmp = new CompanyRepository(_context))
            {

                boCompany1 = cmp.Convert<BO.Company, Company>(referral.Company1);
                referralBO.Company1 = boCompany1;
            }

            BO.Location boLocation = new BO.Location();
            using (LocationRepository cmp = new LocationRepository(_context))
            {

                boLocation = cmp.Convert<BO.Location, Location>(referral.Location);
                referralBO.Location = boLocation;
            }
            BO.Location boLocation1 = new BO.Location();
            using (LocationRepository cmp = new LocationRepository(_context))
            {

                boLocation1 = cmp.Convert<BO.Location, Location>(referral.Location1);
                referralBO.Location1 = boLocation1;
            }

            BO.Doctor boDoctor = new BO.Doctor();
            using (DoctorRepository cmp = new DoctorRepository(_context))
            {

                boDoctor = cmp.Convert<BO.Doctor, Doctor>(referral.Doctor);
                referralBO.Doctor = boDoctor;
            }
            BO.Doctor boDoctor1 = new BO.Doctor();
            using (DoctorRepository cmp = new DoctorRepository(_context))
            {

                boDoctor1 = cmp.Convert<BO.Doctor, Doctor>(referral.Doctor1);
                referralBO.Doctor1 = boDoctor1;
            }

            BO.Case boCase = new BO.Case();
            using (CaseRepository cmp = new CaseRepository(_context))
            {

                boCase = cmp.Convert<BO.Case, Case>(referral.Case);
                referralBO.Case = boCase;
            }

            BO.Room boRoom = new BO.Room();
            using (RoomRepository cmp = new RoomRepository(_context))
            {

                boRoom = cmp.Convert<BO.Room, Room>(referral.Room);
                referralBO.Room = boRoom;
            }

            return (T)(object)referralBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Referral referralBO = (BO.Referral)(object)entity;
            var result = referralBO.Validate(referralBO);
            return result;
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.Referral referralBO = (BO.Referral)(object)entity;
            Referral referralDB = new Referral();

            if (referralBO != null)
            {
                referralDB = _context.Referrals.Where(p => p.Id == referralBO.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
                bool add_referral = false;

                if (referralDB == null && referralBO.ID > 0)
                {
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Referral data.", ErrorLevel = ErrorLevel.Error };
                }
                else if (referralDB == null && referralBO.ID <= 0)
                {
                    referralDB = new Referral();
                    add_referral = true;
                }
                referralDB.CaseId = referralBO.CaseId;
                referralDB.ReferringCompanyId = referralBO.ReferringCompanyId;
                referralDB.ReferringLocationId = referralBO.ReferringLocationId;
                referralDB.ReferringDoctorId = referralBO.ReferringDoctorId;
                referralDB.ReferredToCompanyId = referralBO.ReferredToCompanyId;
                referralDB.ReferredToLocationId = referralBO.ReferredToLocationId;
                referralDB.ReferredToDoctorId = referralBO.ReferredToDoctorId;
                referralDB.ReferredToRoomId = referralBO.ReferredToRoomId;
                referralDB.Note = referralBO.Note;
                referralDB.ReferredByEmail = referralBO.ReferredByEmail;
                referralDB.ReferredToEmail = referralBO.ReferredToEmail;
                referralDB.ReferralAccepted = referralBO.ReferralAccepted;

                if (add_referral == true)
                {
                    referralDB = _context.Referrals.Add(referralDB);
                }
                _context.SaveChanges();

            }
            else
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid details.", ErrorLevel = ErrorLevel.Error };
            }
            _context.SaveChanges();

            referralDB =_context.Referrals.Where(p => p.Id == referralDB.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                              .FirstOrDefault<Referral>();
            var res = Convert<BO.Referral, Referral>(referralDB);
            return (object)res;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.Referrals.Include("Case")
                                        .Include("Doctor")
                                        .Where(p => p.Id == id
                                         && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                        .FirstOrDefault<Referral>();

            BO.Referral acc_ = Convert<BO.Referral, Referral>(acc);
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }
        #endregion

        #region Get By Case Id
        public override object GetByCaseId(int CaseId)
        {
            var acc = _context.Referrals.Include("Case")
                                        .Include("Doctor")
                                        .Where(p => p.CaseId == CaseId
                                         && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                        .ToList<Referral>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Referral> lstreferral = new List<BO.Referral>();
                foreach (Referral item in acc)
                {
                    lstreferral.Add(Convert<BO.Referral, Referral>(item));
                }
                return lstreferral;
            }
        }
        #endregion

        #region Get By referringCompanyId
        public override object GetByReferringCompanyId(int id)
        {
            var referralDB = _context.Referrals.Include("Company")
                                               .Include("Company1")
                                               .Include("Location")
                                               .Include("Location1")
                                               .Include("Doctor")
                                               .Include("Doctor1")
                                               .Include("Case")
                                               .Include("Room")
                                               .Where(p => p.ReferringCompanyId == id
                                                &&(p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<Referral>();

            List<BO.Referral> boReferral = new List<BO.Referral>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachDoctor in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral, Referral>(EachDoctor));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get By referredToCompanyId
        public override object GetByReferredToCompanyId(int id)
        {
            var referralDB = _context.Referrals.Include("Company")
                                               .Include("Company1")
                                               .Include("Location")
                                               .Include("Location1")
                                               .Include("Doctor")
                                               .Include("Doctor1")
                                               .Include("Case")
                                               .Include("Room")
                                               .Where(p => p.ReferredToCompanyId == id
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<Referral>();

            List<BO.Referral> boReferral = new List<BO.Referral>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachDoctor in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral, Referral>(EachDoctor));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get By ReferredLocationId
        public override object GetByReferringLocationId(int id)
        {
            List<Referral> lstReferral = _context.Referrals.Include("Company")
                                                           .Include("Company1")
                                                           .Include("Location")
                                                           .Include("Location1")
                                                           .Include("Doctor")
                                                           .Include("Doctor1")
                                                           .Include("Case")
                                                           .Include("Room")
                                                           .Where(p => p.ReferringLocationId == id
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .ToList<Referral>();

            if (lstReferral == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Referral> lstBOReferral = new List<BO.Referral>();
                lstReferral.ForEach(p => lstBOReferral.Add(Convert<BO.Referral, Referral>(p)));

                return lstBOReferral;
            }
        }
        #endregion

        #region Get By ReferredLocationId
        public override object GetByReferringToLocationId(int id)
        {
            List<Referral> lstReferral = _context.Referrals.Include("Company")
                                                           .Include("Company1")
                                                           .Include("Location")
                                                           .Include("Location1")
                                                           .Include("Doctor")
                                                           .Include("Doctor1")
                                                           .Include("Case")
                                                           .Include("Room")
                                                           .Where(p => p.ReferringLocationId == id
                                                           && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                           .ToList<Referral>();

            if (lstReferral == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Referral> lstBOReferral = new List<BO.Referral>();
                lstReferral.ForEach(p => lstBOReferral.Add(Convert<BO.Referral, Referral>(p)));

                return lstBOReferral;
            }
        }
        #endregion

        #region GetByReferringDoctorId
        public override object GetByReferringDoctorId(int id)
        {
            List<Referral> lstReferral = _context.Referrals.Include("Location")
                                                            .Include("Location1")
                                                            .Include("Company")
                                                            .Include("Company1")
                                                            .Include("Doctor")
                                                            .Include("Doctor1")
                                                            .Include("Case")
                                                            .Include("Room")
                                                            .Where(p => p.ReferringDoctorId == id
                                                             && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .ToList<Referral>();

            if (lstReferral == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No Referral found for this Doctor ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Referral> lstBOReferral = new List<BO.Referral>();
                lstReferral.ForEach(p => lstBOReferral.Add(Convert<BO.Referral, Referral>(p)));

                return lstBOReferral;
            }
        }
        #endregion

        #region GetByReferredToDoctorId
        public override object GetByReferredToDoctorId(int id)
        {
            List<Referral> lstReferral = _context.Referrals.Include("Location")
                                                            .Include("Location1")
                                                            .Include("Company")
                                                            .Include("Company1")
                                                            .Include("Doctor")
                                                            .Include("Doctor1")
                                                            .Include("Case")
                                                            .Include("Room")
                                                            .Where(p => p.ReferredToDoctorId == id
                                                             && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .ToList<Referral>();

            if (lstReferral == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No Referral found for this Doctor ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Referral> lstBOReferral = new List<BO.Referral>();
                lstReferral.ForEach(p => lstBOReferral.Add(Convert<BO.Referral, Referral>(p)));

                return lstBOReferral;
            }
        }
        #endregion

        #region Delete By ID
        public override object Delete(int id)
        {
            var acc = _context.Referrals.Where(p => p.Id == id
                                                         && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                         .FirstOrDefault<Referral>();
            if (acc != null)
            {
                acc.IsDeleted = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.Referral, Referral>(acc);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

}
