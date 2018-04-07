using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CAIdentityServer.Models;
using CAIdentityServer.Contract;

namespace CAIdentityServer.Service
{
    /// <summary>
    /// Identity Server User Store Service
    /// </summary>
    public class IdentityUserStoreService : IUserStoreService
    {
        Models.CAIdentityServerEntitiesModel _context;

        /// <summary>
        /// Returns the user based on authentication context
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        public IdentityUser GetUser(string userName, string password)
        {
            _context = new CAIdentityServerEntitiesModel(); 
            User user = _context.Users.Where(u => u.UserName == userName).FirstOrDefault();

            if (user != null)
            {
                try
                {
                    if (Utilities.PasswordHash.ValidatePassword(password, user.Password))
                    {
                        IdentityUser midasuser = new IdentityUser();
                        midasuser.Subject = Convert.ToString(user.id);
                        midasuser.Id = user.id;
                        midasuser.Username = user.UserName;
                        midasuser.FirstName = user.FirstName;
                        midasuser.MiddleName = user.MiddleName;
                        midasuser.LastName = user.LastName;
                        midasuser.DisplayName = user.FirstName + ' ' + user.LastName;
                        midasuser.TwoFactorEmailAuthEnabled = (user.C2FactAuthEmailEnabled == null || user.C2FactAuthEmailEnabled == false ? false : true);
                        midasuser.TwoFactorSMSAuthEnabled = (user.C2FactAuthSMSEnabled == null || user.C2FactAuthSMSEnabled == false ? false : true);
                        midasuser.Roles = GetUserRoles(user.id);

                        return midasuser;
                    }
                }
                catch (Exception)
                {
                    //Log exception
                }
            }

            return null;
        }

        /// <summary>
        /// Returns user by user id
        /// </summary>
        /// <param name="userID"></param>
        public IdentityUser GetUserProfileData(int userID)
        {
            _context = new CAIdentityServerEntitiesModel();
            IdentityUser midasuser = new IdentityUser();
            User user = _context.Users.Where(u => u.id == userID).FirstOrDefault();

            if (user != null)
            {
                midasuser.Subject = Convert.ToString(user.id);
                midasuser.Id = user.id;
                midasuser.Username = user.UserName;
                midasuser.FirstName = user.FirstName;
                midasuser.MiddleName = user.MiddleName;
                midasuser.LastName = user.LastName;
                midasuser.DisplayName = user.FirstName + ' ' + user.LastName;
                midasuser.TwoFactorEmailAuthEnabled = (user.C2FactAuthEmailEnabled == null ? false : true);
                midasuser.TwoFactorSMSAuthEnabled = (user.C2FactAuthSMSEnabled == null ? false : true);
                midasuser.Roles = GetUserRoles(user.id);
            }

            return user != null ? midasuser : null;
        }

        /// <summary>
        /// Returns the user based on authentication context
        /// </summary>
        public IEnumerable<IdentityRole> GetUserRoles(int useriID)
        {
            _context = new CAIdentityServerEntitiesModel();

            return _context.UserRoles
                .Where(u => u.UserID == useriID)
                .Select(r => new IdentityRole { ID = r.RoleID, Name = r.Role.Name })
                .AsEnumerable();
        }

        public bool GenerateAndSendOTP(int userID)
        {
            _context = new CAIdentityServerEntitiesModel();
            User user = _context.Users.Where(u => u.id == userID).FirstOrDefault();
            int defaultAdminUserID = Convert.ToInt32(Utilities.Utility.GetConfigValue("DefaultAdminUserID"));
            bool result = false;
            try
            {
                if (user != null)
                {

                    var existingOTP = _context.OTPs.Where(p => p.UserID == userID).ToList();
                    existingOTP.ForEach(a => { a.IsDeleted = true; a.UpdateDate = DateTime.UtcNow; a.UpdateByUserID = defaultAdminUserID; });
                }

                OTP otp = new OTP();
                otp.OTPCode = Utilities.Utility.GenerateRandomNumber(6);
                otp.Pin = Utilities.Utility.GenerateRandomNo();
                otp.UserID = user.id;
                otp.CreateDate = DateTime.UtcNow;
                otp.CreateByUserID = Convert.ToInt32(defaultAdminUserID);
                otp.IsDeleted = false;

                _context.OTPs.Add(otp);
                _context.SaveChanges();

                string Message = "Dear " + user.FirstName
                    + ",<br><br>As per your request, a One Time Password (OTP) has been generated and the same is <i><b>" + otp.OTPCode.ToString()
                    + "</b></i><br><br>Please use this OTP to complete the Login. Reference number is " + otp.Pin.ToString()
                    + " <br><br>*** This is an auto-generated email. Please do not reply to this email.*** <br><br>Thanks"
                    + " <br><br>MIDAS Administrator";

                Utilities.Email mail = new Utilities.Email();
                mail.ToEmail = user.UserName;
                mail.Subject = "OTP Alert Message From GBX MIDAS";
                mail.Body = Message;

                mail.SendMail();
                result = true;
            }
            catch
            {
                result = false;
            }
            return result;
        }

        public bool VerifyOTP(int userId, int otpCode)
        {
            _context = new CAIdentityServerEntitiesModel();
            bool result = false;

            var otp = _context.OTPs
                .Where(u => u.UserID == userId && u.OTPCode == otpCode && u.IsDeleted == false).FirstOrDefault();

            if (otp != null)
            {
                otp.IsDeleted = true;
                otp.UpdateByUserID = userId;
                otp.UpdateDate = DateTime.UtcNow;
                _context.SaveChanges();

                result = true;
            }
            return result;
        }
    }
}