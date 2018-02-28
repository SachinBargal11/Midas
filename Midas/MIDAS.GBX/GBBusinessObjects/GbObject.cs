using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
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

        private int InvitationID_ = 0;
        [JsonProperty("invitationID")]
        public int InvitationID
        {
            get
            {
                return this.InvitationID_;
            }
            set
            {
                InvitationID_ = value;
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
        public DateTime CreateDate { get { return DateTime.Now; } }

        [JsonProperty("updateDate")]
        public DateTime? UpdateDate { get { return DateTime.Now; } }

        public virtual List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();

            return validations;
        }
    }
}
