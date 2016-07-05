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
        UserType UserType;
        string FirstName;
        string MiddleName;
        string LastName;
        Gender Gender;
        string Notes;
        string ImageLink;
        Address PrimaryAddress;
        ContactInfo PrimaryContactInfo;
        SecureString SSN;
        DateTime DateOfBirth;
        HashSet<IGbRole> Roles;
        SecureString Password;
	    
	
    }
}
