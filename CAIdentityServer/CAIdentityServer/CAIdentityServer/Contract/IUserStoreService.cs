using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CAIdentityServer.Models;

namespace CAIdentityServer.Contract
{
    public interface IUserStoreService
    {
        IdentityUser GetUser(string userName, string password);
        IdentityUser GetUserProfileData(int userID);
        IEnumerable<IdentityRole> GetUserRoles(int useriID);
        bool GenerateAndSendOTP(int userID);
        bool VerifyOTP(int userId, int otpCode);
    }
}
