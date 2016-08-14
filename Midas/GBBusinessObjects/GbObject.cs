using GBBusinessObjects;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Midas.GreenBill.BusinessObject
{
    public class GbObject
    {
        private int id = 0;

        [JsonProperty("id")]
        public int ID
        {
            get
            {
                return this.id;
            }
            set
            {
                id = value;
            }
        }


        //public string Description { get; set; }
        [JsonProperty("isDeleted")]
        [JsonConverter(typeof(BoolConverter))]
        public bool? IsDeleted { get; set; }
        //public Dictionary<string, object> ExtensionProperties { get; set; }
        [JsonProperty("createByUserID")]
        public int CreateByUserID { get; set; }

        [JsonProperty("updateByUserID")]
        public int? UpdateByUserID { get; set; }
        [JsonProperty("createDate")]
        public DateTime CreateDate { get; set; }

        [JsonProperty("updateDate")]
        public DateTime? UpdateDate { get; set; }

        public virtual List<BusinessValidation> Validate()
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            
            return validations;
        }   
        public string Message { get; set; }
        //var json = new JavaScriptSerializer().Serialize(obj);
    }
}
