﻿using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class DoctorLocationSpeciality : GbObject
    {
        private Doctor _doctor;
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
        private Specialty _speciality;
        public Specialty speciality
        {
            get
            {
                return this._speciality;
            }
            set
            {
                _speciality = value;
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
