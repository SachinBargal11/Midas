using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class RefferingOfficeRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<RefferingOffice> _dbSet;


        #region Constructor
        public RefferingOfficeRepository(MIDASGBXEntities context)
            : base(context)
        {

            _dbSet = context.Set<RefferingOffice>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            RefferingOffice refferingOffice = entity as RefferingOffice;

            if (refferingOffice == null)
                return default(T);

            BO.RefferingOffice refferenceOfficeBO2 = new BO.RefferingOffice();

            refferenceOfficeBO2.ID = refferingOffice.Id;
            refferenceOfficeBO2.PatientId = refferingOffice.PatientId;
            refferenceOfficeBO2.RefferingOfficeId = refferingOffice.RefferingOfficeId;
            refferenceOfficeBO2.AddressInfoId = refferingOffice.AddressInfoId;
            refferenceOfficeBO2.ReffferingDoctorId = refferingOffice.ReffferingDoctorId;
            refferenceOfficeBO2.NPI = refferingOffice.NPI;

            if (refferingOffice.IsDeleted.HasValue)
                refferenceOfficeBO2.IsDeleted = refferingOffice.IsDeleted.Value;
            if (refferingOffice.UpdateByUserID.HasValue)
                refferenceOfficeBO2.UpdateByUserID = refferingOffice.UpdateByUserID.Value;



            if (refferingOffice.AddressInfo != null)
            {
                BO.AddressInfo boAddress = new BO.AddressInfo();
                boAddress.Name = refferingOffice.AddressInfo.Name;
                boAddress.Address1 = refferingOffice.AddressInfo.Address1;
                boAddress.Address2 = refferingOffice.AddressInfo.Address2;
                boAddress.City = refferingOffice.AddressInfo.City;
                boAddress.State = refferingOffice.AddressInfo.State;
                boAddress.ZipCode = refferingOffice.AddressInfo.ZipCode;
                boAddress.Country = refferingOffice.AddressInfo.Country;
                boAddress.CreateByUserID = refferingOffice.AddressInfo.CreateByUserID;
                boAddress.ID = refferingOffice.AddressInfo.id;
                refferenceOfficeBO2.AddressInfo = boAddress;
            }


            return (T)(object)refferenceOfficeBO2;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.RefferingOffice refferingOffice = (BO.RefferingOffice)(object)entity;
            var result = refferingOffice.Validate(refferingOffice);
            return result;
        }
        #endregion

        #region Get By Id 
        public override object Get(int id)
        {

            var acc = _context.RefferingOffices.Include("AddressInfo").Where(p => p.Id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<RefferingOffice>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this RefferingOffice.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                BO.RefferingOffice acc_ = Convert<BO.RefferingOffice, RefferingOffice>(acc);
                return (object)acc_;
            }
        }
        #endregion




        #region Get By Patient ID 
        public override object GetByPatientId(int id)
        {
            //var acc = _context.Patient2.Include("User").Include("Location").Where(p => p.Id == id && p.IsDeleted == false).FirstOrDefault<Patient2>();
            var acc = _context.RefferingOffices.Include("AddressInfo").Where(p => p.PatientId == id).ToList<RefferingOffice>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.RefferingOffice> lstrefoffice = new List<BO.RefferingOffice>();
                foreach (RefferingOffice item in acc)
                {
                    lstrefoffice.Add(Convert<BO.RefferingOffice, RefferingOffice>(item));
                }
                return lstrefoffice;
            }
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.RefferingOffice refferingOfficeBO = (BO.RefferingOffice)(object)entity;
            BO.AddressInfo addressBO = refferingOfficeBO.AddressInfo;


            RefferingOffice refferingOfficeDB = new RefferingOffice();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {

                AddressInfo addressDB = new AddressInfo();


                #region Address
                if (addressBO != null)
                {
                    bool Add_addressDB = false;
                    addressDB = _context.AddressInfoes.Where(p => p.id == addressBO.ID).FirstOrDefault();

                    if (addressDB == null && addressBO.ID <= 0)
                    {
                        addressDB = new AddressInfo();
                        Add_addressDB = true;
                    }
                    else if (addressDB == null && addressBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Address details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    //addressDB.id = addressBO.ID;
                    addressDB.Name = addressBO.Name;
                    addressDB.Address1 = addressBO.Address1;
                    addressDB.Address2 = addressBO.Address2;
                    addressDB.City = addressBO.City;
                    addressDB.State = addressBO.State;
                    addressDB.ZipCode = addressBO.ZipCode;
                    addressDB.Country = addressBO.Country;

                    if (Add_addressDB == true)
                    {
                        addressDB = _context.AddressInfoes.Add(addressDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Address details.", ErrorLevel = ErrorLevel.Error };
                }
                #endregion   

                #region refference office
                if (refferingOfficeBO != null)
                {
                    if (refferingOfficeBO.IsCurrentReffOffice == true)
                    {
                        var existingrefferingOfficeDB = _context.RefferingOffices.Where(p => p.PatientId == refferingOfficeBO.PatientId).ToList();
                        existingrefferingOfficeDB.ForEach(p => p.IsCurrentReffOffice = false);
                    }

                    bool Add_refferingOfficeDB = false;
                    refferingOfficeDB = _context.RefferingOffices.Include("AddressInfo").Where(p => p.Id == refferingOfficeBO.ID && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault();

                    if (refferingOfficeDB == null && refferingOfficeBO.ID <= 0)
                    {
                        refferingOfficeDB = new RefferingOffice();
                        Add_refferingOfficeDB = true;
                    }
                    else if (refferingOfficeDB == null && refferingOfficeBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Address details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    refferingOfficeDB.PatientId = refferingOfficeBO.PatientId;
                    refferingOfficeDB.RefferingOfficeId = refferingOfficeBO.RefferingOfficeId;
                    refferingOfficeDB.AddressInfoId = addressDB.id;
                    refferingOfficeDB.ReffferingDoctorId = refferingOfficeBO.ReffferingDoctorId;
                    refferingOfficeDB.NPI = refferingOfficeBO.NPI;
                    refferingOfficeDB.IsCurrentReffOffice = refferingOfficeBO.IsCurrentReffOffice;
                    refferingOfficeDB.IsDeleted = refferingOfficeBO.IsDeleted;
                    refferingOfficeDB.CreateByUserID = refferingOfficeBO.CreateByUserID;
                    refferingOfficeDB.CreateDate = refferingOfficeBO.CreateDate;
                    refferingOfficeDB.UpdateByUserID = refferingOfficeBO.UpdateByUserID;
                    refferingOfficeDB.UpdateDate = refferingOfficeBO.UpdateDate;


                    if (Add_refferingOfficeDB == true)
                    {
                        refferingOfficeDB = _context.RefferingOffices.Add(refferingOfficeDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Reffering Office details.", ErrorLevel = ErrorLevel.Error };
                }
                #endregion





                dbContextTransaction.Commit();

                refferingOfficeDB = _context.RefferingOffices.Include("AddressInfo").Where(p => p.Id == refferingOfficeDB.Id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault<RefferingOffice>();
            }

            var res = Convert<BO.RefferingOffice, RefferingOffice>(refferingOfficeDB);
            return (object)res;
        }
        #endregion

        #region Delete By ID
        public override object Delete(int id)
        {
            RefferingOffice refferingOfficeDB = new RefferingOffice();
            //BO.SpecialtyDetails specialtyDetailBO = entity as BO.SpecialtyDetails;

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                refferingOfficeDB = _context.RefferingOffices.Include("AddressInfo").Where(p => p.Id == id && (p.IsDeleted == false || p.IsDeleted == null)).FirstOrDefault();

                if (refferingOfficeDB != null)
                {
                    refferingOfficeDB.IsDeleted = true;
                    _context.SaveChanges();

                    if (refferingOfficeDB.AddressInfo != null)
                    {
                        refferingOfficeDB.AddressInfo.IsDeleted = true;
                        _context.SaveChanges();
                    }
                    else
                    {
                        dbContextTransaction.Rollback();
                    }

                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Reffering Office details dosent exists.", ErrorLevel = ErrorLevel.Error };
                }


                dbContextTransaction.Commit();

            }
            var res = Convert<BO.RefferingOffice, RefferingOffice>(refferingOfficeDB);
            return (object)res;
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
