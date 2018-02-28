using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class DoctorRoomTestMapping : GbObject
    {
        [JsonProperty("doctor")]
        public Doctor Doctor { get; set; }

        [JsonProperty("roomTest")]
        public RoomTest RoomTest { get; set; }

        [JsonProperty("roomTests")]
        public int [] RoomTests { get; set; }
    }
}
