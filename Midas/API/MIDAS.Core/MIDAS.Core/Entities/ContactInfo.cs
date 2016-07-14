using MIDAS.Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.Core.Entities
{
    public class ContactInfo : GbObject
    {
        string CellPhone { get; set; }
        string EmailAddress { get; set; }
        string HomePhone { get; set; }
        string WorkPhone { get; set; }
        string FaxNo { get; set; }
    }
}
