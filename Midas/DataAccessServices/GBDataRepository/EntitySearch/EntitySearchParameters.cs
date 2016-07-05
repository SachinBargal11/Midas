using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midas.GreenBill.EntityRepository
{
    public class EntitySearchParameter
    {
        public int? id { get; set; }
        public string name { get; set; }
        public Type type { get; set; }

        public EntitySearchParameter(int id, Type t)
        {
            this.id = id;
            type = t;
        }

        public EntitySearchParameter(string name, Type t)
        {
            this.name = name;
            type = t;
        }
        public EntitySearchParameter()
        {
        }
    }
}
