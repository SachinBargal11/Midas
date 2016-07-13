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
        private string name = "";

        public int Id
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

        public string Name
        {
            get { return this.name; }

            set
            {
                name = value;
                if (name != null)
                    name = name.Replace(" ", "");
            }
        }

        public string Description { get; set; }
        public bool IsDeleted { get; set; }
        public Dictionary<string, object> ExtensionProperties { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
     
        public virtual List<BusinessValidation> Validate()
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            return validations;
        }   
    }
}
