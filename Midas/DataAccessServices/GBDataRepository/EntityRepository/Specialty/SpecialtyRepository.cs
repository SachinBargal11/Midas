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
    internal class SpecialtyRepository : BaseEntityRepo
    {
        private DbSet<Specialty> _dbSet;

        #region Constructor
        public SpecialtyRepository(GreenBillsDbEntities context) : base(context)
        {
            _dbSet = context.Set<Specialty>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Specialty specialty = entity as Specialty;
            if (specialty == null)
                return default(T);

            BO.Specialty boSpecialty = new BO.Specialty();

            boSpecialty.ID = specialty.ID;
            boSpecialty.Name = specialty.Name;
            boSpecialty.SpecialityCode = specialty.SpecialityCode;
            boSpecialty.CreateByUserID = specialty.CreateByUserID;
            boSpecialty.CreateDate = specialty.CreateDate;

            if (specialty.IsDeleted.HasValue)
                boSpecialty.IsDeleted = System.Convert.ToBoolean(specialty.IsDeleted.Value);
            if (specialty.UpdateByUserID.HasValue)
                boSpecialty.UpdateByUserID = specialty.UpdateByUserID.Value;
            if (specialty.UpdateDate.HasValue)
                boSpecialty.UpdateDate = specialty.UpdateDate.Value;

            return (T)(object)boSpecialty;
        }
        #endregion

        #region Delete
        public override Object Delete<T>(T entity)
        {
            BO.Specialty boSpecialty = entity as BO.Specialty;

            Specialty specialtyDB = new Specialty();
            specialtyDB.ID = boSpecialty.ID;
            _dbSet.Remove(_context.Specialties.Single<Specialty>(p => p.ID == specialtyDB.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return specialtyDB;
        }
        #endregion

        #region Save Data
        public override Object Save(JObject data)
        {
            BO.Specialty specialtyBO = data["specialty"].ToObject<BO.Specialty>();


            Specialty specialtyDB = new Specialty();

            if (specialtyDB.ID != 0)
                if (_context.Specialties.Any(o => o.Name == specialtyBO.Name))
                {
                    return new BO.GbObject { Message = Constants.SpecilityAlreadyExists };
                }

            #region Specialty
            specialtyDB.ID = specialtyBO.ID;
            specialtyDB.Name = specialtyBO.Name;
            specialtyDB.SpecialityCode = specialtyBO.SpecialityCode;
            #endregion


            if (specialtyDB.ID > 0)
            {
                //Find Specialty By ID
                Specialty specialty = specialtyDB.ID > 0 ? _context.Specialties.Where(p => p.ID == specialtyDB.ID).FirstOrDefault<Specialty>() : _context.Specialties.Where(p => p.ID == specialtyDB.ID).FirstOrDefault<Specialty>();

                if (specialty != null)
                {
                    if (specialtyBO.UpdateByUserID.HasValue)
                        specialty.UpdateByUserID = specialtyBO.UpdateByUserID.Value;
                    specialty.UpdateDate = DateTime.UtcNow;
                    specialty.IsDeleted = specialtyBO.IsDeleted;

                    specialty.Name = specialtyBO.Name;
                    specialty.SpecialityCode = specialtyBO.SpecialityCode;

                }
                else
                {
                    throw new GbException();
                }
                _context.Entry(specialty).State = System.Data.Entity.EntityState.Modified;
                specialtyDB = specialty;
            }
            else
            {
                specialtyDB.CreateDate = DateTime.UtcNow;
                specialtyDB.CreateByUserID = specialtyBO.CreateByUserID;

                _dbSet.Add(specialtyDB);
            }

            _context.SaveChanges();
            BO.Specialty acc_ = Convert<BO.Specialty, Specialty>(specialtyDB);

            var res = (BO.GbObject)(object)acc_;
            return (object)res;
        }
        #endregion

        #region Get Specialty By ID
        public override Object Get(int id)
        {
            BO.Specialty acc_ = Convert<BO.Specialty, Specialty>(_context.Specialties.Where(p => p.ID == id).FirstOrDefault<Specialty>());
            return (object)acc_;
        }
        #endregion


        #region Get Specialty By Search Parameters
        public override Object Get(JObject data)
        {
            List<BO.Specialty> userBO;
            userBO = data != null ? (data["specialty"] != null ? data["specialty"].ToObject<List<BO.Specialty>>() : new List<BO.Specialty>()) : new List<BO.Specialty>();

            List<EntitySearchParameter> searchParameters = new List<EntityRepository.EntitySearchParameter>();
            foreach (BO.Specialty item in userBO)
            {
                EntitySearchParameter param = new EntityRepository.EntitySearchParameter();
                param.id = item.ID;
                searchParameters.Add(param);
            }


            Dictionary<Type, String> filterMap = new Dictionary<Type, string>();
            filterMap.Add(typeof(BO.Specialty), "");
            IQueryable<Specialty> query = EntitySearch.CreateSearchQuery<Specialty>(_context.Specialties, searchParameters, filterMap);
            List<Specialty> Users = query.ToList<Specialty>();

            return (object)Users;
        }
        #endregion
    }
}
