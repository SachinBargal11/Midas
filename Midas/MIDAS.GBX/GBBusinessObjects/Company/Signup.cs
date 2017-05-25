using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class Signup: GbObject
    {
        public Company company { get; set; }
        public User user { get; set; }
        public AddressInfo addressInfo { get; set; }
        public ContactInfo contactInfo { get; set; }
        public Role role { get; set; }
    }
}
