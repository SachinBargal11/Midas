using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
   public  class ErrorHandler
    {
        public ErrorHandler()
        {

        }

        public string ErrorMessage { get; set; }
        public string UIMessage { get; set; }
        public string ExceptionType { get; set; }
    }
}
