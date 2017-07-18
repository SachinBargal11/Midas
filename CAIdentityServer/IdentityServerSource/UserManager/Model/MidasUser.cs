using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace UserManager.Model
{
    /// <summary>
    /// Midas user
    /// </summary>
    public class MidasUser
    {
        /// <summary>
        /// Gets or sets subject or user ID
        /// </summary>
        public string Subject { get; set; }

        /// <summary>
        /// Gets or sets Username
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// Gets or sets if user is enabled
        /// </summary>
        public bool Enabled { get; set; }

        /// <summary>
        /// Gets of sets the users first name
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Gets of sets the users middle name
        /// </summary>
        public string MiddleName { get; set; }

        /// <summary>
        /// Gets of sets the users last name
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// Gets of sets user claims
        /// </summary>
        public IEnumerable<Claim> Claims { get; set; }

        /// <summary>
        /// Gets of sets user roles
        /// </summary>
        public IEnumerable<Role> Roles { get; set; }

        public MidasUser()
        {
            Enabled = true;
            Claims = new List<Claim>();
            Roles = new List<Role>();
        }
    }
}
