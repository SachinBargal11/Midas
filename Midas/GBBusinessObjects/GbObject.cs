using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midas.GreenBill.BusinessObject
{
    public class GbObject
    {
        private int id = 0;

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
        public bool IsDeleted { get; set; }
        public Dictionary<string, object> ExtensionProperties { get; set; }
<<<<<<< HEAD
        public int CreateByUserID { get; set; }
        public int UpdateByUserID { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }

=======
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
     
>>>>>>> master
        public virtual List<BusinessValidation> Validate()
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            return validations;
        }   
    }
}
