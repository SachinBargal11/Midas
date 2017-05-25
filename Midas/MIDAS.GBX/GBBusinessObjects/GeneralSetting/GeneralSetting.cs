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
    public class GeneralSetting : GbObject
    {
        
        [JsonProperty("companyId")]
        public int CompanyId { get; set; }

        [JsonProperty("slotDuration")]
        public int SlotDuration { get; set; }

        [JsonProperty("company")]
        public Company Company { get; set; }
    }

   
}