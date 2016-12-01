using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects.Validation
{
    public interface IValidation
    {
        bool IsValid { get; } // True when valid
        void Validate(); // Throws an exception when not valid
        string Message { get; } // The message when object is not valid
    }
}
