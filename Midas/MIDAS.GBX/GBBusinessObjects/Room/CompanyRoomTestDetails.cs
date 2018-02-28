using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace MIDAS.GBX.BusinessObjects
{
    public class CompanyRoomTestDetails : GbObject
    {
        [JsonProperty("roomTestID")]
        public int? RoomTestID { get; set; }

        [JsonProperty("companyID")]
        public int? CompanyID { get; set; }

        [Required]
        [JsonProperty("showProcCode")]
        public bool? ShowProcCode { get; set; }

        public Company Company { get; set; }
        public RoomTest RoomTest { get; set; }
    }

    public class mCompanyRoomTestDetails : GbObject
    {
        [JsonProperty("roomTestID")]
        public int? RoomTestID { get; set; }

        [JsonProperty("companyID")]
        public int? CompanyID { get; set; }

        [Required]
        [JsonProperty("showProcCode")]
        public bool? ShowProcCode { get; set; }

        public Company Company { get; set; }
        public RoomTest RoomTest { get; set; }
    }


}
