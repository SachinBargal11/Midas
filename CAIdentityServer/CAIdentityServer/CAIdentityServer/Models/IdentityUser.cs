using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Security.Claims;

namespace CAIdentityServer.Models
{
    /// <summary>
    /// User Identity
    /// </summary>
    public class IdentityUser
    {
        /// <summary>
        /// Gets or sets user Id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// Gets or sets subject
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
        /// Gets the users dispay name
        /// </summary>
        public string DisplayName { get; set; }

        /// <summary>
        /// Gets of sets the two factor authentication for email
        /// </summary>
        public bool TwoFactorEmailAuthEnabled { get; set; }

        /// <summary>
        /// Gets of sets the two factor authentication for SMS
        /// </summary>
        public bool TwoFactorSMSAuthEnabled { get; set; }



        /// <summary>
        /// Gets of sets user claims
        /// </summary>
        public IEnumerable<Claim> Claims { get; set; }

        /// <summary>
        /// Gets of sets user roles
        /// </summary>
        public IEnumerable<IdentityRole> Roles { get; set; }

        public IdentityUser()
        {
            Enabled = true;
            Claims = new List<Claim>();
            Roles = new List<IdentityRole>();
        }
    }
}