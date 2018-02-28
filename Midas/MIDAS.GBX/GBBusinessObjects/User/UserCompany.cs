using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace MIDAS.GBX.BusinessObjects
{
    public class UserCompany : GbObject
    {
        [JsonProperty("userId")]
        public int UserId { get; set; }

        [JsonProperty("companyId")]
        public int CompanyId { get; set; }

        [JsonProperty("isAccepted")]
        public bool IsAccepted { get; set; }

        [JsonProperty("userStatusID")]
        public GBEnums.UserStatu UserStatusID { get; set; }

        [JsonProperty("user")]
        public User User { get; set; }

        [JsonProperty("company")]
        public Company Company { get; set; }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();
            return validations;
        }
    }

    public class mUserCompany : GbObject
    {
        public int UserId { get; set; }
        public int CompanyId { get; set; }
        public mUser User { get; set; }
        public Company Company { get; set; }
    }
}
