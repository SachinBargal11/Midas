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
#endregion

namespace Midas.GreenBill.EntityRepository
{
    internal class MedicalFacilityRepository : BaseEntityRepo
    {
        private DbSet<MedicalFacility> _dbSet;

        #region Constructor
        public MedicalFacilityRepository(GreenBillsDbEntities context) : base(context)
        {
            _dbSet = context.Set<MedicalFacility>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            MedicalFacility medicalfacility = entity as MedicalFacility;
            if (medicalfacility == null)
                return default(T);

            BO.MedicalFacility boMedicalFacility = new BO.MedicalFacility();

            boMedicalFacility.ID = medicalfacility.ID;
            boMedicalFacility.Name = medicalfacility.Name;
            boMedicalFacility.AccountID = medicalfacility.AccountID.Value;
            boMedicalFacility.AddressId = medicalfacility.AddressId.Value;
            boMedicalFacility.ContactInfoId = medicalfacility.ContactInfoId.Value;
            boMedicalFacility.Prefix = medicalfacility.Prefix;
            boMedicalFacility.DefaultAttorneyUserID = medicalfacility.DefaultAttorneyUserID;

            return (T)(object)boMedicalFacility;
        }
        #endregion

        #region Delete
        public override Object Delete<T>(T entity)
        {
            BO.MedicalFacility contactinfoBO = entity as BO.MedicalFacility;

            MedicalFacility contactinfoDB = new MedicalFacility();
            contactinfoDB.ID = contactinfoBO.ID;
            _dbSet.Remove(_context.MedicalFacilities.Single<MedicalFacility>(p => p.ID == contactinfoBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            res.Message = Constants.MedicalFacilityDeleted;
            return contactinfoDB;
        }
        #endregion

        #region Save Data
        public override Object Save<T>(T entity)
        {
            BO.MedicalFacility medicalfacilityBO = entity as BO.MedicalFacility;

            MedicalFacility medicalfacilityDB = new MedicalFacility();
            medicalfacilityDB.ID = medicalfacilityBO.ID;
            medicalfacilityDB.Name = medicalfacilityBO.Name;
            medicalfacilityDB.AccountID = medicalfacilityBO.AccountID;
            medicalfacilityDB.AddressId = medicalfacilityBO.AddressId;
            medicalfacilityDB.ContactInfoId = medicalfacilityBO.ContactInfoId;
            medicalfacilityDB.Prefix = medicalfacilityBO.Prefix;
            medicalfacilityDB.DefaultAttorneyUserID = medicalfacilityBO.DefaultAttorneyUserID;

            string Message = "";
            if (medicalfacilityDB.ID > 0)
            {
                medicalfacilityDB.UpdateDate = DateTime.UtcNow;
                medicalfacilityDB.CreateDate = DateTime.UtcNow;
                medicalfacilityDB.UpdateByUserID = medicalfacilityBO.UpdateByUserID;
                _context.Entry(medicalfacilityDB).State = System.Data.Entity.EntityState.Modified;
                Message = Constants.MedicalFacilityUpdated;
            }
            else
            {
                medicalfacilityDB.CreateDate = DateTime.UtcNow;
                medicalfacilityDB.CreateByUserID = medicalfacilityBO.CreateByUserID;
                _dbSet.Add(medicalfacilityDB);
                Message = Constants.MedicalFacilityAdded;
            }

            var res = (BO.GbObject)(object)entity;
            res.Message = Message;
            res.ID = medicalfacilityDB.ID;

            _context.SaveChanges();
            return res;
        }
        #endregion

        #region Get MedicalFacilities By ID
        public override T Get<T>(T entity)
        {
            BO.MedicalFacility acc_ = Convert<BO.MedicalFacility, MedicalFacility>(_context.MedicalFacilities.Find(((BO.GbObject)(object)entity).ID));
            return (T)(object)acc_;
        }
        #endregion


        #region Get MedicalFacilities By Name
        public override List<T> Get<T>(T entity, string name)
        {
            List<EntitySearchParameter> searchParameters = new List<EntitySearchParameter>();
            EntitySearchParameter param = new EntitySearchParameter();
            param.name = name;
            searchParameters.Add(param);

            return Get<T>(entity, searchParameters);
        }
        #endregion

        #region Get MedicalFacilities By Search Parameters
        public override List<T> Get<T>(T entity, List<EntitySearchParameter> searchParameters)
        {
            Dictionary<Type, String> filterMap = new Dictionary<Type, string>();
            filterMap.Add(typeof(BO.MedicalFacility), "");
            IQueryable<MedicalFacility> query = EntitySearch.CreateSearchQuery<MedicalFacility>(_context.MedicalFacilities, searchParameters, filterMap);
            List<MedicalFacility> contactinfoes = query.ToList<MedicalFacility>();
            List<T> boMedicalFacilities = new List<T>();
            contactinfoes.ForEach(t => boMedicalFacilities.Add(Convert<T, MedicalFacility>(t)));
            return boMedicalFacilities;
        }
        #endregion
    }
}
