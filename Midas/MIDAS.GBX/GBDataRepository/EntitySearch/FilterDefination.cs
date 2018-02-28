using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.DataRepository.EntitySearch
{
    public class FilterDefinition
    {
        public string Name { get; set; }
        public bool IsDeleted { get; set; }
        public int id { get; set; }

        public int CompanyID { get; set; }
    }
}
