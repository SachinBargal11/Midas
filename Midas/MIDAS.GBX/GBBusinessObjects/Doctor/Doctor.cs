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
    public class Doctor : GbObject
    {
        [Required]
        [JsonProperty("licenseNumber")]
        public string LicenseNumber { get; set; }

        [Required]
        [JsonProperty("wcbAuthorization")]
        public string WCBAuthorization { get; set; }

        [Required]
        [JsonProperty("wcbratingCode")]
        public string WcbRatingCode { get; set; }

        [Required]
        [JsonProperty("npi")]
        public string NPI { get; set; }

        
        [JsonProperty("taxType")]
        public GBEnums.TaxType TaxType { get; set; }

        [Required]
        [JsonProperty("title")]
        public string Title { get; set; }

        [Required]
        [JsonProperty("isCalendarPublic")]
        public bool IsCalendarPublic { get; set; }

        [Required]
        [JsonProperty("genderId")]
        public Byte GenderId { get; set; }

        [JsonProperty("user")]
        public User user { get; set; }

        [JsonProperty("doctorSpecialities")]
        public List<DoctorSpeciality> DoctorSpecialities { get; set; }

        [JsonProperty("doctorLocationSchedules")]
        public List<DoctorLocationSchedule> DoctorLocationSchedules { get; set; }

        [JsonProperty("doctorRoomTestMappings")]
        public List<DoctorRoomTestMapping> DoctorRoomTestMappings { get; set; }
    }

    public class MapDoctorToCompnay : GbObject
    {
        [JsonProperty("userName")]
        public string UserName { get; set; }
        [JsonProperty("companyID")]
        public int CompanyID { get; set; }
        [JsonProperty("currentUserId")]
        public int CurrentUserId { get; set; }

    }
    public class mDoctor : GbObject
    {
        [Required]
        [JsonProperty("licenseNumber")]
        public string LicenseNumber { get; set; }

        [Required]
        [JsonProperty("wcbAuthorization")]
        public string WCBAuthorization { get; set; }

        [JsonProperty("taxType")]
        public GBEnums.TaxType TaxType { get; set; }

        [Required]
        [JsonProperty("title")]
        public string Title { get; set; }

        [Required]
        [JsonProperty("isCalendarPublic")]
        public bool IsCalendarPublic { get; set; }

        public List<mDoctorSpeciality> mDoctorSpecialities { get; set; }
        public List<DoctorRoomTestMapping> mDoctorRoomTestMappings { get; set; }
        public List<DoctorLocationSchedule> DoctorLocationSchedules { get; set; }
    }
}
