using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security;
namespace Midas.GreenBill.BusinessObject
{
    public class User: GbObject
    {
        GBEnums.UserType UserType { get; set; }
        public string UserName { get; set; }
        string FirstName { get; set; }
        string MiddleName { get; set; }
        string LastName { get; set; }
        GBEnums.Gender Gender { get; set; }
        string Notes { get; set; }
        string ImageLink { get; set; }
        Address PrimaryAddress { get; set; }
        ContactInfo PrimaryContactInfo { get; set; }
        SecureString SSN { get; set; }
        DateTime DateOfBirth { get; set; }
        public string Password /*Need to be updated to SecureString*/ { get; set; }
    }
}
