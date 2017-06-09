using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace MIDAS.GBX.BusinessObjects
{
    public class UserCompany : GbObject
    {
        public int UserId { get; set; }
        public int CompanyId { get; set; }
        public bool IsAccepted { get; set; }
        public GBEnums.UserStatu UserStatusID { get; set; }
        public User User { get; set; }
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
