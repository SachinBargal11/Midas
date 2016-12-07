using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class Schedule : GbObject
    {
        public int _dayofWeek = 0;
        public int dayofWeek
        {
            get
            {
                return this._dayofWeek;
            }
            set
            {
                _dayofWeek = value;
            }
        }
        public TimeSpan _slotStart;
        public TimeSpan slotStart
        {
            get
            {
                return this._slotStart;
            }
            set
            {
                _slotStart = value;
            }
        }

        public TimeSpan _slotEnd;
        public TimeSpan slotEnd
        {
            get
            {
                return this._slotEnd;
            }
            set
            {
                _slotEnd = value;
            }
        }

        public DateTime ? _slotDate;
        public DateTime ? slotDate
        {
            get
            {
                return this._slotDate;
            }
            set
            {
                _slotDate = value;
            }
        }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();
            return validations;
        }
    }
}
