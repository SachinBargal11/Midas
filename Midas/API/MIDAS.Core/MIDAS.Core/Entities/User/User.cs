using MIDAS.Core.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.Core.Entities.User
{
    [Table("User")]
    public class User : GbObject
    {
        MIDAS.Core.Common.GBEnums.UserType UserType { get; set; }
        public string UserName { get; set; }
        string FirstName { get; set; }
        string MiddleName { get; set; }
        string LastName { get; set; }
        MIDAS.Core.Common.GBEnums.Gender Gender { get; set; }
        string Notes { get; set; }
        string ImageLink { get; set; }
        Address PrimaryAddress { get; set; }
        ContactInfo PrimaryContactInfo { get; set; }
        SecureString SSN { get; set; }
        DateTime DateOfBirth { get; set; }
        public string Password /*Need to be updated to SecureString*/ { get; set; }

    }
} 