#region Imports
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using GBDataRepository.Model;
using BO = Midas.GreenBill.BusinessObject;
using Midas.Common;
using Midas.GreenBill.EN;
using System.Web.Script.Serialization;
using Newtonsoft.Json.Linq;
#endregion

namespace Midas.GreenBill.EntityRepository
{
    internal class SpecialtyDetailsRepository : BaseEntityRepo
    {
        private DbSet<SpecialtyDetail> _dbSet;

        #region Constructor
        public SpecialtyDetailsRepository(GreenBillsDbEntities context) : base(context)
        {
            _dbSet = context.Set<SpecialtyDetail>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            SpecialtyDetail specialty = entity as SpecialtyDetail;
            if (specialty == null)
                return default(T);

            BO.SpecialityDetails boSpecialtyDetails = new BO.SpecialityDetails();

            boSpecialtyDetails.ID = specialty.ID;
            if(specialty.IsUnitApply.HasValue)
            boSpecialtyDetails.IsUnitApply = specialty.IsUnitApply.Value;
            if(specialty.FollowUpDays.HasValue)
            boSpecialtyDetails.FollowUpDays = specialty.FollowUpDays.Value;
            if (specialty.FollowupTime.HasValue)
                boSpecialtyDetails.FollowupTime = specialty.FollowupTime.Value;
            if (specialty.InitialDays.HasValue)
                boSpecialtyDetails.InitialDays = specialty.InitialDays.Value;
            if (specialty.InitialTime.HasValue)
                boSpecialtyDetails.InitialTime = specialty.InitialTime.Value;
            if (specialty.IsInitialEvaluation.HasValue)
                boSpecialtyDetails.IsInitialEvaluation = specialty.IsInitialEvaluation.Value;
            if (specialty.Include1500.HasValue)
                boSpecialtyDetails.Include1500 = specialty.Include1500.Value;
            if (specialty.AssociatedSpecialty.HasValue)
                boSpecialtyDetails.AssociatedSpecialty = specialty.AssociatedSpecialty.Value;
            if (specialty.AllowMultipleVisit.HasValue)
                boSpecialtyDetails.AllowMultipleVisit = specialty.AllowMultipleVisit.Value;

            if (specialty.IsDeleted.HasValue)
                boSpecialtyDetails.IsDeleted = System.Convert.ToBoolean(specialty.IsDeleted.Value);
            if (specialty.UpdateByUserID.HasValue)
                boSpecialtyDetails.UpdateByUserID = specialty.UpdateByUserID.Value;
            if (specialty.UpdateDate.HasValue)
                boSpecialtyDetails.UpdateDate = specialty.UpdateDate.Value;

            if(specialty.MedicalFacility!=null)
            {
                BO.MedicalFacility boMedicalFacility = new BO.MedicalFacility();

                boMedicalFacility.ID = specialty.MedicalFacility.ID;
                boMedicalFacility.Name = specialty.MedicalFacility.Name;
                boMedicalFacility.Prefix = specialty.MedicalFacility.Prefix;
                boMedicalFacility.DefaultAttorneyUserID = specialty.MedicalFacility.DefaultAttorneyUserID.Value;
                boMedicalFacility.CreateByUserID = specialty.MedicalFacility.CreateByUserID;
                boMedicalFacility.CreateDate = specialty.MedicalFacility.CreateDate;
                boSpecialtyDetails.MedicalFacility = boMedicalFacility;
            }
            if (specialty.Specialty != null)
            {
                BO.Specialty boSpecialty = new BO.Specialty();

                boSpecialty.ID = specialty.Specialty.ID;
                boSpecialty.Name = specialty.Specialty.Name;
                boSpecialty.SpecialityCode = specialty.Specialty.SpecialityCode;
                boSpecialty.CreateByUserID = specialty.Specialty.CreateByUserID;
                boSpecialty.CreateDate = specialty.Specialty.CreateDate;
                boSpecialtyDetails.Specialty = boSpecialty;
            }

            return (T)(object)boSpecialtyDetails;
        }
        #endregion

