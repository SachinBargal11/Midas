using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midas.GreenBill.BusinessObject
{
    public class Account:GbObject
    {
        [JsonConverter(typeof(StringEnumConverter))]
        public GBEnums.AccountStatus Status { get; set; }
        public string Name { get; set; }
      
    }
}
