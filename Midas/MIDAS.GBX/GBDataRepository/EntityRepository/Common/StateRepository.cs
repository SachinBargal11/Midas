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
    internal class StateRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<State> _dbState;

        public StateRepository(MIDASGBXEntities context) : base(context)
        {
            _dbState = context.Set<State>();
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            List<State> states = entity as List<State>;
            if (states == null)
                return default(T);

            List<BO.Common.State> boStates = new List<BO.Common.State>();
            foreach (var eachState in states)
            {
                BO.Common.State boState = new BO.Common.State();

                boState.ID = eachState.Id;
                boState.StateCode = eachState.StateCode;
                boState.StateText = eachState.StateText;
                boState.IsDeleted = eachState.IsDeleted;

                boStates.Add(boState);
            }
                      

            return (T)(object)boStates;
        }
        #endregion

        #region Get All States
        public override Object Get()
        {
            var acc = _context.States.Where(p => p.IsDeleted == false || p.IsDeleted == null).ToList<State>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No states found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Common.State> acc_ = Convert<List<BO.Common.State>, List<State>>(acc);
                return (object)acc_;
            }

        }
        #endregion

        #region Get All States Filtered By City
        public override Object Get(string City)
        {
            List<string> stateCodes = _context.Cities.Where(p => p.CityText.Contains(City)).Select(p => p.StateCode).ToList<string>();
            var acc = _context.States.Where(p => stateCodes.Contains(p.StateCode) && (p.IsDeleted == false || p.IsDeleted == null)).ToList<State>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No states found for given city.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Common.State> acc_ = Convert<List<BO.Common.State>, List<State>>(acc);
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
