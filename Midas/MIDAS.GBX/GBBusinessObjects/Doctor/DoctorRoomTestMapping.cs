using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class DoctorRoomTestMapping : GbObject
    {
        public Doctor Doctor { get; set; }
        public RoomTest RoomTest { get; set; }
        public int [] RoomTests { get; set; }
    }
}
