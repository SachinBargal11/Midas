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
    public class ScheduleDetail : GbObject
    {
        private string _name;
        [JsonProperty("name")]
        public string Name
        {
            get
            {
                return this._name;
            }
            set
            {
                _name = value;
            }
        }

        private int _dayofWeek = 0;
        [JsonProperty("dayofWeek")]
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

        private TimeSpan _slotStart;
        [JsonProperty("slotStart")]
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

        private TimeSpan _slotEnd;
        [JsonProperty("slotEnd")]
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

        private DateTime? _slotDate;
        [JsonProperty("slotDate")]
        public DateTime? slotDate
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

        private GBEnums.ScheduleStatus _schedulestatus;
        [JsonProperty("scheduleStatus")]
        public GBEnums.ScheduleStatus scheduleStatus
        {
            get
            {
                return this._schedulestatus;
            }
            set
            {
                _schedulestatus = value;
            }
        }

        [JsonProperty("schedule")]
        public Schedule Schedule { get; set; }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();
            return validations;
        }
    }

    public class mScheduleDetail : GbObject
    {
        private string _name;
        public string Name
        {
            get
            {
                return this._name;
            }
            set
            {
                _name = value;
            }
        }

        private int _dayofWeek = 0;
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
        private TimeSpan _slotStart;
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

        private TimeSpan _slotEnd;
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

        private DateTime? _slotDate;
        public DateTime? slotDate
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

        private GBEnums.ScheduleStatus _schedulestatus;
        public GBEnums.ScheduleStatus scheduleStatus
        {
            get
            {
                return this._schedulestatus;
            }
            set
            {
                _schedulestatus = value;
            }
        }

        public mSchedule mSchedule { get; set; }

    }
}