        #region Delete
        public override Object Delete<T>(T entity)
        {
            BO.SpecialityDetails boSpecialtyDetails = entity as BO.SpecialityDetails;

            SpecialtyDetail specialtyDB = new SpecialtyDetail();
            specialtyDB.ID = boSpecialtyDetails.ID;
            _dbSet.Remove(_context.SpecialtyDetails.Single<SpecialtyDetail>(p => p.ID == specialtyDB.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return specialtyDB;
        }
        #endregion

        #region Save Data
        public override Object Save(JObject data)
        {
            BO.SpecialityDetails specialtyDetailsBO = data["specialtyDetail"].ToObject<BO.SpecialityDetails>();
            BO.MedicalFacility medicalFacilityBO = data["medicalFacility"].ToObject<BO.MedicalFacility>();
            BO.Specialty specialtyBO = data["specialty"].ToObject<BO.Specialty>();


            SpecialtyDetail specialtyDetailsDB = new SpecialtyDetail();
            MedicalFacility medicalFacilityDB = new MedicalFacility();
            Specialty SpecialtyDB = new Specialty();

            medicalFacilityDB.ID = medicalFacilityBO.ID;
            SpecialtyDB.ID = specialtyBO.ID;


            #region SpecialtyDetails
            specialtyDetailsDB.ID = specialtyDetailsBO.ID;
            specialtyDetailsDB.IsUnitApply = specialtyDetailsBO.IsUnitApply;
            specialtyDetailsDB.FollowUpDays = specialtyDetailsBO.FollowUpDays;
            specialtyDetailsDB.FollowupTime = specialtyDetailsBO.FollowupTime;
            specialtyDetailsDB.InitialDays = specialtyDetailsBO.InitialDays;
            specialtyDetailsDB.InitialTime = specialtyDetailsBO.InitialTime;
            specialtyDetailsDB.IsInitialEvaluation = specialtyDetailsBO.IsInitialEvaluation;
            specialtyDetailsDB.Include1500 = specialtyDetailsBO.Include1500;
            specialtyDetailsDB.AssociatedSpecialty = specialtyDetailsBO.AssociatedSpecialty;
            specialtyDetailsDB.AllowMultipleVisit = specialtyDetailsBO.AllowMultipleVisit;
            #endregion

            Specialty specialty = _context.Specialties.Where(p => p.ID == SpecialtyDB.ID).FirstOrDefault<Specialty>(); // Functionally not required
            if (specialty != null)
                specialtyDetailsDB.Specialty = specialty;

            MedicalFacility medicalfacility = _context.MedicalFacilities.Where(p => p.ID == medicalFacilityDB.ID).FirstOrDefault<MedicalFacility>(); // Functionally not required
            if (medicalfacility != null)
                specialtyDetailsDB.MedicalFacility = medicalfacility;

            if (specialtyDetailsDB.ID > 0)
            {
                //Find SpecialtyDetails By ID
                SpecialtyDetail specialtydetail = specialtyDetailsDB.ID > 0 ? _context.SpecialtyDetails.Where(p => p.ID == specialtyDetailsDB.ID).FirstOrDefault<SpecialtyDetail>() : _context.SpecialtyDetails.Where(p => p.ID == specialtyDetailsDB.ID).FirstOrDefault<SpecialtyDetail>();

                if (specialtydetail != null)
                {
                    if (specialtyDetailsBO.UpdateByUserID.HasValue)
                        specialtydetail.UpdateByUserID = specialtyDetailsBO.UpdateByUserID.Value;
                    specialtydetail.UpdateDate = DateTime.UtcNow;
                    specialtydetail.IsDeleted = specialtyDetailsBO.IsDeleted;

                    specialtydetail.IsUnitApply = specialtyDetailsBO.IsUnitApply;
                    specialtydetail.FollowUpDays = specialtyDetailsBO.FollowUpDays;
                    specialtydetail.FollowupTime = specialtyDetailsBO.FollowupTime;
                    specialtydetail.InitialDays = specialtyDetailsBO.InitialDays;
                    specialtydetail.InitialTime = specialtyDetailsBO.InitialTime;
                    specialtydetail.IsInitialEvaluation = specialtyDetailsBO.IsInitialEvaluation;
                    specialtydetail.Include1500 = specialtyDetailsBO.Include1500;
                    specialtydetail.AssociatedSpecialty = specialtyDetailsBO.AssociatedSpecialty;
                    specialtydetail.AllowMultipleVisit = specialtyDetailsBO.AllowMultipleVisit;

                    if (specialtydetail.MedicalFacility != null)
                    {
                        specialtydetail.MedicalFacility.ID = medicalFacilityBO.ID;
                    }
                }
                else
                {
                    throw new GbException();
                }
                _context.Entry(specialty).State = System.Data.Entity.EntityState.Modified;
                specialtyDetailsDB = specialtydetail;
            }
            else
            {
                specialtyDetailsDB.CreateDate = DateTime.UtcNow;
                specialtyDetailsDB.CreateByUserID = specialtyDetailsDB.CreateByUserID;

                _dbSet.Add(specialtyDetailsDB);
            }

            _context.SaveChanges();
            BO.SpecialityDetails acc_ = Convert<BO.SpecialityDetails, SpecialtyDetail>(specialtyDetailsDB);

            var res = (BO.GbObject)(object)acc_;
            return (object)res;
        }
        #endregion

        #region Get SpecialtyDetails By ID
        public override Object Get(int id)
        {
            BO.SpecialityDetails acc_ = Convert<BO.SpecialityDetails, SpecialtyDetail>(_context.SpecialtyDetails.Include("Specialty").Include("MedicalFacility").Where(p => p.ID == id).FirstOrDefault<SpecialtyDetail>());
            return (object)acc_;
        }
        #endregion


        #region Get SpecialtyDetails By Search Parameters
        public override Object Get(JObject data)
        {
            List<BO.SpecialityDetails> userBO;
            userBO = data != null ? (data["specialty"] != null ? data["specialty"].ToObject<List<BO.SpecialityDetails>>() : new List<BO.SpecialityDetails>()) : new List<BO.SpecialityDetails>();

            List<EntitySearchParameter> searchParameters = new List<EntityRepository.EntitySearchParameter>();
            foreach (BO.SpecialityDetails item in userBO)
            {
                EntitySearchParameter param = new EntityRepository.EntitySearchParameter();
                param.id = item.ID;
                searchParameters.Add(param);
            }


            Dictionary<Type, String> filterMap = new Dictionary<Type, string>();
            filterMap.Add(typeof(BO.SpecialityDetails), "");
            IQueryable<SpecialtyDetail> query = EntitySearch.CreateSearchQuery<SpecialtyDetail>(_context.SpecialtyDetails, searchParameters, filterMap);
            List<SpecialtyDetail> Users = query.ToList<SpecialtyDetail>();

            return (object)Users;
        }
        #endregion
    }
}
