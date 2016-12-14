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
    public class LocationRoom : GbObject
    {
        private string _name;
        public string name
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

        private Room _room;
        public Room room
        {
            get
            {
                return this._room;
            }
            set
            {
                _room = value;
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
