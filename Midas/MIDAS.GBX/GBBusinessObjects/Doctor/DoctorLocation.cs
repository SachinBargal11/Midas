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
    public class DoctorLocationSchedule : GbObject
    {
        private Doctor _doctor;

        [JsonProperty("doctor")]
        public Doctor doctor
        {
            get
            {
                return this._doctor;
            }
            set
            {
                _doctor = value;
            }
        }

        private Location _location;

        [JsonProperty("location")]
        public Location location
        {
            get
            {
                return this._location;
            }
            set
            {
                _location = value;
            }
        }

        private Schedule _schedule;
        [JsonProperty("schedule")]
        public Schedule schedule
        {
            get
            {
                return this._schedule;
            }
            set
            {
                _schedule = value;
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
