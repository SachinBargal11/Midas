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
    public class RoomTest : GbObject
    {
        private string _name;
        [JsonProperty("name")]
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

        private List<Room> _rooms;
        [JsonProperty("rooms")]
        public List<Room> rooms
        {
            get
            {
                return this._rooms;
            }
            set
            {
                _rooms = value;
            }
        }

        [Required]
        [JsonProperty("colorCode")]
        public string ColorCode { get; set; }

        [Required]
        [JsonProperty("showProcCode")]
        public bool ShowProcCode { get; set; }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();
            return validations;
        }
    }

    public class mRoomTest : GbObject
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

        private List<mRoom> _rooms;
        public List<mRoom> rooms
        {
            get
            {
                return this._rooms;
            }
            set
            {
                _rooms = value;
            }
        }

        [Required]
        [JsonProperty("colorCode")]
        public string ColorCode { get; set; }

        [Required]
        [JsonProperty("showProcCode")]
        public bool ShowProcCode { get; set; }

        [JsonProperty("Specialty")]
        public List<Specialty> RoomTest { get; set; }

    }
}
