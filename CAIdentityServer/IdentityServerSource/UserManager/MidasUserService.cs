using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UserManager.Model;
using UserManager.Repository;

namespace UserManager
{
    /// <summary>
    /// Midas User Service
    /// </summary>
    public class MidasUserService
    {
        MIDASGBXEntities _context = new MIDASGBXEntities();

        /// <summary>
        /// Returns the user based on authentication context
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        public MidasUser GetUser(string userName, string password)
        {
            MidasUser midasuser = new MidasUser();

            User user = _context.Users.Where(u => u.UserName == userName).FirstOrDefault();

            if (user != null)
            {
                //if (UserManager.Common.PasswordHash.ValidatePassword(user.Password, Common.PasswordHash.HashPassword(password)))
                //{
                    midasuser.Subject = Convert.ToString(user.id);
                    midasuser.Username = user.UserName;
                    midasuser.FirstName = user.FirstName;
                    midasuser.MiddleName = user.MiddleName;
                    midasuser.LastName = user.LastName;
                //}
            }

            return midasuser;
        }

        /// <summary>
        /// Returns user by user id
        /// </summary>
        /// <param name="userID"></param>
        public MidasUser GetUserProfileData(int userID)
        {
            MidasUser muser = new MidasUser();
            User user = _context.Users.Where(u => u.id == userID).FirstOrDefault();

            if (user != null)
            {
                muser.Subject = Convert.ToString(user.id);
                muser.Username = user.UserName;
                muser.FirstName = user.FirstName;
                muser.MiddleName = user.MiddleName;
                muser.LastName = user.LastName;
                muser.Roles = GetUserRoles();
            }

            return user != null ? muser : null;
        }

        /// <summary>
        /// Returns the user based on authentication context
        /// </summary>
        public List<Role> GetUserRoles()
        {
            List<Role> roles = new List<Role>();
            roles.Add(new Role { RoleID = 1, Name = "Admin" });
            roles.Add(new Role { RoleID = 2, Name = "Doctor" });
            return roles;
        }
    }
}
