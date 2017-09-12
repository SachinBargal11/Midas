using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class ValidateOTP :GbObject
    {
        [JsonProperty("otp")]
        public OTP otp { get; set; }

        [JsonProperty("user")]
        public User user { get; set; }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();

            return validations;
        }
    }
}
