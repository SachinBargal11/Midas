using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midas.Common
{
    public class GbException:Exception
    {
        private string message;
        public GbException()
        { }
        public GbException(string message)
        {
            this.message = message;
        }
        public override string Message
        {
            get
            {
                return this.message;
            }
        }
    }
}
