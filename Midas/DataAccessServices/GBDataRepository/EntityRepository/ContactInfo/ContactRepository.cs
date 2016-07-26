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
    internal class ContactRepository : BaseEntityRepo
    {
        private DbSet<ContactInfo> _dbSet;

        #region Constructor
        public ContactRepository(GreenBillsDbEntities context) : base(context)
        {
            _dbSet = context.Set<ContactInfo>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            ContactInfo contactinfo = entity as ContactInfo;
            if (contactinfo == null)
                return default(T);

            BO.ContactInfo boContactInfo = new BO.ContactInfo();

            boContactInfo.ID = contactinfo.ID;
            boContactInfo.Name = contactinfo.Name;
            boContactInfo.CellPhone = contactinfo.CellPhone;
            boContactInfo.EmailAddress = contactinfo.EmailAddress;
            boContactInfo.HomePhone = contactinfo.HomePhone;
            boContactInfo.WorkPhone = contactinfo.WorkPhone;
            boContactInfo.FaxNo = contactinfo.FaxNo;

            return (T)(object)boContactInfo;
        }
        #endregion

        #region Delete
        public override Object Delete<T>(T entity)
        {
            BO.ContactInfo contactinfoBO = entity as BO.ContactInfo;

            ContactInfo contactinfoDB = new ContactInfo();
            contactinfoDB.ID = contactinfoBO.ID;
            _dbSet.Remove(_context.ContactInfoes.Single<ContactInfo>(p => p.ID == contactinfoBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            res.Message = Constants.ContactInfoDeleted;
            return contactinfoDB;
        }
        #endregion

        #region Save Data
        public override Object Save<T>(T entity)
        {
            BO.ContactInfo contactinfoBO = entity as BO.ContactInfo;

            ContactInfo contactinfoDB = new ContactInfo();
            contactinfoDB.ID = contactinfoBO.ID;
            contactinfoDB.Name = contactinfoBO.Name;
            contactinfoDB.CellPhone = contactinfoBO.CellPhone;
            contactinfoDB.EmailAddress = contactinfoBO.EmailAddress;
            contactinfoDB.HomePhone = contactinfoBO.HomePhone;
            contactinfoDB.WorkPhone = contactinfoBO.WorkPhone;
            contactinfoDB.FaxNo = contactinfoBO.FaxNo;

            contactinfoDB.IsDeleted = contactinfoBO.IsDeleted;
            string Message = "";
            if (contactinfoDB.ID > 0)
            {
                contactinfoDB.UpdateDate = DateTime.UtcNow;
                contactinfoDB.CreateDate = DateTime.UtcNow;
                contactinfoDB.UpdateByUserID = contactinfoBO.UpdateByUserID;
                _context.Entry(contactinfoDB).State = System.Data.Entity.EntityState.Modified;
                Message = Constants.ContactInfoUpdated;
            }
            else
            {
                contactinfoDB.CreateDate = DateTime.UtcNow;
                contactinfoDB.CreateByUserID = contactinfoBO.CreateByUserID;
                _dbSet.Add(contactinfoDB);
                Message = Constants.ContactInfoAdded;
            }

            var res = (BO.GbObject)(object)entity;
            res.Message = Message;
            res.ID = contactinfoDB.ID;
            _context.SaveChanges();
            return res;
        }
        #endregion

        #region Get ContactInfo By ID
        public override T Get<T>(T entity)
        {
            BO.ContactInfo acc_ = Convert<BO.ContactInfo, ContactInfo>(_context.ContactInfoes.Find(((BO.GbObject)(object)entity).ID));
            return (T)(object)acc_;
        }
        #endregion


        #region Get ContactInfo By Name
        public override List<T> Get<T>(T entity, string name)
        {
            List<EntitySearchParameter> searchParameters = new List<EntitySearchParameter>();
            EntitySearchParameter param = new EntitySearchParameter();
            param.name = name;
            searchParameters.Add(param);

            return Get<T>(entity, searchParameters);
        }
        #endregion

        #region Get ContactInfo By Search Parameters
        public override List<T> Get<T>(T entity, List<EntitySearchParameter> searchParameters)
        {
            Dictionary<Type, String> filterMap = new Dictionary<Type, string>();
            filterMap.Add(typeof(BO.ContactInfo), "");
            IQueryable<ContactInfo> query = EntitySearch.CreateSearchQuery<ContactInfo>(_context.ContactInfoes, searchParameters, filterMap);
            List<ContactInfo> contactinfoes = query.ToList<ContactInfo>();
            List<T> boContactInfo = new List<T>();
            contactinfoes.ForEach(t => boContactInfo.Add(Convert<T, ContactInfo>(t)));
            return boContactInfo;
        }
        #endregion
    }
}
