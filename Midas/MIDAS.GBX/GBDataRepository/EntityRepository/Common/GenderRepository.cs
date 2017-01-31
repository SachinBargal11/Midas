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
    internal class GenderRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<Gender> _dbMstatus;

        public GenderRepository(MIDASGBXEntities context) : base(context)
        {
            _dbMstatus = context.Set<Gender>();
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            List<Gender> listgender = entity as List<Gender>;
            if (listgender == null)
                return default(T);

            List<BO.Common.Gender> BOlistgenderlist = new List<BO.Common.Gender>();
            foreach (var mgender in listgender)
            {
                BO.Common.Gender boGender = new BO.Common.Gender();

                boGender.ID = mgender.Id;
                boGender.GenderText = mgender.GenderText;
                boGender.IsDeleted = mgender.IsDeleted;
                BOlistgenderlist.Add(boGender);
            }


            return (T)(object)BOlistgenderlist;
        }
        #endregion

        #region Entity Conversion
        public override T ObjectConvert<T, U>(U entity)
        {
            Gender gender = entity as Gender;

            if (gender == null)
                return default(T);

            BO.Common.Gender genderBO = new BO.Common.Gender();
            genderBO.ID = gender.Id;
            genderBO.GenderText = gender.GenderText;
            genderBO.IsDeleted = gender.IsDeleted;
            return (T)(object)genderBO;
        }
        #endregion


        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.Genders.Where(p => p.Id == id && (p.IsDeleted == false || p.IsDeleted != null)).FirstOrDefault<Gender>();
            BO.Common.Gender acc_ = ObjectConvert<BO.Common.Gender, Gender>(acc);

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
            var acc = _context.Genders.Where(p => p.IsDeleted == false || p.IsDeleted == null).ToList<Gender>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Common.Gender> acc_ = Convert<List<BO.Common.Gender>, List<Gender>>(acc);
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
