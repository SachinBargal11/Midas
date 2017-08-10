using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserManager.Contract
{
    public interface IUserStoreService
    {
        Model.User GetUser(string userName, string password);
        Model.User GetUserProfileData(int userID);
        List<Model.Role> GetUserRoles(int useriID);
        bool GenerateAndSendOTP(int userID);
        bool VerifyOTP(int userId, int otpCode);
    }
}
