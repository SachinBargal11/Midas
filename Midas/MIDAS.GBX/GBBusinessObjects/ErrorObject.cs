using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class ErrorObject
    {
        public ErrorLevel ErrorLevel { get; set; }
        public string ErrorMessage { get; set; }
        public object errorObject { get; set; }
    }
}


public enum ErrorLevel
{
    Warning=1,
    Error=2,
    Critical=3,
    Validation=4,
    Exception=5
}
