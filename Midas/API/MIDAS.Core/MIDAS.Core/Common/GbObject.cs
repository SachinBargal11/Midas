using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.Core.Common
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
        public int CreateByUserID { get; set; }
        public int UpdateByUserID { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        
    }
}
