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
    internal class CityRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<City> _dbCity;

        public CityRepository(MIDASGBXEntities context) : base(context)
        {
            _dbCity = context.Set<City>();
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            List<City> cities = entity as List<City>;
            if (cities == null)
                return default(T);

            List<BO.Common.City> boCities = new List<BO.Common.City>();
            foreach (var eachCity in cities)
            {
                BO.Common.City boCity = new BO.Common.City();

                boCity.ID = eachCity.Id;
                boCity.StateCode = eachCity.StateCode;
                boCity.CityText = eachCity.CityText;
                boCity.IsDeleted = eachCity.IsDeleted;

                boCities.Add(boCity);
            }


            return (T)(object)boCities;
        }
        #endregion

        #region Get All Cities
        public override Object Get()
        {
            var acc = _context.Cities.Where(p => p.IsDeleted == false || p.IsDeleted == null).ToList<City>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No cities found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Common.City> acc_ = Convert<List<BO.Common.City>, List<City>>(acc);
                return (object)acc_;
            }

        }
        #endregion

        #region Get All Cities Filtered By State
        public override Object Get(string State)
        {
            List<string> stateCodes = _context.States.Where(p => p.StateText.Contains(State)).Select(p => p.StateCode).ToList<string>();
            var acc = _context.Cities.Where(p => stateCodes.Contains(p.StateCode) && (p.IsDeleted == false || p.IsDeleted == null)).ToList<City>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No cities found for given state.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Common.City> acc_ = Convert<List<BO.Common.City>, List<City>>(acc);
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
