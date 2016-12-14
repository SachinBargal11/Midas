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
    public class Room : GbObject
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

        private string _contactpersonname;
        public string contactersonName
        {
            get
            {
                return this._contactpersonname;
            }
            set
            {
                _contactpersonname = value;
            }
        }

        private string _phone;
        public string phone
        {
            get
            {
                return this._phone;
            }
            set
            {
                _phone = value;
            }
        }

        private RoomTest _roomtest;
        public RoomTest roomTest
        {
            get
            {
                return this._roomtest;
            }
            set
            {
                _roomtest = value;
            }
        }

        private List<RoomTest> _locationrooms;
        public List<RoomTest> locationRooms
        {
            get
            {
                return this._locationrooms;
            }
            set
            {
                _locationrooms = value;
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
