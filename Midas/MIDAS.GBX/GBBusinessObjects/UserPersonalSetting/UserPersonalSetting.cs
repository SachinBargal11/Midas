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
    public class UserPersonalSetting : GbObject
    {
        [Required]

        [JsonProperty("userId")]
        public int UserId { get; set; }

        [JsonProperty("isPublic")]
        public bool IsPublic { get; set; }

        [JsonProperty("isSearchable")]
        public bool IsSearchable { get; set; }

        [JsonProperty("isCalendarPublic")]
        public bool IsCalendarPublic { get; set; }

        [JsonProperty("user")]
        public User User { get; set; }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();
            return validations;
        }
    }

}

