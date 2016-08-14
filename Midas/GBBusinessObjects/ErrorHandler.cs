using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GBBusinessObjects
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
