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
    internal class MaritalStatusRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<MaritalStatu> _dbMstatus;

        public MaritalStatusRepository(MIDASGBXEntities context) : base(context)
        {
            _dbMstatus = context.Set<MaritalStatu>();
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            List<MaritalStatu> maritalestatus = entity as List<MaritalStatu>;
            if (maritalestatus == null)
                return default(T);

            List<BO.Common.MaritalStatus> bomaritallist = new List<BO.Common.MaritalStatus>();
            foreach (var mstatus in maritalestatus)
            {
                BO.Common.MaritalStatus boMstatus = new BO.Common.MaritalStatus();

                boMstatus.ID = mstatus.Id;
                boMstatus.StatusText = mstatus.StatusText;
                boMstatus.IsDeleted = mstatus.IsDeleted;
                bomaritallist.Add(boMstatus);
            }


            return (T)(object)bomaritallist;
        }
        #endregion

        #region Entity Conversion
        public override T ObjectConvert<T, U>(U entity)
        {
            MaritalStatu Mstatus = entity as MaritalStatu;

            if (Mstatus == null)
                return default(T);

            BO.Common.MaritalStatus MstatusBO = new BO.Common.MaritalStatus();
            MstatusBO.ID = Mstatus.Id;
            MstatusBO.StatusText = Mstatus.StatusText;
            MstatusBO.IsDeleted = Mstatus.IsDeleted;
            return (T)(object)MstatusBO;
        }
        #endregion


        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.MaritalStatus.Where(p => p.Id == id && (p.IsDeleted == false || p.IsDeleted != null)).FirstOrDefault<MaritalStatu>();
            BO.Common.MaritalStatus acc_ = ObjectConvert<BO.Common.MaritalStatus, MaritalStatu>(acc);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region Get All 
        public override Object Get()
        {
            var acc = _context.MaritalStatus.Where(p => p.IsDeleted == false || p.IsDeleted == null).ToList<MaritalStatu>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No cities found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Common.MaritalStatus> acc_ = Convert<List<BO.Common.MaritalStatus>, List<MaritalStatu>>(acc);
                return (object)acc_;
            }

        }
        #endregion 




        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
