using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Midas.GreenBill.BusinessObject
{
    public class User: GbObject
    {
        [JsonConverter(typeof(StringEnumConverter))]
        public GBEnums.UserType UserType { get; set; }
        public Account Account { get; set; }
        public Address Address { get; set; }
        public ContactInfo ContactInfo { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public  string LastName { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public GBEnums.Gender Gender { get; set; }
        public string ImageLink { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Password /*Need to be updated to SecureString*/ { get; set; }
    }
}
