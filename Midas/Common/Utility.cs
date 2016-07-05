using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midas.Common
{
    public static class Utility
    {
        public static void ValidateEntityType<T>(Type expectedType, bool considerDerivedTypes = true)
        {
            if (!ValidateType<T>(expectedType, considerDerivedTypes))
            {
                throw new NotSupportedException("This object is not supported");
            }
        }

        public static bool ValidateType<T>(Type expectedType, bool considerDerivedTypes = true)
        {
            if (typeof(T) == expectedType || (considerDerivedTypes && typeof(T).IsSubclassOf(expectedType)))
            {
                return true;
            }

            return false;
        }

    }
}
